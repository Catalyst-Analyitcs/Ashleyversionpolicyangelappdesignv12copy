/**
 * ==============================================================================
 * WEATHERSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Comprehensive weather dashboard with current conditions, hourly/daily
 * forecasts, alerts, and detailed meteorological data with charts and animations.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CHARTS LIBRARY:
 *    - CURRENT: recharts (web-only)
 *    - REACT NATIVE OPTIONS:
 *      A) react-native-chart-kit (simpler, less features)
 *         npm install react-native-chart-kit react-native-svg
 *      B) victory-native (more powerful, better animations)
 *         npm install victory-native
 *      C) react-native-svg-charts (SVG-based)
 *    - RECOMMENDED: victory-native for complex charts
 * 
 * 2. WEATHER ICONS:
 *    - CURRENT: lucide-react icons
 *    - REACT NATIVE: react-native-vector-icons
 *    - Use: Ionicons, Feather, or WeatherIcons font
 *    - Alternative: Use animated Lottie files for weather
 *      npm install lottie-react-native
 * 
 * 3. SCROLL & PARALLAX:
 *    - CURRENT: useScroll, useTransform from Framer Motion
 *    - REACT NATIVE: Use Animated.ScrollView with onScroll
 *    - Or use: react-native-reanimated for parallax effects
 *    - Background image parallax:
 *      const scrollY = useSharedValue(0);
 *      const backgroundY = useAnimatedStyle(() => ({
 *        transform: [{ translateY: scrollY.value * 0.5 }]
 *      }));
 * 
 * 4. ANIMATIONS:
 *    - Replace motion components with Animated/Reanimated
 *    - Skeleton loading → react-native-skeleton-placeholder
 *    - Fade/slide animations → react-native-reanimated
 * 
 * 5. PULL-TO-REFRESH:
 *    - Add RefreshControl to ScrollView
 *    - Trigger weather data refetch on pull
 * 
 * 6. GRADIENTS:
 *    - CURRENT: CSS linear/radial gradients
 *    - REACT NATIVE: expo-linear-gradient
 *    - For weather backgrounds, use LinearGradient with dynamic colors
 * 
 * 7. WEATHER ALERTS:
 *    - Display as banner at top
 *    - Use Animated.View for slide-in animation
 *    - Link to full alert details screen
 * 
 * ==============================================================================
 * TANSTACK QUERY INTEGRATION
 * ==============================================================================
 * 
 * REPLACE LOCAL STATE WITH API CALLS:
 * 
 * 1. Current Weather:
 *    const { data: currentWeather, isLoading, refetch } = useQuery({
 *      queryKey: ['weather', 'current', userLocation],
 *      queryFn: () => weatherApi.getCurrentWeather(userLocation),
 *      refetchInterval: 30 * 60 * 1000, // Auto-refresh every 30 min
 *      staleTime: 15 * 60 * 1000, // Consider stale after 15 min
 *    });
 * 
 * 2. Hourly Forecast:
 *    const { data: hourlyForecast } = useQuery({
 *      queryKey: ['weather', 'hourly', userLocation],
 *      queryFn: () => weatherApi.getHourlyForecast(userLocation, 24),
 *    });
 * 
 * 3. Daily Forecast:
 *    const { data: dailyForecast } = useQuery({
 *      queryKey: ['weather', 'daily', userLocation],
 *      queryFn: () => weatherApi.getDailyForecast(userLocation, 7),
 *    });
 * 
 * 4. Weather Alerts:
 *    const { data: alerts } = useQuery({
 *      queryKey: ['weather', 'alerts', userLocation],
 *      queryFn: () => weatherApi.getAlerts(userLocation),
 *      refetchInterval: 10 * 60 * 1000, // Check for new alerts every 10 min
 *    });
 * 
 * ==============================================================================
 * ZUSTAND STORE INTEGRATION
 * ==============================================================================
 * 
 * CREATE: stores/useWeatherStore.ts
 * 
 * interface WeatherState {
 *   userLocation: string;
 *   temperatureUnit: 'C' | 'F';
 *   selectedDay: number | null;
 *   
 *   setUserLocation: (location: string) => void;
 *   toggleTemperatureUnit: () => void;
 *   setSelectedDay: (day: number) => void;
 * }
 * 
 * ==============================================================================
 * MOCK DATA - NEEDS BACKEND API
 * ==============================================================================
 * 
 * ALL WEATHER DATA IS CURRENTLY HARDCODED IN THIS FILE.
 * Replace with real API calls to weather service.
 * 
 * HARDCODED DATA LOCATIONS:
 * 1. Current weather conditions
 * 2. Hourly forecast (24 hours)
 * 3. Daily forecast (7 days)
 * 4. Weather alerts
 * 5. UV index data
 * 6. Air quality index
 * 7. Sunrise/sunset times
 * 8. Moon phase
 * 
 * ==============================================================================
 * BACKEND API ENDPOINTS NEEDED
 * ==============================================================================
 * 
 * 1. GET /api/weather/current
 *    Query: location={location} (city, coordinates, or ZIP)
 *    Returns: Current weather conditions
 *    Response: {
 *      temp: number (in F or C),
 *      feelsLike: number,
 *      condition: string ('sunny', 'cloudy', 'rainy', etc.),
 *      conditionCode: string (for icon mapping),
 *      high: number (today's high),
 *      low: number (today's low),
 *      humidity: number (percentage),
 *      windSpeed: number (mph or km/h),
 *      windDirection: string ('N', 'NE', 'E', etc.),
 *      windGust: number,
 *      visibility: number (miles or km),
 *      pressure: number (inHg or mb),
 *      uvIndex: number (0-11+),
 *      dewPoint: number,
 *      location: string (formatted location name),
 *      coordinates: { lat: number, lon: number },
 *      sunrise: string (ISO time),
 *      sunset: string (ISO time),
 *      moonPhase: string ('new', 'waxing', 'full', 'waning'),
 *      airQuality: {
 *        index: number (0-500),
 *        category: string ('Good', 'Moderate', 'Unhealthy', etc.),
 *        pollutants: { pm25: number, pm10: number, o3: number, no2: number }
 *      },
 *      timestamp: ISO date
 *    }
 * 
 * 2. GET /api/weather/hourly
 *    Query: location={location}, hours={hours} (default 24)
 *    Returns: Hourly forecast for next N hours
 *    Response: {
 *      hourly: [{
 *        time: string (ISO or 'HH:MM' format),
 *        temp: number,
 *        feelsLike: number,
 *        condition: string,
 *        conditionCode: string,
 *        precipitation: number (probability 0-100),
 *        precipAmount: number (inches or mm),
 *        windSpeed: number,
 *        windDirection: string,
 *        humidity: number,
 *        cloudCover: number (percentage)
 *      }]
 *    }
 * 
 * 3. GET /api/weather/daily
 *    Query: location={location}, days={days} (default 7)
 *    Returns: Daily forecast for next N days
 *    Response: {
 *      daily: [{
 *        date: string (ISO date),
 *        day: string ('Mon', 'Tue', etc.),
 *        high: number,
 *        low: number,
 *        condition: string,
 *        conditionCode: string,
 *        precipitation: number (probability),
 *        precipAmount: number,
 *        windSpeed: number,
 *        humidity: number,
 *        uvIndex: number,
 *        sunrise: string,
 *        sunset: string
 *      }]
 *    }
 * 
 * 4. GET /api/weather/alerts
 *    Query: location={location}
 *    Returns: Active weather alerts for location
 *    Response: {
 *      alerts: [{
 *        id: string,
 *        title: string ('High Wind Warning', 'Heat Advisory', etc.),
 *        severity: string ('warning', 'watch', 'advisory'),
 *        description: string (full alert text),
 *        startTime: ISO date,
 *        endTime: ISO date,
 *        areas: string[] (affected areas)
 *      }]
 *    }
 * 
 * ==============================================================================
 * THIRD-PARTY WEATHER API OPTIONS
 * ==============================================================================
 * 
 * OPTION 1: OpenWeatherMap (Popular, affordable)
 * - Free tier: 60 calls/min, 1M calls/month
 * - Paid tier: $40/month for more calls
 * - API: https://openweathermap.org/api
 * - Features: Current, hourly, daily, alerts, historical
 * 
 * OPTION 2: WeatherAPI.com (Developer-friendly)
 * - Free tier: 1M calls/month
 * - Paid tier: Starting at $4/month
 * - API: https://www.weatherapi.com/
 * - Features: Current, forecast, astronomy, sports, marine
 * 
 * OPTION 3: Weather.gov (Free, US only)
 * - National Weather Service API
 * - Completely free
 * - API: https://www.weather.gov/documentation/services-web-api
 * - Features: Comprehensive US weather data
 * 
 * OPTION 4: Tomorrow.io (Enterprise)
 * - Hyperlocal forecasts
 * - $49/month starting
 * - API: https://www.tomorrow.io/weather-api/
 * - Features: Minute-by-minute, hyperlocal
 * 
 * RECOMMENDED FOR POLICYANGEL: WeatherAPI.com
 * - Good balance of features and pricing
 * - Excellent documentation
 * - Reliable uptime
 * - San Francisco Bay Area coverage
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT STRUCTURE
 * ==============================================================================
 * 
 * import { View, ScrollView, RefreshControl, Animated } from 'react-native';
 * import { VictoryChart, VictoryLine, VictoryArea } from 'victory-native';
 * import LinearGradient from 'expo-linear-gradient';
 * import { useQuery } from '@tanstack/react-query';
 * 
 * export default function WeatherScreen() {
 *   const { userLocation } = useWeatherStore();
 *   
 *   const { data: weather, isLoading, refetch, isRefetching } = useQuery({
 *     queryKey: ['weather', 'current', userLocation],
 *     queryFn: () => weatherApi.getCurrentWeather(userLocation),
 *   });
 * 
 *   return (
 *     <ScrollView
 *       refreshControl={
 *         <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
 *       }
 *     >
 *       <LinearGradient colors={getWeatherGradient(weather?.condition)}>
 *         <CurrentWeatherCard weather={weather} />
 *         <HourlyForecastChart data={hourlyData} />
 *         <WeeklyForecastGrid data={dailyData} />
 *         <WeatherDetailsGrid weather={weather} />
 *       </LinearGradient>
 *     </ScrollView>
 *   );
 * }
 * 
 * ==============================================================================
 * LOCATION SERVICES INTEGRATION
 * ==============================================================================
 * 
 * For automatic location detection:
 * 
 * 1. Install: expo-location or react-native-geolocation-service
 * 2. Request permissions
 * 3. Get current coordinates
 * 4. Reverse geocode to city name
 * 5. Store in Zustand
 * 
 * import * as Location from 'expo-location';
 * 
 * const getLocation = async () => {
 *   const { status } = await Location.requestForegroundPermissionsAsync();
 *   if (status !== 'granted') return;
 *   
 *   const location = await Location.getCurrentPositionAsync({});
 *   const { latitude, longitude } = location.coords;
 *   
 *   const [geocode] = await Location.reverseGeocodeAsync({ latitude, longitude });
 *   const city = `${geocode.city}, ${geocode.region}`;
 *   
 *   setUserLocation(city);
 * };
 * 
 * ==============================================================================
 * PERFORMANCE OPTIMIZATIONS
 * ==============================================================================
 * 
 * 1. Cache weather data for 15-30 minutes
 * 2. Use skeleton loaders during fetch
 * 3. Lazy load forecast charts
 * 4. Optimize chart rendering (reduce data points if needed)
 * 5. Use FlatList for hourly forecast if many data points
 * 6. Memoize weather icon components
 * 7. Debounce location changes
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Weather loads for San Francisco, CA
 * - [ ] Temperature displays in Fahrenheit
 * - [ ] Temperature unit toggle works (F ↔ C)
 * - [ ] Hourly forecast chart renders
 * - [ ] 7-day forecast displays
 * - [ ] Weather alerts appear if active
 * - [ ] Pull-to-refresh updates data
 * - [ ] Location permission request works
 * - [ ] Auto-location detects San Francisco area
 * - [ ] Background gradient matches weather condition
 * - [ ] Icons match weather conditions
 * - [ ] Sunrise/sunset times are correct
 * - [ ] UV index displays with color coding
 * - [ ] Air quality appears if available
 * - [ ] Works offline with cached data
 * - [ ] Loading states show properly
 * - [ ] Error handling for failed API calls
 * 
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from 'motion/react';
import { LiquidGlassHeader } from '../components/LiquidGlassHeader';
import { 
  Cloud, CloudRain, Sun, CloudSnow, CloudDrizzle, Zap, MapPin, 
  AlertTriangle, TrendingUp, TrendingDown, Droplets, Wind, Eye, 
  Gauge, RefreshCw, ChevronDown, Sunrise, Sunset, Moon, 
  Activity, Thermometer, Umbrella, Compass, AlertCircle, Navigation,
  ArrowDown, ArrowUp
} from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import { Badge } from '../components/ui/badge';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import WeeklyWeatherWidget from '../components/WeeklyWeatherWidget';

/* ==================== TYPES ==================== */
interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  uvIndex: number;
  dewPoint: number;
  location: string;
  airQuality: number;
  sunrise: string;
  sunset: string;
  moonPhase: string;
}

