/**
 * ==============================================================================
 * TABS.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * ✅ Use @react-navigation/material-top-tabs or custom with NativeWind!
 * ✅ All Tailwind classes work! Active state via className conditionals
 * 
 * ```tsx
 * import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 * const Tab = createMaterialTopTabNavigator();
 * 
 * <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#000000' }, tabBarActiveTintColor: '#C4A962' }}>
 *   <Tab.Screen name="Tab1" component={Screen1} />
 * </Tab.Navigator>
 * 
 * // Or custom:
 * const [activeTab, setActiveTab] = useState('tab1');
 * <View className="flex-row border-b border-white/10">
 *   {tabs.map((tab) => (
 *     <Pressable key={tab.id} onPress={() => setActiveTab(tab.id)} className={`flex-1 p-4 ${activeTab === tab.id ? 'border-b-2 border-pa-gold' : ''}`}>
 *       <Text className={activeTab === tab.id ? 'text-pa-gold' : 'text-white'}>{tab.label}</Text>
 *     </Pressable>
 *   ))}
 * </View>
 * ```
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * COMPLEXITY: MEDIUM-HIGH
 * Tabs require custom implementation in React Native as there's no direct equivalent.
 * 
 * CONVERSION STRATEGY:
 * 1. Replace Radix UI Tabs with React Native state management
 * 2. Use Pressable for tab triggers with custom styling
 * 3. Implement content switching with conditional rendering
 * 4. Add animations for smooth tab transitions
 * 5. Support horizontal scrolling for many tabs
 * 
 * RECOMMENDED LIBRARIES:
 * - react-native-tab-view (full-featured tab solution with gestures)
 * - @react-navigation/material-top-tabs (navigation-based tabs)
 * - Custom implementation (recommended for full control)
 * 
 * KEY DIFFERENCES:
 * - No native tab component - build with Pressable + View
 * - Swipe gestures common in mobile (use PanResponder or library)
 * - Active state managed with React state
 * - Animations handled with Animated API or Reanimated
 * - ScrollView needed for horizontal overflow
 * 
 * EXAMPLE CONVERSION:
 * 
 * Web:
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * 
 * React Native:
 * const [activeTab, setActiveTab] = useState('tab1');
 * 
 * <View style={styles.tabsContainer}>
 *   <View style={styles.tabsList}>
 *     <Pressable 
 *       onPress={() => setActiveTab('tab1')}
 *       style={[styles.tabTrigger, activeTab === 'tab1' && styles.tabTriggerActive]}
 *     >
 *       <Text style={[styles.tabText, activeTab === 'tab1' && styles.tabTextActive]}>
 *         Tab 1
 *       </Text>
 *     </Pressable>
 *     <Pressable 
 *       onPress={() => setActiveTab('tab2')}
 *       style={[styles.tabTrigger, activeTab === 'tab2' && styles.tabTriggerActive]}
 *     >
 *       <Text style={[styles.tabText, activeTab === 'tab2' && styles.tabTextActive]}>
 *         Tab 2
 *       </Text>
 *     </Pressable>
 *   </View>
 *   <View style={styles.tabContent}>
 *     {activeTab === 'tab1' && <TabOneContent />}
 *     {activeTab === 'tab2' && <TabTwoContent />}
 *   </View>
 * </View>
 */

"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs@1.1.3";

import { cn } from "./utils";

