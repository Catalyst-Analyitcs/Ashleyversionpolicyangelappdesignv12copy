/**
 * REACT NATIVE CONVERSION - SLIDER COMPONENT
 * ===========================================
 * 
 * COMPLEXITY: MEDIUM
 * Slider maps to React Native's Slider component with some customization.
 * 
 * CONVERSION STRATEGY:
 * 1. Use @react-native-community/slider (recommended)
 * 2. Or use expo-slider for Expo projects
 * 3. Map web props to native slider props
 * 4. Handle single and range sliders differently
 * 5. Add haptic feedback on value change (optional)
 * 
 * KEY DIFFERENCES:
 * - React Native Slider is single value only by default
 * - Range slider requires custom implementation or library
 * - Limited styling options compared to web
 * - Step prop works the same
 * - No vertical orientation in native Slider (needs custom)
 * 
 * RECOMMENDED LIBRARIES:
 * - @react-native-community/slider (most popular)
 * - react-native-slider (alternative with more features)
 * - react-native-range-slider (for range selection)
 * - rn-range-slider (another range option)
 * 
 * EXAMPLE CONVERSION:
 * 
 * Web (single value):
 * <Slider value={[50]} onValueChange={([val]) => setValue(val)} min={0} max={100} />
 * 
 * React Native:
 * <Slider
 *   value={value}
 *   onValueChange={setValue}
 *   minimumValue={0}
 *   maximumValue={100}
 *   minimumTrackTintColor={colors.primary}
 *   maximumTrackTintColor={colors.muted}
 *   thumbTintColor={colors.background}
 * />
 */

"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider@1.2.3";

import { cn } from "./utils";

