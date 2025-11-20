"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { UtensilsCrossed, Users, TrendingUp, Heart, Factory, Sprout, Droplet, Award } from "lucide-react"

export function E2GFoodDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">E2G Food Distribution Profile</h1>
          <p className="text-muted-foreground">Nutrition, sustainability, and community impact metrics</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="impact">Impact & Reach</TabsTrigger>
          <TabsTrigger value="donors">Donor Management</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="stories">Impact Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Food Bars Delivered</CardTitle>
                <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2M</div>
                <p className="text-xs text-muted-foreground mt-2">+23% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meals Provided</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4M</div>
                <p className="text-xs text-muted-foreground mt-2">Equivalent meals served</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Communities Served</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground mt-2">Across 12 regions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vulnerable Individuals</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">58K</div>
                <p className="text-xs text-muted-foreground mt-2">People directly reached</p>
              </CardContent>
            </Card>
          </div>

          {/* Nutrition Impact */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Impact</CardTitle>
                <CardDescription>Calories and nutritional value delivered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Calories Provided</span>
                    <span className="font-medium">4.8M kcal</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Protein Bars Distributed</span>
                    <span className="font-medium">1.2M units</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Nutritional Adequacy</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
                <CardDescription>Geographic coverage and reach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">East Africa</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-24" />
                      <span className="text-sm font-medium">75K</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">South Asia</span>
                    <div className="flex items-center gap-2">
                      <Progress value={60} className="w-24" />
                      <span className="text-sm font-medium">48K</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Latin America</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-24" />
                      <span className="text-sm font-medium">32K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs & Production */}
          <Card>
            <CardHeader>
              <CardTitle>Economic & Production Impact</CardTitle>
              <CardDescription>Job creation and local production metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Factory className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-sm text-muted-foreground">Jobs Created</p>
                </div>
                <div className="text-center">
                  <Sprout className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold">87</div>
                  <p className="text-sm text-muted-foreground">Microfarms Established</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-2xl font-bold">1,250</div>
                  <p className="text-sm text-muted-foreground">People Trained</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <div className="text-2xl font-bold">42%</div>
                  <p className="text-sm text-muted-foreground">Local Production</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-8">
          {/* Partnerships & Reach */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Partnerships</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">NGOs Onboarded</span>
                  <span className="text-2xl font-bold">34</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Charities Onboarded</span>
                  <span className="text-2xl font-bold">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Events Held</span>
                  <span className="text-2xl font-bold">67</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media & Awareness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Impact Stories Shared</span>
                  <span className="text-2xl font-bold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Media Endorsements</span>
                  <span className="text-2xl font-bold">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Social Reach</span>
                  <span className="text-2xl font-bold">2.4M</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Communities Served</span>
                  <span className="text-2xl font-bold">145</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Regions Covered</span>
                  <span className="text-2xl font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Beneficiaries</span>
                  <span className="text-2xl font-bold">58K</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vulnerable Populations */}
          <Card>
            <CardHeader>
              <CardTitle>Vulnerable Populations Reached</CardTitle>
              <CardDescription>Targeted support for high-need communities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Refugee Camps</span>
                    <span className="font-bold">12,400</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Drought-Affected Areas</span>
                    <span className="font-bold">18,600</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Urban Poor Communities</span>
                    <span className="font-bold">15,200</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Conflict Zones</span>
                    <span className="font-bold">8,900</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Remote Rural Areas</span>
                    <span className="font-bold">2,900</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donors" className="space-y-8">
          {/* Donor Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Donor Impact Tracked</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground mt-2">Active donors</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Donor Retention Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <Progress value={87} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+5% from last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Donor Engagement Rate</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <Progress value={72} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Highly engaged</p>
              </CardContent>
            </Card>
          </div>

          {/* Donor Segmentation */}
          <Card>
            <CardHeader>
              <CardTitle>Donor Segmentation</CardTitle>
              <CardDescription>Distribution by donor type and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Individual Donors</span>
                    <span className="font-medium">1,842 (65%)</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Corporate Partners</span>
                    <span className="font-medium">687 (24%)</span>
                  </div>
                  <Progress value={24} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Foundations</span>
                    <span className="font-medium">318 (11%)</span>
                  </div>
                  <Progress value={11} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Donors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributing Partners</CardTitle>
              <CardDescription>Recognition of major supporters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "GlobalCare Foundation", amount: "$450K", impact: "900K meals" },
                  { name: "NutriCorp International", amount: "$320K", impact: "640K meals" },
                  { name: "Hope for Hunger Alliance", amount: "$280K", impact: "560K meals" },
                  { name: "Community First Partners", amount: "$215K", impact: "430K meals" },
                ].map((donor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{donor.name}</p>
                      <p className="text-sm text-muted-foreground">{donor.impact}</p>
                    </div>
                    <Badge>{donor.amount}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-8">
          {/* Environmental Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Environmental Sustainability Metrics</CardTitle>
              <CardDescription>Tracking our eco-friendly initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Droplet className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold">32%</div>
                  <p className="text-sm text-muted-foreground">Water Efficiency</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                  <div className="text-2xl font-bold">45%</div>
                  <p className="text-sm text-muted-foreground">Energy Efficiency</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Sprout className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold">1,240</div>
                  <p className="text-sm text-muted-foreground">Tons CO2 Saved</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <UtensilsCrossed className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-sm text-muted-foreground">Zero Waste Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcycled Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Circular Economy Initiatives</CardTitle>
              <CardDescription>Waste reduction and upcycling efforts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Upcycled Ingredients Used</p>
                    <p className="text-sm text-muted-foreground">From food waste streams</p>
                  </div>
                  <span className="text-2xl font-bold">420 tons</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Packaging Recycled</p>
                    <p className="text-sm text-muted-foreground">Biodegradable materials</p>
                  </div>
                  <span className="text-2xl font-bold">95%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium">Composting Programs</p>
                    <p className="text-sm text-muted-foreground">Active communities</p>
                  </div>
                  <span className="text-2xl font-bold">67</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Microfarms & Local Production */}
          <Card>
            <CardHeader>
              <CardTitle>Local Agricultural Development</CardTitle>
              <CardDescription>Supporting sustainable food systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Microfarms Established</span>
                    <span className="text-xl font-bold">87</span>
                  </div>
                  <Progress value={87} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Local Farmers Trained</span>
                    <span className="text-xl font-bold">1,250</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Local Nutrition Production</span>
                    <span className="text-xl font-bold">42%</span>
                  </div>
                  <Progress value={42} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Supply Chain Resilience</span>
                    <span className="text-xl font-bold">78%</span>
                  </div>
                  <Progress value={78} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stories" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Impact Stories</CardTitle>
              <CardDescription>Real-world impact through community voices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transforming Lives in Drought-Stricken Kenya</CardTitle>
                    <CardDescription>East Africa • March 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      In the Turkana region, where severe drought has devastated communities, E2G protein bars 
                      have become a lifeline. Over 8,000 vulnerable individuals have received consistent nutrition 
                      support, helping children stay in school and adults maintain their health.
                    </p>
                    <div className="flex gap-2">
                      <Badge>Food Security</Badge>
                      <Badge variant="secondary">Drought Response</Badge>
                      <Badge variant="secondary">8K+ Reached</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Microfarm Success in Rural Bangladesh</CardTitle>
                    <CardDescription>South Asia • February 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      A network of 15 microfarms now produces nutritious ingredients for protein bars locally, 
                      creating 34 jobs and reducing transportation costs by 40%. The initiative has empowered 
                      local farmers and improved food security for 12,000 residents.
                    </p>
                    <div className="flex gap-2">
                      <Badge>Sustainable Farming</Badge>
                      <Badge variant="secondary">Job Creation</Badge>
                      <Badge variant="secondary">12K+ Beneficiaries</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Corporate Partnership Delivers 500K Meals</CardTitle>
                    <CardDescription>Latin America • January 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Through a groundbreaking partnership with NutriCorp, we delivered 250,000 protein bars 
                      to underserved communities across Colombia and Peru, providing over 500,000 meals 
                      equivalent and reaching 25,000 vulnerable individuals.
                    </p>
                    <div className="flex gap-2">
                      <Badge>Partnership</Badge>
                      <Badge variant="secondary">Scale</Badge>
                      <Badge variant="secondary">25K+ Reached</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
