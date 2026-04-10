import { client } from "@/lib/db"

interface DashboardData {
  metrics: {
    totalCarbon: number;
    totalWeight: number;
    shipmentCount: number;
    carbonIntensity: number;
  };
  recentLogs: any[];
  chartData: any[];
}

export async function getEnterpriseDashboardData(orgId: number): Promise<DashboardData> {
  try {
    console.log('Fetching logs for org:', orgId);
    
    const result = await client.execute({
      sql: 'SELECT * FROM export_logs WHERE organization_id = ?',
      args: [orgId]
    });
    
    const rawLogs = result.rows || [];

    // Map snake_case from DB to camelCase for Frontend
    const logs = rawLogs.map((log: any) => ({
      id: log.id,
      organizationId: log.organization_id,
      commodityType: log.commodity_type,
      weight: log.weight,
      weightUnit: log.weight_unit,
      transportMode: log.transport_mode,
      distanceKm: log.distance_km,
      carbonEmitted: log.carbon_emitted || 0,
      status: log.status,
      notes: log.notes,
      timestamp: log.timestamp,
      createdAt: log.created_at,
      updatedAt: log.updated_at,
    }));

    // Calculate Aggregates
    const totalCarbon = logs.reduce((acc: number, log: any) => acc + (log.carbonEmitted || 0), 0);
    const totalWeight = logs.reduce((acc: number, log: any) => {
      const weightInTons = log.weightUnit === 'kg' ? log.weight / 1000 : log.weight;
      return acc + weightInTons;
    }, 0);
    const shipmentCount = logs.length;
    const carbonIntensity = totalWeight > 0 ? (totalCarbon / totalWeight) : 0;

    // Get Recent Logs (last 5)
    const recentLogs = [...logs].sort((a: any, b: any) => b.timestamp - a.timestamp).slice(0, 5);

    // Prepare Chart Data
    const chartData = logs.map((log: any) => ({
      date: new Date(log.timestamp * 1000).toLocaleDateString(),
      carbon: log.carbonEmitted || 0,
      weight: log.weight || 0
    }));

    // Return a plain object (JSON.parse(JSON.stringify())) to ensure no Libsql classes are passed to Client Components
    return JSON.parse(JSON.stringify({
      metrics: { totalCarbon, totalWeight, shipmentCount, carbonIntensity },
      recentLogs,
      chartData
    }));
  } catch (error) {
    console.error("Database Query Error:", error);
    return {
      metrics: { totalCarbon: 0, totalWeight: 0, shipmentCount: 0, carbonIntensity: 0 },
      recentLogs: [],
      chartData: []
    };
  }
}
