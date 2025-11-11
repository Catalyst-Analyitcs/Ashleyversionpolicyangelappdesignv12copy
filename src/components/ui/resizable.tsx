/**
 * REACT NATIVE CONVERSION - Resizable Component
 * 
 * COMPLEXITY: HIGH
 * CONVERSION APPROACH: Generally not used on mobile - use fixed layouts instead
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - react-resizable-panels → Not applicable on mobile (use fixed/flexible layouts)
 * - lucide-react → react-native-vector-icons
 * 
 * KEY CONVERSION NOTES:
 * 1. Resizable panels are primarily a desktop pattern
 * 2. Mobile uses fixed layouts with scrolling instead
 * 3. If needed: Use PanResponder for drag gestures
 * 4. Split views exist on tablets (iOS SplitView)
 * 5. Consider collapsible sections instead of resizing
 * 
 * MOBILE ALTERNATIVES:
 * 1. **Scrollable Sections**: Stack content vertically with ScrollView
 * 2. **Tabs**: Switch between views instead of side-by-side
 * 3. **Collapsible Sections**: Accordion-style expandable content
 * 4. **Bottom Sheet**: Draggable overlay for secondary content
 * 5. **Modal**: Temporary full-screen view for details
 * 
 * REACT NATIVE IMPLEMENTATION (Bottom Sheet Alternative):
 * ```tsx
 * import { useRef } from 'react';
 * import BottomSheet from '@gorhom/bottom-sheet';
 * import { View } from 'react-native';
 * 
 * export function ResizableBottomSheet({ children }: { children: React.ReactNode }) {
 *   const bottomSheetRef = useRef<BottomSheet>(null);
 *   const snapPoints = ['25%', '50%', '90%'];
 * 
 *   return (
 *     <BottomSheet
 *       ref={bottomSheetRef}
 *       snapPoints={snapPoints}
 *       enablePanDownToClose={false}
 *       backgroundStyle={{
 *         backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *       }}
 *       handleIndicatorStyle={{
 *         backgroundColor: 'rgba(255, 255, 255, 0.3)',
 *       }}
 *     >
 *       <View style={{ flex: 1, padding: 16 }}>
 *         {children}
 *       </View>
 *     </BottomSheet>
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Draggable Divider):
 * ```tsx
 * import { View, PanResponder, Dimensions } from 'react-native';
 * import { useState, useRef } from 'react';
 * 
 * const { height: screenHeight } = Dimensions.get('window');
 * 
 * export function ResizablePanels({
 *   topContent,
 *   bottomContent,
 * }: {
 *   topContent: React.ReactNode;
 *   bottomContent: React.ReactNode;
 * }) {
 *   const [dividerPosition, setDividerPosition] = useState(screenHeight / 2);
 * 
 *   const panResponder = useRef(
 *     PanResponder.create({
 *       onStartShouldSetPanResponder: () => true,
 *       onMoveShouldSetPanResponder: () => true,
 *       onPanResponderMove: (_, gestureState) => {
 *         const newPosition = dividerPosition + gestureState.dy;
 *         // Constrain between 20% and 80% of screen height
 *         const minPosition = screenHeight * 0.2;
 *         const maxPosition = screenHeight * 0.8;
 *         setDividerPosition(
 *           Math.max(minPosition, Math.min(maxPosition, newPosition))
 *         );
 *       },
 *     })
 *   ).current;
 * 
 *   return (
 *     <View style={{ flex: 1 }}>
 *       {/* Top Panel *}
 *       <View style={{ height: dividerPosition }}>
 *         {topContent}
 *       </View>
 * 
 *       {/* Draggable Divider *}
 *       <View
 *         {...panResponder.panHandlers}
 *         style={styles.divider}
 *       >
 *         <View style={styles.dividerHandle} />
 *       </View>
 * 
 *       {/* Bottom Panel *}
 *       <View style={{ flex: 1 }}>
 *         {bottomContent}
 *       </View>
 *     </View>
 *   );
 * }
 * 
 * const styles = {
 *   divider: {
 *     height: 20,
 *     backgroundColor: 'rgba(255, 255, 255, 0.05)',
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     borderTopWidth: 1,
 *     borderBottomWidth: 1,
 *     borderColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   dividerHandle: {
 *     width: 40,
 *     height: 4,
 *     borderRadius: 2,
 *     backgroundColor: 'rgba(255, 255, 255, 0.3)',
 *   },
 * };
 * ```
 * 
 * TABLET SPLIT VIEW (iPad):
 * ```tsx
 * import { useWindowDimensions, View } from 'react-native';
 * 
 * export function TabletSplitView({
 *   leftContent,
 *   rightContent,
 * }: {
 *   leftContent: React.ReactNode;
 *   rightContent: React.ReactNode;
 * }) {
 *   const { width } = useWindowDimensions();
 *   const isTablet = width >= 768;
 * 
 *   if (!isTablet) {
 *     // Stack vertically on phone
 *     return (
 *       <View style={{ flex: 1 }}>
 *         {leftContent}
 *         {rightContent}
 *       </View>
 *     );
 *   }
 * 
 *   // Side by side on tablet
 *   return (
 *     <View style={{ flex: 1, flexDirection: 'row' }}>
 *       <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.1)' }}>
 *         {leftContent}
 *       </View>
 *       <View style={{ flex: 1 }}>
 *         {rightContent}
 *       </View>
 *     </View>
 *   );
 * }
 * ```
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - Property details + Map: Use tabs or bottom sheet for map
 * - Document viewer + Details: Tabs or modal for details
 * - Chat + Property info: Bottom sheet for chat
 * - Comparison view: Horizontal ScrollView with cards
 * - Master-detail: Stack navigation instead of split view
 * 
 * WHEN TO USE ALTERNATIVES:
 * 1. **Phone**: Never use resizable panels - use stack/tabs
 * 2. **Tablet Portrait**: Use tabs or bottom sheet
 * 3. **Tablet Landscape**: Fixed split view (50/50 or 60/40)
 * 4. **Desktop**: Original resizable panels work
 * 
 * ACCESSIBILITY:
 * - Ensure draggable handle is large enough (44x44 points)
 * - accessibilityRole="adjustable" for resizable divider
 * - accessibilityActions for increment/decrement size
 * - Announce size changes with accessibilityLiveRegion
 * 
 * GESTURES:
 * - PanResponder for drag handling
 * - Constrain min/max sizes
 * - Snap to predefined positions
 * - Haptic feedback on snap points
 * - Smooth animation when releasing
 * 
 * PERFORMANCE:
 * - Use native driver for animations when possible
 * - Avoid re-rendering content during drag
 * - Use InteractionManager for heavy updates
 * - Consider LayoutAnimation for smooth resizing
 */

