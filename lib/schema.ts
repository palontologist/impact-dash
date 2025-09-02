import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const students = sqliteTable("students", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  location: text("location"),
  cohort: text("cohort"),
  status: text("status").default("Active"),
  avatarUrl: text("avatar_url"),
  enrollmentDate: integer("enrollment_date", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export const progressUpdates = sqliteTable("progress_updates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  studentId: integer("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
  completionRate: integer("completion_rate").notNull(),
  aiLiteracyLevel: text("ai_literacy_level").notNull(),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export const enrollmentStats = sqliteTable("enrollment_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  enrolled: integer("enrolled").notNull(),
  completed: integer("completed").notNull(),
})

export type InsertStudent = typeof students.$inferInsert
export type SelectStudent = typeof students.$inferSelect
export type InsertProgress = typeof progressUpdates.$inferInsert
export type SelectProgress = typeof progressUpdates.$inferSelect
