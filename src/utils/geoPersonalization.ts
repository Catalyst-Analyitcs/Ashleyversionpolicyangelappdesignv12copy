/**
 * ==============================================================================
 * GEO PERSONALIZATION UTILITY
 * ==============================================================================
 * 
 * PURPOSE: Provides geographically-relevant content and visuals for 
 * San Francisco Bay Area properties to make PolicyAngel feel personal
 * and locally aware.
 * 
 * FEATURES:
 * - Neighborhood-specific insights
 * - SF landmark references
 * - Local weather/seismic context
 * - Bay Area market intelligence
 * - California-specific regulations
 */

export interface PropertyLocation {
  address?: string;
  neighborhood?: string;
  zipCode?: string;
  city?: string;
}

export interface GeoInsight {
  title: string;
  description: string;
  icon: string;
  relevance: 'high' | 'medium' | 'low';
}

// San Francisco neighborhoods and their characteristics
export const SF_NEIGHBORHOODS = {
  'Pacific Heights': {
    medianPrice: 2100000,
    appreciation: 6.8,
    landmarks: ['Painted Ladies', 'Lafayette Park'],
    riskFactors: ['Earthquake', 'Fire'],
    insurance: 'High-value coverage recommended',
    emoji: '🏛️'
  },
  'Noe Valley': {
    medianPrice: 1800000,
    appreciation: 5.2,
    landmarks: ['24th Street', 'Noe Courts'],
    riskFactors: ['Earthquake'],
    insurance: 'Standard coverage',
    emoji: '☀️'
  },
  'Mission District': {
    medianPrice: 1350000,
    appreciation: 7.1,
    landmarks: ['Mission Dolores', 'Valencia Street'],
    riskFactors: ['Earthquake', 'Liquefaction'],
    insurance: 'Earthquake coverage essential',
    emoji: '🎨'
  },
  'Russian Hill': {
    medianPrice: 1950000,
    appreciation: 5.8,
    landmarks: ['Lombard Street', 'Cable Cars'],
    riskFactors: ['Earthquake', 'Fire'],
    insurance: 'Premium coverage',
    emoji: '🚡'
  },
  'Hayes Valley': {
    medianPrice: 1650000,
    appreciation: 8.2,
    landmarks: ['Hayes Street', 'Patricia\'s Green'],
    riskFactors: ['Earthquake'],
    insurance: 'Standard+ coverage',
    emoji: '🌳'
  },
  'Marina District': {
    medianPrice: 1750000,
    appreciation: 4.9,
    landmarks: ['Palace of Fine Arts', 'Marina Green'],
    riskFactors: ['Earthquake', 'Liquefaction', 'Flood'],
    insurance: 'Flood + earthquake required',
    emoji: '⛵'
  },
  'SOMA': {
    medianPrice: 1450000,
    appreciation: 9.1,
    landmarks: ['AT&T Park', 'Moscone Center'],
    riskFactors: ['Earthquake', 'Liquefaction'],
    insurance: 'Commercial-grade recommended',
    emoji: '🏙️'
  },
  'Sunset District': {
    medianPrice: 1400000,
    appreciation: 6.3,
    landmarks: ['Ocean Beach', 'Golden Gate Park'],
    riskFactors: ['Earthquake', 'Fog'],
    insurance: 'Moisture damage coverage',
    emoji: '🌊'
  }
};

// Get personalized greeting based on time and location
export function getPersonalizedGreeting(location?: PropertyLocation): string {
  const hour = new Date().getHours();
  const neighborhood = location?.neighborhood || 'San Francisco';
  
  if (hour < 12) {
    return `Good morning! Let's check on your ${neighborhood} property`;
  } else if (hour < 17) {
    return `Good afternoon! Here's what's happening with your ${neighborhood} home`;
  } else {
    return `Good evening! Your ${neighborhood} property update is ready`;
  }
}

// Get neighborhood-specific insights
export function getNeighborhoodInsights(neighborhood?: string): GeoInsight[] {
  const hood = neighborhood && SF_NEIGHBORHOODS[neighborhood as keyof typeof SF_NEIGHBORHOODS];
  
  if (!hood) {
    return getDefaultSFInsights();
  }
  
  return [
    {
      title: `${neighborhood} Market Update`,
      description: `Your area is up ${hood.appreciation}% this year, median now at $${(hood.medianPrice / 1000000).toFixed(1)}M`,
      icon: hood.emoji,
      relevance: 'high'
    },
    {
      title: 'Local Insurance Considerations',
      description: hood.insurance + ` for ${neighborhood} properties`,
      icon: '🛡️',
      relevance: 'high'
    },
    {
      title: 'Nearby Landmarks',
      description: `Your property is near ${hood.landmarks.join(' and ')}`,
      icon: '📍',
      relevance: 'medium'
    }
  ];
}

