import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let sql = `
      SELECT * FROM packages 
      WHERE is_active = true
    `;
    const params: any[] = [];

    if (category && category !== 'all') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    sql += ` ORDER BY display_order ASC, created_at ASC`;

    const res = await query(sql, params);
    const now = new Date();

    const formattedPackages = [];

    for (const pkg of res.rows) {
      let isDiscountActive = pkg.is_discount_active;
      const startDate = pkg.discount_start_date ? new Date(pkg.discount_start_date) : null;
      const expiryDate = pkg.discount_expiry_date ? new Date(pkg.discount_expiry_date) : null;

      // Check auto-expiry
      if (isDiscountActive) {
        if (startDate && now < startDate) {
          isDiscountActive = false;
        }
        if (expiryDate && now > expiryDate) {
          isDiscountActive = false;
          // Auto-deactivate in DB asynchronously
          query(`UPDATE packages SET is_discount_active = false WHERE id = $1`, [pkg.id]).catch(
            console.error
          );
        }
      }

      const regularPrice = parseFloat(pkg.regular_price);
      let discountedPrice = regularPrice;
      let savingsAmount = 0;

      if (isDiscountActive) {
        if (pkg.discount_type === 'percentage') {
          const pct = parseFloat(pkg.discount_percentage) || 0;
          savingsAmount = (regularPrice * pct) / 100;
          discountedPrice = Math.max(0, regularPrice - savingsAmount);
        } else if (pkg.discount_type === 'fixed') {
          savingsAmount = parseFloat(pkg.discount_fixed_amount) || 0;
          discountedPrice = Math.max(0, regularPrice - savingsAmount);
        }
      }

      // Round to 2 decimal places
      discountedPrice = Math.round(discountedPrice * 100) / 100;
      savingsAmount = Math.round(savingsAmount * 100) / 100;

      formattedPackages.push({
        id: pkg.id,
        slug: pkg.slug,
        category: pkg.category,
        categoryLabel: pkg.category_label,
        title: pkg.title,
        subtitle: pkg.subtitle,
        description: pkg.description,
        regularPrice: regularPrice,
        discountedPrice: isDiscountActive ? discountedPrice : regularPrice,
        finalPrice: isDiscountActive ? discountedPrice : regularPrice,
        hasDiscount: isDiscountActive,
        discountPercentage: parseFloat(pkg.discount_percentage) || 0,
        discountFixedAmount: parseFloat(pkg.discount_fixed_amount) || 0,
        savingsAmount: savingsAmount,
        discountType: pkg.discount_type,
        customPriceLabel: pkg.custom_price_label,
        currency: pkg.currency,
        currencySymbol: pkg.currency_symbol,
        billingType: pkg.billing_type,
        features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features || [],
        deliverables: typeof pkg.deliverables === 'string' ? JSON.parse(pkg.deliverables) : pkg.deliverables || [],
        timeline: pkg.timeline,
        idealFor: pkg.ideal_for,
        isFeatured: pkg.is_featured,
        isPopular: pkg.is_popular,
        badge: isDiscountActive && pkg.badge ? pkg.badge : pkg.badge,
        ctaText: pkg.cta_text || 'Get This Package',
        ctaWhatsappText: pkg.cta_whatsapp_text || 'Discuss on WhatsApp',
      });
    }

    return NextResponse.json(formattedPackages, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: any) {
    console.error('Error fetching public packages:', err);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}