interface HourlyData {
  time: string;
  temp: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
}

interface DailyData {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  uvIndex: number;
}

interface MinutelyData {
  time: string;
  intensity: number;
}

interface WeatherIncident {
  id: string;
  date: string;
  type: 'hail' | 'wind' | 'flood' | 'tornado' | 'lightning' | 'snow';
  severity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
  title: string;
  description: string;
  metrics: {
    windSpeed?: number;
    hailSize?: number;
    rainfall?: number;
    duration?: number;
  };
  propertyImpact: {
    propertiesAffected: number;
    estimatedDamage: string;
    claimsFiled: number;
  };
  forensicData: {
    peakIntensity: string;
    affectedAreas: string[];
    recommendations: string[];
  };
}

/* ==================== MOCK DATA ==================== */
const CURRENT_WEATHER: WeatherData = {
  temp: 72,
  feelsLike: 70,
  condition: 'Partly Cloudy',
  high: 78,
  low: 65,
  humidity: 68,
  windSpeed: 12,
  windDirection: 'NW',
  visibility: 10,
  pressure: 30.12,
  uvIndex: 6,
  dewPoint: 58,
  location: 'San Francisco, CA',
  airQuality: 42,
  sunrise: '6:42 AM',
  sunset: '7:15 PM',
  moonPhase: 'Waxing Crescent'
};

const HOURLY_FORECAST: HourlyData[] = [
  { time: 'Now', temp: 72, condition: 'partly-cloudy', precipitation: 0, windSpeed: 12, humidity: 68 },
  { time: '11 AM', temp: 73, condition: 'partly-cloudy', precipitation: 5, windSpeed: 14, humidity: 65 },
  { time: '12 PM', temp: 74, condition: 'partly-cloudy', precipitation: 10, windSpeed: 15, humidity: 63 },
  { time: '1 PM', temp: 76, condition: 'sunny', precipitation: 0, windSpeed: 16, humidity: 60 },
  { time: '2 PM', temp: 77, condition: 'sunny', precipitation: 0, windSpeed: 17, humidity: 58 },
  { time: '3 PM', temp: 78, condition: 'sunny', precipitation: 0, windSpeed: 18, humidity: 56 },
  { time: '4 PM', temp: 77, condition: 'partly-cloudy', precipitation: 5, windSpeed: 16, humidity: 60 },
  { time: '5 PM', temp: 75, condition: 'partly-cloudy', precipitation: 10, windSpeed: 14, humidity: 64 },
  { time: '6 PM', temp: 72, condition: 'cloudy', precipitation: 15, windSpeed: 12, humidity: 68 },
  { time: '7 PM', temp: 70, condition: 'cloudy', precipitation: 20, windSpeed: 10, humidity: 72 },
  { time: '8 PM', temp: 68, condition: 'rainy', precipitation: 45, windSpeed: 8, humidity: 78 },
  { time: '9 PM', temp: 67, condition: 'rainy', precipitation: 60, windSpeed: 7, humidity: 82 }
];

const WEEKLY_FORECAST: DailyData[] = [
  { day: 'MON', date: '26', high: 78, low: 65, condition: 'sunny', precipitation: 10, uvIndex: 6 },
  { day: 'TUE', date: '27', high: 75, low: 63, condition: 'partly-cloudy', precipitation: 20, uvIndex: 5 },
  { day: 'WED', date: '28', high: 70, low: 58, condition: 'rainy', precipitation: 80, uvIndex: 3 },
  { day: 'THU', date: '29', high: 68, low: 56, condition: 'rainy', precipitation: 70, uvIndex: 2 },
  { day: 'FRI', date: '30', high: 72, low: 60, condition: 'partly-cloudy', precipitation: 30, uvIndex: 5 },
  { day: 'SAT', date: '31', high: 76, low: 64, condition: 'sunny', precipitation: 5, uvIndex: 7 },
  { day: 'SUN', date: '1', high: 80, low: 67, condition: 'sunny', precipitation: 0, uvIndex: 8 }
];

