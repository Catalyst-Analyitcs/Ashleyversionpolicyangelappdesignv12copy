/**
 * REACT NATIVE CONVERSION - BADGE COMPONENT
 * ==========================================
 * 
 * COMPLEXITY: LOW
 * Badge is a simple inline component for labels, tags, and status indicators.
 * 
 * CONVERSION STRATEGY:
 * 1. Replace span/div with View component
 * 2. Use Text component for badge content
 * 3. Convert variant styles to StyleSheet
 * 4. Support icons within badges
 * 5. Handle interactive badges (pressable)
 * 
 * KEY DIFFERENCES:
 * - View + Text instead of span
 * - No inline-flex (use flexbox)
 * - Icons need explicit sizing
 * - Pressable for clickable badges
 * - Platform-specific shadows
 * 
 * EXAMPLE CONVERSION:
 * 
 * Web:
 * <Badge variant="default">New</Badge>
 * 
 * React Native:
 * <View style={styles.badge}>
 *   <Text style={styles.badgeText}>New</Text>
 * </View>
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

/**
 * RN: Badge Variants Definition
 * 
 * CONVERSION NOTES:
 * - Replace class-variance-authority with style functions
 * - Map each variant to color/background combination
 * - Handle focus/press states for interactive badges
 * 
 * TAILWIND TO STYLE MAPPING:
 * Base styles (all badges):
 * - inline-flex → { display: 'flex', alignSelf: 'flex-start' }
 * - items-center → { alignItems: 'center' }
 * - justify-center → { justifyContent: 'center' }
 * - rounded-md → { borderRadius: 6 }
 * - border → { borderWidth: 1 }
 * - px-2 → { paddingHorizontal: 8 }
 * - py-0.5 → { paddingVertical: 2 }
 * - text-xs → { fontSize: 12 }
 * - font-medium → { fontWeight: '500' }
 * - w-fit → { alignSelf: 'flex-start' } or { flexShrink: 1 }
 * - whitespace-nowrap → numberOfLines: 1
 * - shrink-0 → { flexShrink: 0 }
 * - gap-1 → { gap: 4 }
 * - [&>svg]:size-3 → Icon size={12}
 * - overflow-hidden → { overflow: 'hidden' }
 * - transition → Use Animated for color transitions
 * 
 * VARIANT CONVERSIONS:
 * 
 * 1. DEFAULT:
 *   - border-transparent → borderColor: 'transparent'
 *   - bg-primary → backgroundColor: colors.primary
 *   - text-primary-foreground → color: colors.primaryForeground
 *   - [a&]:hover:bg-primary/90 → Pressable pressed state
 * 
 * 2. SECONDARY:
 *   - border-transparent → borderColor: 'transparent'
 *   - bg-secondary → backgroundColor: colors.secondary
 *   - text-secondary-foreground → color: colors.secondaryForeground
 *   - [a&]:hover:bg-secondary/90 → pressed && { opacity: 0.9 }
 * 
 * 3. DESTRUCTIVE:
 *   - border-transparent → borderColor: 'transparent'
 *   - bg-destructive → backgroundColor: colors.destructive
 *   - text-white → color: '#FFFFFF'
 *   - [a&]:hover:bg-destructive/90 → pressed state
 *   - dark:bg-destructive/60 → dark mode variant
 * 
 * 4. OUTLINE:
 *   - text-foreground → color: colors.foreground
 *   - border → borderWidth: 1, borderColor: colors.border
 *   - [a&]:hover:bg-accent → pressed && backgroundColor: colors.accent
 */
