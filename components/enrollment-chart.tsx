"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const enrollmentData = [
  { month: "Aug 1-7", enrolled: 245, completed: 0 },
  { month: "Aug 8-14", enrolled: 567, completed: 12 },
  { month: "Aug 15-21", enrolled: 892, completed: 156 },
  { month: "Aug 22-28", enrolled: 1234, completed: 445 },
  { month: "Aug 29-31", enrolled: 1456, completed: 678 },
]

const chartConfig = {
  enrolled: {
    label: "Enrolled",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
}

export function EnrollmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment & Completion Trends</CardTitle>
        <CardDescription>Weekly progression of youth enrollment and program completion</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={enrollmentData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="enrolled"
                stroke="var(--color-chart-1)"
                strokeWidth={3}
                dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="var(--color-chart-2)"
                strokeWidth={3}
                dot={{ fill: "var(--color-chart-2)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
