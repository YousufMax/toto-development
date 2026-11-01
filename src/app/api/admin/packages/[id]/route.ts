import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  const packageId = params.id;

  try {
    const body = await req.json();
    const {
      title,
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
      billing_type,
      features,
      deliverables,
      timeline,
      ideal_for,
      is_featured,
      is_popular,
      is_active,
      badge,
      display_order,
      cta_text,
    } = body;

    const existingRes = await query('SELECT * FROM packages WHERE id = $1', [packageId]);
    if (existingRes.rows.length === 0) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const current = existingRes.rows[0];
    const regPrice = regular_price !== undefined ? parseFloat(regular_price) : parseFloat(current.regular_price);
    const discType = discount_type !== undefined ? discount_type : current.discount_type;
    const discPct = discount_percentage !== undefined ? parseFloat(discount_percentage) : parseFloat(current.discount_percentage);
    const discFixed = discount_fixed_amount !== undefined ? parseFloat(discount_fixed_amount) : parseFloat(current.discount_fixed_amount);
    const discActive = is_discount_active !== undefined ? !!is_discount_active : current.is_discount_active;

    let discountedPrice = regPrice;
    if (discActive) {
      if (discType === 'percentage') {
        discountedPrice = Math.max(0, regPrice - (regPrice * discPct) / 100);
      } else if (discType === 'fixed') {
        discountedPrice = Math.max(0, regPrice - discFixed);
      }
    }
    discountedPrice = Math.round(discountedPrice * 100) / 100;

    const res = await query(
      `UPDATE packages
       SET
         title = COALESCE($1, title),
         category = COALESCE($2, category),
         category_label = COALESCE($3, category_label),
         subtitle = COALESCE($4, subtitle),
         description = COALESCE($5, description),
         regular_price = $6,
         discounted_price = $7,
         discount_percentage = $8,
         discount_fixed_amount = $9,
         discount_type = $10,
         is_discount_active = $11,
         discount_start_date = $12,
         discount_expiry_date = $13,
         custom_price_label = COALESCE($14, custom_price_label),
         billing_type = COALESCE($15, billing_type),
         features = COALESCE($16, features),
         deliverables = COALESCE($17, deliverables),
         timeline = COALESCE($18, timeline),
         ideal_for = COALESCE($19, ideal_for),
         is_featured = COALESCE($20, is_featured),
         is_popular = COALESCE($21, is_popular),
         is_active = COALESCE($22, is_active),
         badge = $23,
         display_order = COALESCE($24, display_order),
         cta_text = COALESCE($25, cta_text),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $26
       RETURNING *`,
      [
        title?.trim(),
        category,
        category_label,
        subtitle,
        description,
        regPrice,
        discountedPrice,
        discPct,
        discFixed,
        discType,
        discActive,
        discount_start_date !== undefined ? discount_start_date : current.discount_start_date,
        discount_expiry_date !== undefined ? discount_expiry_date : current.discount_expiry_date,
        custom_price_label,
        billing_type,
        features ? JSON.stringify(features) : null,
        deliverables ? JSON.stringify(deliverables) : null,
        timeline,
        ideal_for,
        is_featured !== undefined ? !!is_featured : null,
        is_popular !== undefined ? !!is_popular : null,
        is_active !== undefined ? !!is_active : null,
        badge !== undefined ? badge : current.badge,
        display_order !== undefined ? parseInt(display_order, 10) : null,
        cta_text,
        packageId,
      ]
    );

    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'UPDATE_PACKAGE', 'package', $3, $4)`,
      [
        auth.session.id,
        auth.session.name,
        packageId,
        JSON.stringify({ title: res.rows[0].title, regularPrice: regPrice, finalPrice: discountedPrice }),
      ]
    );

    return NextResponse.json(res.rows[0]);
  } catch (err: any) {
    console.error('Error updating package:', err);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req, ['super_admin', 'admin']);
  if ('error' in auth) return auth.error;

  const packageId = params.id;

  try {
    // Soft delete or toggle inactive to preserve historical request records
    await query('UPDATE packages SET is_active = false WHERE id = $1', [packageId]);

    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'DEACTIVATE_PACKAGE', 'package', $3, '{}'::jsonb)`,
      [auth.session.id, auth.session.name, packageId]
    );

    return NextResponse.json({ success: true, message: 'Package deactivated' });
  } catch (err: any) {
    console.error('Error deleting package:', err);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
