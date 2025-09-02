# Drizzle ORM + Turso Database Setup Guide

This guide covers the complete setup of Drizzle ORM with Turso database for the FrontForumFocus Impact Dashboard.

## 🗄️ Database Overview

The dashboard uses **Turso** (SQLite-based) as the database with **Drizzle ORM** for type-safe database operations. This combination provides:

- **Serverless SQLite** with global replication
- **Type-safe queries** with TypeScript
- **Schema management** with migrations
- **Edge-ready** performance
- **Cost-effective** scaling

## 📋 Prerequisites

1. **Turso Account**: Sign up at [turso.tech](https://turso.tech)
2. **Turso CLI**: Install via `curl -sSfL https://get.tur.so/install.sh | bash`
3. **Node.js 18+**: Required for Drizzle and Next.js

## 🚀 Initial Setup

### 1. Create Turso Database

```bash
# Login to Turso
turso auth login

# Create a new database
turso db create impact-dash

# Get database URL
turso db show impact-dash

# Create auth token
turso db tokens create impact-dash
```

### 2. Environment Variables

Create `.env.local` file:

```env
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

### 3. Install Dependencies

```bash
npm install drizzle-orm @libsql/client
npm install -D drizzle-kit tsx dotenv-cli
```

## 📁 Project Structure

```
lib/
├── db.ts              # Database connection
├── schema.ts          # Database schema definitions
└── queries.ts         # Type-safe query functions

scripts/
└── seed.ts           # Database seeding script

drizzle/
└── *.sql             # Generated migrations

drizzle.config.ts     # Drizzle configuration
```

## 🔧 Configuration Files

### drizzle.config.ts
```typescript
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: `${process.env.TURSO_DATABASE_URL}?authToken=${process.env.TURSO_AUTH_TOKEN}`,
  },
})
```

### lib/db.ts
```typescript
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema"

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client, { schema })
export type Database = typeof db
```

## 📊 Database Schema

The database includes the following tables:

### Core Tables
- **`students`** - Student information and enrollment data
- **`cohorts`** - Program batches/groups
- **`progress_updates`** - Student learning progress tracking
- **`certifications`** - Issued certificates and achievements

### Analytics Tables
- **`metrics`** - Dashboard KPI data
- **`enrollment_stats`** - Historical enrollment statistics
- **`resource_metrics`** - Program cost and efficiency metrics

### Impact Measurement
- **`sdg_mappings`** - UN Sustainable Development Goals alignment
- **`sdg_metrics`** - Specific metrics for each SDG
- **`qualitative_insights`** - Success stories and feedback

### Key Features
- **Type-safe schema** with TypeScript inference
- **Automatic timestamps** with SQLite functions
- **Foreign key relationships** with cascade deletes
- **Indexed fields** for performance
- **JSON fields** for flexible data storage

## 🛠️ Available Scripts

```bash
# Generate migrations from schema changes
npm run db:generate

# Push schema to database
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio

# Seed database with sample data
npm run db:seed
```

## 📝 Database Operations

### Creating Queries

```typescript
import { db } from "@/lib/db"
import { students, eq, desc } from "@/lib/schema"

// Get all students
const allStudents = await db.select().from(students)

// Get student by ID
const student = await db
  .select()
  .from(students)
  .where(eq(students.id, 1))
  .limit(1)

// Create new student
const newStudent = await db
  .insert(students)
  .values({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    county: "Nairobi"
  })
  .returning()
```

### Using Query Functions

```typescript
import { studentQueries, metricsQueries } from "@/lib/queries"

// Get paginated students
const studentsData = await studentQueries.getAll({
  page: 1,
  limit: 50,
  status: "active"
})

