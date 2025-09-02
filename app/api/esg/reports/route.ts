import { NextRequest, NextResponse } from "next/server"
import { esgQueries } from "@/lib/esg-queries"

/**
 * GET /api/esg/reports
 * Get all ESG reports with pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const reportType = searchParams.get('reportType')

    // Get reports with pagination
    const result = await esgQueries.reports.getAll(page, limit)

    // Apply filters if provided
    let filteredData = result.data
    
    if (status) {
      filteredData = filteredData.filter(report => report.status === status)
    }
    
    if (reportType) {
      filteredData = filteredData.filter(report => report.reportType === reportType)
    }

    return NextResponse.json({
      success: true,
      data: filteredData,
      pagination: result.pagination,
      filters: {
        status,
        reportType
      }
    })

  } catch (error) {
    console.error('Error fetching ESG reports:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ESG reports' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/esg/reports
 * Create a new draft ESG report
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newReport = await esgQueries.reports.create({
      title: body.title,
      reportType: body.reportType,
      reportPeriod: body.reportPeriod,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      status: 'draft',
      generatedBy: body.generatedBy || 'user'
    })

    return NextResponse.json({
      success: true,
      data: newReport
    })

  } catch (error) {
    console.error('Error creating ESG report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create ESG report' },
      { status: 500 }
    )
  }
}