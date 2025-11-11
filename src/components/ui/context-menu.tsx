/**
 * ==============================================================================
 * CONTEXT-MENU.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * ✅ Use onLongPress + Modal with NativeWind! All Tailwind classes work!
 * 
 * ```tsx
 * <Pressable onLongPress={() => { Haptics.impactAsync(); setMenuOpen(true); }}>
 *   <Text>Press and hold</Text>
 * </Pressable>
 * 
 * <Modal visible={menuOpen} transparent onRequestClose={() => setMenuOpen(false)}>
 *   <Pressable className="flex-1 bg-black/50 items-center justify-center" onPress={() => setMenuOpen(false)}>
 *     <View className="bg-pa-dark rounded-xl p-2">
 *       {/* Menu items with all Tailwind classes */}
 *     </View>
 *   </Pressable>
 * </Modal>
 * ```
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * COMPLEXITY: HIGH
 * CONVERSION APPROACH: Long press gesture with Modal menu
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-context-menu → Custom long press with Modal or react-native-menu
 * - lucide-react → react-native-vector-icons
 * 
 * RECOMMENDED PACKAGES:
 * - react-native-menu (iOS-native context menus)
 * - @react-native-menu/menu (cross-platform)
 * - react-native-gesture-handler for long press
 * 
 * KEY CONVERSION NOTES:
 * 1. Right-click → Long press gesture (minimum 500ms)
 * 2. No mouse hover states on mobile
 * 3. Modal or bottom sheet for menu display
 * 4. Native iOS UIMenu for iOS 14+ (better UX)
 * 5. Haptic feedback on long press
 * 
 * REACT NATIVE IMPLEMENTATION (Custom):
 * ```tsx
 * import {
 *   View,
 *   Modal,
 *   Pressable,
 *   Text,
 *   TouchableWithoutFeedback,
 *   Vibration,
 * } from 'react-native';
 * import { useState } from 'react';
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * interface ContextMenuItem {
 *   label: string;
 *   icon?: string;
 *   onSelect: () => void;
 *   destructive?: boolean;
 *   disabled?: boolean;
 * }
 * 
 * interface ContextMenuProps {
 *   items: ContextMenuItem[];
 *   children: React.ReactNode;
 * }
 * 
 * export function ContextMenu({ items, children }: ContextMenuProps) {
 *   const [visible, setVisible] = useState(false);
 *   const [position, setPosition] = useState({ x: 0, y: 0 });
 * 
 *   const handleLongPress = (event: any) => {
 *     // Haptic feedback
 *     Vibration.vibrate(50);
 *     
 *     // Get touch position for menu placement
 *     const { pageX, pageY } = event.nativeEvent;
 *     setPosition({ x: pageX, y: pageY });
 *     setVisible(true);
 *   };
 * 
 *   const handleItemPress = (item: ContextMenuItem) => {
 *     setVisible(false);
 *     setTimeout(() => item.onSelect(), 100);
 *   };
 * 
 *   return (
 *     <>
 *       <Pressable
 *         onLongPress={handleLongPress}
 *         delayLongPress={500}
 *         accessibilityRole="button"
 *         accessibilityHint="Long press to open context menu"
 *       >
 *         {children}
 *       </Pressable>
 * 
 *       <Modal
 *         visible={visible}
 *         transparent
 *         animationType="fade"
 *         onRequestClose={() => setVisible(false)}
 *       >
 *         <TouchableWithoutFeedback onPress={() => setVisible(false)}>
 *           <View style={styles.overlay}>
 *             <TouchableWithoutFeedback>
 *               <View
 *                 style={[
 *                   styles.menu,
 *                   { top: position.y, left: position.x },
 *                 ]}
 *               >
 *                 {items.map((item, index) => (
 *                   <Pressable
 *                     key={index}
 *                     style={({ pressed }) => [
 *                       styles.menuItem,
 *                       pressed && styles.menuItemPressed,
 *                       item.destructive && styles.menuItemDestructive,
 *                     ]}
 *                     onPress={() => handleItemPress(item)}
 *                     disabled={item.disabled}
 *                     accessibilityRole="menuitem"
 *                     accessibilityLabel={item.label}
 *                   >
 *                     {item.icon && (
 *                       <Icon
 *                         name={item.icon}
 *                         size={18}
 *                         color={
 *                           item.destructive
 *                             ? '#EF4444'
 *                             : 'rgba(255, 255, 255, 0.6)'
 *                         }
 *                       />
 *                     )}
 *                     <Text
 *                       style={[
 *                         styles.menuItemText,
 *                         item.destructive && styles.menuItemTextDestructive,
 *                       ]}
 *                     >
 *                       {item.label}
 *                     </Text>
 *                   </Pressable>
 *                 ))}
 *               </View>
 *             </TouchableWithoutFeedback>
 *           </View>
 *         </TouchableWithoutFeedback>
 *       </Modal>
 *     </>
 *   );
 * }
 * 
 * const styles = {
 *   overlay: {
 *     flex: 1,
 *     backgroundColor: 'rgba(0, 0, 0, 0.4)',
 *   },
 *   menu: {
 *     position: 'absolute',
 *     backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *     borderRadius: 12,
 *     padding: 8,
 *     minWidth: 200,
 *     borderWidth: 1,
 *     borderColor: 'rgba(255, 255, 255, 0.1)',
 *     shadowColor: '#000',
 *     shadowOffset: { width: 0, height: 4 },
 *     shadowOpacity: 0.3,
 *     shadowRadius: 12,
 *     elevation: 8,
 *   },
 *   menuItem: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     paddingVertical: 12,
 *     paddingHorizontal: 12,
 *     gap: 12,
 *     borderRadius: 8,
 *   },
 *   menuItemPressed: {
 *     backgroundColor: 'rgba(212, 175, 55, 0.1)',
 *   },
 *   menuItemDestructive: {
 *     // Destructive items get red text
 *   },
 *   menuItemText: {
 *     color: '#fff',
 *     fontSize: 14,
 *   },
 *   menuItemTextDestructive: {
 *     color: '#EF4444',
 *   },
 * };
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (iOS Native Menu):
 * ```tsx
 * import { MenuView } from '@react-native-menu/menu';
 * 
 * export function ContextMenuNative({ items, children }: ContextMenuProps) {
 *   const menuActions = items.map((item) => ({
 *     id: item.label,
 *     title: item.label,
 *     image: item.icon,
 *     attributes: {
 *       destructive: item.destructive,
 *       disabled: item.disabled,
 *     },
 *   }));
 * 
 *   return (
 *     <MenuView
 *       actions={menuActions}
 *       onPressAction={({ nativeEvent }) => {
 *         const item = items.find((i) => i.label === nativeEvent.event);
 *         item?.onSelect();
 *       }}
 *     >
 *       {children}
 *     </MenuView>
 *   );
 * }
 * ```
 * 
 * ACCESSIBILITY:
 * - Use accessibilityHint="Long press for options"
 * - accessibilityRole="button" for trigger
 * - accessibilityRole="menuitem" for each item
 * - Announce menu open with accessibilityLiveRegion
 * - Support VoiceOver gesture alternatives
 * 
 * GESTURE HANDLING:
 * - Long press duration: 500ms (standard)
 * - Haptic feedback on activation (Vibration.vibrate(50))
 * - Cancel if finger moves too far during press
 * - Dismiss on tap outside menu
 * - Dismiss on scroll if menu is modal
 * 
 * MENU POSITIONING:
 * - Calculate position based on touch coordinates
 * - Adjust if menu would go off-screen
 * - Prefer bottom-right placement
 * - Use arrow indicator pointing to trigger
 * - Consider safe area insets
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - Property card actions: Edit, Share, Delete, View Details
 * - Document actions: Download, Share, Rename, Delete
 * - Image gallery: Save, Share, Edit, Set as Cover
 * - Map marker: View Details, Get Directions, Share Location
 * - Calendar event: Edit, Delete, Duplicate, Change Status
 * - Chat message: Reply, Forward, Copy, Delete
 * 
 * MENU ITEMS:
 * - Icons from react-native-vector-icons
 * - Destructive actions (delete) in red
 * - Disabled states with opacity
 * - Checkmarks for selected options
 * - Separators between groups
 * - Submenus with chevron indicators
 * 
 * PLATFORM DIFFERENCES:
 * - iOS: Native UIMenu for iOS 14+ (better UX)
 * - Android: Material Design bottom sheet or custom modal
 * - Web: Right-click context menu
 * - Consider platform-specific patterns
 * 
 * PERFORMANCE:
 * - Lazy render menu content (only when visible)
 * - Memoize menu items
 * - Avoid re-renders during animation
 * - Use native driver for modal animation
 * 
 * STYLING NOTES:
 * - Dark glassmorphic background
 * - Rounded corners with border
 * - Subtle shadow/elevation
 * - Golden accent for pressed state
 * - Red text for destructive actions
 */

