/**
 * ==============================================================================
 * BOTTOMNAVIGATION.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Glassmorphic bottom navigation bar with 5 main buttons, animated
 * center PolicyAngel button, and popup submenus for navigation items.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means the bottom nav is MUCH easier to convert!
 * 
 * ✅ KEEP AS-IS (75% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: fixed, bottom-0, left-0, right-0, flex, items-center
 *    - Spacing: px-6, py-4, gap-2
 *    - Colors: bg-*, text-*, border-*
 *    - Borders: rounded-full, border
 *    - Sizing: w-full, h-20
 * 
 * ❌ CONVERT ONLY THESE:
 *    - backdrop-blur → BlurView component (glassmorphism)
 *    - button → Pressable with state handling
 *    - Remove hover: pseudo-classes, use Pressable states
 *    - Framer Motion animations → react-native-reanimated
 *    - Submenu drawer → @gorhom/bottom-sheet or Modal
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - GLASSMORPHIC NAV BAR
 * ==============================================================================
 * 
 * The main challenge is backdrop-blur. All other classes work as-is!
 * 
 * BEFORE (Web):
 * ```tsx
 * <div className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-black/30 border-t border-white/10 px-6 py-4">
 *   <div className="flex items-center justify-between gap-2">
 *     <button className="p-3 rounded-full hover:bg-white/10">
 *       <Home />
 *     </button>
 *   </div>
 * </div>
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * import { View, Pressable } from 'react-native';
 * import { BlurView } from 'expo-blur';
 * import { styled } from 'nativewind';
 * import { Home } from 'lucide-react-native';
 * 
 * const StyledBlurView = styled(BlurView);
 * 
 * <View className="absolute bottom-0 left-0 right-0">
 *   <StyledBlurView
 *     intensity={20}
 *     tint="dark"
 *     className="border-t border-white/10 overflow-hidden"
 *   >
 *     <View className="bg-black/30 px-6 py-4">
 *       <View className="flex flex-row items-center justify-between gap-2">
 *         <Pressable
 *           className={({ pressed }) => `
 *             p-3 rounded-full
 *             ${pressed ? 'bg-white/10' : 'bg-transparent'}
 *           `}
 *         >
 *           <Home size={24} color="#ffffff" />
 *         </Pressable>
 *       </View>
 *     </View>
 *   </StyledBlurView>
 * </View>
 * ```
 * 
 * KEY POINTS:
 * - ✅ All spacing, color, border classes work as-is!
 * - ❌ Replace backdrop-blur with BlurView
 * - ✅ Use styled() to enable className on BlurView
 * - ❌ Convert hover: to Pressable ({ pressed }) state
 * - ✅ All other Tailwind utilities preserved!
 * 
 * ==============================================================================
 * NATIVEWIND - CENTER ANIMATED BUTTON
 * ==============================================================================
 * 
 * BEFORE (Web with Framer Motion):
 * ```tsx
 * <motion.button
 *   className="relative p-4 rounded-full bg-pa-gold"
 *   animate={{ scale: [1, 1.05, 1] }}
 *   transition={{ repeat: Infinity, duration: 2 }}
 * >
 *   <PolicyAngelIcon />
 * </motion.button>
 * ```
 * 
 * AFTER (React Native + NativeWind + Reanimated):
 * ```tsx
 * import { View, Pressable } from 'react-native';
 * import Animated, { useAnimatedStyle, withRepeat, withTiming, useSharedValue } from 'react-native-reanimated';
 * 
 * function AnimatedCenterButton() {
 *   const scale = useSharedValue(1);
 *   
 *   useEffect(() => {
 *     scale.value = withRepeat(
 *       withTiming(1.05, { duration: 1000 }),
 *       -1,
 *       true
 *     );
 *   }, []);
 *   
 *   const animatedStyle = useAnimatedStyle(() => ({
 *     transform: [{ scale: scale.value }],
 *   }));
 *   
 *   return (
 *     <Animated.View style={animatedStyle}>
 *       <Pressable className="relative p-4 rounded-full bg-pa-gold">
 *         <PolicyAngelIcon />
 *       </Pressable>
 *     </Animated.View>
 *   );
 * }
 * ```
 * 
 * Note: All Tailwind classes (p-4, rounded-full, bg-pa-gold) work with NativeWind!
 * Only the animation library changes.
 * 
 * ==============================================================================
 * NATIVEWIND - SUBMENU DRAWER
 * ==============================================================================
 * 
 * Use @gorhom/bottom-sheet for native drawer behavior:
 * 
 * ```tsx
 * import BottomSheet from '@gorhom/bottom-sheet';
 * import { View, Text, Pressable } from 'react-native';
 * 
 * function BottomNavWithDrawer() {
 *   const bottomSheetRef = useRef<BottomSheet>(null);
 *   
 *   return (
 *     <>
 *       // Bottom Nav Bar - All Tailwind classes work!
 *       <View className="absolute bottom-0 left-0 right-0">
 *         <Pressable 
 *           onPress={() => bottomSheetRef.current?.expand()}
 *           className="p-3 rounded-full"
 *         >
 *           <Menu size={24} color="#fff" />
 *         </Pressable>
 *       </View>
 *       
 *       // Submenu Drawer
 *       <BottomSheet
 *         ref={bottomSheetRef}
 *         index={-1}
 *         snapPoints={['50%', '90%']}
 *         enablePanDownToClose
 *       >
 *         <View className="flex-1 bg-pa-dark p-6">
 *           <Text className="text-2xl font-bold text-white mb-4">Menu</Text>
 *           // Menu items - All Tailwind classes work!
 *           <Pressable className="p-4 rounded-lg bg-white/10 mb-2">
 *             <Text className="text-white">Properties</Text>
 *           </Pressable>
 *         </View>
 *       </BottomSheet>
 *     </>
 *   );
 * }
 * ```
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND BOTTOM NAVIGATION EXAMPLE
 * ==============================================================================
 * 
 * ```tsx
 * import React, { useRef } from 'react';
 * import { View, Pressable, Text } from 'react-native';
 * import { BlurView } from 'expo-blur';
 * import { styled } from 'nativewind';
 * import { Home, Search, Menu, Bell, User } from 'lucide-react-native';
 * import BottomSheet from '@gorhom/bottom-sheet';
 * import { useNavigation } from '@react-navigation/native';
 * 
 * const StyledBlurView = styled(BlurView);
 * 
 * export function BottomNavigation() {
 *   const navigation = useNavigation();
 *   const menuSheetRef = useRef<BottomSheet>(null);
 *   
 *   const navItems = [
 *     { icon: Home, label: 'Home', route: 'Dashboard' },
 *     { icon: Search, label: 'Search', route: 'Search' },
 *     { icon: Menu, label: 'Menu', action: () => menuSheetRef.current?.expand() },
 *     { icon: Bell, label: 'Alerts', route: 'Alerts' },
 *     { icon: User, label: 'Profile', route: 'Profile' },
 *   ];
 *   
 *   return (
 *     <>
 *       // Bottom Navigation Bar - All Tailwind classes work!
 *       <View className="absolute bottom-0 left-0 right-0">
 *         <StyledBlurView
 *           intensity={20}
 *           tint="dark"
 *           className="border-t border-white/10"
 *         >
 *           <View className="bg-black/30 px-6 py-4">
 *             <View className="flex flex-row items-center justify-between">
 *               {navItems.map((item, index) => (
 *                 <Pressable
 *                   key={index}
 *                   onPress={() => {
 *                     if (item.route) {
 *                       navigation.navigate(item.route);
 *                     } else if (item.action) {
 *                       item.action();
 *                     }
 *                   }}
 *                   className={({ pressed }) => `
 *                     p-3 rounded-full items-center justify-center
 *                     ${pressed ? 'bg-white/10' : 'bg-transparent'}
 *                   `}
 *                 >
 *                   <item.icon size={24} color="#ffffff" />
 *                   <Text className="text-xs text-white/60 mt-1">{item.label}</Text>
 *                 </Pressable>
 *               ))}
 *             </View>
 *           </View>
 *         </StyledBlurView>
 *       </View>
 *       
 *       // Menu Drawer
 *       <BottomSheet
 *         ref={menuSheetRef}
 *         index={-1}
 *         snapPoints={['50%', '90%']}
 *         enablePanDownToClose
 *       >
 *         <View className="flex-1 bg-pa-dark p-6">
 *           <Text className="text-2xl font-bold text-white mb-6">Menu</Text>
 *           
 *           // Menu items - All Tailwind classes work!
 *           <View className="gap-2">
 *             {['Properties', 'Documents', 'Reports', 'Settings'].map((item) => (
 *               <Pressable
 *                 key={item}
 *                 className="p-4 rounded-lg bg-white/5 border border-white/10"
 *                 onPress={() => {
 *                   navigation.navigate(item);
 *                   menuSheetRef.current?.close();
 *                 }}
 *               >
 *                 <Text className="text-white text-base">{item}</Text>
 *               </Pressable>
 *             ))}
 *           </View>
 *         </View>
 *       </BottomSheet>
 *     </>
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
 * npm install expo-blur
 * npm install @gorhom/bottom-sheet
 * npm install react-native-reanimated
 * npm install react-native-gesture-handler
 * npm install lucide-react-native
 * npm install @react-navigation/bottom-tabs
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
 * The annotations below show the original approach with full StyleSheet details.
 * With NativeWind, most styling is preserved via className!
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. USE REACT NAVIGATION'S TAB NAVIGATOR:
 *    - RECOMMENDED: Use @react-navigation/bottom-tabs as base
 *    - Create custom tab bar component (tabBar prop)
 *    - This provides navigation logic + state management
 * 
 *    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 *    
 *    const Tab = createBottomTabNavigator();
 *    
 *    <Tab.Navigator tabBar={props => <CustomBottomNav {...props} />}>
 *      <Tab.Screen name="Dashboard" component={DashboardScreen} />
 *      <Tab.Screen name="Properties" component={PropertiesScreen} />
 *      // ... more screens
 *    </Tab.Navigator>
 * 
 * 2. GLASSMORPHISM EFFECT:
 *    - CURRENT: CSS backdrop-blur
 *    - REACT NATIVE: Use BlurView from @react-native-community/blur
 *    - Or: expo-blur if using Expo
 *    
 *    import { BlurView } from '@react-native-community/blur';
 *    // or
 *    import { BlurView } from 'expo-blur';
 *    
 *    <BlurView 
 *      style={styles.navBar}
 *      blurType="dark" 
 *      blurAmount={10}
 *      reducedTransparencyFallbackColor="rgba(0,0,0,0.8)"
 *    >
 *      // Navigation buttons
 *    </BlurView>
 * 
 * 3. ANIMATIONS:
 *    - Replace Framer Motion with React Native Reanimated
 *    - Center button pulse/glow: useAnimatedStyle + withRepeat
 *    - Submenu slide-up: Animated.View with translateY
 *    - Backdrop: Animated opacity
 *    
 *    import Animated, { 
 *      useAnimatedStyle, 
 *      useSharedValue, 
 *      withSpring,
 *      withRepeat,
 *      withTiming
 *    } from 'react-native-reanimated';
 * 
 * 4. SUBMENU DRAWER:
 *    - CURRENT: Expanding div with AnimatePresence
 *    - REACT NATIVE: Modal or bottom sheet
 *    - RECOMMENDED: @gorhom/bottom-sheet for smooth drawer
 *    
 *    import BottomSheet from '@gorhom/bottom-sheet';
 *    
 *    <BottomSheet
 *      ref={bottomSheetRef}
 *      index={-1} // Closed by default
 *      snapPoints={['25%', '50%', '90%']}
 *    >
 *      // Submenu items
 *    </BottomSheet>
 * 
 * 5. TOUCH INTERACTIONS:
 *    - button → TouchableOpacity or Pressable
 *    - Use Pressable for advanced press states
 *    - haptic feedback on press (expo-haptics)
 * 
 * 6. CENTER BUTTON ANIMATIONS:
 *    - Multi-layer glow effect
 *    - Pulsing border
 *    - Rotating shimmer
 *    - Sparkles
 *    - All need conversion to Reanimated
 * 
 * 7. BACKDROP OVERLAY:
 *    - Use Modal with transparent background
 *    - Or Animated.View with absolute positioning
 *    - Dismiss on tap outside
 * 
 * ==============================================================================
 * ZUSTAND STORE INTEGRATION
 * ==============================================================================
 * 
 * CREATE: stores/useNavigationStore.ts
 * 
 * interface NavigationState {
 *   activeSubmenu: string | null;
 *   searchQuery: string;
 *   
 *   openSubmenu: (submenu: string) => void;
 *   closeSubmenu: () => void;
 *   setSearchQuery: (query: string) => void;
 * }
 * 
 * This keeps submenu state accessible across the app.
 * 
 * ==============================================================================
 * REACT NATIVE EXAMPLE STRUCTURE
 * ==============================================================================
 * 
 * import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
 * import { BlurView } from 'expo-blur';
 * import Animated, { useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
 * import { useNavigation } from '@react-navigation/native';
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * export function BottomNavigation({ state, descriptors, navigation }) {
 *   const [submenuVisible, setSubmenuVisible] = useState(false);
 *   
 *   // Animated center button
 *   const scale = useSharedValue(1);
 *   const animatedStyle = useAnimatedStyle(() => ({
 *     transform: [{ scale: withRepeat(withTiming(scale.value, { duration: 2000 }), -1, true) }]
 *   }));
 *   
 *   useEffect(() => {
 *     scale.value = 1.1;
 *   }, []);
 * 
 *   return (
 *     <>
 *       <BlurView style={styles.container} blurType="dark" blurAmount={10}>
 *         <View style={styles.navBar}>
 *           // Home button
 *           <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
 *             <Icon name="home" size={24} color="#fff" />
 *           </TouchableOpacity>
 *           
 *           // Menu button
 *           <TouchableOpacity onPress={() => setSubmenuVisible(true)}>
 *             <Icon name="menu" size={24} color="#fff" />
 *           </TouchableOpacity>
 *           
 *           // Center animated button
 *           <Animated.View style={[styles.centerButton, animatedStyle]}>
 *             <TouchableOpacity onPress={() => navigation.navigate('AngelChat')}>
 *               <Image source={policyAngelLogo} style={styles.logo} />
 *             </TouchableOpacity>
 *           </Animated.View>
 *           
 *           // Search button
 *           <TouchableOpacity onPress={() => navigation.navigate('Search')}>
 *             <Icon name="search" size={24} color="#fff" />
 *           </TouchableOpacity>
 *           
 *           // Camera button
 *           <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
 *             <Icon name="camera" size={24} color="#fff" />
 *           </TouchableOpacity>
 *         </View>
 *       </BlurView>
 *       
 *       // Submenu Modal
 *       <Modal
 *         visible={submenuVisible}
 *         transparent
 *         animationType="slide"
 *         onRequestClose={() => setSubmenuVisible(false)}
 *       >
 *         <TouchableOpacity 
 *           style={styles.backdrop} 
 *           activeOpacity={1}
 *           onPress={() => setSubmenuVisible(false)}
 *         >
 *           <View style={styles.submenu}>
 *             // Submenu items
 *           </View>
 *         </TouchableOpacity>
 *       </Modal>
 *     </>
 *   );
 * }
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     position: 'absolute',
 *     bottom: 16,
 *     left: 24,
 *     right: 24,
 *     borderRadius: 44,
 *     overflow: 'hidden',
 *   },
 *   navBar: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'space-between',
 *     paddingHorizontal: 16,
 *     height: 80,
 *   },
 *   centerButton: {
 *     width: 64,
 *     height: 64,
 *     borderRadius: 32,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     backgroundColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   logo: {
 *     width: 48,
 *     height: 48,
 *   },
 * });
 * 
 * ==============================================================================
 * NAVIGATION STRUCTURE
 * ==============================================================================
 * 
 * MAIN TAB NAVIGATION (5 tabs):
 * 1. Home (Dashboard)
 * 2. Navigation Menu (opens drawer/submenu)
 * 3. PolicyAngel (Angel Chat - center button)
 * 4. Search (Search properties)
 * 5. Camera (Photo capture)
 * 
 * SUBMENU ITEMS (Navigation Menu):
 * - Dashboard
 * - Properties
 * - Policy
 * - Documents
 * - Reports
 * - Insights
 * - Calendar
 * - Gallery
 * - Find Agents
 * - Services
 * - Grants
 * - Discover
 * 
 * ACTIONS SUBMENU:
 * - Quick Actions
 * - Emergency
 * - Maintenance
 * - Workflows
 * 
 * CENTER BUTTON SUBMENU (PolicyAngel):
 * - Angel Chat (only remaining item after user request)
 * 
 * ==============================================================================
 * ANIMATION DETAILS TO CONVERT
 * ==============================================================================
 * 
 * CENTER BUTTON ANIMATIONS (Lines 250-590):
 * 1. Outer glow (slow pulse) - 4s duration, opacity 0.15-0.4, scale 1-1.35
 * 2. Pulsing ring (medium) - 2s duration, opacity 0.4-0.9, scale 1-1.15
 * 3. Secondary slow pulse - 3.5s duration, opacity 0.3-0.6, scale 1-1.25
 * 4. Rotating shimmer - 8s rotation (0-360deg)
 * 5. Counter-rotating shimmer - 6s rotation (360-0deg)
 * 6. Light rays - 12s rotation, opacity 0.3-0.6
 * 7. Highlight streak - 4s rotation
 * 8. Sparkles (2 sparkles) - 2s opacity + scale animation
 * 9. Pulsing border - 2.5s opacity 0.4-1
 * 10. Inner glow - 2s opacity 0.6-0.9
 * 11. Logo breathing - 3s scale 1-1.05
 * 
 * ALL OF THESE need conversion to React Native Reanimated:
 * - Use useSharedValue for animated values
 * - Use useAnimatedStyle for animated styles
 * - Use withRepeat + withTiming for loops
 * - Use withSpring for smooth animations
 * 
 * Example conversion:
 * const opacity = useSharedValue(0.15);
 * const animatedGlow = useAnimatedStyle(() => ({
 *   opacity: withRepeat(
 *     withTiming(opacity.value, { duration: 4000 }), 
 *     -1, 
 *     true
 *   ),
 * }));
 * 
 * ==============================================================================
 * PERFORMANCE CONSIDERATIONS
 * ==============================================================================
 * 
 * 1. Use useNativeDriver: true for animations (transforms, opacity)
 * 2. Memoize navigation items to prevent re-renders
 * 3. Avoid animating layout properties (width, height, top, left)
 * 4. Use transform properties instead (translateX, translateY, scale, rotate)
 * 5. Consider reducing animation complexity on lower-end devices
 * 6. Use InteractionManager for expensive operations after animations
 * 
 * ==============================================================================
 * PLATFORM DIFFERENCES
 * ==============================================================================
 * 
 * iOS:
 * - BlurView works great
 * - Haptic feedback available
 * - Safe area insets important (notch, home indicator)
 * 
 * Android:
 * - BlurView may be less performant
 * - Consider fallback to semi-transparent background
 * - Navigation bar height varies
 * 
 * Use react-native-safe-area-context:
 * import { useSafeAreaInsets } from 'react-native-safe-area-context';
 * const insets = useSafeAreaInsets();
 * // Add bottom: insets.bottom to navigation bar
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Navigation bar appears at bottom
 * - [ ] Blur effect works on iOS
 * - [ ] Blur fallback works on Android
 * - [ ] All 5 buttons are tappable
 * - [ ] Center button animations are smooth
 * - [ ] Submenu opens on menu button press
 * - [ ] Submenu closes on backdrop tap
 * - [ ] Submenu closes on item selection
 * - [ ] Navigation to each screen works
 * - [ ] Search opens search screen
 * - [ ] Camera opens camera screen
 * - [ ] Angel Chat opens chat screen
 * - [ ] Safe area insets respected
 * - [ ] Works on iPhone with notch
 * - [ ] Works on Android with nav bar
 * - [ ] Haptic feedback on press (if implemented)
 * - [ ] No performance issues with animations
 * 
 */

