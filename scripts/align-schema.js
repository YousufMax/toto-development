const { Client } = require('pg');

async function alignSchema() {
  const client = new Client({
    connectionString: 'postgresql://postgres:Yousuf@localhost:5432/toto_agency',
  });
  await client.connect();
  console.log('Aligning database schema for enterprise compatibility...');

  // 1. marketing_integrations
  await client.query(`
    ALTER TABLE marketing_integrations 
    ADD COLUMN IF NOT EXISTS platform VARCHAR(60),
    ADD COLUMN IF NOT EXISTS config JSONB DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS last_event_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN IF NOT EXISTS events_count_30d INT DEFAULT 0;
  `);
  await client.query(`
    UPDATE marketing_integrations 
    SET platform = provider 
    WHERE platform IS NULL;

    UPDATE marketing_integrations 
    SET config = config_json 
    WHERE config IS NULL OR config = '{}'::jsonb;
  `);

  // 2. coupons
  await client.query(`
    ALTER TABLE coupons
    ADD COLUMN IF NOT EXISTS times_used INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS usage_limit_total INT,
    ADD COLUMN IF NOT EXISTS starts_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN IF NOT EXISTS allowed_package_ids JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS allowed_service_slugs JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS package_restriction VARCHAR(30) DEFAULT 'all',
    ADD COLUMN IF NOT EXISTS usage_limit_per_user INT DEFAULT 1,
    ADD COLUMN IF NOT EXISTS notes TEXT;
  `);
  await client.query(`
    UPDATE coupons 
    SET times_used = COALESCE(used_count, 0),
        usage_limit_total = total_usage_limit,
        starts_at = start_date,
        expires_at = expiry_date,
        allowed_package_ids = applicable_package_ids;
  `);

  // 3. conversion_events
  await client.query(`
    ALTER TABLE conversion_events
    ADD COLUMN IF NOT EXISTS event_name VARCHAR(60),
    ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
  `);
  await client.query(`
    UPDATE conversion_events 
    SET event_name = event_type 
    WHERE event_name IS NULL;
  `);

  // 4. admin_notifications
  await client.query(`
    ALTER TABLE admin_notifications
    ADD COLUMN IF NOT EXISTS link VARCHAR(255);
  `);
  await client.query(`
    UPDATE admin_notifications 
    SET link = link_url 
    WHERE link IS NULL;
  `);

  // 5. marketing_events_log
  await client.query(`
    ALTER TABLE marketing_events_log
    ADD COLUMN IF NOT EXISTS integration_id INT,
    ADD COLUMN IF NOT EXISTS payload JSONB,
    ADD COLUMN IF NOT EXISTS http_status INT,
    ADD COLUMN IF NOT EXISTS response_body TEXT;
  `);

  console.log('✅ Schema alignment successfully applied!');
  await client.end();
}

alignSchema().catch(e => {
  console.error('Alignment error:', e);
  process.exit(1);
});
