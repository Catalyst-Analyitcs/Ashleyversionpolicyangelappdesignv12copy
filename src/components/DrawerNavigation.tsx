/**
 * ==============================================================================
 * DRAWERNAVIGATION.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Side drawer menu with navigation links to all app sections.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind with @react-navigation/drawer is MUCH easier!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, flex-col, items-center
 *    - Spacing: p-4, gap-2, space-y-2
 *    - Colors: bg-pa-dark, text-white
 *    - Borders: rounded-lg, border-white/10
 *    - Typography: text-base, font-semibold
 * 
 * ❌ CONVERT ONLY THESE:
 *    - Use @react-navigation/drawer instead of custom drawer
 *    - div → View, ScrollView for content
 *    - button → Pressable with className function
 *    - Remove hover: → use Pressable ({ pressed }) state
 *    - Framer Motion → built-in navigation animations
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - DRAWER NAVIGATOR
 * ==============================================================================
 * 
 * React Navigation's drawer provides built-in slide animations and state!
 * 
 * ```tsx
 * import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
 * import { View, Text, Pressable } from 'react-native';
 * import { SafeAreaView } from 'react-native-safe-area-context';
 * 
 * const Drawer = createDrawerNavigator();
 * 
 * function CustomDrawerContent(props) {
 *   return (
 *     <DrawerContentScrollView
 *       {...props}
 *       className="flex-1 bg-pa-dark"
 *     >
 *       <SafeAreaView className="flex-1">
 *         // User profile
 *         <View className="p-4 border-b border-white/10">
 *           <Text className="text-white font-bold text-lg">John Doe</Text>
 *           <Text className="text-white/60 text-sm">john@example.com</Text>
 *         </View>
 *         
 *         // Menu items
 *         <View className="p-4 space-y-2">
 *           {menuItems.map((item) => (
 *             <Pressable
 *               key={item.name}
 *               onPress={() => props.navigation.navigate(item.name)}
 *               className={({ pressed }) => `
 *                 flex flex-row items-center gap-3 p-3 rounded-lg
 *                 ${props.state.index === item.index ? 'bg-pa-gold' : 'bg-transparent'}
 *                 ${pressed ? 'bg-white/10' : ''}
 *               `}
 *             >
 *               <item.icon size={20} color="#ffffff" />
 *               <Text className="text-white text-base">{item.label}</Text>
 *             </Pressable>
 *           ))}
 *         </View>
 *       </SafeAreaView>
 *     </DrawerContentScrollView>
 *   );
 * }
 * 
 * export default function App() {
 *   return (
 *     <Drawer.Navigator
 *       drawerContent={(props) => <CustomDrawerContent {...props} />}
 *       screenOptions={{
 *         drawerStyle: {
 *           backgroundColor: '#000000',
 *           width: 280,
 *         },
 *         headerShown: false,
 *       }}
 *     >
 *       <Drawer.Screen name="Dashboard" component={DashboardScreen} />
 *       <Drawer.Screen name="Weather" component={WeatherScreen} />
 *     </Drawer.Navigator>
 *   );
 * }
 * ```
 * 
 * KEY POINTS:
 * - ✅ All Tailwind classes work with NativeWind!
 * - ✅ Navigation drawer handles animations automatically
 * - ❌ Remove Framer Motion, use built-in drawer animations
 * - ✅ Active state via props.state.index
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND DRAWER
 * ==============================================================================
 * 
 * ```tsx
 * import React from 'react';
 * import { View, Text, Pressable, ScrollView } from 'react-native';
 * import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
 * import { SafeAreaView } from 'react-native-safe-area-context';
 * import {
 *   Sun, Wind, MapPin, Camera, Zap, AlertTriangle,
 *   Wrench, Users, FileText, Settings
 * } from 'lucide-react-native';
 * 
 * const Drawer = createDrawerNavigator();
 * 
 * const menuSections = [
 *   {
 *     title: 'Main',
 *     items: [
 *       { name: 'Dashboard', label: 'Dashboard', icon: Sun },
 *       { name: 'Weather', label: 'Weather', icon: Wind },
 *       { name: 'Properties', label: 'Properties', icon: MapPin },
 *     ],
 *   },
 *   {
 *     title: 'Tools',
 *     items: [
 *       { name: 'PhotoCapture', label: 'Photo Capture', icon: Camera },
 *       { name: 'QuickActions', label: 'Quick Actions', icon: Zap },
 *       { name: 'Alerts', label: 'Alerts', icon: AlertTriangle },
 *     ],
 *   },
 *   {
 *     title: 'Services',
 *     items: [
 *       { name: 'Maintenance', label: 'Maintenance', icon: Wrench },
 *       { name: 'Community', label: 'Community', icon: Users },
 *       { name: 'Documents', label: 'Documents', icon: FileText },
 *     ],
 *   },
 * ];
 * 
 * function CustomDrawerContent(props) {
 *   const currentRoute = props.state.routes[props.state.index].name;
 *   
 *   return (
 *     <DrawerContentScrollView
 *       {...props}
 *       className="flex-1 bg-pa-dark"
 *       contentContainerStyle={{ paddingBottom: 20 }}
 *     >
 *       <SafeAreaView className="flex-1">
 *         // User Profile Section
 *         <View className="p-6 border-b border-white/10">
 *           <View className="bg-pa-gold rounded-full w-16 h-16 items-center justify-center mb-3">
 *             <Text className="text-pa-dark font-bold text-2xl">JD</Text>
 *           </View>
 *           <Text className="text-white font-bold text-lg">John Doe</Text>
 *           <Text className="text-white/60 text-sm">San Francisco, CA</Text>
 *         </View>
 *         
 *         // Menu Sections
 *         <View className="p-4">
 *           {menuSections.map((section, idx) => (
 *             <View key={idx} className="mb-4">
 *               <Text className="text-white/40 text-xs font-semibold uppercase mb-2 px-3">
 *                 {section.title}
 *               </Text>
 *               <View className="space-y-1">
 *                 {section.items.map((item) => (
 *                   <Pressable
 *                     key={item.name}
 *                     onPress={() => props.navigation.navigate(item.name)}
 *                     className={({ pressed }) => `
 *                       flex flex-row items-center gap-3 p-3 rounded-lg
 *                       ${currentRoute === item.name ? 'bg-pa-gold' : 'bg-transparent'}
 *                       ${pressed && currentRoute !== item.name ? 'bg-white/5' : ''}
 *                     `}
 *                   >
 *                     <item.icon
 *                       size={20}
 *                       color={currentRoute === item.name ? '#000000' : '#ffffff'}
 *                     />
 *                     <Text
 *                       className={`text-base ${
 *                         currentRoute === item.name
 *                           ? 'text-pa-dark font-semibold'
 *                           : 'text-white'
 *                       }`}
 *                     >
 *                       {item.label}
 *                     </Text>
 *                   </Pressable>
 *                 ))}
 *               </View>
 *             </View>
 *           ))}
 *         </View>
 *         
 *         // Settings at bottom
 *         <View className="p-4 border-t border-white/10 mt-auto">
 *           <Pressable
 *             onPress={() => props.navigation.navigate('Settings')}
 *             className="flex flex-row items-center gap-3 p-3 rounded-lg"
 *           >
 *             <Settings size={20} color="#ffffff" />
 *             <Text className="text-white text-base">Settings</Text>
 *           </Pressable>
 *         </View>
 *       </SafeAreaView>
 *     </DrawerContentScrollView>
 *   );
 * }
 * 
 * export function AppNavigator() {
 *   return (
 *     <Drawer.Navigator
 *       drawerContent={(props) => <CustomDrawerContent {...props} />}
 *       screenOptions={{
 *         drawerStyle: {
 *           backgroundColor: '#000000',
 *           width: 280,
 *         },
 *         headerShown: false,
 *         drawerType: 'slide',
 *         overlayColor: 'rgba(0, 0, 0, 0.5)',
 *       }}
 *     >
 *       <Drawer.Screen name="Dashboard" component={DashboardScreen} />
 *       <Drawer.Screen name="Weather" component={WeatherScreen} />
 *       // Add all other screens
 *     </Drawer.Navigator>
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
 * npm install @react-navigation/drawer
 * npm install @react-navigation/native
 * npm install react-native-gesture-handler
 * npm install react-native-reanimated
 * npm install react-native-safe-area-context
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
 * TESTING CHECKLIST:
 * - [ ] Drawer opens/closes
 * - [ ] All menu items visible
 * - [ ] Navigation works
 * - [ ] Active state shows
 * - [ ] User profile displays
 * - [ ] iOS and Android compatible
 * 
 * ==============================================================================
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Menu, 
  Wind, 
  Search, 
  Camera,
  Zap,
  AlertTriangle,
  Wrench,
  GitBranch,
  Home,
  Building,
  FileText,
  BarChart,
  MessageCircle,
  Lightbulb,
  Bell,
  Settings,
  Users,
  MapPin,
  Compass,
  Eye,
  ScanLine,
  Images,
  ChevronRight,
  X,
  UserCircle
} from 'lucide-react';
import { PolicyAngelText } from './PolicyAngelText';

interface DrawerItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: string;
}

interface DrawerConfig {
  title: string;
  items: DrawerItem[];
}

const drawerConfigs: Record<string, DrawerConfig> = {
  actions: {
    title: 'Actions',
    items: [
      { id: 'quick-actions', label: 'Quick Actions', icon: <Zap className="w-4 h-4" />, action: 'navigate' },
      { id: 'emergency', label: 'Emergency Actions', icon: <AlertTriangle className="w-4 h-4" />, action: 'navigate' },
      { id: 'maintenance', label: 'Maintenance Tasks', icon: <Wrench className="w-4 h-4" />, action: 'navigate' },
      { id: 'workflows', label: 'Workflows', icon: <GitBranch className="w-4 h-4" />, action: 'navigate' },
    ]
  },
  navigation: {
    title: 'Navigation',
    items: [
      { id: 'dashboard', label: 'PolicyAngel', icon: <Home className="w-4 h-4" />, action: 'navigate' },
      { id: 'properties', label: 'Properties', icon: <Building className="w-4 h-4" />, action: 'navigate' },
      { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" />, action: 'navigate' },
      { id: 'reports', label: 'Reports', icon: <BarChart className="w-4 h-4" />, action: 'navigate' },
      { id: 'insights', label: 'Insights', icon: <Lightbulb className="w-4 h-4" />, action: 'navigate' },
    ]
  },
  center: {
    title: 'PolicyAngel',
    items: [
      { id: 'ai-assistant', label: 'AI Assistant', icon: <MessageCircle className="w-4 h-4" />, action: 'navigate' },
      { id: 'insights', label: 'Insights', icon: <Lightbulb className="w-4 h-4" />, action: 'navigate' },
      { id: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" />, action: 'navigate' },
      { id: 'user-persona', label: 'My Profile', icon: <UserCircle className="w-4 h-4" />, action: 'navigate' },
      { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, action: 'navigate' },
    ]
  },
  finder: {
    title: 'Finder',
    items: [
      { id: 'search-properties', label: 'Search Properties', icon: <Search className="w-4 h-4" />, action: 'navigate' },
      { id: 'find-agents', label: 'Find Agents', icon: <Users className="w-4 h-4" />, action: 'navigate' },
      { id: 'locate-services', label: 'Locate Services', icon: <MapPin className="w-4 h-4" />, action: 'navigate' },
      { id: 'discover', label: 'Discover', icon: <Compass className="w-4 h-4" />, action: 'navigate' },
    ]
  },
  vision: {
    title: 'Vision',
    items: [
      { id: 'photo-capture', label: 'Photo Capture', icon: <Camera className="w-4 h-4" />, action: 'navigate' },
      { id: 'damage-assessment', label: 'Damage Assessment', icon: <ScanLine className="w-4 h-4" />, action: 'navigate' },
      { id: 'property-inspection', label: 'Property Inspection', icon: <Eye className="w-4 h-4" />, action: 'navigate' },
      { id: 'visual-reports', label: 'Visual Reports', icon: <Images className="w-4 h-4" />, action: 'navigate' },
    ]
  }
};

interface DrawerNavigationProps {
  isOpen: boolean;
  activeDrawer: string | null;
  onClose: () => void;
  onItemPress?: (item: DrawerItem) => void;
}

export function DrawerNavigation({ isOpen, activeDrawer, onClose, onItemPress }: DrawerNavigationProps) {
  const [dragY, setDragY] = React.useState(0);

  const config = activeDrawer ? drawerConfigs[activeDrawer] : null;

  const handleDrag = (event: any, info: any) => {
    if (info.offset.y > 0) {
      setDragY(info.offset.y);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const shouldClose = info.offset.y > 100 || info.velocity.y > 500;
    
    if (shouldClose) {
      onClose();
    }
    setDragY(0);
  };

  const scale = Math.max(0.1, 1 - dragY / 300);
  const opacity = Math.max(0.3, 1 - dragY / 300);

  return (
    <AnimatePresence>
      {isOpen && config && (
        <>
          {/* Backdrop Overlay - excludes navbar area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[1100]"
            style={{
              bottom: 'calc(var(--nav-height) + var(--nav-bottom))', // Stops exactly at navbar top
            }}
            onClick={onClose}
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ 
              scaleY: dragY > 0 ? scale : 1, 
              opacity: dragY > 0 ? opacity : 1 
            }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 400,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="fixed z-[1200] backdrop-blur-md shadow-2xl max-h-[60vh] overflow-auto"
            style={{ 
              originY: 1,
              left: 'var(--spacing-6)', // Match navbar horizontal margins
              right: 'var(--spacing-6)', // Match navbar horizontal margins
              bottom: 'calc(var(--nav-height) + var(--nav-bottom))', // No gap - sits flush with navbar
              backgroundColor: 'var(--glass-bg)',
              borderColor: 'var(--glass-border)',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              borderBottom: 'none', // Remove bottom border for seamless connection
              borderTopLeftRadius: 'var(--nav-radius)', // Match navbar pill radius
              borderTopRightRadius: 'var(--nav-radius)', // Match navbar pill radius
              paddingBottom: '8px',
            }}
          >
            <div 
              className="flex flex-col"
              style={{ 
                padding: 'var(--spacing-6)',
                gap: 'var(--spacing-4)'
              }}
            >
              {/* Pull Handle */}
              <div className="flex justify-center">
                <div 
                  className="rounded-full" 
                  style={{ 
                    width: '48px', 
                    height: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                />
              </div>

              {/* Header */}
              <div 
                className="flex items-center justify-between"
              >
                <h2 style={{ color: 'var(--text-primary)' }}>{config.title}</h2>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--icon-container-lg)',
                    backgroundColor: 'var(--icon-bg)',
                    border: '1px solid var(--icon-border)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <X className="w-5 h-5" style={{ color: 'var(--icon-color)' }} />
                </button>
              </div>

              {/* Menu Items */}
              <div 
                className="flex flex-col"
                style={{ gap: 'var(--spacing-3)' }}
              >
                {config.items.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.25,
                      delay: index * 0.05 + 0.1 
                    }}
                    onClick={() => {
                      onItemPress?.(item);
                      onClose();
                    }}
                    className="w-full flex items-center hover:bg-white/20 transition-all active:scale-95"
                    style={{ 
                      paddingTop: 'var(--spacing-4)',
                      paddingBottom: 'var(--spacing-4)',
                      paddingLeft: 'var(--spacing-5)',
                      paddingRight: 'var(--spacing-5)',
                      gap: 'var(--spacing-4)',
                      backgroundColor: 'var(--icon-bg)',
                      border: '1px solid var(--icon-border)',
                      borderRadius: 'var(--nav-btn-radius)', // 25px - matching navbar buttons
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {/* Icon container - matching navbar style */}
                    <div 
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-2xl)',
                        backgroundColor: 'var(--icon-bg)',
                        border: '1px solid var(--icon-border)',
                      }}
                    >
                      <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--icon-color)' }}>
                        {item.icon}
                      </div>
                    </div>
                    {/* Label text */}
                    <span className="flex-1 text-left" style={{ color: 'var(--text-primary)' }}>
                      {item.label === 'PolicyAngel' ? (
                        <PolicyAngelText />
                      ) : (
                        item.label
                      )}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}