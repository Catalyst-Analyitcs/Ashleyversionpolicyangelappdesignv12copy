# 🚀 Quick Start Guide - React Native Conversion

## For Developers Starting the PolicyAngel RN Conversion

---

## 📚 **Step 1: Read Documentation (30 minutes)**

### **Essential Reading Order:**
1. **Start Here:** `/COMPLETE_ANNOTATION_SUMMARY.md` (5 min)
2. **Then Read:** `/REACT_NATIVE_CONVERSION_GUIDE.md` (10 min)
3. **Review:** `/COMPLETE_CONVERSION_EXAMPLE.md` (10 min)
4. **Reference:** `/BACKEND_DATA_REQUIREMENTS.md` (5 min - skim)

### **When You Need Specific Info:**
- **Individual screen conversions** → Check `/screens/[ScreenName].tsx` top comments
- **Component patterns** → Check `/components/[ComponentName].tsx` top comments
- **API specs** → `/BACKEND_DATA_REQUIREMENTS.md`

---

## 🛠️ **Step 2: Environment Setup (2 hours)**

### **Option A: Expo (Recommended for beginners)**

```bash
# Install Expo CLI
npm install -g expo-cli

# Create new project
npx create-expo-app PolicyAngelRN --template blank-typescript

cd PolicyAngelRN

# Install core dependencies
npx expo install react-native-reanimated react-native-gesture-handler
npx expo install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer
npx expo install react-native-screens react-native-safe-area-context
npx expo install @tanstack/react-query
npx expo install zustand
npx expo install expo-linear-gradient expo-blur
npx expo install nativewind tailwindcss

# Setup Tailwind (NativeWind)
npx tailwindcss init
```

### **Option B: React Native CLI (More control)**

```bash
npx react-native init PolicyAngelRN --template react-native-template-typescript

cd PolicyAngelRN

# Install dependencies (same as above, without 'expo install')
npm install react-native-reanimated react-native-gesture-handler
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer
npm install react-native-screens react-native-safe-area-context
npm install @tanstack/react-query
npm install zustand

# Additional native linking required for some libraries
cd ios && pod install && cd ..
```

---

## 📦 **Step 3: Install Additional Libraries (1 hour)**

### **By Feature Category:**

```bash
# Charts & Visualization
npm install victory-native react-native-svg
npm install react-native-maps
npm install react-native-chart-kit

# Camera & Media
npm install react-native-vision-camera
npm install expo-image-picker
npm install react-native-image-viewing
npm install react-native-fast-image

# Documents & Files
npm install react-native-document-picker
npm install react-native-pdf
npm install expo-file-system

# Forms & Input
npm install react-hook-form
npm install react-native-calendars
npm install @react-native-picker/picker

# Animations
# react-native-reanimated already installed

# Utilities
npm install date-fns # or dayjs
npm install axios
npm install @react-native-async-storage/async-storage
npm install expo-secure-store

# Notifications
npm install expo-notifications

# Location
npm install expo-location

# Bottom Sheets
npm install @gorhom/bottom-sheet
```

---

## 🏗️ **Step 4: Project Structure (30 minutes)**

### **Create This Folder Structure:**

```
PolicyAngelRN/
├── src/
│   ├── screens/              # All screen components
│   │   ├── WeatherScreen.tsx
│   │   ├── PropertiesScreen.tsx
│   │   └── ...
│   ├── components/           # Reusable components
│   │   ├── ui/              # Basic UI components
│   │   ├── TrendCard.tsx
│   │   ├── PropertyCard.tsx
│   │   └── ...
│   ├── navigation/          # Navigation setup
│   │   ├── RootNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── DrawerNavigator.tsx
│   ├── stores/              # Zustand stores
│   │   ├── usePropertyStore.ts
│   │   ├── useWeatherStore.ts
│   │   └── useAuthStore.ts
│   ├── api/                 # API client
│   │   ├── client.ts
│   │   ├── weather.ts
│   │   ├── properties.ts
│   │   └── ...
│   ├── hooks/               # Custom hooks
│   │   ├── useWeatherData.ts
│   │   └── ...
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── constants/           # App constants
│   │   ├── colors.ts
│   │   └── spacing.ts
│   └── utils/               # Utility functions
│       └── helpers.ts
├── assets/                  # Images, fonts, etc.
├── App.tsx                  # Root component
└── package.json
```

---

## 🎨 **Step 5: Design System Setup (1 hour)**

### **Copy Design Tokens from `/styles/globals.css`:**

Create `src/constants/theme.ts`:

```typescript
export const colors = {
  // From your globals.css
  primary: '#1e3a5f',
  secondary: '#d4af37',
  background: '#0f1c2e',
  card: 'rgba(30, 41, 59, 0.8)',
  // ... add all CSS variables
};

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // ... more shadow definitions
};
```

---

## 🧭 **Step 6: Navigation Setup (1 hour)**

### **Create `src/navigation/RootNavigator.tsx`:**

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigator } from './MainTabNavigator';

const Stack = createStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### **Create `src/navigation/MainTabNavigator.tsx`:**

```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WeatherScreen } from '../screens/WeatherScreen';
import { PropertiesScreen } from '../screens/PropertiesScreen';
// ... import other screens

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Properties" component={PropertiesScreen} />
      {/* Add other tabs */}
    </Tab.Navigator>
  );
}
```

---

## 🔧 **Step 7: API Client Setup (30 minutes)**

### **Create `src/api/client.ts`:**

