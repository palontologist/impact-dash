import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userProfiles } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app, we would get the clerkUserId from the auth session
    // For the demo, we assume it's passed in the body
    const { clerkUserId, ...profileData } = body;

    if (!clerkUserId) {
      return NextResponse.json({ error: 'Missing clerkUserId' }, { status: 400 });
    }

    await db.update(userProfiles)
      .set({
        ...profileData,
        onboardingCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.clerkUserId, clerkUserId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ONBOARDING_ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
