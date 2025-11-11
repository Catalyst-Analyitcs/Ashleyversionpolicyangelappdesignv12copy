/**
 * ==============================================================================
 * LUXURYDASHBOARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Main dashboard/home screen for PolicyAngel app. Displays featured
 * property, quick actions, weather alerts, upcoming events, property status
 * metrics, and recent activity feed in a scrollable luxury-themed interface.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. ANIMATION LIBRARY CHANGES:
 *    - CURRENT: motion/react (Framer Motion for web)
 *    - REACT NATIVE: react-native-reanimated v3
 *    - Replace motion.div with Animated.View
 *    - Replace motion.button with TouchableOpacity/Pressable
 *    - Convert animations to useAnimatedStyle, withTiming, withSpring, withRepeat
 * 
 * 2. SCROLL COMPONENTS:
 *    - Root container → ScrollView with showsVerticalScrollIndicator={false}
 *    - Horizontal carousels → FlatList with horizontal={true}
 *    - Add onScroll handlers for scroll tracking
 *    - Use scrollEventThrottle for performance
 * 
 * 3. LAYOUT COMPONENTS:
 *    - div → View
 *    - button → TouchableOpacity or Pressable
 *    - h1, h2, h3, p, span → Text
 *    - Remove all className props
 * 
 * 4. IMAGE HANDLING:
 *    - ImageWithFallback → FastImage for better performance and caching
 *    - Add placeholder loading states
 *    - Implement progressive image loading
 * 
 * 5. GLASSMORPHISM & BLUR:
 *    - backdrop-blur → BlurView from @react-native-community/blur
 *    - Combine with transparent backgrounds for glass effect
 *    - May need to use absolute positioning for layered blur effects
 * 
 * 6. GRADIENT OVERLAYS:
 *    - background: linear-gradient → LinearGradient from expo-linear-gradient
 *    - Support for radial gradients limited (use creative alternatives)
 * 
 * 7. ICON LIBRARY:
 *    - lucide-react → react-native-vector-icons or @expo/vector-icons
 *    - Or use react-native-svg for custom SVG icons
 * 
 * 8. 3D TRANSFORMS:
 *    - perspective, rotateY, rotateX → Limited support in React Native
 *    - May need to simplify 3D carousel to 2D with depth effects
 *    - Use transform: [{ perspective }, { rotateY: '45deg' }] syntax
 * 
 * 9. SAFE AREA HANDLING:
 *    - Wrap in SafeAreaView for device notches and home indicators
 *    - Use useSafeAreaInsets hook for custom padding
 * 
 * ==============================================================================
 * MOCK DATA POINTS - NEEDS REAL API CONNECTIONS
 * ==============================================================================
 * 
 * DATA SOURCES IN THIS COMPONENT:
 * 
 * 1. PROPERTY CONTEXT (lines 44, 421-506)
 *    Source: useProperty() hook from PropertyContext
 *    
 *    REQUIRED API: GET /api/properties/:propertyId
 *    
 *    RESPONSE SHAPE:
 *    {
 *      id: string,
 *      address: string,               // "1234 Valencia Street"
 *      city: string,                  // "San Francisco"
 *      state: string,                 // "CA"
 *      zip: string,                   // "94110"
 *      propertyType: string,          // "Victorian", "Condo", etc.
 *      estimatedValue: string,        // "$2.4M" (formatted)
 *      bedrooms: number,              // 3
 *      bathrooms: number,             // 2
 *      squareFeet: number,            // 2400
 *      protectionScore: number,       // 0-100 (insurance/protection rating)
 *      coordinates: {
 *        latitude: number,            // 37.7749
 *        longitude: number            // -122.4194
 *      },
 *      insurance: {
 *        carrier: string,             // "State Farm"
 *        policyNumber: string,
 *        coverageAmount: number,      // 1500000 (in dollars)
 *        expirationDate: Date
 *      },
 *      recentActivities: Array<{
 *        id: string,
 *        type: 'success' | 'warning' | 'info',
 *        title: string,
 *        description: string,
 *        time: string,                // Relative time "2 hours ago"
 *        timestamp: Date,             // ISO timestamp for sorting
 *        actionUrl?: string           // Optional link to details
 *      }>,
 *      upcomingEvents: Array<{
 *        id: string,
 *        title: string,
 *        date: string,                // "Nov 22" (formatted)
 *        time: string,                // "2:00 PM"
 *        type: 'inspection' | 'meeting' | 'maintenance' | 'renewal',
 *        timestamp: Date,             // ISO timestamp for filtering
 *        location?: string,
 *        notes?: string
 *      }>
 *    }
 * 
 * 2. QUICK ACTION CARDS (lines 240-274)
 *    Currently: Hard-coded array
 *    
 *    SHOULD COME FROM: GET /api/user/action-items
 *    
 *    PURPOSE: Personalized action items based on:
 *    - Upcoming deadlines (policy renewal, inspection due)
 *    - Available grants/programs matching property
 *    - Community alerts in neighborhood
 *    - Pending tasks requiring user action
 *    
 *    RESPONSE SHAPE:
 *    {
 *      actionItems: Array<{
 *        id: string,
 *        priority: 'high' | 'medium' | 'low',
 *        category: 'grant' | 'calendar' | 'community' | 'document' | 'alert',
 *        title: string,
 *        subtitle: string,
 *        detail: string,
 *        image: string,               // URL to relevant image
 *        badgeText?: string,          // "NEW", "URGENT", "TODAY"
 *        badgeColor?: string,
 *        actionUrl: string,           // Navigation destination
 *        createdAt: Date,
 *        expiresAt?: Date             // For time-sensitive items
 *      }>
 *    }
 * 
 * 3. WEATHER ALERT (lines 100-106)
 *    Currently: Hard-coded mock data
 *    
 *    REQUIRED API: GET /api/weather/alerts?lat={lat}&lng={lng}
 *    
 *    INTEGRATION: Weather.gov API, OpenWeather API, or similar
 *    
 *    RESPONSE SHAPE:
 *    {
 *      alerts: Array<{
 *        id: string,
 *        severity: 'severe' | 'moderate' | 'minor',
 *        type: 'storm' | 'flood' | 'fire' | 'wind' | 'heat' | 'cold',
 *        title: string,
 *        message: string,             // Full alert message
 *        startTime: Date,
 *        endTime: Date,
 *        affectedAreas: string[],
 *        recommendations: string[]
 *      }>,
 *      currentConditions: {
 *        temperature: number,
 *        condition: string,           // "Rainy", "Sunny", etc.
 *        windSpeed: number,
 *        humidity: number,
 *        precipitation: number
 *      }
 *    }
 * 
 * 4. PROPERTY STATUS METRICS (lines 726-866)
 *    Currently: Hard-coded values
 *    
 *    SHOULD COME FROM: Property API response (part of GET /api/properties/:id)
 *    
 *    METRICS TO TRACK:
 *    - protectionScore: Calculated from coverage adequacy, inspection recency, claim history
 *    - coverageAmount: From insurance policy
 *    - lastInspectionDays: Days since last drone inspection
 *    
 *    CALCULATION LOGIC (Backend):
 *    protectionScore = weighted average of:
 *      - Coverage adequacy (30%): coverage / estimated value
 *      - Inspection recency (40%): 100 - (days since inspection * 2)
 *      - Claim history (20%): No recent claims = 100
 *      - Maintenance status (10%): Up to date = 100
 * 
 * 5. RECENT ACTIVITY CARDS (lines 122-155)
 *    Currently: Transforming selectedProperty.recentActivities with hard-coded images
 *    
 *    IMAGES SHOULD COME FROM:
 *    - Drone inspection: Actual captured images from drone database
 *    - Documents: Thumbnails of uploaded documents
 *    - Reports: Generated report preview images
 *    
 *    API: GET /api/activities?propertyId={id}&limit=4
 *    
 *    RESPONSE SHAPE:
 *    {
 *      activities: Array<{
 *        id: string,
 *        type: 'inspection' | 'claim' | 'maintenance' | 'valuation' | 'document',
 *        title: string,
 *        description: string,
 *        timestamp: Date,
 *        imageUrl?: string,           // Actual activity-related image
 *        thumbnailUrl?: string,       // Optimized thumbnail
 *        badge: {
 *          text: string,
 *          color: string
 *        },
 *        actionable: boolean,
 *        actionUrl?: string
 *      }>
 *    }
 * 
 * ==============================================================================
 * STATE MANAGEMENT NEEDED
 * ==============================================================================
 * 
 * CURRENT STATE:
 * - activeIndex: Quick actions carousel tracking
 * - activityIndex: Recent activity carousel tracking
 * - eventsIndex: Upcoming events carousel tracking
 * - isEventsHovered: Pause auto-rotation on hover
 * - hasSevereWeather: Weather alert visibility
 * - weatherAlert: Alert data
 * 
 * REQUIRED STATE (React Native):
 * - property: Property (from API)
 * - quickActions: QuickAction[] (from API)
 * - weatherAlerts: WeatherAlert[] (from API)
 * - activities: Activity[] (from API)
 * - loading: boolean
 * - refreshing: boolean (for pull-to-refresh)
 * - error: Error | null
 * 
 * RECOMMENDED APPROACH:
 * - React Query for data fetching and caching
 * - Context API for global property state
 * - useRef for scroll position tracking
 * - Animated.Value for animation state
 * 
 * ==============================================================================
 * COMPONENT BREAKDOWN
 * ==============================================================================
 */