const MINUTELY_PRECIPITATION: MinutelyData[] = Array.from({ length: 60 }, (_, i) => ({
  time: `${i}m`,
  intensity: i < 15 ? 0 : i < 30 ? Math.random() * 0.5 : i < 45 ? Math.random() * 2 : 0
}));

const HISTORICAL_CHART_DATA = [
  { month: 'Jul', high: 92, low: 76, avg: 84 },
  { month: 'Aug', high: 88, low: 72, avg: 80 },
  { month: 'Sep', high: 82, low: 66, avg: 74 },
  { month: 'Oct', high: 74, low: 58, avg: 66 }
];

const FORENSIC_INCIDENTS: WeatherIncident[] = [
  {
    id: '1',
    date: 'August 15, 2025',
    type: 'hail',
    severity: 'severe',
    title: 'Severe Hailstorm Event',
    description: 'Golf ball-sized hail caused significant damage to roofs, vehicles, and solar panels across northern districts.',
    metrics: {
      windSpeed: 58,
      hailSize: 1.75,
      duration: 45
    },
    propertyImpact: {
      propertiesAffected: 342,
      estimatedDamage: '$4.2M',
      claimsFiled: 287
    },
    forensicData: {
      peakIntensity: '3:45 PM - 4:15 PM',
      affectedAreas: ['Sunset District', 'Richmond', 'Outer Mission'],
      recommendations: ['Roof inspection required', 'Check for water intrusion', 'Solar panel assessment']
    }
  },
  {
    id: '2',
    date: 'July 22, 2025',
    type: 'wind',
    severity: 'catastrophic',
    title: 'Extreme Wind Event',
    description: 'Sustained winds of 75+ mph with gusts up to 95 mph resulted in widespread structural damage and power outages.',
    metrics: {
      windSpeed: 95,
      duration: 120
    },
    propertyImpact: {
      propertiesAffected: 1247,
      estimatedDamage: '$12.8M',
      claimsFiled: 1089
    },
    forensicData: {
      peakIntensity: '10:00 PM - 12:00 AM',
      affectedAreas: ['Marina District', 'Pacific Heights', 'Sea Cliff', 'Presidio'],
      recommendations: ['Structural integrity check', 'Window seal inspection', 'Tree damage assessment', 'Chimney inspection']
    }
  },
  {
    id: '3',
    date: 'June 8, 2025',
    type: 'flood',
    severity: 'moderate',
    title: 'Flash Flood Warning',
    description: 'Intense rainfall (2.5" in 3 hours) caused localized flooding in low-lying areas and drainage issues.',
    metrics: {
      rainfall: 2.5,
      duration: 180
    },
    propertyImpact: {
      propertiesAffected: 156,
      estimatedDamage: '$890K',
      claimsFiled: 98
    },
    forensicData: {
      peakIntensity: '6:00 AM - 9:00 AM',
      affectedAreas: ['Mission Bay', 'SOMA', 'Bayview'],
      recommendations: ['Foundation moisture check', 'Drainage system inspection', 'Basement water damage assessment']
    }
  },
  {
    id: '4',
    date: 'May 3, 2025',
    type: 'lightning',
    severity: 'minor',
    title: 'Lightning Strike Cluster',
    description: 'Unusual lightning activity with 47 cloud-to-ground strikes caused electrical damage and small fires.',
    metrics: {
      duration: 90
    },
    propertyImpact: {
      propertiesAffected: 23,
      estimatedDamage: '$145K',
      claimsFiled: 19
    },
    forensicData: {
      peakIntensity: '4:30 PM - 6:00 PM',
      affectedAreas: ['Telegraph Hill', 'Russian Hill'],
      recommendations: ['Electrical system check', 'Surge protection inspection', 'Electronics assessment']
    }
  },
  {
    id: '5',
    date: 'March 12, 2025',
    type: 'tornado',
    severity: 'moderate',
    title: 'EF-1 Tornado Touchdown',
    description: 'Rare tornado event (EF-1) with 90 mph winds carved a 2-mile path causing localized but severe damage.',
    metrics: {
      windSpeed: 90,
      duration: 12
    },
    propertyImpact: {
      propertiesAffected: 67,
      estimatedDamage: '$2.1M',
      claimsFiled: 64
    },
    forensicData: {
      peakIntensity: '2:15 PM - 2:27 PM',
      affectedAreas: ['Excelsior', 'Crocker-Amazon'],
      recommendations: ['Complete structural survey', 'Roof replacement evaluation', 'Window and door integrity check']
    }
  }
];

/* ==================== ANIMATION VARIANTS ==================== */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

/* ==================== HELPER FUNCTIONS ==================== */
const getWeatherIcon = (condition: string, size: number = 24, animated: boolean = false) => {
  const iconProps = { size, strokeWidth: 2 };
  const AnimatedIcon = animated ? motion.div : 'div';
  const iconAnimation = animated ? {
    animate: { 
      rotate: condition === 'sunny' ? 360 : 0,
      y: condition === 'rainy' ? [0, 2, 0] : 0
    },
    transition: { 
      rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
      y: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
    }
  } : {};

  const icon = (() => {
    switch (condition) {
      case 'sunny':
        return <Sun {...iconProps} style={{ color: 'rgb(var(--color-warning))' }} />;
      case 'partly-cloudy':
        return <Cloud {...iconProps} style={{ color: 'var(--text-secondary)' }} />;
      case 'cloudy':
        return <Cloud {...iconProps} style={{ color: 'var(--text-tertiary)' }} />;
      case 'rainy':
        return <CloudRain {...iconProps} style={{ color: 'rgb(var(--color-info))' }} />;
      case 'drizzle':
        return <CloudDrizzle {...iconProps} style={{ color: 'rgb(var(--color-info))' }} />;
      case 'snow':
        return <CloudSnow {...iconProps} style={{ color: '#bfdbfe' }} />;
      case 'stormy':
        return <Zap {...iconProps} style={{ color: 'rgb(var(--color-warning))' }} />;
      default:
        return <Cloud {...iconProps} style={{ color: 'var(--text-secondary)' }} />;
    }
  })();

  return animated ? <AnimatedIcon {...iconAnimation}>{icon}</AnimatedIcon> : icon;
};

const getTemperatureColor = (temp: number) => {
  if (temp >= 85) return 'rgb(var(--color-error))';
  if (temp >= 75) return 'rgb(var(--color-warning))';
  if (temp >= 65) return 'rgb(var(--color-goldenrod))';
  if (temp >= 50) return 'rgb(var(--color-success))';
  if (temp >= 40) return 'rgb(var(--color-info))';
  return '#93c5fd';
};

const getAirQualityInfo = (aqi: number) => {
  if (aqi <= 50) return { 
    label: 'Good', 
    color: 'rgb(var(--color-success))', 
    bg: 'rgba(var(--color-success), 0.15)',
    description: 'Air quality is satisfactory'
  };
  if (aqi <= 100) return { 
    label: 'Moderate', 
    color: 'rgb(var(--color-warning))', 
    bg: 'rgba(var(--color-warning), 0.15)',
    description: 'Acceptable for most people'
  };
  if (aqi <= 150) return { 
    label: 'Unhealthy', 
    color: 'rgb(var(--color-error))', 
    bg: 'rgba(var(--color-error), 0.15)',
    description: 'Sensitive groups affected'
  };
  return { 
    label: 'Hazardous', 
    color: '#9333ea', 
    bg: 'rgba(147, 51, 234, 0.15)',
    description: 'Health alert for everyone'
  };
};

const getUVIndexInfo = (uv: number) => {
  if (uv <= 2) return { label: 'Low', color: 'rgb(var(--color-success))' };
  if (uv <= 5) return { label: 'Moderate', color: 'rgb(var(--color-goldenrod))' };
  if (uv <= 7) return { label: 'High', color: 'rgb(var(--color-warning))' };
  if (uv <= 10) return { label: 'Very High', color: 'rgb(var(--color-error))' };
  return { label: 'Extreme', color: '#9333ea' };
};

const convertTemp = (temp: number, useMetric: boolean) => {
  return useMetric ? Math.round((temp - 32) * 5/9) : temp;
};

