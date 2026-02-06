"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ReportMetadata {
  generatedAt: string
  period: string
  dateRange: {
    start: string
    end: string
  }
  profileType: string
  userType: string
}

interface GeneratedReport {
  report: {
    executiveSummary: string
    ourApproach: string
    keyMetrics: Array<{
      name: string
      value: string
      change?: string
      context: string
    }>
    sustainabilityGoals: {
      overview: string
      progress: Array<{
        goal: string
        target: string
        current: string
        status: string
      }>
    }
    strategicInitiatives: Array<{
      title: string
      description: string
      impact: string
    }>
    stakeholderImpact: {
      clients: string
      employees: string
      communities: string
      environment: string
    }
    governanceAndOversight: string
    lookingForward: string
  }
  formattedMarkdown: string
  metadata: ReportMetadata
}

export function FormalReportGenerator() {
  const [reportPeriod, setReportPeriod] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setError(null)
    setGenerating(true)

    try {
      if (!startDate || !endDate) {
        throw new Error("Please select both start and end dates")
      }

      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportPeriod,
          startDate,
          endDate,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate report')
      }

      const data = await response.json()
      setGeneratedReport(data.data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
    } finally {
      setGenerating(false)
    }
  }

  const downloadMarkdown = () => {
    if (!generatedReport) return

    const blob = new Blob([generatedReport.formattedMarkdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sustainability-report-${generatedReport.metadata.period}-${new Date().getTime()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadJSON = () => {
    if (!generatedReport) return

    const blob = new Blob([JSON.stringify(generatedReport.report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-data-${generatedReport.metadata.period}-${new Date().getTime()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Formal Impact Report
          </CardTitle>
          <CardDescription>
            Create a professional 2-page sustainability report using AI-powered analysis of your data.
            Reports follow best practices from leading institutions and are suitable for board presentations,
            investor relations, and stakeholder communications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="reportPeriod">Report Period</Label>
              <Select value={reportPeriod} onValueChange={(v) => setReportPeriod(v as typeof reportPeriod)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-3">Report Includes:</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Executive Summary',
                'Key Metrics Analysis',
                'Sustainability Goals',
                'Strategic Initiatives',
                'Stakeholder Impact',
                'Governance Overview',
                'Forward Commitments',
                'Framework Alignment',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generating || !startDate || !endDate}
            className="w-full"
            size="lg"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {generatedReport && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Sustainability Report</CardTitle>
                <CardDescription>
                  Generated on {new Date(generatedReport.metadata.generatedAt).toLocaleDateString()} •{' '}
                  {generatedReport.metadata.period} report
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={downloadMarkdown} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Markdown
                </Button>
                <Button onClick={downloadJSON} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  JSON
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
                <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Executive Summary</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {generatedReport.report.executiveSummary}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Our Approach</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {generatedReport.report.ourApproach}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-3">
                {generatedReport.report.keyMetrics.map((metric, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{metric.name}</h4>
                        <Badge variant="secondary">{metric.value}</Badge>
                      </div>
                      {metric.change && (
                        <p className="text-sm text-green-600 mb-1">{metric.change}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{metric.context}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="goals" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {generatedReport.report.sustainabilityGoals.overview}
                </p>
                <div className="space-y-3">
                  {generatedReport.report.sustainabilityGoals.progress.map((goal, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{goal.goal}</h4>
                          <Badge
                            variant={
                              goal.status === 'exceeded'
                                ? 'default'
                                : goal.status === 'on-track'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {goal.status === 'exceeded'
                              ? '✓✓ Exceeded'
                              : goal.status === 'on-track'
                              ? '✓ On Track'
                              : '⚠ Needs Attention'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Target:</span> {goal.target}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Current:</span> {goal.current}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="initiatives" className="space-y-3">
                {generatedReport.report.strategicInitiatives.map((initiative, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-4 space-y-2">
                      <h4 className="font-semibold">{initiative.title}</h4>
                      <p className="text-sm text-muted-foreground">{initiative.description}</p>
                      <div className="pt-2 border-t">
                        <p className="text-sm">
                          <span className="font-medium">Impact:</span> {initiative.impact}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="stakeholders" className="space-y-3">
                {Object.entries(generatedReport.report.stakeholderImpact).map(([key, value]) => (
                  <Card key={key}>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold capitalize mb-2">{key}</h4>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
