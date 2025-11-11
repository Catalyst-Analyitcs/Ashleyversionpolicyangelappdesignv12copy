/**
 * REACT NATIVE CONVERSION - ALERT COMPONENT
 * ==========================================
 * 
 * COMPLEXITY: LOW
 * Alert is a simple informational component showing messages to users.
 * 
 * CONVERSION STRATEGY:
 * 1. Replace div with View components
 * 2. Map variant colors to backgroundColor
 * 3. Use flexbox layout instead of CSS Grid
 * 4. Support icon + title + description pattern
 * 5. Add optional dismiss button
 * 
 * KEY DIFFERENCES:
 * - View instead of div
 * - Flexbox instead of CSS Grid
 * - Text components for typography
 * - Optional toast notifications for transient alerts
 * - Can add animations with Reanimated
 * 
 * RECOMMENDED PATTERNS:
 * - Inline alerts: Use this component
 * - Toast notifications: Use react-native-toast-message
 * - System alerts: Use Alert.alert() from react-native
 * 
 * EXAMPLE CONVERSION:
 * 
 * Web:
 * <Alert variant="destructive">
 *   <AlertTriangle />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Something went wrong</AlertDescription>
 * </Alert>
 * 
 * React Native:
 * <View style={[styles.alert, styles.alertDestructive]}>
 *   <AlertTriangle size={16} color={colors.destructive} />
 *   <View style={styles.alertContent}>
 *     <Text style={styles.alertTitle}>Error</Text>
 *     <Text style={styles.alertDescription}>Something went wrong</Text>
 *   </View>
 * </View>
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

/**
 * RN: Alert Variants Definition
 * 
 * CONVERSION NOTES:
 * - Replace class-variance-authority with style functions
 * - Map variant strings to style objects
 * - Handle icon, title, and description layout with flexbox
 * 
 * TAILWIND TO STYLE MAPPING:
 * Base styles (all alerts):
 * - relative → Not needed in most cases
 * - w-full → { width: '100%' }
 * - rounded-lg → { borderRadius: 8 }
 * - border → { borderWidth: 1, borderColor: colors.border }
 * - px-4 → { paddingHorizontal: 16 }
 * - py-3 → { paddingVertical: 12 }
 * - text-sm → { fontSize: 14 }
 * - grid → { display: 'flex', flexDirection: 'row' }
 * - has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] → Icon + content layout
 * - has-[>svg]:gap-x-3 → { gap: 12 }
 * - gap-y-0.5 → { marginBottom: 2 } between elements
 * - items-start → { alignItems: 'flex-start' }
 * - [&>svg]:size-4 → Icon size 16x16
 * - [&>svg]:translate-y-0.5 → { marginTop: 2 }
 * - [&>svg]:text-current → Icon color matches text
 * 
 * VARIANT CONVERSIONS:
 * 
 * 1. DEFAULT:
 *   - bg-card → { backgroundColor: colors.card }
 *   - text-card-foreground → { color: colors.cardForeground }
 * 
 * 2. DESTRUCTIVE:
 *   - text-destructive → { color: colors.destructive }
 *   - bg-card → { backgroundColor: colors.card }
 *   - [&>svg]:text-current → Icon color: colors.destructive
 *   - description: colors.destructive with 90% opacity
 */
