# 📝 Inline Annotation Guide

## How to Use Inline React Native Conversion Comments

This guide explains the inline annotation pattern used throughout the PolicyAngel codebase for React Native conversion.

---

## 🎯 Purpose

Instead of only having conversion notes at the top of files, we add **inline comments** throughout the actual code so developers can see conversion instructions exactly where they need them.

---

## 📋 Annotation Format

### **Comment Prefix: `// RN:`**

All React Native conversion comments use the `// RN:` prefix for easy searching and identification.

### **Comment Types:**

1. **Import Replacements**
   ```tsx
   // RN: import { View, Text } from 'react-native';
   import { Card } from './ui/card';
   ```

2. **Component Replacements**
   ```tsx
   // RN: Replace with <View style={styles.container}>
   <div className="container">
   ```

3. **Style Conversions**
   ```tsx
   style={{
     backgroundColor: 'var(--card-bg)', // RN: Use theme.colors.cardBg
     borderRadius: '12px', // RN: borderRadius: 12 (number, not string)
   }}
   ```

4. **Event Handler Changes**
   ```tsx
   onClick={handleClick} // RN: Use Pressable with onPress
   ```

5. **Alternative Approaches**
   ```tsx
   // RN: Alternative 1: Use MapView
   // RN: Alternative 2: Use static image URL
   ```

6. **Library Replacements**
   ```tsx
   import { motion } from 'motion/react'; // RN: Replace with react-native-reanimated
   ```

7. **Feature Implementation Notes**
   ```tsx
   // RN: Add haptic feedback: Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
   ```

8. **Complete Code Examples**
   ```tsx
   /* 
   RN: FULL IMPLEMENTATION
   
   <Pressable onPress={onPress} style={styles.card}>
     <View style={styles.content}>
       <Text style={styles.title}>{title}</Text>
     </View>
   </Pressable>
   */
   ```

---

## 🔍 Examples from PropertyCard.tsx

### **1. Import Replacements**

```tsx
// RN: import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
// RN: import MapView from 'react-native-maps';
// RN: import FastImage from 'react-native-fast-image';
// RN: import * as Haptics from 'expo-haptics';
import { MapPin, Home } from "lucide-react"; // RN: import from 'lucide-react-native'
import { Card } from "./ui/card"; // RN: Replace with custom View component
import { Badge } from "./ui/badge"; // RN: Replace with custom View + Text
```

### **2. Component Conversions**

```tsx
// RN: Replace Card with Pressable wrapper
// RN: <Pressable onPress={handleClick} onLongPress={handleLongPress} style={styles.card}>
<Card
  className="backdrop-blur-sm overflow-visible"
  style={{
    borderRadius: 'var(--property-card-radius)', // RN: Use theme.borderRadius.md
    backgroundColor: 'var(--card-bg)', // RN: Use theme.colors.cardBg
  }}
>
```

### **3. Style Annotations**

```tsx
<div 
  className="absolute top-0 left-0 z-10" // RN: position: 'absolute', top: 0, left: 0, zIndex: 10
  style={{ margin: 'var(--spacing-3)' }} // RN: margin: theme.spacing[3]
>
```

### **4. Image Handling**

```tsx
{/* RN: Replace with <FastImage> or <Image> component */}
{/* RN: <FastImage source={{ uri: mapImageUrl }} style={styles.mapImage} /> */}
<img
  src={mapImageUrl}
  className="absolute inset-0 w-full h-full object-cover" // RN: position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover'
  style={{
    opacity: imageLoaded ? 1 : 0, // RN: Use Animated.View with fadeIn animation
    transition: 'opacity 0.3s ease-in-out', // RN: Replace with Animated timing
  }}
/>
```

### **5. Glassmorphism**

```tsx
{/* RN: Use BlurView from expo-blur for glassmorphism */}
{/* RN: import { BlurView } from 'expo-blur'; */}
{/* RN: <BlurView intensity={80} tint="dark" style={styles.mapPinContainer}> */}
<div 
  className="backdrop-blur-md"
  style={{
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }}
>
```

### **6. Complete StyleSheet Example**

```tsx
/* 
RN: STYLESHEET EXAMPLE
 
const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.md,
    height: 240,
    width: '100%',
    backgroundColor: theme.colors.cardBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, // Android shadow
  },
});
*/
```

---

## 📚 Where to Find Inline Annotations

### **Files with Inline Annotations:**

✅ **Components:**
- `/components/PropertyCard.tsx` - Complete inline annotations
- More to come...

### **Pattern to Follow:**

All critical files should have inline annotations following this format:

1. **Top of file** - High-level conversion overview (existing)
2. **Throughout code** - Inline `// RN:` comments for specific conversions
3. **End of file** - Complete StyleSheet example if applicable

---

## 🎯 Benefits of Inline Annotations

### **1. Contextual Guidance**
Developers see conversion notes exactly where they need them, not just at the top of the file.

### **2. Easier to Follow**
No need to scroll back to the top to remember how to convert a specific pattern.

### **3. Reduced Errors**
Less chance of missing important conversion details when they're right next to the code.

