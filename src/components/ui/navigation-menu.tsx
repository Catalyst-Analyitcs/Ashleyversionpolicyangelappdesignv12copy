/**
 * ==============================================================================
 * NAVIGATION-MENU.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * ✅ Use @react-navigation with NativeWind! All Tailwind classes work!
 * 
 * ```tsx
 * import { useNavigation, useRoute } from '@react-navigation/native';
 * const navigation = useNavigation();
 * const route = useRoute();
 * 
 * {menuItems.map((item) => (
 *   <Pressable key={item.name} onPress={() => navigation.navigate(item.name)} className={`flex-row items-center gap-2 p-3 rounded-lg ${route.name === item.name ? 'bg-pa-gold' : 'bg-transparent'}`}>
 *     <item.icon size={20} />
 *     <Text>{item.label}</Text>
 *   </Pressable>
 * ))}
 * ```
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * COMPLEXITY: HIGH
 * CONVERSION APPROACH: Replace with React Navigation (Stack, Tab, Drawer)
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-navigation-menu → @react-navigation/native
 * - class-variance-authority → Custom style variants
 * - lucide-react → react-native-vector-icons
 * 
 * RECOMMENDED PACKAGES:
 * - @react-navigation/native (core navigation)
 * - @react-navigation/stack (stack navigation)
 * - @react-navigation/bottom-tabs (tab navigation)
 * - @react-navigation/drawer (drawer navigation)
 * - react-native-screens (performance)
 * - react-native-safe-area-context (safe areas)
 * 
 * KEY CONVERSION NOTES:
 * 1. Desktop navigation menus don't translate well to mobile
 * 2. Use React Navigation's tab or drawer instead
 * 3. Dropdowns become separate screens or modals
 * 4. Hover states become press states
 * 5. Stack navigation for hierarchical content
 * 
 * REACT NATIVE IMPLEMENTATION (Bottom Tabs):
 * ```tsx
 * import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 * import { NavigationContainer } from '@react-navigation/native';
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * const Tab = createBottomTabNavigator();
 * 
 * export function AppNavigation() {
 *   return (
 *     <NavigationContainer>
 *       <Tab.Navigator
 *         screenOptions={({ route }) => ({
 *           tabBarIcon: ({ focused, color, size }) => {
 *             const icons = {
 *               Dashboard: 'home',
 *               Properties: 'map',
 *               Calendar: 'calendar',
 *               Profile: 'user',
 *             };
 *             return (
 *               <Icon
 *                 name={icons[route.name]}
 *                 size={size}
 *                 color={color}
 *               />
 *             );
 *           },
 *           tabBarActiveTintColor: '#D4AF37',
 *           tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
 *           tabBarStyle: {
 *             backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *             borderTopWidth: 1,
 *             borderTopColor: 'rgba(255, 255, 255, 0.1)',
 *             paddingBottom: 8,
 *             height: 60,
 *           },
 *           tabBarLabelStyle: {
 *             fontSize: 12,
 *             fontWeight: '500',
 *           },
 *           headerStyle: {
 *             backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *           },
 *           headerTintColor: '#fff',
 *         })}
 *       >
 *         <Tab.Screen name="Dashboard" component={DashboardScreen} />
 *         <Tab.Screen name="Properties" component={PropertiesScreen} />
 *         <Tab.Screen name="Calendar" component={CalendarScreen} />
 *         <Tab.Screen name="Profile" component={ProfileScreen} />
 *       </Tab.Navigator>
 *     </NavigationContainer>
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Drawer Navigation):
 * ```tsx
 * import { createDrawerNavigator } from '@react-navigation/drawer';
 * 
 * const Drawer = createDrawerNavigator();
 * 
 * export function DrawerNavigation() {
 *   return (
 *     <Drawer.Navigator
 *       screenOptions={{
 *         drawerStyle: {
 *           backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *           width: 280,
 *         },
 *         drawerActiveTintColor: '#D4AF37',
 *         drawerInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
 *         drawerLabelStyle: {
 *           fontSize: 16,
 *           fontWeight: '500',
 *         },
 *         headerStyle: {
 *           backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *         },
 *         headerTintColor: '#fff',
 *       }}
 *     >
 *       <Drawer.Screen
 *         name="Dashboard"
 *         component={DashboardScreen}
 *         options={{
 *           drawerIcon: ({ color, size }) => (
 *             <Icon name="home" size={size} color={color} />
 *           ),
 *         }}
 *       />
 *       <Drawer.Screen
 *         name="Properties"
 *         component={PropertiesScreen}
 *         options={{
 *           drawerIcon: ({ color, size }) => (
 *             <Icon name="map" size={size} color={color} />
 *           ),
 *         }}
 *       />
 *       <Drawer.Screen
 *         name="Settings"
 *         component={SettingsScreen}
 *         options={{
 *           drawerIcon: ({ color, size }) => (
 *             <Icon name="settings" size={size} color={color} />
 *           ),
 *         }}
 *       />
 *     </Drawer.Navigator>
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Stack with Dropdown):
 * ```tsx
 * import { createStackNavigator } from '@react-navigation/stack';
 * import { Modal, View, Pressable, Text } from 'react-native';
 * import { useState } from 'react';
 * 
 * const Stack = createStackNavigator();
 * 
 * // Custom dropdown menu component
 * export function DropdownMenu({ items, trigger }: DropdownMenuProps) {
 *   const [visible, setVisible] = useState(false);
 * 
 *   return (
 *     <>
 *       <Pressable onPress={() => setVisible(true)}>
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
 *           <View style={styles.dropdown}>
 *             {items.map((item, index) => (
 *               <Pressable
 *                 key={index}
 *                 style={styles.dropdownItem}
 *                 onPress={() => {
 *                   item.onPress();
 *                   setVisible(false);
 *                 }}
 *               >
 *                 <Text style={styles.dropdownItemText}>{item.label}</Text>
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
 * - Bottom Tabs: Dashboard, Properties, Inspections, Profile
 * - Drawer: All app sections, settings, help
 * - Stack: Property details, inspection flow, forms
 * - Modal: Quick actions, filters, sort options
 * 
 * NAVIGATION STRUCTURE:
 * ```tsx
 * // Typical mobile app structure
 * <NavigationContainer>
 *   <Drawer.Navigator>
 *     <Drawer.Screen name="Main">
 *       {() => (
 *         <Tab.Navigator>
 *           <Tab.Screen name="Dashboard">
 *             {() => (
 *               <Stack.Navigator>
 *                 <Stack.Screen name="DashboardHome" />
 *                 <Stack.Screen name="PropertyDetails" />
 *               </Stack.Navigator>
 *             )}
 *           </Tab.Screen>
 *         </Tab.Navigator>
 *       )}
 *     </Drawer.Screen>
 *   </Drawer.Navigator>
 * </NavigationContainer>
 * ```
 * 
 * ACCESSIBILITY:
 * - Tab bar: accessibilityRole="tablist"
 * - Tab items: accessibilityRole="tab"
 * - Drawer items: accessibilityRole="button"
 * - Active state: accessibilityState={{ selected: true }}
 * - Screen titles for VoiceOver
 * 
 * GESTURES:
 * - Swipe from edge to open drawer
 * - Swipe between tabs (optional)
 * - Back gesture on stack
 * - Pull to refresh on screens
 * 
 * PERFORMANCE:
 * - Lazy load screens with lazy()
 * - Unmount inactive screens
 * - Optimize header rendering
 * - Cache navigation state
 * - Use react-native-screens for performance
 */