/**
 * RN: Slider Component
 * 
 * CONVERSION NOTES:
 * - Replace Radix UI Slider with @react-native-community/slider
 * - Single value slider is straightforward
 * - Range slider (two thumbs) requires custom implementation
 * - Vertical slider needs custom component
 * 
 * PROPS MAPPING (Single Slider):
 * - value → value (number, not array)
 * - onValueChange → onValueChange
 * - min → minimumValue
 * - max → maximumValue
 * - step → step (same)
 * - disabled → disabled (same)
 * - className → style prop
 * 
 * ADDITIONAL RN PROPS:
 * - minimumTrackTintColor: Color of filled portion
 * - maximumTrackTintColor: Color of unfilled portion
 * - thumbTintColor: Color of draggable thumb
 * - onSlidingStart: Callback when user starts dragging
 * - onSlidingComplete: Callback when user releases thumb
 * 
 * TAILWIND CLASS CONVERSION:
 * 
 * ROOT (container):
 * - relative → Not needed (Slider is self-contained)
 * - flex → Not applicable
 * - w-full → { width: '100%' }
 * - touch-none → Not applicable (native touch handling)
 * - items-center → Not applicable
 * - select-none → Not applicable
 * - data-[disabled]:opacity-50 → disabled && { opacity: 0.5 }
 * - data-[orientation=vertical] → Custom vertical component needed
 * 
 * TRACK:
 * - bg-muted → maximumTrackTintColor = colors.muted
 * - relative grow → Not applicable (native styling)
 * - overflow-hidden → Not applicable
 * - rounded-full → Native styling (can't override)
 * - data-[orientation=horizontal]:h-4 → Track height (limited control)
 * - data-[orientation=horizontal]:w-full → width: '100%'
 * 
 * RANGE (filled portion):
 * - bg-primary → minimumTrackTintColor = colors.primary
 * - absolute → Built into native component
 * - data-[orientation=horizontal]:h-full → Built in
 * 
 * THUMB:
 * - border-primary → thumbTintColor = colors.background
 * - bg-background → Part of thumbTintColor
 * - ring-ring/50 → Shadow around thumb (platform-specific)
 * - size-4 → Thumb size (limited control on iOS, more on Android)
 * - shrink-0 → Not applicable
 * - rounded-full → Native styling
 * - shadow-sm → Platform-specific shadow
 * - transition → Native animation
 * - hover:ring-4 → Use onSlidingStart/Complete for hover effect
 * - focus-visible:ring-4 → Not applicable (mobile)
 * - disabled:opacity-50 → disabled prop
 * 
 * RANGE SLIDER IMPLEMENTATION:
 * For sliders with two thumbs (e.g., price range):
 * 
 * OPTION 1: Use library
 * import RangeSlider from 'rn-range-slider';
 * 
 * <RangeSlider
 *   min={0}
 *   max={100}
 *   low={20}
 *   high={80}
 *   step={1}
 *   onValueChanged={(low, high) => setRange([low, high])}
 *   renderThumb={() => <CustomThumb />}
 *   renderRail={() => <CustomRail />}
 *   renderRailSelected={() => <CustomRailSelected />}
 * />
 * 
 * OPTION 2: Custom implementation with PanGestureHandler
 * 
 * VERTICAL SLIDER:
 * React Native's Slider is horizontal only
 * For vertical, need custom implementation:
 * 1. Rotate container 90deg
 * 2. Or build custom with PanGestureHandler
 * 
 * HAPTIC FEEDBACK:
 * Add haptic feedback on value change:
 * 
 * import * as Haptics from 'expo-haptics';
 * 
 * onValueChange={(value) => {
 *   if (Math.abs(value - prevValue) > step) {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *   }
 *   setValue(value);
 * }}
 * 
 * STEP MARKS:
 * Native Slider doesn't show step marks
 * Add custom marks with View components:
 * 
 * <View style={styles.container}>
 *   <View style={styles.marks}>
 *     {marks.map(mark => <View key={mark} style={styles.mark} />)}
 *   </View>
 *   <Slider ... />
 * </View>
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  /**
   * VALUE ARRAY HANDLING
   * 
   * Web Radix UI uses arrays for value (supports range)
   * React Native Slider uses single number
   * 
   * This useMemo extracts values from array
   * 
   * RN: For single slider, just use number:
   * const [sliderValue, setSliderValue] = useState(50);
   * 
   * For range slider, use two separate Slider components
   * or use a range slider library
   */
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      // RN: Replace entire component with Slider
      // RN: import Slider from '@react-native-community/slider';
      // RN: 
      // RN: <Slider
      // RN:   style={styles.slider}
      // RN:   value={value}
      // RN:   onValueChange={onValueChange}
      // RN:   minimumValue={min}
      // RN:   maximumValue={max}
      // RN:   step={step}
      // RN:   minimumTrackTintColor={colors.primary}
      // RN:   maximumTrackTintColor={colors.muted}
      // RN:   thumbTintColor={colors.background}
      // RN:   disabled={disabled}
      // RN:   onSlidingStart={() => {
      // RN:     // Optional: Add haptic feedback
      // RN:     // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      // RN:   }}
      // RN:   onSlidingComplete={(value) => {
      // RN:     // Called when user releases thumb
      // RN:     // Good place to save value to backend
      // RN:   }}
      // RN: />
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        // RN: Track styling controlled by minimumTrackTintColor and maximumTrackTintColor
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          // RN: Range (filled portion) controlled by minimumTrackTintColor
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {/**
       * MULTIPLE THUMBS
       * 
       * Web version creates one thumb per value in array
       * This supports range sliders with multiple thumbs
       * 
       * RN: Native Slider only supports one thumb
       * For range slider, use:
       * 1. Two separate Slider components (min and max)
       * 2. Range slider library (rn-range-slider)
       * 3. Custom PanGestureHandler implementation
       */}
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          // RN: Thumb styling controlled by thumbTintColor
          // RN: Size is platform-dependent (iOS: fixed, Android: customizable)
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

