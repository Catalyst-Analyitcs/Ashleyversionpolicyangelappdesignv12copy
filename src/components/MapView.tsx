/**
 * ==============================================================================
 * MAPVIEW.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Decorative animated map visualization with bouncing location pins,
 * floating clouds, sparkles, and rotating compass. Currently a stylized
 * illustration, not an actual interactive map.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * ✅ KEEP AS-IS (70% of styles): All Tailwind utility classes work!
 * ❌ CONVERT ONLY: Use react-native-maps for real maps
 * 
 * ```tsx
 * import MapView, { Marker } from 'react-native-maps';
 * 
 * <MapView
 *   className="flex-1 rounded-xl overflow-hidden"
 *   initialRegion={{
 *     latitude: 37.7749,
 *     longitude: -122.4194,
 *     latitudeDelta: 0.0922,
 *     longitudeDelta: 0.0421,
 *   }}
 * >
 *   {properties.map((prop) => (
 *     <Marker key={prop.id} coordinate={prop.location} className="w-8 h-8" />
 *   ))}
 * </MapView>
 * ```
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION OPTIONS
 * ==============================================================================
 * 
 * OPTION 1: CONVERT TO REAL MAP (RECOMMENDED for production)
 * Use react-native-maps for actual interactive maps:
 * 
 * import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
 * 
 * export function MapView({ propertyLocation, properties }) {
 *   return (
 *     <MapView
 *       style={styles.map}
 *       provider={PROVIDER_GOOGLE}
 *       initialRegion={{
 *         latitude: 37.7749, // San Francisco
 *         longitude: -122.4194,
 *         latitudeDelta: 0.0922,
 *         longitudeDelta: 0.0421,
 *       }}
 *     >
 *       {properties.map(property => (
 *         <Marker
 *           key={property.id}
 *           coordinate={{
 *             latitude: property.coordinates.latitude,
 *             longitude: property.coordinates.longitude,
 *           }}
 *           title={property.address}
 *           description={property.type}
 *         >
 *           <CustomMarker property={property} />
 *         </Marker>
 *       ))}
 *     </MapView>
 *   );
 * }
 * 
 * SETUP REQUIRED:
 * 1. npm install react-native-maps
 * 2. Get Google Maps API keys (iOS + Android)
 * 3. Configure in app.json (Expo) or native files
 * 4. Add permissions for location access
 * 
 * Expo Configuration (app.json):
 * {
 *   "expo": {
 *     "ios": {
 *       "config": {
 *         "googleMapsApiKey": "YOUR_IOS_API_KEY"
 *       }
 *     },
 *     "android": {
 *       "config": {
 *         "googleMaps": {
 *           "apiKey": "YOUR_ANDROID_API_KEY"
 *         }
 *       }
 *     }
 *   }
 * }
 * 
 * OPTION 2: KEEP AS DECORATIVE (simpler)
 * Convert current animated illustration to React Native:
 * 
 * import { View } from 'react-native';
 * import Animated, { 
 *   useAnimatedStyle, 
 *   useSharedValue,
 *   withRepeat,
 *   withTiming,
 *   withSpring 
 * } from 'react-native-reanimated';
 * import LinearGradient from 'expo-linear-gradient';
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * export function MapView({ onPress }) {
 *   return (
 *     <TouchableOpacity onPress={onPress} style={styles.container}>
 *       <LinearGradient
 *         colors={[
 *           'rgba(167, 139, 250, 0.25)',
 *           'rgba(244, 114, 182, 0.2)',
 *           'rgba(251, 207, 232, 0.25)',
 *         ]}
 *         start={{ x: 0, y: 0 }}
 *         end={{ x: 1, y: 1 }}
 *         style={styles.gradient}
 *       >
 *         {/* Animated pins, clouds, compass *\/}
 *       </LinearGradient>
 *     </TouchableOpacity>
 *   );
 * }
 * 
 * ==============================================================================
 * CONVERSION REQUIREMENTS (IF KEEPING DECORATIVE)
 * ==============================================================================
 * 
 * 1. GRADIENTS:
 *    - CSS linear-gradient → expo-linear-gradient
 *    - radial-gradient → Not natively supported, use SVG or library
 * 
 * 2. ANIMATIONS:
 *    - Framer Motion → React Native Reanimated
 *    - Bouncing pins: useAnimatedStyle + withRepeat + withSpring
 *    - Floating clouds: translateX animation
 *    - Rotating compass: rotate animation
 *    - Sparkles: opacity + scale + rotate
 * 
 * 3. ICONS:
 *    - lucide-react → react-native-vector-icons
 *    - MapPin → Ionicons 'location'
 *    - Navigation → Ionicons 'compass'
 *    - Sparkles → Ionicons 'sparkles'
 * 
 * 4. TOUCH:
 *    - onClick → onPress
 *    - onMouseEnter/Leave → Not available (mobile doesn't have hover)
 *    - Use TouchableOpacity or Pressable
 * 
 * 5. POSITIONING:
 *    - Absolute positioning works same way
 *    - Use StyleSheet for styles
 * 
 * ==============================================================================
 * REACT NATIVE MAPS - ADVANCED FEATURES
 * ==============================================================================
 * 
 * If implementing real maps:
 * 
 * 1. CUSTOM MARKERS:
 *    <Marker coordinate={coords}>
 *      <View style={styles.customMarker}>
 *        <Image source={propertyImage} />
 *      </View>
 *    </Marker>
 * 
 * 2. MARKER CLUSTERING:
 *    Use react-native-map-clustering for many properties
 * 
 * 3. POLYLINES (for routes):
 *    <Polyline
 *      coordinates={[coord1, coord2, coord3]}
 *      strokeColor="#FF0000"
 *      strokeWidth={2}
 *    />
 * 
 * 4. CIRCLES (for zones/radius):
 *    <Circle
 *      center={coords}
 *      radius={1000} // meters
 *      fillColor="rgba(255,0,0,0.2)"
 *    />
 * 
 * 5. HEATMAPS:
 *    Use react-native-maps-heatmap for risk zones
 * 
 * 6. LOCATION TRACKING:
 *    import * as Location from 'expo-location';
 *    
 *    const location = await Location.getCurrentPositionAsync({});
 *    const { latitude, longitude } = location.coords;
 * 
 * ==============================================================================
 * BACKEND API INTEGRATION
 * ==============================================================================
 * 
 * If implementing real maps, need:
 * 
 * 1. Property Location Data:
 *    GET /api/properties/locations?bounds={ne_lat},{ne_lng},{sw_lat},{sw_lng}
 *    Returns: Properties within map bounds
 *    Response: [{
 *      id: string,
 *      coordinates: { latitude: number, longitude: number },
 *      address: string,
 *      type: string,
 *      status: string,
 *      thumbnail: string
 *    }]
 * 
 * 2. Risk Zones:
 *    GET /api/maps/risk-zones?location={location}&type={fire|flood|earthquake}
 *    Returns: Risk overlay data
 * 
 * 3. Nearby Services:
 *    GET /api/maps/nearby?lat={lat}&lng={lng}&type={type}&radius={radius}
 *    Returns: Nearby agents, contractors, services
 * 
 * ==============================================================================
 * PERMISSIONS REQUIRED
 * ==============================================================================
 * 
 * For location access:
 * 
 * import * as Location from 'expo-location';
 * 
 * const { status } = await Location.requestForegroundPermissionsAsync();
 * if (status !== 'granted') {
 *   // Show permission denied message
 *   return;
 * }
 * 
 * Add to app.json:
 * {
 *   "expo": {
 *     "plugins": [
 *       [
 *         "expo-location",
 *         {
 *           "locationAlwaysAndWhenInUsePermission": "Allow PolicyAngel to use your location for property mapping."
 *         }
 *       ]
 *     ]
 *   }
 * }
 * 
 * ==============================================================================
 * ANIMATION EXAMPLE (DECORATIVE VERSION)
 * ==============================================================================
 * 
 * // Bouncing Pin
 * const translateY = useSharedValue(0);
 * 
 * useEffect(() => {
 *   translateY.value = withRepeat(
 *     withSpring(-15, { damping: 2, stiffness: 100 }),
 *     -1,
 *     true
 *   );
 * }, []);
 * 
 * const animatedPin = useAnimatedStyle(() => ({
 *   transform: [{ translateY: translateY.value }]
 * }));
 * 
 * // Rotating Compass
 * const rotation = useSharedValue(0);
 * 
 * useEffect(() => {
 *   rotation.value = withRepeat(
 *     withTiming(360, { duration: 12000, easing: Easing.linear }),
 *     -1
 *   );
 * }, []);
 * 
 * const animatedCompass = useAnimatedStyle(() => ({
 *   transform: [{ rotate: `${rotation.value}deg` }]
 * }));
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * DECORATIVE VERSION:
 * - [ ] Map background renders
 * - [ ] Pins animate with bounce
 * - [ ] Clouds float across
 * - [ ] Sparkles appear and disappear
 * - [ ] Compass rotates smoothly
 * - [ ] Tap triggers onPress callback
 * - [ ] Animations are smooth (60 FPS)
 * 
 * REAL MAP VERSION:
 * - [ ] Map loads with San Francisco center
 * - [ ] Property markers appear at correct locations
 * - [ ] Tapping marker shows property details
 * - [ ] Map can be panned and zoomed
 * - [ ] Current location shows user position
 * - [ ] Markers cluster when zoomed out
 * - [ ] Custom markers display property images
 * - [ ] Works on both iOS and Android
 * - [ ] API keys are configured correctly
 * - [ ] Location permissions requested
 * - [ ] Offline map tiles cached (optional)
 * 
 */

