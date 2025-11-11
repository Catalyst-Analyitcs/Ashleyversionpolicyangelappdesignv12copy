/**
 * ==============================================================================
 * LIQUIDGLASSHEADER.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Glassmorphic header with weather, notifications, property selector,
 * and user account. Used across multiple screens for consistent navigation.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * ✅ KEEP AS-IS (95% of styles): All Tailwind utility classes work!
 * ❌ CONVERT ONLY: Use SafeAreaView, Pressable, StatusBar
 * 
 * ```tsx
 * import { SafeAreaView, View, Text, Pressable, StatusBar } from 'react-native';
 * 
 * <SafeAreaView className="bg-pa-dark">
 *   <StatusBar barStyle="light-content" />
 *   <View className="flex-row items-center justify-between p-4 bg-white/5 backdrop-blur border-b border-white/10">
 *     <Pressable className="flex-row items-center gap-2">
 *       <Text className="text-white font-semibold">{property.address}</Text>
 *     </Pressable>
 *     <View className="flex-row gap-3">
 *       <Pressable className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
 *         <Bell size={20} color="#ffffff" />
 *       </Pressable>
 *     </View>
 *   </View>
 * </SafeAreaView>
 * ```
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. HEADER COMPONENT:
 *    - Use react-navigation's header component
 *    - Or custom View with SafeAreaView
 *    - Position: sticky not available, use native header
 * 
 * 2. GLASSMORPHISM:
 *    - BlurView from expo-blur
 *    - Semi-transparent background
 *    - Platform-specific blur intensity
 * 
 * 3. PROPERTY DROPDOWN:
 *    - Modal or BottomSheet for property selection
 *    - FlatList for property list
 *    - Store selection in Zustand
 * 
 * 4. NOTIFICATIONS:
 *    - Badge with count
 *    - Navigate to AlertsScreen
 *    - Real-time updates via WebSocket or polling
 * 
 * 5. WEATHER DISPLAY:
 *    - Icon + temperature
 *    - Tap to open WeatherScreen
 * 
 * ==============================================================================
 * REACT NATIVE EXAMPLE
 * ==============================================================================
 * 
 * import { BlurView } from 'expo-blur';
 * import { SafeAreaView } from 'react-native-safe-area-context';
 * 
 * <SafeAreaView edges={['top']}>
 *   <BlurView intensity={80} style={headerStyles}>
 *     <View style={contentStyles}>
 *       <TouchableOpacity onPress={goBack}>
 *         <ChevronLeft />
 *       </TouchableOpacity>
 *       <Text>{title}</Text>
 *       <TouchableOpacity onPress={openNotifications}>
 *         <Bell />
 *         <Badge count={3} />
 *       </TouchableOpacity>
 *     </View>
 *   </BlurView>
 * </SafeAreaView>
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Header displays correctly
 * - [ ] Back button navigates
 * - [ ] Property selector works
 * - [ ] Notifications badge updates
 * - [ ] Weather data shows
 * - [ ] Account menu opens
 * - [ ] iOS and Android compatible
 * 
 */

// Updated: Property dropdown with solid background - v2.1
import { useState, useEffect, useRef } from "react";
import { Cloud, Loader2, Bell, X, AlertCircle, AlertTriangle, Info, CheckCircle, ChevronLeft, Home, Building2, Waves } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { PolicyAngelText } from "./PolicyAngelText";
import { useProperty } from "../utils/PropertyContext";
import { NotificationBadge } from "./NotificationCard";
import { notificationEngine } from "../utils/notificationEngine";

type WeatherCondition = 'clear' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'unknown';
type WeatherSeverity = 'safe' | 'normal' | 'warning' | 'danger';
type NotificationPriority = 'low' | 'medium' | 'high' | 'extreme';
type NotificationType = 'info' | 'warning' | 'error' | 'success';

interface MockNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  timestamp: Date;
  read: boolean;
}

