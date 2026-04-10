import { createClient } from '@libsql/client';

const client = createClient({
  url: 'libsql://impact-palontologist.aws-us-east-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTY4Mjk0ODAsImlkIjoiYzQ3MzAzNzgtY2M1ZS00Nzk3LWFlN2QtNDQ4MzkwMDAxYzU1IiwicmlkIjoiM2U5ZWJhNjYtMGQ4NC00NzFiLWExMzgtNThkZjc2NDkxYTVkIn0.7Vlcfdm5oASLOHxoBiVjn5Stekf8EUah4mfgWpMBXdBcwtHjXpMv_DJQb2omepGC4ywspWr021WooPUAZDhqBA'
});

async function setup() {
  try {
    // Create export_logs table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS export_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        organization_id INTEGER NOT NULL,
        commodity_type TEXT NOT NULL,
        weight REAL NOT NULL,
        weight_unit TEXT NOT NULL,
        transport_mode TEXT NOT NULL,
        distance_km REAL NOT NULL,
        carbon_emitted REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        timestamp INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);
    console.log('✓ export_logs table created');

    // Insert sample data
    const now = Math.floor(Date.now() / 1000);
    await client.execute({
      sql: `INSERT INTO export_logs (organization_id, commodity_type, weight, weight_unit, transport_mode, distance_km, carbon_emitted, status, timestamp, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [1, 'Wheat', 25, 'tons', 'truck', 450, 450.2, 'verified', now - 86400, now, now]
    });
    
    await client.execute({
      sql: `INSERT INTO export_logs (organization_id, commodity_type, weight, weight_unit, transport_mode, distance_km, carbon_emitted, status, timestamp, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [1, 'Copper', 15, 'tons', 'ship', 1200, 180.5, 'verified', now - 172800, now, now]
    });
    
    await client.execute({
      sql: `INSERT INTO export_logs (organization_id, commodity_type, weight, weight_unit, transport_mode, distance_km, carbon_emitted, status, timestamp, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [1, 'Lithium', 5, 'tons', 'air', 8000, 900.0, 'verified', now - 259200, now, now]
    });
    
    console.log('✓ 3 sample shipments inserted');

    // Verify
    const result = await client.execute('SELECT * FROM export_logs');
    console.log('✓ Verified:', result.rows.length, 'rows in export_logs');

    client.close();
    console.log('\n🎉 Turso database setup complete!');
  } catch (err) {
    console.error('Error:', err.message);
    if (err.message.includes('already exists')) {
      console.log('Table already exists, checking data...');
      const result = await client.execute('SELECT * FROM export_logs');
      console.log('✓ Current rows:', result.rows.length);
    }
  }
}

setup();
