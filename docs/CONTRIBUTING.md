# Contributing to FrontForumFocus Impact Dashboard

Thank you for your interest in contributing to the FrontForumFocus Impact Dashboard! This document provides guidelines and information for contributors.

## 🎯 How to Contribute

### Reporting Issues
- Use the [GitHub Issues](https://github.com/palontologist/impact-dash/issues) page
- Search existing issues before creating a new one
- Provide detailed descriptions with steps to reproduce
- Include browser/environment information when relevant

### Suggesting Features
- Open a feature request issue with detailed description
- Explain the use case and expected behavior
- Consider how it aligns with the project's goals

### Code Contributions

#### Prerequisites
- Node.js 18.17 or later
- Git knowledge
- Familiarity with React, Next.js, and TypeScript

#### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/impact-dash.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`
5. Start development server: `npm run dev`

#### Code Standards
- **TypeScript**: Use strict type checking
- **ESLint**: Follow the configured linting rules
- **Components**: Create reusable, well-documented components
- **Styling**: Use Tailwind CSS classes, avoid custom CSS when possible
- **Accessibility**: Ensure components are accessible (ARIA labels, keyboard navigation)

#### Commit Guidelines
Follow conventional commits format:
```
type(scope): description

Examples:
feat(dashboard): add new metrics overview component
fix(charts): resolve enrollment chart data display issue
docs(readme): update installation instructions
style(ui): improve button component spacing
```

#### Pull Request Process
1. **Update documentation** if your changes affect user-facing features
2. **Test thoroughly** across different screen sizes and browsers
3. **Write descriptive PR titles** and detailed descriptions
4. **Reference related issues** using `Fixes #123` or `Closes #123`
5. **Request reviews** from maintainers

## 📁 Project Structure Guide

```
impact-dash/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   ├── dashboard-*.tsx   # Dashboard-specific components
│   └── *.tsx            # Feature components
├── lib/                   # Utility functions and helpers
├── docs/                 # Documentation files
├── public/               # Static assets (images, icons)
└── types/                # TypeScript type definitions
```

## 🎨 Design Guidelines

### UI Components
- Use shadcn/ui components as the foundation
- Maintain consistent spacing using Tailwind's scale
- Follow the established color scheme and typography
- Ensure responsive design for mobile, tablet, and desktop

### Data Visualization
- Use Recharts for consistency with existing charts
- Maintain accessible color palettes
- Include proper labels and legends
- Consider mobile optimization for charts

### Accessibility
- Use semantic HTML elements
- Include ARIA labels and descriptions
- Ensure keyboard navigation works
- Maintain sufficient color contrast ratios
- Test with screen readers when possible

## 🔧 Development Guidelines

### Component Development
```tsx
/**
 * Component documentation with JSDoc
 * 
 * @param props - Component props with descriptions
 * @returns JSX element description
 */
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Implementation
}
```

### State Management
- Use React's built-in state management (useState, useContext)
- Consider creating custom hooks for complex state logic
- Avoid prop drilling by using context when appropriate

### Error Handling
- Implement error boundaries for component isolation
- Add loading states for async operations
- Provide meaningful error messages to users

### Performance
- Use React.memo() for expensive computations
- Implement proper key props for lists
- Optimize images and assets
- Consider code splitting for large features

## 📊 Data Integration

### Mock Data Structure
Current implementation uses mock data. When adding new features:
- Follow existing data patterns
- Include realistic sample data
- Document data structure in JSDoc comments
- Consider future API integration needs

### API Integration (Future)
When implementing real data sources:
- Create API routes in `app/api/` directory
- Use proper error handling and loading states
- Implement data caching where appropriate
- Follow REST or GraphQL best practices

## 🧪 Testing

### Manual Testing
- Test across different browsers (Chrome, Firefox, Safari, Edge)
- Verify responsive design on mobile, tablet, and desktop
- Check accessibility with keyboard navigation
- Validate data display accuracy

### Automated Testing (Future Implementation)
Consider adding:
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for user workflows
- E2E tests with Playwright or Cypress

## 📚 Documentation

### Code Documentation
- Add JSDoc comments to all components and functions
- Include parameter descriptions and return types
- Document complex algorithms or business logic
- Update README when adding new features

### User Documentation
- Update README for user-facing changes
- Create guides for new features
- Include screenshots when helpful
- Maintain accurate installation instructions

## 🌍 Localization (Future)

Consider internationalization needs:
- Use proper date/time formatting
- Prepare for text translation
- Consider RTL language support
- Use appropriate number formatting

## 🚀 Deployment

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Responsive design verified
- [ ] Accessibility checked
- [ ] Performance optimized
- [ ] Documentation updated

### Deployment Platforms
The application supports deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Docker containers

## 📞 Getting Help

- **Questions**: Open a discussion on GitHub
- **Bugs**: Create an issue with detailed information
- **Features**: Propose through feature request issues
- **Security**: Email security@frontforumfocus.org

## 📄 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

Thank you for contributing to the FrontForumFocus Impact Dashboard! Your efforts help improve AI education opportunities for marginalized youth in Kenya. 🇰🇪