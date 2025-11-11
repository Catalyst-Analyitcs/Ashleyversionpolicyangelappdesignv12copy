/**
 * ==============================================================================
 * ACTIONCARDS.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Draggable action card carousel with swipe gestures.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * ✅ KEEP AS-IS (90% of styles): All Tailwind utility classes work!
 * ❌ CONVERT ONLY: div → View, add react-native-gesture-handler
 * 
 * ```tsx
 * import { View, Text, Pressable } from 'react-native';
 * import { GestureDetector, Gesture } from 'react-native-gesture-handler';
 * import Animated from 'react-native-reanimated';
 * 
 * <GestureDetector gesture={panGesture}>
 *   <Animated.View className="absolute bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
 *     <Text className="text-white text-xl font-semibold">{card.title}</Text>
 *   </Animated.View>
 * </GestureDetector>
 * ```
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. GESTURE HANDLING:
 *    - react-native-gesture-handler for drag/swipe
 *    - PanGestureHandler
 *    - Use react-native-reanimated for animations
 * 
 * 2. CARD STACK:
 *    - Absolute positioning
 *    - Z-index layering
 *    - Transform for offset
 * 
 * 3. SWIPE TO DISMISS:
 *    - Track gesture velocity
 *    - Animate card off screen
 *    - Update card stack
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Cards display stacked
 * - [ ] Swipe gesture works
 * - [ ] Card removal smooth
 * - [ ] Next card appears
 * - [ ] iOS and Android compatible
 * 
 */

// RN: React imports remain the same in React Native
import { useState } from "react";
// RN: Replace lucide-react with react-native-vector-icons or expo-vector-icons
// RN: import { FileText, Calendar, Bell, Camera, MessageSquare, Map } from 'react-native-vector-icons/Feather';
import { FileText, Calendar, Bell, Camera, MessageSquare, Map } from "lucide-react";
// RN: Replace motion/react with react-native-reanimated v3
// RN: import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, runOnJS } from 'react-native-reanimated';
// RN: import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { motion, useMotionValue, useTransform } from "motion/react";
// RN: Remove Card import - create custom View with glassmorphic styling
// RN: import { View, Text, StyleSheet } from 'react-native';
import { Card } from "./ui/card";

