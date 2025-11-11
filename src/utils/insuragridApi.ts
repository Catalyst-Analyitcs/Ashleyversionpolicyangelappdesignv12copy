/**
 * ==============================================================================
 * INSURAGRID API INTEGRATION LAYER
 * ==============================================================================
 * 
 * This module provides the integration layer between PolicyAngel and Insuragrid.
 * It handles authentication, data fetching, caching, and error handling.
 * 
 * IMPORTANT: This is currently using MOCK DATA for development.
 * Replace with actual Insuragrid API calls when ready.
 * 
 * REACT NATIVE CONVERSION:
 * - Replace fetch with axios or react-native-fetch
 * - Use TanStack Query for caching and state management
 * - Add proper error handling with retry logic
 * - Implement token refresh logic
 * - Add offline support with AsyncStorage
 * 
 * ==============================================================================
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface InsuragridConfig {
  apiKey: string;
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
}

export interface InsuragridResponse<T> {
  success: boolean;
  data: T;
  error?: InsuragridError;
  metadata?: {
    requestId: string;
    timestamp: string;
    processingTime: number;
  };
}

export interface InsuragridError {
  code: string;
  message: string;
  statusCode: number;
}

export interface PropertyEnrichment {
  propertyId: string;
  appraisal: {
    currentValue: number;
    comparables: Comparable[];
    confidenceScore: number;
  };
  risk: {
    earthquake: RiskLevel;
    flood: RiskLevel;
    fire: RiskLevel;
    scores: {
      earthquake: number;
      flood: number;
      fire: number;
    };
  };
  compliance: {
    permits: Permit[];
    violations: Violation[];
    upcomingDeadlines: ComplianceDeadline[];
  };
  insuragridScore: number;
}

export interface Comparable {
  address: string;
  soldPrice: number;
  soldDate: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  distance: number; // miles
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'extreme';

export interface Permit {
  id: string;
  type: string;
  description: string;
  issueDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'pending';
}

export interface Violation {
  id: string;
  type: string;
  description: string;
  issueDate: string;
  severity: 'minor' | 'major' | 'critical';
  fine?: number;
  resolved: boolean;
}

export interface ComplianceDeadline {
  id: string;
  type: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  estimatedFine?: number;
}

export interface OpportunityData {
  propertyId: string;
  totalValue: number;
  calculatedAt: string;
  opportunities: {
    grants: GrantOpportunities;
    insurance: InsuranceOpportunity;
    mortgage: MortgageOpportunity;
    compliance: ComplianceOpportunity;
  };
}

export interface GrantOpportunities {
  value: number;
  count: number;
  items: Grant[];
}

export interface Grant {
  id: string;
  name: string;
  amount: number;
  source: string;
  category: string;
  deadline: string;
  eligibilityScore: number;
  requirements: string[];
  applicationUrl: string;
  estimatedProcessingTime: string;
  description: string;
}

export interface InsuranceOpportunity {
  annualSavings: number;
  currentProvider: string;
  currentPremium: number;
  bestOffer: {
    provider: string;
    premium: number;
    coverageImprovement: string;
  };
}

export interface MortgageOpportunity {
  monthlySavings: number;
  annualValue: number;
  currentRate: number;
  bestOffer: {
    lender: string;
    rate: number;
    payment: number;
  };
}

export interface ComplianceOpportunity {
  potentialFinesSaved: number;
  deadlines: ComplianceDeadline[];
}

export interface InsuranceQuote {
  id: string;
  provider: string;
  monthlyPremium: number;
  annualPremium: number;
  coverageAmount: number;
  deductible: number;
  features: string[];
  rating: number;
  claimSpeed: string;
  perks: string[];
  quoteExpiresAt: string;
}

export interface CoverageGap {
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendedCoverage: number;
  monthlyCost: number;
}

export interface InsuranceQuotesResponse {
  propertyId: string;
  currentPolicy?: {
    provider: string;
    policyNumber: string;
    premium: number;
    coverageAmount: number;
    deductible: number;
    renewalDate: string;
    features: string[];
  };
  quotes: InsuranceQuote[];
  coverageGaps: CoverageGap[];
}

export interface MortgageOffer {
  id: string;
  lender: string;
  rate: number;
  apr: number;
  monthlyPayment: number;
  loanTerm: number;
  closingCosts: number;
  points: number;
  lockPeriod: number;
  features: string[];
  rating: number;
  processingTime: string;
  offerExpiresAt: string;
}

export interface MortgageOffersResponse {
  propertyId: string;
  currentMortgage?: {
    lender: string;
    loanNumber: string;
    rate: number;
    monthlyPayment: number;
    remainingBalance: number;
    remainingTermMonths: number;
    nextPaymentDate: string;
  };
  offers: MortgageOffer[];
  savings: {
    monthly: number;
    annual: number;
    lifetime: number;
    breakEvenMonths: number;
  };
}

// ============================================================================
// INSURAGRID API CLIENT
// ============================================================================

class InsuragridAPI {
  private config: InsuragridConfig;
  private authToken: string | null = null;

  constructor(config: Partial<InsuragridConfig> = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.INSURAGRID_API_KEY || 'test_api_key',
      baseUrl: config.baseUrl || 'https://api.insuragrid.com/v2',
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3
    };
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string) {
    this.authToken = token;
  }

  /**
   * Make API request with error handling and retries
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<InsuragridResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const startTime = Date.now();

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.config.apiKey,
          ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` }),
          ...options.headers
        },
        signal: AbortSignal.timeout(this.config.timeout)
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          code: data.error?.code || 'API_ERROR',
          message: data.error?.message || 'Unknown error occurred',
          statusCode: response.status
        } as InsuragridError;
      }

      return {
        success: true,
        data,
        metadata: {
          requestId: response.headers.get('X-Request-Id') || 'unknown',
          timestamp: new Date().toISOString(),
          processingTime: Date.now() - startTime
        }
      };
    } catch (error: any) {
      // Retry logic for transient errors
      if (retryCount < this.config.retryAttempts && this.isRetryableError(error)) {
        await this.delay(Math.pow(2, retryCount) * 1000); // Exponential backoff
        return this.request<T>(endpoint, options, retryCount + 1);
      }

      return {
        success: false,
        data: null as any,
        error: {
          code: error.code || 'NETWORK_ERROR',
          message: error.message || 'Request failed',
          statusCode: error.statusCode || 500
        }
      };
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: any): boolean {
    const retryableCodes = [408, 429, 500, 502, 503, 504];
    return retryableCodes.includes(error.statusCode) || error.name === 'TimeoutError';
  }

  /**
   * Delay helper for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ============================================================================
  // PROPERTY ENRICHMENT
  // ============================================================================

  /**
   * Get property enrichment data from Insuragrid
   */
  async getPropertyEnrichment(propertyId: string): Promise<InsuragridResponse<PropertyEnrichment>> {
    // MOCK DATA - Replace with actual API call
    return {
      success: true,
      data: {
        propertyId,
        appraisal: {
          currentValue: 2850000,
          comparables: [
            {
              address: '2855 Pacific Ave',
              soldPrice: 2900000,
              soldDate: '2025-09-15',
              squareFeet: 2500,
              bedrooms: 3,
              bathrooms: 2,
              distance: 0.1
            },
            {
              address: '2831 Pacific Ave',
              soldPrice: 2750000,
              soldDate: '2025-08-22',
              squareFeet: 2300,
              bedrooms: 3,
              bathrooms: 2,
              distance: 0.2
            }
          ],
          confidenceScore: 0.92
        },
        risk: {
          earthquake: 'high',
          flood: 'low',
          fire: 'medium',
          scores: {
            earthquake: 8.5,
            flood: 2.1,
            fire: 5.7
          }
        },
        compliance: {
          permits: [
            {
              id: 'permit_1',
              type: 'Building',
              description: 'Kitchen Remodel',
              issueDate: '2024-03-15',
              expiryDate: '2025-03-15',
              status: 'active'
            }
          ],
          violations: [],
          upcomingDeadlines: [
            {
              id: 'deadline_1',
              type: 'permit_renewal',
              description: 'Rental housing inspection renewal',
              dueDate: '2025-12-15',
              priority: 'high',
              estimatedFine: 1000
            }
          ]
        },
        insuragridScore: 87
      },
      metadata: {
        requestId: 'req_' + Date.now(),
        timestamp: new Date().toISOString(),
        processingTime: 234
      }
    };
  }

  // ============================================================================
  // OPPORTUNITY DISCOVERY
  // ============================================================================

  /**
   * Get all opportunities for a property
   */
  async getOpportunities(propertyId: string): Promise<InsuragridResponse<OpportunityData>> {
    // MOCK DATA - Replace with actual API call
    return {
      success: true,
      data: {
        propertyId,
        totalValue: 23500,
        calculatedAt: new Date().toISOString(),
        opportunities: {
          grants: {
            value: 18500,
            count: 3,
            items: [
              {
                id: 'grant_1',
                name: 'Energy Efficiency Grant',
                amount: 8500,
                source: 'California Energy Commission',
                category: 'energy',
                deadline: '2026-01-31',
                eligibilityScore: 0.95,
                requirements: [
                  'Property built before 2010',
                  'Energy audit completed',
                  'Licensed contractor required'
                ],
                applicationUrl: 'https://www.energy.ca.gov/programs-and-topics/programs/energy-upgrade-california',
                estimatedProcessingTime: '30-45 days',
                description: 'Rebate for energy-efficient upgrades including insulation, HVAC, windows'
              },
              {
                id: 'grant_2',
                name: 'Seismic Retrofit Grant',
                amount: 10000,
                source: 'FEMA & California Earthquake Authority',
                category: 'seismic',
                deadline: '2026-03-15',
                eligibilityScore: 0.88,
                requirements: [
                  'Pre-1980 construction',
                  'Cripple wall present',
                  'Engineering assessment required'
                ],
                applicationUrl: 'https://www.earthquakeauthority.com/earthquake-insurance/retrofit-program',
                estimatedProcessingTime: '45-60 days',
                description: 'Grant for seismic retrofitting of older homes'
              },
              {
                id: 'grant_3',
                name: 'Water Conservation Grant',
                amount: 2000,
                source: 'SF Public Utilities Commission',
                category: 'water',
                deadline: '2026-04-30',
                eligibilityScore: 0.92,
                requirements: [
                  'Replace lawn with drought-resistant plants',
                  'Install low-flow fixtures',
                  'Before/after photos required'
                ],
                applicationUrl: 'https://www.sfwater.org/rebates',
                estimatedProcessingTime: '15-30 days',
                description: 'Rebate for water-saving improvements'
              }
            ]
          },
          insurance: {
            annualSavings: 1200,
            currentProvider: 'State Farm',
            currentPremium: 2940,
            bestOffer: {
              provider: 'Lemonade',
              premium: 2268,
              coverageImprovement: '+$50K dwelling, earthquake rider included'
            }
          },
          mortgage: {
            monthlySavings: 450,
            annualValue: 5400,
            currentRate: 6.5,
            bestOffer: {
              lender: 'Better.com',
              rate: 5.125,
              payment: 2179
            }
          },
          compliance: {
            potentialFinesSaved: 2000,
            deadlines: [
              {
                id: 'deadline_1',
                type: 'permit_renewal',
                description: 'Rental housing inspection renewal',
                dueDate: '2025-12-15',
                priority: 'high',
                estimatedFine: 1000
              }
            ]
          }
        }
      },
      metadata: {
        requestId: 'req_' + Date.now(),
        timestamp: new Date().toISOString(),
        processingTime: 567
      }
    };
  }

  // ============================================================================
  // INSURANCE APIs
  // ============================================================================

  /**
   * Get insurance quotes from Insuragrid network
   */
  async getInsuranceQuotes(
    propertyId: string,
    options?: {
      coverageAmount?: number;
      deductible?: number;
    }
  ): Promise<InsuragridResponse<InsuranceQuotesResponse>> {
    // MOCK DATA - Replace with actual API call
    return {
      success: true,
      data: {
        propertyId,
        currentPolicy: {
          provider: 'State Farm',
          policyNumber: 'SF-123456789',
          premium: 2940,
          coverageAmount: 450000,
          deductible: 2500,
          renewalDate: '2026-03-15',
          features: [
            'Dwelling Coverage: $450K',
            'Personal Property: $225K',
            'Liability: $300K',
            'Loss of Use: $90K'
          ]
        },
        quotes: [
          {
            id: 'quote_1',
            provider: 'Lemonade',
            monthlyPremium: 189,
            annualPremium: 2268,
            coverageAmount: 500000,
            deductible: 2000,
            features: [
              'Dwelling Coverage: $500K',
              'Personal Property: $250K',
              'Liability: $500K',
              'Loss of Use: $100K',
              'Earthquake Rider: $50K'
            ],
            rating: 4.7,
            claimSpeed: '3-5 days',
            perks: ['AI Claims Processing', 'Zero Paperwork', 'Giveback Program'],
            quoteExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'quote_2',
            provider: 'Hippo',
            monthlyPremium: 198,
            annualPremium: 2376,
            coverageAmount: 480000,
            deductible: 2000,
            features: [
              'Dwelling Coverage: $480K',
              'Personal Property: $240K',
              'Liability: $400K',
              'Loss of Use: $96K',
              'Smart Home Monitoring'
            ],
            rating: 4.5,
            claimSpeed: '5-7 days',
            perks: ['Smart Home Kit Included', 'Leak Detection', 'Free Home Inspection'],
            quoteExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        ],
        coverageGaps: [
          {
            type: 'Earthquake Coverage',
            severity: 'high',
            description: 'Bay Area homes have 72% chance of major earthquake in next 30 years',
            recommendedCoverage: 50000,
            monthlyCost: 18
          },
          {
            type: 'Water Backup',
            severity: 'medium',
            description: 'Sewer backup not covered in current policy',
            recommendedCoverage: 25000,
            monthlyCost: 12
          }
        ]
      },
      metadata: {
        requestId: 'req_' + Date.now(),
        timestamp: new Date().toISOString(),
        processingTime: 412
      }
    };
  }

  // ============================================================================
  // MORTGAGE APIs
  // ============================================================================

  /**
   * Get refinance offers from Insuragrid lending network
   */
  async getMortgageOffers(
    propertyId: string,
    options?: {
      loanAmount?: number;
      term?: number;
      cashOut?: number;
    }
  ): Promise<InsuragridResponse<MortgageOffersResponse>> {
    // MOCK DATA - Replace with actual API call
    const currentPayment = 2528;
    const bestPayment = 2179;
    const monthlySavings = currentPayment - bestPayment;
    const closingCosts = 3200;

    return {
      success: true,
      data: {
        propertyId,
        currentMortgage: {
          lender: 'Wells Fargo',
          loanNumber: 'WF-987654321',
          rate: 6.5,
          monthlyPayment: currentPayment,
          remainingBalance: 400000,
          remainingTermMonths: 324,
          nextPaymentDate: '2025-12-01'
        },
        offers: [
          {
            id: 'offer_1',
            lender: 'Better.com',
            rate: 5.125,
            apr: 5.23,
            monthlyPayment: 2179,
            loanTerm: 30,
            closingCosts: 3200,
            points: 0,
            lockPeriod: 45,
            features: [
              'No origination fees',
              'Digital closing process',
              'Rate lock guarantee',
              'Free appraisal included'
            ],
            rating: 4.8,
            processingTime: '21 days',
            offerExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'offer_2',
            lender: 'Rocket Mortgage',
            rate: 5.25,
            apr: 5.34,
            monthlyPayment: 2208,
            loanTerm: 30,
            closingCosts: 3800,
            points: 0,
            lockPeriod: 60,
            features: [
              'Fast approval',
              '24/7 online access',
              'Mobile app tracking',
              'Flexible closing dates'
            ],
            rating: 4.6,
            processingTime: '28 days',
            offerExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        ],
        savings: {
          monthly: monthlySavings,
          annual: monthlySavings * 12,
          lifetime: monthlySavings * 12 * 27, // remaining term
          breakEvenMonths: Math.ceil(closingCosts / monthlySavings)
        }
      },
      metadata: {
        requestId: 'req_' + Date.now(),
        timestamp: new Date().toISOString(),
        processingTime: 389
      }
    };
  }

  // ============================================================================
  // GRANT APIs
  // ============================================================================

  /**
   * Get available grants for property
   */
  async getGrants(
    propertyId: string,
    options?: {
      category?: string;
      minAmount?: number;
    }
  ): Promise<InsuragridResponse<{ grants: Grant[]; totalAvailable: number }>> {
    const opportunities = await this.getOpportunities(propertyId);
    
    if (!opportunities.success) {
      return {
        success: false,
        data: { grants: [], totalAvailable: 0 },
        error: opportunities.error
      };
    }

    return {
      success: true,
      data: {
        grants: opportunities.data.opportunities.grants.items,
        totalAvailable: opportunities.data.opportunities.grants.value
      },
      metadata: opportunities.metadata
    };
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const insuragridApi = new InsuragridAPI();

// ============================================================================
// REACT QUERY HOOKS (for React Native)
// ============================================================================

/**
 * Example TanStack Query hooks for React Native
 * 
 * import { useQuery, useMutation } from '@tanstack/react-query';
 * 
 * export const usePropertyEnrichment = (propertyId: string) => {
 *   return useQuery({
 *     queryKey: ['property-enrichment', propertyId],
 *     queryFn: () => insuragridApi.getPropertyEnrichment(propertyId),
 *     staleTime: 5 * 60 * 1000, // 5 minutes
 *   });
 * };
 * 
 * export const useOpportunities = (propertyId: string) => {
 *   return useQuery({
 *     queryKey: ['opportunities', propertyId],
 *     queryFn: () => insuragridApi.getOpportunities(propertyId),
 *     staleTime: 1 * 60 * 1000, // 1 minute
 *   });
 * };
 * 
 * export const useInsuranceQuotes = (propertyId: string, options?: any) => {
 *   return useQuery({
 *     queryKey: ['insurance-quotes', propertyId, options],
 *     queryFn: () => insuragridApi.getInsuranceQuotes(propertyId, options),
 *     staleTime: 30 * 1000, // 30 seconds
 *   });
 * };
 * 
 * export const useMortgageOffers = (propertyId: string, options?: any) => {
 *   return useQuery({
 *     queryKey: ['mortgage-offers', propertyId, options],
 *     queryFn: () => insuragridApi.getMortgageOffers(propertyId, options),
 *     staleTime: 30 * 1000, // 30 seconds
 *   });
 * };
 */

export default insuragridApi;
