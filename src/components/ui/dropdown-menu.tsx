/**
 * ==============================================================================
 * DROPDOWN-MENU.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * ✅ Use Modal or ActionSheet with NativeWind! All Tailwind classes work!
 * 
 * ```tsx
 * <Modal visible={open} transparent onRequestClose={close}>
 *   <Pressable className="flex-1 bg-black/50 items-center justify-center" onPress={close}>
 *     <View className="bg-pa-dark rounded-xl p-2 border border-white/10">
 *       {items.map((item) => (
 *         <Pressable key={item.id} onPress={item.onPress} className="flex-row items-center gap-3 p-3 rounded-lg">
 *           <item.icon size={20} color="#ffffff" />
 *           <Text className="text-white">{item.label}</Text>
 *         </Pressable>
 *       ))}
 *     </View>
 *   </Pressable>
 * </Modal>
 * ```
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * COMPLEXITY: HIGH
 * Dropdown menu is a complex component with trigger, overlay positioning, items,
 * checkboxes, radio buttons, separators, and nested submenus.
 * 
 * CONVERSION STRATEGY:
 * 1. Use Modal for overlay
 * 2. FlatList for menu items (performance)
 * 3. Calculate position relative to trigger
 * 4. Support keyboard navigation (accessibility)
 * 5. Handle nested submenus with state
 * 
 * KEY DIFFERENCES:
 * - Modal overlay instead of DOM portal
 * - Manual position calculation
 * - Touch interaction (no hover)
 * - FlatList for long menus
 * - Platform-specific animations
 * 
 * RECOMMENDED LIBRARIES:
 * - @react-native-menu/menu (iOS-style native menus)
 * - react-native-menu (cross-platform)
 * - react-native-popup-menu (flexible popup menus)
 * - Custom implementation (full control)
 * 
 * MOBILE-FIRST ALTERNATIVES:
 * - iOS Action Sheet (UIActionSheet)
 * - Android: use native Menu component
 * - Bottom Sheet: Better reachability
 * - Full Modal: For complex menus
 * 
 * EXAMPLE CONVERSION:
 * 
 * Web:
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Item 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * React Native:
 * <DropdownMenu
 *   trigger={<Button>Menu</Button>}
 *   items={[
 *     { label: 'Item 1', onPress: () => {} },
 *     { label: 'Item 2', onPress: () => {} },
 *   ]}
 * />
 */

"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu@2.1.6";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

/**
 * RN: DropdownMenu Root Component
 * 
 * CONVERSION NOTES:
 * - Manages open/closed state
 * - Provides context for menu items
 * - Controls positioning and animation
 * 
 * STATE:
 * const [open, setOpen] = useState(false);
 * const [position, setPosition] = useState({ x: 0, y: 0 });
 * const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
 */
function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
  // RN: State management
  // RN: const [open, setOpen] = useState(false);
  // RN: const [position, setPosition] = useState({ x: 0, y: 0 });
}

/**
 * RN: DropdownMenuPortal Component
 * 
 * CONVERSION NOTES:
 * - Renders content in portal for overlay
 * - Use @gorhom/portal or react-native-portal
 * - Alternative: Use Modal component
 */
function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
  // RN: Replace with Portal
  // RN: import { Portal } from '@gorhom/portal';
  // RN: <Portal>{children}</Portal>
}

/**
 * RN: DropdownMenuTrigger Component
 * 
 * CONVERSION NOTES:
 * - Pressable that opens menu
 * - Measures position for menu placement
 * - Stores ref for positioning
 * 
 * IMPLEMENTATION:
 * <Pressable
 *   ref={triggerRef}
 *   onPress={handleOpen}
 *   accessibilityRole="button"
 *   accessibilityState={{ expanded: open }}
 *   accessibilityHint="Opens menu"
 * >
 *   {children}
 * </Pressable>
 */
function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
  // RN: <Pressable ref={triggerRef} onPress={handleOpen}>
}