/**
 * COMPLETE REACT NATIVE EXAMPLE
 * ==============================
 * 
 * import React, { useState, useRef } from 'react';
 * import { View, Text, StyleSheet } from 'react-native';
 * import Slider from '@react-native-community/slider';
 * import * as Haptics from 'expo-haptics';
 * 
 * interface SliderFieldProps {
 *   label: string;
 *   value: number;
 *   onValueChange: (value: number) => void;
 *   min?: number;
 *   max?: number;
 *   step?: number;
 *   disabled?: boolean;
 *   showValue?: boolean;
 *   formatValue?: (value: number) => string;
 * }
 * 
 * export const SliderField: React.FC<SliderFieldProps> = ({
 *   label,
 *   value,
 *   onValueChange,
 *   min = 0,
 *   max = 100,
 *   step = 1,
 *   disabled = false,
 *   showValue = true,
 *   formatValue = (val) => val.toString(),
 * }) => {
 *   const lastHapticValue = useRef(value);
 *   
 *   const handleValueChange = (newValue: number) => {
 *     // Haptic feedback every step
 *     if (Math.abs(newValue - lastHapticValue.current) >= step) {
 *       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *       lastHapticValue.current = newValue;
 *     }
 *     onValueChange(newValue);
 *   };
 *   
 *   return (
 *     <View style={styles.container}>
 *       <View style={styles.header}>
 *         <Text style={styles.label}>{label}</Text>
 *         {showValue && (
 *           <Text style={styles.value}>{formatValue(value)}</Text>
 *         )}
 *       </View>
 *       <Slider
 *         style={styles.slider}
 *         value={value}
 *         onValueChange={handleValueChange}
 *         minimumValue={min}
 *         maximumValue={max}
 *         step={step}
 *         minimumTrackTintColor={colors.primary}
 *         maximumTrackTintColor={colors.muted}
 *         thumbTintColor={colors.background}
 *         disabled={disabled}
 *       />
 *       <View style={styles.footer}>
 *         <Text style={styles.footerText}>{min}</Text>
 *         <Text style={styles.footerText}>{max}</Text>
 *       </View>
 *     </View>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     marginVertical: 16,
 *   },
 *   header: {
 *     flexDirection: 'row',
 *     justifyContent: 'space-between',
 *     alignItems: 'center',
 *     marginBottom: 8,
 *   },
 *   label: {
 *     fontSize: 14,
 *     color: colors.foreground,
 *   },
 *   value: {
 *     fontSize: 16,
 *     fontWeight: '600',
 *     color: colors.primary,
 *   },
 *   slider: {
 *     width: '100%',
 *     height: 40,
 *   },
 *   footer: {
 *     flexDirection: 'row',
 *     justifyContent: 'space-between',
 *     marginTop: 4,
 *   },
 *   footerText: {
 *     fontSize: 12,
 *     color: colors.mutedForeground,
 *   },
 * });
 * 
 * // USAGE EXAMPLES:
 * 
 * // Basic slider
 * const [volume, setVolume] = useState(50);
 * 
 * <SliderField
 *   label="Volume"
 *   value={volume}
 *   onValueChange={setVolume}
 *   min={0}
 *   max={100}
 * />
 * 
 * // Price slider with currency formatting
 * const [price, setPrice] = useState(500);
 * 
 * <SliderField
 *   label="Maximum Price"
 *   value={price}
 *   onValueChange={setPrice}
 *   min={0}
 *   max={1000}
 *   step={50}
 *   formatValue={(val) => `$${val.toLocaleString()}`}
 * />
 * 
 * // Percentage slider
 * const [completion, setCompletion] = useState(75);
 * 
 * <SliderField
 *   label="Completion"
 *   value={completion}
 *   onValueChange={setCompletion}
 *   min={0}
 *   max={100}
 *   step={5}
 *   formatValue={(val) => `${val}%`}
 * />
 * 
 * // RANGE SLIDER (two thumbs):
 * import RangeSlider from 'rn-range-slider';
 * 
 * const RangePriceSlider = () => {
 *   const [low, setLow] = useState(200);
 *   const [high, setHigh] = useState(800);
 *   
 *   const renderThumb = () => (
 *     <View style={styles.thumb} />
 *   );
 *   
 *   const renderRail = () => (
 *     <View style={styles.rail} />
 *   );
 *   
 *   const renderRailSelected = () => (
 *     <View style={styles.railSelected} />
 *   );
 *   
 *   return (
 *     <View style={styles.container}>
 *       <View style={styles.header}>
 *         <Text style={styles.label}>Price Range</Text>
 *         <Text style={styles.value}>
 *           ${low.toLocaleString()} - ${high.toLocaleString()}
 *         </Text>
 *       </View>
 *       <RangeSlider
 *         style={styles.slider}
 *         min={0}
 *         max={1000}
 *         step={10}
 *         low={low}
 *         high={high}
 *         onValueChanged={(low, high) => {
 *           setLow(low);
 *           setHigh(high);
 *         }}
 *         renderThumb={renderThumb}
 *         renderRail={renderRail}
 *         renderRailSelected={renderRailSelected}
 *       />
 *     </View>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   thumb: {
 *     width: 20,
 *     height: 20,
 *     borderRadius: 10,
 *     backgroundColor: colors.background,
 *     borderWidth: 2,
 *     borderColor: colors.primary,
 *   },
 *   rail: {
 *     flex: 1,
 *     height: 4,
 *     borderRadius: 2,
 *     backgroundColor: colors.muted,
 *   },
 *   railSelected: {
 *     height: 4,
 *     backgroundColor: colors.primary,
 *     borderRadius: 2,
 *   },
 * });
 * 
 * // CUSTOM SLIDER WITH LABELS:
 * const LabeledSlider = () => {
 *   const [value, setValue] = useState(50);
 *   const labels = ['Low', 'Medium', 'High', 'Very High'];
 *   const step = 100 / (labels.length - 1);
 *   
 *   const getCurrentLabel = () => {
 *     const index = Math.round(value / step);
 *     return labels[Math.min(index, labels.length - 1)];
 *   };
 *   
 *   return (
 *     <View>
 *       <Text style={styles.currentLabel}>{getCurrentLabel()}</Text>
 *       <Slider
 *         value={value}
 *         onValueChange={setValue}
 *         minimumValue={0}
 *         maximumValue={100}
 *         step={step}
 *         minimumTrackTintColor={colors.primary}
 *         maximumTrackTintColor={colors.muted}
 *       />
 *       <View style={styles.labels}>
 *         {labels.map((label, index) => (
 *           <Text key={label} style={styles.label}>{label}</Text>
 *         ))}
 *       </View>
 *     </View>
 *   );
 * };
 * 
 * // VERTICAL SLIDER (custom implementation):
 * import { PanGestureHandler } from 'react-native-gesture-handler';
 * import Animated, {
 *   useAnimatedGestureHandler,
 *   useAnimatedStyle,
 *   useSharedValue,
 * } from 'react-native-reanimated';
 * 
 * const VerticalSlider = ({ value, onValueChange, min = 0, max = 100, height = 200 }) => {
 *   const translateY = useSharedValue((1 - value / max) * height);
 *   
 *   const gestureHandler = useAnimatedGestureHandler({
 *     onStart: (_, ctx) => {
 *       ctx.startY = translateY.value;
 *     },
 *     onActive: (event, ctx) => {
 *       translateY.value = Math.max(0, Math.min(height, ctx.startY + event.translationY));
 *     },
 *     onEnd: () => {
 *       const newValue = ((height - translateY.value) / height) * (max - min) + min;
 *       runOnJS(onValueChange)(Math.round(newValue));
 *     },
 *   });
 *   
 *   const thumbStyle = useAnimatedStyle(() => ({
 *     transform: [{ translateY: translateY.value }],
 *   }));
 *   
 *   return (
 *     <View style={[styles.verticalTrack, { height }]}>
 *       <PanGestureHandler onGestureEvent={gestureHandler}>
 *         <Animated.View style={[styles.verticalThumb, thumbStyle]} />
 *       </PanGestureHandler>
 *     </View>
 *   );
 * };
 */

export { Slider };
