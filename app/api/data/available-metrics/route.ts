import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { availableMetrics } from "@/lib/schema"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Fetch all available metrics from the database
    const metrics = await db.select().from(availableMetrics)

    return NextResponse.json({
      success: true,
      metrics: metrics.map(m => ({
        id: m.id,
        metricId: m.metricId,
        metricName: m.metricName,
        category: m.category,
        description: m.description,
        unit: m.unit,
        dataType: m.dataType,
        isAvailableForCustom: m.isAvailableForCustom,
      })),
      count: metrics.length,
    })
  } catch (error) {
    console.error("Error fetching available metrics:", error)
    return NextResponse.json(
      { error: "Failed to fetch available metrics" },
      { status: 500 }
    )
  }
}
