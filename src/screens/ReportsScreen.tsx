/**
 * ==============================================================================
 * REPORTSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Analytics and reporting dashboard with property value trends,
 * claims distribution, inspection activity, and risk assessment visualizations.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CHARTS LIBRARY:
 *    - recharts → victory-native or react-native-chart-kit
 *    - Line charts, pie charts, bar charts
 *    - Interactive touch gestures
 * 
 * 2. DATA GENERATION:
 *    - Mock trend data based on San Francisco market
 *    - Replace with real API data
 * 
 * 3. FLOATING ORBS:
 *    - Background animation → react-native-reanimated
 *    - Optimize for performance
 * 
 * 4. REQUIRED API ENDPOINTS:
 *    - GET /api/reports/property-values
 *    - GET /api/reports/claims-distribution
 *    - GET /api/reports/inspection-activity
 *    - GET /api/reports/risk-assessment
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT MAPPING
 * ==============================================================================
 * 
 * - div → View
 * - Charts → Victory Native components
 * - motion.div → Animated.View
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Charts render correctly
 * - [ ] Data displays accurately
 * - [ ] Touch interactions work
 * - [ ] Animations smooth
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { BarChart, TrendingUp, PieChart, Activity, ChevronRight } from "lucide-react";

// RN: TrendCard component will need chart library conversion
// RN: See TrendCard.tsx annotations for details
import { TrendCard } from "../components/TrendCard";

// RN: Replace motion with react-native-reanimated
// RN: import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { motion } from "motion/react";

// RN: FloatingOrbs → convert to Animated.View with transform animations
import { FloatingOrbs } from "../components/FloatingOrbs";

// RN: ==============================================================================
// RN: REACT NATIVE CONVERSION NOTES
// RN: ==============================================================================
// RN:
// RN: 1. CHARTS:
// RN:    - TrendCard uses recharts (web-only)
// RN:    - Convert to victory-native charts
// RN:    - npm install victory-native
// RN:    - VictoryChart, VictoryLine, VictoryArea
// RN:
// RN: 2. DATA FETCHING:
// RN:    - Use TanStack Query for reports data
// RN:    - Add pull-to-refresh with RefreshControl
// RN:    - Cache reports for offline viewing
// RN:
// RN: 3. ANIMATIONS:
// RN:    - motion.div → Animated.View with FadeIn
// RN:    - Stagger animations with delay
// RN:
// RN: 4. MOCK DATA:
// RN:    - generateTrendData() works same in RN
// RN:    - Replace with real API calls to backend
// RN:
// RN: 5. API ENDPOINTS NEEDED:
// RN:    - GET /api/reports/property-values?location=SF&period=12months
// RN:    - GET /api/reports/claims-distribution?location=SF&period=6months
// RN:    - GET /api/reports/inspection-activity?location=SF&period=6months
// RN:    - GET /api/reports/risk-assessment?location=SF

export function ReportsScreen() {
  // RN: MOCK DATA - Replace with API calls
  // RN: Use TanStack Query:
  // RN: const { data: reports, isLoading } = useQuery({
  // RN:   queryKey: ['reports', 'overview'],
  // RN:   queryFn: reportsApi.getOverview
  // RN: });
  const reports = [
    { title: 'SF Property Value Trends', type: 'Line Chart', period: 'Last 12 months', icon: <TrendingUp />, color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    { title: 'Claims Distribution', type: 'Pie Chart', period: 'San Francisco area', icon: <PieChart />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { title: 'Inspection Activity', type: 'Bar Chart', period: 'SF Bay Area', icon: <BarChart />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
    { title: 'Risk Assessment', type: 'Analytics', period: 'San Francisco', icon: <Activity />, color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
  ];

  // RN: FUNCTION: generateTrendData
  // RN: - Generates mock chart data
  // RN: - Works same in React Native
  // RN: - Replace with real API data
  // RN:
  // RN: API Response shape:
  // RN: {
  // RN:   data: [
  // RN:     { x: Date, y: number },
  // RN:     ...
  // RN:   ],
  // RN:   summary: {
  // RN:     min: number,
  // RN:     max: number,
  // RN:     avg: number,
  // RN:     trend: 'up' | 'down' | 'stable'
  // RN:   }
  // RN: }
  const generateTrendData = (months: number, baseValue: number, variance: number, trend: number = 0) => {
    const now = new Date();
    return Array.from({ length: months }, (_, i) => {
      const date = new Date(now);
      date.setMonth(date.getMonth() - (months - i - 1));
      // Add slight upward/downward trend over time
      const trendValue = (i / months) * trend;
      return {
        x: date,
        y: baseValue + trendValue + (Math.random() - 0.5) * variance
      };
    });
  };

  // San Francisco median home prices (~$1.3M-$1.5M range with slight upward trend)
  const propertyValueData = generateTrendData(12, 1350000, 80000, 50000);
  // Claims data for San Francisco (moderate, earthquake-related claims)
  const claimsData = generateTrendData(6, 32, 12);
  // Inspection activity (high due to earthquake requirements and property transfers)
  const inspectionData = generateTrendData(6, 185, 45);

  // RN: Add TanStack Query hooks
  // RN: const { data: propertyValues, isLoading: isLoadingValues } = useQuery({
  // RN:   queryKey: ['reports', 'property-values', 'SF', '12months'],
  // RN:   queryFn: () => reportsApi.getPropertyValues('SF', 12)
  // RN: });
  // RN:
  // RN: const { data: claims } = useQuery({
  // RN:   queryKey: ['reports', 'claims', 'SF', '6months'],
  // RN:   queryFn: () => reportsApi.getClaims('SF', 6)
  // RN: });
  // RN:
  // RN: const { data: inspections } = useQuery({
  // RN:   queryKey: ['reports', 'inspections', 'SF', '6months'],
  // RN:   queryFn: () => reportsApi.getInspections('SF', 6)
  // RN: });

  // RN: Add refresh handler
  // RN: const [refreshing, setRefreshing] = useState(false);
  // RN: const onRefresh = async () => {
  // RN:   setRefreshing(true);
  // RN:   await queryClient.invalidateQueries({ queryKey: ['reports'] });
  // RN:   setRefreshing(false);
  // RN: };

  return (
    // RN: ROOT CONTAINER
    // RN: <SafeAreaView style={styles.container}>
    // RN:   <ScrollView
    // RN:     contentContainerStyle={styles.scrollContent}
    // RN:     refreshControl={
    // RN:       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    // RN:     }
    // RN:     showsVerticalScrollIndicator={false}
    // RN:   >
    <div 
      className="w-full h-full flex flex-col overflow-y-auto"
      style={{ 
        padding: 'var(--spacing-6)',
        gap: 'var(--spacing-4)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-12))',
        position: 'relative',
      }}
    >
      {/* FLOATING ORBS BACKGROUND
       * RN: Convert to Animated.View with continuous animations
       * RN: See FloatingOrbs.tsx for conversion details
       * RN: <FloatingOrbs />
       */}
      <FloatingOrbs />

      {/* Background gradient fixed at top */}
      <div
        style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          height: '280px',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)',
            opacity: 0.6,
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ paddingTop: 'var(--spacing-2)', position: 'relative', zIndex: 1 }}
      >
        <h1 style={{ 
          color: 'var(--text-primary)', 
          marginBottom: 'var(--spacing-2)',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }}>
          Reports & Analytics
        </h1>
        <p style={{ 
          color: 'var(--text-secondary)',
          textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
        }}>
          San Francisco market insights and analytics
        </p>
      </motion.div>

      {/* Trend Charts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TrendCard 
            title="San Francisco Property Values" 
            subtitle="Median home prices in San Francisco over the last 12 months"
            data={propertyValueData}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TrendCard 
            title="SF Area Monthly Claims" 
            subtitle="Property insurance claims in San Francisco over the last 6 months"
            data={claimsData}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TrendCard 
            title="SF Bay Area Inspection Activity" 
            subtitle="Property inspections completed per month in the Bay Area"
            data={inspectionData}
          />
        </motion.div>
      </div>

      {/* REPORTS GRID
       * RN: Use FlatList for better performance:
       * RN: <FlatList
       * RN:   data={reports}
       * RN:   renderItem={({ item, index }) => <ReportCard report={item} index={index} />}
       * RN:   keyExtractor={(item) => item.title}
       * RN:   numColumns={2}
       * RN:   columnWrapperStyle={styles.reportRow}
       * RN:   contentContainerStyle={styles.reportGrid}
       * RN: />
       * RN:
       * RN: OR use simple View with map if data is small:
       * RN: <View style={styles.reportGrid}>
       * RN:   {reports.map((report, index) => (
       * RN:     <ReportCard key={index} report={report} index={index} />
       * RN:   ))}
       * RN: </View>
       */}
      <div 
        className="grid grid-cols-2"
        style={{ gap: 'var(--spacing-3)', position: 'relative', zIndex: 1 }}
      >
        {reports.map((report, index) => (
          // RN: REPORT CARD BUTTON
          // RN: <Animated.View entering={FadeIn.delay(400 + index * 100)}>
          // RN:   <Pressable
          // RN:     onPress={() => navigation.navigate('ReportDetail', { reportType: report.type })}
          // RN:     style={({ pressed }) => [
          // RN:       styles.reportCard,
          // RN:       pressed && styles.reportCardPressed
          // RN:     ]}
          // RN:   >
          // RN:     <LinearGradient
          // RN:       colors={[`${report.color}15`, 'transparent']}
          // RN:       start={{ x: 0, y: 0 }}
          // RN:       end={{ x: 1, y: 1 }}
          // RN:       style={styles.reportGradient}
          // RN:     />
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="backdrop-blur-md transition-all flex flex-col"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--glass-bg)',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--glass-border)',
              padding: 'var(--spacing-4)',
              gap: 'var(--spacing-3)',
              minHeight: '160px',
              textAlign: 'left',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* GRADIENT OVERLAY
             * RN: <LinearGradient
             * RN:   colors={[`${report.color}15`, 'transparent']}
             * RN:   start={{ x: 0, y: 0 }}
             * RN:   end={{ x: 1, y: 1 }}
             * RN:   style={styles.reportGradient}
             * RN: />
             */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${report.color}15 0%, transparent 70%)`,
                zIndex: 0,
              }}
            />
            
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', flex: 1 }}>
              {/* ICON CONTAINER
               * RN: <Animated.View
               * RN:   entering={ZoomIn.delay(600 + index * 100)}
               * RN:   style={[
               * RN:     styles.reportIcon,
               * RN:     { 
               * RN:       backgroundColor: report.color,
               * RN:       shadowColor: report.color,
               * RN:       shadowOpacity: 0.25,
               * RN:       shadowRadius: 16,
               * RN:     }
               * RN:   ]}
               * RN: >
               * RN:   <Icon name={report.iconName} size={24} color="white" />
               * RN: </Animated.View>
               * RN:
               * RN: StyleSheet:
               * RN: reportIcon: {
               * RN:   width: 48,
               * RN:   height: 48,
               * RN:   borderRadius: 12,
               * RN:   alignItems: 'center',
               * RN:   justifyContent: 'center',
               * RN:   elevation: 4,
               * RN: }
               */}
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: report.gradient,
                  color: '#ffffff',
                  boxShadow: `0 4px 16px ${report.color}40`,
                }}
              >
                {report.icon}
              </motion.div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  color: 'var(--text-primary)', 
                  marginBottom: 'var(--spacing-1)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                }}>
                  {report.title}
                </div>
                <div style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.75rem', 
                  marginBottom: 'var(--spacing-1)',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                }}>
                  {report.type}
                </div>
                <div style={{ 
                  color: 'var(--text-tertiary)', 
                  fontSize: '0.75rem',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                }}>
                  {report.period}
                </div>
              </div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center"
                style={{ gap: 'var(--spacing-1)', marginTop: 'auto' }}
              >
                <span style={{ 
                  color: report.color,
                  fontSize: '0.875rem',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                }}>
                  View
                </span>
                <ChevronRight 
                  className="w-4 h-4" 
                  style={{ 
                    color: report.color,
                    filter: `drop-shadow(0 1px 4px ${report.color}60)`,
                  }} 
                />
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
