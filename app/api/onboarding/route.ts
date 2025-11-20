import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { userProfiles } from "@/lib/schema"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { userType, profile, industry, reason } = body

    // Create or update user profile
    await db.insert(userProfiles).values({
      clerkUserId: userId,
      email: "", // Will be populated from Clerk
      userType,
      selectedProfile: profile,
      industry,
      reason: JSON.stringify(reason),
      onboardingCompleted: true,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
