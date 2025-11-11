/**
 * ==============================================================================
 * CHECKBOX.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Checkbox form control for boolean selections.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means this checkbox is MUCH easier to convert!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: w-6, h-6, rounded-sm
 *    - Colors: bg-pa-gold, border-white/20
 *    - Borders: border, border-2
 *    - States via className conditionals
 * 
 * ❌ CONVERT ONLY THESE:
 *    - @radix-ui/react-checkbox → Pressable + state
 *    - input element → Custom Pressable
 *    - CheckIcon conditional rendering
 *    - Add haptic feedback
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - CHECKBOX
 * ==============================================================================
 * 
 * BEFORE (Web):
 * ```tsx
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   className="w-6 h-6 rounded-sm border border-white/20"
 * />
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * import { Pressable, View } from 'react-native';
 * import { Check } from 'lucide-react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * <Pressable
 *   onPress={() => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     setIsChecked(!isChecked);
 *   }}
 *   className={`
 *     w-6 h-6 rounded-sm border items-center justify-center
 *     ${isChecked ? 'bg-pa-gold border-pa-gold' : 'border-white/20 bg-transparent'}
 *   `}
 * >
 *   {isChecked && <Check size={16} color="#000000" />}
 * </Pressable>
 * ```
 * 
 * KEY POINTS:
 * - ✅ All Tailwind sizing, border, color classes work!
 * - ❌ Replace Radix with Pressable + conditional icon
 * - ✅ State management identical to web
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND CHECKBOX
 * ==============================================================================
 * 
 * ```tsx
 * import React, { useState } from 'react';
 * import { Pressable, Text, View } from 'react-native';
 * import { Check } from 'lucide-react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * interface CheckboxProps {
 *   checked: boolean;
 *   onCheckedChange: (checked: boolean) => void;
 *   disabled?: boolean;
 *   label?: string;
 *   className?: string;
 * }
 * 
 * export function Checkbox({
 *   checked,
 *   onCheckedChange,
 *   disabled = false,
 *   label,
 *   className = '',
 * }: CheckboxProps) {
 *   const handlePress = () => {
 *     if (!disabled) {
 *       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *       onCheckedChange(!checked);
 *     }
 *   };
 *   
 *   return (
 *     <Pressable
 *       onPress={handlePress}
 *       disabled={disabled}
 *       className="flex flex-row items-center gap-2"
 *     >
 *       <View
 *         className={`
 *           w-6 h-6 rounded-sm border items-center justify-center
 *           ${checked ? 'bg-pa-gold border-pa-gold' : 'border-white/20 bg-transparent'}
 *           ${disabled ? 'opacity-50' : ''}
 *           ${className}
 *         `}
 *       >
 *         {checked && <Check size={16} color="#000000" strokeWidth={3} />}
 *       </View>
 *       
 *       {label && (
 *         <Text className={`text-white ${disabled ? 'opacity-50' : ''}`}>
 *           {label}
 *         </Text>
 *       )}
 *     </Pressable>
 *   );
 * }
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic checkbox
 * const [agreed, setAgreed] = useState(false);
 * 
 * <Checkbox
 *   checked={agreed}
 *   onCheckedChange={setAgreed}
 *   label="I agree to terms and conditions"
 * />
 * 
 * // Disabled checkbox
 * <Checkbox
 *   checked={true}
 *   onCheckedChange={() => {}}
 *   label="HOI verification complete"
 *   disabled
 * />
 * 
 * // Form with multiple checkboxes
 * const [selections, setSelections] = useState({
 *   drone: false,
 *   thermal: false,
 *   photo: false,
 * });
 * 
 * <View className="space-y-3">
 *   <Checkbox
 *     checked={selections.drone}
 *     onCheckedChange={(val) => setSelections({ ...selections, drone: val })}
 *     label="Drone inspection"
 *   />
 *   <Checkbox
 *     checked={selections.thermal}
 *     onCheckedChange={(val) => setSelections({ ...selections, thermal: val })}
 *     label="Thermal imaging"
 *   />
 *   <Checkbox
 *     checked={selections.photo}
 *     onCheckedChange={(val) => setSelections({ ...selections, photo: val })}
 *     label="Photo documentation"
 *   />
 * </View>
 * ```
 * 
 * ==============================================================================
 * NATIVEWIND - ANIMATED CHECKBOX
 * ==============================================================================
 * 
 * Add animation with Reanimated:
 * 
 * ```tsx
 * import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
 * 
 * const checkboxStyle = useAnimatedStyle(() => ({
 *   transform: [
 *     { scale: withSpring(checked ? 1 : 0.8) }
 *   ],
 * }));
 * 
 * <Animated.View style={checkboxStyle}>
 *   {checked && <Check size={16} color="#000000" />}
 * </Animated.View>
 * ```
 * 
 * ==============================================================================
 * REQUIRED PACKAGES
 * ==============================================================================
 * 
 * ```bash
 * npm install nativewind
 * npm install expo-haptics
 * npm install lucide-react-native
 * npm install react-native-reanimated  # For animations
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * ==============================================================================
 * LEGACY DETAILED ANNOTATIONS (Pre-NativeWind)
 * ==============================================================================
 */

