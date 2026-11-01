import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { code, packageId, basePrice } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, message: 'Please enter a coupon code.' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();

    // Query active coupon
    const res = await query(
      `SELECT * FROM coupons WHERE UPPER(code) = $1`,
      [cleanCode]
    );

    if (res.rows.length === 0) {
      return NextResponse.json(
        { valid: false, message: 'Invalid coupon code. Please check and try again.' },
        { status: 200 }
      );
    }

    const coupon = res.rows[0];

    // Check active flag
    if (!coupon.is_active) {
      return NextResponse.json(
        { valid: false, message: 'This coupon code has been deactivated.' },
        { status: 200 }
      );
    }

    const now = new Date();

    // Check start date
    if (coupon.starts_at && now < new Date(coupon.starts_at)) {
      return NextResponse.json(
        { valid: false, message: 'This promotion has not started yet.' },
        { status: 200 }
      );
    }

    // Check expiration date
    if (coupon.expires_at && now > new Date(coupon.expires_at)) {
      return NextResponse.json(
        { valid: false, message: 'This coupon code has expired.' },
        { status: 200 }
      );
    }

    // Check usage limits
    if (coupon.usage_limit_total !== null && coupon.times_used >= coupon.usage_limit_total) {
      return NextResponse.json(
        { valid: false, message: 'This promotion has reached its maximum redemption limit.' },
        { status: 200 }
      );
    }

    // Check package eligibility
    if (coupon.package_restriction === 'specific_packages' && packageId) {
      const allowed = Array.isArray(coupon.allowed_package_ids)
        ? coupon.allowed_package_ids.map(String)
        : [];
      if (!allowed.includes(String(packageId))) {
        return NextResponse.json(
          { valid: false, message: 'This coupon is not valid for the selected package.' },
          { status: 200 }
        );
      }
    }

    // Compute discount calculation
    const price = typeof basePrice === 'number' ? basePrice : 0;
    let discountAmount = 0;

    if (coupon.discount_type === 'percentage') {
      const pct = parseFloat(coupon.discount_value) || 0;
      discountAmount = (price * pct) / 100;

      // Optional max discount cap
      if (coupon.max_discount_amount) {
        const maxCap = parseFloat(coupon.max_discount_amount);
        if (discountAmount > maxCap) {
          discountAmount = maxCap;
        }
      }
    } else {
      // Fixed amount
      discountAmount = parseFloat(coupon.discount_value) || 0;
      if (price > 0 && discountAmount > price) {
        discountAmount = price;
      }
    }

    discountAmount = Math.round(discountAmount * 100) / 100;
    const finalPrice = Math.max(0, Math.round((price - discountAmount) * 100) / 100);

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discount_type,
      discountValue: parseFloat(coupon.discount_value),
      discountAmount,
      finalPrice,
      maxDiscountAmount: coupon.max_discount_amount ? parseFloat(coupon.max_discount_amount) : null,
      message: `Coupon "${coupon.code}" successfully applied!`,
    });
  } catch (err: any) {
    console.error('Coupon validation error:', err);
    return NextResponse.json({ valid: false, message: 'Error validating coupon.' }, { status: 500 });
  }
}
