import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { commuteAlternatives, userProfiles } from "@/lib/schema"
import { eq, desc } from "drizzle-orm"

const COMMUTE_EMISSION_FACTORS: Record<string, number> = {
  car: 0.21,
  motorcycle: 0.1,
  taxi: 0.25,
  bus: 0.089,
  train: 0.041,
  walk: 0,
  bike: 0,
  electric_vehicle: 0.053,
  public_transit: 0.065,
}

function calculateCommuteImpact(
  distanceKm: number,
  tripsPerWeek: number,
  weeksPerYear: number,
  baselineMode: string,
  alternativeMode: string
) {
  const baselineFactor = COMMUTE_EMISSION_FACTORS[baselineMode] ?? 0.21
  const altFactor = COMMUTE_EMISSION_FACTORS[alternativeMode] ?? 0

  const baselineEmission = distanceKm * tripsPerWeek * weeksPerYear * baselineFactor
  const alternativeEmission = distanceKm * tripsPerWeek * weeksPerYear * altFactor
  const savings = baselineEmission - alternativeEmission
  const savingsPercent = baselineEmission > 0 ? (savings / baselineEmission) * 100 : 0

  return {
    baselineEmission: Math.round(baselineEmission * 100) / 100,
    alternativeEmission: Math.round(alternativeEmission * 100) / 100,
    savingsEmission: Math.round(savings * 100) / 100,
    savingsPercent: Math.round(savingsPercent * 10) / 10,
  }
}

export async function POST(req: NextRequest) {
  try {
    let userId = 'test_user_123'
    try {
      const authResult = await auth()
      if (authResult?.userId) {
        userId = authResult.userId
      }
    } catch {}

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
    const {
      employeeId,
      baselineMode,
      alternativeMode,
      distanceKm,
      tripsPerWeek,
      weeksPerYear,
    } = body

    if (!baselineMode || !alternativeMode || !distanceKm || !tripsPerWeek) {
      return NextResponse.json({
        error: "Missing required fields: baselineMode, alternativeMode, distanceKm, tripsPerWeek"
      }, { status: 400 })
    }

    const weeks = weeksPerYear || 48
    const impact = calculateCommuteImpact(distanceKm, tripsPerWeek, weeks, baselineMode, alternativeMode)

    const result = await db.insert(commuteAlternatives).values({
      userId: profileId,
      employeeId: employeeId || null,
      baselineMode,
      alternativeMode,
      distanceKm,
      tripsPerWeek,
      weeksPerYear: weeks,
      baselineEmission: impact.baselineEmission,
      alternativeEmission: impact.alternativeEmission,
      savingsEmission: impact.savingsEmission,
      savingsPercent: impact.savingsPercent,
      calculatedAt: new Date(),
      createdAt: new Date(),
    }).returning()

    return NextResponse.json({
      success: true,
      data: result[0],
      impact,
      insight: impact.savingsEmission > 0 
        ? `Switching from ${baselineMode} to ${alternativeMode} saves ${impact.savingsEmission} kg CO2e per year (${impact.savingsPercent}% reduction)`
        : `No emissions savings from this switch`
    })
  } catch (error) {
    console.error("Commute calculation error:", error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    let userId = 'test_user_123'
    try {
      const authResult = await auth()
      if (authResult?.userId) {
        userId = authResult.userId
      }
    } catch {}

    const userProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const profileId = userProfile[0].id

    const data = await db
      .select()
      .from(commuteAlternatives)
      .where(eq(commuteAlternatives.userId, profileId))
      .orderBy(desc(commuteAlternatives.calculatedAt))
      .limit(100)

    const totalSavings = data.reduce((acc, c) => acc + (c.savingsEmission || 0), 0)
    const avgSavingsPercent = data.length > 0 
      ? data.reduce((acc, c) => acc + (c.savingsPercent || 0), 0) / data.length 
      : 0

    return NextResponse.json({
      data,
      summary: {
        totalCalculations: data.length,
        totalCO2Saved: Math.round(totalSavings * 100) / 100,
        avgSavingsPercent: Math.round(avgSavingsPercent * 10) / 10,
      }
    })
  } catch (error) {
    console.error("Error fetching commute data:", error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    let userId = 'test_user_123'
    try {
      const authResult = await auth()
      if (authResult?.userId) {
        userId = authResult.userId
      }
    } catch {}

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
    const { id, baselineMode, alternativeMode, distanceKm, tripsPerWeek, weeksPerYear } = body

    if (!id) {
      return NextResponse.json({ error: "Missing calculation ID" }, { status: 400 })
    }

    const existing = await db
      .select()
      .from(commuteAlternatives)
      .where(eq(commuteAlternatives.id, id))
      .limit(1)

    if (existing.length === 0) {
      return NextResponse.json({ error: "Calculation not found" }, { status: 404 })
    }

    const baseline = baselineMode || existing[0].baselineMode
    const alt = alternativeMode || existing[0].alternativeMode
    const dist = distanceKm || existing[0].distanceKm
    const trips = tripsPerWeek || existing[0].tripsPerWeek
    const weeks = weeksPerYear || existing[0].weeksPerYear

    const impact = calculateCommuteImpact(dist, trips, weeks, baseline, alt)

    const result = await db
      .update(commuteAlternatives)
      .set({
        baselineMode: baseline,
        alternativeMode: alt,
        distanceKm: dist,
        tripsPerWeek: trips,
        weeksPerYear: weeks,
        baselineEmission: impact.baselineEmission,
        alternativeEmission: impact.alternativeEmission,
        savingsEmission: impact.savingsEmission,
        savingsPercent: impact.savingsPercent,
        calculatedAt: new Date(),
      })
      .where(eq(commuteAlternatives.id, id))
      .returning()

    return NextResponse.json({
      success: true,
      data: result[0],
      impact
    })
  } catch (error) {
    console.error("Update commute calculation error:", error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 })
  }
}