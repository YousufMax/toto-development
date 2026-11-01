import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';
import { resolveActiveWhatsAppNumber } from '@/lib/whatsapp-resolver';
import { dispatchMarketingEvent } from '@/lib/marketing/event-dispatcher';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      packageId,
      websiteOrSocial,
      projectRequirements,
      preferredContactMethod,
      sourcePage,
      couponCode,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      sessionId,
    } = body;

    const fullName = String(body.fullName || body.name || body.customerName || '').trim();
    const businessName = String(body.businessName || body.company || body.companyName || '').trim();
    const whatsappNumber = String(body.whatsappNumber || body.phone || body.customerPhone || '').trim();
    const email = String(body.email || body.customerEmail || '').trim();

    // 1. Validation
    if (!fullName || !businessName || !whatsappNumber || !email) {
      return NextResponse.json(
        { error: 'Please provide your full name, company name, WhatsApp number, and email address.' },
        { status: 400 }
      );
    }

    if (!packageId) {
      return NextResponse.json(
        { error: 'A valid package must be selected.' },
        { status: 400 }
      );
    }

    // 2. Fetch package from database & compute authoritative price
    let pkgRes = await query('SELECT * FROM packages WHERE id = $1', [packageId]);
    if (pkgRes.rows.length === 0) {
      const cleanId = String(packageId).trim().toLowerCase();
      const withPrefix = cleanId.startsWith('pack_') ? cleanId : `pack_${cleanId}`;
      const withoutPrefix = cleanId.replace(/^pack_/, '');
      pkgRes = await query(
        `SELECT * FROM packages 
         WHERE id IN ($1, $2, $3) 
            OR slug IN ($1, $2, $3)
            OR LOWER(title) LIKE '%' || $2 || '%'
         LIMIT 1`,
        [cleanId, withoutPrefix, withPrefix]
      );
    }

    if (pkgRes.rows.length === 0) {
      return NextResponse.json(
        { error: 'Selected package was not found. Please refresh or select an active package.' },
        { status: 404 }
      );
    }

    const pkg = pkgRes.rows[0];
    const regularPrice = parseFloat(pkg.regular_price);
    let basePrice = regularPrice;

    // Check promotional package discount
    const now = new Date();
    let isDiscountActive = pkg.is_discount_active;
    if (pkg.discount_start_date && now < new Date(pkg.discount_start_date)) isDiscountActive = false;
    if (pkg.discount_expiry_date && now > new Date(pkg.discount_expiry_date)) isDiscountActive = false;

    if (isDiscountActive) {
      if (pkg.discount_type === 'percentage') {
        const pct = parseFloat(pkg.discount_percentage) || 0;
        basePrice = Math.max(0, regularPrice - (regularPrice * pct) / 100);
      } else if (pkg.discount_type === 'fixed') {
        const fixed = parseFloat(pkg.discount_fixed_amount) || 0;
        basePrice = Math.max(0, regularPrice - fixed);
      }
    }
    basePrice = Math.round(basePrice * 100) / 100;

    // 3. Process Coupon Code if provided
    let appliedCoupon: any = null;
    let couponDiscountAmount = 0;
    let finalPrice = basePrice;

    if (couponCode && typeof couponCode === 'string' && couponCode.trim()) {
      const cleanCoupon = couponCode.trim().toUpperCase();
      const couponRes = await query(
        `SELECT * FROM coupons WHERE UPPER(code) = $1 AND is_active = true`,
        [cleanCoupon]
      );

      if (couponRes.rows.length > 0) {
        const c = couponRes.rows[0];
        let couponValid = true;

        if (c.starts_at && now < new Date(c.starts_at)) couponValid = false;
        if (c.expires_at && now > new Date(c.expires_at)) couponValid = false;
        if (c.usage_limit_total !== null && c.times_used >= c.usage_limit_total) couponValid = false;

        if (c.package_restriction === 'specific_packages' && packageId) {
          const allowed = Array.isArray(c.allowed_package_ids) ? c.allowed_package_ids.map(String) : [];
          if (!allowed.includes(String(packageId))) couponValid = false;
        }

        if (couponValid) {
          appliedCoupon = c;
          if (c.discount_type === 'percentage') {
            const pct = parseFloat(c.discount_value) || 0;
            couponDiscountAmount = (basePrice * pct) / 100;
            if (c.max_discount_amount) {
              const cap = parseFloat(c.max_discount_amount);
              if (couponDiscountAmount > cap) couponDiscountAmount = cap;
            }
          } else {
            couponDiscountAmount = parseFloat(c.discount_value) || 0;
            if (couponDiscountAmount > basePrice) couponDiscountAmount = basePrice;
          }

          couponDiscountAmount = Math.round(couponDiscountAmount * 100) / 100;
          finalPrice = Math.max(0, Math.round((basePrice - couponDiscountAmount) * 100) / 100);
        }
      }
    }

    // 4. Anti-duplicate submission check (same email & package within 60 seconds)
    const duplicateCheck = await query(
      `SELECT id, created_at FROM purchase_requests 
       WHERE email = $1 AND package_id = $2 AND created_at > (CURRENT_TIMESTAMP - INTERVAL '60 seconds')`,
      [email.toLowerCase().trim(), packageId]
    );

    if (duplicateCheck.rows.length > 0) {
      const existingId = duplicateCheck.rows[0].id;
      return NextResponse.json({
        success: true,
        isDuplicate: true,
        requestId: existingId,
        message: 'Your request was already received just now. Our team will reach out to you shortly.',
      });
    }

    // 5. Generate unique Request ID: REQ-YYYY-XXXX and eventId
    const currentYear = new Date().getFullYear();
    const countRes = await query('SELECT COUNT(*) as total FROM purchase_requests');
    const seqNum = parseInt(countRes.rows[0].total, 10) + 1001;
    const requestId = `REQ-${currentYear}-${seqNum}`;
    const eventId = crypto.randomUUID();

    // Capture IP and User Agent
    const ipAddress =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // 6. Insert into purchase_requests
    await query(
      `INSERT INTO purchase_requests (
        id, package_id, package_name, package_category, quoted_price, currency,
        full_name, business_name, whatsapp_number, email, website_or_social,
        project_requirements, preferred_contact_method, status, submission_ip, lead_source_page,
        coupon_code, discount_amount, original_price, final_price,
        utm_source, utm_medium, utm_campaign, event_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'new_request', $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)`,
      [
        requestId,
        pkg.id,
        pkg.title,
        pkg.category_label || pkg.category,
        finalPrice,
        pkg.currency || 'BDT',
        fullName.trim(),
        businessName.trim(),
        whatsappNumber.trim(),
        email.toLowerCase().trim(),
        websiteOrSocial?.trim() || null,
        projectRequirements?.trim() || null,
        preferredContactMethod || 'whatsapp',
        ipAddress,
        sourcePage || null,
        appliedCoupon ? appliedCoupon.code : null,
        couponDiscountAmount,
        regularPrice,
        finalPrice,
        utmSource || null,
        utmMedium || null,
        utmCampaign || null,
        eventId,
      ]
    );

    // 7. Record coupon redemption if coupon was applied
    if (appliedCoupon) {
      try {
        await query(
          `INSERT INTO coupon_redemptions (
            coupon_id, coupon_code, purchase_request_id, package_id,
            discount_amount, discount_amount_applied, original_price, final_price,
            customer_email, customer_phone, ip_address
          ) VALUES ($1, $2, $3, $4, $5, $5, $6, $7, $8, $9, $10)`,
          [
            appliedCoupon.id,
            appliedCoupon.code,
            requestId,
            pkg.id,
            couponDiscountAmount,
            regularPrice,
            finalPrice,
            email.toLowerCase().trim(),
            whatsappNumber.trim(),
            ipAddress,
          ]
        );

        await query(
          `UPDATE coupons SET times_used = times_used + 1, updated_at = NOW() WHERE id = $1`,
          [appliedCoupon.id]
        );
      } catch (e) {
        console.error('Error logging coupon redemption:', e);
      }
    }

    // 8. Record timeline history
    await query(
      `INSERT INTO lead_history (request_id, user_name, previous_status, new_status, note)
       VALUES ($1, 'Customer', 'none', 'new_request', $2)`,
      [
        requestId,
        `New purchase enquiry received online for ${pkg.title} at ${pkg.currency_symbol || '৳'}${finalPrice.toLocaleString()}${appliedCoupon ? ` (Coupon: ${appliedCoupon.code} applied)` : ''}`,
      ]
    );

    // 9. Activity log
    await query(
      `INSERT INTO activity_logs (user_name, action_type, entity_type, entity_id, details, ip_address)
       VALUES ('System', 'NEW_PURCHASE_REQUEST', 'purchase_request', $1, $2, $3)`,
      [
        requestId,
        JSON.stringify({
          packageName: pkg.title,
          customerName: fullName,
          company: businessName,
          quotedPrice: finalPrice,
          coupon: appliedCoupon?.code,
        }),
        ipAddress,
      ]
    );

    // 10. Record conversion event in conversion_events
    try {
      await query(
        `INSERT INTO conversion_events 
          (event_id, session_id, event_name, page_url, package_id, utm_source, utm_medium, utm_campaign, ip_address, user_agent, metadata)
         VALUES ($1, $2, 'purchase_request', $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          eventId,
          sessionId || null,
          sourcePage || '/packages',
          pkg.id,
          utmSource || null,
          utmMedium || null,
          utmCampaign || null,
          ipAddress,
          userAgent,
          JSON.stringify({
            requestId,
            packageName: pkg.title,
            finalPrice,
            couponCode: appliedCoupon?.code,
          }),
        ]
      );
    } catch (convErr) {
      console.error('Error recording purchase conversion event:', convErr);
    }

    // 11. Create admin notification
    try {
      await query(
        `INSERT INTO admin_notifications (type, title, message, link, severity)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          'purchase_request',
          `New Purchase Request: ${businessName.trim()}`,
          `${fullName.trim()} requested "${pkg.title}" quotation for ${pkg.currency_symbol || '৳'}${finalPrice.toLocaleString()}`,
          `/admin/purchase-requests`,
          'critical',
        ]
      );
    } catch (notifErr) {
      console.error('Error creating admin notification:', notifErr);
    }

    // 12. Dispatch server-side marketing events (Meta CAPI Lead event, GA4, Webhook)
    dispatchMarketingEvent({
      eventName: 'Lead',
      eventId,
      pageUrl: sourcePage || 'https://totodevelopment.com/packages',
      clientIp: ipAddress,
      userAgent,
      sessionId,
      email: email.trim(),
      phone: whatsappNumber.trim(),
      customData: {
        requestId,
        packageName: pkg.title,
        packageId: pkg.id,
        value: finalPrice,
        currency: pkg.currency || 'BDT',
        couponCode: appliedCoupon?.code,
      },
    }).catch((e) => console.error('Error dispatching Lead event:', e));

    // 13. Resolve active WhatsApp agent for immediate follow-up conversation link
    const activeWA = await resolveActiveWhatsAppNumber();
    const cleanPhone = activeWA.phoneNumber.replace(/[^\d+]/g, '');
    const prefilledText = encodeURIComponent(
      `Hello TOTO Development! I just submitted an official enquiry for ${pkg.title} (Request ID: ${requestId}). My company is ${businessName.trim()}. Let's discuss!`
    );
    const whatsappRedirectUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${prefilledText}`;

    return NextResponse.json({
      success: true,
      requestId,
      packageName: pkg.title,
      quotedPrice: finalPrice,
      currencySymbol: pkg.currency_symbol || '৳',
      appliedCoupon: appliedCoupon ? appliedCoupon.code : null,
      discountAmount: couponDiscountAmount,
      message:
        'Thank you for your interest in TOTO Development. Your request has been received successfully. Our team will contact you shortly.',
      whatsappRedirectUrl,
      eventId,
    });
  } catch (err: any) {
    console.error('Purchase request submission error:', err);
    return NextResponse.json(
      { error: 'Failed to process purchase request. Please try again.' },
      { status: 500 }
    );
  }
}