const badgeVariants = cva(
  // RN: Base styles - convert to base style object
  // RN: inline-flex items-center justify-center → flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  // RN: rounded-md → borderRadius: 6
  // RN: border → borderWidth: 1
  // RN: px-2 py-0.5 → paddingHorizontal: 8, paddingVertical: 2
  // RN: text-xs → fontSize: 12
  // RN: font-medium → fontWeight: '500'
  // RN: w-fit → alignSelf: 'flex-start'
  // RN: whitespace-nowrap → numberOfLines={1} on Text
  // RN: gap-1 → gap: 4
  // RN: [&>svg]:size-3 → Icon size={12}
  // RN: overflow-hidden → overflow: 'hidden'
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        // RN: Map each variant to style object
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * RN: Badge Component
 * 
 * CONVERSION NOTES:
 * - Replace <span> with View
 * - Wrap text content in Text component
 * - asChild not applicable
 * - For interactive badges, use Pressable wrapper
 * - Support icon + text layout
 * - Add onPress for clickable badges
 * 
 * INTERACTIVE BADGE:
 * <Pressable onPress={handlePress}>
 *   <View style={styles.badge}>
 *     <Text style={styles.badgeText}>Badge</Text>
 *   </View>
 * </Pressable>
 * 
 * BADGE WITH ICON:
 * <View style={styles.badge}>
 *   <Icon size={12} color={textColor} />
 *   <Text style={styles.badgeText}>Status</Text>
 * </View>
 * 
 * REMOVABLE BADGE:
 * <View style={styles.badge}>
 *   <Text style={styles.badgeText}>Tag</Text>
 *   <Pressable onPress={handleRemove}>
 *     <X size={12} color={textColor} />
 *   </Pressable>
 * </View>
 */
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      // RN: Replace with View + Text
      // RN: className → style based on variant
      // RN: Wrap children in Text component
      // RN: For interactive badge, wrap in Pressable
      // RN: border-transparent → borderColor: 'transparent'
      // RN: rounded-md → borderRadius: 6
      // RN: px-2 py-0.5 → paddingHorizontal: 8, paddingVertical: 2
      // RN: text-xs font-medium → fontSize: 12, fontWeight: '500'
      // RN: whitespace-nowrap → numberOfLines={1}
      // RN: Icons need size={12} color prop
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * import React from 'react';
 * import { View, Text, Pressable, StyleSheet } from 'react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';
 * 
 * interface BadgeProps {
 *   variant?: BadgeVariant;
 *   children?: React.ReactNode;
 *   icon?: React.ReactNode;
 *   onPress?: () => void;
 *   onRemove?: () => void;
 *   style?: any;
 * }
 * 
 * export const Badge: React.FC<BadgeProps> = ({
 *   variant = 'default',
 *   children,
 *   icon,
 *   onPress,
 *   onRemove,
 *   style,
 * }) => {
 *   const getVariantStyle = () => {
 *     const variants = {
 *       default: {
 *         backgroundColor: colors.primary,
 *         borderColor: 'transparent',
 *       },
 *       secondary: {
 *         backgroundColor: colors.secondary,
 *         borderColor: 'transparent',
 *       },
 *       destructive: {
 *         backgroundColor: colors.destructive,
 *         borderColor: 'transparent',
 *       },
 *       outline: {
 *         backgroundColor: 'transparent',
 *         borderColor: colors.border,
 *       },
 *     };
 *     return variants[variant];
 *   };
 *   
 *   const getTextStyle = () => {
 *     const textStyles = {
 *       default: { color: colors.primaryForeground },
 *       secondary: { color: colors.secondaryForeground },
 *       destructive: { color: '#FFFFFF' },
 *       outline: { color: colors.foreground },
 *     };
 *     return textStyles[variant];
 *   };
 *   
 *   const handlePress = () => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     onPress?.();
 *   };
 *   
 *   const badgeContent = (
 *     <View style={[styles.badge, getVariantStyle(), style]}>
 *       {icon && <View style={styles.icon}>{icon}</View>}
 *       {children && (
 *         <Text style={[styles.text, getTextStyle()]} numberOfLines={1}>
 *           {children}
 *         </Text>
 *       )}
 *       {onRemove && (
 *         <Pressable 
 *           onPress={onRemove} 
 *           hitSlop={8}
 *           style={styles.removeButton}
 *         >
 *           <X size={12} color={getTextStyle().color} />
 *         </Pressable>
 *       )}
 *     </View>
 *   );
 *   
 *   if (onPress) {
 *     return (
 *       <Pressable 
 *         onPress={handlePress}
 *         style={({ pressed }) => pressed && styles.pressed}
 *       >
 *         {badgeContent}
 *       </Pressable>
 *     );
 *   }
 *   
 *   return badgeContent;
 * };
 * 
 * const styles = StyleSheet.create({
 *   badge: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     alignSelf: 'flex-start',
 *     borderRadius: 6,
 *     borderWidth: 1,
 *     paddingHorizontal: 8,
 *     paddingVertical: 2,
 *     gap: 4,
 *     overflow: 'hidden',
 *     flexShrink: 0,
 *   },
 *   text: {
 *     fontSize: 12,
 *     fontWeight: '500',
 *   },
 *   icon: {
 *     flexShrink: 0,
 *   },
 *   removeButton: {
 *     marginLeft: 2,
 *   },
 *   pressed: {
 *     opacity: 0.9,
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * import { CheckCircle, AlertTriangle, X, Star } from 'lucide-react-native';
 * 
 * // Basic badge
 * <Badge>New</Badge>
 * 
 * // Badge variants
 * <Badge variant="default">Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Outline</Badge>
 * 
 * // Badge with icon
 * <Badge 
 *   variant="default"
 *   icon={<CheckCircle size={12} color={colors.primaryForeground} />}
 * >
 *   Completed
 * </Badge>
 * 
 * // Status badges
 * <Badge 
 *   variant="secondary"
 *   icon={<Star size={12} color={colors.secondaryForeground} />}
 * >
 *   Premium
 * </Badge>
 * 
 * <Badge 
 *   variant="destructive"
 *   icon={<AlertTriangle size={12} color="#FFFFFF" />}
 * >
 *   Alert
 * </Badge>
 * 
 * // Clickable badge
 * <Badge 
 *   variant="outline"
 *   onPress={() => console.log('Badge clicked')}
 * >
 *   Clickable
 * </Badge>
 * 
 * // Removable badge (tag)
 * <Badge 
 *   variant="secondary"
 *   onRemove={() => handleRemoveTag('tag1')}
 * >
 *   Tag Name
 * </Badge>
 * 
 * // Icon-only badge (notification dot)
 * <Badge variant="destructive">
 *   3
 * </Badge>
 * 
 * // BADGE GROUP (multiple badges):
 * <View style={styles.badgeGroup}>
 *   <Badge variant="outline">React Native</Badge>
 *   <Badge variant="outline">TypeScript</Badge>
 *   <Badge variant="outline">Expo</Badge>
 * </View>
 * 
 * const styles = StyleSheet.create({
 *   badgeGroup: {
 *     flexDirection: 'row',
 *     flexWrap: 'wrap',
 *     gap: 8,
 *   },
 * });
 * 
 * // NOTIFICATION BADGE ON ICON:
 * <View style={styles.iconWithBadge}>
 *   <Bell size={24} color={colors.foreground} />
 *   <View style={styles.notificationBadge}>
 *     <Text style={styles.notificationText}>5</Text>
 *   </View>
 * </View>
 * 
 * const styles = StyleSheet.create({
 *   iconWithBadge: {
 *     position: 'relative',
 *   },
 *   notificationBadge: {
 *     position: 'absolute',
 *     top: -4,
 *     right: -4,
 *     backgroundColor: colors.destructive,
 *     borderRadius: 10,
 *     minWidth: 20,
 *     height: 20,
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     paddingHorizontal: 6,
 *   },
 *   notificationText: {
 *     color: '#FFFFFF',
 *     fontSize: 11,
 *     fontWeight: '600',
 *   },
 * });
 * 
 * // STATUS INDICATORS:
 * const StatusBadge = ({ status }: { status: 'active' | 'pending' | 'inactive' }) => {
 *   const configs = {
 *     active: {
 *       variant: 'default' as const,
 *       icon: <CheckCircle size={12} color={colors.primaryForeground} />,
 *       text: 'Active',
 *     },
 *     pending: {
 *       variant: 'secondary' as const,
 *       icon: <Clock size={12} color={colors.secondaryForeground} />,
 *       text: 'Pending',
 *     },
 *     inactive: {
 *       variant: 'outline' as const,
 *       icon: <XCircle size={12} color={colors.foreground} />,
 *       text: 'Inactive',
 *     },
 *   };
 *   
 *   const config = configs[status];
 *   
 *   return (
 *     <Badge variant={config.variant} icon={config.icon}>
 *       {config.text}
 *     </Badge>
 *   );
 * };
 * 
 * // ANIMATED BADGE (pulse effect for notifications):
 * import { useEffect, useRef } from 'react';
 * import { Animated } from 'react-native';
 * 
 * const AnimatedBadge = ({ children }: { children: React.ReactNode }) => {
 *   const scaleAnim = useRef(new Animated.Value(1)).current;
 *   
 *   useEffect(() => {
 *     const pulse = Animated.sequence([
 *       Animated.timing(scaleAnim, {
 *         toValue: 1.1,
 *         duration: 300,
 *         useNativeDriver: true,
 *       }),
 *       Animated.timing(scaleAnim, {
 *         toValue: 1,
 *         duration: 300,
 *         useNativeDriver: true,
 *       }),
 *     ]);
 *     
 *     Animated.loop(pulse).start();
 *   }, []);
 *   
 *   return (
 *     <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
 *       <Badge variant="destructive">{children}</Badge>
 *     </Animated.View>
 *   );
 * };
 */

export { Badge, badgeVariants };
