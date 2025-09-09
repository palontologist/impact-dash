"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, Target, TrendingUp, Users, BarChart3 } from "lucide-react"

const sdgCalculations = [
  {
    sdg: "SDG 4 - Quality Education",
    formula: "Impact Score = (Completion Rate × 0.4) + (Certification Rate × 0.3) + (Learning Outcomes × 0.3)",
    calculation: "(78.3% × 0.4) + (82.1% × 0.3) + (85.2% × 0.3) = 81.5%",
    components: [
      { metric: "Completion Rate", weight: "40%", value: "78.3%", source: "Training records" },
      { metric: "Certification Rate", weight: "30%", value: "82.1%", source: "Assessment results" },
      { metric: "Learning Outcomes", weight: "30%", value: "85.2%", source: "Skills assessments" },
    ],
  },
  {
    sdg: "SDG 8 - Decent Work",
    formula: "Impact Score = (Employment Rate × 0.5) + (Income Increase × 0.3) + (Entrepreneurship × 0.2)",
    calculation: "(64.7% × 0.5) + (78.4% × 0.3) + (23% × 0.2) = 61.5%",
    components: [
      { metric: "Employment Rate", weight: "50%", value: "64.7%", source: "6-month follow-up" },
      { metric: "Income Increase", weight: "30%", value: "78.4%", source: "Salary surveys" },
      { metric: "Entrepreneurship Rate", weight: "20%", value: "23%", source: "Business registrations" },
    ],
  },
  {
    sdg: "SDG 10 - Reduced Inequalities",
    formula: "Impact Score = (Rural Participation × 0.4) + (Gender Balance × 0.3) + (Geographic Reach × 0.3)",
    calculation: "(45.2% × 0.4) + (52% × 0.3) + (68.3% × 0.3) = 54.2%",
    components: [
      { metric: "Rural Participation", weight: "40%", value: "45.2%", source: "Location data" },
      { metric: "Gender Balance", weight: "30%", value: "52%", source: "Enrollment records" },
      { metric: "Geographic Reach", weight: "30%", value: "68.3%", source: "County coverage" },
    ],
  },
]

const griCalculations = [
  {
    category: "GRI 201-1: Economic Value Generated",
    formula: "Direct Economic Value = Program Investment + Participant Income Gains + Local Supplier Spending",
    calculation: "$450K + $1.2M + $650K = $2.3M",
    breakdown: [
      { component: "Program Investment", value: "$450,000", description: "Direct program costs and infrastructure" },
      {
        component: "Participant Income Gains",
        value: "$1,200,000",
        description: "Aggregate salary increases post-training",
      },
      { component: "Local Supplier Spending", value: "$650,000", description: "Procurement from local vendors" },
    ],
  },
  {
    category: "GRI 404-1: Training Hours",
    formula: "Average Training Hours = Total Training Hours ÷ Total Participants",
    calculation: "341,640 hours ÷ 2,847 participants = 120 hours per person",
    breakdown: [
      { component: "Core AI Curriculum", value: "80 hours", description: "Foundational AI and ML concepts" },
      { component: "Practical Projects", value: "25 hours", description: "Hands-on application work" },
      { component: "Soft Skills Training", value: "15 hours", description: "Communication and professional skills" },
    ],
  },
  {
    category: "GRI 413-1: Community Engagement",
    formula: "Engagement Rate = (Communities with Active Programs ÷ Total Target Communities) × 100",
    calculation: "(15 counties ÷ 15 target counties) × 100 = 100%",
    breakdown: [
      { component: "Active Programs", value: "15 counties", description: "Counties with ongoing training programs" },
      { component: "Community Partnerships", value: "47 organizations", description: "Local partner organizations" },
      { component: "Stakeholder Meetings", value: "156 sessions", description: "Regular community consultations" },
    ],
  },
]

