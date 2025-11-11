/**
 * ==============================================================================
 * ALERTSSCREEN.TSX - ENHANCED WITH SMART NOTIFICATIONS
 * ==============================================================================
 * 
 * PURPOSE: Comprehensive notification center displaying smart notifications
 * from the PolicyAngel notification engine with angel halo icons, filtering,
 * and priority-based organization.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. NOTIFICATION LIST:
 *    - FlatList for notification items
 *    - Swipe to dismiss → react-native-gesture-handler
 *    - Pull to refresh → RefreshControl
 * 
 * 2. FILTERING SYSTEM:
 *    - Tab navigation for notification types
 *    - Badge counts per type
 *    - Search/filter capabilities
 * 
 * 3. PUSH NOTIFICATIONS:
 *    - expo-notifications or @react-native-firebase/messaging
 *    - Handle notification permissions
 *    - Deep linking from notifications
 * 
 * ==============================================================================
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  DollarSign,
  Trophy,
  Shield,
  Lightbulb,
  Filter,
  CheckCheck,
  Trash2
} from 'lucide-react';
import { NotificationCard, NotificationBadge } from '../components/NotificationCard';
import { notificationEngine, type NotificationType } from '../utils/notificationEngine';

// Mock data for demo - replace with real notificationEngine.getNotifications()
const mockNotifications = [
  {
    id: '1',
    type: 'deadline' as NotificationType,
    priority: 'urgent' as const,
    title: '⚠️ FINAL REMINDER: Grant Deadline Tomorrow!',
    message: 'Last chance for $8,500 Energy Efficiency Grant!',
    icon: 'AlertOctagon',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    read: false,
    actionUrl: '/grants/energy-grant-2024',
    actionLabel: 'Apply Now',
    data: { grantId: 'energy-grant-2024' },
  },
  {
    id: '2',
    type: 'opportunity' as NotificationType,
    priority: 'high' as const,
    title: '💰 New Grant Available: Seismic Retrofit',
    message: 'You qualify for $12,000 in seismic retrofit funding!',
    icon: 'DollarSign',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    actionUrl: '/grants/seismic-retrofit',
    actionLabel: 'View Details',
  },
  {
    id: '3',
    type: 'action' as NotificationType,
    priority: 'high' as const,
    title: '🛡️ Insurance Quote Ready',
    message: 'Review and switch to save $672/year with Lemonade',
    icon: 'Shield',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: false,
    actionUrl: '/insurance-optimizer',
    actionLabel: 'Review Quote',
  },
  {
    id: '4',
    type: 'achievement' as NotificationType,
    priority: 'medium' as const,
    title: '🎉 Quarter Way There!',
    message: "You've claimed $8,000 of $23,500. Keep going!",
    icon: 'Trophy',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionUrl: '/opportunities/dashboard',
    actionLabel: 'View Progress',
  },
  {
    id: '5',
    type: 'tip' as NotificationType,
    priority: 'low' as const,
    title: '💡 Tip: Document Everything',
    message: 'Take photos of home improvements - they help with grant applications and insurance claims.',
    icon: 'Lightbulb',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    actionUrl: '/gallery',
    actionLabel: 'Open Gallery',
  },
  {
    id: '6',
    type: 'risk' as NotificationType,
    priority: 'high' as const,
    title: '⚠️ Weather Alert: High Winds Tomorrow',
    message: 'Wind speeds up to 45 mph expected. Review your roof insurance coverage.',
    icon: 'AlertTriangle',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: false,
    actionUrl: '/weather',
    actionLabel: 'View Forecast',
  },
];

type FilterType = 'all' | NotificationType;

export function AlertsScreen() {
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const [filter, setFilter] = React.useState<FilterType>('all');
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);

  // In production, use: const notifications = notificationEngine.getNotifications();

  // Filter notifications
  const filteredNotifications = React.useMemo(() => {
    if (filter === 'all') {
      return notifications;
    }
    return notifications.filter(n => n.type === filter);
  }, [notifications, filter]);

  // Get counts for each type
  const counts = React.useMemo(() => {
    const unread = notifications.filter(n => !n.read);
    return {
      all: unread.length,
      deadline: unread.filter(n => n.type === 'deadline').length,
      opportunity: unread.filter(n => n.type === 'opportunity').length,
      action: unread.filter(n => n.type === 'action').length,
      achievement: unread.filter(n => n.type === 'achievement').length,
      risk: unread.filter(n => n.type === 'risk').length,
      update: unread.filter(n => n.type === 'update').length,
      savings: unread.filter(n => n.type === 'savings').length,
      tip: unread.filter(n => n.type === 'tip').length,
    };
  }, [notifications]);

  // Get highest priority unread notification
  const highestPriority = React.useMemo(() => {
    const unread = notifications.filter(n => !n.read);
    if (unread.length === 0) return 'low';
    const priorities = ['urgent', 'high', 'medium', 'low'];
    for (const priority of priorities) {
      if (unread.some(n => n.priority === priority)) {
        return priority;
      }
    }
    return 'low';
  }, [notifications]) as any;

  // Handlers
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    // In production: notificationEngine.markAsRead(id);
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    // In production: notificationEngine.deleteNotification(id);
  };

  const handleAction = (notification: any) => {
    console.log('Navigate to:', notification.actionUrl);
    handleMarkAsRead(notification.id);
    // In production: navigation.navigate(notification.actionUrl);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    // In production: notificationEngine.markAllAsRead(filter === 'all' ? undefined : filter);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
      // In production: notificationEngine.clearAll(filter === 'all' ? undefined : filter);
    }
  };

  const filterOptions: { value: FilterType; label: string; icon: any }[] = [
    { value: 'all', label: 'All', icon: Bell },
    { value: 'deadline', label: 'Deadlines', icon: AlertTriangle },
    { value: 'opportunity', label: 'Opportunities', icon: DollarSign },
    { value: 'action', label: 'Actions', icon: CheckCircle },
    { value: 'achievement', label: 'Achievements', icon: Trophy },
    { value: 'risk', label: 'Risks', icon: Shield },
    { value: 'tip', label: 'Tips', icon: Lightbulb },
  ];

  return (
    <div 
      className="w-full h-full flex flex-col relative"
      style={{
        background: 'transparent',
      }}
      // RN: Use SafeAreaView
    >
      {/* Header */}
      <div
        className="flex flex-col"
        style={{
          padding: 'var(--spacing-6)',
          paddingBottom: 'var(--spacing-4)',
          gap: 'var(--spacing-4)',
        }}
      >
        {/* Title row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell size={24} style={{ color: 'var(--text-primary)' }} />
              {counts.all > 0 && (
                <NotificationBadge 
                  count={counts.all} 
                  priority={highestPriority}
                />
              )}
            </div>
            <h1 style={{ color: 'var(--text-primary)' }}>
              Notifications
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {filteredNotifications.some(n => !n.read) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMarkAllAsRead}
                className="p-2 rounded-lg backdrop-blur-md"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                title="Mark all as read"
              >
                <CheckCheck size={18} style={{ color: 'var(--text-secondary)' }} />
              </motion.button>
            )}
            
            {filteredNotifications.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearAll}
                className="p-2 rounded-lg backdrop-blur-md"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                title="Clear all"
              >
                <Trash2 size={18} style={{ color: 'var(--text-secondary)' }} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div
          className="flex overflow-x-auto"
          style={{
            gap: 'var(--spacing-2)',
            paddingBottom: 'var(--spacing-1)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {filterOptions.map(option => {
            const Icon = option.icon;
            const count = counts[option.value];
            const isActive = filter === option.value;

            return (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter(option.value)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md whitespace-nowrap transition-all"
                style={{
                  background: isActive 
                    ? 'rgba(212, 175, 55, 0.15)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isActive
                    ? '1px solid rgba(212, 175, 55, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#D4AF37' : 'var(--text-secondary)',
                }}
              >
                <Icon size={16} />
                <span style={{ fontSize: '14px', fontWeight: isActive ? 600 : 400 }}>
                  {option.label}
                </span>
                {count > 0 && (
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      minWidth: '20px',
                      height: '20px',
                      padding: '0 6px',
                      background: isActive ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)',
                      color: isActive ? '#000' : '#D4AF37',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Notifications list */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          padding: 'var(--spacing-6)',
          paddingTop: 0,
          paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))',
        }}
        // RN: Use FlatList with renderItem
      >
        {filteredNotifications.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center"
            style={{
              padding: 'var(--spacing-12)',
              gap: 'var(--spacing-4)',
              textAlign: 'center',
            }}
          >
            <div
              className="rounded-full backdrop-blur-md"
              style={{
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
              }}
            >
              <Bell size={36} style={{ color: '#D4AF37', opacity: 0.5 }} />
            </div>
            <div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
                No notifications
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                {filter === 'all' 
                  ? "You're all caught up!"
                  : `No ${filter} notifications`}
              </p>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onRead={handleMarkAsRead}
                onDelete={handleDelete}
                onAction={handleAction}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
