# 🚀 PolicyAngel Developer Quick Start Guide

**Last Updated**: November 9, 2025  
**For**: React Native Development Team  
**Estimated Setup Time**: 2-3 hours

---

## ⚡ Fast Track: Get Started in 3 Steps

### **Step 1: Initialize Project** (30 minutes)

```bash
# Create new Expo project
npx create-expo-app PolicyAngel --template blank-typescript
cd PolicyAngel

# Install all dependencies at once
npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated @tanstack/react-query zustand @react-native-async-storage/async-storage nativewind tailwindcss expo-linear-gradient @react-native-community/blur react-native-vector-icons react-native-maps victory-native expo-image
```

### **Step 2: Configure NativeWind** (15 minutes)

```bash
# Create tailwind.config.js
npx tailwindcss init
```

**tailwind.config.js**:
```js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'pa-gold': '#D4AF37',
        'pa-dark': '#18181B',
      }
    }
  },
  plugins: [],
}
```

**babel.config.js**:
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
```

### **Step 3: Create First Screen** (1-2 hours)

Copy `/screens/EmailEntryScreen.tsx` and convert using annotations:

```tsx
// Start here - simplest screen to convert
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function EmailEntryScreen() {
  // Follow annotations in original file
  // See lines 9-77 for detailed NativeWind conversion guide
}
```

---

## 📁 File Structure Reference

### **What to Convert First**

```
Priority 1 (Week 1):
├── /navigation/
│   ├── RootNavigator.tsx      ← See App.tsx lines 136-186
│   ├── TabNavigator.tsx        ← See App.tsx lines 241-313
│   └── types.ts                ← See App.tsx lines 350-407
│
├── /screens/
│   └── EmailEntryScreen.tsx    ← Entry point, simplest conversion
│
└── /stores/
    └── usePropertyStore.ts     ← See PropertyContext.tsx lines 23-38

Priority 2 (Week 2):
├── /screens/
│   ├── LuxuryDashboard.tsx     ← Main home screen
│   ├── PropertiesScreen.tsx    ← Property list
│   └── PropertyDetailsScreen.tsx
│
└── /components/
    ├── LiquidGlassHeader.tsx
    └── MapView.tsx

Priority 3 (Weeks 3-4):
└── /screens/
    ├── AngelFunctionsScreen.tsx  ← AI chat with flip cards
    ├── WeatherScreen.tsx          ← Weather dashboard
    └── [All other screens]
```

---

## 🎯 Key Conversion Patterns

### **1. Basic Layout Conversion**

**Before (Web)**:
```tsx
<div className="flex flex-col gap-4 p-6">
  <h1 className="text-2xl font-bold text-white">Title</h1>
  <p className="text-white/60">Description</p>
</div>
```

**After (React Native + NativeWind)**:
```tsx
<View className="flex flex-col gap-4 p-6">
  <Text className="text-2xl font-bold text-white">Title</Text>
  <Text className="text-white/60">Description</Text>
</View>
```

✅ **90% of Tailwind classes work as-is with NativeWind!**

---

### **2. Interactive Elements**

**Before (Web)**:
```tsx
<button 
  className="bg-pa-gold rounded-xl px-6 py-3 hover:bg-pa-gold/80"
  onClick={handlePress}
>
  Submit
</button>
```

**After (React Native + NativeWind)**:
```tsx
<Pressable 
  className={({ pressed }) => `
    bg-pa-gold rounded-xl px-6 py-3
    ${pressed ? 'bg-pa-gold/80' : ''}
  `}
  onPress={handlePress}
>
  <Text className="text-black font-semibold">Submit</Text>
</Pressable>
```

---

### **3. Scrollable Content**

**Before (Web)**:
```tsx
<div className="overflow-y-auto h-screen">
  {/* Content */}
</div>
```

**After (React Native)**:
```tsx
<ScrollView 
  className="flex-1"
  showsVerticalScrollIndicator={false}
>
  {/* Content */}
</ScrollView>
```

---

### **4. State Management**

**Before (Context)**:
```tsx
// PropertyContext.tsx
const PropertyContext = createContext();
```

**After (Zustand)**:
```tsx
// stores/usePropertyStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const usePropertyStore = create(
  persist(
    (set) => ({
      selectedProperty: null,
      setSelectedProperty: (property) => set({ selectedProperty: property }),
    }),
    { name: 'property-storage' }
  )
);
```

---

### **5. API Integration**

**Before (Mock Data)**:
```tsx
const [data, setData] = useState(mockData);
```

**After (TanStack Query)**:
```tsx
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['properties'],
  queryFn: () => api.getProperties(),
});
```

---

## 🎨 Design System Quick Reference

### **Colors**
```tsx
// Primary branding
'#D4AF37' // pa-gold (golden)

// Backgrounds
'#18181B' // pa-dark (main dark)
'#27272A' // pa-surface