// Get dashboard metrics
const metrics = await metricsQueries.getOverview()
```

## 🔄 Schema Migrations

### Making Schema Changes

1. **Edit schema** in `lib/schema.ts`
2. **Generate migration**: `npm run db:generate`
3. **Review SQL** in `drizzle/` directory
4. **Push to database**: `npm run db:push`

### Example Migration Workflow

```bash
# After editing schema.ts
npm run db:generate
# Review the generated SQL file
npm run db:push
```

## 🌱 Database Seeding

The project includes a comprehensive seeding script:

### What Gets Seeded
- **500 students** with realistic data distribution
- **3 cohorts** representing different program phases
- **1,700+ progress updates** tracking student journey
- **600+ certifications** for completed students
- **SDG mappings** with impact metrics
- **Enrollment statistics** for chart visualization
- **Qualitative insights** and success stories

### Running Seeds

```bash
# Seed with environment variables
npx dotenv-cli -e .env.local -- npm run db:seed
```

### Customizing Seed Data

Edit `scripts/seed.ts` to:
- Adjust student count and demographics
- Modify cohort information
- Update SDG mappings
- Add custom success stories

## 📈 Performance Optimization

### Indexing Strategy
```sql
-- Key indexes automatically created by Drizzle
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_progress_student_id ON progress_updates(student_id);
```

### Query Optimization
- Use **selective where clauses** to leverage indexes
- **Limit result sets** with pagination
- **Batch operations** for bulk inserts
- **Aggregate queries** for dashboard metrics

### Connection Pooling
Turso handles connection pooling automatically, but consider:
- **Connection reuse** in serverless functions
- **Query batching** for related operations
- **Caching strategies** for frequently accessed data

## 🔍 Debugging & Monitoring

### Drizzle Studio
Access the database GUI at `http://localhost:5555`:
```bash
npm run db:studio
```

### Query Logging
Enable in development:
```typescript
export const db = drizzle(client, { 
  schema, 
  logger: true // Enable query logging
})
```

### Error Handling
```typescript
try {
  const result = await db.select().from(students)
  return result
} catch (error) {
  console.error("Database error:", error)
  throw new Error("Failed to fetch students")
}
```

## 🌐 Production Deployment

### Environment Setup
```env
# Production
TURSO_DATABASE_URL=libsql://prod-database.turso.io
TURSO_AUTH_TOKEN=prod-token-here

# Staging
TURSO_DATABASE_URL=libsql://staging-database.turso.io
TURSO_AUTH_TOKEN=staging-token-here
```

### Database Scaling
- **Regional replicas** for global performance
- **Read replicas** for analytics workloads
- **Backup strategies** with Turso's built-in backups

### Security Best Practices
- **Rotate auth tokens** regularly
- **Use environment-specific** databases
- **Validate input** before database operations
- **Implement rate limiting** for API endpoints

## 🔄 Backup & Recovery

### Automated Backups
Turso provides automatic backups:
```bash
# List backups
turso db list-backups impact-dash

# Restore from backup
turso db restore impact-dash <backup-id>
```

### Manual Export
```bash
# Export database
turso db dump impact-dash > backup.sql

# Import to new database
turso db create impact-dash-restore
turso db shell impact-dash-restore < backup.sql
```

## 📚 Additional Resources

- **Drizzle ORM Docs**: [orm.drizzle.team](https://orm.drizzle.team)
- **Turso Documentation**: [docs.turso.tech](https://docs.turso.tech)
- **SQLite Reference**: [sqlite.org/docs](https://sqlite.org/docs.html)
- **Drizzle Studio**: [github.com/drizzle-team/drizzle-kit-mirror](https://github.com/drizzle-team/drizzle-kit-mirror)

## 🛟 Troubleshooting

### Common Issues

**Connection Errors:**
```bash
# Check database status
turso db show impact-dash

# Verify token
turso auth token
```

**Schema Sync Issues:**
```bash
# Reset and regenerate
rm -rf drizzle/
npm run db:generate
npm run db:push
```

**Type Errors:**
```bash
# Regenerate types
npm run db:generate
```

**Seed Failures:**
```bash
# Check data constraints
# Verify foreign key relationships
# Ensure unique constraints are met
```

---

For additional support, contact the development team or check the project's GitHub issues.