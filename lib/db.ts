import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema"

const databaseUrl = process.env.TURSO_DATABASE_URL || "file:local.db"
const authToken = process.env.TURSO_AUTH_TOKEN

export const client = createClient({
  url: databaseUrl,
  authToken,
})

export const db = drizzle(client, { schema })

