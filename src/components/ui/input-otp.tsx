/**
 * REACT NATIVE CONVERSION - Input OTP Component
 * 
 * COMPLEXITY: MEDIUM-HIGH
 * CONVERSION APPROACH: Custom TextInput implementation with split display
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - input-otp → Custom React Native implementation
 * - lucide-react → react-native-vector-icons
 * 
 * RECOMMENDED PACKAGES:
 * - react-native-otp-textinput (pre-built solution)
 * - react-native-otp-inputs (alternative)
 * - Or build custom with TextInput and state management
 * 
 * KEY CONVERSION NOTES:
 * 1. Single hidden TextInput with visual slot display
 * 2. Auto-focus next slot on input
 * 3. Backspace handling to move to previous slot
 * 4. Numeric keyboard for OTP codes
 * 5. Paste support for full OTP code
 * 6. Auto-submit when complete
 * 
 * REACT NATIVE IMPLEMENTATION (Custom):
 * ```tsx
 * import { View, TextInput, Pressable, Text } from 'react-native';
 * import { useState, useRef, useEffect } from 'react';
 * 
 * interface OTPInputProps {
 *   length?: number;
 *   onComplete?: (otp: string) => void;
 *   onChangeText?: (otp: string) => void;
 * }
 * 
 * export function OTPInput({
 *   length = 6,
 *   onComplete,
 *   onChangeText,
 * }: OTPInputProps) {
 *   const [otp, setOtp] = useState('');
 *   const [focusedIndex, setFocusedIndex] = useState(0);
 *   const inputRef = useRef<TextInput>(null);
 * 
 *   useEffect(() => {
 *     if (otp.length === length) {
 *       onComplete?.(otp);
 *     }
 *     onChangeText?.(otp);
 *   }, [otp, length]);
 * 
 *   const handleChangeText = (text: string) => {
 *     // Only allow numbers
 *     const cleaned = text.replace(/[^0-9]/g, '');
 *     setOtp(cleaned.slice(0, length));
 *     setFocusedIndex(Math.min(cleaned.length, length - 1));
 *   };
 * 
 *   const handlePress = () => {
 *     inputRef.current?.focus();
 *   };
 * 
 *   return (
 *     <View>
 *       {/* Hidden TextInput for actual input *}
 *       <TextInput
 *         ref={inputRef}
 *         value={otp}
 *         onChangeText={handleChangeText}
 *         keyboardType="number-pad"
 *         maxLength={length}
 *         autoFocus
 *         style={{ position: 'absolute', opacity: 0 }}
 *         accessibilityLabel="Enter verification code"
 *       />
 * 
 *       {/* Visual slots *}
 *       <Pressable onPress={handlePress}>
 *         <View style={styles.container}>
 *           {Array.from({ length }).map((_, index) => {
 *             const char = otp[index] || '';
 *             const isFocused = index === focusedIndex && otp.length <= length;
 *             
 *             return (
 *               <View
 *                 key={index}
 *                 style={[
 *                   styles.slot,
 *                   isFocused && styles.slotFocused,
 *                 ]}
 *               >
 *                 {char ? (
 *                   <Text style={styles.char}>{char}</Text>
 *                 ) : isFocused ? (
 *                   <View style={styles.caret} />
 *                 ) : null}
 *               </View>
 *             );
 *           })}
 *         </View>
 *       </Pressable>
 *     </View>
 *   );
 * }
 * 
 * const styles = {
 *   container: {
 *     flexDirection: 'row',
 *     gap: 8,
 *     justifyContent: 'center',
 *   },
 *   slot: {
 *     width: 48,
 *     height: 56,
 *     borderWidth: 1,
 *     borderColor: 'rgba(255, 255, 255, 0.2)',
 *     borderRadius: 12,
 *     backgroundColor: 'rgba(255, 255, 255, 0.05)',
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *   },
 *   slotFocused: {
 *     borderColor: '#D4AF37',
 *     borderWidth: 2,
 *     shadowColor: '#D4AF37',
 *     shadowOffset: { width: 0, height: 0 },
 *     shadowOpacity: 0.3,
 *     shadowRadius: 8,
 *     elevation: 4,
 *   },
 *   char: {
 *     color: '#fff',
 *     fontSize: 24,
 *     fontWeight: '600',
 *   },
 *   caret: {
 *     width: 2,
 *     height: 24,
 *     backgroundColor: '#D4AF37',
 *   },
 * };
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Package):
 * ```tsx
 * import OTPTextInput from 'react-native-otp-textinput';
 * 
 * export function OTPInputPackage({ onComplete }: OTPInputProps) {
 *   return (
 *     <OTPTextInput
 *       handleTextChange={onComplete}
 *       inputCount={6}
 *       keyboardType="number-pad"
 *       tintColor="#D4AF37"
 *       offTintColor="rgba(255, 255, 255, 0.2)"
 *       containerStyle={styles.container}
 *       textInputStyle={styles.textInput}
 *     />
 *   );
 * }
 * 
 * const styles = {
 *   container: {
 *     marginHorizontal: 16,
 *   },
 *   textInput: {
 *     width: 48,
 *     height: 56,
 *     borderWidth: 1,
 *     borderRadius: 12,
 *     backgroundColor: 'rgba(255, 255, 255, 0.05)',
 *     color: '#fff',
 *     fontSize: 24,
 *     fontWeight: '600',
 *   },
 * };
 * ```
 * 
 * PASTE HANDLING:
 * ```tsx
 * // Handle paste from clipboard
 * import Clipboard from '@react-native-clipboard/clipboard';
 * 
 * const handlePaste = async () => {
 *   const text = await Clipboard.getString();
 *   const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
 *   setOtp(cleaned);
 * };
 * ```
 * 
 * AUTO-SUBMIT ON COMPLETE:
 * ```tsx
 * useEffect(() => {
 *   if (otp.length === length) {
 *     // Auto-submit after brief delay
 *     const timer = setTimeout(() => {
 *       onComplete?.(otp);
 *     }, 200);
 *     return () => clearTimeout(timer);
 *   }
 * }, [otp, length]);
 * ```
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - Email verification: 6-digit code
 * - Phone verification: 6-digit SMS code
 * - Two-factor authentication: 6-digit TOTP
 * - Password reset: 6-digit temporary code
 * - Transaction confirmation: 4-digit PIN
 * - Property access code: 4-8 digit code
 * 
 * ACCESSIBILITY:
 * - accessibilityLabel="Enter 6-digit verification code"
 * - Announce each digit as entered
 * - Support VoiceOver/TalkBack navigation
 * - Ensure keyboard shows on focus
 * - Large enough touch targets
 * 
 * UX FEATURES:
 * - Auto-focus on mount
 * - Backspace to clear and move back
 * - Paste support for full code
 * - Auto-submit when complete
 * - Show/hide code option
 * - Resend code timer
 * - Error state with shake animation
 * 
 * ERROR HANDLING:
 * ```tsx
 * const [error, setError] = useState(false);
 * 
 * // Shake animation on error
 * const shakeAnimation = useRef(new Animated.Value(0)).current;
 * 
 * const shake = () => {
 *   Animated.sequence([
 *     Animated.timing(shakeAnimation, { toValue: 10, duration: 50 }),
 *     Animated.timing(shakeAnimation, { toValue: -10, duration: 50 }),
 *     Animated.timing(shakeAnimation, { toValue: 10, duration: 50 }),
 *     Animated.timing(shakeAnimation, { toValue: 0, duration: 50 }),
 *   ]).start();
 * };
 * ```
 * 
 * KEYBOARD HANDLING:
 * - keyboardType="number-pad" for numeric codes
 * - keyboardType="default" for alphanumeric codes
 * - autoFocus on mount
 * - returnKeyType="done"
 * - Hide keyboard on complete
 * 
 * STYLING NOTES:
 * - Each slot: 48x56 points
 * - Gap between slots: 8-12 points
 * - Border: 1-2 points
 * - Focused slot: Golden border with glow
 * - Error state: Red border with shake
 * - Success state: Green border with checkmark
 * - Filled slots: Slightly darker background
 * 
 * PERFORMANCE:
 * - Single TextInput (not one per slot)
 * - Minimal re-renders with proper state management
 * - Use React.memo for slot components
 * - Debounce validation if calling API
 */

