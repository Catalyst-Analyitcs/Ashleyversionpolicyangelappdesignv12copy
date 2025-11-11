/**
 * ==============================================================================
 * PROPERTYCARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Reusable property card with map preview, address, stats, and badges.
 * Used in PropertiesScreen, SearchPropertiesScreen, CommunityScreen.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means this PropertyCard is MUCH easier!
 * 
 * ✅ KEEP AS-IS (85% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, flex-col, flex-row, items-center
 *    - Spacing: p-4, gap-2, space-y-3
 *    - Colors: bg-pa-dark, text-white, border-white/10
 *    - Borders: rounded-xl, border
 *    - Sizing: w-full, h-60
 *    - Typography: text-sm, font-semibold
 * 
 * ❌ CONVERT ONLY THESE:
 *    - div → View
 *    - button → Pressable with className function
 *    - backdrop-blur → BlurView (glassmorphism)
 *    - hover: → Pressable ({ pressed }) state
 *    - Map component → react-native-maps MapView
 *    - Add haptic feedback on long press
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - PROPERTY CARD WITH MAP
 * ==============================================================================
 * 
 * BEFORE (Web):
 * ```tsx
 * <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10">
 *   <img src={mapUrl} className="w-full h-60 object-cover" />
 *   <div className="p-4 flex flex-col gap-2">
 *     <h3 className="text-white font-semibold">123 Market St</h3>
 *     <div className="flex items-center gap-2">
 *       <span className="text-sm text-white/60">San Francisco, CA</span>
 *     </div>
 *   </div>
 * </div>
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * import { View, Text, Pressable } from 'react-native';
 * import MapView from 'react-native-maps';
 * import { BlurView } from 'expo-blur';
 * import { styled } from 'nativewind';
 * import * as Haptics from 'expo-haptics';
 * 
 * const StyledBlurView = styled(BlurView);
 * 
 * <Pressable
 *   onPress={onPress}
 *   onLongPress={() => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
 *     onLongPress?.();
 *   }}
 *   className={({ pressed }) => `
 *     rounded-xl overflow-hidden border border-white/10
 *     ${pressed ? 'opacity-90 scale-[0.98]' : 'opacity-100'}
 *   `}
 * >
 *   <StyledBlurView
 *     intensity={10}
 *     tint="dark"
 *     className="bg-white/5"
 *   >
 *     <MapView
 *       region={{
 *         latitude: coordinates.latitude,
 *         longitude: coordinates.longitude,
 *         latitudeDelta: 0.005,
 *         longitudeDelta: 0.005,
 *       }}
 *       scrollEnabled={false}
 *       zoomEnabled={false}
 *       className="w-full h-60"
 *     />
 *     
 *     <View className="p-4 flex flex-col gap-2">
 *       <Text className="text-white font-semibold">123 Market St</Text>
 *       <View className="flex flex-row items-center gap-2">
 *         <Text className="text-sm text-white/60">San Francisco, CA</Text>
 *       </View>
 *     </View>
 *   </StyledBlurView>
 * </Pressable>
 * ```
 * 
 * KEY POINTS:
 * - ✅ All Tailwind classes work as-is!
 * - ❌ Replace backdrop-blur with BlurView
 * - ❌ Use MapView instead of img for maps
 * - ✅ All spacing, colors, borders preserved!
 * 
 * ==============================================================================
 * NATIVEWIND - BADGES AND STATS
 * ==============================================================================
 * 
 * ```tsx
 * // Badge component with NativeWind
 * <View className="px-2 py-1 bg-pa-gold rounded-full">
 *   <Text className="text-xs text-pa-dark font-semibold">HOI: Lemonade</Text>
 * </View>
 * 
 * // Stats row
 * <View className="flex flex-row items-center gap-4">
 *   <View className="flex flex-row items-center gap-1">
 *     <Home size={16} color="#ffffff" />
 *     <Text className="text-sm text-white/80">Single Family</Text>
 *   </View>
 *   <View className="flex flex-row items-center gap-1">
 *     <MapPin size={16} color="#ffffff" />
 *     <Text className="text-sm text-white/80">0.2 mi away</Text>
 *   </View>
 * </View>
 * ```
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND PROPERTY CARD
 * ==============================================================================
 * 
 * ```tsx
 * import React from 'react';
 * import { View, Text, Pressable } from 'react-native';
 * import MapView, { Marker } from 'react-native-maps';
 * import { BlurView } from 'expo-blur';
 * import { styled } from 'nativewind';
 * import * as Haptics from 'expo-haptics';
 * import { MapPin, Home, Calendar } from 'lucide-react-native';
 * 
 * const StyledBlurView = styled(BlurView);
 * 
 * interface PropertyCardProps {
 *   address: string;
 *   propertyType: string;
 *   hoiCarrier?: string;
 *   lastInspection?: string;
 *   distance?: string;
 *   showMap?: boolean;
 *   coordinates?: {
 *     latitude: number;
 *     longitude: number;
 *   };
 *   onPress?: () => void;
 *   onLongPress?: () => void;
 * }
 * 
 * export function PropertyCard({
 *   address,
 *   propertyType,
 *   hoiCarrier,
 *   lastInspection,
 *   distance,
 *   showMap = true,
 *   coordinates,
 *   onPress,
 *   onLongPress,
 * }: PropertyCardProps) {
 *   return (
 *     <Pressable
 *       onPress={onPress}
 *       onLongPress={() => {
 *         if (onLongPress) {
 *           Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
 *           onLongPress();
 *         }
 *       }}
 *       className={({ pressed }) => `
 *         rounded-xl overflow-hidden border border-white/10
 *         ${pressed ? 'opacity-90 scale-[0.98]' : 'opacity-100'}
 *       `}
 *     >
 *       <StyledBlurView
 *         intensity={10}
 *         tint="dark"
 *         className="bg-white/5"
 *       >
 *         {showMap && coordinates && (
 *           <MapView
 *             region={{
 *               latitude: coordinates.latitude,
 *               longitude: coordinates.longitude,
 *               latitudeDelta: 0.005,
 *               longitudeDelta: 0.005,
 *             }}
 *             scrollEnabled={false}
 *             zoomEnabled={false}
 *             pitchEnabled={false}
 *             rotateEnabled={false}
 *             className="w-full h-60"
 *           >
 *             <Marker coordinate={coordinates} />
 *           </MapView>
 *         )}
 *         
 *         <View className="p-4 flex flex-col gap-3">
 *           // Address and HOI badge
 *           <View className="flex flex-row items-start justify-between">
 *             <View className="flex-1">
 *               <Text className="text-white font-semibold text-base">
 *                 {address}
 *               </Text>
 *             </View>
 *             {hoiCarrier && (
 *               <View className="px-2 py-1 bg-pa-gold rounded-full">
 *                 <Text className="text-xs text-pa-dark font-semibold">
 *                   HOI: {hoiCarrier}
 *                 </Text>
 *               </View>
 *             )}
 *           </View>
 *           
 *           // Stats row
 *           <View className="flex flex-row items-center gap-4 flex-wrap">
 *             <View className="flex flex-row items-center gap-1">
 *               <Home size={16} color="#ffffff" />
 *               <Text className="text-sm text-white/80">{propertyType}</Text>
 *             </View>
 *             
 *             {lastInspection && (
 *               <View className="flex flex-row items-center gap-1">
 *                 <Calendar size={16} color="#ffffff" />
 *                 <Text className="text-sm text-white/80">{lastInspection}</Text>
 *               </View>
 *             )}
 *             
 *             {distance && (
 *               <View className="flex flex-row items-center gap-1">
 *                 <MapPin size={16} color="#ffffff" />
 *                 <Text className="text-sm text-white/80">{distance}</Text>
 *               </View>
 *             )}
 *           </View>
 *         </View>
 *       </StyledBlurView>
 *     </Pressable>
 *   );
 * }
 * 
 * // USAGE EXAMPLES:
 * 
 * // With map preview
 * <PropertyCard
 *   address="123 Market Street, San Francisco, CA 94103"
 *   propertyType="Single Family"
 *   hoiCarrier="Lemonade"
 *   lastInspection="2 days ago"
 *   distance="0.2 mi away"
 *   showMap
 *   coordinates={{ latitude: 37.7749, longitude: -122.4194 }}
 *   onPress={() => navigation.navigate('PropertyDetails', { id: '123' })}
 *   onLongPress={() => showActionSheet()}
 * />
 * 
 * // Without map
 * <PropertyCard
 *   address="456 Valencia Street, San Francisco, CA 94110"
 *   propertyType="Condo"
 *   lastInspection="1 week ago"
 *   showMap={false}
 *   onPress={() => navigation.navigate('PropertyDetails', { id: '456' })}
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
 * npm install react-native-maps
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
 * - [ ] Card displays correctly
 * - [ ] Map preview loads
 * - [ ] Press/long press work
 * - [ ] Badges render
 * - [ ] Stats display
 * - [ ] iOS and Android compatible
 * 
 * ==============================================================================
 */

