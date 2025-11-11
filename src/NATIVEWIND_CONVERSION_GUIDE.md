# 🎨 NATIVEWIND CONVERSION GUIDE

**PolicyAngel - React Native with NativeWind**  
**Date:** Saturday, November 8, 2025

---

## 🚀 OVERVIEW

**GREAT NEWS:** You're using NativeWind! This means:
- ✅ Keep 80-90% of your Tailwind classes as-is
- ✅ No need for manual StyleSheet conversions
- ✅ Same developer experience as web
- ✅ Much faster conversion process

**However**, there are important differences and limitations to be aware of.

---

## 📦 INSTALLATION & SETUP

### 1. Install NativeWind v4
```bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
```

### 2. Create tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // PolicyAngel Design System Colors
        'pa-gold': '#D4AF37',
        'pa-dark': '#0a0a0a',
        'pa-dark-lighter': '#1a1a1a',
        'pa-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        // Add your custom fonts here
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 3. Create global.css (NativeWind v4 requires this)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Update babel.config.js
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin', // Must be last
    ],
  };
};
```

### 5. Create nativewind-env.d.ts (TypeScript)
```typescript
/// <reference types="nativewind/types" />
```

---

## ✅ WHAT WORKS IN NATIVEWIND

### Layout & Flexbox (100% Compatible)
```tsx
// All these work perfectly!
<View className="flex flex-row justify-between items-center">
<View className="absolute top-0 left-0 right-0">
<View className="w-full h-full">
<View className="gap-4 p-4">
```

### Sizing (95% Compatible)
```tsx
// Works
<View className="w-full h-screen">
<View className="w-1/2 h-24">
<View className="min-w-0 max-w-md">

// Doesn't work (use specific values)
<View className="w-screen"> // ❌ No viewport units
<View className="h-dvh">    // ❌ No dynamic viewport
```

### Spacing (100% Compatible)
```tsx
// All work perfectly!
<View className="p-4 px-6 py-8">
<View className="m-4 mt-2 mb-6">
<View className="gap-2 gap-x-4">
<View className="space-y-4"> // ⚠️ Limited support, use gap instead
```

### Colors (100% Compatible)
```tsx
// All work!
<View className="bg-black text-white">
<View className="bg-pa-gold"> // Custom colors from config
<View className="bg-black/50"> // Opacity works!
```

### Typography (80% Compatible)
```tsx
// Works
<Text className="text-lg font-bold text-center">

// Partially works
<Text className="text-2xl"> // ✅ Works
<Text className="leading-6"> // ✅ Works
<Text className="tracking-wide"> // ⚠️ Limited support

// Doesn't work
<Text className="font-sans"> // ❌ Must use style prop with fontFamily
<Text className="truncate"> // ❌ Use numberOfLines prop instead
```

### Borders (90% Compatible)
```tsx
// Works
<View className="border border-white/10 rounded-lg">
<View className="border-2 border-t-4">

// Partial support
<View className="rounded-tl-lg"> // ⚠️ Individual corners have limited support
```

### Shadows (50% Compatible - Platform Specific)
```tsx
// iOS: Works with shadow utilities
<View className="shadow-lg shadow-black">

// Android: Must use elevation
<View style={{ elevation: 8 }} className="...">

// Best practice: Create shadow components
const Shadow = styled(View, 'shadow-lg');
```

---

## ❌ WHAT DOESN'T WORK IN NATIVEWIND

### 1. Pseudo-Classes & States
```tsx
// ❌ These don't work on mobile
className="hover:bg-gold"
className="focus:border-blue"
className="active:scale-95"
className="group-hover:opacity-100"

// ✅ Use Pressable with state instead
import { Pressable } from 'react-native';

<Pressable
  className={`p-4 rounded-lg ${pressed ? 'bg-pa-gold' : 'bg-transparent'}`}
>
  {({ pressed }) => (
    <Text className={pressed ? 'text-black' : 'text-white'}>
      Press Me
    </Text>
  )}
