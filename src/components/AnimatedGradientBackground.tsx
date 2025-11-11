/**
 * ==============================================================================
 * ANIMATEDGRADIENTBACKGROUND.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Animated multi-layer gradient background used for visual depth.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. GRADIENTS:
 *    - expo-linear-gradient for gradient layers
 *    - Multiple LinearGradient components stacked
 * 
 * 2. ANIMATIONS:
 *    - react-native-reanimated for movement
 *    - Animate transform properties
 *    - Use withRepeat for infinite loops
 * 
 * 3. PERFORMANCE:
 *    - Reduce animation complexity on Android
 *    - Consider static gradient as fallback
 *    - Use shouldRasterizeIOS for better performance
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Gradient renders
 * - [ ] Animation smooth
 * - [ ] No performance issues
 * - [ ] iOS and Android compatible
 * 
 */

// RN: React imports remain the same
import React from 'react';
// RN: Replace motion/react with react-native-reanimated v3
// RN: import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
// RN: import { View, StyleSheet, Dimensions } from 'react-native';
// RN: import LinearGradient from 'expo-linear-gradient';
import { motion } from 'motion/react';
// RN: useTheme hook works the same way in React Native
import { useTheme } from './ThemeProvider';

// RN: Interface props remain identical
interface AnimatedGradientBackgroundProps {
  className?: string; // RN: Not used in RN, but can keep for compatibility
  intensity?: number; // RN: Used for blur intensity (if supported)
}

