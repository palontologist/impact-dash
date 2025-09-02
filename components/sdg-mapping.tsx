import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/**
 * Interface for SDG mapping data structure
 */
interface SDGMapping {
  sdg: string
  title: string
  impact: "High" | "Medium" | "Low"
  metrics: string[]
  color: string
}

/**
 * Static data mapping program impact to UN Sustainable Development Goals
 */
const sdgMappings: SDGMapping[] = [
  {
    sdg: "SDG 4",
    title: "Quality Education",
    impact: "High",
    metrics: ["2,847 youth trained", "78.3% completion rate", "82.1% certification rate"],
    color: "bg-red-100 text-red-800",
  },
  {
    sdg: "SDG 8",
    title: "Decent Work & Economic Growth",
    impact: "High",
    metrics: ["64.7% employment rate", "23% entrepreneurship rate", "$2.3M economic impact"],
    color: "bg-purple-100 text-purple-800",
  },
  {
    sdg: "SDG 10",
    title: "Reduced Inequalities",
    impact: "Medium",
    metrics: ["45.2% rural participants", "52% female enrollment", "15 counties reached"],
    color: "bg-pink-100 text-pink-800",
  },
  {
    sdg: "SDG 9",
    title: "Industry, Innovation & Infrastructure",
    impact: "Medium",
    metrics: ["AI literacy programs", "Digital skills development", "Tech innovation training"],
    color: "bg-orange-100 text-orange-800",
  },
  {
    sdg: "SDG 1",
    title: "No Poverty",
    impact: "Medium",
    metrics: ["Income generation opportunities", "Skills for employment", "Economic empowerment"],
    color: "bg-red-100 text-red-800",
  },
  {
    sdg: "SDG 5",
    title: "Gender Equality",
    impact: "Low",
    metrics: ["52% female participation", "Gender-inclusive curriculum", "Equal opportunity access"],
    color: "bg-red-100 text-red-800",
  },
]

/**
 * SDGMapping Component
 * 
 * Visualizes how the AI education program aligns with and contributes to
 * UN Sustainable Development Goals. Shows impact level and specific metrics
 * for each relevant SDG.
 * 
 * Features:
 * - Color-coded impact levels (High, Medium, Low)
 * - Detailed metrics for each SDG alignment
 * - Responsive grid layout
 * - Visual indicators for easy scanning
 * 
 * @returns JSX element containing the SDG mapping visualization
 */
export function SDGMapping() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainable Development Goals Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sdgMappings.map((sdg) => (
            <div key={sdg.sdg} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {sdg.sdg}
                  </Badge>
                  <h4 className="font-semibold text-sm">{sdg.title}</h4>
                </div>
                <Badge
                  className={`${
                    sdg.impact === "High"
                      ? "bg-primary text-primary-foreground"
                      : sdg.impact === "Medium"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {sdg.impact}
                </Badge>
              </div>
              <ul className="space-y-1">
                {sdg.metrics.map((metric, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
