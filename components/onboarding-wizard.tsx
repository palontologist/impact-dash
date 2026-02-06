"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, Heart, UtensilsCrossed, Building2, UserCog, Scale, Target, Plus, X } from "lucide-react"
import { CustomMetricSelector } from "@/components/custom-metric-selector"
import { DataInputConfig } from "@/components/data-input-config"

interface Goal {
  id: string
  title: string
  target: string
  deadline: string
  metricType?: string
}

interface OnboardingData {
  userType: string
  profile: string
  industry: string
  reason: string[]
  goals: Goal[]
  customMetrics?: string[]
  dataInputMethod?: string
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    userType: "",
    profile: "",
    industry: "",
    reason: [],
    goals: [],
    customMetrics: [],
    dataInputMethod: "both",
  })
  const [newGoal, setNewGoal] = useState({ title: "", target: "", deadline: "", metricType: "" })

  // Calculate total steps based on profile selection
  const totalSteps = data.profile === "custom" ? 7 : 5
  const progressSteps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  const handleReasonToggle = (reason: string) => {
    setData(prev => ({
      ...prev,
      reason: prev.reason.includes(reason)
        ? prev.reason.filter(r => r !== reason)
        : [...prev.reason, reason]
    }))
  }

  const addGoal = () => {
    if (newGoal.title && newGoal.target) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        target: newGoal.target,
        deadline: newGoal.deadline || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        metricType: newGoal.metricType || 'custom',
      }
      setData(prev => ({
        ...prev,
        goals: [...prev.goals, goal]
      }))
      setNewGoal({ title: "", target: "", deadline: "", metricType: "" })
    }
  }

  const removeGoal = (goalId: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== goalId)
    }))
  }

  const handleNext = () => {
    // For custom profile: user type (1) -> profile (2) -> custom metrics (6) -> data config (7) -> industry (3) -> reason (4) -> goals (5) -> complete
    // For fixed profiles: user type (1) -> profile (2) -> industry (3) -> reason (4) -> goals (5) -> complete
    if (step === 2 && data.profile === "custom") {
      setStep(6) // Jump to custom metric selection (renumbered from 5)
    } else if (step === 6 && data.profile === "custom") {
      setStep(7) // Move to data input config (renumbered from 6)
    } else if (step === 7 && data.profile === "custom") {
      setStep(3) // Continue to industry selection
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    // Handle back navigation for custom profile
    if (step === 3 && data.profile === "custom") {
      setStep(7) // Go back to data input config
    } else if (step === 7 && data.profile === "custom") {
      setStep(6) // Go back to custom metrics
    } else if (step === 6 && data.profile === "custom") {
      setStep(2) // Go back to profile selection
    } else {
      setStep(step - 1)
    }
  }

  const handleComplete = async () => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      // Store profile selection in localStorage for immediate use
      localStorage.setItem("selectedProfile", data.profile)
      localStorage.setItem("selectedPackage", localStorage.getItem("selectedPackage") || "pilot-seed")
      
      // Store custom metrics if custom profile is selected
      if (data.profile === "custom" && data.customMetrics) {
        localStorage.setItem("customMetrics", JSON.stringify(data.customMetrics))
      }
      if (data.dataInputMethod) {
        localStorage.setItem("dataInputMethod", data.dataInputMethod)
      }
      
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Redirect to dashboard
        router.push("/dashboard")
        router.refresh()
      } else {
        console.error("Onboarding failed:", result.error)
        alert(`Setup failed: ${result.error || "Please try again"}`)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Onboarding error:", error)
      alert("Setup failed. Please try again.")
      setIsSubmitting(false)
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
            {progressSteps.map((s) => (
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

          {step === 5 && data.profile !== "custom" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <Label className="text-lg font-semibold">Set Your Sustainability Goals</Label>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Define measurable goals to track your progress. You can add more goals later from your dashboard.
              </p>
              
              {/* Add new goal form */}
              <Card className="p-4 bg-muted/50">
                <div className="grid gap-3">
                  <div>
                    <Label htmlFor="goal-title">Goal Title *</Label>
                    <Input
                      id="goal-title"
                      placeholder="e.g., Reduce carbon emissions by 25%"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="goal-target">Target Value *</Label>
                      <Input
                        id="goal-target"
                        placeholder="e.g., 25% reduction"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="goal-deadline">Target Date</Label>
                      <Input
                        id="goal-deadline"
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={addGoal}
                    disabled={!newGoal.title || !newGoal.target}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </Card>

              {/* Display added goals */}
              {data.goals.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Your Goals ({data.goals.length})</Label>
                  {data.goals.map((goal) => (
                    <Card key={goal.id} className="p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Target: {goal.target} • Deadline: {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'Not set'}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGoal(goal.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {data.goals.length === 0 && (
                <p className="text-sm text-center text-muted-foreground py-4">
                  No goals added yet. Add at least one goal to continue, or skip this step.
                </p>
              )}
            </div>
          )}

          {step === 6 && data.profile === "custom" && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Select Your Custom Metrics</Label>
              <CustomMetricSelector
                selectedMetrics={data.customMetrics || []}
                onMetricsChange={(metrics) => setData({ ...data, customMetrics: metrics })}
              />
            </div>
          )}

          {step === 7 && data.profile === "custom" && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Configure Data Input</Label>
              <DataInputConfig
                selectedMethod={data.dataInputMethod || "both"}
                onMethodChange={(method) => setData({ ...data, dataInputMethod: method })}
              />
            </div>
          )}

          {/* Goals step for custom profile */}
          {step === 5 && data.profile === "custom" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <Label className="text-lg font-semibold">Set Your Sustainability Goals</Label>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Define measurable goals aligned with your custom metrics. You can add more goals later from your dashboard.
              </p>
              
              {/* Add new goal form */}
              <Card className="p-4 bg-muted/50">
                <div className="grid gap-3">
                  <div>
                    <Label htmlFor="goal-title-custom">Goal Title *</Label>
                    <Input
                      id="goal-title-custom"
                      placeholder="e.g., Increase enrollment by 50%"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="goal-target-custom">Target Value *</Label>
                      <Input
                        id="goal-target-custom"
                        placeholder="e.g., 500 students"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="goal-deadline-custom">Target Date</Label>
                      <Input
                        id="goal-deadline-custom"
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={addGoal}
                    disabled={!newGoal.title || !newGoal.target}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </Card>

              {/* Display added goals */}
              {data.goals.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Your Goals ({data.goals.length})</Label>
                  {data.goals.map((goal) => (
                    <Card key={goal.id} className="p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Target: {goal.target} • Deadline: {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'Not set'}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGoal(goal.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {data.goals.length === 0 && (
                <p className="text-sm text-center text-muted-foreground py-4">
                  No goals added yet. Add at least one goal to continue, or skip this step.
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !data.userType) ||
                  (step === 2 && !data.profile) ||
                  (step === 3 && !data.industry) ||
                  (step === 4 && data.reason.length === 0) ||
                  (step === 6 && data.profile === "custom" && (!data.customMetrics || data.customMetrics.length === 0)) ||
                  (step === 7 && data.profile === "custom" && !data.dataInputMethod)
                }
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="ml-auto"
              >
                {isSubmitting ? "Setting up..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
