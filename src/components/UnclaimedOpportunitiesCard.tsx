/**
 * ==============================================================================
 * UNCLAIMEDOPPORTUNITIESCARD.TSX - OPPORTUNITY DISCOVERY WIDGET
 * ==============================================================================
 * 
 * PURPOSE: Beautiful glassmorphic card showing total unclaimed opportunities
 * with CTA to full OpportunityRevealScreen. The "Credit Karma credit score"
 * moment teaser that drives discovery and engagement.
 * 
 * FEATURES:
 * - Total opportunity count (number of opportunities)
 * - Total value display ($23,500+)
 * - Animated value counter
 * - Category breakdown preview (grants, insurance, mortgage)
 * - Urgency indicators (deadlines, limited time)
 * - Glassmorphic luxury design
 * - One-click navigation to full reveal experience
 * 
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, ArrowRight, TrendingUp, Clock, Star, Zap } from 'lucide-react';

interface OpportunityCategory {
  name: string;
  value: number;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface UnclaimedOpportunitiesCardProps {
  onNavigate: () => void;
  totalValue?: number;
  totalCount?: number;
  categories?: OpportunityCategory[];
  urgentCount?: number;
  compact?: boolean;
}

export function UnclaimedOpportunitiesCard({ 
  onNavigate,
  totalValue = 23500,
  totalCount = 8,
  categories = [
    { name: 'Grants', value: 18000, count: 3, icon: Gift },
    { name: 'Mortgage', value: 4188, count: 1, icon: TrendingUp },
    { name: 'Insurance', value: 672, count: 1, icon: Sparkles },
  ],
  urgentCount = 2,
  compact = false
}: UnclaimedOpportunitiesCardProps) {
  const [valueCounter, setValueCounter] = useState(0);
  const [countCounter, setCountCounter] = useState(0);

  // Animated value counter
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const valueIncrement = totalValue / steps;
    const countIncrement = totalCount / steps;
    let currentValue = 0;
    let currentCount = 0;

    const interval = setInterval(() => {
      currentValue += valueIncrement;
      currentCount += countIncrement;
      
      if (currentValue >= totalValue) {
        setValueCounter(totalValue);
        setCountCounter(totalCount);
        clearInterval(interval);
      } else {
        setValueCounter(Math.floor(currentValue));
        setCountCounter(Math.floor(currentCount));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [totalValue, totalCount]);

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
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgb(var(--color-goldenrod)), rgb(214, 158, 46))',
                boxShadow: 'var(--glow-medium)',
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Gift className="w-6 h-6 text-white" />
              </motion.div>
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
                Unclaimed Opportunities
              </h3>
              <p 
                className="text-white/60"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-xs)',
                }}
              >
                Found by PolicyAngel AI
              </p>
            </div>
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
          </motion.div>
        </div>

        {/* AI Discovery Badge */}
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
          style={{
            background: 'rgba(var(--color-goldenrod), 0.1)',
            border: '1px solid rgba(var(--color-goldenrod), 0.2)',
          }}
        >
          <Star className="w-3 h-3 text-amber-400" />
          <span 
            className="text-amber-400"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {countCounter} Opportunities Discovered
          </span>
        </div>
      </div>

      {/* Main Value Display */}
      <motion.div 
        className="relative z-10 p-6 rounded-2xl mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))',
          border: '2px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)',
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p 
          className="text-emerald-400/70 mb-2"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-sm)',
          }}
        >
          Total Opportunity Value
        </p>
        <div className="flex items-baseline gap-2">
          <motion.p 
            className="text-white"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-5xl)',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ${valueCounter.toLocaleString()}
          </motion.p>
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp className="w-8 h-8 text-emerald-400" />
          </motion.div>
        </div>
        <p 
          className="text-emerald-400/70 mt-2"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-sm)',
          }}
        >
          in hidden savings & grants
        </p>
      </motion.div>

      {/* Urgency Indicator */}
      {urgentCount > 0 && !compact && (
        <div 
          className="relative z-10 p-3 rounded-xl mb-4"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Clock className="w-4 h-4 text-red-400" />
              </motion.div>
              <span 
                className="text-white"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {urgentCount} time-sensitive opportunities
              </span>
            </div>
            <span 
              className="text-red-400"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              Act Soon
            </span>
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      {!compact && (
        <div 
          className="relative z-10 mb-4"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
          }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="flex items-center justify-between p-2 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span 
                    className="text-white/70"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    {category.name}
                  </span>
                  <span 
                    className="text-white/40"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    ({category.count})
                  </span>
                </div>
                <span 
                  className="text-emerald-400"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  ${category.value.toLocaleString()}
                </span>
              </motion.div>
            );
          })}
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
        <Zap className="w-4 h-4" />
        Reveal All Opportunities
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Confetti Effect Indicator */}
      <div className="relative z-10 mt-3 flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-white/40" />
        <p 
          className="text-white/40 text-center"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-xs)',
          }}
        >
          AI analyzed {totalCount} databases to find these opportunities
        </p>
      </div>
    </motion.div>
  );
}
