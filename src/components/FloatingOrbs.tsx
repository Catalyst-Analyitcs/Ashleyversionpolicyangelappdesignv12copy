/**
 * ==============================================================================
 * FLOATINGORBS.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Animated background with floating orbs, grid patterns, and scan lines.
 * Used in multiple screens for visual depth.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. BACKGROUND PATTERNS:
 *    - Grid pattern → SVG or react-native-svg
 *    - LinearGradient for gradients
 *    - Layer multiple views with position: absolute
 * 
 * 2. ANIMATIONS:
 *    - motion animations → react-native-reanimated
 *    - useSharedValue and useAnimatedStyle
 *    - withRepeat, withTiming for loops
 * 
 * 3. PERFORMANCE:
 *    - Reduce complexity on low-end devices
 *    - Use Platform.select for device-specific settings
 *    - Consider removing on Android if performance issues
 * 
 * ==============================================================================
 * REACT NATIVE EXAMPLE
 * ==============================================================================
 * 
 * import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
 * 
 * const rotation = useSharedValue(0);
 * rotation.value = withRepeat(withTiming(360, { duration: 20000 }), -1);
 * 
 * const animatedStyle = useAnimatedStyle(() => ({
 *   transform: [{ rotate: `${rotation.value}deg` }]
 * }));
 * 
 * <Animated.View style={[styles.orb, animatedStyle]} />
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Background renders
 * - [ ] Animations smooth
 * - [ ] No performance issues
 * - [ ] Works with screen content
 * - [ ] iOS and Android compatible
 * 
 */

import { motion } from "motion/react";

export function FloatingOrbs() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Large Bold Grid Pattern - Wide Spacing */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.2) 2px, transparent 2px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 2px, transparent 2px),
            linear-gradient(rgba(139, 92, 246, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0',
        }}
      />

      {/* Animated Diagonal Scan Lines */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 50px,
              rgba(59, 130, 246, 0.04) 50px,
              rgba(59, 130, 246, 0.04) 100px
            )
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Moving Horizontal Lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`h-line-${i}`}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{
            x: ['100%', '100%'],
            opacity: [0, 0.5, 0.7, 0.5, 0],
          }}
          transition={{
            duration: 8,
            delay: i * 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: `${20 + i * 15}%`,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.9) 50%, transparent 100%)',
            boxShadow: '0 0 16px rgba(59, 130, 246, 0.8)',
          }}
        />
      ))}

      {/* Moving Vertical Lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`v-line-${i}`}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{
            y: ['100%', '100%'],
            opacity: [0, 0.5, 0.7, 0.5, 0],
          }}
          transition={{
            duration: 10,
            delay: i * 1.8,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${15 + i * 18}%`,
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.9) 50%, transparent 100%)',
            boxShadow: '0 0 16px rgba(139, 92, 246, 0.8)',
          }}
        />
      ))}

      {/* Large Pulsing Orbs */}
      {[
        { color: '#3b82f6', x: '15%', y: '20%', size: 300, delay: 0 },
        { color: '#8b5cf6', x: '75%', y: '30%', size: 250, delay: 1 },
        { color: '#10b981', x: '30%', y: '70%', size: 280, delay: 2 },
        { color: '#f59e0b', x: '80%', y: '65%', size: 200, delay: 1.5 },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.9, 1.1, 0.8],
            opacity: [0.1, 0.25, 0.15, 0.25, 0.1],
          }}
          transition={{
            duration: 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color}40 0%, ${orb.color}10 50%, transparent 100%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Crosshair Grid Markers */}
      {[
        { x: '25%', y: '25%' },
        { x: '50%', y: '20%' },
        { x: '75%', y: '30%' },
        { x: '20%', y: '50%' },
        { x: '80%', y: '55%' },
        { x: '30%', y: '75%' },
        { x: '70%', y: '70%' },
      ].map((marker, i) => (
        <motion.div
          key={`marker-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0.8, 0],
            scale: [0, 1, 1, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            delay: i * 0.8,
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            left: marker.x,
            top: marker.y,
            width: '24px',
            height: '24px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: '2px',
              height: '100%',
              backgroundColor: '#3b82f6',
              boxShadow: '0 0 10px #3b82f6',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              height: '2px',
              width: '100%',
              backgroundColor: '#3b82f6',
              boxShadow: '0 0 10px #3b82f6',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '8px',
              height: '8px',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              boxShadow: '0 0 14px #3b82f6',
            }}
          />
        </motion.div>
      ))}

      {/* Radar Sweep Effect */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.15) 60deg, transparent 120deg)',
          borderRadius: '50%',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
}