// RN: Functional component structure remains the same
export const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({ 
  className = '', // RN: Ignored in React Native
  intensity = 20, // RN: Default blur intensity (may not be supported on all devices)
}) => {
  // RN: useTheme hook works identically
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // RN: Get device dimensions for responsive sizing
  // RN: const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  return (
    // RN: Replace div with View component
    // RN: <View style={[styles.container, { backgroundColor: isDark ? COLORS.appBgEnd : COLORS.appBgStart }]}>
    <div 
      className={`fixed inset-0 overflow-hidden ${className}`}
      style={{ 
        zIndex: 0, // RN: zIndex works the same in React Native
        backgroundColor: isDark ? 'var(--app-bg-end)' : 'var(--app-bg-start)', // RN: Use design tokens
      }}
    >
      {/* RN: Deep Background Layer 1 - Large slow movement */}
      {/* RN: Replace motion.div with Animated.View */}
      {/* RN: const animatedStyle1 = useAnimatedStyle(() => {
        RN:   return {
        RN:     opacity: withRepeat(withSequence(
        RN:       withTiming(0.3, { duration: 0 }),
        RN:       withTiming(0.7, { duration: 8750 }),
        RN:       withTiming(0.4, { duration: 8750 }),
        RN:       withTiming(0.3, { duration: 17500 })
        RN:     ), -1, false),
        RN:     transform: [
        RN:       { translateX: withRepeat(withSequence(...), -1, false) },
        RN:       { translateY: withRepeat(withSequence(...), -1, false) },
        RN:       { scale: withRepeat(withSequence(...), -1, false) },
        RN:       { rotate: withRepeat(withSequence(...), -1, false) + 'deg' },
        RN:     ],
        RN:   };
        RN: });
      */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '400vw', // RN: Use screenWidth * 4 for responsive sizing
          height: '400vh', // RN: Use screenHeight * 4
          left: '-80vw', // RN: Convert to absolute pixels: -screenWidth * 0.8
          top: '-60vh', // RN: Convert to absolute pixels: -screenHeight * 0.6
          zIndex: 1, // RN: zIndex works the same
          backgroundColor: isDark 
            ? 'rgba(59, 130, 246, 0.15)' // RN: COLORS.blue500 with 0.15 opacity
            : 'rgba(30, 58, 138, 0.12)', // RN: COLORS.blue900 with 0.12 opacity
        }}
        initial={{
          opacity: 0.3, // RN: Starting opacity
          x: '-20vw', // RN: Convert to pixels: -screenWidth * 0.2
          y: '-10vh', // RN: Convert to pixels: -screenHeight * 0.1
          scale: 0.6, // RN: Scale works the same
          rotate: 0, // RN: Rotation in degrees
        }}
        animate={{
          opacity: [0.3, 0.7, 0.4, 0.3], // RN: Keyframe sequence
          x: ['-20vw', '30vw', '-10vw', '-20vw'], // RN: Convert all to pixels
          y: ['-10vh', '20vh', '-5vh', '-10vh'], // RN: Convert all to pixels
          scale: [0.6, 1.4, 1.0, 0.6], // RN: Scale keyframes
          rotate: [0, 15, -10, 0], // RN: Rotation keyframes in degrees
        }}
        transition={{
          duration: 35, // RN: 35 second animation cycle
          repeat: Infinity, // RN: Use withRepeat(-1) for infinite
          ease: 'linear', // RN: Use Easing.linear
        }}
      />

      {/* RN: Deep Background Layer 2 - Medium movement */}
      {/* RN: PERFORMANCE NOTE: Consider reducing animation complexity on Android */}
      {/* RN: Use Platform.OS === 'android' to conditionally simplify animations */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '400vw', // RN: screenWidth * 4
          height: '400vh', // RN: screenHeight * 4
          right: '-60vw', // RN: Position from right: screenWidth - (screenWidth * 0.6)
          top: '20vh', // RN: screenHeight * 0.2
          zIndex: 2, // RN: Layer 2 - higher than layer 1
          backgroundColor: isDark 
            ? 'rgba(49, 130, 206, 0.12)' // RN: COLORS.copaBlue with 0.12 alpha
            : 'rgba(29, 78, 216, 0.10)', // RN: COLORS.blue700 with 0.10 alpha
        }}
        initial={{
          opacity: 0.25, // RN: Initial transparency
          x: '30vw', // RN: screenWidth * 0.3
          y: '15vh', // RN: screenHeight * 0.15
          scale: 0.8, // RN: Start at 80% size
          rotate: 10, // RN: 10 degree initial rotation
        }}
        animate={{
          opacity: [0.25, 0.6, 0.35, 0.25], // RN: 4-step opacity cycle
          x: ['30vw', '-20vw', '10vw', '30vw'], // RN: Convert all to pixels
          y: ['15vh', '-10vh', '5vh', '15vh'], // RN: Vertical movement cycle
          scale: [0.8, 1.3, 0.9, 0.8], // RN: Pulsing scale effect
          rotate: [10, -20, 5, 10], // RN: Rotation cycle
        }}
        transition={{
          duration: 28, // RN: 28 second cycle (faster than layer 1)
          repeat: Infinity, // RN: withRepeat(-1)
          ease: 'linear', // RN: Easing.linear for smooth continuous motion
          delay: 5, // RN: Start 5 seconds after mount for stagger effect
        }}
      />

      {/* RN: Deep Background Layer 3 - Diagonal movement */}
      {/* RN: Smaller circles for lighter visual weight */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '280vw', // RN: screenWidth * 2.8 (smaller than deep layers)
          height: '280vh', // RN: screenHeight * 2.8
          left: '20vw', // RN: screenWidth * 0.2
          bottom: '-40vh', // RN: Position from bottom: -screenHeight * 0.4
          zIndex: 3, // RN: Layer 3 stacking order
          backgroundColor: isDark 
            ? 'rgba(37, 99, 235, 0.10)' // RN: COLORS.blue600 with alpha
            : 'rgba(30, 64, 175, 0.08)', // RN: COLORS.blue800 with alpha
        }}
        initial={{
          opacity: 0.2, // RN: More transparent than layers 1-2
          x: '10vw', // RN: screenWidth * 0.1
          y: '20vh', // RN: screenHeight * 0.2
          scale: 1.0, // RN: Start at normal size
          rotate: -15, // RN: -15 degree tilt
        }}
        animate={{
          opacity: [0.2, 0.5, 0.3, 0.2], // RN: Subtle opacity pulsing
          x: ['10vw', '-25vw', '5vw', '10vw'], // RN: Wide horizontal movement
          y: ['20vh', '-15vh', '10vh', '20vh'], // RN: Diagonal path
          scale: [1.0, 1.5, 1.1, 1.0], // RN: Significant scale variation
          rotate: [-15, 25, -5, -15], // RN: Large rotation swing
        }}
        transition={{
          duration: 32, // RN: 32 second cycle
          repeat: Infinity, // RN: Infinite loop
          ease: 'linear', // RN: Constant speed
          delay: 8, // RN: 8 second delay creates visual rhythm
        }}
      />

      {/* RN: Mid-tone Layer 1 - Fast circular movement */}
      {/* RN: Full 360° rotation creates dynamic spinning effect */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '280vw', // RN: screenWidth * 2.8
          height: '280vh', // RN: screenHeight * 2.8
          left: '-30vw', // RN: -screenWidth * 0.3 (off-screen left)
          top: '30vh', // RN: screenHeight * 0.3
          zIndex: 4, // RN: Mid-tone layer - above deep layers
          backgroundColor: isDark 
            ? 'rgba(66, 153, 225, 0.14)' // RN: COLORS.copaBlueBright with alpha
            : 'rgba(37, 99, 235, 0.10)', // RN: COLORS.blue600
        }}
        initial={{
          opacity: 0.4, // RN: More visible than deep layers
          x: '-15vw', // RN: -screenWidth * 0.15
          y: '10vh', // RN: screenHeight * 0.1
          scale: 0.7, // RN: Start smaller
          rotate: 0, // RN: Start at 0 degrees
        }}
        animate={{
          opacity: [0.4, 0.8, 0.5, 0.4], // RN: High opacity peak
          x: ['-15vw', '20vw', '10vw', '-15vw'], // RN: Circular path
          y: ['10vh', '-10vh', '5vh', '10vh'], // RN: Circular path
          scale: [0.7, 1.2, 0.9, 0.7], // RN: Dynamic size changes
          rotate: [0, 180, 270, 360], // RN: Full rotation cycle
        }}
        transition={{
          duration: 38, // RN: Longest cycle for smooth rotation
          repeat: Infinity, // RN: Continuous spinning
          ease: 'linear', // RN: Constant rotation speed
          delay: 3, // RN: 3 second offset
        }}
      />

      {/* RN: Mid-tone Layer 2 - Pulsing movement */}
      {/* RN: Extreme scale variation (0.8 to 1.3) creates breathing effect */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '280vw', // RN: screenWidth * 2.8
          height: '280vh', // RN: screenHeight * 2.8
          right: '-20vw', // RN: Position from right edge: -screenWidth * 0.2
          bottom: '10vh', // RN: screenHeight * 0.1 from bottom
          zIndex: 5, // RN: Above layer 4
          backgroundColor: isDark 
            ? 'rgba(59, 130, 246, 0.12)' // RN: COLORS.blue500 with transparency
            : 'rgba(30, 58, 138, 0.08)', // RN: COLORS.blue900 with transparency
        }}
        initial={{
          opacity: 0.35, // RN: Medium starting opacity
          x: '10vw', // RN: screenWidth * 0.1
          y: '-5vh', // RN: -screenHeight * 0.05
          scale: 1.1, // RN: Slightly enlarged initially
          rotate: 45, // RN: 45 degree starting angle
        }}
        animate={{
          opacity: [0.35, 0.7, 0.45, 0.35], // RN: Pulsing visibility
          x: ['10vw', '-15vw', '5vw', '10vw'], // RN: Moderate horizontal drift
          y: ['-5vh', '10vh', '-2vh', '-5vh'], // RN: Vertical floating
          scale: [1.1, 0.8, 1.3, 1.1], // RN: Dramatic size pulsing
          rotate: [45, -30, 60, 45], // RN: Rotation adds organic movement
        }}
        transition={{
          duration: 25, // RN: Fastest cycle so far (more energetic)
          repeat: Infinity, // RN: Continuous loop
          ease: 'linear', // RN: Steady pace
          delay: 7, // RN: 7 second delay for rhythm variety
        }}
      />

      {/* RN: Mid-tone Neutral Layer - Subtle depth */}
      {/* RN: Gray tones add sophistication and prevent oversaturation */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '280vw', // RN: screenWidth * 2.8
          height: '280vh', // RN: screenHeight * 2.8
          left: '40vw', // RN: screenWidth * 0.4 (off-center placement)
          top: '60vh', // RN: screenHeight * 0.6 (lower portion)
          zIndex: 6, // RN: Layer 6 stacking
          backgroundColor: isDark 
            ? 'rgba(209, 213, 219, 0.06)' // RN: COLORS.gray300 very subtle
            : 'rgba(156, 163, 175, 0.05)', // RN: COLORS.gray400 very subtle
        }}
        initial={{
          opacity: 0.2, // RN: Very subtle starting opacity
          x: '2vw', // RN: screenWidth * 0.02 (minimal offset)
          y: '-3vh', // RN: -screenHeight * 0.03
          scale: 0.9, // RN: Slightly reduced size
          rotate: 60, // RN: 60 degree angle
        }}
        animate={{
          opacity: [0.2, 0.4, 0.25, 0.2], // RN: Gentle opacity variation
          x: ['2vw', '-8vw', '1vw', '2vw'], // RN: Small horizontal drift
          y: ['-3vh', '6vh', '-1vh', '-3vh'], // RN: Gentle vertical float
          scale: [0.9, 1.1, 0.95, 0.9], // RN: Subtle size pulsing
          rotate: [60, -30, 45, 60], // RN: Moderate rotation swing
        }}
        transition={{
          duration: 30, // RN: Medium-speed 30 second cycle
          repeat: Infinity, // RN: Infinite loop
          ease: 'linear', // RN: Smooth continuous motion
          delay: 12, // RN: 12 second delay creates complex layering rhythm
        }}
      />

      {/* RN: Light Accent Layer 1 - Quick floating */}
      {/* RN: Smaller 180vw size creates lighter, more delicate accents */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '180vw', // RN: screenWidth * 1.8 (smaller than mid-tone)
          height: '180vh', // RN: screenHeight * 1.8
          left: '60vw', // RN: screenWidth * 0.6 (far right positioning)
          top: '15vh', // RN: screenHeight * 0.15 (upper area)
          zIndex: 7, // RN: Light accent layer - above mid-tones
          backgroundColor: isDark 
            ? 'rgba(96, 165, 250, 0.08)' // RN: COLORS.blue400 light
            : 'rgba(147, 197, 253, 0.06)', // RN: COLORS.blue300 very light
        }}
        initial={{
          opacity: 0.3, // RN: Light starting opacity
          x: '5vw', // RN: screenWidth * 0.05
          y: '-2vh', // RN: -screenHeight * 0.02
          scale: 0.5, // RN: Small starting size
          rotate: 30, // RN: 30 degree angle
        }}
        animate={{
          opacity: [0.3, 0.6, 0.4, 0.3], // RN: Moderate opacity range
          x: ['5vw', '-10vw', '2vw', '5vw'], // RN: Floating horizontal motion
          y: ['-2vh', '8vh', '-1vh', '-2vh'], // RN: Light vertical drift
          scale: [0.5, 1.0, 0.7, 0.5], // RN: Dynamic size variation
          rotate: [30, -45, 15, 30], // RN: Rotation adds elegance
        }}
        transition={{
          duration: 28, // RN: 28 second cycle
          repeat: Infinity, // RN: Continuous animation
          ease: 'linear', // RN: Constant speed
          delay: 4, // RN: 4 second delay
        }}
      />

      {/* RN: Light Accent Layer 2 - Gentle wave */}
      {/* RN: Wave-like motion with gentle scale changes */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '180vw', // RN: screenWidth * 1.8
          height: '180vh', // RN: screenHeight * 1.8
          left: '-10vw', // RN: -screenWidth * 0.1 (extends off left edge)
          bottom: '40vh', // RN: screenHeight * 0.4 from bottom
          zIndex: 8, // RN: Layer 8 - higher than layer 7
          backgroundColor: isDark 
            ? 'rgba(66, 153, 225, 0.06)' // RN: COLORS.copaBlueLight
            : 'rgba(147, 197, 253, 0.05)', // RN: COLORS.blue300 very subtle
        }}
        initial={{
          opacity: 0.25, // RN: Subtle transparency
          x: '-3vw', // RN: -screenWidth * 0.03
          y: '3vh', // RN: screenHeight * 0.03
          scale: 0.6, // RN: Small scale
          rotate: -20, // RN: -20 degree tilt
        }}
        animate={{
          opacity: [0.25, 0.5, 0.35, 0.25], // RN: Gentle opacity wave
          x: ['-3vw', '8vw', '-1vw', '-3vw'], // RN: Wave-like horizontal motion
          y: ['3vh', '-6vh', '1vh', '3vh'], // RN: Wave-like vertical motion
          scale: [0.6, 0.9, 0.75, 0.6], // RN: Gentle size pulsing
          rotate: [-20, 30, -10, -20], // RN: Rotation enhances wave effect
        }}
        transition={{
          duration: 33, // RN: 33 second wave cycle
          repeat: Infinity, // RN: Infinite gentle waves
          ease: 'linear', // RN: Smooth continuous wave
          delay: 11, // RN: 11 second delay for complex rhythm
        }}
      />

      {/* RN: Light Neutral Accent - Subtle texture */}
      {/* RN: Extremely subtle gray accent - adds texture without color saturation */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '180vw', // RN: screenWidth * 1.8
          height: '180vh', // RN: screenHeight * 1.8
          right: '30vw', // RN: Position from right: screenWidth - (screenWidth * 0.3)
          top: '70vh', // RN: screenHeight * 0.7 (lower area)
          zIndex: 9, // RN: Top accent layer
          backgroundColor: isDark 
            ? 'rgba(229, 231, 235, 0.04)' // RN: COLORS.gray200 barely visible
            : 'rgba(243, 244, 246, 0.04)', // RN: COLORS.gray100 barely visible
        }}
        initial={{
          opacity: 0.15, // RN: Very low starting opacity
          x: '1vw', // RN: screenWidth * 0.01 (minimal offset)
          y: '-1vh', // RN: -screenHeight * 0.01
          scale: 0.4, // RN: Very small starting size
          rotate: 90, // RN: 90 degree right angle
        }}
        animate={{
          opacity: [0.15, 0.3, 0.2, 0.15], // RN: Subtle opacity variation
          x: ['1vw', '-4vw', '0.5vw', '1vw'], // RN: Minimal horizontal drift
          y: ['-1vh', '3vh', '-0.5vh', '-1vh'], // RN: Minimal vertical drift
          scale: [0.4, 0.7, 0.5, 0.4], // RN: Small size pulsing
          rotate: [90, -60, 30, 90], // RN: Large rotation adds interest
        }}
        transition={{
          duration: 26, // RN: 26 second cycle
          repeat: Infinity, // RN: Infinite subtle texture
          ease: 'linear', // RN: Steady pace
          delay: 15, // RN: 15 second delay - latest starting layer
        }}
      />

      {/* RN: Blur Layer - IMPORTANT: Limited blur support in React Native */}
      {/* RN: Option 1: Use expo-blur's BlurView component (RECOMMENDED) */}
      {/* RN: import { BlurView } from 'expo-blur'; */}
      {/* RN: <BlurView
        RN:   intensity={intensity}
        RN:   tint={isDark ? 'dark' : 'light'}
        RN:   style={styles.blurLayer}
        RN: /> */}
      {/* RN: Option 2: Use @react-native-community/blur (for more control) */}
      {/* RN: Option 3: Omit blur on Android for better performance */}
      {/* RN: Platform.select({ ios: <BlurView />, android: null }) */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 20, // RN: Top layer for blur effect
          backdropFilter: `blur(${intensity}px) saturate(1.2)`, // RN: NOT SUPPORTED - use BlurView
          WebkitBackdropFilter: `blur(${intensity}px) saturate(1.2)`, // RN: NOT SUPPORTED
        }}
      />

      {/* RN: Subtle overlay for depth - works perfectly in React Native */}
      {/* RN: Simple View with transparent background - no performance concerns */}
      {/* RN: <View style={[styles.overlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.01)' }]} /> */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 19, // RN: Just below blur layer
          backgroundColor: isDark 
            ? 'rgba(0, 0, 0, 0.02)' // RN: Very subtle dark overlay
            : 'rgba(255, 255, 255, 0.01)', // RN: Very subtle light overlay
        }}
      />
      {/* RN: Close container View */}
      {/* RN: </View> */}
    </div>
  );
};

