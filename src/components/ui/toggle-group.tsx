/**
 * ==============================================================================
 * TOGGLE-GROUP.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Group of toggle buttons with shared state.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * ✅ KEEP AS-IS (95% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY: Array state, multiple Pressable components
 * 
 * ```tsx
 * const [selected, setSelected] = useState<string[]>([]);
 * 
 * <View className="flex-row gap-2">
 *   {options.map((option) => (
 *     <Pressable
 *       key={option.value}
 *       onPress={() => {
 *         setSelected(prev =>
 *           prev.includes(option.value)
 *             ? prev.filter(v => v !== option.value)
 *             : [...prev, option.value]
 *         );
 *       }}
 *       className={`px-4 py-2 rounded-lg border ${selected.includes(option.value) ? 'bg-pa-gold border-pa-gold' : 'border-white/20'}`}
 *     >
 *       <Text>{option.label}</Text>
 *     </Pressable>
 *   ))}
 * </View>
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * ==============================================================================
 * LEGACY ANNOTATIONS
 * ==============================================================================
 * 
 * COMPLEXITY: MEDIUM
 * CONVERSION APPROACH: Group of Toggle buttons (like a segmented control)
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-toggle-group → Custom Pressable group
 * - class-variance-authority → Custom style variants
 * 
 * KEY CONVERSION NOTES:
 * 1. ToggleGroup is like a segmented control / button group
 * 2. Single or multiple selection modes
 * 3. Use Pressable for each item with conditional styling
 * 4. Handle state management (single vs multiple)
 * 5. Similar to iOS UISegmentedControl or Android ToggleButton
 * 
 * REACT NATIVE IMPLEMENTATION:
 * ```tsx
 * import { View, Pressable, Text, StyleSheet } from 'react-native';
 * import { useState } from 'react';
 * 
 * interface ToggleGroupProps {
 *   type: 'single' | 'multiple';
 *   value?: string | string[];
 *   onValueChange?: (value: string | string[]) => void;
 *   children: React.ReactNode;
 * }
 * 
 * export function ToggleGroup({
 *   type = 'single',
 *   value,
 *   onValueChange,
 *   children,
 * }: ToggleGroupProps) {
 *   return (
 *     <View style={styles.toggleGroup}>
 *       {children}
 *     </View>
 *   );
 * }
 * 
 * interface ToggleGroupItemProps {
 *   value: string;
 *   children: React.ReactNode;
 * }
 * 
 * export function ToggleGroupItem({
 *   value,
 *   children,
 * }: ToggleGroupItemProps) {
 *   // Get selected state from context
 *   const isSelected = /* context value */;
 *   
 *   return (
 *     <Pressable
 *       style={[
 *         styles.toggleItem,
 *         isSelected && styles.toggleItemSelected,
 *       ]}
 *       onPress={() => handleToggle(value)}
 *     >
 *       <Text style={[
 *         styles.toggleText,
 *         isSelected && styles.toggleTextSelected,
 *       ]}>
 *         {children}
 *       </Text>
 *     </Pressable>
 *   );
 * }
 * 
 * const styles = StyleSheet.create({
 *   toggleGroup: {
 *     flexDirection: 'row',
 *     borderRadius: 6,
 *     overflow: 'hidden',
 *     borderWidth: 1,
 *     borderColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   toggleItem: {
 *     flex: 1,
 *     paddingVertical: 8,
 *     paddingHorizontal: 16,
 *     backgroundColor: 'transparent',
 *     borderRightWidth: 1,
 *     borderRightColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   toggleItemSelected: {
 *     backgroundColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   toggleText: {
 *     color: 'rgba(255, 255, 255, 0.6)',
 *     fontSize: 14,
 *     textAlign: 'center',
 *   },
 *   toggleTextSelected: {
 *     color: '#fff',
 *     fontWeight: '600',
 *   },
 * });
 * ```
 * 
 * POLICYANGEL-SPECIFIC USAGE:
 * ```tsx
 * // View mode toggle
 * <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
 *   <ToggleGroupItem value="map">Map</ToggleGroupItem>
 *   <ToggleGroupItem value="list">List</ToggleGroupItem>
 *   <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 * 
 * ACCESSIBILITY:
 * - accessibilityRole="radiogroup" for single selection
 * - accessibilityRole="menu" for multiple selection
 * - accessibilityState={{ selected: isSelected }}
 * - Announce selection changes
 */

"use client";

import * as React from "react";
// WEB: Radix UI toggle group
// REACT NATIVE: Custom Pressable group with context
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group@1.1.2";
import { type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  // WEB: Toggle group container
  // REACT NATIVE: View with flexDirection row
  // 
  // <View style={styles.toggleGroup}>
  //   {React.Children.map(children, (child, index) => (
  //     React.cloneElement(child, {
  //       isFirst: index === 0,
  //       isLast: index === React.Children.count(children) - 1,
  //     })
  //   ))}
  // </View>
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  // WEB: Individual toggle button
  // REACT NATIVE: Pressable with conditional styling
  // 
  // <Pressable
  //   style={[
  //     styles.toggleItem,
  //     isFirst && styles.toggleItemFirst,
  //     isLast && styles.toggleItemLast,
  //     isSelected && styles.toggleItemSelected,
  //   ]}
  //   onPress={() => handleToggle(value)}
  // >
  //   <Text style={[
  //     styles.toggleText,
  //     isSelected && styles.toggleTextSelected,
  //   ]}>
  //     {children}
  //   </Text>
  // </Pressable>
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className,
      )}
      // REACT NATIVE: rounded corners only on first/last items
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