// RN: import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
// RN: import MapView from 'react-native-maps';
// RN: import FastImage from 'react-native-fast-image';
// RN: import * as Haptics from 'expo-haptics';
import { MapPin, Home } from "lucide-react"; // RN: import from 'lucide-react-native'
import { Card } from "./ui/card"; // RN: Replace with custom View component
import { Badge } from "./ui/badge"; // RN: Replace with custom View + Text
import { useMemo, useState, useEffect, memo } from "react";

interface PropertyCardProps {
  address: string;
  propertyType: string;
  showMap?: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  hoiCarrier?: {
    label: string;
  };
  statusPill?: {
    label: string;
    variant: 'success' | 'warning' | 'destructive';
  };
  stats?: Array<{
    label: string;
    value: string | number;
  }>;
  onPress?: () => void;
  onLongPress?: () => void;
  onPolicyClick?: () => void;
}

// RN: For static map images, use Mapbox Static Images API or Google Maps Static API
// Mapbox configuration
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGV2bXBhIiwiYSI6ImNtYXZsMTIwZjA1eTUya3E1N2dxaGgxajgifQ.Q7innEbjuANj49xD9NAu7g';

// RN: This function can stay the same - generates static image URL
// Generate Mapbox 3D aerial image URL
function getMapbox3DAerialUrl(
  latitude: number,
  longitude: number,
  width: number = 400,
  height: number = 240
): string {
  const zoom = 17;
  const bearing = 25; // 25-degree angle for optimal building perspective
  const pitch = 60; // 60-degree tilt for dramatic 3D effect
  const style = 'satellite-streets-v12'; // Satellite with streets overlay for better 3D buildings
  const retina = '@2x';
  
  // Mapbox Static Images API URL
  const url = `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${longitude},${latitude},${zoom},${bearing},${pitch}/${width}x${height}${retina}?access_token=${MAPBOX_ACCESS_TOKEN}`;
  
  return url;
}

