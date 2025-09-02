import { eq, desc, asc, count, sql, and, gte, lte } from "drizzle-orm"
import { db } from "./db"
import { 
  students, 
  progressUpdates, 
  certifications, 
  metrics, 
  enrollmentStats, 
  sdgMappings, 
  sdgMetrics, 
  qualitativeInsights, 
  resourceMetrics,
  cohorts 
} from "./schema"

/**
 * Student-related queries
 */
export const studentQueries = {
  /**
   * Get all students with pagination and filtering
   */
  getAll: async (options: {
    page?: number
    limit?: number
    status?: string
    location?: string
    gender?: string
    search?: string
  } = {}) => {
    const { page = 1, limit = 50, status, location, gender, search } = options
    const offset = (page - 1) * limit

    let query = db.select().from(students)

    // Add filters
    const conditions = []
    if (status) conditions.push(eq(students.status, status))
    if (location) conditions.push(eq(students.location, location))
    if (gender) conditions.push(eq(students.gender, gender))
    if (search) {
      conditions.push(
        sql`(${students.firstName} LIKE ${`%${search}%`} OR ${students.lastName} LIKE ${`%${search}%`} OR ${students.email} LIKE ${`%${search}%`})`
      )
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions))
    }

    const data = await query
      .orderBy(desc(students.createdAt))
      .limit(limit)
      .offset(offset)

    // Get total count for pagination
    const [{ count: total }] = await db
      .select({ count: count() })
      .from(students)
      .where(conditions.length > 0 ? and(...conditions) : undefined)

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  },

  /**
   * Get student by ID with progress and certifications
   */
  getById: async (id: number) => {
    const student = await db.select().from(students).where(eq(students.id, id)).limit(1)
    
    if (student.length === 0) return null

    const progress = await db.select()
      .from(progressUpdates)
      .where(eq(progressUpdates.studentId, id))
      .orderBy(desc(progressUpdates.createdAt))

    const studentCertifications = await db.select()
      .from(certifications)
      .where(eq(certifications.studentId, id))
      .orderBy(desc(certifications.issuedDate))

    return {
      ...student[0],
      progress,
      certifications: studentCertifications
    }
  },

  /**
   * Create new student
   */
  create: async (data: typeof students.$inferInsert) => {
    const [newStudent] = await db.insert(students).values(data).returning()
    return newStudent
  },

  /**
   * Update student
   */
  update: async (id: number, data: Partial<typeof students.$inferInsert>) => {
    const [updatedStudent] = await db
      .update(students)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(students.id, id))
      .returning()
    return updatedStudent
  }
}

/**
 * Dashboard metrics queries
 */
export const metricsQueries = {
  /**
   * Get overview metrics for the dashboard
   */
  getOverview: async () => {
    // Total students enrolled
    const [{ totalEnrolled }] = await db
      .select({ totalEnrolled: count() })
      .from(students)

    // Active students
    const [{ activeStudents }] = await db
      .select({ activeStudents: count() })
      .from(students)
      .where(eq(students.status, 'active'))

    // Completed students
    const [{ completedStudents }] = await db
      .select({ completedStudents: count() })
      .from(students)
      .where(eq(students.status, 'completed'))

    // Students with employment
    const [{ employedStudents }] = await db
      .select({ employedStudents: count() })
      .from(students)
      .where(eq(students.employmentStatus, 'employed'))

    // Rural students
    const [{ ruralStudents }] = await db
      .select({ ruralStudents: count() })
      .from(students)
      .where(eq(students.location, 'rural'))

    // Total certifications issued
    const [{ totalCertifications }] = await db
      .select({ totalCertifications: count() })
      .from(certifications)

    const completionRate = totalEnrolled > 0 ? (completedStudents / totalEnrolled) * 100 : 0
    const employmentRate = completedStudents > 0 ? (employedStudents / completedStudents) * 100 : 0
    const certificationRate = totalEnrolled > 0 ? (totalCertifications / totalEnrolled) * 100 : 0
    const ruralReach = totalEnrolled > 0 ? (ruralStudents / totalEnrolled) * 100 : 0

    return {
      youthEnrolled: {
        value: totalEnrolled,
        change: 12.5 // TODO: Calculate from historical data
      },
      completionRate: {
        value: Math.round(completionRate * 10) / 10,
        change: 5.2 // TODO: Calculate from historical data
      },
      employmentRate: {
        value: Math.round(employmentRate * 10) / 10,
        change: 8.1 // TODO: Calculate from historical data
      },
      certificationRate: {
        value: Math.round(certificationRate * 10) / 10,
        change: 3.4 // TODO: Calculate from historical data
      },
      ruralReach: {
        value: Math.round(ruralReach * 10) / 10,
        change: 15.3 // TODO: Calculate from historical data
      }
    }
  },

  /**
   * Get latest metrics by type
   */
  getLatestByType: async (metricType: string) => {
    const latestMetric = await db
      .select()
      .from(metrics)
      .where(eq(metrics.metricType, metricType))
      .orderBy(desc(metrics.date))
      .limit(1)

    return latestMetric[0] || null
  }
}

/**
 * Enrollment statistics queries
 */
