# FrontForumFocus Impact Dashboard - Architecture Overview

```mermaid
graph TB
    %% User Interface Layer
    subgraph "Frontend Layer (Next.js 15)"
        UI[User Interface]
        subgraph "Main Dashboard Page"
            DH[Dashboard Header]
            MO[Metrics Overview]
            EC[Enrollment Chart]
            OG[Outcomes Grid]
            SM[SDG Mapping]
            RE[Resource Efficiency]
            QI[Qualitative Insights]
            CF[Calculation Formulas]
        end

        subgraph "Dashboard Sections"
            ST[Student Management]
            DI[Data Input Panel]
            LA[Long-term Analysis]
            ER[ESG Reporting]
        end
    end

    %% API Layer
    subgraph "API Routes (Next.js API)"
        subgraph "Dashboard APIs"
            DO[Dashboard Overview API<br/>/api/dashboard/overview]
            DM[Dashboard Metrics API<br/>/api/dashboard/metrics]
        end

        subgraph "Data APIs"
            SA[Students API<br/>/api/students]
            EA[ESG API<br/>/api/esg]
            MA[Metrics API<br/>/api/metrics]
        end
    end

    %% Business Logic Layer
    subgraph "Business Logic Layer"
        subgraph "Query Layer (lib/queries.ts)"
            SQ[Student Queries]
            MQ[Metrics Queries]
            EQ[Enrollment Queries]
            SDQ[SDG Queries]
            IQ[Insights Queries]
            RQ[Resource Queries]
            CQ[Cohort Queries]
            AQ[Analytics Queries]
        end

        subgraph "Utility Layer (lib/)"
            UT[Utils<br/>Helper Functions]
            VA[Validators<br/>Data Validation]
            RG[ESG Report Generator<br/>AI-Powered Reports]
        end
    end

    %% Data Layer
    subgraph "Data Layer (SQLite + Drizzle ORM)"
        DB[(SQLite Database<br/>local.db)]

        subgraph "Core Tables"
            STUDENTS[students<br/>Student profiles & demographics]
            PROGRESS[progress_updates<br/>Learning progress tracking]
            CERTS[certifications<br/>Achievement records]
            METRICS[metrics<br/>KPI tracking]
            ENROLL[enrollment_stats<br/>Enrollment trends]
        end

        subgraph "Impact Tables"
            SDG[sdg_mappings<br/>UN SDG alignment]
            SDG_METRICS[sdg_metrics<br/>SDG-specific metrics]
            INSIGHTS[qualitative_insights<br/>Success stories & feedback]
            RESOURCES[resource_metrics<br/>Cost & efficiency data]
            COHORTS[cohorts<br/>Program batches]
        end

        subgraph "ESG Tables"
            ESG_REPORTS[esg_reports<br/>ESG report generation]
            ESG_METRICS[esg_metrics<br/>ESG performance data]
            ESG_FRAMEWORKS[esg_frameworks<br/>Reporting frameworks]
        end
    end

    %% External Integrations
    subgraph "External Services"
        TURSO[(Turso Database<br/>Cloud SQLite)]
        AI[AI Services<br/>Report Generation]
        CHART[Recharts<br/>Data Visualization]
    end

    %% Data Flow
    UI --> API
    API --> SQ
    API --> MQ
    API --> EQ
    API --> SDQ
    API --> IQ
    API --> RQ
    API --> CQ
    API --> AQ

    SQ --> DB
    MQ --> DB
    EQ --> DB
    SDQ --> DB
    IQ --> DB
    RQ --> DB
    CQ --> DB
    AQ --> DB

    DB --> TURSO
    RG --> AI

    %% Component Dependencies
    MO --> DM
    EC --> EQ
    OG --> MQ
    SM --> SDQ
    QI --> IQ
    RE --> RQ
    ER --> RG

    %% Styling
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef api fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef business fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef data fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef external fill:#fce4ec,stroke:#880e4f,stroke-width:2px

    class UI,DH,MO,EC,OG,SM,RE,QI,CF,ST,DI,LA,ER frontend
    class DO,DM,SA,EA,MA api
    class SQ,MQ,EQ,SDQ,IQ,RQ,CQ,AQ,UT,VA,RG business
    class DB,STUDENTS,PROGRESS,CERTS,METRICS,ENROLL,SDG,SDG_METRICS,INSIGHTS,RESOURCES,COHORTS,ESG_REPORTS,ESG_METRICS,ESG_FRAMEWORKS data
    class TURSO,AI,CHART external
```

## Architecture Overview

