/**
 * REACT NATIVE CONVERSION - useIsMobile Hook
 * 
 * COMPLEXITY: VERY LOW
 * CONVERSION APPROACH: Not needed - React Native is always mobile
 * 
 * KEY CONVERSION NOTES:
 * 1. This hook detects if viewport is mobile-sized on web
 * 2. In React Native, app is ALWAYS mobile
 * 3. For tablet detection, use Dimensions API
 * 4. For responsive layouts, use Dimensions or useWindowDimensions
 * 
 * REACT NATIVE ALTERNATIVE:
 * ```tsx
 * import { useWindowDimensions, Platform } from 'react-native';
 * 
 * // For tablet detection
 * export function useIsTablet() {
 *   const { width } = useWindowDimensions();
 *   return width >= 768; // iPad size or larger
 * }
 * 
 * // For different breakpoints
 * export function useBreakpoint() {
 *   const { width } = useWindowDimensions();
 *   
 *   if (width < 576) return 'xs';  // Phone
 *   if (width < 768) return 'sm';  // Large phone
 *   if (width < 992) return 'md';  // Tablet
 *   if (width < 1200) return 'lg'; // Large tablet
 *   return 'xl';                   // Desktop (rare on RN)
 * }
 * 
 * // For platform detection
 * export function useIsAndroid() {
 *   return Platform.OS === 'android';
 * }
 * 
 * export function useIsIOS() {
 *   return Platform.OS === 'ios';
 * }
 * 
 * // Usage
 * const isTablet = useIsTablet();
 * const breakpoint = useBreakpoint();
 * 
 * <View style={isTablet ? styles.tabletLayout : styles.phoneLayout}>
 *   {content}
 * </View>
 * ```
 * 
 * RESPONSIVE STYLING:
 * ```tsx
 * import { StyleSheet, useWindowDimensions } from 'react-native';
 * 
 * function MyComponent() {
 *   const { width } = useWindowDimensions();
 *   const styles = getStyles(width);
 *   
 *   return <View style={styles.container} />;
 * }
 * 
 * function getStyles(width: number) {
 *   const isTablet = width >= 768;
 *   
 *   return StyleSheet.create({
 *     container: {
 *       padding: isTablet ? 32 : 16,
 *       flexDirection: isTablet ? 'row' : 'column',
 *     },
 *   });
 * }
 * ```
 * 
 * SCREEN SIZE LISTENER:
 * ```tsx
 * import { useState, useEffect } from 'react';
 * import { Dimensions } from 'react-native';
 * 
 * export function useScreenSize() {
 *   const [screenSize, setScreenSize] = useState(Dimensions.get('window'));
 *   
 *   useEffect(() => {
 *     const subscription = Dimensions.addEventListener('change', ({ window }) => {
 *       setScreenSize(window);
 *     });
 *     
 *     return () => subscription?.remove();
 *   }, []);
 *   
 *   return screenSize;
 * }
 * ```
 */

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // WEB: Detects if window width is below mobile breakpoint
  // REACT NATIVE: Not needed - always mobile
  // 
  // For tablet detection in RN:
  // import { useWindowDimensions } from 'react-native';
  // const { width } = useWindowDimensions();
  // const isTablet = width >= 768;
  // 
  // For platform detection:
  // import { Platform } from 'react-native';
  // const isIOS = Platform.OS === 'ios';
  // const isAndroid = Platform.OS === 'android';
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
