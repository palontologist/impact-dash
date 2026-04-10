// Mock data for the Enterprise Dashboard demo
// This ensures the dashboard works even when the database is not fully set up.

export const mockDashboardData = {
  metrics: {
    totalCarbon: 2450.5,
    totalWeight: 120.5,
    shipmentCount: 8,
    carbonIntensity: 20.3
  },
  recentLogs: [
    { id: 1, commodityType: 'Wheat', transportMode: 'truck', carbonEmitted: 450.2, weight: 25, timestamp: new Date('2024-01-15') },
    { id: 2, commodityType: 'Copper', transportMode: 'ship', carbonEmitted: 180.5, weight: 15, timestamp: new Date('2024-01-14') },
    { id: 3, commodityType: 'Lithium', transportMode: 'air', carbonEmitted: 900.0, weight: 5, timestamp: new Date('2024-01-13') },
    { id: 4, commodityType: 'Corn', transportMode: 'truck', carbonEmitted: 320.0, weight: 40, timestamp: new Date('2024-01-12') },
    { id: 5, commodityType: 'Gold', transportMode: 'ship', carbonEmitted: 600.0, weight: 0.5, timestamp: new Date('2024-01-11') },
  ],
  chartData: [
    { date: 'Jan 11', carbon: 600, weight: 0.5 },
    { date: 'Jan 12', carbon: 320, weight: 40 },
    { date: 'Jan 13', carbon: 900, weight: 5 },
    { date: 'Jan 14', carbon: 180, weight: 15 },
    { date: 'Jan 15', carbon: 450, weight: 25 },
  ]
}
