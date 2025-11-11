/**
 * REACT NATIVE CONVERSION - Chart Component
 * 
 * COMPLEXITY: HIGH
 * CONVERSION APPROACH: Replace Recharts with Victory Native or React Native SVG Charts
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - recharts → victory-native (most feature-complete) or react-native-chart-kit
 * 
 * RECOMMENDED PACKAGES:
 * - victory-native (best Recharts alternative, uses react-native-svg)
 * - react-native-svg (required dependency for victory-native)
 * - react-native-skia (alternative, high-performance charts)
 * 
 * KEY CONVERSION NOTES:
 * 1. Victory Native provides similar API to Recharts
 * 2. ResponsiveContainer → VictoryContainer with responsive dimensions
 * 3. No dangerouslySetInnerHTML in RN - use theme context differently
 * 4. CSS variables → theme object passed via context
 * 5. No :hover states - use onPress for interactions
 * 6. Tooltips need custom implementation with Pressable
 * 
 * REACT NATIVE IMPLEMENTATION:
 * ```tsx
 * import {
 *   VictoryBar,
 *   VictoryChart,
 *   VictoryLine,
 *   VictoryPie,
 *   VictoryArea,
 *   VictoryAxis,
 *   VictoryTheme,
 *   VictoryTooltip,
 *   VictoryVoronoiContainer,
 * } from 'victory-native';
 * import { View, Dimensions } from 'react-native';
 * 
 * const { width: screenWidth } = Dimensions.get('window');
 * 
 * // Chart theme matching PolicyAngel design system
 * const chartTheme = {
 *   ...VictoryTheme.material,
 *   axis: {
 *     style: {
 *       axis: {
 *         stroke: 'rgba(255, 255, 255, 0.1)',
 *       },
 *       grid: {
 *         stroke: 'rgba(255, 255, 255, 0.05)',
 *       },
 *       tickLabels: {
 *         fill: 'rgba(255, 255, 255, 0.6)',
 *         fontSize: 10,
 *       },
 *     },
 *   },
 * };
 * 
 * export interface ChartConfig {
 *   [key: string]: {
 *     label?: string;
 *     color?: string;
 *     icon?: any;
 *   };
 * }
 * 
 * interface ChartContainerProps {
 *   config: ChartConfig;
 *   children: React.ReactNode;
 *   height?: number;
 * }
 * 
 * export function ChartContainer({
 *   config,
 *   children,
 *   height = 250,
 * }: ChartContainerProps) {
 *   return (
 *     <View style={{ width: '100%', height }}>
 *       {children}
 *     </View>
 *   );
 * }
 * 
 * // Line Chart Example
 * export function LineChart({ data, config }: { data: any[]; config: ChartConfig }) {
 *   return (
 *     <VictoryChart
 *       theme={chartTheme}
 *       width={screenWidth - 32}
 *       height={250}
 *       containerComponent={
 *         <VictoryVoronoiContainer
 *           labels={({ datum }) => `${datum.x}: ${datum.y}`}
 *           labelComponent={
 *             <VictoryTooltip
 *               cornerRadius={8}
 *               flyoutStyle={{
 *                 fill: 'rgba(0, 0, 0, 0.8)',
 *                 stroke: 'rgba(255, 255, 255, 0.1)',
 *               }}
 *               style={{ fill: '#fff', fontSize: 12 }}
 *             />
 *           }
 *         />
 *       }
 *     >
 *       <VictoryAxis
 *         style={{
 *           axis: { stroke: 'rgba(255, 255, 255, 0.1)' },
 *           tickLabels: { fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
 *         }}
 *       />
 *       <VictoryAxis
 *         dependentAxis
 *         style={{
 *           axis: { stroke: 'rgba(255, 255, 255, 0.1)' },
 *           grid: { stroke: 'rgba(255, 255, 255, 0.05)' },
 *           tickLabels: { fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
 *         }}
 *       />
 *       <VictoryLine
 *         data={data}
 *         style={{
 *           data: {
 *             stroke: config.line?.color || '#D4AF37',
 *             strokeWidth: 2,
 *           },
 *         }}
 *         animate={{
 *           duration: 500,
 *           onLoad: { duration: 500 },
 *         }}
 *       />
 *     </VictoryChart>
 *   );
 * }
 * 
 * // Bar Chart Example
 * export function BarChart({ data, config }: { data: any[]; config: ChartConfig }) {
 *   return (
 *     <VictoryChart
 *       theme={chartTheme}
 *       width={screenWidth - 32}
 *       height={250}
 *       domainPadding={{ x: 20 }}
 *     >
 *       <VictoryAxis
 *         style={{
 *           tickLabels: { fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
 *         }}
 *       />
 *       <VictoryAxis
 *         dependentAxis
 *         style={{
 *           tickLabels: { fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
 *         }}
 *       />
 *       <VictoryBar
 *         data={data}
 *         style={{
 *           data: {
 *             fill: config.bar?.color || '#D4AF37',
 *           },
 *         }}
 *         cornerRadius={{ top: 4 }}
 *         animate={{
 *           duration: 500,
 *           onLoad: { duration: 500 },
 *         }}
 *       />
 *     </VictoryChart>
 *   );
 * }
 * 
 * // Area Chart Example  
 * export function AreaChart({ data, config }: { data: any[]; config: ChartConfig }) {
 *   return (
 *     <VictoryChart
 *       theme={chartTheme}
 *       width={screenWidth - 32}
 *       height={250}
 *     >
 *       <VictoryAxis />
 *       <VictoryAxis dependentAxis />
 *       <VictoryArea
 *         data={data}
 *         style={{
 *           data: {
 *             fill: config.area?.color || 'rgba(212, 175, 55, 0.3)',
 *             stroke: config.area?.color || '#D4AF37',
 *             strokeWidth: 2,
 *           },
 *         }}
 *         animate={{
 *           duration: 500,
 *         }}
 *       />
 *     </VictoryChart>
 *   );
 * }
 * 
 * // Pie Chart Example
 * export function PieChart({ data, config }: { data: any[]; config: ChartConfig }) {
 *   return (
 *     <View style={{ alignItems: 'center' }}>
 *       <VictoryPie
 *         data={data}
 *         width={screenWidth - 32}
 *         height={250}
 *         colorScale={Object.values(config).map(c => c.color || '#D4AF37')}
 *         innerRadius={60}
 *         labels={({ datum }) => `${datum.x}: ${datum.y}`}
 *         labelRadius={({ innerRadius }) => innerRadius + 30}
 *         style={{
 *           labels: { fill: '#fff', fontSize: 12 },
 *         }}
 *         animate={{
 *           duration: 500,
 *         }}
 *       />
 *     </View>
 *   );
 * }
 * ```
 * 
 * CHART TYPE MAPPING:
 * - Recharts LineChart → VictoryLine
 * - Recharts BarChart → VictoryBar
 * - Recharts AreaChart → VictoryArea
 * - Recharts PieChart → VictoryPie
 * - Recharts ComposedChart → Multiple Victory components in VictoryChart
 * - Recharts ScatterChart → VictoryScatter
 * - Recharts RadarChart → VictoryPolarAxis with VictoryArea
 * 
 * COMPONENT MAPPING:
 * - ResponsiveContainer → VictoryContainer or View with width/height
 * - CartesianGrid → VictoryAxis with grid style
 * - XAxis/YAxis → VictoryAxis with orientation
 * - Tooltip → VictoryTooltip with VictoryVoronoiContainer
 * - Legend → Custom View with data mapping
 * - ReferenceLine → VictoryLine with custom styling
 * 
 * POLICYANGEL-SPECIFIC CHARTS:
 * 1. Property Value Trends: Line chart with area fill
 * 2. Monthly Inspection Counts: Bar chart with rounded corners
 * 3. Risk Assessment: Radial chart with color zones
 * 4. Weather Impact: Stacked area chart
 * 5. Cost Breakdown: Donut chart with legend
 * 6. Timeline: Horizontal bar chart with dates
 * 
 * ACCESSIBILITY:
 * - Use accessibilityLabel to describe chart type and data range
 * - Provide text alternative for chart data
 * - Use accessibilityHint for interaction guidance
 * - Color-blind friendly palette (avoid red/green only)
 * 
 * PERFORMANCE OPTIMIZATION:
 * - Use memoization for chart data transformations
 * - Limit data points (max 50-100 for smooth performance)
 * - Implement data aggregation for large datasets
 * - Use react-native-skia for heavy animations
 * - Disable animations on low-end devices
 * 
 * STYLING NOTES:
 * - Define theme object matching design system colors
 * - Use custom VictoryTheme for consistent styling
 * - Apply golden ratio colors: #D4AF37, #C5A028, #B89121
 * - Dark theme: Dark backgrounds with light text
 * - Grid lines: Subtle rgba(255, 255, 255, 0.05)
 * 
 * INTERACTIONS:
 * - VictoryVoronoiContainer for tooltip on tap
 * - onPressIn/onPressOut for highlight effects
 * - Pan gestures for zooming (react-native-gesture-handler)
 * - Pinch gestures for time range selection
 */