// Text
'#F9FAFB' // text-white
'rgba(255, 255, 255, 0.6)' // text-white/60
'rgba(255, 255, 255, 0.4)' // text-white/40
```

### **Spacing** (from globals.css)
```tsx
// Use these exact values
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px
--spacing-5: 20px
--spacing-6: 24px
--spacing-8: 32px
```

### **Border Radius**
```tsx
--radius-sm: 6px   // rounded-sm
--radius-md: 8px   // rounded-md
--radius-lg: 12px  // rounded-lg
--radius-xl: 16px  // rounded-xl
--radius-2xl: 20px // rounded-2xl
```

---

## 📚 Where to Find What

### **Conversion Examples**

| Need to convert... | Look at... | Lines |
|--------------------|------------|-------|
| Basic screen | `/screens/EmailEntryScreen.tsx` | 9-77 |
| Button component | `/components/ui/button.tsx` | 1-150 |
| Navigation setup | `/App.tsx` | 136-313 |
| State management | `/utils/PropertyContext.tsx` | 23-38 |
| API integration | `/screens/WeatherScreen.tsx` | 60-125 |
| Animations | `/screens/AngelFunctionsScreen.tsx` | 1780-2460 |
| Glassmorphism | `/components/LiquidGlassHeader.tsx` | Full file |
| Maps | `/components/MapView.tsx` | Full file |

### **Documentation**

| Topic | Document |
|-------|----------|
| Full RN architecture | `REACT_NATIVE_CONVERSION_GUIDE.md` |
| NativeWind guide | `NATIVEWIND_CONVERSION_GUIDE.md` |
| Backend APIs | `BACKEND_DATA_REQUIREMENTS.md` |
| Working example | `COMPLETE_CONVERSION_EXAMPLE.md` |
| Handoff checklist | `DEVELOPMENT_TEAM_HANDOFF_CHECKLIST.md` |

---

## 🛠️ Essential Tools

### **VS Code Extensions**
```bash
# Install these for best experience
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- React Native Tools
- TypeScript
```

### **Dev Dependencies**
```bash
npm install --save-dev @types/react @types/react-native typescript
```

### **Debugging**
```bash
# iOS
npm run ios

# Android
npm run android

# Web (for testing)
npm run web
```

---

## ⚠️ Common Pitfalls

### **1. Don't Use These Web-Only Features**
❌ `hover:` pseudo-classes
❌ `focus:` pseudo-classes  
❌ `::before`, `::after` pseudo-elements
❌ `localStorage` (use AsyncStorage instead)
❌ `window.scrollTo()` (use ScrollView ref)

### **2. Always Remember**
✅ Import from `react-native` not `react`
✅ Use `onPress` not `onClick`
✅ Use `TextInput` not `input`
✅ Wrap text in `<Text>` components
✅ Use `className` function for pressed states

### **3. Performance Tips**
✅ Use `React.memo` for list items
✅ Use `useCallback` for event handlers
✅ Use `FlatList` for long lists (not map)
✅ Optimize images with `expo-image`
✅ Use `Reanimated` for complex animations

---

## 🎯 First Week Goals

### **Day 1-2: Setup**
- [ ] Initialize Expo project
- [ ] Install all dependencies
- [ ] Configure NativeWind
- [ ] Set up navigation structure
- [ ] Create basic app shell

### **Day 3-4: Core Screens**
- [ ] Convert EmailEntryScreen
- [ ] Convert LuxuryDashboard (basic version)
- [ ] Implement PropertyStore (Zustand)
- [ ] Test navigation flow

### **Day 5: Shared Components**
- [ ] Convert LiquidGlassHeader
- [ ] Convert basic UI components
- [ ] Set up design system tokens
- [ ] Test on iOS and Android

---

## 📞 Quick Help

### **Stuck on Conversion?**
1. Find the component in original codebase
2. Read the annotations at the top of file
3. Look for `RN:` or `NATIVEWIND:` comments
4. Check the corresponding guide document

### **Need an Example?**
1. Search for similar component in codebase
2. Check `/COMPLETE_CONVERSION_EXAMPLE.md`
3. Look at shadcn button conversion (most comprehensive)

### **API Questions?**
1. See `/BACKEND_DATA_REQUIREMENTS.md`
2. All 80+ endpoints documented with schemas
3. TanStack Query patterns in WeatherScreen

---

## ✅ Ready to Start?

1. **Clone the web codebase** (reference)
2. **Create new RN project** (instructions above)
3. **Start with EmailEntryScreen** (easiest)
4. **Follow the annotations** (they're comprehensive!)
5. **Test frequently** (iOS and Android)

**You've got this! 🚀**

---

**Need More Help?**
- 📖 Full guides in root directory
- 💡 Inline annotations in every file
- 🎯 Working examples throughout
- ✅ Handoff checklist for tracking

**Happy Coding!** 🎉
