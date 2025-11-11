/**
 * ==============================================================================
 * POPOVER.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * ✅ Use Modal with NativeWind! All Tailwind classes work!
 * 
 * ```tsx
 * <Modal visible={open} transparent onRequestClose={close}>
 *   <Pressable className="flex-1 bg-black/50 items-center justify-center" onPress={close}>
 *     <View className="bg-pa-dark rounded-xl p-4 border border-white/10">
 *       {/* Content with all Tailwind classes */}
 *     </View>
 *   </Pressable>
 * </Modal>
 * ```
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * COMPLEXITY: MEDIUM-HIGH
 * Popover displays floating content anchored to a trigger element.
 * 
 * CONVERSION STRATEGY:
 * 1. Use Modal for overlay behavior
 * 2. Calculate position relative to trigger element
 * 3. Use Portal for rendering outside parent
 * 4. Add tap outside to dismiss
 * 5. Smart positioning to stay within screen bounds
 * 
 * KEY DIFFERENCES:
 * - Modal instead of DOM portal
 * - Manual position calculation needed
 * - measureInWindow() for trigger position
 * - Dimensions API for screen boundaries
 * - Keyboard awareness for text inputs
 * 
 * RECOMMENDED LIBRARIES:
 * - react-native-popover-view (full-featured, recommended)
 * - react-native-popper (positioning utility)
 * - @gorhom/bottom-sheet (alternative for mobile-first UX)
 * - react-native-modal (enhanced Modal component)
 * 
 * MOBILE-FIRST ALTERNATIVES:
 * - Bottom Sheet: Better UX for mobile (easier to reach with thumb)
 * - Full Modal: For complex content
 * - Inline expansion: Instead of floating overlay
 * 
 * EXAMPLE CONVERSION:
 * 
 * Web:
 * <Popover>
 *   <PopoverTrigger>Click me</PopoverTrigger>
 *   <PopoverContent>Detailed information</PopoverContent>
 * </Popover>
 * 
 * React Native:
 * <Popover content={<DetailedInfo />}>
 *   <Pressable onPress={() => setOpen(true)}>
 *     <Text>Tap me</Text>
 *   </Pressable>
 * </Popover>
 */

"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover@1.1.6";

import { cn } from "./utils";

/**
 * RN: Popover Root Component
 * 
 * CONVERSION NOTES:
 * - Manages open/closed state
 * - Wraps trigger and content
 * - Provides context for positioning
 * 
 * STATE MANAGEMENT:
 * const [open, setOpen] = useState(false);
 * const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
 * const triggerRef = useRef<View>(null);
 * 
 * PROPS:
 * - open?: boolean (controlled)
 * - onOpenChange?: (open: boolean) => void
 * - defaultOpen?: boolean
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
  // RN: Manage state
  // RN: const [open, setOpen] = useState(defaultOpen || false);
  // RN: const [position, setPosition] = useState({ x: 0, y: 0 });
}

/**
 * RN: PopoverTrigger Component
 * 
 * CONVERSION NOTES:
 * - Pressable that opens popover on press
 * - Measures its position for content placement
 * - Stores reference for positioning
 * 
 * POSITION MEASUREMENT:
 * const measureTrigger = () => {
 *   triggerRef.current?.measureInWindow((x, y, width, height) => {
 *     setPosition({ x, y, width, height });
 *     setOpen(true);
 *   });
 * };
 * 
 * RENDER:
 * <Pressable
 *   ref={triggerRef}
 *   onPress={measureTrigger}
 *   accessibilityRole="button"
 *   accessibilityState={{ expanded: open }}
 * >
 *   {children}
 * </Pressable>
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
  // RN: Replace with Pressable
  // RN: <Pressable
  // RN:   ref={triggerRef}
  // RN:   onPress={handlePress}
  // RN:   accessibilityRole="button"
  // RN:   accessibilityState={{ expanded: open }}
  // RN: >
  // RN:   {children}
  // RN: </Pressable>
}

/**
 * RN: PopoverContent Component
 * 
 * CONVERSION NOTES:
 * - Render in Modal or Portal
 * - Calculate smart positioning
 * - Animate entrance/exit
 * - Handle tap outside to dismiss
 * - Adjust position for keyboard
 * 
 * TAILWIND CLASS CONVERSION:
 * - bg-popover → { backgroundColor: colors.popover }
 * - text-popover-foreground → { color: colors.popoverForeground }
 * - data-[state=open]:animate-in → Entrance animation
 * - data-[state=closed]:animate-out → Exit animation
 * - fade-in-0 zoom-in-95 → { opacity: 0, scale: 0.95 } → { opacity: 1, scale: 1 }
 * - slide-in-from-top-2 → Slide animation based on placement
 * - z-50 → { zIndex: 50 }
 * - w-72 → { width: 288 } (or adjust for content)
 * - origin → Not needed (use anchor point)
 * - rounded-md → { borderRadius: 6 }
 * - border → { borderWidth: 1, borderColor: colors.border }
 * - p-4 → { padding: 16 }
 * - shadow-md → Platform-specific shadow
 * - outline-hidden → Not applicable
 * 
 * POSITIONING LOGIC:
 * const calculatePosition = () => {
 *   const { x, y, width, height } = triggerPosition;
 *   const screenWidth = Dimensions.get('window').width;
 *   const screenHeight = Dimensions.get('window').height;
 *   const popoverWidth = 288;
 *   const popoverHeight = 200; // Estimated or measured
 *   const offset = 4; // sideOffset
 *   
 *   let posX = x;
 *   let posY = y;
 *   
 *   // Default: bottom center
 *   switch (align) {
 *     case 'center':
 *       posX = x + width / 2 - popoverWidth / 2;
 *       break;
 *     case 'start':
 *       posX = x;
 *       break;
 *     case 'end':
 *       posX = x + width - popoverWidth;
 *       break;
 *   }
 *   
 *   // Vertical position (default bottom)
 *   posY = y + height + offset;
 *   
 *   // Check if popover would go off screen
 *   if (posY + popoverHeight > screenHeight) {
 *     // Show above trigger instead
 *     posY = y - popoverHeight - offset;
 *   }
 *   
 *   // Keep within horizontal bounds
 *   posX = Math.max(8, Math.min(posX, screenWidth - popoverWidth - 8));
 *   
 *   return { x: posX, y: posY };
 * };
 * 
 * KEYBOARD HANDLING:
 * import { KeyboardAvoidingView, Platform } from 'react-native';
 * 
 * <KeyboardAvoidingView
 *   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
 * >
 *   {/* Popover content */}
 * </KeyboardAvoidingView>
 * 
 * TAP OUTSIDE TO DISMISS:
 * <Modal
 *   visible={open}
 *   transparent
 *   animationType="none"
 *   onRequestClose={() => setOpen(false)}
 * >
 *   <Pressable
 *     style={StyleSheet.absoluteFill}
 *     onPress={() => setOpen(false)}
 *   >
 *     <Animated.View
 *       style={[styles.popover, positionStyle]}
 *       onStartShouldSetResponder={() => true}
 *     >
 *       {children}
 *     </Animated.View>
 *   </Pressable>
 * </Modal>
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      {/* RN: Replace with Modal + Portal */}
      {/* RN: import { Portal } from '@gorhom/portal'; */}
      {/* RN: <Modal visible={open} transparent animationType="fade"> */}
      {/* RN:   <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}> */}
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        // RN: Use align for horizontal positioning (start, center, end)
        sideOffset={sideOffset}
        // RN: Distance from trigger element
        // RN: <Animated.View
        // RN:   entering={FadeIn.combine(ZoomIn)}
        // RN:   exiting={FadeOut.combine(ZoomOut)}
        // RN:   style={[styles.popover, calculatePosition()]}
        // RN:   onStartShouldSetResponder={() => true}
        // RN: >
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
      {/* RN: </Animated.View> */}
      {/* RN:   </Pressable> */}
      {/* RN: </Modal> */}
    </PopoverPrimitive.Portal>
  );
}

/**
 * RN: PopoverAnchor Component
 * 
 * CONVERSION NOTES:
 * - Alternative anchor point for positioning
 * - Useful when trigger and anchor are different elements
 * - Rarely needed on mobile
 * 
 * IMPLEMENTATION:
 * const anchorRef = useRef<View>(null);
 * 
 * Use anchorRef instead of triggerRef for position measurement
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
  // RN: View with ref for positioning
  // RN: <View ref={anchorRef}>{children}</View>
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * import React, { useState, useRef } from 'react';
 * import {
 *   View,
 *   Text,
 *   Pressable,
 *   Modal,
 *   StyleSheet,
 *   Dimensions,
 *   Platform,
 * } from 'react-native';
 * import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
 * import { Portal } from '@gorhom/portal';
 * 
 * type PopoverAlign = 'start' | 'center' | 'end';
 * type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
 * 
 * interface PopoverProps {
 *   trigger: React.ReactNode;
 *   content: React.ReactNode;
 *   align?: PopoverAlign;
 *   side?: PopoverSide;
 *   sideOffset?: number;
 *   onOpenChange?: (open: boolean) => void;
 * }
 * 
 * export const Popover: React.FC<PopoverProps> = ({
 *   trigger,
 *   content,
 *   align = 'center',
 *   side = 'bottom',
 *   sideOffset = 4,
 *   onOpenChange,
 * }) => {
 *   const [open, setOpen] = useState(false);
 *   const [position, setPosition] = useState({ x: 0, y: 0 });
 *   const [contentSize, setContentSize] = useState({ width: 288, height: 200 });
 *   const triggerRef = useRef<View>(null);
 *   
 *   const calculatePosition = (triggerRect: {
 *     x: number;
 *     y: number;
 *     width: number;
 *     height: number;
 *   }) => {
 *     const { x, y, width, height } = triggerRect;
 *     const screenWidth = Dimensions.get('window').width;
 *     const screenHeight = Dimensions.get('window').height;
 *     const { width: popoverWidth, height: popoverHeight } = contentSize;
 *     
 *     let posX = x;
 *     let posY = y;
 *     
 *     // Horizontal alignment
 *     switch (align) {
 *       case 'start':
 *         posX = x;
 *         break;
 *       case 'center':
 *         posX = x + width / 2 - popoverWidth / 2;
 *         break;
 *       case 'end':
 *         posX = x + width - popoverWidth;
 *         break;
 *     }
 *     
 *     // Vertical placement
 *     switch (side) {
 *       case 'top':
 *         posY = y - popoverHeight - sideOffset;
 *         break;
 *       case 'bottom':
 *         posY = y + height + sideOffset;
 *         break;
 *       case 'left':
 *         posX = x - popoverWidth - sideOffset;
 *         posY = y + height / 2 - popoverHeight / 2;
 *         break;
 *       case 'right':
 *         posX = x + width + sideOffset;
 *         posY = y + height / 2 - popoverHeight / 2;
 *         break;
 *     }
 *     
 *     // Auto-adjust if off screen
 *     if (posY + popoverHeight > screenHeight - 16) {
 *       posY = y - popoverHeight - sideOffset;
 *     }
 *     if (posY < 16) {
 *       posY = y + height + sideOffset;
 *     }
 *     
 *     // Keep within horizontal bounds
 *     posX = Math.max(8, Math.min(posX, screenWidth - popoverWidth - 8));
 *     
 *     return { x: posX, y: posY };
 *   };
 *   
 *   const handleOpen = () => {
 *     triggerRef.current?.measureInWindow((x, y, width, height) => {
 *       const pos = calculatePosition({ x, y, width, height });
 *       setPosition(pos);
 *       setOpen(true);
 *       onOpenChange?.(true);
 *     });
 *   };
 *   
 *   const handleClose = () => {
 *     setOpen(false);
 *     onOpenChange?.(false);
 *   };
 *   
 *   return (
 *     <>
 *       <View ref={triggerRef} collapsable={false}>
 *         <Pressable
 *           onPress={handleOpen}
 *           accessibilityRole="button"
 *           accessibilityState={{ expanded: open }}
 *         >
 *           {trigger}
 *         </Pressable>
 *       </View>
 *       
 *       {open && (
 *         <Portal>
 *           <Modal
 *             visible={open}
 *             transparent
 *             animationType="none"
 *             onRequestClose={handleClose}
 *             statusBarTranslucent
 *           >
 *             <Pressable
 *               style={StyleSheet.absoluteFill}
 *               onPress={handleClose}
 *             >
 *               <Animated.View
 *                 entering={FadeIn.duration(200).combine(ZoomIn.duration(200))}
 *                 exiting={FadeOut.duration(150).combine(ZoomOut.duration(150))}
 *                 style={[
 *                   styles.popover,
 *                   {
 *                     top: position.y,
 *                     left: position.x,
 *                   },
 *                 ]}
 *                 onStartShouldSetResponder={() => true}
 *                 onLayout={(e) => {
 *                   const { width, height } = e.nativeEvent.layout;
 *                   setContentSize({ width, height });
 *                 }}
 *               >
 *                 {content}
 *               </Animated.View>
 *             </Pressable>
 *           </Modal>
 *         </Portal>
 *       )}
 *     </>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   popover: {
 *     position: 'absolute',
 *     backgroundColor: colors.popover,
 *     borderRadius: 6,
 *     borderWidth: 1,
 *     borderColor: colors.border,
 *     padding: 16,
 *     width: 288,
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: '#000',
 *         shadowOffset: { width: 0, height: 4 },
 *         shadowOpacity: 0.15,
 *         shadowRadius: 12,
 *       },
 *       android: {
 *         elevation: 8,
 *       },
 *     }),
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic popover
 * <Popover
 *   trigger={<Button>Options</Button>}
 *   content={
 *     <View>
 *       <Text style={styles.title}>Quick Actions</Text>
 *       <Button onPress={() => {}}>Edit</Button>
 *       <Button onPress={() => {}}>Delete</Button>
 *     </View>
 *   }
 * />
 * 
 * // Filter popover
 * <Popover
 *   trigger={
 *     <Pressable style={styles.filterButton}>
 *       <Filter size={20} />
 *       <Text>Filter</Text>
 *     </Pressable>
 *   }
 *   content={
 *     <View style={styles.filterContent}>
 *       <Text style={styles.filterTitle}>Filter Properties</Text>
 *       <CheckboxField label="Single Family" />
 *       <CheckboxField label="Condo" />
 *       <CheckboxField label="Townhouse" />
 *       <Button onPress={handleApplyFilters}>Apply</Button>
 *     </View>
 *   }
 *   align="end"
 * />
 * 
 * // User profile popover
 * <Popover
 *   trigger={
 *     <Pressable>
 *       <Avatar src={user.avatar} />
 *     </Pressable>
 *   }
 *   content={
 *     <View style={styles.profilePopover}>
 *       <View style={styles.profileHeader}>
 *         <Avatar src={user.avatar} size={48} />
 *         <View>
 *           <Text style={styles.profileName}>{user.name}</Text>
 *           <Text style={styles.profileEmail}>{user.email}</Text>
 *         </View>
 *       </View>
 *       <Separator />
 *       <MenuItem icon={<User />} label="Profile" onPress={() => {}} />
 *       <MenuItem icon={<Settings />} label="Settings" onPress={() => {}} />
 *       <MenuItem icon={<LogOut />} label="Sign out" onPress={() => {}} />
 *     </View>
 *   }
 *   align="end"
 * />
 * 
 * // USING LIBRARY (react-native-popover-view):
 * import Popover from 'react-native-popover-view';
 * 
 * <Popover
 *   from={(
 *     <Pressable>
 *       <Text>Show Popover</Text>
 *     </Pressable>
 *   )}
 * >
 *   <View style={styles.popoverContent}>
 *     <Text>This is the popover content</Text>
 *   </View>
 * </Popover>
 * 
 * // ALTERNATIVE: BOTTOM SHEET (Better for mobile UX)
 * import BottomSheet from '@gorhom/bottom-sheet';
 * 
 * const FilterBottomSheet = () => {
 *   const bottomSheetRef = useRef<BottomSheet>(null);
 *   
 *   return (
 *     <>
 *       <Button onPress={() => bottomSheetRef.current?.expand()}>
 *         Open Filters
 *       </Button>
 *       
 *       <BottomSheet
 *         ref={bottomSheetRef}
 *         index={-1}
 *         snapPoints={['50%', '90%']}
 *       >
 *         <View style={styles.sheetContent}>
 *           <Text style={styles.sheetTitle}>Filters</Text>
 *           {/* Filter options */}
 *         </View>
 *       </BottomSheet>
 *     </>
 *   );
 * };
 */

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
