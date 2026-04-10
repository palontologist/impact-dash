import { db } from "@/lib/db"
import { userProfiles } from "@/lib/schema"
import { exportLogs } from "@/lib/export-schema"
import { eq } from "drizzle-orm"

export async function createEnterpriseProfile(data: {
  name: string;
  email: string;
  industry: string;
  website?: string;
  clerkUserId: string;
}) {
  return await db.insert(userProfiles).values({
    clerkUserId: data.clerkUserId,
    email: data.email,
    name: data.name,
    userType: 'enterprise',
    industry: data.industry,
    website: data.website,
    onboardingCompleted: true,
    companyDescription: `Enterprise profile for ${data.name}`,
  }).returning();
}

export async function seedEnterpriseData(orgId: number) {
  const now = new Date();
  
  return await db.insert(exportLogs).values([
    {
      organizationId: orgId,
      commodityType: 'Wheat',
      weight: 50,
      weightUnit: 'tons',
      transportMode: 'truck',
      distanceKm: 450,
      carbonEmitted: 2362.5, // (50 * 450 * 0.105)
      status: 'verified',
      timestamp: now,
      createdAt: now,
      updatedAt: now,
    },
    {
      organizationId: orgId,
      commodityType: 'Copper',
      weight: 10,
      weightUnit: 'tons',
      transportMode: 'ship',
      distanceKm: 1200,
      carbonEmitted: 180, // (10 * 1200 * 0.015)
      status: 'verified',
      timestamp: now,
      createdAt: now,
      updatedAt: now,
    },
    {
      organizationId: orgId,
      commodityType: 'Lithium',
      weight: 2,
      weightUnit: 'tons',
      transportMode: 'air',
      distanceKm: 3000,
      carbonEmitted: 3000, // (2 * 3000 * 0.5)
      status: 'verified',
      timestamp: now,
      createdAt: now,
      updatedAt: now,
    }
  ]).returning();
}