const getPrecipitationSummary = (data: MinutelyData[]) => {
  const hasRain = data.some(d => d.intensity > 0);
  if (!hasRain) return 'No rain expected in the next hour';
  
  const firstRainIndex = data.findIndex(d => d.intensity > 0);
  if (firstRainIndex === 0) return 'Rain currently falling';
  return `Rain starting in ${firstRainIndex} minutes`;
};

const getIncidentIcon = (type: WeatherIncident['type']) => {
  switch (type) {
    case 'hail':
      return CloudSnow;
    case 'wind':
      return Wind;
    case 'flood':
      return CloudRain;
    case 'tornado':
      return Activity;
    case 'lightning':
      return Zap;
    case 'snow':
      return CloudSnow;
    default:
      return Cloud;
  }
};

const getIncidentColor = (type: WeatherIncident['type']) => {
  switch (type) {
    case 'hail':
      return '#93c5fd';
    case 'wind':
      return '#06b6d4';
    case 'flood':
      return 'rgb(var(--color-info))';
    case 'tornado':
      return '#9333ea';
    case 'lightning':
      return 'rgb(var(--color-warning))';
    case 'snow':
      return '#bfdbfe';
    default:
      return 'var(--text-secondary)';
  }
};

const getSeverityInfo = (severity: WeatherIncident['severity']) => {
  switch (severity) {
    case 'minor':
      return { 
        label: 'Minor', 
        color: 'rgb(var(--color-success))', 
        bg: 'rgba(var(--color-success), 0.15)' 
      };
    case 'moderate':
      return { 
        label: 'Moderate', 
        color: 'rgb(var(--color-warning))', 
        bg: 'rgba(var(--color-warning), 0.15)' 
      };
    case 'severe':
      return { 
        label: 'Severe', 
        color: 'rgb(var(--color-error))', 
        bg: 'rgba(var(--color-error), 0.15)' 
      };
    case 'catastrophic':
      return { 
        label: 'Catastrophic', 
        color: '#9333ea', 
        bg: 'rgba(147, 51, 234, 0.15)' 
      };
  }
};

