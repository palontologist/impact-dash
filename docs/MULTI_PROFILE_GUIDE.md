# Multi-Profile Dashboard Enhancement

## Overview

This update transforms the Impact Dashboard from a single-purpose education tracking tool into a flexible, multi-profile impact measurement platform that adapts to any industry and use case.

## New Features

### 1. **Multi-Profile System**

The dashboard now supports three distinct impact profiles:

#### Education & Youth Upskilling (Original)
- Student enrollment and progress tracking
- AI literacy metrics
- Employment outcomes
- SDG alignment
- ESG reporting

#### Human Constitution & Wellbeing
- Dignity and maturity indices
- Value wheel tracking (7 dimensions: body, emotion, thought, power, communication, life, unity)
- Mental health metrics
- Relationship trust and team effectiveness
- Story-based highlights
- Societal indicators
- Maturity curve indicators
- Strengths & vulnerabilities mapping
- Dynamic heatmaps
- Local priorities panel
- Longitudinal change tracking

#### E2G Food Distribution
- Food bars and meals delivered
- Calories and nutrition impact
- Communities and regions served
- Vulnerable populations reached
- Donor management (impact, retention, engagement)
- Job creation metrics
- Local nutrition production
- Microfarms established
- Sustainability metrics (water/energy efficiency, GHG emissions)
- Zero waste and upcycled ingredients
- Training and partnerships
- NGOs/charities onboarded
- Impact stories and media endorsements

### 2. **User Type Management**

The platform now accommodates three user types with tailored experiences:

- **Consultants**: Advise clients with data-driven insights
- **Enterprises**: Track organizational impact and ESG metrics
- **Regulators**: Monitor compliance and industry standards

### 3. **Onboarding Wizard**

A 4-step guided onboarding process helps new users:
1. Select user type (Consultant, Enterprise, Regulator)
2. Choose impact profile
3. Specify industry
4. Define usage reasons (funding, regulation, impact measurement, etc.)

### 4. **Enhanced Landing Page**

- Professional landing page showcasing all profiles
- Clear value propositions for each user type
- Easy navigation to get started

### 5. **Profile Switcher**

Users can easily switch between profiles with a visual card-based selector, allowing them to:
- Compare metrics across different profiles
- Use multiple profiles for different initiatives
- Seamlessly transition between measurement frameworks

## Technical Implementation

### Database Schema Extensions

Added 8 new tables:
- `user_profiles` - User information and preferences
- `human_constitution_metrics` - Wellbeing and development metrics
- `human_constitution_stories` - Qualitative narratives
- `human_constitution_societal_indicators` - Community-level metrics
- `human_constitution_heatmaps` - Geographic data visualization
- `e2g_food_metrics` - Food distribution and nutrition metrics
- `e2g_food_donors` - Donor tracking and engagement
- `e2g_food_impact_stories` - Impact narratives

### New Components

- `OnboardingWizard` - 4-step user setup flow
- `HumanConstitutionDashboard` - Comprehensive wellbeing tracking
- `E2GFoodDashboard` - Food security and sustainability metrics
- Profile switcher in main dashboard

### Authentication (Optional)

- Clerk authentication integration (currently disabled for demo)
- Can be enabled by updating environment variables
- No password required for demo profiles

## Usage

### Getting Started

1. Visit the landing page to learn about available profiles
2. Click "Get Started" to access the dashboard
3. Select your profile from the profile switcher
4. View metrics and insights relevant to your chosen profile
5. Switch between profiles as needed

### For Developers

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (optional):
   ```bash
   cp .env.example .env.local
   ```

3. Run database migrations:
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Future Enhancements

- Profile-specific data entry forms
- API endpoints for each profile's metrics
- Demo data seeding for all profiles
- Advanced analytics and cross-profile comparisons
- Custom profile creation
- Multi-tenant support
- Role-based access control
- Export functionality per profile

## Screenshots

### Landing Page
Shows the three available profiles and user types.

### Education Profile
The original dashboard with enrollment, completion, and employment tracking.

### Human Constitution Profile
Comprehensive wellbeing metrics with value wheel visualization.

### E2G Food Profile
Food distribution, sustainability, and donor management.

### Onboarding Wizard
Guided setup process for new users.

## Breaking Changes

None. The existing Education profile remains fully functional and is the default view.

## Migration Notes

- Existing data in the Education profile is preserved
- New profiles start with empty data
- Users can seed demo data using the provided scripts

## Support

For questions or issues with the multi-profile dashboard, please create an issue in the repository.
