"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Building2, Target, Shield, Plus, X, Save } from "lucide-react"

interface Goal {
  id: string
  title: string
  target: string
  deadline: string
  status?: string
}

interface CompanyProfile {
  id: number
  name: string
  email: string
  userType: string
  selectedProfile: string
  industry: string
  companyDescription?: string
  companySize?: string
  website?: string
  headquarters?: string
  foundedYear?: number
  governanceStructure?: string
  sustainabilityOfficer?: string
  reportingFrameworks?: string
  goals?: string
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [frameworks, setFrameworks] = useState<string[]>([])
  const [newGoal, setNewGoal] = useState({ title: "", target: "", deadline: "" })

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      setLoading(true)
      const res = await fetch("/api/profile/details")
      if (!res.ok) throw new Error("Failed to load profile")
      
      const data = await res.json()
      setProfile(data.profile)
      
      // Parse goals
      if (data.profile.goals) {
        try {
          const parsedGoals = JSON.parse(data.profile.goals)
          setGoals(Array.isArray(parsedGoals) ? parsedGoals : [])
        } catch (e) {
          console.error("Error parsing goals:", e)
        }
      }
      
      // Parse frameworks
      if (data.profile.reportingFrameworks) {
        try {
          const parsedFrameworks = JSON.parse(data.profile.reportingFrameworks)
          setFrameworks(Array.isArray(parsedFrameworks) ? parsedFrameworks : [])
        } catch (e) {
          console.error("Error parsing frameworks:", e)
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error)
      setMessage({ type: 'error', text: 'Failed to load profile' })
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!profile) return
    
    try {
      setSaving(true)
      setMessage(null)
      
      const res = await fetch("/api/profile/details", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          companyDescription: profile.companyDescription,
          companySize: profile.companySize,
          website: profile.website,
          headquarters: profile.headquarters,
          foundedYear: profile.foundedYear,
          governanceStructure: profile.governanceStructure,
          sustainabilityOfficer: profile.sustainabilityOfficer,
          reportingFrameworks: JSON.stringify(frameworks),
          goals: JSON.stringify(goals),
        }),
      })
      
      if (!res.ok) throw new Error("Failed to save profile")
      
      setMessage({ type: 'success', text: 'Profile saved successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error saving profile:", error)
      setMessage({ type: 'error', text: 'Failed to save profile' })
    } finally {
      setSaving(false)
    }
  }

  const addGoal = () => {
    if (newGoal.title && newGoal.target) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        target: newGoal.target,
        deadline: newGoal.deadline || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'in-progress',
      }
      setGoals([...goals, goal])
      setNewGoal({ title: "", target: "", deadline: "" })
    }
  }

  const removeGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId))
  }

  const toggleFramework = (framework: string) => {
    if (frameworks.includes(framework)) {
      setFrameworks(frameworks.filter(f => f !== framework))
    } else {
      setFrameworks([...frameworks, framework])
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Not Found</CardTitle>
          <CardDescription>Please complete onboarding to continue.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
          <p className="text-muted-foreground">
            Manage your company information, sustainability goals, and governance
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && (
        <Card className={message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
          <CardContent className="py-3">
            <p className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="company">
            <Building2 className="w-4 h-4 mr-2" />
            Company Info
          </TabsTrigger>
          <TabsTrigger value="goals">
            <Target className="w-4 h-4 mr-2" />
            Goals & Targets
          </TabsTrigger>
          <TabsTrigger value="governance">
            <Shield className="w-4 h-4 mr-2" />
            Governance
          </TabsTrigger>
        </TabsList>

        {/* Company Info Tab */}
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Core details about your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={profile.name || ""}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    placeholder="Your Company Name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={profile.industry || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select
                    value={profile.companySize || ""}
                    onValueChange={(value) => setProfile({...profile, companySize: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">1-50 employees</SelectItem>
                      <SelectItem value="medium">51-250 employees</SelectItem>
                      <SelectItem value="large">251-1000 employees</SelectItem>
                      <SelectItem value="enterprise">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profile.website || ""}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                    placeholder="https://company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="headquarters">Headquarters</Label>
                  <Input
                    id="headquarters"
                    value={profile.headquarters || ""}
                    onChange={(e) => setProfile({...profile, headquarters: e.target.value})}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="founded">Founded Year</Label>
                <Input
                  id="founded"
                  type="number"
                  value={profile.foundedYear || ""}
                  onChange={(e) => setProfile({...profile, foundedYear: parseInt(e.target.value)})}
                  placeholder="2020"
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>

              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={profile.companyDescription || ""}
                  onChange={(e) => setProfile({...profile, companyDescription: e.target.value})}
                  placeholder="Describe your organization's mission, vision, and key activities..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Goals</CardTitle>
              <CardDescription>
                Track your organization's sustainability and impact goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add new goal */}
              <Card className="p-4 bg-muted/50">
                <div className="grid gap-3">
                  <div>
                    <Label htmlFor="goal-title">Goal Title</Label>
                    <Input
                      id="goal-title"
                      placeholder="e.g., Reduce carbon emissions by 25%"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="goal-target">Target Value</Label>
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
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </Card>

              {/* Display goals */}
              {goals.length > 0 ? (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Your Goals ({goals.length})</Label>
                  {goals.map((goal) => (
                    <Card key={goal.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Target: {goal.target}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Deadline: {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'Not set'}
                          </p>
                          <Badge className="mt-2" variant={goal.status === 'completed' ? 'default' : 'secondary'}>
                            {goal.status || 'in-progress'}
                          </Badge>
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
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No goals added yet. Add your first sustainability goal above.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value="governance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Governance & Reporting</CardTitle>
              <CardDescription>
                Governance structures and reporting frameworks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sustainability-officer">Sustainability Officer / Lead</Label>
                <Input
                  id="sustainability-officer"
                  value={profile.sustainabilityOfficer || ""}
                  onChange={(e) => setProfile({...profile, sustainabilityOfficer: e.target.value})}
                  placeholder="Name and title"
                />
              </div>

              <div>
                <Label htmlFor="governance">Governance Structure</Label>
                <Textarea
                  id="governance"
                  value={profile.governanceStructure || ""}
                  onChange={(e) => setProfile({...profile, governanceStructure: e.target.value})}
                  placeholder="Describe your organization's governance structure, committees, and oversight mechanisms..."
                  rows={4}
                />
              </div>

              <div>
                <Label className="mb-3 block">Reporting Frameworks</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['GRI', 'SASB', 'TCFD', 'CDP', 'SDGs', 'IFRS S1/S2', 'B Corp', 'ISO 14001'].map((framework) => (
                    <div
                      key={framework}
                      onClick={() => toggleFramework(framework)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        frameworks.includes(framework)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="text-sm font-medium text-center">{framework}</p>
                    </div>
                  ))}
                </div>
                {frameworks.length > 0 && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {frameworks.map(f => (
                      <Badge key={f} variant="secondary">
                        {f}
                        <button
                          onClick={() => toggleFramework(f)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
