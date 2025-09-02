import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema"

/**
 * Database configuration
 */
const databaseUrl = process.env.TURSO_DATABASE_URL || "file:local.db"
const authToken = process.env.TURSO_AUTH_TOKEN

/**
 * Turso client instance
 */
export const client = createClient({
  url: databaseUrl,
  authToken,
})

/**
 * Drizzle database instance with schema
 * Pre-configured with Turso client and all table schemas
 */
export const db = drizzle(client, { schema })

/**
 * Database type for TypeScript inference
 */
export type Database = typeof db

