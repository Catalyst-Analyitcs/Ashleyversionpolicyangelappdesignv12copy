/**
 * ==============================================================================
 * INPUT.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * ✅ KEEP AS-IS (95% of styles): All Tailwind utility classes work!
 * ❌ CONVERT ONLY: input → TextInput
 * 
 * ```tsx
 * import { TextInput } from 'react-native';
 * 
 * <TextInput
 *   value={value}
 *   onChangeText={onChange}
 *   placeholder="Enter text"
 *   placeholderTextColor="#ffffff60"
 *   className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white"
 *   keyboardType="default"
 *   autoCapitalize="sentences"
 * />
 * 
 * // Email input
 * <TextInput keyboardType="email-address" autoCapitalize="none" />
 * 
 * // Password input
 * <TextInput secureTextEntry autoCapitalize="none" />
 * ```
 * 
 * ==============================================================================
 * LEGACY ANNOTATIONS
 * ==============================================================================
 * 
 * COMPLEXITY: LOW-MEDIUM
 * Input fields map directly to React Native's TextInput component.
 * 
 * CONVERSION STRATEGY:
 * 1. Replace HTML input with TextInput from react-native
 * 2. Map input type props to TextInput props
 * 3. Convert CSS classes to StyleSheet styles
 * 4. Handle focus/blur states with onFocus/onBlur
 * 5. Implement validation states with conditional styling
 * 
 * KEY DIFFERENCES:
 * - TextInput vs <input>
 * - No file input (use react-native-document-picker)
 * - Different keyboard types (numeric, email, etc.)
 * - autoCapitalize, autoCorrect, autoComplete props
 * - No :focus-visible (use onFocus/onBlur with state)
 * 
 * INPUT TYPE MAPPING:
 * - type="text" → TextInput default
 * - type="email" → keyboardType="email-address", autoCapitalize="none"
 * - type="password" → secureTextEntry={true}
 * - type="number" → keyboardType="numeric" or "number-pad"
 * - type="tel" → keyboardType="phone-pad"
 * - type="url" → keyboardType="url", autoCapitalize="none"
 * - type="search" → returnKeyType="search"
 * - type="file" → Use document picker library
 * 
 * EXAMPLE CONVERSION:
 * 
 * Web:
 * <Input 
 *   type="email" 
 *   placeholder="Enter email"
 *   disabled={false}
 * />
 * 
 * React Native:
 * <TextInput
 *   keyboardType="email-address"
 *   autoCapitalize="none"
 *   autoCorrect={false}
 *   placeholder="Enter email"
 *   placeholderTextColor={colors.mutedForeground}
 *   editable={true}
 *   style={styles.input}
 * />
 */

import * as React from "react";

import { cn } from "./utils";

