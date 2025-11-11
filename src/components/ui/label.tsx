/**
 * REACT NATIVE CONVERSION - Label Component
 * 
 * COMPLEXITY: LOW
 * CONVERSION APPROACH: Replace with Text component
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-label → Text component with proper styling
 * 
 * KEY CONVERSION NOTES:
 * 1. HTML label element → Text component
 * 2. No "htmlFor" in React Native - use View grouping instead
 * 3. No automatic input association - manage focus manually
 * 4. accessibilityLabel on input instead of separate label element
 * 
 * REACT NATIVE IMPLEMENTATION:
 * ```tsx
 * import { Text, TextProps } from 'react-native';
 * 
 * interface LabelProps extends TextProps {
 *   children: React.ReactNode;
 *   required?: boolean;
 * }
 * 
 * export function Label({ children, required, style, ...props }: LabelProps) {
 *   return (
 *     <Text
 *       style={[
 *         {
 *           color: 'rgba(255, 255, 255, 0.9)',
 *           fontSize: 14,
 *           fontWeight: '500',
 *           marginBottom: 6,
 *         },
 *         style,
 *       ]}
 *       accessibilityRole="text"
 *       {...props}
 *     >
 *       {children}
 *       {required && (
 *         <Text style={{ color: '#EF4444' }}> *</Text>
 *       )}
 *     </Text>
 *   );
 * }
 * ```
 * 
 * FORM FIELD GROUPING:
 * ```tsx
 * // WEB: Uses htmlFor to associate label with input
 * <label htmlFor="email">Email</label>
 * <input id="email" />
 * 
 * // REACT NATIVE: Group in View, use accessibilityLabel
 * <View>
 *   <Label>Email</Label>
 *   <TextInput
 *     accessibilityLabel="Email"
 *     placeholder="Enter email"
 *   />
 * </View>
 * ```
 * 
 * REQUIRED INDICATOR:
 * ```tsx
 * export function RequiredLabel({ children }: { children: string }) {
 *   return (
 *     <Text style={styles.label}>
 *       {children}
 *       <Text style={{ color: '#EF4444' }}> *</Text>
 *     </Text>
 *   );
 * }
 * ```
 * 
 * ERROR STATE:
 * ```tsx
 * export function LabelWithError({
 *   children,
 *   error,
 * }: {
 *   children: string;
 *   error?: string;
 * }) {
 *   return (
 *     <View>
 *       <Text style={[styles.label, error && styles.labelError]}>
 *         {children}
 *       </Text>
 *       {error && (
 *         <Text style={styles.errorText}>{error}</Text>
 *       )}
 *     </View>
 *   );
 * }
 * 
 * const styles = {
 *   label: {
 *     color: 'rgba(255, 255, 255, 0.9)',
 *     fontSize: 14,
 *     fontWeight: '500',
 *     marginBottom: 6,
 *   },
 *   labelError: {
 *     color: '#EF4444',
 *   },
 *   errorText: {
 *     color: '#EF4444',
 *     fontSize: 12,
 *     marginTop: 4,
 *   },
 * };
 * ```
 * 
 * POLICYANGEL-SPECIFIC STYLING:
 * ```tsx
 * const styles = StyleSheet.create({
 *   label: {
 *     color: 'rgba(255, 255, 255, 0.9)',
 *     fontSize: 14,
 *     fontWeight: '500',
 *     marginBottom: 6,
 *     letterSpacing: 0.3,
 *   },
 *   labelRequired: {
 *     // Required fields
 *   },
 *   labelOptional: {
 *     color: 'rgba(255, 255, 255, 0.6)',
 *     fontSize: 12,
 *     fontWeight: '400',
 *   },
 *   labelWithIcon: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: 6,
 *   },
 * });
 * ```
 * 
 * WITH HELPER TEXT:
 * ```tsx
 * export function FormLabel({
 *   label,
 *   helperText,
 *   required,
 * }: {
 *   label: string;
 *   helperText?: string;
 *   required?: boolean;
 * }) {
 *   return (
 *     <View style={{ marginBottom: 6 }}>
 *       <Text style={styles.label}>
 *         {label}
 *         {required && <Text style={{ color: '#EF4444' }}> *</Text>}
 *       </Text>
 *       {helperText && (
 *         <Text style={styles.helperText}>{helperText}</Text>
 *       )}
 *     </View>
 *   );
 * }
 * 
 * const styles = {
 *   helperText: {
 *     color: 'rgba(255, 255, 255, 0.5)',
 *     fontSize: 12,
 *     marginTop: 2,
 *   },
 * };
 * ```
 * 
 * ACCESSIBILITY:
 * - Use accessibilityLabel on input, not separate label
 * - Group label + input in View for screen readers
 * - Required fields: Include "required" in accessibilityHint
 * - Error state: Use accessibilityLiveRegion="polite"
 * 
 * STYLING NOTES:
 * - Font size: 14pt (readable but compact)
 * - Font weight: 500 (medium)
 * - Color: rgba(255, 255, 255, 0.9) for high contrast
 * - Margin bottom: 6-8pt spacing before input
 * - Required indicator: Red asterisk with color #EF4444
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - Form fields: Property name, Address, Price, etc.
 * - Filters: Date range, Status, Property type
 * - Settings: Notification preferences, Privacy settings
 * - Profile: Name, Email, Phone, Bio
 * - Search: Search criteria labels
 * 
 * INTEGRATION WITH REACT HOOK FORM:
 * ```tsx
 * import { Controller } from 'react-hook-form';
 * 
 * <Controller
 *   name="email"
 *   control={control}
 *   render={({ field, fieldState }) => (
 *     <View>
 *       <Label>Email</Label>
 *       <TextInput
 *         value={field.value}
 *         onChangeText={field.onChange}
 *         accessibilityLabel="Email"
 *       />
 *       {fieldState.error && (
 *         <Text style={styles.error}>{fieldState.error.message}</Text>
 *       )}
 *     </View>
 *   )}
 * />
 * ```
 */

"use client";

import * as React from "react";
// WEB: Radix UI for accessible label with htmlFor association
// REACT NATIVE: Text component (no htmlFor in React Native)
import * as LabelPrimitive from "@radix-ui/react-label@2.1.2";

import { cn } from "./utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  // WEB: Label element with htmlFor attribute for input association
  // REACT NATIVE: Text component with styling:
  // <Text
  //   style={{
  //     color: 'rgba(255, 255, 255, 0.9)',
  //     fontSize: 14,
  //     fontWeight: '500',
  //     marginBottom: 6,
  //     letterSpacing: 0.3,
  //   }}
  //   accessibilityRole="text"
  // >
  //   {children}
  // </Text>
  // 
  // Note: In React Native, use accessibilityLabel on the input itself
  // rather than a separate label element. The label is just for visual display.
  // 
  // For form association, group in a View:
  // <View>
  //   <Label>Email</Label>
  //   <TextInput accessibilityLabel="Email" />
  // </View>
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      // REACT NATIVE: Replace peer and group selectors with explicit props:
      // disabled prop → opacity: 0.5
      // Remove select-none (not applicable)
      // Remove cursor styles (touch-based)
      {...props}
    />
  );
}

export { Label };