/**
 * ==============================================================================
 * REACT NATIVE STYLESHEET EXAMPLE
 * ==============================================================================
 * 
 * RN: Complete StyleSheet for AnimatedGradientBackground component
 * 
 * import { StyleSheet, Dimensions } from 'react-native';
 * 
 * const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     position: 'absolute',
 *     top: 0,
 *     left: 0,
 *     right: 0,
 *     bottom: 0,
 *     zIndex: 0,
 *     overflow: 'hidden',
 *   },
 *   // Deep layers - largest, slowest, most transparent
 *   deepLayer: {
 *     position: 'absolute',
 *     borderRadius: screenWidth * 2, // Circular
 *   },
 *   deepLayer1: {
 *     width: screenWidth * 4,
 *     height: screenHeight * 4,
 *     left: -screenWidth * 0.8,
 *     top: -screenHeight * 0.6,
 *     zIndex: 1,
 *   },
 *   deepLayer2: {
 *     width: screenWidth * 4,
 *     height: screenHeight * 4,
 *     right: -screenWidth * 0.6,
 *     top: screenHeight * 0.2,
 *     zIndex: 2,
 *   },
 *   deepLayer3: {
 *     width: screenWidth * 2.8,
 *     height: screenHeight * 2.8,
 *     left: screenWidth * 0.2,
 *     bottom: -screenHeight * 0.4,
 *     zIndex: 3,
 *   },
 *   // Mid-tone layers - medium size, medium speed
 *   midToneLayer: {
 *     position: 'absolute',
 *     borderRadius: screenWidth * 1.4,
 *     width: screenWidth * 2.8,
 *     height: screenHeight * 2.8,
 *   },
 *   // Light accent layers - smallest, fastest
 *   lightAccentLayer: {
 *     position: 'absolute',
 *     borderRadius: screenWidth * 0.9,
 *     width: screenWidth * 1.8,
 *     height: screenHeight * 1.8,
 *   },
 *   // Blur and overlay layers
 *   blurLayer: {
 *     position: 'absolute',
 *     top: 0,
 *     left: 0,
 *     right: 0,
 *     bottom: 0,
 *     zIndex: 20,
 *   },
 *   overlay: {
 *     position: 'absolute',
 *     top: 0,
 *     left: 0,
 *     right: 0,
 *     bottom: 0,
 *     zIndex: 19,
 *   },
 * });
 */

