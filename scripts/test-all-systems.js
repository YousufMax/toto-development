const { Client } = require('pg');

async function testAllSystems() {
  console.log('================================================================');
  console.log('  TOTO DEVELOPMENT — COMPREHENSIVE END-TO-END TEST SUITE');
  console.log('================================================================');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  const client = new Client({
    connectionString: 'postgresql://postgres:Yousuf@localhost:5432/toto_agency',
  });

  try {
    await client.connect();
    console.log('\n[1/4] POSTGRESQL DATABASE & SCHEMA INTEGRITY:');
    
    // Check packages
    const pkgRes = await client.query('SELECT id, title, regular_price, discounted_price FROM packages ORDER BY id ASC');
    assert(pkgRes.rows.length >= 3, `Packages verified in DB: ${pkgRes.rows.length} packages loaded`);
    pkgRes.rows.forEach(p => console.log(`      * [${p.id}] ${p.title} — Regular: ৳${p.regular_price || '-'}, Discounted: ৳${p.discounted_price || '-'}`));

    // Check WhatsApp agents
    const agentsRes = await client.query('SELECT id, agent_name, phone_number, status, is_default, is_fallback, total_clicks FROM whatsapp_agents WHERE is_deleted = false');
    assert(agentsRes.rows.length >= 2, `Active WhatsApp agents: ${agentsRes.rows.length} agents in rotation`);
    agentsRes.rows.forEach(a => console.log(`      * [${a.id}] ${a.agent_name} (${a.phone_number}) — Status: ${a.status}, Default: ${a.is_default}, Fallback: ${a.is_fallback}`));

    // Check Coupons
    const couponsRes = await client.query('SELECT code, discount_type, discount_value, is_active FROM coupons');
    assert(couponsRes.rows.length >= 1, `Coupons configured: ${couponsRes.rows.length} coupon rules`);
    couponsRes.rows.forEach(c => console.log(`      * ${c.code} (${c.discount_type}: ${c.discount_value}) — Active: ${c.is_active}`));

    // Check Marketing Integrations
    const mktgRes = await client.query('SELECT platform, name, is_enabled, status FROM marketing_integrations');
    assert(mktgRes.rows.length >= 1, `Marketing integrations: ${mktgRes.rows.length} platforms registered`);
  } catch (err) {
    console.error('Database connection failed:', err.message);
    failed++;
  }

  console.log('\n[2/4] PUBLIC API ENDPOINTS & CONVERSION LOGIC:');

  // Test /api/whatsapp/active/
  try {
    const res = await fetch('http://localhost:3000/api/whatsapp/active/');
    const data = await res.json();
    assert(res.status === 200 && data.phoneNumber, `/api/whatsapp/active/ returned active agent: ${data.agentName} (${data.phoneNumber})`);
  } catch (e) {
    assert(false, `/api/whatsapp/active/ failed: ${e.message}`);
  }

  // Test /api/marketing/public-config/
  try {
    const res = await fetch('http://localhost:3000/api/marketing/public-config/');
    assert(res.status === 200, `/api/marketing/public-config/ returned HTTP 200`);
  } catch (e) {
    assert(false, `/api/marketing/public-config/ failed: ${e.message}`);
  }

  // Test /api/coupons/validate/ with valid coupon
  try {
    const res = await fetch('http://localhost:3000/api/coupons/validate/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'TOTO20', packageId: 1, basePrice: 12499 }),
    });
    const data = await res.json();
    assert(res.status === 200 && data.valid && data.discountAmount > 0, `Coupon TOTO20 validated: Discount ৳${data.discountAmount}, Final: ৳${data.finalPrice}`);
  } catch (e) {
    assert(false, `Coupon validation failed: ${e.message}`);
  }

  // Test /api/coupons/validate/ with invalid coupon
  try {
    const res = await fetch('http://localhost:3000/api/coupons/validate/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'INVALID_CODE_999', packageId: 1, basePrice: 12499 }),
    });
    const data = await res.json();
    assert(res.status === 200 && !data.valid, `Invalid coupon correctly rejected with message: "${data.message}"`);
  } catch (e) {
    assert(false, `Invalid coupon rejection failed: ${e.message}`);
  }

  // Test /api/packages/purchase/ with Bengali name "সোনালীকা" & coupon
  try {
    const purchasePayload = {
      packageId: 'sonalika',
      packageName: 'সোনালীকা (Sonalika)',
      fullName: 'System Test User',
      whatsappNumber: '01811223344',
      email: `test.suite.${Date.now()}@totodev.com`,
      businessName: 'Test Automation Ltd',
      projectRequirements: 'Automated E2E purchase verification',
      couponCode: 'TOTO20',
      regularPrice: 15499,
      finalPrice: 9999,
      discountAmount: 2500,
    };
    const res = await fetch('http://localhost:3000/api/packages/purchase/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchasePayload),
    });
    const data = await res.json();
    assert(res.status === 200 && data.success && data.requestId && data.whatsappRedirectUrl, `Purchase request accepted: ID ${data.requestId}, WhatsApp redirect URL generated: ${data.whatsappRedirectUrl.slice(0, 48)}...`);
  } catch (e) {
    assert(false, `Package purchase test failed: ${e.message}`);
  }

  // Test /api/whatsapp/track/
  try {
    const trackPayload = {
      source: 'test_suite_runner',
      packageName: 'Commercial Video & Motion',
      packagePrice: 12499,
      pageUrl: 'http://localhost:3000/services/video-motion/',
      deviceCategory: 'desktop',
    };
    const res = await fetch('http://localhost:3000/api/whatsapp/track/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackPayload),
    });
    const data = await res.json();
    assert(res.status === 200 && data.success, `/api/whatsapp/track/ logged click event: ${data.eventId || 'OK'}`);
  } catch (e) {
    assert(false, `WhatsApp click tracking failed: ${e.message}`);
  }

  console.log('\n[3/4] ADMIN AUTHENTICATION & INTELLIGENCE APIs:');
  let authCookie = '';
  try {
    const res = await fetch('http://localhost:3000/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@totodev.com', password: 'admin123456' }),
    });
    const data = await res.json();
    authCookie = res.headers.get('set-cookie') || '';
    assert(res.status === 200 && data.user?.role === 'super_admin', `Admin login successful: ${data.user?.name} (${data.user?.email})`);
  } catch (e) {
    assert(false, `Admin login failed: ${e.message}`);
  }

  const authHeaders = {
    'Content-Type': 'application/json',
    ...(authCookie ? { Cookie: authCookie } : {}),
  };

  try {
    const res = await fetch('http://localhost:3000/api/admin/whatsapp/intelligence/?period=30d', { headers: authHeaders });
    const data = await res.json();
    assert(res.status === 200 && Array.isArray(data.agents), `/api/admin/whatsapp/intelligence/ returned ${data.agents?.length} agents metrics`);
  } catch (e) {
    assert(false, `WhatsApp intelligence failed: ${e.message}`);
  }

  try {
    const res = await fetch('http://localhost:3000/api/admin/analytics/conversions/?period=30d', { headers: authHeaders });
    const data = await res.json();
    assert(res.status === 200 && Array.isArray(data.funnel), `/api/admin/analytics/conversions/ returned ${data.funnel?.length} funnel stages`);
  } catch (e) {
    assert(false, `Conversion analytics failed: ${e.message}`);
  }

  try {
    const res = await fetch('http://localhost:3000/api/admin/overview/', { headers: authHeaders });
    const data = await res.json();
    assert(res.status === 200, `/api/admin/overview/ returned dashboard overview metrics status 200`);
  } catch (e) {
    assert(false, `Admin overview metrics failed: ${e.message}`);
  }

  console.log('\n[4/4] PUBLIC PAGES HTML RENDER STATUS & NEW COVERFLOW:');
  const pagesToTest = [
    { path: '/', label: 'Home Page' },
    { path: '/services/', label: 'All Services Hub Page' },
    { path: '/services/video-motion/', label: 'Commercial Video & Motion Page (Glassy Coverflow)', checkString: 'COMMERCIAL SHOWCASE' },
    { path: '/services/brand-design/', label: 'Brand Design & Visual Systems' },
    { path: '/services/paid-ads/', label: 'Paid Ads Acquisition Page' },
    { path: '/services/web-development/', label: 'Web Development Page' },
    { path: '/services/custom-software/', label: 'Custom Software Page' },
    { path: '/services/digital-marketing/', label: 'Digital Marketing Page' },
    { path: '/portfolio/', label: 'Portfolio Page' },
    { path: '/about/', label: 'About Page' },
    { path: '/contact/', label: 'Contact Page' },
    { path: '/admin/', label: 'Admin Dashboard Page' },
  ];

  for (const page of pagesToTest) {
    try {
      const res = await fetch(`http://localhost:3000${page.path}`);
      const text = await res.text();
      let ok = res.status === 200;
      if (page.checkString) {
        ok = ok && text.includes(page.checkString);
      }
      assert(ok, `Page ${page.path} (${page.label}) rendered HTTP ${res.status}`);
    } catch (e) {
      assert(false, `Page ${page.path} render failed: ${e.message}`);
    }
  }

  if (client) await client.end();

  console.log('\n================================================================');
  console.log(`  TEST RESULTS SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

testAllSystems().catch((e) => {
  console.error('Fatal test runner error:', e);
  process.exit(1);
});
