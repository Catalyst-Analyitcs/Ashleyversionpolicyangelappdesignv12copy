/**
 * ==============================================================================
 * TRENDCARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Reusable card component for displaying trend data with animated
 * line charts. Used in ReportsScreen, InsightsScreen, MarketTrendsScreen.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CHART LIBRARY:
 *    - recharts → victory-native
 *    - <VictoryLine> for line charts
 *    - <VictoryChart> as wrapper
 *    - Supports similar props and styling
 * 
 * 2. ANIMATION:
 *    - AnimatedDot component → Use Animated.View
 *    - Progressive reveal → useAnimatedStyle with timing
 * 
 * 3. CARD COMPONENT:
 *    - Card wrapper → View with shadow styles
 *    - Use design system card styles
 * 
 * 4. DATA FORMAT:
 *    - Accepts {x: Date|number, y: number}[]
 *    - Format dates for display
 *    - Handle null/undefined values
 * 
 * ==============================================================================
 * VICTORY NATIVE EXAMPLE
 * ==============================================================================
 * 
 * import { VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';
 * 
 * <VictoryChart>
 *   <VictoryLine
 *     data={data.map(d => ({ x: d.x, y: d.y }))}
 *     style={{
 *       data: { stroke: "rgb(var(--color-electric-blue))" }
 *     }}
 *   />
 * </VictoryChart>
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Chart renders with data
 * - [ ] Animation plays smoothly
 * - [ ] Handles empty data
 * - [ ] Tooltip works on touch
 * - [ ] Responsive sizing
 * - [ ] iOS and Android compatible
 * 
 */

// RN: import { View, Text, StyleSheet, Dimensions } from 'react-native';
// RN: import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter } from 'victory-native';
// RN: import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';
// RN: import { BlurView } from 'expo-blur';
import * as React from "react";
import { 
  Card, // RN: Replace with View or BlurView
  CardHeader, // RN: Replace with View
  CardTitle, // RN: Replace with Text
  CardDescription, // RN: Replace with Text
  CardContent // RN: Replace with View
} from "./ui/card";
import { ChartContainer } from "./ui/chart"; // RN: Remove - VictoryChart doesn't need wrapper
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts@2.15.2"; // RN: Remove - replace with victory-native

type Pt = { x: Date | number; y: number };

// Custom animated dot component with subtle accent
// RN: Convert to Animated.View with Circle from react-native-svg
// RN: import { Circle, G } from 'react-native-svg';
// RN: import Animated from 'react-native-reanimated';
const AnimatedDot = (props: any) => {
  const { cx, cy, index, visibleDots } = props;
  const isVisible = index < visibleDots;
  
  // RN: Use Reanimated for opacity and scale animations
  // RN: const opacity = useSharedValue(0);
  // RN: const scale = useSharedValue(0);
  // RN: 
  // RN: useEffect(() => {
  // RN:   if (isVisible) {
  // RN:     opacity.value = withTiming(1, { duration: 250 });
  // RN:     scale.value = withTiming(1, { duration: 250, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275) });
  // RN:   }
  // RN: }, [isVisible]);
  // RN:
  // RN: const animatedProps = useAnimatedProps(() => ({
  // RN:   opacity: opacity.value,
  // RN:   transform: [{ scale: scale.value }],
  // RN: }));
  
  return (
    // RN: <G>
    <g>
      {/* Subtle outer ring */}
      {/* RN: <Animated.View style={animatedProps}> */}
      {/* RN:   <Circle cx={cx} cy={cy} r={7} fill="rgba(34, 211, 238, 0.08)" /> */}
      {/* RN: </Animated.View> */}
      <circle
        cx={cx}
        cy={cy}
        r={7}
        fill="rgba(34, 211, 238, 0.08)"
        style={{
          opacity: isVisible ? 1 : 0, // RN: Use animatedProps instead
          transform: isVisible ? 'scale(1)' : 'scale(0)', // RN: Handled by Reanimated transform
          transformOrigin: `${cx}px ${cy}px`, // RN: Not needed - transform is relative to center in RN
          transition: 'opacity 0.25s ease-out, transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // RN: Use withTiming
        }}
      />
      {/* Core dot */}
      {/* RN: <Animated.View style={animatedProps}> */}
      {/* RN:   <Circle 
            cx={cx} 
            cy={cy} 
            r={5} 
            fill={theme.colors.electricBlue}
            shadow={{ color: 'rgba(34, 211, 238, 0.4)', offset: { width: 0, height: 0 }, radius: 2 }}
          /> */}
      {/* RN: </Animated.View> */}
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="rgb(var(--color-electric-blue))" // RN: Use theme.colors.electricBlue
        style={{
          opacity: isVisible ? 1 : 0, // RN: Use animatedProps
          transform: isVisible ? 'scale(1)' : 'scale(0)', // RN: Handled by Reanimated
          transformOrigin: `${cx}px ${cy}px`, // RN: Not needed in RN
          transition: 'opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // RN: Use withTiming
          filter: 'drop-shadow(0 0 2px rgba(34, 211, 238, 0.4))', // RN: Use shadow props on Circle or parent View
        }}
      />
    </g>
    // RN: </G>
  );
};

