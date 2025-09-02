import { config as loadEnv } from 'dotenv'
// Load .env.local first (if present), then fallback to .env
loadEnv({ path: '.env.local' })
loadEnv()
import type { Config } from "drizzle-kit"

export default {
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config

