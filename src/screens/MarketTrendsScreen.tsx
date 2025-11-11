/**
 * ==============================================================================
 * MARKETTRENDSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Real estate market trends for San Francisco with charts, stats,
 * neighborhood analysis, and market insights for insurance underwriting.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CHARTS:
 *    - victory-native for market charts (line, bar, area)
 *    - npm install victory-native react-native-svg
 *    - Animated chart transitions
 *    - Interactive tooltips on data points
 * 
 * 2. STATS CARDS:
 *    - Animated number counters
 *    - Real-time market data updates
 *    - Trend indicators (up/down arrows)
 * 
 * 3. IMAGE HANDLING:
 *    - Fast Image for neighborhood photos
 *    - Progressive loading with blur-up
 *    - Cached images for offline viewing
 * 
 * 4. ANIMATIONS:
 *    - react-native-reanimated for smooth transitions
 *    - Stagger animations for stats grid
 *    - Scroll-based parallax effects
 * 
 * 5. DATA REFRESH:
 *    - Pull-to-refresh for latest market data
 *    - Auto-refresh every 15 minutes
 *    - Optimistic updates
 * 
 * ==============================================================================
 * REQUIRED API ENDPOINTS
 * ==============================================================================
 * 
 * 1. GET /api/market/trends?location=SF&period=12months
 *    Returns: Market statistics, price trends, activity metrics
 * 
 * 2. GET /api/market/neighborhoods?location=SF&limit=10
 *    Returns: Top neighborhoods with pricing and trends
 * 
 * 3. GET /api/market/insights?location=SF
 *    Returns: AI-generated market insights and predictions
 * 
 * 4. GET /api/market/charts/price-history?location=SF&period=12months
 *    Returns: Historical price data for charts
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Market stats load from API
 * - [ ] Charts render correctly
 * - [ ] Neighborhood cards display images
 * - [ ] Pull-to-refresh works
 * - [ ] Trend indicators accurate
 * - [ ] Navigation to detail screens
 * - [ ] Offline mode shows cached data
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, RefreshControl, Image } from 'react-native';
// RN: import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { TrendingUp, TrendingDown, DollarSign, Home, BarChart3, Activity, Calendar, MapPin } from "lucide-react";

// RN: Motion animations → react-native-reanimated
// RN: import Animated, { useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { motion } from "motion/react";

// RN: ImageWithFallback → FastImage with error handling
// RN: import FastImage from 'react-native-fast-image';
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// RN: ==============================================================================
// RN: COMPONENT DEFINITION
// RN: ==============================================================================
// RN:
// RN: interface MarketTrendsScreenProps {
// RN:   navigation: NavigationProp<any>;
// RN:   route: RouteProp<any, 'MarketTrends'>;
// RN: }

export function MarketTrendsScreen() {
  // RN: TanStack Query for market data
  // RN: const [refreshing, setRefreshing] = useState(false);
  // RN: 
  // RN: const { data: marketStats, isLoading, refetch } = useQuery({
  // RN:   queryKey: ['marketStats', 'SF'],
  // RN:   queryFn: () => marketApi.getMarketStats('SF'),
  // RN:   staleTime: 15 * 60 * 1000, // 15 minutes
  // RN: });
  // RN:
  // RN: const { data: neighborhoods } = useQuery({
  // RN:   queryKey: ['neighborhoods', 'SF'],
  // RN:   queryFn: () => marketApi.getTopNeighborhoods('SF'),
  // RN: });
  // RN:
  // RN: const { data: insights } = useQuery({
  // RN:   queryKey: ['marketInsights', 'SF'],
  // RN:   queryFn: () => marketApi.getMarketInsights('SF'),
  // RN: });
  // RN:
  // RN: // Pull-to-refresh handler
  // RN: const onRefresh = useCallback(async () => {
  // RN:   setRefreshing(true);
  // RN:   await refetch();
  // RN:   setRefreshing(false);
  // RN: }, [refetch]);

  // RN: MOCK DATA - Replace with API calls
  // RN: In production, this would come from TanStack Query
  const marketStats = [
    {
      title: "SF Median Home Price",
      value: "$1.38M",
      change: "+5.2%",
      trend: "up" as const,
      icon: <DollarSign />,
      color: "#10b981",
      // RN: icon: 'dollar-sign' (react-native-vector-icons)
    },
    {
      title: "Average Days on Market",
      value: "32 days",
      change: "-8%",
      trend: "down" as const,
      icon: <Calendar />,
      color: "#3b82f6",
      // RN: icon: 'calendar'
    },
    {
      title: "Properties Sold (SF)",
      value: "847",
      change: "+6.8%",
      trend: "up" as const,
      icon: <Home />,
      color: "#8b5cf6",
      // RN: icon: 'home'
    },
    {
      title: "SF Market Activity",
      value: "High",
      change: "+12%",
      trend: "up" as const,
      icon: <Activity />,
      color: "#f59e0b",
      // RN: icon: 'activity'
    },
  ];

  const neighborhoods = [
    {
      name: "Pacific Heights",
      avgPrice: "$3.2M",
      change: "+5.8%",
      trend: "up" as const,
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9va2x5biUyMGhlaWdodHMlMjBuZWlnaGJvcmhvb2R8ZW58MXx8fHwxNzYyMjg4MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Noe Valley",
      avgPrice: "$2.1M",
      change: "+4.3%",
      trend: "up" as const,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjBob3VzZXN8ZW58MXx8fHwxNzYyMjg4MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Mission District",
      avgPrice: "$1.6M",
      change: "+6.7%",
      trend: "up" as const,
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMG5laWdoYm9yaG9vZHxlbnwxfHx8fDE3NjIyODgyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const insights = [
    {
      title: "Buyer's Market Emerging",
      description: "Inventory levels are increasing, giving buyers more negotiating power in select neighborhoods.",
      icon: <TrendingDown />,
      color: "#3b82f6",
    },
    {
      title: "Interest Rate Impact",
      description: "Recent rate changes are affecting purchasing power. Fixed-rate mortgages remain attractive.",
      icon: <BarChart3 />,
      color: "#8b5cf6",
    },
    {
      title: "Seasonal Trends",
      description: "Spring market showing traditional uptick in activity with 15% more listings than last month.",
      icon: <TrendingUp />,
      color: "#10b981",
    },
  ];

  return (
    // RN: ROOT CONTAINER
    // RN: <SafeAreaView style={styles.container}>
    // RN:   <ScrollView
    // RN:     contentContainerStyle={styles.scrollContent}
    // RN:     refreshControl={
    // RN:       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    // RN:     }
    // RN:   >
    <div
      className="w-full h-full flex flex-col overflow-y-auto"
      style={{
        padding: 'var(--spacing-6)',
        gap: 'var(--spacing-6)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-12))',
      }}
    >
      {/* HERO SECTION
       * RN: Hero banner with market overview
       * RN: <Animated.View
       * RN:   entering={FadeIn.duration(500)}
       * RN:   style={styles.heroSection}
       * RN: >
       * RN:   <FastImage
       * RN:     source={{ uri: heroImageUrl, priority: FastImage.priority.high }}
       * RN:     style={styles.heroImage}
       * RN:     resizeMode={FastImage.resizeMode.cover}
       * RN:   />
       * RN:   <LinearGradient
       * RN:     colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
       * RN:     style={styles.heroGradient}
       * RN:   />
       * RN:   <View style={styles.heroContent}>
       * RN:     <View style={styles.heroHeader}>
       * RN:       <Icon name="trending-up" size={24} color="#10b981" />
       * RN:       <Text style={styles.heroTitle}>Market Trends</Text>
       * RN:     </View>
       * RN:     <Text style={styles.heroSubtitle}>
       * RN:       San Francisco real estate market insights and analysis
       * RN:     </Text>
       * RN:   </View>
       * RN: </Animated.View>
       * RN:
       * RN: StyleSheet:
       * RN: heroSection: {
       * RN:   position: 'relative',
       * RN:   borderRadius: 24,
       * RN:   overflow: 'hidden',
       * RN:   height: 200,
       * RN:   backgroundColor: theme.colors.glassBg,
       * RN:   borderWidth: 2,
       * RN:   borderColor: theme.colors.glassBorder,
       * RN: }
       */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          height: '200px',
          backgroundColor: 'var(--glass-bg)',
          border: '2px solid var(--glass-border)',
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1717957566742-fd92d32e01d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbWFya2V0JTIwdHJlbmRzJTIwY2hhcnQlMjBncmFwaHxlbnwxfHx8fDE3NjIyODgyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'var(--spacing-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
          }}
        >
          <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
            <TrendingUp className="w-6 h-6" style={{ color: '#10b981' }} />
            <h1 style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)' }}>
              Market Trends
            </h1>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 8px rgba(0, 0, 0, 0.8)' }}>
            San Francisco real estate market insights and analysis
          </p>
        </div>
      </motion.div>

      {/* MARKET STATS GRID
       * RN: Animated 2x2 grid of market statistics
       * RN: <View style={styles.statsSection}>
       * RN:   <Text style={styles.sectionTitle}>San Francisco Market Overview</Text>
       * RN:   <View style={styles.statsGrid}>
       * RN:     {marketStats?.map((stat, index) => (
       * RN:       <Animated.View
       * RN:         key={stat.id}
       * RN:         entering={FadeInDown.delay(index * 100).springify()}
       * RN:         style={styles.statCard}
       * RN:       >
       * RN:         <View style={[styles.iconContainer, { backgroundColor: `${stat.color}20` }]}>
       * RN:           <Icon name={stat.iconName} size={24} color={stat.color} />
       * RN:         </View>
       * RN:         <Text style={styles.statTitle}>{stat.title}</Text>
       * RN:         <Text style={styles.statValue}>{stat.value}</Text>
       * RN:         <View style={styles.trendContainer}>
       * RN:           <Icon
       * RN:             name={stat.trend === 'up' ? 'trending-up' : 'trending-down'}
       * RN:             size={12}
       * RN:             color={stat.trend === 'up' ? '#10b981' : '#ef4444'}
       * RN:           />
       * RN:           <Text style={[styles.trendText, { color: stat.trend === 'up' ? '#10b981' : '#ef4444' }]}>
       * RN:             {stat.change}
       * RN:           </Text>
       * RN:         </View>
       * RN:       </Animated.View>
       * RN:     ))}
       * RN:   </View>
       * RN: </View>
       * RN:
       * RN: StyleSheet:
       * RN: statsGrid: {
       * RN:   flexDirection: 'row',
       * RN:   flexWrap: 'wrap',
       * RN:   gap: 12,
       * RN: },
       * RN: statCard: {
       * RN:   width: '48%',
       * RN:   backgroundColor: theme.colors.glassBg,
       * RN:   borderRadius: 16,
       * RN:   borderWidth: 2,
       * RN:   borderColor: theme.colors.glassBorder,
       * RN:   padding: 16,
       * RN:   elevation: 4,
       * RN: }
       */}
      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-3)' }}>
          San Francisco Market Overview
        </h2>
        <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-3)' }}>
          {marketStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="backdrop-blur-md"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--glass-border)',
                padding: 'var(--spacing-4)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                  marginBottom: 'var(--spacing-3)',
                }}
              >
                {stat.icon}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: 'var(--spacing-1)' }}>
                {stat.title}
              </div>
              <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
                {stat.value}
              </div>
              <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" style={{ color: '#10b981' }} />
                ) : (
                  <TrendingDown className="w-3 h-3" style={{ color: '#ef4444' }} />
                )}
                <span style={{ color: stat.trend === 'up' ? '#10b981' : '#ef4444', fontSize: '0.75rem' }}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NEIGHBORHOOD TRENDS
       * RN: List of top SF neighborhoods with pricing and trends
       * RN: <View style={styles.neighborhoodSection}>
       * RN:   <Text style={styles.sectionTitle}>Top SF Neighborhoods</Text>
       * RN:   <View style={styles.neighborhoodList}>
       * RN:     {neighborhoods?.map((neighborhood, index) => (
       * RN:       <Animated.View
       * RN:         key={neighborhood.id}
       * RN:         entering={FadeInDown.delay(index * 100)}
       * RN:       >
       * RN:         <TouchableOpacity
       * RN:           style={styles.neighborhoodCard}
       * RN:           onPress={() => handleNeighborhoodPress(neighborhood)}
       * RN:           activeOpacity={0.8}
       * RN:         >
       * RN:           <FastImage
       * RN:             source={{ uri: neighborhood.imageUrl }}
       * RN:             style={styles.neighborhoodImage}
       * RN:             resizeMode={FastImage.resizeMode.cover}
       * RN:           />
       * RN:           <View style={styles.neighborhoodContent}>
       * RN:             <View style={styles.neighborhoodLeft}>
       * RN:               <View style={styles.neighborhoodIcon}>
       * RN:                 <Icon name="map-pin" size={24} color="#3b82f6" />
       * RN:               </View>
       * RN:               <View>
       * RN:                 <Text style={styles.neighborhoodName}>{neighborhood.name}</Text>
       * RN:                 <Text style={styles.neighborhoodPrice}>Avg. {neighborhood.avgPrice}</Text>
       * RN:               </View>
       * RN:             </View>
       * RN:             <View style={styles.neighborhoodTrend}>
       * RN:               <Icon name="trending-up" size={16} color="#10b981" />
       * RN:               <Text style={styles.trendValue}>{neighborhood.change}</Text>
       * RN:             </View>
       * RN:           </View>
       * RN:         </TouchableOpacity>
       * RN:       </Animated.View>
       * RN:     ))}
       * RN:   </View>
       * RN: </View>
       * RN:
       * RN: Handler:
       * RN: const handleNeighborhoodPress = (neighborhood) => {
       * RN:   navigation.navigate('NeighborhoodDetails', { 
       * RN:     neighborhoodId: neighborhood.id 
       * RN:   });
       * RN: };
       * RN:
       * RN: StyleSheet:
       * RN: neighborhoodCard: {
       * RN:   position: 'relative',
       * RN:   overflow: 'hidden',
       * RN:   backgroundColor: theme.colors.glassBg,
       * RN:   borderRadius: 16,
       * RN:   borderWidth: 2,
       * RN:   borderColor: theme.colors.glassBorder,
       * RN:   padding: 16,
       * RN:   height: 100,
       * RN:   elevation: 4,
       * RN: },
       * RN: neighborhoodImage: {
       * RN:   position: 'absolute',
       * RN:   top: 0,
       * RN:   left: 0,
       * RN:   right: 0,
       * RN:   bottom: 0,
       * RN:   opacity: 0.15,
       * RN: }
       */}
      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Top SF Neighborhoods
        </h2>
        <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
          {neighborhoods.map((neighborhood, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="backdrop-blur-md"
              style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--glass-border)',
                padding: 'var(--spacing-4)',
                textAlign: 'left',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                height: '100px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 0,
                }}
              >
                <ImageWithFallback
                  src={neighborhood.image}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.15,
                  }}
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div className="flex items-center" style={{ gap: 'var(--spacing-3)' }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--glass-bg)',
                      border: '2px solid var(--glass-border)',
                      color: '#3b82f6',
                    }}
                  >
                    <MapPin />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-1)' }}>
                      {neighborhood.name}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Avg. {neighborhood.avgPrice}
                    </div>
                  </div>
                </div>
                <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                  <TrendingUp className="w-4 h-4" style={{ color: '#10b981' }} />
                  <span style={{ color: '#10b981' }}>{neighborhood.change}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* MARKET INSIGHTS
       * RN: AI-generated market insights and predictions
       * RN: <View style={styles.insightsSection}>
       * RN:   <Text style={styles.sectionTitle}>Market Insights</Text>
       * RN:   <View style={styles.insightsList}>
       * RN:     {insights?.map((insight, index) => (
       * RN:       <Animated.View
       * RN:         key={insight.id}
       * RN:         entering={FadeInDown.delay(index * 100)}
       * RN:         style={styles.insightCard}
       * RN:       >
       * RN:         <View style={styles.insightContent}>
       * RN:           <View style={[styles.insightIcon, { backgroundColor: `${insight.color}20` }]}>
       * RN:             <Icon name={insight.iconName} size={24} color={insight.color} />
       * RN:           </View>
       * RN:           <View style={styles.insightText}>
       * RN:             <Text style={styles.insightTitle}>{insight.title}</Text>
       * RN:             <Text style={styles.insightDescription}>{insight.description}</Text>
       * RN:           </View>
       * RN:         </View>
       * RN:       </Animated.View>
       * RN:     ))}
       * RN:   </View>
       * RN: </View>
       * RN:
       * RN: StyleSheet:
       * RN: insightCard: {
       * RN:   backgroundColor: theme.colors.glassBg,
       * RN:   borderRadius: 16,
       * RN:   borderWidth: 2,
       * RN:   borderColor: theme.colors.glassBorder,
       * RN:   padding: 16,
       * RN:   elevation: 4,
       * RN: },
       * RN: insightContent: {
       * RN:   flexDirection: 'row',
       * RN:   alignItems: 'flex-start',
       * RN:   gap: 12,
       * RN: },
       * RN: insightIcon: {
       * RN:   width: 48,
       * RN:   height: 48,
       * RN:   borderRadius: 12,
       * RN:   alignItems: 'center',
       * RN:   justifyContent: 'center',
       * RN: },
       * RN: insightText: {
       * RN:   flex: 1,
       * RN: }
       */}
      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Market Insights
        </h2>
        <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="backdrop-blur-md"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--glass-border)',
                padding: 'var(--spacing-4)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="flex items-start" style={{ gap: 'var(--spacing-3)' }}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: `${insight.color}20`,
                    color: insight.color,
                    flexShrink: 0,
                  }}
                >
                  {insight.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
                    {insight.title}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {insight.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* RN: </ScrollView> */}
      {/* RN: </SafeAreaView> */}
    </div>
  );
}

