const { Client } = require('pg');

async function fixColumns() {
  const client = new Client({
    connectionString: 'postgresql://postgres:Yousuf@localhost:5432/toto_agency',
  });
  await client.connect();

  console.log('Adding missing columns...');

  await client.query(`
    ALTER TABLE whatsapp_agents 
    ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP WITH TIME ZONE;

    ALTER TABLE coupon_redemptions 
    ADD COLUMN IF NOT EXISTS discount_amount_applied NUMERIC(12, 2);

    UPDATE coupon_redemptions 
    SET discount_amount_applied = discount_amount 
    WHERE discount_amount_applied IS NULL;

    ALTER TABLE marketing_integrations 
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
  `);

  console.log('✅ Columns successfully added and synchronized!');
  await client.end();
}

fixColumns().catch(e => {
  console.error(e);
  process.exit(1);
});
