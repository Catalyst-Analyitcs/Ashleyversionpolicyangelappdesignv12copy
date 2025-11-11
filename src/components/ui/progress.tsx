/**
 * REACT NATIVE CONVERSION - Progress Component
 * 
 * COMPLEXITY: LOW
 * CONVERSION APPROACH: Use Animated View or react-native-progress
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-progress → Animated View or react-native-progress
 * 
 * RECOMMENDED PACKAGES:
 * - react-native-progress (pre-built progress bars)
 * - react-native-reanimated (for custom animations)
 * - Or use built-in Animated API
 * 
 * KEY CONVERSION NOTES:
 * 1. Simple component to convert
 * 2. Animate width/transform for progress
 * 3. Support determinate and indeterminate states
 * 4. Add loading animation for indeterminate
 * 5. Smooth transitions with timing functions
 * 
 * REACT NATIVE IMPLEMENTATION (Custom):
 * ```tsx
 * import { View, Animated } from 'react-native';
 * import { useEffect, useRef } from 'react';
 * 
 * interface ProgressProps {
 *   value?: number; // 0-100
 *   height?: number;
 *   color?: string;
 *   backgroundColor?: string;
 *   borderRadius?: number;
 *   indeterminate?: boolean;
 * }
 * 
 * export function Progress({
 *   value = 0,
 *   height = 8,
 *   color = '#D4AF37',
 *   backgroundColor = 'rgba(212, 175, 55, 0.2)',
 *   borderRadius = 999,
 *   indeterminate = false,
 * }: ProgressProps) {
 *   const progress = useRef(new Animated.Value(0)).current;
 * 
 *   useEffect(() => {
 *     Animated.timing(progress, {
 *       toValue: value,
 *       duration: 300,
 *       useNativeDriver: false, // Cannot use native driver for width
 *     }).start();
 *   }, [value]);
 * 
 *   const width = progress.interpolate({
 *     inputRange: [0, 100],
 *     outputRange: ['0%', '100%'],
 *   });
 * 
 *   if (indeterminate) {
 *     return <IndeterminateProgress height={height} color={color} />;
 *   }
 * 
 *   return (
 *     <View
 *       style={{
 *         height,
 *         width: '100%',
 *         backgroundColor,
 *         borderRadius,
 *         overflow: 'hidden',
 *       }}
 *       accessibilityRole="progressbar"
 *       accessibilityValue={{ now: value, min: 0, max: 100 }}
 *     >
 *       <Animated.View
 *         style={{
 *           height: '100%',
 *           width,
 *           backgroundColor: color,
 *           borderRadius,
 *         }}
 *       />
 *     </View>
 *   );
 * }
 * 
 * // Indeterminate loading animation
 * function IndeterminateProgress({
 *   height,
 *   color,
 * }: {
 *   height: number;
 *   color: string;
 * }) {
 *   const animatedValue = useRef(new Animated.Value(0)).current;
 * 
 *   useEffect(() => {
 *     Animated.loop(
 *       Animated.sequence([
 *         Animated.timing(animatedValue, {
 *           toValue: 1,
 *           duration: 1500,
 *           useNativeDriver: true,
 *         }),
 *         Animated.timing(animatedValue, {
 *           toValue: 0,
 *           duration: 0,
 *           useNativeDriver: true,
 *         }),
 *       ])
 *     ).start();
 *   }, []);
 * 
 *   const translateX = animatedValue.interpolate({
 *     inputRange: [0, 1],
 *     outputRange: ['-100%', '100%'],
 *   });
 * 
 *   return (
 *     <View
 *       style={{
 *         height,
 *         width: '100%',
 *         backgroundColor: 'rgba(212, 175, 55, 0.2)',
 *         borderRadius: 999,
 *         overflow: 'hidden',
 *       }}
 *     >
 *       <Animated.View
 *         style={{
 *           height: '100%',
 *           width: '50%',
 *           backgroundColor: color,
 *           transform: [{ translateX }],
 *         }}
 *       />
 *     </View>
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Package):
 * ```tsx
 * import * as Progress from 'react-native-progress';
 * 
 * export function ProgressBar({ value }: { value: number }) {
 *   return (
 *     <Progress.Bar
 *       progress={value / 100}
 *       width={null} // Full width
 *       height={8}
 *       color="#D4AF37"
 *       unfilledColor="rgba(212, 175, 55, 0.2)"
 *       borderWidth={0}
 *       borderRadius={999}
 *       animated
 *     />
 *   );
 * }
 * 
 * export function CircularProgress({ value }: { value: number }) {
 *   return (
 *     <Progress.Circle
 *       progress={value / 100}
 *       size={60}
 *       thickness={6}
 *       color="#D4AF37"
 *       unfilledColor="rgba(212, 175, 55, 0.2)"
 *       borderWidth={0}
 *       showsText
 *       textStyle={{ color: '#fff', fontSize: 14, fontWeight: '600' }}
 *     />
 *   );
 * }
 * ```
 * 
 * PROGRESS VARIANTS:
 * ```tsx
 * // Linear progress (default)
 * <Progress value={75} />
 * 
 * // Circular progress
 * <Progress.Circle progress={0.75} size={60} />
 * 
 * // Pie chart progress
 * <Progress.Pie progress={0.75} size={60} />
 * 
 * // Indeterminate loading
 * <Progress indeterminate />
 * ```
 * 
 * WITH LABELS:
 * ```tsx
 * export function ProgressWithLabel({
 *   value,
 *   label,
 * }: {
 *   value: number;
 *   label?: string;
 * }) {
 *   return (
 *     <View>
 *       <View style={styles.labelRow}>
 *         <Text style={styles.label}>{label}</Text>
 *         <Text style={styles.percentage}>{value}%</Text>
 *       </View>
 *       <Progress value={value} />
 *     </View>
 *   );
 * }
 * 
 * const styles = {
 *   labelRow: {
 *     flexDirection: 'row',
 *     justifyContent: 'space-between',
 *     marginBottom: 8,
 *   },
 *   label: {
 *     color: 'rgba(255, 255, 255, 0.9)',
 *     fontSize: 14,
 *     fontWeight: '500',
 *   },
 *   percentage: {
 *     color: '#D4AF37',
 *     fontSize: 14,
 *     fontWeight: '600',
 *   },
 * };
 * ```
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - Upload progress: Document/photo upload (0-100%)
 * - Inspection completion: Checklist progress (5/10 items)
 * - Property verification: Multi-step form progress
 * - Report generation: Processing status
 * - Data sync: Background sync progress
 * - Onboarding: Tutorial step progress
 * 
 * ACCESSIBILITY:
 * - accessibilityRole="progressbar"
 * - accessibilityValue={{ now: value, min: 0, max: 100 }}
 * - accessibilityLabel describing what is loading
 * - Announce completion with accessibilityLiveRegion
 * 
 * ANIMATION:
 * - Smooth transitions with Animated.timing
 * - Duration: 200-300ms for value changes
 * - Easing: Linear or ease-out
 * - Use native driver when possible (transform only)
 * - Loop animation for indeterminate state
 * 
 * STYLING NOTES:
 * - Height: 4-8px for bars
 * - Border radius: Full (999) for rounded ends
 * - Color: Golden #D4AF37 for progress
 * - Background: Semi-transparent golden rgba(212, 175, 55, 0.2)
 * - No borders for clean look
 * 
 * PERFORMANCE:
 * - Use native driver for transform animations
 * - Avoid animating width on native driver (use transform: translateX)
 * - Memoize progress component if value changes frequently
 * - Debounce rapid value updates
 */

"use client";

import * as React from "react";
// WEB: Radix UI for accessible progress indicator
// REACT NATIVE: Animated View or react-native-progress package
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";

import { cn } from "./utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  // WEB: Progress bar with animated indicator
  // REACT NATIVE: Animated View with interpolated width
  // 
  // Simple implementation:
  // const progress = useRef(new Animated.Value(0)).current;
  // 
  // useEffect(() => {
  //   Animated.timing(progress, {
  //     toValue: value || 0,
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();
  // }, [value]);
  // 
  // const width = progress.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: ['0%', '100%'],
  // });
  // 
  // return (
  //   <View
  //     style={{
  //       height: 8,
  //       width: '100%',
  //       backgroundColor: 'rgba(212, 175, 55, 0.2)',
  //       borderRadius: 999,
  //       overflow: 'hidden',
  //     }}
  //     accessibilityRole="progressbar"
  //     accessibilityValue={{ now: value, min: 0, max: 100 }}
  //   >
  //     <Animated.View
  //       style={{
  //         height: '100%',
  //         width,
  //         backgroundColor: '#D4AF37',
  //       }}
  //     />
  //   </View>
  // );
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        // REACT NATIVE: Use Animated.Value interpolation instead of CSS transform
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
