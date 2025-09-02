"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { EnrollmentChart } from "@/components/enrollment-chart"
import { OutcomesGrid } from "@/components/outcomes-grid"
import { SDGMapping } from "@/components/sdg-mapping"
import { QualitativeInsights } from "@/components/qualitative-insights"
import { ResourceEfficiency } from "@/components/resource-efficiency"
import { StudentManagement } from "@/components/student-management"
import { DataInputPanel } from "@/components/data-input-panel"
import { LongTermAnalysis } from "@/components/long-term-analysis"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Impact Overview</TabsTrigger>
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="data">Data Input</TabsTrigger>
            <TabsTrigger value="analysis">Long-term Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <MetricsOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EnrollmentChart />
              <OutcomesGrid />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <SDGMapping />
              </div>
              <ResourceEfficiency />
            </div>

            <QualitativeInsights />
          </TabsContent>

          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="data">
            <DataInputPanel />
          </TabsContent>

          <TabsContent value="analysis">
            <LongTermAnalysis />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