The FrontForumFocus Impact Dashboard is built with a modern, scalable architecture designed for tracking and visualizing the impact of AI education programs for marginalized youth in Kenya.

### 🏗️ System Architecture

**Frontend Layer (Next.js 15 + React 19)**
- **Framework**: Next.js 15 with App Router for optimal performance
- **UI Library**: React 19 with modern hooks and concurrent features
- **Styling**: Tailwind CSS 4 for utility-first responsive design
- **Components**: shadcn/ui for consistent, accessible component library
- **Icons**: Lucide React for beautiful, scalable icons
- **Charts**: Recharts for interactive data visualizations

**API Layer (Next.js API Routes)**
- RESTful API endpoints for data operations
- Server-side data fetching and processing
- Error handling and response formatting
- Type-safe API responses with TypeScript

**Business Logic Layer**
- **Query Layer**: Centralized data access patterns using Drizzle ORM
- **Utility Layer**: Helper functions and data validation
- **ESG Report Generator**: AI-powered report generation system

**Data Layer (SQLite + Drizzle ORM)**
- **Database**: SQLite with Turso for cloud synchronization
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Comprehensive database schema with relationships
- **Migrations**: Drizzle migrations for schema versioning

### 📊 Data Flow Architecture

```
User Request → Next.js Page → API Route → Query Function → Database → Response → UI Update
```

1. **User Interaction**: User interacts with dashboard components
2. **Page Rendering**: Next.js renders the page with client/server components
3. **API Calls**: Components fetch data via API routes
4. **Data Processing**: API routes process requests using query functions
5. **Database Operations**: Drizzle ORM executes type-safe SQL queries
6. **Response Formatting**: Data is formatted and returned to the client
7. **UI Updates**: React components update with new data

### 🗂️ Database Schema Overview

**Core Entities:**
- **Students**: Participant profiles, demographics, enrollment data
- **Progress Updates**: Learning progress and AI literacy levels
- **Certifications**: Achievement records and certificates
- **Metrics**: KPI tracking and performance indicators
- **Enrollment Stats**: Historical enrollment trends

**Impact Tracking:**
- **SDG Mappings**: UN Sustainable Development Goals alignment
- **Qualitative Insights**: Success stories and feedback
- **Resource Metrics**: Cost efficiency and resource utilization
- **Cohorts**: Program batches and group management

**ESG Reporting:**
- **ESG Reports**: Generated reports with AI analysis
- **ESG Metrics**: Performance data for ESG frameworks
- **ESG Frameworks**: Supported reporting standards (GRI, SASB, etc.)

### 🔄 Component Architecture

**Dashboard Layout:**
```
DashboardPage (Main Container)
├── DashboardHeader (Navigation & Branding)
└── Tabs (Section Navigation)
    ├── Impact Overview Tab
    │   ├── MetricsOverview (KPI Cards)
    │   ├── EnrollmentChart (Trend Visualization)
    │   ├── OutcomesGrid (Success Metrics)
    │   ├── SDGMapping (Goal Alignment)
    │   ├── ResourceEfficiency (Cost Analysis)
    │   ├── QualitativeInsights (Stories & Feedback)
    │   └── CalculationFormulas (Methodology Documentation)
    ├── Student Management Tab
    │   └── StudentManagement (CRUD Operations)
    ├── Data Input Tab
    │   └── DataInputPanel (Bulk Operations)
    ├── Long-term Analysis Tab
    │   └── LongTermAnalysis (Advanced Analytics)
    └── ESG Reporting Tab
        └── ESGReporting (Report Generation)
```

### 🚀 Performance Optimizations

- **Server-Side Rendering**: Next.js App Router for optimal loading
- **Code Splitting**: Automatic code splitting for better performance
- **Image Optimization**: Next.js Image component for optimized images
- **Caching**: Intelligent caching strategies for API responses
- **Bundle Analysis**: Turbopack for fast development builds

### 🔒 Security Considerations

- **Type Safety**: TypeScript for compile-time error prevention
- **Input Validation**: Server-side validation for all user inputs
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **CORS Configuration**: Proper CORS setup for API security
- **Environment Variables**: Secure configuration management

### 📈 Scalability Features

- **Modular Architecture**: Easy to extend with new features
- **Database Optimization**: Indexed queries and efficient data structures
- **API Rate Limiting**: Built-in protection against abuse
- **Caching Layer**: Redis-ready architecture for high performance
- **Microservices Ready**: API-first design for future decomposition

This architecture provides a solid foundation for tracking educational impact while remaining flexible for future enhancements and scaling requirements.</content>
<parameter name="filePath">/workspaces/impact-dash/docs/ARCHITECTURE.md