/**
 * ==============================================================================
 * REACT NATIVE REANIMATED IMPLEMENTATION EXAMPLE
 * ==============================================================================
 * 
 * RN: Complete implementation using react-native-reanimated v3
 * 
 * import React from 'react';
 * import { View, StyleSheet, Dimensions } from 'react-native';
 * import Animated, {
 *   useSharedValue,
 *   useAnimatedStyle,
 *   withRepeat,
 *   withSequence,
 *   withTiming,
 *   Easing,
 * } from 'react-native-reanimated';
 * import { BlurView } from 'expo-blur';
 * import { useTheme } from './ThemeProvider';
 * 
 * const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
 * 
 * // Helper to create animated layer with reanimated
 * const AnimatedLayer = ({ 
 *   size, 
 *   position, 
 *   color, 
 *   duration, 
 *   delay,
 *   opacityRange,
 *   translateXRange,
 *   translateYRange,
 *   scaleRange,
 *   rotateRange,
 *   zIndex,
 * }) => {
 *   const animatedStyle = useAnimatedStyle(() => {
 *     return {
 *       opacity: withRepeat(
 *         withSequence(
 *           withTiming(opacityRange[0], { duration: 0 }),
 *           withTiming(opacityRange[1], { duration: duration / 4, easing: Easing.linear }),
 *           withTiming(opacityRange[2], { duration: duration / 4, easing: Easing.linear }),
 *           withTiming(opacityRange[3], { duration: duration / 2, easing: Easing.linear })
 *         ),
 *         -1,
 *         false
 *       ),
 *       transform: [
 *         {
 *           translateX: withRepeat(
 *             withSequence(
 *               withTiming(translateXRange[0], { duration: 0 }),
 *               withTiming(translateXRange[1], { duration: duration / 4, easing: Easing.linear }),
 *               withTiming(translateXRange[2], { duration: duration / 4, easing: Easing.linear }),
 *               withTiming(translateXRange[3], { duration: duration / 2, easing: Easing.linear })
 *             ),
 *             -1,
 *             false
 *           ),
 *         },
 *         {
 *           translateY: withRepeat(
 *             withSequence(
 *               withTiming(translateYRange[0], { duration: 0 }),
 *               withTiming(translateYRange[1], { duration: duration / 4, easing: Easing.linear }),
 *               withTiming(translateYRange[2], { duration: duration / 4, easing: Easing.linear }),
 *               withTiming(translateYRange[3], { duration: duration / 2, easing: Easing.linear })
 *             ),
 *             -1,
 *             false
 *           ),
 *         },
 *         {
 *           scale: withRepeat(
 *             withSequence(
 *               withTiming(scaleRange[0], { duration: 0 }),
 *               withTiming(scaleRange[1], { duration: duration / 4, easing: Easing.linear }),
 *               withTiming(scaleRange[2], { duration: duration / 4, easing: Easing.linear }),
 *               withTiming(scaleRange[3], { duration: duration / 2, easing: Easing.linear })
 *             ),
 *             -1,
 *             false
 *           ),
 *         },
 *         {
 *           rotate: withRepeat(
 *             withSequence(
 *               withTiming(`${rotateRange[0]}deg`, { duration: 0 }),
 *               withTiming(`${rotateRange[1]}deg`, { duration: duration / 4, easing: Easing.linear }),
 *               withTiming(`${rotateRange[2]}deg`, { duration: duration / 4, easing: Easing.linear }),
 *               withTiming(`${rotateRange[3]}deg`, { duration: duration / 2, easing: Easing.linear })
 *             ),
 *             -1,
 *             false
 *           ),
 *         },
 *       ],
 *     };
 *   });
 * 
 *   return (
 *     <Animated.View
 *       style={[
 *         {
 *           position: 'absolute',
 *           width: size.width,
 *           height: size.height,
 *           ...position,
 *           backgroundColor: color,
 *           borderRadius: size.width / 2,
 *           zIndex,
 *         },
 *         animatedStyle,
 *       ]}
 *     />
 *   );
 * };
 * 
 * // Main component
 * export const AnimatedGradientBackground = ({ intensity = 20 }) => {
 *   const { theme } = useTheme();
 *   const isDark = theme === 'dark';
 * 
 *   return (
 *     <View style={[styles.container, { backgroundColor: isDark ? COLORS.appBgEnd : COLORS.appBgStart }]}>
 *       {/* Deep Layer 1 *\/}
 *       <AnimatedLayer
 *         size={{ width: screenWidth * 4, height: screenHeight * 4 }}
 *         position={{ left: -screenWidth * 0.8, top: -screenHeight * 0.6 }}
 *         color={isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(30, 58, 138, 0.12)'}
 *         duration={35000}
 *         delay={0}
 *         opacityRange={[0.3, 0.7, 0.4, 0.3]}
 *         translateXRange={[-screenWidth * 0.2, screenWidth * 0.3, -screenWidth * 0.1, -screenWidth * 0.2]}
 *         translateYRange={[-screenHeight * 0.1, screenHeight * 0.2, -screenHeight * 0.05, -screenHeight * 0.1]}
 *         scaleRange={[0.6, 1.4, 1.0, 0.6]}
 *         rotateRange={[0, 15, -10, 0]}
 *         zIndex={1}
 *       />
 * 
 *       {/* Add remaining 8 layers here... *\/}
 * 
 *       {/* Blur Layer (iOS only for performance) *\/}
 *       {Platform.OS === 'ios' && (
 *         <BlurView
 *           intensity={intensity}
 *           tint={isDark ? 'dark' : 'light'}
 *           style={styles.blurLayer}
 *         />
 *       )}
 * 
 *       {/* Overlay *\/}
 *       <View 
 *         style={[
 *           styles.overlay, 
 *           { backgroundColor: isDark ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.01)' }
 *         ]} 
 *       />
 *     </View>
 *   );
 * };
 */