```typescript
import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const apiClient = axios.create({
  baseURL: 'https://api.policyangel.com', // Your API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = '...'; // Get from auth store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});
```

---

## 💾 **Step 8: Setup Zustand Stores (30 minutes)**

### **Create `src/stores/usePropertyStore.ts`:**

```typescript
import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PropertyStore {
  selectedProperty: any | null;
  properties: any[];
  setSelectedProperty: (property: any) => void;
  setProperties: (properties: any[]) => void;
}

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set) => ({
      selectedProperty: null,
      properties: [],
      setSelectedProperty: (property) => set({ selectedProperty: property }),
      setProperties: (properties) => set({ properties }),
    }),
    {
      name: 'property-storage',
      getStorage: () => AsyncStorage,
    }
  )
);
```

---

## 📱 **Step 9: Create Your First Screen (1 hour)**

### **Start with PropertiesScreen (simpler than WeatherScreen):**

Create `src/screens/PropertiesScreen.tsx`:

```typescript
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { PropertyCard } from '../components/PropertyCard';
import { apiClient } from '../api/client';

export function PropertiesScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await apiClient.get('/properties');
      return response.data;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <PropertyCard property={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1c2e',
  },
});
```

---

## ✅ **Step 10: First Run (15 minutes)**

### **Run on iOS Simulator:**
```bash
# Expo
npx expo start
# Press 'i' for iOS

# React Native CLI
npm run ios
```

### **Run on Android Emulator:**
```bash
# Expo
npx expo start
# Press 'a' for Android

# React Native CLI
npm run android
```

---

## 🎯 **Implementation Priority**

### **Week 1-2: Core Setup**
1. ✅ PropertiesScreen (start simple)
2. ✅ PropertyCard component
3. ✅ Basic navigation
4. ✅ API integration
5. ✅ Property selection

### **Week 3-4: Weather & Main Features**
6. ✅ WeatherScreen (complex charts)
7. ✅ TrendCard component
8. ✅ Weather API integration
9. ✅ PropertyDetailsScreen
10. ✅ CalendarScreen

### **Week 5-6: Advanced Features**
11. ✅ GrantsScreen (most complex)
12. ✅ DocumentsScreen
13. ✅ PhotoCaptureScreen
14. ✅ GalleryScreen
15. ✅ DamageAssessmentScreen

---

## 🆘 **Common Issues & Solutions**

### **Issue: Metro bundler won't start**
```bash
# Clear cache
npx expo start --clear
# or
npx react-native start --reset-cache
```

### **Issue: Native modules not found**
```bash
# iOS
cd ios && pod install && cd ..
npm run ios

# Android
cd android && ./gradlew clean && cd ..
npm run android
```

### **Issue: TypeScript errors**
```bash
# Install type definitions
npm install --save-dev @types/react @types/react-native
```

---

## 📖 **Resources**

### **Documentation:**
- React Native: https://reactnative.dev/docs/getting-started
- React Navigation: https://reactnavigation.org/docs/getting-started
- TanStack Query: https://tanstack.com/query/latest/docs/react/overview
- Reanimated: https://docs.swmansion.com/react-native-reanimated/

### **Your Project Docs:**
- See `/REACT_NATIVE_CONVERSION_GUIDE.md` for detailed patterns
- See `/COMPLETE_CONVERSION_EXAMPLE.md` for code examples
- See individual screen files for specific conversion notes

---

## 🎓 **Learning Path**

### **If You're New to React Native:**
1. Complete React Native tutorial: https://reactnative.dev/docs/tutorial
2. Study React Navigation docs
3. Learn react-native-reanimated basics
4. Then start with PropertiesScreen

### **If You're Experienced:**
1. Setup project structure
2. Start with WeatherScreen (most complex)
3. Use annotations as spec
4. Build incrementally

---

## 📞 **Getting Help**

### **Where to Look:**
1. **Screen-specific questions:** Check annotation at top of screen file
2. **Component questions:** Check annotation at top of component file
3. **API questions:** See `/BACKEND_DATA_REQUIREMENTS.md`
4. **Pattern questions:** See `/COMPLETE_CONVERSION_EXAMPLE.md`
5. **General questions:** See `/REACT_NATIVE_CONVERSION_GUIDE.md`

---

## ✨ **Final Checklist Before You Start**

- [ ] Read COMPLETE_ANNOTATION_SUMMARY.md
- [ ] Read REACT_NATIVE_CONVERSION_GUIDE.md
- [ ] Environment setup complete
- [ ] All dependencies installed
- [ ] Project structure created
- [ ] Design tokens configured
- [ ] Navigation setup
- [ ] API client configured
- [ ] Zustand stores created
- [ ] First screen compiling
- [ ] App runs on simulator/emulator

---

## 🚀 **Ready to Start!**

You're now ready to begin the React Native conversion of PolicyAngel!

**Remember:**
- Use the annotations in each file as your specification
- Start simple (PropertiesScreen) before complex (WeatherScreen, GrantsScreen)
- Test on both iOS and Android regularly
- Refer to documentation when stuck
- Follow the implementation roadmap in ANNOTATION_COMPLETION_STATUS.md

**Good luck! 🎉**

---

**Quick Reference:**
- Annotations: Top of each screen/component file
- Examples: `/COMPLETE_CONVERSION_EXAMPLE.md`
- APIs: `/BACKEND_DATA_REQUIREMENTS.md`
- Guide: `/REACT_NATIVE_CONVERSION_GUIDE.md`