</Pressable>
```

### 2. CSS Properties Not in RN
```tsx
// ❌ Don't work
className="backdrop-blur-lg"    // Use BlurView component
className="mix-blend-multiply"  // Not supported
className="cursor-pointer"      // No mouse on mobile
className="select-none"         // Not supported
className="appearance-none"     // Not supported
className="outline-none"        // Not supported
```

### 3. Gradient Backgrounds
```tsx
// ❌ Doesn't work
className="bg-gradient-to-r from-black to-gold"

// ✅ Use LinearGradient
import LinearGradient from 'expo-linear-gradient';

<LinearGradient
  colors={['#000000', '#D4AF37']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  className="flex-1 p-4" // NativeWind classes still work on LinearGradient!
>
```

### 4. Text Truncation
```tsx
// ❌ Doesn't work
className="truncate line-clamp-2"

// ✅ Use numberOfLines prop
<Text className="text-base" numberOfLines={2} ellipsizeMode="tail">
  Long text here...
</Text>
```

### 5. Transforms (Partial Support)
```tsx
// ⚠️ Some work, some don't
className="scale-110"        // ✅ Works
className="rotate-45"        // ✅ Works
className="translate-x-4"    // ✅ Works
className="skew-y-3"         // ❌ Doesn't work
className="origin-center"    // ❌ Doesn't work
```

---

## 🎯 NATIVEWIND BEST PRACTICES FOR POLICYANGEL

### 1. Use `styled()` for Complex Components
```tsx
import { styled } from 'nativewind';

// Wrap native components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

// Wrap custom components
const StyledLinearGradient = styled(LinearGradient);
const StyledBlurView = styled(BlurView);

// Usage
<StyledBlurView 
  intensity={20} 
  className="absolute inset-0 bg-black/30"
/>
```

### 2. Handle Interactive States
```tsx
// Create reusable button component
import { Pressable, Text } from 'react-native';

function GoldButton({ children, onPress, className = '' }) {
  return (
    <Pressable
      onPress={onPress}
      className={({ pressed }) => 
        `px-6 py-3 rounded-lg ${
          pressed 
            ? 'bg-pa-gold/80 scale-95' 
            : 'bg-pa-gold'
        } ${className}`
      }
    >
      <Text className="text-black font-semibold text-center">
        {children}
      </Text>
    </Pressable>
  );
}
```

### 3. Platform-Specific Styling
```tsx
import { Platform } from 'react-native';

<View className={`
  p-4 rounded-lg bg-black/30
  ${Platform.OS === 'ios' ? 'shadow-lg' : ''}
`}
style={Platform.OS === 'android' ? { elevation: 8 } : {}}
>
```

### 4. Glassmorphism Effect
```tsx
import { BlurView } from 'expo-blur';
import { styled } from 'nativewind';

const StyledBlurView = styled(BlurView);

<StyledBlurView
  intensity={20}
  tint="dark"
  className="absolute inset-0 border border-white/10 rounded-2xl overflow-hidden"
>
  <View className="bg-black/30 p-4">
    {/* Content */}
  </View>
</StyledBlurView>
```

### 5. Safe Area Handling
```tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);

<StyledSafeAreaView className="flex-1 bg-pa-dark">
  {/* Content automatically respects safe areas */}
</StyledSafeAreaView>
```

---

## 🔄 CONVERSION EXAMPLES

### Before (Web Tailwind)
```tsx
<div className="flex flex-col gap-4 p-6 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10">
  <h2 className="text-2xl font-bold text-white">Title</h2>
  <p className="text-base text-white/60 line-clamp-2">Description</p>
  <button className="px-4 py-2 bg-pa-gold rounded-lg hover:bg-pa-gold/80 active:scale-95">
    Click Me
  </button>
</div>
```

### After (React Native + NativeWind)
```tsx
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { styled } from 'nativewind';

