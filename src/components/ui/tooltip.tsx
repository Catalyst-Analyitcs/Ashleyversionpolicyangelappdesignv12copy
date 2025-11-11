/**
 * REACT NATIVE CONVERSION - TOOLTIP COMPONENT
 * ============================================
 * 
 * COMPLEXITY: MEDIUM
 * Tooltip provides contextual information on long-press (mobile doesn't have hover).
 * 
 * CONVERSION STRATEGY:
 * 1. Replace hover trigger with long-press gesture
 * 2. Use Modal or Overlay for tooltip display
 * 3. Position tooltip relative to trigger element
 * 4. Add dismissal on tap outside or timeout
 * 5. Use Popper for smart positioning (avoid screen edges)
 * 
 * KEY DIFFERENCES:
 * - Mobile has no hover → use long-press instead
 * - Touch instead of mouse positioning
 * - Should auto-dismiss after timeout
 * - Larger touch targets needed (44x44 minimum)
 * - Portal positioning with react-native-portal
 * 
 * MOBILE UX CONSIDERATIONS:
 * - Tooltips are less common on mobile (consider alternatives)
 * - Long-press may conflict with other gestures
 * - Alternative: Info icon that opens modal
 * - Alternative: Inline help text
 * - Use sparingly - prefer visible help text
 * 
 * RECOMMENDED LIBRARIES:
 * - react-native-walkthrough-tooltip (ready-made solution)
 * - react-native-portal (for overlay positioning)
 * - @gorhom/portal (modern portal implementation)
 * - react-native-popover-view (similar functionality)
 * 
 * EXAMPLE CONVERSION:
 * 
 * Web (hover):
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Helpful info</TooltipContent>
 * </Tooltip>
 * 
 * React Native (long-press):
 * <Tooltip content="Helpful info">
 *   <Pressable onLongPress={() => setVisible(true)}>
 *     <Text>Press and hold</Text>
 *   </Pressable>
 * </Tooltip>
 */

"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip@1.1.8";

import { cn } from "./utils";

/**
 * RN: TooltipProvider Component
 * 
 * CONVERSION NOTES:
 * - Radix UI uses Provider for tooltip context
 * - React Native: Create context for tooltip state management
 * - Track active tooltip to prevent multiple showing
 * - Handle auto-dismiss timeout globally
 * 
 * PROPS MAPPING:
 * - delayDuration → Not applicable on mobile (instant show on long-press)
 * 
 * RN CONTEXT IMPLEMENTATION:
 * const TooltipContext = createContext({
 *   activeTooltip: null,
 *   showTooltip: (id: string) => {},
 *   hideTooltip: () => {},
 * });
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      // RN: Replace with Context Provider
      // RN: <TooltipContext.Provider value={{ activeTooltip, showTooltip, hideTooltip }}>
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * RN: Tooltip Root Component
 * 
 * CONVERSION NOTES:
 * - Manages open/closed state
 * - Wraps trigger and content
 * - Handles positioning logic
 * 
 * STATE MANAGEMENT:
 * const [visible, setVisible] = useState(false);
 * const [position, setPosition] = useState({ x: 0, y: 0 });
 * const triggerRef = useRef(null);
 * 
 * POSITIONING:
 * Use measureInWindow to get trigger position:
 * triggerRef.current?.measureInWindow((x, y, width, height) => 
 *   setPosition({ 
 *     x: x + width / 2, 
 *     y: y - tooltipHeight 
 *   })
 * );
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
      {/* RN: Manage tooltip visibility state */}
      {/* RN: const [visible, setVisible] = useState(false); */}
    </TooltipProvider>
  );
}