"use client";

import * as React from "react";
// WEB: Radix UI for right-click context menus
// REACT NATIVE: Long press gesture with Modal or @react-native-menu/menu
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu@2.2.6";
// WEB: Lucide icons
// REACT NATIVE: react-native-vector-icons
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  // WEB: Root context menu container
  // REACT NATIVE: Wrap children in Pressable with onLongPress
  // <Pressable onLongPress={handleLongPress} delayLongPress={500}>
  //   {children}
  // </Pressable>
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  // WEB: Element that triggers context menu on right-click
  // REACT NATIVE: Pressable with long press gesture
  // Add haptic feedback: Vibration.vibrate(50)
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  // WEB: Group related menu items
  // REACT NATIVE: Use separators between groups
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  // WEB: Portal for menu overlay
  // REACT NATIVE: Modal component handles portalling
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  // WEB: Submenu container
  // REACT NATIVE: Navigate to submenu or show in same modal
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  // WEB: Radio button group in menu
  // REACT NATIVE: Same pattern with radio indicators
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  // WEB: Menu item that opens a submenu
  // REACT NATIVE: Pressable with chevron, opens new modal or expands
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
      {/* REACT NATIVE: <Icon name="chevron-right" size={18} /> */}
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  // WEB: Submenu content with positioning
  // REACT NATIVE: Modal or slide-in animation
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      // REACT NATIVE: Use Animated API for slide/fade animations
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  // WEB: Main menu content with animations
  // REACT NATIVE: Modal with custom positioning based on touch coordinates
  // Calculate position to avoid going off-screen:
  // const menuX = Math.min(touchX, screenWidth - menuWidth - 16);
  // const menuY = Math.min(touchY, screenHeight - menuHeight - 16);
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        // REACT NATIVE:
        // <View style={{ 
        //   position: 'absolute',
        //   top: menuY,
        //   left: menuX,
        //   backgroundColor: 'rgba(0,0,0,0.95)',
        //   borderRadius: 12,
        //   padding: 8,
        //   minWidth: 200,
        // }}>
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  // WEB: Individual menu item
  // REACT NATIVE: Pressable with icon and text
  // <Pressable
  //   style={({ pressed }) => [
  //     styles.menuItem,
  //     pressed && styles.menuItemPressed,
  //     variant === 'destructive' && styles.menuItemDestructive,
  //   ]}
  //   onPress={onSelect}
  //   accessibilityRole="menuitem"
  // >
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  // WEB: Checkbox menu item with check indicator
  // REACT NATIVE: Pressable with conditional check icon
  // {checked && <Icon name="check" size={18} color="#D4AF37" />}
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
          {/* REACT NATIVE: Conditionally render check icon */}
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  // WEB: Radio menu item with circle indicator
  // REACT NATIVE: Similar to checkbox but with radio-button icon
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
          {/* REACT NATIVE: <Icon name="radio-button-checked" /> */}
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  // WEB: Non-interactive label for menu sections
  // REACT NATIVE: Text component with heading styles
  // <Text style={styles.menuLabel}>{label}</Text>
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  // WEB: Visual separator between menu groups
  // REACT NATIVE: View with border
  // <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 8 }} />
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  // WEB: Keyboard shortcut indicator
  // REACT NATIVE: Not typically used on mobile (no keyboard shortcuts)
  // Optional for tablet users
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
