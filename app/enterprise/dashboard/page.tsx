import React from 'react'
import EnterpriseDashboard from '@/components/enterprise/enterprise-dashboard'
import { getEnterpriseDashboardData } from '@/lib/enterprise-queries'

export default async function EnterpriseDashboardPage() {
  // Use real database data with fallback to empty state
  let data = {
    metrics: { totalCarbon: 0, totalWeight: 0, shipmentCount: 0, carbonIntensity: 0 },
    recentLogs: [],
    chartData: []
  }

  try {
    data = await getEnterpriseDashboardData(1)
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }

  return (
    <main>
      <EnterpriseDashboard data={data} />
    </main>
  )
}