const sasbCalculations = [
  {
    metric: "TC-SI-330a.3: Skills Development Completion",
    formula: "Completion Rate = (Programs Completed ÷ Programs Started) × 100",
    calculation: "(2,847 completed ÷ 3,638 started) × 100 = 78.3%",
    factors: [
      { factor: "Program Quality", impact: "+12%", description: "High-quality curriculum design" },
      { factor: "Mentor Support", impact: "+8%", description: "1:1 mentorship availability" },
      { factor: "Connectivity Issues", impact: "-15%", description: "Rural internet limitations" },
      { factor: "Economic Pressures", impact: "-7%", description: "Need to work during training" },
    ],
  },
  {
    metric: "TC-SI-000.C: Employment Placement Rate",
    formula: "Placement Rate = (Employed within 6 months ÷ Program Graduates) × 100",
    calculation: "(1,842 employed ÷ 2,847 graduates) × 100 = 64.7%",
    factors: [
      { factor: "Skills Match", impact: "+18%", description: "Industry-relevant curriculum" },
      { factor: "Employer Partnerships", impact: "+12%", description: "Direct hiring partnerships" },
      { factor: "Market Conditions", impact: "-8%", description: "Economic environment challenges" },
      { factor: "Geographic Barriers", impact: "-5%", description: "Limited opportunities in rural areas" },
    ],
  },
]

const costEffectivenessFormulas = [
  {
    metric: "Cost per Beneficiary",
    formula: "Total Program Cost ÷ Number of Beneficiaries",
    calculation: "$2,410,000 ÷ 2,847 = $847 per beneficiary",
    benchmark: "Industry average: $1,200 per beneficiary (29% more efficient)",
  },
  {
    metric: "Return on Investment (ROI)",
    formula: "(Economic Value Generated - Program Investment) ÷ Program Investment × 100",
    calculation: "($2,300,000 - $450,000) ÷ $450,000 × 100 = 411% ROI",
    benchmark: "Target ROI: 300% (37% above target)",
  },
  {
    metric: "Social Return on Investment (SROI)",
    formula: "Total Social Value Created ÷ Total Investment",
    calculation: "$4,200,000 social value ÷ $450,000 investment = 9.3:1 SROI",
    benchmark: "Typical education programs: 4-6:1 (55% above average)",
  },
]

const impactOverviewCalculations = [
  {
    metric: "Youth Enrolled",
    formula: "Total Enrolled = Active Participants + Completed Participants + Dropped Out",
    calculation: "1,847 + 2,847 + 791 = 2,847 (net active enrollment)",
    methodology: [
      { step: "Registration Count", value: "3,638", description: "Initial registrations received" },
      { step: "Eligibility Verification", value: "3,124", description: "Participants meeting criteria (86%)" },
      { step: "Active Enrollment", value: "2,847", description: "Currently active or completed (91%)" },
    ],
    growthCalc: "Monthly Growth = ((Current Month - Previous Month) / Previous Month) × 100 = +12.5%",
  },
  {
    metric: "Completion Rate",
    formula: "Completion Rate = (Successfully Completed / Total Started) × 100",
    calculation: "(2,229 / 2,847) × 100 = 78.3%",
    methodology: [
      { step: "Minimum Requirements", value: "80% attendance", description: "Required session participation" },
      { step: "Assessment Score", value: "≥70%", description: "Minimum passing grade" },
      { step: "Project Submission", value: "Required", description: "Final capstone project" },
    ],
    growthCalc: "Improvement = Current Rate - Previous Rate = 78.3% - 73.1% = +5.2%",
  },
  {
    metric: "Employment Rate",
    formula: "Employment Rate = (Employed within 6 months / Program Graduates) × 100",
    calculation: "(1,442 / 2,229) × 100 = 64.7%",
    methodology: [
      { step: "6-Month Follow-up", value: "2,229 contacted", description: "Post-graduation tracking" },
      { step: "Response Rate", value: "89.2%", description: "Successful contact rate" },
      { step: "Employment Verification", value: "1,442 employed", description: "Confirmed employment status" },
    ],
    growthCalc: "Quarterly Improvement = 64.7% - 56.6% = +8.1% increase",
  },
  {
    metric: "Certification Rate",
    formula: "Certification Rate = (Certificates Awarded / Program Completers) × 100",
    calculation: "(1,830 / 2,229) × 100 = 82.1%",
    methodology: [
      { step: "Skills Assessment", value: "≥75%", description: "Technical competency threshold" },
      { step: "Portfolio Review", value: "Required", description: "Practical project evaluation" },
      { step: "Industry Validation", value: "External review", description: "Third-party certification body" },
    ],
    growthCalc: "Period Change = 82.1% - 78.7% = +3.4% improvement",
  },
  {
    metric: "Rural Reach",
    formula: "Rural Reach = (Rural Participants / Total Participants) × 100",
    calculation: "(1,287 / 2,847) × 100 = 45.2%",
    methodology: [
      {
        step: "Geographic Classification",
        value: "Kenya National Bureau",
        description: "Official rural/urban definitions",
      },
      { step: "Connectivity Assessment", value: "<10 Mbps", description: "Low-connectivity area criteria" },
      { step: "Infrastructure Score", value: "Rural index", description: "Access to digital infrastructure" },
    ],
    growthCalc: "Expansion Rate = 45.2% - 29.9% = +15.3% rural penetration increase",
  },
]

