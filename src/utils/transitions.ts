/**
 * ==============================================================================
 * TRANSITIONS.TS - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Global transition constants for Framer Motion animations.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. ANIMATION LIBRARY:
 *    - Convert from Framer Motion → react-native-reanimated v3
 *    - Spring configs remain similar
 *    - Timing configs convert to withTiming
 * 
 * 2. SPRING CONFIG CONVERSION:
 *    ```tsx
 *    // Web (Framer Motion)
 *    { type: 'spring', damping: 15, stiffness: 300 }
 *    
 *    // React Native (Reanimated)
 *    import { withSpring } from 'react-native-reanimated';
 *    withSpring(value, { damping: 15, stiffness: 300 })
 *    ```
 * 
 * 3. TWEEN CONFIG CONVERSION:
 *    ```tsx
 *    // Web (Framer Motion)
 *    { duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }
 *    
 *    // React Native (Reanimated)
 *    import { withTiming, Easing } from 'react-native-reanimated';
 *    withTiming(value, { 
 *      duration: 250, // milliseconds
 *      easing: Easing.bezier(0.4, 0.0, 0.2, 1)
 *    })
 *    ```
 * 
 * 4. MOTION VARIANTS CONVERSION:
 *    ```tsx
 *    // Web (Framer Motion)
 *    <motion.div variants={MOTION_VARIANTS.pageEnter} />
 *    
 *    // React Native (Reanimated)
 *    const animatedStyle = useAnimatedStyle(() => ({
 *      opacity: withTiming(isVisible ? 1 : 0, { duration: 350 }),
 *      transform: [{ translateY: withTiming(isVisible ? 0 : 20) }]
 *    }));
 *    <Animated.View style={animatedStyle} />
 *    ```
 * 
 * 5. PREFERS-REDUCED-MOTION:
 *    - Use AccessibilityInfo from react-native
 *    - Or expo-constants for device info
 * 
 * ==============================================================================
 * RECOMMENDED: Create similar constants file for Reanimated
 * See COMPLETE_CONVERSION_EXAMPLE.md for full patterns
 * ==============================================================================
 * 
 */

/**
 * Global Transition System
 * Unified animation and transition values consumed from CSS variables
 * Use these throughout the app for consistent motion design
 */

// Duration values (in seconds for Motion, milliseconds for CSS)
export const TRANSITION_DURATION = {
  instant: 0,
  fast: 0.15,
  normal: 0.25,
  slow: 0.35,
  slower: 0.5,
  cinematic: 0.7,
} as const;

// Easing curves - Material Design 3.0
export const TRANSITION_EASE = {
  standard: [0.4, 0.0, 0.2, 1] as const,      // Default for most transitions
  decelerate: [0.0, 0.0, 0.2, 1] as const,    // Elements entering screen
  accelerate: [0.4, 0.0, 1, 1] as const,      // Elements leaving screen
  emphasized: [0.05, 0.7, 0.1, 1.0] as const, // Dramatic, attention-grabbing
  bounce: [0.68, -0.55, 0.265, 1.55] as const, // Playful bounce effect
} as const;

// Motion/Framer Motion spring configurations
export const SPRING_CONFIG = {
  bounce: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 300,
  },
  smooth: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 400,
    mass: 0.8,
  },
  tight: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 500,
  },
} as const;

// Motion/Framer Motion tween configurations
export const TWEEN_CONFIG = {
  fast: {
    duration: TRANSITION_DURATION.fast,
    ease: TRANSITION_EASE.standard,
  },
  normal: {
    duration: TRANSITION_DURATION.normal,
    ease: TRANSITION_EASE.standard,
  },
  slow: {
    duration: TRANSITION_DURATION.slow,
    ease: TRANSITION_EASE.decelerate,
  },
} as const;

// Component-specific transition presets for Motion
export const MOTION_VARIANTS = {
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: TWEEN_CONFIG.slow,
  },
  
  // Modal/Dialog transitions
  modal: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: TWEEN_CONFIG.normal,
  },
  
  // Drawer transitions
  drawer: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { ...TWEEN_CONFIG.normal, ease: TRANSITION_EASE.emphasized },
  },
  
  // Dropdown transitions
  dropdown: {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
    transition: TWEEN_CONFIG.fast,
  },
  
  // Card transitions
  card: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: TWEEN_CONFIG.normal,
  },
  
  // Button hover/tap
  button: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: TWEEN_CONFIG.fast,
  },
  
  // Fade transitions
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: TWEEN_CONFIG.normal,
  },
  
  // Crossfade transition (for navigation)
  crossfade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.3,
      ease: TRANSITION_EASE.standard,
    },
  },
  
  // Blur transitions
  blurIn: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    transition: TWEEN_CONFIG.slow,
  },
  
  blurOut: {
    initial: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(8px)' },
    transition: TWEEN_CONFIG.normal,
  },
} as const;

// Stagger delays for list animations
export const STAGGER_DELAY = {
  1: 0,
  2: 0.04,
  3: 0.08,
  4: 0.12,
  5: 0.16,
} as const;

// Scale values for interactive states
export const SCALE = {
  hover: 1.05,
  active: 0.95,
  pressed: 0.97,
  expanded: 1.02,
} as const;

// Transform origins
export const TRANSFORM_ORIGIN = {
  top: 'top center',
  bottom: 'bottom center',
  left: 'center left',
  right: 'center right',
  center: 'center center',
} as const;

/**
 * Helper function to create staggered children animations
 * @param delayIncrement - Delay between each child (in seconds)
 * @param staggerChildren - Initial delay before starting (in seconds)
 */
export function createStaggerVariants(
  delayIncrement = 0.04,
  staggerChildren = 0
) {
  return {
    container: {
      animate: {
        transition: {
          staggerChildren,
          delayChildren: staggerChildren,
        },
      },
    },
    item: {
      initial: { opacity: 0, y: 10 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: TRANSITION_DURATION.normal,
          ease: TRANSITION_EASE.standard,
        },
      },
    },
  };
}

/**
 * Helper to get CSS variable value from the document
 * @param varName - CSS variable name (e.g., '--transition-duration-fast')
 */
export function getCSSVar(varName: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

/**
 * Accessible motion settings - respects user's motion preferences
 */
export function getMotionPreference(): 'reduced' | 'full' {
  if (typeof window === 'undefined') return 'full';
  
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  return prefersReducedMotion ? 'reduced' : 'full';
}

/**
 * Create transition props that respect motion preferences
 */
export function createAccessibleTransition(
  transition: typeof TWEEN_CONFIG[keyof typeof TWEEN_CONFIG]
) {
  const motionPref = getMotionPreference();
  
  if (motionPref === 'reduced') {
    return {
      duration: 0.15,
      ease: 'linear' as const,
    };
  }
  
  return transition;
}
