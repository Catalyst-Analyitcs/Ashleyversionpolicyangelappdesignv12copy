/**
 * REACT NATIVE CONVERSION - TEXTAREA COMPONENT
 * =============================================
 * 
 * COMPLEXITY: LOW
 * Textarea maps to React Native TextInput with multiline prop.
 * 
 * CONVERSION STRATEGY:
 * 1. Replace HTML textarea with TextInput multiline
 * 2. Convert CSS classes to StyleSheet styles
 * 3. Handle auto-resize with onContentSizeChange
 * 4. Implement focus/blur states
 * 5. Support validation states
 * 
 * KEY DIFFERENCES:
 * - TextInput with multiline={true}
 * - Auto-resize using onContentSizeChange
 * - No CSS resize property (handled programmatically)
 * - Different scroll behavior
 * - numberOfLines for minimum height
 * 
 * EXAMPLE CONVERSION:
 * 
 * Web:
 * <Textarea 
 *   placeholder="Enter description"
 *   rows={4}
 *   maxLength={500}
 * />
 * 
 * React Native:
 * <TextInput
 *   multiline={true}
 *   numberOfLines={4}
 *   placeholder="Enter description"
 *   placeholderTextColor={colors.mutedForeground}
 *   maxLength={500}
 *   textAlignVertical="top"
 *   style={styles.textarea}
 * />
 */

import * as React from "react";

import { cn } from "./utils";