import { motion } from "motion/react";
import { 
  Play, FileText, Calendar, MapPin, Bell, Camera, Banknote, Share2,
  CloudRain, ThermometerSun, Wind, Droplets, Shield, TrendingUp,
  Clock, CheckCircle2, AlertTriangle, Home, ChevronRight, Users
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CompactQuickActionCard } from "./CompactQuickActionCard";
import { WeatherAlertBanner } from "./WeatherAlertBanner";
import { useRef, useState, useEffect } from "react";
import { useProperty } from "../utils/PropertyContext";

/**
 * ==============================================================================
 * PROPS INTERFACE
 * ==============================================================================
 * 
 * CURRENT: Navigation callbacks for each screen
 * 
 * REACT NATIVE REPLACEMENT:
 * Replace all navigation callbacks with React Navigation:
 * 
 * interface LuxuryDashboardProps {
 *   navigation: NavigationProp<RootStackParamList>;
 *   route: RouteProp<RootStackParamList, 'Dashboard'>;
 * }
 * 
 * Then use:
 * navigation.navigate('PropertyDetails', { propertyId: '...' })
 * instead of onNavigateToProperty()
 */
interface LuxuryDashboardProps {
  onNavigateToProperty: () => void;
  onNavigateToPolicy: () => void;
  onNavigateToDocuments: () => void;
  onNavigateToCalendar: () => void;
  onNavigateToGrants: () => void;
  onNavigateToAlerts?: () => void;
  onNavigateToGallery?: () => void;
  onNavigateToReports?: () => void;
  onNavigateToWorkflows?: () => void;
  onNavigateToWeather?: () => void;
  onNavigateToInsights?: () => void;
  onNavigateToCommunity?: () => void;
}

/**
 * ==============================================================================
 * MAIN COMPONENT: LuxuryDashboard
 * ==============================================================================
 * 
 * LAYOUT HIERARCHY:
 * 
 * ScrollView (root)
 *   ├─ Hero Section (featured property with map background)
 *   │   ├─ Background Image (satellite map)
 *   │   ├─ Gradient Overlay
 *   │   └─ Content (address, stats, CTA button)
 *   │
 *   ├─ Weather Alert Banner (conditional)
 *   │
 *   ├─ Quick Actions Carousel (horizontal scroll)
 *   │   └─ CompactQuickActionCard (x3)
 *   │
 *   ├─ Property Status Metrics (3-column grid)
 *   │   ├─ Protection Score
 *   │   ├─ Coverage Amount
 *   │   └─ Last Inspection
 *   │
 *   ├─ Weather & Alerts Card (clickable)
 *   │
 *   ├─ Upcoming Events (3D circular carousel)
 *   │   └─ Event Cards
 *   │
 *   ├─ Recent Activity (horizontal scroll)
 *   │   └─ Activity Cards
 *   │
 *   └─ Footer (location badge)
 * 
 * REACT NATIVE CONVERSION:
 * 
 * <SafeAreaView style={styles.safeArea}>
 *   <ScrollView
 *     showsVerticalScrollIndicator={false}
 *     refreshControl={
 *       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
 *     }
 *     contentContainerStyle={styles.scrollContent}
 *   >
 *     ... content ...
 *   </ScrollView>
 * </SafeAreaView>
 */