// Default SF insights when neighborhood is unknown
function getDefaultSFInsights(): GeoInsight[] {
  return [
    {
      title: 'San Francisco Market Strong',
      description: 'SF median home price: $1.4M, up 5.3% this quarter',
      icon: '🌉',
      relevance: 'high'
    },
    {
      title: 'Earthquake Insurance',
      description: 'Essential for all SF properties - we found better rates',
      icon: '🏔️',
      relevance: 'high'
    },
    {
      title: 'California Solar Grants',
      description: 'New state programs available for rooftop solar',
      icon: '☀️',
      relevance: 'medium'
    }
  ];
}

// Get local context for insurance recommendations
export function getLocalInsuranceContext(neighborhood?: string): string {
  const hood = neighborhood && SF_NEIGHBORHOODS[neighborhood as keyof typeof SF_NEIGHBORHOODS];
  
  if (!hood) {
    return 'As a San Francisco property owner, earthquake and fire coverage are essential.';
  }
  
  const risks = hood.riskFactors.join(', ').toLowerCase();
  return `For ${neighborhood} properties, we recommend coverage for ${risks} risks.`;
}

// Get weather-appropriate messaging
export function getWeatherContext(): string {
  const month = new Date().getMonth();
  
  // SF weather patterns
  if (month >= 5 && month <= 8) {
    // Summer - fog season
    return 'SF fog season is here - check your moisture damage coverage';
  } else if (month >= 0 && month <= 2) {
    // Winter - rain season
    return 'Rain season in SF - verify your water damage and flood protection';
  } else {
    return 'Perfect SF weather - good time for property inspections';
  }
}

// Get landmark-based visual references
export function getLandmarkReference(neighborhood?: string): string {
  const landmarks = {
    default: '🌉 Golden Gate Bridge',
    'Pacific Heights': '🏛️ Painted Ladies',
    'Russian Hill': '🚡 Cable Cars',
    'Marina District': '⛵ Palace of Fine Arts',
    'Mission District': '🎨 Mission Murals',
    'SOMA': '🏙️ Downtown Skyline',
    'Sunset District': '🌊 Ocean Beach',
    'Noe Valley': '☀️ 24th Street',
    'Hayes Valley': '🌳 Alamo Square'
  };
  
  return landmarks[neighborhood as keyof typeof landmarks] || landmarks.default;
}

// Get personalized opportunity message
export function getPersonalizedOpportunityMessage(amount: number, neighborhood?: string): string {
  const area = neighborhood || 'your San Francisco area';
  
  if (amount > 20000) {
    return `We found $${amount.toLocaleString()} in opportunities specific to ${area} properties!`;
  } else if (amount > 10000) {
    return `PolicyAngel discovered $${amount.toLocaleString()} you can claim for your ${area} home`;
  } else {
    return `$${amount.toLocaleString()} in savings found for your property`;
  }
}

// Get California-specific grant messaging
export function getCaliforniaGrantContext(): string[] {
  return [
    'California Energy Commission solar grants available',
    'SF Housing Authority assistance programs',
    'Bay Area Air Quality Management District incentives',
    'California Earthquake Authority mitigation grants',
    'SF Department of Building Inspection support programs'
  ];
}

// Get seismic safety messaging for SF
export function getSeismicSafetyMessage(neighborhood?: string): string {
  const hood = neighborhood && SF_NEIGHBORHOODS[neighborhood as keyof typeof SF_NEIGHBORHOODS];
  
  if (hood && hood.riskFactors.includes('Liquefaction')) {
    return `${neighborhood} is in a liquefaction zone - enhanced earthquake coverage is critical`;
  }
  
  return 'San Francisco is in a high seismic zone - earthquake insurance is essential';
}

// Export all neighborhoods for filtering/searching
export const getAllNeighborhoods = () => Object.keys(SF_NEIGHBORHOODS);

// Get personalized maintenance tips based on SF climate
export function getSFMaintenanceTips(month: number = new Date().getMonth()): string[] {
  const tips = {
    winter: [
      'Check gutters before SF rain season (Nov-Mar)',
      'Inspect roof for storm damage',
      'Test sump pump if you have one'
    ],
    spring: [
      'Prepare for dry season - check irrigation',
      'Inspect for winter water damage',
      'Clean windows after rain season'
    ],
    summer: [
      'Check HVAC - fog can affect cooling efficiency',
      'Inspect exterior for moisture from marine layer',
      'Prepare for fire season - clear brush'
    ],
    fall: [
      'Prepare for rain season - clean gutters',
      'Check seals around windows/doors',
      'Inspect chimney before use'
    ]
  };
  
  if (month >= 0 && month <= 2) return tips.winter;
  if (month >= 3 && month <= 5) return tips.spring;
  if (month >= 6 && month <= 8) return tips.summer;
  return tips.fall;
}
