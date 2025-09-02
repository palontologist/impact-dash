import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, Briefcase, TrendingUp, MapPin } from "lucide-react"

/**
 * Interface for metric data structure
 */
interface Metric {
  title: string
  value: string
  change: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

/**
 * Static data for key performance metrics
 */
const metrics: Metric[] = [
  {
    title: "Youth Enrolled",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    description: "Total participants registered",
  },
  {
    title: "Completion Rate",
    value: "78.3%",
    change: "+5.2%",
    icon: GraduationCap,
    description: "Successfully completed training",
  },
  {
    title: "Employment Rate",
    value: "64.7%",
    change: "+8.1%",
    icon: Briefcase,
    description: "Secured employment post-training",
  },
  {
    title: "Certification Rate",
    value: "82.1%",
    change: "+3.4%",
    icon: TrendingUp,
    description: "Achieved AI literacy certification",
  },
  {
    title: "Rural Reach",
    value: "45.2%",
    change: "+15.3%",
    icon: MapPin,
    description: "Participants from low-connectivity areas",
  },
]

/**
 * MetricsOverview Component
 * 
 * Displays key performance indicators (KPIs) for the AI education program
 * in a responsive grid layout. Shows enrollment, completion, employment,
 * certification rates, and rural reach statistics.
 * 
 * @returns JSX element containing the metrics overview cards
 */
export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {metric.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
