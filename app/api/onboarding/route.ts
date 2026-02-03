import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { userProfiles } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { userType, profile, industry, reason } = body

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
      reason: JSON.stringify(reason),
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
