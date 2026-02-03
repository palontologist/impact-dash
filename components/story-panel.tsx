"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, FileText } from "lucide-react"

interface StoryPanelProps {
  title?: string
  summary: string
  insights?: string[]
  onExportPDF?: () => void
  onExportPNG?: () => void
  onShare?: () => void
}

export function StoryPanel({
  title = "Impact Summary",
  summary,
  insights,
  onExportPDF,
  onExportPNG,
  onShare,
}: StoryPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Auto-generated insights from your data</CardDescription>
          </div>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed">{summary}</p>
        </div>

        {insights && insights.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Key Insights</h4>
            <ul className="space-y-1">
              {insights.map((insight, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 space-y-2">
          <Button
            variant="default"
            className="w-full"
            onClick={onExportPDF}
          >
            <Download className="mr-2 h-4 w-4" />
            Export snapshot (PDF)
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onExportPNG}
            >
              <Download className="mr-2 h-4 w-4" />
              Export PNG
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share with team
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
