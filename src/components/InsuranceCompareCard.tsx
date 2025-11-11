/**
 * ==============================================================================
 * INSURANCECOMPARECARD.TSX - INSURANCE COMPARISON WIDGET
 * ==============================================================================
 * 
 * PURPOSE: Beautiful glassmorphic card showing insurance comparison snapshot
 * with CTA to full InsuranceOptimizerScreen. Designed to be placed on
 * dashboard, insights screen, or anywhere needing quick insurance optimization.
 * 
 * FEATURES:
 * - Current vs recommended premium comparison
 * - Animated savings counter
 * - Coverage improvement highlights
 * - Glassmorphic luxury design
 * - One-click navigation to full optimizer
 * 
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, TrendingDown, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface InsuranceCompareCardProps {
  onNavigate: () => void;
  currentPremium?: number;
  recommendedPremium?: number;
  coverageIncrease?: string;
  claimSpeed?: string;
  compact?: boolean;
}

export function InsuranceCompareCard({ 
  onNavigate,
  currentPremium = 245,
  recommendedPremium = 189,
  coverageIncrease = '+$50K',
  claimSpeed = '3-5 days',
  compact = false
}: InsuranceCompareCardProps) {
  const [savingsCounter, setSavingsCounter] = useState(0);
  const monthlySavings = currentPremium - recommendedPremium;
  const annualSavings = monthlySavings * 12;

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
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

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
              <Shield className="w-6 h-6 text-white" />
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
                Insurance Optimizer
              </h3>
              <p 
                className="text-white/60"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-xs)',
                }}
              >
                Better coverage, lower cost
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
            AI-Powered Match Found
          </span>
        </div>
      </div>

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
        {/* Current Plan */}
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
            Current
          </p>
          <p 
            className="text-white"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            ${currentPremium}
          </p>
          <p 
            className="text-white/40"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xs)',
            }}
          >
            per month
          </p>
        </div>

        {/* Recommended Plan */}
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
            Best Match
          </p>
          <p 
            className="text-white"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            ${recommendedPremium}
          </p>
          <p 
            className="text-emerald-400/70"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xs)',
            }}
          >
            per month
          </p>
        </div>
      </div>

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
              {coverageIncrease} increased coverage
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
              Faster claims: {claimSpeed}
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
              Earthquake coverage included
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
        Compare & Switch Now
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Trust Badge */}
      <div className="relative z-10 mt-3 flex items-center justify-center gap-2">
        <Shield className="w-3 h-3 text-white/40" />
        <p 
          className="text-white/40 text-center"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-xs)',
          }}
        >
          Powered by Insuragrid • 12+ carriers compared
        </p>
      </div>
    </motion.div>
  );
}
