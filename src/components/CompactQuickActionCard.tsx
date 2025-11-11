/**
 * ==============================================================================
 * COMPACTQUICKACTIONCARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Compact action card with image, icon, badge, and gradient.
 * Similar to QuickActionCard but with condensed layout.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means this compact card is MUCH easier!
 * 
 * ✅ KEEP AS-IS (85% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, flex-row, items-center, relative
 *    - Spacing: p-3, gap-3
 *    - Colors: bg-*, text-*, border-*
 *    - Borders: rounded-lg, border, border-pa-gold
 *    - Sizing: w-full, h-20
 *    - Opacity, absolute positioning
 * 
 * ❌ CONVERT ONLY THESE:
 *    - motion.div → Pressable with Animated.View
 *    - Image → FastImage or expo-image
 *    - LinearGradient background (if using gradient)
 *    - Active state animation
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - COMPACT CARD
 * ==============================================================================
 * 
 * BEFORE (Web with Motion):
 * ```tsx
 * <motion.div
 *   whileTap={{ scale: 0.98 }}
 *   className="flex flex-row items-center p-3 rounded-lg border 
 *     ${isActive ? 'border-pa-gold' : 'border-white/20'}"
 * >
 *   <img src={image} className="w-12 h-12 rounded" />
 *   <div className="flex-1">
 *     <h4>{title}</h4>
 *     <p>{subtitle}</p>
 *   </div>
 * </motion.div>
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * import { Pressable, View, Text } from 'react-native';
 * import { Image } from 'expo-image';
 * 
 * <Pressable
 *   onPress={onPress}
 *   className={({ pressed }) => `
 *     flex flex-row items-center p-3 rounded-lg border
 *     ${isActive ? 'border-pa-gold' : 'border-white/20'}
 *     ${pressed ? 'opacity-80 scale-[0.98]' : 'opacity-100'}
 *   `}
 * >
 *   <Image
 *     source={{ uri: image }}
 *     className="w-12 h-12 rounded"
 *     contentFit="cover"
 *   />
 *   <View className="flex-1 ml-3">
 *     <Text className="text-white font-semibold">{title}</Text>
 *     <Text className="text-white/60 text-sm">{subtitle}</Text>
 *   </View>
 * </Pressable>
 * ```
 * 
 * KEY POINTS:
 * - ✅ All Tailwind classes work as-is!
 * - ❌ Replace motion.div with Pressable
 * - ❌ Use Image from expo-image for performance
 * - ✅ Active state via className conditional
 * 
 * ==============================================================================
 * NATIVEWIND - WITH GRADIENT BACKGROUND
 * ==============================================================================
 * 
 * ```tsx
 * import { LinearGradient } from 'expo-linear-gradient';
 * 
 * <Pressable onPress={onPress}>
 *   <LinearGradient
 *     colors={['#C4A962', '#8B7355']}
 *     start={{ x: 0, y: 0 }}
 *     end={{ x: 1, y: 1 }}
 *     className="flex flex-row items-center p-3 rounded-lg"
 *   >
 *     // Content
 *   </LinearGradient>
 * </Pressable>
 * ```
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND COMPACT CARD
 * ==============================================================================
 * 
 * ```tsx
 * import React from 'react';
 * import { Pressable, View, Text } from 'react-native';
 * import { Image } from 'expo-image';
 * import { LinearGradient } from 'expo-linear-gradient';
 * import * as Haptics from 'expo-haptics';
 * 
 * interface CompactQuickActionCardProps {
 *   title: string;
 *   subtitle: string;
 *   detail?: string;
 *   image: string;
 *   icon: React.ReactNode;
 *   gradient?: string[];
 *   onPress: () => void;
 *   isActive: boolean;
 *   badgeText?: string;
 * }
 * 
 * export function CompactQuickActionCard({
 *   title,
 *   subtitle,
 *   detail,
 *   image,
 *   icon,
 *   gradient,
 *   onPress,
 *   isActive,
 *   badgeText,
 * }: CompactQuickActionCardProps) {
 *   const handlePress = () => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     onPress();
 *   };
 *   
 *   const content = (
 *     <View className="flex flex-row items-center gap-3 flex-1">
 *       // Image with badge
 *       <View className="relative">
 *         <Image
 *           source={{ uri: image }}
 *           className="w-12 h-12 rounded"
 *           contentFit="cover"
 *         />
 *         {badgeText && (
 *           <View className="absolute -top-1 -right-1 bg-pa-gold rounded-full px-1.5 py-0.5">
 *             <Text className="text-xs text-pa-dark font-semibold">
 *               {badgeText}
 *             </Text>
 *           </View>
 *         )}
 *       </View>
 *       
 *       // Text content
 *       <View className="flex-1">
 *         <Text className="text-white font-semibold">{title}</Text>
 *         <Text className="text-white/60 text-sm">{subtitle}</Text>
 *         {detail && (
 *           <Text className="text-white/40 text-xs mt-0.5">{detail}</Text>
 *         )}
 *       </View>
 *       
 *       // Icon
 *       <View>{icon}</View>
 *     </View>
 *   );
 *   
 *   if (gradient) {
 *     return (
 *       <Pressable
 *         onPress={handlePress}
 *         className={({ pressed }) => `
 *           rounded-lg overflow-hidden
 *           ${pressed ? 'opacity-90 scale-[0.98]' : 'opacity-100'}
 *         `}
 *       >
 *         <LinearGradient
 *           colors={gradient}
 *           start={{ x: 0, y: 0 }}
 *           end={{ x: 1, y: 1 }}
 *           className={`p-3 border ${isActive ? 'border-pa-gold border-2' : 'border-white/20'}`}
 *         >
 *           {content}
 *         </LinearGradient>
 *       </Pressable>
 *     );
 *   }
 *   
 *   return (
 *     <Pressable
 *       onPress={handlePress}
 *       className={({ pressed }) => `
 *         flex flex-row items-center p-3 rounded-lg border
 *         ${isActive ? 'border-pa-gold border-2' : 'border-white/20'}
 *         ${pressed ? 'opacity-80 scale-[0.98]' : 'opacity-100'}
 *         bg-white/5
 *       `}
 *     >
 *       {content}
 *     </Pressable>
 *   );
 * }
 * 
 * // USAGE EXAMPLES:
 * 
 * import { Camera } from 'lucide-react-native';
 * 
 * // Basic compact card
 * <CompactQuickActionCard
 *   title="Photo Capture"
 *   subtitle="Document damage"
 *   image="https://example.com/camera.jpg"
 *   icon={<Camera size={20} color="#ffffff" />}
 *   onPress={() => navigation.navigate('PhotoCapture')}
 *   isActive={false}
 * />
 * 
 * // With badge and detail
 * <CompactQuickActionCard
 *   title="Property Inspection"
 *   subtitle="123 Market St"
 *   detail="Scheduled today"
 *   image="https://example.com/property.jpg"
 *   icon={<Camera size={20} color="#ffffff" />}
 *   badgeText="NEW"
 *   onPress={() => navigation.navigate('Inspection')}
 *   isActive={true}
 * />
 * 
 * // With gradient
 * <CompactQuickActionCard
 *   title="Premium Feature"
 *   subtitle="Unlock now"
 *   image="https://example.com/premium.jpg"
 *   icon={<Camera size={20} color="#ffffff" />}
 *   gradient={['#C4A962', '#8B7355']}
 *   onPress={() => navigation.navigate('Premium')}
 *   isActive={false}
 * />
 * ```
 * 
 * ==============================================================================
 * REQUIRED PACKAGES
 * ==============================================================================
 * 
 * ```bash
 * npm install nativewind
 * npm install expo-image
 * npm install expo-linear-gradient
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
 * - [ ] Image loads
 * - [ ] Badge displays
 * - [ ] Active state visible
 * - [ ] iOS and Android compatible
 * 
 * ==============================================================================
 */