export function PropertyCard({
  address,
  propertyType,
  showMap = false,
  coordinates,
  hoiCarrier,
  statusPill,
  stats = [],
  onPress,
  onLongPress,
  onPolicyClick
}: PropertyCardProps) {
  
  // RN: Convert to Pressable onPress handler
  const handleClick = () => {
    onPress?.();
  };

  // RN: Use onLongPress prop of Pressable instead
  // RN: Add haptic feedback: Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onLongPress?.();
  };

  // Generate Mapbox 3D aerial image URL
  const mapImageUrl = useMemo(() => {
    if (coordinates) {
      return getMapbox3DAerialUrl(coordinates.latitude, coordinates.longitude, 800, 220);
    }
    return null;
  }, [coordinates]);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (mapImageUrl) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [mapImageUrl]);

  return (
    // RN: Replace Card with Pressable wrapper
    // RN: <Pressable onPress={handleClick} onLongPress={handleLongPress} style={styles.card}>
    <Card
      className="backdrop-blur-sm overflow-visible cursor-pointer transition-all duration-300 hover:scale-[1.02]" // RN: Remove className, use StyleSheet
      style={{
        // RN: Convert these to StyleSheet.create({}) at bottom of file
        borderRadius: 'var(--property-card-radius)', // RN: Use theme.borderRadius.md
        height: 'var(--property-card-height)', // RN: Use fixed height or 'auto'
        width: '100%',
        position: 'relative',
        backgroundColor: 'var(--card-bg)', // RN: Use theme.colors.cardBg
        borderColor: 'var(--card-border)', // RN: Use theme.colors.cardBorder
        boxShadow: 'var(--shadow-depth-md)', // RN: Use shadow properties (shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation)
      }}
      onClick={handleClick} // RN: Remove - handled by Pressable
      onContextMenu={handleContextMenu} // RN: Remove - use onLongPress
    >
      {/* Home Icon - Absolutely positioned at top-left of overall card */}
      {/* RN: Convert to <View style={styles.homeIconContainer}> */}
      <div 
        className="absolute top-0 left-0 z-10" // RN: position: 'absolute', top: 0, left: 0, zIndex: 10
        style={{ margin: 'var(--spacing-3)' }} // RN: margin: theme.spacing[3]
      >
        {/* RN: Nested Pressable for home icon interaction */}
        {/* RN: <Pressable onPress={(e) => { e.stopPropagation(); onPress?.(); }} style={styles.homeIcon}> */}
        <div 
          className="relative cursor-pointer hover:scale-105 transition-all overflow-hidden" // RN: Remove hover effects, add onPressIn/onPressOut for scale
          style={{
            width: '96px',
            height: '56px',
            backgroundColor: 'var(--icon-bg)', // RN: theme.colors.iconBg
            border: '2px solid #D4AF37', // RN: borderWidth: 2, borderColor: '#D4AF37'
            boxShadow: 'var(--shadow-depth-md), 0 0 12px rgba(212, 175, 55, 0.4)', // RN: Use shadow props + elevation
            borderRadius: 'var(--radius-md)', // RN: theme.borderRadius.md
            // RN: For background image, use <ImageBackground> component or <FastImage> with borderRadius
            backgroundImage: `url(https://images.unsplash.com/photo-1758755791011-0720d654b8d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvdXNlJTIwZnJvbnQlMjBlbnRyYW5jZSUyMHZpZXd8ZW58MXx8fHwxNzYxNDI3MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={(e) => { // RN: Remove, use Pressable
            e.stopPropagation();
            onPress?.();
          }}
        >
          {/* Inner glow */}
          {/* RN: Use expo-linear-gradient for gradient overlays */}
          <div
            className="absolute inset-0 pointer-events-none" // RN: position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
            style={{
              background: 'var(--inner-glow-subtle)', // RN: Replace with LinearGradient component
            }}
          />
        </div>
      </div>

      {/* Map Section - Now fills entire card */}
      {showMap && coordinates && (
        // RN: Alternative 1: Use <MapView> from react-native-maps
        // RN: Alternative 2: Use static image with <FastImage>
        // RN: Recommended: Static image for performance, tap to open full MapView
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-visible" // RN: position: 'absolute', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
          style={{ 
            backgroundColor: 'var(--card-bg)', // RN: theme.colors.cardBg
            left: '50%', // RN: Not supported - use flex positioning instead
            transform: 'translateX(-50%)', // RN: Not supported - use flex positioning
            width: '100vw', // RN: Use Dimensions.get('window').width or '100%'
            height: '100%',
          }}
        >
          {/* Mapbox 3D Aerial Image */}
          {/* RN: Replace with <FastImage> or <Image> component */}
          {/* RN: <FastImage source={{ uri: mapImageUrl }} style={styles.mapImage} onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} /> */}
          {mapImageUrl && (
            <img
              src={mapImageUrl}
              alt="Property aerial view"
              className="absolute inset-0 w-full h-full object-cover" // RN: position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover'
              onLoad={() => {
                setImageLoaded(true);
              }}
              onError={() => {
                setImageError(true);
              }}
              style={{
                opacity: imageLoaded ? 1 : 0, // RN: Use Animated.View with fadeIn animation
                transition: 'opacity 0.3s ease-in-out', // RN: Replace with Animated timing
                zIndex: 0,
                border: 'none',
                // RN: maskImage not supported - alternative: use react-native-masked-view or custom SVG mask
                maskImage: 'radial-gradient(ellipse 100% 100% at center, black 40%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at center, black 40%, transparent 100%)',
              }}
            />
          )}

          {/* Loading state */}
          {/* RN: Use ActivityIndicator from react-native */}
          {!imageLoaded && !imageError && mapImageUrl && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--card-bg)', zIndex: 1 }}
            >
              {/* RN: <ActivityIndicator size="small" color={theme.colors.textTertiary} /> */}
              <span style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>
                Loading map...
              </span>
            </div>
          )}

          {/* Error state */}
          {imageError && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--card-bg)', zIndex: 1 }}
            >
              {/* RN: <Text style={styles.errorText}>Map unavailable</Text> */}
              <span style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>
                Map unavailable
              </span>
            </div>
          )}
          
          {/* Semi-transparent overlay for better icon/badge visibility */}
          {/* RN: Simple View with backgroundColor */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              pointerEvents: 'none', // RN: No equivalent - use separate touchable areas
              zIndex: 1,
            }}
          />
          
          {/* MapPin Icon - Unified circular glassmorphic shape with enhanced depth */}
          {/* RN: Use BlurView from expo-blur for glassmorphism */}
          {/* RN: import { BlurView } from 'expo-blur'; */}
          {/* RN: <BlurView intensity={80} tint="dark" style={styles.mapPinContainer}> */}
          <div 
            className="flex items-center justify-center rounded-full relative z-10"
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'var(--icon-bg)', // RN: theme.colors.iconBg
              border: '1px solid var(--icon-border)', // RN: borderWidth: 1, borderColor: theme.colors.iconBorder
              boxShadow: 'var(--shadow-depth-md)', // RN: Use shadow props
            }}
          >
            {/* Inner glow */}
            {/* RN: Use LinearGradient from expo-linear-gradient */}
            <div
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{
                background: 'var(--inner-glow-medium)', // RN: Replace with LinearGradient
              }}
            />
            {/* RN: Icon renders the same from lucide-react-native */}
            <MapPin className="w-8 h-8 relative z-10" style={{ color: 'var(--icon-color)', filter: 'var(--icon-drop-shadow)' }} />
            {/* RN: style={{ color: theme.colors.iconColor, width: 32, height: 32 }} - filter not supported, use shadow props instead */}
          </div>
        </div>
      )}

      {/* Content Section - Absolutely positioned at bottom as overlay */}
      {/* RN: Use BlurView for backdrop blur effect */}
      {/* RN: <BlurView intensity={60} tint="dark" style={styles.contentSection}> */}
      <div 
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between backdrop-blur-md z-10"
        style={{ 
          padding: 'var(--property-card-padding)', // RN: theme.spacing.cardPadding
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // RN: Combine with BlurView
          borderTop: '1px solid rgba(255, 255, 255, 0.1)', // RN: borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.1)'
          gap: 'var(--spacing-3)', // RN: Use separate View with marginRight or paddingHorizontal
        }}
      >
        {/* Address & Property Type - Left side */}
        {/* RN: <View style={styles.addressContainer}> */}
        <div className="flex flex-col flex-1" style={{ gap: '0' }}>
          {/* RN: <Text style={styles.addressText}>{address}</Text> */}
          <h4 
            className="m-0"
            style={{ 
              fontSize: 'var(--text-xs)', // RN: Use theme.fontSize.xs or numeric value
              lineHeight: '1.2', // RN: lineHeight: 1.2 * fontSize
              color: 'var(--text-primary)', // RN: theme.colors.textPrimary
            }}
          >
            {address}
          </h4>
          {/* RN: <Text style={styles.propertyTypeText}>{propertyType}</Text> */}
          <p 
            className="m-0"
            style={{ 
              fontSize: '11px', 
              lineHeight: '1.2',
              color: 'var(--text-secondary)', // RN: theme.colors.textSecondary
            }}
          >
            {propertyType}
          </p>
        </div>

        {/* Insurance Badge - Right side */}
        {/* RN: Custom Badge component: <View style={styles.badge}><Text style={styles.badgeText}>{hoiCarrier.label}</Text></View> */}
        {hoiCarrier && (
          <Badge 
            className="border-0 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" // RN: Remove className, use StyleSheet
            style={{ 
              padding: 'var(--spacing-2) var(--spacing-3)', // RN: paddingVertical: theme.spacing[2], paddingHorizontal: theme.spacing[3]
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              color: 'var(--text-primary)', // RN: This goes on Text component, not View
            }}
            onClick={(e) => { // RN: Wrap in Pressable instead
              e.stopPropagation();
              onPolicyClick?.();
            }}
          >
            {hoiCarrier.label}
          </Badge>
        )}
      </div>
      {/* RN: </BlurView> */}
    </Card>
    // RN: </Pressable>
  );
}

/* 
RN: STYLESHEET EXAMPLE
 
const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.md,
    height: 240,
    width: '100%',
    backgroundColor: theme.colors.cardBg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, // Android shadow
    overflow: 'visible',
  },
  homeIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    margin: theme.spacing[3],
  },
  homeIcon: {
    width: 96,
    height: 56,
    backgroundColor: theme.colors.iconBg,
    borderWidth: 2,
    borderColor: '#D4AF37',
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  mapImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mapPinContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.iconBorder,
    overflow: 'hidden',
  },
  contentSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing[4],
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 10,
  },
  addressContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  propertyTypeText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  badge: {
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    backgroundColor: 'rgba(59, 130, 246, 0.8)',
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    color: theme.colors.textPrimary,
    fontSize: 12,
  },
});
*/
