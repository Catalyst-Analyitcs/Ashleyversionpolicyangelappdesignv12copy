/**
 * ==============================================================================
 * INSIGHTSSCREEN.TSX - AI-POWERED PORTFOLIO INTELLIGENCE DASHBOARD
 * ==============================================================================
 * 
 * PURPOSE: The "Credit Karma of homeownership" analytics command center.
 * Streamlined dashboard showing only the most important opportunities and insights.
 * 
 * BUSINESS IMPACT: The gateway to $10K+ value discovery per user
 * - Real-time portfolio valuation with AI predictions
 * - Top 3 opportunity cards (Unclaimed, Insurance, Mortgage)
 * - Quick portfolio health overview
 * - Direct CTAs to all optimizers
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * COMPLEXITY: MEDIUM
 * 
 * 1. ANIMATIONS:
 *    - react-native-reanimated for counter animations
 *    - Staggered card entrance
 *    - Spring physics for interactions
 * 
 * 2. INSURAGRID INTEGRATION:
 *    - TanStack Query for portfolio data
 *    - Real-time opportunity scanning
 *    - AI insight generation
 * 
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Brain,
  TrendingUp,
  Home,
  Activity,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';
import { SFPersonalizationBanner } from '../components/SFPersonalizationBanner';
import { UnclaimedOpportunitiesCard } from '../components/UnclaimedOpportunitiesCard';
import { InsuranceCompareCard } from '../components/InsuranceCompareCard';
import { MortgageCompareCard } from '../components/MortgageCompareCard';
import { Gift, TrendingDown, Sparkles } from 'lucide-react';

interface InsightsScreenProps {
  onNavigateToOpportunities?: () => void;
  onNavigateToInsuranceOptimizer?: () => void;
  onNavigateToMortgageOptimizer?: () => void;
  onBack?: () => void;
}

export function InsightsScreen({ 
  onNavigateToOpportunities, 
  onNavigateToInsuranceOptimizer, 
  onNavigateToMortgageOptimizer,
  onBack
}: InsightsScreenProps) {
  const [portfolioValue, setPortfolioValue] = useState(0);

  // Animated portfolio value counter
  useEffect(() => {
    const targetValue = 3200000;
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setPortfolioValue(targetValue);
        clearInterval(interval);
      } else {
        setPortfolioValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const portfolioMetrics = [
    {
      icon: Home,
      label: 'Portfolio Value',
      value: '$3.2M',
      trend: '+8.2% YoY',
      color: 'rgba(34, 197, 94, 1)',
    },
    {
      icon: Activity,
      label: 'Health Score',
      value: '94/100',
      trend: 'Excellent',
      color: 'rgba(16, 185, 129, 1)',
    },
    {
      icon: Shield,
      label: 'Risk Level',
      value: 'Low',
      trend: 'Protected',
      color: 'rgba(59, 130, 246, 1)',
    },
  ];

  return (
    <div 
      className="min-h-screen text-white relative"
      style={{
        background: 'linear-gradient(to bottom right, rgb(var(--color-background-primary)), rgb(var(--color-background-secondary)), rgb(var(--color-background-primary)))',
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100vh',
      }}
    >
      {/* Animated Background */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{ 
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: 'rgba(16, 185, 129, 0.2)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" 
          style={{ 
            background: 'rgba(13, 202, 240, 0.2)',
            animationDelay: '1s' 
          }} 
        />
      </div>

      {/* Header */}
      <div 
        className="relative z-10"
        style={{ padding: 'var(--spacing-6)' }}
      >
        {onBack && (
          <motion.button
            onClick={onBack}
            className="rounded-xl border hover:bg-white/10"
            style={{
              marginBottom: 'var(--spacing-4)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'var(--transition-button)',
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-base)',
            }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </div>
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-2"
          style={{ gap: 'var(--spacing-3)' }}
        >
          <div 
            className="flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 1), rgba(13, 202, 240, 1), rgba(var(--color-goldenrod), 1))',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
            }}
          >
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 
              className="text-white"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
              }}
            >
              Portfolio Intelligence
            </h1>
            <p 
              className="text-white/60"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-sm)',
              }}
            >
              Powered by PolicyAngel AI
            </p>
          </div>
        </motion.div>

        {/* Hero Portfolio Value */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border backdrop-blur-xl"
          style={{
            marginTop: 'var(--spacing-4)',
            padding: 'var(--spacing-6)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(13, 202, 240, 0.2), rgba(var(--color-goldenrod), 0.2))',
            borderColor: 'rgba(16, 185, 129, 0.3)',
            boxShadow: '0 4px 24px rgba(16, 185, 129, 0.2)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p 
                className="text-white/70 mb-1"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Total Portfolio Value
              </p>
              <motion.p 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                }}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ${(portfolioValue / 1000000).toFixed(1)}M
              </motion.p>
            </div>
            <div className="text-right">
              <p 
                className="text-emerald-400 mb-1"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Annual Growth
              </p>
              <div 
                className="flex items-center"
                style={{ gap: 'var(--spacing-2)' }}
              >
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <p 
                  className="text-emerald-400"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  +8.2%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div 
        className="relative"
        style={{
          padding: '0 var(--spacing-6)',
          paddingBottom: 'calc(80px + var(--spacing-6))',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-6)',
          zIndex: 1,
        }}
      >
        {/* SF Personalization Banner */}
        <SFPersonalizationBanner 
          neighborhood="Pacific Heights"
          showLandmark={true}
        />

        {/* Primary Opportunity Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
          }}
        >
          <h2 
            className="text-white"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            💰 Your Opportunities
          </h2>

          {/* Unclaimed Opportunities Card */}
          {onNavigateToOpportunities && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <UnclaimedOpportunitiesCard
                onNavigate={onNavigateToOpportunities}
                totalValue={23500}
                totalCount={8}
                categories={[
                  { name: 'Grants', value: 18000, count: 3, icon: Gift },
                  { name: 'Mortgage', value: 4188, count: 1, icon: TrendingDown },
                  { name: 'Insurance', value: 672, count: 1, icon: Sparkles },
                ]}
                urgentCount={2}
              />
            </motion.div>
          )}

          {/* Insurance Compare Card */}
          {onNavigateToInsuranceOptimizer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <InsuranceCompareCard
                onNavigate={onNavigateToInsuranceOptimizer}
                currentProvider="State Farm"
                currentPremium={2400}
                recommendedProvider="Lemonade"
                recommendedPremium={1728}
                coverageImprovement="Better coverage + earthquake"
                claimSpeed="3x faster"
              />
            </motion.div>
          )}

          {/* Mortgage Compare Card */}
          {onNavigateToMortgageOptimizer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <MortgageCompareCard
                onNavigate={onNavigateToMortgageOptimizer}
                currentRate={6.5}
                currentPayment={2528}
                recommendedRate={5.125}
                recommendedPayment={2179}
                breakEvenMonths={9}
                closingCosts={3200}
              />
            </motion.div>
          )}
        </div>

        {/* Quick Portfolio Metrics */}
        <div>
          <h2 
            className="text-white mb-4"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            📊 Portfolio Health
          </h2>
          <div 
            className="grid grid-cols-3 gap-3"
          >
            {portfolioMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="rounded-2xl backdrop-blur-xl border"
                  style={{
                    padding: 'var(--spacing-4)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div 
                    className="flex items-center justify-center mb-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-xl)',
                      background: `linear-gradient(135deg, ${metric.color}40, ${metric.color}20)`,
                      boxShadow: `0 4px 12px ${metric.color}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: metric.color }} />
                  </div>
                  
                  <p 
                    className="text-white/60 mb-1"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    {metric.label}
                  </p>
                  <p 
                    className="text-white mb-1"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    {metric.value}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ 
                      color: metric.color,
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    {metric.trend}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div 
        className="fixed bottom-0 left-0 right-0 flex justify-center"
        style={{
          zIndex: 100,
          paddingBottom: 'var(--spacing-6)',
        }}
      >
        <BottomNavigation currentScreen="insights" />
      </div>
    </div>
  );
}