/**
 * RN: Textarea Component - Multi-line text input
 * 
 * CONVERSION NOTES:
 * - Replace <textarea> with TextInput multiline={true}
 * - className becomes style prop with StyleSheet
 * - Auto-resize handled with onContentSizeChange
 * - Focus states managed with onFocus/onBlur
 * - Placeholder styling uses placeholderTextColor
 * 
 * PROPS MAPPING:
 * - rows → numberOfLines (approximate minimum)
 * - placeholder → placeholder (same)
 * - disabled → editable={!disabled}
 * - value → value (controlled)
 * - defaultValue → defaultValue (uncontrolled)
 * - onChange → onChangeText={(text) => ...}
 * - onBlur → onBlur (same)
 * - onFocus → onFocus (same)
 * - maxLength → maxLength (same)
 * - className → style prop
 * - aria-invalid → custom validation state
 * 
 * TAILWIND CLASS CONVERSION:
 * - resize-none → Not needed (RN doesn't support resize handles)
 * - border-input → { borderColor: colors.input }
 * - min-h-16 → { minHeight: 64 }
 * - w-full → { width: '100%' }
 * - rounded-md → { borderRadius: 6 }
 * - border → { borderWidth: 1 }
 * - bg-input-background → { backgroundColor: colors.inputBackground }
 * - dark:bg-input/30 → Dark mode color variant
 * - px-3 → { paddingHorizontal: 12 }
 * - py-2 → { paddingVertical: 8 }
 * - text-base → { fontSize: 16 }
 * - md:text-sm → Platform or responsive fontSize
 * - outline-none → Not applicable
 * - transition → Use Animated API for color transitions
 * - disabled:opacity-50 → editable={false} with opacity: 0.5
 * - field-sizing-content → Auto-resize with onContentSizeChange
 * 
 * PLACEHOLDER STYLING:
 * Web: placeholder:text-muted-foreground
 * RN: placeholderTextColor={colors.mutedForeground}
 * 
 * FOCUS STATES:
 * Web: focus-visible:border-ring focus-visible:ring-ring/50
 * RN: State-based styling
 * const [isFocused, setIsFocused] = useState(false);
 * 
 * style={[
 *   styles.textarea,
 *   isFocused && styles.textareaFocused
 * ]}
 * onFocus={() => setIsFocused(true)}
 * onBlur={() => setIsFocused(false)}
 * 
 * VALIDATION STATES:
 * Web: aria-invalid:border-destructive aria-invalid:ring-destructive/20
 * RN: Custom isInvalid prop with conditional styling
 * 
 * AUTO-RESIZE IMPLEMENTATION:
 * Web: field-sizing-content (CSS property)
 * RN: Use onContentSizeChange event
 * 
 * const [height, setHeight] = useState(64);
 * 
 * <TextInput
 *   multiline
 *   onContentSizeChange={(e) => {
 *     setHeight(Math.max(64, e.nativeEvent.contentSize.height));
 *   }}
 *   style={[styles.textarea, { height }]}
 * />
 * 
 * TEXT ALIGNMENT:
 * Important: Add textAlignVertical="top" to align text at top
 * By default, multiline TextInput centers text vertically on Android
 * 
 * SCROLL BEHAVIOR:
 * For long content, TextInput with multiline scrolls automatically
 * No need for ScrollView wrapper in most cases
 * Use scrollEnabled prop to control scrolling
 * 
 * CHARACTER COUNTER:
 * const [text, setText] = useState('');
 * const maxLength = 500;
 * 
 * <View>
 *   <TextInput
 *     multiline
 *     value={text}
 *     onChangeText={setText}
 *     maxLength={maxLength}
 *     style={styles.textarea}
 *   />
 *   <Text style={styles.counter}>
 *     {text.length}/{maxLength}
 *   </Text>
 * </View>
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      // RN: Replace with TextInput multiline={true}
      // RN: multiline → true
      // RN: numberOfLines → minimum visible lines
      // RN: textAlignVertical → "top" (important for Android)
      // RN: placeholder → placeholder (same)
      // RN: placeholderTextColor → separate prop
      // RN: editable → !disabled
      // RN: Remove className, use style prop
      // RN: resize-none → Not applicable (no resize handles on mobile)
      // RN: min-h-16 → minHeight: 64
      // RN: rounded-md → borderRadius: 6
      // RN: border → borderWidth: 1
      // RN: px-3 → paddingHorizontal: 12
      // RN: py-2 → paddingVertical: 8
      // RN: text-base → fontSize: 16
      // RN: field-sizing-content → onContentSizeChange for auto-resize
      // RN: focus-visible states → onFocus/onBlur with state
      // RN: aria-invalid → custom validation styling
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
 * import { TextInput, View, Text, StyleSheet, Platform } from 'react-native';
 * 
 * interface TextareaProps {
 *   placeholder?: string;
 *   value?: string;
 *   defaultValue?: string;
 *   onChangeText?: (text: string) => void;
 *   onBlur?: () => void;
 *   onFocus?: () => void;
 *   disabled?: boolean;
 *   isInvalid?: boolean;
 *   maxLength?: number;
 *   minHeight?: number;
 *   maxHeight?: number;
 *   autoResize?: boolean;
 *   showCounter?: boolean;
 *   numberOfLines?: number;
 *   style?: any;
 *   autoFocus?: boolean;
 * }
 * 
 * export const Textarea: React.FC<TextareaProps> = ({
 *   placeholder,
 *   value,
 *   defaultValue,
 *   onChangeText,
 *   onBlur: onBlurProp,
 *   onFocus: onFocusProp,
 *   disabled = false,
 *   isInvalid = false,
 *   maxLength,
 *   minHeight = 64,
 *   maxHeight = 200,
 *   autoResize = true,
 *   showCounter = false,
 *   numberOfLines = 4,
 *   style,
 *   autoFocus = false,
 * }) => {
 *   const [isFocused, setIsFocused] = useState(false);
 *   const [height, setHeight] = useState(minHeight);
 *   const [text, setText] = useState(defaultValue || '');
 *   
 *   const currentValue = value ?? text;
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
 *   const handleChangeText = (newText: string) => {
 *     if (!value) setText(newText);
 *     onChangeText?.(newText);
 *   };
 *   
 *   const handleContentSizeChange = (event: any) => {
 *     if (autoResize) {
 *       const newHeight = event.nativeEvent.contentSize.height;
 *       setHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
 *     }
 *   };
 *   
 *   return (
 *     <View style={styles.container}>
 *       <TextInput
 *         multiline={true}
 *         numberOfLines={numberOfLines}
 *         placeholder={placeholder}
 *         placeholderTextColor={colors.mutedForeground}
 *         value={currentValue}
 *         onChangeText={handleChangeText}
 *         onFocus={handleFocus}
 *         onBlur={handleBlur}
 *         onContentSizeChange={handleContentSizeChange}
 *         editable={!disabled}
 *         maxLength={maxLength}
 *         autoFocus={autoFocus}
 *         textAlignVertical="top"
 *         selectionColor={colors.primary}
 *         style={[
 *           styles.textarea,
 *           autoResize && { height },
 *           !autoResize && { height: minHeight },
 *           isFocused && styles.textareaFocused,
 *           isInvalid && styles.textareaInvalid,
 *           disabled && styles.textareaDisabled,
 *           style,
 *         ]}
 *       />
 *       {showCounter && maxLength && (
 *         <Text style={[
 *           styles.counter,
 *           currentValue.length === maxLength && styles.counterLimit
 *         ]}>
 *           {currentValue.length}/{maxLength}
 *         </Text>
 *       )}
 *     </View>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     width: '100%',
 *     position: 'relative',
 *   },
 *   textarea: {
 *     minHeight: 64,
 *     width: '100%',
 *     borderRadius: 6,
 *     borderWidth: 1,
 *     borderColor: colors.input,
 *     backgroundColor: colors.inputBackground,
 *     paddingHorizontal: 12,
 *     paddingVertical: 8,
 *     paddingTop: 8, // Ensure consistent top padding
 *     fontSize: Platform.select({ ios: 16, android: 16, default: 14 }),
 *     color: colors.foreground,
 *   },
 *   textareaFocused: {
 *     borderColor: colors.ring,
 *     borderWidth: 2,
 *     // Optional: add subtle shadow for focus state
 *     shadowColor: colors.ring,
 *     shadowOffset: { width: 0, height: 0 },
 *     shadowOpacity: 0.2,
 *     shadowRadius: 3,
 *     elevation: 3,
 *   },
 *   textareaInvalid: {
 *     borderColor: colors.destructive,
 *     shadowColor: colors.destructive,
 *     shadowOffset: { width: 0, height: 0 },
 *     shadowOpacity: 0.1,
 *     shadowRadius: 3,
 *     elevation: 2,
 *   },
 *   textareaDisabled: {
 *     opacity: 0.5,
 *     backgroundColor: colors.muted,
 *   },
 *   counter: {
 *     position: 'absolute',
 *     bottom: 8,
 *     right: 12,
 *     fontSize: 12,
 *     color: colors.mutedForeground,
 *   },
 *   counterLimit: {
 *     color: colors.destructive,
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic textarea
 * <Textarea 
 *   placeholder="Enter your message"
 *   onChangeText={(text) => console.log(text)}
 * />
 * 
 * // Controlled textarea with character counter
 * const [message, setMessage] = useState('');
 * 
 * <Textarea
 *   placeholder="Enter description"
 *   value={message}
 *   onChangeText={setMessage}
 *   maxLength={500}
 *   showCounter={true}
 * />
 * 
 * // Auto-resizing textarea with limits
 * <Textarea
 *   placeholder="This will grow as you type"
 *   autoResize={true}
 *   minHeight={64}
 *   maxHeight={200}
 * />
 * 
 * // Fixed height textarea (no auto-resize)
 * <Textarea
 *   placeholder="Fixed height textarea"
 *   autoResize={false}
 *   minHeight={120}
 * />
 * 
 * // Invalid/Error state
 * <Textarea
 *   placeholder="Enter bio"
 *   value={bio}
 *   onChangeText={setBio}
 *   isInvalid={bio.length < 10}
 *   maxLength={200}
 *   showCounter={true}
 * />
 * 
 * // Disabled textarea
 * <Textarea
 *   placeholder="Read only"
 *   disabled={true}
 *   value="This content cannot be edited"
 * />
 * 
 * // WITH FORM VALIDATION (using react-hook-form):
 * import { Controller } from 'react-hook-form@7.55.0';
 * 
 * <Controller
 *   control={control}
 *   name="description"
 *   rules={{
 *     required: 'Description is required',
 *     minLength: {
 *       value: 10,
 *       message: 'Description must be at least 10 characters',
 *     },
 *     maxLength: {
 *       value: 500,
 *       message: 'Description must not exceed 500 characters',
 *     },
 *   }}
 *   render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
 *     <>
 *       <Textarea
 *         placeholder="Enter description"
 *         value={value}
 *         onChangeText={onChange}
 *         onBlur={onBlur}
 *         isInvalid={!!error}
 *         maxLength={500}
 *         showCounter={true}
 *       />
 *       {error && <Text style={styles.errorText}>{error.message}</Text>}
 *     </>
 *   )}
 * />
 * 
 * // TEXTAREA WITH LABEL AND HELPER TEXT:
 * <View style={styles.fieldContainer}>
 *   <Text style={styles.label}>Description</Text>
 *   <Textarea
 *     placeholder="Enter a detailed description"
 *     value={description}
 *     onChangeText={setDescription}
 *     maxLength={500}
 *     showCounter={true}
 *     isInvalid={!!error}
 *   />
 *   {error ? (
 *     <Text style={styles.errorText}>{error}</Text>
 *   ) : (
 *     <Text style={styles.helperText}>
 *       Provide a comprehensive description of your request
 *     </Text>
 *   )}
 * </View>
 * 
 * const styles = StyleSheet.create({
 *   fieldContainer: {
 *     marginBottom: 16,
 *   },
 *   label: {
 *     fontSize: 14,
 *     fontWeight: '500',
 *     color: colors.foreground,
 *     marginBottom: 8,
 *   },
 *   helperText: {
 *     fontSize: 12,
 *     color: colors.mutedForeground,
 *     marginTop: 4,
 *   },
 *   errorText: {
 *     fontSize: 12,
 *     color: colors.destructive,
 *     marginTop: 4,
 *   },
 * });
 * 
 * // ADVANCED: TEXTAREA WITH MENTIONS/HASHTAGS
 * import { useState, useRef } from 'react';
 * 
 * const MentionTextarea = () => {
 *   const [text, setText] = useState('');
 *   const [showSuggestions, setShowSuggestions] = useState(false);
 *   const [suggestions, setSuggestions] = useState<string[]>([]);
 *   
 *   const handleTextChange = (newText: string) => {
 *     setText(newText);
 *     
 *     // Check for @ mentions
 *     const words = newText.split(' ');
 *     const lastWord = words[words.length - 1];
 *     
 *     if (lastWord.startsWith('@')) {
 *       const query = lastWord.slice(1);
 *       // Fetch matching users
 *       const matches = users.filter(u => 
 *         u.name.toLowerCase().startsWith(query.toLowerCase())
 *       );
 *       setSuggestions(matches.map(u => u.name));
 *       setShowSuggestions(matches.length > 0);
 *     } else {
 *       setShowSuggestions(false);
 *     }
 *   };
 *   
 *   const insertMention = (mention: string) => {
 *     const words = text.split(' ');
 *     words[words.length - 1] = `@${mention} `;
 *     setText(words.join(' '));
 *     setShowSuggestions(false);
 *   };
 *   
 *   return (
 *     <View>
 *       <Textarea
 *         value={text}
 *         onChangeText={handleTextChange}
 *         placeholder="Type @ to mention someone"
 *       />
 *       {showSuggestions && (
 *         <View style={styles.suggestionsContainer}>
 *           {suggestions.map(suggestion => (
 *             <Pressable
 *               key={suggestion}
 *               onPress={() => insertMention(suggestion)}
 *               style={styles.suggestionItem}
 *             >
 *               <Text>{suggestion}</Text>
 *             </Pressable>
 *           ))}
 *         </View>
 *       )}
 *     </View>
 *   );
 * };
 */

export { Textarea };