/**
 * ==============================================================================
 * PERFORMANCE OPTIMIZATION STRATEGIES
 * ==============================================================================
 * 
 * RN: Critical performance considerations for animated backgrounds
 * 
 * 1. REDUCE LAYERS ON ANDROID:
 *    - Android struggles with many simultaneous animations
 *    - Consider reducing from 9 layers to 5 layers on Android
 *    - Use Platform.select() to conditionally render layers
 * 
 * 2. USE shouldRasterizeIOS:
 *    - Add shouldRasterizeIOS: true to animated views
 *    - Converts animated views to bitmaps for better performance
 *    - Trade-off: Uses more memory but smoother animations
 * 
 * 3. DISABLE ON LOW-END DEVICES:
 *    - Use expo-device to detect device tier
 *    - Show static gradient on low-end devices
 *    - Store user preference to disable animations
 * 
 * 4. OPTIMIZE ANIMATION TIMING:
 *    - Use Easing.linear for constant-speed animations
 *    - Avoid complex easing functions (ease-in-out, bezier)
 *    - Keep duration values in multiples of 16ms for 60fps
 * 
 * 5. USE NATIVE DRIVER:
 *    - Reanimated v3 uses native driver by default
 *    - Ensures animations run on UI thread
 *    - 60fps even when JS thread is busy
 * 
 * 6. MINIMIZE RE-RENDERS:
 *    - Use React.memo() for component
 *    - Don't pass inline functions as props
 *    - Memoize color calculations
 * 
 * 7. PROFILE WITH FLIPPER:
 *    - Use Flipper's performance monitor
 *    - Check for dropped frames during animations
 *    - Monitor memory usage over time
 * 
 * EXAMPLE CONDITIONAL RENDERING:
 * 
 * import { Platform } from 'react-native';
 * import * as Device from 'expo-device';
 * 
 * const isLowEndDevice = Device.totalMemory < 3000000000; // Less than 3GB RAM
 * const layerCount = Platform.select({
 *   ios: 9,
 *   android: isLowEndDevice ? 3 : 6,
 * });
 */

