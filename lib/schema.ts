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

// User profiles and onboarding
export const userProfiles = sqliteTable("user_profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clerkUserId: text("clerk_user_id").unique(),
  email: text("email").notNull(),
  name: text("name"),
  userType: text("user_type").notNull(), // 'consultant', 'enterprise', 'regulator'
  selectedProfile: text("selected_profile"), // 'education', 'human_constitution', 'e2g_food', 'custom'
  industry: text("industry"),
  reason: text("reason"), // why using dashboard: 'funding', 'regulation', 'impact_measurement', etc.
  customMetrics: text("custom_metrics"), // JSON array of selected metric IDs for custom profile
  dataInputMethod: text("data_input_method"), // 'csv', 'manual', 'both'
  onboardingCompleted: integer("onboarding_completed", { mode: "boolean" }).default(false),
  
  // Company details
  companyDescription: text("company_description"),
  companySize: text("company_size"), // 'small', 'medium', 'large', 'enterprise'
  website: text("website"),
  headquarters: text("headquarters"),
  foundedYear: integer("founded_year"),
  
  // Governance
  governanceStructure: text("governance_structure"), // JSON with board info, committees, etc.
  sustainabilityOfficer: text("sustainability_officer"),
  reportingFrameworks: text("reporting_frameworks"), // JSON array: ['GRI', 'SASB', 'SDGs']
  
  // Goals from onboarding
  goals: text("goals"), // JSON array of goal objects {id, title, target, deadline, status}
  
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Human Constitution Profile metrics
export const humanConstitutionMetrics = sqliteTable("human_constitution_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  dignityIndex: real("dignity_index"),
  maturityIndex: real("maturity_index"),
  valueWheelBody: real("value_wheel_body"),
  valueWheelEmotion: real("value_wheel_emotion"),
  valueWheelThought: real("value_wheel_thought"),
  valueWheelPower: real("value_wheel_power"),
  valueWheelCommunication: real("value_wheel_communication"),
  valueWheelLife: real("value_wheel_life"),
  valueWheelUnity: real("value_wheel_unity"),
  individualWellbeing: real("individual_wellbeing"),
  mentalHealthScore: real("mental_health_score"),
  relationshipTrust: real("relationship_trust"),
  teamEffectiveness: real("team_effectiveness"),
  date: integer("date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export const humanConstitutionStories = sqliteTable("human_constitution_stories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'highlight', 'challenge', 'breakthrough'
  tags: text("tags"), // JSON array
  publishedDate: integer("published_date", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export const humanConstitutionSocietalIndicators = sqliteTable("human_constitution_societal_indicators", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  indicatorName: text("indicator_name").notNull(),
  value: real("value").notNull(),
  region: text("region"),
  date: integer("date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export const humanConstitutionHeatmaps = sqliteTable("human_constitution_heatmaps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  metric: text("metric").notNull(),
  region: text("region").notNull(),
  intensity: real("intensity").notNull(),
  coordinates: text("coordinates"), // JSON: { lat, lng }
  date: integer("date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// E2G Food Profile metrics
export const e2gFoodMetrics = sqliteTable("e2g_food_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  foodBarsDelivered: integer("food_bars_delivered").default(0),
  mealsProvided: integer("meals_provided").default(0),
  caloriesProvided: integer("calories_provided").default(0),
  communitiesServed: integer("communities_served").default(0),
  regionsServed: integer("regions_served").default(0),
  vulnerableIndividualsReached: integer("vulnerable_individuals_reached").default(0),
  donorImpactTracked: integer("donor_impact_tracked").default(0),
  donorRetentionRate: real("donor_retention_rate").default(0),
  donorEngagementRate: real("donor_engagement_rate").default(0),
  jobsCreated: integer("jobs_created").default(0),
  localNutritionProduction: integer("local_nutrition_production").default(0),
  microfarmsEstablished: integer("microfarms_established").default(0),
  waterEfficiency: real("water_efficiency").default(0),
  energyEfficiency: real("energy_efficiency").default(0),
  ghgEmissionsSaved: real("ghg_emissions_saved").default(0),
  zeroWastePercentage: real("zero_waste_percentage").default(0),
  upcycledIngredients: integer("upcycled_ingredients").default(0),
  peopleTrained: integer("people_trained").default(0),
  partnershipsEstablished: integer("partnerships_established").default(0),
  eventsHeld: integer("events_held").default(0),
  ngosOnboarded: integer("ngos_onboarded").default(0),
  charitiesOnboarded: integer("charities_onboarded").default(0),
  impactStoriesShared: integer("impact_stories_shared").default(0),
  mediaEndorsements: integer("media_endorsements").default(0),
  date: integer("date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export const e2gFoodDonors = sqliteTable("e2g_food_donors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  donorName: text("donor_name").notNull(),
  donorType: text("donor_type"), // 'individual', 'corporate', 'foundation'
  totalDonations: real("total_donations").default(0),
  lastDonationDate: integer("last_donation_date", { mode: "timestamp" }),
  engagementScore: real("engagement_score").default(0),
  retentionStatus: text("retention_status"), // 'active', 'at_risk', 'lapsed'
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

export const e2gFoodImpactStories = sqliteTable("e2g_food_impact_stories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  region: text("region"),
  beneficiaryCount: integer("beneficiary_count"),
  mediaType: text("media_type"), // 'text', 'image', 'video'
  mediaUrl: text("media_url"),
  publishedDate: integer("published_date", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Available metrics definition for custom selection
export const availableMetrics = sqliteTable("available_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  metricId: text("metric_id").notNull().unique(), // e.g., 'enrollment', 'completion', 'dignity_index'
  metricName: text("metric_name").notNull(),
  category: text("category").notNull(), // 'education', 'human_constitution', 'food', 'environmental', 'social', 'governance'
  description: text("description"),
  unit: text("unit"), // 'count', 'percentage', 'score', 'currency'
  dataType: text("data_type").notNull(), // 'number', 'percentage', 'text'
  isAvailableForCustom: integer("is_available_for_custom", { mode: "boolean" }).default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// CSV data uploads
export const dataUploads = sqliteTable("data_uploads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size"),
  fileUrl: text("file_url"),
  fileHash: text("file_hash"), // MD5 or SHA256 hash for deduplication
  uploadStatus: text("upload_status").default("processing"), // 'processing', 'completed', 'failed'
  rowsProcessed: integer("rows_processed").default(0),
  rowsFailed: integer("rows_failed").default(0),
  errorLog: text("error_log"), // JSON array of errors
  metricsMapped: text("metrics_mapped"), // JSON object mapping CSV columns to metric IDs
  uploadedAt: integer("uploaded_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Manual data entries for custom metrics
export const customMetricData = sqliteTable("custom_metric_data", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => userProfiles.id, { onDelete: "cascade" }),
  metricId: text("metric_id").notNull(),
  value: text("value").notNull(), // Stored as text, parsed based on dataType
  date: integer("date", { mode: "timestamp" }).notNull(),
  notes: text("notes"),
  source: text("source").default("manual"), // 'manual', 'csv', 'api'
  uploadId: integer("upload_id").references(() => dataUploads.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(strftime('%s','now'))`)
    .notNull(),
})

// Type exports
export type InsertAvailableMetric = typeof availableMetrics.$inferInsert
export type SelectAvailableMetric = typeof availableMetrics.$inferSelect
export type InsertDataUpload = typeof dataUploads.$inferInsert
export type SelectDataUpload = typeof dataUploads.$inferSelect
export type InsertCustomMetricData = typeof customMetricData.$inferInsert
export type SelectCustomMetricData = typeof customMetricData.$inferSelect
export type InsertUserProfile = typeof userProfiles.$inferInsert
export type SelectUserProfile = typeof userProfiles.$inferSelect
export type InsertHumanConstitutionMetric = typeof humanConstitutionMetrics.$inferInsert
export type SelectHumanConstitutionMetric = typeof humanConstitutionMetrics.$inferSelect
export type InsertHumanConstitutionStory = typeof humanConstitutionStories.$inferInsert
export type SelectHumanConstitutionStory = typeof humanConstitutionStories.$inferSelect
export type InsertHumanConstitutionSocietalIndicator = typeof humanConstitutionSocietalIndicators.$inferInsert
export type SelectHumanConstitutionSocietalIndicator = typeof humanConstitutionSocietalIndicators.$inferSelect
export type InsertHumanConstitutionHeatmap = typeof humanConstitutionHeatmaps.$inferInsert
export type SelectHumanConstitutionHeatmap = typeof humanConstitutionHeatmaps.$inferSelect
export type InsertE2GFoodMetric = typeof e2gFoodMetrics.$inferInsert
export type SelectE2GFoodMetric = typeof e2gFoodMetrics.$inferSelect
export type InsertE2GFoodDonor = typeof e2gFoodDonors.$inferInsert
export type SelectE2GFoodDonor = typeof e2gFoodDonors.$inferSelect
export type InsertE2GFoodImpactStory = typeof e2gFoodImpactStories.$inferInsert
export type SelectE2GFoodImpactStory = typeof e2gFoodImpactStories.$inferSelect