/**
 * RN: Main Tabs container component
 * 
 * CONVERSION NOTES:
 * - Replace with View component
 * - Manage active tab with useState
 * - defaultValue becomes initial state value
 * - value/onValueChange become controlled state
 * 
 * PROPS MAPPING:
 * - className → style prop
 * - defaultValue → useState initial value
 * - value → controlled state value
 * - onValueChange → setState callback
 * - orientation → flexDirection in style
 * 
 * RN IMPLEMENTATION:
 * interface TabsProps {
 *   defaultValue?: string;
 *   value?: string;
 *   onValueChange?: (value: string) => void;
 *   style?: ViewStyle;
 *   children: React.ReactNode;
 * }
 * 
 * const Tabs: React.FC<TabsProps> = ({ 
 *   defaultValue, 
 *   value, 
 *   onValueChange,
 *   style,
 *   children 
 * }) => {
 *   const [internalValue, setInternalValue] = useState(defaultValue || '');
 *   const activeValue = value ?? internalValue;
 *   
 *   const handleChange = (newValue: string) => {
 *     if (!value) setInternalValue(newValue);
 *     onValueChange?.(newValue);
 *   };
 *   
 *   return (
 *     <TabsContext.Provider value={{ activeValue, onChange: handleChange }}>
 *       <View style={[styles.tabs, style]}>
 *         {children}
 *       </View>
 *     </TabsContext.Provider>
 *   );
 * };
 * 
 * TAILWIND CLASS CONVERSION:
 * - flex → { display: 'flex' } (default in RN)
 * - flex-col → { flexDirection: 'column' }
 * - gap-2 → { gap: 8 } (or use margin on children)
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      // RN: Remove className, use style prop
      // RN: flex-col → { flexDirection: 'column' }
      // RN: gap-2 → { gap: 8 } or separate children with marginBottom
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

/**
 * RN: TabsList - Container for tab triggers
 * 
 * CONVERSION NOTES:
 * - Replace with ScrollView (horizontal) for scrollable tabs
 * - Or View for fixed width tabs
 * - Background color from CSS variables
 * - Pill-shaped container with border radius
 * 
 * SCROLLABLE TABS PATTERN:
 * <ScrollView 
 *   horizontal 
 *   showsHorizontalScrollIndicator={false}
 *   contentContainerStyle={styles.tabsList}
 * >
 *   {tabTriggers}
 * </ScrollView>
 * 
 * TAILWIND CLASS CONVERSION:
 * - bg-muted → backgroundColor: colors.muted
 * - text-muted-foreground → color: colors.mutedForeground
 * - inline-flex → Not needed (View is flex by default)
 * - h-9 → { height: 36 }
 * - w-fit → { width: 'auto' } or flexShrink: 1
 * - items-center → { alignItems: 'center' }
 * - justify-center → { justifyContent: 'center' }
 * - rounded-xl → { borderRadius: 12 }
 * - p-[3px] → { padding: 3 }
 * - flex → { display: 'flex' } (default)
 * 
 * EXAMPLE STYLES:
 * tabsList: {
 *   flexDirection: 'row',
 *   alignItems: 'center',
 *   justifyContent: 'center',
 *   backgroundColor: colors.muted,
 *   borderRadius: 12,
 *   padding: 3,
 *   alignSelf: 'flex-start', // for w-fit behavior
 * }
 */
