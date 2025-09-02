"use client"
import { TrendingUp, Calendar, Users, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts"

const longitudinalData = [
  { month: "Jan 2024", cohortA: 0, cohortB: 0, cohortC: 0, employment: 0 },
  { month: "Feb 2024", cohortA: 245, cohortB: 0, cohortC: 0, employment: 12 },
  { month: "Mar 2024", cohortA: 456, cohortB: 0, cohortC: 0, employment: 28 },
  { month: "Apr 2024", cohortA: 678, cohortB: 0, cohortC: 0, employment: 45 },
  { month: "May 2024", cohortA: 823, cohortB: 189, cohortC: 0, employment: 67 },
  { month: "Jun 2024", cohortA: 945, cohortB: 334, cohortC: 0, employment: 89 },
  { month: "Jul 2024", cohortA: 1123, cohortB: 456, cohortC: 0, employment: 112 },
  { month: "Aug 2024", cohortA: 1234, cohortB: 567, cohortC: 234, employment: 145 },
]

const cohortComparison = [
  { metric: "Enrollment", cohortA: 1234, cohortB: 567, cohortC: 234 },
  { metric: "Completion", cohortA: 965, cohortB: 445, cohortC: 178 },
  { metric: "Employment", cohortA: 623, cohortB: 287, cohortC: 89 },
  { metric: "Certification", cohortA: 1013, cohortB: 478, cohortC: 192 },
]

const chartConfig = {
  cohortA: {
    label: "Cohort A",
    color: "hsl(var(--chart-1))",
  },
  cohortB: {
    label: "Cohort B",
    color: "hsl(var(--chart-2))",
  },
  cohortC: {
    label: "Cohort C",
    color: "hsl(var(--chart-3))",
  },
  employment: {
    label: "Employment",
    color: "hsl(var(--chart-4))",
  },
}

export function LongTermAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Long-term Impact Analysis</h2>
          <p className="text-muted-foreground">Track progress over time and compare cohort performance</p>
        </div>
        <Select defaultValue="12months">
          <SelectTrigger className="w-48">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
            <SelectItem value="24months">Last 24 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Trends */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                <p className="text-2xl font-bold text-primary">+127%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Year-over-year enrollment</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                <p className="text-2xl font-bold text-blue-600">84.3%</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Average across all cohorts</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employment Impact</p>
                <p className="text-2xl font-bold text-purple-600">+45%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Post-training employment rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ROI</p>
                <p className="text-2xl font-bold text-orange-600">3.2x</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Return on investment</p>
          </CardContent>
        </Card>
      </div>

      {/* Longitudinal Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Longitudinal Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={longitudinalData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="cohortA" stroke="var(--color-cohortA)" strokeWidth={2} />
                <Line type="monotone" dataKey="cohortB" stroke="var(--color-cohortB)" strokeWidth={2} />
                <Line type="monotone" dataKey="cohortC" stroke="var(--color-cohortC)" strokeWidth={2} />
                <Line type="monotone" dataKey="employment" stroke="var(--color-employment)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Cohort Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Cohort Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cohortComparison}>
                <XAxis dataKey="metric" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="cohortA" fill="var(--color-cohortA)" />
                <Bar dataKey="cohortB" fill="var(--color-cohortB)" />
                <Bar dataKey="cohortC" fill="var(--color-cohortC)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Predictive Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Projected Outcomes (Next 6 Months)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expected Enrollments</span>
                  <span className="font-medium">1,450 students</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projected Completions</span>
                  <span className="font-medium">1,135 students</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Employment Placements</span>
                  <span className="font-medium">734 students</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Risk Indicators</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">At-Risk Students</span>
                  <span className="font-medium text-red-600">127 students</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Resource Constraints</span>
                  <span className="font-medium text-yellow-600">Medium Risk</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Connectivity Issues</span>
                  <span className="font-medium text-green-600">Low Risk</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
