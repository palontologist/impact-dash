import { Button } from "@/components/ui/button"
import { Download, Share2, Calendar, Settings } from "lucide-react"

/**
 * DashboardHeader Component
 * 
 * Main header for the impact dashboard containing the title, description,
 * reporting period, and action buttons for settings, sharing, and data export.
 * 
 * Features:
 * - Responsive layout that stacks on mobile devices
 * - Campaign information and time period display
 * - Quick action buttons for common tasks
 * 
 * @returns JSX element containing the dashboard header
 */
export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">FrontForumFocus Impact Dashboard</h1>
            <p className="text-muted-foreground mt-2">AI Education Campaign for Marginalized Youth in Kenya</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>August 1st - August 31st, 2024</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
