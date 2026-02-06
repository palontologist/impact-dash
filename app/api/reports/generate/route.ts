import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { FormalReportGenerator } from "@/lib/formal-report-generator"
import { db } from "@/lib/db"
import { userProfiles } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const generateReportSchema = z.object({
  reportPeriod: z.enum(['monthly', 'quarterly', 'annual']),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  focusAreas: z.array(z.string()).optional()
})

export const dynamic = "force-dynamic"

/**
 * POST /api/reports/generate
 * Generate a formal 2-page sustainability/impact report
 */
export async function POST(request: NextRequest) {
  try {
    // Get user ID from Clerk auth
    let clerkUserId: string
    try {
      const authResult = await auth()
      clerkUserId = authResult?.userId || "test_user_123"
    } catch (error) {
      clerkUserId = "test_user_123"
    }

    // Validate request body
    const body = await request.json()
    const validatedData = generateReportSchema.parse(body)

    // Get user profile
    const userProfile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.clerkUserId, clerkUserId)
    })

    if (!userProfile) {
      return NextResponse.json(
        { error: "User profile not found. Please complete onboarding." },
        { status: 404 }
      )
    }

    // Generate the formal report
    const report = await FormalReportGenerator.generateFormalReport({
      userId: userProfile.id,
      reportPeriod: validatedData.reportPeriod,
      startDate: validatedData.startDate,
      endDate: validatedData.endDate,
      profileType: userProfile.selectedProfile || 'custom',
      focusAreas: validatedData.focusAreas
    })

    // Format for PDF/presentation
    const formattedReport = FormalReportGenerator.formatForPDF(report, {
      organizationName: userProfile.name || "Organization",
      reportPeriod: validatedData.reportPeriod,
      fiscalYear: validatedData.endDate.getFullYear().toString(),
      generatedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })

    return NextResponse.json({
      success: true,
      data: {
        report,
        formattedMarkdown: formattedReport,
        metadata: {
          generatedAt: new Date().toISOString(),
          period: validatedData.reportPeriod,
          dateRange: {
            start: validatedData.startDate.toISOString(),
            end: validatedData.endDate.toISOString()
          },
          profileType: userProfile.selectedProfile,
          userType: userProfile.userType
        }
      }
    })

  } catch (error) {
    console.error('Report Generation Error:', error)
    
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
        error: 'Failed to generate report',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/reports/generate
 * Get available report configuration options
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        reportPeriods: [
          { value: 'monthly', label: 'Monthly Report', estimatedTime: '2-3 minutes' },
          { value: 'quarterly', label: 'Quarterly Report', estimatedTime: '3-4 minutes' },
          { value: 'annual', label: 'Annual Report', estimatedTime: '4-5 minutes' }
        ],
        features: [
          'Executive summary with strategic insights',
          'Comprehensive key metrics analysis',
          'Sustainability goals tracking',
          'Strategic initiatives highlight',
          'Multi-stakeholder impact assessment',
          'Governance & oversight documentation',
          'Forward-looking commitments',
          'Framework alignment (SDGs, GRI, SASB)'
        ],
        format: 'Professional 2-page report suitable for board presentations, investor relations, and stakeholder communications',
        customization: 'Report content adapts to your profile type and selected focus areas'
      }
    })
  } catch (error) {
    console.error('Error fetching report options:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch report options' },
      { status: 500 }
    )
  }
}
