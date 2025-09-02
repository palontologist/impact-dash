import type { Config } from "drizzle-kit"

export default {
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: (process.env.TURSO_DATABASE_URL ?? "file:local.db") as string,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config

