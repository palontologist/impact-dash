# API Documentation

> **Note**: This application currently uses mock data. This documentation outlines the intended API structure for future implementation.

## Overview

The FrontForumFocus Impact Dashboard API will provide endpoints for managing student data, program metrics, and impact measurements for AI education campaigns targeting marginalized youth in Kenya.

## Base URL

```
https://api.frontforumfocus.org/v1
```

## Authentication

API requests require authentication using Bearer tokens:

```http
Authorization: Bearer YOUR_API_TOKEN
```

## Endpoints

### Metrics

#### Get Overall Metrics
```http
GET /metrics/overview
```

**Response:**
```json
{
  "data": {
    "youth_enrolled": {
      "value": 2847,
      "change": 12.5,
      "period": "monthly"
    },
    "completion_rate": {
      "value": 78.3,
      "change": 5.2,
      "period": "monthly"
    },
    "employment_rate": {
      "value": 64.7,
      "change": 8.1,
      "period": "monthly"
    },
    "certification_rate": {
      "value": 82.1,
      "change": 3.4,
      "period": "monthly"
    },
    "rural_reach": {
      "value": 45.2,
      "change": 15.3,
      "period": "monthly"
    }
  },
  "updated_at": "2024-08-31T23:59:59Z"
}
```

### Students

#### Get All Students
```http
GET /students?page=1&limit=50&filter[location]=rural
```

**Query Parameters:**
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 50, max: 100)
- `filter[location]` (string): Filter by rural/urban
- `filter[status]` (string): Filter by enrollment status
- `filter[gender]` (string): Filter by gender
- `search` (string): Search by name or ID

**Response:**
```json
{
  "data": [
    {
      "id": "STU001",
      "name": "Jane Wanjiku",
      "age": 19,
      "gender": "female",
      "location": "rural",
      "county": "Kiambu",
      "enrollment_date": "2024-08-01",
      "status": "active",
      "completion_percentage": 75,
      "certifications": ["AI Basics", "Digital Literacy"],
      "employment_status": "employed",
      "contact": {
        "phone": "+254700000000",
        "email": "jane@example.com"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 57,
    "total_count": 2847,
    "per_page": 50
  }
}
```

#### Create Student
```http
POST /students
```

**Request Body:**
```json
{
  "name": "John Mwangi",
  "age": 20,
  "gender": "male",
  "location": "urban",
  "county": "Nairobi",
  "phone": "+254700000001",
  "email": "john@example.com"
}
```

#### Update Student
```http
PUT /students/{student_id}
```

#### Delete Student
```http
DELETE /students/{student_id}
```

### Enrollment Data

#### Get Enrollment Trends
```http
GET /enrollment/trends?period=monthly&start_date=2024-01-01&end_date=2024-08-31
```

**Response:**
```json
{
  "data": [
    {
      "period": "2024-08",
      "enrolled": 342,
      "completed": 268,
      "dropped_out": 12,
      "active": 274
    }
  ]
}
```

### SDG Impact

#### Get SDG Mappings
```http
GET /sdg/mappings
```

**Response:**
```json
{
  "data": [
    {
      "sdg_number": 4,
      "title": "Quality Education",
      "impact_level": "high",
      "metrics": [
        "2,847 youth trained",
        "78.3% completion rate",
        "82.1% certification rate"
      ],
      "progress": 78.3
    }
  ]
}
```

### Reports

#### Generate Report
```http
POST /reports/generate
```

**Request Body:**
```json
{
  "type": "monthly_impact",
  "format": "pdf",
  "date_range": {
    "start": "2024-08-01",
    "end": "2024-08-31"
  },
  "include_sections": [
    "metrics_overview",
    "enrollment_data",
    "sdg_mapping",
    "qualitative_insights"
  ]
}
```

**Response:**
```json
{
  "report_id": "REP001",
  "status": "generating",
  "download_url": null,
  "estimated_completion": "2024-09-01T10:05:00Z"
}
```

#### Get Report Status
```http
GET /reports/{report_id}
```

## Data Models

### Student
```typescript
interface Student {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  location: 'rural' | 'urban'
  county: string
  enrollment_date: string
  status: 'active' | 'completed' | 'dropped_out'
  completion_percentage: number
  certifications: string[]
  employment_status: 'employed' | 'unemployed' | 'self_employed' | 'student'
  contact: {
    phone: string
    email: string
  }
  created_at: string
  updated_at: string
}
```

### Metric
```typescript
interface Metric {
  value: number
  change: number
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  updated_at: string
}
```

### SDGMapping
```typescript
interface SDGMapping {
  sdg_number: number
  title: string
  impact_level: 'high' | 'medium' | 'low'
  metrics: string[]
  progress: number
  target_date?: string
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "age",
        "message": "Age must be between 15 and 35"
      }
    ]
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

- 1000 requests per hour per API key
- Rate limit headers included in responses:
  ```
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 999
  X-RateLimit-Reset: 1609459200
  ```

## Webhooks

Configure webhooks to receive real-time updates:

### Student Events
- `student.enrolled`
- `student.completed`
- `student.employment_update`

### Program Events
- `program.milestone_reached`
- `program.target_achieved`

## SDK Examples

### JavaScript/TypeScript
```typescript
import { FrontForumFocusAPI } from '@frontforumfocus/api-client'

const api = new FrontForumFocusAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.frontforumfocus.org/v1'
})

// Get metrics
const metrics = await api.metrics.getOverview()

// Create student
const student = await api.students.create({
  name: 'Jane Doe',
  age: 20,
  gender: 'female',
  location: 'rural',
  county: 'Kiambu'
})
```

### Python
```python
from frontforumfocus import APIClient

client = APIClient(api_key='your-api-key')

# Get students
students = client.students.list(
    filter={'location': 'rural'},
    limit=50
)

# Generate report
report = client.reports.generate(
    type='monthly_impact',
    format='pdf',
    date_range={'start': '2024-08-01', 'end': '2024-08-31'}
)
```

## Development Environment

### Local API Setup
```bash
# Clone API repository
git clone https://github.com/frontforumfocus/api-server.git

# Install dependencies
npm install

# Set environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/impact_db
JWT_SECRET=your-jwt-secret
API_PORT=3001
REDIS_URL=redis://localhost:6379
```

---

For questions about API integration, please contact the development team at dev@frontforumfocus.org