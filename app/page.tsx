"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Heart, UtensilsCrossed, BarChart3, Shield, TrendingUp } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Impact Dashboard</span>
          </div>
          <Button onClick={() => router.push("/dashboard")}>
            Get Started
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Measure Impact, Drive Change
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A flexible impact measurement platform that adapts to your industry.
            Track metrics that matter, from education to food security.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/dashboard")}>
              Start Measuring Impact
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        {/* Profiles Section */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Impact Profile</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Education & Upskilling</CardTitle>
                <CardDescription>
                  Track enrollment, completion rates, employment outcomes, and AI literacy metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Student management</li>
                  <li>✓ Progress tracking</li>
                  <li>✓ SDG alignment</li>
                  <li>✓ Employment outcomes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-rose-600 mb-4" />
                <CardTitle>Human Constitution</CardTitle>
                <CardDescription>
                  Measure dignity, maturity, wellbeing, and social indicators for holistic human development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Dignity & maturity index</li>
                  <li>✓ Value wheel tracking</li>
                  <li>✓ Mental health metrics</li>
                  <li>✓ Dynamic heatmaps</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <UtensilsCrossed className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>E2G Food Security</CardTitle>
                <CardDescription>
                  Monitor food distribution, nutrition impact, donor engagement, and sustainable farming
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Food bars delivered</li>
                  <li>✓ Communities served</li>
                  <li>✓ Donor tracking</li>
                  <li>✓ Sustainability metrics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white rounded-2xl">
          <h2 className="text-3xl font-bold text-center mb-12">Built for Every User Type</h2>
          <div className="grid md:grid-cols-3 gap-8 px-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Consultants</h3>
              <p className="text-muted-foreground">
                Advise clients with data-driven insights and industry benchmarks
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Enterprises</h3>
              <p className="text-muted-foreground">
                Track organizational impact and ESG metrics for stakeholders
              </p>
            </div>
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Regulators</h3>
              <p className="text-muted-foreground">
                Monitor compliance, standards, and industry-wide performance
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                No credit card required. Set up your dashboard in minutes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" onClick={() => router.push("/dashboard")}>
                Start Free
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-muted-foreground">
        <p>© 2025 Impact Dashboard. Built for social impact measurement.</p>
      </footer>
    </div>
  )
}

