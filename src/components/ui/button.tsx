/**
 * ==============================================================================
 * BUTTON.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Primary button component with variants and interactive states.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means this button is MUCH easier to convert!
 * 
 * ✅ KEEP AS-IS (80% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: inline-flex, items-center, justify-center
 *    - Spacing: gap-2, px-4, py-2, px-3, etc.
 *    - Colors: bg-primary, text-*, border-* (all work!)
 *    - Sizing: h-9, h-8, h-10, size-9
 *    - Borders: rounded-md, border
 *    - Typography: text-sm, font-medium
 * 
 * ❌ CONVERT ONLY THESE:
 *    - button → Pressable
 *    - Remove hover:, focus-visible:, disabled: pseudo-classes
 *    - Add Pressable state handling for press effects
 *    - Replace class-variance-authority with className function
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - INTERACTIVE STATES
 * ==============================================================================
 * 
 * The main challenge is converting hover/focus pseudo-classes to Pressable states.
 * All other Tailwind classes remain identical!
 * 
 * BEFORE (Web):
 * ```tsx
 * <button className="bg-primary text-primary-foreground hover:bg-primary/90">
 *   Submit
 * </button>
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * import { Pressable, Text } from 'react-native';
 * 
 * <Pressable
 *   className={({ pressed }) => `
 *     inline-flex items-center justify-center gap-2 rounded-md px-4 py-2
 *     bg-pa-gold text-black
 *     ${pressed ? 'bg-pa-gold/80' : ''}
 *     ${disabled ? 'opacity-50' : ''}
 *   `}
 * >
 *   <Text className="text-sm font-medium text-black">Submit</Text>
 * </Pressable>
 * ```
 * 
 * KEY POINTS:
 * - ✅ All layout/spacing/color classes work as-is!
 * - ❌ Remove hover:, focus-visible: prefixes
 * - ✅ Use className function with ({ pressed }) parameter
 * - ✅ Apply conditional classes based on pressed state
 * - ✅ All other Tailwind utilities preserved!
 * 
 * ==============================================================================
 * NATIVEWIND BUTTON VARIANTS
 * ==============================================================================
 * 
 * With NativeWind, you can keep the variant structure but simplify it:
 * 
 * ```tsx
 * // Create variant className functions
 * const getButtonClassName = ({ 
 *   variant = 'default', 
 *   size = 'default',
 *   pressed = false,
 *   disabled = false 
 * }) => {
 *   const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-md';
 *   
 *   const variantClasses = {
 *     default: `bg-pa-gold text-black ${pressed ? 'bg-pa-gold/80' : ''}`,
 *     destructive: `bg-red-600 text-white ${pressed ? 'bg-red-700' : ''}`,
 *     outline: `border border-pa-border bg-transparent text-white ${pressed ? 'bg-white/10' : ''}`,
 *     secondary: `bg-white/10 text-white ${pressed ? 'bg-white/20' : ''}`,
 *     ghost: `bg-transparent text-white ${pressed ? 'bg-white/10' : ''}`,
 *     link: `bg-transparent text-pa-gold ${pressed ? 'opacity-80' : ''}`,
 *   };
 *   
 *   const sizeClasses = {
 *     default: 'h-9 px-4 py-2',
 *     sm: 'h-8 px-3 gap-1.5',
 *     lg: 'h-10 px-6',
 *     icon: 'size-9',
 *   };
 *   
 *   return `
 *     ${baseClasses}
 *     ${variantClasses[variant]}
 *     ${sizeClasses[size]}
 *     ${disabled ? 'opacity-50' : ''}
 *   `.trim();
 * };
 * 
 * // Usage
 * <Pressable
 *   className={({ pressed }) => getButtonClassName({ 
 *     variant: 'default', 
 *     size: 'lg', 
 *     pressed,
 *     disabled 
 *   })}
 * >
 *   <Text className="text-sm font-medium text-black">Button</Text>
 * </Pressable>
 * ```
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND BUTTON EXAMPLE
 * ==============================================================================
 * 
 * ```tsx
 * import React from 'react';
 * import { Pressable, Text, ActivityIndicator, View } from 'react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * interface ButtonProps {
 *   variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
 *   size?: 'default' | 'sm' | 'lg' | 'icon';
 *   disabled?: boolean;
 *   loading?: boolean;
 *   onPress?: () => void;
 *   children?: React.ReactNode;
 *   icon?: React.ReactNode;
 *   className?: string;
 * }
 * 
 * export function Button({
 *   variant = 'default',
 *   size = 'default',
 *   disabled = false,
 *   loading = false,
 *   onPress,
 *   children,
 *   icon,
 *   className = '',
 * }: ButtonProps) {
 *   const getButtonClassName = (pressed: boolean) => {
 *     const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-md';
 *     
 *     const variantClasses = {
 *       default: `bg-pa-gold ${pressed ? 'bg-pa-gold/80' : ''}`,
 *       destructive: `bg-red-600 ${pressed ? 'bg-red-700' : ''}`,
 *       outline: `border border-pa-border bg-transparent ${pressed ? 'bg-white/10' : ''}`,
 *       secondary: `bg-white/10 ${pressed ? 'bg-white/20' : ''}`,
 *       ghost: `bg-transparent ${pressed ? 'bg-white/10' : ''}`,
 *       link: `bg-transparent ${pressed ? 'opacity-80' : ''}`,
 *     };
 *     
 *     const sizeClasses = {
 *       default: 'h-9 px-4 py-2',
 *       sm: 'h-8 px-3',
 *       lg: 'h-10 px-6',
 *       icon: 'size-9',
 *     };
 *     
 *     return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50' : ''} ${className}`;
 *   };
 *   
 *   const getTextClassName = () => {
 *     const textColors = {
 *       default: 'text-black',
 *       destructive: 'text-white',
 *       outline: 'text-white',
 *       secondary: 'text-white',
 *       ghost: 'text-white',
 *       link: 'text-pa-gold',
 *     };
 *     return `text-sm font-medium ${textColors[variant]}`;
 *   };
 *   
 *   const handlePress = () => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     onPress?.();
 *   };
 *   
 *   return (
 *     <Pressable
 *       onPress={handlePress}
 *       disabled={disabled || loading}
 *       className={({ pressed }) => getButtonClassName(pressed)}
 *     >
 *       {loading ? (
 *         <ActivityIndicator size="small" color="#000000" />
 *       ) : (
 *         <>
 *           {icon}
 *           {children && <Text className={getTextClassName()}>{children}</Text>}
 *         </>
 *       )}
 *     </Pressable>
 *   );
 * }
 * 
 * // USAGE EXAMPLES:
 * import { Mail, Trash2 } from 'lucide-react-native';
 * 
 * // Basic button - All Tailwind classes work!
 * <Button onPress={() => console.log('Pressed')}>
 *   Click Me
 * </Button>
 * 
 * // With icon
 * <Button 
 *   variant="default" 
 *   icon={<Mail size={16} color="#000000" />}
 *   onPress={handleEmail}
 * >
 *   Send Email
 * </Button>
 * 
 * // Destructive
 * <Button variant="destructive" onPress={handleDelete}>
 *   Delete
 * </Button>
 * 
 * // Custom className (NativeWind classes work!)
 * <Button className="w-full mt-4" onPress={handleSubmit}>
 *   Submit
 * </Button>
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
 * ```
 * 
 * ==============================================================================
 * SETUP REQUIRED
 * ==============================================================================
 * 
 * See /NATIVEWIND_CONVERSION_GUIDE.md for:
 * - tailwind.config.js setup with PolicyAngel colors
 * - babel.config.js configuration
 * - global.css creation
 * - Complete PolicyAngel design system integration
 * 
 * ==============================================================================
 * LEGACY DETAILED ANNOTATIONS (Pre-NativeWind)
 * ==============================================================================
 * 
 * The annotations below show the original StyleSheet approach.
 * With NativeWind, most of this is unnecessary - just use className!
 * 
 * COMPLEXITY: MEDIUM → LOW (with NativeWind)
 * 
 * CONVERSION STRATEGY (Original):
 * 1. Replace HTML button with Pressable from react-native ✅ Still needed
 * 2. Convert class-variance-authority variants to style functions ❌ Use className function instead
 * 3. Map hover/press states to Pressable's state callbacks ✅ Still needed
 * 4. Add haptic feedback for better mobile UX ✅ Still needed
 * 5. Handle disabled states with conditional styling ✅ Use className conditionals
 * 6. Implement loading state with ActivityIndicator ✅ Still needed
 * 
 * ==============================================================================
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

/**
 * RN: Button Variants Definition
 * 
 * CONVERSION NOTES:
 * - class-variance-authority not needed in RN
 * - Create style functions that return StyleSheet objects
 * - Map variant strings to style combinations
 * - Handle dark mode with separate color sets
 * 
 * TAILWIND TO STYLE MAPPING:
 * Base styles (applied to all buttons):
 * - inline-flex → { display: 'flex', alignSelf: 'flex-start' }
 * - items-center → { alignItems: 'center' }
 * - justify-center → { justifyContent: 'center' }
 * - gap-2 → { gap: 8 }
 * - whitespace-nowrap → numberOfLines: 1 on Text
 * - rounded-md → { borderRadius: 6 }
 * - text-sm → { fontSize: 14 }
 * - font-medium → { fontWeight: '500' }
 * - transition-all → Use Animated API
 * - disabled:opacity-50 → disabled && { opacity: 0.5 }
 * - shrink-0 → { flexShrink: 0 }
 * - outline-none → Not applicable
 * - focus-visible → Press state styling
 * 
 * VARIANT CONVERSIONS:
 * 
 * 1. DEFAULT:
 *   - bg-primary → backgroundColor: colors.primary
 *   - text-primary-foreground → color: colors.primaryForeground
 *   - hover:bg-primary/90 → pressed && { opacity: 0.9 }
 * 
 * 2. DESTRUCTIVE:
 *   - bg-destructive → backgroundColor: colors.destructive
 *   - text-white → color: '#FFFFFF'
 *   - hover:bg-destructive/90 → pressed && { opacity: 0.9 }
 *   - dark:bg-destructive/60 → dark mode variant
 * 
 * 3. OUTLINE:
 *   - border → borderWidth: 1
 *   - bg-background → backgroundColor: colors.background
 *   - text-foreground → color: colors.foreground
 *   - hover:bg-accent → pressed && backgroundColor: colors.accent
 *   - dark:bg-input/30 → dark mode variant
 *   - dark:border-input → dark mode border
 * 
 * 4. SECONDARY:
 *   - bg-secondary → backgroundColor: colors.secondary
 *   - text-secondary-foreground → color: colors.secondaryForeground
 *   - hover:bg-secondary/80 → pressed && { opacity: 0.8 }
 * 
 * 5. GHOST:
 *   - No background by default
 *   - hover:bg-accent → pressed && backgroundColor: colors.accent
 *   - hover:text-accent-foreground → pressed && color: colors.accentForeground
 * 
 * 6. LINK:
 *   - text-primary → color: colors.primary
 *   - underline-offset-4 → textDecorationLine: 'underline', textDecorationStyle: 'solid'
 *   - hover:underline → pressed state with underline
 * 
 * SIZE VARIANTS:
 * 
 * 1. DEFAULT:
 *   - h-9 → height: 36
 *   - px-4 → paddingHorizontal: 16
 *   - py-2 → paddingVertical: 8
 *   - has-[>svg]:px-3 → With icon, paddingHorizontal: 12
 * 
 * 2. SM:
 *   - h-8 → height: 32
 *   - px-3 → paddingHorizontal: 12
 *   - gap-1.5 → gap: 6
 *   - has-[>svg]:px-2.5 → With icon, paddingHorizontal: 10
 * 
 * 3. LG:
 *   - h-10 → height: 40
 *   - px-6 → paddingHorizontal: 24
 *   - has-[>svg]:px-4 → With icon, paddingHorizontal: 16
 * 
 * 4. ICON:
 *   - size-9 → width: 36, height: 36
 *   - rounded-md → borderRadius: 6
 *   - No text, just icon centered
 */