"use client";

import * as React from "react";
// WEB: Recharts for declarative charting
// REACT NATIVE: Replace with victory-native
// npm install victory-native react-native-svg
import * as RechartsPrimitive from "recharts@2.15.2";

import { cn } from "./utils";

// Format: { THEME_NAME: CSS_SELECTOR }
// WEB: CSS class selectors for theming
// REACT NATIVE: Replace with theme object passed via context
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};
// REACT NATIVE: Simplify to just color and label:
// export type ChartConfig = {
//   [key: string]: {
//     label?: string;
//     color?: string;
//     icon?: any; // React Native icon component
//   };
// };

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);
// REACT NATIVE: Same context pattern works

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  // WEB: Wraps Recharts ResponsiveContainer with theme styling
  // REACT NATIVE: VictoryChart handles dimensions internally
  // <View style={{ width: '100%', height: 250 }}>
  //   <VictoryChart theme={chartTheme}>
  //     {children}
  //   </VictoryChart>
  // </View>
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        // REACT NATIVE: Replace complex CSS selectors with Victory theme object
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {/* REACT NATIVE: Remove ChartStyle, use theme object instead */}
        <RechartsPrimitive.ResponsiveContainer>
          {/* REACT NATIVE: VictoryChart with width/height props */}
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

// WEB: Injects CSS variables for chart colors via <style> tag
// REACT NATIVE: Not applicable - use theme object with colors directly
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  // WEB: dangerouslySetInnerHTML to inject CSS
  // REACT NATIVE: Cannot use - define colors in theme object:
  // const theme = {
  //   palette: {
  //     primary: config.primary?.color || '#D4AF37',
  //     secondary: config.secondary?.color || '#C5A028',
  //     ...
  //   }
  // };
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;
// REACT NATIVE: Use VictoryTooltip or custom Pressable with Modal

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }) {
  const { config } = useChart();

  // WEB: Render tooltip label with config lookup
  // REACT NATIVE: Similar logic, render as Text component
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {/* REACT NATIVE: <Text style={styles.tooltipLabel}> */}
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    // REACT NATIVE: <Text style={styles.tooltipLabel}>{value}</Text>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  // WEB: Tooltip content with border, shadow, and indicators
  // REACT NATIVE: Modal or absolutely positioned View with similar styling
  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
      // REACT NATIVE:
      // <View style={{
      //   backgroundColor: 'rgba(0, 0, 0, 0.9)',
      //   borderRadius: 8,
      //   borderWidth: 1,
      //   borderColor: 'rgba(255, 255, 255, 0.1)',
      //   padding: 12,
      //   minWidth: 128,
      //   shadowColor: '#000',
      //   shadowOffset: { width: 0, height: 4 },
      //   shadowOpacity: 0.3,
      //   shadowRadius: 8,
      //   elevation: 8,
      // }}>
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <div
              key={item.dataKey}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center",
              )}
              // REACT NATIVE: 
              // <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          },
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                        // REACT NATIVE:
                        // <View style={{
                        //   width: indicator === "dot" ? 10 : 4,
                        //   height: 10,
                        //   borderRadius: 2,
                        //   backgroundColor: indicatorColor,
                        // }} />
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {/* REACT NATIVE: <Text style={{ color: 'rgba(255,255,255,0.6)' }}> */}
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {/* REACT NATIVE: <Text style={{ fontFamily: 'monospace', fontWeight: '600' }}> */}
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;
// REACT NATIVE: Custom component with FlatList or mapped Views

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  // WEB: Flexbox legend with icons and labels
  // REACT NATIVE: FlatList or mapped Views with icons
  // <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
  //   {payload.map((item) => (
  //     <View key={item.value} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  //       <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: item.color }} />
  //       <Text style={{ color: '#fff', fontSize: 12 }}>{item.value}</Text>
  //     </View>
  //   ))}
  // </View>
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