/* ==================== SUB-COMPONENTS ==================== */
const MetricCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtext?: string;
  color: string;
  delay?: number;
}> = ({ icon: Icon, label, value, subtext, color, delay = 0 }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = 'clientX' in e ? e.clientX - rect.left : 'touches' in e ? e.touches[0].clientX - rect.left : rect.width / 2;
    const y = 'clientY' in e ? e.clientY - rect.top : 'touches' in e ? e.touches[0].clientY - rect.top : rect.height / 2;
    
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setIsPressed(true);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
      setIsPressed(false);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: 'rgba(var(--color-background-secondary), 0.7)',
        boxShadow: `0 0 20px ${color}30`
      }}
      whileTap={{ scale: 0.95 }}
      onTapStart={handleTap}
      style={{
        backgroundColor: 'rgba(var(--color-background-secondary), 0.5)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-3)',
        textAlign: 'center',
        minHeight: '52px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'var(--transition-card)',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${isPressed ? color + '40' : 'transparent'}`
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div 
        animate={{
          opacity: isPressed ? [0.1, 0.3, 0.1] : 0.1
        }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${color}10, transparent)`,
          pointerEvents: 'none'
        }} 
      />

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: `${color}40`,
              left: ripple.x - 10,
              top: ripple.y - 10,
              pointerEvents: 'none'
            }}
          />
        ))}
      </AnimatePresence>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          animate={{ 
            rotate: isPressed ? [0, 5, -5, 0] : 0,
            scale: isPressed ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-5 h-5 mx-auto" style={{ color, marginBottom: 'var(--spacing-1)' }} />
        </motion.div>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', marginBottom: 'var(--spacing-1)' }}>
          {label}
        </div>
        <div style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
          {value}
        </div>
      {subtext && (
        <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', marginTop: 'var(--spacing-1)' }}>
          {subtext}
        </div>
      )}
    </div>
  </motion.div>
  );
};

/* ==================== MAIN COMPONENT ==================== */
export default function WeatherScreen() {
  /* ===== State ===== */
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedHourly, setExpandedHourly] = useState<number | null>(null);
  const [expandedDaily, setExpandedDaily] = useState<number | null>(null);
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
  const [useMetric, setUseMetric] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showMinutelyPrecip, setShowMinutelyPrecip] = useState(true);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();
  const touchStartY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ===== Effects ===== */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  /* ===== Event Handlers ===== */
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
    setPullDistance(0);
    setIsPulling(false);
  }, []);

  const toggleUnit = useCallback(() => setUseMetric(prev => !prev), []);

  /* ===== Pull to Refresh Handlers ===== */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling || !scrollContainerRef.current) return;
    
    const touchY = e.touches[0].clientY;
    const distance = touchY - touchStartY.current;
    
    if (distance > 0 && scrollContainerRef.current.scrollTop === 0) {
      setPullDistance(Math.min(distance, 120));
    }
  }, [isPulling]);

  const handleTouchEnd = useCallback(() => {
    if (pullDistance > 80) {
      handleRefresh();
    } else {
      setPullDistance(0);
      setIsPulling(false);
    }
  }, [pullDistance, handleRefresh]);

  /* ===== Derived Values ===== */
  const tempUnit = useMetric ? '°C' : '°F';
  const currentWeather = CURRENT_WEATHER;
  const airQualityInfo = useMemo(() => getAirQualityInfo(currentWeather.airQuality), [currentWeather.airQuality]);
  const uvInfo = useMemo(() => getUVIndexInfo(currentWeather.uvIndex), [currentWeather.uvIndex]);
  const precipSummary = useMemo(() => getPrecipitationSummary(MINUTELY_PRECIPITATION), []);
  
  // Transform WEEKLY_FORECAST data for WeeklyWeatherWidget
  const weeklyWidgetData = useMemo(() => 
    WEEKLY_FORECAST.map((day, index) => ({
      date: `2024-10-${26 + index}`, // Generate ISO date format
      high: day.high,
      low: day.low,
      precipProb: day.precipitation / 100, // Convert percentage to 0-1
      icon: day.condition as 'sunny' | 'partly' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'fog'
    })), 
  []);

  /* ===== Loading State ===== */
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col" style={{ position: 'relative', zIndex: 'var(--z-base)' }}>
        <LiquidGlassHeader 
          title="Weather" 
          onSettingsClick={() => {}}
          hideBackButton={true}
        />
        <div className="flex flex-col" style={{
          padding: 'var(--spacing-6)',
          paddingTop: 0,
          gap: 'var(--spacing-4)',
          paddingBottom: 'calc(var(--nav-height) + 120px)'
        }}>
          <Skeleton style={{ height: '120px', borderRadius: 'var(--radius-lg)' }} />
          <Skeleton style={{ height: '320px', borderRadius: 'var(--radius-lg)' }} />
          <Skeleton style={{ height: '180px', borderRadius: 'var(--radius-lg)' }} />
          <Skeleton style={{ height: '240px', borderRadius: 'var(--radius-lg)' }} />
          <Skeleton style={{ height: '280px', borderRadius: 'var(--radius-lg)' }} />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full flex flex-col"
      style={{ 
        position: 'relative',
        zIndex: 'var(--z-base)',
        minHeight: '100%'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ==================== PULL TO REFRESH INDICATOR ==================== */}
      <AnimatePresence>
        {pullDistance > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: `${pullDistance}px`,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: 'var(--spacing-2)',
              background: 'linear-gradient(180deg, rgba(var(--color-background-secondary), 0.6) 0%, transparent 100%)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000
            }}
          >
            <motion.div
              animate={{ 
                rotate: pullDistance > 80 ? 360 : pullDistance * 3,
                scale: pullDistance > 80 ? 1.2 : 1
              }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <RefreshCw 
                size={24} 
                style={{ 
                  color: pullDistance > 80 ? 'rgb(var(--color-success))' : 'var(--text-secondary)',
                  transition: 'color 0.2s ease'
                }} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== CONTENT ==================== */}
      <motion.div 
        ref={contentRef}
        className="flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          padding: 'var(--spacing-6)',
          paddingTop: `calc(var(--spacing-4) + ${pullDistance}px)`,
          gap: 'var(--spacing-4)',
          paddingBottom: 'calc(var(--nav-height) + 120px)',
          position: 'relative',
          zIndex: 'var(--z-base)',
          overflowX: 'hidden',
          transition: 'padding-top 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* ==================== META INFO ==================== */}
        <motion.div 
          variants={cardVariants}
          className="flex items-center justify-between"
          style={{ marginBottom: 'calc(var(--spacing-2) * -1)' }}
        >
          <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
          <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
            <button
              onClick={toggleUnit}
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-xs)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 'var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                transition: 'var(--transition-button)',
                fontWeight: 'var(--font-weight-medium)'
              }}
              aria-label="Toggle temperature unit"
            >
              {useMetric ? '°F' : '°C'}
            </button>
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full backdrop-blur-md border flex items-center"
              style={{
                padding: 'var(--spacing-2)',
                gap: 'var(--spacing-2)',
                backgroundColor: 'var(--glass-bg)',
                borderColor: 'var(--glass-border)',
                transition: 'var(--transition-button)',
                cursor: isRefreshing ? 'not-allowed' : 'pointer',
                opacity: isRefreshing ? 0.6 : 1
              }}
              aria-label="Refresh weather data"
            >
              <motion.div
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: 'linear' }}
              >
                <RefreshCw size={16} style={{ color: 'var(--text-primary)' }} />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

        {/* ==================== WEATHER ALERT ==================== */}
        <motion.div 
          variants={cardVariants}
          className="backdrop-blur-md"
          style={{
            background: 'linear-gradient(135deg, rgba(var(--color-warning), 0.15), rgba(var(--color-goldenrod), 0.08))',
            border: '1px solid rgba(var(--color-warning), 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            boxShadow: 'var(--effect-card-premium)',
            position: 'relative',
          }}
        >
          <div className="flex items-start" style={{ gap: 'var(--spacing-3)' }}>
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <AlertTriangle size={22} style={{ color: 'rgb(var(--color-warning))', marginTop: '2px' }} />
            </motion.div>
            <div className="flex-1">
              <div style={{ 
                color: 'var(--text-primary)', 
                marginBottom: 'var(--spacing-1)', 
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: '15px'
              }}>
                High Wind Warning
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: 0 }}>
                Until 8 PM tonight - Secure outdoor items and avoid drone flights
              </p>
            </div>
          </div>
        </motion.div>

        {/* ==================== CURRENT WEATHER ==================== */}
        <motion.div 
          variants={cardVariants}
          className="backdrop-blur-md"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-5)',
            boxShadow: 'var(--effect-card-premium)',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: currentWeather.condition.toLowerCase().includes('sunny')
                ? 'linear-gradient(135deg, rgba(var(--color-warning), 0.1) 0%, rgba(var(--color-goldenrod), 0.05) 100%)'
                : currentWeather.condition.toLowerCase().includes('rain')
                ? 'linear-gradient(135deg, rgba(var(--color-info), 0.1) 0%, rgba(var(--color-info), 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(var(--color-text-secondary), 0.1) 0%, transparent 100%)',
              pointerEvents: 'none',
              borderRadius: 'var(--radius-lg)'
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Location Badge */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                display: 'inline-flex',
                gap: 'var(--spacing-2)', 
                marginBottom: 'var(--spacing-5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 'var(--radius-full)',
                padding: 'var(--spacing-2) var(--spacing-3)',
                alignSelf: 'flex-start',
                cursor: 'pointer',
                transition: 'var(--transition-button)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MapPin 
                  className="w-4 h-4" 
                  style={{ 
                    color: 'rgb(var(--color-info))',
                    filter: 'drop-shadow(0 0 4px rgba(var(--color-info), 0.4))'
                  }} 
                />
              </motion.div>
              <span style={{ 
                color: 'rgb(var(--color-text-primary))', 
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                letterSpacing: '0.01em',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
              }}>
                {currentWeather.location}
              </span>
            </motion.div>

            {/* Temperature & Condition */}
            <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-5)', gap: 'var(--spacing-3)' }}>
              <div className="flex items-start" style={{ gap: 'var(--spacing-3)' }}>
                <motion.div
                  style={{ marginTop: '12px' }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
                >
                  {getWeatherIcon('partly-cloudy', 52, true)}
                </motion.div>
                <div>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.45, type: 'spring', stiffness: 150 }}
                    style={{ 
                      fontSize: '64px',
                      lineHeight: '1',
                      color: getTemperatureColor(currentWeather.temp),
                      marginBottom: 'var(--spacing-2)',
                      fontWeight: 'var(--font-weight-bold)',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {convertTemp(currentWeather.temp, useMetric)}{tempUnit}
                  </motion.div>
                  <div style={{ 
                    color: 'var(--text-primary)', 
                    marginBottom: 'var(--spacing-1)', 
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: '16px'
                  }}>
                    {currentWeather.condition}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    Feels like {convertTemp(currentWeather.feelsLike, useMetric)}{tempUnit}
                  </div>
                </div>
              </div>
              
              {/* High/Low */}
              <div style={{ textAlign: 'right', marginTop: '12px' }}>
                <motion.div 
                  className="flex items-center justify-end" 
                  style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <TrendingUp className="w-4 h-4" style={{ color: 'rgb(var(--color-warning))' }} />
                  <span style={{ 
                    color: getTemperatureColor(currentWeather.high), 
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: '16px'
                  }}>
                    {convertTemp(currentWeather.high, useMetric)}{tempUnit}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-end" 
                  style={{ gap: 'var(--spacing-2)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <TrendingDown className="w-4 h-4" style={{ color: 'rgb(var(--color-info))' }} />
                  <span style={{ 
                    color: 'var(--text-secondary)', 
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: '16px'
                  }}>
                    {convertTemp(currentWeather.low, useMetric)}{tempUnit}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Weather Metrics Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--spacing-3)',
              marginBottom: 'var(--spacing-4)'
            }}>
              <MetricCard
                icon={Droplets}
                label="Humidity"
                value={`${currentWeather.humidity}%`}
                color="rgb(var(--color-info))"
                delay={0.6}
              />
              <MetricCard
                icon={Wind}
                label="Wind"
                value={`${currentWeather.windSpeed} mph`}
                subtext={currentWeather.windDirection}
                color="#06b6d4"
                delay={0.65}
              />
              <MetricCard
                icon={Eye}
                label="Visibility"
                value={`${currentWeather.visibility} mi`}
                color="#8b5cf6"
                delay={0.7}
              />
              <MetricCard
                icon={Gauge}
                label="Pressure"
                value={`${currentWeather.pressure} in`}
                color="rgb(var(--color-warning))"
                delay={0.75}
              />
            </div>

            {/* Sun & Air Quality Info */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 'var(--spacing-3)',
              paddingTop: 'var(--spacing-4)',
              borderTop: '1px solid rgba(var(--color-border-primary), 0.5)'
            }}>
              {/* Sunrise/Sunset */}
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ gap: 'var(--spacing-3)', padding: 'var(--spacing-2)' }}
              >
                <div className="flex flex-col" style={{ gap: 'var(--spacing-2)' }}>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
                    <Sunrise className="w-4 h-4" style={{ color: 'rgb(var(--color-warning))' }} />
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Sunrise</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {currentWeather.sunrise}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
                    <Sunset className="w-4 h-4" style={{ color: 'rgb(var(--color-goldenrod))' }} />
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Sunset</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {currentWeather.sunset}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* UV & Air Quality */}
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                style={{ gap: 'var(--spacing-2)', padding: 'var(--spacing-2)' }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>UV Index</span>
                  <Badge style={{ 
                    backgroundColor: uvInfo.color + '20',
                    color: uvInfo.color,
                    border: 'none',
                    fontSize: 'var(--text-xs)',
                    padding: '3px 10px'
                  }}>
                    {currentWeather.uvIndex} {uvInfo.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Air Quality</span>
                  <Badge style={{ 
                    backgroundColor: airQualityInfo.bg,
                    color: airQualityInfo.color,
                    border: 'none',
                    fontSize: 'var(--text-xs)',
                    padding: '3px 10px'
                  }}>
                    {currentWeather.airQuality} {airQualityInfo.label}
                  </Badge>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ==================== MINUTELY PRECIPITATION ==================== */}
        {showMinutelyPrecip && (
          <motion.div 
            variants={cardVariants}
            className="backdrop-blur-md"
            style={{
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-4)',
              boxShadow: 'var(--effect-card-premium)',
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-3)' }}>
              <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
                <Umbrella className="w-5 h-5" style={{ color: 'rgb(var(--color-info))' }} />
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  margin: 0, 
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: '16px'
                }}>
                  Next Hour
                </h3>
              </div>
            </div>

            <div style={{ 
              color: 'var(--text-secondary)', 
              fontSize: 'var(--text-sm)', 
              marginBottom: 'var(--spacing-3)',
              padding: 'var(--spacing-3)',
              backgroundColor: 'rgba(var(--color-info), 0.1)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(var(--color-info), 0.2)'
            }}>
              {precipSummary}
            </div>

            <div style={{ height: '80px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MINUTELY_PRECIPITATION} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar 
                    dataKey="intensity" 
                    fill="rgba(var(--color-info), 0.6)" 
                    radius={[2, 2, 0, 0]}
                    animationDuration={800}
                  />
                  <XAxis 
                    dataKey="time" 
                    stroke="var(--text-tertiary)" 
                    style={{ fontSize: '9px' }}
                    interval={9}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* ==================== HOURLY FORECAST ==================== */}
        <motion.div 
          variants={cardVariants}
          className="backdrop-blur-md"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            boxShadow: 'var(--effect-card-premium)',
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-3)' }}>
            <h3 style={{ 
              color: 'var(--text-primary)', 
              margin: 0, 
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: '16px'
            }}>
              Hourly Forecast
            </h3>
            <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>
              Next 12 hours
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Scroll gradient indicators */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '30px',
              background: 'linear-gradient(90deg, var(--glass-bg), transparent)',
              pointerEvents: 'none',
              zIndex: 2
            }} />
            <div style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '30px',
              background: 'linear-gradient(270deg, var(--glass-bg), transparent)',
              pointerEvents: 'none',
              zIndex: 2
            }} />

            <div 
              className="overflow-x-auto scrollbar-hide" 
              style={{ 
                marginLeft: 'calc(var(--spacing-4) * -1)', 
                marginRight: 'calc(var(--spacing-4) * -1)', 
                paddingLeft: 'var(--spacing-4)', 
                paddingRight: 'var(--spacing-4)',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
            <div className="flex" style={{ gap: 'var(--spacing-3)', paddingBottom: 'var(--spacing-2)' }}>
              {HOURLY_FORECAST.map((hour, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-depth-md)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpandedHourly(expandedHourly === index ? null : index)}
                  style={{
                    backgroundColor: expandedHourly === index 
                      ? 'rgba(var(--color-background-secondary), 0.6)'
                      : 'rgba(var(--color-background-secondary), 0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--spacing-3)',
                    minWidth: '78px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition-card)',
                    scrollSnapAlign: 'start',
                    border: expandedHourly === index 
                      ? '1px solid rgba(var(--color-border-focus), 0.5)' 
                      : '1px solid transparent',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Highlight "Now" */}
                  {index === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgb(var(--color-info)), transparent)'
                    }} />
                  )}

                  <div style={{ 
                    color: index === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', 
                    fontSize: 'var(--text-xs)', 
                    marginBottom: 'var(--spacing-2)', 
                    fontWeight: index === 0 ? 'var(--font-weight-bold)' : 'var(--font-weight-semibold)'
                  }}>
                    {hour.time}
                  </div>
                  
                  <div style={{ marginBottom: 'var(--spacing-2)' }}>
                    {getWeatherIcon(hour.condition, 28, true)}
                  </div>
                  
                  <div style={{ 
                    color: getTemperatureColor(hour.temp), 
                    marginBottom: 'var(--spacing-2)', 
                    fontWeight: 'var(--font-weight-bold)', 
                    fontSize: '17px' 
                  }}>
                    {convertTemp(hour.temp, useMetric)}{tempUnit}
                  </div>
                  
                  {/* Precipitation Bar */}
                  <div style={{ 
                    width: '100%', 
                    height: '52px', 
                    position: 'relative', 
                    backgroundColor: 'rgba(var(--color-border-primary), 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--spacing-1)',
                    overflow: 'hidden'
                  }}>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${hour.precipitation}%` }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.6, ease: 'easeOut' }}
                      style={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(var(--color-info), 0.8), rgba(var(--color-info), 0.5))',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    />
                  </div>
                  
                  <div style={{ 
                    color: 'rgb(var(--color-info))', 
                    fontSize: '11px', 
                    fontWeight: 'var(--font-weight-semibold)' 
                  }}>
                    {hour.precipitation}%
                  </div>
                  
                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedHourly === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ 
                          marginTop: 'var(--spacing-2)', 
                          paddingTop: 'var(--spacing-2)',
                          borderTop: '1px solid rgba(var(--color-border-primary), 0.3)'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                          <div className="flex items-center justify-center" style={{ gap: 'var(--spacing-1)' }}>
                            <Wind size={14} style={{ color: 'var(--text-tertiary)' }} />
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                              {hour.windSpeed} mph
                            </span>
                          </div>
                          <div className="flex items-center justify-center" style={{ gap: 'var(--spacing-1)' }}>
                            <Droplets size={14} style={{ color: 'var(--text-tertiary)' }} />
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                              {hour.humidity}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </motion.div>

        {/* ==================== 7-DAY FORECAST ==================== */}
        <motion.div 
          variants={cardVariants}
          className="backdrop-blur-md"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            boxShadow: 'var(--effect-card-premium)',
          }}
        >
          <h3 style={{ 
            color: 'var(--text-primary)', 
            margin: 0, 
            marginBottom: 'var(--spacing-3)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: '16px'
          }}>
            7-Day Forecast
          </h3>

          <div className="flex flex-col" style={{ gap: 'var(--spacing-2)' }}>
            {WEEKLY_FORECAST.map((day, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-depth-sm)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setExpandedDaily(expandedDaily === index ? null : index)}
                className="flex flex-col"
                style={{
                  backgroundColor: expandedDaily === index 
                    ? 'rgba(var(--color-background-secondary), 0.6)'
                    : 'rgba(var(--color-background-secondary), 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--spacing-3)',
                  cursor: 'pointer',
                  transition: 'var(--transition-card)',
                  border: expandedDaily === index 
                    ? '1px solid rgba(var(--color-border-focus), 0.5)' 
                    : '1px solid transparent',
                }}
              >
                <div className="flex items-center justify-between" style={{ gap: 'var(--spacing-3)' }}>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-3)', minWidth: '100px' }}>
                    <div style={{ minWidth: '60px' }}>
                      <div style={{ 
                        color: 'var(--text-primary)', 
                        fontSize: '15px', 
                        marginBottom: 'var(--spacing-1)', 
                        fontWeight: 'var(--font-weight-semibold)' 
                      }}>
                        {day.day}
                      </div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>
                        Oct {day.date}
                      </div>
                    </div>
                    {getWeatherIcon(day.condition, 28, false)}
                  </div>
                  
                  <div className="flex items-center justify-end" style={{ gap: 'var(--spacing-2)', flex: 1 }}>
                    <span style={{ 
                      color: getTemperatureColor(day.high), 
                      fontWeight: 'var(--font-weight-bold)', 
                      fontSize: '15px' 
                    }}>
                      {convertTemp(day.high, useMetric)}{tempUnit}
                    </span>
                    
                    <div style={{ 
                      position: 'relative', 
                      width: '48px', 
                      height: '5px', 
                      backgroundColor: 'rgba(var(--color-border-primary), 0.5)',
                      borderRadius: 'var(--radius-full)',
                    }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((day.high - 40) / 60) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.05, duration: 0.6, ease: 'easeOut' }}
                        style={{ 
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          background: `linear-gradient(to right, ${getTemperatureColor(day.low)}, ${getTemperatureColor(day.high)})`,
                          borderRadius: 'var(--radius-full)'
                        }}
                      />
                    </div>
                    
                    <span style={{ 
                      color: 'var(--text-secondary)', 
                      fontWeight: 'var(--font-weight-semibold)', 
                      fontSize: '15px' 
                    }}>
                      {convertTemp(day.low, useMetric)}{tempUnit}
                    </span>
                    
                    <div className="flex items-center" style={{ gap: '4px', minWidth: '45px' }}>
                      <Droplets className="w-4 h-4" style={{ color: 'rgb(var(--color-info))' }} />
                      <span style={{ 
                        color: 'rgb(var(--color-info))', 
                        fontSize: 'var(--text-xs)', 
                        fontWeight: 'var(--font-weight-semibold)' 
                      }}>
                        {day.precipitation}%
                      </span>
                    </div>

                    <ChevronDown 
                      size={18} 
                      style={{ 
                        color: 'var(--text-tertiary)',
                        transform: expandedDaily === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }} 
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {expandedDaily === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ 
                        marginTop: 'var(--spacing-3)', 
                        paddingTop: 'var(--spacing-3)',
                        borderTop: '1px solid rgba(var(--color-border-primary), 0.3)'
                      }}
                    >
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 'var(--spacing-3)'
                      }}>
                        <div>
                          <span style={{ 
                            color: 'var(--text-tertiary)', 
                            fontSize: 'var(--text-xs)', 
                            display: 'block',
                            marginBottom: 'var(--spacing-1)' 
                          }}>
                            Condition
                          </span>
                          <div style={{ 
                            color: 'var(--text-primary)', 
                            fontSize: '14px', 
                            fontWeight: 'var(--font-weight-medium)' 
                          }}>
                            {day.condition.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </div>
                        </div>
                        <div>
                          <span style={{ 
                            color: 'var(--text-tertiary)', 
                            fontSize: 'var(--text-xs)', 
                            display: 'block',
                            marginBottom: 'var(--spacing-1)' 
                          }}>
                            UV Index
                          </span>
                          <div style={{ 
                            color: 'var(--text-primary)', 
                            fontSize: '14px', 
                            fontWeight: 'var(--font-weight-medium)' 
                          }}>
                            {day.uvIndex} ({getUVIndexInfo(day.uvIndex).label})
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================== TEMPERATURE TRENDS ==================== */}
        <motion.div 
          variants={cardVariants}
          className="backdrop-blur-md"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            boxShadow: 'var(--effect-card-premium)',
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-3)' }}>
            <h3 style={{ 
              color: 'var(--text-primary)', 
              margin: 0, 
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: '16px'
            }}>
              Temperature Trends
            </h3>
            <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>
              Last 4 Months
            </span>
          </div>

          <div style={{ marginBottom: 'var(--spacing-4)', width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HISTORICAL_CHART_DATA} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(var(--color-warning))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="rgb(var(--color-warning))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(var(--color-info))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="rgb(var(--color-info))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--color-border-primary), 0.2)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--text-tertiary)" 
                  style={{ fontSize: 'var(--text-xs)' }}
                />
                <YAxis 
                  stroke="var(--text-tertiary)" 
                  style={{ fontSize: 'var(--text-xs)' }}
                  domain={[50, 95]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-md)',
                    backdropFilter: 'blur(12px)',
                    fontSize: 'var(--text-sm)'
                  }}
                  labelStyle={{ color: 'var(--text-primary)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="high" 
                  stroke="rgb(var(--color-warning))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorHigh)"
                  animationDuration={1000}
                />
                <Area 
                  type="monotone" 
                  dataKey="low" 
                  stroke="rgb(var(--color-info))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorLow)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-3)' }}>
            {[
              { label: 'Peak Temp', value: `92${tempUnit}`, subtext: 'July', color: getTemperatureColor(92) },
              { label: 'Lowest', value: `56${tempUnit}`, subtext: 'October', color: getTemperatureColor(56) },
              { label: 'Rainfall', value: '11.5"', subtext: '4 months', color: 'var(--text-primary)' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-3)',
                  backgroundColor: 'rgba(var(--color-background-secondary), 0.4)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'var(--transition-card)'
                }}
              >
                <div style={{ 
                  color: 'var(--text-tertiary)', 
                  fontSize: 'var(--text-xs)', 
                  marginBottom: 'var(--spacing-2)' 
                }}>
                  {stat.label}
                </div>
                <div style={{ 
                  color: stat.color, 
                  fontSize: '28px', 
                  marginBottom: 'var(--spacing-1)', 
                  fontWeight: 'var(--font-weight-bold)',
                  lineHeight: '1'
                }}>
                  {stat.value}
                </div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>
                  {stat.subtext}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================== FORENSIC WEATHER INCIDENTS ==================== */}
        <motion.div 
          variants={cardVariants}
          className="backdrop-blur-md"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            boxShadow: 'var(--effect-card-premium)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Header with gradient accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, rgb(var(--color-error)), rgb(var(--color-warning)), rgb(var(--color-info)))'
          }} />

          <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-4)' }}>
            <div>
              <div className="flex items-center" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
                <AlertCircle className="w-5 h-5" style={{ color: 'rgb(var(--color-error))' }} />
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  margin: 0, 
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: '16px'
                }}>
                  Annual Forensic Weather Report
                </h3>
              </div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: 'var(--text-sm)', 
                margin: 0,
                marginTop: 'var(--spacing-1)'
              }}>
                Historical severe weather events affecting properties in your area
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 'var(--spacing-3)',
            marginBottom: 'var(--spacing-4)',
            padding: 'var(--spacing-3)',
            backgroundColor: 'rgba(var(--color-background-secondary), 0.3)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(var(--color-border-primary), 0.3)'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'var(--font-weight-bold)', 
                color: 'rgb(var(--color-error))',
                marginBottom: 'var(--spacing-1)'
              }}>
                {FORENSIC_INCIDENTS.length}
              </div>
              <div style={{ 
                fontSize: 'var(--text-xs)', 
                color: 'var(--text-tertiary)' 
              }}>
                Major Events
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'var(--font-weight-bold)', 
                color: 'rgb(var(--color-warning))',
                marginBottom: 'var(--spacing-1)'
              }}>
                1,835
              </div>
              <div style={{ 
                fontSize: 'var(--text-xs)', 
                color: 'var(--text-tertiary)' 
              }}>
                Properties Affected
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'var(--font-weight-bold)', 
                color: 'rgb(var(--color-info))',
                marginBottom: 'var(--spacing-1)'
              }}>
                $20.2M
              </div>
              <div style={{ 
                fontSize: 'var(--text-xs)', 
                color: 'var(--text-tertiary)' 
              }}>
                Total Damages
              </div>
            </motion.div>
          </div>

          {/* Incidents List */}
          <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
            {FORENSIC_INCIDENTS.map((incident, index) => {
              const Icon = getIncidentIcon(incident.type);
              const iconColor = getIncidentColor(incident.type);
              const severityInfo = getSeverityInfo(incident.severity);
              const isExpanded = expandedIncident === incident.id;

              return (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.01, boxShadow: 'var(--shadow-depth-md)' }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setExpandedIncident(isExpanded ? null : incident.id)}
                  style={{
                    backgroundColor: isExpanded 
                      ? 'rgba(var(--color-background-secondary), 0.6)'
                      : 'rgba(var(--color-background-secondary), 0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--spacing-4)',
                    cursor: 'pointer',
                    transition: 'var(--transition-card)',
                    border: isExpanded 
                      ? `1px solid ${iconColor}40`
                      : '1px solid transparent',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Gradient accent bar */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    backgroundColor: iconColor
                  }} />

                  {/* Main Content */}
                  <div style={{ paddingLeft: 'var(--spacing-2)' }}>
                    {/* Header Row */}
                    <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-2)' }}>
                      <div className="flex items-start" style={{ gap: 'var(--spacing-3)', flex: 1 }}>
                        <motion.div
                          animate={{ 
                            rotate: isExpanded ? [0, -10, 10, -10, 0] : 0,
                            scale: isExpanded ? 1.1 : 1
                          }}
                          transition={{ duration: 0.5 }}
                          style={{
                            backgroundColor: iconColor + '20',
                            borderRadius: 'var(--radius-md)',
                            padding: 'var(--spacing-2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Icon size={22} style={{ color: iconColor }} />
                        </motion.div>
                        
                        <div style={{ flex: 1 }}>
                          <div className="flex items-center" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)', flexWrap: 'wrap' }}>
                            <h4 style={{ 
                              color: 'var(--text-primary)', 
                              margin: 0, 
                              fontWeight: 'var(--font-weight-semibold)',
                              fontSize: '15px'
                            }}>
                              {incident.title}
                            </h4>
                            <Badge style={{
                              backgroundColor: severityInfo.bg,
                              color: severityInfo.color,
                              border: 'none',
                              fontSize: '10px',
                              padding: '3px 8px',
                              fontWeight: 'var(--font-weight-semibold)'
                            }}>
                              {severityInfo.label}
                            </Badge>
                          </div>
                          <div style={{ 
                            color: 'var(--text-tertiary)', 
                            fontSize: 'var(--text-xs)',
                            marginBottom: 'var(--spacing-2)'
                          }}>
                            {incident.date}
                          </div>
                          <p style={{ 
                            color: 'var(--text-secondary)', 
                            fontSize: 'var(--text-sm)', 
                            margin: 0,
                            lineHeight: '1.5'
                          }}>
                            {incident.description}
                          </p>
                        </div>
                      </div>

                      <ChevronDown 
                        size={18} 
                        style={{ 
                          color: 'var(--text-tertiary)',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          flexShrink: 0,
                          marginLeft: 'var(--spacing-2)'
                        }} 
                      />
                    </div>

                    {/* Quick Stats */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(3, 1fr)', 
                      gap: 'var(--spacing-2)',
                      marginTop: 'var(--spacing-3)',
                      paddingTop: 'var(--spacing-3)',
                      borderTop: '1px solid rgba(var(--color-border-primary), 0.2)'
                    }}>
                      <div>
                        <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                          Properties
                        </div>
                        <div style={{ 
                          fontSize: '14px', 
                          fontWeight: 'var(--font-weight-semibold)', 
                          color: 'var(--text-primary)' 
                        }}>
                          {incident.propertyImpact.propertiesAffected}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                          Damage
                        </div>
                        <div style={{ 
                          fontSize: '14px', 
                          fontWeight: 'var(--font-weight-semibold)', 
                          color: iconColor
                        }}>
                          {incident.propertyImpact.estimatedDamage}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                          Claims Filed
                        </div>
                        <div style={{ 
                          fontSize: '14px', 
                          fontWeight: 'var(--font-weight-semibold)', 
                          color: 'var(--text-primary)' 
                        }}>
                          {incident.propertyImpact.claimsFiled}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ 
                            marginTop: 'var(--spacing-4)',
                            paddingTop: 'var(--spacing-4)',
                            borderTop: '1px solid rgba(var(--color-border-primary), 0.3)'
                          }}>
                            {/* Weather Metrics */}
                            {Object.keys(incident.metrics).length > 0 && (
                              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                                <h5 style={{ 
                                  color: 'var(--text-primary)', 
                                  fontSize: '13px',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  marginBottom: 'var(--spacing-2)',
                                  margin: 0
                                }}>
                                  Weather Metrics
                                </h5>
                                <div style={{ 
                                  display: 'grid', 
                                  gridTemplateColumns: 'repeat(2, 1fr)', 
                                  gap: 'var(--spacing-2)',
                                  marginTop: 'var(--spacing-2)'
                                }}>
                                  {incident.metrics.windSpeed && (
                                    <div style={{
                                      padding: 'var(--spacing-2)',
                                      backgroundColor: 'rgba(var(--color-background-secondary), 0.4)',
                                      borderRadius: 'var(--radius-sm)'
                                    }}>
                                      <div className="flex items-center" style={{ gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-1)' }}>
                                        <Wind size={14} style={{ color: iconColor }} />
                                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                                          Wind Speed
                                        </span>
                                      </div>
                                      <div style={{ fontSize: '15px', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>
                                        {incident.metrics.windSpeed} mph
                                      </div>
                                    </div>
                                  )}
                                  {incident.metrics.hailSize && (
                                    <div style={{
                                      padding: 'var(--spacing-2)',
                                      backgroundColor: 'rgba(var(--color-background-secondary), 0.4)',
                                      borderRadius: 'var(--radius-sm)'
                                    }}>
                                      <div className="flex items-center" style={{ gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-1)' }}>
                                        <CloudSnow size={14} style={{ color: iconColor }} />
                                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                                          Hail Size
                                        </span>
                                      </div>
                                      <div style={{ fontSize: '15px', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>
                                        {incident.metrics.hailSize}" diameter
                                      </div>
                                    </div>
                                  )}
                                  {incident.metrics.rainfall && (
                                    <div style={{
                                      padding: 'var(--spacing-2)',
                                      backgroundColor: 'rgba(var(--color-background-secondary), 0.4)',
                                      borderRadius: 'var(--radius-sm)'
                                    }}>
                                      <div className="flex items-center" style={{ gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-1)' }}>
                                        <Droplets size={14} style={{ color: iconColor }} />
                                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                                          Rainfall
                                        </span>
                                      </div>
                                      <div style={{ fontSize: '15px', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>
                                        {incident.metrics.rainfall}" total
                                      </div>
                                    </div>
                                  )}
                                  {incident.metrics.duration && (
                                    <div style={{
                                      padding: 'var(--spacing-2)',
                                      backgroundColor: 'rgba(var(--color-background-secondary), 0.4)',
                                      borderRadius: 'var(--radius-sm)'
                                    }}>
                                      <div className="flex items-center" style={{ gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-1)' }}>
                                        <Gauge size={14} style={{ color: iconColor }} />
                                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                                          Duration
                                        </span>
                                      </div>
                                      <div style={{ fontSize: '15px', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>
                                        {incident.metrics.duration} min
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Forensic Data */}
                            <div style={{ marginBottom: 'var(--spacing-3)' }}>
                              <h5 style={{ 
                                color: 'var(--text-primary)', 
                                fontSize: '13px',
                                fontWeight: 'var(--font-weight-semibold)',
                                marginBottom: 'var(--spacing-2)',
                                margin: 0
                              }}>
                                Forensic Analysis
                              </h5>
                              
                              <div style={{ marginTop: 'var(--spacing-2)' }}>
                                <div style={{ 
                                  fontSize: '11px', 
                                  color: 'var(--text-tertiary)',
                                  marginBottom: 'var(--spacing-1)'
                                }}>
                                  Peak Intensity
                                </div>
                                <div style={{ 
                                  fontSize: '13px', 
                                  color: 'var(--text-primary)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  marginBottom: 'var(--spacing-2)'
                                }}>
                                  {incident.forensicData.peakIntensity}
                                </div>

                                <div style={{ 
                                  fontSize: '11px', 
                                  color: 'var(--text-tertiary)',
                                  marginBottom: 'var(--spacing-1)'
                                }}>
                                  Affected Areas
                                </div>
                                <div className="flex flex-wrap" style={{ gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-3)' }}>
                                  {incident.forensicData.affectedAreas.map((area, idx) => (
                                    <Badge 
                                      key={idx}
                                      style={{
                                        backgroundColor: 'rgba(var(--color-background-secondary), 0.5)',
                                        color: 'var(--text-secondary)',
                                        border: '1px solid rgba(var(--color-border-primary), 0.3)',
                                        fontSize: '11px',
                                        padding: '4px 8px'
                                      }}
                                    >
                                      {area}
                                    </Badge>
                                  ))}
                                </div>

                                <div style={{ 
                                  fontSize: '11px', 
                                  color: 'var(--text-tertiary)',
                                  marginBottom: 'var(--spacing-2)'
                                }}>
                                  Inspection Recommendations
                                </div>
                                <div className="flex flex-col" style={{ gap: 'var(--spacing-2)' }}>
                                  {incident.forensicData.recommendations.map((rec, idx) => (
                                    <div 
                                      key={idx}
                                      className="flex items-start"
                                      style={{ gap: 'var(--spacing-2)' }}
                                    >
                                      <div style={{
                                        width: '4px',
                                        height: '4px',
                                        borderRadius: '50%',
                                        backgroundColor: iconColor,
                                        marginTop: '6px',
                                        flexShrink: 0
                                      }} />
                                      <span style={{ 
                                        fontSize: '12px', 
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.5'
                                      }}>
                                        {rec}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              style={{
                                width: '100%',
                                padding: 'var(--spacing-3)',
                                backgroundColor: iconColor + '20',
                                border: `1px solid ${iconColor}40`,
                                borderRadius: 'var(--radius-md)',
                                color: iconColor,
                                fontSize: '13px',
                                fontWeight: 'var(--font-weight-semibold)',
                                cursor: 'pointer',
                                transition: 'var(--transition-button)',
                                marginTop: 'var(--spacing-2)'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle action
                              }}
                            >
                              Schedule Property Inspection
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div style={{
            marginTop: 'var(--spacing-4)',
            padding: 'var(--spacing-3)',
            backgroundColor: 'rgba(var(--color-info), 0.1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(var(--color-info), 0.2)'
          }}>
            <div className="flex items-start" style={{ gap: 'var(--spacing-2)' }}>
              <AlertCircle size={16} style={{ color: 'rgb(var(--color-info))', marginTop: '2px', flexShrink: 0 }} />
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: 'var(--text-xs)', 
                margin: 0,
                lineHeight: '1.5'
              }}>
                <strong style={{ color: 'var(--text-primary)' }}>Note:</strong> This forensic report is compiled from historical weather data and property damage claims. 
                Use drone inspections to assess current property conditions and identify weather-related damage.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