function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      // RN: Replace with ScrollView (horizontal) or View
      // RN: bg-muted → backgroundColor from colors.muted
      // RN: h-9 → height: 36
      // RN: rounded-xl → borderRadius: 12
      // RN: p-[3px] → padding: 3
      // RN: items-center → alignItems: 'center'
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RN: TabsTrigger - Individual tab button
 * 
 * CONVERSION NOTES:
 * - Replace with Pressable component
 * - Handle active state with conditional styling
 * - data-[state=active] becomes activeValue === value
 * - Focus states become press states
 * - Include haptic feedback on press (iOS/Android)
 * 
 * PRESSABLE STATES:
 * - onPress: setActiveTab(value)
 * - style: ({ pressed }) => conditional styles
 * - android_ripple: { color: rippleColor }
 * - HapticFeedback.trigger() on press
 * 
 * TAILWIND CLASS CONVERSION:
 * - data-[state=active]:bg-card → activeTab === value ? colors.card : 'transparent'
 * - data-[state=active]:text-foreground → activeTab === value ? colors.foreground : colors.mutedForeground
 * - inline-flex → { display: 'flex' }
 * - h-[calc(100%-1px)] → { height: '100%', marginVertical: 0.5 } or fixed height
 * - flex-1 → { flex: 1 }
 * - items-center → { alignItems: 'center' }
 * - justify-center → { justifyContent: 'center' }
 * - gap-1.5 → { gap: 6 }
 * - rounded-xl → { borderRadius: 12 }
 * - border → { borderWidth: 1 }
 * - border-transparent → { borderColor: 'transparent' }
 * - px-2 → { paddingHorizontal: 8 }
 * - py-1 → { paddingVertical: 4 }
 * - text-sm → fontSize from design system (14px)
 * - font-medium → fontWeight: '500'
 * - whitespace-nowrap → numberOfLines: 1
 * - transition → Use Animated.timing or spring
 * - disabled:opacity-50 → disabled && { opacity: 0.5 }
 * 
 * FOCUS/PRESS STATES:
 * Web: focus-visible:border-ring, focus-visible:ring-ring/50
 * RN: Use Pressable ({ pressed }) styling:
 * style={({ pressed }) => [
 *   styles.tabTrigger,
 *   pressed && styles.tabTriggerPressed,
 *   isActive && styles.tabTriggerActive,
 * ]}
 * 
 * ANIMATED EXAMPLE:
 * const scaleAnim = useRef(new Animated.Value(1)).current;
 * 
 * <Pressable
 *   onPressIn={() => {
 *     Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
 *   }}
 *   onPressOut={() => {
 *     Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
 *   }}
 * >
 *   <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
 *     <Text>Tab</Text>
 *   </Animated.View>
 * </Pressable>
 * 
 * ICONS IN TABS:
 * Web: [&_svg]:size-4
 * RN: Pass icon as prop, render with fixed size
 * <Icon name="home" size={16} color={isActive ? activeColor : inactiveColor} />
 */
