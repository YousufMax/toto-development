const { Pool } = require('pg');

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:Yousuf@localhost:5432/toto_agency';

const pool = new Pool({
  connectionString,
});

async function runEnterpriseMigration() {
  console.log('--- Starting Enterprise Upgrade Migration ---');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Upgrade whatsapp_agents with soft delete & intelligence metrics
    console.log('Upgrading whatsapp_agents table...');
    await client.query(`
      ALTER TABLE whatsapp_agents 
      ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE,
      ADD COLUMN IF NOT EXISTS unique_clickers INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS conversations_count INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS conversions_count INTEGER DEFAULT 0;
    `);

    // 2. Upgrade whatsapp_clicks with granular intelligence tracking
    console.log('Upgrading whatsapp_clicks table...');
    await client.query(`
      ALTER TABLE whatsapp_clicks
      ADD COLUMN IF NOT EXISTS event_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS session_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS package_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS utm_source VARCHAR(100),
      ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(100),
      ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(100),
      ADD COLUMN IF NOT EXISTS device_category VARCHAR(30);
    `);

    // 3. Create Coupons table
    console.log('Creating coupons table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        description TEXT,
        discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
        discount_value NUMERIC(12, 2) NOT NULL,
        applicable_package_ids JSONB DEFAULT '[]'::jsonb,
        min_order_amount NUMERIC(12, 2) DEFAULT 0.00,
        max_discount_amount NUMERIC(12, 2),
        total_usage_limit INTEGER,
        used_count INTEGER DEFAULT 0,
        per_customer_limit INTEGER DEFAULT 1,
        start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        expiry_date TIMESTAMP WITH TIME ZONE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create Coupon Redemptions table
    console.log('Creating coupon_redemptions table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS coupon_redemptions (
        id SERIAL PRIMARY KEY,
        coupon_id INTEGER NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
        coupon_code VARCHAR(50) NOT NULL,
        purchase_request_id VARCHAR(50) REFERENCES purchase_requests(id) ON DELETE SET NULL,
        package_id VARCHAR(100),
        customer_email VARCHAR(255),
        customer_phone VARCHAR(50),
        discount_amount NUMERIC(12, 2) NOT NULL,
        original_price NUMERIC(12, 2) NOT NULL,
        final_price NUMERIC(12, 2) NOT NULL,
        status VARCHAR(20) DEFAULT 'applied' CHECK (status IN ('applied', 'verified', 'cancelled')),
        ip_address VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Upgrade purchase_requests with coupon and attribution fields
    console.log('Upgrading purchase_requests table...');
    await client.query(`
      ALTER TABLE purchase_requests
      ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50),
      ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(12, 2) DEFAULT 0.00,
      ADD COLUMN IF NOT EXISTS original_price NUMERIC(12, 2),
      ADD COLUMN IF NOT EXISTS event_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS session_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS device_category VARCHAR(30),
      ADD COLUMN IF NOT EXISTS utm_source VARCHAR(100),
      ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(100),
      ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(100);
    `);

    // 6. Create Marketing Integrations table
    console.log('Creating marketing_integrations table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS marketing_integrations (
        id SERIAL PRIMARY KEY,
        provider VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        is_enabled BOOLEAN DEFAULT FALSE,
        config_json JSONB DEFAULT '{}'::jsonb,
        status VARCHAR(30) DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'configuration_error')),
        last_success_at TIMESTAMP WITH TIME ZONE,
        last_error_at TIMESTAMP WITH TIME ZONE,
        last_error_message TEXT,
        test_status VARCHAR(50),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 7. Create Marketing Events Log table
    console.log('Creating marketing_events_log table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS marketing_events_log (
        id SERIAL PRIMARY KEY,
        event_id VARCHAR(100) NOT NULL,
        provider VARCHAR(50) NOT NULL,
        event_name VARCHAR(100) NOT NULL,
        status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'failed', 'pending')),
        payload_json JSONB,
        response_json JSONB,
        error_message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8. Create Conversion Events table (Granular Funnel & Journey Analytics)
    console.log('Creating conversion_events table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS conversion_events (
        id SERIAL PRIMARY KEY,
        event_id VARCHAR(100) UNIQUE NOT NULL,
        session_id VARCHAR(100),
        visitor_id VARCHAR(100),
        event_type VARCHAR(50) NOT NULL,
        page_url VARCHAR(500),
        source_page VARCHAR(200),
        package_id VARCHAR(100),
        package_name VARCHAR(200),
        agent_id INTEGER REFERENCES whatsapp_agents(id) ON DELETE SET NULL,
        phone_number VARCHAR(50),
        coupon_code VARCHAR(50),
        quoted_price NUMERIC(12, 2),
        traffic_source VARCHAR(100),
        utm_source VARCHAR(100),
        utm_medium VARCHAR(100),
        utm_campaign VARCHAR(100),
        utm_content VARCHAR(100),
        utm_term VARCHAR(100),
        referrer_url VARCHAR(500),
        device_category VARCHAR(30),
        browser_name VARCHAR(50),
        os_name VARCHAR(50),
        ip_address VARCHAR(100),
        metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 9. Create Admin Notifications table
    console.log('Creating admin_notifications table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_notifications (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        link_url VARCHAR(255),
        is_read BOOLEAN DEFAULT FALSE,
        severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical', 'success')),
        metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 10. Performance Indexes
    console.log('Adding performance indexes...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_whatsapp_agents_deleted ON whatsapp_agents(is_deleted);
      CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
      CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
      CREATE INDEX IF NOT EXISTS idx_marketing_events_log_id ON marketing_events_log(event_id);
      CREATE INDEX IF NOT EXISTS idx_marketing_events_created ON marketing_events_log(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_conversion_events_type_time ON conversion_events(event_type, created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_conversion_events_agent ON conversion_events(agent_id, created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_conversion_events_session ON conversion_events(session_id);
      CREATE INDEX IF NOT EXISTS idx_admin_notifications_unread ON admin_notifications(is_read, created_at DESC);
    `);

    // 11. Seed Default Marketing Integrations
    console.log('Seeding initial marketing integration entries...');
    const defaultIntegrations = [
      {
        provider: 'meta_pixel',
        name: 'Meta Pixel (Browser Tracking)',
        config: { pixel_id: '', enable_pageview: true, enable_viewcontent: true, enable_contact: true, enable_lead: true },
        status: 'disconnected',
      },
      {
        provider: 'meta_capi',
        name: 'Meta Conversions API (Server-Side CAPI)',
        config: { pixel_id: '', access_token: '', test_event_code: '', enable_deduplication: true },
        status: 'disconnected',
      },
      {
        provider: 'google_analytics_4',
        name: 'Google Analytics 4 (GA4)',
        config: { measurement_id: '', api_secret: '', enable_enhanced_measurement: true },
        status: 'disconnected',
      },
      {
        provider: 'google_tag_manager',
        name: 'Google Tag Manager (GTM)',
        config: { container_id: '' },
        status: 'disconnected',
      },
      {
        provider: 'google_ads',
        name: 'Google Ads Conversion Tracking',
        config: { conversion_id: '', conversion_label: '' },
        status: 'disconnected',
      },
      {
        provider: 'custom_webhook',
        name: 'Custom Webhook Integration',
        config: { webhook_url: '', secret_key: '', events: ['whatsapp_click', 'purchase_request', 'coupon_redeemed'] },
        status: 'disconnected',
      },
      {
        provider: 'whatsapp_business',
        name: 'WhatsApp Business Platform (Official Cloud API)',
        config: { app_id: '', phone_number_id: '', waba_id: '', access_token: '', is_connected: false },
        status: 'disconnected',
      },
    ];

    for (const item of defaultIntegrations) {
      await client.query(`
        INSERT INTO marketing_integrations (provider, name, is_enabled, config_json, status)
        VALUES ($1, $2, false, $3, $4)
        ON CONFLICT (provider) DO NOTHING;
      `, [item.provider, item.name, JSON.stringify(item.config), item.status]);
    }

    // 12. Seed Default Promotional Coupons
    console.log('Seeding initial agency marketing coupons...');
    const seedCoupons = [
      {
        code: 'TOTO20',
        description: '20% Welcome Launch Discount on Any Agency Package',
        discount_type: 'percentage',
        discount_value: 20.00,
        applicable_package_ids: [],
        total_usage_limit: 100,
        per_customer_limit: 1,
        is_active: true,
      },
      {
        code: 'ENTERPRISE5000',
        description: 'Flat ৳5,000 Off on Custom Software & Large Platforms',
        discount_type: 'fixed',
        discount_value: 5000.00,
        applicable_package_ids: ['custom-software-business', 'custom-software-enterprise'],
        total_usage_limit: 50,
        per_customer_limit: 1,
        is_active: true,
      },
      {
        code: 'VIPGROWTH',
        description: '15% Off Digital Marketing & Paid Ad Scaling Retainers',
        discount_type: 'percentage',
        discount_value: 15.00,
        applicable_package_ids: ['paid-ads-starter', 'paid-ads-growth', 'digital-marketing-pro'],
        total_usage_limit: 150,
        per_customer_limit: 1,
        is_active: true,
      },
    ];

    for (const c of seedCoupons) {
      await client.query(`
        INSERT INTO coupons (code, description, discount_type, discount_value, applicable_package_ids, total_usage_limit, per_customer_limit, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (code) DO NOTHING;
      `, [c.code, c.description, c.discount_type, c.discount_value, JSON.stringify(c.applicable_package_ids), c.total_usage_limit, c.per_customer_limit, c.is_active]);
    }

    // 13. Seed sample conversion and tracking events for analytics engine
    console.log('Seeding initial conversion journey events...');
    const sampleAgents = await client.query('SELECT id, phone_number, agent_name FROM whatsapp_agents LIMIT 6');
    if (sampleAgents.rows.length > 0) {
      const a1 = sampleAgents.rows[0];
      const a2 = sampleAgents.rows[1] || a1;

      const events = [
        {
          eventId: 'evt_init_001',
          type: 'whatsapp_click',
          sourcePage: '/pricing/',
          pkgId: 'web-development-growth',
          pkgName: 'Standard Growth Website',
          agentId: a1.id,
          phone: a1.phone_number,
          trafficSource: 'facebook',
          utmSource: 'facebook_ads',
          utmMedium: 'cpc',
          utmCampaign: 'october_agency_scale',
          device: 'mobile',
        },
        {
          eventId: 'evt_init_002',
          type: 'whatsapp_click',
          sourcePage: '/services/custom-software/',
          pkgId: 'custom-software-business',
          pkgName: 'Custom ERP & Business Portal',
          agentId: a2.id,
          phone: a2.phone_number,
          trafficSource: 'google_search',
          utmSource: 'google',
          utmMedium: 'organic',
          utmCampaign: '',
          device: 'desktop',
        },
        {
          eventId: 'evt_init_003',
          type: 'enquiry_submit',
          sourcePage: '/pricing/',
          pkgId: 'web-development-growth',
          pkgName: 'Standard Growth Website',
          agentId: a1.id,
          phone: a1.phone_number,
          trafficSource: 'facebook',
          utmSource: 'facebook_ads',
          utmMedium: 'cpc',
          utmCampaign: 'october_agency_scale',
          device: 'mobile',
          quotedPrice: 38000,
        },
        {
          eventId: 'evt_init_004',
          type: 'verified_conversion',
          sourcePage: '/pricing/',
          pkgId: 'web-development-growth',
          pkgName: 'Standard Growth Website',
          agentId: a1.id,
          phone: a1.phone_number,
          trafficSource: 'facebook',
          utmSource: 'facebook_ads',
          utmMedium: 'cpc',
          utmCampaign: 'october_agency_scale',
          device: 'mobile',
          quotedPrice: 38000,
        },
      ];

      for (const ev of events) {
        await client.query(`
          INSERT INTO conversion_events (
            event_id, event_type, source_page, package_id, package_name, agent_id, phone_number,
            traffic_source, utm_source, utm_medium, utm_campaign, device_category, quoted_price
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          ON CONFLICT (event_id) DO NOTHING;
        `, [
          ev.eventId, ev.type, ev.sourcePage, ev.pkgId, ev.pkgName, ev.agentId, ev.phone,
          ev.trafficSource, ev.utmSource, ev.utmMedium, ev.utmCampaign, ev.device, ev.quotedPrice || null
        ]);
      }
    }

    // 14. Seed Initial Smart Notification
    await client.query(`
      INSERT INTO admin_notifications (type, title, message, link_url, severity)
      VALUES 
        ('info', 'Enterprise Platform Upgrade Live', 'WhatsApp Intelligence, Marketing Integrations & Coupon Management active.', '/admin/marketing-integrations/', 'info'),
        ('new_enquiry', 'New Purchase Request Received', 'Client Shafiul Islam requested Corporate Custom Platform.', '/admin/purchase-requests/', 'success')
      ON CONFLICT DO NOTHING;
    `);

    await client.query('COMMIT');
    console.log('--- Enterprise Migration Completed Successfully! ---');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed, rolled back:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runEnterpriseMigration();
