/**
 * ==============================================================================
 * PROPERTYDETAILSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Comprehensive property details view with photo gallery, lidar
 * visualization, inspection history, insurance details, and quick actions.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means 85% of this screen works as-is!
 * 
 * ✅ KEEP AS-IS (85% of styles):
 *    - ALL className Tailwind utilities work!
 *    - Grid layout: flex, flex-row, flex-col, gap-4
 *    - Card styles: rounded-xl, bg-pa-dark, border-white/10
 *    - Typography: text-white, text-xl, font-semibold
 *    - Glassmorphism: bg-white/5, backdrop-blur
 * 
 * ❌ CONVERT ONLY THESE:
 *    - div → View
 *    - button/Card → Pressable
 *    - ScrollView for vertical scrolling
 *    - Image gallery → react-native-image-viewing
 *    - 3D viewer → WebView or react-native-3d-model-view
 * 
 * SPECIFIC CONVERSIONS:
 * 
 * Image gallery with zoom:
 *   - Use react-native-image-viewing
 *   - Pressable thumbnail with className
 *   - All Tailwind utilities work
 * 
 * Action cards:
 *   - Use View with flex-row gap-4
 *   - Pressable with all className utilities
 *   - bg-white/5, rounded-xl, border-white/10
 * 
 * ScrollView for content:
 *   - Replace scrollable div with ScrollView
 *   - All className Tailwind utilities preserved
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. IMAGE GALLERY:
 *    - Property photos → react-native-image-viewing
 *    - Swipeable gallery with zoom/pinch
 *    - Lazy load images with FastImage
 *    - Full-screen mode with gestures
 * 
 * 2. LIDAR/3D VISUALIZATION:
 *    - 3D model viewer → react-native-3d-model-view
 *    - Or use WebView with Three.js
 *    - Gesture controls for rotation
 *    - Progress indicator for loading
 * 
 * 3. GRID LAYOUT:
 *    - Large image + 3 action cards
 *    - Use flexbox or Grid (limited in RN)
 *    - Responsive sizing
 * 
 * 4. ACTION CARDS:
 *    - Lidar, Inspection, Reports buttons
 *    - TouchableOpacity with scale animation
 *    - Navigate to respective screens
 * 
 * ==============================================================================
 * MOCK DATA - REPLACE WITH REAL API
 * ==============================================================================
 * 
 * REQUIRED API ENDPOINTS:
 * 
 * 1. GET /api/properties/:propertyId
 *    Returns: Full property details, images, metadata
 * 
 * 2. GET /api/properties/:propertyId/inspections
 *    Returns: Inspection history with reports
 * 
 * 3. GET /api/properties/:propertyId/lidar
 *    Returns: 3D model URL, point cloud data
 * 
 * 4. GET /api/properties/:propertyId/insurance
 *    Returns: Policy details, coverage, claims
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT MAPPING
 * ==============================================================================
 * 
 * - div → View
 * - button → TouchableOpacity
 * - Card → Custom View with styles
 * - Image → FastImage
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Property image loads
 * - [ ] Action cards are tappable
 * - [ ] Navigation works
 * - [ ] Lidar opens if available
 * - [ ] Inspection history accessible
 * - [ ] Layout responsive
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import icons from lucide-react-native instead
// RN: import { Settings, Clipboard, MapPin, CheckCircle2, Circle } from 'lucide-react-native';
import { Settings, Clipboard, MapPin, CheckCircle2, Circle } from "lucide-react";
// RN: Replace Card with custom View component using StyleSheet
// RN: import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Platform } from 'react-native';
// RN: import FastImage from 'react-native-fast-image';
// RN: import { useNavigation } from '@react-navigation/native';
// RN: import { useQuery } from '@tanstack/react-query';
// RN: import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { Card } from "../components/ui/card";

// RN: Props remain the same, but onBack can use navigation hook instead
interface PropertyDetailsScreenProps {
  onBack?: () => void; // RN: Or use navigation.goBack()
  // RN: propertyId?: string; // Pass property ID for data fetching
}

// RN: Component remains functional, but add data fetching and navigation
export function PropertyDetailsScreen({ onBack }: PropertyDetailsScreenProps) {
  // RN: Get device dimensions for responsive layout
  // RN: const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  // RN: const navigation = useNavigation();
  
  // RN: Fetch property data using TanStack Query
  // RN: const { data: property, isLoading, error } = useQuery({
  // RN:   queryKey: ['property', propertyId],
  // RN:   queryFn: () => fetchPropertyDetails(propertyId),
  // RN: });
  
  // RN: Shared values for button press animations
  // RN: const lidarScale = useSharedValue(1);
  // RN: const inspectionScale = useSharedValue(1);
  // RN: const locationScale = useSharedValue(1);
  
  // RN: If loading, show skeleton
  // RN: if (isLoading) return <PropertyDetailsSkeleton />;
  // RN: if (error) return <ErrorView error={error} onRetry={() => refetch()} />;
  
  return (
    // RN: Replace div with ScrollView for scrollable content
    // RN: <ScrollView 
    // RN:   style={styles.container}
    // RN:   contentContainerStyle={styles.contentContainer}
    // RN:   showsVerticalScrollIndicator={false}
    // RN: >
    <div 
      className="flex flex-col h-full w-full"
      style={{
        paddingLeft: 'var(--spacing-6)', // RN: Use SPACING.spacing6 from design tokens
        paddingRight: 'var(--spacing-6)', // RN: SPACING.spacing6
        paddingBottom: 'var(--spacing-6)', // RN: SPACING.spacing6
        gap: 'var(--spacing-4)', // RN: gap doesn't work in RN - use marginBottom on children
      }}
    >
      {/* RN: Top Section: Large Property Image + 3 Action Buttons */}
      {/* RN: Grid layout - use flexDirection row with flex values */}
      {/* RN: <View style={styles.topSection}> */}
      <div 
        className="grid grid-cols-[1.8fr_0.9fr]"
        style={{ gap: 'var(--spacing-3)' }} // RN: Not supported - use marginLeft on right column
      >
        {/* RN: Large Featured Property Image with Gold Border */}
        {/* RN: Use TouchableOpacity to open full-screen gallery */}
        {/* RN: <TouchableOpacity 
          RN:   style={styles.heroImageContainer}
          RN:   onPress={() => navigation.navigate('PropertyGallery', { propertyId, imageIndex: 0 })}
          RN:   activeOpacity={0.9}
          RN: > */}
        <div 
          className="backdrop-blur-sm transition-all overflow-hidden"
          style={{
            aspectRatio: '1', // RN: aspectRatio works the same in RN
            borderRadius: 'var(--radius-2xl)', // RN: RADIUS.radius2xl (e.g., 24)
            backgroundColor: 'var(--card-bg)', // RN: COLORS.cardBg
            border: '2px solid #D4AF37', // RN: borderWidth: 2, borderColor: COLORS.gold
            boxShadow: 'var(--shadow-depth-md), 0 0 12px rgba(212, 175, 55, 0.4)', // RN: Use shadow props (iOS) or elevation (Android)
            backgroundImage: `url(https://images.unsplash.com/photo-1758755791011-0720d654b8d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvdXNlJTIwZnJvbnQlMjBlbnRyYW5jZSUyMHZpZXd8ZW58MXx8fHwxNzYxNDI3MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
            backgroundSize: 'cover', // RN: Not supported - use FastImage resizeMode
            backgroundPosition: 'center', // RN: Not supported - image fills container by default
          }}
        >
          {/* RN: Use FastImage for optimized image loading */}
          {/* RN: <FastImage
            RN:   source={{ uri: property.images[0]?.url, priority: FastImage.priority.high }}
            RN:   style={StyleSheet.absoluteFill}
            RN:   resizeMode={FastImage.resizeMode.cover}
            RN: /> */}
          
          {/* RN: Inner glow overlay - works with View + LinearGradient */}
          {/* RN: <LinearGradient
            RN:   colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0)']}
            RN:   style={StyleSheet.absoluteFill}
            RN:   pointerEvents="none"
            RN: /> */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'var(--inner-glow-subtle)', // RN: Use LinearGradient component
            }}
          />
          {/* RN: </TouchableOpacity> */}
        </div>

        {/* RN: 3 Small Action Cards - Vertical Stack */}
        {/* RN: <View style={styles.actionButtonsColumn}> */}
        <div 
          className="flex flex-col justify-between"
          style={{ gap: 'var(--spacing-3)' }} // RN: Use marginBottom on each button instead
        >
          {/* RN: Lidar Card - Opens 3D visualization screen */}
          {/* RN: Use Animated.View with scale animation on press */}
          {/* RN: const lidarAnimatedStyle = useAnimatedStyle(() => ({
            RN:   transform: [{ scale: withSpring(lidarScale.value) }],
            RN: })); */}
          {/* RN: <TouchableOpacity
            RN:   style={styles.actionButton}
            RN:   onPress={() => navigation.navigate('LidarView', { propertyId })}
            RN:   onPressIn={() => { lidarScale.value = 0.95; }}
            RN:   onPressOut={() => { lidarScale.value = 1; }}
            RN:   activeOpacity={1}
            RN: > */}
          {/* RN: <Animated.View style={[styles.actionButtonInner, lidarAnimatedStyle]}> */}
          <button
            className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            style={{
              flex: 1, // RN: Each button takes equal vertical space
              borderRadius: 'var(--radius-xl)', // RN: RADIUS.radiusXl
              backgroundColor: 'var(--card-bg)', // RN: COLORS.cardBg
              border: '1px solid var(--card-border)', // RN: borderWidth: 1, borderColor: COLORS.cardBorder
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', // RN: Shadow props for iOS, elevation for Android
              padding: 'var(--spacing-3)', // RN: SPACING.spacing3
            }}
          >
            {/* RN: <View style={styles.actionButtonContent}> */}
            <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
              {/* RN: Icon from lucide-react-native */}
              <Settings className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--icon-color)' }} />
              {/* RN: <Settings size={20} color={COLORS.iconColor} /> */}
              
              {/* RN: <Text style={styles.actionButtonText} numberOfLines={1}> */}
              <span 
                className="truncate"
                style={{
                  fontSize: 'var(--text-sm)', // RN: Don't use - rely on default typography
                  fontWeight: 'var(--font-weight-semibold)', // RN: Don't use - rely on default typography
                  color: 'var(--text-primary)', // RN: COLORS.textPrimary
                }}
              >
                Lidar
              </span>
              {/* RN: </Text> */}
            </div>
            {/* RN: </View> */}
          </button>
          {/* RN: </Animated.View> */}
          {/* RN: </TouchableOpacity> */}

          {/* RN: Inspection Card - Opens inspection history */}
          {/* RN: <TouchableOpacity onPress={() => navigation.navigate('InspectionHistory', { propertyId })}> */}
          <button
            className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            style={{
              flex: 1,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              padding: 'var(--spacing-3)',
            }}
          >
            <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
              <Clipboard className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--icon-color)' }} />
              <span 
                className="truncate"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                Inspection
              </span>
            </div>
          </button>
          {/* RN: </TouchableOpacity> */}

          {/* RN: Location Card - Opens map view centered on property */}
          {/* RN: <TouchableOpacity onPress={() => navigation.navigate('MapView', { location: property.coordinates })}> */}
          <button
            className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            style={{
              flex: 1,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              padding: 'var(--spacing-3)',
            }}
          >
            <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
              <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--icon-color)' }} />
              <span 
                className="truncate"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                Location
              </span>
            </div>
          </button>
          {/* RN: </TouchableOpacity> */}
          {/* RN: </View> {/* Close action buttons column */}
        </div>
        {/* RN: </View> {/* Close top section */}
      </div>

      {/* RN: Property Details Section - Information Card */}
      {/* RN: Replace Card with styled View */}
      {/* RN: <View style={styles.detailsCard}> */}
      <Card
        className="backdrop-blur-sm"
        style={{
          borderRadius: 'var(--radius-2xl)', // RN: RADIUS.radius2xl
          backgroundColor: 'var(--card-bg)', // RN: COLORS.cardBg
          borderColor: 'var(--card-border)', // RN: COLORS.cardBorder
          padding: 'var(--spacing-5)', // RN: SPACING.spacing5
        }}
      >
        {/* RN: <View style={styles.detailsContent}> */}
        <div className="flex flex-col" style={{ gap: 'var(--spacing-5)' }}>
          {/* RN: <Text style={styles.detailsTitle}> */}
          <h3 
            style={{
              fontSize: 'var(--text-lg)', // RN: Don't override - use default h3 typography
              fontWeight: 'var(--font-weight-bold)', // RN: Don't override
              color: 'var(--text-primary)', // RN: COLORS.textPrimary
            }}
          >
            Property Details
          </h3>
          {/* RN: </Text> */}

          {/* RN: Details Grid - 2 columns for data pairs */}
          {/* RN: Use flexDirection: 'row' with flexWrap: 'wrap' */}
          {/* RN: <View style={styles.detailsGrid}> */}
          <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-5)' }}>
            {/* RN: Property Detail Field - Label/Value Pair */}
            {/* RN: <View style={styles.detailField}> */}
            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              {/* RN: <Text style={styles.detailLabel}> */}
              <label 
                style={{
                  fontSize: 'var(--text-xs)', // RN: Don't override
                  color: 'var(--text-secondary)', // RN: COLORS.textSecondary
                }}
              >
                Address
              </label>
              {/* RN: </Text> */}
              {/* RN: <Text style={styles.detailValue}> */}
              <p 
                style={{
                  fontSize: 'var(--text-sm)', // RN: Don't override
                  fontWeight: 'var(--font-weight-semibold)', // RN: Don't override
                  color: 'var(--text-primary)', // RN: COLORS.textPrimary
                }}
              >
                {/* RN: {property.address || '123 Main Street'} */}
                123 Main Street
              </p>
              {/* RN: </Text> */}
            </div>
            {/* RN: </View> */}

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Property Type
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                Single Family
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Est. Value
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                $850,000
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Square Feet
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                2,400 sq ft
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Bedrooms
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                3 beds
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Bathrooms
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                2 baths
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* RN: Bottom: 3 Circular Action Buttons */}
      {/* RN: <View style={styles.bottomButtonsContainer}> */}
      <div 
        className="flex items-center justify-center"
        style={{ gap: 'var(--spacing-8)', paddingTop: 'var(--spacing-2)' }}
      >
        {/* RN: Left Button - Previous/Back Action */}
        {/* RN: <TouchableOpacity
          RN:   style={styles.circularButton}
          RN:   onPress={() => handlePreviousAction()}
          RN:   activeOpacity={0.7}
          RN: > */}
        <button
          className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
          style={{
            width: '72px', // RN: Fixed size for circular shape
            height: '72px', // RN: Same as width for perfect circle
            borderRadius: '50%', // RN: borderRadius: 36 (half of width/height)
            backgroundColor: 'var(--card-bg)', // RN: COLORS.cardBg
            border: '1px solid var(--card-border)', // RN: borderWidth: 1, borderColor: COLORS.cardBorder
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // RN: Shadow props for iOS, elevation: 4 for Android
          }}
        >
          {/* RN: <View style={styles.circularButtonInner}> */}
          <div className="flex items-center justify-center w-full h-full">
            {/* RN: <Circle size={28} color={COLORS.iconColor} /> */}
            <Circle className="w-7 h-7" style={{ color: 'var(--icon-color)' }} />
          </div>
          {/* RN: </View> */}
        </button>
        {/* RN: </TouchableOpacity> */}

        {/* RN: Center Button - Primary Featured Action with Badge */}
        {/* RN: Use View wrapper for badge positioning */}
        {/* RN: <View style={styles.featuredButtonWrapper}> */}
        {/* RN: <TouchableOpacity
          RN:   style={[styles.circularButton, styles.featuredButton]}
          RN:   onPress={() => handlePrimaryAction()}
          RN:   activeOpacity={0.7}
          RN: > */}
        <button
          className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(139, 92, 246, 0.4)', // RN: Purple glow effect
            position: 'relative', // RN: For badge positioning
          }}
        >
          {/* RN: <View style={styles.circularButtonInner}> */}
          <div className="flex items-center justify-center w-full h-full">
            {/* RN: <CheckCircle2 size={28} color={COLORS.iconColor} /> */}
            <CheckCircle2 className="w-7 h-7" style={{ color: 'var(--icon-color)' }} />
          </div>
          {/* RN: </View> */}
          
          {/* RN: Purple notification badge - positioned absolutely */}
          {/* RN: <View style={styles.notificationBadge} /> */}
          <div
            className="absolute"
            style={{
              top: '-2px', // RN: position: 'absolute', top: -2
              right: '-2px', // RN: right: -2
              width: '14px', // RN: width: 14, height: 14
              height: '14px',
              borderRadius: '50%', // RN: borderRadius: 7
              backgroundColor: '#a855f7', // RN: COLORS.purple500
              boxShadow: '0 0 12px rgba(168, 85, 247, 0.8)', // RN: Shadow props for glow effect
            }}
          />
        </button>
        {/* RN: </TouchableOpacity> */}
        {/* RN: </View> */}

        {/* RN: Right Button - Next/Forward Action */}
        {/* RN: <TouchableOpacity style={styles.circularButton} onPress={() => handleNextAction()}> */}
        <button
          className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <Circle className="w-7 h-7" style={{ color: 'var(--icon-color)' }} />
          </div>
        </button>
        {/* RN: </TouchableOpacity> */}
        {/* RN: </View> {/* Close bottom buttons container */}
      </div>
      {/* RN: </ScrollView> */}
    </div>
  );
};

/**
 * ==============================================================================
 * REACT NATIVE STYLESHEET EXAMPLE
 * ==============================================================================
 * 
 * RN: Complete StyleSheet for PropertyDetailsScreen component
 * 
 * import { StyleSheet, Dimensions, Platform } from 'react-native';
 * 
 * const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *   },
 *   contentContainer: {
 *     paddingHorizontal: SPACING.spacing6,
 *     paddingBottom: SPACING.spacing6,
 *   },
 *   // Top section with hero image and action buttons
 *   topSection: {
 *     flexDirection: 'row',
 *     marginBottom: SPACING.spacing4,
 *   },
 *   heroImageContainer: {
 *     flex: 1.8,
 *     aspectRatio: 1,
 *     borderRadius: RADIUS.radius2xl,
 *     backgroundColor: COLORS.cardBg,
 *     borderWidth: 2,
 *     borderColor: COLORS.gold,
 *     overflow: 'hidden',
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: COLORS.gold,
 *         shadowOffset: { width: 0, height: 4 },
 *         shadowOpacity: 0.4,
 *         shadowRadius: 12,
 *       },
 *       android: {
 *         elevation: 6,
 *       },
 *     }),
 *   },
 *   actionButtonsColumn: {
 *     flex: 0.9,
 *     marginLeft: SPACING.spacing3,
 *     justifyContent: 'space-between',
 *   },
 *   actionButton: {
 *     flex: 1,
 *     borderRadius: RADIUS.radiusXl,
 *     backgroundColor: COLORS.cardBg,
 *     borderWidth: 1,
 *     borderColor: COLORS.cardBorder,
 *     padding: SPACING.spacing3,
 *     marginBottom: SPACING.spacing3,
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: '#000',
 *         shadowOffset: { width: 0, height: 2 },
 *         shadowOpacity: 0.2,
 *         shadowRadius: 8,
 *       },
 *       android: {
 *         elevation: 3,
 *       },
 *     }),
 *   },
 *   actionButtonInner: {
 *     flex: 1,
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *   },
 *   actionButtonText: {
 *     marginLeft: SPACING.spacing2,
 *     color: COLORS.textPrimary,
 *     flex: 1,
 *   },
 *   // Property details card
 *   detailsCard: {
 *     borderRadius: RADIUS.radius2xl,
 *     backgroundColor: COLORS.cardBg,
 *     borderWidth: 1,
 *     borderColor: COLORS.cardBorder,
 *     padding: SPACING.spacing5,
 *     marginBottom: SPACING.spacing4,
 *   },
 *   detailsContent: {
 *     gap: SPACING.spacing5,
 *   },
 *   detailsTitle: {
 *     color: COLORS.textPrimary,
 *   },
 *   detailsGrid: {
 *     flexDirection: 'row',
 *     flexWrap: 'wrap',
 *   },
 *   detailField: {
 *     width: '50%',
 *     marginBottom: SPACING.spacing5,
 *   },
 *   detailLabel: {
 *     color: COLORS.textSecondary,
 *     marginBottom: SPACING.spacing1,
 *   },
 *   detailValue: {
 *     color: COLORS.textPrimary,
 *   },
 *   // Bottom circular buttons
 *   bottomButtonsContainer: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     paddingTop: SPACING.spacing2,
 *     gap: SPACING.spacing8,
 *   },
 *   circularButton: {
 *     width: 72,
 *     height: 72,
 *     borderRadius: 36,
 *     backgroundColor: COLORS.cardBg,
 *     borderWidth: 1,
 *     borderColor: COLORS.cardBorder,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: '#000',
 *         shadowOffset: { width: 0, height: 4 },
 *         shadowOpacity: 0.3,
 *         shadowRadius: 12,
 *       },
 *       android: {
 *         elevation: 4,
 *       },
 *     }),
 *   },
 *   featuredButtonWrapper: {
 *     position: 'relative',
 *   },
 *   featuredButton: {
 *     // Add purple glow effect with shadow
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: COLORS.purple500,
 *         shadowOffset: { width: 0, height: 0 },
 *         shadowOpacity: 0.4,
 *         shadowRadius: 20,
 *       },
 *     }),
 *   },
 *   notificationBadge: {
 *     position: 'absolute',
 *     top: -2,
 *     right: -2,
 *     width: 14,
 *     height: 14,
 *     borderRadius: 7,
 *     backgroundColor: COLORS.purple500,
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: COLORS.purple500,
 *         shadowOffset: { width: 0, height: 0 },
 *         shadowOpacity: 0.8,
 *         shadowRadius: 12,
 *       },
 *     }),
 *   },
 * });
 */

/**
 * ==============================================================================
 * DATA FETCHING WITH TANSTACK QUERY
 * ==============================================================================
 * 
 * RN: Complete data fetching implementation
 * 
 * // API service functions
 * const fetchPropertyDetails = async (propertyId: string) => {
 *   const response = await apiClient.get(`/api/properties/${propertyId}`);
 *   return response.data;
 * };
 * 
 * const fetchInspectionHistory = async (propertyId: string) => {
 *   const response = await apiClient.get(`/api/properties/${propertyId}/inspections`);
 *   return response.data;
 * };
 * 
 * // In component
 * export function PropertyDetailsScreen({ route }) {
 *   const { propertyId } = route.params;
 *   const navigation = useNavigation();
 *   
 *   // Fetch property data
 *   const { 
 *     data: property, 
 *     isLoading, 
 *     error, 
 *     refetch 
 *   } = useQuery({
 *     queryKey: ['property', propertyId],
 *     queryFn: () => fetchPropertyDetails(propertyId),
 *     staleTime: 5 * 60 * 1000, // 5 minutes
 *   });
 *   
 *   // Prefetch inspection history for faster navigation
 *   const queryClient = useQueryClient();
 *   useEffect(() => {
 *     queryClient.prefetchQuery({
 *       queryKey: ['inspections', propertyId],
 *       queryFn: () => fetchInspectionHistory(propertyId),
 *     });
 *   }, [propertyId]);
 *   
 *   if (isLoading) {
 *     return <PropertyDetailsSkeleton />;
 *   }
 *   
 *   if (error) {
 *     return (
 *       <ErrorView 
 *         error={error} 
 *         onRetry={refetch}
 *         message="Failed to load property details"
 *       />
 *     );
 *   }
 *   
 *   return (
 *     // ... component JSX
 *   );
 * }
 */

/**
 * ==============================================================================
 * NAVIGATION IMPLEMENTATION
 * ==============================================================================
 * 
 * RN: Navigation setup with React Navigation
 * 
 * // Define navigation types
 * type PropertyStackParamList = {
 *   PropertyDetails: { propertyId: string };
 *   PropertyGallery: { propertyId: string; imageIndex: number };
 *   LidarView: { propertyId: string };
 *   InspectionHistory: { propertyId: string };
 *   MapView: { location: { latitude: number; longitude: number } };
 * };
 * 
 * // In component
 * const navigation = useNavigation<NavigationProp<PropertyStackParamList>>();
 * 
 * // Navigate to gallery
 * const openGallery = (imageIndex: number) => {
 *   navigation.navigate('PropertyGallery', {
 *     propertyId: property.id,
 *     imageIndex,
 *   });
 * };
 * 
 * // Navigate to lidar view
 * const openLidar = () => {
 *   if (!property.has3DModel) {
 *     Alert.alert('Not Available', '3D model not available for this property');
 *     return;
 *   }
 *   navigation.navigate('LidarView', { propertyId: property.id });
 * };
 * 
 * // Navigate to inspection history
 * const openInspections = () => {
 *   navigation.navigate('InspectionHistory', { propertyId: property.id });
 * };
 * 
 * // Navigate to map
 * const openMap = () => {
 *   navigation.navigate('MapView', {
 *     location: {
 *       latitude: property.latitude,
 *       longitude: property.longitude,
 *     },
 *   });
 * };
 */

/**
 * ==============================================================================
 * IMAGE GALLERY IMPLEMENTATION
 * ==============================================================================
 * 
 * RN: Full-screen image gallery with react-native-image-viewing
 * 
 * import ImageView from 'react-native-image-viewing';
 * import { useState } from 'react';
 * 
 * export function PropertyDetailsScreen({ route }) {
 *   const [galleryVisible, setGalleryVisible] = useState(false);
 *   const [imageIndex, setImageIndex] = useState(0);
 *   
 *   const images = property.images.map(img => ({ uri: img.url }));
 *   
 *   const openGallery = (index: number) => {
 *     setImageIndex(index);
 *     setGalleryVisible(true);
 *   };
 *   
 *   return (
 *     <>
 *       <ScrollView>
 *         <TouchableOpacity onPress={() => openGallery(0)}>
 *           <FastImage
 *             source={{ uri: property.images[0]?.url }}
 *             style={styles.heroImage}
 *             resizeMode={FastImage.resizeMode.cover}
 *           />
 *         </TouchableOpacity>
 *       </ScrollView>
 *       
 *       <ImageView
 *         images={images}
 *         imageIndex={imageIndex}
 *         visible={galleryVisible}
 *         onRequestClose={() => setGalleryVisible(false)}
 *         FooterComponent={({ imageIndex }) => (
 *           <View style={styles.galleryFooter}>
 *             <Text style={styles.galleryCounter}>
 *               {imageIndex + 1} / {images.length}
 *             </Text>
 *           </View>
 *         )}
 *       />
 *     </>
 *   );
 * }
 */

/**
 * ==============================================================================
 * LOADING SKELETON COMPONENT
 * ==============================================================================
 * 
 * RN: Skeleton loading state while data fetches
 * 
 * import { Skeleton } from '@rneui/themed'; // or react-native-skeleton-placeholder
 * 
 * const PropertyDetailsSkeleton = () => {
 *   return (
 *     <View style={styles.container}>
 *       <View style={styles.topSection}>
 *         <Skeleton 
 *           animation="pulse" 
 *           style={[styles.heroImageContainer, { borderWidth: 0 }]}
 *         />
 *         <View style={styles.actionButtonsColumn}>
 *           <Skeleton style={[styles.actionButton, { marginBottom: SPACING.spacing3 }]} />
 *           <Skeleton style={[styles.actionButton, { marginBottom: SPACING.spacing3 }]} />
 *           <Skeleton style={styles.actionButton} />
 *         </View>
 *       </View>
 *       
 *       <Skeleton style={[styles.detailsCard, { height: 200 }]} />
 *       
 *       <View style={styles.bottomButtonsContainer}>
 *         <Skeleton style={styles.circularButton} circle />
 *         <Skeleton style={styles.circularButton} circle />
 *         <Skeleton style={styles.circularButton} circle />
 *       </View>
 *     </View>
 *   );
 * };
 */

/**
 * ==============================================================================
 * TESTING CHECKLIST - REACT NATIVE
 * ==============================================================================
 * 
 * DATA & STATE:
 * - [ ] Property data loads correctly from API
 * - [ ] Loading skeleton displays while fetching
 * - [ ] Error state shows when API fails
 * - [ ] Retry functionality works on error
 * - [ ] Data refreshes on pull-to-refresh
 * - [ ] Cached data displays immediately on revisit
 * 
 * LAYOUT & RESPONSIVE:
 * - [ ] Hero image maintains aspect ratio
 * - [ ] Action buttons are properly sized
 * - [ ] Details grid shows 2 columns
 * - [ ] Layout works on small phones (iPhone SE)
 * - [ ] Layout works on large phones (iPhone Pro Max)
 * - [ ] Layout works on tablets
 * - [ ] Layout works in landscape mode
 * 
 * IMAGES:
 * - [ ] Hero image loads with FastImage
 * - [ ] Image placeholder shows while loading
 * - [ ] Image error state handled gracefully
 * - [ ] Tapping image opens gallery
 * - [ ] Gallery allows pinch-to-zoom
 * - [ ] Gallery swipe navigation works
 * - [ ] Gallery close button works
 * 
 * NAVIGATION:
 * - [ ] Lidar button navigates to 3D view
 * - [ ] Inspection button shows history
 * - [ ] Location button opens map
 * - [ ] Back button returns to previous screen
 * - [ ] Circular buttons trigger correct actions
 * - [ ] Navigation animations are smooth
 * 
 * INTERACTIONS:
 * - [ ] Button press animations work (scale effect)
 * - [ ] TouchableOpacity activeOpacity correct
 * - [ ] Buttons have appropriate tap targets (44x44 minimum)
 * - [ ] No double-tap issues
 * - [ ] Haptic feedback on button press (if implemented)
 * 
 * STYLING:
 * - [ ] Gold border shows on hero image
 * - [ ] Purple glow shows on featured button
 * - [ ] Notification badge positioned correctly
 * - [ ] Shadows render correctly (iOS)
 * - [ ] Elevation renders correctly (Android)
 * - [ ] Glassmorphism effect works (if implemented)
 * - [ ] Dark mode styling correct
 * - [ ] Light mode styling correct
 * 
 * PERFORMANCE:
 * - [ ] Smooth 60fps scrolling
 * - [ ] No memory leaks
 * - [ ] Images don't cause memory issues
 * - [ ] Animations don't drop frames
 * - [ ] Fast initial render (< 1 second)
 * 
 * ACCESSIBILITY:
 * - [ ] All buttons have accessibility labels
 * - [ ] Screen reader announces property details
 * - [ ] Images have alt text
 * - [ ] Sufficient color contrast
 * - [ ] Touch targets are large enough
 * 
 * PLATFORM-SPECIFIC:
 * - [ ] iOS: Shadows render correctly
 * - [ ] Android: Elevation renders correctly
 * - [ ] iOS: Safe area handled (notch)
 * - [ ] Android: Back button navigation works
 * - [ ] Both: Status bar style appropriate
 */;