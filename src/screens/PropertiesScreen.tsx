/**
 * ==============================================================================
 * PROPERTIESSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Displays a user's portfolio of properties with luxury styling,
 * animated accordion effects, and interactive property cards.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. ANIMATION LIBRARY CHANGES:
 *    - CURRENT: motion/react (Framer Motion for web)
 *    - REACT NATIVE: react-native-reanimated v3
 *    - Replace motion.div with Animated.View
 *    - Replace motion.button with Animated touchable components (TouchableOpacity/Pressable)
 *    - Convert CSS-based animations to useAnimatedStyle and withTiming/withSpring
 * 
 * 2. STYLING CONVERSION:
 *    - CURRENT: Inline styles using CSS variables and className
 *    - REACT NATIVE: StyleSheet.create() or inline styles with React Native values
 *    - Convert all CSS variables (var(--spacing-6)) to theme values
 *    - Remove className prop entirely
 *    - Convert rem/em units to fixed pixel values
 *    - Convert backdrop-blur to react-native-blur or BlurView component
 * 
 * 3. LAYOUT COMPONENTS:
 *    - div → View
 *    - button → TouchableOpacity or Pressable
 *    - p → Text
 *    - span → Text
 * 
 * 4. IMAGE HANDLING:
 *    - CURRENT: ImageWithFallback (web component)
 *    - REACT NATIVE: React Native Image or FastImage for caching
 *    - Add proper loading states and error handling
 * 
 * 5. TOAST NOTIFICATIONS:
 *    - CURRENT: sonner@2.0.3
 *    - REACT NATIVE: react-native-toast-message or custom toast
 * 
 * 6. ICON LIBRARY:
 *    - CURRENT: lucide-react
 *    - REACT NATIVE: react-native-vector-icons or @expo/vector-icons
 * 
 * 7. SCROLL BEHAVIOR:
 *    - Add ScrollView wrapper for content
 *    - Configure contentContainerStyle for proper spacing
 * 
 * 8. GLASSMORPHISM EFFECTS:
 *    - backdrop-blur → BlurView from @react-native-community/blur
 *    - Combine with transparent backgrounds
 * 
 * ==============================================================================
 * MOCK DATA POINTS - NEEDS REAL API CONNECTIONS
 * ==============================================================================
 * 
 * DATA SOURCE: const properties array (lines 77-108)
 * 
 * REQUIRED API ENDPOINTS:
 * 
 * 1. GET /api/properties/portfolio
 *    Returns all properties for authenticated user
 *    
 *    RESPONSE SHAPE:
 *    {
 *      properties: [
 *        {
 *          id: string,                    // Unique property identifier
 *          address: string,               // Street address
 *          city: string,                  // City and neighborhood
 *          state: string,                 // State abbreviation
 *          zipCode: string,               // ZIP code
 *          value: number,                 // Property value in dollars
 *          lastInspected: Date,           // Last inspection timestamp
 *          status: 'active' | 'inactive' | 'pending', // Property status
 *          badge: string,                 // Premium badge label
 *          propertyType: string,          // Victorian, Mansion, Penthouse, etc.
 *          coordinates: {
 *            latitude: number,            // Property latitude
 *            longitude: number            // Property longitude
 *          },
 *          images: {
 *            primary: string,             // Primary property image URL
 *            gallery: string[],           // Additional property images
 *            thumbnail: string            // Optimized thumbnail
 *          },
 *          insurance: {
 *            policyId: string,            // Insurance policy identifier
 *            carrier: string,             // Insurance carrier name
 *            coverageAmount: number,      // Coverage amount
 *            expirationDate: Date         // Policy expiration
 *          },
 *          metrics: {
 *            squareFootage: number,       // Total square footage
 *            bedrooms: number,            // Number of bedrooms
 *            bathrooms: number,           // Number of bathrooms
 *            yearBuilt: number,           // Year constructed
 *            lotSize: number              // Lot size in sq ft
 *          }
 *        }
 *      ],
 *      totalProperties: number,
 *      totalValue: number,
 *      lastUpdated: Date
 *    }
 * 
 * 2. POST /api/properties/add
 *    Add new property to portfolio
 *    
 *    REQUEST BODY:
 *    {
 *      address: string,
 *      city: string,
 *      state: string,
 *      zipCode: string,
 *      propertyType: string,
 *      estimatedValue: number
 *    }
 * 
 * 3. GET /api/properties/:propertyId
 *    Get detailed property information
 *    Returns full property object with inspection history, claims, documents
 * 
 * ==============================================================================
 * THIRD-PARTY API INTEGRATIONS NEEDED
 * ==============================================================================
 * 
 * 1. MAPBOX API (Currently used for static map images)
 *    - PURPOSE: Display property location with aerial/satellite view
 *    - CURRENT: Static image API (lines 57-74)
 *    - REACT NATIVE: Use @rnmapbox/maps or react-native-maps
 *    - API KEY: Store in environment variables (.env)
 *    - RATE LIMITS: Monitor usage, implement caching
 * 
 * 2. UNSPLASH API (Currently used for property images)
 *    - PURPOSE: Placeholder property images
 *    - REPLACE WITH: Real property photos from MLS/internal database
 *    - Upload to CDN (Cloudinary, AWS S3, etc.)
 * 
 * 3. GEOCODING API (For address to coordinates)
 *    - When adding new properties, convert address to lat/lng
 *    - Options: Google Maps Geocoding, Mapbox Geocoding
 * 
 * ==============================================================================
 * STATE MANAGEMENT NEEDED
 * ==============================================================================
 * 
 * CURRENT STATE: None (static data)
 * 
 * REQUIRED STATE:
 * - properties: Property[] (fetched from API)
 * - loading: boolean (for API fetch status)
 * - error: string | null (for error handling)
 * - selectedProperty: Property | null (for navigation)
 * - refreshing: boolean (for pull-to-refresh)
 * 
 * RECOMMENDED APPROACH:
 * - React Query / TanStack Query for data fetching and caching
 * - Context API or Redux for global property state
 * - Local state for UI interactions
 * 
 * ==============================================================================
 * COMPONENT BREAKDOWN
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'motion/react';
import { Building, MapPin, DollarSign, Calendar, Plus, ChevronRight, Crown, Star } from "lucide-react";
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

/**
 * ==============================================================================
 * ANIMATION CONFIGURATION
 * ==============================================================================
 * 
 * REACT NATIVE CONVERSION:
 * Replace with react-native-reanimated v3 configuration
 * 
 * Example conversion:
 * const fadeIn = useAnimatedStyle(() => {
 *   return {
 *     opacity: withTiming(1, { duration: 300 }),
 *   };
 * });
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slower stagger for accordion effect
      delayChildren: 0.2
    }
  }
};

// Accordion paper unfolding animation
// Each card unfolds like a piece of paper in an accordion, revealing from a compressed folded state
/**
 * REACT NATIVE CONVERSION:
 * - rotateX: Use transform with perspective
 * - scaleY: Use transform scale
 * - y: Use translateY
 * - Example: transform: [{ perspective: 2000 }, { rotateX: '-95deg' }, { translateY: -40 }, { scaleY: 0.05 }]
 */
