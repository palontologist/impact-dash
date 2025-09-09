# FrontForumFocus Impact Dashboard - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Frontend Layer (Next.js 15)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ Dashboard Page  │  │   Components    │  │   UI Library    │             │
│  │                 │  │                 │  │                 │             │
│  │ • Main Layout   │  │ • Metrics       │  │ • shadcn/ui     │             │
│  │ • Tab Navigation│  │ • Charts        │  │ • Radix UI      │             │
│  │ • Data Display  │  │ • Forms         │  │ • Lucide Icons  │             │
│  │                 │  │ • Tables        │  │ • Recharts      │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             API Layer (Next.js)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ Dashboard APIs  │  │ Student APIs    │  │ ESG APIs        │             │
│  │                 │  │                 │  │                 │             │
│  │ • Overview      │  │ • CRUD Ops      │  │ • Reports       │             │
│  │ • Metrics       │  │ • Progress      │  │ • Metrics       │             │
│  │ • Analytics     │  │ • Search/Filter │  │ • Generation    │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Business Logic Layer                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ Query Layer     │  │ Utility Layer   │  │ AI Services     │             │
│  │                 │  │                 │  │                 │             │
│  │ • Student Qs    │  │ • Validation    │  │ • Report Gen    │             │
│  │ • Metrics Qs    │  │ • Helpers       │  │ • Analysis      │             │
│  │ • Analytics Qs  │  │ • Formatting    │  │ • Insights      │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Data Layer (SQLite)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ Core Tables     │  │ Impact Tables   │  │ ESG Tables      │             │
│  │                 │  │                 │  │                 │             │
│  │ • Students      │  │ • SDG Mapping   │  │ • ESG Reports   │             │
│  │ • Progress      │  │ • Insights      │  │ • ESG Metrics   │             │
│  │ • Certifications│  │ • Resources     │  │ • Frameworks    │             │
│  │ • Metrics       │  │ • Cohorts       │  └─────────────────┘             │
│  └─────────────────┘  └─────────────────┘                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          External Services                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ Turso Database  │  │ AI Services     │  │ File Storage    │             │
│  │ (Cloud SQLite)  │  │ (Report Gen)    │  │ (PDFs, Assets)  │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Architecture

```
User Interaction → React Component → API Route → Query Function → Database → Response → UI Update
```

### Key Components:

1. **Frontend Layer**: Next.js 15 + React 19 + TypeScript
   - Responsive dashboard with tabbed navigation
   - Real-time data visualization
   - Interactive forms and data entry

2. **API Layer**: RESTful endpoints for data operations
   - Type-safe request/response handling
   - Server-side validation and processing
   - Error handling and logging

3. **Business Logic Layer**: Core application logic
   - Database queries and data processing
   - Utility functions and helpers
   - AI-powered report generation

4. **Data Layer**: SQLite with Drizzle ORM
   - Comprehensive schema for impact tracking
   - Type-safe database operations
   - Migration support for schema evolution

5. **External Services**: Cloud infrastructure
   - Turso for distributed SQLite
   - AI services for automated analysis
   - File storage for reports and assets

### Dashboard Sections:

- **Impact Overview**: KPIs, charts, SDG mapping, resource efficiency
- **Student Management**: CRUD operations, progress tracking, demographics
- **Data Input**: Forms, bulk operations, validation
- **Long-term Analysis**: Trends, forecasting, advanced analytics
- **ESG Reporting**: AI-generated reports, multi-framework support

This architecture provides a scalable, maintainable foundation for tracking educational impact and generating comprehensive reports for stakeholders.</content>
<parameter name="filePath">/workspaces/impact-dash/docs/ARCHITECTURE_DIAGRAM.md