"use client";

import * as React from "react";
// WEB: input-otp package for accessible OTP input
// REACT NATIVE: react-native-otp-textinput or custom implementation
import { OTPInput, OTPInputContext } from "input-otp@1.4.2";
// WEB: Lucide icons
// REACT NATIVE: react-native-vector-icons
import { MinusIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  // WEB: OTPInput handles split input boxes and state
  // REACT NATIVE: Use react-native-otp-textinput or custom implementation:
  // <OTPTextInput
  //   handleTextChange={onComplete}
  //   inputCount={6}
  //   keyboardType="number-pad"
  //   tintColor="#D4AF37"
  //   offTintColor="rgba(255, 255, 255, 0.2)"
  // />
  // 
  // Or custom with single hidden TextInput:
  // <TextInput
  //   value={otp}
  //   onChangeText={handleChange}
  //   keyboardType="number-pad"
  //   maxLength={6}
  //   style={{ opacity: 0, position: 'absolute' }}
  // />
  // {/* Visual slots */}
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      // REACT NATIVE: Remove has-disabled pseudo-class, use explicit disabled prop
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  // WEB: Group of OTP input slots
  // REACT NATIVE: View containing slot displays
  // <View style={{ flexDirection: 'row', gap: 8 }}>
  //   {slots.map((slot, i) => <OTPSlot key={i} {...slot} />)}
  // </View>
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  // WEB: Individual OTP digit slot with context
  // REACT NATIVE: View showing single character or caret
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  // REACT NATIVE:
  // <View
  //   style={[
  //     styles.slot,
  //     isActive && styles.slotActive,
  //     hasError && styles.slotError,
  //   ]}
  // >
  //   {char ? (
  //     <Text style={styles.char}>{char}</Text>
  //   ) : isActive ? (
  //     <View style={styles.caret} />
  //   ) : null}
  // </View>
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      // REACT NATIVE: Replace complex border/ring styling with simple border:
      // borderWidth: isActive ? 2 : 1,
      // borderColor: isActive ? '#D4AF37' : 'rgba(255,255,255,0.2)',
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
          {/* REACT NATIVE: Blinking caret with Animated API:
            <Animated.View
              style={{
                width: 2,
                height: 24,
                backgroundColor: '#D4AF37',
                opacity: caretOpacity, // Animated.Value
              }}
            />
          */}
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  // WEB: Visual separator between OTP groups (e.g., 123-456)
  // REACT NATIVE: View with separator icon or text
  // <View style={{ marginHorizontal: 8 }}>
  //   <Icon name="minus" size={16} color="rgba(255,255,255,0.4)" />
  // </View>
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
      {/* REACT NATIVE: <Icon name="minus" size={16} /> */}
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