/**
 * ==============================================================================
 * TESTING CHECKLIST - REACT NATIVE
 * ==============================================================================
 * 
 * VISUAL TESTS:
 * - [ ] Gradient displays with proper layering (9 layers visible)
 * - [ ] Colors match design system tokens
 * - [ ] Dark and light themes both render correctly
 * - [ ] Blur effect works (iOS) or gracefully degrades (Android)
 * - [ ] No visible seams or gaps between layers
 * - [ ] Overlay provides subtle depth
 * 
 * ANIMATION TESTS:
 * - [ ] All 9 layers animate independently
 * - [ ] Movement appears smooth and organic
 * - [ ] No stuttering or frame drops on mid-range devices
 * - [ ] Animations loop seamlessly (no visible restart)
 * - [ ] Staggered delays create complex visual rhythm
 * - [ ] Rotation, scale, and translation all work together
 * 
 * PERFORMANCE TESTS:
 * - [ ] 60fps maintained on iPhone 11 and newer
 * - [ ] 60fps maintained on Pixel 5 and newer
 * - [ ] No memory leaks after extended use (10+ minutes)
 * - [ ] JS thread stays responsive during animations
 * - [ ] Battery drain is acceptable (< 5% per hour)
 * - [ ] Works on devices with 2GB RAM (with reduced layers)
 * 
 * THEME TESTS:
 * - [ ] Dark mode colors are appropriate (blue tones)
 * - [ ] Light mode colors are appropriate (darker blues)
 * - [ ] Theme switching doesn't cause animation glitches
 * - [ ] Colors have proper alpha/transparency values
 * 
 * EDGE CASES:
 * - [ ] Works in landscape orientation
 * - [ ] Works on tablets (iPad, Android tablets)
 * - [ ] Works on small phones (iPhone SE)
 * - [ ] Works on large phones (iPhone Pro Max)
 * - [ ] Handles orientation changes smoothly
 * - [ ] Works when app returns from background
 * 
 * ACCESSIBILITY:
 * - [ ] Respects "Reduce Motion" system setting
 * - [ ] Disables animations when user has motion sensitivity
 * - [ ] Provides static alternative for accessibility users
 * - [ ] Doesn't interfere with screen reader functionality
 * 
 * PLATFORM-SPECIFIC:
 * - [ ] iOS: Blur effect renders correctly
 * - [ ] Android: Graceful degradation without blur
 * - [ ] iOS: shouldRasterizeIOS improves performance
 * - [ ] Android: Reduced layer count on low-end devices
 * 
 * INTEGRATION TESTS:
 * - [ ] Doesn't block touches to foreground content
 * - [ ] Works behind ScrollView content
 * - [ ] Doesn't interfere with navigation transitions
 * - [ ] Z-index stacking works with other components
 */

