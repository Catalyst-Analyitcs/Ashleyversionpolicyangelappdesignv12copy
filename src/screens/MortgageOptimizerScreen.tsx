/**
 * ==============================================================================
 * MORTGAGEOPTIMIZERSCREEN.TSX - MORTGAGE REFINANCE OPTIMIZATION
 * ==============================================================================
 * 
 * PURPOSE: AI-powered mortgage optimization showing refinance opportunities,
 * rate comparisons, and payment calculators from Insuragrid lending partners.
 * 
 * BUSINESS IMPACT: $200-$800 monthly savings per user
 * - Real-time rate comparison across 15+ lenders
 * - Break-even analysis for refinancing
 * - Cash-out refinance options
 * - REVENUE: 0.5-1% origination fee ($2,000-$5,000 per refinance)
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * COMPLEXITY: HIGH
 * 
 * 1. INTERACTIVE CALCULATORS:
 *    - react-native-slider for rate/term adjustments
 *    - Animated payment breakdowns
 *    - Amortization schedule visualization
 * 
 * 2. CHARTS & GRAPHS:
 *    - Victory Native XL for payment comparisons
 *    - Interest savings over time
 *    - Break-even timeline
 * 
 * 3. RATE MONITORING:
 *    - TanStack Query with polling for live rates
 *    - WebSocket for real-time rate alerts
 *    - Push notifications for rate drops
 * 
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home,
  TrendingDown,
  Calculator,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Percent,
  Calendar,
  PiggyBank,
  AlertCircle,
  Zap,
  Award,
  ChevronDown,
  ChevronUp,
  TrendingUp
} from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';

interface MortgageOffer {
  id: string;
  lender: string;
  logo: string;
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
  isRecommended?: boolean;
}

interface RefinanceScenario {
  name: string;
  description: string;
  newRate: number;
  newPayment: number;
  monthlySavings: number;
  closingCosts: number;
  breakEvenMonths: number;
  lifetimeSavings: number;
  cashOut?: number;
}

interface MortgageOptimizerScreenProps {
  propertyId: string;
  onSelectOffer?: (offerId: string) => void;
  onBack?: () => void;
}

export default function MortgageOptimizerScreen({
  propertyId,
  onSelectOffer,
  onBack
}: MortgageOptimizerScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'offers' | 'calculator' | 'scenarios'>('offers');
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
  const [loanAmount, setLoanAmount] = useState(400000);
  const [savingsCounter, setSavingsCounter] = useState(0);

  // Mock current mortgage data - Replace with Insuragrid API
  const currentMortgage = {
    lender: 'Wells Fargo',
    rate: 6.5,
    monthlyPayment: 2528,
    remainingBalance: 400000,
    remainingTerm: 27, // years
    originalTerm: 30
  };

  // Mock refinance offers - Replace with Insuragrid API
  const refinanceOffers: MortgageOffer[] = [
    {
      id: 'offer-1',
      lender: 'Better.com',
      logo: '🏠',
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
      isRecommended: true
    },
    {
      id: 'offer-2',
      lender: 'Rocket Mortgage',
      logo: '🚀',
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
      processingTime: '28 days'
    },
    {
      id: 'offer-3',
      lender: 'SoFi',
      logo: '💰',
      rate: 5.375,
      apr: 5.42,
      monthlyPayment: 2241,
      loanTerm: 30,
      closingCosts: 2900,
      points: 0,
      lockPeriod: 30,
      features: [
        'Unemployment protection',
        'Career coaching included',
        'Member benefits',
        'Low closing costs'
      ],
      rating: 4.5,
      processingTime: '35 days'
    }
  ];

  const refinanceScenarios: RefinanceScenario[] = [
    {
      name: 'Rate & Term Refinance',
      description: 'Lower your rate, keep same term',
      newRate: 5.125,
      newPayment: 2179,
      monthlySavings: 349,
      closingCosts: 3200,
      breakEvenMonths: 9,
      lifetimeSavings: 113076
    },
    {
      name: '15-Year Accelerated',
      description: 'Pay off faster, build equity quicker',
      newRate: 4.625,
      newPayment: 3063,
      monthlySavings: -535, // negative = higher payment
      closingCosts: 3200,
      breakEvenMonths: 0,
      lifetimeSavings: 187440
    },
    {
      name: 'Cash-Out Refinance',
      description: 'Access $50K equity for home improvements',
      newRate: 5.5,
      newPayment: 2556,
      monthlySavings: -28,
      closingCosts: 3500,
      breakEvenMonths: 0,
      lifetimeSavings: 85000,
      cashOut: 50000
    }
  ];

  const monthlySavings = currentMortgage.monthlyPayment - refinanceOffers[0].monthlyPayment;
  const annualSavings = monthlySavings * 12;

  // Animate savings counter
  useEffect(() => {
    if (selectedTab === 'offers') {
      const duration = 2000;
      const steps = 60;
      const increment = monthlySavings / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= monthlySavings) {
          setSavingsCounter(monthlySavings);
          clearInterval(interval);
        } else {
          setSavingsCounter(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [selectedTab, monthlySavings]);

  const calculateBreakEven = (closingCosts: number, monthlySavings: number) => {
    return Math.ceil(closingCosts / monthlySavings);
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
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: 'rgba(var(--color-goldenrod), 0.2)' }}
        />
        <div 
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse" 
          style={{ 
            background: 'rgba(16, 185, 129, 0.2)',
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
            <Home className="w-6 h-6 text-white" />
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
              Mortgage Optimizer
            </h1>
            <p 
              className="text-white/60"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-sm)',
              }}
            >
              Powered by Insuragrid Lending Network
            </p>
          </div>
        </div>

        {/* Current Mortgage Status */}
        <div 
          className="rounded-2xl backdrop-blur-xl border"
          style={{
            marginTop: 'var(--spacing-4)',
            padding: 'var(--spacing-4)',
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <div 
            className="flex items-center justify-between"
            style={{ marginBottom: 'var(--spacing-3)' }}
          >
            <div>
              <p 
                className="text-white/60"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Current Mortgage
              </p>
              <p 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                {currentMortgage.lender}
              </p>
            </div>
            <div className="text-right">
              <p 
                className="text-white/60"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Rate
              </p>
              <p 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                {currentMortgage.rate}%
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p 
                className="text-white/60"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Monthly Payment
              </p>
              <p 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-base)',
                }}
              >
                ${currentMortgage.monthlyPayment.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p 
                className="text-white/60"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Remaining
              </p>
              <p 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-base)',
                }}
              >
                {currentMortgage.remainingTerm} years
              </p>
            </div>
          </div>
        </div>

        {/* Savings Highlight */}
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
                  Potential Monthly Savings
                </p>
                <p 
                  className="text-white"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 'var(--font-weight-bold)',
                  }}
                >
                  ${savingsCounter.toLocaleString()}
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
                Annual Savings
              </p>
              <p 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                ${annualSavings.toLocaleString()}
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
          {(['offers', 'calculator', 'scenarios'] as const).map((tab) => (
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
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-normal)',
                transition: 'var(--transition-button)',
                ...(selectedTab === tab ? {
                  background: 'linear-gradient(to right, rgb(var(--color-goldenrod)), rgb(214, 158, 46))',
                  boxShadow: '0 4px 14px rgba(var(--color-goldenrod), 0.3)',
                } : {}),
              }}
            >
              {tab === 'offers' && 'Best Offers'}
              {tab === 'calculator' && 'Calculator'}
              {tab === 'scenarios' && 'Scenarios'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-32">
        <AnimatePresence mode="wait">
          {/* Offers Tab */}
          {selectedTab === 'offers' && (
            <motion.div
              key="offers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {refinanceOffers.map((offer, idx) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-2xl backdrop-blur-xl border ${
                    offer.isRecommended
                      ? 'bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{offer.logo}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg text-white">{offer.lender}</h3>
                          {offer.isRecommended && (
                            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Best Rate
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 text-sm">Rating: {offer.rating}/5.0</p>
                      </div>
                    </div>
                  </div>

                  {/* Rate Info */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="text-white/60 text-xs mb-1">Rate</p>
                      <p className="text-white text-xl">{offer.rate}%</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1">APR</p>
                      <p className="text-white text-xl">{offer.apr}%</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1">Points</p>
                      <p className="text-white text-xl">{offer.points}</p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white/60">New Monthly Payment</p>
                      <p className="text-white text-2xl">${offer.monthlyPayment.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-emerald-400">Monthly Savings</p>
                      <p className="text-emerald-400 text-xl">
                        ${(currentMortgage.monthlyPayment - offer.monthlyPayment).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Break-even Analysis */}
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-white text-sm">Break-even Point</span>
                      </div>
                      <span className="text-blue-400">
                        {calculateBreakEven(offer.closingCosts, currentMortgage.monthlyPayment - offer.monthlyPayment)} months
                      </span>
                    </div>
                  </div>

                  {/* Details Toggle */}
                  <button
                    onClick={() => setExpandedOffer(expandedOffer === offer.id ? null : offer.id)}
                    className="w-full flex items-center justify-between mb-4 text-white/70 hover:text-white transition-colors"
                  >
                    <span className="text-sm">Loan Details</span>
                    {expandedOffer === offer.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedOffer === offer.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3 mb-4 overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-white/60">Loan Term</p>
                            <p className="text-white">{offer.loanTerm} years</p>
                          </div>
                          <div>
                            <p className="text-white/60">Closing Costs</p>
                            <p className="text-white">${offer.closingCosts.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-white/60">Rate Lock</p>
                            <p className="text-white">{offer.lockPeriod} days</p>
                          </div>
                          <div>
                            <p className="text-white/60">Processing Time</p>
                            <p className="text-white">{offer.processingTime}</p>
                          </div>
                        </div>

                        <div className="space-y-2 pt-3 border-t border-white/10">
                          {offer.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={() => onSelectOffer?.(offer.id)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-white hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Pre-Approved
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Calculator Tab */}
          {selectedTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-6 h-6 text-amber-400" />
                  <h3 className="text-lg text-white">Refinance Calculator</h3>
                </div>

                {/* Loan Amount Slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white/70">Loan Amount</label>
                    <span className="text-white text-xl">${loanAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="1000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10"
                    style={{
                      background: `linear-gradient(to right, rgb(251 191 36) 0%, rgb(251 191 36) ${((loanAmount - 100000) / 900000) * 100}%, rgba(255,255,255,0.1) ${((loanAmount - 100000) / 900000) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                </div>

                {/* Estimated Payment */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white/60 text-sm mb-2">Estimated Monthly Payment</p>
                  <p className="text-3xl text-white mb-1">
                    ${Math.round((loanAmount * 0.005125)).toLocaleString()}
                  </p>
                  <p className="text-emerald-400 text-sm">
                    Saves ${Math.round(currentMortgage.monthlyPayment - (loanAmount * 0.005125))}/month
                  </p>
                </div>
              </div>

              {/* Interest Savings Visualization */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <h3 className="text-lg text-white mb-4">Interest Savings Over Time</h3>
                
                <div className="space-y-3">
                  {[5, 10, 15, 20, 30].map((years) => {
                    const currentInterest = (currentMortgage.monthlyPayment * 12 * years) - loanAmount;
                    const newInterest = ((loanAmount * 0.005125) * 12 * years) - loanAmount;
                    const savings = Math.max(0, currentInterest - newInterest);
                    
                    return (
                      <div key={years}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/70">{years} Years</span>
                          <span className="text-emerald-400">${savings.toLocaleString()}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (savings / 100000) * 100)}%` }}
                            transition={{ delay: years * 0.1, duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-emerald-400 to-green-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tax Benefits */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="w-6 h-6 text-amber-400" />
                  <h3 className="text-lg text-white">Tax Benefits</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Est. Annual Interest Deduction</span>
                    <span className="text-white">${(loanAmount * 0.05125).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Tax Savings (28% bracket)</span>
                    <span className="text-emerald-400">${Math.round(loanAmount * 0.05125 * 0.28).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Scenarios Tab */}
          {selectedTab === 'scenarios' && (
            <motion.div
              key="scenarios"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 backdrop-blur-xl mb-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="text-lg text-white">Refinance Scenarios</h3>
                    <p className="text-white/60 text-sm">Compare different strategies for your goals</p>
                  </div>
                </div>
              </div>

              {refinanceScenarios.map((scenario, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg text-white mb-1">{scenario.name}</h4>
                      <p className="text-white/60 text-sm">{scenario.description}</p>
                    </div>
                    {scenario.cashOut && (
                      <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 text-sm">
                        Cash-Out
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-white/60 text-xs mb-1">New Rate</p>
                      <p className="text-white text-xl">{scenario.newRate}%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-white/60 text-xs mb-1">New Payment</p>
                      <p className="text-white text-xl">${scenario.newPayment.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Monthly Change</span>
                      <span className={`text-lg ${scenario.monthlySavings > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {scenario.monthlySavings > 0 ? '+' : ''}${Math.abs(scenario.monthlySavings).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Closing Costs</span>
                      <span className="text-white">${scenario.closingCosts.toLocaleString()}</span>
                    </div>
                    {scenario.breakEvenMonths > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Break-even</span>
                        <span className="text-blue-400">{scenario.breakEvenMonths} months</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-white text-sm">Lifetime Savings</span>
                      <span className="text-emerald-400 text-xl">${scenario.lifetimeSavings.toLocaleString()}</span>
                    </div>
                    {scenario.cashOut && (
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <span className="text-white text-sm">Cash at Closing</span>
                        <span className="text-amber-400 text-xl">${scenario.cashOut.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore This Option
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
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
