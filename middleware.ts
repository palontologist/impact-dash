import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Make all routes public for demo/testing (no authentication required)
const isPublicRoute = createRouteMatcher([
  '/(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  // Allow all routes without authentication for demo purposes
  // Comment out the line below to enable authentication
  return
  
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