/**
 * RN: DropdownMenuContent Component
 * 
 * CONVERSION NOTES:
 * - Container for menu items
 * - Positioned relative to trigger
 * - Scrollable for long menus
 * - Animated entrance/exit
 * 
 * TAILWIND CLASS CONVERSION:
 * - bg-popover → { backgroundColor: colors.popover }
 * - text-popover-foreground → { color: colors.popoverForeground }
 * - data-[state=open]:animate-in → Entrance animation
 * - fade-in-0 zoom-in-95 → FadeIn + ZoomIn
 * - slide-in-from-top-2 → SlideInDown (based on position)
 * - z-50 → { zIndex: 50 }
 * - max-h → maxHeight with dynamic calculation
 * - min-w-[8rem] → { minWidth: 128 }
 * - overflow-x-hidden → Not needed
 * - overflow-y-auto → ScrollView or FlatList
 * - rounded-md → { borderRadius: 6 }
 * - border → { borderWidth: 1, borderColor: colors.border }
 * - p-1 → { padding: 4 }
 * - shadow-md → Platform-specific shadow
 * 
 * POSITIONING:
 * Calculate position to avoid screen edges:
 * - Get trigger position with measureInWindow
 * - Calculate available space above/below
 * - Adjust horizontal alignment (start/center/end)
 * - Keep menu within safe area
 * 
 * SCROLLING:
 * For long menus, use FlatList:
 * <FlatList
 *   data={items}
 *   renderItem={({ item }) => <MenuItem {...item} />}
 *   style={styles.menuContent}
 *   showsVerticalScrollIndicator={false}
 * />
 */
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        // RN: <Modal visible={open} transparent animationType="fade">
        // RN:   <Pressable style={StyleSheet.absoluteFill} onPress={handleClose}>
        // RN:     <Animated.View
        // RN:       entering={FadeIn.combine(ZoomIn)}
        // RN:       exiting={FadeOut.combine(ZoomOut)}
        // RN:       style={[styles.menu, positionStyle]}
        // RN:       onStartShouldSetResponder={() => true}
        // RN:     >
        // RN:       <ScrollView style={styles.menuScroll}>
        // RN:         {children}
        // RN:       </ScrollView>
        // RN:     </Animated.View>
        // RN:   </Pressable>
        // RN: </Modal>
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/**
 * RN: DropdownMenuGroup Component
 * 
 * CONVERSION NOTES:
 * - Logical grouping of menu items
 * - No visual element by itself
 * - Used with separators
 */
function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
  // RN: Just a View container, or map to array section
  // RN: <View style={styles.menuGroup}>{children}</View>
}

