import { db } from "../lib/db"
import { availableMetrics, userProfiles } from "../lib/schema"

async function setupTursoData() {
  console.log("🔄 Setting up TursoDB with test data...")

  try {
    // Insert available metrics
    const metrics = [
      // Education Metrics
      { metricId: "enrollment", metricName: "Enrollment", category: "education", description: "Number of students enrolled", unit: "students", dataType: "number" },
      { metricId: "completion", metricName: "Completion Rate", category: "education", description: "Percentage of students completing programs", unit: "percentage", dataType: "percentage" },
      { metricId: "employment", metricName: "Employment Rate", category: "education", description: "Percentage of graduates employed", unit: "percentage", dataType: "percentage" },
      { metricId: "skills_gained", metricName: "Skills Gained", category: "education", description: "Number of new skills acquired", unit: "count", dataType: "number" },
      { metricId: "certifications", metricName: "Certifications", category: "education", description: "Number of certifications earned", unit: "count", dataType: "number" },
      
      // Human Constitution Metrics
      { metricId: "health_screenings", metricName: "Health Screenings", category: "human_constitution", description: "Number of health screenings conducted", unit: "count", dataType: "number" },
      { metricId: "wellness_programs", metricName: "Wellness Programs", category: "human_constitution", description: "Number of wellness program participants", unit: "participants", dataType: "number" },
      { metricId: "mental_health", metricName: "Mental Health Support", category: "human_constitution", description: "Mental health sessions provided", unit: "sessions", dataType: "number" },
      { metricId: "physical_fitness", metricName: "Physical Fitness", category: "human_constitution", description: "Fitness program participation", unit: "participants", dataType: "number" },
      
      // Food Metrics
      { metricId: "meals_served", metricName: "Meals Served", category: "food", description: "Number of meals provided", unit: "meals", dataType: "number" },
      { metricId: "nutrition_quality", metricName: "Nutrition Quality", category: "food", description: "Nutritional value score", unit: "score", dataType: "number" },
      { metricId: "food_waste", metricName: "Food Waste", category: "food", description: "Amount of food waste", unit: "kg", dataType: "number" },
      { metricId: "local_sourcing", metricName: "Local Sourcing", category: "food", description: "Percentage of locally sourced food", unit: "percentage", dataType: "percentage" },
      
      // Environmental Metrics
      { metricId: "carbon_emissions", metricName: "Carbon Emissions", category: "environmental", description: "Total carbon emissions", unit: "tons CO2", dataType: "number" },
      { metricId: "energy_consumption", metricName: "Energy Consumption", category: "environmental", description: "Total energy used", unit: "kWh", dataType: "number" },
      { metricId: "water_usage", metricName: "Water Usage", category: "environmental", description: "Total water consumed", unit: "liters", dataType: "number" },
      { metricId: "waste_generated", metricName: "Waste Generated", category: "environmental", description: "Total waste produced", unit: "kg", dataType: "number" },
      { metricId: "recycling_rate", metricName: "Recycling Rate", category: "environmental", description: "Percentage of waste recycled", unit: "percentage", dataType: "percentage" },
      
      // Social Metrics
      { metricId: "community_engagement", metricName: "Community Engagement", category: "social", description: "Number of community events", unit: "events", dataType: "number" },
      { metricId: "volunteer_hours", metricName: "Volunteer Hours", category: "social", description: "Total volunteer hours", unit: "hours", dataType: "number" },
      { metricId: "diversity_index", metricName: "Diversity Index", category: "social", description: "Diversity score", unit: "score", dataType: "number" },
      { metricId: "satisfaction_score", metricName: "Satisfaction Score", category: "social", description: "Stakeholder satisfaction", unit: "score", dataType: "number" },
      
      // Governance Metrics
      { metricId: "policy_compliance", metricName: "Policy Compliance", category: "governance", description: "Compliance rate", unit: "percentage", dataType: "percentage" },
      { metricId: "transparency_score", metricName: "Transparency Score", category: "governance", description: "Transparency rating", unit: "score", dataType: "number" },
      { metricId: "audit_frequency", metricName: "Audit Frequency", category: "governance", description: "Number of audits conducted", unit: "audits", dataType: "number" },
      { metricId: "risk_assessment", metricName: "Risk Assessment", category: "governance", description: "Risk assessment score", unit: "score", dataType: "number" }
    ]

    console.log("📊 Inserting available metrics...")
    for (const metric of metrics) {
      await db.insert(availableMetrics).values(metric).onConflictDoNothing()
    }
    console.log("✅ Inserted 26 available metrics")

    // Insert test user profile
    console.log("👤 Inserting test user profile...")
    await db.insert(userProfiles).values({
      clerkUserId: "test_user_123",
      email: "test@example.com",
      name: "Test User",
      userType: "enterprise",
      selectedProfile: "custom",
      industry: "technology",
      reason: "impact_measurement",
      onboardingCompleted: true,
      customMetrics: JSON.stringify(["enrollment", "completion", "employment"]),
      dataInputMethod: "both"
    }).onConflictDoNothing()
    console.log("✅ Inserted test user profile")

    // Verify the data
    const metricsCount = await db.select().from(availableMetrics)
    const usersCount = await db.select().from(userProfiles)
    
    console.log(`\n✅ Setup complete!`)
    console.log(`📊 Available metrics: ${metricsCount.length}`)
    console.log(`👥 User profiles: ${usersCount.length}`)
    console.log(`\nTest user: test_user_123`)
    console.log(`Selected metrics: enrollment, completion, employment`)
    console.log(`Data input method: both (CSV + manual)`)

  } catch (error) {
    console.error("❌ Error setting up TursoDB:", error)
    throw error
  }
}

// Run the setup
setupTursoData()
  .then(() => {
    console.log("\n🎉 TursoDB setup completed successfully!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n💥 Setup failed:", error)
    process.exit(1)
  })
