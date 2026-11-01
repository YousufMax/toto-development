const { Client } = require('pg');

async function debugSchemaAndApis() {
  const client = new Client({
    connectionString: 'postgresql://postgres:Yousuf@localhost:5432/toto_agency',
  });
  await client.connect();

  console.log('--- PACKAGES COLUMNS ---');
  const cols = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'packages'
  `);
  console.log(cols.rows.map(c => `${c.column_name} (${c.data_type})`));

  console.log('\n--- SAMPLE PACKAGES ROWS ---');
  const pkgs = await client.query('SELECT * FROM packages LIMIT 3');
  console.log(pkgs.rows);

  await client.end();

  console.log('\n--- /api/whatsapp/active/ RESPONSE ---');
  try {
    const res = await fetch('http://localhost:3000/api/whatsapp/active/');
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }

  console.log('\n--- /api/marketing/public-config/ RESPONSE ---');
  try {
    const res = await fetch('http://localhost:3000/api/marketing/public-config/');
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }

  console.log('\n--- /api/packages/purchase/ RESPONSE ---');
  try {
    const res = await fetch('http://localhost:3000/api/packages/purchase/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'sonalika',
        packageName: 'সোনালীকা (Sonalika)',
        customerName: 'Debug User',
        customerPhone: '01811223344',
        customerEmail: `debug.${Date.now()}@totodev.com`,
        companyName: 'Debug Corp',
      }),
    });
    const data = await res.json();
    console.log('Status:', res.status, data);
  } catch (e) {
    console.error(e.message);
  }
}

debugSchemaAndApis();
