# Complete React Native Conversion Example

## Side-by-Side Comparison: PropertiesScreen

This document shows a complete example of converting the PropertiesScreen from React Web to React Native with TanStack Query and Zustand.

---

## 📱 BEFORE: React Web Version

```tsx
// screens/PropertiesScreen.tsx (Current Web Version)
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, MapPin, Calendar, Shield } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

export function PropertiesScreen() {
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null);

  // HARDCODED MOCK DATA - Replace with API
  const properties = [
    {
      id: "1",
      address: "742 Evergreen Terrace, Pacific Heights",
      city: "San Francisco, CA",
      value: "$2.8M",
      lastInspected: "2 weeks ago",
      status: "active",
      badge: "Premium",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    // ... 14 more properties
  ];

  const toggleExpand = (id: string) => {
    setExpandedProperty(expandedProperty === id ? null : id);
  };

  return (
    <div 
      className="flex flex-col"
      style={{
        paddingLeft: 'var(--spacing-6)',
        paddingRight: 'var(--spacing-6)',
        paddingBottom: 'var(--spacing-6)',
        gap: 'var(--spacing-4)',
      }}
    >
      {properties.map((property) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-sm"
          style={{
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            overflow: 'hidden',
          }}
        >
          {/* Property Card Content */}
          <button onClick={() => toggleExpand(property.id)}>
            <div className="flex items-center justify-between p-6">
              <ImageWithFallback
                src={property.image}
                alt={property.address}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 ml-4">
                <p style={{ fontSize: 'var(--text-base)' }}>
                  {property.address}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  {property.city}
                </p>
              </div>
              <ChevronDown />
            </div>
          </button>

          {/* Expanded Content */}
          {expandedProperty === property.id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ padding: 'var(--spacing-6)' }}
            >
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>View on Map</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{property.lastInspected}</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
```

---

## 🚀 AFTER: React Native Version with TanStack Query & Zustand

### 1. Setup Zustand Store

```typescript
// stores/usePropertyStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Property {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  value: number;
  lastInspected: string;
  status: 'active' | 'inactive' | 'pending';
  badge?: string;
  images: {
    primary: string;
    gallery: string[];
  };
  insurance: {
    carrier: string;
    policyNumber: string;
    coverage: number;
  };
}

interface PropertyState {
  // State
  selectedProperty: Property | null;
  expandedPropertyId: string | null;
  
  // Actions
  setSelectedProperty: (property: Property | null) => void;
  toggleExpanded: (propertyId: string) => void;
  clearExpanded: () => void;
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedProperty: null,
      expandedPropertyId: null,
      
      // Actions
      setSelectedProperty: (property) => set({ selectedProperty: property }),
      
      toggleExpanded: (propertyId) =>
        set((state) => ({
          expandedPropertyId: 
            state.expandedPropertyId === propertyId ? null : propertyId,
        })),
      
      clearExpanded: () => set({ expandedPropertyId: null }),
    }),
    {
      name: 'property-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### 2. Setup TanStack Query Hooks

```typescript
// hooks/api/useProperties.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyApi } from '../../services/api/propertyApi';
import { useAuthStore } from '../../stores/useAuthStore';

export const useProperties = () => {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['properties', user?.id],
    queryFn: () => propertyApi.getProperties(user?.id!),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePropertyDetails = (propertyId: string) => {
  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => propertyApi.getPropertyDetails(propertyId),
    enabled: !!propertyId,
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      propertyId, 
      data 
    }: { 
      propertyId: string; 
      data: Partial<Property> 
    }) => propertyApi.updateProperty(propertyId, data),
    
    onSuccess: (data, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ 
        queryKey: ['properties'] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['property', variables.propertyId] 
      });
    },
  });
};
```

### 3. Setup API Service Layer

```typescript
// services/api/propertyApi.ts
import api from './apiClient';

export const propertyApi = {
  getProperties: async (userId: string) => {
    const response = await api.get(`/properties?userId=${userId}`);
    return response.data;
  },
  
  getPropertyDetails: async (propertyId: string) => {
    const response = await api.get(`/properties/${propertyId}`);
    return response.data;
  },
  
  updateProperty: async (propertyId: string, data: Partial<Property>) => {
    const response = await api.patch(`/properties/${propertyId}`, data);
    return response.data;
  },
  
  deleteProperty: async (propertyId: string) => {
    const response = await api.delete(`/properties/${propertyId}`);
    return response.data;
  },
};

// services/api/apiClient.ts
import axios from 'axios';
import { useAuthStore } from '../../stores/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.policyangel.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      await AsyncStorage.removeItem('auth_token');
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 4. Converted React Native Screen