export function TrendCard({ 
  title, 
  subtitle, 
  data 
}: { 
  title: string; 
  subtitle?: string; 
  data: Pt[] 
}) {
  const [visibleDots, setVisibleDots] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null); // RN: useRef<View>(null)
  
  // Transform data for recharts
  // RN: Transform data for victory-native (similar format works)
  const chartData = data.map(pt => ({
    x: pt.x instanceof Date ? pt.x.getTime() : pt.x,
    y: pt.y,
    displayX: pt.x instanceof Date ? pt.x.toLocaleDateString() : pt.x // RN: Use date-fns or moment for formatting
  }));

  // Premium liquid flow animation - line draws from left to right with elegant glow trail
  // RN: This entire animation approach needs to change for victory-native
  // RN: Victory-native has built-in animation support
  // RN: Use VictoryLine's animate prop:
  // RN: <VictoryLine
  // RN:   animate={{
  // RN:     duration: 3500,
  // RN:     onLoad: { duration: 3500 }
  // RN:   }}
  // RN: />
  // RN: For dots, use VictoryScatter with separate animation
  React.useEffect(() => {
    // Reset state
    setVisibleDots(0);
    
    // RN: Replace DOM manipulation with Reanimated values
    // RN: const lineProgress = useSharedValue(0);
    // RN: 
    // RN: useEffect(() => {
    // RN:   lineProgress.value = withTiming(1, { duration: 3500 });
    // RN: }, [data]);
    
    // Longer delay to ensure chart is fully rendered
    const initTimeout = setTimeout(() => {
      if (!containerRef.current) return;
      
      // RN: DOM manipulation not applicable in RN - Victory handles this
      // Search for path elements within this specific chart container
      const allPaths = containerRef.current.querySelectorAll('path');
      
      // Find the line path - it's usually one of the longer paths (not axis or grid)
      let linePath: SVGPathElement | null = null;
      let maxLength = 0;
      
      allPaths.forEach((path) => {
        if (typeof path.getTotalLength === 'function') {
          try {
            const length = path.getTotalLength();
            // The line path will typically be much longer than grid lines or axis marks
            if (length > maxLength && length > 50) {
              maxLength = length;
              linePath = path;
            }
          } catch (e) {
            // Skip paths that can't be measured
          }
        }
      });
      
      if (linePath && maxLength > 0) {
        // Apply luxury glow effect to the line
        linePath.style.filter = 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.6)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.4))';
        
        // Set initial state - line is hidden
        linePath.style.strokeDasharray = `${maxLength}`;
        linePath.style.strokeDashoffset = `${maxLength}`;
        
        // Trigger the premium liquid flow animation - ultra-smooth with emphasized easing
        requestAnimationFrame(() => {
          if (linePath) {
            // Emphasized deceleration curve for premium feel (slower start, elegant finish)
            linePath.style.transition = 'stroke-dashoffset 3.5s cubic-bezier(0.05, 0.7, 0.1, 1.0)';
            linePath.style.strokeDashoffset = '0';
          }
        });
      }
      
      // Start dots animation following the liquid flow with synchronized delay
      // RN: Keep this logic - it works in RN too
      const dotsDelay = setTimeout(() => {
        const interval = setInterval(() => {
          setVisibleDots(prev => {
            if (prev >= chartData.length) {
              clearInterval(interval);
              return prev;
            }
            return prev + 1;
          });
        }, 150); // Dots follow the flowing line in rhythm
        
        return () => clearInterval(interval);
      }, 300);
      
      return () => clearTimeout(dotsDelay);
    }, 300);

    return () => {
      clearTimeout(initTimeout);
    };
  }, [chartData.length]);

  // RN: Victory-native doesn't use config object - pass props directly to components
  const chartConfig = {
    y: {
      label: "Value",
      color: "rgb(var(--color-electric-blue))", // RN: theme.colors.electricBlue
    },
  };

  return (
    // RN: For glass effect, use BlurView; for solid, use View
    // RN: <BlurView intensity={60} tint="dark" style={styles.card}>
    <Card 
      className="backdrop-blur-md" // RN: Remove - use BlurView component
      style={{
        backgroundColor: 'var(--glass-bg)', // RN: backgroundColor: theme.colors.glassBg or 'rgba(0, 0, 0, 0.5)'
        borderColor: 'var(--glass-border)', // RN: borderColor: theme.colors.glassBorder
        border: '2px solid var(--glass-border)', // RN: borderWidth: 2
        // RN: boxShadow → shadow properties:
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        // RN: shadowColor: '#000',
        // RN: shadowOffset: { width: 0, height: 8 },
        // RN: shadowOpacity: 0.1,
        // RN: shadowRadius: 32,
        // RN: elevation: 8, // Android
        fontFamily: 'Roboto, sans-serif', // RN: Font applied to Text components, not View
        borderRadius: 'var(--radius-xl)', // RN: borderRadius: theme.borderRadius.xl or 20
      }}
    >
      {/* RN: <View style={styles.header}> */}
      <CardHeader style={{ padding: 'var(--spacing-5)' }}> {/* RN: padding: theme.spacing[5] or 20 */}
        {/* RN: <Text style={styles.title}> */}
        <CardTitle 
          style={{ 
            color: 'var(--text-primary)', // RN: color: theme.colors.textPrimary
            fontFamily: 'Roboto, sans-serif', // RN: fontFamily: 'Roboto'
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', // RN: Use separate shadow props (textShadowColor, textShadowOffset, textShadowRadius)
            // RN: textShadowColor: 'rgba(0, 0, 0, 0.3)',
            // RN: textShadowOffset: { width: 0, height: 2 },
            // RN: textShadowRadius: 8,
          }}
        >
          {title}
        </CardTitle>
        {/* RN: </Text> */}
        {subtitle && (
          // RN: <Text style={styles.subtitle}>
          <CardDescription 
            style={{ 
              color: 'var(--text-secondary)', // RN: color: theme.colors.textSecondary
              fontFamily: 'Roboto, sans-serif', // RN: fontFamily: 'Roboto'
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)', // RN: textShadowColor, textShadowOffset, textShadowRadius
            }}
          >
            {subtitle}
          </CardDescription>
          // RN: </Text>
        )}
      </CardHeader>
      {/* RN: </View> */}
      {/* RN: <View style={styles.content}> */}
      <CardContent style={{ padding: 'var(--spacing-5)', paddingTop: 0 }}> {/* RN: padding: 20, paddingTop: 0 */}
        {/* RN: @keyframes not applicable - use Reanimated instead */}
        {/* RN: Pulse animation: */}
        {/* RN: const pulseScale = useSharedValue(1); */}
        {/* RN: const pulseOpacity = useSharedValue(0.6); */}
        {/* RN: useEffect(() => { */}
        {/* RN:   pulseScale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true); */}
        {/* RN:   pulseOpacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true); */}
        {/* RN: }, []); */}
        <style>
          {`
            @keyframes pulse-glow {
              0%, 100% {
                opacity: 0.6;
                transform: scale(1);
              }
              50% {
                opacity: 1;
                transform: scale(1.2);
              }
            }
            
            @keyframes shimmer {
              0% {
                background-position: -200% center;
              }
              100% {
                background-position: 200% center;
              }
            }
          `}
        </style>
        {/* RN: <View ref={containerRef} style={styles.chartContainer}> */}
        <div ref={containerRef}>
          {/* RN: Remove ChartContainer wrapper - use VictoryChart directly */}
          {/* RN: import { VictoryChart, VictoryLine, VictoryAxis, VictoryGrid, VictoryScatter } from 'victory-native'; */}
          {/* RN: <VictoryChart 
                width={Dimensions.get('window').width - 80}
                height={220}
                padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
              > */}
          <ChartContainer config={chartConfig}>
            <LineChart data={chartData}> {/* RN: Remove LineChart wrapper */}
            {/* RN: <VictoryGrid 
                  strokeDasharray="4, 4"
                  stroke="rgba(34, 211, 238, 0.15)"
                  strokeWidth={1}
                /> */}
            <CartesianGrid 
              strokeDasharray="4 4" 
              stroke="rgba(34, 211, 238, 0.15)"
              opacity={0.4}
              strokeWidth={1}
            />
            {/* RN: <VictoryAxis 
                  style={{
                    axis: { stroke: theme.colors.textTertiary },
                    tickLabels: { 
                      fill: theme.colors.textTertiary,
                      fontFamily: 'Roboto',
                      fontSize: 12 
                    }
                  }}
                /> */}
            <XAxis 
              dataKey="displayX"
              stroke="var(--text-tertiary)" // RN: Use style object
              tick={{ 
                fill: 'var(--text-tertiary)', // RN: fill: theme.colors.textTertiary
                fontFamily: 'Roboto, sans-serif',
                fontSize: 12 
              }}
            />
            {/* RN: <VictoryAxis 
                  dependentAxis
                  style={{
                    axis: { stroke: theme.colors.textTertiary },
                    tickLabels: { 
                      fill: theme.colors.textTertiary,
                      fontFamily: 'Roboto',
                      fontSize: 12 
                    }
                  }}
                /> */}
            <YAxis 
              stroke="var(--text-tertiary)"
              tick={{ 
                fill: 'var(--text-tertiary)',
                fontFamily: 'Roboto, sans-serif',
                fontSize: 12 
              }}
            />
            {/* RN: Victory-native doesn't have built-in tooltip - implement custom with onPress */}
            {/* RN: Or use a custom tooltip component with Animated.View */}
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--glass-bg)', // RN: Custom tooltip component
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'Roboto, sans-serif',
                color: 'var(--text-primary)'
              }}
            />
            {/* RN: <VictoryLine
                  data={chartData}
                  x="x"
                  y="y"
                  style={{
                    data: { 
                      stroke: theme.colors.electricBlue,
                      strokeWidth: 3.5,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round'
                    }
                  }}
                  animate={{
                    duration: 3500,
                    onLoad: { duration: 3500 }
                  }}
                /> */}
            {/* RN: <VictoryScatter
                  data={chartData.slice(0, visibleDots)}
                  x="x"
                  y="y"
                  size={5}
                  style={{
                    data: { 
                      fill: theme.colors.electricBlue,
                      stroke: 'rgba(34, 211, 238, 0.3)',
                      strokeWidth: 2
                    }
                  }}
                /> */}
            <Line 
              type="monotone" 
              dataKey="y" 
              stroke="rgb(var(--color-electric-blue))" // RN: theme.colors.electricBlue
              strokeWidth={3.5}
              dot={(dotProps) => {
                const { key, ...rest } = dotProps;
                return <AnimatedDot key={key} {...rest} visibleDots={visibleDots} />;
              }}
              activeDot={{ 
                r: 8,
                fill: 'rgb(var(--color-electric-blue))',
                stroke: 'rgba(34, 211, 238, 0.3)',
                strokeWidth: 3,
                style: {
                  filter: 'drop-shadow(0 0 3px rgba(34, 211, 238, 0.5))'
                }
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="recharts-line-curve"
              style={{
                strokeDasharray: '0',
                strokeDashoffset: '0'
              }}
            />
          </LineChart>
          {/* RN: </VictoryChart> */}
        </ChartContainer>
        </div>
        {/* RN: </View> */}
      </CardContent>
      {/* RN: </View> */}
    </Card>
    // RN: </BlurView> or </View>
  );
}