const StyledBlurView = styled(BlurView);

<StyledBlurView
  intensity={20}
  tint="dark"
  className="rounded-2xl border border-white/10 overflow-hidden"
>
  <View className="flex flex-col gap-4 p-6 bg-black/30">
    <Text className="text-2xl font-bold text-white">Title</Text>
    <Text className="text-base text-white/60" numberOfLines={2}>
      Description
    </Text>
    <Pressable
      className={({ pressed }) => `
        px-4 py-2 bg-pa-gold rounded-lg
        ${pressed ? 'opacity-80' : 'opacity-100'}
      `}
    >
      <Text className="text-black font-semibold text-center">Click Me</Text>
    </Pressable>
  </View>
</StyledBlurView>
```

---

## 🎨 POLICYANGEL DESIGN SYSTEM IN NATIVEWIND

### Colors (tailwind.config.js)
```js
theme: {
  extend: {
    colors: {
      // Primary Colors
      'pa-gold': '#D4AF37',
      'pa-gold-light': '#E5C158',
      'pa-gold-dark': '#B89430',
      
      // Background Colors
      'pa-dark': '#0a0a0a',
      'pa-dark-lighter': '#1a1a1a',
      'pa-dark-card': 'rgba(0, 0, 0, 0.3)',
      
      // Border & Overlay
      'pa-border': 'rgba(255, 255, 255, 0.1)',
      'pa-overlay': 'rgba(0, 0, 0, 0.5)',
      
      // Text Colors
      'pa-text-primary': '#ffffff',
      'pa-text-secondary': 'rgba(255, 255, 255, 0.6)',
      'pa-text-tertiary': 'rgba(255, 255, 255, 0.4)',
    },
  },
}
```

### Usage in Components
```tsx
<View className="bg-pa-dark">
  <View className="border border-pa-border bg-pa-dark-card rounded-2xl p-4">
    <Text className="text-pa-text-primary text-xl font-bold">
      Property Details
    </Text>
    <Text className="text-pa-text-secondary text-base mt-2">
      123 Main Street, San Francisco
    </Text>
  </View>
</View>
```

### Spacing System (Based on your globals.css)
```js
theme: {
  extend: {
    spacing: {
      // Match your CSS variables
      '18': '4.5rem',  // 72px
      '22': '5.5rem',  // 88px
      // Add custom spacing as needed
    },
  },
}
```

---

## 🚨 COMMON GOTCHAS & SOLUTIONS

### 1. Text Must Be in <Text> Component
```tsx
// ❌ Doesn't work
<View>Hello World</View>

// ✅ Works
<View><Text>Hello World</Text></View>
```

### 2. Images Need Source Prop
```tsx
// ❌ Doesn't work
<img src="..." className="w-24 h-24" />

// ✅ Works
import { Image } from 'react-native';
<Image source={{ uri: '...' }} className="w-24 h-24" />

// ✅ Better: Use expo-image
import { Image } from 'expo-image';
<Image source={{ uri: '...' }} className="w-24 h-24" />
```

### 3. ScrollView vs View
```tsx
// If content might overflow, use ScrollView
import { ScrollView } from 'react-native';

<ScrollView className="flex-1 bg-pa-dark">
  {/* Long content */}
</ScrollView>
```

### 4. Font Families
```tsx
// ❌ Tailwind font utilities don't work well
<Text className="font-sans">

// ✅ Use style prop for fonts
<Text className="text-lg" style={{ fontFamily: 'Inter-Bold' }}>

// Or create text variants
const BoldText = styled(Text, 'text-lg', {
  props: { style: { fontFamily: 'Inter-Bold' } }
});
```

### 5. Percentage Heights
```tsx
// ⚠️ Be careful with percentage heights
// Parent must have defined height

<View className="h-screen"> {/* Defined height */}
  <View className="h-1/2"> {/* This works */}
    
  </View>
