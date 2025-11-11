/**
 * REACT NATIVE CONVERSION - Scroll Area Component
 * 
 * COMPLEXITY: LOW
 * CONVERSION APPROACH: Use ScrollView or FlatList (already native to RN)
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-scroll-area → ScrollView, FlatList, or SectionList
 * 
 * KEY CONVERSION NOTES:
 * 1. React Native has built-in scrolling components
 * 2. ScrollView for basic scrolling
 * 3. FlatList for lists with virtualization
 * 4. SectionList for grouped data
 * 5. Custom scrollbar styling is limited on mobile
 * 
 * REACT NATIVE IMPLEMENTATION (ScrollView):
 * ```tsx
 * import { ScrollView, StyleSheet } from 'react-native';
 * 
 * interface ScrollAreaProps {
 *   children: React.ReactNode;
 *   horizontal?: boolean;
 *   showsHorizontalScrollIndicator?: boolean;
 *   showsVerticalScrollIndicator?: boolean;
 * }
 * 
 * export function ScrollArea({
 *   children,
 *   horizontal = false,
 *   showsHorizontalScrollIndicator = false,
 *   showsVerticalScrollIndicator = true,
 * }: ScrollAreaProps) {
 *   return (
 *     <ScrollView
 *       horizontal={horizontal}
 *       showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
 *       showsVerticalScrollIndicator={showsVerticalScrollIndicator}
 *       contentContainerStyle={styles.contentContainer}
 *       style={styles.scrollView}
 *     >
 *       {children}
 *     </ScrollView>
 *   );
 * }
 * 
 * const styles = StyleSheet.create({
 *   scrollView: {
 *     flex: 1,
 *   },
 *   contentContainer: {
 *     flexGrow: 1,
 *   },
 * });
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (FlatList for Performance):
 * ```tsx
 * import { FlatList, View, Text } from 'react-native';
 * 
 * interface ScrollAreaListProps<T> {
 *   data: T[];
 *   renderItem: (item: T, index: number) => React.ReactNode;
 *   keyExtractor: (item: T, index: number) => string;
 * }
 * 
 * export function ScrollAreaList<T>({
 *   data,
 *   renderItem,
 *   keyExtractor,
 * }: ScrollAreaListProps<T>) {
 *   return (
 *     <FlatList
 *       data={data}
 *       renderItem={({ item, index }) => renderItem(item, index)}
 *       keyExtractor={keyExtractor}
 *       showsVerticalScrollIndicator={true}
 *       removeClippedSubviews={true} // Performance optimization
 *       maxToRenderPerBatch={10}
 *       windowSize={10}
 *       initialNumToRender={10}
 *     />
 *   );
 * }
 * ```
 * 
 * HORIZONTAL SCROLL:
 * ```tsx
 * export function HorizontalScrollArea({ children }: { children: React.ReactNode }) {
 *   return (
 *     <ScrollView
 *       horizontal
 *       showsHorizontalScrollIndicator={false}
 *       contentContainerStyle={{
 *         paddingHorizontal: 16,
 *         gap: 12,
 *       }}
 *     >
 *       {children}
 *     </ScrollView>
 *   );
 * }
 * ```
 * 
 * STYLED SCROLLBAR (LIMITED):
 * ```tsx
 * // iOS: Can customize indicator color
 * <ScrollView
 *   indicatorStyle="white" // 'default', 'black', or 'white'
 * />
 * 
 * // Android: Limited customization
 * // Use react-native-scrollable-tab-view for custom scrollbars
 * ```
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - Property list: Use FlatList with virtualization
 * - Document viewer: Use ScrollView for content
 * - Gallery: Use FlatList with numColumns for grid
 * - Chat: Use inverted FlatList for messages
 * - Settings: Use ScrollView for form
 * - Dashboard cards: Horizontal ScrollView
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * ```tsx
 * // For lists, always use FlatList:
 * <FlatList
 *   data={items}
 *   renderItem={({ item }) => <PropertyCard property={item} />}
 *   keyExtractor={(item) => item.id}
 *   // Performance props
 *   removeClippedSubviews={true}
 *   maxToRenderPerBatch={10}
 *   windowSize={10}
 *   initialNumToRender={10}
 *   getItemLayout={(data, index) => ({
 *     length: ITEM_HEIGHT,
 *     offset: ITEM_HEIGHT * index,
 *     index,
 *   })}
 * />
 * ```
 * 
 * SCROLL TO TOP:
 * ```tsx
 * import { useRef } from 'react';
 * 
 * const scrollViewRef = useRef<ScrollView>(null);
 * 
 * const scrollToTop = () => {
 *   scrollViewRef.current?.scrollTo({ y: 0, animated: true });
 * };
 * 
 * <ScrollView ref={scrollViewRef}>
 *   {content}
 * </ScrollView>
 * ```
 * 
 * ACCESSIBILITY:
 * - ScrollView is automatically accessible
 * - Use accessibilityLabel for context
 * - Ensure scrollable content is keyboard navigable
 * - Announce dynamic content with accessibilityLiveRegion
 * 
 * GESTURE HANDLING:
 * - ScrollView handles pan gestures automatically
 * - Use onScroll for scroll events
 * - scrollEventThrottle for performance
 * - Use Animated.event for animated headers
 */

"use client";

import * as React from "react";
// WEB: Radix UI for custom scrollbar styling
// REACT NATIVE: Use ScrollView, FlatList, or SectionList (built-in)
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area@1.2.3";

import { cn } from "./utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  // WEB: Custom scrollable area with styled scrollbars
  // REACT NATIVE: Use ScrollView:
  // import { ScrollView } from 'react-native';
  // 
  // <ScrollView
  //   showsVerticalScrollIndicator={true}
  //   indicatorStyle="white" // iOS only: 'default', 'black', or 'white'
  //   style={{ flex: 1 }}
  //   contentContainerStyle={{ flexGrow: 1 }}
  // >
  //   {children}
  // </ScrollView>
  // 
  // For lists, use FlatList for better performance:
  // <FlatList
  //   data={items}
  //   renderItem={({ item }) => <Item item={item} />}
  //   keyExtractor={(item) => item.id}
  //   showsVerticalScrollIndicator={true}
  //   removeClippedSubviews={true}
  // />
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
        // REACT NATIVE: ScrollView is the viewport
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  // WEB: Custom styled scrollbar
  // REACT NATIVE: Native scrollbar (limited customization)
  // iOS: Can set indicatorStyle prop
  // Android: Uses system scrollbar
  // 
  // For custom scrollbar, use third-party library:
  // - react-native-scrollable-tab-view
  // - react-native-scroll-indicator
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
        // REACT NATIVE: Native thumb styling not customizable
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
