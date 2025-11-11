/**
 * ==============================================================================
 * QUICKACTIONCARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Reusable action card component with glassmorphic or solid styling.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means this component is MUCH easier to convert!
 * 
 * ✅ KEEP AS-IS (80% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, flex-col, items-center, justify-center
 *    - Spacing: p-4, p-5, gap-2
 *    - Colors: bg-pa-gold, text-pa-text-primary, border-pa-border
 *    - Borders: rounded-xl, border
 *    - Sizing: w-full, h-[140px]
 *    - Opacity, transforms all work!
 * 
 * ❌ CONVERT ONLY THESE:
 *    - button → Pressable with className function
 *    - backdrop-blur → BlurView (for glass variant)
 *    - hover: → Pressable ({ pressed }) state
 *    - Add haptic feedback on press
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - PRESSABLE CARD
 * ==============================================================================
 * 
 * BEFORE (Web):
 * ```tsx
 * <button
 *   className="flex flex-col items-center justify-center p-5 rounded-xl 
 *     bg-white/10 backdrop-blur-lg border border-white/20
 *     hover:bg-white/20 transition-all"
 * >
 *   <Icon />
 *   <h3>Title</h3>
 *   <p>Subtitle</p>
 * </button>
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * import { Pressable, View, Text } from 'react-native';
 * import { BlurView } from 'expo-blur';
 * import { styled } from 'nativewind';
 * import * as Haptics from 'expo-haptics';
 * 
 * const StyledBlurView = styled(BlurView);
 * 
 * <Pressable
 *   onPress={() => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     onPress?.();
 *   }}
 *   className={({ pressed }) => `
 *     flex flex-col items-center justify-center p-5 rounded-xl
 *     border border-white/20
 *     ${pressed ? 'opacity-80 scale-95' : 'opacity-100'}
 *   `}
 * >
 *   <StyledBlurView
 *     intensity={20}
 *     tint="light"
 *     className="absolute inset-0 rounded-xl bg-white/10"
 *   />
 *   <Icon />
 *   <Text className="text-white font-semibold">Title</Text>
 *   <Text className="text-white/60 text-sm">Subtitle</Text>
 * </Pressable>
 * ```
 * 
 * KEY POINTS:
 * - ✅ All spacing, layout, color classes work as-is!
 * - ❌ Replace backdrop-blur with BlurView
 * - ❌ Convert hover: to Pressable ({ pressed }) state
 * - ✅ All other Tailwind utilities preserved!
 * 
 * ==============================================================================
 * NATIVEWIND - GLASS VS SOLID VARIANTS
 * ==============================================================================
 * 
 * Glass Variant:
 * ```tsx
 * {variant === 'glass' ? (
 *   <Pressable className="relative overflow-hidden rounded-xl">
 *     <StyledBlurView
 *       intensity={20}
 *       tint="light"
 *       className="absolute inset-0 bg-white/10"
 *     />
 *     <View className="p-5 flex flex-col items-center gap-2">
 *       // Content
 *     </View>
 *   </Pressable>
 * ) : (
 *   <Pressable className="bg-pa-gold rounded-xl p-5 flex flex-col items-center gap-2">
 *     // Content
 *   </Pressable>
 * )}
 * ```
 * 
 * ==============================================================================
 * NATIVEWIND - SIZE VARIANTS
 * ==============================================================================
 * 
 * All sizes work with Tailwind classes:
 * 
 * ```tsx
 * const sizeClasses = {
 *   sm: 'h-[100px] p-3',
 *   md: 'h-[120px] p-4',
 *   lg: 'h-[140px] p-5',
 * };
 * 
 * <Pressable className={`rounded-xl ${sizeClasses[size]}`}>
 * ```
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND QUICK ACTION CARD
 * ==============================================================================
 * 
 * ```tsx
 * import React from 'react';
 * import { Pressable, View, Text } from 'react-native';
 * import { BlurView } from 'expo-blur';
 * import { styled } from 'nativewind';
 * import * as Haptics from 'expo-haptics';
 * 
 * const StyledBlurView = styled(BlurView);
 * 
 * interface QuickActionCardProps {
 *   title: string;
 *   subtitle: string;
 *   icon: React.ReactNode;
 *   onPress?: () => void;
 *   size?: 'sm' | 'md' | 'lg';
 *   variant?: 'glass' | 'solid';
 *   disabled?: boolean;
 * }
 * 
 * export function QuickActionCard({
 *   title,
 *   subtitle,
 *   icon,
 *   onPress,
 *   size = 'lg',
 *   variant = 'glass',
 *   disabled = false,
 * }: QuickActionCardProps) {
 *   const sizeClasses = {
 *     sm: 'h-[100px] p-3',
 *     md: 'h-[120px] p-4',
 *     lg: 'h-[140px] p-5',
 *   };
 *   
 *   const iconSizes = {
 *     sm: 36,
 *     md: 40,
 *     lg: 48,
 *   };
 *   
 *   const handlePress = () => {
 *     if (!disabled && onPress) {
 *       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *       onPress();
 *     }
 *   };
 *   
 *   if (variant === 'glass') {
 *     return (
 *       <Pressable
 *         onPress={handlePress}
 *         disabled={disabled}
 *         className={({ pressed }) => `
 *           relative overflow-hidden rounded-xl
 *           border border-white/20
 *           ${sizeClasses[size]}
 *           ${pressed ? 'opacity-80 scale-[0.98]' : 'opacity-100'}
 *           ${disabled ? 'opacity-50' : ''}
 *         `}
 *       >
 *         <StyledBlurView
 *           intensity={20}
 *           tint="light"
 *           className="absolute inset-0 bg-white/10"
 *         />
 *         <View className="flex-1 flex flex-col items-center justify-center gap-2">
 *           <View style={{ width: iconSizes[size], height: iconSizes[size] }}>
 *             {icon}
 *           </View>
 *           <Text className="text-white font-semibold text-center">
 *             {title}
 *           </Text>
 *           <Text className="text-white/60 text-sm text-center">
 *             {subtitle}
 *           </Text>
 *         </View>
 *       </Pressable>
 *     );
 *   }
 *   
 *   return (
 *     <Pressable
 *       onPress={handlePress}
 *       disabled={disabled}
 *       className={({ pressed }) => `
 *         rounded-xl bg-pa-gold
 *         flex flex-col items-center justify-center gap-2
 *         ${sizeClasses[size]}
 *         ${pressed ? 'opacity-90 scale-[0.98]' : 'opacity-100'}
 *         ${disabled ? 'opacity-50' : ''}
 *       `}
 *     >
 *       <View style={{ width: iconSizes[size], height: iconSizes[size] }}>
 *         {icon}
 *       </View>
 *       <Text className="text-pa-dark font-bold text-center">
 *         {title}
 *       </Text>
 *       <Text className="text-pa-dark/70 text-sm text-center">
 *         {subtitle}
 *       </Text>
 *     </Pressable>
 *   );
 * }
 * 
 * // USAGE EXAMPLES:
 * 
 * // Glass variant with large size
 * import { Camera } from 'lucide-react-native';
 * 
 * <QuickActionCard
 *   title="Photo Capture"
 *   subtitle="Document property"
 *   icon={<Camera size={48} color="#ffffff" />}
 *   onPress={() => navigation.navigate('PhotoCapture')}
 *   variant="glass"
 *   size="lg"
 * />
 * 
 * // Solid variant with medium size
 * import { FileText } from 'lucide-react-native';
 * 
 * <QuickActionCard
 *   title="Documents"
 *   subtitle="View files"
 *   icon={<FileText size={40} color="#000000" />}
 *   onPress={() => navigation.navigate('Documents')}
 *   variant="solid"
 *   size="md"
 * />
 * 
 * // Disabled state
 * <QuickActionCard
 *   title="Coming Soon"
 *   subtitle="Feature locked"
 *   icon={<Lock size={48} color="#ffffff" />}
 *   variant="glass"
 *   disabled
 * />
 * ```
 * 
 * ==============================================================================
 * REQUIRED PACKAGES
 * ==============================================================================
 * 
 * ```bash
 * npm install nativewind
 * npm install expo-blur
 * npm install expo-haptics
 * npm install lucide-react-native
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
 * TESTING CHECKLIST:
 * - [ ] Card renders correctly
 * - [ ] Press interaction works
 * - [ ] Variants display properly
 * - [ ] Sizes correct
 * - [ ] iOS and Android compatible
 * 
 * ==============================================================================
 */

