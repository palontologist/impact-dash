import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/enterprise/dashboard(.*)',
  '/api/dashboard(.*)',
  '/api/students(.*)',
  '/api/metrics(.*)',
  '/api/esg(.*)',
]);

const isOnboardingRoute = createRouteMatcher(['/onboarding(.*)']);
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
const isApiRoute = createRouteMatcher(['/api/(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const pathname = req.nextUrl.pathname;

  // Skip database checks for API routes - let them handle auth themselves
  if (isApiRoute(req)) {
    return NextResponse.next();
  }

  // If user is signed in and tries to access auth pages, redirect to dashboard/onboarding
  if (isAuthRoute(req) && userId) {
    // We can't check onboarding status in edge runtime (no database access)
    // Just redirect to onboarding for safety
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  // If not signed in and trying to access protected route, redirect to sign in
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