/**
 * RN: Input Component - Text input field
 * 
 * CONVERSION NOTES:
 * - Replace <input> with TextInput
 * - type prop determines TextInput configuration
 * - className becomes style prop with StyleSheet
 * - placeholder styling uses placeholderTextColor prop
 * - Focus states managed with onFocus/onBlur callbacks
 * - Selection color uses selectionColor prop
 * 
 * PROPS MAPPING:
 * - type → determines keyboardType, secureTextEntry
 * - placeholder → placeholder (same)
 * - disabled → editable={!disabled}
 * - value → value (same, controlled)
 * - defaultValue → defaultValue (uncontrolled)
 * - onChange → onChangeText={(text) => ...}
 * - onBlur → onBlur (same signature)
 * - onFocus → onFocus (same signature)
 * - className → style prop
 * - aria-invalid → custom validation state
 * 
 * TAILWIND CLASS CONVERSION:
 * - flex → Not needed (default in RN)
 * - h-9 → { height: 36 }
 * - w-full → { width: '100%' }
 * - min-w-0 → { minWidth: 0 }
 * - rounded-md → { borderRadius: 6 }
 * - border → { borderWidth: 1 }
 * - border-input → { borderColor: colors.input }
 * - px-3 → { paddingHorizontal: 12 }
 * - py-1 → { paddingVertical: 4 }
 * - text-base → { fontSize: 16 }
 * - md:text-sm → Platform-specific or responsive fontSize
 * - bg-input-background → { backgroundColor: colors.inputBackground }
 * - dark:bg-input/30 → Dark mode color variant
 * - outline-none → Not applicable (RN doesn't have outline)
 * - transition → Use Animated API for color transitions
 * - disabled:opacity-50 → editable={false} with opacity: 0.5
 * - disabled:cursor-not-allowed → Not applicable (mobile)
 * 
 * PLACEHOLDER STYLING:
 * Web: placeholder:text-muted-foreground
 * RN: placeholderTextColor={colors.mutedForeground}
 * 
 * SELECTION STYLING:
 * Web: selection:bg-primary selection:text-primary-foreground
 * RN: selectionColor={colors.primary}
 * Note: RN doesn't support custom text color for selection
 * 
 * FOCUS STATES:
 * Web: focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
 * RN: Requires state management
 * const [isFocused, setIsFocused] = useState(false);
 * 
 * style={[
 *   styles.input,
 *   isFocused && styles.inputFocused
 * ]}
 * onFocus={() => setIsFocused(true)}
 * onBlur={() => setIsFocused(false)}
 * 
 * Note: RN doesn't support ring/shadow on focus like web
 * Use borderColor/borderWidth changes or subtle shadow
 * 
 * VALIDATION STATES:
 * Web: aria-invalid:border-destructive aria-invalid:ring-destructive/20
 * RN: Pass isInvalid prop or use form validation library
 * 
 * const getInputStyle = (isInvalid: boolean, isFocused: boolean) => [
 *   styles.input,
 *   isFocused && styles.inputFocused,
 *   isInvalid && styles.inputInvalid,
 * ];
 * 
 * FILE INPUT HANDLING:
 * Web: file:text-foreground file:border-0 file:bg-transparent
 * RN: Not applicable - use separate document picker
 * 
 * import * as DocumentPicker from 'expo-document-picker';
 * 
 * const pickDocument = async () => {
 *   const result = await DocumentPicker.getDocumentAsync({
 *     type: '*\/*',
 *   });
 *   if (result.type === 'success') {
 *     console.log(result.uri, result.name, result.size);
 *   }
 * };
 * 
 * <Pressable onPress={pickDocument} style={styles.filePicker}>
 *   <Text>Choose File</Text>
 * </Pressable>
 * 
 * KEYBOARD CONFIGURATION BY TYPE:
 * - email: { keyboardType: 'email-address', autoCapitalize: 'none' }
 * - password: { secureTextEntry: true }
 * - number: { keyboardType: 'numeric' }
 * - tel: { keyboardType: 'phone-pad' }
 * - url: { keyboardType: 'url', autoCapitalize: 'none' }
 * - search: { returnKeyType: 'search' }
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      // RN: Replace with TextInput
      // RN: type → keyboardType mapping (see above)
      // RN: placeholder → placeholder (same)
      // RN: placeholderTextColor → separate prop
      // RN: selectionColor → colors.primary
      // RN: editable → !disabled
      // RN: Remove className, use style prop
      // RN: h-9 → height: 36
      // RN: rounded-md → borderRadius: 6
      // RN: border → borderWidth: 1
      // RN: px-3 → paddingHorizontal: 12
      // RN: text-base → fontSize: 16
      // RN: focus-visible states → onFocus/onBlur with state
      // RN: aria-invalid → custom validation styling
      // RN: file input → Use DocumentPicker library
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
 * import { TextInput, StyleSheet, Platform } from 'react-native';
 * 
 * interface InputProps {
 *   type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
 *   placeholder?: string;
 *   value?: string;
 *   defaultValue?: string;
 *   onChangeText?: (text: string) => void;
 *   onBlur?: () => void;
 *   onFocus?: () => void;
 *   disabled?: boolean;
 *   isInvalid?: boolean;
 *   style?: any;
 *   multiline?: boolean;
 *   numberOfLines?: number;
 *   maxLength?: number;
 *   autoFocus?: boolean;
 * }
 * 
 * export const Input: React.FC<InputProps> = ({
 *   type = 'text',
 *   placeholder,
 *   value,
 *   defaultValue,
 *   onChangeText,
 *   onBlur: onBlurProp,
 *   onFocus: onFocusProp,
 *   disabled = false,
 *   isInvalid = false,
 *   style,
 *   multiline = false,
 *   numberOfLines = 1,
 *   maxLength,
 *   autoFocus = false,
 * }) => {
 *   const [isFocused, setIsFocused] = useState(false);
 *   
 *   // Map input type to TextInput props
 *   const getKeyboardProps = () => {
 *     switch (type) {
 *       case 'email':
 *         return {
 *           keyboardType: 'email-address' as const,
 *           autoCapitalize: 'none' as const,
 *           autoCorrect: false,
 *         };
 *       case 'password':
 *         return {
 *           secureTextEntry: true,
 *           autoCapitalize: 'none' as const,
 *           autoCorrect: false,
 *         };
 *       case 'number':
 *         return {
 *           keyboardType: 'numeric' as const,
 *         };
 *       case 'tel':
 *         return {
 *           keyboardType: 'phone-pad' as const,
 *         };
 *       case 'url':
 *         return {
 *           keyboardType: 'url' as const,
 *           autoCapitalize: 'none' as const,
 *           autoCorrect: false,
 *         };
 *       case 'search':
 *         return {
 *           returnKeyType: 'search' as const,
 *         };
 *       default:
 *         return {};
 *     }
 *   };
 *   
 *   const handleFocus = () => {
 *     setIsFocused(true);
 *     onFocusProp?.();
 *   };
 *   
 *   const handleBlur = () => {
 *     setIsFocused(false);
 *     onBlurProp?.();
 *   };
 *   
 *   return (
 *     <TextInput
 *       {...getKeyboardProps()}
 *       placeholder={placeholder}
 *       placeholderTextColor={colors.mutedForeground}
 *       value={value}
 *       defaultValue={defaultValue}
 *       onChangeText={onChangeText}
 *       onFocus={handleFocus}
 *       onBlur={handleBlur}
 *       editable={!disabled}
 *       selectionColor={colors.primary}
 *       multiline={multiline}
 *       numberOfLines={numberOfLines}
 *       maxLength={maxLength}
 *       autoFocus={autoFocus}
 *       style={[
 *         styles.input,
 *         isFocused && styles.inputFocused,
 *         isInvalid && styles.inputInvalid,
 *         disabled && styles.inputDisabled,
 *         style,
 *       ]}
 *     />
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   input: {
 *     height: 36,
 *     width: '100%',
 *     borderRadius: 6,
 *     borderWidth: 1,
 *     borderColor: colors.input,
 *     backgroundColor: colors.inputBackground,
 *     paddingHorizontal: 12,
 *     paddingVertical: 4,
 *     fontSize: Platform.select({ ios: 16, android: 16, default: 14 }),
 *     color: colors.foreground,
 *   },
 *   inputFocused: {
 *     borderColor: colors.ring,
 *     borderWidth: 2, // Simulate ring effect
 *     // Optional: add subtle shadow for focus state
 *     shadowColor: colors.ring,
 *     shadowOffset: { width: 0, height: 0 },
 *     shadowOpacity: 0.2,
 *     shadowRadius: 3,
 *     elevation: 3,
 *   },
 *   inputInvalid: {
 *     borderColor: colors.destructive,
 *     // Optional: add error shadow
 *     shadowColor: colors.destructive,
 *     shadowOffset: { width: 0, height: 0 },
 *     shadowOpacity: 0.1,
 *     shadowRadius: 3,
 *     elevation: 2,
 *   },
 *   inputDisabled: {
 *     opacity: 0.5,
 *     backgroundColor: colors.muted,
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic text input
 * <Input 
 *   placeholder="Enter your name"
 *   onChangeText={(text) => console.log(text)}
 * />
 * 
 * // Email input
 * <Input 
 *   type="email"
 *   placeholder="email@example.com"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 * 
 * // Password input
 * <Input 
 *   type="password"
 *   placeholder="Enter password"
 *   value={password}
 *   onChangeText={setPassword}
 * />
 * 
 * // Number input
 * <Input 
 *   type="number"
 *   placeholder="Enter amount"
 *   onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
 * />
 * 
 * // Invalid/Error state
 * <Input 
 *   type="email"
 *   placeholder="email@example.com"
 *   value={email}
 *   onChangeText={setEmail}
 *   isInvalid={!isValidEmail(email)}
 * />
 * 
 * // Disabled input
 * <Input 
 *   placeholder="Disabled input"
 *   disabled={true}
 *   value="Read only"
 * />
 * 
 * // WITH FORM VALIDATION (using react-hook-form):
 * import { Controller } from 'react-hook-form@7.55.0';
 * 
 * <Controller
 *   control={control}
 *   name="email"
 *   rules={{
 *     required: 'Email is required',
 *     pattern: {
 *       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
 *       message: 'Invalid email address',
 *     },
 *   }}
 *   render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
 *     <>
 *       <Input
 *         type="email"
 *         placeholder="Email"
 *         value={value}
 *         onChangeText={onChange}
 *         onBlur={onBlur}
 *         isInvalid={!!error}
 *       />
 *       {error && <Text style={styles.errorText}>{error.message}</Text>}
 *     </>
 *   )}
 * />
 * 
 * // INPUT WITH ICON:
 * import { Mail } from 'lucide-react-native';
 * 
 * <View style={styles.inputContainer}>
 *   <Mail size={20} color={colors.mutedForeground} style={styles.inputIcon} />
 *   <Input
 *     type="email"
 *     placeholder="Email"
 *     style={styles.inputWithIcon}
 *   />
 * </View>
 * 
 * const styles = StyleSheet.create({
 *   inputContainer: {
 *     position: 'relative',
 *     width: '100%',
 *   },
 *   inputIcon: {
 *     position: 'absolute',
 *     left: 12,
 *     top: 8,
 *     zIndex: 1,
 *   },
 *   inputWithIcon: {
 *     paddingLeft: 44, // Space for icon
 *   },
 * });
 * 
 * // AUTO-RESIZE MULTILINE INPUT:
 * const [inputHeight, setInputHeight] = useState(36);
 * 
 * <TextInput
 *   multiline
 *   onContentSizeChange={(event) => {
 *     setInputHeight(Math.max(36, event.nativeEvent.contentSize.height));
 *   }}
 *   style={[styles.input, { height: inputHeight }]}
 * />
 */

export { Input };
