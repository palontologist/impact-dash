# FrontForumFocus Impact Dashboard 📊

An interactive dashboard for tracking and visualizing the impact of AI education campaigns for marginalized youth in Kenya. This comprehensive platform helps monitor program effectiveness, student progress, and alignment with UN Sustainable Development Goals.

![Dashboard Preview](./docs/dashboard-preview.png)

## 📋 Overview

The FrontForumFocus Impact Dashboard is designed to track and measure the success of AI literacy programs targeting marginalized youth in Kenya. It provides comprehensive analytics, student management tools, and impact visualization capabilities to help stakeholders understand program effectiveness and make data-driven decisions.

### 🎯 Key Objectives

- Track youth enrollment and completion rates in AI education programs
- Monitor employment outcomes and economic impact
- Visualize progress toward UN Sustainable Development Goals
- Manage student data and program metrics
- Provide insights for program improvement and resource allocation

## ✨ Features

### 📈 Impact Overview
- **Real-time metrics** tracking enrollment, completion, and employment rates
- **Interactive charts** showing enrollment trends and program outcomes
- **SDG mapping** to visualize alignment with UN Sustainable Development Goals
- **Resource efficiency** monitoring and cost-per-outcome analysis
- **Calculation methodologies** with detailed formulas and benchmarks

### 👥 Student Management
- Comprehensive student database with enrollment tracking
- Progress monitoring and certification status
- Demographic analysis (gender, rural/urban distribution)
- Individual student journey tracking
- Cohort management and batch operations

### 📊 Data Input & Analysis
- Streamlined data entry interfaces for program coordinators
- Bulk data import/export capabilities
- Long-term trend analysis and forecasting
- Qualitative insights and success stories
- Advanced filtering and search functionality

### 🎨 ESG Reporting
- AI-powered ESG report generation
- Multi-framework support (GRI, SASB, ISSB)
- Automated metric calculations and benchmarking
- Executive summaries and key findings
- PDF report generation and export

