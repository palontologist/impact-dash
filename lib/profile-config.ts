/**
 * Profile Configuration
 * Defines which components and metrics are available for each profile type
 */

export type ProfileType = 'education' | 'finance' | 'real_estate' | 'human_constitution' | 'e2g_food' | 'custom'

export interface ProfileMetric {
  id: string
  name: string
  category: string
  description: string
}

export interface ProfileTabConfig {
  id: string
  label: string
  enabled: boolean
  metrics?: string[]
}

export interface ProfileConfig {
  name: string
  description: string
  tabs: ProfileTabConfig[]
  defaultMetrics: string[]
  features: {
    studentManagement: boolean
    csvUpload: boolean
    manualInput: boolean
    esgReporting: boolean
    sdgMapping: boolean
    customMetrics: boolean
  }
}

/**
 * Profile configurations defining what each profile type can access
 */
export const PROFILE_CONFIGS: Record<ProfileType, ProfileConfig> = {
  education: {
    name: "Education Profile",
    description: "Track student enrollment, completion, and employment outcomes",
    tabs: [
      { id: 'metric-input', label: 'Metric Input', enabled: true },
      { id: 'students', label: 'Students', enabled: true },
      { id: 'bulk-import', label: 'Bulk Import', enabled: true },
      { id: 'api-integration', label: 'API Integration', enabled: true },
    ],
    defaultMetrics: ['enrollment', 'completion', 'employment', 'skills_gained', 'certifications'],
    features: {
      studentManagement: true,
      csvUpload: true,
      manualInput: true,
      esgReporting: true,
      sdgMapping: true,
      customMetrics: false,
    }
  },

  finance: {
    name: "Finance Profile",
    description: "Track green financing, ESG assets, emissions and community investment",
    tabs: [
      { id: 'metric-input', label: 'Metric Input', enabled: true },
      { id: 'bulk-import', label: 'Bulk Import', enabled: true },
      { id: 'api-integration', label: 'API Integration', enabled: true },
    ],
    defaultMetrics: [
      'carbon_emissions', 'energy_consumption', 'community_investment',
      'transparency_score', 'donor_retention', 'stakeholder_engagement',
      'jobs_created', 'people_trained'
    ],
    features: {
      studentManagement: false,
      csvUpload: true,
      manualInput: true,
      esgReporting: true,
      sdgMapping: true,
      customMetrics: false,
    }
  },

  real_estate: {
    name: "Real Estate & Energy Profile",
    description: "Track energy efficiency, water use, emissions and sustainability certifications",
    tabs: [
      { id: 'metric-input', label: 'Metric Input', enabled: true },
      { id: 'bulk-import', label: 'Bulk Import', enabled: true },
      { id: 'api-integration', label: 'API Integration', enabled: true },
    ],
    defaultMetrics: [
      'energy_consumption', 'water_usage', 'carbon_emissions', 'waste_generated',
      'recycling_rate', 'ghg_emissions', 'water_efficiency', 'energy_efficiency',
      'jobs_created', 'community_investment'
    ],
    features: {
      studentManagement: false,
      csvUpload: true,
      manualInput: true,
      esgReporting: true,
      sdgMapping: true,
      customMetrics: false,
    }
  },
  
  human_constitution: {
    name: "Human Constitution Profile",
    description: "Monitor dignity, maturity indices and value wheel metrics",
    tabs: [
      { id: 'metric-input', label: 'Metric Input', enabled: true },
      { id: 'bulk-import', label: 'Bulk Import', enabled: true },
      { id: 'api-integration', label: 'API Integration', enabled: true },
    ],
    defaultMetrics: [
      'dignity_index', 'maturity_index', 'wellbeing_score',
      'mental_health', 'team_effectiveness'
    ],
    features: {
      studentManagement: false,
      csvUpload: true,
      manualInput: true,
      esgReporting: true,
      sdgMapping: true,
      customMetrics: false,
    }
  },
  
  e2g_food: {
    name: "E2G Food Profile",
    description: "Track meals served, nutrition quality, and food waste management",
    tabs: [
      { id: 'metric-input', label: 'Metric Input', enabled: true },
      { id: 'bulk-import', label: 'Bulk Import', enabled: true },
      { id: 'api-integration', label: 'API Integration', enabled: true },
    ],
    defaultMetrics: [
      'food_bars_delivered', 'meals_provided', 'communities_served',
      'vulnerable_individuals', 'ghg_emissions', 'water_efficiency',
      'jobs_created', 'people_trained'
    ],
    features: {
      studentManagement: false,
      csvUpload: true,
      manualInput: true,
      esgReporting: true,
      sdgMapping: true,
      customMetrics: false,
    }
  },
  
  custom: {
    name: "Custom Profile",
    description: "Personalized dashboard with your selected metrics",
    tabs: [
      { id: 'metric-input', label: 'Metric Input', enabled: true },
      { id: 'custom-metrics', label: 'Add Metrics', enabled: true },
      { id: 'bulk-import', label: 'Bulk Import', enabled: true },
      { id: 'api-integration', label: 'API Integration', enabled: true },
    ],
    defaultMetrics: [], // Determined by user selection
    features: {
      studentManagement: false, // Only if 'enrollment' metric selected
      csvUpload: true,
      manualInput: true,
      esgReporting: true,
      sdgMapping: true,
      customMetrics: true,
    }
  }
}

/**
 * Get profile configuration for a user
 */
export function getProfileConfig(
  profileType: ProfileType,
  customMetrics?: string[]
): ProfileConfig {
  // Fall back to 'custom' if unknown profile type
  const config = PROFILE_CONFIGS[profileType] || PROFILE_CONFIGS.custom
  
  if (profileType === 'custom' && customMetrics) {
    // Enable student tab if education metrics are selected
    const hasEducationMetrics = customMetrics.some(m => 
      ['enrollment', 'completion', 'employment', 'skills_gained', 'certifications'].includes(m)
    )
    
    return {
      ...config,
      defaultMetrics: customMetrics,
      tabs: [
        { id: 'metric-input', label: 'Metric Input', enabled: true },
        { id: 'custom-metrics', label: 'Add Metrics', enabled: true },
        ...(hasEducationMetrics ? [{ id: 'students', label: 'Students', enabled: true }] : []),
        { id: 'bulk-import', label: 'Bulk Import', enabled: true },
        { id: 'api-integration', label: 'API Integration', enabled: true },
      ],
      features: {
        ...config.features,
        studentManagement: hasEducationMetrics,
      }
    }
  }
  
  return config
}

/**
 * Check if a specific feature is enabled for a profile
 */
export function isFeatureEnabled(
  profileType: ProfileType,
  feature: keyof ProfileConfig['features'],
  customMetrics?: string[]
): boolean {
  const config = getProfileConfig(profileType, customMetrics)
  return config.features[feature]
}

/**
 * Get available metrics for a profile
 */
export function getProfileMetrics(
  profileType: ProfileType,
  customMetrics?: string[]
): string[] {
  const config = getProfileConfig(profileType, customMetrics)
  return config.defaultMetrics
}
