/**
 * ==============================================================================
 * INSURANCEOPTIMIZERSCREEN.TSX - INSURANCE COMPARISON & OPTIMIZATION
 * ==============================================================================
 * 
 * PURPOSE: AI-powered insurance optimization showing side-by-side comparisons
 * of current policy vs recommended options from Insuragrid partner network.
 * 
 * BUSINESS IMPACT: $400-$2000 annual savings per user
 * - Real-time rate comparison across 12+ carriers
 * - Coverage gap analysis
 * - One-click policy switching
 * - REVENUE: 8% commission on new policies ($96-240 per switch)
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * COMPLEXITY: MEDIUM-HIGH
 * 
 * 1. ANIMATIONS:
 *    - react-native-reanimated for comparison slider
 *    - Animated card flips for coverage details
 *    - Progress bars for coverage adequacy
 * 
 * 2. DATA VISUALIZATION:
 *    - Victory Native XL for coverage comparison charts
 *    - Animated savings counter
 *    - Interactive coverage toggles
 * 
 * 3. INSURAGRID INTEGRATION:
 *    - TanStack Query for real-time rate fetching
 *    - Optimistic updates for coverage selections
 *    - WebSocket for live rate updates
 * 
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Home,
  Zap,
  Umbrella,
  ArrowRight,
  Info,
  Clock,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';

interface InsurancePlan {
  id: string;
  provider: string;
  logo: string;
  monthlyPremium: number;
  annualPremium: number;
  coverageAmount: number;
  deductible: number;
  features: string[];
  rating: number;
  claimSpeed: string;
  perks: string[];
  isCurrent?: boolean;
  isRecommended?: boolean;
}

interface CoverageGap {
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendedCoverage: number;
  monthlyCost: number;
}

interface InsuranceOptimizerScreenProps {
  propertyId: string;
  onSelectPlan?: (planId: string) => void;
  onBack?: () => void;
}

export default function InsuranceOptimizerScreen({ 
  propertyId,
  onSelectPlan,
  onBack
}: InsuranceOptimizerScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'comparison' | 'gaps' | 'savings'>('comparison');
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [savingsCounter, setSavingsCounter] = useState(0);

  // Mock data - Replace with Insuragrid API
  // RN: Use TanStack Query here
  const currentPlan: InsurancePlan = {
    id: 'current-1',
    provider: 'State Farm',
    logo: '🏛️',
    monthlyPremium: 245,
    annualPremium: 2940,
    coverageAmount: 450000,
    deductible: 2500,
    features: [
      'Dwelling Coverage: $450K',
      'Personal Property: $225K',
      'Liability: $300K',
      'Loss of Use: $90K'
    ],
    rating: 4.2,
    claimSpeed: '14-21 days',
    perks: ['24/7 Support'],
    isCurrent: true
  };

  const recommendedPlans: InsurancePlan[] = [
    {
      id: 'rec-1',
      provider: 'Lemonade',
      logo: '🍋',
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
      perks: ['Smart Claims Processing', 'Zero Paperwork', 'Giveback Program'],
      isRecommended: true
    },
    {
      id: 'rec-2',
      provider: 'Hippo',
      logo: '🦛',
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
      perks: ['Smart Home Kit Included', 'Leak Detection', 'Free Home Inspection']
    },
    {
      id: 'rec-3',
      provider: 'Kin',
      logo: '🏠',
      monthlyPremium: 205,
      annualPremium: 2460,
      coverageAmount: 475000,
      deductible: 2500,
      features: [
        'Dwelling Coverage: $475K',
        'Personal Property: $237K',
        'Liability: $350K',
        'Loss of Use: $95K'
      ],
      rating: 4.4,
      claimSpeed: '7-10 days',
      perks: ['Flexible Payments', 'No Hidden Fees']
    }
  ];

  const coverageGaps: CoverageGap[] = [
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
    },
    {
      type: 'Equipment Breakdown',
      severity: 'low',
      description: 'HVAC and major appliances not fully covered',
      recommendedCoverage: 15000,
      monthlyCost: 8
    }
  ];

  const annualSavings = currentPlan.annualPremium - recommendedPlans[0].annualPremium;

  // Animate savings counter
  useEffect(() => {
    if (selectedTab === 'savings') {
      const duration = 2000;
      const steps = 60;
      const increment = annualSavings / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= annualSavings) {
          setSavingsCounter(annualSavings);
          clearInterval(interval);
        } else {
          setSavingsCounter(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [selectedTab, annualSavings]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-500/10';
      case 'medium': return 'text-amber-500 bg-amber-500/10';
      case 'low': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div 
      className="min-h-screen text-white overflow-y-auto"
      style={{
        background: 'linear-gradient(to bottom right, rgb(var(--color-background-primary)), rgb(var(--color-background-secondary)), rgb(var(--color-background-primary)))',
      }}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: 'rgba(var(--color-goldenrod), 0.2)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" 
          style={{ 
            background: 'rgba(var(--color-copa-blue), 0.2)',
            animationDelay: '1s' 
          }} 
        />
      </div>

      {/* Header */}
      <div 
        className="relative z-10"
        style={{ 
          padding: 'var(--spacing-6)',
        }}
      >
        <motion.button
          onClick={onBack}
          className="mb-4 rounded-xl border hover:bg-white/10"
          style={{
            padding: 'var(--spacing-3) var(--spacing-4)',
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
          ← Back
        </motion.button>

        <div 
          className="flex items-center mb-2"
          style={{ gap: 'var(--spacing-3)' }}
        >
          <div 
            className="flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, rgb(var(--color-goldenrod)), rgb(214, 158, 46))',
              boxShadow: 'var(--glow-medium)',
            }}
          >
            <Shield className="w-6 h-6 text-white" />
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
              Insurance Optimizer
            </h1>
            <p 
              className="text-white/60"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-sm)',
              }}
            >
              Powered by Insuragrid Intelligence
            </p>
          </div>
        </div>

        {/* Savings Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="rounded-2xl border backdrop-blur-xl"
          style={{
            marginTop: 'var(--spacing-4)',
            padding: 'var(--spacing-4)',
            background: 'linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))',
            borderColor: 'rgba(16, 185, 129, 0.3)',
          }}
        >
          <div 
            className="flex items-center justify-between"
            style={{ gap: 'var(--spacing-3)' }}
          >
            <div 
              className="flex items-center"
              style={{ gap: 'var(--spacing-3)' }}
            >
              <TrendingDown className="w-8 h-8 text-emerald-400" />
              <div>
                <p 
                  className="text-white/70"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Potential Annual Savings
                </p>
                <p 
                  className="text-white"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 'var(--font-weight-bold)',
                  }}
                >
                  ${annualSavings.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p 
                className="text-emerald-400"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Better Coverage
              </p>
              <p 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-base)',
                }}
              >
                +$50K Coverage
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div 
        className="relative z-10"
        style={{
          padding: '0 var(--spacing-6)',
          marginBottom: 'var(--spacing-6)',
        }}
      >
        <div 
          className="flex rounded-2xl backdrop-blur-xl border"
          style={{
            gap: 'var(--spacing-2)',
            padding: 'var(--spacing-1)',
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {(['comparison', 'gaps', 'savings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 rounded-xl ${
                selectedTab === tab
                  ? 'text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              style={{
                padding: 'var(--spacing-3) var(--spacing-4)',
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-normal)',
                transition: 'var(--transition-button)',
                ...(selectedTab === tab ? {
                  background: 'linear-gradient(to right, rgb(var(--color-goldenrod)), rgb(214, 158, 46))',
                  boxShadow: '0 4px 14px rgba(var(--color-goldenrod), 0.3)',
                } : {}),
              }}
            >
              {tab === 'comparison' && 'Compare Plans'}
              {tab === 'gaps' && 'Coverage Gaps'}
              {tab === 'savings' && 'Savings Breakdown'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-32">
        <AnimatePresence mode="wait">
          {/* Comparison Tab */}
          {selectedTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Current Plan */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{currentPlan.logo}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg text-white">{currentPlan.provider}</h3>
                        <span className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs">
                          Current
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">Rating: {currentPlan.rating}/5.0</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-white">${currentPlan.monthlyPremium}/mo</p>
                    <p className="text-white/60 text-sm">${currentPlan.annualPremium}/year</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {currentPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <Clock className="w-4 h-4" />
                  Claim Processing: {currentPlan.claimSpeed}
                </div>
              </div>

              {/* Recommended Plans */}
              {recommendedPlans.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-2xl backdrop-blur-xl border ${
                    plan.isRecommended
                      ? 'bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{plan.logo}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg text-white">{plan.provider}</h3>
                          {plan.isRecommended && (
                            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Best Match
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 text-sm">Rating: {plan.rating}/5.0</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl text-white">${plan.monthlyPremium}/mo</p>
                      <p className="text-white/60 text-sm">${plan.annualPremium}/year</p>
                      <p className="text-emerald-400 text-sm mt-1">
                        Save ${currentPlan.monthlyPremium - plan.monthlyPremium}/mo
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                    className="w-full flex items-center justify-between mb-4 text-white/70 hover:text-white transition-colors"
                  >
                    <span className="text-sm">Coverage Details</span>
                    {expandedPlan === plan.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedPlan === plan.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-2 mb-4 overflow-hidden"
                      >
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            {feature}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Perks */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {plan.perks.map((perk, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs border border-amber-500/20"
                      >
                        <Zap className="w-3 h-3 inline mr-1" />
                        {perk}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-emerald-400 text-sm mb-4">
                    <Clock className="w-4 h-4" />
                    Fast Claims: {plan.claimSpeed}
                  </div>

                  <motion.button
                    onClick={() => onSelectPlan?.(plan.id)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-white hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Select This Plan
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Coverage Gaps Tab */}
          {selectedTab === 'gaps' && (
            <motion.div
              key="gaps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 backdrop-blur-xl mb-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  <div>
                    <h3 className="text-lg text-white">Coverage Analysis</h3>
                    <p className="text-white/60 text-sm">Based on your property risk profile</p>
                  </div>
                </div>
              </div>

              {coverageGaps.map((gap, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${getSeverityColor(gap.severity)} flex items-center justify-center`}>
                        {gap.severity === 'high' && <AlertTriangle className="w-5 h-5" />}
                        {gap.severity === 'medium' && <Info className="w-5 h-5" />}
                        {gap.severity === 'low' && <Shield className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-white">{gap.type}</h4>
                        <p className="text-white/60 text-sm mt-1">{gap.description}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs capitalize ${getSeverityColor(gap.severity)}`}>
                      {gap.severity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-white/60 text-sm">Recommended Coverage</p>
                      <p className="text-white text-lg">${gap.recommendedCoverage.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Additional Cost</p>
                      <p className="text-white text-lg">+${gap.monthlyCost}/mo</p>
                    </div>
                  </div>

                  <motion.button
                    className="w-full mt-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Coverage
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Savings Tab */}
          {selectedTab === 'savings' && (
            <motion.div
              key="savings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Animated Savings Counter */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 backdrop-blur-xl text-center">
                <Umbrella className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-white/70 mb-2">Total Annual Savings</h3>
                <motion.p
                  className="text-6xl text-white mb-4"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  ${savingsCounter.toLocaleString()}
                </motion.p>
                <p className="text-emerald-400">With better coverage included!</p>
              </div>

              {/* Savings Breakdown */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <h3 className="text-lg text-white mb-4">5-Year Projection</h3>
                
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((year) => {
                    const yearSavings = annualSavings * year;
                    return (
                      <div key={year} className="flex items-center justify-between">
                        <span className="text-white/70">Year {year}</span>
                        <span className="text-emerald-400 text-lg">${yearSavings.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Total 5-Year Savings</span>
                    <span className="text-2xl text-emerald-400">${(annualSavings * 5).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Value Additions */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <h3 className="text-lg text-white mb-4">Additional Value</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Home className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white">Increased Coverage</p>
                      <p className="text-white/60 text-sm">+$50,000 dwelling protection</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white">Faster Claims</p>
                      <p className="text-white/60 text-sm">3-5 days vs 14-21 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white">Better Protection</p>
                      <p className="text-white/60 text-sm">Earthquake + water backup included</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                onClick={() => setSelectedTab('comparison')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-white text-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Plans & Switch Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0" style={{ marginBottom: 'var(--spacing-4)' }}>
        <BottomNavigation onNavigate={() => {}} activeTab="insights" />
      </div>
    </div>
  );
}
