"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricTileProps {
  name: string
  value: string
  subtext?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  icon?: LucideIcon
  onClick?: () => void
  className?: string
}

export function MetricTile({
  name,
  value,
  subtext,
  trend = "neutral",
  trendValue,
  icon: Icon,
  onClick,
  className,
}: MetricTileProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  const trendColor = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  }[trend]

  const trendBg = {
    up: "bg-green-50",
    down: "bg-red-50",
    neutral: "bg-gray-50",
  }[trend]

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-all cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {name}
          </CardTitle>
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold">{value}</div>
          
          {(subtext || trendValue) && (
            <div className="flex items-center gap-2 flex-wrap">
              {trendValue && (
                <Badge
                  variant="secondary"
                  className={cn("gap-1", trendBg, trendColor)}
                >
                  <TrendIcon className="h-3 w-3" />
                  {trendValue}
                </Badge>
              )}
              {subtext && (
                <span className="text-sm text-muted-foreground">{subtext}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricTileGridProps {
  children: React.ReactNode
  cols?: 2 | 3 | 4 | 5
  className?: string
}

export function MetricTileGrid({ children, cols = 3, className }: MetricTileGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
  }[cols]

  return (
    <div className={cn("grid grid-cols-1 gap-4", gridCols, className)}>
      {children}
    </div>
  )
}
