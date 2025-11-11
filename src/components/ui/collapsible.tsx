/**
 * REACT NATIVE CONVERSION - Collapsible Component
 * 
 * COMPLEXITY: MEDIUM
 * CONVERSION APPROACH: Use react-native-collapsible or Animated API
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-collapsible → react-native-collapsible or react-native-reanimated
 * 
 * RECOMMENDED PACKAGES:
 * - react-native-collapsible (simple, battle-tested)
 * - react-native-reanimated (for custom animations)
 * - react-native-animatable (alternative)
 * 
 * KEY CONVERSION NOTES:
 * 1. Radix provides accessibility and keyboard navigation
 * 2. React Native needs explicit animation for height changes
 * 3. Open/closed state managed with useState
 * 4. onPress replaces onClick for trigger
 * 5. No keyboard navigation on mobile
 * 
 * REACT NATIVE IMPLEMENTATION (react-native-collapsible):
 * ```tsx
 * import Collapsible from 'react-native-collapsible';
 * import { View, Pressable, Text } from 'react-native';
 * import { useState } from 'react';
 * 
 * interface CollapsibleProps {
 *   trigger: React.ReactNode;
 *   children: React.ReactNode;
 *   defaultOpen?: boolean;
 * }
 * 
 * export function CollapsibleComponent({
 *   trigger,
 *   children,
 *   defaultOpen = false,
 * }: CollapsibleProps) {
 *   const [isOpen, setIsOpen] = useState(defaultOpen);
 * 
 *   return (
 *     <View>
 *       <Pressable
 *         onPress={() => setIsOpen(!isOpen)}
 *         accessibilityRole="button"
 *         accessibilityState={{ expanded: isOpen }}
 *         accessibilityLabel="Toggle section"
 *       >
 *         {trigger}
 *       </Pressable>
 * 
 *       <Collapsible collapsed={!isOpen} duration={300}>
 *         {children}
 *       </Collapsible>
 *     </View>
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Reanimated - More Control):
 * ```tsx
 * import Animated, {
 *   useSharedValue,
 *   useAnimatedStyle,
 *   withTiming,
 *   useDerivedValue,
 * } from 'react-native-reanimated';
 * import { View, Pressable, LayoutChangeEvent } from 'react-native';
 * import { useState } from 'react';
 * 
 * export function CollapsibleReanimated({
 *   trigger,
 *   children,
 *   defaultOpen = false,
 * }: CollapsibleProps) {
 *   const [isOpen, setIsOpen] = useState(defaultOpen);
 *   const [contentHeight, setContentHeight] = useState(0);
 *   const height = useSharedValue(defaultOpen ? 1000 : 0);
 * 
 *   const animatedStyle = useAnimatedStyle(() => ({
 *     height: withTiming(isOpen ? contentHeight : 0, { duration: 300 }),
 *     opacity: withTiming(isOpen ? 1 : 0, { duration: 300 }),
 *     overflow: 'hidden',
 *   }));
 * 
 *   const handleLayout = (event: LayoutChangeEvent) => {
 *     const { height: measuredHeight } = event.nativeEvent.layout;
 *     if (measuredHeight > 0) {
 *       setContentHeight(measuredHeight);
 *     }
 *   };
 * 
 *   return (
 *     <View>
 *       <Pressable
 *         onPress={() => setIsOpen(!isOpen)}
 *         accessibilityRole="button"
 *         accessibilityState={{ expanded: isOpen }}
 *       >
 *         {trigger}
 *       </Pressable>
 * 
 *       <Animated.View style={animatedStyle}>
 *         <View onLayout={handleLayout}>{children}</View>
 *       </Animated.View>
 *     </View>
 *   );
 * }
 * ```
 * 
 * USAGE EXAMPLE:
 * ```tsx
 * // Web
 * <Collapsible>
 *   <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
 *   <CollapsibleContent>Hidden content here</CollapsibleContent>
 * </Collapsible>
 * 
 * // React Native
 * <CollapsibleComponent
 *   trigger={
 *     <View style={styles.trigger}>
 *       <Text>Click to expand</Text>
 *       <Icon name={isOpen ? "chevron-up" : "chevron-down"} />
 *     </View>
 *   }
 * >
 *   <View style={styles.content}>
 *     <Text>Hidden content here</Text>
 *   </View>
 * </CollapsibleComponent>
 * ```
 * 
 * ACCESSIBILITY:
 * - accessibilityRole="button" for trigger
 * - accessibilityState={{ expanded: isOpen }} to announce state
 * - accessibilityLabel describing collapsible section
 * - Use accessibilityLiveRegion="polite" for dynamic content
 * - Ensure minimum touch target size 44x44 for trigger
 * 
 * ANIMATION CONSIDERATIONS:
 * - Duration: 200-300ms for natural feel
 * - Easing: Use spring or ease-in-out
 * - Height measurement: onLayout event for dynamic content
 * - Performance: Use native driver for transform/opacity
 * - Avoid: Animating height on native driver (not supported)
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - FAQ sections: Question/answer expandable cards
 * - Property details: Expandable sections for features, history
 * - Inspection reports: Collapsible finding categories
 * - Filter panels: Expandable filter groups
 * - Settings: Collapsible preference sections
 * - Document viewer: Expandable document metadata
 * 
 * STYLING NOTES:
 * - Apply card styling to collapsed state
 * - Use subtle border/shadow changes on expand
 * - Icon rotation animation (rotate 180deg)
 * - Content padding: Add padding inside CollapsibleContent
 * - Glass effect: Apply to trigger, not animated container
 * 
 * STATE MANAGEMENT:
 * - Local state for single collapsible
 * - Context for accordion behavior (one open at a time)
 * - Zustand for persistent state across navigation
 * - URL state for deep-linkable expanded sections
 * 
 * PERFORMANCE:
 * - Use shouldComponentUpdate for static content
 * - Lazy render content (only when opened)
 * - Memoize trigger and content
 * - Avoid re-renders during animation
 */

"use client";

// WEB: Radix UI for accessible collapsible with keyboard support
// REACT NATIVE: Use react-native-collapsible or react-native-reanimated
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible@1.1.3";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  // WEB: Root container managing open/closed state
  // REACT NATIVE: View with useState for isOpen state
  // const [isOpen, setIsOpen] = useState(false);
  // <View {...props}>
  //   {/* Trigger and content */}
  // </View>
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
  // REACT NATIVE: Remove data-slot, use testID="collapsible"
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  // WEB: Button that toggles collapsible state
  // REACT NATIVE: Pressable with onPress to toggle isOpen
  // <Pressable
  //   onPress={() => setIsOpen(!isOpen)}
  //   accessibilityRole="button"
  //   accessibilityState={{ expanded: isOpen }}
  //   {...props}
  // >
  //   {children}
  // </Pressable>
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  // WEB: Animated content area with height transition
  // REACT NATIVE: Animated.View or Collapsible component
  // Using react-native-collapsible:
  // <Collapsible collapsed={!isOpen} duration={300}>
  //   {children}
  // </Collapsible>
  // 
  // Using react-native-reanimated:
  // <Animated.View style={[{ overflow: 'hidden' }, animatedStyle]}>
  //   <View onLayout={handleLayout}>{children}</View>
  // </Animated.View>
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
