/**
 * ==============================================================================
 * WEEKLYWEATHERWIDGET.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: 7-day weather forecast widget with icons and temperatures.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. LAYOUT:
 *    - Horizontal FlatList or ScrollView
 *    - Day cards in a row
 *    - Each card: day name, icon, high/low temps
 * 
 * 2. WEATHER ICONS:
 *    - lucide-react-native icons
 *    - Or custom SVG icons
 *    - Color coding based on condition
 * 
 * 3. INTERACTION:
 *    - Tap day for details
 *    - Navigate to detailed forecast
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] 7 days display
 * - [ ] Icons match conditions
 * - [ ] Temperatures correct
 * - [ ] Tap navigation works
 * - [ ] iOS and Android compatible
 * 
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, Zap } from 'lucide-react';

type DayForecast = {
  date: string;                 // ISO string or yyyy-mm-dd
  high: number;                 // °F or °C (consistent across app)
  low: number;                  // °F or °C
  precipProb?: number;          // 0..1
  icon?: 'sunny' | 'partly' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'fog';
};

type Props = {
  days: DayForecast[];          // 7 items preferred
  units?: 'F' | 'C';
  onPressDay?: (day: DayForecast) => void;
};

const getWeatherIcon = (icon: DayForecast['icon']) => {
  const iconProps = { size: 18, strokeWidth: 2 };
  
  switch (icon) {
    case 'sunny':
      return <Sun {...iconProps} style={{ color: 'rgb(var(--color-warning))' }} />;
    case 'partly':
      return <Cloud {...iconProps} style={{ color: 'rgb(var(--color-goldenrod))' }} />;
    case 'cloudy':
      return <Cloud {...iconProps} style={{ color: 'var(--text-tertiary)' }} />;
    case 'rain':
      return <CloudRain {...iconProps} style={{ color: 'rgb(var(--color-info))' }} />;
    case 'storm':
      return <Zap {...iconProps} style={{ color: 'rgb(var(--color-warning))' }} />;
    case 'snow':
      return <CloudSnow {...iconProps} style={{ color: '#93c5fd' }} />;
    case 'fog':
      return <Cloud {...iconProps} style={{ color: 'var(--text-tertiary)' }} />;
    default:
      return <Cloud {...iconProps} style={{ color: 'var(--text-secondary)' }} />;
  }
};

function dayLabel(d: string) {
  const dt = new Date(d);
  return dt.toLocaleDateString(undefined, { weekday: 'short' });
}

export default function WeeklyWeatherWidget({ days, units = 'F', onPressDay }: Props) {
  const { minAll, maxAll } = useMemo(() => {
    const highs = days.map(d => d.high);
    const lows = days.map(d => d.low);
    return { minAll: Math.min(...lows), maxAll: Math.max(...highs) };
  }, [days]);

  const range = Math.max(1, maxAll - minAll);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 15 }}
      className="backdrop-blur-md"
      style={{
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-4)',
        backgroundColor: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--effect-card-premium)',
      }}
    >
      <h3 style={{ 
        color: 'var(--text-primary)', 
        margin: 0, 
        marginBottom: 'var(--spacing-3)',
        fontFamily: 'Roboto, sans-serif',
      }}>
        7-Day Outlook
      </h3>

      <div className="flex items-stretch justify-between" style={{ gap: 'var(--spacing-2)' }}>
        {days.map((d) => {
          const top = ((maxAll - d.high) / range) * 100;
          const height = ((d.high - d.low) / range) * 100;

          return (
            <motion.button
              key={d.date}
              onClick={() => onPressDay?.(d)}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(var(--color-background-secondary), 0.6)',
                boxShadow: 'var(--shadow-depth-sm)'
              }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center"
              style={{
                flex: 1,
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-2) var(--spacing-2) var(--spacing-3)',
                backgroundColor: 'rgba(var(--color-background-secondary), 0.3)',
                border: '1px solid rgba(var(--color-border-primary), 0.3)',
                cursor: 'pointer',
                transition: 'var(--transition-card)',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              <div style={{ 
                color: 'var(--text-tertiary)', 
                fontSize: 'var(--text-xs)',
                marginBottom: 'var(--spacing-1)',
                fontFamily: 'Roboto, sans-serif',
              }}>
                {dayLabel(d.date)}
              </div>

              <div className="flex items-center justify-center" style={{ 
                height: '24px', 
                marginBottom: 'var(--spacing-1)' 
              }}>
                {getWeatherIcon(d.icon || 'partly')}
              </div>

              {/* Temp bar */}
              <div style={{ 
                height: '96px', 
                width: '8px', 
                position: 'relative',
                margin: 'var(--spacing-1) 0'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(var(--color-border-primary), 0.4)'
                }} />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(to bottom, rgba(var(--color-warning), 0.8), rgba(var(--color-info), 0.6))',
                    top: `${top}%`,
                    height: `${height}%`,
                  }}
                />
              </div>

              <div className="flex flex-col items-center" style={{ marginTop: 'var(--spacing-2)' }}>
                <div style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'Roboto, sans-serif',
                }}>
                  {Math.round(d.high)}°{units}
                </div>
                <div style={{ 
                  color: 'var(--text-tertiary)', 
                  fontSize: '11px',
                  fontFamily: 'Roboto, sans-serif',
                }}>
                  {Math.round(d.low)}°{units}
                </div>
                {typeof d.precipProb === 'number' && (
                  <div style={{ 
                    color: 'rgb(var(--color-info))', 
                    fontSize: '11px',
                    marginTop: 'var(--spacing-1)',
                    fontFamily: 'Roboto, sans-serif',
                  }}>
                    {(d.precipProb * 100).toFixed(0)}%
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
