import { NextRequest, NextResponse } from "next/server"
import { esgQueries } from "@/lib/esg-queries"
import { ESGReportGenerator } from "@/lib/esg-report-generator"
import { z } from "zod"

// Validation schemas
const generateReportSchema = z.object({
  reportType: z.enum(['gri', 'sasb', 'integrated', 'custom']),
  reportPeriod: z.enum(['monthly', 'quarterly', 'annual']),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  title: z.string().min(1),
  includeRecommendations: z.boolean().default(true),
  focusAreas: z.array(z.string()).optional()
})

/**
 * POST /api/esg/reports/generate
 * Generate a new ESG report using AI analysis
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request data
    const validatedData = generateReportSchema.parse(body)
    
    // Create draft report in database
    const draftReport = await esgQueries.reports.create({
      title: validatedData.title,
      reportType: validatedData.reportType,
      reportPeriod: validatedData.reportPeriod,
      startDate: validatedData.startDate,
      endDate: validatedData.endDate,
      status: 'generating',
      generatedBy: 'ai-system'
    })

    // Generate AI analysis
    const aiAnalysis = await ESGReportGenerator.generateReport({
      reportType: validatedData.reportType,
      reportPeriod: validatedData.reportPeriod,
      startDate: validatedData.startDate,
      endDate: validatedData.endDate,
      includeRecommendations: validatedData.includeRecommendations,
      focusAreas: validatedData.focusAreas
    })

    // Collect detailed metrics based on report type
    type ESGMetric = {
      category: string
      subcategory: string
      metricName: string
      value: string
      metricCode?: string
      unit?: string
      target?: string
      benchmark?: string
      performance?: string
      dataSource?: string
      calculationMethod?: string
      notes?: string
    }
    let metrics: ESGMetric[] = []
    
    if (validatedData.reportType === 'gri' || validatedData.reportType === 'integrated') {
      const griMetrics = await esgQueries.calculateGRIMetrics(
        validatedData.startDate, 
        validatedData.endDate
      )
      
      metrics = metrics.concat(
        Object.values(griMetrics).map(metric => ({
          category: 'social',
          subcategory: metric.category.toLowerCase(),
          metricCode: metric.code,
          metricName: metric.title,
          value: metric.value,
          unit: metric.value.includes('%') ? 'percentage' : 'count',
          performance: 'good',
          dataSource: 'program_database'
        }))
      )
    }

    if (validatedData.reportType === 'sasb' || validatedData.reportType === 'integrated') {
      const sasbMetrics = await esgQueries.calculateSASBMetrics(
        validatedData.startDate, 
        validatedData.endDate
      )
      
      metrics = metrics.concat(
        Object.values(sasbMetrics).map(metric => ({
          category: 'social',
          subcategory: metric.topic.toLowerCase().replace(/\s+/g, '_'),
          metricCode: metric.metric,
          metricName: metric.description,
          value: metric.value,
          target: metric.target,
          unit: metric.value.includes('%') ? 'percentage' : 'count',
          performance: 'good',
          dataSource: 'program_database'
        }))
      )
    }

    // Add metrics to report
    if (metrics.length > 0) {
      await esgQueries.addMetrics(draftReport.id, metrics)
    }

    // Update report with AI analysis
    const completedReport = await esgQueries.reports.updateStatus(
      draftReport.id,
      'completed',
      {
        aiGeneratedContent: JSON.stringify(aiAnalysis),
        executiveSummary: aiAnalysis.executiveSummary,
        keyFindings: JSON.stringify(aiAnalysis.keyFindings),
        recommendations: JSON.stringify(aiAnalysis.recommendations),
        reportData: JSON.stringify({
          frameworkCompliance: aiAnalysis.frameworkCompliance,
          riskAssessment: aiAnalysis.riskAssessment,
          opportunityAnalysis: aiAnalysis.opportunityAnalysis
        })
      }
    )

    return NextResponse.json({
      success: true,
      data: {
        report: completedReport,
        analysis: aiAnalysis,
        metricsCount: metrics.length
      }
    })

  } catch (error) {
    console.error('ESG Report Generation Error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request data',
          details: error.issues
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate ESG report',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/esg/reports/generate
 * Get available report templates and configuration options
 */
export async function GET() {
  try {
    const reportTemplates = {
      gri: {
        name: 'GRI Standards Report',
        description: 'Comprehensive report following Global Reporting Initiative standards',
        frameworks: ['GRI 200 (Economic)', 'GRI 400 (Social)', 'GRI 100 (General)'],
        estimatedTime: '5-10 minutes'
      },
      sasb: {
        name: 'SASB/ISSB Report',
        description: 'Sector-specific sustainability report for technology industry',
        frameworks: ['Human Capital Development', 'Data Security', 'Social Impact'],
        estimatedTime: '3-7 minutes'
      },
      integrated: {
        name: 'Integrated ESG Report',
        description: 'Combined GRI, SASB, and SDG aligned comprehensive report',
        frameworks: ['GRI Standards', 'SASB Metrics', 'SDG Indicators'],
        estimatedTime: '10-15 minutes'
      },
      custom: {
        name: 'Custom Impact Report',
        description: 'Tailored report focusing on specific impact areas',
        frameworks: ['Custom Metrics', 'Stakeholder Focus'],
        estimatedTime: '5-8 minutes'
      }
    }

    const focusAreas = [
      'education',
      'employment',
      'inclusion',
      'innovation',
      'gender_equality',
      'rural_development',
      'digital_literacy',
      'economic_empowerment'
    ]

    return NextResponse.json({
      success: true,
      data: {
        templates: reportTemplates,
        focusAreas,
        supportedPeriods: ['monthly', 'quarterly', 'annual'],
        maxDateRange: '2 years'
      }
    })

  } catch (error) {
    console.error('Error fetching report templates:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch report templates' },
      { status: 500 }
    )
  }
}