import * as React from "react";
// WEB: Radix UI for desktop navigation menus with dropdowns
// REACT NATIVE: Replace with @react-navigation/native
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu@1.2.5";
// WEB: Class Variance Authority for style variants
// REACT NATIVE: Use custom style functions or theme object
import { cva } from "class-variance-authority@0.7.1";
// WEB: Lucide icons
// REACT NATIVE: react-native-vector-icons
import { ChevronDownIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  // WEB: Desktop-style horizontal navigation with dropdowns
  // REACT NATIVE: Use React Navigation instead:
  // 
  // For bottom tabs:
  // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  // const Tab = createBottomTabNavigator();
  // 
  // For drawer:
  // import { createDrawerNavigator } from '@react-navigation/drawer';
  // const Drawer = createDrawerNavigator();
  // 
  // For stack:
  // import { createStackNavigator } from '@react-navigation/stack';
  // const Stack = createStackNavigator();
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  // WEB: List of navigation items
  // REACT NATIVE: Tab.Navigator or Drawer.Navigator handles this
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  // WEB: Individual navigation item
  // REACT NATIVE: Tab.Screen or Drawer.Screen
  // <Tab.Screen
  //   name="Dashboard"
  //   component={DashboardScreen}
  //   options={{
  //     tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
  //     tabBarLabel: 'Dashboard',
  //   }}
  // />
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

// WEB: Style variants using CVA
// REACT NATIVE: Create style function:
// const getTabBarStyle = (isActive: boolean) => ({
//   color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.5)',
//   backgroundColor: isActive ? 'rgba(212,175,55,0.1)' : 'transparent',
// });
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  // WEB: Button that opens dropdown menu
  // REACT NATIVE: Pressable that opens modal or navigates
  // <Pressable
  //   onPress={() => setDropdownVisible(true)}
  //   style={({ pressed }) => [
  //     styles.navButton,
  //     pressed && styles.navButtonPressed,
  //   ]}
  // >
  //   <Text style={styles.navButtonText}>{children}</Text>
  //   <Icon name="chevron-down" size={16} />
  // </Pressable>
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
      {/* REACT NATIVE: Use Animated API to rotate chevron */}
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  // WEB: Dropdown content with animations
  // REACT NATIVE: Modal or separate screen
  // <Modal visible={visible} transparent animationType="fade">
  //   <View style={styles.dropdown}>
  //     {menuItems.map(item => (
  //       <Pressable onPress={item.onPress}>
  //         <Text>{item.label}</Text>
  //       </Pressable>
  //     ))}
  //   </View>
  // </Modal>
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  // WEB: Viewport for dropdown content
  // REACT NATIVE: Not needed - Modal handles viewport
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center",
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  // WEB: Link within navigation menu
  // REACT NATIVE: Pressable with navigation
  // <Pressable
  //   onPress={() => navigation.navigate('Screen')}
  //   style={({ pressed }) => [
  //     styles.link,
  //     pressed && styles.linkPressed,
  //   ]}
  // >
  //   <Text style={styles.linkText}>{label}</Text>
  // </Pressable>
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  // WEB: Visual indicator for active menu
  // REACT NATIVE: Use active tab indicator in tab bar
  // tabBarOptions={{
  //   indicatorStyle: {
  //     backgroundColor: '#D4AF37',
  //     height: 3,
  //   },
  // }}
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
