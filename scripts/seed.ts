import { db } from "../lib/db"
import { eq } from "drizzle-orm"
import { 
  students, 
  progressUpdates, 
  certifications, 
  enrollmentStats, 
  sdgMappings, 
  sdgMetrics, 
  qualitativeInsights, 
  resourceMetrics,
  cohorts 
} from "../lib/schema"

const counties = [
  "Nairobi", "Kiambu", "Kajiado", "Machakos", "Makueni", "Kitui", 
  "Embu", "Tharaka-Nithi", "Meru", "Isiolo", "Marsabit", "Samburu",
  "Turkana", "West Pokot", "Baringo", "Elgeyo-Marakwet"
]

const firstNames = [
  "Aisha", "Amina", "Faith", "Grace", "Jane", "Joyce", "Mary", "Nancy", "Peris", "Rose",
  "Brian", "Daniel", "David", "James", "John", "Kevin", "Michael", "Peter", "Samuel", "Victor"
]

const lastNames = [
  "Wanjiku", "Mwangi", "Kamau", "Njeri", "Otieno", "Ochieng", "Kiprotich", "Cheruiyot",
  "Mutua", "Musyoka", "Mbatha", "Maina", "Kariuki", "Gitau", "Wairimu", "Gathoni"
]

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

async function seedCohorts() {
  console.log("🎓 Seeding cohorts...")
  
  const cohortsData = [
    {
      name: "AI Pioneers 2024-A",
      description: "First batch of AI literacy program focusing on foundational concepts",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-04-15"),
      capacity: 150,
      currentEnrollment: 142,
      status: "completed"
    },
    {
      name: "AI Pioneers 2024-B",
      description: "Second batch with emphasis on practical AI applications",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-08-01"),
      capacity: 200,
      currentEnrollment: 189,
      status: "completed"
    },
    {
      name: "AI Pioneers 2024-C",
      description: "Current active batch with advanced AI and ethics modules",
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-12-15"),
      capacity: 250,
      currentEnrollment: 234,
      status: "active"
    }
  ]

  for (const cohort of cohortsData) {
    await db.insert(cohorts).values(cohort)
  }
  
  console.log(`✅ Created ${cohortsData.length} cohorts`)
}

async function seedStudents() {
  console.log("👥 Seeding students...")
  
  const studentsData = []
  const cohortNames = ["AI Pioneers 2024-A", "AI Pioneers 2024-B", "AI Pioneers 2024-C"]
  
  for (let i = 0; i < 500; i++) {
    const enrollmentDate = getRandomDate(new Date("2024-01-01"), new Date("2024-08-31"))
    const isCompleted = Math.random() < 0.78 // 78% completion rate
    const isEmployed = isCompleted && Math.random() < 0.64 // 64% employment rate for completed
    
    studentsData.push({
      firstName: getRandomElement(firstNames),
      lastName: getRandomElement(lastNames),
      email: `student${i + 1}@example.com`,
      phone: `+25470${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
      age: Math.floor(Math.random() * 16) + 18, // 18-33 years old
      gender: Math.random() < 0.52 ? "female" : "male", // 52% female
      location: Math.random() < 0.45 ? "rural" : "urban", // 45% rural
      county: getRandomElement(counties),
      cohort: getRandomElement(cohortNames),
      status: isCompleted ? "completed" : (Math.random() < 0.95 ? "active" : "dropped_out"),
      enrollmentDate,
      completionDate: isCompleted ? getRandomDate(enrollmentDate, new Date()) : null,
      employmentStatus: isEmployed ? 
        (Math.random() < 0.8 ? "employed" : "self_employed") : 
        (Math.random() < 0.7 ? "unemployed" : "student")
    })
  }

  // Insert in batches
  const batchSize = 100
  for (let i = 0; i < studentsData.length; i += batchSize) {
    const batch = studentsData.slice(i, i + batchSize)
    await db.insert(students).values(batch)
  }
  
  console.log(`✅ Created ${studentsData.length} students`)
}

async function seedProgressUpdates() {
  console.log("📈 Seeding progress updates...")
  
  const allStudents = await db.select().from(students)
  const progressData = []
  
  for (const student of allStudents) {
    // Generate 2-5 progress updates per student
    const updateCount = Math.floor(Math.random() * 4) + 2
    
    for (let i = 0; i < updateCount; i++) {
      const progressRate = Math.min(100, (i + 1) * (80 + Math.random() * 20) / updateCount)
      
      progressData.push({
        studentId: student.id,
        completionRate: Math.floor(progressRate),
        aiLiteracyLevel: progressRate < 30 ? "beginner" : 
                        progressRate < 70 ? "intermediate" : "advanced",
        notes: `Progress update ${i + 1} - showing good improvement in AI concepts`,
        createdAt: getRandomDate(
          student.enrollmentDate || new Date("2024-01-01"), 
          new Date()
        )
      })
    }
  }

  // Insert in batches
  const batchSize = 200
  for (let i = 0; i < progressData.length; i += batchSize) {
    const batch = progressData.slice(i, i + batchSize)
    await db.insert(progressUpdates).values(batch)
  }
  
  console.log(`✅ Created ${progressData.length} progress updates`)
}

async function seedCertifications() {
  console.log("🏆 Seeding certifications...")
  
  const completedStudents = await db.select().from(students).where(eq(students.status, "completed"))
  const certificationsData = []
  
  const certTypes = ["AI Basics", "Digital Literacy", "Advanced AI", "Ethics in AI", "AI Applications"]
  
  for (const student of completedStudents) {
    // 82% of completed students get at least one certification
    if (Math.random() < 0.82) {
      const certCount = Math.floor(Math.random() * 3) + 1 // 1-3 certifications
      
      for (let i = 0; i < certCount; i++) {
        certificationsData.push({
          studentId: student.id,
          name: getRandomElement(certTypes),
          issuedDate: getRandomDate(
            student.enrollmentDate || new Date("2024-01-01"),
            student.completionDate || new Date()
          ),
          certificateUrl: `https://certificates.example.com/${student.id}-${i + 1}.pdf`
        })
      }
    }
  }

  await db.insert(certifications).values(certificationsData)
  console.log(`✅ Created ${certificationsData.length} certifications`)
}

