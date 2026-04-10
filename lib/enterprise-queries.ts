import { db } from "@/lib/db"
import { exportLogs, userProfiles } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function getEnterpriseDashboardData(orgId: number) {
  try {
    // 1. Fetch all logs for this org
    const logs = await db.select().from(exportLogs).where(eq(exportLogs.organizationId, orgId));

    // 2. Calculate Aggregates
    const totalCarbon = logs.reduce((acc, log) => acc + (log.carbonEmitted || 0), 0);
    const totalWeight = logs.reduce((acc, log) => acc + (log.weightUnit === 'kg' ? (log.weight || 0) / 1000 : (log.weight || 0)), 0);
    const shipmentCount = logs.length;

    // 3. Calculate Carbon Intensity (kg CO2e per ton)
    const carbonIntensity = totalWeight > 0 ? (totalCarbon / totalWeight) : 0;

    // 4. Get Recent Logs (last 5)
    const recentLogs = [...logs].sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    }).slice(0, 5);

    // 5. Prepare Chart Data
    const chartData = logs.map(log => ({
      date: log.timestamp ? new Date(log.timestamp).toLocaleDateString() : 'Unknown',
      carbon: log.carbonEmitted || 0,
      weight: log.weight || 0
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      metrics: {
        totalCarbon,
        totalWeight,
        shipmentCount,
        carbonIntensity
      },
      recentLogs,
      chartData
    };
  } catch (error) {
    console.error("Database Query Error in getEnterpriseDashboardData:", error);
    // Return empty state instead of throwing to prevent page crash
    return {
      metrics: { totalCarbon: 0, totalWeight: 0, shipmentCount: 0, carbonIntensity: 0 },
      recentLogs: [],
      chartData: []
    };
  }
}
