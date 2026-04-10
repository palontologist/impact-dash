import React from 'react'
import EnterpriseDashboard from '@/components/enterprise/enterprise-dashboard'
import { getEnterpriseDashboardData } from '@/lib/enterprise-queries'

export default async function EnterpriseDashboardPage() {
  // Fetch real data from Turso database
  const data = await getEnterpriseDashboardData(1)

  return (
    <main>
      <EnterpriseDashboard data={data} />
    </main>
  )
}