async function seedSDGMappings() {
  console.log("🎯 Seeding SDG mappings...")
  
  const sdgData = [
    {
      sdgNumber: 4,
      title: "Quality Education",
      description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all",
      impactLevel: "high",
      progressPercentage: 78.3,
      isActive: true
    },
    {
      sdgNumber: 8,
      title: "Decent Work & Economic Growth",
      description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
      impactLevel: "high",
      progressPercentage: 64.7,
      isActive: true
    },
    {
      sdgNumber: 10,
      title: "Reduced Inequalities",
      description: "Reduce inequality within and among countries",
      impactLevel: "medium",
      progressPercentage: 45.2,
      isActive: true
    },
    {
      sdgNumber: 9,
      title: "Industry, Innovation & Infrastructure",
      description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
      impactLevel: "medium",
      progressPercentage: 55.8,
      isActive: true
    },
    {
      sdgNumber: 1,
      title: "No Poverty",
      description: "End poverty in all its forms everywhere",
      impactLevel: "medium",
      progressPercentage: 42.1,
      isActive: true
    },
    {
      sdgNumber: 5,
      title: "Gender Equality",
      description: "Achieve gender equality and empower all women and girls",
      impactLevel: "low",
      progressPercentage: 52.0,
      isActive: true
    }
  ]

  for (const sdg of sdgData) {
    const [insertedSdg] = await db.insert(sdgMappings).values(sdg).returning()
    
    // Add metrics for each SDG
    let metricsForSdg: string[] = []
    
    if (sdg.sdgNumber === 4) {
      metricsForSdg = [
        "2,847 youth trained in AI literacy",
        "78.3% program completion rate",
        "82.1% certification achievement rate"
      ]
    } else if (sdg.sdgNumber === 8) {
      metricsForSdg = [
        "64.7% employment rate post-training",
        "23% entrepreneurship rate",
        "$2.3M estimated economic impact"
      ]
    } else if (sdg.sdgNumber === 10) {
      metricsForSdg = [
        "45.2% rural participants",
        "52% female enrollment",
        "15 counties reached"
      ]
    } else if (sdg.sdgNumber === 9) {
      metricsForSdg = [
        "AI literacy programs delivered",
        "Digital skills development",
        "Technology innovation training"
      ]
    } else if (sdg.sdgNumber === 1) {
      metricsForSdg = [
        "Income generation opportunities",
        "Skills for sustainable employment",
        "Economic empowerment initiatives"
      ]
    } else if (sdg.sdgNumber === 5) {
      metricsForSdg = [
        "52% female participation",
        "Gender-inclusive curriculum",
        "Equal opportunity access"
      ]
    }
    
    for (let i = 0; i < metricsForSdg.length; i++) {
      await db.insert(sdgMetrics).values({
        sdgId: insertedSdg.id,
        metricText: metricsForSdg[i],
        sortOrder: i
      })
    }
  }
  
  console.log(`✅ Created ${sdgData.length} SDG mappings with metrics`)
}

