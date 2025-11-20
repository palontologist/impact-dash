"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Brain, TrendingUp, Map, Calendar } from "lucide-react"

export function HumanConstitutionDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Human Constitution Profile</h1>
          <p className="text-muted-foreground">Holistic wellbeing and human development metrics</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="value-wheel">Value Wheel</TabsTrigger>
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Core Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dignity Index</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5</div>
                <Progress value={85} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+12% from last period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maturity Index</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.8</div>
                <Progress value={78} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+8% from last period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Individual Wellbeing</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.2</div>
                <Progress value={82} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+5% from last period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mental Health Score</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.9</div>
                <Progress value={79} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+10% from last period</p>
              </CardContent>
            </Card>
          </div>

          {/* Relationship & Team Metrics */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Relationship Trust & Team Effectiveness</CardTitle>
                <CardDescription>Social connection and collaboration metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Relationship Trust</span>
                    <span className="font-medium">8.4/10</span>
                  </div>
                  <Progress value={84} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Effectiveness</span>
                    <span className="font-medium">8.1/10</span>
                  </div>
                  <Progress value={81} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Social Cohesion</span>
                    <span className="font-medium">7.8/10</span>
                  </div>
                  <Progress value={78} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maturity Curve Indicators</CardTitle>
                <CardDescription>Development trajectory over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emotional Maturity</span>
                    <Badge>Advanced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cognitive Development</span>
                    <Badge>Proficient</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Social Intelligence</span>
                    <Badge>Advanced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ethical Reasoning</span>
                    <Badge>Developing</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strengths & Vulnerabilities */}
          <Card>
            <CardHeader>
              <CardTitle>Strengths & Vulnerabilities Map</CardTitle>
              <CardDescription>Key areas of strength and opportunities for growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">Strengths</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">High emotional intelligence and self-awareness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">Strong interpersonal relationships and trust</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">Effective communication and collaboration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">Resilience and adaptive capacity</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-orange-700">Areas for Growth</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span className="text-sm">Work-life balance and stress management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span className="text-sm">Ethical decision-making frameworks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span className="text-sm">Community engagement and civic participation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span className="text-sm">Long-term goal setting and achievement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="value-wheel" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Value Wheel of Principles</CardTitle>
              <CardDescription>
                Holistic assessment across seven dimensions of human constitution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Body</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.3</div>
                    <Progress value={83} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Physical health & vitality</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Emotion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.6</div>
                    <Progress value={86} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Emotional regulation</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Thought</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.1</div>
                    <Progress value={81} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Cognitive capacity</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Power</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7.7</div>
                    <Progress value={77} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Agency & influence</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Communication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.4</div>
                    <Progress value={84} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Expression & connection</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Life</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.0</div>
                    <Progress value={80} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Purpose & meaning</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Unity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7.9</div>
                    <Progress value={79} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Interconnection</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indicators" className="space-y-8">
          {/* Societal Indicators */}
          <Card>
            <CardHeader>
              <CardTitle>Societal Indicators</CardTitle>
              <CardDescription>Community-level wellbeing metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Social Cohesion Index</span>
                    <div className="text-2xl font-bold">7.8</div>
                    <Progress value={78} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Community Trust</span>
                    <div className="text-2xl font-bold">8.2</div>
                    <Progress value={82} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Civic Engagement</span>
                    <div className="text-2xl font-bold">7.5</div>
                    <Progress value={75} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Heatmaps */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Dynamic Heatmaps</CardTitle>
                  <CardDescription>Geographic distribution of wellbeing indicators</CardDescription>
                </div>
                <Map className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-green-100 to-blue-100 h-64 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive heatmap visualization</p>
              </div>
            </CardContent>
          </Card>

          {/* Local Priorities Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Local Priorities Panel</CardTitle>
              <CardDescription>Region-specific focus areas and initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Mental health support programs</span>
                  <Badge>High Priority</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Community building initiatives</span>
                  <Badge variant="secondary">Medium Priority</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">Youth engagement programs</span>
                  <Badge variant="secondary">Medium Priority</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Longitudinal Changes */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Longitudinal Changes</CardTitle>
                  <CardDescription>Tracking progress over time</CardDescription>
                </div>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">6 Months Ago</span>
                  <span className="text-sm">Current</span>
                  <span className="text-sm">Trajectory</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Dignity Index</span>
                      <span className="text-green-600">+12%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Maturity Index</span>
                      <span className="text-green-600">+8%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Wellbeing Score</span>
                      <span className="text-green-600">+5%</span>
                    </div>
                    <Progress value={82} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Story-Based Highlights</CardTitle>
              <CardDescription>Qualitative insights and personal narratives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community Transformation in East Region</CardTitle>
                    <CardDescription>March 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Over the past six months, our dignity-centered approach has led to remarkable improvements 
                      in community cohesion. Local leaders report increased participation in civic activities 
                      and stronger support networks among residents.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge>Community Impact</Badge>
                      <Badge variant="secondary">Mental Health</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Youth Development Success Story</CardTitle>
                    <CardDescription>February 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A group of 50 young people completed our value wheel training program, showing 
                      significant improvements across all seven dimensions. Participants reported enhanced 
                      self-awareness and better emotional regulation skills.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge>Youth</Badge>
                      <Badge variant="secondary">Personal Growth</Badge>
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
