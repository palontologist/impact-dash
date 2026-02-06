import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { userProfiles } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { getProfileConfig, type ProfileType } from "@/lib/profile-config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Get user ID from Clerk auth
    let userId: string
    try {
      const authResult = await auth()
      userId = authResult?.userId || "test_user_123"
    } catch (error) {
      userId = "test_user_123"
    }

    // Fetch user profile from database
    let userProfile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.clerkUserId, userId),
    })

    // If no profile exists, return error to redirect user to onboarding
    if (!userProfile) {
      console.log("No profile found for user:", userId, "- please complete onboarding")
      return NextResponse.json(
        { error: "Profile not found. Please complete onboarding.", needsOnboarding: true },
        { status: 404 }
      )
    }

    // Parse custom metrics if they exist
    let customMetrics: string[] = []
    if (userProfile.customMetrics) {
      try {
        customMetrics = JSON.parse(userProfile.customMetrics)
      } catch (err) {
        console.error("Error parsing custom metrics:", err)
      }
    }

    // Get profile configuration
    const profileType = (userProfile.selectedProfile || 'education') as ProfileType
    const config = getProfileConfig(profileType, customMetrics)

    return NextResponse.json({
      success: true,
      profile: {
        id: userProfile.id,
        userId: userProfile.clerkUserId,
        email: userProfile.email,
        name: userProfile.name,
        userType: userProfile.userType,
        selectedProfile: userProfile.selectedProfile,
        industry: userProfile.industry,
        customMetrics,
        dataInputMethod: userProfile.dataInputMethod,
        onboardingCompleted: userProfile.onboardingCompleted,
      },
      config: {
        name: config.name,
        description: config.description,
        tabs: config.tabs,
        metrics: config.defaultMetrics,
        features: config.features,
      }
    })
  } catch (error) {
    console.error("Error fetching profile config:", error)
    return NextResponse.json(
      { error: "Failed to fetch profile configuration" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    // Get user ID from Clerk auth
    let userId: string
    try {
      const authResult = await auth()
      userId = authResult?.userId || "test_user_123"
    } catch (error) {
      userId = "test_user_123"
    }

    const body = await request.json()
    const { customMetrics } = body

    if (!customMetrics || !Array.isArray(customMetrics)) {
      return NextResponse.json(
        { error: "Invalid customMetrics format" },
        { status: 400 }
      )
    }

    // Update user profile with new custom metrics
    await db.update(userProfiles)
      .set({
        customMetrics: JSON.stringify(customMetrics),
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.clerkUserId, userId))

    return NextResponse.json({
      success: true,
      message: "Custom metrics updated successfully",
    })
  } catch (error) {
    console.error("Error updating profile config:", error)
    return NextResponse.json(
      { error: "Failed to update profile configuration" },
      { status: 500 }
    )
  }
}
