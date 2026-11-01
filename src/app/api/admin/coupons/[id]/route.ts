import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const couponRes = await query(`SELECT * FROM coupons WHERE id = $1`, [id]);
    if (couponRes.rows.length === 0) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    const redemptionsRes = await query(
      `SELECT r.*, p.package_name, p.full_name, p.business_name 
       FROM coupon_redemptions r
       LEFT JOIN purchase_requests p ON r.purchase_request_id = p.id
       WHERE r.coupon_id = $1
       ORDER BY r.created_at DESC LIMIT 50`,
      [id]
    );

    return NextResponse.json({
      success: true,
      coupon: couponRes.rows[0],
      redemptions: redemptionsRes.rows,
    });
  } catch (err: any) {
    console.error('Error fetching single coupon:', err);
    return NextResponse.json({ error: 'Failed to fetch coupon' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const {
      is_active,
      discount_value,
      discount_type,
      max_discount_amount,
      usage_limit_total,
      starts_at,
      expires_at,
      package_restriction,
      allowed_package_ids,
      notes,
    } = body;

    const res = await query(
      `UPDATE coupons 
       SET is_active = COALESCE($1, is_active),
           discount_value = COALESCE($2, discount_value),
           discount_type = COALESCE($3, discount_type),
           max_discount_amount = $4,
           usage_limit_total = $5,
           starts_at = COALESCE($6, starts_at),
           expires_at = $7,
           package_restriction = COALESCE($8, package_restriction),
           allowed_package_ids = COALESCE($9, allowed_package_ids),
           notes = $10,
           updated_at = NOW()
       WHERE id = $11
       RETURNING *`,
      [
        is_active !== undefined ? is_active : null,
        discount_value !== undefined ? parseFloat(discount_value) : null,
        discount_type || null,
        max_discount_amount ? parseFloat(max_discount_amount) : null,
        usage_limit_total ? parseInt(usage_limit_total, 10) : null,
        starts_at || null,
        expires_at || null,
        package_restriction || null,
        allowed_package_ids ? JSON.stringify(allowed_package_ids) : null,
        notes || null,
        id,
      ]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, coupon: res.rows[0] });
  } catch (err: any) {
    console.error('Error updating coupon:', err);
    return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Check if it has redemptions
    const checkRedemptions = await query('SELECT COUNT(*) as count FROM coupon_redemptions WHERE coupon_id = $1', [id]);
    const count = parseInt(checkRedemptions.rows[0].count, 10);

    if (count > 0) {
      // Soft-deactivate to preserve historical redemption reports
      await query(`UPDATE coupons SET is_active = false, notes = COALESCE(notes, '') || ' [Archived by admin]' WHERE id = $1`, [id]);
      return NextResponse.json({ success: true, message: 'Coupon deactivated to preserve historical redemption records.' });
    } else {
      await query('DELETE FROM coupons WHERE id = $1', [id]);
      return NextResponse.json({ success: true, message: 'Coupon deleted successfully.' });
    }
  } catch (err: any) {
    console.error('Error deleting coupon:', err);
    return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
  }
}
