import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const res = await query(`
      SELECT 
        p.*,
        COUNT(pr.id) as total_requests,
        COALESCE(SUM(pr.quoted_price), 0) as total_pipeline_value
      FROM packages p
      LEFT JOIN purchase_requests pr ON p.id = pr.package_id
      GROUP BY p.id
      ORDER BY p.display_order ASC, p.created_at ASC
    `);

    return NextResponse.json(res.rows);
  } catch (err: any) {
    console.error('Error fetching admin packages:', err);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const body = await req.json();
    const {
      title,
      slug,
      category,
      category_label,
      subtitle,
      description,
      regular_price,
      discount_percentage,
      discount_fixed_amount,
      discount_type,
      is_discount_active,
      discount_start_date,
      discount_expiry_date,
      custom_price_label,
      currency,
      currency_symbol,
      billing_type,
      features,
      deliverables,
      timeline,
      ideal_for,
      is_featured,
      is_popular,
      badge,
      display_order,
      cta_text,
    } = body;

    if (!title || !category || regular_price === undefined) {
      return NextResponse.json(
        { error: 'Title, category, and regular price are required.' },
        { status: 400 }
      );
    }

    const regPrice = parseFloat(regular_price);
    const discType = discount_type || 'none';
    const discPct = parseFloat(discount_percentage) || 0;
    const discFixed = parseFloat(discount_fixed_amount) || 0;

    let discountedPrice = regPrice;
    if (is_discount_active) {
      if (discType === 'percentage') {
        discountedPrice = Math.max(0, regPrice - (regPrice * discPct) / 100);
      } else if (discType === 'fixed') {
        discountedPrice = Math.max(0, regPrice - discFixed);
      }
    }
    discountedPrice = Math.round(discountedPrice * 100) / 100;

    // Generate ID & Slug
    const packageId = 'pack_' + (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '_')).slice(0, 40);
    const packageSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).slice(0, 60);

    const res = await query(
      `INSERT INTO packages (
        id, slug, category, category_label, title, subtitle, description,
        regular_price, discounted_price, discount_percentage, discount_fixed_amount,
        discount_type, is_discount_active, discount_start_date, discount_expiry_date,
        custom_price_label, currency, currency_symbol, billing_type,
        features, deliverables, timeline, ideal_for, is_featured, is_popular,
        badge, display_order, is_active, cta_text
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, true, $28)
      RETURNING *`,
      [
        packageId,
        packageSlug,
        category,
        category_label || category,
        title.trim(),
        subtitle?.trim() || null,
        description?.trim() || null,
        regPrice,
        discountedPrice,
        discPct,
        discFixed,
        discType,
        !!is_discount_active,
        discount_start_date || null,
        discount_expiry_date || null,
        custom_price_label || 'মাসিক',
        currency || 'BDT',
        currency_symbol || '৳',
        billing_type || 'monthly',
        JSON.stringify(features || []),
        JSON.stringify(deliverables || []),
        timeline || null,
        ideal_for || null,
        !!is_featured,
        !!is_popular,
        badge || null,
        display_order || 0,
        cta_text || 'Get This Package',
      ]
    );

    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'CREATE_PACKAGE', 'package', $3, $4)`,
      [
        auth.session.id,
        auth.session.name,
        res.rows[0].id,
        JSON.stringify({ title, price: regPrice }),
      ]
    );

    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (err: any) {
    console.error('Error creating package:', err);
    return NextResponse.json({ error: 'Failed to create package: ' + err.message }, { status: 500 });
  }
}
