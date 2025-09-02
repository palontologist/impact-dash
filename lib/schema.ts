import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

// Students table
export const students = sqliteTable("students", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  age: integer("age"),
  gender: text("gender"), // 'male', 'female', 'other'
  location: text("location"), // 'rural', 'urban'
  county: text("county").notNull(),
  cohort: text("cohort"),
  status: text("status").default("active"), // 'active', 'completed', 'dropped_out'
  avatarUrl: text("avatar_url"),
  enrollmentDate: integer("enrollment_date", { mode: "timestamp" }),
  completionDate: integer("completion_date", { mode: "timestamp" }),
  employmentStatus: text("employment_status"), // 'employed', 'unemployed', 'self_employed', 'student'
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Progress tracking
export const progressUpdates = sqliteTable("progress_updates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  studentId: integer("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
  completionRate: integer("completion_rate").notNull(), // 0-100
  aiLiteracyLevel: text("ai_literacy_level").notNull(), // 'beginner', 'intermediate', 'advanced'
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Certifications
export const certifications = sqliteTable("certifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  studentId: integer("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
  name: text("name").notNull(), // 'AI Basics', 'Digital Literacy', 'Advanced AI'
  issuedDate: integer("issued_date", { mode: "timestamp" }).notNull(),
  certificateUrl: text("certificate_url"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Dashboard metrics
export const metrics = sqliteTable("metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  metricType: text("metric_type").notNull(), // 'enrollment', 'completion', 'employment', 'certification', 'rural_reach'
  value: real("value").notNull(),
  changePercentage: real("change_percentage"),
  period: text("period").notNull(), // 'daily', 'weekly', 'monthly', 'yearly'
  date: integer("date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Enrollment statistics for charts
export const enrollmentStats = sqliteTable("enrollment_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(), // Month name or period label
  enrolled: integer("enrolled").notNull(),
  completed: integer("completed").notNull(),
  active: integer("active").notNull(),
  droppedOut: integer("dropped_out").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
})

// SDG mappings
export const sdgMappings = sqliteTable("sdg_mappings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sdgNumber: integer("sdg_number").notNull(), // 1-17
  title: text("title").notNull(),
  description: text("description"),
  impactLevel: text("impact_level").notNull(), // 'high', 'medium', 'low'
  progressPercentage: real("progress_percentage").default(0),
  targetDate: integer("target_date", { mode: "timestamp" }),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// SDG metrics - specific metrics for each SDG
export const sdgMetrics = sqliteTable("sdg_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sdgId: integer("sdg_id").notNull().references(() => sdgMappings.id, { onDelete: "cascade" }),
  metricText: text("metric_text").notNull(),
  value: text("value"), // Can be numeric or text
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Qualitative insights and success stories
export const qualitativeInsights = sqliteTable("qualitative_insights", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'success_story', 'challenge', 'insight', 'feedback'
  studentId: integer("student_id").references(() => students.id),
  tags: text("tags"), // JSON array of tags
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
  publishedDate: integer("published_date", { mode: "timestamp" }),
  authorName: text("author_name"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Resource efficiency tracking
export const resourceMetrics = sqliteTable("resource_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  metricName: text("metric_name").notNull(), // 'cost_per_student', 'training_hours', 'materials_cost'
  value: real("value").notNull(),
  unit: text("unit").notNull(), // 'USD', 'hours', 'percentage'
  period: text("period").notNull(), // 'monthly', 'quarterly', 'yearly'
  date: integer("date", { mode: "timestamp" }).notNull(),
  target: real("target"), // Target value for comparison
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Program cohorts/batches
export const cohorts = sqliteTable("cohorts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }),
  capacity: integer("capacity"),
  currentEnrollment: integer("current_enrollment").default(0),
  status: text("status").default("active"), // 'planning', 'active', 'completed', 'cancelled'
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Export types for TypeScript inference
export type InsertStudent = typeof students.$inferInsert
export type SelectStudent = typeof students.$inferSelect
export type InsertProgress = typeof progressUpdates.$inferInsert
export type SelectProgress = typeof progressUpdates.$inferSelect
export type InsertCertification = typeof certifications.$inferInsert
export type SelectCertification = typeof certifications.$inferSelect
export type InsertMetric = typeof metrics.$inferInsert
export type SelectMetric = typeof metrics.$inferSelect
export type InsertEnrollmentStat = typeof enrollmentStats.$inferInsert
export type SelectEnrollmentStat = typeof enrollmentStats.$inferSelect
export type InsertSDGMapping = typeof sdgMappings.$inferInsert
export type SelectSDGMapping = typeof sdgMappings.$inferSelect
export type InsertSDGMetric = typeof sdgMetrics.$inferInsert
export type SelectSDGMetric = typeof sdgMetrics.$inferSelect
export type InsertQualitativeInsight = typeof qualitativeInsights.$inferInsert
export type SelectQualitativeInsight = typeof qualitativeInsights.$inferSelect
export type InsertResourceMetric = typeof resourceMetrics.$inferInsert
export type SelectResourceMetric = typeof resourceMetrics.$inferSelect
export type InsertCohort = typeof cohorts.$inferInsert
export type SelectCohort = typeof cohorts.$inferSelect

// ESG reporting tables
export const esgReports = sqliteTable("esg_reports", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  reportType: text("report_type").notNull(), // 'gri', 'sasb', 'integrated', 'custom'
  reportPeriod: text("report_period").notNull(), // 'monthly', 'quarterly', 'annual'
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  status: text("status").default("draft"), // 'draft', 'generating', 'completed', 'published'
  aiGeneratedContent: text("ai_generated_content"), // JSON string of AI analysis
  executiveSummary: text("executive_summary"),
  keyFindings: text("key_findings"), // JSON array
  recommendations: text("recommendations"), // JSON array
  reportData: text("report_data"), // JSON string of aggregated data
  generatedBy: text("generated_by").default("system"),
  publishedDate: integer("published_date", { mode: "timestamp" }),
  fileUrl: text("file_url"), // URL to generated PDF
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export const esgMetrics = sqliteTable("esg_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  reportId: integer("report_id").references(() => esgReports.id, { onDelete: "cascade" }),
  category: text("category").notNull(), // 'environmental', 'social', 'governance'
  subcategory: text("subcategory").notNull(),
  metricCode: text("metric_code"), // GRI/SASB standard code
  metricName: text("metric_name").notNull(),
  value: text("value").notNull(), // Can be numeric or text
  unit: text("unit"),
  target: text("target"),
  benchmark: text("benchmark"),
  performance: text("performance"), // 'excellent', 'good', 'fair', 'poor'
  dataSource: text("data_source"),
  calculationMethod: text("calculation_method"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export const esgFrameworks = sqliteTable("esg_frameworks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(), // 'GRI', 'SASB', 'TCFD', 'SDG'
  version: text("version"),
  description: text("description"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  coveragePercentage: real("coverage_percentage").default(0),
  lastUpdated: integer("last_updated", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export type InsertESGReport = typeof esgReports.$inferInsert
export type SelectESGReport = typeof esgReports.$inferSelect
export type InsertESGMetric = typeof esgMetrics.$inferInsert
export type SelectESGMetric = typeof esgMetrics.$inferSelect
export type InsertESGFramework = typeof esgFrameworks.$inferInsert
export type SelectESGFramework = typeof esgFrameworks.$inferSelect
