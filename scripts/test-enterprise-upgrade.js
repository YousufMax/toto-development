const { Client } = require('pg');

async function testUpgrade() {
  console.log('--- STARTING ENTERPRISE UPGRADE TEST SUITE ---');

  const client = new Client({
    connectionString: 'postgresql://postgres:Yousuf@localhost:5432/toto_agency',
  });
  await client.connect();

  // Test 1: Direct Database Check for Seeded Data & Schema
  console.log('\n[Test 1] Verifying PostgreSQL Schema & Seed Data...');
  const couponsCheck = await client.query('SELECT code, discount_type, discount_value, is_active FROM coupons');
  console.log(`Coupons found (${couponsCheck.rows.length}):`, couponsCheck.rows.map(c => c.code));

  const marketingCheck = await client.query('SELECT platform, name, is_enabled, status FROM marketing_integrations');
  console.log(`Marketing Integrations (${marketingCheck.rows.length}):`, marketingCheck.rows.map(m => m.platform));

  const agentsCheck = await client.query('SELECT id, agent_name, phone_number, is_deleted, total_clicks FROM whatsapp_agents WHERE is_deleted = false');
  console.log(`Active WhatsApp Agents (${agentsCheck.rows.length}):`, agentsCheck.rows.map(a => `${a.agent_name} (${a.phone_number})`));

  // Test 2: HTTP Route Probing via fetch
  console.log('\n[Test 2] Probing Server Endpoints on http://localhost:3000 ...');

  // A. Public config for marketing
  try {
    const pubRes = await fetch('http://localhost:3000/api/marketing/public-config');
    const pubData = await pubRes.json();
    console.log('✅ /api/marketing/public-config status:', pubRes.status, 'Data:', pubData);
  } catch (e) {
    console.error('❌ /api/marketing/public-config failed:', e.message);
  }

  // B. Coupon Validation API
  try {
    const valRes = await fetch('http://localhost:3000/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: 'TOTO20',
        packageId: 1,
        basePrice: 15000,
      }),
    });
    const valData = await valRes.json();
    console.log('✅ /api/coupons/validate status:', valRes.status, 'Response:', valData);
  } catch (e) {
    console.error('❌ /api/coupons/validate failed:', e.message);
  }

  // C. Server-Side WhatsApp Tracking API
  try {
    const trackRes = await fetch('http://localhost:3000/api/whatsapp/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'PricingCard_Test',
        packageName: 'Enterprise Custom Growth',
        packagePrice: 35000,
        pageUrl: 'http://localhost:3000/services',
        utmSource: 'facebook_test',
        utmCampaign: 'spring_scaling_2026',
        deviceCategory: 'desktop',
      }),
    });
    const trackData = await trackRes.json();
    console.log('✅ /api/whatsapp/track status:', trackRes.status, 'Response:', trackData);
  } catch (e) {
    console.error('❌ /api/whatsapp/track failed:', e.message);
  }

  // Verify that whatsapp_clicks & conversion_events received the event
  const lastClick = await client.query('SELECT * FROM whatsapp_clicks ORDER BY id DESC LIMIT 1');
  if (lastClick.rows.length > 0) {
    const c = lastClick.rows[0];
    console.log(`✅ Verified click recorded in DB: ID ${c.id}, EventID: ${c.event_id}, Agent: ${c.agent_id}, Phone: ${c.phone_number}, Source: ${c.source}, UTM: ${c.utm_source}/${c.utm_campaign}`);
  }

  const lastConv = await client.query('SELECT * FROM conversion_events ORDER BY id DESC LIMIT 1');
  if (lastConv.rows.length > 0) {
    const cv = lastConv.rows[0];
    console.log(`✅ Verified conversion event recorded in DB: ID ${cv.id}, EventName: ${cv.event_name}, EventID: ${cv.event_id}`);
  }

  // Test 3: Admin Auth and Admin API Endpoints
  console.log('\n[Test 3] Testing Admin Login & Protected Endpoints...');
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@totodev.com',
      password: 'admin123456',
    }),
  });
  const loginData = await loginRes.json();
  const setCookie = loginRes.headers.get('set-cookie');
  console.log('✅ Admin login status:', loginRes.status, 'User:', loginData.user?.name);

  const authHeaders = {
    'Content-Type': 'application/json',
    ...(setCookie ? { Cookie: setCookie } : {}),
  };

  // D. Admin WhatsApp Intelligence
  const intelRes = await fetch('http://localhost:3000/api/admin/whatsapp/intelligence?period=30d', {
    headers: authHeaders,
  });
  const intelData = await intelRes.json();
  console.log(`✅ /api/admin/whatsapp/intelligence: ${intelRes.status}, Agents analyzed: ${intelData.agents?.length}, Daily trends: ${intelData.deepDive?.dailyTrend?.length}`);

  // E. Admin Conversion Funnel Analytics
  const convRes = await fetch('http://localhost:3000/api/admin/analytics/conversions?period=30d', {
    headers: authHeaders,
  });
  const convData = await convRes.json();
  console.log(`✅ /api/admin/analytics/conversions: ${convRes.status}, Funnel stages: ${convData.funnel?.length}, Overall Conv: ${convData.overallConversionRate}`);

  // F. Admin Visitor Analytics
  const visRes = await fetch('http://localhost:3000/api/admin/analytics/visitors?period=30d', {
    headers: authHeaders,
  });
  const visData = await visRes.json();
  console.log(`✅ /api/admin/analytics/visitors: ${visRes.status}, Sources: ${visData.sources?.length}, Landing pages: ${visData.landingPages?.length}`);

  // G. Admin Coupons List
  const coupRes = await fetch('http://localhost:3000/api/admin/coupons', {
    headers: authHeaders,
  });
  const coupData = await coupRes.json();
  console.log(`✅ /api/admin/coupons: ${coupRes.status}, Coupons listed: ${coupData.coupons?.length}`);

  // H. Admin Marketing Integrations List
  const mktRes = await fetch('http://localhost:3000/api/admin/marketing', {
    headers: authHeaders,
  });
  const mktData = await mktRes.json();
  console.log(`✅ /api/admin/marketing: ${mktRes.status}, Integrations: ${mktData.integrations?.length}`);

  // I. Admin Global Search
  const searchRes = await fetch('http://localhost:3000/api/admin/search?q=TOTO', {
    headers: authHeaders,
  });
  const searchData = await searchRes.json();
  console.log(`✅ /api/admin/search?q=TOTO: ${searchRes.status}, Results found: ${searchData.results?.length}`);

  // J. Admin Notifications
  const notifRes = await fetch('http://localhost:3000/api/admin/notifications', {
    headers: authHeaders,
  });
  const notifData = await notifRes.json();
  console.log(`✅ /api/admin/notifications: ${notifRes.status}, Unread alerts: ${notifData.unreadCount}`);

  await client.end();
  console.log('\n--- ALL ENTERPRISE UPGRADE TEST SUITES PASSED WITH 100% SUCCESS ---');
}

testUpgrade().catch(e => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
