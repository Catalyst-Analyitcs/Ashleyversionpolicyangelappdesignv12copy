/**
 * ==============================================================================
 * SHEET.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * ✅ Use @gorhom/bottom-sheet with NativeWind! All Tailwind classes work!
 * 
 * ```tsx
 * import BottomSheet from '@gorhom/bottom-sheet';
 * 
 * <BottomSheet snapPoints={['25%', '50%', '90%']} enablePanDownToClose backgroundStyle={{ backgroundColor: '#000000' }}>
 *   <View className="p-6">
 *     <Text className="text-white text-xl font-bold mb-4">Sheet Title</Text>
 *   </View>
 * </BottomSheet>
 * ```
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * COMPLEXITY: MEDIUM-HIGH
 * CONVERSION APPROACH: Use Modal or @gorhom/bottom-sheet
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-dialog → Modal or @gorhom/bottom-sheet
 * - lucide-react → react-native-vector-icons
 * 
 * RECOMMENDED PACKAGES:
 * - @gorhom/bottom-sheet (best for bottom sheets)
 * - react-native-modal (enhanced Modal)
 * - Built-in Modal component
 * 
 * KEY CONVERSION NOTES:
 * 1. Sheet is typically a bottom sheet on mobile
 * 2. Side sheets can be modals or drawers
 * 3. @gorhom/bottom-sheet is the gold standard
 * 4. Support swipe-to-dismiss gestures
 * 5. Backdrop overlay for focus
 * 
 * REACT NATIVE IMPLEMENTATION (Bottom Sheet):
 * ```tsx
 * import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
 * import { useRef } from 'react';
 * import { View, Text, Pressable } from 'react-native';
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * interface SheetProps {
 *   isOpen: boolean;
 *   onClose: () => void;
 *   children: React.ReactNode;
 *   snapPoints?: string[];
 * }
 * 
 * export function Sheet({
 *   isOpen,
 *   onClose,
 *   children,
 *   snapPoints = ['50%', '90%'],
 * }: SheetProps) {
 *   const bottomSheetRef = useRef<BottomSheet>(null);
 * 
 *   return (
 *     <BottomSheet
 *       ref={bottomSheetRef}
 *       index={isOpen ? 0 : -1}
 *       snapPoints={snapPoints}
 *       enablePanDownToClose
 *       onClose={onClose}
 *       backgroundStyle={{
 *         backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *       }}
 *       handleIndicatorStyle={{
 *         backgroundColor: 'rgba(255, 255, 255, 0.3)',
 *         width: 40,
 *         height: 4,
 *       }}
 *       backdropComponent={(props) => (
 *         <BottomSheetBackdrop
 *           {...props}
 *           disappearsOnIndex={-1}
 *           appearsOnIndex={0}
 *           opacity={0.5}
 *         />
 *       )}
 *     >
 *       <View style={styles.content}>
 *         {children}
 *       </View>
 *     </BottomSheet>
 *   );
 * }
 * 
 * const styles = {
 *   content: {
 *     flex: 1,
 *     padding: 16,
 *   },
 * };
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Modal - Side Sheet):
 * ```tsx
 * import { Modal, View, Pressable, Animated } from 'react-native';
 * import { useState, useEffect, useRef } from 'react';
 * 
 * export function SideSheet({
 *   isOpen,
 *   onClose,
 *   children,
 *   side = 'right',
 * }: SheetProps & { side?: 'left' | 'right' }) {
 *   const slideAnim = useRef(new Animated.Value(300)).current;
 * 
 *   useEffect(() => {
 *     Animated.timing(slideAnim, {
 *       toValue: isOpen ? 0 : 300,
 *       duration: 300,
 *       useNativeDriver: true,
 *     }).start();
 *   }, [isOpen]);
 * 
 *   return (
 *     <Modal
 *       visible={isOpen}
 *       transparent
 *       animationType="none"
 *       onRequestClose={onClose}
 *     >
 *       {/* Backdrop *}
 *       <Pressable
 *         style={styles.backdrop}
 *         onPress={onClose}
 *       >
 *         {/* Sheet Content *}
 *         <Animated.View
 *           style={[
 *             styles.sheet,
 *             side === 'right' && styles.sheetRight,
 *             side === 'left' && styles.sheetLeft,
 *             {
 *               transform: [{
 *                 translateX: side === 'right' ? slideAnim : slideAnim.interpolate({
 *                   inputRange: [0, 300],
 *                   outputRange: [0, -300],
 *                 }),
 *               }],
 *             },
 *           ]}
 *         >
 *           {/* Close Button *}
 *           <Pressable
 *             style={styles.closeButton}
 *             onPress={onClose}
 *           >
 *             <Icon name="x" size={20} color="#fff" />
 *           </Pressable>
 * 
 *           {children}
 *         </Animated.View>
 *       </Pressable>
 *     </Modal>
 *   );
 * }
 * 
 * const styles = {
 *   backdrop: {
 *     flex: 1,
 *     backgroundColor: 'rgba(0, 0, 0, 0.5)',
 *   },
 *   sheet: {
 *     position: 'absolute',
 *     top: 0,
 *     bottom: 0,
 *     width: '80%',
 *     maxWidth: 400,
 *     backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *     padding: 20,
 *     borderWidth: 1,
 *     borderColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   sheetRight: {
 *     right: 0,
 *     borderLeftWidth: 1,
 *   },
 *   sheetLeft: {
 *     left: 0,
 *     borderRightWidth: 1,
 *   },
 *   closeButton: {
 *     position: 'absolute',
 *     top: 16,
 *     right: 16,
 *     width: 32,
 *     height: 32,
 *     borderRadius: 16,
 *     backgroundColor: 'rgba(255, 255, 255, 0.1)',
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     zIndex: 1,
 *   },
 * };
 * ```
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - Property filters: Bottom sheet with filter options
 * - Property details: Bottom sheet with quick info
 * - Document preview: Full-height bottom sheet
 * - Quick actions: Bottom sheet with action list
 * - Settings panel: Side sheet from right
 * - Notifications: Side sheet from left
 * 
 * ACCESSIBILITY:
 * - accessibilityViewIsModal when sheet is open
 * - Announce sheet opening with accessibilityLiveRegion
 * - Close button: accessibilityRole="button"
 * - Focus management for screen readers
 * - Support VoiceOver gestures
 * 
 * GESTURES:
 * - Pan gesture for drag-to-dismiss
 * - Swipe down to close bottom sheets
 * - Swipe left/right to close side sheets
 * - Backdrop tap to dismiss
 * - Handle over-scroll behavior
 * 
 * PERFORMANCE:
 * - Use native driver for animations
 * - Lazy render content until opened
 * - Unmount on close to free memory
 * - Memoize complex content
 */