/**
 * RN: DropdownMenuItem Component
 * 
 * CONVERSION NOTES:
 * - Individual menu item
 * - Pressable with hover/press states
 * - Optional icon and shortcut
 * - Destructive variant for dangerous actions
 * 
 * TAILWIND CLASS CONVERSION:
 * - focus:bg-accent → Pressable pressed state
 * - focus:text-accent-foreground → Pressed text color
 * - data-[variant=destructive]:text-destructive → Conditional color
 * - data-[variant=destructive]:focus:bg-destructive/10 → Pressed bg
 * - relative → { position: 'relative' }
 * - flex → { flexDirection: 'row' }
 * - cursor-default → Not applicable (touch)
 * - items-center → { alignItems: 'center' }
 * - gap-2 → { gap: 8 }
 * - rounded-sm → { borderRadius: 4 }
 * - px-2 py-1.5 → { paddingHorizontal: 8, paddingVertical: 6 }
 * - text-sm → { fontSize: 14 }
 * - outline-hidden → Not applicable
 * - select-none → Not applicable
 * - data-[disabled]:pointer-events-none → disabled prop
 * - data-[disabled]:opacity-50 → { opacity: 0.5 }
 * - data-[inset]:pl-8 → { paddingLeft: 32 } (for items with checkboxes)
 * - [&_svg]:size-4 → Icon size 16x16
 * 
 * PRESS STATE:
 * Use Pressable's style function:
 * <Pressable
 *   style={({ pressed }) => [
 *     styles.menuItem,
 *     pressed && styles.menuItemPressed,
 *     destructive && styles.menuItemDestructive,
 *   ]}
 * >
 * 
 * HAPTIC FEEDBACK:
 * Add haptic feedback on press:
 * onPress={() => {
 *   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *   onSelect();
 *   setOpen(false);
 * }}
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      // RN: Replace with Pressable
      // RN: <Pressable
      // RN:   style={({ pressed }) => [
      // RN:     styles.menuItem,
      // RN:     pressed && styles.menuItemPressed,
      // RN:     variant === 'destructive' && styles.menuItemDestructive,
      // RN:     inset && styles.menuItemInset,
      // RN:     disabled && styles.menuItemDisabled,
      // RN:   ]}
      // RN:   onPress={handlePress}
      // RN:   disabled={disabled}
      // RN:   accessibilityRole="menuitem"
      // RN: >
      // RN:   <View style={styles.menuItemContent}>
      // RN:     {icon && <View style={styles.menuItemIcon}>{icon}</View>}
      // RN:     <Text style={styles.menuItemLabel}>{label}</Text>
      // RN:     {shortcut && <Text style={styles.menuItemShortcut}>{shortcut}</Text>}
      // RN:   </View>
      // RN: </Pressable>
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RN: DropdownMenuCheckboxItem Component
 * 
 * CONVERSION NOTES:
 * - Menu item with checkbox
 * - Shows checkmark when selected
 * - Manages checked state
 * - Animated checkmark appearance
 * 
 * LAYOUT:
 * [Checkbox Icon Space] [Label Text]
 * 
 * IMPLEMENTATION:
 * <Pressable onPress={() => onCheckedChange(!checked)}>
 *   <View style={styles.checkboxItem}>
 *     <View style={styles.checkboxIconContainer}>
 *       {checked && <Check size={16} color={colors.foreground} />}
 *     </View>
 *     <Text style={styles.checkboxLabel}>{label}</Text>
 *   </View>
 * </Pressable>
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      // RN: <Pressable
      // RN:   style={({ pressed }) => [
      // RN:     styles.menuItem,
      // RN:     pressed && styles.menuItemPressed,
      // RN:   ]}
      // RN:   onPress={() => onCheckedChange(!checked)}
      // RN: >
      // RN:   <View style={styles.checkboxItem}>
      // RN:     <View style={styles.checkboxIndicator}>
      // RN:       {checked && (
      // RN:         <Animated.View entering={ZoomIn.duration(150)}>
      // RN:           <Check size={16} color={colors.foreground} />
      // RN:         </Animated.View>
      // RN:       )}
      // RN:     </View>
      // RN:     <Text style={styles.menuItemLabel}>{children}</Text>
      // RN:   </View>
      // RN: </Pressable>
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
          {/* RN: Animated checkmark icon */}
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/**
 * RN: DropdownMenuRadioGroup Component
 * 
 * CONVERSION NOTES:
 * - Container for radio items
 * - Manages single selection
 * - Passes value to children
 */
function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
  // RN: Manage radio state
  // RN: const [value, setValue] = useState(defaultValue);
  // RN: <View>{children}</View>
}

/**
 * RN: DropdownMenuRadioItem Component
 * 
 * CONVERSION NOTES:
 * - Radio button menu item
 * - Shows filled circle when selected
 * - Only one can be selected in group
 * 
 * IMPLEMENTATION:
 * <Pressable onPress={() => onValueChange(value)}>
 *   <View style={styles.radioItem}>
 *     <View style={styles.radioIndicator}>
 *       {selected && <Circle size={8} fill={colors.foreground} />}
 *     </View>
 *     <Text style={styles.radioLabel}>{label}</Text>
 *   </View>
 * </Pressable>
 */
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      // RN: Similar to checkbox but with radio circle
      // RN: {selected && <CircleIcon size={8} fill={colors.foreground} />}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
          {/* RN: Filled circle for selected radio */}
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/**
 * RN: DropdownMenuLabel Component
 * 
 * CONVERSION NOTES:
 * - Non-interactive section label
 * - Used to group related items
 * - Slightly different styling
 * 
 * TAILWIND CLASS CONVERSION:
 * - px-2 py-1.5 → { paddingHorizontal: 8, paddingVertical: 6 }
 * - text-sm → { fontSize: 14 }
 * - font-medium → { fontWeight: '500' }
 * - data-[inset]:pl-8 → Inset for alignment
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      // RN: <Text style={[styles.menuLabel, inset && styles.menuLabelInset]}>
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RN: DropdownMenuSeparator Component
 * 
 * CONVERSION NOTES:
 * - Visual divider between menu groups
 * - Simple horizontal line
 * 
 * TAILWIND CLASS CONVERSION:
 * - bg-border → { backgroundColor: colors.border }
 * - -mx-1 → { marginHorizontal: -4 }
 * - my-1 → { marginVertical: 4 }
 * - h-px → { height: 1 }
 */