async function seedQualitativeInsights() {
  console.log("💭 Seeding qualitative insights...")
  
  const insightsData = [
    {
      title: "From Rural Kenya to AI Pioneer",
      content: "Sarah, a 22-year-old from Kitui County, had never used a computer before joining our program. Today, she's developing AI solutions for local farmers and has started her own tech consultancy.",
      category: "success_story",
      tags: JSON.stringify(["rural", "transformation", "entrepreneurship"]),
      isPublished: true,
      publishedDate: new Date("2024-08-15"),
      authorName: "Program Coordinator"
    },
    {
      title: "Breaking Gender Barriers in Tech",
      content: "Our program has achieved 52% female participation, significantly higher than the industry average. Young women are not just participating but leading innovation projects.",
      category: "insight",
      tags: JSON.stringify(["gender", "leadership", "innovation"]),
      isPublished: true,
      publishedDate: new Date("2024-08-10"),
      authorName: "Gender Inclusion Specialist"
    },
    {
      title: "Digital Literacy as a Foundation",
      content: "We discovered that basic digital literacy is crucial before AI education. Students with stronger digital foundations show 40% better performance in AI modules.",
      category: "insight",
      tags: JSON.stringify(["digital-literacy", "foundation", "performance"]),
      isPublished: true,
      publishedDate: new Date("2024-08-05"),
      authorName: "Curriculum Designer"
    },
    {
      title: "Community Impact Ripple Effect",
      content: "Graduates are teaching family members and friends, creating a multiplier effect. One graduate has trained 15 people in her village in basic AI concepts.",
      category: "insight",
      tags: JSON.stringify(["community", "ripple-effect", "knowledge-sharing"]),
      isPublished: true,
      publishedDate: new Date("2024-07-28"),
      authorName: "Community Liaison"
    },
    {
      title: "Overcoming Connectivity Challenges",
      content: "Rural participants face significant connectivity issues. We've developed offline learning modules and mobile-friendly content to address this barrier.",
      category: "challenge",
      tags: JSON.stringify(["connectivity", "rural", "accessibility"]),
      isPublished: true,
      publishedDate: new Date("2024-07-20"),
      authorName: "Technical Team Lead"
    }
  ]

  await db.insert(qualitativeInsights).values(insightsData)
  console.log(`✅ Created ${insightsData.length} qualitative insights`)
}

async function seedEnrollmentStats() {
  console.log("📊 Seeding enrollment statistics...")
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const enrollmentData = []
  let cumulativeEnrolled = 0
  let cumulativeCompleted = 0
  
  for (let i = 0; i < 8; i++) { // Last 8 months
    const monthlyEnrolled = Math.floor(Math.random() * 100) + 200 // 200-300 per month
    const monthlyCompleted = Math.floor(cumulativeEnrolled * 0.1) // ~10% complete each month
    const monthlyDropouts = Math.floor(monthlyEnrolled * 0.05) // 5% dropout rate
    
    cumulativeEnrolled += monthlyEnrolled
    cumulativeCompleted += monthlyCompleted
    
    const date = new Date(2024, i, 1)
    
    enrollmentData.push({
      label: months[i],
      enrolled: monthlyEnrolled,
      completed: monthlyCompleted,
      active: cumulativeEnrolled - cumulativeCompleted,
      droppedOut: monthlyDropouts,
      date
    })
  }

  await db.insert(enrollmentStats).values(enrollmentData)
  console.log(`✅ Created ${enrollmentData.length} enrollment statistics`)
}

async function seedResourceMetrics() {
  console.log("💰 Seeding resource metrics...")
  
  const resourceData = [
    {
      metricName: "cost_per_student",
      value: 485.50,
      unit: "USD",
      period: "monthly",
      date: new Date("2024-08-01"),
      target: 500.00
    },
    {
      metricName: "training_hours_per_student",
      value: 120,
      unit: "hours",
      period: "program",
      date: new Date("2024-08-01"),
      target: 100
    },
    {
      metricName: "materials_cost",
      value: 15000,
      unit: "USD",
      period: "monthly",
      date: new Date("2024-08-01"),
      target: 18000
    },
    {
      metricName: "instructor_utilization",
      value: 85.3,
      unit: "percentage",
      period: "monthly",
      date: new Date("2024-08-01"),
      target: 80.0
    }
  ]

  await db.insert(resourceMetrics).values(resourceData)
  console.log(`✅ Created ${resourceData.length} resource metrics`)
}

async function main() {
  try {
    console.log("🌱 Starting database seeding process...")
    
    await seedCohorts()
    await seedStudents()
    await seedProgressUpdates()
    await seedCertifications()
    await seedSDGMappings()
    await seedQualitativeInsights()
    await seedEnrollmentStats()
    await seedResourceMetrics()
    
    console.log("🎉 Database seeding completed successfully!")
    console.log("\n📊 Summary:")
    console.log("- 3 cohorts created")
    console.log("- 500 students created")
    console.log("- Progress updates generated")
    console.log("- Certifications issued")
    console.log("- 6 SDG mappings with metrics")
    console.log("- 5 qualitative insights")
    console.log("- 8 months of enrollment statistics")
    console.log("- Resource efficiency metrics")
    
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seeding script
if (require.main === module) {
  main()
}

export { main as seedDatabase }