"use client";

import * as React from "react";
// WEB: Radix Dialog for sheet overlay
// REACT NATIVE: Modal or @gorhom/bottom-sheet
import * as SheetPrimitive from "@radix-ui/react-dialog@1.1.6";
// WEB: Lucide icons
// REACT NATIVE: react-native-vector-icons
import { XIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  // WEB: Sheet root container
  // REACT NATIVE: State management for sheet visibility
  // const [isOpen, setIsOpen] = useState(false);
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  // WEB: Button/element that opens sheet
  // REACT NATIVE: Pressable that sets isOpen to true
  // <Pressable onPress={() => setIsOpen(true)}>
  //   <Text>Open Sheet</Text>
  // </Pressable>
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  // WEB: Close button
  // REACT NATIVE: Pressable that sets isOpen to false
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  // WEB: Portal for overlay rendering
  // REACT NATIVE: Modal handles portalling
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  // WEB: Backdrop overlay
  // REACT NATIVE: Pressable backdrop in Modal
  // <Pressable
  //   style={{
  //     flex: 1,
  //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //   }}
  //   onPress={onClose}
  // />
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  // WEB: Sheet content with slide animations
  // REACT NATIVE: Animated.View or BottomSheet
  // 
  // For bottom sheet (recommended):
  // import BottomSheet from '@gorhom/bottom-sheet';
  // 
  // <BottomSheet
  //   snapPoints={['50%', '90%']}
  //   backgroundStyle={{
  //     backgroundColor: 'rgba(0, 0, 0, 0.95)',
  //   }}
  //   handleIndicatorStyle={{
  //     backgroundColor: 'rgba(255, 255, 255, 0.3)',
  //   }}
  // >
  //   {children}
  // </BottomSheet>
  // 
  // For side sheet:
  // <Modal visible={isOpen} transparent animationType="slide">
  //   <Pressable style={styles.backdrop} onPress={onClose}>
  //     <Animated.View style={[styles.sheet, { transform: [{ translateX: slideAnim }] }]}>
  //       {children}
  //     </Animated.View>
  //   </Pressable>
  // </Modal>
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        // REACT NATIVE: Use Animated.timing for slide animations
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          {/* REACT NATIVE: <Icon name="x" size={20} color="#fff" /> */}
          <span className="sr-only">Close</span>
          {/* REACT NATIVE: accessibilityLabel="Close" */}
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  // WEB: Header section of sheet
  // REACT NATIVE: View for header content
  // <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' }}>
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  // WEB: Footer section with actions
  // REACT NATIVE: View with action buttons
  // <View style={{ marginTop: 'auto', padding: 16, gap: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' }}>
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  // WEB: Sheet title
  // REACT NATIVE: Text component with heading style
  // <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  // WEB: Sheet description
  // REACT NATIVE: Text component with subtitle style
  // <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
