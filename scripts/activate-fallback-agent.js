const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:Yousuf@localhost:5432/toto_agency' });
client.connect()
  .then(() => client.query("UPDATE whatsapp_agents SET is_deleted = false, status = 'active', is_fallback = true WHERE id = 6"))
  .then(res => {
    console.log('Updated fallback agent 6. Rows affected:', res.rowCount);
    return client.end();
  })
  .catch(console.error);
