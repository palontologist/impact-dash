# Deployment Guide

This guide covers deployment options for the FrontForumFocus Impact Dashboard across different platforms.

## 🚀 Quick Deploy (Recommended)

### Vercel Deployment

Vercel provides the best experience for Next.js applications with zero configuration.

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Configure DNS settings as instructed

**Environment Variables:**
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🐳 Docker Deployment

### Build Docker Image

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  impact-dash:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☁️ Cloud Platform Deployments

### AWS Amplify

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify**
   ```bash
   amplify init
   ```

3. **Add Hosting**
   ```bash
   amplify add hosting
   amplify publish
   ```

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18`

2. **Deploy**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Build for static export
   npm run build

   # Deploy
   netlify deploy --prod --dir=out
   ```

### Digital Ocean App Platform

1. **Create `app.yaml`**
   ```yaml
   name: impact-dashboard
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/impact-dash
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     routes:
     - path: /
     envs:
     - key: NODE_ENV
       value: production
   ```

2. **Deploy**
   - Push `app.yaml` to your repository
   - Connect repository in Digital Ocean dashboard
   - Deploy automatically

## 🔧 Build Optimization

### Static Export (Optional)

For static hosting without server features:

Update `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

Build static files:
```bash
npm run build
```

### Bundle Analysis

Analyze bundle size:
```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Update next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

## 🔐 Security Configuration

### Environment Variables

**Production Environment:**
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
API_BASE_URL=https://api.yourdomain.com
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
```

### Security Headers

Add to `next.config.ts`:
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}
```

### SSL/TLS Configuration

Most platforms handle SSL automatically. For custom servers:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 Monitoring & Performance

### Performance Monitoring

Add monitoring tools:

```bash
# Install performance monitoring
npm install @vercel/analytics @vercel/speed-insights
```

Update `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Health Checks

Create `app/api/health/route.ts`:
```typescript
export async function GET() {
  return Response.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  })
}
```

### Error Monitoring

Configure error tracking:

```bash
npm install @sentry/nextjs
```

Create `sentry.client.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### Quality Checks

Add quality gates:
```yaml
    - name: Lint code
      run: npm run lint
    
    - name: Type check
      run: npx tsc --noEmit
    
    - name: Security audit
      run: npm audit --audit-level high
```

## 🌍 Global Deployment

### Multi-Region Setup

For global performance:

1. **CDN Configuration**
   - Enable Vercel's Edge Network
   - Configure CloudFlare for additional regions
   - Use regional database replicas

2. **Edge Functions**
   ```typescript
   // middleware.ts
   import { NextResponse } from 'next/server'
   import type { NextRequest } from 'next/server'
   
   export function middleware(request: NextRequest) {
     const country = request.geo?.country || 'US'
     
     // Add country to headers
     const response = NextResponse.next()
     response.headers.set('x-user-country', country)
     
     return response
   }
   ```

### Localization Setup

Prepare for multiple languages:
```typescript
// next.config.ts
const nextConfig = {
  i18n: {
    locales: ['en', 'sw', 'fr'], // English, Swahili, French
    defaultLocale: 'en',
  },
}
```

## 🔍 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version # Should be 18.17+
```

**Memory Issues:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

**Environment Variables Not Loading:**
- Verify `.env.production` file exists
- Check platform-specific environment variable settings
- Ensure `NEXT_PUBLIC_` prefix for client-side variables

### Performance Optimization

**Bundle Size:**
```bash
# Analyze bundle
ANALYZE=true npm run build

# Remove unused dependencies
npm prune

# Use dynamic imports for large components
const LargeComponent = dynamic(() => import('./LargeComponent'))
```

**Image Optimization:**
```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Dashboard preview"
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

---

For deployment assistance, contact the development team at deploy@frontforumfocus.org