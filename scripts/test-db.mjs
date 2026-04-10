import { createClient } from '@libsql/client';

const client = createClient({
  url: 'libsql://impact-palontologist.aws-us-east-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTY4Mjk0ODAsImlkIjoiYzQ3MzAzNzgtY2M1ZS00Nzk3LWFlN2QtNDQ4MzkwMDAxYzU1IiwicmlkIjoiM2U5ZWJhNjYtMGQ4NC00NzFiLWExMzgtNThkZjc2NDkxYTVkIn0.7Vlcfdm5oASLOHxoBiVjn5Stekf8EUah4mfgWpMBXdBcwtHjXpMv_DJQb2omepGC4ywspWr021WooPUAZDhqBA'
});

async function test() {
  try {
    const result = await client.execute('SELECT * FROM export_logs');
    console.log('✓ Query successful!');
    console.log('Rows:', result.rows.length);
    result.rows.forEach(row => {
      console.log(`  - ${row.commodity_type}: ${row.carbon_emitted} kg CO2e`);
    });
  } catch (e) {
    console.error('✗ Query failed:', e.message);
  }
  client.close();
}

test();