// RN: import { View, Text, Pressable, StyleSheet } from 'react-native';
// RN: import { BlurView } from 'expo-blur';
// RN: import * as Haptics from 'expo-haptics';
import { ReactNode } from "react";
import { Card } from "./ui/card"; // RN: Remove - replace with custom View/BlurView

export interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode; // RN: ReactNode works the same in RN
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'glass' | 'solid';
  disabled?: boolean;
  focused?: boolean;
  className?: string; // RN: Remove - not used in React Native
}

export function QuickActionCard({
  title,
  subtitle,
  icon,
  onPress,
  size = 'lg',
  variant = 'glass',
  disabled = false,
  focused = false,
  className = '', // RN: Remove this parameter
}: QuickActionCardProps) {
  
  // RN: Size styles remain similar, but values need to be numbers
  // RN: Remove CSS variables, use theme values directly
  const sizeStyles = {
    sm: {
      height: '100px', // RN: height: 100
      iconSize: '36px', // RN: iconSize: 36
      titleSize: '12px', // RN: titleSize: 12
      subtitleSize: '11px', // RN: subtitleSize: 11
      padding: 'var(--spacing-3)', // RN: padding: theme.spacing[3] or 12
    },
    md: {
      height: 'var(--chat-card-height)', // RN: height: 120
      iconSize: '40px', // RN: iconSize: 40
      titleSize: 'var(--text-sm)', // RN: titleSize: theme.fontSize.sm or 14
      subtitleSize: '12px', // RN: subtitleSize: 12
      padding: 'var(--spacing-4)', // RN: padding: 16
    },
    lg: {
      height: '140px', // RN: height: 140
      iconSize: '48px', // RN: iconSize: 48
      titleSize: 'var(--text-base)', // RN: titleSize: 16
      subtitleSize: 'var(--text-sm)', // RN: subtitleSize: 14
      padding: 'var(--spacing-5)', // RN: padding: 20
    },
  };

  const currentSize = sizeStyles[size];

  // RN: Add haptic feedback handler
  // RN: const handlePress = async () => {
  // RN:   if (!disabled && onPress) {
  // RN:     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  // RN:     onPress();
  // RN:   }
  // RN: };

  return (
    // RN: Replace Card with Pressable wrapper
    // RN: For glass variant, use BlurView; for solid, use plain View
    // RN: {variant === 'glass' ? (
    // RN:   <BlurView intensity={60} tint="dark" style={[styles.card, styles[`card${size.toUpperCase()}`]]}>
    // RN: ) : (
    // RN:   <View style={[styles.card, styles[`card${size.toUpperCase()}`], styles.cardSolid]}>
    // RN: )}
    // RN: Wrap entire card in Pressable:
    // RN: <Pressable 
    // RN:   onPress={handlePress}
    // RN:   disabled={disabled}
    // RN:   style={({ pressed }) => [
    // RN:     styles.cardContainer,
    // RN:     focused && styles.cardFocused,
    // RN:     disabled && styles.cardDisabled,
    // RN:     pressed && styles.cardPressed,
    // RN:   ]}
    // RN: >
    <Card
      className={`backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
        focused ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      // RN: Remove entire className - use StyleSheet instead
      style={{
        borderRadius: 'var(--chat-card-radius)', // RN: borderRadius: theme.borderRadius.lg or 16
        height: currentSize.height, // RN: height: currentSize.height (as number)
        padding: currentSize.padding, // RN: padding: currentSize.padding (as number)
        backgroundColor: variant === 'glass' ? 'var(--card-bg)' : 'var(--card-bg)', // RN: For glass, omit or use transparent; for solid, use theme.colors.cardBg
        borderColor: 'var(--card-border)', // RN: borderColor: theme.colors.cardBorder
        // RN: boxShadow → shadow properties:
        // RN: shadowColor: '#000',
        // RN: shadowOffset: { width: 0, height: 4 },
        // RN: shadowOpacity: 0.3,
        // RN: shadowRadius: 8,
        // RN: elevation: 5, // Android shadow
        boxShadow: focused 
          ? 'var(--effect-card-premium), var(--glow-medium)'
          : 'var(--effect-card-premium)',
        // RN: For focused state, increase shadowOpacity and add borderColor
        // RN: ...(focused && { borderColor: theme.colors.primary, borderWidth: 2 })
      }}
      onClick={!disabled ? onPress : undefined} // RN: Remove - handled by Pressable
    >
      {/* RN: <View style={styles.content}> */}
      <div 
        className="flex flex-col h-full justify-between" // RN: style={{ flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}
      >
        {/* Icon and Title */}
        {/* RN: <View style={styles.header}> */}
        <div 
          className="flex items-start" // RN: flexDirection: 'row', alignItems: 'flex-start'
          style={{ gap: 'var(--spacing-3)' }} // RN: No gap in RN - use marginRight on first child or separate Views
          // RN: Alternative: style={{ flexDirection: 'row', alignItems: 'flex-start' }}
          // RN: Then add marginRight: 12 to iconContainer
        >
          {/* RN: <View style={styles.iconContainer}> */}
          <div 
            className="flex items-center justify-center rounded-full flex-shrink-0 relative" // RN: flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: currentSize.iconSize / 2, flexShrink: 0
            style={{ 
              width: currentSize.iconSize, // RN: width: currentSize.iconSize (as number)
              height: currentSize.iconSize, // RN: height: currentSize.iconSize (as number)
              backgroundColor: 'var(--icon-bg)', // RN: backgroundColor: theme.colors.iconBg
              border: '1px solid var(--icon-border)', // RN: borderWidth: 1, borderColor: theme.colors.iconBorder
              boxShadow: 'var(--effect-button-premium)', // RN: Use shadow properties
            }}
          >
            {/* Inner glow */}
            {/* RN: Use LinearGradient from expo-linear-gradient instead */}
            {/* RN: import LinearGradient from 'expo-linear-gradient'; */}
            {/* RN: <LinearGradient
                  colors={['rgba(255, 255, 255, 0.05)', 'transparent']}
                  style={styles.iconGlow}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                /> */}
            <div
              className="absolute inset-0 pointer-events-none rounded-full" // RN: position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: currentSize.iconSize / 2
              style={{
                background: 'var(--inner-glow-subtle)', // RN: Replace with LinearGradient component
              }}
            />
            {/* RN: <View style={styles.iconWrapper}> */}
            <div className="relative z-10" style={{ filter: 'var(--icon-drop-shadow)' }}>
              {/* RN: filter not supported - use shadow properties on View instead */}
              {/* RN: Icon renders the same, but may need size prop: */}
              {/* RN: {React.cloneElement(icon as React.ReactElement, { width: 24, height: 24, color: theme.colors.iconColor })} */}
              {icon}
            </div>
            {/* RN: </View> */}
          </div>
          {/* RN: </View> */}

          {/* RN: <View style={styles.textContainer}> */}
          <div className="flex flex-col" style={{ gap: '2px' }}> {/* RN: flexDirection: 'column' (gap not supported, use marginBottom) */}
            {/* Title */}
            {/* RN: <Text style={[styles.title, styles[`title${size.toUpperCase()}`]]}> */}
            <h4 
              className="m-0" // RN: Remove className
              style={{ 
                fontSize: currentSize.titleSize, // RN: fontSize: currentSize.titleSize (as number)
                fontWeight: 'var(--font-weight-semibold)', // RN: fontWeight: '600' or theme.fontWeight.semibold
                color: 'var(--text-primary)', // RN: color: theme.colors.textPrimary
                // RN: Add: marginBottom: 2
              }}
            >
              {title}
            </h4>
            {/* RN: </Text> */}

            {/* Subtitle */}
            {/* RN: <Text style={[styles.subtitle, styles[`subtitle${size.toUpperCase()}`]]}> */}
            <p 
              className="m-0" // RN: Remove className
              style={{ 
                fontSize: currentSize.subtitleSize, // RN: fontSize: currentSize.subtitleSize (as number)
                color: 'var(--text-secondary)', // RN: color: theme.colors.textSecondary
              }}
            >
              {subtitle}
            </p>
            {/* RN: </Text> */}
          </div>
          {/* RN: </View> */}
        </div>
        {/* RN: </View> */}
      </div>
      {/* RN: </View> */}
    </Card>
    // RN: For glass variant: </BlurView>
    // RN: For solid variant: </View>
    // RN: </Pressable>
  );
}

/*
RN: COMPLETE STYLESHEET EXAMPLE

import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, // Android
  },
  cardSM: {
    height: 100,
    padding: 12,
  },
  cardMD: {
    height: 120,
    padding: 16,
  },
  cardLG: {
    height: 140,
    padding: 20,
  },
  cardSolid: {
    backgroundColor: theme.colors.cardBg,
  },
  cardFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    shadowOpacity: 0.5,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    borderRadius: 24, // Half of size for circular
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.iconBg,
    borderWidth: 1,
    borderColor: theme.colors.iconBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 12, // Replaces gap
  },
  iconContainerSM: {
    width: 36,
    height: 36,
  },
  iconContainerMD: {
    width: 40,
    height: 40,
  },
  iconContainerLG: {
    width: 48,
    height: 48,
  },
  iconGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
  iconWrapper: {
    zIndex: 10,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  titleSM: {
    fontSize: 12,
  },
  titleMD: {
    fontSize: 14,
  },
  titleLG: {
    fontSize: 16,
  },
  subtitle: {
    color: theme.colors.textSecondary,
  },
  subtitleSM: {
    fontSize: 11,
  },
  subtitleMD: {
    fontSize: 12,
  },
  subtitleLG: {
    fontSize: 14,
  },
});

// Usage with BlurView for glass variant:
export function QuickActionCard({ variant, size, ...props }) {
  const CardComponent = variant === 'glass' ? BlurView : View;
  const cardProps = variant === 'glass' 
    ? { intensity: 60, tint: 'dark' } 
    : {};
  
  return (
    <Pressable onPress={handlePress} style={styles.cardContainer}>
      <CardComponent 
        {...cardProps}
        style={[
          styles.card, 
          styles[`card${size.toUpperCase()}`],
          variant === 'solid' && styles.cardSolid
        ]}
      >
        {/* Content */}
      </CardComponent>
    </Pressable>
  );
}
*/