</View>
```

---

## 📱 PLATFORM-SPECIFIC STYLES

### Method 1: Platform Module
```tsx
import { Platform } from 'react-native';

<View className={`
  p-4 rounded-lg
  ${Platform.OS === 'ios' ? 'shadow-lg' : ''}
`}
style={Platform.OS === 'android' ? { elevation: 8 } : {}}
>
```

### Method 2: Platform.select()
```tsx
<View 
  className="p-4"
  style={Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
    android: { elevation: 8 },
  })}
>
```

---

## 🎯 MIGRATION CHECKLIST

For each component, check:

- [ ] Replace `div` → `View`
- [ ] Replace `button` → `Pressable` or `TouchableOpacity`
- [ ] Replace `p`, `h1`, `span` → `Text`
- [ ] Replace `img` → `Image` from expo-image
- [ ] Remove `hover:`, `focus:`, `active:` classes
- [ ] Replace with Pressable state
- [ ] Convert `backdrop-blur` → `BlurView`
- [ ] Convert `bg-gradient` → `LinearGradient`
- [ ] Add `numberOfLines` for text truncation
- [ ] Add `style` prop for platform-specific shadows
- [ ] Wrap components with `styled()` if needed
- [ ] Test on both iOS and Android

---

## 📦 REQUIRED PACKAGES FOR NATIVEWIND

```bash
# Core
npm install nativewind
npm install --save-dev tailwindcss@3.3.2

# Recommended for PolicyAngel
npm install expo-linear-gradient  # Gradients
npm install expo-blur             # Glassmorphism
npm install expo-image            # Better image performance
npm install react-native-safe-area-context  # Safe areas

# Gestures & Animation
npm install react-native-gesture-handler
npm install react-native-reanimated
```

---

## 🎨 EXAMPLE: Complete PolicyAngel Card Component

```tsx
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import LinearGradient from 'expo-linear-gradient';
import { styled } from 'nativewind';
import { Building2 } from 'lucide-react-native';

const StyledBlurView = styled(BlurView);
const StyledLinearGradient = styled(LinearGradient);

export function PropertyCard({ property, onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <StyledBlurView
          intensity={20}
          tint="dark"
          className={`
            rounded-2xl border border-pa-border overflow-hidden
            ${pressed ? 'scale-95' : 'scale-100'}
          `}
        >
          {/* Gradient Overlay */}
          <StyledLinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
            className="absolute inset-0"
          />
          
          {/* Content */}
          <View className="p-6 gap-4">
            {/* Header */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 bg-pa-gold/20 rounded-full items-center justify-center">
                  <Building2 size={20} color="#D4AF37" />
                </View>
                <View>
                  <Text className="text-pa-text-primary text-lg font-bold">
                    {property.address}
                  </Text>
                  <Text className="text-pa-text-secondary text-sm">
                    {property.type}
                  </Text>
                </View>
              </View>
            </View>
            
            {/* Stats */}
            <View className="flex-row gap-4">
              {property.stats.map((stat, i) => (
                <View key={i} className="flex-1">
                  <Text className="text-pa-text-tertiary text-xs">
                    {stat.label}
                  </Text>
                  <Text className="text-pa-text-primary text-base font-semibold mt-1">
                    {stat.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </StyledBlurView>
      )}
    </Pressable>
  );
}
```

---

## 🚀 NEXT STEPS

1. **Setup NativeWind** following installation steps above
2. **Update annotations** - Most StyleSheet conversions are now simpler
3. **Focus on these areas**:
   - Converting pseudo-classes to Pressable states
   - Replacing backdrop-blur with BlurView
   - Replacing gradients with LinearGradient
   - Adding platform-specific shadows
   - Handling text truncation
4. **Test extensively** on both iOS and Android
5. **Create reusable components** for common patterns

---

**With NativeWind, your PolicyAngel conversion will be 3-4x faster! 🚀**

Most of your existing Tailwind classes can stay, you just need to handle the edge cases documented above.
