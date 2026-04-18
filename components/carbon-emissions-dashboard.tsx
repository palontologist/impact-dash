"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts"
import { Leaf, Zap, Truck, Footprints, Calculator, TrendingDown, Plus, Activity } from "lucide-react"
import { toast } from "sonner"

const SCOPE_COLORS: Record<string, string> = {
  "1": "#ef4444",
  "2": "#f59e0b",
  "3": "#3b82f6",
}

const CATEGORY_OPTIONS = {
  "1": [
    { value: "natural_gas", label: "Natural Gas", unit: "m³" },
    { value: "diesel", label: "Diesel", unit: "liters" },
    { value: "gasoline", label: "Gasoline", unit: "liters" },
    { value: "propane", label: "Propane", unit: "liters" },
  ],
  "2": [
    { value: "electricity", label: "Electricity", unit: "kWh" },
    { value: "heating", label: "Heating", unit: "MJ" },
    { value: "cooling", label: "Cooling", unit: "MJ" },
  ],
  "3": [
    { value: "commuting", label: "Employee Commuting", unit: "km" },
    { value: "business_travel", label: "Business Travel", unit: "km" },
    { value: "freight", label: "Freight/Shipping", unit: "ton-km" },
    { value: "supply_chain", label: "Supply Chain", unit: "ton-km" },
    { value: "waste", label: "Waste", unit: "kg" },
    { value: "water", label: "Water Usage", unit: "liters" },
  ],
}

const COMMUTE_MODES = [
  { value: "car", label: "Car (single occupant)", factor: 0.21 },
  { value: "motorcycle", label: "Motorcycle", factor: 0.1 },
  { value: "taxi", label: "Taxi", factor: 0.25 },
  { value: "bus", label: "Bus", factor: 0.089 },
  { value: "train", label: "Train", factor: 0.041 },
  { value: "walk", label: "Walking", factor: 0 },
  { value: "bike", label: "Cycling", factor: 0 },
  { value: "electric_vehicle", label: "Electric Vehicle", factor: 0.053 },
]

interface EmissionData {
  id: number
  scope: string
  category: string
  activityName: string
  quantity: number
  unit: string
  carbonEmitted: number
  period: string
  startDate: string
  industry?: string
  teamSize?: string
  location?: string
}

interface CommuteCalc {
  id: number
  baselineMode: string
  alternativeMode: string
  distanceKm: number
  tripsPerWeek: number
  baselineEmission: number
  alternativeEmission: number
  savingsEmission: number
  savingsPercent: number
}

