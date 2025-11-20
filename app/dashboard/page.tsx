"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { EnrollmentChart } from "@/components/enrollment-chart"
import { OutcomesGrid } from "@/components/outcomes-grid"
import { SDGMapping } from "@/components/sdg-mapping"
import { QualitativeInsights } from "@/components/qualitative-insights"
import { ResourceEfficiency } from "@/components/resource-efficiency"
import { StudentManagement } from "@/components/student-management"
import { DataInputPanel } from "@/components/data-input-panel"
import { LongTermAnalysis } from "@/components/long-term-analysis"
import ESGReporting from "@/components/esg-reporting"
import { CalculationFormulas } from "@/components/calculation-formulas"
import { HumanConstitutionDashboard } from "@/components/human-constitution-dashboard"
import { E2GFoodDashboard } from "@/components/e2g-food-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Heart, UtensilsCrossed } from "lucide-react"

type ProfileType = "education" | "human_constitution" | "e2g_food"

export default function DashboardPage() {
  const [currentProfile, setCurrentProfile] = useState<ProfileType>("education")

  // Load user's selected profile from localStorage or API
  useEffect(() => {
    const savedProfile = localStorage.getItem("selectedProfile") as ProfileType
    if (savedProfile) {
      setCurrentProfile(savedProfile)
    }
  }, [])

  const handleProfileChange = (profile: ProfileType) => {
    setCurrentProfile(profile)
    localStorage.setItem("selectedProfile", profile)
  }

  const PROFILE_OPTIONS = [
    { value: "education", label: "Education & Upskilling", icon: GraduationCap },
    { value: "human_constitution", label: "Human Constitution", icon: Heart },
    { value: "e2g_food", label: "E2G Food Distribution", icon: UtensilsCrossed },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Selector */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Select Your Impact Profile</CardTitle>
              <CardDescription>
                Switch between different profiles to view relevant metrics and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {PROFILE_OPTIONS.map((option) => {
                  const Icon = option.icon
                  return (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        currentProfile === option.value ? "ring-2 ring-blue-600" : ""
                      }`}
                      onClick={() => handleProfileChange(option.value as ProfileType)}
                    >
                      <CardContent className="pt-6 flex items-center gap-3">
                        <Icon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                        <span className="font-semibold">{option.label}</span>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile-specific content */}
        {currentProfile === "education" && (
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Impact Overview</TabsTrigger>
              <TabsTrigger value="students">Student Management</TabsTrigger>
              <TabsTrigger value="data">Data Input</TabsTrigger>
              <TabsTrigger value="analysis">Long-term Analysis</TabsTrigger>
              <TabsTrigger value="esg">ESG Reporting</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <MetricsOverview />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <EnrollmentChart />
                <OutcomesGrid />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <SDGMapping />
                </div>
                <ResourceEfficiency />
              </div>

              <QualitativeInsights />

              <CalculationFormulas />
            </TabsContent>

            <TabsContent value="students">
              <StudentManagement />
            </TabsContent>

            <TabsContent value="data">
              <DataInputPanel />
            </TabsContent>

            <TabsContent value="analysis">
              <LongTermAnalysis />
            </TabsContent>

            <TabsContent value="esg">
              <ESGReporting />
            </TabsContent>
          </Tabs>
        )}

        {currentProfile === "human_constitution" && <HumanConstitutionDashboard />}

        {currentProfile === "e2g_food" && <E2GFoodDashboard />}
      </main>
    </div>
  )
}
