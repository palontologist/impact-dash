"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  MapPin, 
  Heart,
  Brain,
  Scale,
  UtensilsCrossed,
  Leaf,
  Building2,
  Handshake,
  DollarSign,
  Droplet,
  Zap,
  TreePine,
  Recycle
} from "lucide-react"

interface Metric {
  id: string
  name: string
  category: string
  description: string
  unit: string
  icon: React.ComponentType<{ className?: string }>
}

const AVAILABLE_METRICS: Metric[] = [
  // Education Metrics
  {
    id: "enrollment",
    name: "Youth Enrolled",
    category: "education",
    description: "Total participants registered in programs",
    unit: "count",
    icon: Users,
  },
  {
    id: "completion",
    name: "Completion Rate",
    category: "education",
    description: "Percentage successfully completing training",
    unit: "percentage",
    icon: GraduationCap,
  },
  {
    id: "employment",
    name: "Employment Rate",
    category: "education",
    description: "Secured employment post-training",
    unit: "percentage",
    icon: Briefcase,
  },
  {
    id: "certification",
    name: "Certification Rate",
    category: "education",
    description: "Achieved literacy certification",
    unit: "percentage",
    icon: TrendingUp,
  },
  {
    id: "rural_reach",
    name: "Rural Reach",
    category: "education",
    description: "Participants from low-connectivity areas",
    unit: "percentage",
    icon: MapPin,
  },
  
  // Human Constitution Metrics
  {
    id: "dignity_index",
    name: "Dignity Index",
    category: "human_constitution",
    description: "Measure of individual dignity and self-worth",
    unit: "score",
    icon: Heart,
  },
  {
    id: "maturity_index",
    name: "Maturity Index",
    category: "human_constitution",
    description: "Personal development and maturity level",
    unit: "score",
    icon: Brain,
  },
  {
    id: "wellbeing_score",
    name: "Individual Wellbeing",
    category: "human_constitution",
    description: "Overall wellbeing assessment",
    unit: "score",
    icon: Heart,
  },
  {
    id: "mental_health",
    name: "Mental Health Score",
    category: "human_constitution",
    description: "Mental health and emotional wellness",
    unit: "score",
    icon: Brain,
  },
  {
    id: "team_effectiveness",
    name: "Team Effectiveness",
    category: "human_constitution",
    description: "Collaborative team performance",
    unit: "score",
    icon: Users,
  },
  
  // Food Distribution Metrics
  {
    id: "food_bars_delivered",
    name: "Food Bars Delivered",
    category: "food",
    description: "Total nutritional bars distributed",
    unit: "count",
    icon: UtensilsCrossed,
  },
  {
    id: "meals_provided",
    name: "Meals Provided",
    category: "food",
    description: "Equivalent meals distributed",
    unit: "count",
    icon: UtensilsCrossed,
  },
  {
    id: "communities_served",
    name: "Communities Served",
    category: "food",
    description: "Number of communities reached",
    unit: "count",
    icon: MapPin,
  },
  {
    id: "vulnerable_individuals",
    name: "Vulnerable Individuals Reached",
    category: "food",
    description: "At-risk populations served",
    unit: "count",
    icon: Heart,
  },
  
  // Environmental Metrics
  {
    id: "ghg_emissions",
    name: "GHG Emissions Saved",
    category: "environmental",
    description: "Greenhouse gas emissions reduced",
    unit: "kg CO2e",
    icon: Leaf,
  },
  {
    id: "water_efficiency",
    name: "Water Efficiency",
    category: "environmental",
    description: "Water conservation metrics",
    unit: "liters",
    icon: Droplet,
  },
  {
    id: "energy_efficiency",
    name: "Energy Efficiency",
    category: "environmental",
    description: "Energy usage optimization",
    unit: "kWh",
    icon: Zap,
  },
  {
    id: "zero_waste",
    name: "Zero Waste Percentage",
    category: "environmental",
    description: "Waste reduction achievement",
    unit: "percentage",
    icon: Recycle,
  },
  {
    id: "upcycled_ingredients",
    name: "Upcycled Ingredients",
    category: "environmental",
    description: "Materials repurposed or recycled",
    unit: "count",
    icon: Recycle,
  },
  
  // Social Impact Metrics
  {
    id: "jobs_created",
    name: "Jobs Created",
    category: "social",
    description: "Employment opportunities generated",
    unit: "count",
    icon: Briefcase,
  },
  {
    id: "people_trained",
    name: "People Trained",
    category: "social",
    description: "Individuals receiving training",
    unit: "count",
    icon: GraduationCap,
  },
  {
    id: "partnerships",
    name: "Partnerships Established",
    category: "social",
    description: "Collaborative relationships formed",
    unit: "count",
    icon: Handshake,
  },
  {
    id: "community_investment",
    name: "Community Investment",
    category: "social",
    description: "Resources invested in communities",
    unit: "currency",
    icon: DollarSign,
  },
  
  // Governance Metrics
  {
    id: "donor_retention",
    name: "Donor Retention Rate",
    category: "governance",
    description: "Donor relationship sustainability",
    unit: "percentage",
    icon: TrendingUp,
  },
  {
    id: "stakeholder_engagement",
    name: "Stakeholder Engagement",
    category: "governance",
    description: "Active stakeholder participation",
    unit: "score",
    icon: Handshake,
  },
  {
    id: "transparency_score",
    name: "Transparency Score",
    category: "governance",
    description: "Organizational transparency rating",
    unit: "score",
    icon: Scale,
  },
]

