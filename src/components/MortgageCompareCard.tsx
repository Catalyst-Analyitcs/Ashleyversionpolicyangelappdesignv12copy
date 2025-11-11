/**
 * ==============================================================================
 * MORTGAGECOMPARECARD.TSX - MORTGAGE RATE COMPARISON WIDGET
 * ==============================================================================
 * 
 * PURPOSE: Beautiful glassmorphic card showing mortgage refinance opportunity
 * with CTA to full MortgageOptimizerScreen. Designed for dashboard, insights
 * screen, or anywhere needing quick mortgage optimization access.
 * 
 * FEATURES:
 * - Current vs recommended rate comparison
 * - Animated savings counter
 * - Payment reduction highlights
 * - Break-even analysis preview
 * - Glassmorphic luxury design
 * - One-click navigation to full optimizer
 * 
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Home, TrendingDown, ArrowRight, CheckCircle, Sparkles, Percent, Clock } from 'lucide-react';

interface MortgageCompareCardProps {
  onNavigate: () => void;
  currentRate?: number;
  currentPayment?: number;
  recommendedRate?: number;
  recommendedPayment?: number;
  breakEvenMonths?: number;
  closingCosts?: number;
  compact?: boolean;
}

export function MortgageCompareCard({ 
  onNavigate,
  currentRate = 6.5,
  currentPayment = 2528,
  recommendedRate = 5.125,
  recommendedPayment = 2179,
  breakEvenMonths = 9,
  closingCosts = 3200,
  compact = false
}: MortgageCompareCardProps) {
  const [savingsCounter, setSavingsCounter] = useState(0);
  const monthlySavings = currentPayment - recommendedPayment;
  const annualSavings = monthlySavings * 12;
  const rateDifference = currentRate - recommendedRate;

  // Animated savings counter
  useEffect(() => {
    const duration = 1500;
    const steps = 50;
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
  }, [monthlySavings]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 p-6 cursor-pointer"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-depth-md), var(--glow-subtle)',
      }}
      onClick={onNavigate}
    >
      {/* Gradient Background Orbs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgb(var(--color-goldenrod)), rgb(214, 158, 46))',
                boxShadow: 'var(--glow-medium)',
              }}
            >
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 
                className="text-white mb-0"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                Mortgage Optimizer
              </h3>
              <p 
                className="text-white/60"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-xs)',
                }}
              >
                Lower your monthly payment
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
          </motion.div>
        </div>

        {/* AI Badge */}
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
          style={{
            background: 'rgba(var(--color-goldenrod), 0.1)',
            border: '1px solid rgba(var(--color-goldenrod), 0.2)',
          }}
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span 
            className="text-amber-400"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            Better Rate Available
          </span>
        </div>
      </div>

      {/* Rate Comparison Badge */}
      <motion.div 
        className="relative z-10 p-3 rounded-2xl mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p 
              className="text-purple-400/70 mb-1"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-xs)',
              }}
            >
              Rate Reduction
            </p>
            <div className="flex items-baseline gap-2">
              <motion.p 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {rateDifference.toFixed(3)}%
              </motion.p>
              <span 
                className="text-purple-400/70"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                lower
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Percent className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </motion.div>

      {/* Savings Highlight */}
      <motion.div 
        className="relative z-10 p-4 rounded-2xl mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p 
              className="text-emerald-400/70 mb-1"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-xs)',
              }}
            >
              Monthly Savings
            </p>
            <motion.p 
              className="text-white"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-bold)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ${savingsCounter}
            </motion.p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
        <p 
          className="text-emerald-400/70 mt-2"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-xs)',
          }}
        >
          ${annualSavings.toLocaleString()}/year total savings
        </p>
      </motion.div>

      {/* Comparison Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-3 mb-4">
        {/* Current Rate */}
        <div 
          className="p-3 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <p 
            className="text-white/50 mb-1"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xs)',
            }}
          >
            Current Rate
          </p>
          <p 
            className="text-white"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {currentRate}%
          </p>
          <p 
            className="text-white/40"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xs)',
            }}
          >
            ${currentPayment.toLocaleString()}/mo
          </p>
        </div>

        {/* Recommended Rate */}
        <div 
          className="p-3 rounded-xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <div className="absolute top-1 right-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </motion.div>
          </div>
          <p 
            className="text-emerald-400/70 mb-1"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xs)',
            }}
          >
            Best Rate
          </p>
          <p 
            className="text-white"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {recommendedRate}%
          </p>
          <p 
            className="text-emerald-400/70"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xs)',
            }}
          >
            ${recommendedPayment.toLocaleString()}/mo
          </p>
        </div>
      </div>

      {/* Break-even Analysis */}
      {!compact && (
        <div 
          className="relative z-10 p-3 rounded-xl mb-4"
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Break-even Point
              </span>
            </div>
            <span 
              className="text-blue-400"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              {breakEvenMonths} months
            </span>
          </div>
        </div>
      )}

      {/* Benefits List */}
      {!compact && (
        <div className="relative z-10 space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p 
              className="text-white/70"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-sm)',
              }}
            >
              Save {rateDifference.toFixed(2)}% on interest rate
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p 
              className="text-white/70"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-sm)',
              }}
            >
              Lower payment by ${monthlySavings}/month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p 
              className="text-white/70"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-sm)',
              }}
            >
              Closing costs: ${closingCosts.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <motion.button
        className="relative z-10 w-full py-3 rounded-xl flex items-center justify-center gap-2 text-white"
        style={{
          background: 'linear-gradient(135deg, rgb(var(--color-goldenrod)), rgb(214, 158, 46))',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-weight-semibold)',
          boxShadow: 'var(--shadow-depth-sm)',
          transition: 'var(--transition-button)',
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: 'var(--shadow-depth-md), var(--glow-medium)',
        }}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate();
        }}
      >
        Compare Rates & Refinance
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Trust Badge */}
      <div className="relative z-10 mt-3 flex items-center justify-center gap-2">
        <Home className="w-3 h-3 text-white/40" />
        <p 
          className="text-white/40 text-center"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-xs)',
          }}
        >
          Powered by Insuragrid • 15+ lenders compared
        </p>
      </div>
    </motion.div>
  );
}