"use client";

import * as React from "react";
// WEB: Lucide icons for resize handle
// REACT NATIVE: react-native-vector-icons or custom grip icon
import { GripVerticalIcon } from "lucide-react@0.487.0";
// WEB: react-resizable-panels for resizable layouts
// REACT NATIVE: Not applicable - use alternatives like BottomSheet or fixed layouts
import * as ResizablePrimitive from "react-resizable-panels@2.1.7";

import { cn } from "./utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  // WEB: Container for resizable panels
  // REACT NATIVE: Resizable panels not common on mobile
  // 
  // Alternatives:
  // 1. Fixed split view for tablets:
  //    <View style={{ flexDirection: 'row', flex: 1 }}>
  //      <View style={{ flex: 1 }}>{leftPanel}</View>
  //      <View style={{ flex: 1 }}>{rightPanel}</View>
  //    </View>
  // 
  // 2. Bottom sheet for secondary content:
  //    import BottomSheet from '@gorhom/bottom-sheet';
  //    <BottomSheet snapPoints={['25%', '50%', '90%']}>
  //      {content}
  //    </BottomSheet>
  // 
  // 3. Tabs for switching between views:
  //    <Tab.Navigator>
  //      <Tab.Screen name="Panel1" />
  //      <Tab.Screen name="Panel2" />
  //    </Tab.Navigator>
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  // WEB: Individual resizable panel
  // REACT NATIVE: View with flex sizing
  // <View style={{ flex: 1 }}>
  //   {content}
  // </View>
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  // WEB: Draggable handle between panels
  // REACT NATIVE: If implementing custom resize, use PanResponder
  // 
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderMove: (_, gestureState) => {
  //       // Update panel sizes based on gesture
  //       const delta = gestureState.dy; // or dx for horizontal
  //       updatePanelSizes(delta);
  //     },
  //   })
  // ).current;
  // 
  // <View
  //   {...panResponder.panHandlers}
  //   style={{
  //     height: 20,
  //     backgroundColor: 'rgba(255, 255, 255, 0.05)',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   }}
  //   accessibilityRole="adjustable"
  //   accessibilityLabel="Resize panels"
  // >
  //   <View
  //     style={{
  //       width: 40,
  //       height: 4,
  //       borderRadius: 2,
  //       backgroundColor: 'rgba(255, 255, 255, 0.3)',
  //     }}
  //   />
  // </View>
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
          {/* REACT NATIVE: Use Icon or custom grip View */}
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
