/**
 * ==============================================================================
 * APP.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Root application component - manages routing, state providers,
 * and screen navigation for the PolicyAngel web app.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * COMPLEXITY: HIGH
 * This file requires a complete architectural change for React Native.
 * The web approach uses conditional rendering; React Native uses navigation.
 * 
 * ==============================================================================
 * 1. NAVIGATION ARCHITECTURE
 * ==============================================================================
 * 
 * Replace the entire conditional rendering approach with React Navigation:
 * 
 * NAVIGATION STRUCTURE:
 * ```
 * RootNavigator (Stack)
 * ├── AuthStack
 * │   └── EmailEntry
 * └── MainApp (Drawer)
 *     ├── TabNavigator (Bottom Tabs)
 *     │   ├── Dashboard
 *     │   ├── Properties
 *     │   ├── Documents
 *     │   ├── Reports
 *     │   └── Insights
 *     ├── QuickActions (Modal)
 *     ├── Weather (Modal)
 *     ├── Settings (Screen)
 *     └── [All Other Screens]
 * ```
 * 
 * ==============================================================================
 * 2. COMPLETE REACT NATIVE APP.TSX IMPLEMENTATION
 * ==============================================================================
 * 
 * ```tsx
 * import React, { useEffect } from 'react';
 * import { StatusBar, Platform, SafeAreaView } from 'react-native';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { QueryClientProvider } from '@tanstack/react-query';
 * import { GestureHandlerRootView } from 'react-native-gesture-handler';
 * import { PortalProvider } from '@gorhom/portal';
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * import * as SplashScreen from 'expo-splash-screen';
 * import * as Font from 'expo-font';
 * import { SafeAreaProvider } from 'react-native-safe-area-context';
 * 
 * // Providers
 * import { ThemeProvider } from './components/ThemeProvider';
 * import { PropertyProvider } from './utils/PropertyContext';
 * import { queryClient } from './utils/queryClient';
 * 
 * // Navigation
 * import { RootNavigator } from './navigation/RootNavigator';
 * import { navigationRef } from './navigation/navigationRef';
 * 
 * // Keep splash screen visible while loading
 * SplashScreen.preventAutoHideAsync();
 * 
 * export default function App() {
 *   const [appIsReady, setAppIsReady] = React.useState(false);
 * 
 *   useEffect(() => {
 *     async function prepare() {
 *       try {
 *         // Load fonts
 *         await Font.loadAsync({
 *           // Add your custom fonts here
 *           'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
 *           'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
 *           'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
 *           'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
 *         });
 * 
 *         // Pre-load any critical data
 *         // await preloadData();
 * 
 *         // Artificial delay to show splash screen (optional)
 *         await new Promise(resolve => setTimeout(resolve, 1000));
 *       } catch (e) {
 *         console.warn(e);
 *       } finally {
 *         setAppIsReady(true);
 *       }
 *     }
 * 
 *     prepare();
 *   }, []);
 * 
 *   useEffect(() => {
 *     if (appIsReady) {
 *       SplashScreen.hideAsync();
 *     }
 *   }, [appIsReady]);
 * 
 *   if (!appIsReady) {
 *     return null;
 *   }
 * 
 *   return (
 *     <GestureHandlerRootView style={{ flex: 1 }}>
 *       <SafeAreaProvider>
 *         <QueryClientProvider client={queryClient}>
 *           <ThemeProvider>
 *             <PropertyProvider>
 *               <PortalProvider>
 *                 <NavigationContainer ref={navigationRef}>
 *                   <StatusBar
 *                     barStyle="light-content"
 *                     backgroundColor="transparent"
 *                     translucent
 *                   />
 *                   <RootNavigator />
 *                 </NavigationContainer>
 *               </PortalProvider>
 *             </PropertyProvider>
 *           </ThemeProvider>
 *         </QueryClientProvider>
 *       </SafeAreaProvider>
 *     </GestureHandlerRootView>
 *   );
 * }
 * ```
 * 
 * ==============================================================================
 * 3. NAVIGATION FILES TO CREATE
 * ==============================================================================
 * 
 * CREATE: /navigation/RootNavigator.tsx
 * ```tsx
 * import React from 'react';
 * import { createStackNavigator } from '@react-navigation/stack';
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * 
 * import { AuthNavigator } from './AuthNavigator';
 * import { MainNavigator } from './MainNavigator';
 * 
 * const Stack = createStackNavigator();
 * 
 * export function RootNavigator() {
 *   const [isAuthenticated, setIsAuthenticated] = React.useState(false);
 *   const [isLoading, setIsLoading] = React.useState(true);
 * 
 *   React.useEffect(() => {
 *     // Check if user is remembered
 *     checkAuth();
 *   }, []);
 * 
 *   const checkAuth = async () => {
 *     try {
 *       const rememberMe = await AsyncStorage.getItem('rememberMe');
 *       const lastEmail = await AsyncStorage.getItem('lastEmail');
 *       
 *       if (rememberMe === 'true' && lastEmail) {
 *         setIsAuthenticated(true);
 *       }
 *     } catch (error) {
 *       console.error('Auth check failed:', error);
 *     } finally {
 *       setIsLoading(false);
 *     }
 *   };
 * 
 *   if (isLoading) {
 *     return null; // Or loading screen
 *   }
 * 
 *   return (
 *     <Stack.Navigator screenOptions={{ headerShown: false }}>
 *       {!isAuthenticated ? (
 *         <Stack.Screen name="Auth" component={AuthNavigator} />
 *       ) : (
 *         <Stack.Screen name="Main" component={MainNavigator} />
 *       )}
 *     </Stack.Navigator>
 *   );
 * }
 * ```
 * 
 * CREATE: /navigation/AuthNavigator.tsx
 * ```tsx
 * import React from 'react';
 * import { createStackNavigator } from '@react-navigation/stack';
 * import { EmailEntryScreen } from '../screens/EmailEntryScreen';
 * 
 * const Stack = createStackNavigator();
 * 
 * export function AuthNavigator() {
 *   return (
 *     <Stack.Navigator screenOptions={{ headerShown: false }}>
 *       <Stack.Screen name="EmailEntry" component={EmailEntryScreen} />
 *     </Stack.Navigator>
 *   );
 * }
 * ```
 * 
 * CREATE: /navigation/MainNavigator.tsx
 * ```tsx
 * import React from 'react';
 * import { createDrawerNavigator } from '@react-navigation/drawer';
 * import { TabNavigator } from './TabNavigator';
 * import { SettingsScreen } from '../components/SettingsScreen';
 * import { QuickActionsScreen } from '../screens/QuickActionsScreen';
 * import { EmergencyScreen } from '../screens/EmergencyScreen';
 * // ... import all other screens
 * 
 * const Drawer = createDrawerNavigator();
 * 
 * export function MainNavigator() {
 *   return (
 *     <Drawer.Navigator
 *       screenOptions={{
 *         headerShown: false,
 *         drawerStyle: {
 *           backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *           width: 280,
 *         },
 *         drawerActiveTintColor: '#D4AF37',
 *         drawerInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
 *       }}
 *     >
 *       <Drawer.Screen name="Home" component={TabNavigator} />
 *       <Drawer.Screen name="Settings" component={SettingsScreen} />
 *       <Drawer.Screen name="QuickActions" component={QuickActionsScreen} />
 *       <Drawer.Screen name="Emergency" component={EmergencyScreen} />
 *       {/* Add all other screens *}
 *     </Drawer.Navigator>
 *   );
 * }
 * ```
 * 
 * CREATE: /navigation/TabNavigator.tsx
 * ```tsx
 * import React from 'react';
 * import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 * import { Home, Building2, FileText, BarChart3, Lightbulb } from 'lucide-react-native';
 * 
 * import { LuxuryDashboard } from '../components/LuxuryDashboard';
 * import { PropertiesScreen } from '../screens/PropertiesScreen';
 * import { DocumentsScreen } from '../screens/DocumentsScreen';
 * import { ReportsScreen } from '../screens/ReportsScreen';
 * import { InsightsScreen } from '../screens/InsightsScreen';
 * 
 * const Tab = createBottomTabNavigator();
 * 
 * export function TabNavigator() {
 *   return (
 *     <Tab.Navigator
 *       screenOptions={{
 *         headerShown: false,
 *         tabBarStyle: {
 *           backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *           borderTopWidth: 1,
 *           borderTopColor: 'rgba(255, 255, 255, 0.1)',
 *           height: 80,
 *           paddingBottom: 20,
 *         },
 *         tabBarActiveTintColor: '#D4AF37',
 *         tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
 *         tabBarLabelStyle: {
 *           fontSize: 11,
 *           fontWeight: '600',
 *         },
 *       }}
 *     >
 *       <Tab.Screen
 *         name="Dashboard"
 *         component={LuxuryDashboard}
 *         options={{
 *           tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
 *         }}
 *       />
 *       <Tab.Screen
 *         name="Properties"
 *         component={PropertiesScreen}
 *         options={{
 *           tabBarIcon: ({ color, size }) => <Building2 size={size} color={color} />,
 *         }}
 *       />
 *       <Tab.Screen
 *         name="Documents"
 *         component={DocumentsScreen}
 *         options={{
 *           tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
 *         }}
 *       />
 *       <Tab.Screen
 *         name="Reports"
 *         component={ReportsScreen}
 *         options={{
 *           tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
 *         }}
 *       />
 *       <Tab.Screen
 *         name="Insights"
 *         component={InsightsScreen}
 *         options={{
 *           tabBarIcon: ({ color, size }) => <Lightbulb size={size} color={color} />,
 *         }}
 *       />
 *     </Tab.Navigator>
 *   );
 * }
 * ```
 * 
 * CREATE: /navigation/navigationRef.ts
 * ```tsx
 * import { createNavigationContainerRef } from '@react-navigation/native';
 * 
 * export const navigationRef = createNavigationContainerRef();
 * 
 * export function navigate(name: string, params?: any) {
 *   if (navigationRef.isReady()) {
 *     navigationRef.navigate(name as never, params as never);
 *   }
 * }
 * 
 * export function goBack() {
 *   if (navigationRef.isReady() && navigationRef.canGoBack()) {
 *     navigationRef.goBack();
 *   }
 * }
 * ```
 * 
 * CREATE: /utils/queryClient.ts
 * ```tsx
 * import { QueryClient } from '@tanstack/react-query';
 * 
 * export const queryClient = new QueryClient({
 *   defaultOptions: {
 *     queries: {
 *       retry: 2,
 *       staleTime: 1000 * 60 * 5, // 5 minutes
 *       cacheTime: 1000 * 60 * 10, // 10 minutes
 *     },
 *   },
 * });
 * ```
 * 
 * ==============================================================================
 * 4. TYPE DEFINITIONS
 * ==============================================================================
 * 
 * CREATE: /navigation/types.ts
 * ```tsx
 * export type RootStackParamList = {
 *   Auth: undefined;
 *   Main: undefined;
 * };
 * 
 * export type AuthStackParamList = {
 *   EmailEntry: undefined;
 * };
 * 
 * export type MainDrawerParamList = {
 *   Home: undefined;
 *   Settings: undefined;
 *   QuickActions: undefined;
 *   Emergency: undefined;
 *   Maintenance: undefined;
 *   Workflows: undefined;
 *   Properties: undefined;
 *   Documents: undefined;
 *   Reports: undefined;
 *   AIAssistant: undefined;
 *   Insights: undefined;
 *   Alerts: undefined;
 *   SearchProperties: undefined;
 *   FindAgents: undefined;
 *   LocateServices: undefined;
 *   Discover: undefined;
 *   PhotoCapture: undefined;
 *   DamageAssessment: undefined;
 *   PropertyInspection: undefined;
 *   VisualReports: undefined;
 *   Calendar: undefined;
 *   Grants: undefined;
 *   PropertyDetails: { propertyId?: string };
 *   Policy: undefined;
 *   AngelFunctions: undefined;
 *   Gallery: undefined;
 *   Weather: undefined;
 *   UserPersona: undefined;
 *   BenefitsSurvey: undefined;
 *   MarketTrends: undefined;
 *   BestPractices: undefined;
 *   LearningCenter: undefined;
 *   Community: undefined;
 * };
 * 
 * export type TabParamList = {
 *   Dashboard: undefined;
 *   Properties: undefined;
 *   Documents: undefined;
 *   Reports: undefined;
 *   Insights: undefined;
 * };
 * ```
 * 
 * ==============================================================================
 * 5. NAVIGATION HELPERS
 * ==============================================================================
 * 
 * UPDATE: All screen components to use navigation prop instead of callbacks:
 * 
 * Before (Web):
 * ```tsx
 * <LuxuryDashboard
 *   onNavigateToProperty={() => setCurrentScreen('property-details')}
 * />
 * ```
 * 
 * After (React Native):
 * ```tsx
 * // In LuxuryDashboard.tsx
 * import { useNavigation } from '@react-navigation/native';
 * 
 * function LuxuryDashboard() {
 *   const navigation = useNavigation();
 *   
 *   return (
 *     <Button onPress={() => navigation.navigate('PropertyDetails')}>
 *       View Property
 *     </Button>
 *   );
 * }
 * ```
 * 
 * ==============================================================================
 * 6. DEEP LINKING CONFIGURATION
 * ==============================================================================
 * 
 * CREATE: /navigation/linking.ts
 * ```tsx
 * import { LinkingOptions } from '@react-navigation/native';
 * import * as Linking from 'expo-linking';
 * 
 * export const linking: LinkingOptions<any> = {
 *   prefixes: [Linking.createURL('/'), 'policyangel://'],
 *   config: {
 *     screens: {
 *       Auth: {
 *         screens: {
 *           EmailEntry: 'login',
 *         },
 *       },
 *       Main: {
 *         screens: {
 *           Home: {
 *             screens: {
 *               Dashboard: 'dashboard',
 *               Properties: 'properties',
 *               Documents: 'documents',
 *               Reports: 'reports',
 *               Insights: 'insights',
 *             },
 *           },
 *           PropertyDetails: 'property/:propertyId',
 *           Weather: 'weather',
 *           Settings: 'settings',
 *         },
 *       },
 *     },
 *   },
 * };
 * ```
 * 
 * ==============================================================================
 * 7. STORAGE MIGRATION
 * ==============================================================================
 * 
 * Replace localStorage with AsyncStorage:
 * 
 * Before (Web):
 * ```tsx
 * localStorage.getItem('rememberMe')
 * localStorage.setItem('lastEmail', email)
 * ```
 * 
 * After (React Native):
 * ```tsx
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * 
 * await AsyncStorage.getItem('rememberMe')
 * await AsyncStorage.setItem('lastEmail', email)
 * ```
 * 
 * CREATE: /utils/storage.ts
 * ```tsx
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * 
 * export const storage = {
 *   async get(key: string): Promise<string | null> {
 *     try {
 *       return await AsyncStorage.getItem(key);
 *     } catch (error) {
 *       console.error('Storage get error:', error);
 *       return null;
 *     }
 *   },
 *   
 *   async set(key: string, value: string): Promise<void> {
 *     try {
 *       await AsyncStorage.setItem(key, value);
 *     } catch (error) {
 *       console.error('Storage set error:', error);
 *     }
 *   },
 *   
 *   async remove(key: string): Promise<void> {
 *     try {
 *       await AsyncStorage.removeItem(key);
 *     } catch (error) {
 *       console.error('Storage remove error:', error);
 *     }
 *   },
 *   
 *   async clear(): Promise<void> {
 *     try {
 *       await AsyncStorage.clear();
 *     } catch (error) {
 *       console.error('Storage clear error:', error);
 *     }
 *   },
 * };
 * ```
 * 
 * ==============================================================================
 * 8. BACKGROUND & STYLING CONVERSION
 * ==============================================================================
 * 
 * Web uses div with gradient backgrounds.
 * React Native uses LinearGradient:
 * 
 * Before (Web):
 * ```tsx
 * <div style={{
 *   background: `linear-gradient(to bottom, var(--app-bg-start), ...)`,
 * }}>
 * ```
 * 
 * After (React Native):
 * ```tsx
 * import LinearGradient from 'react-native-linear-gradient';
 * 
 * <LinearGradient
 *   colors={['#0a0a0a', '#1a1a1a', '#000000']}
 *   style={styles.container}
 * >
 *   {children}
 * </LinearGradient>
 * ```
 * 
 * ==============================================================================
 * 9. REQUIRED PACKAGES
 * ==============================================================================
 * 
 * Install navigation and dependencies:
 * ```bash
 * npm install @react-navigation/native @react-navigation/stack
 * npm install @react-navigation/drawer @react-navigation/bottom-tabs
 * npm install react-native-screens react-native-safe-area-context
 * npm install react-native-gesture-handler react-native-reanimated
 * npm install @react-native-async-storage/async-storage
 * npm install @tanstack/react-query
 * npm install @gorhom/portal
 * npm install react-native-linear-gradient
 * npm install expo-splash-screen expo-font
 * npm install lucide-react-native
 * ```
 * 
 * ==============================================================================
 * 10. POLICYANGEL-SPECIFIC CONSIDERATIONS
 * ==============================================================================
 * 
 * - Golden branding color: #D4AF37 (use in tab bar, active states)
 * - Dark theme with glassmorphic effects (rgba overlays)
 * - Dramatic bottom-weighted shadows (elevation on Android, shadowOffset on iOS)
 * - MUBI-inspired cinematic luxury aesthetic
 * - San Francisco Bay Area location context
 * - Drone-based property inspection workflows
 * 
 * ==============================================================================
 * 11. HEADER COMPONENT INTEGRATION
 * ==============================================================================
 * 
 * Instead of manually rendering LiquidGlassHeader, use navigation options:
 * 
 * ```tsx
 * // In each screen
 * import { useNavigation, useLayoutEffect } from '@react-navigation/native';
 * 
 * function MyScreen() {
 *   const navigation = useNavigation();
 *   
 *   useLayoutEffect(() => {
 *     navigation.setOptions({
 *       headerShown: true,
 *       header: () => (
 *         <LiquidGlassHeader
 *           title="Screen Title"
 *           colorMode="dark"
 *           showWeather={true}
 *         />
 *       ),
 *     });
 *   }, [navigation]);
 *   
 *   return <View>...</View>;
 * }
 * ```
 * 
 * ==============================================================================
 * 12. BOTTOM NAVIGATION INTEGRATION
 * ==============================================================================
 * 
 * Bottom tabs are built-in with React Navigation.
 * Remove the BottomNavigation component from individual screens.
 * Tab navigator handles this automatically.
 * 
 * ==============================================================================
 * 13. MODAL SCREENS
 * ==============================================================================
 * 
 * For full-screen modals (PhotoCapture, Gallery, etc.):
 * 
 * ```tsx
 * // In RootNavigator
 * <Stack.Group screenOptions={{ presentation: 'modal' }}>
 *   <Stack.Screen name="PhotoCapture" component={PhotoCaptureScreen} />
 *   <Stack.Screen name="Gallery" component={GalleryScreen} />
 *   <Stack.Screen name="Weather" component={WeatherScreen} />
 * </Stack.Group>
 * ```
 * 
 * ==============================================================================
 * 14. TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] App launches without errors
 * - [ ] Navigation between all screens works
 * - [ ] Bottom tabs navigation works
 * - [ ] Drawer opens and closes
 * - [ ] Modal screens present correctly
 * - [ ] Back button navigation works
 * - [ ] Deep linking works
 * - [ ] Authentication flow works
 * - [ ] AsyncStorage persists data
 * - [ ] Header shows on all screens (except full-screen)
 * - [ ] Tab bar shows on tab screens only
 * - [ ] Gestures work (swipe back, drawer swipe)
 * - [ ] iOS and Android compatible
 * - [ ] Dark theme applies correctly
 * - [ ] Status bar styling correct
 * - [ ] Safe areas handled properly
 * 
 * ==============================================================================
 * 15. PERFORMANCE OPTIMIZATIONS
 * ==============================================================================
 * 
 * ```tsx
 * // Enable Reanimated
 * import 'react-native-reanimated';
 * 
 * // Enable gesture handler
 * import 'react-native-gesture-handler';
 * 
 * // In babel.config.js:
 * module.exports = {
 *   presets: ['module:metro-react-native-babel-preset'],
 *   plugins: [
 *     'react-native-reanimated/plugin',
 *   ],
 * };
 * ```
 * 
 * ==============================================================================
 * KEY ARCHITECTURAL CHANGES
 * ==============================================================================
 * 
 * 1. STATE MANAGEMENT:
 *    - currentScreen state → React Navigation state
 *    - setCurrentScreen() → navigation.navigate()
 *    - Conditional rendering → Stack/Tab/Drawer navigators
 * 
 * 2. ROUTING:
 *    - Manual screen switching → Declarative navigation
 *    - Props passing → Route params
 *    - Callbacks → Navigation prop
 * 
 * 3. LAYOUT:
 *    - Fixed mobile container → Native layout
 *    - z-index layers → Stack screens
 *    - Absolute positioning → Native navigation
 * 
 * 4. PROVIDERS:
 *    - Keep all existing providers
 *    - Add NavigationContainer wrapper
 *    - Add QueryClientProvider
 *    - Add GestureHandlerRootView
 * 
 * ==============================================================================
 */

