"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

const PACKAGES = [
  {
    id: "pilot-seed",
    name: "Pilot & Seed",
    subtitle: "For single programmes, schools, or early-stage orgs starting with 5 metrics.",
    image: "/images/seed.svg", // You'll need to add these images
    features: [
      "1 impact profile (e.g. Education, Human Constitution, or E2G)",
      "Up to 5 core metrics with trends and SDG tags",
      "1 dashboard, up to 3 team seats",
      "PDF/PNG export of impact snapshots",
    ],
    ctaText: "Select Package",
    ctaAction: "select",
  },
  {
    id: "program-portfolio",
    name: "Program & Portfolio",
    subtitle: "For accelerators, funds, and NGOs tracking multiple projects or schools.",
    image: "/images/series-a.svg",
    features: [
      "Up to 5 impact profiles (e.g. Education, Food, Dignity, Custom ESG)",
      "Up to 25 metrics across programmes",
      "Portfolio view across projects / grantees",
      "Branded reports for donors and investors",
      "Priority onboarding and quarterly review",
    ],
    ctaText: "Select Package",
    ctaAction: "select",
  },
  {
    id: "enterprise-regulator",
    name: "Enterprise & Regulator",
    subtitle: "For banks, holdings, and agencies like Banorte, Sinatra, or ministries.",
    image: "/images/growth.svg",
    features: [
      "Unlimited profiles (Education, ESG, Food, Human Constitution, custom)",
      "Multi-entity dashboards (by business unit, region, brand)",
      "API / data integrations (carbon tools, HR, finance)",
      "Governance features (SSO, permissions, audit logs)",
      "Dedicated CSM and custom metric design",
    ],
    ctaText: "Talk to us",
    ctaAction: "contact",
    ctaLink: "https://cal.com/georgekarani/30min",
  },
]

export function PricingPackages() {
  const router = useRouter()

  const handleCTA = (pkg: typeof PACKAGES[0]) => {
    if (pkg.ctaAction === "contact" && pkg.ctaLink) {
      window.open(pkg.ctaLink, "_blank")
    } else {
      // Store selected package and proceed to onboarding
      localStorage.setItem("selectedPackage", pkg.id)
      router.push("/onboarding")
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your Package</h2>
          <p className="text-xl text-muted-foreground">
            Select the plan that fits your organization&apos;s impact measurement needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PACKAGES.map((pkg) => (
            <Card
              key={pkg.id}
              className="flex flex-col hover:shadow-2xl transition-shadow border-2"
            >
              <CardHeader className="text-center pb-6">
                {/* Placeholder for image - users can add actual images later */}
                <div className="h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                  <div className="text-4xl">
                    {pkg.id === "pilot-seed" && "🌱"}
                    {pkg.id === "program-portfolio" && "🌿"}
                    {pkg.id === "enterprise-regulator" && "🌳"}
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                <CardDescription className="text-base">
                  {pkg.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">What&apos;s included:</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className="w-full mt-auto bg-orange-600 hover:bg-orange-700 text-white h-12 text-base font-medium"
                  onClick={() => handleCTA(pkg)}
                >
                  {pkg.ctaText} →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