"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

/**
 * RN: Checkbox Component
 * 
 * CONVERSION NOTES:
 * - Replace Radix UI Checkbox with custom Pressable component
 * - Use lucide-react-native for CheckIcon
 * - Manage checked state internally or via props
 * - Add scale animation on check/uncheck
 * - Support indeterminate state with minus icon
 * 
 * PROPS MAPPING:
 * - checked → value (boolean or 'indeterminate')
 * - onCheckedChange → onValueChange
 * - disabled → disabled (same)
 * - className → style prop
 * 
 * STATES TO HANDLE:
 * - Unchecked: Empty square
 * - Checked: Square with checkmark
 * - Indeterminate: Square with minus/dash
 * - Disabled: Reduced opacity
 * - Invalid: Red border (error state)
 * 
 * TAILWIND CLASS CONVERSION:
 * - peer → Not applicable (no peer styling in RN)
 * - border → { borderWidth: 1, borderColor: colors.input }
 * - bg-input-background → { backgroundColor: colors.inputBackground }
 * - dark:bg-input/30 → Dark mode background
 * - data-[state=checked]:bg-primary → checked && { backgroundColor: colors.primary }
 * - data-[state=checked]:text-primary-foreground → checked && { color: colors.primaryForeground }
 * - data-[state=checked]:border-primary → checked && { borderColor: colors.primary }
 * - size-4 → { width: 16, height: 16 }
 * - shrink-0 → { flexShrink: 0 }
 * - rounded-[4px] → { borderRadius: 4 }
 * - shadow-xs → Platform-specific shadow
 * - transition-shadow → Animated shadow changes
 * - outline-none → Not applicable
 * - focus-visible → Not applicable (mobile)
 * - disabled:cursor-not-allowed → disabled prop
 * - disabled:opacity-50 → disabled && { opacity: 0.5 }
 * - aria-invalid → Custom invalid prop
 * 
 * INDICATOR (checkmark):
 * - flex items-center justify-center → Container alignment
 * - text-current → Icon inherits text color
 * - transition-none → Instant appearance (or add fade animation)
 * - size-3.5 → Icon size 14x14
 * 
 * ANIMATION OPTIONS:
 * 1. Instant: Just show/hide icon
 * 2. Fade: Animated opacity
 * 3. Scale: Scale from 0 to 1
 * 4. Scale + bounce: Spring animation
 * 5. Checkmark draw: SVG path animation
 * 
 * HAPTIC FEEDBACK:
 * import * as Haptics from 'expo-haptics';
 * 
 * onPress={() => {
 *   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *   setIsChecked(!isChecked);
 * }}
 * 
 * INDETERMINATE STATE:
 * For "select all" checkboxes that have some items selected:
 * - Show minus icon instead of checkmark
 * - Use Minus from lucide-react-native
 * 
 * ACCESSIBILITY:
 * - accessibilityRole: 'checkbox'
 * - accessibilityState: { checked: value, disabled }
 * - accessibilityLabel: Descriptive label
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      // RN: Replace with Pressable component
      // RN: <Pressable
      // RN:   onPress={handlePress}
      // RN:   disabled={disabled}
      // RN:   accessibilityRole="checkbox"
      // RN:   accessibilityState={{ checked: value, disabled }}
      // RN:   style={[
      // RN:     styles.checkbox,
      // RN:     checked && styles.checkboxChecked,
      // RN:     disabled && styles.checkboxDisabled,
      // RN:     invalid && styles.checkboxInvalid,
      // RN:   ]}
      // RN: >
      className={cn(
        "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        // RN: Replace with conditional icon rendering
        // RN: {checked && (
        // RN:   <Animated.View style={checkmarkAnimatedStyle}>
        // RN:     <Check size={14} color={colors.primaryForeground} />
        // RN:   </Animated.View>
        // RN: )}
        // RN: {indeterminate && (
        // RN:   <Minus size={14} color={colors.primaryForeground} />
        // RN: )}
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
        {/* RN: Icon size: 14x14 */}
      </CheckboxPrimitive.Indicator>
      {/* RN: </Pressable> */}
    </CheckboxPrimitive.Root>
  );
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * import React, { useState, useRef } from 'react';
 * import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
 * import Animated, {
 *   useAnimatedStyle,
 *   useSharedValue,
 *   withSpring,
 * } from 'react-native-reanimated';
 * import { Check, Minus } from 'lucide-react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * type CheckboxValue = boolean | 'indeterminate';
 * 
 * interface CheckboxProps {
 *   value: CheckboxValue;
 *   onValueChange: (value: boolean) => void;
 *   disabled?: boolean;
 *   invalid?: boolean;
 *   label?: string;
 *   style?: any;
 * }
 * 
 * export const Checkbox: React.FC<CheckboxProps> = ({
 *   value,
 *   onValueChange,
 *   disabled = false,
 *   invalid = false,
 *   label,
 *   style,
 * }) => {
 *   const scale = useSharedValue(value ? 1 : 0);
 *   
 *   const animatedStyle = useAnimatedStyle(() => ({
 *     transform: [{ scale: withSpring(scale.value) }],
 *   }));
 *   
 *   const handlePress = () => {
 *     if (!disabled) {
 *       const newValue = value === 'indeterminate' ? true : !value;
 *       scale.value = newValue ? 1 : 0;
 *       
 *       if (Platform.OS === 'ios' || Platform.OS === 'android') {
 *         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *       }
 *       
 *       onValueChange(newValue);
 *     }
 *   };
 *   
 *   const isChecked = value === true;
 *   const isIndeterminate = value === 'indeterminate';
 *   
 *   return (
 *     <Pressable
 *       onPress={handlePress}
 *       disabled={disabled}
 *       accessibilityRole="checkbox"
 *       accessibilityState={{ checked: isChecked, disabled }}
 *       accessibilityLabel={label}
 *       style={({ pressed }) => [
 *         styles.container,
 *         pressed && !disabled && styles.containerPressed,
 *         style,
 *       ]}
 *     >
 *       <View
 *         style={[
 *           styles.checkbox,
 *           isChecked && styles.checkboxChecked,
 *           isIndeterminate && styles.checkboxIndeterminate,
 *           disabled && styles.checkboxDisabled,
 *           invalid && styles.checkboxInvalid,
 *         ]}
 *       >
 *         {(isChecked || isIndeterminate) && (
 *           <Animated.View style={animatedStyle}>
 *             {isChecked ? (
 *               <Check size={14} color={colors.primaryForeground} />
 *             ) : (
 *               <Minus size={14} color={colors.primaryForeground} />
 *             )}
 *           </Animated.View>
 *         )}
 *       </View>
 *       {label && (
 *         <Text style={[styles.label, disabled && styles.labelDisabled]}>
 *           {label}
 *         </Text>
 *       )}
 *     </Pressable>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     paddingVertical: 8,
 *   },
 *   containerPressed: {
 *     opacity: 0.7,
 *   },
 *   checkbox: {
 *     width: 16,
 *     height: 16,
 *     borderRadius: 4,
 *     borderWidth: 1,
 *     borderColor: colors.input,
 *     backgroundColor: colors.inputBackground,
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: '#000',
 *         shadowOffset: { width: 0, height: 1 },
 *         shadowOpacity: 0.05,
 *         shadowRadius: 1,
 *       },
 *       android: {
 *         elevation: 1,
 *       },
 *     }),
 *   },
 *   checkboxChecked: {
 *     backgroundColor: colors.primary,
 *     borderColor: colors.primary,
 *   },
 *   checkboxIndeterminate: {
 *     backgroundColor: colors.primary,
 *     borderColor: colors.primary,
 *   },
 *   checkboxDisabled: {
 *     opacity: 0.5,
 *   },
 *   checkboxInvalid: {
 *     borderColor: colors.destructive,
 *     borderWidth: 2,
 *   },
 *   label: {
 *     marginLeft: 8,
 *     fontSize: 14,
 *     color: colors.foreground,
 *   },
 *   labelDisabled: {
 *     opacity: 0.5,
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic checkbox
 * const [isChecked, setIsChecked] = useState(false);
 * 
 * <Checkbox
 *   value={isChecked}
 *   onValueChange={setIsChecked}
 *   label="Accept terms and conditions"
 * />
 * 
 * // Disabled checkbox
 * <Checkbox
 *   value={true}
 *   onValueChange={() => {}}
 *   label="Read only option"
 *   disabled={true}
 * />
 * 
 * // Invalid checkbox (error state)
 * <Checkbox
 *   value={isChecked}
 *   onValueChange={setIsChecked}
 *   label="Required field"
 *   invalid={!isChecked && hasSubmitted}
 * />
 * 
 * // Indeterminate checkbox (for "select all")
 * const [items, setItems] = useState([
 *   { id: 1, name: 'Item 1', selected: false },
 *   { id: 2, name: 'Item 2', selected: true },
 *   { id: 3, name: 'Item 3', selected: false },
 * ]);
 * 
 * const allSelected = items.every(item => item.selected);
 * const someSelected = items.some(item => item.selected);
 * const selectAllValue = allSelected ? true : someSelected ? 'indeterminate' : false;
 * 
 * <Checkbox
 *   value={selectAllValue}
 *   onValueChange={(checked) => {
 *     setItems(items.map(item => ({ ...item, selected: checked })));
 *   }}
 *   label="Select all"
 * />
 * 
 * // CHECKBOX GROUP:
 * const CheckboxGroup = ({ options, selected, onChange }) => {
 *   const handleToggle = (optionId: string) => {
 *     if (selected.includes(optionId)) {
 *       onChange(selected.filter(id => id !== optionId));
 *     } else {
 *       onChange([...selected, optionId]);
 *     }
 *   };
 *   
 *   return (
 *     <View style={styles.checkboxGroup}>
 *       {options.map(option => (
 *         <Checkbox
 *           key={option.id}
 *           value={selected.includes(option.id)}
 *           onValueChange={() => handleToggle(option.id)}
 *           label={option.label}
 *         />
 *       ))}
 *     </View>
 *   );
 * };
 * 
 * // FORM INTEGRATION:
 * import { Controller } from 'react-hook-form@7.55.0';
 * 
 * <Controller
 *   control={control}
 *   name="agreedToTerms"
 *   rules={{
 *     validate: (value) => value === true || 'You must accept the terms',
 *   }}
 *   render={({ field: { value, onChange }, fieldState: { error } }) => (
 *     <View>
 *       <Checkbox
 *         value={value}
 *         onValueChange={onChange}
 *         label="I agree to the terms and conditions"
 *         invalid={!!error}
 *       />
 *       {error && (
 *         <Text style={styles.errorText}>{error.message}</Text>
 *       )}
 *     </View>
 *   )}
 * />
 * 
 * // MULTI-SELECT LIST:
 * const MultiSelectList = () => {
 *   const [selectedIds, setSelectedIds] = useState<string[]>([]);
 *   
 *   const items = [
 *     { id: '1', title: 'Property Insurance', description: 'Protect your home' },
 *     { id: '2', title: 'Auto Insurance', description: 'Cover your vehicles' },
 *     { id: '3', title: 'Life Insurance', description: 'Secure your family' },
 *   ];
 *   
 *   const toggleItem = (id: string) => {
 *     setSelectedIds(prev =>
 *       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
 *     );
 *   };
 *   
 *   return (
 *     <View>
 *       {items.map(item => (
 *         <Pressable
 *           key={item.id}
 *           onPress={() => toggleItem(item.id)}
 *           style={styles.listItem}
 *         >
 *           <Checkbox
 *             value={selectedIds.includes(item.id)}
 *             onValueChange={() => toggleItem(item.id)}
 *           />
 *           <View style={styles.listItemContent}>
 *             <Text style={styles.listItemTitle}>{item.title}</Text>
 *             <Text style={styles.listItemDescription}>{item.description}</Text>
 *           </View>
 *         </Pressable>
 *       ))}
 *     </View>
 *   );
 * };
 * 
 * // USING EXPO-CHECKBOX (simpler alternative):
 * import ExpoCheckbox from 'expo-checkbox';
 * 
 * <ExpoCheckbox
 *   value={isChecked}
 *   onValueChange={setIsChecked}
 *   color={isChecked ? colors.primary : undefined}
 * />
 * 
 * // CUSTOM ANIMATED CHECKMARK (advanced):
 * import Svg, { Path } from 'react-native-svg';
 * 
 * const AnimatedPath = Animated.createAnimatedComponent(Path);
 * 
 * const CheckmarkAnimation = ({ isChecked }) => {
 *   const progress = useSharedValue(0);
 *   
 *   useEffect(() => {
 *     progress.value = withTiming(isChecked ? 1 : 0, { duration: 200 });
 *   }, [isChecked]);
 *   
 *   const animatedProps = useAnimatedProps(() => ({
 *     strokeDashoffset: 24 * (1 - progress.value),
 *   }));
 *   
 *   return (
 *     <Svg width="14" height="14" viewBox="0 0 24 24">
 *       <AnimatedPath
 *         d="M20 6L9 17l-5-5"
 *         stroke={colors.primaryForeground}
 *         strokeWidth="2"
 *         fill="none"
 *         strokeLinecap="round"
 *         strokeLinejoin="round"
 *         strokeDasharray="24"
 *         animatedProps={animatedProps}
 *       />
 *     </Svg>
 *   );
 * };
 */

export { Checkbox };