// RN: import { View, Text, Pressable, StyleSheet } from 'react-native';
// RN: import Animated, { useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
// RN: import FastImage from 'react-native-fast-image';
// RN: import LinearGradient from 'expo-linear-gradient';
import { motion } from "motion/react"; // RN: Remove - replace with Reanimated
import { ImageWithFallback } from "./figma/ImageWithFallback"; // RN: Replace with FastImage or Image
import { LucideIcon } from "lucide-react"; // RN: import from 'lucide-react-native'

interface CompactQuickActionCardProps {
  title: string;
  subtitle: string;
  detail?: string;
  image: string; // RN: Will be uri for FastImage: { uri: string }
  icon: LucideIcon;
  gradient: string; // RN: Will need to parse into colors array for LinearGradient
  onPress: () => void;
  isActive: boolean;
  badgeText?: string;
  badgeColor?: string;
}

export function CompactQuickActionCard({
  title,
  subtitle,
  detail,
  image,
  icon: Icon,
  gradient,
  onPress,
  isActive,
  badgeText,
  badgeColor = 'rgb(var(--color-goldenrod))', // RN: Use theme.colors.goldenrod or '#D4AF37'
}: CompactQuickActionCardProps) {
  
  // RN: Create animated values and styles
  // RN: const scale = useSharedValue(isActive ? 1 : 0.92);
  // RN: const opacity = useSharedValue(isActive ? 1 : 0.7);
  // RN: const translateY = useSharedValue(isActive ? -6 : 4);
  // RN: 
  // RN: useEffect(() => {
  // RN:   scale.value = withTiming(isActive ? 1 : 0.92, { duration: 300 });
  // RN:   opacity.value = withTiming(isActive ? 1 : 0.7, { duration: 300 });
  // RN:   translateY.value = withTiming(isActive ? -6 : 4, { duration: 300 });
  // RN: }, [isActive]);
  // RN:
  // RN: const animatedStyle = useAnimatedStyle(() => ({
  // RN:   opacity: opacity.value,
  // RN:   transform: [
  // RN:     { scale: scale.value },
  // RN:     { translateY: translateY.value }
  // RN:   ],
  // RN: }));

  // RN: Replace motion.button with Animated.View + Pressable
  // RN: <Pressable onPress={onPress}>
  // RN:   <Animated.View style={[styles.card, animatedStyle, isActive && styles.cardActive]}>
  return (
    <motion.button
      initial={{ opacity: 0.7, scale: 0.92 }} // RN: Remove - use Reanimated useEffect
      animate={{ // RN: Remove - use Reanimated
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.92,
        y: isActive ? -6 : 4,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }} // RN: Use withTiming({ duration: 300 })
      whileHover={{ scale: isActive ? 1.02 : 0.94 }} // RN: Use onPressIn/onPressOut with Animated.timing
      whileTap={{ scale: isActive ? 0.98 : 0.90 }} // RN: Use Pressable style callback: style={({ pressed }) => [..., pressed && { transform: [{ scale: 0.98 }] }]}
      onClick={onPress} // RN: Remove - use Pressable onPress
      style={{
        position: 'relative', // RN: position: 'relative'
        minWidth: '200px', // RN: minWidth: 200
        height: '120px', // RN: height: 120
        borderRadius: 'var(--radius-xl)', // RN: borderRadius: theme.borderRadius.xl or 20
        overflow: 'hidden', // RN: overflow: 'hidden'
        scrollSnapAlign: 'center', // RN: Not applicable - horizontal FlatList will handle snapping
        border: isActive ? '1.5px solid rgba(255, 255, 255, 0.18)' : '1.5px solid rgba(255, 255, 255, 0.08)', // RN: borderWidth: 1.5, borderColor: isActive ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.08)'
        // RN: boxShadow → shadow properties:
        boxShadow: isActive 
          ? '0 16px 32px rgba(0, 0, 0, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)' 
          : '0 4px 12px rgba(0, 0, 0, 0.3)',
        // RN: shadowColor: '#000',
        // RN: shadowOffset: isActive ? { width: 0, height: 16 } : { width: 0, height: 4 },
        // RN: shadowOpacity: isActive ? 0.6 : 0.3,
        // RN: shadowRadius: isActive ? 32 : 12,
        // RN: elevation: isActive ? 10 : 5, // Android
        filter: isActive ? 'none' : 'brightness(0.85)', // RN: No filter - simulate with opacity overlay
        // RN: Alternative: Add a semi-transparent black View overlay when not active
        cursor: 'pointer', // RN: Not applicable
      }}
    >
      {/* Background Image */}
      {/* RN: Replace with FastImage for better performance */}
      {/* RN: <FastImage 
            source={{ uri: image, priority: FastImage.priority.high }}
            style={styles.backgroundImage}
            resizeMode={FastImage.resizeMode.cover}
          /> */}
      {/* RN: Or use ImageBackground: */}
      {/* RN: <ImageBackground source={{ uri: image }} style={styles.card} resizeMode="cover"> */}
      <ImageWithFallback
        src={image}
        alt={title}
        style={{
          width: '100%', // RN: width: '100%'
          height: '100%', // RN: height: '100%'
          objectFit: 'cover', // RN: resizeMode: 'cover'
          position: 'absolute', // RN: position: 'absolute'
          top: 0, // RN: top: 0
          left: 0, // RN: left: 0
        }}
      />

      {/* Gradient Overlay */}
      {/* RN: Use LinearGradient from expo-linear-gradient */}
      {/* RN: Parse gradient string to colors array */}
      {/* RN: Example: gradient = 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' */}
      {/* RN: <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          /> */}
      <div
        style={{
          position: 'absolute', // RN: position: 'absolute'
          top: 0, // RN: top: 0
          left: 0, // RN: left: 0
          right: 0, // RN: right: 0
          bottom: 0, // RN: bottom: 0
          background: gradient, // RN: Replace with LinearGradient component
        }}
      />

      {/* Content */}
      {/* RN: <View style={styles.content}> */}
      <div
        style={{
          position: 'relative', // RN: position: 'relative'
          height: '100%', // RN: height: '100%'
          display: 'flex', // RN: Not needed - default in RN
          flexDirection: 'column', // RN: flexDirection: 'column'
          justifyContent: 'space-between', // RN: justifyContent: 'space-between'
          padding: 'var(--spacing-3)', // RN: padding: theme.spacing[3] or 12
        }}
      >
        {/* Badge & Icon Row */}
        {/* RN: <View style={styles.topRow}> */}
        <div
          style={{
            display: 'flex', // RN: Not needed
            justifyContent: 'space-between', // RN: justifyContent: 'space-between'
            alignItems: 'flex-start', // RN: alignItems: 'flex-start'
          }}
        >
          {/* RN: <BlurView intensity={40} tint="dark" style={styles.badge}> or <View style={styles.badge}> */}
          {badgeText && (
            <div
              style={{
                padding: '3px 8px', // RN: paddingVertical: 3, paddingHorizontal: 8
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // RN: backgroundColor: 'rgba(0, 0, 0, 0.4)'
                backdropFilter: 'blur(8px)', // RN: Use BlurView component instead, or omit
                borderRadius: 'var(--radius-full)', // RN: borderRadius: 999 or theme.borderRadius.full
                border: `1px solid ${badgeColor}40`, // RN: borderWidth: 1, borderColor: badgeColor + '40'
              }}
            >
              {/* RN: <Text style={styles.badgeText}> */}
              <span
                style={{
                  fontFamily: 'Roboto', // RN: fontFamily: 'Roboto' (must be loaded)
                  fontSize: '10px', // RN: fontSize: 10
                  color: badgeColor, // RN: color: badgeColor
                  textTransform: 'uppercase', // RN: textTransform: 'uppercase'
                  letterSpacing: '0.5px', // RN: letterSpacing: 0.5
                  fontWeight: 'var(--font-weight-semibold)', // RN: fontWeight: '600'
                }}
              >
                {badgeText}
              </span>
              {/* RN: </Text> */}
            </div>
          )}
          {/* RN: </View> or </BlurView> */}
          {/* RN: <View style={styles.iconContainer}> */}
          <div
            style={{
              width: '28px', // RN: width: 28
              height: '28px', // RN: height: 28
              borderRadius: 'var(--radius-md)', // RN: borderRadius: theme.borderRadius.md or 8
              backgroundColor: 'rgba(255, 255, 255, 0.15)', // RN: backgroundColor: 'rgba(255, 255, 255, 0.15)'
              backdropFilter: 'blur(12px)', // RN: Use BlurView or omit
              border: '1px solid rgba(255, 255, 255, 0.2)', // RN: borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)'
              display: 'flex', // RN: Not needed
              alignItems: 'center', // RN: alignItems: 'center'
              justifyContent: 'center', // RN: justifyContent: 'center'
              marginLeft: 'auto', // RN: Not supported - use flex: 1 on previous sibling or position: 'absolute', right: 0
            }}
          >
            {/* RN: Icon from lucide-react-native */}
            <Icon size={14} style={{ color: 'rgb(var(--color-text-primary))' }} /> {/* RN: <Icon size={14} color={theme.colors.textPrimary} /> */}
          </div>
          {/* RN: </View> */}
        </div>
        {/* RN: </View> */}

        {/* Text Content */}
        {/* RN: <View style={styles.textContent}> */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}> {/* RN: flexDirection: 'column' (gap not supported - use marginBottom) */}
          {/* RN: <Text style={styles.detail}> */}
          {detail && (
            <span
              style={{
                fontFamily: 'Roboto', // RN: fontFamily: 'Roboto'
                fontSize: '10px', // RN: fontSize: 10
                color: 'rgb(var(--color-text-tertiary))', // RN: color: theme.colors.textTertiary
                textTransform: 'uppercase', // RN: textTransform: 'uppercase'
                letterSpacing: '0.5px', // RN: letterSpacing: 0.5
                // RN: Add: marginBottom: 2
              }}
            >
              {detail}
            </span>
          )}
          {/* RN: </Text> */}
          {/* RN: <Text style={styles.title}> */}
          <h3
            style={{
              fontFamily: 'Roboto', // RN: fontFamily: 'Roboto'
              fontSize: 'var(--text-sm)', // RN: fontSize: theme.fontSize.sm or 14
              color: 'rgb(var(--color-text-primary))', // RN: color: theme.colors.textPrimary
              margin: 0, // RN: Not needed - Text has no default margin
              fontWeight: 'var(--font-weight-semibold)', // RN: fontWeight: '600'
              letterSpacing: '-0.2px', // RN: letterSpacing: -0.2
              // RN: Add: marginBottom: 2
            }}
          >
            {title}
          </h3>
          {/* RN: </Text> */}
          {/* RN: <Text style={styles.subtitle}> */}
          <p
            style={{
              fontFamily: 'Roboto', // RN: fontFamily: 'Roboto'
              fontSize: '10px', // RN: fontSize: 10
              color: 'rgb(var(--color-text-secondary))', // RN: color: theme.colors.textSecondary
              margin: 0, // RN: Not needed
              lineHeight: '1.3', // RN: lineHeight: 13 (fontSize * lineHeight ratio)
            }}
          >
            {subtitle}
          </p>
          {/* RN: </Text> */}
        </div>
        {/* RN: </View> */}
      </div>
      {/* RN: </View> */}
    </motion.button>
  );
  // RN:   </Animated.View>
  // RN: </Pressable>
  // RN: Or if using ImageBackground, close it here: </ImageBackground>
}
