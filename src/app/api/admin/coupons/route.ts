import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await query(`
      SELECT 
        c.*,
        COUNT(r.id) as total_redemptions,
        COALESCE(SUM(r.discount_amount_applied), 0) as total_discount_given
      FROM coupons c
      LEFT JOIN coupon_redemptions r ON c.id = r.coupon_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);

    return NextResponse.json({ success: true, coupons: res.rows });
  } catch (err: any) {
    console.error('Error fetching admin coupons:', err);
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      code,
      discount_type = 'percentage',
      discount_value,
      max_discount_amount = null,
      min_order_amount = 0,
      package_restriction = 'all',
      allowed_package_ids = [],
      allowed_service_slugs = [],
      usage_limit_total = null,
      usage_limit_per_user = 1,
      starts_at = null,
      expires_at = null,
      is_active = true,
      notes = null,
    } = body;

    if (!code || !discount_value) {
      return NextResponse.json({ error: 'Coupon code and discount value are required.' }, { status: 400 });
    }

    const cleanCode = String(code).trim().toUpperCase();
    const normalizedDiscountType = discount_type === 'fixed_amount' ? 'fixed' : discount_type;

    // Check duplicate
    const checkDup = await query('SELECT id FROM coupons WHERE UPPER(code) = $1', [cleanCode]);
    if (checkDup.rows.length > 0) {
      return NextResponse.json({ error: `Coupon code "${cleanCode}" already exists.` }, { status: 400 });
    }

    const res = await query(
      `INSERT INTO coupons (
        code, discount_type, discount_value, max_discount_amount, min_order_amount,
        package_restriction, allowed_package_ids, allowed_service_slugs,
        usage_limit_total, usage_limit_per_user, starts_at, expires_at,
        is_active, created_by, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        cleanCode,
        normalizedDiscountType,
        parseFloat(discount_value),
        max_discount_amount ? parseFloat(max_discount_amount) : null,
        min_order_amount ? parseFloat(min_order_amount) : 0,
        package_restriction,
        JSON.stringify(allowed_package_ids || []),
        JSON.stringify(allowed_service_slugs || []),
        usage_limit_total ? parseInt(usage_limit_total, 10) : null,
        usage_limit_per_user ? parseInt(usage_limit_per_user, 10) : 1,
        starts_at || new Date().toISOString(),
        expires_at || null,
        is_active,
        auth.user?.name || 'Super Admin',
        notes || null,
      ]
    );

    // Activity log
    await query(
      `INSERT INTO activity_logs (user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, 'CREATE_COUPON', 'coupon', $2, $3)`,
      [
        auth.user?.name || 'Admin',
        String(res.rows[0].id),
        JSON.stringify({ code: cleanCode, discount_type: normalizedDiscountType, discount_value }),
      ]
    );

    return NextResponse.json({ success: true, coupon: res.rows[0] });
  } catch (err: any) {
    console.error('Error creating coupon:', err);
    return NextResponse.json({ error: err.message || 'Failed to create coupon' }, { status: 500 });
  }
}
