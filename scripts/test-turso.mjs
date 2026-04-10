import { createClient } from '@libsql/client';

const client = createClient({
  url: 'libsql://impact-palontologist.aws-us-east-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTY4Mjk0ODAsImlkIjoiYzQ3MzAzNzgtY2M1ZS00Nzk3LWFlN2QtNDQ4MzkwMDAxYzU1IiwicmlkIjoiM2U5ZWJhNjYtMGQ4NC00NzFiLWExMzgtNThkZjc2NDkxYTVkIn0.7Vlcfdm5oASLOHxoBiVjn5Stekf8EUah4mfgWpMBXdBcwtHjXpMv_DJQb2omepGC4ywspWr021WooPUAZDhqBA'
});

async function test() {
  try {
    console.log('Testing Turso connection...');
    const result = await client.execute('SELECT 1 as test');
    console.log('✓ Direct query works:', result.rows);
    
    // Test with table
    const profiles = await client.execute('SELECT id, clerk_user_id FROM user_profiles LIMIT 3');
    console.log('✓ Profiles query:', profiles.rows.length, 'rows');
    
    const logs = await client.execute('SELECT id, organization_id FROM export_logs LIMIT 3');
    console.log('✓ Export logs query:', logs.rows.length, 'rows');
    
  } catch (e) {
    console.error('✗ Error:', e.message);
    console.error('Status:', e.status);
  }
  client.close();
}

test();
