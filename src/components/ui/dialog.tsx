/**
 * ==============================================================================
 * DIALOG.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Modal dialog component for alerts, confirmations, forms, and 
 * content overlays.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind with React Native Modal is MUCH easier!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, items-center, justify-center
 *    - Spacing: p-6, gap-4
 *    - Colors: bg-pa-dark, text-white, border-white/10
 *    - Borders: rounded-xl, border
 *    - Sizing: w-full, max-w-md
 * 
 * ❌ CONVERT ONLY THESE:
 *    - @radix-ui/react-dialog → React Native Modal
 *    - div → View
 *    - button → Pressable
 *    - Backdrop overlay → Pressable for dismiss
 *    - Animations → react-native-reanimated (optional)
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - DIALOG WITH MODAL
 * ==============================================================================
 * 
 * BEFORE (Web with Radix):
 * ```tsx
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *   <DialogContent className="bg-pa-dark rounded-xl p-6">
 *     <DialogHeader>
 *       <DialogTitle>Confirm Action</DialogTitle>
 *     </DialogHeader>
 *     <p>Are you sure?</p>
 *     <DialogFooter>
 *       <button>Cancel</button>
 *       <button>Confirm</button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * import { Modal, View, Text, Pressable } from 'react-native';
 * 
 * <Modal
 *   visible={isOpen}
 *   transparent
 *   animationType="fade"
 *   onRequestClose={() => setIsOpen(false)}
 * >
 *   // Backdrop - dismiss on tap
 *   <Pressable
 *     className="flex-1 bg-black/50 items-center justify-center"
 *     onPress={() => setIsOpen(false)}
 *   >
 *     // Dialog content - stop propagation
 *     <Pressable onPress={(e) => e.stopPropagation()}>
 *       <View className="bg-pa-dark rounded-xl p-6 m-4 w-full max-w-md border border-white/10">
 *         // Header
 *         <View className="mb-4">
 *           <Text className="text-white text-xl font-bold">Confirm Action</Text>
 *         </View>
 *         
 *         // Content
 *         <Text className="text-white/80 mb-6">Are you sure?</Text>
 *         
 *         // Footer
 *         <View className="flex flex-row gap-3">
 *           <Pressable
 *             onPress={() => setIsOpen(false)}
 *             className="flex-1 py-3 rounded-lg border border-white/20"
 *           >
 *             <Text className="text-white text-center">Cancel</Text>
 *           </Pressable>
 *           <Pressable
 *             onPress={handleConfirm}
 *             className="flex-1 py-3 rounded-lg bg-pa-gold"
 *           >
 *             <Text className="text-pa-dark font-semibold text-center">Confirm</Text>
 *           </Pressable>
 *         </View>
 *       </View>
 *     </Pressable>
 *   </Pressable>
 * </Modal>
 * ```
 * 
 * KEY POINTS:
 * - ✅ All Tailwind classes work as-is!
 * - ❌ Replace Radix with React Native Modal
 * - ✅ Backdrop dismiss with outer Pressable
 * - ✅ All spacing, colors, borders preserved!
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND DIALOG
 * ==============================================================================
 * 
 * ```tsx
 * import React from 'react';
 * import { Modal, View, Text, Pressable } from 'react-native';
 * import { X } from 'lucide-react-native';
 * 
 * interface DialogProps {
 *   open: boolean;
 *   onOpenChange: (open: boolean) => void;
 *   children: React.ReactNode;
 * }
 * 
 * export function Dialog({ open, onOpenChange, children }: DialogProps) {
 *   return (
 *     <Modal
 *       visible={open}
 *       transparent
 *       animationType="fade"
 *       onRequestClose={() => onOpenChange(false)}
 *       statusBarTranslucent
 *     >
 *       <Pressable
 *         className="flex-1 bg-black/50 items-center justify-center p-4"
 *         onPress={() => onOpenChange(false)}
 *       >
 *         <Pressable onPress={(e) => e.stopPropagation()}>
 *           {children}
 *         </Pressable>
 *       </Pressable>
 *     </Modal>
 *   );
 * }
 * 
 * export function DialogContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 *   return (
 *     <View className={`bg-pa-dark rounded-xl p-6 w-full max-w-md border border-white/10 ${className}`}>
 *       {children}
 *     </View>
 *   );
 * }
 * 
 * export function DialogHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 *   return <View className={`mb-4 ${className}`}>{children}</View>;
 * }
 * 
 * export function DialogTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 *   return <Text className={`text-white text-xl font-bold ${className}`}>{children}</Text>;
 * }
 * 
 * export function DialogDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 *   return <Text className={`text-white/60 text-sm ${className}`}>{children}</Text>;
 * }
 * 
 * export function DialogFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 *   return <View className={`flex flex-row gap-3 mt-6 ${className}`}>{children}</View>;
 * }
 * 
 * // USAGE EXAMPLE:
 * 
 * function ConfirmDialog() {
 *   const [open, setOpen] = useState(false);
 *   
 *   return (
 *     <Dialog open={open} onOpenChange={setOpen}>
 *       <DialogContent>
 *         <DialogHeader>
 *           <DialogTitle>Delete Property</DialogTitle>
 *           <DialogDescription>
 *             This action cannot be undone. This will permanently delete the property.
 *           </DialogDescription>
 *         </DialogHeader>
 *         
 *         <DialogFooter>
 *           <Pressable
 *             onPress={() => setOpen(false)}
 *             className="flex-1 py-3 rounded-lg border border-white/20"
 *           >
 *             <Text className="text-white text-center">Cancel</Text>
 *           </Pressable>
 *           <Pressable
 *             onPress={handleDelete}
 *             className="flex-1 py-3 rounded-lg bg-red-500"
 *           >
 *             <Text className="text-white font-semibold text-center">Delete</Text>
 *           </Pressable>
 *         </DialogFooter>
 *       </DialogContent>
 *     </Dialog>
 *   );
 * }
 * ```
 * 
 * ==============================================================================
 * REQUIRED PACKAGES
 * ==============================================================================
 * 
 * ```bash
 * npm install nativewind
 * npm install lucide-react-native
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * ==============================================================================
 * LEGACY DETAILED ANNOTATIONS (Pre-NativeWind)
 * ==============================================================================
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. USE REACT NATIVE MODAL:
 *    React Native has a built-in Modal component that handles overlays
 *    
 *    import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 *    
 *    No need for @radix-ui/react-dialog - use Modal directly
 * 
 * 2. BASIC CONVERSION EXAMPLE:
 *    ```tsx
 *    import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
 *    import { XIcon } from 'react-native-vector-icons/Feather';
 *    import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
 *    
 *    interface DialogProps {
 *      open: boolean;
 *      onClose: () => void;
 *      children: React.ReactNode;
 *    }
 *    
 *    export function Dialog({ open, onClose, children }: DialogProps) {
 *      return (
 *        <Modal
 *          visible={open}
 *          transparent={true}
 *          animationType="fade" // or "slide" or "none"
 *          onRequestClose={onClose} // Android back button
 *        >
 *          {/ * Backdrop overlay * /}
 *          <Pressable 
 *            style={styles.backdrop}
 *            onPress={onClose} // Close on backdrop tap
 *          >
 *            {/ * Dialog content - stop propagation * /}
 *            <Animated.View 
 *              entering={ZoomIn.duration(200)}
 *              exiting={ZoomOut.duration(200)}
 *              style={styles.dialogContainer}
 *            >
 *              <Pressable onPress={(e) => e.stopPropagation()}>
 *                <View style={styles.dialog}>
 *                  {children}
 *                </View>
 *              </Pressable>
 *            </Animated.View>
 *          </Pressable>
 *        </Modal>
 *      );
 *    }
 *    
 *    const styles = StyleSheet.create({
 *      backdrop: {
 *        flex: 1,
 *        backgroundColor: 'rgba(0, 0, 0, 0.5)',
 *        justifyContent: 'center',
 *        alignItems: 'center',
 *      },
 *      dialogContainer: {
 *        width: '90%',
 *        maxWidth: 500,
 *      },
 *      dialog: {
 *        backgroundColor: 'rgba(0, 0, 0, 0.9)', // var(--glass-bg)
 *        borderRadius: 16, // var(--radius-lg)
 *        padding: 24,
 *        borderWidth: 1,
 *        borderColor: 'rgba(255, 255, 255, 0.1)', // var(--glass-border)
 *      },
 *    });
 *    ```
 * 
 * 3. DIALOG WITH CLOSE BUTTON:
 *    ```tsx
 *    export function DialogContent({ children, onClose }) {
 *      return (
 *        <View style={styles.content}>
 *          {/ * Close button * /}
 *          <TouchableOpacity 
 *            style={styles.closeButton}
 *            onPress={onClose}
 *          >
 *            <XIcon size={20} color="#ffffff" />
 *          </TouchableOpacity>
 *          
 *          {children}
 *        </View>
 *      );
 *    }
 *    
 *    const styles = StyleSheet.create({
 *      content: {
 *        position: 'relative',
 *      },
 *      closeButton: {
 *        position: 'absolute',
 *        top: 16,
 *        right: 16,
 *        zIndex: 10,
 *        width: 32,
 *        height: 32,
 *        borderRadius: 16,
 *        backgroundColor: 'rgba(255, 255, 255, 0.1)',
 *        justifyContent: 'center',
 *        alignItems: 'center',
 *      },
 *    });
 *    ```
 * 
 * 4. DIALOG HEADER & FOOTER:
 *    ```tsx
 *    export function DialogHeader({ children }) {
 *      return (
 *        <View style={styles.header}>
 *          {children}
 *        </View>
 *      );
 *    }
 *    
 *    export function DialogTitle({ children }) {
 *      return (
 *        <Text style={styles.title}>
 *          {children}
 *        </Text>
 *      );
 *    }
 *    
 *    export function DialogDescription({ children }) {
 *      return (
 *        <Text style={styles.description}>
 *          {children}
 *        </Text>
 *      );
 *    }
 *    
 *    export function DialogFooter({ children }) {
 *      return (
 *        <View style={styles.footer}>
 *          {children}
 *        </View>
 *      );
 *    }
 *    
 *    const styles = StyleSheet.create({
 *      header: {
 *        marginBottom: 16,
 *      },
 *      title: {
 *        fontSize: 18,
 *        fontWeight: '600',
 *        color: '#ffffff',
 *        marginBottom: 8,
 *      },
 *      description: {
 *        fontSize: 14,
 *        color: '#94a3b8', // var(--text-secondary)
 *        lineHeight: 20,
 *      },
 *      footer: {
 *        flexDirection: 'row',
 *        justifyContent: 'flex-end',
 *        gap: 12,
 *        marginTop: 24,
 *      },
 *    });
 *    ```
 * 
 * 5. FULL EXAMPLE WITH USAGE:
 *    ```tsx
 *    import { useState } from 'react';
 *    import { Button } from './button';
 *    
 *    function MyScreen() {
 *      const [showDialog, setShowDialog] = useState(false);
 *      
 *      return (
 *        <View>
 *          <Button onPress={() => setShowDialog(true)}>
 *            <Text>Open Dialog</Text>
 *          </Button>
 *          
 *          <Dialog 
 *            open={showDialog}
 *            onClose={() => setShowDialog(false)}
 *          >
 *            <DialogHeader>
 *              <DialogTitle>Confirm Action</DialogTitle>
 *              <DialogDescription>
 *                Are you sure you want to delete this property?
 *                This action cannot be undone.
 *              </DialogDescription>
 *            </DialogHeader>
 *            
 *            <DialogFooter>
 *              <Button 
 *                variant="ghost"
 *                onPress={() => setShowDialog(false)}
 *              >
 *                <Text>Cancel</Text>
 *              </Button>
 *              <Button 
 *                variant="destructive"
 *                onPress={() => {
 *                  // Handle delete
 *                  setShowDialog(false);
 *                }}
 *              >
 *                <Text>Delete</Text>
 *              </Button>
 *            </DialogFooter>
 *          </Dialog>
 *        </View>
 *      );
 *    }
 *    ```
 * 
 * 6. ADVANCED: BOTTOM SHEET STYLE (Mobile-friendly):
 *    For mobile apps, consider bottom sheet instead of center dialog:
 *    
 *    ```tsx
 *    import { Modal, View, StyleSheet, Animated } from 'react-native';
 *    import { PanGestureHandler } from 'react-native-gesture-handler';
 *    
 *    export function BottomSheetDialog({ open, onClose, children }) {
 *      const translateY = useSharedValue(0);
 *      
 *      return (
 *        <Modal
 *          visible={open}
 *          transparent={true}
 *          animationType="slide"
 *          onRequestClose={onClose}
 *        >
 *          <Pressable style={styles.backdrop} onPress={onClose}>
 *            <View style={styles.bottomSheet}>
 *              {/ * Drag handle * /}
 *              <View style={styles.handle} />
 *              
 *              {children}
 *            </View>
 *          </Pressable>
 *        </Modal>
 *      );
 *    }
 *    
 *    const styles = StyleSheet.create({
 *      backdrop: {
 *        flex: 1,
 *        backgroundColor: 'rgba(0, 0, 0, 0.5)',
 *        justifyContent: 'flex-end',
 *      },
 *      bottomSheet: {
 *        backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *        borderTopLeftRadius: 24,
 *        borderTopRightRadius: 24,
 *        padding: 24,
 *        borderTopWidth: 1,
 *        borderColor: 'rgba(255, 255, 255, 0.1)',
 *      },
 *      handle: {
 *        width: 40,
 *        height: 4,
 *        backgroundColor: 'rgba(255, 255, 255, 0.3)',
 *        borderRadius: 2,
 *        alignSelf: 'center',
 *        marginBottom: 16,
 *      },
 *    });
 *    ```
 * 
 * 7. THIRD-PARTY ALTERNATIVES:
 *    For more features, consider:
 *    
 *    - react-native-modal (enhanced modal with animations)
 *      npm install react-native-modal
 *      
 *    - @gorhom/bottom-sheet (professional bottom sheet)
 *      npm install @gorhom/bottom-sheet
 *      
 *    - react-native-paper (Material Design dialogs)
 *      npm install react-native-paper
 * 
 * 8. ACCESSIBILITY:
 *    ```tsx
 *    <Modal
 *      visible={open}
 *      transparent={true}
 *      animationType="fade"
 *      onRequestClose={onClose}
 *      accessible={true}
 *      accessibilityLabel="Dialog window"
 *      accessibilityViewIsModal={true} // Hides content behind modal
 *    >
 *      {/ * Content * /}
 *    </Modal>
 *    ```
 * 
 * 9. KEYBOARD HANDLING:
 *    For dialogs with inputs:
 *    ```tsx
 *    import { KeyboardAvoidingView, Platform } from 'react-native';
 *    
 *    <Modal visible={open}>
 *      <KeyboardAvoidingView
 *        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
 *        style={styles.backdrop}
 *      >
 *        {/ * Dialog content with inputs * /}
 *      </KeyboardAvoidingView>
 *    </Modal>
 *    ```
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Dialog opens/closes smoothly
 * - [ ] Backdrop closes dialog on tap
 * - [ ] Close button works
 * - [ ] Android back button closes dialog
 * - [ ] Content doesn't overflow dialog
 * - [ ] Animations perform well
 * - [ ] Keyboard doesn't cover inputs
 * - [ ] Accessible to screen readers
 * - [ ] Works in portrait/landscape
 * - [ ] iOS and Android compatible
 * 
 */