// RN: Interface remains the same but ElementType works in RN for icon components
interface ActionCardData {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

// RN: Mock data should be fetched from backend API in production
// RN: API Endpoint: GET /api/user/quick-actions with counts
// RN: Use TanStack Query for data fetching and caching
// RN: const { data: cards } = useQuery(['quick-actions'], fetchQuickActions);
const initialCards: ActionCardData[] = [
  {
    id: "documents",
    icon: FileText,
    title: "Documents",
    subtitle: "3 files", // RN: Real count from API
  },
  {
    id: "calendar",
    icon: Calendar,
    title: "Calendar",
    subtitle: "2 events", // RN: Real count from API
  },
  {
    id: "alerts",
    icon: Bell,
    title: "Alerts",
    subtitle: "1 new", // RN: Real count from API
  },
  {
    id: "camera",
    icon: Camera,
    title: "Gallery",
    subtitle: "24 photos", // RN: Real count from API
  },
  {
    id: "messages",
    icon: MessageSquare,
    title: "Messages",
    subtitle: "5 unread", // RN: Real count from API
  },
  {
    id: "location",
    icon: Map,
    title: "Location",
    subtitle: "Track drone", // RN: Real-time drone status
  },
];

// RN: Function component remains the same structure
export function ActionCards() {
  // RN: useState works identically in React Native
  const [cards, setCards] = useState<ActionCardData[]>(initialCards);

  // RN: Remove card handler - consider adding haptic feedback
  // RN: import * as Haptics from 'expo-haptics';
  // RN: Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    // RN: Replace div with View component
    // RN: <View style={styles.container}>
    <div 
      className="relative"
      style={{ 
        height: '180px', // RN: Use design token - height: SPACING.cardHeight or 180
        width: '100%' // RN: width: '100%' works the same in RN
      }}
    >
      {/* RN: Conditional rendering syntax is identical */}
      {cards.length === 0 ? (
        // RN: Replace div with View, className with style object
        // RN: <View style={[styles.emptyContainer, { color: COLORS.textSecondary }]}>
        <div 
          className="flex items-center justify-center h-full"
          style={{ color: 'var(--text-secondary)' }}
        >
          {/* RN: Replace with Text component */}
          {/* RN: <Text style={styles.emptyText}>No more cards</Text> */}
          No more cards
        </div>
      ) : (
        // RN: Replace div with View
        // RN: <View style={styles.cardStack}>
        <div className="relative w-full h-full">
          {/* RN: .map() works the same - ensure unique key prop */}
          {cards.map((card, index) => (
            <SwipeableCard
              key={card.id} // RN: Key prop required for optimal list rendering
              card={card}
              index={index}
              totalCards={cards.length}
              onRemove={() => removeCard(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// RN: Interface props remain the same
interface SwipeableCardProps {
  card: ActionCardData;
  index: number;
  totalCards: number;
  onRemove: () => void;
}

// RN: Function component structure stays the same
function SwipeableCard({ card, index, totalCards, onRemove }: SwipeableCardProps) {
  // RN: Replace motion values with reanimated shared values
  // RN: const translateX = useSharedValue(0);
  // RN: const rotation = useSharedValue(0);
  // RN: const cardOpacity = useSharedValue(1);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // RN: Boolean logic remains the same
  // Only the top card (index 0) should be draggable
  const isTopCard = index === 0;
  
  // RN: Scale and offset calculations work identically
  // Calculate scale and y offset for stacked effect
  const scale = 1 - (index * 0.05); // RN: Each card 5% smaller
  const yOffset = index * 8; // RN: 8px vertical offset per card

  // RN: Replace with gesture handler onEnd callback
  // RN: const panGesture = Gesture.Pan()
  // RN:   .onUpdate((e) => {
  // RN:     translateX.value = e.translationX;
  // RN:     rotation.value = interpolate(e.translationX, [-200, 0, 200], [-15, 0, 15]);
  // RN:     cardOpacity.value = interpolate(Math.abs(e.translationX), [0, 200], [1, 0]);
  // RN:   })
  // RN:   .onEnd((e) => {
  // RN:     if (Math.abs(e.translationX) > 100 || Math.abs(e.velocityX) > 500) {
  // RN:       translateX.value = withSpring(e.translationX > 0 ? 300 : -300);
  // RN:       runOnJS(onRemove)();
  // RN:     } else {
  // RN:       translateX.value = withSpring(0);
  // RN:       rotation.value = withSpring(0);
  // RN:       cardOpacity.value = withSpring(1);
  // RN:     }
  // RN:   });
  const handleDragEnd = (_event: any, info: any) => {
    // RN: Threshold of 100px or high velocity triggers card removal
    // If dragged beyond threshold, remove the card
    if (Math.abs(info.offset.x) > 100) {
      onRemove();
    }
  };

  // RN: Dynamic icon component works the same way in RN
  const Icon = card.icon;

  // RN: Create animated style using useAnimatedStyle hook
  // RN: const animatedCardStyle = useAnimatedStyle(() => {
  // RN:   return {
  // RN:     transform: [
  // RN:       { translateX: isTopCard ? translateX.value : 0 },
  // RN:       { rotate: `${isTopCard ? rotation.value : 0}deg` },
  // RN:       { scale: withSpring(scale) },
  // RN:       { translateY: withSpring(yOffset) },
  // RN:     ],
  // RN:     opacity: isTopCard ? cardOpacity.value : 1,
  // RN:     zIndex: totalCards - index,
  // RN:   };
  // RN: });

  return (
    // RN: Replace motion.div with GestureDetector + Animated.View
    // RN: <GestureDetector gesture={isTopCard ? panGesture : Gesture.Tap()}>
    // RN:   <Animated.View style={[styles.cardWrapper, animatedCardStyle]}>
    <motion.div
      style={{
        x: isTopCard ? x : 0, // RN: Only top card responds to drag
        rotate: isTopCard ? rotate : 0, // RN: Rotation on swipe for top card
        opacity: isTopCard ? opacity : 1, // RN: Fade out on extreme swipe
        scale, // RN: Stacked cards get progressively smaller
        y: yOffset, // RN: Vertical offset creates depth illusion
        position: 'absolute', // RN: Absolute positioning for stacking
        top: 0,
        left: 0,
        right: 0,
        zIndex: totalCards - index, // RN: Top card has highest z-index
      }}
      drag={isTopCard ? "x" : false} // RN: Only horizontal drag for top card
      dragConstraints={{ left: 0, right: 0 }} // RN: No constraints, allow full swipe
      dragElastic={0.7} // RN: Elastic resistance at boundaries
      onDragEnd={handleDragEnd}
      animate={{
        scale, // RN: Animate scale changes when cards are removed
        y: yOffset, // RN: Animate position changes smoothly
      }}
      transition={{
        scale: { duration: 0.2 }, // RN: Quick scale transition
        y: { duration: 0.2 }, // RN: Quick position transition
      }}
    >
      {/* RN: Replace Card with custom View using glassmorphic styling */}
      {/* RN: <View style={[styles.card, { 
        RN:   borderRadius: RADIUS.actionCard,
        RN:   padding: SPACING.actionCardPadding,
        RN:   backgroundColor: COLORS.cardBg,
        RN:   borderColor: COLORS.cardBorder,
        RN:   height: 180,
        RN: }]}>
      */}
      <Card 
        className="backdrop-blur-sm flex flex-col items-center justify-center"
        style={{ 
          borderRadius: 'var(--action-card-radius)', // RN: Use RADIUS.actionCard token
          padding: 'var(--action-card-padding)', // RN: Use SPACING.actionCardPadding token
          backgroundColor: 'var(--card-bg)', // RN: Use COLORS.cardBg with alpha for glass effect
          borderColor: 'var(--card-border)', // RN: Use COLORS.cardBorder token
          height: '180px', // RN: Fixed height 180 for consistent card size
          cursor: isTopCard ? 'grab' : 'default', // RN: No cursor in React Native
        }}
      >
        {/* RN: Replace div with View for icon container */}
        {/* RN: <View style={[styles.iconContainer, {
          RN:   width: 64,
          RN:   height: 64,
          RN:   backgroundColor: COLORS.iconBg,
          RN:   borderWidth: 1,
          RN:   borderColor: COLORS.iconBorder,
          RN:   borderRadius: 32,
          RN:   ...SHADOWS.dramatic,
          RN: }]}>
        */}
        <div 
          className="flex items-center justify-center rounded-full"
          style={{
            width: '64px', // RN: 64x64 icon container
            height: '64px',
            backgroundColor: 'var(--icon-bg)', // RN: Use COLORS.iconBg token
            border: '1px solid var(--icon-border)', // RN: borderWidth: 1, borderColor
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // RN: Use SHADOWS.dramatic token
          }}
        >
          {/* RN: Icon component renders the same, but use size prop instead of className */}
          {/* RN: <Icon size={32} color={COLORS.iconColor} /> */}
          <Icon className="w-8 h-8" style={{ color: 'var(--icon-color)' }} />
        </div>
        {/* RN: Replace span with Text component */}
        {/* RN: <Text style={[styles.cardTitle, { 
          RN:   marginTop: SPACING.xs,
          RN:   fontSize: TYPOGRAPHY.textSm,
          RN:   color: COLORS.textPrimary,
          RN: }]}>
        */}
        <span 
          className="mt-3"
          style={{ 
            fontSize: 'var(--text-sm)', // RN: Use TYPOGRAPHY.textSm token
            color: 'var(--text-primary)', // RN: Use COLORS.textPrimary token
          }}
        >
          {card.title}
        </span>
        {/* RN: Replace span with Text component for subtitle */}
        {/* RN: <Text style={[styles.cardSubtitle, { 
          RN:   fontSize: TYPOGRAPHY.textXs,
          RN:   color: COLORS.textSecondary,
          RN: }]}>
        */}
        <span 
          style={{ 
            fontSize: 'var(--text-xs)', // RN: Use TYPOGRAPHY.textXs token
            color: 'var(--text-secondary)', // RN: Use COLORS.textSecondary token
          }}
        >
          {card.subtitle}
        </span>
      </Card>
      {/* RN: Close Animated.View and GestureDetector */}
      {/* RN:   </Animated.View> */}
      {/* RN: </GestureDetector> */}
    </motion.div>
  );
}

/**
 * ==============================================================================
 * REACT NATIVE STYLESHEET EXAMPLE
 * ==============================================================================
 * 
 * RN: Complete StyleSheet for ActionCards component
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     height: 180,
 *     width: '100%',
 *     position: 'relative',
 *   },
 *   emptyContainer: {
 *     flex: 1,
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *   },
 *   emptyText: {
 *     fontSize: TYPOGRAPHY.textBase,
 *     color: COLORS.textSecondary,
 *   },
 *   cardStack: {
 *     position: 'relative',
 *     width: '100%',
 *     height: '100%',
 *   },
 *   cardWrapper: {
 *     position: 'absolute',
 *     top: 0,
 *     left: 0,
 *     right: 0,
 *   },
 *   card: {
 *     borderRadius: RADIUS.actionCard,
 *     padding: SPACING.actionCardPadding,
 *     backgroundColor: COLORS.cardBg,
 *     borderWidth: 1,
 *     borderColor: COLORS.cardBorder,
 *     height: 180,
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     ...SHADOWS.glass,
 *   },
 *   iconContainer: {
 *     width: 64,
 *     height: 64,
 *     borderRadius: 32,
 *     backgroundColor: COLORS.iconBg,
 *     borderWidth: 1,
 *     borderColor: COLORS.iconBorder,
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     ...SHADOWS.dramatic,
 *   },
 *   cardTitle: {
 *     marginTop: SPACING.xs,
 *     fontSize: TYPOGRAPHY.textSm,
 *     color: COLORS.textPrimary,
 *     fontFamily: TYPOGRAPHY.fontMedium,
 *   },
 *   cardSubtitle: {
 *     marginTop: SPACING.xxs,
 *     fontSize: TYPOGRAPHY.textXs,
 *     color: COLORS.textSecondary,
 *     fontFamily: TYPOGRAPHY.fontRegular,
 *   },
 * });
 */

/**
 * ==============================================================================
 * BACKEND API INTEGRATION NOTES
 * ==============================================================================
 * 
 * RN: Required API Endpoints:
 * 
 * 1. GET /api/user/quick-actions
 *    - Returns array of quick action cards with live counts
 *    - Response: { id, icon, title, subtitle, count, lastUpdated }
 *    - Used by: TanStack Query hook in ActionCards component
 * 
 * 2. POST /api/user/quick-actions/dismiss/:id
 *    - Dismisses a quick action card (optional persistence)
 *    - Used when user swipes card away
 * 
 * 3. GET /api/user/documents/count
 * 4. GET /api/user/calendar/upcoming-count
 * 5. GET /api/user/alerts/unread-count
 * 6. GET /api/user/gallery/photo-count
 * 7. GET /api/user/messages/unread-count
 * 8. GET /api/drones/:id/status
 *    - Individual count endpoints for real-time badge updates
 * 
 * RN: TanStack Query Implementation:
 * 
 * const useQuickActions = () => {
 *   return useQuery({
 *     queryKey: ['quick-actions'],
 *     queryFn: async () => {
 *       const response = await api.get('/api/user/quick-actions');
 *       return response.data;
 *     },
 *     staleTime: 30000, // 30 seconds
 *     refetchInterval: 60000, // Refetch every minute
 *   });
 * };
 */

/**
 * ==============================================================================
 * GESTURE HANDLER ADVANCED EXAMPLE
 * ==============================================================================
 * 
 * RN: Complete gesture implementation with velocity and spring physics
 * 
 * import { Gesture, GestureDetector } from 'react-native-gesture-handler';
 * import Animated, {
 *   useSharedValue,
 *   useAnimatedStyle,
 *   withSpring,
 *   withTiming,
 *   interpolate,
 *   runOnJS,
 * } from 'react-native-reanimated';
 * 
 * function SwipeableCard({ card, isTopCard, onRemove }) {
 *   const translateX = useSharedValue(0);
 *   const translateY = useSharedValue(0);
 *   const context = useSharedValue({ x: 0 });
 * 
 *   const panGesture = Gesture.Pan()
 *     .onStart(() => {
 *       context.value = { x: translateX.value };
 *     })
 *     .onUpdate((e) => {
 *       if (!isTopCard) return;
 *       translateX.value = e.translationX + context.value.x;
 *       // Add slight vertical movement for realism
 *       translateY.value = Math.abs(e.translationX) * 0.1;
 *     })
 *     .onEnd((e) => {
 *       const shouldDismiss = 
 *         Math.abs(e.translationX) > SWIPE_THRESHOLD ||
 *         Math.abs(e.velocityX) > VELOCITY_THRESHOLD;
 * 
 *       if (shouldDismiss && isTopCard) {
 *         const direction = e.translationX > 0 ? 1 : -1;
 *         translateX.value = withTiming(direction * 500, { duration: 300 });
 *         runOnJS(onRemove)();
 *       } else {
 *         translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
 *         translateY.value = withSpring(0);
 *       }
 *     });
 * 
 *   const animatedStyle = useAnimatedStyle(() => {
 *     const rotation = interpolate(
 *       translateX.value,
 *       [-200, 0, 200],
 *       [-15, 0, 15]
 *     );
 *     const opacity = interpolate(
 *       Math.abs(translateX.value),
 *       [0, 200],
 *       [1, 0]
 *     );
 * 
 *     return {
 *       transform: [
 *         { translateX: translateX.value },
 *         { translateY: translateY.value },
 *         { rotate: `${rotation}deg` },
 *       ],
 *       opacity,
 *     };
 *   });
 * 
 *   return (
 *     <GestureDetector gesture={panGesture}>
 *       <Animated.View style={[styles.card, animatedStyle]}>
 *         {/* Card content */}
 *       </Animated.View>
 *     </GestureDetector>
 *   );
 * }
 */

/**
 * ==============================================================================
 * TESTING CHECKLIST - REACT NATIVE
 * ==============================================================================
 * 
 * VISUAL TESTS:
 * - [ ] Cards display in stacked formation with proper depth
 * - [ ] Icon renders correctly with proper size and color
 * - [ ] Text hierarchy is clear (title vs subtitle)
 * - [ ] Glassmorphic background blur effect works
 * - [ ] Shadow and border styling matches design system
 * 
 * INTERACTION TESTS:
 * - [ ] Only top card is draggable
 * - [ ] Swipe left removes card with smooth animation
 * - [ ] Swipe right removes card with smooth animation
 * - [ ] Card snaps back if swipe distance < threshold
 * - [ ] Velocity-based dismissal works (fast flick)
 * - [ ] Rotation and opacity respond to drag distance
 * - [ ] Cards behind move up smoothly when top card removed
 * - [ ] Empty state shows when all cards dismissed
 * 
 * PERFORMANCE TESTS:
 * - [ ] 60fps maintained during swipe gestures
 * - [ ] No jank when cards animate into position
 * - [ ] Memory usage stable with repeated swipes
 * - [ ] Works smoothly on mid-range Android devices
 * 
 * ACCESSIBILITY TESTS:
 * - [ ] VoiceOver/TalkBack announces card title and subtitle
 * - [ ] Alternative dismiss action for screen reader users
 * - [ ] Focus order makes sense
 * - [ ] Color contrast meets WCAG AA standards
 * 
 * EDGE CASES:
 * - [ ] Works with 1 card
 * - [ ] Works with 10+ cards
 * - [ ] Handles rapid successive swipes
 * - [ ] State updates correctly on card removal
 * - [ ] No layout shift on card stack changes
 * 
 * PLATFORM-SPECIFIC:
 * - [ ] iOS: Haptic feedback on swipe start/end
 * - [ ] Android: Ripple effect on touch (if using Pressable)
 * - [ ] Both: Gesture conflicts with parent ScrollView resolved
 */
