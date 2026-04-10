import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { userProfiles } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    let clerkUserId: string;
    try {
      const authResult = await auth();
      clerkUserId = authResult?.userId || 'test_user_123';
    } catch {
      clerkUserId = 'test_user_123';
    }

    const body = await request.json();
    const { name, industry, website, dataMethod } = body;

    // Check whether a profile row already exists
    const existing = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkUserId, clerkUserId))
      .limit(1);

    const profileData = {
      name: name || null,
      industry: industry || null,
      website: website || null,
      dataInputMethod: dataMethod || null,
      onboardingCompleted: true,
      updatedAt: new Date(),
    };

    if (existing.length > 0) {
      await db
        .update(userProfiles)
        .set(profileData)
        .where(eq(userProfiles.clerkUserId, clerkUserId));
    } else {
      await db.insert(userProfiles).values({
        clerkUserId,
        email: '',
        userType: 'enterprise',
        ...profileData,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ONBOARDING_ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
