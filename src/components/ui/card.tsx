/**
 * ==============================================================================
 * CARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Container component with header, content, and footer sections.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means this card is MUCH easier to convert!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, flex-col, items-center
 *    - Spacing: gap-6, px-6, pt-6, pb-6
 *    - Colors: bg-card, text-card-foreground, text-muted-foreground
 *    - Sizing: All width/height utilities
 *    - Borders: rounded-xl, border
 *    - Typography: leading-none
 * 
 * ❌ CONVERT ONLY THESE:
 *    - div → View
 *    - h4, p → Text  
 *    - Platform-specific shadows (iOS shadow-* works, Android needs elevation)
 *    - Grid layout → flexbox (CardHeader with action)
 *    - For pressable cards: wrap with Pressable
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - CARD COMPONENTS
 * ==============================================================================
 * 
 * BEFORE (Web):
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Property Inspection</CardTitle>
 *     <CardDescription>Scheduled for today</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Details here...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <button>Cancel</button>
 *     <button>Confirm</button>
 *   </CardFooter>
 * </Card>
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * import { View, Text, Platform } from 'react-native';
 * 
 * <View 
 *   className="bg-card rounded-xl border border-border"
 *   style={Platform.OS === 'android' ? { elevation: 4 } : {}}
 * >
 *   <View className="px-6 pt-6 gap-1.5">
 *     <Text className="leading-none text-foreground">Property Inspection</Text>
 *     <Text className="text-muted-foreground">Scheduled for today</Text>
 *   </View>
 *   
 *   <View className="px-6 pb-6">
 *     <Text>Details here...</Text>
 *   </View>
 *   
 *   <View className="flex flex-row items-center px-6 pb-6 gap-3">
 *     <Pressable className="flex-1">
 *       <Text>Cancel</Text>
 *     </Pressable>
 *     <Pressable className="flex-1">
 *       <Text>Confirm</Text>
 *     </Pressable>
 *   </View>
 * </View>
 * ```
 * 
 * KEY POINTS:
 * - ✅ All spacing, color, border classes work as-is!
 * - ❌ Replace grid with flex for CardHeader with action
 * - ✅ Add elevation style for Android shadows
 * - ✅ All other Tailwind utilities preserved!
 * 
 * ==============================================================================
 * NATIVEWIND - PRESSABLE CARD
 * ==============================================================================
 * 
 * For interactive/navigable cards:
 * 
 * ```tsx
 * import { Pressable, View, Text } from 'react-native';
 * 
 * <Pressable
 *   onPress={() => navigation.navigate('PropertyDetails')}
 *   className={({ pressed }) => `
 *     bg-card rounded-xl border border-border
 *     ${pressed ? 'opacity-90 scale-[0.98]' : ''}
 *   `}
 * >
 *   <View className="px-6 pt-6">
 *     <Text className="text-foreground">123 Market St</Text>
 *     <Text className="text-muted-foreground">San Francisco, CA</Text>
 *   </View>
 *   <View className="px-6 pb-6">
 *     <Text>Last inspection: 2 days ago</Text>
 *   </View>
 * </Pressable>
 * ```
 * 
 * ==============================================================================
 * NATIVEWIND - CARDHEADER WITH ACTION
 * ==============================================================================
 * 
 * The web version uses CSS Grid. With NativeWind, use flexbox:
 * 
 * BEFORE (Web - Grid):
 * ```tsx
 * <div className="grid grid-cols-[1fr_auto] items-start gap-1.5">
 *   <div>
 *     <h4>Title</h4>
 *     <p>Description</p>
 *   </div>
 *   <button>Action</button>
 * </div>
 * ```
 * 
 * AFTER (React Native - Flex):
 * ```tsx
 * <View className="flex-row justify-between items-start px-6 pt-6">
 *   <View className="flex-1 gap-1.5">
 *     <Text className="text-foreground">Title</Text>
 *     <Text className="text-muted-foreground">Description</Text>
 *   </View>
 *   <Pressable>
 *     <Text>Action</Text>
 *   </Pressable>
 * </View>
 * ```
 * 
 * KEY: Use `flex-row justify-between` instead of grid
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND CARD EXAMPLE
 * ==============================================================================
 * 
 * ```tsx
 * import React from 'react';
 * import { View, Text, Pressable, Platform } from 'react-native';
 * import { MoreVertical } from 'lucide-react-native';
 * 
 * interface CardProps {
 *   pressable?: boolean;
 *   onPress?: () => void;
 *   children: React.ReactNode;
 *   className?: string;
 * }
 * 
 * export function Card({ pressable, onPress, children, className = '' }: CardProps) {
 *   const cardClassName = `
 *     bg-card rounded-xl border border-border
 *     ${className}
 *   `.trim();
 *   
 *   const shadowStyle = Platform.select({
 *     ios: {}, // shadow-* classes work on iOS
 *     android: { elevation: 4 },
 *   });
 *   
 *   if (pressable) {
 *     return (
 *       <Pressable
 *         onPress={onPress}
 *         className={({ pressed }) => `
 *           ${cardClassName}
 *           ${pressed ? 'opacity-90 scale-[0.98]' : ''}
 *         `}
 *         style={shadowStyle}
 *       >
 *         {children}
 *       </Pressable>
 *     );
 *   }
 *   
 *   return (
 *     <View className={cardClassName} style={shadowStyle}>
 *       {children}
 *     </View>
 *   );
 * }
 * 
 * export function CardHeader({ 
 *   children, 
 *   hasAction = false,
 *   className = '' 
 * }: { 
 *   children: React.ReactNode; 
 *   hasAction?: boolean;
 *   className?: string;
 * }) {
 *   return (
 *     <View className={`
 *       px-6 pt-6 gap-1.5
 *       ${hasAction ? 'flex-row justify-between items-start' : ''}
 *       ${className}
 *     `}>
 *       {children}
 *     </View>
 *   );
 * }
 * 
 * export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 *   return <Text className={`leading-none text-foreground ${className}`}>{children}</Text>;
 * }
 * 
 * export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 *   return <Text className={`text-muted-foreground ${className}`}>{children}</Text>;
 * }
 * 
 * export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 *   return <View className={`px-6 pb-6 ${className}`}>{children}</View>;
 * }
 * 
 * export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 *   return <View className={`flex flex-row items-center px-6 pb-6 gap-3 ${className}`}>{children}</View>;
 * }
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic card - All classes work!
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Property Inspection</CardTitle>
 *     <CardDescription>Scheduled for today at 2:00 PM</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>123 Market Street, San Francisco, CA</Text>
 *   </CardContent>
 * </Card>
 * 
 * // Card with action button
 * <Card>
 *   <CardHeader hasAction>
 *     <View className="flex-1 gap-1.5">
 *       <CardTitle>Weather Alert</CardTitle>
 *       <CardDescription>High winds expected</CardDescription>
 *     </View>
 *     <Pressable className="p-2">
 *       <MoreVertical size={16} color="#666" />
 *     </Pressable>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>Wind speeds up to 45 mph expected...</Text>
 *   </CardContent>
 * </Card>
 * 
 * // Pressable card (navigable)
 * <Card pressable onPress={() => navigation.navigate('PropertyDetails')}>
 *   <CardHeader>
 *     <CardTitle>123 Market Street</CardTitle>
 *     <CardDescription>San Francisco, CA 94103</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <Text className="text-muted-foreground">Last inspection: 2 days ago</Text>
 *   </CardContent>
 * </Card>
 * 
 * // Card with footer buttons
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Confirm Inspection</CardTitle>
 *     <CardDescription>Schedule drone inspection?</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>123 Market St, San Francisco</Text>
 *   </CardContent>
 *   <CardFooter>
 *     <Pressable className="flex-1 bg-transparent border border-border rounded-lg py-2">
 *       <Text className="text-center">Cancel</Text>
 *     </Pressable>
 *     <Pressable className="flex-1 bg-pa-gold rounded-lg py-2">
 *       <Text className="text-center text-black">Confirm</Text>
 *     </Pressable>
 *   </CardFooter>
 * </Card>
 * ```
 * 
 * ==============================================================================
 * PLATFORM-SPECIFIC SHADOWS
 * ==============================================================================
 * 
 * iOS: Tailwind shadow classes work with NativeWind
 * Android: Must use elevation in style prop
 * 
 * ```tsx
 * <View 
 *   className="bg-card rounded-xl shadow-lg"  // shadow-lg works on iOS
 *   style={Platform.OS === 'android' ? { elevation: 8 } : {}}
 * >
 * ```
 * 
 * ==============================================================================
 * REQUIRED PACKAGES
 * ==============================================================================
 * 
 * ```bash
 * npm install nativewind
 * npm install lucide-react-native  # For icons
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
 * The annotations below show the original StyleSheet approach.
 * With NativeWind, most of this is unnecessary - just use className!
 * 
 * COMPLEXITY: LOW-MEDIUM → LOW (with NativeWind)
 * 
 * ==============================================================================
 */