### **4. Faster Development**
Copy the RN comment suggestion and modify as needed - saves time looking up syntax.

### **5. Better Learning**
Junior developers learn React Native patterns by seeing side-by-side comparisons.

---

## 🔧 How to Add Inline Annotations

### **Step 1: Read Existing Code**
Understand what the component does.

### **Step 2: Identify Conversion Points**
Look for:
- Imports
- HTML elements (div, img, etc.)
- CSS properties that differ in RN
- Event handlers
- Animations
- Third-party libraries

### **Step 3: Add `// RN:` Comments**
For each conversion point, add a comment explaining the React Native equivalent.

### **Step 4: Provide Alternatives**
When there are multiple ways to achieve something, list them:
```tsx
// RN: Option 1: Use MapView for interactive map
// RN: Option 2: Use static image URL for performance
// RN: Recommended: Static image with tap to open full map
```

### **Step 5: Include Code Examples**
For complex conversions, provide complete code snippets:
```tsx
// RN: Full implementation:
// <Pressable onPress={onPress}>
//   <View style={styles.container}>
//     <Text>{title}</Text>
//   </View>
// </Pressable>
```

---

## 📖 Common Conversion Patterns

### **DIV → VIEW**
```tsx
// RN: <View style={styles.container}>
<div className="container">
```

### **IMG → IMAGE/FASTIMAGE**
```tsx
// RN: <FastImage source={{ uri: imageUrl }} style={styles.image} />
<img src={imageUrl} alt="description" />
```

### **BUTTON/ONCLICK → PRESSABLE/ONPRESS**
```tsx
// RN: <Pressable onPress={handlePress}><Text>Click</Text></Pressable>
<button onClick={handlePress}>Click</button>
```

### **CSS GRADIENTS → LINEARGRADIENT**
```tsx
// RN: import { LinearGradient } from 'expo-linear-gradient';
// RN: <LinearGradient colors={['#FF0000', '#0000FF']} style={styles.gradient}>
<div style={{ background: 'linear-gradient(to right, red, blue)' }}>
```

### **BACKDROP-BLUR → BLURVIEW**
```tsx
// RN: import { BlurView } from 'expo-blur';
// RN: <BlurView intensity={80} tint="dark" style={styles.blur}>
<div className="backdrop-blur-md">
```

### **HOVER → ONPRESSIN/ONPRESSOUT**
```tsx
// RN: <Pressable onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)}>
<div className="hover:scale-105">
```

### **FRAMER MOTION → REANIMATED**
```tsx
// RN: import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
// RN: const animatedStyle = useAnimatedStyle(() => ({ opacity: withSpring(visible ? 1 : 0) }));
// RN: <Animated.View style={animatedStyle}>
<motion.div animate={{ opacity: visible ? 1 : 0 }}>
```

### **RECHARTS → VICTORY-NATIVE**
```tsx
// RN: import { VictoryLine, VictoryChart } from 'victory-native';
// RN: <VictoryChart><VictoryLine data={data} /></VictoryChart>
<LineChart data={data}>
  <Line dataKey="value" />
</LineChart>
```

---

## ✅ Quality Standards

### **Good Inline Annotation:**
```tsx
// RN: Use Pressable with scale animation
// RN: <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
<div className="cursor-pointer hover:scale-105" onClick={onPress}>
```

### **Better Inline Annotation:**
```tsx
// RN: Use Pressable with scale animation and haptic feedback
// RN: const handlePress = async () => {
// RN:   await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// RN:   onPress?.();
// RN: };
// RN: <Pressable onPress={handlePress} style={({ pressed }) => [styles.card, { transform: [{ scale: pressed ? 0.95 : 1 }] }]}>
<div className="cursor-pointer hover:scale-105" onClick={onPress}>
```

---

## 📝 Annotation Checklist

When adding inline annotations, ensure:

- [ ] All imports have RN equivalents noted
- [ ] All HTML elements have RN component replacements
- [ ] All className usages show StyleSheet equivalent
- [ ] All inline styles show property changes (string → number, etc.)
- [ ] All event handlers show RN equivalents
- [ ] All animations show Reanimated conversion
- [ ] All third-party libraries show RN alternatives
- [ ] Complex patterns have full code examples
- [ ] StyleSheet example provided at end of file

---

## 🎓 Learning Resources

For developers unfamiliar with React Native:

1. **Read inline annotations** - They provide context-specific guidance
2. **Compare web vs RN** - Side-by-side comparison helps learning
3. **Copy and modify** - Use inline examples as starting points
4. **Test incrementally** - Convert one component at a time

---

## 🚀 Next Steps

1. **Review PropertyCard.tsx** - See complete inline annotation example
2. **Apply to other components** - Use same pattern
3. **Reference this guide** - When adding new annotations
4. **Keep consistent** - Always use `// RN:` prefix

---

**Remember: The goal is to make React Native conversion as easy as possible for developers by providing contextual, actionable guidance exactly where it's needed in the code.**

---

**Last Updated:** November 7, 2025  
**Pattern Established:** PropertyCard.tsx  
**Status:** ✅ Ready to Apply to All Files
