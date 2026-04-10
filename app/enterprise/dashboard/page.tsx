import React from 'react'
import EnterpriseDashboard from '@/components/enterprise/enterprise-dashboard'
import { getEnterpriseDashboardData } from '@/lib/enterprise-queries'

export default async function EnterpriseDashboardPage() {
  // Default org ID = 1 for demo
  const orgId = 1
  
  let data
  try {
    data = await getEnterpriseDashboardData(orgId)
  } catch (e) {
    console.error('Failed to get dashboard data:', e)
    data = {
      metrics: { totalCarbon: 0, totalWeight: 0, shipmentCount: 0, carbonIntensity: 0 },
      recentLogs: [],
      chartData: []
    }
  }

  return (
    <main>
      <EnterpriseDashboard data={data} organizationId={orgId} />
    </main>
  )
}
