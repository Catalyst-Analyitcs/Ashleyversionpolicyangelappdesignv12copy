/**
 * ==============================================================================
 * SWITCH.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Toggle switch for boolean settings.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: React Native has a BUILT-IN Switch component!
 * 
 * ✅ EVEN EASIER (Native component):
 *    - Use React Native's Switch directly
 *    - No styling classes needed (native OS control)
 *    - Simpler than web version
 *    - Platform-specific appearance (iOS/Android)
 * 
 * ❌ CONVERT ONLY THESE:
 *    - @radix-ui/react-switch → React Native Switch
 *    - checked → value
 *    - onCheckedChange → onValueChange
 *    - Add haptic feedback
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - SWITCH
 * ==============================================================================
 * 
 * BEFORE (Web):
 * ```tsx
 * <Switch
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 * />
 * ```
 * 
 * AFTER (React Native - Native Component):
 * ```tsx
 * import { Switch, View, Text } from 'react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * <Switch
 *   value={isEnabled}
 *   onValueChange={(value) => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     setIsEnabled(value);
 *   }}
 *   trackColor={{ false: '#3e3e3e', true: '#C4A962' }}
 *   thumbColor={isEnabled ? '#000000' : '#f4f3f4'}
 *   ios_backgroundColor="#3e3e3e"
 * />
 * ```
 * 
 * KEY POINTS:
 * - ✅ Native Switch component - no styling needed!
 * - ✅ Platform-specific rendering (iOS/Android)
 * - ✅ Simpler than web version
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND SWITCH
 * ==============================================================================
 * 
 * ```tsx
 * import React from 'react';
 * import { Switch as RNSwitch, View, Text } from 'react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * interface SwitchProps {
 *   checked: boolean;
 *   onCheckedChange: (checked: boolean) => void;
 *   disabled?: boolean;
 *   label?: string;
 * }
 * 
 * export function Switch({
 *   checked,
 *   onCheckedChange,
 *   disabled = false,
 *   label,
 * }: SwitchProps) {
 *   const handleValueChange = (value: boolean) => {
 *     if (!disabled) {
 *       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *       onCheckedChange(value);
 *     }
 *   };
 *   
 *   return (
 *     <View className="flex flex-row items-center justify-between">
 *       {label && (
 *         <Text className={`text-white ${disabled ? 'opacity-50' : ''}`}>
 *           {label}
 *         </Text>
 *       )}
 *       
 *       <RNSwitch
 *         value={checked}
 *         onValueChange={handleValueChange}
 *         disabled={disabled}
 *         trackColor={{
 *           false: '#3e3e3e',
 *           true: '#C4A962',
 *         }}
 *         thumbColor={checked ? '#000000' : '#f4f3f4'}
 *         ios_backgroundColor="#3e3e3e"
 *       />
 *     </View>
 *   );
 * }
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic switch
 * const [enabled, setEnabled] = useState(false);
 * 
 * <Switch
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 *   label="Enable notifications"
 * />
 * 
 * // Settings screen with multiple switches
 * const [settings, setSettings] = useState({
 *   notifications: true,
 *   locationTracking: false,
 *   autoSync: true,
 * });
 * 
 * <View className="p-4 space-y-4">
 *   <View className="bg-white/5 rounded-xl p-4 space-y-4">
 *     <Switch
 *       checked={settings.notifications}
 *       onCheckedChange={(val) => 
 *         setSettings({ ...settings, notifications: val })
 *       }
 *       label="Push Notifications"
 *     />
 *     
 *     <View className="h-px bg-white/10" />
 *     
 *     <Switch
 *       checked={settings.locationTracking}
 *       onCheckedChange={(val) => 
 *         setSettings({ ...settings, locationTracking: val })
 *       }
 *       label="Location Tracking"
 *     />
 *     
 *     <View className="h-px bg-white/10" />
 *     
 *     <Switch
 *       checked={settings.autoSync}
 *       onCheckedChange={(val) => 
 *         setSettings({ ...settings, autoSync: val })
 *       }
 *       label="Auto-sync Properties"
 *     />
 *   </View>
 * </View>
 * 
 * // Disabled switch
 * <Switch
 *   checked={true}
 *   onCheckedChange={() => {}}
 *   label="Premium feature (upgrade required)"
 *   disabled
 * />
 * 
 * // With description
 * <View className="space-y-1">
 *   <Switch
 *     checked={droneMode}
 *     onCheckedChange={setDroneMode}
 *     label="Drone Inspection Mode"
 *   />
 *   <Text className="text-white/60 text-sm ml-0">
 *     Optimizes camera settings for aerial property inspection
 *   </Text>
 * </View>
 * ```
 * 
 * ==============================================================================
 * NATIVEWIND - CUSTOM STYLED SWITCH (OPTIONAL)
 * ==============================================================================
 * 
 * If you need custom styling beyond native Switch:
 * 
 * ```tsx
 * import { Pressable, View } from 'react-native';
 * import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
 * 
 * export function CustomSwitch({ checked, onCheckedChange }) {
 *   const thumbStyle = useAnimatedStyle(() => ({
 *     transform: [
 *       { translateX: withSpring(checked ? 20 : 0) }
 *     ],
 *   }));
 *   
 *   return (
 *     <Pressable
 *       onPress={() => onCheckedChange(!checked)}
 *       className={`
 *         w-12 h-6 rounded-full p-1
 *         ${checked ? 'bg-pa-gold' : 'bg-white/20'}
 *       `}
 *     >
 *       <Animated.View
 *         style={thumbStyle}
 *         className="w-4 h-4 rounded-full bg-white"
 *       />
 *     </Pressable>
 *   );
 * }
 * ```
 * 
 * ==============================================================================
 * REQUIRED PACKAGES
 * ==============================================================================
 * 
 * ```bash
 * npm install nativewind
 * npm install expo-haptics
 * npm install react-native-reanimated  # For custom switch only
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
import * as SwitchPrimitive from "@radix-ui/react-switch@1.1.3";

import { cn } from "./utils";

/**
 * RN: Switch Component
 * 
 * CONVERSION NOTES:
 * - Replace entire Radix UI implementation with React Native Switch
 * - React Native Switch is built-in, no external library needed
 * - Much simpler than web version (native OS control)
 * - Platform-specific appearance (iOS: rounded pill, Android: track + thumb)
 * 
 * PROPS MAPPING:
 * - checked → value (boolean)
 * - onCheckedChange → onValueChange (callback)
 * - disabled → disabled (same)
 * - className → Not applicable (use style prop)
 * 
 * COLOR PROPS:
 * - trackColor: { false: offColor, true: onColor }
 * - thumbColor: color when switch is on (iOS only, Android uses trackColor)
 * - ios_backgroundColor: background color when off (iOS only)
 * 
 * TAILWIND CLASS CONVERSION:
 * - peer → Not applicable (RN doesn't use peer styling)
 * - data-[state=checked]:bg-primary → trackColor.true = colors.primary
 * - data-[state=unchecked]:bg-switch-background → trackColor.false = colors.switchBackground
 * - inline-flex → Not needed (Switch is self-contained)
 * - h-[1.15rem] w-8 → Default size on mobile (can't customize easily)
 * - shrink-0 → Not applicable
 * - items-center → Not applicable (native control)
 * - rounded-full → Native styling (can't override)
 * - border → Can add borderColor/borderWidth to container View
 * - transition-all → Animated automatically by native component
 * - outline-none → Not applicable (no focus on mobile)
 * - focus-visible → Not applicable
 * - disabled:cursor-not-allowed → disabled prop handles this
 * - disabled:opacity-50 → disabled prop automatically reduces opacity
 * 
 * THUMB (inner circle):
 * - bg-card → thumbColor = colors.card
 * - dark:data-[state=unchecked]:bg-card-foreground → Dark mode thumb color
 * - size-4 → Native sizing (platform-dependent)
 * - rounded-full → Native styling
 * - transition-transform → Native animation
 * - data-[state=checked]:translate-x → Animated by native Switch
 * 
 * PLATFORM DIFFERENCES:
 * iOS:
 * - Rounded pill shape
 * - Smooth slide animation
 * - thumbColor prop affects thumb color
 * - ios_backgroundColor for background when off
 * 
 * Android:
 * - Track + thumb design
 * - Material Design animation
 * - thumbColor less prominent
 * - Uses trackColor primarily
 * 
 * SIZE CUSTOMIZATION:
 * React Native Switch has fixed size, can't easily customize
 * To create custom size, need to build custom component with Animated API
 * 
 * HAPTIC FEEDBACK:
 * Add haptic feedback for better UX:
 * import * as Haptics from 'expo-haptics';
 * 
 * onValueChange={(value) => {
 *   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *   setIsEnabled(value);
 * }}
 * 
 * ACCESSIBILITY:
 * - accessibilityLabel: Describe what switch controls
 * - accessibilityState: { checked: value }
 * - accessibilityRole: 'switch' (automatic)
 */
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      // RN: Replace entire component with React Native Switch
      // RN: <Switch
      // RN:   value={checked}
      // RN:   onValueChange={(value) => {
      // RN:     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      // RN:     onCheckedChange(value);
      // RN:   }}
      // RN:   trackColor={{
      // RN:     false: colors.switchBackground,
      // RN:     true: colors.primary,
      // RN:   }}
      // RN:   thumbColor={checked ? colors.card : colors.cardForeground}
      // RN:   ios_backgroundColor={colors.switchBackground}
      // RN:   disabled={disabled}
      // RN:   accessibilityLabel="Toggle setting"
      // RN:   accessibilityState={{ checked: value }}
      // RN: />
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        // RN: Thumb is built into native Switch component
        // RN: Styling controlled by thumbColor prop
        className={cn(
          "bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * import React, { useState } from 'react';
 * import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * interface SwitchFieldProps {
 *   label: string;
 *   value: boolean;
 *   onValueChange: (value: boolean) => void;
 *   disabled?: boolean;
 *   description?: string;
 * }
 * 
 * export const SwitchField: React.FC<SwitchFieldProps> = ({
 *   label,
 *   value,
 *   onValueChange,
 *   disabled = false,
 *   description,
 * }) => {
 *   const handleToggle = (newValue: boolean) => {
 *     if (Platform.OS === 'ios' || Platform.OS === 'android') {
 *       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     }
 *     onValueChange(newValue);
 *   };
 *   
 *   return (
 *     <View style={styles.container}>
 *       <View style={styles.labelContainer}>
 *         <Text style={styles.label}>{label}</Text>
 *         {description && (
 *           <Text style={styles.description}>{description}</Text>
 *         )}
 *       </View>
 *       <Switch
 *         value={value}
 *         onValueChange={handleToggle}
 *         trackColor={{
 *           false: colors.switchBackground,
 *           true: colors.primary,
 *         }}
 *         thumbColor={value ? colors.card : colors.cardForeground}
 *         ios_backgroundColor={colors.switchBackground}
 *         disabled={disabled}
 *         accessibilityLabel={`Toggle ${label}`}
 *         accessibilityState={{ checked: value }}
 *       />
 *     </View>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'space-between',
 *     paddingVertical: 12,
 *   },
 *   labelContainer: {
 *     flex: 1,
 *     marginRight: 12,
 *   },
 *   label: {
 *     fontSize: 16,
 *     color: colors.foreground,
 *     marginBottom: 2,
 *   },
 *   description: {
 *     fontSize: 14,
 *     color: colors.mutedForeground,
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic switch
 * const [isEnabled, setIsEnabled] = useState(false);
 * 
 * <Switch
 *   value={isEnabled}
 *   onValueChange={setIsEnabled}
 *   trackColor={{ false: colors.muted, true: colors.primary }}
 *   thumbColor={colors.card}
 * />
 * 
 * // Switch with label
 * <SwitchField
 *   label="Enable notifications"
 *   value={notificationsEnabled}
 *   onValueChange={setNotificationsEnabled}
 * />
 * 
 * // Switch with description
 * <SwitchField
 *   label="Dark mode"
 *   description="Use dark color scheme"
 *   value={isDarkMode}
 *   onValueChange={setIsDarkMode}
 * />
 * 
 * // Disabled switch
 * <SwitchField
 *   label="Premium feature"
 *   description="Upgrade to access"
 *   value={false}
 *   onValueChange={() => {}}
 *   disabled={true}
 * />
 * 
 * // SETTINGS SCREEN EXAMPLE:
 * const SettingsScreen = () => {
 *   const [settings, setSettings] = useState({
 *     notifications: true,
 *     locationTracking: false,
 *     autoBackup: true,
 *     darkMode: false,
 *   });
 *   
 *   const updateSetting = (key: string, value: boolean) => {
 *     setSettings(prev => ({ ...prev, [key]: value }));
 *   };
 *   
 *   return (
 *     <ScrollView style={styles.screen}>
 *       <View style={styles.section}>
 *         <Text style={styles.sectionTitle}>General</Text>
 *         
 *         <SwitchField
 *           label="Push Notifications"
 *           description="Receive alerts about your properties"
 *           value={settings.notifications}
 *           onValueChange={(value) => updateSetting('notifications', value)}
 *         />
 *         
 *         <SwitchField
 *           label="Location Services"
 *           description="Allow app to access your location"
 *           value={settings.locationTracking}
 *           onValueChange={(value) => updateSetting('locationTracking', value)}
 *         />
 *       </View>
 *       
 *       <View style={styles.section}>
 *         <Text style={styles.sectionTitle}>Data & Storage</Text>
 *         
 *         <SwitchField
 *           label="Auto Backup"
 *           description="Automatically backup to cloud"
 *           value={settings.autoBackup}
 *           onValueChange={(value) => updateSetting('autoBackup', value)}
 *         />
 *       </View>
 *       
 *       <View style={styles.section}>
 *         <Text style={styles.sectionTitle}>Appearance</Text>
 *         
 *         <SwitchField
 *           label="Dark Mode"
 *           description="Use dark color scheme"
 *           value={settings.darkMode}
 *           onValueChange={(value) => updateSetting('darkMode', value)}
 *         />
 *       </View>
 *     </ScrollView>
 *   );
 * };
 * 
 * // CUSTOM STYLED SWITCH (Advanced):
 * // React Native's built-in Switch has limited styling
 * // For fully custom switch, build with Animated API:
 * 
 * import Animated, {
 *   useAnimatedStyle,
 *   useSharedValue,
 *   withSpring,
 * } from 'react-native-reanimated';
 * 
 * const CustomSwitch = ({ value, onValueChange }) => {
 *   const translateX = useSharedValue(value ? 20 : 0);
 *   
 *   const animatedStyle = useAnimatedStyle(() => ({
 *     transform: [{ translateX: withSpring(translateX.value) }],
 *   }));
 *   
 *   const handlePress = () => {
 *     const newValue = !value;
 *     translateX.value = newValue ? 20 : 0;
 *     onValueChange(newValue);
 *   };
 *   
 *   return (
 *     <Pressable
 *       onPress={handlePress}
 *       style={[
 *         styles.customTrack,
 *         value && styles.customTrackActive,
 *       ]}
 *     >
 *       <Animated.View
 *         style={[styles.customThumb, animatedStyle]}
 *       />
 *     </Pressable>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   customTrack: {
 *     width: 44,
 *     height: 24,
 *     borderRadius: 12,
 *     backgroundColor: colors.muted,
 *     padding: 2,
 *   },
 *   customTrackActive: {
 *     backgroundColor: colors.primary,
 *   },
 *   customThumb: {
 *     width: 20,
 *     height: 20,
 *     borderRadius: 10,
 *     backgroundColor: colors.card,
 *   },
 * });
 * 
 * // WITH FORM VALIDATION:
 * import { Controller } from 'react-hook-form@7.55.0';
 * 
 * <Controller
 *   control={control}
 *   name="acceptTerms"
 *   rules={{ validate: (value) => value || 'You must accept the terms' }}
 *   render={({ field: { value, onChange }, fieldState: { error } }) => (
 *     <View>
 *       <SwitchField
 *         label="I accept the terms and conditions"
 *         value={value}
 *         onValueChange={onChange}
 *       />
 *       {error && <Text style={styles.error}>{error.message}</Text>}
 *     </View>
 *   )}
 * />
 */

export { Switch };