interface LiquidGlassHeaderProps {
  title: string;
  subtitle?: string;
  colorMode?: 'light' | 'dark';
  showBackButton?: boolean;
  showAccount?: boolean;
  showWeather?: boolean;
  showAlerts?: boolean;
  accountName?: string;
  accountImage?: string;
  onAccountPress?: () => void;
  onAccountMenuPress?: () => void;
  onBackPress?: () => void;
  onWeatherPress?: () => void;
  onAlertsPress?: () => void;
  onNotificationsExpand?: () => void;
  weatherTemperature?: string;
  weatherUnit?: string;
  weatherDisplayValue?: string;
  weatherLabel?: string;
  weatherCondition?: WeatherCondition;
  weatherSeverity?: WeatherSeverity;
  weatherLoading?: boolean;
  rightElement?: React.ReactNode;
  hideAccountButton?: boolean;
}

// Theme-aware colors matching React Native implementation
const getThemeColors = (colorMode: 'light' | 'dark') => {
  const isDark = colorMode === 'dark';
  
  return {
    // Using CSS variables for glass effect to match navbar
    headerBg: 'var(--glass-bg)', // Same as navbar
    borderColor: 'var(--glass-border)', // Same as navbar
    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    iconColor: 'var(--icon-color)',
    buttonBg: 'var(--icon-bg)',
    buttonHoverBg: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
    success: isDark ? '#10b981' : '#059669',
    warning: isDark ? '#f59e0b' : '#d97706',
    error: isDark ? '#ef4444' : '#dc2626',
    info: isDark ? '#38bdf8' : '#0ea5e9',
  };
};

