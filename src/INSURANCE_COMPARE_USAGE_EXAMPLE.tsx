/**
 * ==============================================================================
 * INSURANCE COMPARE USAGE EXAMPLES
 * ==============================================================================
 * 
 * This file shows various ways to integrate InsuranceCompareCard into
 * PolicyAngel screens with real-world examples.
 */

import React from 'react';
import { InsuranceCompareCard } from './components/InsuranceCompareCard';

// ============================================================================
// EXAMPLE 1: Basic Usage in InsightsScreen
// ============================================================================

export function InsightsScreenExample() {
  const handleNavigateToInsuranceOptimizer = () => {
    // Your navigation logic
    console.log('Navigate to insurance optimizer');
  };

  return (
    <div className="space-y-6">
      {/* Other insights content */}
      
      <div 
        style={{ 
          padding: '0 var(--spacing-6)',
        }}
      >
        <h2 
          className="text-white mb-4"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-semibold)',
          }}
        >
          💰 Savings Opportunity
        </h2>
        
        <InsuranceCompareCard
          onNavigate={handleNavigateToInsuranceOptimizer}
          currentPremium={245}
          recommendedPremium={189}
          coverageIncrease="+$50K"
          claimSpeed="3-5 days"
        />
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: With Real Data from API
// ============================================================================

import { useQuery } from '@tanstack/react-query';

interface InsuranceComparison {
  current: {
    provider: string;
    monthlyPremium: number;
  };
  recommended: {
    provider: string;
    monthlyPremium: number;
    claimSpeed: string;
  };
  coverageIncrease: string;
}

export function InsightsScreenWithAPI({ propertyId }: { propertyId: string }) {
  const { data, isLoading } = useQuery<InsuranceComparison>({
    queryKey: ['insurance-comparison', propertyId],
    queryFn: async () => {
      // Replace with your actual API call
      const response = await fetch(`/api/insurance/compare?propertyId=${propertyId}`);
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  if (isLoading) {
    return <InsuranceCompareCardSkeleton />;
  }

  if (!data) {
    return null;
  }

  return (
    <div style={{ padding: '0 var(--spacing-6)' }}>
      <InsuranceCompareCard
        onNavigate={() => {/* Navigate to optimizer */}}
        currentPremium={data.current.monthlyPremium}
        recommendedPremium={data.recommended.monthlyPremium}
        coverageIncrease={data.coverageIncrease}
        claimSpeed={data.recommended.claimSpeed}
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: Compact Mode for Sidebar
// ============================================================================

export function SidebarInsuranceWidget() {
  return (
    <div className="w-80">
      <InsuranceCompareCard
        onNavigate={() => {/* Navigate */}}
        currentPremium={245}
        recommendedPremium={189}
        coverageIncrease="+$50K"
        claimSpeed="3-5 days"
        compact={true}  // Hides benefits list for compact display
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Multiple Cards in Grid
// ============================================================================

export function OpportunitiesGrid() {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      style={{ 
        padding: 'var(--spacing-6)',
        gap: 'var(--spacing-6)',
      }}
    >
      {/* Insurance Optimization */}
      <InsuranceCompareCard
        onNavigate={() => {/* Navigate to insurance */}}
        currentPremium={245}
        recommendedPremium={189}
        coverageIncrease="+$50K"
        claimSpeed="3-5 days"
      />

      {/* Could add mortgage, grants, etc. cards here */}
    </div>
  );
}

// ============================================================================
// EXAMPLE 5: With Loading State
// ============================================================================

export function InsuranceCardWithLoading({ propertyId }: { propertyId: string }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<InsuranceComparison | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({
          current: { provider: 'State Farm', monthlyPremium: 245 },
          recommended: { provider: 'Lemonade', monthlyPremium: 189, claimSpeed: '3-5 days' },
          coverageIncrease: '+$50K',
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [propertyId]);

  if (isLoading) {
    return <InsuranceCompareCardSkeleton />;
  }

  if (!data) {
    return <ErrorCard message="Failed to load insurance comparison" />;
  }

  return (
    <InsuranceCompareCard
      onNavigate={() => {/* Navigate */}}
      currentPremium={data.current.monthlyPremium}
      recommendedPremium={data.recommended.monthlyPremium}
      coverageIncrease={data.coverageIncrease}
      claimSpeed={data.recommended.claimSpeed}
    />
  );
}

// ============================================================================
// EXAMPLE 6: In LuxuryDashboard (Main Dashboard)
// ============================================================================

export function LuxuryDashboardWithInsuranceCard({
  onNavigateToInsuranceOptimizer
}: {
  onNavigateToInsuranceOptimizer: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div>{/* Property hero content */}</div>

      {/* Quick Actions */}
      <div>{/* Quick action cards */}</div>

      {/* Insurance Optimization Recommendation */}
      <div 
        style={{ 
          padding: '0 var(--spacing-6)',
          marginBottom: 'var(--spacing-6)',
        }}
      >
        <div 
          className="flex items-center justify-between mb-4"
          style={{ marginBottom: 'var(--spacing-4)' }}
        >
          <h2 
            className="text-white"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            💰 Recommended for You
          </h2>
          <button
            className="text-white/60 hover:text-white"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-sm)',
              transition: 'var(--transition-button)',
            }}
          >
            See all opportunities →
          </button>
        </div>
        
        <InsuranceCompareCard
          onNavigate={onNavigateToInsuranceOptimizer}
          currentPremium={245}
          recommendedPremium={189}
          coverageIncrease="+$50K"
          claimSpeed="3-5 days"
        />
      </div>

      {/* Rest of dashboard content */}
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: With Conditional Rendering
// ============================================================================

export function ConditionalInsuranceCard({ 
  propertyId,
  hasSavingsOpportunity 
}: { 
  propertyId: string;
  hasSavingsOpportunity: boolean;
}) {
  if (!hasSavingsOpportunity) {
    return (
      <div 
        className="p-6 rounded-2xl border text-center"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          padding: 'var(--spacing-6)',
          borderRadius: 'var(--radius-2xl)',
        }}
      >
        <p 
          className="text-white/70"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-base)',
          }}
        >
          ✅ Your insurance is already optimized!
        </p>
      </div>
    );
  }

  return (
    <InsuranceCompareCard
      onNavigate={() => {/* Navigate */}}
      currentPremium={245}
      recommendedPremium={189}
      coverageIncrease="+$50K"
      claimSpeed="3-5 days"
    />
  );
}

// ============================================================================
// EXAMPLE 8: Animated Entry with Stagger
// ============================================================================

import { motion } from 'motion/react';

export function AnimatedInsuranceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: 0.3, // Stagger delay if part of a list
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      <InsuranceCompareCard
        onNavigate={() => {/* Navigate */}}
        currentPremium={245}
        recommendedPremium={189}
        coverageIncrease="+$50K"
        claimSpeed="3-5 days"
      />
    </motion.div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

// Loading skeleton for insurance card
function InsuranceCompareCardSkeleton() {
  return (
    <div 
      className="rounded-3xl border animate-pulse"
      style={{
        padding: 'var(--spacing-6)',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 'var(--radius-3xl)',
        height: '400px',
      }}
    >
      <div className="space-y-4">
        {/* Header skeleton */}
        <div 
          className="h-12 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-2xl)',
          }}
        />
        
        {/* Savings skeleton */}
        <div 
          className="h-24 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-2xl)',
          }}
        />
        
        {/* Comparison grid skeleton */}
        <div 
          className="grid grid-cols-2"
          style={{ gap: 'var(--spacing-3)' }}
        >
          <div 
            className="h-20 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-xl)',
            }}
          />
          <div 
            className="h-20 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-xl)',
            }}
          />
        </div>
        
        {/* Button skeleton */}
        <div 
          className="h-12 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-xl)',
          }}
        />
      </div>
    </div>
  );
}

