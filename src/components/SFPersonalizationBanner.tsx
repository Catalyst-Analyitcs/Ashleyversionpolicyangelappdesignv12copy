/**
 * SF PERSONALIZATION BANNER
 * 
 * Displays geographically-relevant context for San Francisco properties
 * Shows local landmarks, neighborhood info, and personalized messaging
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, TrendingUp, Home } from 'lucide-react';
import { getLandmarkReference, getNeighborhoodInsights, SF_NEIGHBORHOODS } from '../utils/geoPersonalization';

interface SFPersonalizationBannerProps {
  neighborhood?: string;
  showLandmark?: boolean;
  compact?: boolean;
}

export function SFPersonalizationBanner({ 
  neighborhood = 'Pacific Heights', 
  showLandmark = true,
  compact = false 
}: SFPersonalizationBannerProps) {
  const insights = getNeighborhoodInsights(neighborhood);
  const landmark = getLandmarkReference(neighborhood);
  const hoodData = SF_NEIGHBORHOODS[neighborhood as keyof typeof SF_NEIGHBORHOODS];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-white/70 text-sm"
      >
        <MapPin className="w-4 h-4 text-amber-400" />
        <span>{landmark}</span>
        <span className="text-white/40">•</span>
        <span>{neighborhood}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-cyan-500/10 to-purple-500/10 border border-amber-500/20 backdrop-blur-xl"
    >
      <div className="flex items-start gap-4">
        {showLandmark && (
          <div className="text-4xl" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}>
            {hoodData?.emoji || '🌉'}
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h3 className="text-white">{neighborhood}</h3>
          </div>
          
          {hoodData && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-white/60 text-xs">Median Price</p>
                  <p className="text-white">${(hoodData.medianPrice / 1000000).toFixed(1)}M</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-white/60 text-xs">Annual Growth</p>
                  <p className="text-emerald-400">+{hoodData.appreciation}%</p>
                </div>
              </div>
            </div>
          )}
          
          {insights[0] && (
            <p className="text-white/70 text-xs mt-3 pt-3 border-t border-white/10">
              {insights[0].description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