const CATEGORIES = [
  { id: "all", label: "All Metrics" },
  { id: "education", label: "Education" },
  { id: "human_constitution", label: "Human Constitution" },
  { id: "food", label: "Food Distribution" },
  { id: "environmental", label: "Environmental" },
  { id: "social", label: "Social Impact" },
  { id: "governance", label: "Governance" },
]

interface CustomMetricSelectorProps {
  selectedMetrics: string[]
  onMetricsChange: (metrics: string[]) => void
}

export function CustomMetricSelector({ selectedMetrics, onMetricsChange }: CustomMetricSelectorProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredMetrics = activeCategory === "all" 
    ? AVAILABLE_METRICS 
    : AVAILABLE_METRICS.filter(m => m.category === activeCategory)

  const handleToggleMetric = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      onMetricsChange(selectedMetrics.filter(id => id !== metricId))
    } else {
      onMetricsChange([...selectedMetrics, metricId])
    }
  }

  const metricsByCategory = CATEGORIES.slice(1).map(cat => ({
    ...cat,
    count: selectedMetrics.filter(id => 
      AVAILABLE_METRICS.find(m => m.id === id)?.category === cat.id
    ).length,
    total: AVAILABLE_METRICS.filter(m => m.category === cat.id).length,
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Build Your Custom Dashboard</CardTitle>
          <CardDescription>
            Select the metrics that matter most to your organization. You can choose from various categories
            and track what&apos;s important to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="text-sm">
              {selectedMetrics.length} metrics selected
            </Badge>
            {metricsByCategory.map(cat => 
              cat.count > 0 && (
                <Badge key={cat.id} variant="outline" className="text-sm">
                  {cat.label}: {cat.count}
                </Badge>
              )
            )}
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-7 mb-6">
              {CATEGORIES.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map(category => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMetrics.map(metric => {
                    const Icon = metric.icon
                    const isSelected = selectedMetrics.includes(metric.id)
                    
                    return (
                      <Card
                        key={metric.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          isSelected ? "ring-2 ring-blue-600 bg-blue-50" : ""
                        }`}
                        onClick={() => handleToggleMetric(metric.id)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleToggleMetric(metric.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex-1">
                              <div className="flex items-start gap-2">
                                <Icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm mb-1">{metric.name}</h4>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    {metric.description}
                                  </p>
                                  <div className="flex gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {metric.category.replace('_', ' ')}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {metric.unit}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {selectedMetrics.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No metrics selected yet. Choose at least one metric to continue.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
