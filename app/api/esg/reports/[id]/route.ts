import { NextRequest, NextResponse } from "next/server"
import { esgQueries } from "@/lib/esg-queries"

/**
 * GET /api/esg/reports/[id]
 * Get specific ESG report by ID with metrics
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const reportId = parseInt(params.id)
    
    if (isNaN(reportId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid report ID' },
        { status: 400 }
      )
    }

    const report = await esgQueries.reports.getById(reportId)
    
    if (!report) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      )
    }

    // Parse JSON fields for better response structure
    const processedReport = {
      ...report,
      aiGeneratedContent: report.aiGeneratedContent ? JSON.parse(report.aiGeneratedContent) : null,
      keyFindings: report.keyFindings ? JSON.parse(report.keyFindings) : [],
      recommendations: report.recommendations ? JSON.parse(report.recommendations) : [],
      reportData: report.reportData ? JSON.parse(report.reportData) : null
    }

    return NextResponse.json({
      success: true,
      data: processedReport
    })

  } catch (error) {
    console.error('Error fetching ESG report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ESG report' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/esg/reports/[id]
 * Update ESG report
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const reportId = parseInt(params.id)
    const body = await request.json()
    
    if (isNaN(reportId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid report ID' },
        { status: 400 }
      )
    }

    const updatedReport = await esgQueries.reports.updateStatus(
      reportId,
      body.status,
      {
        title: body.title,
        executiveSummary: body.executiveSummary,
        keyFindings: body.keyFindings ? JSON.stringify(body.keyFindings) : undefined,
        recommendations: body.recommendations ? JSON.stringify(body.recommendations) : undefined,
        publishedDate: body.status === 'published' ? new Date() : undefined
      }
    )

    return NextResponse.json({
      success: true,
      data: updatedReport
    })

  } catch (error) {
    console.error('Error updating ESG report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update ESG report' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/esg/reports/[id]
 * Delete ESG report
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const reportId = parseInt(params.id)
    
    if (isNaN(reportId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid report ID' },
        { status: 400 }
      )
    }

    // Note: In a real implementation, you'd want to implement soft delete
    // For now, we'll just return success as the actual delete would need
    // to be implemented in the queries module
    
    return NextResponse.json({
      success: true,
      message: 'Report deletion not implemented - use status update to archive'
    })

  } catch (error) {
    console.error('Error deleting ESG report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete ESG report' },
      { status: 500 }
    )
  }
}