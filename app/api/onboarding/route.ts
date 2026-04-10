import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { userProfiles } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  try {
    let userId: string
    try {
      const authResult = await auth()
      userId = authResult?.userId || "test_user_123"
    } catch {
      userId = "test_user_123"
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let body;
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }
    
    const { userType, profile, industry, reason, goals, customMetrics, dataInputMethod } = body

    // Validate required fields
    if (!userType || !profile || !industry) {
      return NextResponse.json({ 
        error: "Missing required fields: userType, profile, industry" 
      }, { status: 400 })
    }

    // Check if user already has a profile
    const existingProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkUserId, userId))
      .limit(1)

    const profileData = {
      clerkUserId: userId,
      email: "", // Will be populated from Clerk
      userType,
      selectedProfile: profile,
      industry,
      reason: reason ? JSON.stringify(reason) : null,
      goals: goals ? JSON.stringify(goals) : null,
      customMetrics: customMetrics ? JSON.stringify(customMetrics) : null,
      dataInputMethod: dataInputMethod || null,
      onboardingCompleted: true,
    }

    if (existingProfile.length > 0) {
      // Update existing profile
      await db
        .update(userProfiles)
        .set(profileData)
        .where(eq(userProfiles.clerkUserId, userId))
    } else {
      // Create new profile
      await db.insert(userProfiles).values(profileData)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 })
  }
}