export function CarbonEmissionsDashboard() {
  const [emissions, setEmissions] = useState<EmissionData[]>([])
  const [commuteCalcs, setCommuteCalcs] = useState<CommuteCalc[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("emissions")

  const [newEmission, setNewEmission] = useState({
    scope: "2",
    category: "electricity",
    activityName: "",
    quantity: "",
    period: "monthly",
    industry: "",
    teamSize: "",
    location: "",
  })

  const [commuteCalc, setCommuteCalc] = useState({
    baselineMode: "car",
    alternativeMode: "walk",
    distanceKm: "10",
    tripsPerWeek: "5",
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [emissionsRes, commuteRes] = await Promise.all([
        fetch("/api/carbon/emissions"),
        fetch("/api/carbon/commute"),
      ])
      const emissionsData = await emissionsRes.json()
      const commuteData = await commuteRes.json()
      
      if (emissionsData.data) setEmissions(emissionsData.data)
      if (commuteData.data) setCommuteCalcs(commuteData.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  async function addEmission() {
    if (!newEmission.activityName || !newEmission.quantity) {
      toast.error("Please fill in required fields")
      return
    }

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    try {
      const res = await fetch("/api/carbon/emissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newEmission,
          quantity: parseFloat(newEmission.quantity),
          startDate: startOfMonth.toISOString(),
          endDate: endOfMonth.toISOString(),
        }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success(`Added emission: ${data.calculation.carbonEmitted.toFixed(2)} kg CO2e`)
        fetchData()
        setNewEmission({
          scope: "2",
          category: "electricity",
          activityName: "",
          quantity: "",
          period: "monthly",
          industry: "",
          teamSize: "",
          location: "",
        })
      }
    } catch (error) {
      toast.error("Failed to add emission")
    }
  }

  async function calculateCommute() {
    if (!commuteCalc.distanceKm || !commuteCalc.tripsPerWeek) {
      toast.error("Please enter distance and trips")
      return
    }

    try {
      const res = await fetch("/api/carbon/commute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...commuteCalc,
          distanceKm: parseFloat(commuteCalc.distanceKm),
          tripsPerWeek: parseInt(commuteCalc.tripsPerWeek),
        }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success(data.insight)
        fetchData()
      }
    } catch (error) {
      toast.error("Failed to calculate")
    }
  }

  const scopeTotals = emissions.reduce(
    (acc, e) => {
      acc[e.scope] = (acc[e.scope] || 0) + (e.carbonEmitted || 0)
      return acc
    },
    {} as Record<string, number>
  )

  const totalEmissions = Object.values(scopeTotals).reduce((a, b) => a + b, 0)

  const pieData = [
    { name: "Scope 1 (Direct)", value: scopeTotals["1"] || 0, color: SCOPE_COLORS["1"] },
    { name: "Scope 2 (Energy)", value: scopeTotals["2"] || 0, color: SCOPE_COLORS["2"] },
    { name: "Scope 3 (Value Chain)", value: scopeTotals["3"] || 0, color: SCOPE_COLORS["3"] },
  ].filter(d => d.value > 0)

  const monthlyData = emissions
    .reduce<Record<string, { month: string; scope1: number; scope2: number; scope3: number }>>((acc, e) => {
      const month = new Date(e.startDate).toLocaleDateString("en-US", { month: "short" })
      if (!acc[month]) acc[month] = { month, scope1: 0, scope2: 0, scope3: 0 }
      const scopeKey = `scope${e.scope}` as "scope1" | "scope2" | "scope3"
      acc[month][scopeKey] += e.carbonEmitted || 0
      return acc
    }, {})

  const chartData = Object.values(monthlyData).slice(-6)

  if (loading) {
    return <div className="flex items-center justify-center p-12"><Activity className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-600" />
            Carbon Emissions Tracker
          </h2>
          <p className="text-muted-foreground">Track and reduce your carbon footprint across all scopes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEmissions.toFixed(1)} <span className="text-sm font-normal">kg CO₂e</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" style={{ color: SCOPE_COLORS["1"] }} />
              Scope 1 (Direct)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(scopeTotals["1"] || 0).toFixed(1)} <span className="text-sm font-normal">kg</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" style={{ color: SCOPE_COLORS["2"] }} />
              Scope 2 (Energy)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(scopeTotals["2"] || 0).toFixed(1)} <span className="text-sm font-normal">kg</span></div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="emissions">Emissions Data</TabsTrigger>
          <TabsTrigger value="commute">Commute Calculator</TabsTrigger>
          <TabsTrigger value="insights">Scope Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="emissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Emission Entry
              </CardTitle>
              <CardDescription>Log a new carbon emission source</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Scope</Label>
                  <Select value={newEmission.scope} onValueChange={(v) => setNewEmission({ ...newEmission, scope: v, category: CATEGORY_OPTIONS[v as keyof typeof CATEGORY_OPTIONS][0].value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Scope 1 - Direct</SelectItem>
                      <SelectItem value="2">Scope 2 - Energy</SelectItem>
                      <SelectItem value="3">Scope 3 - Value Chain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={newEmission.category} onValueChange={(v) => setNewEmission({ ...newEmission, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS[newEmission.scope as keyof typeof CATEGORY_OPTIONS]?.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Activity Name</Label>
                  <Input value={newEmission.activityName} onChange={(e) => setNewEmission({ ...newEmission, activityName: e.target.value })} placeholder="e.g., Electricity bill" />
                </div>
                <div>
                  <Label>Quantity ({CATEGORY_OPTIONS[newEmission.scope as keyof typeof CATEGORY_OPTIONS]?.find(c => c.value === newEmission.category)?.unit})</Label>
                  <Input type="number" value={newEmission.quantity} onChange={(e) => setNewEmission({ ...newEmission, quantity: e.target.value })} placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Industry</Label>
                  <Input value={newEmission.industry} onChange={(e) => setNewEmission({ ...newEmission, industry: e.target.value })} placeholder="e.g., Technology" />
                </div>
                <div>
                  <Label>Team Size</Label>
                  <Select value={newEmission.teamSize} onValueChange={(v) => setNewEmission({ ...newEmission, teamSize: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-500">201-500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={newEmission.location} onChange={(e) => setNewEmission({ ...newEmission, location: e.target.value })} placeholder="e.g., London" />
                </div>
                <div>
                  <Label>Period</Label>
                  <Select value={newEmission.period} onValueChange={(v) => setNewEmission({ ...newEmission, period: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={addEmission} className="bg-emerald-600 hover:bg-emerald-700">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate & Add
              </Button>
            </CardContent>
          </Card>

          {emissions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Emissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {emissions.slice(0, 10).map((e) => (
                    <div key={e.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{e.activityName}</div>
                        <div className="text-sm text-muted-foreground">
                          Scope {e.scope} • {e.category} • {e.period}
                          {e.industry && ` • ${e.industry}`}
                          {e.teamSize && ` • ${e.teamSize}`}
                        </div>
                      </div>
                      <Badge style={{ backgroundColor: SCOPE_COLORS[e.scope] || "#6b7280" }}>
                        {e.carbonEmitted.toFixed(1)} kg CO₂e
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="commute" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Footprints className="h-5 w-5" />
                Walk vs Car - Carbon Savings Calculator
              </CardTitle>
              <CardDescription>See how much carbon you save by walking, cycling, or taking public transit instead of driving</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Currently Use</Label>
                  <Select value={commuteCalc.baselineMode} onValueChange={(v) => setCommuteCalc({ ...commuteCalc, baselineMode: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {COMMUTE_MODES.map((m) => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Switch To</Label>
                  <Select value={commuteCalc.alternativeMode} onValueChange={(v) => setCommuteCalc({ ...commuteCalc, alternativeMode: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {COMMUTE_MODES.map((m) => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>One-way Distance (km)</Label>
                  <Input type="number" value={commuteCalc.distanceKm} onChange={(e) => setCommuteCalc({ ...commuteCalc, distanceKm: e.target.value })} />
                </div>
                <div>
                  <Label>Trips per Week</Label>
                  <Input type="number" value={commuteCalc.tripsPerWeek} onChange={(e) => setCommuteCalc({ ...commuteCalc, tripsPerWeek: e.target.value })} />
                </div>
              </div>
              <Button onClick={calculateCommute} className="bg-blue-600 hover:bg-blue-700">
                <TrendingDown className="h-4 w-4 mr-2" />
                Calculate Savings
              </Button>

              {commuteCalcs.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Recent Calculations</h4>
                  {commuteCalcs.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <span className="font-medium capitalize">{c.baselineMode}</span>
                        {" → "}
                        <span className="font-medium capitalize">{c.alternativeMode}</span>
                        <div className="text-sm text-muted-foreground">{c.distanceKm} km × {c.tripsPerWeek} trips/week</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">{c.savingsEmission.toFixed(0)} kg CO₂e/year saved</div>
                        <div className="text-sm text-muted-foreground">{c.savingsPercent}% reduction</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emissions by Scope</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">No emissions data yet</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Emissions Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="scope1" name="Scope 1" stackId="a" fill={SCOPE_COLORS["1"]} />
                      <Bar dataKey="scope2" name="Scope 2" stackId="a" fill={SCOPE_COLORS["2"]} />
                      <Bar dataKey="scope3" name="Scope 3" stackId="a" fill={SCOPE_COLORS["3"]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">No trend data yet</div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Understanding Carbon Scopes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg" style={{ borderLeftColor: SCOPE_COLORS["1"], borderLeftWidth: 4 }}>
                  <h4 className="font-bold flex items-center gap-2"><Zap className="h-4 w-4" /> Scope 1 - Direct Emissions</h4>
                  <p className="text-sm text-muted-foreground mt-2">Emissions from sources you own or control:</p>
                  <ul className="text-sm mt-2 list-disc list-inside">
                    <li>Company vehicles</li>
                    <li>On-site fuel combustion</li>
                    <li>Refrigerant leaks</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg" style={{ borderLeftColor: SCOPE_COLORS["2"], borderLeftWidth: 4 }}>
                  <h4 className="font-bold flex items-center gap-2"><Zap className="h-4 w-4" /> Scope 2 - Energy Indirect</h4>
                  <p className="text-sm text-muted-foreground mt-2">Emissions from purchased energy:</p>
                  <ul className="text-sm mt-2 list-disc list-inside">
                    <li>Electricity</li>
                    <li>Heating & cooling</li>
                    <li>Steam</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg" style={{ borderLeftColor: SCOPE_COLORS["3"], borderLeftWidth: 4 }}>
                  <h4 className="font-bold flex items-center gap-2"><Truck className="h-4 w-4" /> Scope 3 - Value Chain</h4>
                  <p className="text-sm text-muted-foreground mt-2">All other indirect emissions:</p>
                  <ul className="text-sm mt-2 list-disc list-inside">
                    <li>Employee commuting</li>
                    <li>Business travel</li>
                    <li>Supply chain</li>
                    <li>Waste</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}