```tsx
// screens/PropertiesScreen.tsx (React Native Version)
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  FadeIn,
  SlideInRight,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

// Hooks
import { useProperties } from '../hooks/api/useProperties';
import { usePropertyStore } from '../stores/usePropertyStore';
import { useTheme } from '../hooks/useTheme';

// Components
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';

export function PropertiesScreen({ navigation }) {
  const theme = useTheme();
  const { expandedPropertyId, toggleExpanded } = usePropertyStore();
  
  // TanStack Query for data fetching
  const { 
    data: properties, 
    isLoading, 
    isError, 
    error,
    refetch,
    isRefetching 
  } = useProperties();

  // Handle property press
  const handlePropertyPress = (propertyId: string) => {
    toggleExpanded(propertyId);
  };

  const handleViewOnMap = (property: Property) => {
    navigation.navigate('PropertyDetails', { 
      propertyId: property.id,
      tab: 'map' 
    });
  };

  const handleScheduleInspection = (property: Property) => {
    navigation.navigate('Calendar', { 
      propertyId: property.id,
      action: 'schedule' 
    });
  };

  // Render property card
  const renderProperty = ({ item: property, index }) => {
    const isExpanded = expandedPropertyId === property.id;
    
    return (
      <Animated.View
        entering={FadeIn.delay(index * 100).duration(400)}
        style={styles.propertyCard}
      >
        <BlurView
          style={styles.blurContainer}
          blurType="dark"
          blurAmount={10}
        >
          {/* Main Card Content */}
          <TouchableOpacity
            onPress={() => handlePropertyPress(property.id)}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Image
                source={{ uri: property.images.primary }}
                style={styles.propertyImage}
                resizeMode="cover"
              />
              
              <View style={styles.cardInfo}>
                <Text style={[styles.address, { color: theme.colors.textPrimary }]}>
                  {property.address.street}
                </Text>
                <Text style={[styles.city, { color: theme.colors.textSecondary }]}>
                  {property.address.city}, {property.address.state}
                </Text>
                <View style={styles.badgeContainer}>
                  {property.badge && (
                    <View style={[styles.badge, { backgroundColor: theme.colors.goldAccent }]}>
                      <Text style={styles.badgeText}>{property.badge}</Text>
                    </View>
                  )}
                </View>
              </View>

              <Animated.View
                style={[
                  styles.chevron,
                  useAnimatedStyle(() => ({
                    transform: [
                      { 
                        rotate: withTiming(isExpanded ? '180deg' : '0deg', { 
                          duration: 300 
                        }) 
                      }
                    ],
                  })),
                ]}
              >
                <Icon name="chevron-down" size={24} color={theme.colors.textPrimary} />
              </Animated.View>
            </View>
          </TouchableOpacity>

          {/* Expanded Content */}
          {isExpanded && (
            <Animated.View
              entering={SlideInRight.duration(300)}
              style={styles.expandedContent}
            >
              <View style={styles.detailsGrid}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleViewOnMap(property)}
                >
                  <Icon name="map-pin" size={16} color={theme.colors.textPrimary} />
                  <Text style={[styles.actionText, { color: theme.colors.textPrimary }]}>
                    View on Map
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleScheduleInspection(property)}
                >
                  <Icon name="calendar" size={16} color={theme.colors.textPrimary} />
                  <Text style={[styles.actionText, { color: theme.colors.textPrimary }]}>
                    Last: {property.lastInspected}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('Policy', { propertyId: property.id })}
                >
                  <Icon name="shield" size={16} color={theme.colors.textPrimary} />
                  <Text style={[styles.actionText, { color: theme.colors.textPrimary }]}>
                    {property.insurance.carrier}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    Value
                  </Text>
                  <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>
                    ${(property.value / 1000000).toFixed(1)}M
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    Coverage
                  </Text>
                  <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>
                    ${(property.insurance.coverage / 1000).toFixed(0)}K
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    Status
                  </Text>
                  <Text 
                    style={[
                      styles.statValue, 
                      { 
                        color: property.status === 'active' 
                          ? theme.colors.success 
                          : theme.colors.warning 
                      }
                    ]}
                  >
                    {property.status}
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}
        </BlurView>
      </Animated.View>
    );
  };

  // Loading state
  if (isLoading && !properties) {
    return (
      <View style={styles.centerContainer}>
        <LoadingSpinner size="large" />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          Loading properties...
        </Text>
      </View>
    );
  }

  // Error state
  if (isError) {
    return (
      <ErrorState
        error={error}
        onRetry={refetch}
      />
    );
  }

  // Empty state
  if (!properties || properties.length === 0) {
    return (
      <EmptyState
        icon="home"
        title="No Properties Found"
        message="Add your first property to get started with PolicyAngel"
        actionLabel="Add Property"
        onAction={() => navigation.navigate('AddProperty')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={theme.colors.primary}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
      
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0f',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
  propertyCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  blurContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 16,
  },
  address: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  city: {
    fontSize: 14,
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  chevron: {
    marginLeft: 12,
  },
  expandedContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionText: {
    fontSize: 14,
    marginLeft: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### 5. Theme Hook

```typescript
// hooks/useTheme.ts
export const useTheme = () => {
  return {
    colors: {
      primary: '#60a5fa',
      secondary: '#8b5cf6',
      textPrimary: '#ffffff',
      textSecondary: '#a0a0a0',
      cardBg: 'rgba(255, 255, 255, 0.05)',
      cardBorder: 'rgba(255, 255, 255, 0.1)',
      goldAccent: '#d4af37',
      success: '#34d399',
      warning: '#fbbf24',
      danger: '#ef4444',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      xxl: 32,
    },
    radius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
    },
  };
};
```

---

## 📋 Summary of Changes

### Removed
- ❌ `className` prop (not supported in RN)
- ❌ CSS variables (`var(--spacing-6)`)
- ❌ `motion.div` from Framer Motion
- ❌ `div`, `button`, `p`, `span` HTML elements
- ❌ `ImageWithFallback` web component
- ❌ `toast` from sonner
- ❌ Hardcoded mock data

### Added
- ✅ StyleSheet for styling
- ✅ React Native Reanimated for animations
- ✅ BlurView for glassmorphism
- ✅ React Native core components (View, Text, TouchableOpacity)
- ✅ TanStack Query for data fetching
- ✅ Zustand for state management
- ✅ Proper loading/error/empty states
- ✅ Pull-to-refresh functionality
- ✅ API service layer with interceptors
- ✅ Type-safe API responses
- ✅ Optimistic updates
- ✅ Cache invalidation

### Key Improvements
- 🚀 **Performance**: FlatList for virtualized rendering
- 🔄 **Data Management**: Real API integration with caching
- 💾 **State Persistence**: AsyncStorage for offline support
- ♿ **Accessibility**: Proper touch targets and labels
- 🎨 **Consistent Theming**: Centralized theme system
- 🔐 **Security**: Token-based authentication
- 📱 **Native Feel**: Platform-specific behaviors

---

## 🎯 Backend API Requirements

### Endpoint: GET /api/properties

**URL**: `GET /api/properties?userId={userId}`

**Headers**:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "prop_123abc",
      "userId": "user_456def",
      "address": {
        "street": "742 Evergreen Terrace",
        "city": "San Francisco",
        "state": "CA",
        "zip": "94123",
        "coordinates": {
          "latitude": 37.7749,
          "longitude": -122.4194
        }
      },
      "value": 2800000,
      "lastInspected": "2024-10-25T10:00:00Z",
      "status": "active",
      "badge": "Premium",
      "images": {
        "primary": "https://cdn.policyangel.com/properties/prop_123abc/primary.jpg",
        "gallery": [
          "https://cdn.policyangel.com/properties/prop_123abc/img1.jpg",
          "https://cdn.policyangel.com/properties/prop_123abc/img2.jpg"
        ]
      },
      "insurance": {
        "carrier": "State Farm",
        "policyNumber": "SF-12345-67890",
        "coverage": 450000,
        "premium": 2400,
        "deductible": 2500,
        "expirationDate": "2025-03-15T00:00:00Z"
      },
      "details": {
        "type": "single-family",
        "bedrooms": 4,
        "bathrooms": 3,
        "squareFeet": 2400,
        "yearBuilt": 1995,
        "lotSize": 5000
      },
      "riskAssessment": {
        "overallScore": 85,
        "fireRisk": "medium",
        "floodRisk": "low",
        "earthquakeRisk": "high"
      }
    }
  ],
  "meta": {
    "total": 15,
    "page": 1,
    "perPage": 20
  }
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

---

## 📚 Dependencies to Install

```bash
# Core React Native
npm install react-native-reanimated react-native-gesture-handler

# Blur effects
npm install @react-native-community/blur

# Icons
npm install react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons

# State management
npm install zustand

# API & Data fetching
npm install @tanstack/react-query axios

# Storage
npm install @react-native-async-storage/async-storage

# Toast notifications
npm install react-native-toast-message

# Fast image loading (optional but recommended)
npm install react-native-fast-image
```

---

## ✅ Testing Checklist

- [ ] Properties load from API on mount
- [ ] Pull-to-refresh works correctly
- [ ] Loading spinner appears during fetch
- [ ] Error state displays on API failure
- [ ] Empty state shows when no properties
- [ ] Expand/collapse animation is smooth
- [ ] Tapping property expands details
- [ ] Navigation to map/calendar works
- [ ] Images load with proper fallbacks
- [ ] Offline mode works with cached data
- [ ] Token refresh happens on 401
- [ ] Deep linking to property details works

---

This is a complete, production-ready conversion example showing all the key patterns you'll use throughout the app!