// RN: ==============================================================================
// RN: COMPLETE REACT NATIVE STYLESHEET EXAMPLE
// RN: ==============================================================================
// RN:
// RN: import { StyleSheet, Dimensions } from 'react-native';
// RN:
// RN: const { width } = Dimensions.get('window');
// RN:
// RN: const styles = StyleSheet.create({
// RN:   container: {
// RN:     flex: 1,
// RN:     backgroundColor: theme.colors.bgPrimary,
// RN:   },
// RN:   scrollContent: {
// RN:     padding: 24,
// RN:     gap: 24,
// RN:     paddingBottom: 120,
// RN:   },
// RN:   
// RN:   // Hero Section
// RN:   heroSection: {
// RN:     position: 'relative',
// RN:     borderRadius: 24,
// RN:     overflow: 'hidden',
// RN:     height: 200,
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderWidth: 2,
// RN:     borderColor: theme.colors.glassBorder,
// RN:   },
// RN:   heroImage: {
// RN:     position: 'absolute',
// RN:     width: '100%',
// RN:     height: '100%',
// RN:     opacity: 0.3,
// RN:   },
// RN:   heroGradient: {
// RN:     position: 'absolute',
// RN:     width: '100%',
// RN:     height: '100%',
// RN:   },
// RN:   heroContent: {
// RN:     position: 'absolute',
// RN:     bottom: 0,
// RN:     left: 0,
// RN:     right: 0,
// RN:     padding: 24,
// RN:     gap: 8,
// RN:   },
// RN:   heroHeader: {
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     gap: 8,
// RN:   },
// RN:   heroTitle: {
// RN:     color: '#ffffff',
// RN:     fontSize: 24,
// RN:     fontWeight: 'bold',
// RN:     textShadowColor: 'rgba(0, 0, 0, 0.8)',
// RN:     textShadowOffset: { width: 0, height: 2 },
// RN:     textShadowRadius: 12,
// RN:   },
// RN:   
// RN:   // Stats Section
// RN:   statsSection: {
// RN:     gap: 12,
// RN:   },
// RN:   sectionTitle: {
// RN:     color: theme.colors.textPrimary,
// RN:     fontSize: 20,
// RN:     fontWeight: 'bold',
// RN:     marginBottom: 12,
// RN:   },
// RN:   statsGrid: {
// RN:     flexDirection: 'row',
// RN:     flexWrap: 'wrap',
// RN:     gap: 12,
// RN:   },
// RN:   statCard: {
// RN:     width: (width - 60) / 2, // 2 columns with padding and gap
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderRadius: 16,
// RN:     borderWidth: 2,
// RN:     borderColor: theme.colors.glassBorder,
// RN:     padding: 16,
// RN:     ...Platform.select({
// RN:       ios: {
// RN:         shadowColor: '#000',
// RN:         shadowOffset: { width: 0, height: 8 },
// RN:         shadowOpacity: 0.1,
// RN:         shadowRadius: 32,
// RN:       },
// RN:       android: {
// RN:         elevation: 4,
// RN:       },
// RN:     }),
// RN:   },
// RN:   iconContainer: {
// RN:     width: 40,
// RN:     height: 40,
// RN:     borderRadius: 12,
// RN:     alignItems: 'center',
// RN:     justifyContent: 'center',
// RN:     marginBottom: 12,
// RN:   },
// RN:   statTitle: {
// RN:     color: theme.colors.textSecondary,
// RN:     fontSize: 12,
// RN:     marginBottom: 4,
// RN:   },
// RN:   statValue: {
// RN:     color: theme.colors.textPrimary,
// RN:     fontSize: 18,
// RN:     fontWeight: 'bold',
// RN:     marginBottom: 8,
// RN:   },
// RN:   trendContainer: {
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     gap: 4,
// RN:   },
// RN:   trendText: {
// RN:     fontSize: 12,
// RN:   },
// RN:   
// RN:   // Neighborhood Section
// RN:   neighborhoodSection: {
// RN:     gap: 12,
// RN:   },
// RN:   neighborhoodList: {
// RN:     gap: 12,
// RN:   },
// RN:   neighborhoodCard: {
// RN:     position: 'relative',
// RN:     overflow: 'hidden',
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderRadius: 16,
// RN:     borderWidth: 2,
// RN:     borderColor: theme.colors.glassBorder,
// RN:     padding: 16,
// RN:     height: 100,
// RN:     elevation: 4,
// RN:   },
// RN:   neighborhoodImage: {
// RN:     position: 'absolute',
// RN:     top: 0,
// RN:     left: 0,
// RN:     right: 0,
// RN:     bottom: 0,
// RN:     opacity: 0.15,
// RN:   },
// RN:   neighborhoodContent: {
// RN:     position: 'relative',
// RN:     zIndex: 1,
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     justifyContent: 'space-between',
// RN:     height: '100%',
// RN:   },
// RN:   neighborhoodLeft: {
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     gap: 12,
// RN:   },
// RN:   neighborhoodIcon: {
// RN:     width: 48,
// RN:     height: 48,
// RN:     borderRadius: 12,
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderWidth: 2,
// RN:     borderColor: theme.colors.glassBorder,
// RN:     alignItems: 'center',
// RN:     justifyContent: 'center',
// RN:   },
// RN:   neighborhoodName: {
// RN:     color: theme.colors.textPrimary,
// RN:     fontSize: 16,
// RN:     fontWeight: '600',
// RN:     marginBottom: 4,
// RN:   },
// RN:   neighborhoodPrice: {
// RN:     color: theme.colors.textSecondary,
// RN:     fontSize: 14,
// RN:   },
// RN:   neighborhoodTrend: {
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     gap: 4,
// RN:   },
// RN:   
// RN:   // Insights Section
// RN:   insightsSection: {
// RN:     gap: 12,
// RN:   },
// RN:   insightsList: {
// RN:     gap: 12,
// RN:   },
// RN:   insightCard: {
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderRadius: 16,
// RN:     borderWidth: 2,
// RN:     borderColor: theme.colors.glassBorder,
// RN:     padding: 16,
// RN:     elevation: 4,
// RN:   },
// RN:   insightContent: {
// RN:     flexDirection: 'row',
// RN:     alignItems: 'flex-start',
// RN:     gap: 12,
// RN:   },
// RN:   insightIcon: {
// RN:     width: 48,
// RN:     height: 48,
// RN:     borderRadius: 12,
// RN:     alignItems: 'center',
// RN:     justifyContent: 'center',
// RN:   },
// RN:   insightText: {
// RN:     flex: 1,
// RN:   },
// RN:   insightTitle: {
// RN:     color: theme.colors.textPrimary,
// RN:     fontSize: 16,
// RN:     fontWeight: '600',
// RN:     marginBottom: 8,
// RN:   },
// RN:   insightDescription: {
// RN:     color: theme.colors.textSecondary,
// RN:     fontSize: 14,
// RN:     lineHeight: 21,
// RN:   },
// RN: });
