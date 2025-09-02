import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote, Star, TrendingUp, Users } from "lucide-react"

const testimonials = [
  {
    quote:
      "The AI training opened my eyes to possibilities I never knew existed. I now run my own digital marketing consultancy.",
    author: "Sarah M., Nairobi",
    outcome: "Entrepreneur",
  },
  {
    quote: "Thanks to this program, I secured a job as a data analyst at a tech company in Mombasa.",
    author: "James K., Mombasa",
    outcome: "Employed",
  },
]

const qualitativeMetrics = [
  {
    title: "Program Satisfaction",
    value: "4.7/5",
    icon: Star,
    description: "Average participant rating",
  },
  {
    title: "Skills Confidence",
    value: "89%",
    icon: TrendingUp,
    description: "Feel confident using AI tools",
  },
  {
    title: "Community Impact",
    value: "76%",
    icon: Users,
    description: "Sharing knowledge with others",
  },
]

export function QualitativeInsights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="h-5 w-5" />
            Participant Testimonials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="space-y-3">
              <blockquote className="text-sm italic text-muted-foreground">"{testimonial.quote}"</blockquote>
              <div className="flex items-center justify-between">
                <cite className="text-sm font-medium">— {testimonial.author}</cite>
                <Badge variant="secondary">{testimonial.outcome}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Qualitative Impact Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {qualitativeMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.title} className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{metric.title}</h4>
                    <span className="text-lg font-bold text-primary">{metric.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
