/**
 * REACT NATIVE CONVERSION - Separator Component
 * 
 * COMPLEXITY: VERY LOW
 * CONVERSION APPROACH: Simple View with border styling
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-separator → View component
 * 
 * KEY CONVERSION NOTES:
 * 1. Extremely simple component - just a divider line
 * 2. Use View with border or height/width styling
 * 3. Support horizontal and vertical orientations
 * 4. Can be decorative or semantic
 * 
 * REACT NATIVE IMPLEMENTATION:
 * ```tsx
 * import { View, StyleSheet } from 'react-native';
 * 
 * interface SeparatorProps {
 *   orientation?: 'horizontal' | 'vertical';
 *   decorative?: boolean;
 *   style?: any;
 * }
 * 
 * export function Separator({
 *   orientation = 'horizontal',
 *   decorative = true,
 *   style,
 * }: SeparatorProps) {
 *   return (
 *     <View
 *       style={[
 *         styles.separator,
 *         orientation === 'horizontal' ? styles.horizontal : styles.vertical,
 *         style,
 *       ]}
 *       accessibilityRole={decorative ? 'none' : 'separator'}
 *     />
 *   );
 * }
 * 
 * const styles = StyleSheet.create({
 *   separator: {
 *     backgroundColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   horizontal: {
 *     height: 1,
 *     width: '100%',
 *   },
 *   vertical: {
 *     width: 1,
 *     height: '100%',
 *   },
 * });
 * ```
 * 
 * WITH MARGIN/SPACING:
 * ```tsx
 * export function SeparatorWithMargin({
 *   orientation = 'horizontal',
 *   margin = 16,
 * }: SeparatorProps & { margin?: number }) {
 *   return (
 *     <View
 *       style={[
 *         styles.separator,
 *         orientation === 'horizontal'
 *           ? { height: 1, width: '100%', marginVertical: margin }
 *           : { width: 1, height: '100%', marginHorizontal: margin },
 *       ]}
 *     />
 *   );
 * }
 * ```
 * 
 * GRADIENT SEPARATOR:
 * ```tsx
 * import LinearGradient from 'react-native-linear-gradient';
 * 
 * export function GradientSeparator() {
 *   return (
 *     <LinearGradient
 *       colors={['transparent', 'rgba(255, 255, 255, 0.1)', 'transparent']}
 *       start={{ x: 0, y: 0 }}
 *       end={{ x: 1, y: 0 }}
 *       style={{ height: 1, width: '100%' }}
 *     />
 *   );
 * }
 * ```
 * 
 * POLICYANGEL-SPECIFIC STYLING:
 * ```tsx
 * const styles = StyleSheet.create({
 *   separator: {
 *     backgroundColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   separatorLight: {
 *     backgroundColor: 'rgba(255, 255, 255, 0.05)',
 *   },
 *   separatorGolden: {
 *     backgroundColor: 'rgba(212, 175, 55, 0.2)',
 *   },
 *   horizontal: {
 *     height: 1,
 *     width: '100%',
 *   },
 *   vertical: {
 *     width: 1,
 *     height: '100%',
 *   },
 * });
 * ```
 * 
 * USE CASES:
 * - List item dividers
 * - Section separators
 * - Menu item dividers
 * - Card content dividers
 * - Form section dividers
 * - Navigation group separators
 * 
 * ACCESSIBILITY:
 * - accessibilityRole="separator" for semantic separators
 * - accessibilityRole="none" or omit for decorative
 * - Not focusable or interactive
 */

"use client";

import * as React from "react";
// WEB: Radix UI for semantic separator
// REACT NATIVE: Simple View with border styling
import * as SeparatorPrimitive from "@radix-ui/react-separator@1.1.2";

import { cn } from "./utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  // WEB: Semantic separator with ARIA attributes
  // REACT NATIVE: Simple View with styling
  // 
  // import { View } from 'react-native';
  // 
  // <View
  //   style={[
  //     {
  //       backgroundColor: 'rgba(255, 255, 255, 0.1)',
  //     },
  //     orientation === 'horizontal'
  //       ? { height: 1, width: '100%' }
  //       : { width: 1, height: '100%' },
  //   ]}
  //   accessibilityRole={decorative ? 'none' : 'separator'}
  // />
  // 
  // Common patterns:
  // - List dividers: marginVertical: 8
  // - Section separators: marginVertical: 16
  // - Menu dividers: marginVertical: 4, opacity: 0.5
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      // REACT NATIVE: Replace data attributes with style object:
      // orientation === 'horizontal'
      //   ? { height: 1, width: '100%' }
      //   : { width: 1, height: '100%' }
      {...props}
    />
  );
}

export { Separator };