/**
 * ==============================================================================
 * ACCESSIBILITY CONSIDERATIONS
 * ==============================================================================
 * 
 * RN: Ensure animated background is accessible to all users
 * 
 * 1. RESPECT REDUCE MOTION:
 * 
 * import { useReducedMotion } from 'react-native-reanimated';
 * 
 * const AnimatedGradientBackground = () => {
 *   const reducedMotion = useReducedMotion();
 *   
 *   if (reducedMotion) {
 *     // Show static gradient
 *     return (
 *       <View style={styles.container}>
 *         <LinearGradient
 *           colors={['rgba(59, 130, 246, 0.15)', 'rgba(37, 99, 235, 0.10)']}
 *           style={StyleSheet.absoluteFill}
 *         />
 *       </View>
 *     );
 *   }
 *   
 *   // Show animated version
 *   return <AnimatedGradientBackgroundFull />;
 * };
 * 
 * 2. PROVIDE USER PREFERENCE:
 *    - Add settings toggle to disable animations
 *    - Store preference in AsyncStorage
 *    - Respect system-wide accessibility settings
 * 
 * 3. ENSURE SUFFICIENT CONTRAST:
 *    - Background should not reduce text readability
 *    - Test with foreground content
 *    - Verify WCAG AA contrast ratios
 */
