"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, FileText, Target, TrendingUp, Users, Zap } from "lucide-react"

const griMetrics = [
  {
    category: "GRI 200: Economic",
    standards: [
      {
        code: "GRI 201-1",
        title: "Direct Economic Value Generated",
        value: "$2.3M",
        status: "Reported",
        alignment: "SDG 8",
      },
      {
        code: "GRI 204-1",
        title: "Proportion of Spending on Local Suppliers",
        value: "78%",
        status: "Reported",
        alignment: "SDG 8",
      },
    ],
  },
  {
    category: "GRI 400: Social",
    standards: [
      { code: "GRI 401-1", title: "New Employee Hires", value: "1,842", status: "Reported", alignment: "SDG 8" },
      {
        code: "GRI 404-1",
        title: "Average Hours of Training per Person",
        value: "120hrs",
        status: "Reported",
        alignment: "SDG 4",
      },
      {
        code: "GRI 405-1",
        title: "Diversity of Governance Bodies",
        value: "52% Female",
        status: "Reported",
        alignment: "SDG 5",
      },
      {
        code: "GRI 413-1",
        title: "Operations with Local Community Engagement",
        value: "100%",
        status: "Reported",
        alignment: "SDG 11",
      },
    ],
  },
]

const sasbMetrics = [
  {
    topic: "Human Capital Development",
    metrics: [
      {
        metric: "TC-SI-330a.1",
        description: "Percentage of employees with advanced degrees",
        value: "34%",
        target: "40%",
      },
      { metric: "TC-SI-330a.2", description: "Employee engagement score", value: "8.2/10", target: "8.5/10" },
      { metric: "TC-SI-330a.3", description: "Skills development programs completed", value: "2,847", target: "3,000" },
    ],
  },
  {
    topic: "Data Security & Privacy",
    metrics: [
      { metric: "TC-SI-230a.1", description: "Data security incidents", value: "0", target: "0" },
      { metric: "TC-SI-230a.2", description: "Privacy training completion rate", value: "98%", target: "100%" },
    ],
  },
  {
    topic: "Social Impact",
    metrics: [
      {
        metric: "TC-SI-000.A",
        description: "Youth reached in underserved communities",
        value: "2,847",
        target: "3,500",
      },
      { metric: "TC-SI-000.B", description: "Digital inclusion rate", value: "78.3%", target: "85%" },
      { metric: "TC-SI-000.C", description: "Employment placement rate", value: "64.7%", target: "70%" },
    ],
  },
]

const frameworkAlignment = [
  { framework: "GRI Standards", coverage: 85, color: "#10b981" },
  { framework: "SASB/ISSB", coverage: 78, color: "#3b82f6" },
  { framework: "SDG Alignment", coverage: 92, color: "#8b5cf6" },
  { framework: "TCFD", coverage: 45, color: "#f59e0b" },
]

const impactData = [
  { category: "Education Quality", gri: 92, sasb: 88, sdg: 95 },
  { category: "Gender Equality", gri: 78, sasb: 82, sdg: 85 },
  { category: "Employment", gri: 85, sasb: 90, sdg: 88 },
  { category: "Digital Inclusion", gri: 70, sasb: 85, sdg: 80 },
  { category: "Social Impact", gri: 88, sasb: 92, sdg: 90 },
]

const chartConfig = {
  gri: { label: "GRI", color: "hsl(var(--chart-1))" },
  sasb: { label: "SASB/ISSB", color: "hsl(var(--chart-2))" },
  sdg: { label: "SDG", color: "hsl(var(--chart-3))" },
}

export function ESGReporting() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">ESG Reporting Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive ESG metrics aligned with GRI Standards, SASB/ISSB frameworks, and SDG targets
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Framework Coverage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {frameworkAlignment.map((framework) => (
          <Card key={framework.framework}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{framework.framework}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{framework.coverage}%</span>
                <Badge variant={framework.coverage >= 80 ? "default" : "secondary"}>
                  {framework.coverage >= 80 ? "Complete" : "In Progress"}
                </Badge>
              </div>
              <Progress value={framework.coverage} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="gri" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gri">GRI Standards</TabsTrigger>
          <TabsTrigger value="sasb">SASB/ISSB</TabsTrigger>
          <TabsTrigger value="alignment">Framework Alignment</TabsTrigger>
          <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="gri" className="space-y-6">
          <div className="space-y-6">
            {griMetrics.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {category.category}
                  </CardTitle>
                  <CardDescription>
                    Global Reporting Initiative standards for {category.category.split(": ")[1].toLowerCase()}{" "}
                    performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.standards.map((standard) => (
                      <div key={standard.code} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{standard.code}</Badge>
                            <Badge variant="secondary">{standard.alignment}</Badge>
                          </div>
                          <h4 className="font-medium">{standard.title}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-600">{standard.value}</div>
                          <Badge variant="default" className="mt-1">
                            {standard.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sasb" className="space-y-6">
          <div className="space-y-6">
            {sasbMetrics.map((topic) => (
              <Card key={topic.topic}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    {topic.topic}
                  </CardTitle>
                  <CardDescription>SASB/ISSB sector-specific metrics for technology and social impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topic.metrics.map((metric) => (
                      <div key={metric.metric} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{metric.metric}</Badge>
                          </div>
                          <h4 className="font-medium">{metric.description}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                          <div className="text-sm text-muted-foreground">Target: {metric.target}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alignment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Framework Impact Alignment</CardTitle>
              <CardDescription>Comparative analysis across GRI, SASB/ISSB, and SDG frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="gri" fill="var(--color-gri)" />
                    <Bar dataKey="sasb" fill="var(--color-sasb)" />
                    <Bar dataKey="sdg" fill="var(--color-sdg)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Social Impact Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Youth Empowerment</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Digital Inclusion</span>
                    <span className="text-sm text-muted-foreground">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Gender Equality</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Economic Empowerment</span>
                    <span className="text-sm text-muted-foreground">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div>
                      <div className="font-medium">Cost per Beneficiary</div>
                      <div className="text-sm text-muted-foreground">Efficiency metric</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">$847</div>
                      <div className="text-xs text-emerald-600">15% below target</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Employment Rate</div>
                      <div className="text-sm text-muted-foreground">Post-training outcomes</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">64.7%</div>
                      <div className="text-xs text-blue-600">Above industry avg</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium">Rural Reach</div>
                      <div className="text-sm text-muted-foreground">Geographic inclusion</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">45.2%</div>
                      <div className="text-xs text-purple-600">Expanding coverage</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ESGReporting