// WEB: This entire file is web-specific and needs complete rewrite
// REACT NATIVE: See comprehensive implementation above

import { useState, useEffect } from "react";
import React from "react";
import { LiquidGlassHeader } from "./components/LiquidGlassHeader";
import { PropertyCard } from "./components/PropertyCard";
import { PreviewCard } from "./components/PreviewCard";
import { StackedCardCarousel } from "./components/StackedCardCarousel";
import { BottomNavigation } from "./components/BottomNavigation";
import { ThemeProvider } from "./components/ThemeProvider";
import { AnimatedGradientBackground } from "./components/AnimatedGradientBackground";
import { LuxuryDashboard } from "./components/LuxuryDashboard";
import { FileText, Calendar, Upload, Share2, Eye } from "lucide-react";
import { PropertyProvider } from "./utils/PropertyContext";

// Import all screen components
import { SettingsScreen } from "./screens/SettingsScreen";
import { QuickActionsScreen } from "./screens/QuickActionsScreen";
import { EmergencyScreen } from "./screens/EmergencyScreen";
import { MaintenanceScreen } from "./screens/MaintenanceScreen";
import { WorkflowsScreen } from "./screens/WorkflowsScreen";
import { PropertiesScreen } from "./screens/PropertiesScreen";
import { DocumentsScreen } from "./screens/DocumentsScreen";
import { ReportsScreen } from "./screens/ReportsScreen";
import { AIAssistantScreen } from "./screens/AIAssistantScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import { AlertsScreen } from "./screens/AlertsScreen";
import { SearchPropertiesScreen } from "./screens/SearchPropertiesScreen";
import { FindAgentsScreen } from "./screens/FindAgentsScreen";
import { LocateServicesScreen } from "./screens/LocateServicesScreen";
import { DiscoverScreen } from "./screens/DiscoverScreen";
import { PhotoCaptureScreen } from "./screens/PhotoCaptureScreen";
import { DamageAssessmentScreen } from "./screens/DamageAssessmentScreen";
import { PropertyInspectionScreen } from "./screens/PropertyInspectionScreen";
import { VisualReportsScreen } from "./screens/VisualReportsScreen";
import { EmailEntryScreen } from "./screens/EmailEntryScreen";
import { CalendarScreen } from "./screens/CalendarScreen";
import { GrantsScreen } from "./screens/GrantsScreen";
import { PropertyDetailsScreen } from "./screens/PropertyDetailsScreen";
import { PolicyScreen } from "./screens/PolicyScreen";
import { AngelFunctionsScreen } from "./screens/AngelFunctionsScreen";
import { GalleryScreen } from "./screens/GalleryScreen";
import WeatherScreen from "./screens/WeatherScreen";
import { UserPersonaScreen } from "./screens/UserPersonaScreen";
import { BenefitsSurveyScreen } from "./screens/BenefitsSurveyScreen";
import { MarketTrendsScreen } from "./screens/MarketTrendsScreen";
import { BestPracticesScreen } from "./screens/BestPracticesScreen";
import { LearningCenterScreen } from "./screens/LearningCenterScreen";
import { CommunityScreen } from "./screens/CommunityScreen";
import OpportunityRevealScreen from "./screens/OpportunityRevealScreen";
import InsuranceOptimizerScreen from "./screens/InsuranceOptimizerScreen";
import MortgageOptimizerScreen from "./screens/MortgageOptimizerScreen";