const getNotificationColor = (priority: NotificationPriority, colors: ReturnType<typeof getThemeColors>): string => {
  switch (priority) {
    case 'high':
    case 'extreme':
      return colors.error;
    case 'medium':
      return colors.warning;
    default:
      return colors.success;
  }
};

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'error':
      return AlertCircle;
    case 'warning':
      return AlertTriangle;
    case 'info':
      return Info;
    case 'success':
      return CheckCircle;
    default:
      return Bell;
  }
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export function LiquidGlassHeader({
  title,
  subtitle,
  colorMode = 'dark',
  showBackButton = false,
  showAccount = true,
  showWeather = true,
  showAlerts = false,
  accountName = "JD",
  accountImage,
  onAccountPress,
  onAccountMenuPress,
  onBackPress,
  onWeatherPress,
  onAlertsPress,
  onNotificationsExpand,
  weatherTemperature,
  weatherDisplayValue,
  weatherLabel,
  weatherLoading = false,
  rightElement,
  hideAccountButton = false,
}: LiquidGlassHeaderProps) {
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState<MockNotification[]>([]);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { selectedProperty, setSelectedProperty, allProperties } = useProperty();
  const colors = getThemeColors(colorMode);
  const isDark = colorMode === 'dark';

  const handleAlertsPress = () => {
    if (onAlertsPress) {
      onAlertsPress();
    } else {
      setShowNotifications(true);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPropertyDropdown(false);
      }
    }

    if (showPropertyDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showPropertyDropdown]);

  // Get property type icon
  const getPropertyIcon = (type: string) => {
    if (type.toLowerCase().includes('condo')) return Waves;
    if (type.toLowerCase().includes('townhouse')) return Building2;
    return Home;
  };

  return (
    <>
      {/* Fixed Header - Edge to Edge with only bottom corners rounded */}
      <div
        className="fixed top-0 left-0 right-0 backdrop-blur-md"
        style={{
          backgroundColor: colors.headerBg,
          borderBottomLeftRadius: 'var(--spacing-5)', // 20px - ONLY bottom corners
          borderBottomRightRadius: 'var(--spacing-5)', // 20px - ONLY bottom corners
          borderBottom: `1px solid ${colors.borderColor}`,
          zIndex: 'var(--z-header)', // 1000 - Using CSS variable
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.08),
            0 4px 8px rgba(0, 0, 0, 0.12),
            0 8px 16px rgba(0, 0, 0, 0.15),
            0 12px 24px rgba(0, 0, 0, 0.18)
          `,
          marginLeft: 0, // Edge to edge - no side margins
          marginRight: 0, // Edge to edge - no side margins
          width: '100%', // Full width
        }}
      >
        <div 
          className="flex flex-col mx-auto"
          style={{
            maxWidth: 'var(--mobile-max-width)', // 428px - constrain content but bg is full width
            paddingTop: 'var(--spacing-2)', // 8px
            paddingBottom: 'var(--spacing-2)', // 8px
            paddingLeft: 'var(--spacing-5)', // 20px
            paddingRight: 'var(--spacing-5)', // 20px
            gap: 'var(--spacing-1)', // 4px
          }}
        >
          {/* Top Row: Account & Weather */}
          <div 
            className="flex items-center justify-between"
            style={{ marginBottom: 'var(--spacing-1)', position: 'relative', zIndex: 1 }} // 4px
          >
            {/* Account Section */}
            <div className="flex items-center">
              {showAccount && !hideAccountButton && (
                <div style={{ position: 'relative' }}>
                  {/* Semi-transparent Button Group */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isDark 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)'}`,
                      boxShadow: `
                        0 2px 4px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                      `,
                      padding: '2px',
                    }}
                  >
                    <button
                      onClick={onAccountPress}
                      className="hover:bg-white/20 active:bg-white/30 transition-all"
                      style={{
                        padding: '2px 12px',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: colors.textPrimary,
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 'var(--font-weight-semibold)',
                        }}
                      >
                        Hi, {accountName || 'JD'}
                      </span>
                    </button>
                    
                    {/* Divider */}
                    <div
                      style={{
                        width: '2px',
                        height: '24px',
                        backgroundColor: isDark ? 'rgba(100, 100, 100, 0.7)' : 'rgba(60, 60, 60, 0.6)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    />
                    
                    <button
                      onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
                      className="hover:bg-white/20 active:bg-white/30 transition-all"
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: '28px',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: colors.textPrimary,
                          fontFamily: 'Roboto, sans-serif',
                          transform: showPropertyDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          display: 'inline-block',
                        }}
                      >
                        ▼
                      </span>
                    </button>
                  </div>

                  {/* Property Dropdown Menu */}
                  {showPropertyDropdown && (
                    <div
                      ref={dropdownRef}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        minWidth: '360px',
                        maxWidth: '380px',
                        backgroundColor: '#000000',
                        opacity: 1,
                        borderRadius: 'var(--radius-lg)',
                        border: '2px solid rgb(214, 158, 46)',
                        boxShadow: `
                          0 8px 16px rgba(0, 0, 0, 0.9),
                          0 16px 32px rgba(0, 0, 0, 0.9),
                          0 24px 48px rgba(0, 0, 0, 0.9)
                        `,
                        zIndex: 999999,
                        padding: 'var(--spacing-3)',
                        animation: 'dropdownSlideIn 0.2s ease-out',
                      }}
                    >
                      <div
                        style={{
                          padding: 'var(--spacing-2) var(--spacing-3)',
                          marginBottom: 'var(--spacing-2)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: 'var(--text-xs)',
                            color: colors.textTertiary,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: '500',
                          }}
                        >
                          My Properties
                        </span>
                      </div>

                      {allProperties.map((property) => {
                        const PropertyIcon = getPropertyIcon(property.propertyType);
                        const isSelected = property.id === selectedProperty.id;
                        
                        return (
                          <button
                            key={property.id}
                            onClick={() => {
                              setSelectedProperty(property);
                              setShowPropertyDropdown(false);
                            }}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--spacing-3)',
                              padding: 'var(--spacing-3)',
                              borderRadius: 'var(--radius-md)',
                              backgroundColor: isSelected
                                ? isDark ? 'rgba(214, 158, 46, 0.15)' : 'rgba(214, 158, 46, 0.1)'
                                : 'transparent',
                              border: isSelected
                                ? '1px solid rgb(var(--color-goldenrod))'
                                : '1px solid transparent',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              marginBottom: 'var(--spacing-1)',
                            }}
                            className="hover:bg-white/10"
                          >
                            {/* Property Icon */}
                            <div
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: isSelected
                                  ? 'rgba(214, 158, 46, 0.2)'
                                  : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <PropertyIcon
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  color: isSelected 
                                    ? 'rgb(var(--color-goldenrod))' 
                                    : colors.iconColor,
                                }}
                              />
                            </div>

                            {/* Property Details */}
                            <div
                              style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '2px',
                                textAlign: 'left',
                              }}
                            >
                              {/* Address */}
                              <div
                                style={{
                                  fontFamily: 'Roboto',
                                  fontSize: 'var(--text-base)',
                                  color: isSelected 
                                    ? 'rgb(var(--color-goldenrod))' 
                                    : colors.textPrimary,
                                  fontWeight: '500',
                                  lineHeight: '1.3',
                                }}
                              >
                                {property.address}
                              </div>

                              {/* City, State */}
                              <div
                                style={{
                                  fontFamily: 'Roboto',
                                  fontSize: 'var(--text-xs)',
                                  color: colors.textSecondary,
                                  lineHeight: '1.4',
                                }}
                              >
                                {property.city}, {property.state} {property.zip}
                              </div>

                              {/* Property Type & Value */}
                              <div
                                style={{
                                  display: 'flex',
                                  gap: 'var(--spacing-2)',
                                  alignItems: 'center',
                                  marginTop: '2px',
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontSize: 'var(--text-xs)',
                                    color: colors.textTertiary,
                                  }}
                                >
                                  {property.propertyType}
                                </span>
                                <span style={{ color: colors.textTertiary, fontSize: '10px' }}>•</span>
                                <span
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontSize: 'var(--text-xs)',
                                    color: isSelected 
                                      ? 'rgb(var(--color-goldenrod))' 
                                      : colors.textSecondary,
                                    fontWeight: '500',
                                  }}
                                >
                                  {property.estimatedValue}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* CSS Animations */}
            <style>{`
              @keyframes dropdownSlideIn {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            {/* Weather & Alerts Section */}
            <div 
              className="flex items-center"
              style={{ gap: 'var(--spacing-2)' }} // 8px
            >
              {/* Weather Pill */}
              {showWeather && (
                <button
                  onClick={onWeatherPress}
                  className="flex items-center rounded-full backdrop-blur-sm border transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: isDark 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.05)',
                    borderColor: isDark 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(0, 0, 0, 0.1)',
                    padding: 'var(--spacing-1) var(--spacing-3)', // 4px 12px
                    gap: 'var(--spacing-2)', // 8px
                    boxShadow: `
                      0 1px 2px rgba(0, 0, 0, 0.1),
                      0 2px 4px rgba(0, 0, 0, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05)
                    `,
                  }}
                >
                  {weatherLoading ? (
                    <>
                      <Loader2 
                        className="animate-spin" 
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          color: colors.iconColor 
                        }} 
                      />
                      <span style={{ color: colors.textSecondary, fontSize: 'var(--text-sm)' }}>
                        Loading...
                      </span>
                    </>
                  ) : (
                    <>
                      <Cloud style={{ width: '16px', height: '16px', color: colors.iconColor }} />
                      {weatherDisplayValue && (
                        <span style={{ color: colors.textPrimary, fontSize: 'var(--text-sm)' }}>
                          {weatherDisplayValue}
                        </span>
                      )}
                      {weatherLabel && (
                        <span style={{ color: colors.textSecondary, fontSize: 'var(--text-sm)' }}>
                          {weatherLabel}
                        </span>
                      )}
                    </>
                  )}
                </button>
              )}

              {/* Alerts Bell with Angel Halo Badge */}
              {showAlerts && (
                <div className="relative">
                  <NotificationBadge
                    count={notificationEngine.getUnreadCount()}
                    priority={
                      notificationEngine.getNotifications({ unreadOnly: true }).find(n => n.priority === 'urgent') ? 'urgent' :
                      notificationEngine.getNotifications({ unreadOnly: true }).find(n => n.priority === 'high') ? 'high' : 'medium'
                    }
                    onClick={handleAlertsPress}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row: Title Section */}
          <div className="flex items-center justify-center relative" style={{ position: 'relative', zIndex: 1 }}>
            {/* Back Button - Left */}
            {showBackButton && (
              <button
                onClick={onBackPress}
                className="absolute left-0 flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-all"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <ChevronLeft 
                  style={{ 
                    width: '24px', 
                    height: '24px', 
                    color: colors.textPrimary 
                  }} 
                />
              </button>
            )}

            {/* Title & Subtitle */}
            <div className="flex flex-col items-center">
              <h1 
                style={{ 
                  color: colors.textPrimary,
                  margin: 0,
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                {title === 'PolicyAngel' ? (
                  <PolicyAngelText />
                ) : (
                  title
                )}
              </h1>
              {subtitle && (
                <p 
                  style={{ 
                    color: colors.textSecondary,
                    margin: 0,
                    marginTop: 'var(--spacing-1)',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {/* Right Element */}
            {rightElement && (
              <div className="absolute right-0">
                {rightElement}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent
          className="max-w-md"
          style={{
            backgroundColor: isDark 
              ? 'rgba(30, 41, 59, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderColor: colors.borderColor,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: colors.textPrimary }}>
              Notifications
            </DialogTitle>
          </DialogHeader>

          {/* Notifications List */}
          <div 
            className="flex flex-col"
            style={{ 
              maxHeight: '300px',
              overflowY: 'auto',
              gap: 'var(--spacing-2)',
            }}
          >
            {notifications.length === 0 ? (
              <div 
                className="flex flex-col items-center justify-center"
                style={{ padding: 'var(--spacing-8)' }}
              >
                <Bell 
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    color: colors.textSecondary,
                    marginBottom: 'var(--spacing-3)',
                  }} 
                />
                <span style={{ color: colors.textSecondary, fontSize: 'var(--text-base)' }}>
                  No notifications
                </span>
                <span 
                  style={{ 
                    color: colors.textSecondary, 
                    fontSize: 'var(--text-sm)',
                    marginTop: 'var(--spacing-1)',
                  }}
                >
                  You're all caught up!
                </span>
              </div>
            ) : (
              notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className="flex items-start border-b transition-colors hover:bg-opacity-50"
                    style={{
                      padding: 'var(--spacing-4)',
                      borderBottomColor: colors.borderColor,
                      backgroundColor: notification.read 
                        ? 'transparent' 
                        : isDark 
                          ? 'rgba(59, 130, 246, 0.1)' 
                          : 'rgba(59, 130, 246, 0.05)',
                      gap: 'var(--spacing-3)',
                    }}
                  >
                    <div
                      className="rounded-full"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: getNotificationColor(notification.priority, colors),
                        marginTop: 'var(--spacing-2)',
                      }}
                    />
                    
                    <div className="flex-1 flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
                      <span 
                        style={{ 
                          color: colors.textPrimary, 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                        }}
                      >
                        {notification.title}
                      </span>
                      <span 
                        style={{ 
                          color: colors.textSecondary, 
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        {notification.message}
                      </span>
                      <span 
                        style={{ 
                          color: colors.textSecondary, 
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    
                    <IconComponent 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        color: getNotificationColor(notification.priority, colors),
                      }} 
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div 
              className="flex justify-center border-t"
              style={{
                padding: 'var(--spacing-3)',
                borderTopColor: colors.borderColor,
              }}
            >
              <button
                onClick={() => {
                  setShowNotifications(false);
                  onNotificationsExpand?.();
                }}
                style={{
                  color: colors.info,
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  padding: 'var(--spacing-2) var(--spacing-4)',
                }}
              >
                View All Notifications
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}