import { MapPin, Navigation, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface MapViewProps {
  onClick?: () => void;
}

export function MapView({ onClick }: MapViewProps = {}) {
  const locations = [
    { x: '30%', y: '35%', delay: 0.1, color: 'rgba(167, 139, 250, 1)' }, // Soft purple
    { x: '65%', y: '28%', delay: 0.2, color: 'rgba(244, 114, 182, 1)' }, // Soft pink
    { x: '48%', y: '60%', delay: 0.3, color: 'rgba(96, 165, 250, 1)' },  // Soft blue
  ];

  const clouds = [
    { x: '15%', y: '20%', size: 40, delay: 0 },
    { x: '75%', y: '15%', size: 50, delay: 1.5 },
    { x: '55%', y: '75%', size: 35, delay: 3 },
  ];

  const sparkles = [
    { x: '20%', y: '45%', delay: 0.5 },
    { x: '80%', y: '55%', delay: 1.2 },
    { x: '45%', y: '25%', delay: 2 },
  ];

  return (
    <div 
      className="w-full overflow-hidden relative" 
      onClick={onClick}
      style={{ 
        height: '100%',
        backgroundColor: 'var(--card-bg)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'scale(1.005)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      {/* Soft Pastel Gradient Background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.25) 0%, rgba(244, 114, 182, 0.2) 40%, rgba(251, 207, 232, 0.25) 70%, rgba(196, 181, 253, 0.2) 100%)',
        }}
      />

      {/* Dotted Pattern Overlay (Cuter than grid) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '25px 25px',
          opacity: 0.4,
        }}
      />

      {/* Cute Floating Clouds */}
      {clouds.map((cloud, index) => (
        <motion.div
          key={`cloud-${index}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: 1,
            x: [0, 15, 0],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: cloud.delay },
            scale: { duration: 0.6, delay: cloud.delay * 0.3 },
          }}
          style={{
            position: 'absolute',
            left: cloud.x,
            top: cloud.y,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: `
              ${cloud.size * 0.4}px 0 0 rgba(255, 255, 255, 0.3),
              ${cloud.size * 0.7}px 0 0 rgba(255, 255, 255, 0.25),
              ${cloud.size * 0.2}px ${cloud.size * -0.2}px 0 rgba(255, 255, 255, 0.25)
            `,
          }}
        />
      ))}

      {/* Sparkle Effects */}
      {sparkles.map((sparkle, index) => (
        <motion.div
          key={`sparkle-${index}`}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: 180,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sparkle.delay,
          }}
          style={{
            position: 'absolute',
            left: sparkle.x,
            top: sparkle.y,
          }}
        >
          <Sparkles
            style={{
              width: '16px',
              height: '16px',
              color: 'rgba(251, 207, 232, 0.8)',
              filter: 'drop-shadow(0 0 4px rgba(251, 207, 232, 0.6))',
            }}
          />
        </motion.div>
      ))}

      {/* Super Bouncy Location Pins with Cute Bubbles */}
      {locations.map((location, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -30, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: location.delay,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          style={{
            position: 'absolute',
            left: location.x,
            top: location.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {/* Bubble Pulse Effect */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: location.delay,
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: location.color.replace('1)', '0.3)'),
              zIndex: 0,
            }}
          />
          
          {/* Cute Pin with Exaggerated Bounce */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: location.delay,
            }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div
              style={{
                backgroundColor: location.color,
                padding: 'var(--spacing-2)',
                borderRadius: 'var(--radius-full)',
                boxShadow: `0 6px 20px ${location.color.replace('1)', '0.5)')}, 0 2px 8px ${location.color.replace('1)', '0.3)')}`,
                border: '3px solid rgba(255, 255, 255, 0.8)',
              }}
            >
              <MapPin
                style={{
                  width: '20px',
                  height: '20px',
                  color: 'white',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Cute Compass Bubble - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 12,
        }}
        style={{
          position: 'absolute',
          bottom: 'var(--spacing-4)',
          right: 'var(--spacing-4)',
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '4px solid rgba(244, 114, 182, 0.4)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(244, 114, 182, 0.3), 0 4px 12px rgba(167, 139, 250, 0.2)',
        }}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Navigation
            style={{
              width: '24px',
              height: '24px',
              color: 'rgba(244, 114, 182, 1)',
              filter: 'drop-shadow(0 2px 4px rgba(244, 114, 182, 0.3))',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Soft Multi-Color Glow Effect */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, rgba(244, 114, 182, 0.15) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}