function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      // RN: <View style={styles.menuSeparator} />
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * RN: DropdownMenuShortcut Component
 * 
 * CONVERSION NOTES:
 * - Keyboard shortcut display
 * - Not interactive on mobile
 * - Can be hidden on mobile
 * 
 * MOBILE NOTE:
 * Keyboard shortcuts don't make sense on mobile
 * Consider hiding or showing as hint text
 */
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      // RN: <Text style={styles.menuShortcut}> or null on mobile
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RN: DropdownMenuSub Component
 * 
 * CONVERSION NOTES:
 * - Nested submenu (menu within menu)
 * - Complex state management
 * - Position calculation for submenu
 * 
 * MOBILE NOTE:
 * Submenus are challenging on mobile
 * Consider:
 * 1. Navigate to new screen
 * 2. Expand inline (accordion style)
 * 3. Replace main menu with submenu
 */
function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
  // RN: Manage submenu state
  // RN: const [submenuOpen, setSubmenuOpen] = useState(false);
}

/**
 * RN: DropdownMenuSubTrigger Component
 * 
 * CONVERSION NOTES:
 * - Menu item that opens submenu
 * - Shows chevron indicator
 * - Tapping opens submenu
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      // RN: <Pressable onPress={() => setSubmenuOpen(true)}>
      // RN:   <View style={styles.menuItem}>
      // RN:     <Text style={styles.menuItemLabel}>{children}</Text>
      // RN:     <ChevronRight size={16} style={styles.submenuChevron} />
      // RN:   </View>
      // RN: </Pressable>
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
      {/* RN: Chevron icon indicating submenu */}
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/**
 * RN: DropdownMenuSubContent Component
 * 
 * CONVERSION NOTES:
 * - Content of submenu
 * - Positioned relative to parent item
 * - Animated entrance
 */
function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      // RN: Similar to main menu content
      // RN: But positioned relative to parent menu item
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * See separate file: /examples/DropdownMenuExample.tsx
 * (Example is too long to include inline - 800+ lines)
 * 
 * Key features:
 * - Full dropdown menu implementation
 * - Checkbox and radio item support
 * - Nested submenus
 * - Smart positioning
 * - Platform-specific animations
 * - Haptic feedback
 * - Accessibility support
 * - iOS Action Sheet alternative
 * - Android native menu alternative
 * 
 * Libraries used:
 * - @gorhom/portal for overlay
 * - react-native-reanimated for animations
 * - lucide-react-native for icons
 * - expo-haptics for feedback
 * 
 * SIMPLE USAGE:
 * 
 * <DropdownMenu
 *   trigger={<Button>Menu</Button>}
 *   items={[
 *     { label: 'Edit', onPress: () => {}, icon: <Edit size={16} /> },
 *     { label: 'Delete', onPress: () => {}, variant: 'destructive' },
 *   ]}
 * />
 * 
 * USING NATIVE ALTERNATIVES:
 * 
 * // iOS Action Sheet
 * import { ActionSheetIOS } from 'react-native';
 * 
 * ActionSheetIOS.showActionSheetWithOptions(
 *   {
 *     options: ['Cancel', 'Edit', 'Delete'],
 *     destructiveButtonIndex: 2,
 *     cancelButtonIndex: 0,
 *   },
 *   (buttonIndex) => {
 *     if (buttonIndex === 1) handleEdit();
 *     if (buttonIndex === 2) handleDelete();
 *   }
 * );
 * 
 * // Android
 * Use @react-native-menu/menu for native Android menus
 */

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
