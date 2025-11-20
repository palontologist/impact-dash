// Middleware temporarily disabled for demo purposes
// Authentication will be re-enabled in production

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Make all routes public for demo/testing (no authentication required)
// const isPublicRoute = createRouteMatcher([
//   '/(.*)',
// ])

// export default clerkMiddleware(async (auth, request) => {
//   // Allow all routes without authentication for demo purposes
//   return
  
//   if (!isPublicRoute(request)) {
//     await auth.protect()
//   }
// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }

// Placeholder middleware - does nothing for demo
import { NextResponse } from 'next/server'

export function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
