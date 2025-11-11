/**
 * REACT NATIVE CONVERSION - AspectRatio Component
 * 
 * COMPLEXITY: LOW
 * CONVERSION APPROACH: Replace with React Native View and AspectRatio prop
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - @radix-ui/react-aspect-ratio → React Native View with aspectRatio style
 * 
 * KEY CONVERSION NOTES:
 * 1. React Native has built-in aspectRatio style property
 * 2. No need for external library - use View with aspectRatio style
 * 3. AspectRatio is expressed as width/height (e.g., 16/9 = 1.77778)
 * 
 * REACT NATIVE IMPLEMENTATION:
 * ```tsx
 * import { View, ViewProps } from 'react-native';
 * 
 * interface AspectRatioProps extends ViewProps {
 *   ratio: number; // e.g., 16/9 or 4/3
 *   children: React.ReactNode;
 * }
 * 
 * export function AspectRatio({ ratio, children, style, ...props }: AspectRatioProps) {
 *   return (
 *     <View style={[{ aspectRatio: ratio, width: '100%' }, style]} {...props}>
 *       {children}
 *     </View>
 *   );
 * }
 * ```
 * 
 * USAGE EXAMPLE:
 * ```tsx
 * // Web
 * <AspectRatio ratio={16 / 9}>
 *   <img src="..." />
 * </AspectRatio>
 * 
 * // React Native
 * <AspectRatio ratio={16 / 9}>
 *   <Image source={{ uri: '...' }} style={{ width: '100%', height: '100%' }} />
 * </AspectRatio>
 * ```
 * 
 * STYLING NOTES:
 * - aspectRatio works with both flexbox and absolute positioning
 * - Ensure child components have proper width/height (100% or flex: 1)
 * - Works well with Image component
 * 
 * DATA ATTRIBUTE MIGRATION:
 * - data-slot="aspect-ratio" → Not needed in React Native
 * - Use testID for testing: testID="aspect-ratio"
 * 
 * ACCESSIBILITY:
 * - Ensure Image components have accessible={true} and accessibilityLabel
 * - No specific ARIA attributes needed for container
 * 
 * POLICYANGEL-SPECIFIC NOTES:
 * - Property images: Use 16:9 for landscape photos (1200x675)
 * - Drone aerial shots: Use 4:3 for standard aerial view
 * - Profile avatars: Use 1:1 for square avatars
 * - Gallery thumbnails: Use 3:2 for preview cards
 * - Map overlays: Use 16:9 for map snapshots
 */

"use client";

// WEB: Using @radix-ui for cross-browser aspect ratio support
// REACT NATIVE: Replace with View and aspectRatio style property
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio@1.1.2";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  // WEB: Radix UI handles aspect ratio with CSS padding-bottom trick
  // REACT NATIVE: Use View with aspectRatio style:
  // <View style={{ aspectRatio: ratio, width: '100%' }} {...props}>
  //   {children}
  // </View>
  
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
  // REACT NATIVE: Remove data-slot, use testID="aspect-ratio"
}

export { AspectRatio };