const cardVariants = {
  hidden: { 
    opacity: 0,
    rotateX: -95, // More extreme fold angle
    y: -40, // Start higher for accordion compression effect
    scaleY: 0.05, // Very compressed vertically like folded paper
    transformPerspective: 2000,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scaleY: 1,
    transformPerspective: 2000,
    transition: {
      duration: 1.8, // Much slower unfold
      ease: [0.16, 1, 0.3, 1], // Smooth accordion-like easing
      opacity: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1]
      },
      rotateX: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1] // Long, smooth rotation unfold
      },
      scaleY: {
        duration: 1.8,
        ease: [0.34, 1.56, 0.64, 1] // Elastic feel for paper expanding
      },
      y: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1] // Smooth drop as paper unfolds
      }
    }
  }
};

/**
 * ==============================================================================
 * MAPBOX CONFIGURATION
 * ==============================================================================
 * 
 * SECURITY NOTE: Move to environment variables
 * REACT NATIVE: Use react-native-config or expo-constants
 * 
 * .env file:
 * MAPBOX_ACCESS_TOKEN=pk.eyJ1...
 * 
 * Access in code:
 * import Config from 'react-native-config';
 * const token = Config.MAPBOX_ACCESS_TOKEN;
 */
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGV2bXBhIiwiYSI6ImNtYXZsMTIwZjA1eTUya3E1N2dxaGgxajgifQ.Q7innEbjuANj49xD9NAu7g';

