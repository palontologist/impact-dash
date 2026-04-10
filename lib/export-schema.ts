import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
import { userProfiles } from "./schema" // Assuming this is the relative path

export const exportLogs = sqliteTable("export_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  organizationId: integer("organization_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull().default(sql`(strftime('%s','now'))`),
  commodityType: text("commodity_type").notNull(), // e.g., 'Wheat', 'Copper', 'Fuel'
  weight: real("weight").notNull(), // in kg or tons
  weightUnit: text("weight_unit").notNull(), // 'kg', 'tons'
  transportMode: text("transport_mode").notNull(), // 'truck', 'ship', 'rail', 'air'
  distanceKm: real("distance_km").notNull(),
  carbonEmitted: real("carbon_emitted").notNull(), // calculated CO2e
  status: text("status").default("pending"), // 'pending', 'verified', 'flagged'
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export type InsertExportLog = typeof exportLogs.$inferInsert
export type SelectExportLog = typeof exportLogs.$inferSelect
