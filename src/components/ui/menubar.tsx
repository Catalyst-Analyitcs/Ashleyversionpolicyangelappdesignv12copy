/**
 * ==============================================================================
 * MENUBAR.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * ✅ Convert to drawer or bottom nav with NativeWind! All Tailwind classes work!
 * 
 * ```tsx
 * // Use DrawerNavigation or BottomNavigation instead
 * // All Tailwind classes preserved in converted components
 * // See /components/BottomNavigation.tsx for example
 * ```
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * COMPLEXITY: HIGH
 * CONVERSION APPROACH: Not typically used on mobile - replace with drawer/tabs
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-menubar → Not standard on mobile, use alternatives
 * - lucide-react → react-native-vector-icons
 * 
 * KEY CONVERSION NOTES:
 * 1. Desktop-style menubar is not common on mobile
 * 2. Mobile alternatives: Tab bar, Drawer navigation, Action sheet
 * 3. If needed: Custom implementation with modals
 * 4. Consider if menubar is necessary - often better UX without it
 * 
 * MOBILE ALTERNATIVES:
 * 1. **Tab Bar** (react-navigation bottom tabs) - Most common
 * 2. **Drawer** (react-navigation drawer) - For many options
 * 3. **Action Sheet** (@expo/react-native-action-sheet) - For contextual actions
 * 4. **Dropdown** (Custom modal) - For settings/filters
 * 5. **Segmented Control** (iOS-style) - For 2-4 options
 * 
 * REACT NATIVE IMPLEMENTATION (Tab Bar - Recommended):
 * ```tsx
 * import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * const Tab = createBottomTabNavigator();
 * 
 * export function AppTabs() {
 *   return (
 *     <Tab.Navigator
 *       screenOptions={({ route }) => ({
 *         tabBarIcon: ({ focused, color, size }) => {
 *           const icons = {
 *             Home: 'home',
 *             Search: 'search',
 *             Profile: 'user',
 *           };
 *           return <Icon name={icons[route.name]} size={size} color={color} />;
 *         },
 *         tabBarActiveTintColor: '#D4AF37',
 *         tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
 *         tabBarStyle: {
 *           backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *           borderTopWidth: 1,
 *           borderTopColor: 'rgba(255, 255, 255, 0.1)',
 *         },
 *       })}
 *     >
 *       <Tab.Screen name="Home" component={HomeScreen} />
 *       <Tab.Screen name="Search" component={SearchScreen} />
 *       <Tab.Screen name="Profile" component={ProfileScreen} />
 *     </Tab.Navigator>
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Drawer):
 * ```tsx
 * import { createDrawerNavigator } from '@react-navigation/drawer';
 * 
 * const Drawer = createDrawerNavigator();
 * 
 * export function AppDrawer() {
 *   return (
 *     <Drawer.Navigator
 *       screenOptions={{
 *         drawerStyle: {
 *           backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *         },
 *         drawerActiveTintColor: '#D4AF37',
 *         drawerInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
 *       }}
 *     >
 *       <Drawer.Screen name="Dashboard" component={DashboardScreen} />
 *       <Drawer.Screen name="Properties" component={PropertiesScreen} />
 *       <Drawer.Screen name="Reports" component={ReportsScreen} />
 *       <Drawer.Screen name="Settings" component={SettingsScreen} />
 *     </Drawer.Navigator>
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Action Sheet):
 * ```tsx
 * import { useActionSheet } from '@expo/react-native-action-sheet';
 * import { Pressable, Text } from 'react-native';
 * 
 * export function ActionMenu() {
 *   const { showActionSheetWithOptions } = useActionSheet();
 * 
 *   const showMenu = () => {
 *     const options = ['Edit', 'Share', 'Delete', 'Cancel'];
 *     const destructiveButtonIndex = 2;
 *     const cancelButtonIndex = 3;
 * 
 *     showActionSheetWithOptions(
 *       {
 *         options,
 *         cancelButtonIndex,
 *         destructiveButtonIndex,
 *         title: 'Property Actions',
 *         message: 'Choose an action',
 *         containerStyle: {
 *           backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *         },
 *         textStyle: {
 *           color: '#fff',
 *         },
 *       },
 *       (selectedIndex) => {
 *         switch (selectedIndex) {
 *           case 0:
 *             // Edit
 *             break;
 *           case 1:
 *             // Share
 *             break;
 *           case 2:
 *             // Delete
 *             break;
 *         }
 *       }
 *     );
 *   };
 * 
 *   return (
 *     <Pressable onPress={showMenu}>
 *       <Text>More Options</Text>
 *     </Pressable>
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Custom Dropdown):
 * ```tsx
 * import { Modal, View, Pressable, Text } from 'react-native';
 * import { useState } from 'react';
 * 
 * export function MenuDropdown({ items }: { items: MenuItem[] }) {
 *   const [visible, setVisible] = useState(false);
 * 
 *   return (
 *     <>
 *       <Pressable onPress={() => setVisible(true)}>
 *         <Text>Menu</Text>
 *       </Pressable>
 * 
 *       <Modal visible={visible} transparent animationType="fade">
 *         <Pressable
 *           style={styles.overlay}
 *           onPress={() => setVisible(false)}
 *         >
 *           <View style={styles.menu}>
 *             {items.map((item, index) => (
 *               <Pressable
 *                 key={index}
 *                 style={styles.menuItem}
 *                 onPress={() => {
 *                   item.onSelect();
 *                   setVisible(false);
 *                 }}
 *               >
 *                 <Text style={styles.menuItemText}>{item.label}</Text>
 *               </Pressable>
 *             ))}
 *           </View>
 *         </Pressable>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 * 
 * POLICYANGEL-SPECIFIC NAVIGATION:
 * - Bottom Tab Bar: Dashboard, Properties, Calendar, Profile
 * - Drawer: Full menu with all app sections
 * - Action Sheet: Property/document quick actions
 * - Floating Action Button: Primary actions
 * 
 * WHEN TO USE EACH:
 * 1. **Tab Bar**: 3-5 main sections, always visible
 * 2. **Drawer**: 6+ sections, secondary navigation
 * 3. **Action Sheet**: Contextual actions on items
 * 4. **Dropdown**: Filter/sort options
 * 5. **Header Buttons**: Settings, notifications, search
 * 
 * ACCESSIBILITY:
 * - Tab bar items: accessibilityRole="tab"
 * - Drawer items: accessibilityRole="button"
 * - Action sheet: Announce options with VoiceOver
 * - Label all navigation items clearly
 * - Support gesture-based navigation
 * 
 * NAVIGATION PATTERNS:
 * - Stack navigation for hierarchical screens
 * - Tab navigation for peer screens
 * - Modal for temporary tasks
 * - Drawer for global navigation
 * 
 * PERFORMANCE:
 * - Lazy load tab screens
 * - Persist tab state
 * - Optimize drawer rendering
 * - Cache navigation state
 */

