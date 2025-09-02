import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const outcomes = [
  {
    category: "AI Literacy Levels",
    metrics: [
      { label: "Beginner", value: 45, total: 100, color: "bg-chart-3" },
      { label: "Intermediate", value: 35, total: 100, color: "bg-chart-2" },
      { label: "Advanced", value: 20, total: 100, color: "bg-chart-1" },
    ],
  },
  {
    category: "Post-Training Outcomes",
    metrics: [
      { label: "Higher Education", value: 28, total: 100, color: "bg-chart-1" },
      { label: "Employment", value: 65, total: 100, color: "bg-chart-2" },
      { label: "Entrepreneurship", value: 23, total: 100, color: "bg-chart-4" },
    ],
  },
]

export function OutcomesGrid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Outcomes & Progression</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {outcomes.map((outcome) => (
          <div key={outcome.category} className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground">{outcome.category}</h4>
            <div className="space-y-3">
              {outcome.metrics.map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <Badge variant="secondary">{metric.value}%</Badge>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