import * as React from "react";

import { cn } from "./utils";

/**
 * RN: Card - Main container component
 * 
 * CONVERSION NOTES:
 * - Replace <div> with View
 * - className becomes style prop
 * - bg-card → backgroundColor from colors
 * - Border and shadow for elevation effect
 * - Support glassmorphic styling for PolicyAngel
 * 
 * TAILWIND CLASS CONVERSION:
 * - bg-card → { backgroundColor: colors.card }
 * - text-card-foreground → Applied to child Text components
 * - flex → Not needed (View is flex by default)
 * - flex-col → { flexDirection: 'column' } (default)
 * - gap-6 → { gap: 24 } or margin on children
 * - rounded-xl → { borderRadius: 12 }
 * - border → { borderWidth: 1, borderColor: colors.border }
 * 
 * SHADOW/ELEVATION:
 * iOS uses shadowColor, shadowOffset, shadowOpacity, shadowRadius
 * Android uses elevation
 * 
 * Platform.select({
 *   ios: {
 *     shadowColor: '#000',
 *     shadowOffset: { width: 0, height: 2 },
 *     shadowOpacity: 0.1,
 *     shadowRadius: 8,
 *   },
 *   android: {
 *     elevation: 4,
 *   },
 * })
 * 
 * GLASSMORPHIC STYLING (PolicyAngel):
 * {
 *   backgroundColor: colors.card + 'CC', // Semi-transparent
 *   borderWidth: 1,
 *   borderColor: colors.border + '40',
 *   backdropFilter: 'blur(10px)', // Not supported in RN
 *   // For blur effect, use react-native-blur or @react-native-community/blur
 * }
 * 
 * PRESSABLE CARD:
 * For interactive cards, wrap in Pressable:
 * <Pressable onPress={handlePress} style={({ pressed }) => [...]}>
 *   <View style={styles.card}>...</View>
 * </Pressable>
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      // RN: Replace with View
      // RN: bg-card → backgroundColor: colors.card
      // RN: flex flex-col → flexDirection: 'column' (default)
      // RN: gap-6 → { gap: 24 } or use marginBottom on children
      // RN: rounded-xl → borderRadius: 12
      // RN: border → borderWidth: 1, borderColor: colors.border
      // RN: Add shadow/elevation for depth
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RN: CardHeader - Header section with title and optional action
 * 
 * CONVERSION NOTES:
 * - Replace with View
 * - CSS Grid layout becomes flexbox
 * - grid-cols-[1fr_auto] → flexDirection: 'row', justifyContent: 'space-between'
 * - @container queries not available in RN
 * 
 * TAILWIND CLASS CONVERSION:
 * - @container/card-header → Not applicable
 * - grid → { display: 'flex' }
 * - auto-rows-min → Not applicable (use flex)
 * - grid-rows-[auto_auto] → Nested View structure
 * - items-start → { alignItems: 'flex-start' }
 * - gap-1.5 → { gap: 6 }
 * - px-6 → { paddingHorizontal: 24 }
 * - pt-6 → { paddingTop: 24 }
 * - has-data-[slot=card-action]:grid-cols-[1fr_auto] → Conditional layout
 * - [.border-b]:pb-6 → Conditional paddingBottom
 * 
 * LAYOUT PATTERN:
 * <View style={styles.cardHeader}>
 *   <View style={styles.cardHeaderMain}>
 *     <CardTitle />
 *     <CardDescription />
 *   </View>
 *   {action && <View style={styles.cardAction}>{action}</View>}
 * </View>
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      // RN: Replace with View
      // RN: grid → flexDirection: 'row' (if has action) or 'column'
      // RN: gap-1.5 → { gap: 6 }
      // RN: px-6 → paddingHorizontal: 24
      // RN: pt-6 → paddingTop: 24
      // RN: Remove grid-based layout, use flex
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RN: CardTitle - Title text component
 * 
 * CONVERSION NOTES:
 * - Replace <h4> with Text component
 * - leading-none → { lineHeight: fontSize } (tight line height)
 * - Typography styles from design system
 * 
 * TAILWIND CLASS CONVERSION:
 * - leading-none → { lineHeight: undefined } (use default from globals.css)
 * 
 * Note: Font size, weight come from global typography
 * in /styles/globals.css, don't override unless requested
 * 
 * EXAMPLE STYLE:
 * cardTitle: {
 *   color: colors.foreground,
 *   // fontSize and fontWeight from global h4 styles
 * }
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      // RN: Replace <h4> with Text component
      // RN: leading-none → Not needed, use design system typography
      // RN: Color: colors.foreground
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

/**
 * RN: CardDescription - Description/subtitle text
 * 
 * CONVERSION NOTES:
 * - Replace <p> with Text component
 * - text-muted-foreground → color: colors.mutedForeground
 * - Smaller, lighter text than title
 * 
 * TAILWIND CLASS CONVERSION:
 * - text-muted-foreground → { color: colors.mutedForeground }
 * 
 * EXAMPLE STYLE:
 * cardDescription: {
 *   color: colors.mutedForeground,
 *   opacity: 0.8,
 *   // fontSize from global p styles
 * }
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      // RN: Replace <p> with Text component
      // RN: text-muted-foreground → color: colors.mutedForeground
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

/**
 * RN: CardAction - Action button/element in header
 * 
 * CONVERSION NOTES:
 * - Replace with View
 * - Grid positioning becomes flex positioning
 * - col-start-2 row-span-2 → Use flex alignment
 * - Usually contains a button or icon button
 * 
 * TAILWIND CLASS CONVERSION:
 * - col-start-2 → Not applicable (use flex)
 * - row-span-2 → Not applicable
 * - row-start-1 → Not applicable
 * - self-start → { alignSelf: 'flex-start' }
 * - justify-self-end → Use parent justifyContent: 'space-between'
 * 
 * LAYOUT APPROACH:
 * Parent header uses:
 * {
 *   flexDirection: 'row',
 *   justifyContent: 'space-between',
 *   alignItems: 'flex-start'
 * }
 * 
 * CardAction positioned on right automatically
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      // RN: Replace with View
      // RN: Remove grid positioning, use flex
      // RN: self-start → alignSelf: 'flex-start'
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RN: CardContent - Main content area
 * 
 * CONVERSION NOTES:
 * - Replace with View
 * - Simple padding container
 * - Conditional bottom padding if last child
 * 
 * TAILWIND CLASS CONVERSION:
 * - px-6 → { paddingHorizontal: 24 }
 * - [&:last-child]:pb-6 → Conditional paddingBottom
 * 
 * CONDITIONAL PADDING:
 * Check if CardFooter exists, adjust padding:
 * const hasFooter = React.Children.toArray(cardChildren).some(
 *   child => child.type === CardFooter
 * );
 * paddingBottom: hasFooter ? 0 : 24
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      // RN: Replace with View
      // RN: px-6 → paddingHorizontal: 24
      // RN: [&:last-child]:pb-6 → Conditional paddingBottom: 24
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

/**
 * RN: CardFooter - Footer section
 * 
 * CONVERSION NOTES:
 * - Replace with View
 * - Usually contains action buttons
 * - Horizontal flex layout for buttons
 * 
 * TAILWIND CLASS CONVERSION:
 * - flex → { display: 'flex' } (default)
 * - items-center → { alignItems: 'center' }
 * - px-6 → { paddingHorizontal: 24 }
 * - pb-6 → { paddingBottom: 24 }
 * - [.border-t]:pt-6 → Conditional paddingTop if has border
 * 
 * BUTTON GROUP IN FOOTER:
 * <View style={styles.cardFooter}>
 *   <Button variant="outline" style={{ flex: 1 }}>Cancel</Button>
 *   <Button variant="default" style={{ flex: 1 }}>Confirm</Button>
 * </View>
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      // RN: Replace with View
      // RN: flex → flexDirection: 'row' (for button group)
      // RN: items-center → alignItems: 'center'
      // RN: px-6 → paddingHorizontal: 24
      // RN: pb-6 → paddingBottom: 24
      // RN: Add gap between buttons if needed
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * import React from 'react';
 * import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
 * 
 * interface CardProps {
 *   children: React.ReactNode;
 *   style?: any;
 *   glassmorphic?: boolean;
 *   pressable?: boolean;
 *   onPress?: () => void;
 * }
 * 
 * export const Card: React.FC<CardProps> = ({ 
 *   children, 
 *   style, 
 *   glassmorphic = false,
 *   pressable = false,
 *   onPress,
 * }) => {
 *   const cardStyle = [
 *     styles.card,
 *     glassmorphic && styles.cardGlassmorphic,
 *     style,
 *   ];
 *   
 *   if (pressable) {
 *     return (
 *       <Pressable 
 *         onPress={onPress}
 *         style={({ pressed }) => [
 *           ...cardStyle,
 *           pressed && styles.cardPressed,
 *         ]}
 *       >
 *         {children}
 *       </Pressable>
 *     );
 *   }
 *   
 *   return <View style={cardStyle}>{children}</View>;
 * };
 * 
 * export const CardHeader: React.FC<{ children: React.ReactNode; style?: any }> = ({ 
 *   children, 
 *   style 
 * }) => {
 *   // Check if children includes CardAction
 *   const childrenArray = React.Children.toArray(children);
 *   const hasAction = childrenArray.some(
 *     (child: any) => child?.type?.name === 'CardAction'
 *   );
 *   
 *   return (
 *     <View style={[
 *       styles.cardHeader,
 *       hasAction && styles.cardHeaderWithAction,
 *       style
 *     ]}>
 *       {children}
 *     </View>
 *   );
 * };
 * 
 * export const CardTitle: React.FC<{ children: React.ReactNode; style?: any }> = ({ 
 *   children, 
 *   style 
 * }) => (
 *   <Text style={[styles.cardTitle, style]}>
 *     {children}
 *   </Text>
 * );
 * 
 * export const CardDescription: React.FC<{ children: React.ReactNode; style?: any }> = ({ 
 *   children, 
 *   style 
 * }) => (
 *   <Text style={[styles.cardDescription, style]}>
 *     {children}
 *   </Text>
 * );
 * 
 * export const CardAction: React.FC<{ children: React.ReactNode; style?: any }> = ({ 
 *   children, 
 *   style 
 * }) => (
 *   <View style={[styles.cardAction, style]}>
 *     {children}
 *   </View>
 * );
 * 
 * export const CardContent: React.FC<{ children: React.ReactNode; style?: any }> = ({ 
 *   children, 
 *   style 
 * }) => (
 *   <View style={[styles.cardContent, style]}>
 *     {children}
 *   </View>
 * );
 * 
 * export const CardFooter: React.FC<{ children: React.ReactNode; style?: any }> = ({ 
 *   children, 
 *   style 
 * }) => (
 *   <View style={[styles.cardFooter, style]}>
 *     {children}
 *   </View>
 * );
 * 
 * const styles = StyleSheet.create({
 *   card: {
 *     backgroundColor: colors.card,
 *     borderRadius: 12,
 *     borderWidth: 1,
 *     borderColor: colors.border,
 *     overflow: 'hidden',
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: '#000',
 *         shadowOffset: { width: 0, height: 2 },
 *         shadowOpacity: 0.1,
 *         shadowRadius: 8,
 *       },
 *       android: {
 *         elevation: 4,
 *       },
 *     }),
 *   },
 *   cardGlassmorphic: {
 *     backgroundColor: colors.card + 'CC', // 80% opacity
 *     borderColor: colors.border + '40', // 25% opacity
 *     // Note: For true glassmorphism, use react-native-blur
 *   },
 *   cardPressed: {
 *     opacity: 0.9,
 *     transform: [{ scale: 0.98 }],
 *   },
 *   cardHeader: {
 *     paddingHorizontal: 24,
 *     paddingTop: 24,
 *     gap: 6,
 *   },
 *   cardHeaderWithAction: {
 *     flexDirection: 'row',
 *     justifyContent: 'space-between',
 *     alignItems: 'flex-start',
 *   },
 *   cardTitle: {
 *     color: colors.foreground,
 *     // fontSize and fontWeight from design system
 *   },
 *   cardDescription: {
 *     color: colors.mutedForeground,
 *     opacity: 0.8,
 *   },
 *   cardAction: {
 *     alignSelf: 'flex-start',
 *   },
 *   cardContent: {
 *     paddingHorizontal: 24,
 *     paddingBottom: 24,
 *   },
 *   cardFooter: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     paddingHorizontal: 24,
 *     paddingBottom: 24,
 *     gap: 12,
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic card
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Property Inspection</CardTitle>
 *     <CardDescription>Scheduled for today at 2:00 PM</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>Inspection details go here...</Text>
 *   </CardContent>
 * </Card>
 * 
 * // Card with action button
 * <Card>
 *   <CardHeader>
 *     <View>
 *       <CardTitle>Weather Alert</CardTitle>
 *       <CardDescription>High winds expected</CardDescription>
 *     </View>
 *     <CardAction>
 *       <Button size="icon" variant="ghost">
 *         <MoreVertical size={16} />
 *       </Button>
 *     </CardAction>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>Wind speeds up to 45 mph...</Text>
 *   </CardContent>
 * </Card>
 * 
 * // Card with footer buttons
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Confirm Inspection</CardTitle>
 *     <CardDescription>Schedule drone inspection?</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>123 Market St, San Francisco</Text>
 *   </CardContent>
 *   <CardFooter>
 *     <Button variant="outline" style={{ flex: 1 }}>
 *       Cancel
 *     </Button>
 *     <Button variant="default" style={{ flex: 1 }}>
 *       Confirm
 *     </Button>
 *   </CardFooter>
 * </Card>
 * 
 * // Pressable card (navigable)
 * <Card pressable onPress={() => navigation.navigate('PropertyDetails')}>
 *   <CardHeader>
 *     <CardTitle>123 Market Street</CardTitle>
 *     <CardDescription>San Francisco, CA 94103</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>Last inspection: 2 days ago</Text>
 *   </CardContent>
 * </Card>
 * 
 * // Glassmorphic card (PolicyAngel style)
 * import { BlurView } from '@react-native-community/blur';
 * 
 * <BlurView blurType="light" blurAmount={10} style={styles.blurContainer}>
 *   <Card glassmorphic>
 *     <CardHeader>
 *       <CardTitle>Premium Feature</CardTitle>
 *       <CardDescription>Unlock with PolicyAngel Pro</CardDescription>
 *     </CardHeader>
 *   </Card>
 * </BlurView>
 * 
 * // Card with image
 * import { Image } from 'react-native';
 * 
 * <Card>
 *   <Image 
 *     source={{ uri: propertyImage }}
 *     style={styles.cardImage}
 *     resizeMode="cover"
 *   />
 *   <CardHeader>
 *     <CardTitle>Property Overview</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>Detailed description...</Text>
 *   </CardContent>
 * </Card>
 * 
 * const styles = StyleSheet.create({
 *   cardImage: {
 *     width: '100%',
 *     height: 200,
 *   },
 * });
 */

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