// RN: Main App component
// RN: Replace with navigation-based app (see implementation above)
export default function App() {
  // RN: This wrapper remains but contents change
  return (
    <ThemeProvider>
      <PropertyProvider>
        <AppContent />
      </PropertyProvider>
    </ThemeProvider>
  );
}

// RN: This type will move to /navigation/types.ts
type ScreenType = 'email-entry' | 'opportunity-reveal' | 'insurance-optimizer' | 'mortgage-optimizer' | 'dashboard' | 'settings' | 'quick-actions' | 'emergency' | 'maintenance' | 'workflows' 
  | 'properties' | 'documents' | 'reports' | 'ai-assistant' | 'insights' | 'alerts' 
  | 'search-properties' | 'find-agents' | 'locate-services' | 'discover' 
  | 'photo-capture' | 'damage-assessment' | 'property-inspection' | 'visual-reports' | 'calendar' | 'grants' | 'property-details' | 'policy' | 'angel-functions' | 'gallery' | 'weather' | 'user-persona' | 'benefits-survey' | 'market-trends' | 'best-practices' | 'learning-center' | 'community';

// RN: This component is entirely web-specific
// RN: Replace with navigation setup (see implementation above)
function AppContent() {
  // RN: Replace with navigation state
  // RN: This manual state management is not needed
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('email-entry');
  const [userEmail, setUserEmail] = useState<string>('');

  // RN: Replace localStorage with AsyncStorage
  // RN: Move to auth check in RootNavigator
  // Check if user was remembered on mount
  React.useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    const lastEmail = localStorage.getItem('lastEmail');
    
    if (rememberMe === 'true' && lastEmail) {
      setUserEmail(lastEmail);
      setCurrentScreen('dashboard');
    }

    // Initialize notification system (demo)
    // In production, connect to real backend and user data
    import('./utils/notificationDemo').then(({ populateDemoNotifications, subscribeToNotifications }) => {
      populateDemoNotifications();
      subscribeToNotifications();
    });
  }, []);

  // RN: Move to global state or TanStack Query
  // Mock data - replace with real data from your backend
  const [weatherData, setWeatherData] = useState({
    temperature: "72",
    unit: "°F",
    displayValue: "72°",
    label: "Sunny",
    condition: "clear",
    severity: "safe" as const,
  });
  const [weatherLoading, setWeatherLoading] = useState(false);

  // RN: Not needed - navigation handles titles
  // Get page title based on current screen
  const getPageTitle = (screen: ScreenType): string => {
    switch (screen) {
      case 'dashboard': return 'PolicyAngel';
      case 'opportunity-reveal': return 'Your Opportunities';
      case 'insurance-optimizer': return 'Insurance Optimizer';
      case 'mortgage-optimizer': return 'Mortgage Optimizer';
      case 'settings': return 'Settings';
      case 'quick-actions': return 'Quick Actions';
      case 'emergency': return 'Emergency';
      case 'maintenance': return 'Maintenance';
      case 'workflows': return 'Workflows';
      case 'properties': return 'Properties';
      case 'documents': return 'Documents';
      case 'reports': return 'Reports';
      case 'ai-assistant': return 'AI Assistant';
      case 'insights': return 'Insights';
      case 'alerts': return 'Alerts';
      case 'search-properties': return 'Search';
      case 'find-agents': return 'Find Agents';
      case 'locate-services': return 'Services';
      case 'discover': return 'Discover';
      case 'damage-assessment': return 'Damage Assessment';
      case 'property-inspection': return 'Inspection';
      case 'visual-reports': return 'Visual Reports';
      case 'calendar': return 'Calendar';
      case 'grants': return 'Grants';
      case 'property-details': return 'Property Details';
      case 'policy': return 'Policy';
      case 'angel-functions': return 'Angel Chat';
      case 'gallery': return 'Gallery';
      case 'weather': return 'Weather';
      case 'user-persona': return 'My Profile';
      case 'benefits-survey': return 'Benefits Survey';
      case 'market-trends': return 'Market Trends';
      case 'best-practices': return 'Best Practices';
      case 'learning-center': return 'Learning Center';
      case 'community': return 'Community';
      default: return 'PolicyAngel';
    }
  };

  // RN: Not needed - use navigation.navigate()
  // Handle navigation from drawer
  const handleNavigation = (itemId: string) => {
    console.log('Navigation requested:', itemId);
    
    // Handle specific navigation items
    switch (itemId) {
      case 'dashboard':
        setCurrentScreen('dashboard');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
      // Add more cases as you create more screens
      case 'properties':
        setCurrentScreen('properties');
        break;
      case 'documents':
        setCurrentScreen('documents');
        break;
      case 'reports':
        setCurrentScreen('reports');
        break;
      case 'ai-assistant':
        setCurrentScreen('ai-assistant');
        break;
      case 'insights':
        setCurrentScreen('insights');
        break;
      case 'alerts':
        setCurrentScreen('alerts');
        break;
      case 'quick-actions':
        setCurrentScreen('quick-actions');
        break;
      case 'emergency':
        setCurrentScreen('emergency');
        break;
      case 'maintenance':
        setCurrentScreen('maintenance');
        break;
      case 'workflows':
        setCurrentScreen('workflows');
        break;
      case 'search-properties':
        setCurrentScreen('search-properties');
        break;
      case 'find-agents':
        setCurrentScreen('find-agents');
        break;
      case 'locate-services':
        setCurrentScreen('locate-services');
        break;
      case 'discover':
        setCurrentScreen('discover');
        break;
      case 'photo-capture':
        setCurrentScreen('photo-capture');
        break;
      case 'damage-assessment':
        setCurrentScreen('damage-assessment');
        break;
      case 'property-inspection':
        setCurrentScreen('property-inspection');
        break;
      case 'visual-reports':
        setCurrentScreen('visual-reports');
        break;
      case 'calendar':
        setCurrentScreen('calendar');
        break;
      case 'grants':
        setCurrentScreen('grants');
        break;
      case 'property-details':
        setCurrentScreen('property-details');
        break;
      case 'policy':
        setCurrentScreen('policy');
        break;
      case 'angel-functions':
        setCurrentScreen('angel-functions');
        break;
      case 'gallery':
        setCurrentScreen('gallery');
        break;
      case 'weather':
        setCurrentScreen('weather');
        break;
      case 'user-persona':
        setCurrentScreen('user-persona');
        break;
      case 'market-trends':
        setCurrentScreen('market-trends');
        break;
      case 'best-practices':
        setCurrentScreen('best-practices');
        break;
      case 'learning-center':
        setCurrentScreen('learning-center');
        break;
      case 'community':
        setCurrentScreen('community');
        break;
      case 'opportunity-reveal':
        setCurrentScreen('opportunity-reveal');
        break;
      default:
        console.log(`Unknown navigation item: ${itemId}`);
    }
  };

  // Mock property data
  const mockProperty = {
    address: "123 Main Street, Brooklyn, NY 11201",
    propertyType: "Single Family Home",
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
    hoiCarrier: { label: "State Farm" },
    statusPill: { label: "Policy Active", variant: "success" as const },
    stats: [
      { label: "Est. Value", value: "$850k" },
      { label: "Beds", value: 3 },
      { label: "Baths", value: 2 },
      { label: "Sq Ft", value: "2,400" },
    ],
  };

  // Quick action cards for carousel
  const quickActionCards = [
    {
      title: 'View Policy',
      subtitle: 'Check coverage & renewal',
      icon: <Eye className="text-blue-600 w-6 h-6" />,
      onPress: () => setCurrentScreen('documents'),
    },
    {
      title: 'Upload Documents',
      subtitle: 'Add proof or missing docs',
      icon: <Upload className="text-green-600 w-6 h-6" />,
      onPress: () => setCurrentScreen('documents'),
    },
    {
      title: 'Share',
      subtitle: 'Send policy or snapshot',
      icon: <Share2 className="text-purple-600 w-6 h-6" />,
      onPress: () => setCurrentScreen('properties'),
    },
  ];

  // RN: Replace entire render with navigation structure
  // RN: See complete implementation at top of file
  return (
    <div 
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom, var(--app-bg-start), var(--app-bg-middle), var(--app-bg-end))`,
      }}
      // RN: Replace with LinearGradient component
    >
      {/* Mobile Container - FlexGrid Layout */}
      {/* RN: Not needed - native layout handles this */}
      <div 
        className="mx-auto h-screen flex flex-col relative overflow-hidden"
        style={{
          maxWidth: 'var(--mobile-max-width)', // 428px
          height: '852px',
        }}
        // RN: Replace with SafeAreaView and native layout
      >
        {/* ==================== ANIMATED GRADIENT BACKGROUND (z-index: 0) ==================== */}
        <AnimatedGradientBackground intensity={20} />
        
        {/* Conditional Screen Rendering */}
        {/* RN: Replace with Stack/Tab/Drawer navigation */}
        {currentScreen === 'email-entry' ? (
          <EmailEntryScreen
            onEmailSubmit={(email) => {
              setUserEmail(email);
              setCurrentScreen('opportunity-reveal');
            }}
          />
        ) : currentScreen === 'opportunity-reveal' ? (
          <OpportunityRevealScreen
            propertyId="property-123"
            onContinue={() => setCurrentScreen('dashboard')}
            onNavigate={handleNavigation}
            onNavigateToGrants={() => setCurrentScreen('grants')}
            onNavigateToInsurance={() => setCurrentScreen('insurance-optimizer')}
            onNavigateToMortgage={() => setCurrentScreen('mortgage-optimizer')}
          />
        ) : currentScreen === 'insurance-optimizer' ? (
          <InsuranceOptimizerScreen
            propertyId="property-123"
            onBack={() => setCurrentScreen('insights')}
          />
        ) : currentScreen === 'mortgage-optimizer' ? (
          <MortgageOptimizerScreen
            propertyId="property-123"
            onBack={() => setCurrentScreen('insights')}
          />
        ) : currentScreen === 'dashboard' ? (
          <LuxuryDashboard
            onNavigateToProperty={() => setCurrentScreen('property-details')}
            onNavigateToPolicy={() => setCurrentScreen('policy')}
            onNavigateToDocuments={() => setCurrentScreen('documents')}
            onNavigateToCalendar={() => setCurrentScreen('calendar')}
            onNavigateToGrants={() => setCurrentScreen('grants')}
            onNavigateToAlerts={() => setCurrentScreen('alerts')}
            onNavigateToGallery={() => setCurrentScreen('gallery')}
            onNavigateToReports={() => setCurrentScreen('reports')}
            onNavigateToWorkflows={() => setCurrentScreen('workflows')}
            onNavigateToWeather={() => setCurrentScreen('weather')}
            onNavigateToInsights={() => setCurrentScreen('insights')}
            onNavigateToCommunity={() => setCurrentScreen('community')}
          />
        ) : currentScreen === 'settings' ? (
          <SettingsScreen onBack={() => setCurrentScreen('dashboard')} />
        ) : currentScreen === 'photo-capture' ? (
          /* Camera Screen - Full Screen, No Padding */
          <PhotoCaptureScreen 
            onBack={() => setCurrentScreen('dashboard')} 
            onOpenGallery={() => setCurrentScreen('gallery')}
          />
        ) : currentScreen === 'gallery' ? (
          /* Gallery Screen - Full Screen, No Padding */
          <GalleryScreen 
            onBack={() => setCurrentScreen('photo-capture')}
            onOpenCamera={() => setCurrentScreen('photo-capture')}
          />
        ) : (
          /* All Other Screens */
          <div 
            className="flex-1 overflow-y-auto"
            style={{
              paddingTop: 'calc(var(--header-height) + var(--spacing-6))',
            }}
            // RN: Replace with ScrollView or FlatList
          >
            {currentScreen === 'quick-actions' && <QuickActionsScreen />}
            {currentScreen === 'emergency' && <EmergencyScreen />}
            {currentScreen === 'maintenance' && <MaintenanceScreen />}
            {currentScreen === 'workflows' && <WorkflowsScreen />}
            {currentScreen === 'properties' && <PropertiesScreen />}
            {currentScreen === 'documents' && <DocumentsScreen />}
            {currentScreen === 'reports' && <ReportsScreen />}
            {currentScreen === 'ai-assistant' && <AIAssistantScreen />}
            {currentScreen === 'insights' && (
              <InsightsScreen 
                onNavigateToOpportunities={() => setCurrentScreen('opportunity-reveal')}
                onNavigateToInsuranceOptimizer={() => setCurrentScreen('insurance-optimizer')}
                onNavigateToMortgageOptimizer={() => setCurrentScreen('mortgage-optimizer')}
              />
            )}
            {currentScreen === 'alerts' && <AlertsScreen />}
            {currentScreen === 'search-properties' && <SearchPropertiesScreen />}
            {currentScreen === 'find-agents' && <FindAgentsScreen />}
            {currentScreen === 'locate-services' && <LocateServicesScreen />}
            {currentScreen === 'discover' && <DiscoverScreen onNavigate={handleNavigation} />}
            {currentScreen === 'market-trends' && <MarketTrendsScreen />}
            {currentScreen === 'best-practices' && <BestPracticesScreen />}
            {currentScreen === 'learning-center' && <LearningCenterScreen />}
            {currentScreen === 'community' && <CommunityScreen />}
            {currentScreen === 'damage-assessment' && <DamageAssessmentScreen />}
            {currentScreen === 'property-inspection' && <PropertyInspectionScreen />}
            {currentScreen === 'visual-reports' && <VisualReportsScreen />}
            {currentScreen === 'calendar' && <CalendarScreen />}
            {currentScreen === 'grants' && <GrantsScreen />}
            {currentScreen === 'property-details' && <PropertyDetailsScreen />}
            {currentScreen === 'policy' && <PolicyScreen />}
            {currentScreen === 'angel-functions' && <AngelFunctionsScreen onBack={() => setCurrentScreen('dashboard')} onNavigate={(screen) => setCurrentScreen(screen as ScreenType)} />}
            {currentScreen === 'weather' && <WeatherScreen />}
            {currentScreen === 'user-persona' && (
              <UserPersonaScreen 
                onBack={() => setCurrentScreen('dashboard')}
                onNavigateToSurvey={() => setCurrentScreen('benefits-survey')}
              />
            )}
            {currentScreen === 'benefits-survey' && (
              <BenefitsSurveyScreen 
                onBack={() => setCurrentScreen('user-persona')}
              />
            )}
          </div>
        )}

        {/* ==================== LAYER 100-101: BOTTOM NAVIGATION (z-index: 100-101) ==================== */}
        {/* RN: Remove - Tab Navigator handles this automatically */}
        {currentScreen !== 'email-entry' && currentScreen !== 'opportunity-reveal' && currentScreen !== 'insurance-optimizer' && currentScreen !== 'mortgage-optimizer' && currentScreen !== 'angel-functions' && currentScreen !== 'photo-capture' && currentScreen !== 'gallery' && (
          <div 
            className="absolute bottom-0 left-0 right-0"
            style={{ 
              marginBottom: 'var(--spacing-4)',
              zIndex: 'var(--z-navigation)', // 100
            }}
          >
            <BottomNavigation 
              onNavigate={handleNavigation}
            />
          </div>
        )}

        {/* ==================== LAYER 1000-1001: HEADER (z-index: 1000-1001) ==================== */}
        {/* RN: Use navigation.setOptions() with custom header */}
        {currentScreen !== 'email-entry' && currentScreen !== 'opportunity-reveal' && currentScreen !== 'insurance-optimizer' && currentScreen !== 'mortgage-optimizer' && currentScreen !== 'photo-capture' && currentScreen !== 'gallery' && currentScreen !== 'user-persona' && currentScreen !== 'benefits-survey' && (
          <LiquidGlassHeader
            title={getPageTitle(currentScreen)}
            colorMode="dark"
            showBackButton={false}
            showAccount={true}
            showWeather={true}
            showAlerts={true}
            accountName="JD"
            onAccountPress={() => setCurrentScreen('user-persona')}
            onAccountMenuPress={() => setCurrentScreen('settings')}
            onWeatherPress={() => setCurrentScreen('weather')}
            onAlertsPress={() => setCurrentScreen('alerts')}
            weatherTemperature={weatherData.temperature}
            weatherUnit={weatherData.unit}
            weatherDisplayValue={weatherData.displayValue}
            weatherLabel={weatherData.label}
            weatherCondition={weatherData.condition}
            weatherSeverity={weatherData.severity}
            weatherLoading={weatherLoading}
          />
        )}

      </div>
    </div>
  );
}