### 📈 Long-term Analysis
- Historical trend analysis and forecasting
- Predictive modeling for program outcomes
- Comparative analysis across cohorts and regions
- Impact measurement over extended time periods
- Custom analytics dashboards

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Reusable component library
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Recharts](https://recharts.org/)** - Data visualization library

### Backend & Database
- **[SQLite](https://sqlite.org/)** - Lightweight, file-based database
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe SQL query builder
- **[Turso](https://turso.tech/)** - Distributed SQLite for cloud deployment
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless API endpoints

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/palontologist/impact-dash.git
   cd impact-dash
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables** (optional for local development)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Turso database credentials
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard

## 📁 Project Structure

```
impact-dash/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Main dashboard page
│   ├── globals.css              # Global styles
│   └── api/                     # API routes
│       ├── dashboard/           # Dashboard-specific APIs
│       │   └── overview/        # Overview metrics endpoint
│       ├── esg/                 # ESG reporting APIs
│       │   ├── metrics/         # ESG metrics endpoint
│       │   ├── reports/         # Report generation
│       │   └── generate/        # AI-powered report creation
│       ├── metrics/             # General metrics APIs
│       │   └── overview/        # Metrics overview
│       └── students/            # Student management APIs
│           ├── route.ts         # Student CRUD operations
│           └── [id]/            # Individual student operations
│               ├── route.ts     # Get/Update/Delete student
│               └── progress/    # Student progress tracking
├── components/                  # React components
│   ├── ui/                     # shadcn/ui components
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   └── tabs.tsx
│   ├── dashboard-header.tsx    # Dashboard navigation header
│   ├── metrics-overview.tsx    # KPI metrics cards
│   ├── enrollment-chart.tsx    # Enrollment trend visualization
│   ├── outcomes-grid.tsx       # Success metrics grid
│   ├── sdg-mapping.tsx         # UN SDG alignment display
│   ├── qualitative-insights.tsx # Success stories & feedback
│   ├── resource-efficiency.tsx # Cost analysis component
│   ├── student-management.tsx  # Student CRUD interface
│   ├── data-input-panel.tsx    # Data entry forms
│   ├── long-term-analysis.tsx  # Advanced analytics
│   ├── esg-reporting.tsx       # ESG report interface
│   └── calculation-formulas.tsx # Methodology documentation
├── lib/                        # Utility functions and configurations
│   ├── db.ts                  # Database connection (Drizzle + Turso)
│   ├── schema.ts              # Database schema definitions
│   ├── queries.ts             # Database query functions
│   ├── esg-queries.ts         # ESG-specific queries
│   ├── esg-report-generator.ts # AI report generation logic
│   ├── utils.ts               # Helper functions
│   └── validators.ts          # Data validation functions
├── public/                    # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   └── vercel.svg
├── docs/                      # Documentation
│   ├── API.md                # API documentation
│   ├── DATABASE.md           # Database schema documentation
│   ├── DEPLOYMENT.md         # Deployment guides
│   ├── CONTRIBUTING.md       # Contribution guidelines
│   └── ARCHITECTURE.md       # System architecture overview
├── drizzle/                   # Database migrations
│   ├── 0000_swift_warpath.sql # Initial schema migration
│   ├── 0001_broad_spot.sql    # Schema updates
│   └── meta/                  # Migration metadata
├── scripts/                   # Utility scripts
│   └── seed.ts               # Database seeding script
└── Configuration Files
    ├── package.json           # Dependencies and scripts
    ├── tsconfig.json          # TypeScript configuration
    ├── tailwind.config.ts     # Tailwind CSS configuration
    ├── next.config.ts         # Next.js configuration
    ├── postcss.config.mjs     # PostCSS configuration
    ├── eslint.config.mjs      # ESLint configuration
    └── components.json        # shadcn/ui configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

## 📊 Dashboard Sections

### 1. Impact Overview
The main dashboard view displaying comprehensive program metrics and visualizations:

#### **Metrics Overview**
- **Youth Enrolled**: Total participants registered in the program
- **Completion Rate**: Percentage of participants who successfully complete training
- **Employment Rate**: Percentage of graduates who secure employment
- **Certification Rate**: Percentage of participants who achieve AI literacy certification
- **Rural Reach**: Percentage of participants from low-connectivity rural areas

#### **Enrollment Chart**
Interactive line chart showing enrollment trends over time with:
- Monthly enrollment numbers
- Completion tracking
- Active participant counts
- Historical trend analysis

#### **Outcomes Grid**
Visual representation of key success metrics including:
- Employment outcomes by sector
- Certification achievements
- Skill development progress
- Geographic distribution of impact

#### **SDG Mapping**
Visualization of alignment with UN Sustainable Development Goals:
- **SDG 4**: Quality Education - AI literacy and digital skills
- **SDG 8**: Decent Work - Employment and entrepreneurship outcomes
- **SDG 10**: Reduced Inequalities - Rural and gender equity focus

#### **Resource Efficiency**
Cost analysis and efficiency metrics:
- Cost per beneficiary
- Training hours per participant
- Resource utilization rates
- Return on investment calculations

#### **Qualitative Insights**
Success stories and feedback from participants:
- Student testimonials
- Program impact narratives
- Challenge identification
- Improvement recommendations

#### **Calculation Formulas**
Detailed methodology documentation including:
- Impact scoring formulas
- SDG alignment calculations
- GRI (Global Reporting Initiative) metrics
- SASB/ISSB sector-specific calculations
- Cost-effectiveness benchmarks

### 2. Student Management
Comprehensive student database and management system:

#### **Student Profiles**
- Personal information and demographics
- Enrollment and completion dates
- Geographic location data
- Contact information and emergency contacts

#### **Progress Tracking**
- AI literacy level assessments
- Course completion percentages
- Certification achievements
- Learning milestone tracking

#### **Demographic Analytics**
- Gender distribution analysis
- Rural vs urban participant breakdown
- Age group segmentation
- Geographic coverage mapping

#### **Cohort Management**
- Program batch organization
- Group progress monitoring
- Comparative cohort analysis
- Graduation tracking

### 3. Data Input
Streamlined interfaces for program coordinators:

#### **Individual Data Entry**
- Student registration forms
- Progress update interfaces
- Certification recording
- Outcome tracking forms

#### **Bulk Operations**
- CSV import/export functionality
- Batch data updates
- Bulk enrollment processing
- Mass progress updates

#### **Data Validation**
- Real-time input validation
- Duplicate detection
- Data consistency checks
- Error reporting and correction

### 4. Long-term Analysis
Advanced analytics and forecasting capabilities:

#### **Trend Analysis**
- Historical performance trends
- Seasonal pattern identification
- Growth rate calculations
- Comparative period analysis

#### **Predictive Modeling**
- Completion rate forecasting
- Employment outcome predictions
- Resource requirement planning
- Program scaling projections

#### **Custom Analytics**
- Ad-hoc query capabilities
- Custom metric calculations
- Advanced filtering options
- Exportable analysis reports

### 5. ESG Reporting
AI-powered environmental, social, and governance reporting:

#### **Multi-Framework Support**
- **GRI Standards**: Global Reporting Initiative metrics
- **SASB**: Sustainability Accounting Standards Board
- **ISSB**: International Sustainability Standards Board
- **Integrated Reporting**: Comprehensive ESG narratives

#### **Automated Report Generation**
- AI-powered executive summaries
- Automated metric calculations
- Benchmark comparisons
- Key finding identification

#### **Report Customization**
- Custom reporting periods
- Stakeholder-specific content
- Multi-format exports (PDF, Excel, JSON)
- Template customization

## 🗄️ Database Schema

The application uses a comprehensive SQLite database with the following key tables:

### Core Tables
- **students**: Participant profiles and demographics
- **progress_updates**: Learning progress tracking
- **certifications**: Achievement and certificate records
- **metrics**: KPI tracking and performance indicators
- **enrollment_stats**: Historical enrollment data

### Impact Tables
- **sdg_mappings**: UN Sustainable Development Goals alignment
- **sdg_metrics**: SDG-specific performance metrics
- **qualitative_insights**: Success stories and feedback
- **resource_metrics**: Cost and efficiency data
- **cohorts**: Program batch management

### ESG Tables
- **esg_reports**: Generated ESG reports
- **esg_metrics**: ESG performance data
- **esg_frameworks**: Supported reporting frameworks

For detailed database documentation, see [DATABASE.md](./docs/DATABASE.md).

## 🔌 API Reference

The dashboard provides RESTful API endpoints for data operations:

### Dashboard APIs
- `GET /api/dashboard/overview` - Overview metrics and KPIs
- `GET /api/dashboard/metrics` - Detailed metrics data

### Student APIs
- `GET /api/students` - List students with filtering
- `POST /api/students` - Create new student
- `GET /api/students/[id]` - Get student details
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

### ESG APIs
- `GET /api/esg/metrics` - ESG performance metrics
- `POST /api/esg/reports/generate` - Generate ESG report

For complete API documentation, see [API.md](./docs/API.md).

## 🎨 Customization

### Styling
The dashboard uses Tailwind CSS for styling. Customize the theme by modifying:
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration
- `components/ui/` - Individual component styles

### Components
Add new components to the `components/` directory and import them in your pages. The project uses:
- shadcn/ui for consistent design system
- Radix UI for accessible headless components
- Custom components for dashboard-specific functionality

### Data Integration
Currently uses mock data. To integrate with real data sources:
1. Create API routes in `app/api/`
2. Add data fetching logic to components
3. Implement proper error handling and loading states

## 🌍 Deployment

### Environment Variables
Create a `.env.local` file with the following variables:

```env
# Database Configuration
TURSO_DATABASE_URL=file:local.db
TURSO_AUTH_TOKEN=your_turso_auth_token

# Optional: External Services
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically with optimized settings

### Other Platforms
The dashboard can be deployed on any platform supporting Next.js:
- **Netlify**: Static site generation support
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment
- **Traditional hosting**: Static export option

For detailed deployment guides, see [DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## 📈 Performance

### Optimizations
- **Server-Side Rendering**: Next.js App Router for optimal loading
- **Code Splitting**: Automatic code splitting for better performance
- **Image Optimization**: Next.js Image component for optimized images
- **Caching**: Intelligent caching strategies for API responses
- **Bundle Analysis**: Turbopack for fast development builds

### Monitoring
- **Core Web Vitals**: Optimized for performance metrics
- **Lighthouse Scores**: Aiming for 90+ scores across all categories
- **Bundle Size**: Monitored and optimized for fast loading
- **API Response Times**: Sub-100ms target for all endpoints

## 🔒 Security

### Data Protection
- **Type Safety**: TypeScript for compile-time error prevention
- **Input Validation**: Server-side validation for all user inputs
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **CORS Configuration**: Proper CORS setup for API security

### Privacy Compliance
- **Data Minimization**: Only collect necessary participant data
- **Consent Management**: Clear consent for data collection
- **Data Retention**: Defined retention policies
- **Access Controls**: Role-based access to sensitive data

## 🌍 Contributing

We welcome contributions to improve the Impact Dashboard! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain component documentation
- Write descriptive commit messages
- Test your changes thoroughly
- Ensure responsive design compliance

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb configuration with React rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

## 📄 Documentation

- **[Architecture Overview](./docs/ARCHITECTURE.md)** - System architecture and data flow
- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Database Schema](./docs/DATABASE.md)** - Database structure and relationships
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Deployment instructions and configurations
- **[Contributing Guide](./docs/CONTRIBUTING.md)** - Development and contribution guidelines

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core dashboard functionality
- ✅ Student management system
- ✅ ESG reporting capabilities
- ✅ Data visualization components

### Phase 2 (Upcoming)
- 🔄 Mobile application development
- 🔄 Advanced AI analytics
- 🔄 Multi-language support
- 🔄 Real-time collaboration features

### Phase 3 (Future)
- 🔄 Predictive modeling engine
- 🔄 Integration with learning management systems
- 🔄 Advanced reporting and business intelligence
- 🔄 API marketplace for third-party integrations

## 🤝 Support

For questions, issues, or contributions:
- 📧 Email: [support@frontforumfocus.org](mailto:support@frontforumfocus.org)
- 🐛 Issues: [GitHub Issues](https://github.com/palontologist/impact-dash/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/palontologist/impact-dash/discussions)
- 📖 Documentation: [GitHub Wiki](https://github.com/palontologist/impact-dash/wiki)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FrontForumFocus Team** - Program design and implementation
- **Marginalized Youth in Kenya** - Program participants and inspiration
- **UN Sustainable Development Goals** - Framework for impact measurement
- **Next.js Team** - Framework development and support
- **shadcn** - UI component library and design system
- **Vercel** - Deployment platform and infrastructure
- **Turso** - Distributed SQLite database technology

---

Built with ❤️ for social impact and youth empowerment in Kenya.

*Last updated: September 9, 2025*</content>
<parameter name="filePath">/workspaces/impact-dash/README.md

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Reusable component library
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Recharts](https://recharts.org/)** - Data visualization library

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development
- **[PostCSS](https://postcss.org/)** - CSS processing

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/palontologist/impact-dash.git
   cd impact-dash
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard

## 📁 Project Structure

```
impact-dash/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Dashboard home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard-header.tsx
│   ├── metrics-overview.tsx
│   ├── enrollment-chart.tsx
│   ├── outcomes-grid.tsx
│   ├── sdg-mapping.tsx
│   ├── student-management.tsx
│   ├── data-input-panel.tsx
│   └── long-term-analysis.tsx
├── lib/                   # Utility functions
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📊 Dashboard Sections

### 1. Impact Overview
The main dashboard view displaying:
- **Metrics Overview**: Key performance indicators (KPIs)
- **Enrollment Chart**: Trend visualization over time
- **Outcomes Grid**: Success metrics and completion rates
- **SDG Mapping**: Alignment with UN Sustainable Development Goals
- **Resource Efficiency**: Cost analysis and resource utilization

### 2. Student Management
Comprehensive student tracking including:
- Student enrollment and demographic data
- Progress tracking and certification status
- Geographic distribution analysis
- Individual student journey visualization

### 3. Data Input
Streamlined interfaces for:
- Manual data entry by program coordinators
- Bulk data import from external sources
- Data validation and quality checks
- Real-time dashboard updates

### 4. Long-term Analysis
Advanced analytics featuring:
- Historical trend analysis
- Predictive modeling and forecasting
- Comparative analysis across programs
- Impact measurement over time

## 🎨 Customization

### Styling
The dashboard uses Tailwind CSS for styling. Customize the theme by modifying:
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration
- `components/ui/` - Individual component styles

### Components
Add new components to the `components/` directory and import them in your pages. The project uses:
- shadcn/ui for consistent design system
- Radix UI for accessible headless components
- Custom components for dashboard-specific functionality

### Data Integration
Currently uses mock data. To integrate with real data sources:
1. Create API routes in `app/api/`
2. Add data fetching logic to components
3. Implement proper error handling and loading states

## 🌍 Contributing

We welcome contributions to improve the Impact Dashboard! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain component documentation
- Write descriptive commit messages
- Test your changes thoroughly
- Ensure responsive design compliance

## 📈 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically with optimized settings

### Other Platforms
The dashboard can be deployed on any platform supporting Next.js:
- **Netlify**: Static site generation support
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment
- **Traditional hosting**: Static export option

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For questions, issues, or contributions:
- 📧 Email: [support@frontforumfocus.org](mailto:support@frontforumfocus.org)
- 🐛 Issues: [GitHub Issues](https://github.com/palontologist/impact-dash/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/palontologist/impact-dash/discussions)

## 🙏 Acknowledgments

- **FrontForumFocus Team** - Program design and implementation
- **Marginalized Youth in Kenya** - Program participants
- **UN Sustainable Development Goals** - Framework for impact measurement
- **Next.js Team** - Framework development
- **shadcn** - UI component library

---

Built with ❤️ for social impact and youth empowerment in Kenya.