const alertVariants = cva(
  // RN: Base styles - convert to base style object
  // RN: w-full → width: '100%'
  // RN: rounded-lg → borderRadius: 8
  // RN: border → borderWidth: 1, borderColor: colors.border
  // RN: px-4 py-3 → paddingHorizontal: 16, paddingVertical: 12
  // RN: grid → flexDirection: 'row' (for icon + content)
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        // RN: Map to style objects
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * RN: Alert Component
 * 
 * CONVERSION NOTES:
 * - Replace div with View
 * - role="alert" → accessibilityRole="alert"
 * - className → style prop
 * - Children should include icon, title, description
 * 
 * LAYOUT PATTERN:
 * <View style={styles.alert}>
 *   {icon && <View style={styles.iconContainer}>{icon}</View>}
 *   <View style={styles.content}>
 *     {title && <Text style={styles.title}>{title}</Text>}
 *     {description && <Text style={styles.description}>{description}</Text>}
 *   </View>
 *   {dismissible && (
 *     <Pressable onPress={onDismiss} style={styles.dismissButton}>
 *       <X size={16} color={iconColor} />
 *     </Pressable>
 *   )}
 * </View>
 * 
 * ACCESSIBILITY:
 * - accessibilityRole: 'alert'
 * - accessibilityLiveRegion: 'polite' (announces to screen readers)
 * - accessibilityLabel: Brief description of alert
 */
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      // RN: Replace with View
      // RN: <View
      // RN:   style={[styles.alert, getVariantStyle(variant)]}
      // RN:   accessibilityRole="alert"
      // RN:   accessibilityLiveRegion="polite"
      // RN: >
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * RN: AlertTitle Component
 * 
 * CONVERSION NOTES:
 * - Replace div with Text component
 * - Remove grid positioning (use flexbox in parent)
 * - Typography from design system
 * 
 * TAILWIND CLASS CONVERSION:
 * - col-start-2 → Not needed (flex layout)
 * - line-clamp-1 → numberOfLines={1}
 * - min-h-4 → { minHeight: 16 }
 * - font-medium → { fontWeight: '500' }
 * - tracking-tight → { letterSpacing: -0.5 }
 */
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      // RN: Replace with Text
      // RN: <Text
      // RN:   style={styles.alertTitle}
      // RN:   numberOfLines={1}
      // RN: >
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

/**
 * RN: AlertDescription Component
 * 
 * CONVERSION NOTES:
 * - Replace div with Text component
 * - Remove grid positioning
 * - Support multiple paragraphs if needed
 * 
 * TAILWIND CLASS CONVERSION:
 * - text-muted-foreground → { color: colors.mutedForeground }
 * - col-start-2 → Not needed
 * - grid → Not needed (just Text)
 * - justify-items-start → Not applicable
 * - gap-1 → { marginBottom: 4 } between paragraphs
 * - text-sm → { fontSize: 14 }
 * - [&_p]:leading-relaxed → { lineHeight: 20 }
 */
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      // RN: Replace with Text
      // RN: <Text style={styles.alertDescription}>
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
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
 * import React, { useState } from 'react';
 * import { View, Text, Pressable, StyleSheet } from 'react-native';
 * import { AlertTriangle, Info, CheckCircle, X } from 'lucide-react-native';
 * import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
 * 
 * type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';
 * 
 * interface AlertProps {
 *   variant?: AlertVariant;
 *   title: string;
 *   description?: string;
 *   icon?: React.ReactNode;
 *   dismissible?: boolean;
 *   onDismiss?: () => void;
 *   style?: any;
 * }
 * 
 * export const Alert: React.FC<AlertProps> = ({
 *   variant = 'default',
 *   title,
 *   description,
 *   icon,
 *   dismissible = false,
 *   onDismiss,
 *   style,
 * }) => {
 *   const [visible, setVisible] = useState(true);
 *   
 *   const getVariantStyle = () => {
 *     const variants = {
 *       default: {
 *         container: { backgroundColor: colors.card, borderColor: colors.border },
 *         text: { color: colors.cardForeground },
 *       },
 *       destructive: {
 *         container: { backgroundColor: colors.card, borderColor: colors.destructive },
 *         text: { color: colors.destructive },
 *       },
 *       success: {
 *         container: { backgroundColor: colors.card, borderColor: colors.success },
 *         text: { color: colors.success },
 *       },
 *       warning: {
 *         container: { backgroundColor: colors.card, borderColor: colors.warning },
 *         text: { color: colors.warning },
 *       },
 *       info: {
 *         container: { backgroundColor: colors.card, borderColor: colors.info },
 *         text: { color: colors.info },
 *       },
 *     };
 *     return variants[variant];
 *   };
 *   
 *   const getDefaultIcon = () => {
 *     const icons = {
 *       default: <Info size={16} color={colors.cardForeground} />,
 *       destructive: <AlertTriangle size={16} color={colors.destructive} />,
 *       success: <CheckCircle size={16} color={colors.success} />,
 *       warning: <AlertTriangle size={16} color={colors.warning} />,
 *       info: <Info size={16} color={colors.info} />,
 *     };
 *     return icons[variant];
 *   };
 *   
 *   const handleDismiss = () => {
 *     setVisible(false);
 *     onDismiss?.();
 *   };
 *   
 *   if (!visible) return null;
 *   
 *   const variantStyle = getVariantStyle();
 *   const displayIcon = icon || getDefaultIcon();
 *   
 *   return (
 *     <Animated.View
 *       entering={FadeInDown}
 *       exiting={FadeOutUp}
 *       style={[styles.alert, variantStyle.container, style]}
 *       accessibilityRole="alert"
 *       accessibilityLiveRegion="polite"
 *     >
 *       {displayIcon && (
 *         <View style={styles.iconContainer}>{displayIcon}</View>
 *       )}
 *       <View style={styles.content}>
 *         <Text style={[styles.title, variantStyle.text]} numberOfLines={2}>
 *           {title}
 *         </Text>
 *         {description && (
 *           <Text style={[styles.description, { color: variantStyle.text.color, opacity: 0.9 }]}>
 *             {description}
 *           </Text>
 *         )}
 *       </View>
 *       {dismissible && (
 *         <Pressable
 *           onPress={handleDismiss}
 *           style={styles.dismissButton}
 *           hitSlop={8}
 *           accessibilityLabel="Dismiss alert"
 *           accessibilityRole="button"
 *         >
 *           <X size={16} color={variantStyle.text.color} />
 *         </Pressable>
 *       )}
 *     </Animated.View>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   alert: {
 *     width: '100%',
 *     flexDirection: 'row',
 *     alignItems: 'flex-start',
 *     borderRadius: 8,
 *     borderWidth: 1,
 *     paddingHorizontal: 16,
 *     paddingVertical: 12,
 *     gap: 12,
 *   },
 *   iconContainer: {
 *     marginTop: 2,
 *     flexShrink: 0,
 *   },
 *   content: {
 *     flex: 1,
 *     gap: 4,
 *   },
 *   title: {
 *     fontSize: 14,
 *     fontWeight: '500',
 *     letterSpacing: -0.5,
 *   },
 *   description: {
 *     fontSize: 14,
 *     lineHeight: 20,
 *   },
 *   dismissButton: {
 *     marginTop: 2,
 *     flexShrink: 0,
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * // Default alert
 * <Alert
 *   title="Update Available"
 *   description="A new version is ready to install"
 * />
 * 
 * // Destructive alert
 * <Alert
 *   variant="destructive"
 *   title="Error"
 *   description="Failed to save changes. Please try again."
 * />
 * 
 * // Success alert
 * <Alert
 *   variant="success"
 *   title="Success"
 *   description="Your property has been added"
 * />
 * 
 * // Warning alert
 * <Alert
 *   variant="warning"
 *   title="Warning"
 *   description="Inspection due in 3 days"
 * />
 * 
 * // Dismissible alert
 * <Alert
 *   variant="info"
 *   title="Tip"
 *   description="Enable notifications for important updates"
 *   dismissible
 *   onDismiss={() => console.log('Alert dismissed')}
 * />
 * 
 * // Custom icon
 * import { Flame } from 'lucide-react-native';
 * 
 * <Alert
 *   variant="warning"
 *   title="Fire Risk Alert"
 *   description="High fire danger in your area today"
 *   icon={<Flame size={16} color={colors.warning} />}
 * />
 * 
 * // ALERT LIST:
 * const AlertsList = ({ alerts }) => (
 *   <ScrollView style={styles.alertsList}>
 *     {alerts.map((alert) => (
 *       <Alert
 *         key={alert.id}
 *         variant={alert.variant}
 *         title={alert.title}
 *         description={alert.description}
 *         dismissible
 *         onDismiss={() => handleDismissAlert(alert.id)}
 *         style={styles.alertItem}
 *       />
 *     ))}
 *   </ScrollView>
 * );
 * 
 * // TOAST NOTIFICATIONS (Alternative for transient alerts):
 * import Toast from 'react-native-toast-message';
 * 
 * // Show success toast
 * Toast.show({
 *   type: 'success',
 *   text1: 'Success',
 *   text2: 'Property saved successfully',
 *   visibilityTime: 3000,
 *   autoHide: true,
 * });
 * 
 * // Show error toast
 * Toast.show({
 *   type: 'error',
 *   text1: 'Error',
 *   text2: 'Failed to save property',
 * });
 * 
 * // NATIVE ALERT DIALOG (for important system alerts):
 * import { Alert as RNAlert } from 'react-native';
 * 
 * RNAlert.alert(
 *   'Delete Property',
 *   'Are you sure you want to delete this property? This action cannot be undone.',
 *   [
 *     { text: 'Cancel', style: 'cancel' },
 *     { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
 *   ]
 * );
 * 
 * // INLINE ALERT IN FORM:
 * <View style={styles.form}>
 *   {error && (
 *     <Alert
 *       variant="destructive"
 *       title="Validation Error"
 *       description={error.message}
 *       dismissible
 *       onDismiss={() => setError(null)}
 *       style={styles.formAlert}
 *     />
 *   )}
 *   <Input label="Property Address" />
 *   <Button onPress={handleSubmit}>Submit</Button>
 * </View>
 */

export { Alert, AlertTitle, AlertDescription };
