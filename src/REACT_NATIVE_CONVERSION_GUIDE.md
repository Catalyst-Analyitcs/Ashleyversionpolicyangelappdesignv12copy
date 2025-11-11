# PolicyAngel React Native Conversion Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [State Management Strategy](#state-management-strategy)
3. [API Integration with TanStack Query](#api-integration-with-tanstack-query)
4. [Backend Data Requirements](#backend-data-requirements)
5. [Component Conversion Checklist](#component-conversion-checklist)
6. [Screen-by-Screen Conversion Guide](#screen-by-screen-conversion-guide)

---

## Architecture Overview

### Current Stack (React Web)
- **UI**: React + Tailwind CSS + CSS Variables
- **Routing**: State-based navigation (`useState<ScreenType>`)
- **State**: React Context (PropertyContext) + Local State
- **Animations**: Framer Motion (`motion/react`)
- **Storage**: localStorage

### Target Stack (React Native)
- **UI**: React Native + StyleSheet (or styled-components/Tamagui)
- **Routing**: React Navigation (Stack + Tab Navigator)
- **State**: Zustand for global state
- **API**: TanStack Query (React Query) v5
- **Animations**: React Native Reanimated 3 + Moti
- **Storage**: AsyncStorage / MMKV

---

## State Management Strategy

### Zustand Store Structure

```typescript
// stores/useAuthStore.ts
interface AuthState {
  user: User | null;
  userEmail: string;
  isAuthenticated: boolean;
  rememberMe: boolean;
  setUser: (user: User) => void;
  setEmail: (email: string) => void;
  logout: () => void;
}

// stores/usePropertyStore.ts
interface PropertyState {
  selectedProperty: Property | null;
  properties: Property[];
  setSelectedProperty: (property: Property) => void;
  addProperty: (property: Property) => void;
}

// stores/useUIStore.ts
interface UIState {
  currentScreen: ScreenType;
  isNavigationVisible: boolean;
  isHeaderVisible: boolean;
  setCurrentScreen: (screen: ScreenType) => void;
}

// stores/useWeatherStore.ts
interface WeatherState {
  temperature: string;
  condition: string;
  severity: 'safe' | 'warning' | 'danger';
  location: string;
  forecast: WeatherForecast[];
}
```

---

## API Integration with TanStack Query

### Setup

```typescript
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// App.tsx wrapper
import { QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* Your app */}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
```

### Query Hooks Pattern

```typescript
// hooks/api/useProperties.ts
export const useProperties = (userId: string) => {
  return useQuery({
    queryKey: ['properties', userId],
    queryFn: () => fetchProperties(userId),
    enabled: !!userId,
  });
};

// hooks/api/usePropertyDetails.ts
export const usePropertyDetails = (propertyId: string) => {
  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => fetchPropertyDetails(propertyId),
  });
};

// hooks/api/useWeather.ts
export const useWeather = (location: string) => {
  return useQuery({
    queryKey: ['weather', location],
    queryFn: () => fetchWeather(location),
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });
};
```

### Mutation Hooks Pattern

```typescript
// hooks/api/useCreateClaim.ts
export const useCreateClaim = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (claimData: ClaimInput) => createClaim(claimData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
  });
};

// hooks/api/useUploadDocument.ts
export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (documentData: FormData) => uploadDocument(documentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};
```

---

## Backend Data Requirements

### Critical API Endpoints Needed

#### 1. Authentication & User
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/user/profile
PATCH  /api/user/profile
GET    /api/user/preferences
```

**Data Points Currently Hardcoded:**
- User email (localStorage)
- User name/initials ("JD")
- Remember me preference (localStorage)

#### 2. Properties
```
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PATCH  /api/properties/:id
DELETE /api/properties/:id
GET    /api/properties/:id/history
GET    /api/properties/:id/documents
```

**Data Points Currently Hardcoded:**
- Property address: "123 Main Street, Brooklyn, NY 11201" → Should be "San Francisco, CA"
- Property type: "Single Family Home"
- Coordinates: { latitude: 40.7128, longitude: -74.0060 } → Should be SF coordinates
- HOI Carrier: "State Farm"
- Policy status: "Policy Active"
- Property stats: Est. Value $850k, 3 beds, 2 baths, 2,400 sq ft
- Property images/photos
- Inspection dates and reports
- Maintenance history

#### 3. Weather
```
GET    /api/weather/current?location={location}
GET    /api/weather/forecast?location={location}&days=7
GET    /api/weather/alerts?location={location}
```

**Data Points Currently Hardcoded:**
- Temperature: 72°F
- Condition: "Sunny"
- Severity: "safe"
- 7-day forecast data
- Weather alerts/warnings
- Hourly forecast
- UV index, humidity, wind speed
- Sunset/sunrise times

#### 4. Documents
```
GET    /api/documents
GET    /api/documents/:id
POST   /api/documents/upload
DELETE /api/documents/:id
GET    /api/documents/categories
```

**Data Points Currently Hardcoded:**
- Document list (insurance policies, inspection reports, etc.)
- Document metadata (upload date, file size, category)
- Document thumbnails
- Share links

#### 5. Calendar & Events
```
GET    /api/calendar/events
POST   /api/calendar/events
PATCH  /api/calendar/events/:id
DELETE /api/calendar/events/:id
GET    /api/calendar/upcoming
```

**Data Points Currently Hardcoded:**
- Scheduled inspections
- Policy renewal dates
- Maintenance appointments
- Event types and statuses

#### 6. Claims & Damage Assessment
```
GET    /api/claims
POST   /api/claims
GET    /api/claims/:id
PATCH  /api/claims/:id/status
POST   /api/claims/:id/photos
GET    /api/claims/:id/timeline
```

**Data Points Currently Hardcoded:**
- Active claims list
- Claim status ("In Review", "Approved", "Denied")
- Claim amounts and deductibles
- Damage photos and assessments
- Adjuster assignments
- Timeline events

#### 7. Grants & Financial Aid
```
GET    /api/grants
GET    /api/grants/:id
POST   /api/grants/applications
GET    /api/grants/eligibility
```

**Data Points Currently Hardcoded:**
- Available grants list
- Grant amounts ($5,000 - $50,000)
- Application deadlines
- Eligibility criteria
- Application status

#### 8. AI Assistant / Chat
```
GET    /api/chat/conversations
POST   /api/chat/messages
GET    /api/chat/history
POST   /api/chat/voice
GET    /api/chat/suggestions
```

**Data Points Currently Hardcoded:**
- Chat messages
- Conversation history
- AI responses
- Quick suggestions/prompts
- Voice transcriptions
- Saved messages

#### 9. Agents & Services
```
GET    /api/agents
GET    /api/agents/:id
GET    /api/agents/nearby?location={location}
GET    /api/services
GET    /api/services/categories
```

**Data Points Currently Hardcoded:**
- Agent profiles (name, photo, rating, specialty)
- Agent locations (San Francisco area)
- Service providers (contractors, inspectors)
- Reviews and ratings
- Contact information

#### 10. Insights & Reports
```
GET    /api/insights/property/:id
GET    /api/insights/market-trends
GET    /api/reports/visual
GET    /api/reports/risk-assessment
```

**Data Points Currently Hardcoded:**
- Property risk scores
- Market value trends
- Neighborhood statistics
- Climate risk data
- Maintenance recommendations

#### 11. Community & Discover
```
GET    /api/community/posts
POST   /api/community/posts
GET    /api/community/neighborhoods
GET    /api/discover/featured
GET    /api/discover/categories
```

**Data Points Currently Hardcoded:**
- Community posts and discussions
- Neighborhood insights
- Featured content
- Local events
- Safety scores

#### 12. Gallery & Photos
```
GET    /api/gallery/photos
POST   /api/gallery/upload
DELETE /api/gallery/:id
PATCH  /api/gallery/:id/tags
GET    /api/gallery/albums
```

**Data Points Currently Hardcoded:**
- Property photos
- Inspection photos
- Before/after damage photos
- Photo metadata (date, location, tags)
- Albums and categories

---

## Component Conversion Checklist

### Web → React Native Component Mapping

| Web Component | React Native Equivalent | Notes |
|--------------|------------------------|-------|
| `<div>` | `<View>` | Container element |
| `<span>`, `<p>`, `<h1>` | `<Text>` | All text must be wrapped |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` | Use Pressable for advanced interactions |
| `<input>` | `<TextInput>` | Requires different props |
| `<img>` | `<Image>` | Use `source` prop instead of `src` |
| `className` | `style` prop | Use StyleSheet.create() |
| CSS Variables | Theme object | Create theme context |
| `onClick` | `onPress` | Event handler name change |
| `motion.div` | `Animated.View` or `MotiView` | Use Reanimated or Moti |
| `backdrop-blur` | `BlurView` from expo-blur | Requires native module |
| Linear gradients | `LinearGradient` from expo-linear-gradient | Requires native module |
| Scroll containers | `ScrollView` or `FlatList` | Use FlatList for long lists |
| Horizontal scroll | `ScrollView horizontal` | Add `horizontal` prop |

### Animation Libraries

**Web (Framer Motion)** → **React Native**
- `motion.div` → `Animated.View` (React Native Animated)
- `motion.div` → `MotiView` (Moti library - easier API)
- Complex animations → React Native Reanimated 3 (best performance)
- `whileHover` → Not supported on mobile (remove or use `onPressIn`)
- `whileTap` → `onPressIn` / `onPressOut`

### CSS to StyleSheet Conversion

**Web:**
```tsx
<div 
  className="flex flex-col gap-4 p-6"
  style={{
    backgroundColor: 'var(--card-bg)',
    borderRadius: 'var(--radius-lg)',
  }}
/>
```

**React Native:**
```tsx
import { StyleSheet } from 'react-native';

<View style={[styles.container, { backgroundColor: theme.colors.cardBg }]}>
</View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16, // 4 * 4 = 16px
    padding: 24, // 6 * 4 = 24px
    borderRadius: theme.radius.lg,
  },
});
```

### Key Differences to Watch

1. **No `className`** - All styling via `style` prop or StyleSheet
2. **Text wrapping required** - All text must be in `<Text>` components
3. **Images need dimensions** - Must specify width/height or use `resizeMode`
4. **No CSS variables** - Use theme context or constants
5. **Touch events** - `onPress` instead of `onClick`
6. **Scrolling** - Must explicitly use `ScrollView` or `FlatList`
7. **Flexbox default** - Views use flexbox by default (no `display: flex` needed)
8. **Navigation** - Use React Navigation instead of state-based routing
9. **Storage** - AsyncStorage instead of localStorage
10. **Icons** - Use react-native-vector-icons or expo-icons

---

## Screen-by-Screen Conversion Guide

### 1. App.tsx (Main Entry Point)

**Current Implementation:**
- State-based routing with `currentScreen` state
- Conditional rendering of screens
- localStorage for persistence

**React Native Conversion:**

```typescript
// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="EmailEntry" component={EmailEntryScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
          {/* Add other screens */}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen name="Dashboard" component={LuxuryDashboard} />
      <Tab.Screen name="Properties" component={PropertiesScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="AngelChat" component={AngelFunctionsScreen} />
    </Tab.Navigator>
  );
}
```

**TanStack Query Integration:**
```typescript
// Remove hardcoded weather data, replace with:
const { data: weatherData, isLoading: weatherLoading } = useWeather(userLocation);
```

**Zustand Store:**
```typescript
// Replace useState with:
const { currentScreen, setCurrentScreen } = useUIStore();
const { user, setUser } = useAuthStore();
```

**Backend Data Needed:**
- User authentication state
- User preferences (remember me)
- Default user location (San Francisco, CA)

---

### 2. LuxuryDashboard.tsx

**Location:** `/components/LuxuryDashboard.tsx`

**Current Hardcoded Data:**
```typescript
// Quick Actions
const quickActions = [
  { id: 'inspect', title: 'Schedule Inspection', icon: 'calendar-check' },
  { id: 'claim', title: 'File Claim', icon: 'file-text' },
  { id: 'policy', title: 'View Policy', icon: 'shield' },
  { id: 'documents', title: 'Documents', icon: 'folder' },
  { id: 'emergency', title: 'Emergency', icon: 'alert-circle' },
  // ... more actions
];

// Property Status Cards
const statusCards = [
  { label: 'Coverage', value: '$450K', status: 'active' },
  { label: 'Premium', value: '$2,400/yr', status: 'due' },
  { label: 'Deductible', value: '$2,500', status: 'normal' },
  { label: 'Next Inspection', value: 'Mar 15', status: 'upcoming' },
];

// Recent Activities
const activities = [
  { id: '1', title: 'Roof inspection completed', date: '2 days ago', icon: 'check-circle' },
  { id: '2', title: 'Policy renewed', date: '1 week ago', icon: 'shield' },
  // ... more activities
];
```

**React Native Conversion:**

```typescript
// components/LuxuryDashboard.tsx
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/useAuthStore';

export function LuxuryDashboard() {
  const { user } = useAuthStore();
  
  // Replace hardcoded data with API calls
  const { data: quickActions } = useQuery({
    queryKey: ['quickActions', user?.id],
    queryFn: () => fetchQuickActions(user?.id),
  });
  
  const { data: propertyStatus } = useQuery({
    queryKey: ['propertyStatus', user?.propertyId],
    queryFn: () => fetchPropertyStatus(user?.propertyId),
  });
  
  const { data: recentActivities } = useQuery({
    queryKey: ['activities', user?.id],
    queryFn: () => fetchRecentActivities(user?.id),
  });

  return (
    <ScrollView style={styles.container}>
      {/* Convert web components to React Native */}
      <View style={styles.quickActionsContainer}>
        <FlatList
          horizontal
          data={quickActions}
          renderItem={({ item }) => <QuickActionCard action={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      
      {/* Status cards */}
      <View style={styles.statusGrid}>
        {propertyStatus?.map(status => (
          <StatusCard key={status.id} {...status} />
        ))}
      </View>
      
      {/* Activities carousel */}
      <View style={styles.activitiesContainer}>
        <FlatList
          horizontal
          data={recentActivities}
          renderItem={({ item }) => <ActivityCard activity={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
  },
  activitiesContainer: {
    paddingVertical: 16,
  },
});
```

**Backend Endpoints Needed:**
```
GET /api/dashboard/quick-actions?userId={userId}
GET /api/properties/{propertyId}/status
GET /api/activities/recent?userId={userId}&limit=10
GET /api/dashboard/metrics?propertyId={propertyId}
```

**API Response Shapes:**

```typescript
// Quick Actions
interface QuickAction {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  actionType: 'navigate' | 'external' | 'modal';
  destination?: string;
  color?: string;
  order: number;
}

// Property Status
interface PropertyStatus {
  coverage: {
    amount: number;
    currency: string;
    status: 'active' | 'expired' | 'pending';
  };
  premium: {
    amount: number;
    frequency: 'monthly' | 'yearly';
    nextDue: string; // ISO date
  };
  deductible: {
    amount: number;
    currency: string;
  };
  nextInspection: {
    date: string; // ISO date
    type: string;
    status: 'scheduled' | 'overdue' | 'completed';
  };
}

// Activity
interface Activity {
  id: string;
  title: string;
  description?: string;
  timestamp: string; // ISO date
  icon: string;
  type: 'inspection' | 'policy' | 'claim' | 'document' | 'payment';
  relatedId?: string;
}
```

---

### 3. PropertiesScreen.tsx

**Location:** `/screens/PropertiesScreen.tsx`

**Current Hardcoded Data:**
- List of 15+ mock properties with San Francisco addresses
- Property images (static imports)
- Property details (beds, baths, sq ft, value)
- Policy status
- Risk scores
- Last inspection dates

**React Native Conversion:**

```typescript
// screens/PropertiesScreen.tsx
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export function PropertiesScreen() {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  
  const { 
    data: properties,
    isLoading,
    isError,
    refetch 
  } = useQuery({
    queryKey: ['properties', user?.id],
    queryFn: () => fetchProperties(user?.id),
  });
  
  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <PropertyCard 
            property={item} 
            onPress={() => handlePropertyPress(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
}
```

**Backend Endpoints:**
```
GET /api/properties?userId={userId}
GET /api/properties/{propertyId}
POST /api/properties
PATCH /api/properties/{propertyId}
DELETE /api/properties/{propertyId}
```

**API Response Shape:**
```typescript
interface Property {
  id: string;
  userId: string;
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
  details: {
    type: 'single-family' | 'condo' | 'multi-family' | 'townhouse';
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
    estimatedValue: number;
  };
  insurance: {
    carrier: string;
    policyNumber: string;
    status: 'active' | 'expired' | 'pending' | 'cancelled';
    coverage: number;
    premium: number;
    deductible: number;
    renewalDate: string; // ISO date
  };
  inspections: {
    lastInspectionDate: string | null;
    nextInspectionDate: string | null;
    inspectionType: string;
  };
  riskAssessment: {
    overallScore: number; // 0-100
    fireRisk: 'low' | 'medium' | 'high';
    floodRisk: 'low' | 'medium' | 'high';
    earthquakeRisk: 'low' | 'medium' | 'high';
  };
  photos: {
    primaryPhoto: string; // URL
    gallery: string[]; // URLs
  };
  createdAt: string;
  updatedAt: string;
}
```

**Conversion Notes:**
- Replace `<div>` with `<View>`
- Replace horizontal scroll div with `<FlatList horizontal>`
- Replace `onClick` with `onPress`
- Replace CSS classes with StyleSheet
- Use `Image` component with `source={{ uri: url }}`
- Use `RefreshControl` for pull-to-refresh

---

### 4. AngelFunctionsScreen.tsx (AI Chat)

**Location:** `/screens/AngelFunctionsScreen.tsx`

**Current Hardcoded Data:**
- Chat messages
- Conversation history (6 past conversations)
- Chat types (Claims, Policy, Inspection, Emergency)
- Saved messages (3 bookmarked messages)
- Quick suggestions (18 suggestion prompts)

**React Native Conversion:**

```typescript
// screens/AngelFunctionsScreen.tsx
import { View, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function AngelFunctionsScreen() {
  const [inputText, setInputText] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  // Fetch conversation messages
  const { data: messages } = useQuery({
    queryKey: ['chat', 'current'],
    queryFn: () => fetchCurrentConversation(user?.id),
  });
  
  // Fetch conversation history
  const { data: conversationHistory } = useQuery({
    queryKey: ['chat', 'history', user?.id],
    queryFn: () => fetchConversationHistory(user?.id),
  });
  
  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (message: string) => sendChatMessage(user?.id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'current'] });
      setInputText('');
    },
  });

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessageMutation.mutate(inputText);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={item => item.id}
        inverted // Chat messages scroll from bottom
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity onPress={handleSend}>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
```

**Backend Endpoints:**
```
GET  /api/chat/conversations?userId={userId}
POST /api/chat/conversations
GET  /api/chat/conversations/{conversationId}/messages
POST /api/chat/messages
POST /api/chat/messages/{messageId}/bookmark
GET  /api/chat/suggestions
POST /api/chat/voice-input
```

**API Response Shape:**
```typescript
interface ChatMessage {
  id: string;
  conversationId: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isBookmarked: boolean;
  metadata?: {
    intent?: string;
    confidence?: number;
    relatedResources?: Array<{ type: string; id: string }>;
  };
}

interface Conversation {
  id: string;
  userId: string;
  title: string;
  preview: string;
  messageCount: number;
  lastMessageAt: string;
  createdAt: string;
}
```

**Key Conversion Points:**
- Use `KeyboardAvoidingView` for chat input
- Use `FlatList` with `inverted` prop for chat messages
- Replace web `input` with `TextInput`
- Handle keyboard dismiss with `Keyboard.dismiss()`
- Use `react-native-gifted-chat` library for faster implementation

---

### 5. WeatherScreen.tsx

**Location:** `/screens/WeatherScreen.tsx`

**Current Hardcoded Data:**
- Current temperature: 72°F
- Condition: "Sunny"
- 7-day forecast
- Hourly forecast
- Weather alerts
- UV index, humidity, wind speed
- Sunset/sunrise times

**React Native Conversion:**

```typescript
// screens/WeatherScreen.tsx
import { View, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/useAuthStore';

export function WeatherScreen() {
  const { user } = useAuthStore();
  const userLocation = user?.location || 'San Francisco, CA';
  
  const { data: currentWeather } = useQuery({
    queryKey: ['weather', 'current', userLocation],
    queryFn: () => fetchCurrentWeather(userLocation),
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });
  
  const { data: forecast } = useQuery({
    queryKey: ['weather', 'forecast', userLocation],
    queryFn: () => fetchWeatherForecast(userLocation, 7),
  });
  
  const { data: alerts } = useQuery({
    queryKey: ['weather', 'alerts', userLocation],
    queryFn: () => fetchWeatherAlerts(userLocation),
  });

  return (
    <ScrollView style={styles.container}>
      <CurrentWeatherCard weather={currentWeather} />
      <WeatherAlertsSection alerts={alerts} />
      <HourlyForecast data={forecast?.hourly} />
      <WeeklyForecast data={forecast?.daily} />
      <WeatherDetails 
        uvIndex={currentWeather?.uvIndex}
        humidity={currentWeather?.humidity}
        windSpeed={currentWeather?.windSpeed}
        sunrise={currentWeather?.sunrise}
        sunset={currentWeather?.sunset}
      />
    </ScrollView>
  );
}
```

**Backend Endpoints:**
```
GET /api/weather/current?location={location}
GET /api/weather/forecast?location={location}&days=7
GET /api/weather/alerts?location={location}
GET /api/weather/hourly?location={location}&hours=24
```

**Integration with Third-Party Weather API:**
```typescript
// services/weatherService.ts
// Use OpenWeatherMap, WeatherAPI, or similar service

import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchCurrentWeather(location: string) {
  const response = await axios.get(`${BASE_URL}/current.json`, {
    params: {
      key: WEATHER_API_KEY,
      q: location,
      aqi: 'yes',
    },
  });
  
  return transformWeatherData(response.data);
}
```

**API Response Shape:**
```typescript
interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionCode: string; // For icon mapping
  humidity: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  pressure: number;
  visibility: number;
  sunrise: string; // ISO time
  sunset: string; // ISO time
  location: {
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  alerts: WeatherAlert[];
}

interface WeatherForecast {
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}

interface DailyForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  precipProbability: number;
  sunrise: string;
  sunset: string;
}
```

---

### 6. MapView.tsx

**Location:** `/components/MapView.tsx`

**Current Implementation:**
- Static map using Google Maps Static API
- Hardcoded San Francisco coordinates
- Property marker

**React Native Conversion:**

```typescript
// components/MapView.tsx
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface MapViewProps {
  propertyLocation: {
    latitude: number;
    longitude: number;
  };
  properties?: Property[];
}

export function PropertyMapView({ propertyLocation, properties }: MapViewProps) {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: propertyLocation.latitude,
        longitude: propertyLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {properties?.map(property => (
        <Marker
          key={property.id}
          coordinate={{
            latitude: property.address.coordinates.latitude,
            longitude: property.address.coordinates.longitude,
          }}
          title={property.address.street}
          description={property.details.type}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
```

**Dependencies:**
- `react-native-maps` for iOS/Android
- Google Maps API key (add to app.json for Expo)

**Configuration:**
```json
// app.json (for Expo)
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_ANDROID_API_KEY"
        }
      }
    },
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_IOS_API_KEY"
      }
    }
  }
}
```

---

### 7. BottomNavigation.tsx

**Location:** `/components/BottomNavigation.tsx`

**Current Implementation:**
- Custom glassmorphic navigation bar
- 5 navigation buttons
- Submenu system with drawer
- Animated center button

**React Native Conversion:**

```typescript
// components/BottomNavigation.tsx
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export function BottomNavigation({ navigation, state }) {
  return (
    <BlurView intensity={80} style={styles.container}>
      <View style={styles.navBar}>
        <NavButton icon="home" onPress={() => navigation.navigate('Dashboard')} />
        <NavButton icon="menu" onPress={() => navigation.toggleDrawer()} />
        
        {/* Center animated button */}
        <AnimatedCenterButton 
          onPress={() => navigation.navigate('AngelChat')}
        />
        
        <NavButton icon="search" onPress={() => navigation.navigate('Search')} />
        <NavButton icon="camera" onPress={() => navigation.navigate('PhotoCapture')} />
      </View>
    </BlurView>
  );
}

const AnimatedCenterButton = ({ onPress }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(1.1) },
    ],
  }));

  return (
    <Animated.View style={[styles.centerButton, animatedStyle]}>
      <TouchableOpacity onPress={onPress}>
        <Image source={policyAngelLogo} style={styles.logo} />
      </TouchableOpacity>
    </Animated.View>
  );
};
```

**Key Changes:**
- Use `BlurView` from `expo-blur` for glassmorphism
- Use `react-native-reanimated` for animations
- Replace Framer Motion with Reanimated
- Use React Navigation's built-in tab navigator as base

**Alternative Approach:**
Use React Navigation's bottom tab navigator with custom tab bar:

```typescript
// navigation/BottomTabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomNavigation {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={LuxuryDashboard} />
      <Tab.Screen name="Properties" component={PropertiesScreen} />
      <Tab.Screen name="AngelChat" component={AngelFunctionsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}
```

---

### 8. PhotoCaptureScreen.tsx

**Location:** `/screens/PhotoCaptureScreen.tsx`

**React Native Conversion:**

```typescript
// screens/PhotoCaptureScreen.tsx
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export function PhotoCaptureScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      
      // Upload to backend
      const uploadMutation = useUploadPhoto();
      uploadMutation.mutate(photo.uri);
      
      navigation.navigate('Gallery', { newPhoto: photo.uri });
    }
  };

  if (!permission?.granted) {
    return <PermissionScreen onRequestPermission={requestPermission} />;
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        ref={cameraRef}
      >
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => setType(
            type === CameraType.back ? CameraType.front : CameraType.back
          )}>
            <FlipCameraIcon />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
            <GalleryIcon />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
```

**Dependencies:**
- `expo-camera` for camera access
- `expo-image-picker` for gallery access
- `expo-media-library` for saving photos

**Backend Endpoint:**
```
POST /api/photos/upload
```

**File Upload with TanStack Query:**
```typescript
// hooks/api/useUploadPhoto.ts
export const useUploadPhoto = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (photoUri: string) => {
      const formData = new FormData();
      formData.append('photo', {
        uri: photoUri,
        type: 'image/jpeg',
        name: `photo-${Date.now()}.jpg`,
      });
      
      return await uploadPhoto(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
};
```

---

### 9. DocumentsScreen.tsx

**Location:** `/screens/DocumentsScreen.tsx`

**Current Hardcoded Data:**
- Document list (policies, inspection reports, receipts)
- Document categories
- Upload history
- Share links

**React Native Conversion:**

```typescript
// screens/DocumentsScreen.tsx
import { View, FlatList, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export function DocumentsScreen() {
  const { user } = useAuthStore();
  
  const { data: documents } = useQuery({
    queryKey: ['documents', user?.id],
    queryFn: () => fetchDocuments(user?.id),
  });
  
  const uploadMutation = useMutation({
    mutationFn: (document: DocumentPickerResult) => uploadDocument(document),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
    });
    
    if (result.type === 'success') {
      uploadMutation.mutate(result);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickDocument} style={styles.uploadButton}>
        <Text>Upload Document</Text>
      </TouchableOpacity>
      
      <FlatList
        data={documents}
        renderItem={({ item }) => <DocumentCard document={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
```

**Dependencies:**
- `expo-document-picker` for file selection
- `react-native-pdf` for PDF viewing
- `expo-sharing` for share functionality

**Backend Endpoints:**
```
GET    /api/documents?userId={userId}
POST   /api/documents/upload
DELETE /api/documents/{documentId}
GET    /api/documents/{documentId}/download
POST   /api/documents/{documentId}/share
```

---

### 10. CalendarScreen.tsx

**Location:** `/screens/CalendarScreen.tsx`

**React Native Conversion:**

```typescript
// screens/CalendarScreen.tsx
import { Calendar } from 'react-native-calendars';
import { useQuery } from '@tanstack/react-query';

export function CalendarScreen() {
  const { user } = useAuthStore();
  
  const { data: events } = useQuery({
    queryKey: ['calendar', 'events', user?.id],
    queryFn: () => fetchCalendarEvents(user?.id),
  });
  
  // Transform events into marked dates format
  const markedDates = useMemo(() => {
    return events?.reduce((acc, event) => {
      const dateKey = event.date.split('T')[0];
      acc[dateKey] = {
        marked: true,
        dotColor: event.type === 'inspection' ? '#60a5fa' : '#34d399',
      };
      return acc;
    }, {});
  }, [events]);

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          // Show events for selected day
        }}
        theme={{
          backgroundColor: '#0a0a0f',
          calendarBackground: '#0a0a0f',
          textSectionTitleColor: '#b6b6b6',
          selectedDayBackgroundColor: '#60a5fa',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#60a5fa',
          dayTextColor: '#d4d4d4',
          textDisabledColor: '#4a4a4a',
        }}
      />
      
      <FlatList
        data={getEventsForSelectedDay()}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
```

**Dependencies:**
- `react-native-calendars` for calendar UI
- Optional: `expo-calendar` for device calendar integration

**Backend Endpoint:**
```
GET  /api/calendar/events?userId={userId}&start={startDate}&end={endDate}
POST /api/calendar/events
```

---

## Summary: Complete Backend API Specification

### Base URL
```
Production: https://api.policyangel.com/v1
Development: http://localhost:3000/api/v1
```

### Authentication
All endpoints (except login/register) require JWT token in header:
```
Authorization: Bearer {token}
```

### Complete Endpoint List

#### Authentication
```
POST   /auth/login
POST   /auth/register
POST   /auth/logout
POST   /auth/refresh-token
POST   /auth/forgot-password
POST   /auth/reset-password
```

#### User
```
GET    /user/profile
PATCH  /user/profile
GET    /user/preferences
PATCH  /user/preferences
POST   /user/avatar
```

#### Properties
```
GET    /properties
GET    /properties/:id
POST   /properties
PATCH  /properties/:id
DELETE /properties/:id
GET    /properties/:id/history
GET    /properties/:id/risk-assessment
```

#### Dashboard
```
GET    /dashboard/quick-actions
GET    /dashboard/metrics
GET    /dashboard/recent-activities
```

#### Weather
```
GET    /weather/current
GET    /weather/forecast
GET    /weather/alerts
GET    /weather/hourly
```

#### Documents
```
GET    /documents
GET    /documents/:id
POST   /documents/upload
DELETE /documents/:id
GET    /documents/:id/download
POST   /documents/:id/share
GET    /documents/categories
```

#### Calendar
```
GET    /calendar/events
POST   /calendar/events
PATCH  /calendar/events/:id
DELETE /calendar/events/:id
GET    /calendar/upcoming
```

#### Claims
```
GET    /claims
POST   /claims
GET    /claims/:id
PATCH  /claims/:id
POST   /claims/:id/photos
GET    /claims/:id/timeline
PATCH  /claims/:id/status
```

#### Grants
```
GET    /grants
GET    /grants/:id
POST   /grants/applications
GET    /grants/applications/:id
GET    /grants/eligibility
```

#### Chat / AI Assistant
```
GET    /chat/conversations
POST   /chat/conversations
GET    /chat/conversations/:id/messages
POST   /chat/messages
POST   /chat/messages/:id/bookmark
GET    /chat/suggestions
POST   /chat/voice-input
```

#### Agents
```
GET    /agents
GET    /agents/:id
GET    /agents/nearby
POST   /agents/:id/contact
GET    /agents/:id/reviews
```

#### Services
```
GET    /services
GET    /services/:id
GET    /services/categories
GET    /services/nearby
```

#### Insights
```
GET    /insights/property/:id
GET    /insights/market-trends
GET    /insights/risk-assessment
GET    /insights/recommendations
```

#### Gallery
```
GET    /gallery/photos
POST   /gallery/upload
DELETE /gallery/:id
PATCH  /gallery/:id
GET    /gallery/albums
POST   /gallery/albums
```

#### Community
```
GET    /community/posts
POST   /community/posts
GET    /community/neighborhoods
GET    /community/:id/comments
POST   /community/:id/comments
```

#### Discover
```
GET    /discover/featured
GET    /discover/categories
GET    /discover/search
```

---

## Quick Reference: Common Conversions

### 1. localStorage → AsyncStorage
```typescript
// Web
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');

// React Native
await AsyncStorage.setItem('key', 'value');
const value = await AsyncStorage.getItem('key');
```

### 2. Flexbox
```typescript
// Web
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

// React Native (flex is default, no gap in older RN)
<View style={{ flexDirection: 'column' }}>
  {/* Add marginBottom to children instead of gap */}
</View>
```

### 3. Images
```typescript
// Web
<img src="/images/photo.jpg" alt="Photo" />

// React Native
<Image source={require('./images/photo.jpg')} />
// Or for remote images:
<Image source={{ uri: 'https://example.com/photo.jpg' }} style={{ width: 100, height: 100 }} />
```

### 4. Text Input
```typescript
// Web
<input
  type="text"
  value={value}
  onChange={e => setValue(e.target.value)}
  placeholder="Enter text"
/>

// React Native
<TextInput
  value={value}
  onChangeText={setValue}
  placeholder="Enter text"
  style={styles.input}
/>
```

### 5. Scrolling
```typescript
// Web
<div style={{ overflowY: 'auto' }}>

// React Native
<ScrollView>
  {/* content */}
</ScrollView>
```

### 6. Lists
```typescript
// Web
<div>
  {items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</div>

// React Native (better performance)
<FlatList
  data={items}
  renderItem={({ item }) => <Text>{item.name}</Text>}
  keyExtractor={item => item.id}
/>
```

---

## Next Steps

1. **Set up React Native project**
   ```bash
   npx create-expo-app PolicyAngel
   cd PolicyAngel
   ```

2. **Install core dependencies**
   ```bash
   npm install @tanstack/react-query zustand @react-navigation/native
   npm install react-native-reanimated react-native-gesture-handler
   npm install expo-camera expo-image-picker expo-document-picker
   npm install react-native-maps expo-blur
   ```

3. **Set up folder structure**
   ```
   src/
   ├── screens/
   ├── components/
   ├── hooks/
   │   ├── api/
   │   └── useAuth.ts
   ├── stores/
   ├── services/
   ├── navigation/
   ├── theme/
   └── utils/
   ```

4. **Create API service layer**
   ```typescript
   // services/api.ts
   import axios from 'axios';
   
   const api = axios.create({
     baseURL: process.env.API_BASE_URL,
   });
   
   export default api;
   ```

5. **Set up authentication flow**
   ```typescript
   // stores/useAuthStore.ts
   // hooks/useAuth.ts
   ```

6. **Convert screens one by one**
   - Start with EmailEntryScreen (simplest)
   - Then LuxuryDashboard (most important)
   - Then PropertiesScreen, AngelFunctionsScreen, etc.

7. **Test on both iOS and Android**

---

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)

