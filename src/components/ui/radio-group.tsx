/**
 * ==============================================================================
 * RADIO-GROUP.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Radio group for single-selection from multiple options.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind makes radio groups MUCH easier!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, flex-col, gap-2
 *    - Colors: border-pa-gold, bg-pa-gold
 *    - Borders: rounded-full, border-2
 *    - Sizing: w-6, h-6
 * 
 * ❌ CONVERT ONLY THESE:
 *    - @radix-ui/react-radio-group → Pressable + state
 *    - Group state management
 *    - Circle indicator with conditional rendering
 *    - Add haptic feedback
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - RADIO GROUP
 * ==============================================================================
 * 
 * BEFORE (Web):
 * ```tsx
 * <RadioGroup value={selected} onValueChange={setSelected}>
 *   <RadioGroupItem value="option1" />
 *   <RadioGroupItem value="option2" />
 * </RadioGroup>
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * {options.map((option) => (
 *   <Pressable
 *     key={option.value}
 *     onPress={() => setSelected(option.value)}
 *     className="flex-row items-center gap-2"
 *   >
 *     <View className={`
 *       w-6 h-6 rounded-full border-2 items-center justify-center
 *       ${selected === option.value ? 'border-pa-gold' : 'border-white/20'}
 *     `}>
 *       {selected === option.value && (
 *         <View className="w-3 h-3 rounded-full bg-pa-gold" />
 *       )}
 *     </View>
 *     <Text className="text-white">{option.label}</Text>
 *   </Pressable>
 * ))}
 * ```
 * 
 * KEY POINTS:
 * - ✅ All Tailwind classes work as-is!
 * - ❌ Replace Radix with Pressable + state
 * - ✅ Simple conditional rendering for selected state
 * 
 * REACT NATIVE IMPLEMENTATION:
 * ```tsx
 * import { View, Pressable, Text } from 'react-native';
 * import { useState } from 'react';
 * 
 * interface RadioOption {
 *   value: string;
 *   label: string;
 *   disabled?: boolean;
 * }
 * 
 * interface RadioGroupProps {
 *   options: RadioOption[];
 *   value?: string;
 *   onValueChange: (value: string) => void;
 *   disabled?: boolean;
 * }
 * 
 * export function RadioGroup({
 *   options,
 *   value,
 *   onValueChange,
 *   disabled = false,
 * }: RadioGroupProps) {
 *   return (
 *     <View style={styles.radioGroup} accessibilityRole="radiogroup">
 *       {options.map((option) => (
 *         <RadioGroupItem
 *           key={option.value}
 *           label={option.label}
 *           value={option.value}
 *           selected={value === option.value}
 *           onPress={() => onValueChange(option.value)}
 *           disabled={disabled || option.disabled}
 *         />
 *       ))}
 *     </View>
 *   );
 * }
 * 
 * interface RadioGroupItemProps {
 *   label: string;
 *   value: string;
 *   selected: boolean;
 *   onPress: () => void;
 *   disabled?: boolean;
 * }
 * 
 * function RadioGroupItem({
 *   label,
 *   value,
 *   selected,
 *   onPress,
 *   disabled = false,
 * }: RadioGroupItemProps) {
 *   return (
 *     <Pressable
 *       style={({ pressed }) => [
 *         styles.radioItem,
 *         pressed && !disabled && styles.radioItemPressed,
 *         disabled && styles.radioItemDisabled,
 *       ]}
 *       onPress={onPress}
 *       disabled={disabled}
 *       accessibilityRole="radio"
 *       accessibilityState={{ checked: selected, disabled }}
 *       accessibilityLabel={label}
 *     >
 *       <View
 *         style={[
 *           styles.radioCircle,
 *           selected && styles.radioCircleSelected,
 *           disabled && styles.radioCircleDisabled,
 *         ]}
 *       >
 *         {selected && <View style={styles.radioInner} />}
 *       </View>
 *       <Text
 *         style={[
 *           styles.radioLabel,
 *           disabled && styles.radioLabelDisabled,
 *         ]}
 *       >
 *         {label}
 *       </Text>
 *     </Pressable>
 *   );
 * }
 * 
 * const styles = {
 *   radioGroup: {
 *     gap: 12,
 *   },
 *   radioItem: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     paddingVertical: 8,
 *     gap: 12,
 *   },
 *   radioItemPressed: {
 *     opacity: 0.7,
 *   },
 *   radioItemDisabled: {
 *     opacity: 0.5,
 *   },
 *   radioCircle: {
 *     width: 20,
 *     height: 20,
 *     borderRadius: 10,
 *     borderWidth: 2,
 *     borderColor: 'rgba(255, 255, 255, 0.3)',
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     backgroundColor: 'rgba(255, 255, 255, 0.05)',
 *   },
 *   radioCircleSelected: {
 *     borderColor: '#D4AF37',
 *     backgroundColor: 'rgba(212, 175, 55, 0.1)',
 *   },
 *   radioCircleDisabled: {
 *     borderColor: 'rgba(255, 255, 255, 0.2)',
 *   },
 *   radioInner: {
 *     width: 10,
 *     height: 10,
 *     borderRadius: 5,
 *     backgroundColor: '#D4AF37',
 *   },
 *   radioLabel: {
 *     color: '#fff',
 *     fontSize: 14,
 *     fontWeight: '500',
 *   },
 *   radioLabelDisabled: {
 *     color: 'rgba(255, 255, 255, 0.5)',
 *   },
 * };
 * ```
 * 
 * WITH DESCRIPTIONS:
 * ```tsx
 * interface RadioOptionWithDescription extends RadioOption {
 *   description?: string;
 * }
 * 
 * function RadioGroupItemWithDescription({
 *   label,
 *   description,
 *   selected,
 *   onPress,
 * }: RadioGroupItemProps & { description?: string }) {
 *   return (
 *     <Pressable
 *       style={styles.radioItemWithDesc}
 *       onPress={onPress}
 *       accessibilityRole="radio"
 *       accessibilityState={{ checked: selected }}
 *       accessibilityLabel={`${label}. ${description}`}
 *     >
 *       <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
 *         {selected && <View style={styles.radioInner} />}
 *       </View>
 *       <View style={styles.radioTextContainer}>
 *         <Text style={styles.radioLabel}>{label}</Text>
 *         {description && (
 *           <Text style={styles.radioDescription}>{description}</Text>
 *         )}
 *       </View>
 *     </Pressable>
 *   );
 * }
 * 
 * const styles = {
 *   radioItemWithDesc: {
 *     flexDirection: 'row',
 *     alignItems: 'flex-start',
 *     paddingVertical: 12,
 *     gap: 12,
 *   },
 *   radioTextContainer: {
 *     flex: 1,
 *     gap: 4,
 *   },
 *   radioDescription: {
 *     color: 'rgba(255, 255, 255, 0.6)',
 *     fontSize: 12,
 *     lineHeight: 18,
 *   },
 * };
 * ```
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - Property type: Residential, Commercial, Mixed-use
 * - Inspection status: Scheduled, In Progress, Completed
 * - Priority level: Low, Medium, High, Critical
 * - Notification preferences: Email, SMS, Push, All
 * - Report format: PDF, Excel, Both
 * - Privacy settings: Public, Private, Contacts Only
 * 
 * ACCESSIBILITY:
 * - accessibilityRole="radiogroup" for container
 * - accessibilityRole="radio" for each option
 * - accessibilityState={{ checked: selected }}
 * - accessibilityLabel with option description
 * - Support VoiceOver/TalkBack navigation
 * - Minimum touch target: 44x44 points
 * 
 * INTEGRATION WITH REACT HOOK FORM:
 * ```tsx
 * import { Controller } from 'react-hook-form@7.55.0';
 * 
 * <Controller
 *   name="propertyType"
 *   control={control}
 *   render={({ field }) => (
 *     <RadioGroup
 *       options={propertyTypeOptions}
 *       value={field.value}
 *       onValueChange={field.onChange}
 *     />
 *   )}
 * />
 * ```
 * 
 * STYLING VARIATIONS:
 * ```tsx
 * // Horizontal layout (for 2-3 options)
 * <View style={{ flexDirection: 'row', gap: 16 }}>
 *   {options.map(option => <RadioGroupItem ... />)}
 * </View>
 * 
 * // Card-based radio (for emphasized choices)
 * <Pressable style={[styles.radioCard, selected && styles.radioCardSelected]}>
 *   <View style={styles.radioCircle}>
 *     {selected && <View style={styles.radioInner} />}
 *   </View>
 *   <Text>{label}</Text>
 * </Pressable>
 * 
 * const styles = {
 *   radioCard: {
 *     padding: 16,
 *     borderRadius: 12,
 *     borderWidth: 1,
 *     borderColor: 'rgba(255, 255, 255, 0.1)',
 *     backgroundColor: 'rgba(255, 255, 255, 0.05)',
 *   },
 *   radioCardSelected: {
 *     borderColor: '#D4AF37',
 *     backgroundColor: 'rgba(212, 175, 55, 0.1)',
 *   },
 * };
 * ```
 * 
 * ANIMATION:
 * ```tsx
 * import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
 * 
 * function AnimatedRadioCircle({ selected }: { selected: boolean }) {
 *   const animatedStyle = useAnimatedStyle(() => ({
 *     transform: [{ scale: withSpring(selected ? 1 : 0) }],
 *   }));
 * 
 *   return (
 *     <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
 *       <Animated.View style={[styles.radioInner, animatedStyle]} />
 *     </View>
 *   );
 * }
 * ```
 */

