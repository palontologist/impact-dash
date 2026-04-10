import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';

const client = createClient({
  url: 'libsql://impact-palontologist.aws-us-east-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTY4Mjk0ODAsImlkIjoiYzQ3MzAzNzgtY2M1ZS00Nzk3LWFlN2QtNDQ4MzkwMDAxYzU1IiwicmlkIjoiM2U5ZWJhNjYtMGQ4NC00NzFiLWExMzgtNThkZjc2NDkxYTVkIn0.7Vlcfdm5oASLOHxoBiVjn5Stekf8EUah4mfgWpMBXdBcwtHjXpMv_DJQb2omepGC4ywspWr021WooPUAZDhqBA'
});

const db = drizzle(client);

// Import schema inline for testing
const userProfiles = {
  select: () => ({
    where: () => ({
      limit: () => Promise.resolve([{ id: 1, clerk_user_id: 'test' }])
    })
  })
};

async function test() {
  console.log('Testing Drizzle with Turso...');
  
  // Direct client works
  const r1 = await client.execute('SELECT 1');
  console.log('1. Direct client: ✓', r1.rows);
  
  // Test simple drizzle query
  try {
    const r2 = await db.select().from(
      // @ts-ignore - inline mock for testing
      { _brand: 'user_profiles', columns: ['id', 'clerk_user_id'], tableName: 'user_profiles' }
    ).limit(1);
    console.log('2. Drizzle raw:', r2);
  } catch (e) {
    console.log('2. Drizzle failed:', e.message);
  }
  
  client.close();
}

test();
