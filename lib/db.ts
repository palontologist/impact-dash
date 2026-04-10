import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema"

/**
 * Database configuration - Use combined URL format with auth token
 */
const getDbUrl = () => {
  const baseUrl = process.env.TURSO_DATABASE_URL || "file:local.db"
  const authToken = process.env.TURSO_AUTH_TOKEN
  
  // For Turso, use combined URL format with auth token
  if (baseUrl.startsWith('libsql://')) {
    return `${baseUrl}?authToken=${authToken}`
  }
  
  return baseUrl
}

const databaseUrl = getDbUrl()

/**
 * Turso client instance
 */
export const client = createClient({
  url: databaseUrl,
})

/**
 * Drizzle database instance with schema
 */
export const db = drizzle(client, { schema })

/**
 * Database type for TypeScript inference
 */
export type Database = typeof db
