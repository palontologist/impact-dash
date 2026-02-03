"use client"

import { useRouter } from "next/navigation"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Heart, UtensilsCrossed, BarChart3, Shield, TrendingUp } from "lucide-react"
import { PricingPackages } from "@/components/pricing-packages"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Impact Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium hover:text-blue-600 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-blue-600 text-white rounded-full font-medium text-sm h-10 px-5 hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button onClick={() => router.push("/dashboard")} variant="ghost">
                Dashboard
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Impact reporting at the speed of your work
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            No spreadsheets, no jargon. Just live impact snapshots you can share with boards, donors, and investors.
          </p>
          <div className="flex gap-4 justify-center">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Launch your impact dashboard
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" onClick={() => router.push("/dashboard")} className="bg-blue-600 hover:bg-blue-700">
                Go to Dashboard
              </Button>
            </SignedIn>
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

        {/* Pricing Section */}
        <PricingPackages />

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
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg">
                    Start Free
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button size="lg" onClick={() => router.push("/dashboard")}>
                  Go to Dashboard
                </Button>
              </SignedIn>
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