export function LuxuryDashboard({
  onNavigateToProperty,
  onNavigateToPolicy,
  onNavigateToDocuments,
  onNavigateToCalendar,
  onNavigateToGrants,
  onNavigateToAlerts,
  onNavigateToGallery,
  onNavigateToReports,
  onNavigateToWorkflows,
  onNavigateToWeather,
  onNavigateToInsights,
  onNavigateToCommunity,
}: LuxuryDashboardProps) {
  
  /**
   * ============================================================================
   * PROPERTY DATA FROM CONTEXT
   * ============================================================================
   * 
   * CURRENT: useProperty() hook from PropertyContext
   * 
   * REACT NATIVE:
   * const { data: selectedProperty, isLoading } = useQuery({
   *   queryKey: ['property', propertyId],
   *   queryFn: () => fetchProperty(propertyId)
   * });
   * 
   * MOCK DATA: Currently from PropertyContext (hardcoded)
   * REAL DATA: Should fetch from GET /api/properties/:propertyId
   */
  const { selectedProperty } = useProperty();
  
  /* 
    ═══════════════════════════════════════════════════════════════════════════
    REORGANIZED LUXURY DASHBOARD - ENHANCED MAP PROMINENCE & FLOW
    ═══════════════════════════════════════════════════════════════════════════
    
    LAYOUT STRUCTURE:
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ 1. HERO SECTION - Featured Property (420px - ENLARGED)                  │
    │    • Satellite map background with gradient overlay                     │
    │    • Property details & stats                                           │
    │    • Primary CTA: "View Policy"                                         │
    │    • Enhanced height for better map visibility                          │
    ├─────────────────────────────────────────────────────────────────────────┤
    │ 2. QUICK ACTIONS - Swipeable Carousel (Direct from Map)                 │
    │    • 6 premium action cards with animations                             │
    │    • Positioned directly after hero for immediate access                │
    │    • Vertical swipe: navigate | Horizontal swipe: dismiss               │
    ├─────────────────────────────────────────────────────────────────────────┤
    │ 3. UPCOMING EVENTS - Next 2 Calendar Items                              │
    │    • Light, non-intrusive content after quick actions                   │
    │    • Gentle transition from map aesthetic                               │
    │    • Time-sensitive inspections, appointments                           │
    ├─────────────────────────────────────────────────────────────────────────┤
    │ 4. PROPERTY STATUS - Key Metrics (3-Column Grid)                        │
    │    • Visual metrics with icons                                          │
    │    • Protection score, Coverage, Last inspection                        │
    ├─────────────────────────────────────────────────────────────────────────┤
    │ 5. WEATHER & ALERTS - Critical Information                              │
    │    • Live weather conditions                                            │
    │    • Active alerts with severity indicators                             │
    │    • Positioned for prominence without disrupting map transition        │
    ├─────────────────────────────────────────────────────────────────────────┤
    │ 6. RECENT ACTIVITY - Latest Updates                                     │
    │    • Document uploads                                                   │
    │    • Inspection reports                                                 │
    │    • Grant applications                                                 │
    ├─────────────────────────────────────────────────────────────────────────┤
    │ 7. FOOTER - Location Badge                                              │
    └─────────────────────────────────────────────────────────────────────────┘
  */
  
  /**
   * ============================================================================
   * SCROLL TRACKING - QUICK ACTIONS CAROUSEL
   * ============================================================================
   * 
   * PURPOSE: Track which card is centered in horizontal scroll
   * 
   * REACT NATIVE CONVERSION:
   * Use onScroll with Animated.event:
   * 
   * const scrollX = useRef(new Animated.Value(0)).current;
   * 
   * <FlatList
   *   horizontal
   *   data={quickActionCards}
   *   onScroll={Animated.event(
   *     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
   *     { useNativeDriver: true }
   *   )}
   *   snapToInterval={cardWidth + gap}
   *   decelerationRate="fast"
   * />
   */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1); // Start with middle card active
  
  /**
   * ============================================================================
   * DRAG-CONTROLLED RECENT ACTIVITY CAROUSEL
   * ============================================================================
   * 
   * REACT NATIVE CONVERSION:
   * Replace with FlatList horizontal scroll with snap points
   * Use onMomentumScrollEnd to track current index
   */
  const activityScrollRef = useRef<HTMLDivElement>(null);
  const [activityIndex, setActivityIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  
  /**
   * ============================================================================
   * AUTO-SLIDE CIRCULAR CAROUSEL - UPCOMING EVENTS
   * ============================================================================
   * 
   * PURPOSE: Auto-rotate through upcoming events in 3D circular carousel
   * 
   * REACT NATIVE CONSIDERATIONS:
   * - 3D rotateY may have limited support
   * - Consider simplifying to 2D carousel with depth effects
   * - Use Animated.timing with loop for auto-rotation
   * - Pause on user interaction
   * 
   * ALTERNATIVE APPROACH:
   * Use react-native-reanimated-carousel library for better performance
   */
  const [eventsIndex, setEventsIndex] = useState(0);
  const [isEventsHovered, setIsEventsHovered] = useState(false);
  
  /**
   * ============================================================================
   * WEATHER ALERT STATE
   * ============================================================================
   * 
   * MOCK DATA: Hard-coded severe weather alert
   * 
   * REAL DATA SOURCE: GET /api/weather/alerts?lat={lat}&lng={lng}
   * 
   * INTEGRATION OPTIONS:
   * - Weather.gov API (US only, free)
   * - OpenWeatherMap API (global, paid tiers)
   * - WeatherAPI.com (free tier available)
   * 
   * UPDATE FREQUENCY:
   * - Check for alerts every 15 minutes
   * - Push notifications for severe alerts
   * - Cache responses to reduce API calls
   */
  const [hasSevereWeather] = useState(true);
  const [weatherAlert] = useState({
    message: 'SEVERE WEATHER ALERT - Heavy storm system approaching San Francisco Bay Area - Winds up to 60mph expected - Secure outdoor property immediately',
    severity: 'severe' as const,
  });
  
  /**
   * ============================================================================
   * HELPER FUNCTIONS - ACTIVITY ICONS & COLORS
   * ============================================================================
   * 
   * PURPOSE: Map activity types to visual indicators
   * 
   * REACT NATIVE: Use switch statement with icon components
   */
  const getActivityIcon = (type: string) => {
    if (type === 'success') return CheckCircle2;
    if (type === 'warning') return AlertTriangle;
    return TrendingUp;
  };
  
  const getActivityColor = (type: string) => {
    if (type === 'success') return 'rgb(34, 197, 94)';
    if (type === 'warning') return 'rgb(251, 191, 36)';
    return 'rgb(59, 130, 246)';
  };
  
  /**
   * ============================================================================
   * HERO ACTIVITY CARDS
   * ============================================================================
   * 
   * MOCK DATA: Transform activities into hero cards with placeholder images
   * 
   * REAL DATA REQUIREMENTS:
   * - Actual drone inspection images from database
   * - Document thumbnails
   * - Generated report preview images
   * 
   * API: GET /api/activities?propertyId={id}&limit=4
   * 
   * IMAGE OPTIMIZATION:
   * - Store full images in S3/CloudFront
   * - Generate thumbnails on upload (150x150, 300x300)
   * - Use CDN for fast delivery
   * - Implement lazy loading
   * 
   * CURRENT ISSUE: Using generic Unsplash images
   * SOLUTION: Replace with real property-specific images from backend
   */
  const heroActivityCards = [
    {
      title: "Drone Inspection Complete",
      description: "Full property aerial assessment completed with 4K imaging and thermal analysis",
      image: "https://images.unsplash.com/photo-1575686467550-7d2a658eb1cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHByb3BlcnR5JTIwaW5zcGVjdGlvbnxlbnwxfHx8fDE3NjI0MTQ0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: selectedProperty.recentActivities[0]?.time || "2 hours ago",
      badge: "New Report",
      badgeColor: "rgb(var(--color-goldenrod))",
    },
    {
      title: "Storm Damage Assessment",
      description: "AI-powered analysis identified minor roof damage. Claim filed with insurance provider",
      image: "https://images.unsplash.com/photo-1762291335053-e0c0854bb68e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBjbGFpbSUyMGRhbWFnZXxlbnwxfHx8fDE3NjI0MTQ0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: selectedProperty.recentActivities[1]?.time || "Yesterday",
      badge: "Action Required",
      badgeColor: "rgb(251, 191, 36)",
    },
    {
      title: "Maintenance Completed",
      description: "Seasonal property maintenance and winterization services completed successfully",
      image: "https://images.unsplash.com/photo-1608752503578-52f35965e3d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwbWFpbnRlbmFuY2UlMjByZXBhaXJ8ZW58MXx8fHwxNzYyMzUxODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: selectedProperty.recentActivities[2]?.time || "3 days ago",
      badge: "Completed",
      badgeColor: "rgb(34, 197, 94)",
    },
    {
      title: "Property Value Update",
      description: "Market analysis shows 8.2% increase in property value based on Bay Area trends",
      image: "https://images.unsplash.com/photo-1626538366749-021838b63901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMGFzc2Vzc21lbnR8ZW58MXx8fHwxNzYyNDE0NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: selectedProperty.recentActivities[3]?.time || "1 week ago",
      badge: "Insight",
      badgeColor: "rgb(59, 130, 246)",
    },
  ];
  
  /**
   * ============================================================================
   * EVENT COLOR HELPER
   * ============================================================================
   * 
   * PURPOSE: Assign colors to calendar events for visual variety
   * 
   * REACT NATIVE: Move to theme configuration or utils
   */
  const getEventColor = (index: number) => {
    const colors = [
      { bg: 'rgba(59, 130, 246, 0.15)', text: 'rgb(59, 130, 246)' }, // Blue
      { bg: 'rgba(34, 197, 94, 0.15)', text: 'rgb(34, 197, 94)' }, // Green
      { bg: 'rgba(168, 85, 247, 0.15)', text: 'rgb(168, 85, 247)' }, // Purple
      { bg: 'rgba(251, 191, 36, 0.15)', text: 'rgb(251, 191, 36)' }, // Yellow
      { bg: 'rgba(239, 68, 68, 0.15)', text: 'rgb(239, 68, 68)' }, // Red
    ];
    return colors[index % colors.length];
  };
  
  /**
   * ============================================================================
   * UPCOMING EVENTS FILTERING
   * ============================================================================
   * 
   * PURPOSE: Filter events to only show those within next 3 months
   * 
   * CURRENT IMPLEMENTATION: Client-side filtering with date parsing
   * 
   * BETTER APPROACH (Backend):
   * GET /api/events?propertyId={id}&startDate={today}&endDate={3MonthsFromNow}
   * 
   * Let backend handle date filtering for better performance
   * 
   * REACT NATIVE:
   * Use date-fns or dayjs for date manipulation
   * import { addMonths, isWithinInterval, parseISO } from 'date-fns';
   */
  const allUpcomingEvents = selectedProperty.upcomingEvents;
  
  // Filter events to only show those within the next 3 months
  const upcomingEvents = allUpcomingEvents.filter(event => {
    // Parse the date string (e.g., "Nov 22" or "Dec 5")
    const [monthStr, dayStr] = event.date.split(' ');
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const month = monthMap[monthStr];
    const day = parseInt(dayStr);
    
    // Today's date (November 6, 2025)
    const today = new Date(2025, 10, 6); // Month is 0-indexed, so 10 = November
    
    // Calculate 3 months from today
    const threeMonthsFromNow = new Date(today);
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    
    // Construct the event date - assume it's in current year, unless it's in the past, then next year
    let eventYear = 2025;
    const eventDate = new Date(eventYear, month, day);
    
    // If the event date is in the past (before today), assume it's next year
    if (eventDate < today) {
      eventYear = 2026;
      eventDate.setFullYear(eventYear);
    }
    
    // Return true if event is within the next 3 months
    return eventDate >= today && eventDate <= threeMonthsFromNow;
  });
  
  /**
   * ============================================================================
   * SWIPE HANDLER - ACTIVITY CAROUSEL
   * ============================================================================
   * 
   * PURPOSE: Handle swipe gestures to navigate activity cards
   * 
   * REACT NATIVE CONVERSION:
   * Use PanGestureHandler from react-native-gesture-handler
   * 
   * const panGesture = Gesture.Pan()
   *   .onEnd((event) => {
   *     if (event.translationX > 50) {
   *       // Swipe right
   *     } else if (event.translationX < -50) {
   *       // Swipe left
   *     }
   *   });
   */
  const handleActivitySwipe = (_event: any, info: any) => {
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const velocityThreshold = 300; // Minimum swipe velocity
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    // Check if this qualifies as a swipe (either fast velocity or sufficient distance)
    const isSwipe = Math.abs(velocity) > velocityThreshold || Math.abs(offset) > swipeThreshold;
    
    if (isSwipe) {
      // Determine swipe direction and advance to next/prev card
      if (offset > 0 || velocity > 0) {
        // Swipe right - go to previous card
        setActivityIndex((prev) => Math.max(0, prev - 1));
      } else {
        // Swipe left - go to next card
        setActivityIndex((prev) => Math.min(heroActivityCards.length - 1, prev + 1));
      }
    }
    
    setDragX(0);
  };
  
  /**
   * ============================================================================
   * AUTO-SLIDE EFFECT - EVENTS CAROUSEL
   * ============================================================================
   * 
   * PURPOSE: Automatically rotate through events every 2.5 seconds
   * Pauses when user hovers (web) or touches (mobile)
   * 
   * REACT NATIVE CONVERSION:
   * Use useEffect with Animated.timing and loop
   * 
   * useEffect(() => {
   *   if (isPaused) return;
   *   
   *   const animation = Animated.loop(
   *     Animated.timing(rotationValue, {
   *       toValue: 1,
   *       duration: 2500,
   *       useNativeDriver: true
   *     })
   *   );
   *   
   *   animation.start();
   *   return () => animation.stop();
   * }, [isPaused]);
   */
  useEffect(() => {
    if (isEventsHovered || upcomingEvents.length === 0) return; // Don't auto-slide when hovered or no events
    
    const interval = setInterval(() => {
      setEventsIndex((prev) => (prev + 1) % upcomingEvents.length);
    }, 2500); // Rotate every 2.5 seconds for smooth circular motion
    
    return () => clearInterval(interval);
  }, [upcomingEvents.length, isEventsHovered]);

  /**
   * ============================================================================
   * QUICK ACTION CARDS DATA
   * ============================================================================
   * 
   * MOCK DATA: Hard-coded action items
   * 
   * REAL DATA SOURCE: GET /api/user/action-items
   * 
   * PERSONALIZATION LOGIC (Backend):
   * - Check upcoming policy renewals → Add calendar card
   * - Query grant eligibility by property location/type → Add grant card
   * - Monitor neighborhood claims/events → Add community card
   * - Check pending documents → Add document upload card
   * - Evaluate inspection due date → Add inspection card
   * 
   * PRIORITY SORTING:
   * 1. Time-sensitive items (expiring today/tomorrow)
   * 2. Action required items (incomplete tasks)
   * 3. Informational items (community updates)
   * 
   * IMAGES:
   * - Replace Unsplash with category-specific icons or branded graphics
   * - Store in app assets for offline access
   */
  const quickActionCards = [
    {
      title: "New Grants Available",
      subtitle: "2 grants match your property",
      detail: "$12,500 total",
      image: "https://images.unsplash.com/photo-1708721137518-d75596870e55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMGdyYW50JTIwZmluYW5jaWFsJTIwc3VwcG9ydHxlbnwxfHx8fDE3NjIzODQ0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Banknote,
      gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)",
      onPress: onNavigateToGrants || (() => {}),
      badgeText: "NEW",
      badgeColor: "rgb(34, 197, 94)",
    },
    {
      title: "Policy Renewal Meeting",
      subtitle: "State Farm agent call",
      detail: "Nov 22, 2:00 PM",
      image: "https://images.unsplash.com/photo-1588453251771-cd919b362ed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHNjaGVkdWxlJTIwcGxhbm5lcnxlbnwxfHx8fDE3NjIzNzY1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Calendar,
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)",
      onPress: onNavigateToCalendar || (() => {}),
      badgeText: "TODAY",
      badgeColor: "rgb(59, 130, 246)",
    },
    {
      title: "Community Activity",
      subtitle: "3 neighbors filed claims",
      detail: "Valencia St Area",
      image: "https://images.unsplash.com/photo-1731468954685-94a1140eb451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjBjb21tdW5pdHklMjBob3VzZXN8ZW58MXx8fHwxNzYyMzg0NDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Users,
      gradient: "linear-gradient(135deg, rgba(214, 158, 46, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)",
      onPress: onNavigateToCommunity || (() => {}),
      badgeText: "UPDATED",
      badgeColor: "rgb(var(--color-goldenrod))",
    },
  ];

  /**
   * ============================================================================
   * SCROLL TRACKING EFFECT - QUICK ACTIONS
   * ============================================================================
   * 
   * PURPOSE: Calculate which card is centered and update activeIndex
   * 
   * REACT NATIVE CONVERSION:
   * Use onMomentumScrollEnd with FlatList:
   * 
   * const onScrollEnd = (event) => {
   *   const offsetX = event.nativeEvent.contentOffset.x;
   *   const index = Math.round(offsetX / (cardWidth + gap));
   *   setActiveIndex(index);
   * };
   */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const cardWidth = 200; // card width
      const gap = 12; // gap between cards (var(--spacing-3))
      const totalCards = quickActionCards.length;
      
      // Calculate which card is closest to center
      const scrollCenter = scrollLeft + (containerWidth / 2);
      
      // Find the card index closest to the center
      let closestIndex = 0;
      let minDistance = Infinity;
      
      for (let index = 0; index < totalCards; index++) {
        // Calculate card center position considering centered padding
        const cardCenter = (containerWidth / 2) - 100 + (index * (cardWidth + gap)) + (cardWidth / 2);
        const distance = Math.abs(scrollCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
      
      setActiveIndex(closestIndex);
    };

    // Scroll to middle card on mount
    const scrollToMiddle = () => {
      const cardWidth = 200;
      const gap = 12;
      const middleIndex = 1; // Middle card (Calendar)
      const scrollPosition = middleIndex * (cardWidth + gap);
      container.scrollLeft = scrollPosition;
    };

    // Small delay to ensure layout is complete
    setTimeout(scrollToMiddle, 50);

    container.addEventListener('scroll', handleScroll);
    // Trigger initial calculation
    handleScroll();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * ============================================================================
   * JSX RENDER - COMPONENT STRUCTURE
   * ============================================================================
   * 
   * REACT NATIVE CONVERSION NOTES:
   * - Replace outer div with ScrollView
   * - Add refreshControl for pull-to-refresh
   * - Use contentContainerStyle for padding
   * - Replace all div → View
   * - Replace all button → TouchableOpacity/Pressable
   * - Replace all text elements → Text
   * - Use SafeAreaView for device edges
   */
  return (
    /**
     * ROOT SCROLLABLE CONTAINER
     * 
     * REACT NATIVE:
     * <SafeAreaView style={styles.container}>
     *   <ScrollView
     *     showsVerticalScrollIndicator={false}
     *     refreshControl={
     *       <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
     *     }
     *     contentContainerStyle={{
     *       paddingBottom: tabBarHeight + 24
     *     }}
     *   >
     */
    <div 
      className="flex-1 overflow-y-auto relative"
      style={{
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-6))',
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION - Featured Property (ENLARGED)                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * HERO SECTION - FEATURED PROPERTY
       * 
       * COMPONENTS:
       * - Background satellite/aerial map image
       * - Gradient overlay for text readability
       * - Property address (clickable → property details)
       * - Property metadata (city, state, zip, type)
       * - Property stats (value, beds, baths, sqft)
       * - View Policy CTA button
       * 
       * DATA SOURCES:
       * - selectedProperty.address
       * - selectedProperty.city, state, zip
       * - selectedProperty.propertyType
       * - selectedProperty.estimatedValue
       * - selectedProperty.bedrooms, bathrooms, squareFeet
       * 
       * MAP IMAGE:
       * - Currently: Generic satellite image from Unsplash
       * - Should be: Mapbox/Google Maps Static API with actual coordinates
       * 
       * API for Real Map:
       * const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${property.coordinates.longitude},${property.coordinates.latitude},15,0,0/428x420@2x?access_token=${MAPBOX_TOKEN}`;
       * 
       * REACT NATIVE:
       * - Use react-native-maps for interactive map OR
       * - Use static image from Mapbox/Google with FastImage
       * - Ensure map is tappable to open community view
       */}
      <div
        style={{
          position: 'relative',
          height: 'calc(420px + var(--header-height))',
          overflow: 'hidden',
        }}
      >
        {/* 
          AERIAL MAP BACKGROUND - Clickable to Community
          
          REACT NATIVE:
          <TouchableOpacity onPress={onNavigateToCommunity} activeOpacity={0.95}>
            <FastImage
              source={{ uri: mapUrl, priority: FastImage.priority.high }}
              style={styles.heroBackground}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        */}
        <motion.div
          onClick={onNavigateToCommunity}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'pointer',
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1722082839841-45473f5a15cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBtYXAlMjBvdmVyaGVhZHxlbnwxfHx8fDE3NjIzNzQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Satellite Map - 1234 Valencia Street"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* 
            GRADIENT OVERLAY - Seamless Fade to Background
            
            REACT NATIVE:
            <LinearGradient
              colors={[
                'rgba(0, 0, 0, 0.2)',
                'rgba(0, 0, 0, 0.4)',
                'rgba(24, 24, 27, 0.7)',
                'rgba(24, 24, 27, 0.95)',
                'rgba(24, 24, 27, 1)'
              ]}
              locations={[0, 0.3, 0.6, 0.85, 1]}
              style={styles.gradientOverlay}
            />
          */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(24, 24, 27, 0.7) 60%, rgba(24, 24, 27, 0.95) 85%, rgba(24, 24, 27, 1) 100%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* 
          CONTENT OVERLAY - Property Information
          
          REACT NATIVE:
          <View style={styles.heroContent}>
            ... property details ...
          </View>
        */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'var(--spacing-5)',
            paddingBottom: 'var(--spacing-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-3)',
            pointerEvents: 'none',
          }}
        >
          {/* 
            PROPERTY ADDRESS - Main Title
            
            DATA: selectedProperty.address
            MOCK: "1234 Valencia Street"
            REAL: From property database
            
            INTERACTION: Clickable to navigate to property details
            
            REACT NATIVE:
            <Pressable onPress={onNavigateToProperty}>
              <Animated.Text
                entering={FadeInUp.delay(200).duration(600)}
                style={styles.heroTitle}
              >
                {selectedProperty.address.toUpperCase()}
              </Animated.Text>
            </Pressable>
          */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={onNavigateToProperty}
            whileHover={{ scale: 1.01, x: 2 }}
            whileTap={{ scale: 0.99 }}
            style={{
              fontFamily: 'Roboto',
              fontSize: '36px',
              color: 'rgb(var(--color-text-primary))',
              lineHeight: '1.1',
              margin: 0,
              letterSpacing: '-0.5px',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              pointerEvents: 'auto',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgb(var(--color-goldenrod))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgb(var(--color-text-primary))';
            }}
          >
            {selectedProperty.address.toUpperCase()}
          </motion.h1>

          {/* 
            METADATA ROW - Location & Property Type
            
            DATA:
            - selectedProperty.city: "San Francisco"
            - selectedProperty.state: "CA"
            - selectedProperty.zip: "94110"
            - selectedProperty.propertyType: "Victorian"
            
            REACT NATIVE:
            <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.metadataRow}>
              <Text style={styles.metadataText}>{city.toUpperCase()}, {state} {zip}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.metadataText}>{propertyType.toUpperCase()}</Text>
            </Animated.View>
          */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-2)',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-sm)',
                color: 'rgb(var(--color-text-secondary))',
              }}
            >
              {selectedProperty.city.toUpperCase()}, {selectedProperty.state} {selectedProperty.zip}
            </span>
            <span style={{ color: 'rgb(var(--color-text-tertiary))' }}>•</span>
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-sm)',
                color: 'rgb(var(--color-text-secondary))',
              }}
            >
              {selectedProperty.propertyType.toUpperCase()}
            </span>
          </motion.div>

          {/* 
            PROPERTY STATS - Value, Beds, Baths, Sqft
            
            DATA:
            - selectedProperty.estimatedValue: "$2.4M"
            - selectedProperty.bedrooms: 3
            - selectedProperty.bathrooms: 2
            - selectedProperty.squareFeet: 2400
            
            FORMATTING:
            - Value should come formatted from API
            - Or format client-side: $X.XM for millions, $XXXk for thousands
            
            REACT NATIVE:
            <Animated.View entering={FadeInUp.delay(350).duration(600)} style={styles.statsRow}>
              <Text style={styles.valueText}>{estimatedValue}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.statText}>{bedrooms} Beds</Text>
              ...
            </Animated.View>
          */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: 'flex',
              gap: 'var(--spacing-4)',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-base)',
                color: 'rgb(var(--color-goldenrod))',
              }}
            >
              {selectedProperty.estimatedValue}
            </span>
            <span style={{ color: 'rgb(var(--color-text-tertiary))' }}>•</span>
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-sm)',
                color: 'rgb(var(--color-text-secondary))',
              }}
            >
              {selectedProperty.bedrooms} Beds
            </span>
            <span style={{ color: 'rgb(var(--color-text-tertiary))' }}>•</span>
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-sm)',
                color: 'rgb(var(--color-text-secondary))',
              }}
            >
              {selectedProperty.bathrooms} Baths
            </span>
            <span style={{ color: 'rgb(var(--color-text-tertiary))' }}>•</span>
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-sm)',
                color: 'rgb(var(--color-text-secondary))',
              }}
            >
              {selectedProperty.squareFeet} Sq Ft
            </span>
          </motion.div>

          {/* 
            VIEW POLICY BUTTON - Primary CTA
            
            ACTION: Navigate to policy details screen
            
            STYLING: Golden outline button with glow effect
            
            REACT NATIVE:
            <Pressable
              onPress={onNavigateToPolicy}
              style={({ pressed }) => [
                styles.ctaButton,
                pressed && styles.ctaButtonPressed
              ]}
            >
              <Icon name="play" size={14} color={theme.colors.goldenrod} />
              <Text style={styles.ctaButtonText}>VIEW POLICY</Text>
            </Pressable>
          */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateToPolicy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                padding: 'var(--spacing-3) var(--spacing-5)',
                backgroundColor: 'transparent',
                border: '1.5px solid rgb(var(--color-goldenrod))',
                borderRadius: 'var(--radius-full)',
                color: 'rgb(var(--color-goldenrod))',
                fontFamily: 'Roboto',
                fontSize: 'var(--text-xs)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                width: 'fit-content',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(214, 158, 46, 0.25)',
              }}
            >
              <Play style={{ width: '14px', height: '14px' }} fill="rgb(var(--color-goldenrod))" />
              VIEW POLICY
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* 
        WEATHER ALERT BANNER
        
        DATA: weatherAlert (from state)
        MOCK: Hard-coded severe weather warning
        REAL: From GET /api/weather/alerts
        
        CONDITIONAL: Only shows if hasSevereWeather is true
        
        REACT NATIVE:
        {hasSevereWeather && (
          <WeatherAlertBanner
            message={weatherAlert.message}
            severity={weatherAlert.severity}
            onPress={onNavigateToWeather}
          />
        )}
      */}
      {hasSevereWeather && (
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            marginTop: 'calc(var(--spacing-4) * -1)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          <WeatherAlertBanner
            message={weatherAlert.message}
            severity={weatherAlert.severity}
          />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. QUICK ACTIONS - Swipeable Carousel                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * QUICK ACTIONS CAROUSEL
       * 
       * PURPOSE: Horizontal scrolling actionable cards for key user tasks
       * 
       * CARDS:
       * - New grants available
       * - Policy renewal meeting
       * - Community activity
       * 
       * DATA: quickActionCards array (lines 240-274)
       * MOCK: Hard-coded action items
       * REAL: From GET /api/user/action-items
       * 
       * SCROLL BEHAVIOR:
       * - Snap to center card
       * - Track active (centered) card
       * - Hide scrollbar
       * 
       * REACT NATIVE:
       * <FlatList
       *   horizontal
       *   data={quickActionCards}
       *   renderItem={({ item, index }) => (
       *     <CompactQuickActionCard
       *       {...item}
       *       isActive={index === activeIndex}
       *     />
       *   )}
       *   snapToInterval={cardWidth + gap}
       *   decelerationRate="fast"
       *   showsHorizontalScrollIndicator={false}
       *   contentContainerStyle={styles.carouselContent}
       *   onMomentumScrollEnd={handleScrollEnd}
       * />
       */}
      <div
        style={{
          padding: 'var(--spacing-5)',
          paddingTop: 'var(--spacing-6)',
          paddingBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4)',
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 'var(--spacing-5)',
            paddingRight: 'var(--spacing-5)',
          }}
        >
          <h2
            style={{
              fontFamily: 'Roboto',
              fontSize: 'var(--text-sm)',
              color: 'rgb(var(--color-text-tertiary))',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: 0,
            }}
          >
            Quick Actions
          </h2>
        </motion.div>

        {/* Horizontal Scrolling Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            position: 'relative',
            marginLeft: 'calc(var(--spacing-5) * -1)',
            marginRight: 'calc(var(--spacing-5) * -1)',
          }}
        >
          {/* Left Fade */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '40px',
              background: 'linear-gradient(to right, rgba(24, 24, 27, 1) 0%, rgba(24, 24, 27, 0) 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Right Fade */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '40px',
              background: 'linear-gradient(to left, rgba(24, 24, 27, 1) 0%, rgba(24, 24, 27, 0) 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto"
            style={{
              gap: 'var(--spacing-3)',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft: 'calc(50vw - 100px)',
              paddingRight: 'calc(50vw - 100px)',
              paddingTop: 'var(--spacing-2)',
              paddingBottom: 'var(--spacing-2)',
            }}
          >
            <style>
              {`
                .flex.overflow-x-auto::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {quickActionCards.map((card, index) => (
              <CompactQuickActionCard
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                detail={card.detail}
                image={card.image}
                icon={card.icon}
                gradient={card.gradient}
                onPress={card.onPress}
                isActive={index === activeIndex}
                badgeText={card.badgeText}
                badgeColor={card.badgeColor}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. PROPERTY STATUS - Key Metrics                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * PROPERTY STATUS METRICS
       * 
       * PURPOSE: Display key property insurance/protection metrics
       * 
       * METRICS (3-column grid):
       * 1. Protection Score: 0-100 rating of property protection/coverage
       * 2. Coverage: Insurance coverage amount ($1.5M)
       * 3. Last Inspection: Days since last drone inspection (28 days)
       * 
       * DATA SOURCES:
       * - protectionScore: selectedProperty.protectionScore (MOCK)
       * - Coverage: Hard-coded "$1.5M" (should be from insurance policy)
       * - Last Inspection: Hard-coded "28" (should calculate from lastInspectionDate)
       * 
       * REAL DATA REQUIREMENTS:
       * - Protection score calculation (backend algorithm)
       * - Insurance policy coverage amount
       * - Last inspection timestamp
       * 
       * REACT NATIVE:
       * <View style={styles.metricsGrid}>
       *   <MetricCard
       *     icon="shield"
       *     value={protectionScore}
       *     label="Protection"
       *     color="green"
       *   />
       *   ...
       * </View>
       */}
      <div
        style={{
          padding: 'var(--spacing-5)',
          paddingBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-3)',
        }}
      >
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            fontFamily: 'Roboto',
            fontSize: 'var(--text-sm)',
            color: 'rgb(var(--color-text-tertiary))',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            margin: 0,
          }}
        >
          Property Status
        </motion.h2>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="grid grid-cols-3"
          style={{ gap: 'var(--spacing-2)' }}
        >
          {/* 
            PROTECTION SCORE CARD
            
            DATA: selectedProperty.protectionScore
            MOCK: Hard-coded value
            REAL: Calculated metric from backend
            
            CALCULATION (Backend):
            weighted_score = (
              coverage_adequacy * 0.3 +
              inspection_recency * 0.4 +
              claim_history * 0.2 +
              maintenance_status * 0.1
            )
          */}
          <div
            style={{
              padding: 'var(--spacing-3)',
              backgroundColor: 'rgba(34, 197, 94, 0.35)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
              borderRadius: 'var(--radius-lg)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-2)',
              alignItems: 'center',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.35), 0 4px 8px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.45), 0 12px 24px rgba(0, 0, 0, 0.5), 0 16px 32px rgba(0, 0, 0, 0.55), 0 24px 48px rgba(0, 0, 0, 0.6)',
              filter: 'brightness(1.1)',
            }}
          >
            <Shield 
              style={{ 
                width: '20px', 
                height: '20px', 
                color: 'rgb(34, 197, 94)',
                filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8)) drop-shadow(0 0 16px rgba(34, 197, 94, 0.5))',
              }} 
            />
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '20px',
                color: 'rgb(34, 197, 94)',
              }}
            >
              {selectedProperty.protectionScore}
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '10px',
                color: 'rgb(var(--color-text-secondary))',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Protection
            </div>
          </div>

          {/* 
            COVERAGE CARD
            
            DATA: Insurance policy coverage amount
            MOCK: "$1.5M" hard-coded
            REAL: From selectedProperty.insurance.coverageAmount
            
            FORMAT: Format large numbers as $X.XM or $XXXk
          */}
          <div
            style={{
              padding: 'var(--spacing-3)',
              backgroundColor: 'rgba(59, 130, 246, 0.35)',
              border: '1px solid rgba(59, 130, 246, 0.5)',
              borderRadius: 'var(--radius-lg)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-2)',
              alignItems: 'center',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.35), 0 4px 8px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.45), 0 12px 24px rgba(0, 0, 0, 0.5), 0 16px 32px rgba(0, 0, 0, 0.55), 0 24px 48px rgba(0, 0, 0, 0.6)',
              filter: 'brightness(1.1)',
            }}
          >
            <Home 
              style={{ 
                width: '20px', 
                height: '20px', 
                color: 'rgb(59, 130, 246)',
                filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.5))',
              }} 
            />
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '20px',
                color: 'rgb(59, 130, 246)',
              }}
            >
              $1.5M
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '10px',
                color: 'rgb(var(--color-text-secondary))',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Coverage
            </div>
          </div>

          {/* 
            LAST INSPECTION CARD
            
            DATA: Days since last inspection
            MOCK: "28" hard-coded
            REAL: Calculate from selectedProperty.lastInspectionDate
            
            CALCULATION:
            const daysSinceInspection = Math.floor(
              (Date.now() - new Date(lastInspectionDate).getTime()) / (1000 * 60 * 60 * 24)
            );
            
            COLOR LOGIC:
            - < 30 days: Purple (good)
            - 30-60 days: Yellow (warning)
            - > 60 days: Red (urgent - schedule inspection)
          */}
          <div
            style={{
              padding: 'var(--spacing-3)',
              backgroundColor: 'rgba(168, 85, 247, 0.35)',
              border: '1px solid rgba(168, 85, 247, 0.5)',
              borderRadius: 'var(--radius-lg)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-2)',
              alignItems: 'center',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.35), 0 4px 8px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.45), 0 12px 24px rgba(0, 0, 0, 0.5), 0 16px 32px rgba(0, 0, 0, 0.55), 0 24px 48px rgba(0, 0, 0, 0.6)',
              filter: 'brightness(1.1)',
            }}
          >
            <Clock 
              style={{ 
                width: '20px', 
                height: '20px', 
                color: 'rgb(168, 85, 247)',
                filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 16px rgba(168, 85, 247, 0.5))',
              }} 
            />
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '20px',
                color: 'rgb(168, 85, 247)',
              }}
            >
              28
            </div>
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '10px',
                color: 'rgb(var(--color-text-secondary))',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Days Ago
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. WEATHER & ALERTS - Critical Information                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * WEATHER & ALERTS CARD
       * 
       * PURPOSE: Display current weather warnings and allow navigation to full weather screen
       * 
       * FEATURES:
       * - Pulsing glow animation for severity
       * - Animated rain effect
       * - High risk badge
       * - Date range display
       * 
       * DATA:
       * - Currently hard-coded "Storm Warning"
       * - Should come from weather API
       * 
       * REACT NATIVE:
       * <Pressable onPress={onNavigateToWeather} style={styles.weatherCard}>
       *   <Animated.View style={[styles.glowBackground, glowAnimation]} />
       *   <Icon name="cloud-rain" size={24} color="yellow" />
       *   <View style={styles.weatherInfo}>
       *     <Text style={styles.weatherTitle}>Storm Warning</Text>
       *     <Text style={styles.weatherDetail}>Heavy rain expected...</Text>
       *   </View>
       * </Pressable>
       */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          margin: 'var(--spacing-5)',
          marginBottom: 0,
        }}
      >
        <motion.button
          onClick={onNavigateToWeather}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          style={{
            width: '100%',
            padding: 'var(--spacing-4)',
            backgroundColor: 'rgba(251, 191, 36, 0.08)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: 'var(--radius-xl)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.15), 0 24px 48px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Pulsing glow background animation for storm intensity */}
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', position: 'relative', zIndex: 1 }}>
            {/* Weather Icon with animated rain */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(251, 191, 36, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Rain effect - diagonal falling lines */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`rain-${i}`}
                  animate={{
                    y: ['-100%', '200%'],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 1.2 + i * 0.15,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.2,
                  }}
                  style={{
                    position: 'absolute',
                    left: `${i * 16}%`,
                    top: 0,
                    width: '2px',
                    height: '20px',
                    backgroundColor: 'rgba(251, 191, 36, 0.5)',
                    borderRadius: '2px',
                    transform: 'rotate(20deg)',
                    pointerEvents: 'none',
                  }}
                />
              ))}
              
              <motion.div
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <CloudRain style={{ width: '24px', height: '24px', color: 'rgb(251, 191, 36)', position: 'relative', zIndex: 1 }} />
              </motion.div>
            </div>

            {/* Weather Info */}
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
                <span
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-base)',
                    color: 'rgb(var(--color-text-primary))',
                  }}
                >
                  Storm Warning
                </span>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    padding: '2px 8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: '10px',
                      color: 'rgb(239, 68, 68)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    High Risk
                  </span>
                </motion.div>
              </div>
              <span
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 'var(--text-xs)',
                  color: 'rgb(var(--color-text-secondary))',
                }}
              >
                Heavy rain expected Nov 15-17 • Tap for details
              </span>
            </div>

            {/* Arrow */}
            <ChevronRight style={{ width: '20px', height: '20px', color: 'rgb(var(--color-text-tertiary))' }} />
          </div>
        </motion.button>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 5. UPCOMING EVENTS - Calendar Items                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * UPCOMING EVENTS - 3D CIRCULAR CAROUSEL
       * 
       * PURPOSE: Display upcoming calendar events in rotating 3D carousel
       * 
       * FEATURES:
       * - 3D rotateY circular positioning
       * - Auto-rotate every 2.5 seconds
       * - Pause on hover/touch
       * - Front-facing card emphasized with opacity/scale
       * - Navigation dots for manual control
       * 
       * DATA:
       * - upcomingEvents (filtered from selectedProperty.upcomingEvents)
       * - Only shows events within next 3 months
       * 
       * REACT NATIVE CHALLENGES:
       * - Limited 3D transform support
       * - Consider simplifying to 2D carousel with react-native-reanimated-carousel
       * - Or use perspective + rotateY with caution
       * 
       * ALTERNATIVE:
       * Use FlatList with pagingEnabled and snap points
       * Add depth effect with scale/opacity
       */}
      <div
        style={{
          paddingLeft: 'var(--spacing-5)',
          paddingRight: 'var(--spacing-5)',
          paddingTop: 'var(--spacing-4)',
          paddingBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-1)',
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'Roboto',
              fontSize: 'var(--text-sm)',
              color: 'rgb(var(--color-text-tertiary))',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: 0,
            }}
          >
            Upcoming
          </h2>
          <button
            onClick={onNavigateToCalendar}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              padding: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-xs)',
                color: 'rgb(var(--color-goldenrod))',
              }}
            >
              View All
            </span>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'rgb(var(--color-goldenrod))' }} />
          </button>
        </motion.div>

        {/* Event Carousel - Circular Rotating Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          onMouseEnter={() => setIsEventsHovered(true)}
          onMouseLeave={() => setIsEventsHovered(false)}
          style={{
            position: 'relative',
            height: '140px',
            perspective: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Circular carousel container */}
          <motion.div
            animate={{
              rotateY: -eventsIndex * (360 / upcomingEvents.length),
            }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {upcomingEvents.map((event, index) => {
              const eventColor = getEventColor(index);
              const dateNum = event.date.split(' ')[1]; // Extract day number
              const dateMonth = event.date.split(' ')[0]; // Extract month
              
              // Calculate angle for circular positioning
              const angle = (index * 360) / upcomingEvents.length;
              const radius = 160; // Distance from center
              
              // Calculate which card is currently front-facing based on rotation
              const currentRotation = (eventsIndex * (360 / upcomingEvents.length)) % 360;
              const cardRotation = angle % 360;
              const rotationDiff = Math.abs(currentRotation - cardRotation);
              const normalizedDiff = Math.min(rotationDiff, 360 - rotationDiff);
              
              // Calculate opacity and scale based on how close to front the card is
              const isFrontFacing = normalizedDiff < 45;
              const opacity = isFrontFacing ? 1 : Math.max(0.15, 1 - (normalizedDiff / 180));
              const scale = isFrontFacing ? 1 : Math.max(0.85, 1 - (normalizedDiff / 360));
              
              return (
                <motion.div
                  key={index}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '260px',
                    padding: 'var(--spacing-2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-lg)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    gap: 'var(--spacing-2)',
                    alignItems: 'center',
                    boxShadow: isFrontFacing 
                      ? '0 4px 8px rgba(0, 0, 0, 0.1), 0 12px 24px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.25), 0 28px 56px rgba(0, 0, 0, 0.3)'
                      : '0 2px 4px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.1)',
                    transform: `
                      translate(-50%, -50%)
                      rotateY(${angle}deg)
                      translateZ(${radius}px)
                      scale(${scale})
                    `,
                    transformStyle: 'preserve-3d',
                    opacity: opacity,
                    transition: 'opacity 0.6s ease, box-shadow 0.6s ease',
                    pointerEvents: isFrontFacing ? 'auto' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: eventColor.bg,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        color: eventColor.text,
                      }}
                    >
                      {dateNum}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '9px',
                        color: eventColor.text,
                        textTransform: 'uppercase',
                      }}
                    >
                      {dateMonth}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 'var(--text-sm)',
                        color: 'rgb(var(--color-text-primary))',
                        marginBottom: '2px',
                      }}
                    >
                      {event.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 'var(--text-xs)',
                        color: 'rgb(var(--color-text-secondary))',
                      }}
                    >
                      {event.time} • {event.type}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Navigation dots */}
          <div
            style={{
              position: 'absolute',
              bottom: 'var(--spacing-1)',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 'var(--spacing-2)',
              zIndex: 10,
            }}
          >
            {upcomingEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setEventsIndex(index)}
                style={{
                  width: eventsIndex === index ? '24px' : '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: eventsIndex === index 
                    ? 'rgb(var(--color-goldenrod))' 
                    : 'rgba(255, 255, 255, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 6. RECENT ACTIVITY                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * RECENT ACTIVITY - HERO CARDS
       * 
       * PURPOSE: Display recent property activities with images and details
       * 
       * CARDS:
       * - Drone inspection complete
       * - Storm damage assessment
       * - Maintenance completed
       * - Property value update
       * 
       * DATA: heroActivityCards (transformed from selectedProperty.recentActivities)
       * MOCK: Generic Unsplash images
       * REAL: Actual activity-specific images from database
       * 
       * REACT NATIVE:
       * <FlatList
       *   horizontal
       *   data={heroActivityCards}
       *   renderItem={({ item }) => <ActivityCard {...item} />}
       *   showsHorizontalScrollIndicator={false}
       *   contentContainerStyle={styles.activityList}
       * />
       */}
      <div
        style={{
          padding: 'var(--spacing-5)',
          paddingTop: 'var(--spacing-4)',
          paddingBottom: 'var(--spacing-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-3)',
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.95 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'Roboto',
              fontSize: 'var(--text-sm)',
              color: 'rgb(var(--color-text-tertiary))',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: 0,
            }}
          >
            Recent Activity
          </h2>
          <button
            onClick={onNavigateToInsights}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              padding: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-xs)',
                color: 'rgb(var(--color-goldenrod))',
              }}
            >
              View All
            </span>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'rgb(var(--color-goldenrod))' }} />
          </button>
        </motion.div>

        {/* Activity Hero Cards - Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{
            position: 'relative',
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-2)',
              paddingBottom: 'var(--spacing-2)',
              width: 'fit-content',
            }}
          >
          {heroActivityCards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.25), 0 12px 24px rgba(0, 0, 0, 0.3)',
              }}
              style={{
                position: 'relative',
                minWidth: '168px',
                maxWidth: '168px',
                height: '140px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.25)',
                pointerEvents: 'auto',
              }}
            >
              {/* Background Image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.7)',
                }}
              />
              
              {/* Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%)',
                }}
              />
              
              {/* Content */}
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 'var(--spacing-2)',
                }}
              >
                {/* Badge */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      padding: '2px var(--spacing-2)',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: 'var(--radius-full)',
                      border: `1px solid ${card.badgeColor}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '9px',
                        color: card.badgeColor,
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>
                </div>
                
                {/* Bottom Content */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: '13px',
                      color: 'rgb(var(--color-text-primary))',
                      marginBottom: 'var(--spacing-1)',
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {card.title}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-1)',
                    }}
                  >
                    <Clock style={{ width: '10px', height: '10px', color: 'rgb(var(--color-goldenrod))' }} />
                    <span
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '9px',
                        color: 'rgb(var(--color-text-tertiary))',
                      }}
                    >
                      {card.time}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </motion.div>
        
        {/* Hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. FOOTER - Location Badge                                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * FOOTER - LOCATION BADGE
       * 
       * PURPOSE: Display user's general location
       * 
       * DATA: Hard-coded "San Francisco Bay Area"
       * REAL: From user profile or property location
       * 
       * REACT NATIVE:
       * <View style={styles.footer}>
       *   <Icon name="map-pin" size={14} color={theme.colors.goldenrod} />
       *   <Text style={styles.locationText}>San Francisco Bay Area</Text>
       * </View>
       */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-2)',
          padding: 'var(--spacing-5)',
          paddingTop: 'var(--spacing-3)',
          paddingBottom: 'var(--spacing-3)',
        }}
      >
        <MapPin style={{ width: '14px', height: '14px', color: 'rgb(var(--color-goldenrod))' }} />
        <span
          style={{
            fontFamily: 'Roboto',
            fontSize: 'var(--text-xs)',
            color: 'rgb(var(--color-text-tertiary))',
          }}
        >
          San Francisco Bay Area
        </span>
      </motion.div>
    </div>
  );
}

/**
 * ==============================================================================
 * TESTING CHECKLIST FOR REACT NATIVE CONVERSION
 * ==============================================================================
 * 
 * DATA & API:
 * □ Property data fetches from API successfully
 * □ Quick actions load dynamically based on user state
 * □ Weather alerts fetch from weather API
 * □ Recent activities load with proper images
 * □ Upcoming events filter correctly by date
 * □ Pull-to-refresh updates all data
 * 
 * ANIMATIONS:
 * □ Hero section fade-in animations work smoothly
 * □ Quick actions carousel scrolls and snaps correctly
 * □ Weather card pulsing glow animates
 * □ Events carousel rotates (or 2D alternative works)
 * □ Activity cards have hover/press effects
 * □ All animations run at 60fps
 * 
 * NAVIGATION:
 * □ All navigation callbacks work correctly
 * □ React Navigation integration complete
 * □ Deep linking supported for specific screens
 * □ Back button behavior is correct
 * 
 * LAYOUT & STYLING:
 * □ Glassmorphism effects render correctly
 * □ Gradient overlays display properly
 * □ Golden glow shadows appear as expected
 * □ Text is readable on all backgrounds
 * □ Layout responds to different screen sizes
 * □ Safe area insets respected on all devices
 * 
 * PERFORMANCE:
 * □ Large images load progressively
 * □ Scroll performance is smooth
 * □ Memory usage is acceptable
 * □ No memory leaks on unmount
 * □ Re-renders are optimized
 * 
 * ACCESSIBILITY:
 * □ All interactive elements have labels
 * □ Screen reader announces content correctly
 * □ Color contrast meets WCAG standards
 * □ Touch targets are minimum 44x44pts
 * □ Focus order is logical
 * 
 * ==============================================================================
 */