/*
RN: COMPLETE STYLESHEET EXAMPLE

import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.glassBg,
    borderWidth: 2,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.borderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 8,
    overflow: 'hidden',
  },
  header: {
    padding: theme.spacing[5],
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  content: {
    padding: theme.spacing[5],
    paddingTop: 0,
  },
  chartContainer: {
    width: '100%',
    height: 220,
  },
});

// Usage with Victory Native:
import { VictoryChart, VictoryLine, VictoryAxis, VictoryGrid, VictoryScatter } from 'victory-native';
import { BlurView } from 'expo-blur';

export function TrendCard({ title, subtitle, data }) {
  const [visibleDots, setVisibleDots] = useState(0);
  
  useEffect(() => {
    // Animate dots progressively
    const interval = setInterval(() => {
      setVisibleDots(prev => {
        if (prev >= data.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, [data.length]);
  
  return (
    <BlurView intensity={60} tint="dark" style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.content}>
        <VictoryChart 
          width={width - 80}
          height={220}
          padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
        >
          <VictoryGrid 
            strokeDasharray="4, 4"
            stroke="rgba(34, 211, 238, 0.15)"
            strokeWidth={1}
          />
          <VictoryAxis 
            style={{
              axis: { stroke: theme.colors.textTertiary },
              tickLabels: { 
                fill: theme.colors.textTertiary,
                fontFamily: 'Roboto',
                fontSize: 12 
              }
            }}
          />
          <VictoryAxis 
            dependentAxis
            style={{
              axis: { stroke: theme.colors.textTertiary },
              tickLabels: { 
                fill: theme.colors.textTertiary,
                fontFamily: 'Roboto',
                fontSize: 12 
              }
            }}
          />
          <VictoryLine
            data={data}
            x="x"
            y="y"
            style={{
              data: { 
                stroke: theme.colors.electricBlue,
                strokeWidth: 3.5,
                strokeLinecap: 'round',
                strokeLinejoin: 'round'
              }
            }}
            animate={{
              duration: 3500,
              onLoad: { duration: 3500 }
            }}
          />
          <VictoryScatter
            data={data.slice(0, visibleDots)}
            x="x"
            y="y"
            size={5}
            style={{
              data: { 
                fill: theme.colors.electricBlue,
                stroke: 'rgba(34, 211, 238, 0.3)',
                strokeWidth: 2
              }
            }}
          />
        </VictoryChart>
      </View>
    </BlurView>
  );
}
*/
