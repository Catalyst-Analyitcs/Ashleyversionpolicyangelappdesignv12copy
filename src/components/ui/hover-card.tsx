/**
 * ==============================================================================
 * HOVER-CARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * ✅ Convert to onPressIn/onPressOut with NativeWind! All Tailwind classes work!
 * 
 * ```tsx
 * const [visible, setVisible] = useState(false);
 * 
 * <Pressable onPressIn={() => setVisible(true)} onPressOut={() => setVisible(false)}>
 *   <Text>Trigger</Text>
 * </Pressable>
 * 
 * {visible && (
 *   <View className="absolute bg-pa-dark rounded-xl p-4 border border-white/10">
 *     {/* Preview content with all Tailwind classes */}
 *   </View>
 * )}
 * ```
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * COMPLEXITY: MEDIUM-HIGH
 * CONVERSION APPROACH: Replace hover with press/tooltip or remove entirely
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-hover-card → Tooltip or Modal on press (hover doesn't exist on mobile)
 * 
 * KEY CONVERSION NOTES:
 * 1. Mouse hover doesn't exist on mobile - use alternative interaction
 * 2. Options: Long press tooltip, tap to expand, or always-visible content
 * 3. Consider if hover card adds value on mobile - may not be needed
 * 4. Tooltip is better mobile alternative for supplementary info
 * 5. Bottom sheet for complex hover card content
 * 
 * MOBILE INTERACTION ALTERNATIVES:
 * 1. Tooltip on long press (for simple info)
 * 2. Pressable with modal (for complex content)
 * 3. Expand inline (accordion-style)
 * 4. Info icon that opens modal
 * 5. Always show content (no hover state)
 * 
 * REACT NATIVE IMPLEMENTATION (Tooltip Alternative):
 * ```tsx
 * import { View, Pressable, Text, Modal } from 'react-native';
 * import { useState } from 'react';
 * import Tooltip from 'react-native-walkthrough-tooltip';
 * 
 * interface HoverCardProps {
 *   trigger: React.ReactNode;
 *   content: React.ReactNode;
 *   side?: 'top' | 'bottom' | 'left' | 'right';
 * }
 * 
 * export function HoverCard({ trigger, content, side = 'top' }: HoverCardProps) {
 *   const [tooltipVisible, setTooltipVisible] = useState(false);
 * 
 *   return (
 *     <Tooltip
 *       isVisible={tooltipVisible}
 *       content={<View style={styles.tooltipContent}>{content}</View>}
 *       placement={side}
 *       onClose={() => setTooltipVisible(false)}
 *       backgroundColor="rgba(0, 0, 0, 0.95)"
 *       arrowSize={{ width: 12, height: 8 }}
 *     >
 *       <Pressable
 *         onPress={() => setTooltipVisible(!tooltipVisible)}
 *         accessibilityRole="button"
 *         accessibilityLabel="Show more information"
 *       >
 *         {trigger}
 *       </Pressable>
 *     </Tooltip>
 *   );
 * }
 * 
 * const styles = {
 *   tooltipContent: {
 *     padding: 16,
 *     maxWidth: 256,
 *   },
 * };
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Modal Alternative):
 * ```tsx
 * export function HoverCardModal({ trigger, content }: HoverCardProps) {
 *   const [visible, setVisible] = useState(false);
 * 
 *   return (
 *     <>
 *       <Pressable
 *         onPress={() => setVisible(true)}
 *         accessibilityRole="button"
 *         accessibilityHint="Tap to view details"
 *       >
 *         {trigger}
 *       </Pressable>
 * 
 *       <Modal
 *         visible={visible}
 *         transparent
 *         animationType="fade"
 *         onRequestClose={() => setVisible(false)}
 *       >
 *         <Pressable
 *           style={styles.overlay}
 *           onPress={() => setVisible(false)}
 *         >
 *           <View style={styles.card}>
 *             {content}
 *           </View>
 *         </Pressable>
 *       </Modal>
 *     </>
 *   );
 * }
 * 
 * const styles = {
 *   overlay: {
 *     flex: 1,
 *     backgroundColor: 'rgba(0, 0, 0, 0.5)',
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     padding: 16,
 *   },
 *   card: {
 *     backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *     borderRadius: 16,
 *     padding: 20,
 *     maxWidth: 320,
 *     borderWidth: 1,
 *     borderColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 * };
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Info Icon Alternative):
 * ```tsx
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * export function InfoButton({ content }: { content: React.ReactNode }) {
 *   const [visible, setVisible] = useState(false);
 * 
 *   return (
 *     <>
 *       <Pressable
 *         onPress={() => setVisible(true)}
 *         style={styles.infoButton}
 *         accessibilityRole="button"
 *         accessibilityLabel="More information"
 *       >
 *         <Icon name="info" size={20} color="rgba(212, 175, 55, 0.8)" />
 *       </Pressable>
 * 
 *       <Modal
 *         visible={visible}
 *         transparent
 *         animationType="slide"
 *         onRequestClose={() => setVisible(false)}
 *       >
 *         <View style={styles.bottomSheet}>
 *           <View style={styles.sheetContent}>
 *             <View style={styles.sheetHandle} />
 *             {content}
 *             <Pressable
 *               style={styles.closeButton}
 *               onPress={() => setVisible(false)}
 *             >
 *               <Text style={styles.closeButtonText}>Close</Text>
 *             </Pressable>
 *           </View>
 *         </View>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - User avatars: Tap to see profile preview with name, role, contact
 * - Property cards: Tap icon to see quick stats (size, value, status)
 * - Agent cards: Tap to see bio, rating, availability
 * - Status indicators: Tap to see detailed status explanation
 * - Weather icons: Tap to see hourly forecast
 * - Notification items: Tap to see full notification details
 * 
 * WHEN TO USE EACH ALTERNATIVE:
 * 1. **Tooltip**: Simple text info (< 2 lines)
 * 2. **Modal**: Complex content with multiple fields
 * 3. **Bottom Sheet**: Detailed preview (images, multiple sections)
 * 4. **Info Icon**: Optional information user may not need
 * 5. **Inline Expand**: When content should be quickly scannable
 * 
 * ACCESSIBILITY:
 * - Use accessibilityHint to explain tap behavior
 * - Ensure info is accessible without hover (don't hide critical info)
 * - Use accessibilityLabel for icon buttons
 * - Support screen reader navigation
 * - Minimum touch target 44x44 points
 * 
 * UX CONSIDERATIONS:
 * - Hover cards hide information on mobile - consider if necessary
 * - Users can't "hover" to preview - must commit to tap
 * - Mobile users expect tap interactions, not hover
 * - Consider progressive disclosure patterns
 * - Don't hide critical information behind hover states
 * 
 * ANIMATION:
 * - Fade in for tooltips (200ms)
 * - Slide up for bottom sheets (300ms)
 * - Scale/fade for modals (250ms)
 * - Use native driver when possible
 * 
 * PERFORMANCE:
 * - Lazy render content (don't render until opened)
 * - Memoize complex content
 * - Avoid heavy components in tooltips
 * - Consider impact on list performance
 */

"use client";

import * as React from "react";
// WEB: Radix UI for hover-activated cards
// REACT NATIVE: Hover doesn't exist - use Tooltip, Modal, or pressable alternative
// Consider: Is hover card necessary on mobile? Often better to show content directly
import * as HoverCardPrimitive from "@radix-ui/react-hover-card@1.1.6";

import { cn } from "./utils";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  // WEB: Container for hover card with delay settings
  // REACT NATIVE: Remove or replace with pressable tooltip
  // Options:
  // 1. Tooltip: For simple info on press
  // 2. Modal: For complex content
  // 3. Always visible: Remove hover interaction entirely
  // 4. Info button: Explicit trigger instead of hover
  // 
  // Example with Tooltip:
  // <Tooltip
  //   isVisible={visible}
  //   content={<View>{content}</View>}
  //   placement="top"
  //   onClose={() => setVisible(false)}
  // >
  //   <Pressable onPress={() => setVisible(true)}>
  //     {children}
  //   </Pressable>
  // </Tooltip>
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  // WEB: Element that triggers card on mouse hover
  // REACT NATIVE: Pressable with onPress (not hover)
  // <Pressable
  //   onPress={() => setTooltipVisible(!tooltipVisible)}
  //   accessibilityRole="button"
  //   accessibilityLabel="View details"
  //   accessibilityHint="Double tap to see more information"
  // >
  //   {children}
  // </Pressable>
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  // WEB: Content shown on hover with positioning
  // REACT NATIVE: Modal or Tooltip content
  // 
  // For Tooltip (simple content):
  // <View style={{
  //   padding: 16,
  //   backgroundColor: 'rgba(0, 0, 0, 0.95)',
  //   borderRadius: 12,
  //   maxWidth: 256,
  // }}>
  //   {children}
  // </View>
  // 
  // For Modal (complex content):
  // <Modal visible={visible} transparent animationType="fade">
  //   <Pressable style={styles.overlay} onPress={onClose}>
  //     <View style={styles.card}>
  //       {children}
  //     </View>
  //   </Pressable>
  // </Modal>
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        // REACT NATIVE: Replace animations with Animated API or native driver
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