"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog@1.1.6";
import { XIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

// RN: Replace with React Native Modal component
// RN: See conversion examples above for full implementation

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  // RN: Control modal visibility with state prop
  // RN: <Modal visible={open} transparent={true} animationType="fade" onRequestClose={onClose}>
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  // RN: Replace with TouchableOpacity or Pressable
  // RN: <TouchableOpacity onPress={() => setOpen(true)}>
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  // RN: Not needed - Modal handles portal behavior automatically
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  // RN: Replace with TouchableOpacity
  // RN: <TouchableOpacity onPress={onClose}>
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  // RN: Replace with Pressable backdrop
  // RN: <Pressable style={styles.backdrop} onPress={onClose}>
  // RN:   <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.overlay} />
  // RN: </Pressable>
  // RN:
  // RN: styles.backdrop: {
  // RN:   flex: 1,
  // RN:   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // RN:   justifyContent: 'center',
  // RN:   alignItems: 'center',
  // RN: }
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  // RN: Convert to View with glassmorphic styling
  // RN: Wrap with Animated.View for entrance/exit animations
  // RN: <Animated.View 
  // RN:   entering={ZoomIn.duration(200)} 
  // RN:   exiting={ZoomOut.duration(200)}
  // RN:   style={styles.dialogContent}
  // RN: >
  // RN:   <View style={styles.dialog}>
  // RN:     // Close button
  // RN:     <TouchableOpacity style={styles.closeButton} onPress={onClose}>
  // RN:       <XIcon size={20} color="#ffffff" />
  // RN:     </TouchableOpacity>
  // RN:     
  // RN:     {children}
  // RN:   </View>
  // RN: </Animated.View>
  // RN:
  // RN: styles.dialogContent: {
  // RN:   width: '90%',
  // RN:   maxWidth: 500,
  // RN: },
  // RN: styles.dialog: {
  // RN:   backgroundColor: 'rgba(0, 0, 0, 0.9)',
  // RN:   borderRadius: 16,
  // RN:   padding: 24,
  // RN:   borderWidth: 1,
  // RN:   borderColor: 'rgba(255, 255, 255, 0.1)',
  // RN: },
  // RN: styles.closeButton: {
  // RN:   position: 'absolute',
  // RN:   top: 16,
  // RN:   right: 16,
  // RN:   zIndex: 10,
  // RN:   width: 32,
  // RN:   height: 32,
  // RN:   borderRadius: 16,
  // RN:   backgroundColor: 'rgba(255, 255, 255, 0.1)',
  // RN:   justifyContent: 'center',
  // RN:   alignItems: 'center',
  // RN: }
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  // RN: Convert to View
  // RN: <View style={styles.header}>
  // RN:   {children}
  // RN: </View>
  // RN:
  // RN: styles.header: {
  // RN:   marginBottom: 16,
  // RN: }
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  // RN: Convert to View with row layout
  // RN: <View style={styles.footer}>
  // RN:   {children}
  // RN: </View>
  // RN:
  // RN: styles.footer: {
  // RN:   flexDirection: 'row',
  // RN:   justifyContent: 'flex-end',
  // RN:   gap: 12,
  // RN:   marginTop: 24,
  // RN: }
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  // RN: Convert to Text component
  // RN: <Text style={styles.title}>
  // RN:   {children}
  // RN: </Text>
  // RN:
  // RN: styles.title: {
  // RN:   fontSize: 18,
  // RN:   fontWeight: '600',
  // RN:   color: '#ffffff',
  // RN:   marginBottom: 8,
  // RN: }
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  // RN: Convert to Text component
  // RN: <Text style={styles.description}>
  // RN:   {children}
  // RN: </Text>
  // RN:
  // RN: styles.description: {
  // RN:   fontSize: 14,
  // RN:   color: '#94a3b8', // var(--text-secondary)
  // RN:   lineHeight: 20,
  // RN: }
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
