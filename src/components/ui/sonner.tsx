/**
 * REACT NATIVE CONVERSION - Sonner (Toast) Component
 * 
 * COMPLEXITY: MEDIUM
 * CONVERSION APPROACH: Use react-native-toast-message or custom toast
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - sonner → react-native-toast-message or react-native-paper Toast
 * - next-themes → Custom theme context
 * 
 * RECOMMENDED PACKAGES:
 * - react-native-toast-message (most popular)
 * - react-native-paper (includes Toast)
 * - react-native-toast-notifications
 * 
 * KEY CONVERSION NOTES:
 * 1. Toasts show temporary messages/notifications
 * 2. Must be positioned above all other content
 * 3. Auto-dismiss after timeout
 * 4. Support success, error, info, warning types
 * 5. Swipe to dismiss gesture
 * 
 * REACT NATIVE IMPLEMENTATION:
 * ```tsx
 * import Toast from 'react-native-toast-message';
 * 
 * // Setup in App.tsx root
 * function App() {
 *   return (
 *     <>
 *       <NavigationContainer>
 *         {/* Your app content *}
 *       </NavigationContainer>
 *       
 *       {/* Toast at root level *}
 *       <Toast />
 *     </>
 *   );
 * }
 * 
 * // Show toast from anywhere
 * import Toast from 'react-native-toast-message';
 * 
 * // Success toast
 * Toast.show({
 *   type: 'success',
 *   text1: 'Success',
 *   text2: 'Your action completed successfully',
 *   position: 'top',
 *   visibilityTime: 4000,
 * });
 * 
 * // Error toast
 * Toast.show({
 *   type: 'error',
 *   text1: 'Error',
 *   text2: 'Something went wrong',
 * });
 * 
 * // Info toast
 * Toast.show({
 *   type: 'info',
 *   text1: 'Info',
 *   text2: 'New update available',
 * });
 * ```
 * 
 * CUSTOM TOAST STYLING:
 * ```tsx
 * const toastConfig = {
 *   success: ({ text1, text2 }: any) => (
 *     <View style={styles.toastSuccess}>
 *       <Icon name="check-circle" size={20} color="#10B981" />
 *       <View style={styles.toastContent}>
 *         <Text style={styles.toastTitle}>{text1}</Text>
 *         <Text style={styles.toastMessage}>{text2}</Text>
 *       </View>
 *     </View>
 *   ),
 *   error: ({ text1, text2 }: any) => (
 *     <View style={styles.toastError}>
 *       <Icon name="x-circle" size={20} color="#EF4444" />
 *       <View style={styles.toastContent}>
 *         <Text style={styles.toastTitle}>{text1}</Text>
 *         <Text style={styles.toastMessage}>{text2}</Text>
 *       </View>
 *     </View>
 *   ),
 * };
 * 
 * // Use custom config
 * <Toast config={toastConfig} />
 * ```
 * 
 * POLICYANGEL-SPECIFIC STYLING:
 * ```tsx
 * const styles = StyleSheet.create({
 *   toastSuccess: {
 *     backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *     borderLeftWidth: 4,
 *     borderLeftColor: '#10B981',
 *     borderRadius: 12,
 *     padding: 16,
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: 12,
 *     marginHorizontal: 16,
 *     shadowColor: '#000',
 *     shadowOffset: { width: 0, height: 4 },
 *     shadowOpacity: 0.3,
 *     shadowRadius: 8,
 *     elevation: 8,
 *   },
 *   toastError: {
 *     backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *     borderLeftWidth: 4,
 *     borderLeftColor: '#EF4444',
 *     borderRadius: 12,
 *     padding: 16,
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: 12,
 *     marginHorizontal: 16,
 *     shadowColor: '#000',
 *     shadowOffset: { width: 0, height: 4 },
 *     shadowOpacity: 0.3,
 *     shadowRadius: 8,
 *     elevation: 8,
 *   },
 *   toastContent: {
 *     flex: 1,
 *   },
 *   toastTitle: {
 *     color: '#fff',
 *     fontSize: 16,
 *     fontWeight: '600',
 *     marginBottom: 4,
 *   },
 *   toastMessage: {
 *     color: 'rgba(255, 255, 255, 0.8)',
 *     fontSize: 14,
 *   },
 * });
 * ```
 * 
 * USAGE EXAMPLES:
 * ```tsx
 * // After saving property
 * Toast.show({
 *   type: 'success',
 *   text1: 'Property Saved',
 *   text2: 'Your changes have been saved successfully',
 * });
 * 
 * // Upload progress
 * Toast.show({
 *   type: 'info',
 *   text1: 'Uploading...',
 *   text2: 'Please wait while we upload your photos',
 *   autoHide: false, // Manual dismiss
 * });
 * 
 * // Network error
 * Toast.show({
 *   type: 'error',
 *   text1: 'Connection Error',
 *   text2: 'Please check your internet connection',
 *   visibilityTime: 5000,
 * });
 * ```
 * 
 * ACCESSIBILITY:
 * - Announce toast with accessibilityLiveRegion="polite"
 * - Use appropriate icons for visual users
 * - Support screen reader announcements
 * - Provide dismiss action for long toasts
 */

"use client";

// WEB: next-themes for theme detection
// REACT NATIVE: Custom theme context or React Context
import { useTheme } from "next-themes@0.4.6";
// WEB: Sonner toast library
// REACT NATIVE: react-native-toast-message
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  // WEB: Get theme from next-themes
  // REACT NATIVE: Get theme from custom context:
  // const { theme } = useTheme();
  const { theme = "system" } = useTheme();

  // WEB: Sonner toaster with theme
  // REACT NATIVE: Setup Toast at app root:
  // 
  // import Toast from 'react-native-toast-message';
  // 
  // // In App.tsx:
  // <Toast />
  // 
  // // Custom config for PolicyAngel:
  // const toastConfig = {
  //   success: ({ text1, text2 }) => (
  //     <View style={styles.toastSuccess}>
  //       <Icon name="check-circle" size={20} color="#10B981" />
  //       <View style={styles.toastContent}>
  //         <Text style={styles.toastTitle}>{text1}</Text>
  //         <Text style={styles.toastMessage}>{text2}</Text>
  //       </View>
  //     </View>
  //   ),
  //   error: ({ text1, text2 }) => (
  //     <View style={styles.toastError}>
  //       <Icon name="x-circle" size={20} color="#EF4444" />
  //       <View style={styles.toastContent}>
  //         <Text style={styles.toastTitle}>{text1}</Text>
  //         <Text style={styles.toastMessage}>{text2}</Text>
  //       </View>
  //     </View>
  //   ),
  // };
  // 
  // <Toast config={toastConfig} position="top" />
  // 
  // // Show toast from anywhere:
  // Toast.show({
  //   type: 'success',
  //   text1: 'Success',
  //   text2: 'Operation completed',
  // });
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