export function CalculationFormulas() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance">Calculation Methodologies</h1>
        <p className="text-muted-foreground mt-2">
          Detailed formulas and calculations for impact metrics, SDG alignment, GRI metrics, and SASB/ISSB indicators
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Impact Overview</TabsTrigger>
          <TabsTrigger value="sdg">SDG Alignment</TabsTrigger>
          <TabsTrigger value="gri">GRI Calculations</TabsTrigger>
          <TabsTrigger value="sasb">SASB/ISSB Metrics</TabsTrigger>
          <TabsTrigger value="efficiency">Cost Effectiveness</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="space-y-6">
            {impactOverviewCalculations.map((metric) => (
              <Card key={metric.metric}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {metric.metric}
                  </CardTitle>
                  <CardDescription>Core impact metric calculation methodology</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{metric.formula}</code>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Current Calculation:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{metric.calculation}</code>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Growth Calculation:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{metric.growthCalc}</code>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Methodology Steps:</h4>
                    {metric.methodology.map((step, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{step.step}</div>
                          <div className="text-sm text-muted-foreground">{step.description}</div>
                        </div>
                        <div className="text-lg font-bold text-emerald-600">{step.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sdg" className="space-y-6">
          <div className="space-y-6">
            {sdgCalculations.map((sdg) => (
              <Card key={sdg.sdg}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {sdg.sdg}
                  </CardTitle>
                  <CardDescription>Weighted scoring methodology for impact assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{sdg.formula}</code>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Calculation:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{sdg.calculation}</code>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Components:</h4>
                    {sdg.components.map((component, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{component.metric}</div>
                          <div className="text-sm text-muted-foreground">{component.source}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{component.weight}</Badge>
                          <div className="text-lg font-bold text-emerald-600 mt-1">{component.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gri" className="space-y-6">
          <div className="space-y-6">
            {griCalculations.map((gri) => (
              <Card key={gri.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    {gri.category}
                  </CardTitle>
                  <CardDescription>Global Reporting Initiative calculation methodology</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{gri.formula}</code>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Calculation:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{gri.calculation}</code>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Breakdown:</h4>
                    {gri.breakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{item.component}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                        <div className="text-lg font-bold text-blue-600">{item.value}</div>
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
            {sasbCalculations.map((sasb) => (
              <Card key={sasb.metric}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {sasb.metric}
                  </CardTitle>
                  <CardDescription>SASB/ISSB sector-specific calculation with impact factors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Base Formula:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{sasb.formula}</code>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Calculation:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{sasb.calculation}</code>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Impact Factors:</h4>
                    {sasb.factors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{factor.factor}</div>
                          <div className="text-sm text-muted-foreground">{factor.description}</div>
                        </div>
                        <Badge
                          variant={factor.impact.startsWith("+") ? "default" : "destructive"}
                          className="text-sm font-bold"
                        >
                          {factor.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <div className="space-y-6">
            {costEffectivenessFormulas.map((metric) => (
              <Card key={metric.metric}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {metric.metric}
                  </CardTitle>
                  <CardDescription>Cost-effectiveness and efficiency calculations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{metric.formula}</code>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Calculation:</h4>
                    <code className="text-sm bg-white p-2 rounded border block">{metric.calculation}</code>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Benchmark Comparison:</h4>
                    <p className="text-sm">{metric.benchmark}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}