import { Sun, Menu, Search, Camera, ArrowLeft, Zap, AlertTriangle, Wrench, GitBranch, Home, Building, FileText, BarChart, MessageCircle, Lightbulb, Bell, Settings, Users, MapPin, Compass, Eye, ScanLine, Images, Calendar, DollarSign, Shield, Sparkles, UserCircle } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import policyAngelLogo from "figma:asset/66283e8dafc3c31c277ce6add3d2f6d9caa6369b.png";
import { PolicyAngelText } from "./PolicyAngelText";

interface BottomNavigationProps {
  onNavigate?: (itemId: string) => void;
  activeTab?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const submenuConfigs: Record<string, { title: string; items: NavItem[] }> = {
  actions: {
    title: 'Actions',
    items: [
      { id: 'quick-actions', label: 'Quick Actions', icon: <Zap style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'emergency', label: 'Emergency', icon: <AlertTriangle style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'maintenance', label: 'Maintenance', icon: <Wrench style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'workflows', label: 'Workflows', icon: <GitBranch style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
    ]
  },
  navigation: {
    title: 'Navigation',
    items: [
      { id: 'dashboard', label: 'PolicyAngel', icon: <Home style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'properties', label: 'Properties', icon: <Building style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'policy', label: 'Policy', icon: <Shield style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'documents', label: 'Documents', icon: <FileText style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'reports', label: 'Reports', icon: <BarChart style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'insights', label: 'Insights', icon: <Lightbulb style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'calendar', label: 'Calendar', icon: <Calendar style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'gallery', label: 'Gallery', icon: <Images style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'find-agents', label: 'Agents', icon: <Users style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'locate-services', label: 'Services', icon: <MapPin style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'grants', label: 'Grants', icon: <DollarSign style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
      { id: 'discover', label: 'Discover', icon: <Compass style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
    ]
  },
  center: {
    title: 'PolicyAngel',
    items: [
      { id: 'angel-functions', label: 'Angel Chat', icon: <Sparkles style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' }} /> },
    ]
  }
};

export function BottomNavigation({ onNavigate, activeTab }: BottomNavigationProps) {
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Drag scrolling state for search suggestions
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleNavClick = (drawer: string) => {
    setActiveSubmenu(activeSubmenu === drawer ? null : drawer);
  };

  const handleBack = () => {
    setActiveSubmenu(null);
    setSearchQuery('');
  };

  const handleItemClick = (itemId: string) => {
    onNavigate?.(itemId);
    setActiveSubmenu(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate?.('search-properties');
      setActiveSubmenu(null);
      setSearchQuery('');
    }
  };

  const suggestedSearches = [
    '123 Main St',
    'Properties with damage',
    'Recent inspections',
    'High-risk properties',
    'California properties',
    'Expired policies',
    'Active claims',
    'Upcoming renewals',
  ];

  const currentSubmenu = activeSubmenu ? submenuConfigs[activeSubmenu] : null;

  return (
    <>
      {/* Backdrop Overlay - appears when submenu is active */}
      <AnimatePresence>
        {activeSubmenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 99, // Just below navigation container (100)
              pointerEvents: 'auto',
            }}
            onClick={handleBack}
          />
        )}
      </AnimatePresence>

      <div 
        className="flex justify-center relative"
        style={{ 
          paddingLeft: 'var(--spacing-6)', 
          paddingRight: 'var(--spacing-6)',
          zIndex: 101, // Above the backdrop (99)
          position: 'relative',
        }}
      >
        {/* Morphing Navbar pill - Glass effect with 44px border-radius */}
        <motion.div 
          className="relative backdrop-blur-md w-full"
          animate={{
            height: activeSubmenu ? 'auto' : 'auto',
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 400,
            mass: 0.8,
          }}
          style={{
            maxWidth: 'var(--nav-max-width)',
            borderRadius: 'var(--nav-radius)', // 44px pill shape
            backgroundColor: 'var(--glass-bg)',
            opacity: 'var(--glass-opacity)',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            borderColor: 'var(--glass-border)',
            boxShadow: `
              0 4px 8px rgba(0, 0, 0, 0.15),
              0 8px 16px rgba(0, 0, 0, 0.2),
              0 16px 32px rgba(0, 0, 0, 0.25),
              0 20px 40px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            `,
            position: 'relative',
            zIndex: 101, // Above the backdrop
          }}
        >
          {/* Inner backdrop shadow for depth */}
          <div 
            className="absolute inset-0 bg-black/[0.03] -z-10"
            style={{ borderRadius: 'var(--nav-radius)' }}
          />
          
          <AnimatePresence mode="wait">
            {!activeSubmenu ? (
              /* MAIN NAVIGATION - 5 buttons */
              <motion.div
                key="main-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                className="flex items-center justify-between w-full"
                style={{ 
                  height: 'var(--nav-height)',
                  paddingLeft: 'var(--spacing-4)',
                  paddingRight: 'var(--spacing-4)',
                }}
              >
                {/* Left Side Buttons */}
                <div className="flex items-center flex-1 justify-end" style={{ gap: 'var(--spacing-2)' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                    onClick={() => handleItemClick('dashboard')}
                    aria-label="Home"
                  >
                    <div 
                      className="flex items-center justify-center relative transition-colors duration-200"
                      style={{
                        width: 'var(--nav-btn-width)',
                        height: 'var(--nav-btn-height)',
                        borderRadius: 'var(--nav-btn-radius)',
                        boxShadow: 'var(--effect-button-premium)',
                        backgroundColor: 'var(--icon-bg)',
                        border: '1px solid var(--icon-border)',
                      }}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          borderRadius: 'var(--nav-btn-radius)',
                          background: 'var(--inner-glow-subtle)',
                        }}
                      />
                      <Home style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)', color: 'var(--icon-color)', position: 'relative', zIndex: 1, filter: 'var(--icon-drop-shadow)' }} />
                    </div>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                    onClick={() => handleNavClick('navigation')}
                    aria-label="Navigation Menu"
                  >
                    <div 
                      className="flex items-center justify-center relative transition-colors duration-200"
                      style={{
                        width: 'var(--nav-btn-width)',
                        height: 'var(--nav-btn-height)',
                        borderRadius: 'var(--nav-btn-radius)',
                        boxShadow: 'var(--effect-button-premium)',
                        backgroundColor: 'var(--icon-bg)',
                        border: '1px solid var(--icon-border)',
                      }}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          borderRadius: 'var(--nav-btn-radius)',
                          background: 'var(--inner-glow-subtle)',
                        }}
                      />
                      <Menu style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)', color: 'var(--icon-color)', position: 'relative', zIndex: 1, filter: 'var(--icon-drop-shadow)' }} />
                    </div>
                  </motion.button>
                </div>
                
                {/* Center Button - PolicyAngel with Premium Multi-Layer Animation System */}
                <motion.div
                  className="flex-shrink-0 relative"
                  style={{
                    marginLeft: 'var(--spacing-3)',
                    marginRight: 'var(--spacing-3)',
                  }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Layer 1 - Outermost Glow (Slow Pulse) */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      opacity: [0.15, 0.4, 0.15],
                      scale: [1, 1.35, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      width: 'var(--nav-btn-center-width)',
                      height: 'var(--nav-btn-center-height)',
                      borderRadius: 'var(--nav-btn-center-radius)',
                      background: `radial-gradient(circle, rgba(var(--color-electric-blue), 0.5) 0%, transparent 70%)`,
                      filter: 'blur(24px)',
                      zIndex: -3,
                    }}
                  />

                  {/* Layer 2 - Pulsing Ring (Medium Pulse) */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      opacity: [0.4, 0.9, 0.4],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      width: 'var(--nav-btn-center-width)',
                      height: 'var(--nav-btn-center-height)',
                      borderRadius: 'var(--nav-btn-center-radius)',
                      background: `radial-gradient(circle, rgba(var(--color-electric-blue), 0.6) 0%, transparent 70%)`,
                      filter: 'blur(12px)',
                      boxShadow: '0 0 20px rgba(var(--color-electric-blue), 0.4)',
                      zIndex: -2,
                    }}
                  />