// Error card component
function ErrorCard({ message }: { message: string }) {
  return (
    <div 
      className="p-6 rounded-2xl border text-center"
      style={{
        padding: 'var(--spacing-6)',
        borderRadius: 'var(--radius-2xl)',
        background: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
      }}
    >
      <p 
        className="text-red-400"
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: 'var(--text-base)',
        }}
      >
        {message}
      </p>
      <button
        className="mt-4 px-4 py-2 rounded-xl text-white"
        style={{
          padding: 'var(--spacing-2) var(--spacing-4)',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(239, 68, 68, 0.2)',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 'var(--text-sm)',
          transition: 'var(--transition-button)',
        }}
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 9: Full Integration in InsightsScreen
// ============================================================================

export function FullInsightsScreenExample({
  onNavigateToInsuranceOptimizer,
  onNavigateToMortgageOptimizer,
  onNavigateToGrants,
}: {
  onNavigateToInsuranceOptimizer: () => void;
  onNavigateToMortgageOptimizer: () => void;
  onNavigateToGrants: () => void;
}) {
  return (
    <div 
      className="min-h-screen text-white overflow-y-auto"
      style={{
        background: 'linear-gradient(to bottom right, rgb(var(--color-background-primary)), rgb(var(--color-background-secondary)))',
      }}
    >
      {/* Header */}
      <div 
        style={{ 
          padding: 'var(--spacing-6)',
        }}
      >
        <h1 
          className="text-white mb-2"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-bold)',
          }}
        >
          💡 Insights & Opportunities
        </h1>
        <p 
          className="text-white/60"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-base)',
          }}
        >
          AI-powered recommendations to optimize your property
        </p>
      </div>

      {/* Portfolio Value Card */}
      <div 
        style={{ 
          padding: '0 var(--spacing-6)',
          marginBottom: 'var(--spacing-6)',
        }}
      >
        {/* Portfolio summary content */}
      </div>

      {/* Opportunities Section */}
      <div 
        style={{ 
          padding: '0 var(--spacing-6)',
          marginBottom: 'var(--spacing-6)',
        }}
      >
        <h2 
          className="text-white mb-4"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          🎯 Top Opportunities
        </h2>

        <div 
          className="space-y-4"
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
          }}
        >
          {/* Insurance Optimization */}
          <InsuranceCompareCard
            onNavigate={onNavigateToInsuranceOptimizer}
            currentPremium={245}
            recommendedPremium={189}
            coverageIncrease="+$50K"
            claimSpeed="3-5 days"
          />

          {/* Could add MortgageCompareCard, GrantsCard, etc. */}
        </div>
      </div>

      {/* Other insights content */}
    </div>
  );
}
