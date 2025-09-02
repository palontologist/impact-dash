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

### 👥 Student Management
- Comprehensive student database with enrollment tracking
- Progress monitoring and certification status
- Demographic analysis (gender, rural/urban distribution)
- Individual student journey tracking

### 📊 Data Input & Analysis
- Streamlined data entry interfaces for program coordinators
- Bulk data import/export capabilities
- Long-term trend analysis and forecasting
- Qualitative insights and success stories

### 🎨 User Experience
- **Responsive design** optimized for desktop, tablet, and mobile
- **Intuitive navigation** with tabbed interface
- **Modern UI** built with shadcn/ui components
- **Accessibility** features for inclusive usage

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
