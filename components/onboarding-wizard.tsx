"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, Heart, UtensilsCrossed, Building2, UserCog, Scale } from "lucide-react"

interface OnboardingData {
  userType: string
  profile: string
  industry: string
  reason: string[]
}

const USER_TYPES = [
  { value: "consultant", label: "Consultant", icon: UserCog, description: "Advise clients on impact measurement" },
  { value: "enterprise", label: "Enterprise", icon: Building2, description: "Track organizational impact" },
  { value: "regulator", label: "Regulator", icon: Scale, description: "Monitor compliance and standards" },
]

const PROFILES = [
  { 
    value: "education", 
    label: "Education", 
    icon: GraduationCap,
    description: "Track learning outcomes, platform innovation, environmental footprint, climate education, and talent development"
  },
  { 
    value: "finance", 
    label: "Finance", 
    icon: Building2,
    description: "Monitor green loans, ESG-linked assets, operational emissions, financial inclusion, and governance"
  },
  { 
    value: "real_estate", 
    label: "Real Estate / Energy", 
    icon: Building2,
    description: "Track energy & emissions intensity, water use, jobs & training, community investment, sustainability satisfaction"
  },
  { 
    value: "human_constitution", 
    label: "Human Constitution", 
    icon: Heart,
    description: "Measure dignity, maturity, wellbeing, mental health, relationships, and team effectiveness"
  },
  { 
    value: "e2g_food", 
    label: "E2G Food Distribution", 
    icon: UtensilsCrossed,
    description: "Monitor food bars delivered, meals provided, communities served, vulnerable individuals, and regional distribution"
  },
  { 
    value: "custom", 
    label: "Custom", 
    icon: UserCog,
    description: "Build your own custom metric set tailored to your specific needs"
  },
]

const REASONS = [
  { value: "funding", label: "Funding & Grant Reporting" },
  { value: "regulation", label: "Regulatory Compliance" },
  { value: "impact_measurement", label: "Impact Measurement" },
  { value: "esg_reporting", label: "ESG Reporting" },
  { value: "stakeholder_communication", label: "Stakeholder Communication" },
  { value: "program_improvement", label: "Program Improvement" },
]

export function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    userType: "",
    profile: "",
    industry: "",
    reason: [],
  })

  const handleReasonToggle = (reason: string) => {
    setData(prev => ({
      ...prev,
      reason: prev.reason.includes(reason)
        ? prev.reason.filter(r => r !== reason)
        : [...prev.reason, reason]
    }))
  }

  const handleComplete = async () => {
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Onboarding error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Impact Dashboard</CardTitle>
          <CardDescription>
            Let&apos;s set up your personalized impact measurement experience
          </CardDescription>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">What best describes you?</Label>
              <div className="grid md:grid-cols-3 gap-4">
                {USER_TYPES.map((type) => {
                  const Icon = type.icon
                  return (
                    <Card
                      key={type.value}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        data.userType === type.value ? "ring-2 ring-blue-600" : ""
                      }`}
                      onClick={() => setData({ ...data, userType: type.value })}
                    >
                      <CardContent className="pt-6 text-center space-y-2">
                        <Icon className="w-12 h-12 mx-auto text-blue-600" />
                        <h3 className="font-semibold">{type.label}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Select Your Impact Profile</Label>
              <div className="grid gap-4">
                {PROFILES.map((profile) => {
                  const Icon = profile.icon
                  return (
                    <Card
                      key={profile.value}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        data.profile === profile.value ? "ring-2 ring-blue-600" : ""
                      }`}
                      onClick={() => setData({ ...data, profile: profile.value })}
                    >
                      <CardContent className="pt-6 flex items-start gap-4">
                        <Icon className="w-10 h-10 text-blue-600 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg">{profile.label}</h3>
                          <p className="text-sm text-muted-foreground">{profile.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">What industry are you in?</Label>
              <Select value={data.industry} onValueChange={(value) => setData({ ...data, industry: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education & Training</SelectItem>
                  <SelectItem value="healthcare">Healthcare & Wellness</SelectItem>
                  <SelectItem value="agriculture">Agriculture & Food</SelectItem>
                  <SelectItem value="nonprofit">Non-Profit / NGO</SelectItem>
                  <SelectItem value="social_enterprise">Social Enterprise</SelectItem>
                  <SelectItem value="government">Government / Public Sector</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Why are you using this dashboard?</Label>
              <div className="space-y-2">
                {REASONS.map((reason) => (
                  <div key={reason.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={reason.value}
                      checked={data.reason.includes(reason.value)}
                      onCheckedChange={() => handleReasonToggle(reason.value)}
                    />
                    <label
                      htmlFor={reason.value}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {reason.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !data.userType) ||
                  (step === 2 && !data.profile) ||
                  (step === 3 && !data.industry)
                }
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={data.reason.length === 0}
                className="ml-auto"
              >
                Complete Setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
