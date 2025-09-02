import { NextResponse } from "next/server"
import { metricsQueries, studentQueries } from "@/lib/queries"

/**
 * GET /api/dashboard/overview
 * Returns overview metrics for the dashboard
 */
export async function GET() {
  try {
    // Get overview metrics
    const metrics = await metricsQueries.getOverview()
    
    // Get total student count
    const studentsData = await studentQueries.getAll({ limit: 1 })
    
    // Return dashboard data
    return NextResponse.json({
      success: true,
      data: {
        metrics,
        totalStudents: studentsData.pagination.total,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error("Dashboard overview error:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch dashboard overview" 
      },
      { status: 500 }
    )
  }
}