/**
 * FUNCTION: getMapbox3DAerialUrl
 * 
 * PURPOSE: Generate Mapbox static map image URL with blue-toned styling
 * 
 * REACT NATIVE CONVERSION:
 * - Keep this function for static images OR
 * - Replace with interactive map using @rnmapbox/maps
 * - Cache generated URLs to reduce API calls
 * 
 * PARAMETERS:
 * @param latitude - Property latitude coordinate
 * @param longitude - Property longitude coordinate  
 * @param width - Image width in pixels (default: 428)
 * @param height - Image height in pixels (default: 852)
 * 
 * @returns Mapbox static image URL
 */
function getMapbox3DAerialUrl(
  latitude: number,
  longitude: number,
  width: number = 428,
  height: number = 852
): string {
  const zoom = 16; // Higher zoom for more detail
  const bearing = 0;
  const pitch = 0;
  const style = 'navigation-night-v1'; // Blue-toned navigation style
  const retina = '@2x';
  
  return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${longitude},${latitude},${zoom},${bearing},${pitch}/${width}x${height}${retina}?access_token=${MAPBOX_ACCESS_TOKEN}`;
}

/**
 * ==============================================================================
 * MAIN COMPONENT: PropertiesScreen
 * ==============================================================================
 * 
 * RESPONSIBILITIES:
 * 1. Display user's property portfolio
 * 2. Show property cards with images, details, and status
 * 3. Handle property selection navigation
 * 4. Support adding new properties
 * 5. Display background map for visual context
 * 
 * REACT NATIVE CONVERSION:
 * - Wrap content in SafeAreaView for device edges
 * - Use ScrollView for scrollable content
 * - Replace div with View
 * - Replace button with TouchableOpacity or Pressable
 * - Use StatusBar component for status bar styling
 * 
 * PROPS NEEDED (Currently none):
 * - onPropertySelect: (propertyId: string) => void
 * - onAddProperty: () => void
 * - navigation: NavigationProp (React Navigation)
 * 
 * Example:
 * interface PropertiesScreenProps {
 *   navigation: NavigationProp<any>;
 *   route: RouteProp<any>;
 * }
 */
export function PropertiesScreen() {
  /**
   * ============================================================================
   * MOCK DATA - REPLACE WITH API CALL
   * ============================================================================
   * 
   * CURRENT: Hard-coded array of properties
   * 
   * REPLACE WITH:
   * const { data: properties, isLoading, error } = useQuery({
   *   queryKey: ['properties'],
   *   queryFn: fetchUserProperties
   * });
   * 
   * API ENDPOINT: GET /api/properties/portfolio
   * 
   * MOCK DATA FIELDS EXPLAINED:
   * - address: Street address (should come from property database)
   * - city: City and neighborhood (parse from full address or separate field)
   * - value: Property value (from appraisal or Zillow/Redfin API)
   * - lastInspected: Timestamp of last drone inspection
   * - status: Insurance/property status ('active', 'inactive', 'pending')
   * - badge: Premium label (derived from property type and value)
   * - coordinates: Lat/lng for map display (geocode from address)
   * - image: Property photo (from MLS, internal database, or drone captures)
   */
  const properties = [
    { 
      address: '2640 Steiner Street', 
      city: 'Pacific Heights, SF',
      value: '$8.2M',
      lastInspected: '2 days ago',
      status: 'active',
      badge: 'Premium Victorian',
      coordinates: { latitude: 37.7946, longitude: -122.4397 },
      image: 'https://images.unsplash.com/photo-1628744448838-c04e09b1ba03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9uJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzYyMTk3NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      address: '1235 Washington Street', 
      city: 'Nob Hill, SF',
      value: '$11.5M',
      lastInspected: '5 days ago',
      status: 'active',
      badge: 'Historic Mansion',
      coordinates: { latitude: 37.7933, longitude: -122.4150 },
      image: 'https://images.unsplash.com/photo-1639059851892-95c80412298c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBlc3RhdGV8ZW58MXx8fHwxNzYyMjQwMDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      address: '3650 Broadway', 
      city: 'Pacific Heights, SF',
      value: '$15.9M',
      lastInspected: '1 day ago',
      status: 'active',
      badge: 'Luxury Penthouse',
      coordinates: { latitude: 37.7946, longitude: -122.4397 },
      image: 'https://images.unsplash.com/photo-1577214582508-fdde28e64474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIzMTE5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  /**
   * ============================================================================
   * BACKGROUND MAP GENERATION
   * ============================================================================
   * 
   * CURRENT: Uses first property's coordinates to generate background map
   * 
   * REACT NATIVE CONSIDERATIONS:
   * - May not render well on all devices
   * - Consider using blurred property image instead
   * - Or use @rnmapbox/maps with snapshot feature
   * 
   * OPTIMIZATION:
   * - Cache generated map URLs
   * - Only regenerate when properties change
   */
  const backgroundMapUrl = React.useMemo(() => {
    const firstProperty = properties[0];
    return getMapbox3DAerialUrl(
      firstProperty.coordinates.latitude,
      firstProperty.coordinates.longitude
    );
  }, []);

  /**
   * ============================================================================
   * COMPONENT JSX STRUCTURE
   * ============================================================================
   * 
   * LAYOUT HIERARCHY:
   * - Container (div → View)
   *   - Background Map Layer (absolute positioned)
   *   - Blue Overlay Layer (absolute positioned)
   *   - Header Section (motion.div → Animated.View)
   *   - Properties List (motion.div → Animated.View with FlatList)
   *     - Property Card (motion.button → TouchableOpacity)
   *       - Property Image
   *       - Badge Overlay
   *       - Property Details
   *       - Status Indicator
   *       - Fold Indicators (decorative)
   *   - Add Property Button (motion.button → TouchableOpacity)
   */
  return (
    /**
     * ROOT CONTAINER
     * 
     * REACT NATIVE CONVERSION:
     * <SafeAreaView style={styles.safeArea}>
     *   <ScrollView contentContainerStyle={styles.scrollContent}>
     *     ...content...
     *   </ScrollView>
     * </SafeAreaView>
     * 
     * STYLING NOTES:
     * - paddingLeft/Right: Use paddingHorizontal
     * - gap: Not supported in RN, use marginBottom on children
     * - paddingBottom: Account for tab bar height
     */
    <div 
      className="w-full h-full flex flex-col relative"
      style={{ 
        paddingLeft: 'var(--spacing-6)',
        paddingRight: 'var(--spacing-6)',
        paddingTop: '0',
        gap: 'var(--spacing-4)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))'
      }}
    >
      {/* 
        BACKGROUND MAP LAYER
        
        REACT NATIVE CONVERSION:
        <Image 
          source={{ uri: backgroundMapUrl }}
          style={styles.backgroundMap}
          blurRadius={10}
        />
        OR use BlurView with Image underneath
        
        STYLING NOTES:
        - position: 'absolute'
        - top: 0, left: 0, right: 0, bottom: 0
        - opacity: 0.25
        - No filter support in RN (apply blur differently)
      */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundMapUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.25,
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'grayscale(1) sepia(0.3) hue-rotate(180deg) saturate(0.8) brightness(0.9)',
          mixBlendMode: 'lighten',
        }}
      />
      
      {/* 
        BLUE OVERLAY LAYER
        
        REACT NATIVE CONVERSION:
        <View style={styles.blueOverlay} />
        
        STYLING NOTES:
        - Use LinearGradient from expo-linear-gradient or react-native-linear-gradient
        - Colors: ['rgba(59, 130, 246, 0.12)', 'rgba(37, 99, 235, 0.08)', 'rgba(29, 78, 216, 0.15)']
        - No mixBlendMode in RN (remove or handle differently)
      */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.08) 50%, rgba(29, 78, 216, 0.15) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
          mixBlendMode: 'color',
        }}
      />
      
      {/* 
        HEADER SECTION
        
        REACT NATIVE CONVERSION:
        <Animated.View entering={FadeInUp.duration(400)}>
          ...
        </Animated.View>
        
        COMPONENT BREAKDOWN:
        - Star icon (from vector-icons)
        - Title text
        - Subtitle text
      */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ paddingTop: 'var(--spacing-6)', position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          {/* 
            STAR ICON
            REACT NATIVE: <Icon name="star" size={16} color={theme.colors.goldenrod} />
          */}
          <Star className="w-4 h-4" style={{ color: 'rgb(var(--color-goldenrod))' }} />
          
          {/* 
            TITLE TEXT
            REACT NATIVE: <Text style={styles.headerTitle}>Premium Portfolio</Text>
          */}
          <p style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>
            Premium Portfolio
          </p>
        </div>
        
        {/* 
          SUBTITLE TEXT
          REACT NATIVE: <Text style={styles.headerSubtitle}>San Francisco luxury properties...</Text>
          
          DATA SOURCE: Hard-coded text
          MAKE DYNAMIC: Based on user location or property locations
        */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 'var(--spacing-1)' }}>
          San Francisco luxury properties under PolicyAngel protection
        </p>
      </motion.div>

      {/* 
        PROPERTIES LIST
        
        REACT NATIVE CONVERSION:
        <Animated.View entering={FadeIn.delay(200)}>
          <FlatList
            data={properties}
            renderItem={({ item, index }) => <PropertyCard property={item} index={index} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </Animated.View>
        
        OPTIMIZATION:
        - Use FlatList instead of map for better performance
        - Add getItemLayout for fixed height items
        - Enable removeClippedSubviews for memory optimization
      */}
      <motion.div 
        className="flex flex-col backdrop-blur-md" 
        style={{ 
          gap: '0',
          position: 'relative', 
          zIndex: 1,
          perspective: '1500px',
          perspectiveOrigin: 'center top',
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {properties.map((property, index) => {
          const isFirst = index === 0;
          const isLast = index === properties.length - 1;
          
          return (
            /**
             * PROPERTY CARD BUTTON
             * 
             * REACT NATIVE CONVERSION:
             * <Pressable
             *   onPress={() => navigation.navigate('PropertyDetails', { propertyId: property.id })}
             *   style={({ pressed }) => [
             *     styles.propertyCard,
             *     pressed && styles.propertyCardPressed
             *   ]}
             * >
             * 
             * INTERACTION:
             * - whileHover: Use Animated.timing on pressIn/pressOut
             * - whileTap: Use scale transform in Pressable
             * - onClick: Use onPress navigation
             * 
             * STYLING:
             * - backdrop-blur: Use BlurView wrapper
             * - transformOrigin: Not supported in RN (remove)
             * - transformStyle: Not supported in RN (remove)
             * - backfaceVisibility: Supported in RN
             * - boxShadow: Use shadowColor, shadowOffset, shadowOpacity, shadowRadius
             */
            <motion.button
              key={index}
              variants={cardVariants}
              whileHover={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                boxShadow: '0 0 30px rgba(214, 158, 46, 0.35), 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 25px rgba(214, 158, 46, 0.08)'
              }}
              whileTap={{ scale: 0.995 }}
              onClick={() => toast.info(`Opening ${property.address}...`)}
              className="backdrop-blur-md"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(214, 158, 46, 0.3)',
                padding: 'var(--spacing-2)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity',
                position: 'relative',
                marginBottom: !isLast ? 'var(--spacing-2)' : '0',
                // Premium golden glow with depth
                boxShadow: `
                  0 0 20px rgba(214, 158, 46, 0.2),
                  0 4px 20px rgba(0, 0, 0, 0.3),
                  inset 0 0 20px rgba(214, 158, 46, 0.05),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  ${!isLast ? '0 8px 16px rgba(0, 0, 0, 0.15)' : '0 0 0 transparent'}
                `
              }}
            >
            {/* 
              PROPERTY IMAGE CONTAINER
              
              REACT NATIVE CONVERSION:
              <View style={styles.imageContainer}>
                <FastImage
                  source={{ uri: property.image, priority: FastImage.priority.high }}
                  style={styles.propertyImage}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <LinearGradient ... /> // Overlay
                <View style={styles.badge}>...</View> // Badge
              </View>
              
              IMAGE SOURCE: Currently from Unsplash
              REPLACE WITH: Property photos from internal database or MLS
              
              CONSIDERATIONS:
              - Add loading placeholder (skeleton)
              - Add error fallback image
              - Cache images with FastImage
              - Optimize image size for mobile (use thumbnails)
            */}
            <div 
              style={{ 
                marginBottom: 'var(--spacing-1)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                position: 'relative',
                height: '70px'
              }}
            >
              {/* 
                PROPERTY IMAGE
                REACT NATIVE: <FastImage source={{ uri: property.image }} style={styles.image} />
              */}
              <ImageWithFallback 
                src={property.image}
                alt={`${property.address} exterior`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              
              {/* 
                IMAGE OVERLAY (Luxury gradient)
                REACT NATIVE: <LinearGradient colors={[...]} style={styles.overlay} />
              */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(214,158,46,0.15) 0%, rgba(0,0,0,0.4) 100%)',
                  pointerEvents: 'none'
                }}
              />
              
              {/* 
                PREMIUM BADGE
                
                REACT NATIVE CONVERSION:
                <View style={styles.badge}>
                  <Icon name="crown" size={10} color="#1A202C" />
                  <Text style={styles.badgeText}>{property.badge}</Text>
                </View>
                
                DATA SOURCE: property.badge (hard-coded)
                MAKE DYNAMIC: Derive from property type, value, or special features
                Logic: If value > $10M → "Ultra Luxury", if historic → "Historic", etc.
              */}
              <div 
                style={{
                  position: 'absolute',
                  top: 'var(--spacing-1)',
                  right: 'var(--spacing-1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 6px',
                  backgroundColor: 'rgba(214, 158, 46, 0.95)',
                  borderRadius: 'var(--radius-sm)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <Crown className="w-2.5 h-2.5" style={{ color: '#1A202C' }} />
                <span style={{ fontSize: '0.625rem', fontWeight: 'var(--font-weight-semibold)', color: '#1A202C' }}>
                  {property.badge}
                </span>
              </div>
            </div>

            {/* 
              PROPERTY DETAILS ROW 1: Address and Status
              
              REACT NATIVE CONVERSION:
              <View style={styles.detailsRow}>
                <View style={styles.addressSection}>...</View>
                <View style={styles.statusSection}>...</View>
              </View>
            */}
            <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-1)' }}>
              
              {/* 
                ADDRESS SECTION
                
                COMPONENTS:
                - Animated Building icon
                - Address text (primary)
                - City text with MapPin icon (secondary)
                
                DATA SOURCES:
                - property.address → From property database
                - property.city → From property database or geocoding
              */}
              <div className="flex items-start" style={{ gap: 'var(--spacing-1)' }}>
                {/* 
                  ANIMATED BUILDING ICON
                  REACT NATIVE: Use useAnimatedStyle with repeat/loop animation
                */}
                <motion.div
                  animate={{ 
                    y: [0, -2, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(214, 158, 46, 0.15)',
                    border: '1px solid rgba(214, 158, 46, 0.3)'
                  }}
                >
                  <Building className="w-3 h-3" style={{ color: 'rgb(var(--color-goldenrod))' }} />
                </motion.div>
                
                <div>
                  {/* 
                    ADDRESS TEXT
                    REACT NATIVE: <Text style={styles.addressText}>{property.address}</Text>
                  */}
                  <div style={{ color: 'var(--text-primary)', marginBottom: '2px', fontWeight: 'var(--font-weight-semibold)', fontSize: '0.875rem' }}>
                    {property.address}
                  </div>
                  
                  {/* 
                    CITY TEXT WITH ICON
                    REACT NATIVE:
                    <View style={styles.cityRow}>
                      <Icon name="map-pin" size={10} />
                      <Text style={styles.cityText}>{property.city}</Text>
                    </View>
                  */}
                  <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                    <MapPin className="w-2.5 h-2.5" style={{ color: 'var(--text-secondary)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                      {property.city}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 
                STATUS SECTION
                
                COMPONENTS:
                - Status badge with dynamic color
                - Chevron icon for navigation affordance
                
                DATA SOURCE: property.status
                VALUES: 'active' | 'inactive' | 'pending' | 'inspection_needed'
                
                STATUS COLOR LOGIC:
                - active → green (covered, up to date)
                - inactive → yellow/orange (needs attention)
                - pending → blue (processing)
                - inspection_needed → red (urgent)
              */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
                {/* 
                  STATUS BADGE
                  REACT NATIVE:
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(property.status) }]}>
                    <Text style={styles.statusText}>{property.status}</Text>
                  </View>
                */}
                <div 
                  style={{
                    backgroundColor: property.status === 'active' ? 'rgba(var(--color-success), 0.1)' : 'rgba(var(--color-warning), 0.1)',
                    color: property.status === 'active' ? 'rgb(var(--color-success))' : 'rgb(var(--color-warning))',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: '0.625rem',
                    padding: '2px 6px'
                  }}
                >
                  {property.status}
                </div>
                
                {/* 
                  CHEVRON ICON
                  REACT NATIVE: <Icon name="chevron-right" size={12} color={theme.colors.tertiary} />
                */}
                <ChevronRight className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
              </div>
            </div>
            
            {/* 
              PROPERTY DETAILS ROW 2: Value and Last Inspected
              
              REACT NATIVE CONVERSION:
              <View style={styles.detailsRow}>
                <View style={styles.valueSection}>...</View>
                <View style={styles.inspectionSection}>...</View>
              </View>
            */}
            <div className="flex items-center justify-between" style={{ gap: 'var(--spacing-3)' }}>
              
              {/* 
                VALUE SECTION
                
                DATA SOURCE: property.value
                FORMAT: Currently string ('$8.2M')
                
                BACKEND SHOULD PROVIDE:
                - value: number (actual value in dollars)
                - valueFormatted: string (pre-formatted for display)
                
                CLIENT-SIDE FORMATTING:
                const formatPropertyValue = (value: number) => {
                  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
                  return `$${value}`;
                };
              */}
              <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                <DollarSign className="w-3 h-3" style={{ color: 'rgb(var(--color-goldenrod))' }} />
                <span style={{ color: 'var(--text-primary)', fontSize: '0.8125rem', fontWeight: 'var(--font-weight-semibold)' }}>
                  {property.value}
                </span>
              </div>
              
              {/* 
                LAST INSPECTED SECTION
                
                DATA SOURCE: property.lastInspected
                FORMAT: Currently string ('2 days ago')
                
                BACKEND SHOULD PROVIDE:
                - lastInspectedAt: Date (ISO timestamp)
                
                CLIENT-SIDE FORMATTING:
                import { formatDistanceToNow } from 'date-fns';
                const lastInspected = formatDistanceToNow(new Date(property.lastInspectedAt), { addSuffix: true });
                
                DISPLAY LOGIC:
                - < 7 days: "X days ago"
                - < 30 days: "X weeks ago"
                - < 90 days: "X months ago"
                - > 90 days: Show warning/alert (inspection overdue)
              */}
              <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                <Calendar className="w-2.5 h-2.5" style={{ color: 'var(--text-secondary)' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.6875rem' }}>
                  {property.lastInspected}
                </span>
              </div>
            </div>
            
            {/* 
              ACCORDION FOLD INDICATORS (Decorative)
              
              PURPOSE: Visual effect to enhance accordion animation
              
              REACT NATIVE CONVERSION:
              - Keep for visual fidelity OR remove if performance is concern
              - Use LinearGradient for fold marks
              - Absolutely positioned View components
            */}
            {!isLast && (
              <>
                {/* Left fold mark */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 'var(--spacing-4)',
                    width: '20px',
                    height: '2px',
                    background: 'linear-gradient(90deg, rgba(var(--color-copa-blue), 0.3), transparent)',
                  }}
                />
                {/* Right fold mark */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    right: 'var(--spacing-4)',
                    width: '20px',
                    height: '2px',
                    background: 'linear-gradient(-90deg, rgba(var(--color-copa-blue), 0.3), transparent)',
                  }}
                />
                {/* Subtle shadow beneath fold to add depth */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '-3px',
                    left: '0',
                    right: '0',
                    height: '3px',
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.15), transparent)',
                    pointerEvents: 'none'
                  }}
                />
              </>
            )}
          </motion.button>
          );
        })}
      </motion.div>

      {/* 
        ADD PROPERTY BUTTON
        
        REACT NATIVE CONVERSION:
        <Pressable
          onPress={() => navigation.navigate('AddProperty')}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed
          ]}
        >
          <Icon name="plus" size={16} color={theme.colors.copaBlue} />
          <Text style={styles.addButtonText}>Add New Property</Text>
        </Pressable>
        
        FUNCTIONALITY:
        Currently: Shows toast message
        Should: Navigate to add property flow
        
        ADD PROPERTY FLOW:
        1. Address input (with autocomplete)
        2. Property type selection
        3. Upload photos
        4. Insurance information
        5. Confirmation
        
        API CALL: POST /api/properties/add
      */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => toast.info('Add property feature coming soon')}
        className="backdrop-blur-md"
        style={{
          width: '100%',
          padding: 'var(--spacing-4)',
          backgroundColor: 'rgba(var(--color-copa-blue), 0.1)',
          border: '1px dashed rgba(var(--color-copa-blue), 0.3)',
          borderRadius: 'var(--radius-lg)',
          color: 'rgb(var(--color-copa-blue))',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          cursor: 'pointer',
          transition: 'var(--transition-button)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-2)',
          boxShadow: 'var(--shadow-depth-sm)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Plus size={16} />
        Add New Property
      </motion.button>
    </div>
  );
}

/**
 * ==============================================================================
 * TESTING CHECKLIST FOR REACT NATIVE CONVERSION
 * ==============================================================================
 * 
 * FUNCTIONALITY:
 * □ Properties load from API successfully
 * □ Pull-to-refresh updates property list
 * □ Tapping property card navigates to details screen
 * □ Add property button opens add flow
 * □ Error states display properly
 * □ Loading states display properly
 * □ Empty state displays when no properties
 * 
 * STYLING:
 * □ Glassmorphism effects render correctly
 * □ Golden glow shadows display properly
 * □ Property images load and cache
 * □ Status badges display correct colors
 * □ Animations are smooth (60fps)
 * □ Layout adapts to different screen sizes
 * □ Safe area insets respected
 * 
 * PERFORMANCE:
 * □ FlatList renders efficiently (no lag)
 * □ Images load progressively
 * □ Animations don't block UI
 * □ Memory usage is acceptable
 * □ No memory leaks on unmount
 * 
 * ACCESSIBILITY:
 * □ All touchable elements have accessible labels
 * □ Screen reader announces property information
 * □ Sufficient color contrast
 * □ Touch targets are at least 44x44pts
 * 
 * ==============================================================================
 */
