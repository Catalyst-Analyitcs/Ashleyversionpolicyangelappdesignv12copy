/**
 * ==============================================================================
 * TOGGLE.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Toggle button with pressed/unpressed state.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means toggle is MUCH easier!
 * 
 * ✅ KEEP AS-IS (95% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, items-center, justify-center
 *    - Spacing: p-2, gap-2
 *    - Colors: bg-pa-gold, text-white
 *    - Borders: rounded-lg, border
 * 
 * ❌ CONVERT ONLY THESE:
 *    - button → Pressable
 *    - data-state="on" → boolean pressed state
 *    - Add haptic feedback
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND TOGGLE
 * ==============================================================================
 * 
 * ```tsx
 * import { Pressable, Text } from 'react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * const [pressed, setPressed] = useState(false);
 * 
 * <Pressable
 *   onPress={() => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     setPressed(!pressed);
 *   }}
 *   className={`
 *     p-2 rounded-lg flex items-center justify-center
 *     ${pressed ? 'bg-pa-gold' : 'bg-transparent border border-white/20'}
 *   `}
 * >
 *   <Text className={pressed ? 'text-pa-dark font-semibold' : 'text-white'}>
 *     Toggle
 *   </Text>
 * </Pressable>
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * ==============================================================================
 * LEGACY DETAILED ANNOTATIONS (Pre-NativeWind)
 * ==============================================================================
 * 
 * COMPLEXITY: LOW
 * CONVERSION APPROACH: Pressable button with on/off state
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-toggle → Pressable with boolean state
 * - class-variance-authority → Custom style functions
 * 
 * KEY CONVERSION NOTES:
 * 1. Toggle is like a button with on/off state
 * 2. Different from Switch (which is a specific UI control)
 * 3. Use Pressable with pressed state styling
 * 4. Manage on/off state with useState
 * 5. Add haptic feedback on toggle
 * 
 * REACT NATIVE IMPLEMENTATION:
 * ```tsx
 * import { Pressable, Text, StyleSheet } from 'react-native';
 * import { useState } from 'react';
 * import * as Haptics from 'expo-haptics';
 * 
 * interface ToggleProps {
 *   pressed?: boolean;
 *   onPressedChange?: (pressed: boolean) => void;
 *   disabled?: boolean;
 *   children: React.ReactNode;
 * }
 * 
 * export function Toggle({
 *   pressed: controlledPressed,
 *   onPressedChange,
 *   disabled = false,
 *   children,
 * }: ToggleProps) {
 *   const [internalPressed, setInternalPressed] = useState(false);
 *   const pressed = controlledPressed ?? internalPressed;
 *   
 *   const handlePress = () => {
 *     if (disabled) return;
 *     
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     
 *     const newPressed = !pressed;
 *     if (controlledPressed === undefined) {
 *       setInternalPressed(newPressed);
 *     }
 *     onPressedChange?.(newPressed);
 *   };
 *   
 *   return (
 *     <Pressable
 *       style={({ pressed: isPressing }) => [
 *         styles.toggle,
 *         pressed && styles.toggleOn,
 *         isPressing && styles.togglePressing,
 *         disabled && styles.toggleDisabled,
 *       ]}
 *       onPress={handlePress}
 *       disabled={disabled}
 *       accessibilityRole="button"
 *       accessibilityState={{ selected: pressed }}
 *     >
 *       <Text style={[
 *         styles.toggleText,
 *         pressed && styles.toggleTextOn,
 *       ]}>
 *         {children}
 *       </Text>
 *     </Pressable>
 *   );
 * }
 * 
 * const styles = StyleSheet.create({
 *   toggle: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     gap: 8,
 *     paddingHorizontal: 8,
 *     minWidth: 36,
 *     height: 36,
 *     borderRadius: 6,
 *     backgroundColor: 'transparent',
 *   },
 *   toggleOn: {
 *     backgroundColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   togglePressing: {
 *     opacity: 0.8,
 *   },
 *   toggleDisabled: {
 *     opacity: 0.5,
 *   },
 *   toggleText: {
 *     fontSize: 14,
 *     fontWeight: '500',
 *     color: 'rgba(255, 255, 255, 0.6)',
 *   },
 *   toggleTextOn: {
 *     color: '#fff',
 *   },
 * });
 * ```
 * 
 * POLICYANGEL-SPECIFIC USAGE:
 * ```tsx
 * // Favorite toggle
 * <Toggle 
 *   pressed={isFavorite} 
 *   onPressedChange={setIsFavorite}
 * >
 *   <Heart size={16} />
 * </Toggle>
 * 
 * // Filter toggle
 * <Toggle pressed={showCompleted} onPressedChange={setShowCompleted}>
 *   Show Completed
 * </Toggle>
 * ```
 * 
 * ACCESSIBILITY:
 * - accessibilityRole="button"
 * - accessibilityState={{ selected: pressed }}
 * - accessibilityLabel for icon-only toggles
 */

"use client";

import * as React from "react";
// WEB: Radix UI toggle
// REACT NATIVE: Pressable with boolean state
import * as TogglePrimitive from "@radix-ui/react-toggle@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  // WEB: Toggle button with on/off state
  // REACT NATIVE: Pressable with pressed state
  // 
  // const [pressed, setPressed] = useState(false);
  // 
  // <Pressable
  //   style={({ pressed: isPressing }) => [
  //     styles.toggle,
  //     pressed && styles.toggleOn,
  //     isPressing && styles.togglePressing,
  //   ]}
  //   onPress={() => {
  //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  //     setPressed(!pressed);
  //   }}
  //   accessibilityRole="button"
  //   accessibilityState={{ selected: pressed }}
  // >
  //   {children}
  // </Pressable>
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      // REACT NATIVE: data-[state=on] becomes conditional styling
      // pressed && styles.toggleOn
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
