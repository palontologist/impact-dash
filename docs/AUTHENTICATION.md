# Authentication Setup

This project uses Clerk for authentication. The setup includes:

## Middleware Protection

The `middleware.ts` file protects the following routes:
- `/dashboard/*` - Main dashboard (requires authentication)
- `/onboarding/*` - Onboarding flow (requires authentication)
- `/api/dashboard/*` - Dashboard API routes
- `/api/students/*` - Student management APIs
- `/api/metrics/*` - Metrics APIs
- `/api/esg/*` - ESG reporting APIs

## Environment Variables

Make sure you have the following environment variables set in `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

## User Flow

1. **Unauthenticated users** visiting the homepage:
   - See "Get Started" and "Launch your impact dashboard" buttons
   - Clicking these buttons redirects to Clerk sign-in/sign-up modal
   - After authentication, users are redirected to `/onboarding`

2. **Authenticated users** visiting the homepage:
   - See "Dashboard" and "Go to Dashboard" buttons
   - Can directly access the dashboard

3. **Protected routes**:
   - If users try to access `/dashboard` or `/onboarding` without authentication
   - Middleware automatically redirects them to sign in
   - After successful authentication, they're redirected to the original destination

## Authentication Components

The layout includes Clerk components:
- `SignInButton` - Modal sign-in button
- `SignUpButton` - Modal sign-up button
- `UserButton` - User profile menu (shown when signed in)
- `SignedIn` / `SignedOut` - Conditional rendering based on auth state

## Note on proxy.ts

The original `proxy.ts` file contained basic Clerk middleware. It has been replaced by `middleware.ts` which includes route protection. You can safely delete `proxy.ts` if it still exists.