function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      // RN: Replace with Pressable
      // RN: Get activeValue from context to determine if this trigger is active
      // RN: Apply conditional styles based on active state
      // RN: data-[state=active] classes become isActive condition
      // RN: focus-visible states become Pressable pressed state
      // RN: disabled:opacity-50 → disabled prop with opacity style
      // RN: whitespace-nowrap → numberOfLines={1} on Text
      className={cn(
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RN: TabsContent - Content panel for each tab
 * 
 * CONVERSION NOTES:
 * - Replace with conditional rendering based on active value
 * - Or use Animated.View for transitions
 * - Only render active content for performance
 * - Or use position absolute with opacity for smoother transitions
 * 
 * BASIC PATTERN:
 * Conditional rendering:
 * activeTab === value && (
 *   <View style={styles.tabContent}>
 *     {children}
 *   </View>
 * )
 * 
 * ANIMATED PATTERN (fade):
 * const opacity = useRef(new Animated.Value(0)).current;
 * 
 * useEffect(() => {
 *   Animated.timing(opacity, {
 *     toValue: activeTab === value ? 1 : 0,
 *     duration: 200,
 *     useNativeDriver: true,
 *   }).start();
 * }, [activeTab, value]);
 * 
 * return (
 *   <Animated.View 
 *     style={[
 *       styles.tabContent,
 *       { opacity },
 *       activeTab !== value && styles.hidden
 *     ]}
 *     pointerEvents={activeTab === value ? 'auto' : 'none'}
 *   >
 *     {children}
 *   </Animated.View>
 * );
 * 
 * PERFORMANCE TIP:
 * Use React.memo for heavy content components:
 * const TabContent = React.memo(({ children }) => <View>{children}</View>);
 * 
 * TAILWIND CLASS CONVERSION:
 * - flex-1 → { flex: 1 }
 * - outline-none → Not applicable (RN doesn't have outline)
 * 
 * LAZY LOADING PATTERN:
 * const [loadedTabs, setLoadedTabs] = useState(new Set([defaultValue]));
 * 
 * useEffect(() => {
 *   if (activeTab) {
 *     setLoadedTabs(prev => new Set(prev).add(activeTab));
 *   }
 * }, [activeTab]);
 * 
 * return loadedTabs.has(value) && (
 *   <View style={[styles.content, activeTab !== value && styles.hidden]}>
 *     {children}
 *   </View>
 * );
 */
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      // RN: Replace with conditional rendering: {activeTab === value && children}
      // RN: Or use Animated.View for fade/slide transitions
      // RN: flex-1 → { flex: 1 } to fill available space
      // RN: outline-none → Not applicable in RN
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
 * import { View, Text, Pressable, ScrollView, Animated, StyleSheet } from 'react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * // Context for managing tab state
 * interface TabsContextValue {
 *   activeValue: string;
 *   onChange: (value: string) => void;
 * }
 * 
 * const TabsContext = createContext<TabsContextValue | null>(null);
 * 
 * const useTabsContext = () => {
 *   const context = useContext(TabsContext);
 *   if (!context) throw new Error('Tabs components must be used within Tabs');
 *   return context;
 * };
 * 
 * // Main Tabs component
 * interface TabsProps {
 *   defaultValue?: string;
 *   value?: string;
 *   onValueChange?: (value: string) => void;
 *   style?: any;
 *   children: React.ReactNode;
 * }
 * 
 * export const Tabs: React.FC<TabsProps> = ({ 
 *   defaultValue = '', 
 *   value, 
 *   onValueChange,
 *   style,
 *   children 
 * }) => {
 *   const [internalValue, setInternalValue] = useState(defaultValue);
 *   const activeValue = value ?? internalValue;
 *   
 *   const handleChange = (newValue: string) => {
 *     if (!value) setInternalValue(newValue);
 *     onValueChange?.(newValue);
 *   };
 *   
 *   return (
 *     <TabsContext.Provider value={{ activeValue, onChange: handleChange }}>
 *       <View style={[styles.tabs, style]}>
 *         {children}
 *       </View>
 *     </TabsContext.Provider>
 *   );
 * };
 * 
 * // TabsList component
 * interface TabsListProps {
 *   scrollable?: boolean;
 *   style?: any;
 *   children: React.ReactNode;
 * }
 * 
 * export const TabsList: React.FC<TabsListProps> = ({ scrollable = false, style, children }) => {
 *   if (scrollable) {
 *     return (
 *       <ScrollView
 *         horizontal
 *         showsHorizontalScrollIndicator={false}
 *         contentContainerStyle={[styles.tabsList, style]}
 *       >
 *         {children}
 *       </ScrollView>
 *     );
 *   }
 *   
 *   return (
 *     <View style={[styles.tabsList, style]}>
 *       {children}
 *     </View>
 *   );
 * };
 * 
 * // TabsTrigger component
 * interface TabsTriggerProps {
 *   value: string;
 *   disabled?: boolean;
 *   style?: any;
 *   children: React.ReactNode;
 * }
 * 
 * export const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
 *   value, 
 *   disabled = false,
 *   style, 
 *   children 
 * }) => {
 *   const { activeValue, onChange } = useTabsContext();
 *   const isActive = activeValue === value;
 *   const scaleAnim = useRef(new Animated.Value(1)).current;
 *   
 *   const handlePress = () => {
 *     if (!disabled) {
 *       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *       onChange(value);
 *     }
 *   };
 *   
 *   return (
 *     <Pressable
 *       onPress={handlePress}
 *       onPressIn={() => {
 *         Animated.spring(scaleAnim, {
 *           toValue: 0.95,
 *           useNativeDriver: true,
 *         }).start();
 *       }}
 *       onPressOut={() => {
 *         Animated.spring(scaleAnim, {
 *           toValue: 1,
 *           useNativeDriver: true,
 *         }).start();
 *       }}
 *       disabled={disabled}
 *       style={({ pressed }) => [
 *         styles.tabTrigger,
 *         isActive && styles.tabTriggerActive,
 *         pressed && styles.tabTriggerPressed,
 *         disabled && styles.tabTriggerDisabled,
 *         style,
 *       ]}
 *     >
 *       <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
 *         <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
 *           {children}
 *         </Text>
 *       </Animated.View>
 *     </Pressable>
 *   );
 * };
 * 
 * // TabsContent component
 * interface TabsContentProps {
 *   value: string;
 *   forceMount?: boolean;
 *   style?: any;
 *   children: React.ReactNode;
 * }
 * 
 * export const TabsContent: React.FC<TabsContentProps> = ({ 
 *   value, 
 *   forceMount = false,
 *   style, 
 *   children 
 * }) => {
 *   const { activeValue } = useTabsContext();
 *   const isActive = activeValue === value;
 *   const opacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;
 *   const [shouldRender, setShouldRender] = useState(isActive || forceMount);
 *   
 *   useEffect(() => {
 *     if (isActive) {
 *       setShouldRender(true);
 *       Animated.timing(opacity, {
 *         toValue: 1,
 *         duration: 200,
 *         useNativeDriver: true,
 *       }).start();
 *     } else {
 *       Animated.timing(opacity, {
 *         toValue: 0,
 *         duration: 200,
 *         useNativeDriver: true,
 *       }).start(() => {
 *         if (!forceMount) setShouldRender(false);
 *       });
 *     }
 *   }, [isActive]);
 *   
 *   if (!shouldRender) return null;
 *   
 *   return (
 *     <Animated.View 
 *       style={[
 *         styles.tabContent,
 *         { opacity },
 *         !isActive && styles.tabContentHidden,
 *         style,
 *       ]}
 *       pointerEvents={isActive ? 'auto' : 'none'}
 *     >
 *       {children}
 *     </Animated.View>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   tabs: {
 *     flex: 1,
 *     gap: 8,
 *   },
 *   tabsList: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     backgroundColor: colors.muted,
 *     borderRadius: 12,
 *     padding: 3,
 *     alignSelf: 'flex-start',
 *   },
 *   tabTrigger: {
 *     flex: 1,
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     gap: 6,
 *     paddingHorizontal: 8,
 *     paddingVertical: 4,
 *     borderRadius: 12,
 *     borderWidth: 1,
 *     borderColor: 'transparent',
 *     minHeight: 34,
 *   },
 *   tabTriggerActive: {
 *     backgroundColor: colors.card,
 *     borderColor: colors.input,
 *   },
 *   tabTriggerPressed: {
 *     opacity: 0.8,
 *   },
 *   tabTriggerDisabled: {
 *     opacity: 0.5,
 *   },
 *   tabText: {
 *     fontSize: 14,
 *     fontWeight: '500',
 *     color: colors.mutedForeground,
 *   },
 *   tabTextActive: {
 *     color: colors.foreground,
 *   },
 *   tabContent: {
 *     flex: 1,
 *   },
 *   tabContentHidden: {
 *     position: 'absolute',
 *     top: 0,
 *     left: 0,
 *     right: 0,
 *     bottom: 0,
 *   },
 * });
 * 
 * // USAGE EXAMPLE:
 * <Tabs defaultValue="home" onValueChange={(value) => console.log(value)}>
 *   <TabsList>
 *     <TabsTrigger value="home">Home</TabsTrigger>
 *     <TabsTrigger value="profile">Profile</TabsTrigger>
 *     <TabsTrigger value="settings">Settings</TabsTrigger>
 *   </TabsList>
 *   
 *   <TabsContent value="home">
 *     <Text>Home Content</Text>
 *   </TabsContent>
 *   
 *   <TabsContent value="profile">
 *     <Text>Profile Content</Text>
 *   </TabsContent>
 *   
 *   <TabsContent value="settings">
 *     <Text>Settings Content</Text>
 *   </TabsContent>
 * </Tabs>
 */

export { Tabs, TabsList, TabsTrigger, TabsContent };
