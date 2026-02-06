import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { customMetricData, userProfiles } from "@/lib/schema"
import { eq, and, desc } from "drizzle-orm"

export async function POST(req: NextRequest) {
  try {
    // Development mode: use test user if no auth
    let userId = 'test_user_123'
    try {
      const authResult = await auth()
      if (authResult?.userId) {
        userId = authResult.userId
      }
    } catch {
      // Continue with test user in dev mode
    }

    // Get user profile
    const userProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json({ error: "User profile not found. Please complete onboarding first." }, { status: 404 })
    }

    const profileId = userProfile[0].id
    const body = await req.json()
    const { metricId, value, date, notes } = body

    if (!metricId || !value || !date) {
      return NextResponse.json({ 
        error: "Missing required fields: metricId, value, date" 
      }, { status: 400 })
    }

    // Validate date
    const metricDate = new Date(date)
    if (isNaN(metricDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
    }

    // Insert metric data
    const result = await db.insert(customMetricData).values({
      userId: profileId,
      metricId,
      value: String(value),
      date: metricDate,
      notes: notes || null,
      source: 'manual',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning()

    return NextResponse.json({ 
      success: true, 
      data: result[0]
    })
  } catch (error) {
    console.error("Manual data input error:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Development mode: use test user if no auth
    let userId = 'test_user_123'
    try {
      const authResult = await auth()
      if (authResult?.userId) {
        userId = authResult.userId
      }
    } catch {
      // Continue with test user in dev mode
    }

    // Get user profile
    const userProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const profileId = userProfile[0].id

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const metricId = searchParams.get('metricId')
    const limit = parseInt(searchParams.get('limit') || '100')

    // Build query conditions
    let whereConditions = eq(customMetricData.userId, profileId)
    if (metricId) {
      whereConditions = and(
        eq(customMetricData.userId, profileId),
        eq(customMetricData.metricId, metricId)
      ) as any
    }

    // Get data
    const data = await db
      .select()
      .from(customMetricData)
      .where(whereConditions)
      .orderBy(desc(customMetricData.date))
      .limit(limit)

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching metric data:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile
    const userProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const profileId = userProfile[0].id
    const body = await req.json()
    const { id, value, notes } = body

    if (!id) {
      return NextResponse.json({ error: "Missing metric data ID" }, { status: 400 })
    }

    // Update metric data
    const result = await db
      .update(customMetricData)
      .set({
        value: value !== undefined ? String(value) : undefined,
        notes: notes !== undefined ? notes : undefined,
        updatedAt: new Date(),
      })
      .where(and(
        eq(customMetricData.id, id),
        eq(customMetricData.userId, profileId)
      ))
      .returning()

    if (result.length === 0) {
      return NextResponse.json({ error: "Metric data not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      data: result[0]
    })
  } catch (error) {
    console.error("Update metric data error:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile
    const userProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const profileId = userProfile[0].id
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: "Missing metric data ID" }, { status: 400 })
    }

    // Delete metric data
    const result = await db
      .delete(customMetricData)
      .where(and(
        eq(customMetricData.id, parseInt(id)),
        eq(customMetricData.userId, profileId)
      ))
      .returning()

    if (result.length === 0) {
      return NextResponse.json({ error: "Metric data not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete metric data error:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 })
  }
}