                  {/* Layer 3 - Secondary Slow Pulse */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.25, 1],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      width: 'var(--nav-btn-center-width)',
                      height: 'var(--nav-btn-center-height)',
                      borderRadius: 'var(--nav-btn-center-radius)',
                      background: `radial-gradient(circle, rgba(var(--color-electric-blue), 0.4) 0%, transparent 70%)`,
                      filter: 'blur(18px)',
                      zIndex: -2,
                    }}
                  />

                  {/* Shimmer Layer 1 - Primary Rotating Shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      width: 'var(--nav-btn-center-width)',
                      height: 'var(--nav-btn-center-height)',
                      borderRadius: 'var(--nav-btn-center-radius)',
                      zIndex: 0,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `conic-gradient(from 0deg, transparent 0%, rgba(var(--color-electric-blue), 0.8) 10%, transparent 20%, transparent 80%, rgba(var(--color-electric-blue), 0.8) 90%, transparent 100%)`,
                        opacity: 0.8,
                      }}
                    />
                  </motion.div>

                  {/* Shimmer Layer 2 - Counter-Rotating Shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    animate={{
                      rotate: [360, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      width: 'var(--nav-btn-center-width)',
                      height: 'var(--nav-btn-center-height)',
                      borderRadius: 'var(--nav-btn-center-radius)',
                      zIndex: 0,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `conic-gradient(from 45deg, transparent 0%, rgba(255, 255, 255, 0.5) 5%, transparent 15%, transparent 85%, rgba(255, 255, 255, 0.5) 95%, transparent 100%)`,
                        opacity: 0.5,
                      }}
                    />
                  </motion.div>

                  {/* Shimmer Layer 3 - Light Rays */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    animate={{
                      rotate: [0, 360],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      rotate: {
                        duration: 12,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                      opacity: {
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    style={{
                      width: 'var(--nav-btn-center-width)',
                      height: 'var(--nav-btn-center-height)',
                      borderRadius: 'var(--nav-btn-center-radius)',
                      zIndex: 0,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `conic-gradient(from 0deg, rgba(var(--color-electric-blue), 0.4) 0deg, transparent 5deg, transparent 85deg, rgba(var(--color-electric-blue), 0.4) 90deg, transparent 95deg, transparent 175deg, rgba(var(--color-electric-blue), 0.4) 180deg, transparent 185deg, transparent 265deg, rgba(var(--color-electric-blue), 0.4) 270deg, transparent 275deg, transparent 360deg)`,
                        filter: 'blur(2px)',
                      }}
                    />
                  </motion.div>

                  {/* Shimmer Layer 4 - Rotating Highlight Streak */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      width: 'var(--nav-btn-center-width)',
                      height: 'var(--nav-btn-center-height)',
                      borderRadius: 'var(--nav-btn-center-radius)',
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent)',
                        filter: 'blur(1px)',
                      }}
                    />
                  </motion.div>

                  {/* Sparkle 1 - Top-Left */}
                  <motion.div
                    className="absolute pointer-events-none"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      top: '15%',
                      left: '15%',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(var(--color-electric-blue), 0.6))',
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                      zIndex: 2,
                    }}
                  />

                  {/* Sparkle 2 - Bottom-Right */}
                  <motion.div
                    className="absolute pointer-events-none"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      bottom: '20%',
                      right: '20%',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(var(--color-electric-blue), 0.6))',
                      boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
                      zIndex: 2,
                    }}
                  />
                  
                  {/* Main Button Container with Border Animation */}
                  <motion.button 
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{
                      type: 'spring',
                      damping: 20,
                      stiffness: 400,
                    }}
                    onClick={() => handleItemClick('angel-functions')}
                    aria-label="Angel Chat"
                    className="relative overflow-hidden"
                    style={{
                      width: 'var(--nav-btn-center-width)',
                      height: 'var(--nav-btn-center-height)',
                      borderRadius: 'var(--nav-btn-center-radius)',
                      backgroundColor: 'var(--icon-bg)',
                      zIndex: 1,
                    }}
                  >
                    {/* Pulsing Border */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        border: '2px solid rgb(var(--color-electric-blue))',
                        borderRadius: 'var(--nav-btn-center-radius)',
                        boxShadow: `
                          0 0 25px rgba(var(--color-electric-blue), 0.5),
                          inset 0 0 20px rgba(var(--color-electric-blue), 0.2)
                        `,
                      }}
                    />

                    {/* Inner Glow Overlay with Pulsing Animation */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        opacity: [0.6, 0.9, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        borderRadius: 'var(--nav-btn-center-radius)',
                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 60%)',
                      }}
                    />
                    
                    {/* Logo with Breathing Animation */}
                    <motion.img 
                      src={policyAngelLogo}
                      alt="PolicyAngel Logo"
                      className="object-contain relative z-10"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{ 
                        padding: '6px',
                        width: '100%',
                        height: '100%',
                        filter: `
                          drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
                          drop-shadow(0 0 8px rgba(var(--color-electric-blue), 0.6))
                          drop-shadow(0 0 16px rgba(var(--color-electric-blue), 0.4))
                          brightness(1.1)
                        `,
                      }}
                    />
                  </motion.button>
                </motion.div>
                
                {/* Right Side Buttons */}
                <div className="flex items-center flex-1 justify-start" style={{ gap: 'var(--spacing-2)' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                    onClick={() => handleNavClick('finder')}
                    aria-label="Finder"
                  >
                    <div 
                      className="flex items-center justify-center relative transition-colors duration-200"
                      style={{
                        width: 'var(--nav-btn-width)',
                        height: 'var(--nav-btn-height)',
                        borderRadius: 'var(--nav-btn-radius)',
                        boxShadow: 'var(--effect-button-premium)',
                        backgroundColor: 'var(--icon-bg)',
                        border: '1px solid var(--icon-border)',
                      }}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          borderRadius: 'var(--nav-btn-radius)',
                          background: 'var(--inner-glow-subtle)',
                        }}
                      />
                      <Search style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)', color: 'var(--icon-color)', position: 'relative', zIndex: 1, filter: 'var(--icon-drop-shadow)' }} />
                    </div>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                    onClick={() => handleItemClick('photo-capture')}
                    aria-label="Camera"
                  >
                    <div 
                      className="flex items-center justify-center relative transition-colors duration-200"
                      style={{
                        width: 'var(--nav-btn-width)',
                        height: 'var(--nav-btn-height)',
                        borderRadius: 'var(--nav-btn-radius)',
                        boxShadow: 'var(--effect-button-premium)',
                        backgroundColor: 'var(--icon-bg)',
                        border: '1px solid var(--icon-border)',
                      }}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          borderRadius: 'var(--nav-btn-radius)',
                          background: 'var(--inner-glow-subtle)',
                        }}
                      />
                      <Camera style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)', color: 'var(--icon-color)', position: 'relative', zIndex: 1, filter: 'var(--icon-drop-shadow)' }} />
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* SUBMENU VIEW - Back button + submenu items OR search interface */
              <motion.div
                key="submenu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1] // Material Design standard easing - Smooth crossfade
                }}
                className="flex flex-col"
                style={{ 
                  padding: 'var(--spacing-4)',
                  gap: 'var(--spacing-3)'
                }}
              >
                {/* Header Row with Title and Back Button */}
                <div className="flex items-center justify-between" style={{ gap: 'var(--spacing-3)' }}>
                  <h3 style={{ color: 'var(--text-primary)', textAlign: 'left' }}>
                    {activeSubmenu === 'finder' ? 'Search' : currentSubmenu?.title}
                  </h3>
                  <button 
                    className="flex items-center justify-center active:scale-95 transition-all duration-200 flex-shrink-0"
                    onClick={handleBack}
                    aria-label="Back to main navigation"
                  >
                    <div 
                      className="flex items-center justify-center hover:bg-white/80 transition-colors"
                      style={{
                        width: 'var(--nav-btn-width)',
                        height: 'var(--nav-btn-height)',
                        borderRadius: 'var(--nav-btn-radius)',
                        boxShadow: '0 8px 14px rgba(0, 0, 0, 0.7)',
                        backgroundColor: 'var(--icon-bg)',
                        border: '1px solid var(--icon-border)',
                      }}
                    >
                      <ArrowLeft style={{ width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)', color: 'var(--icon-color)' }} />
                    </div>
                  </button>
                </div>

                {activeSubmenu === 'finder' ? (
                  /* SEARCH INTERFACE */
                  <>
                    {/* Search Input */}
                    <form onSubmit={handleSearchSubmit}>
                      <div className="relative">
                        <Search 
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                          style={{ color: 'var(--text-tertiary)' }}
                        />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search properties, addresses, policies..."
                          className="w-full pl-11 pr-4 transition-colors"
                          style={{
                            paddingTop: 'var(--spacing-3)',
                            paddingBottom: 'var(--spacing-3)',
                            backgroundColor: 'var(--icon-bg)',
                            border: '1px solid var(--icon-border)',
                            borderRadius: 'var(--nav-btn-radius)',
                            color: 'var(--text-primary)',
                            fontSize: 'var(--text-sm)',
                            outline: 'none',
                          }}
                          autoFocus
                        />
                      </div>
                    </form>

                    {/* Suggested Searches */}
                    <div className="flex flex-col" style={{ gap: 'var(--spacing-2)' }}>
                      <span 
                        style={{ 
                          color: 'var(--text-secondary)',
                          fontSize: 'var(--text-xs)',
                        }}
                      >
                        Suggested Searches
                      </span>
                      <div 
                        className="overflow-x-auto overflow-y-hidden"
                        ref={scrollContainerRef}
                        onMouseDown={(e) => {
                          setIsDragging(true);
                          setStartX(e.clientX - scrollContainerRef.current!.offsetLeft);
                          setScrollLeft(scrollContainerRef.current!.scrollLeft);
                        }}
                        onMouseLeave={() => setIsDragging(false)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseMove={(e) => {
                          if (!isDragging) return;
                          e.preventDefault();
                          const x = e.clientX - scrollContainerRef.current!.offsetLeft;
                          const walk = (x - startX) * 1.5;
                          scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
                        }}
                        style={{
                          WebkitOverflowScrolling: 'touch',
                          touchAction: 'pan-x',
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                        }}
                      >
                        <style>{`
                          div::-webkit-scrollbar {
                            display: none;
                          }
                        `}</style>
                        <div 
                          className="flex flex-nowrap"
                          style={{ 
                            gap: 'var(--spacing-2)',
                            width: 'max-content',
                          }}
                        >
                          {suggestedSearches.map((suggestion, index) => (
                            <motion.button
                              key={suggestion}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                duration: 0.2,
                                delay: index * 0.05,
                                ease: [0.4, 0.0, 0.2, 1]
                              }}
                              onClick={() => {
                                setSearchQuery(suggestion);
                              }}
                              className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                              style={{
                                paddingLeft: 'var(--spacing-4)',
                                paddingRight: 'var(--spacing-4)',
                                paddingTop: 'var(--spacing-3)',
                                paddingBottom: 'var(--spacing-3)',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--text-primary)',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {suggestion}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* GRID SUBMENU ITEMS */
                  <div 
                    className="grid grid-cols-4"
                    style={{ gap: 'var(--spacing-3)' }}
                  >
                    {currentSubmenu?.items.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.85, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          duration: 0.25,
                          delay: index * 0.04,
                          ease: [0.4, 0.0, 0.2, 1] // Material Design standard easing
                        }}
                        onClick={() => handleItemClick(item.id)}
                        className="flex flex-col items-center justify-center active:scale-95 transition-all duration-200"
                        style={{
                          gap: 'var(--spacing-2)',
                          padding: 'var(--spacing-3)',
                          backgroundColor: 'var(--icon-bg)',
                          border: '1px solid var(--icon-border)',
                          borderRadius: 'var(--nav-btn-radius)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <div style={{ color: 'var(--icon-color)' }}>
                          {item.icon}
                        </div>
                        <span 
                          className="text-xs text-center"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {item.label === 'PolicyAngel' ? (
                            <PolicyAngelText />
                          ) : (
                            item.label
                          )}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}