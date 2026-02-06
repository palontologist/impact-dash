"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  FileText, 
  Database, 
  Download, 
  Settings,
  Home,
  LogOut,
  ChevronDown,
  User
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { MetricTile, MetricTileGrid } from "@/components/metric-tile"
import { StoryPanel } from "@/components/story-panel"
import { DataInputPanel } from "@/components/data-input-panel"
import { FormalReportGenerator } from "@/components/formal-report-generator"

type ProfileType = "education" | "finance" | "real_estate" | "human_constitution" | "e2g_food" | "custom"

const SIDEBAR_ITEMS = [
  { icon: Home, label: "Overview", value: "overview" },
  { icon: FileText, label: "Reports", value: "reports" },
  { icon: User, label: "Profile", value: "profile" },
  { icon: Database, label: "Data Input", value: "data" },
  { icon: Download, label: "Export", value: "export" },
  { icon: Settings, label: "Settings", value: "settings" },
]

export function DashboardLayout() {
  const router = useRouter()
  const [currentProfile, setCurrentProfile] = useState<ProfileType>("education")
  const [activeView, setActiveView] = useState("overview")

  useEffect(() => {
    const savedProfile = localStorage.getItem("selectedProfile") as ProfileType
    if (savedProfile) {
      setCurrentProfile(savedProfile)
    }
  }, [])

  const handleExportPDF = () => {
    alert("PDF export feature coming soon!")
  }

  const handleExportPNG = () => {
    alert("PNG export feature coming soon!")
  }

  const handleShare = () => {
    alert("Share feature coming soon!")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Impact</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.value}>
                  <button
                    onClick={() => {
                      if (item.value === "profile") {
                        router.push("/dashboard/profile")
                      } else {
                        setActiveView(item.value)
                      }
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      activeView === item.value
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                  U
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">Account</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveView("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/")}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {activeView === "overview" && (
            <>
              {/* Profile Switcher */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">Your Impact Overview</h1>
                    <p className="text-muted-foreground mt-1">
                      Live snapshot of your key metrics
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Switch Profile
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => setCurrentProfile("education")}>
                        Education
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentProfile("finance")}>
                        Finance
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentProfile("real_estate")}>
                        Real Estate / Energy
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentProfile("human_constitution")}>
                        Human Constitution
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentProfile("e2g_food")}>
                        E2G Food Distribution
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentProfile("custom")}>
                        Custom
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Education Profile */}
              {currentProfile === "education" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">OiEDU Impact – 5 Pillars</h2>
                      <MetricTileGrid cols={2}>
                        <MetricTile
                          name="Learning Outcomes"
                          value="78%"
                          subtext="students meeting targets"
                          trend="up"
                          trendValue="+6 pts vs last term"
                        />
                        <MetricTile
                          name="Platform Innovation & Digital Inclusion"
                          value="3.2"
                          subtext="avg logins / student / week"
                          trend="up"
                          trendValue="91% active weekly"
                        />
                        <MetricTile
                          name="Environmental Footprint & Emissions"
                          value="12.4 tCO₂e"
                          subtext="this term"
                          trend="down"
                          trendValue="-8% vs baseline"
                        />
                        <MetricTile
                          name="Environmental Literacy & Climate Education"
                          value="420"
                          subtext="students completed climate modules"
                          trend="up"
                          trendValue="34 hrs delivered"
                        />
                        <MetricTile
                          name="Talent Development & Organisational Learning"
                          value="24"
                          subtext="staff trained this term"
                          trend="neutral"
                          trendValue="3 initiatives in progress"
                        />
                      </MetricTileGrid>
                    </div>
                  </div>

                  <div>
                    <StoryPanel
                      summary="This month, learning outcomes improved significantly with 78% of students meeting their targets—a 6-point increase from last term. Platform engagement remains strong with 91% of students logging in at least weekly. Environmental footprint decreased by 8%, while climate education expanded to 420 students completing modules."
                      insights={[
                        "Strongest growth in learning outcomes (+6 pts)",
                        "Environmental footprint reduction exceeded targets",
                        "Climate education reach expanded by 23%",
                        "Staff training initiatives showing early promise"
                      ]}
                      onExportPDF={handleExportPDF}
                      onExportPNG={handleExportPNG}
                      onShare={handleShare}
                    />
                  </div>
                </div>
              )}

              {/* Finance Profile */}
              {currentProfile === "finance" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Banorte Financial Impact</h2>
                      <MetricTileGrid cols={2}>
                        <MetricTile
                          name="Green Loans Portfolio"
                          value="$2.4B"
                          subtext="total green financing"
                          trend="up"
                          trendValue="+15% YoY"
                        />
                        <MetricTile
                          name="ESG-Linked Assets"
                          value="38%"
                          subtext="of total AUM"
                          trend="up"
                          trendValue="+4 pts"
                        />
                        <MetricTile
                          name="Operational Emissions"
                          value="8,420 tCO₂e"
                          subtext="this quarter"
                          trend="down"
                          trendValue="-12% vs baseline"
                        />
                        <MetricTile
                          name="Financial Inclusion"
                          value="156K"
                          subtext="underserved customers served"
                          trend="up"
                          trendValue="+34K this year"
                        />
                        <MetricTile
                          name="Community Investment"
                          value="$8.2M"
                          subtext="invested in local programs"
                          trend="up"
                          trendValue="45 initiatives"
                        />
                      </MetricTileGrid>
                    </div>
                  </div>

                  <div>
                    <StoryPanel
                      summary="Banorte's green loans portfolio grew to $2.4B this quarter, representing a 15% year-over-year increase. ESG-linked assets now comprise 38% of total AUM. Operational emissions decreased 12% while financial inclusion efforts reached 156K underserved customers—exceeding annual targets."
                      insights={[
                        "Green financing exceeded growth targets",
                        "ESG assets approaching 40% milestone",
                        "Emissions reduction ahead of schedule",
                        "Financial inclusion expanded to new regions"
                      ]}
                      onExportPDF={handleExportPDF}
                      onExportPNG={handleExportPNG}
                      onShare={handleShare}
                    />
                  </div>
                </div>
              )}

              {/* Real Estate Profile */}
              {currentProfile === "real_estate" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Sinatra Holdings Impact</h2>
                      <MetricTileGrid cols={2}>
                        <MetricTile
                          name="Energy & Emissions Intensity"
                          value="45 kWh/m²"
                          subtext="per property"
                          trend="down"
                          trendValue="2.1 tCO₂e per guest night"
                        />
                        <MetricTile
                          name="Water Use & Conservation"
                          value="180 L/guest"
                          subtext="per night average"
                          trend="down"
                          trendValue="-18% vs last year"
                        />
                        <MetricTile
                          name="Jobs & Training"
                          value="890"
                          subtext="local employees"
                          trend="up"
                          trendValue="120 upskilled this quarter"
                        />
                        <MetricTile
                          name="Community Investment"
                          value="15"
                          subtext="programmes active"
                          trend="up"
                          trendValue="3,200 beneficiaries"
                        />
                        <MetricTile
                          name="Guest Satisfaction on Sustainability"
                          value="8.4/10"
                          subtext="from guest surveys"
                          trend="up"
                          trendValue="+0.6 pts"
                        />
                      </MetricTileGrid>
                    </div>
                  </div>

                  <div>
                    <StoryPanel
                      summary="Sinatra Holdings' energy efficiency improvements drove a significant reduction in emissions intensity to 45 kWh/m². Water conservation efforts achieved an 18% year-over-year decrease. Local employment reached 890 jobs, with 120 staff completing upskilling programs this quarter. Guest satisfaction with sustainability initiatives increased to 8.4/10."
                      insights={[
                        "Energy intensity down across all properties",
                        "Water conservation exceeded targets",
                        "Local hiring and training programs expanded",
                        "Guest satisfaction with sustainability rising"
                      ]}
                      onExportPDF={handleExportPDF}
                      onExportPNG={handleExportPNG}
                      onShare={handleShare}
                    />
                  </div>
                </div>
              )}

              {/* Human Constitution Profile */}
              {currentProfile === "human_constitution" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Human Constitution Wellbeing Radar</h2>
                      <MetricTileGrid cols={2}>
                        <MetricTile
                          name="Dignity Index"
                          value="8.5"
                          trend="up"
                          trendValue="+12%"
                        />
                        <MetricTile
                          name="Maturity Index"
                          value="7.8"
                          trend="up"
                          trendValue="+8%"
                        />
                        <MetricTile
                          name="Wellbeing"
                          value="8.2"
                          trend="up"
                          trendValue="+5%"
                        />
                        <MetricTile
                          name="Mental Health"
                          value="7.9"
                          trend="up"
                          trendValue="+10%"
                        />
                      </MetricTileGrid>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Relationships & Team Effectiveness</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Relationship Trust</span>
                            <span className="font-semibold text-lg">8.4/10</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Team Effectiveness</span>
                            <span className="font-semibold text-lg">8.1/10</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Social Cohesion</span>
                            <span className="font-semibold text-lg">7.8/10</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Focus This Quarter</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Work-life balance & stress management programs</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Ethical decision-making workshops</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Social cohesion building activities</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <StoryPanel
                      summary="Human Constitution metrics show strong positive trends across all dimensions. The Dignity Index increased by 12% to 8.5, while Mental Health metrics improved by 10% to 7.9. Team effectiveness and relationship trust remain high at 8.1 and 8.4 respectively, indicating a healthy organizational culture."
                      insights={[
                        "Dignity Index at highest level this year (+12%)",
                        "Mental health support showing measurable impact",
                        "Team relationships strengthening",
                        "Focus needed on work-life balance"
                      ]}
                      onExportPDF={handleExportPDF}
                      onExportPNG={handleExportPNG}
                      onShare={handleShare}
                    />
                  </div>
                </div>
              )}

              {/* E2G Food Profile */}
              {currentProfile === "e2g_food" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">E2G Food Distribution Impact</h2>
                      <MetricTileGrid cols={2}>
                        <MetricTile
                          name="Food Bars Delivered"
                          value="1.2M"
                          trend="up"
                          trendValue="+23%"
                        />
                        <MetricTile
                          name="Meals Provided"
                          value="2.4M"
                          subtext="equivalent meals"
                          trend="up"
                          trendValue="+19%"
                        />
                        <MetricTile
                          name="Communities Served"
                          value="145"
                          subtext="across 12 regions"
                          trend="up"
                          trendValue="+18 communities"
                        />
                        <MetricTile
                          name="Vulnerable Individuals Reached"
                          value="58K"
                          trend="up"
                          trendValue="+12K this year"
                        />
                      </MetricTileGrid>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Jobs & Local Production</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold">840</div>
                            <div className="text-sm text-muted-foreground">Jobs Created</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">67</div>
                            <div className="text-sm text-muted-foreground">Microfarms</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">1,200</div>
                            <div className="text-sm text-muted-foreground">People Trained</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">78%</div>
                            <div className="text-sm text-muted-foreground">Local Production</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Regional Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">East Africa</span>
                            <span className="font-semibold">485K bars</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">South Asia</span>
                            <span className="font-semibold">420K bars</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Latin America</span>
                            <span className="font-semibold">295K bars</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <StoryPanel
                      summary="E2G Food Distribution delivered 1.2M food bars this quarter—a 23% increase year-over-year—providing 2.4M equivalent meals across 145 communities in 12 regions. The program reached 58K vulnerable individuals, with 78% of production sourced locally through 67 microfarms, creating 840 jobs and training 1,200 people in sustainable farming."
                      insights={[
                        "Food bar delivery up 23% YoY",
                        "Reached 18 new communities",
                        "Local production at 78%, creating sustainable jobs",
                        "Training programs expanded to 1,200 farmers"
                      ]}
                      onExportPDF={handleExportPDF}
                      onExportPNG={handleExportPNG}
                      onShare={handleShare}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {activeView === "reports" && (
            <FormalReportGenerator />
          )}

          {activeView === "data" && (
            <DataInputPanel />
          )}

          {activeView === "export" && (
            <Card>
              <CardHeader>
                <CardTitle>Export</CardTitle>
                <CardDescription>Download your impact data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Export features coming soon...</p>
              </CardContent>
            </Card>
          )}

          {activeView === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your dashboard preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings features coming soon...</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