const buttonVariants = cva(
  // RN: Base styles - convert to base style object
  // RN: inline-flex items-center justify-center → flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  // RN: gap-2 → { gap: 8 }
  // RN: rounded-md → { borderRadius: 6 }
  // RN: text-sm font-medium → fontSize: 14, fontWeight: '500'
  // RN: disabled:opacity-50 → conditional opacity
  // RN: focus-visible → Pressable pressed state
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // RN: Map each variant to style object
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // RN: Map each size to style object with dimensions
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * RN: Button Component
 * 
 * CONVERSION NOTES:
 * - Replace <button> with Pressable
 * - asChild prop not applicable (RN doesn't use slots)
 * - Add onPress handler (required for button behavior)
 * - Include haptic feedback on press
 * - Support loading state with ActivityIndicator
 * - Handle icon + text layouts
 * - Android ripple effect for material design
 * 
 * PRESSABLE STATES:
 * - onPress: Main action handler
 * - onPressIn: Touch start (optional haptic)
 * - onPressOut: Touch end
 * - onLongPress: Long press action
 * - disabled: Disable interactions
 * - style: Function for state-based styling
 * 
 * HAPTIC FEEDBACK:
 * import * as Haptics from 'expo-haptics';
 * 
 * onPress={() => {
 *   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *   handlePress();
 * }}
 * 
 * ANDROID RIPPLE:
 * android_ripple={{
 *   color: colors.primary + '20', // 20% opacity
 *   borderless: false,
 * }}
 * 
 * LOADING STATE:
 * import { ActivityIndicator } from 'react-native';
 * 
 * Conditional rendering:
 * loading ? (
 *   <ActivityIndicator size="small" color={textColor} />
 * ) : (
 *   <Text>{children}</Text>
 * )
 * 
 * ICON HANDLING:
 * - Icons need explicit size prop
 * - Color should match text color
 * - Position with flexDirection
 * 
 * <Icon size={16} color={colors.primaryForeground} />
 * 
 * FULL WIDTH BUTTON:
 * Add style prop: { width: '100%' }
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      // RN: Replace with Pressable
      // RN: className → style function based on variant/size
      // RN: onClick → onPress
      // RN: disabled → disabled prop (same)
      // RN: Add android_ripple for material design
      // RN: Add haptic feedback in onPress
      // RN: Support loading state
      // RN: Handle icon + text layout with flexDirection: 'row'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * import React from 'react';
 * import { Pressable, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
 * type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
 * 
 * interface ButtonProps {
 *   variant?: ButtonVariant;
 *   size?: ButtonSize;
 *   disabled?: boolean;
 *   loading?: boolean;
 *   onPress?: () => void;
 *   onLongPress?: () => void;
 *   icon?: React.ReactNode;
 *   iconPosition?: 'left' | 'right';
 *   fullWidth?: boolean;
 *   children?: React.ReactNode;
 *   style?: any;
 *   hapticFeedback?: boolean;
 * }
 * 
 * export const Button: React.FC<ButtonProps> = ({
 *   variant = 'default',
 *   size = 'default',
 *   disabled = false,
 *   loading = false,
 *   onPress,
 *   onLongPress,
 *   icon,
 *   iconPosition = 'left',
 *   fullWidth = false,
 *   children,
 *   style,
 *   hapticFeedback = true,
 * }) => {
 *   const handlePress = () => {
 *     if (hapticFeedback) {
 *       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     }
 *     onPress?.();
 *   };
 *   
 *   const getVariantStyle = (pressed: boolean) => {
 *     const baseStyle = {
 *       default: {
 *         backgroundColor: pressed ? colors.primary + 'E6' : colors.primary,
 *       },
 *       destructive: {
 *         backgroundColor: pressed ? colors.destructive + 'E6' : colors.destructive,
 *       },
 *       outline: {
 *         backgroundColor: pressed ? colors.accent : colors.background,
 *         borderWidth: 1,
 *         borderColor: colors.input,
 *       },
 *       secondary: {
 *         backgroundColor: pressed ? colors.secondary + 'CC' : colors.secondary,
 *       },
 *       ghost: {
 *         backgroundColor: pressed ? colors.accent : 'transparent',
 *       },
 *       link: {
 *         backgroundColor: 'transparent',
 *       },
 *     };
 *     return baseStyle[variant];
 *   };
 *   
 *   const getTextStyle = () => {
 *     const textStyles = {
 *       default: { color: colors.primaryForeground },
 *       destructive: { color: '#FFFFFF' },
 *       outline: { color: colors.foreground },
 *       secondary: { color: colors.secondaryForeground },
 *       ghost: { color: colors.foreground },
 *       link: { 
 *         color: colors.primary,
 *         textDecorationLine: 'underline' as const,
 *       },
 *     };
 *     return textStyles[variant];
 *   };
 *   
 *   const getSizeStyle = () => {
 *     const sizeStyles = {
 *       default: {
 *         height: 36,
 *         paddingHorizontal: icon ? 12 : 16,
 *         paddingVertical: 8,
 *       },
 *       sm: {
 *         height: 32,
 *         paddingHorizontal: icon ? 10 : 12,
 *         paddingVertical: 6,
 *         gap: 6,
 *       },
 *       lg: {
 *         height: 40,
 *         paddingHorizontal: icon ? 16 : 24,
 *         paddingVertical: 10,
 *       },
 *       icon: {
 *         width: 36,
 *         height: 36,
 *         paddingHorizontal: 0,
 *         paddingVertical: 0,
 *       },
 *     };
 *     return sizeStyles[size];
 *   };
 *   
 *   const getRippleColor = () => {
 *     const rippleColors = {
 *       default: colors.primaryForeground + '20',
 *       destructive: '#FFFFFF20',
 *       outline: colors.accent + '40',
 *       secondary: colors.secondaryForeground + '20',
 *       ghost: colors.foreground + '10',
 *       link: colors.primary + '10',
 *     };
 *     return rippleColors[variant];
 *   };
 *   
 *   const iconColor = getTextStyle().color;
 *   const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;
 *   
 *   return (
 *     <Pressable
 *       onPress={handlePress}
 *       onLongPress={onLongPress}
 *       disabled={disabled || loading}
 *       android_ripple={{ color: getRippleColor() }}
 *       style={({ pressed }) => [
 *         styles.base,
 *         getVariantStyle(pressed),
 *         getSizeStyle(),
 *         fullWidth && styles.fullWidth,
 *         (disabled || loading) && styles.disabled,
 *         style,
 *       ]}
 *     >
 *       {loading ? (
 *         <ActivityIndicator size="small" color={iconColor} />
 *       ) : (
 *         <>
 *           {icon && iconPosition === 'left' && (
 *             <View style={styles.icon}>{icon}</View>
 *           )}
 *           {children && (
 *             <Text 
 *               style={[styles.text, getTextStyle()]}
 *               numberOfLines={1}
 *             >
 *               {children}
 *             </Text>
 *           )}
 *           {icon && iconPosition === 'right' && (
 *             <View style={styles.icon}>{icon}</View>
 *           )}
 *         </>
 *       )}
 *     </Pressable>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   base: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     gap: 8,
 *     borderRadius: 6,
 *     flexShrink: 0,
 *   },
 *   text: {
 *     fontSize: 14,
 *     fontWeight: '500',
 *   },
 *   icon: {
 *     flexShrink: 0,
 *   },
 *   fullWidth: {
 *     width: '100%',
 *   },
 *   disabled: {
 *     opacity: 0.5,
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * import { Mail, ChevronRight, Trash2 } from 'lucide-react-native';
 * 
 * // Basic button
 * <Button onPress={() => console.log('Pressed')}>
 *   Click Me
 * </Button>
 * 
 * // Button with icon
 * <Button 
 *   variant="default" 
 *   icon={<Mail size={16} color={colors.primaryForeground} />}
 *   onPress={handleEmail}
 * >
 *   Send Email
 * </Button>
 * 
 * // Icon button (icon only)
 * <Button 
 *   size="icon" 
 *   variant="outline"
 *   onPress={handleDelete}
 * >
 *   <Trash2 size={16} color={colors.foreground} />
 * </Button>
 * 
 * // Loading button
 * <Button 
 *   variant="default" 
 *   loading={isSubmitting}
 *   onPress={handleSubmit}
 * >
 *   Submit
 * </Button>
 * 
 * // Destructive button
 * <Button 
 *   variant="destructive"
 *   icon={<Trash2 size={16} color="#FFFFFF" />}
 *   onPress={handleDelete}
 * >
 *   Delete Account
 * </Button>
 * 
 * // Full width button
 * <Button 
 *   variant="default" 
 *   fullWidth 
 *   onPress={handleContinue}
 * >
 *   Continue
 * </Button>
 * 
 * // Disabled button
 * <Button 
 *   variant="outline" 
 *   disabled={!isValid}
 *   onPress={handleSubmit}
 * >
 *   Submit
 * </Button>
 * 
 * // Link button
 * <Button variant="link" onPress={() => navigation.navigate('Terms')}>
 *   Terms of Service
 * </Button>
 * 
 * // Button with right icon
 * <Button 
 *   icon={<ChevronRight size={16} color={colors.primaryForeground} />}
 *   iconPosition="right"
 *   onPress={handleNext}
 * >
 *   Next
 * </Button>
 * 
 * // BUTTON GROUP:
 * <View style={styles.buttonGroup}>
 *   <Button variant="outline" style={styles.buttonGroupItem}>
 *     Cancel
 *   </Button>
 *   <Button variant="default" style={styles.buttonGroupItem}>
 *     Confirm
 *   </Button>
 * </View>
 * 
 * const styles = StyleSheet.create({
 *   buttonGroup: {
 *     flexDirection: 'row',
 *     gap: 8,
 *   },
 *   buttonGroupItem: {
 *     flex: 1,
 *   },
 * });
 */

export { Button, buttonVariants };