"use client";

import * as React from "react";
// WEB: Radix UI for accessible radio groups
// REACT NATIVE: Custom implementation with Pressable and state
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group@1.2.3";
// WEB: Lucide circle icon
// REACT NATIVE: Custom View or react-native-vector-icons
import { CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  // WEB: Radix radio group with automatic state management
  // REACT NATIVE: Custom component with useState:
  // const [selected, setSelected] = useState(value);
  // 
  // <View style={{ gap: 12 }} accessibilityRole="radiogroup">
  //   {options.map(option => (
  //     <RadioGroupItem
  //       key={option.value}
  //       label={option.label}
  //       selected={selected === option.value}
  //       onPress={() => {
  //         setSelected(option.value);
  //         onValueChange?.(option.value);
  //       }}
  //     />
  //   ))}
  // </View>
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  // WEB: Radio button item with indicator
  // REACT NATIVE: Pressable with custom radio indicator
  // <Pressable
  //   style={({ pressed }) => [
  //     styles.radioItem,
  //     pressed && styles.radioItemPressed,
  //   ]}
  //   onPress={onPress}
  //   accessibilityRole="radio"
  //   accessibilityState={{ checked: selected }}
  // >
  //   <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
  //     {selected && <View style={styles.radioInner} />}
  //   </View>
  //   <Text style={styles.label}>{label}</Text>
  // </Pressable>
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      // REACT NATIVE: Simplified styling:
      // width: 20,
      // height: 20,
      // borderRadius: 10,
      // borderWidth: 2,
      // borderColor: selected ? '#D4AF37' : 'rgba(255,255,255,0.3)',
      // backgroundColor: selected ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.05)',
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
        {/* REACT NATIVE: Conditionally render inner circle:
          {selected && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: '#D4AF37',
              }}
            />
          )}
        */}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
