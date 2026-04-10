import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema"

// Use separate URL and authToken (per Drizzle docs)
const url = process.env.TURSO_DATABASE_URL || process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log('Turso URL:', url ? 'SET' : 'NOT SET');
console.log('Turso Token:', authToken ? 'SET' : 'NOT SET');

// Create client with separate url and authToken
export const client = createClient({
  url: url || "file:local.db",
  authToken: authToken,
});

// Create drizzle instance with connection object
export const db = drizzle(client, { schema });

// Export for raw queries
export { client as rawClient };
export type Database = typeof db;