export const enrollmentQueries = {
  /**
   * Get enrollment trends for charts
   */
  getTrends: async (months: number = 12) => {
    const data = await db
      .select()
      .from(enrollmentStats)
      .orderBy(desc(enrollmentStats.date))
      .limit(months)

    return data.reverse() // Return in chronological order
  },

  /**
   * Get current month enrollment data
   */
  getCurrentMonth: async () => {
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const [{ enrolled }] = await db
      .select({ enrolled: count() })
      .from(students)
      .where(gte(students.enrollmentDate, firstDayOfMonth))

    return { enrolled, month: now.getMonth() + 1, year: now.getFullYear() }
  }
}

/**
 * SDG mapping queries
 */
export const sdgQueries = {
  /**
   * Get all SDG mappings with their metrics
   */
  getAllWithMetrics: async () => {
    const mappings = await db
      .select()
      .from(sdgMappings)
      .where(eq(sdgMappings.isActive, true))
      .orderBy(asc(sdgMappings.sdgNumber))

    const mappingsWithMetrics = await Promise.all(
      mappings.map(async (mapping) => {
        const metrics = await db
          .select()
          .from(sdgMetrics)
          .where(eq(sdgMetrics.sdgId, mapping.id))
          .orderBy(asc(sdgMetrics.sortOrder))

        return {
          ...mapping,
          metrics: metrics.map(m => m.metricText)
        }
      })
    )

    return mappingsWithMetrics
  },

  /**
   * Update SDG progress
   */
  updateProgress: async (sdgId: number, progressPercentage: number) => {
    const [updated] = await db
      .update(sdgMappings)
      .set({ progressPercentage })
      .where(eq(sdgMappings.id, sdgId))
      .returning()

    return updated
  }
}

/**
 * Qualitative insights queries
 */
export const insightsQueries = {
  /**
   * Get published insights by category
   */
  getByCategory: async (category: string, limit: number = 10) => {
    const insights = await db
      .select()
      .from(qualitativeInsights)
      .where(and(
        eq(qualitativeInsights.category, category),
        eq(qualitativeInsights.isPublished, true)
      ))
      .orderBy(desc(qualitativeInsights.publishedDate))
      .limit(limit)

    return insights
  },

  /**
   * Get featured insights for dashboard
   */
  getFeatured: async (limit: number = 5) => {
    const insights = await db
      .select()
      .from(qualitativeInsights)
      .where(eq(qualitativeInsights.isPublished, true))
      .orderBy(desc(qualitativeInsights.publishedDate))
      .limit(limit)

    return insights
  },

  /**
   * Create new insight
   */
  create: async (data: typeof qualitativeInsights.$inferInsert) => {
    const [newInsight] = await db.insert(qualitativeInsights).values(data).returning()
    return newInsight
  }
}

/**
 * Resource efficiency queries
 */
export const resourceQueries = {
  /**
   * Get latest resource metrics
   */
  getLatestMetrics: async () => {
    const metrics = await db
      .select()
      .from(resourceMetrics)
      .orderBy(desc(resourceMetrics.date))
      .limit(10)

    return metrics
  },

  /**
   * Get metrics by name for trend analysis
   */
  getMetricTrend: async (metricName: string, months: number = 6) => {
    const metrics = await db
      .select()
      .from(resourceMetrics)
      .where(eq(resourceMetrics.metricName, metricName))
      .orderBy(desc(resourceMetrics.date))
      .limit(months)

    return metrics.reverse()
  }
}

/**
 * Cohort queries
 */
export const cohortQueries = {
  /**
   * Get all active cohorts
   */
  getActive: async () => {
    const cohorts = await db
      .select()
      .from(cohorts)
      .where(eq(cohorts.status, 'active'))
      .orderBy(desc(cohorts.startDate))

    return cohorts
  },

  /**
   * Get cohort with student count
   */
  getWithStudentCount: async (id: number) => {
    const cohort = await db.select().from(cohorts).where(eq(cohorts.id, id)).limit(1)
    
    if (cohort.length === 0) return null

    const [{ studentCount }] = await db
      .select({ studentCount: count() })
      .from(students)
      .where(eq(students.cohort, cohort[0].name))

    return {
      ...cohort[0],
      studentCount
    }
  }
}

/**
 * Analytics queries
 */
export const analyticsQueries = {
  /**
   * Get demographic breakdown
   */
  getDemographics: async () => {
    // Gender distribution
    const genderStats = await db
      .select({
        gender: students.gender,
        count: count()
      })
      .from(students)
      .groupBy(students.gender)

    // Location distribution
    const locationStats = await db
      .select({
        location: students.location,
        count: count()
      })
      .from(students)
      .groupBy(students.location)

    // Age distribution
    const ageStats = await db
      .select({
        age: students.age,
        count: count()
      })
      .from(students)
      .groupBy(students.age)
      .orderBy(asc(students.age))

    return {
      gender: genderStats,
      location: locationStats,
      age: ageStats
    }
  },

  /**
   * Get completion rates by cohort
   */
  getCompletionRatesByCohort: async () => {
    const cohortStats = await db
      .select({
        cohort: students.cohort,
        total: count(),
        completed: count(sql`CASE WHEN ${students.status} = 'completed' THEN 1 END`)
      })
      .from(students)
      .groupBy(students.cohort)

    return cohortStats.map(stat => ({
      ...stat,
      completionRate: stat.total > 0 ? (stat.completed / stat.total) * 100 : 0
    }))
  }
}