/**
 * RN: TooltipTrigger Component
 * 
 * CONVERSION NOTES:
 * - Replace hover with long-press
 * - Add haptic feedback on trigger
 * - Measure position for tooltip placement
 * - Use Pressable for touch handling
 * 
 * TAILWIND CLASS CONVERSION:
 * N/A (triggers are typically unstyled wrappers)
 * 
 * GESTURE HANDLING:
 * <Pressable
 *   ref={triggerRef}
 *   onLongPress={handleLongPress}
 *   delayLongPress={500}
 *   accessibilityHint="Long press for more information"
 * >
 *   {children}
 * </Pressable>
 * 
 * const handleLongPress = () => {
 *   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
 *   measurePosition();
 *   setVisible(true);
 * };
 * 
 * ALTERNATIVE: Info Icon
 * Instead of long-press on main element, add info icon:
 * <View style={styles.row}>
 *   <Text>Label</Text>
 *   <Pressable onPress={handleInfoPress}>
 *     <Info size={16} color={colors.muted} />
 *   </Pressable>
 * </View>
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
  // RN: Replace with Pressable
  // RN: <Pressable
  // RN:   ref={triggerRef}
  // RN:   onLongPress={handleLongPress}
  // RN:   delayLongPress={500}
  // RN: >
  // RN:   {children}
  // RN: </Pressable>
}

/**
 * RN: TooltipContent Component
 * 
 * CONVERSION NOTES:
 * - Render in Portal for overlay positioning
 * - Use Modal or absolute positioning
 * - Add arrow pointing to trigger
 * - Auto-dismiss after timeout
 * - Dismiss on tap outside
 * 
 * TAILWIND CLASS CONVERSION:
 * - bg-primary → { backgroundColor: colors.primary }
 * - text-primary-foreground → { color: colors.primaryForeground }
 * - animate-in fade-in-0 zoom-in-95 → Entrance animation
 * - data-[state=closed]:animate-out → Exit animation
 * - z-50 → { zIndex: 50 }
 * - w-fit → { width: 'auto' }
 * - origin-(--radix-tooltip-content-transform-origin) → Not needed (use anchor)
 * - rounded-md → { borderRadius: 6 }
 * - px-3 py-1.5 → { paddingHorizontal: 12, paddingVertical: 6 }
 * - text-xs → { fontSize: 12 }
 * - text-balance → Not applicable
 * 
 * ARROW:
 * - bg-primary fill-primary → Match tooltip background
 * - size-2.5 → { width: 10, height: 10 }
 * - translate-y-[calc(-50%_-_2px)] → Position adjustment
 * - rotate-45 → { transform: [{ rotate: '45deg' }] }
 * - rounded-[2px] → { borderRadius: 2 }
 * 
 * PORTAL IMPLEMENTATION:
 * import { Portal } from '@gorhom/portal';
 * 
 * Conditional rendering:
 * visible && (
 *   <Portal>
 *     <Animated.View
 *       entering={FadeIn}
 *       exiting={FadeOut}
 *       style={[styles.tooltip, positionStyle]}
 *     >
 *       <Text style={styles.tooltipText}>{content}</Text>
 *       <View style={styles.arrow} />
 *     </Animated.View>
 *   </Portal>
 * )
 * 
 * AUTO-DISMISS:
 * useEffect(() => (
 *   visible && setTimeout(() => setVisible(false), 3000)
 * ), [visible]);
 * 
 * TAP OUTSIDE TO DISMISS:
 * <Pressable
 *   style={StyleSheet.absoluteFill}
 *   onPress={handleClose}
 * >
 *   <View style={styles.tooltipContainer} onStartShouldSetResponder={handleResponder}>
 *     // Tooltip content
 *   </View>
 * </Pressable>
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      {/* RN: Replace with Portal component */}
      {/* RN: import { Portal } from '@gorhom/portal'; */}
      {/* RN: <Portal> */}
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        // RN: Animated.View with fade/scale animation
        // RN: <Animated.View
        // RN:   entering={FadeIn.duration(200)}
        // RN:   exiting={FadeOut.duration(150)}
        // RN:   style={[styles.tooltip, positionStyle]}
        // RN: >
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {/* RN: <Text style={styles.tooltipText}> */}
        {children}
        {/* RN: </Text> */}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
        {/* RN: Arrow component (rotated square or triangle SVG) */}
        {/* RN: <View style={styles.arrow} /> */}
      </TooltipPrimitive.Content>
      {/* RN: </Animated.View> */}
      {/* RN: </Portal> */}
    </TooltipPrimitive.Portal>
  );
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * import React, { useState, useRef, useEffect } from 'react';
 * import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
 * import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
 * import { Portal } from '@gorhom/portal';
 * import { Info } from 'lucide-react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * interface TooltipProps {
 *   content: string;
 *   children: React.ReactNode;
 *   placement?: 'top' | 'bottom' | 'left' | 'right';
 *   autoDismiss?: boolean;
 *   dismissTimeout?: number;
 * }
 * 
 * export const Tooltip: React.FC<TooltipProps> = ({
 *   content,
 *   children,
 *   placement = 'top',
 *   autoDismiss = true,
 *   dismissTimeout = 3000,
 * }) => {
 *   const [visible, setVisible] = useState(false);
 *   const [position, setPosition] = useState({ x: 0, y: 0 });
 *   const triggerRef = useRef<View>(null);
 *   const screenWidth = Dimensions.get('window').width;
 *   
 *   const measurePosition = () => {
 *     triggerRef.current?.measureInWindow((x, y, width, height) => {
 *       const tooltipWidth = 200; // Estimated
 *       const tooltipHeight = 40;  // Estimated
 *       const offset = 8; // Distance from trigger
 *       
 *       let tooltipX = x;
 *       let tooltipY = y;
 *       
 *       switch (placement) {
 *         case 'top':
 *           tooltipX = x + width / 2 - tooltipWidth / 2;
 *           tooltipY = y - tooltipHeight - offset;
 *           break;
 *         case 'bottom':
 *           tooltipX = x + width / 2 - tooltipWidth / 2;
 *           tooltipY = y + height + offset;
 *           break;
 *         case 'left':
 *           tooltipX = x - tooltipWidth - offset;
 *           tooltipY = y + height / 2 - tooltipHeight / 2;
 *           break;
 *         case 'right':
 *           tooltipX = x + width + offset;
 *           tooltipY = y + height / 2 - tooltipHeight / 2;
 *           break;
 *       }
 *       
 *       // Keep tooltip within screen bounds
 *       tooltipX = Math.max(8, Math.min(tooltipX, screenWidth - tooltipWidth - 8));
 *       
 *       setPosition({ x: tooltipX, y: tooltipY });
 *     });
 *   };
 *   
 *   const handleLongPress = () => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
 *     measurePosition();
 *     setVisible(true);
 *   };
 *   
 *   // Auto-dismiss
 *   useEffect(() => {
 *     if (visible && autoDismiss) {
 *       const timer = setTimeout(() => setVisible(false), dismissTimeout);
 *       return () => clearTimeout(timer);
 *     }
 *   }, [visible, autoDismiss, dismissTimeout]);
 *   
 *   return (
 *     <>
 *       <Pressable
 *         ref={triggerRef}
 *         onLongPress={handleLongPress}
 *         delayLongPress={500}
 *         accessibilityHint="Long press for more information"
 *       >
 *         {children}
 *       </Pressable>
 *       
 *       {visible && (
 *         <Portal>
 *           <Pressable
 *             style={StyleSheet.absoluteFill}
 *             onPress={() => setVisible(false)}
 *           >
 *             <Animated.View
 *               entering={FadeIn.duration(200)}
 *               exiting={FadeOut.duration(150)}
 *               style={[
 *                 styles.tooltip,
 *                 {
 *                   top: position.y,
 *                   left: position.x,
 *                 },
 *               ]}
 *               onStartShouldSetResponder={() => true}
 *             >
 *               <Text style={styles.tooltipText}>{content}</Text>
 *               <View style={[styles.arrow, getArrowStyle(placement)]} />
 *             </Animated.View>
 *           </Pressable>
 *         </Portal>
 *       )}
 *     </>
 *   );
 * };
 * 
 * const getArrowStyle = (placement: string) => {
 *   const arrowSize = 8;
 *   switch (placement) {
 *     case 'top':
 *       return {
 *         bottom: -arrowSize / 2,
 *         left: '50%',
 *         marginLeft: -arrowSize / 2,
 *       };
 *     case 'bottom':
 *       return {
 *         top: -arrowSize / 2,
 *         left: '50%',
 *         marginLeft: -arrowSize / 2,
 *       };
 *     case 'left':
 *       return {
 *         right: -arrowSize / 2,
 *         top: '50%',
 *         marginTop: -arrowSize / 2,
 *       };
 *     case 'right':
 *       return {
 *         left: -arrowSize / 2,
 *         top: '50%',
 *         marginTop: -arrowSize / 2,
 *       };
 *   }
 * };
 * 
 * const styles = StyleSheet.create({
 *   tooltip: {
 *     position: 'absolute',
 *     backgroundColor: colors.primary,
 *     borderRadius: 6,
 *     paddingHorizontal: 12,
 *     paddingVertical: 8,
 *     maxWidth: 200,
 *     zIndex: 1000,
 *   },
 *   tooltipText: {
 *     color: colors.primaryForeground,
 *     fontSize: 12,
 *     lineHeight: 16,
 *   },
 *   arrow: {
 *     position: 'absolute',
 *     width: 8,
 *     height: 8,
 *     backgroundColor: colors.primary,
 *     transform: [{ rotate: '45deg' }],
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic tooltip on long-press
 * <Tooltip content="This is helpful information">
 *   <Text>Long press me</Text>
 * </Tooltip>
 * 
 * // Tooltip on button
 * <Tooltip content="Saves your changes" placement="top">
 *   <Button onPress={handleSave}>Save</Button>
 * </Tooltip>
 * 
 * // ALTERNATIVE: INFO ICON PATTERN (Recommended for mobile)
 * const InfoTooltip = ({ content }: { content: string }) => {
 *   const [visible, setVisible] = useState(false);
 *   
 *   return (
 *     <View style={styles.infoContainer}>
 *       <Pressable
 *         onPress={() => setVisible(true)}
 *         accessibilityLabel="More information"
 *         accessibilityRole="button"
 *       >
 *         <Info size={16} color={colors.mutedForeground} />
 *       </Pressable>
 *       
 *       <Modal
 *         visible={visible}
 *         transparent
 *         animationType="fade"
 *         onRequestClose={() => setVisible(false)}
 *       >
 *         <Pressable
 *           style={styles.modalOverlay}
 *           onPress={() => setVisible(false)}
 *         >
 *           <View style={styles.modalContent}>
 *             <Text style={styles.modalText}>{content}</Text>
 *             <Pressable
 *               onPress={() => setVisible(false)}
 *               style={styles.closeButton}
 *             >
 *               <Text style={styles.closeButtonText}>Got it</Text>
 *             </Pressable>
 *           </View>
 *         </Pressable>
 *       </Modal>
 *     </View>
 *   );
 * };
 * 
 * // Usage
 * <View style={styles.row}>
 *   <Text>Property Value</Text>
 *   <InfoTooltip content="Estimated market value based on recent sales" />
 * </View>
 * 
 * // USING LIBRARY (react-native-walkthrough-tooltip):
 * import Tooltip from 'react-native-walkthrough-tooltip';
 * 
 * const [tooltipVisible, setTooltipVisible] = useState(false);
 * 
 * <Tooltip
 *   isVisible={tooltipVisible}
 *   content={<Text>This is the tooltip content</Text>}
 *   placement="top"
 *   onClose={() => setTooltipVisible(false)}
 * >
 *   <Pressable onLongPress={() => setTooltipVisible(true)}>
 *     <Text>Press me</Text>
 *   </Pressable>
 * </Tooltip>
 * 
 * // FORM FIELD WITH TOOLTIP:
 * const FormFieldWithHelp = ({ label, value, onChangeText, helpText }) => (
 *   <View style={styles.field}>
 *     <View style={styles.labelRow}>
 *       <Text style={styles.label}>{label}</Text>
 *       <InfoTooltip content={helpText} />
 *     </View>
 *     <Input value={value} onChangeText={onChangeText} />
 *   </View>
 * );
 * 
 * // ICON BUTTON WITH TOOLTIP:
 * <Tooltip content="Delete property">
 *   <IconButton onPress={handleDelete}>
 *     <Trash2 size={20} color={colors.destructive} />
 *   </IconButton>
 * </Tooltip>
 */

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