"use client";

import * as React from "react";
// WEB: Radix UI for desktop-style menubar
// REACT NATIVE: Not standard on mobile - use Tab Navigator or Drawer instead
// This component is rarely needed in mobile apps
import * as MenubarPrimitive from "@radix-ui/react-menubar@1.1.6";
// WEB: Lucide icons
// REACT NATIVE: react-native-vector-icons
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  // WEB: Desktop-style horizontal menubar (File, Edit, View, etc.)
  // REACT NATIVE: Not common on mobile. Use instead:
  // 
  // 1. BOTTOM TAB BAR (most common):
  // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  // const Tab = createBottomTabNavigator();
  // 
  // 2. DRAWER NAVIGATION (for many options):
  // import { createDrawerNavigator } from '@react-navigation/drawer';
  // const Drawer = createDrawerNavigator();
  // 
  // 3. HEADER BUTTONS (for actions):
  // <Stack.Navigator>
  //   <Stack.Screen
  //     options={{
  //       headerRight: () => <Button onPress={...} />
  //     }}
  //   />
  // </Stack.Navigator>
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  // WEB: Individual menu in the menubar
  // REACT NATIVE: Tab.Screen or Drawer.Screen
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  // WEB: Group of related menu items
  // REACT NATIVE: Section in tab or drawer
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  // WEB: Portal for menu dropdown overlay
  // REACT NATIVE: Modal handles overlay rendering
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  // WEB: Radio group in menu
  // REACT NATIVE: Segmented control or radio group in modal
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  );
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  // WEB: Button that opens menu dropdown
  // REACT NATIVE: Tab bar icon or drawer menu button
  // <Pressable onPress={() => navigation.navigate('Screen')}>
  //   <Icon name="menu" size={24} />
  // </Pressable>
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className,
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  // WEB: Dropdown menu content
  // REACT NATIVE: Modal with menu items or action sheet
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  );
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  // WEB: Individual menu item
  // REACT NATIVE: Pressable in action sheet or drawer
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
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

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  // WEB: Checkbox menu item
  // REACT NATIVE: Checkbox in modal or settings screen
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  // WEB: Radio menu item
  // REACT NATIVE: Radio button in modal
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
}) {
  // WEB: Non-interactive label
  // REACT NATIVE: Text heading in menu
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  // WEB: Visual separator
  // REACT NATIVE: View with border
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  // WEB: Keyboard shortcut indicator
  // REACT NATIVE: Not applicable (no keyboard shortcuts)
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  // WEB: Submenu
  // REACT NATIVE: Nested navigation or separate screen
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  // WEB: Submenu trigger with chevron
  // REACT NATIVE: Pressable that navigates to submenu
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  // WEB: Submenu content
  // REACT NATIVE: Modal or new screen
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
