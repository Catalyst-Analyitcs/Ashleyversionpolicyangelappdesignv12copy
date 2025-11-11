/**
 * ==============================================================================
 * WEATHERALERTBANNER.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Scrolling weather alert banner for severe weather warnings.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. SCROLLING TEXT:
 *    - react-native-marquee or custom animation
 *    - Use Animated.View with translateX
 *    - Loop animation with withRepeat
 * 
 * 2. SEVERITY STYLING:
 *    - Color-coded backgrounds (warning/severe/extreme)
 *    - Icon selection based on type
 * 
 * 3. DISMISSIBLE:
 *    - X button to hide banner
 *    - Store dismissed state
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Banner displays
 * - [ ] Text scrolls smoothly
 * - [ ] Dismiss works
 * - [ ] Colors correct for severity
 * - [ ] iOS and Android compatible
 * 
 */

import { motion } from "motion/react";
import { AlertTriangle, Cloud, Zap, Wind } from "lucide-react";
import { useEffect, useState } from "react";

interface WeatherAlertBannerProps {
  message: string;
  severity?: 'warning' | 'severe' | 'extreme';
}

export function WeatherAlertBanner({ 
  message, 
  severity = 'warning' 
}: WeatherAlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Duration for one complete scroll (in seconds) - slower for readability
  const scrollDuration = 20;
  const totalScrolls = 5;
  
  // Determine storm type from message
  const getStormType = () => {
    const msg = message.toLowerCase();
    if (msg.includes('wind') || msg.includes('gust')) return 'wind';
    if (msg.includes('thunder') || msg.includes('lightning')) return 'lightning';
    if (msg.includes('rain') || msg.includes('flood')) return 'rain';
    return 'general';
  };
  
  const stormType = getStormType();
  
  // Hide banner after total time for 5 scrolls
  useEffect(() => {
    const totalDuration = scrollDuration * totalScrolls * 1000; // Convert to milliseconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, totalDuration);
    
    return () => clearTimeout(timer);
  }, [scrollDuration, totalScrolls]);

  // Get colors based on severity
  const getSeverityColors = () => {
    switch (severity) {
      case 'extreme':
        return {
          bg: 'rgba(239, 68, 68, 0.95)', // Red
          border: 'rgb(220, 38, 38)',
          text: 'rgb(255, 255, 255)',
        };
      case 'severe':
        return {
          bg: 'rgba(249, 115, 22, 0.95)', // Orange
          border: 'rgb(234, 88, 12)',
          text: 'rgb(255, 255, 255)',
        };
      case 'warning':
      default:
        return {
          bg: 'rgba(251, 191, 36, 0.95)', // Yellow/Amber
          border: 'rgb(245, 158, 11)',
          text: 'rgb(24, 24, 27)',
        };
    }
  };

  const colors = getSeverityColors();

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* News ticker banner */}
      <div
        style={{
          backgroundColor: colors.bg,
          borderTop: `2px solid ${colors.border}`,
          borderBottom: `2px solid ${colors.border}`,
          padding: 'var(--spacing-2) 0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 -4px 12px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Storm-specific animated background effects */}
        
        {/* Wind effect - horizontal streaks */}
        {stormType === 'wind' && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`wind-${i}`}
                animate={{
                  x: ['-100%', '200%'],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.4,
                }}
                style={{
                  position: 'absolute',
                  top: `${20 + i * 15}%`,
                  left: 0,
                  width: '100px',
                  height: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '2px',
                  pointerEvents: 'none',
                }}
              />
            ))}
          </>
        )}
        
        {/* Lightning effect - flashing overlay */}
        {stormType === 'lightning' && (
          <motion.div
            animate={{
              opacity: [0, 0, 0.8, 0, 0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.1, 0.15, 0.2, 0.25, 0.3],
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              pointerEvents: 'none',
            }}
          />
        )}
        
        {/* Rain effect - diagonal falling lines */}
        {stormType === 'rain' && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`rain-${i}`}
                animate={{
                  y: ['-100%', '200%'],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 1.5 + i * 0.2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.2,
                }}
                style={{
                  position: 'absolute',
                  left: `${i * 12}%`,
                  top: 0,
                  width: '1.5px',
                  height: '30px',
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '2px',
                  transform: 'rotate(15deg)',
                  pointerEvents: 'none',
                }}
              />
            ))}
          </>
        )}
        
        {/* General storm - pulsing glow */}
        {stormType === 'general' && (
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(ellipse at center, ${colors.border} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
        )}
        {/* Animated scrolling text - continuous seamless loop */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: scrollDuration,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            willChange: 'transform',
          }}
        >
          {/* First instance of message */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-3)',
              paddingRight: 'var(--spacing-12)',
            }}
          >
            <AlertTriangle
              style={{
                width: '20px',
                height: '20px',
                color: colors.text,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-sm)',
                color: colors.text,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              {message}
            </span>
            <div
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: colors.text,
                borderRadius: '50%',
                flexShrink: 0,
                marginLeft: 'var(--spacing-3)',
              }}
            />
          </div>
          
          {/* Second instance of message - creates seamless loop */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-3)',
              paddingRight: 'var(--spacing-12)',
            }}
          >
            <AlertTriangle
              style={{
                width: '20px',
                height: '20px',
                color: colors.text,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-sm)',
                color: colors.text,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              {message}
            </span>
            <div
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: colors.text,
                borderRadius: '50%',
                flexShrink: 0,
                marginLeft: 'var(--spacing-3)',
              }}
            />
          </div>
        </motion.div>

        {/* Breaking News label (static on left) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 'var(--spacing-4)',
            paddingRight: 'var(--spacing-4)',
            backgroundColor: colors.border,
            borderRight: `2px solid ${colors.text}`,
          }}
        >
          <span
            style={{
              fontFamily: 'Roboto',
              fontSize: 'var(--text-xs)',
              color: 'rgb(255, 255, 255)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {severity === 'extreme' ? '⚠ ALERT' : severity === 'severe' ? '⚠ WARNING' : 'WEATHER'}
          </span>
        </div>
      </div>
    </div>
  );
}
