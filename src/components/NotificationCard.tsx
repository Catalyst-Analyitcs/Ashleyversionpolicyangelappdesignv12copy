/**
 * ==============================================================================
 * NOTIFICATIONCARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Glassmorphic notification card with angel halo icon, displaying
 * smart notifications with priority-based styling and action buttons.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. LAYOUT:
 *    - div → View
 *    - button → Pressable or TouchableOpacity
 *    - Remove all className props
 * 
 * 2. ANIMATIONS:
 *    - motion/react → react-native-reanimated
 *    - Use useAnimatedStyle, withTiming, withSpring
 * 
 * 3. ICONS:
 *    - lucide-react → lucide-react-native
 *    - Import: import { Home } from 'lucide-react-native'
 * 
 * 4. GESTURES:
 *    - Add swipe-to-dismiss gesture
 *    - Use react-native-gesture-handler
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  AlertCircle, 
  AlertTriangle, 
  AlertOctagon,
  Trophy,
  Award,
  Star,
  PartyPopper,
  Shield,
  Home,
  Lightbulb,
  DollarSign,
  Cloud,
  CheckCircle,
  Info,
  X
} from 'lucide-react';
import type { Notification, NotificationPriority, NotificationType } from '../utils/notificationEngine';

interface NotificationCardProps {
  notification: Notification;
  onRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAction?: (notification: Notification) => void;
}

// RN: Use react-native-svg for custom SVG
/**
 * Angel Halo Icon Component
 * Custom SVG that represents PolicyAngel's notification symbol
 */
function AngelHaloIcon({ size = 24, color = '#D4AF37', priority }: { size?: number; color?: string; priority?: NotificationPriority }) {
  // Color based on priority
  const haloColor = priority === 'urgent' ? '#EF4444' : 
                    priority === 'high' ? '#F59E0B' :
                    priority === 'medium' ? '#D4AF37' : 
                    '#94A3B8';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {/* Outer glow */}
      <circle
        cx="12"
        cy="8"
        r="6"
        fill={haloColor}
        opacity="0.2"
        style={{
          filter: 'blur(4px)',
        }}
      />
      
      {/* Main halo ring */}
      <ellipse
        cx="12"
        cy="8"
        rx="8"
        ry="2.5"
        stroke={haloColor}
        strokeWidth="1.5"
        fill="none"
        opacity="0.9"
      />
      
      {/* Inner highlight */}
      <ellipse
        cx="12"
        cy="8"
        rx="6"
        ry="1.5"
        stroke={haloColor}
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      
      {/* Sparkles */}
      <circle cx="6" cy="8" r="1" fill={haloColor} opacity="0.8" />
      <circle cx="18" cy="8" r="1" fill={haloColor} opacity="0.8" />
      <circle cx="12" cy="6" r="0.8" fill={haloColor} opacity="0.6" />
      
      {/* Angel body (subtle) */}
      <circle cx="12" cy="14" r="3" fill={haloColor} opacity="0.1" />
      <path
        d="M12 17 L10 20 M12 17 L14 20"
        stroke={haloColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.15"
      />
    </svg>
  );
}

// Get icon component for notification type
function getNotificationIcon(type: NotificationType, iconName?: string) {
  if (iconName) {
    const iconMap: Record<string, any> = {
      AlertCircle, AlertTriangle, AlertOctagon,
      Trophy, Award, Star, PartyPopper,
      Shield, Home, Lightbulb, DollarSign,
      Cloud, CheckCircle, Info,
    };
    return iconMap[iconName] || Info;
  }

  // Default icons for each type
  const typeIconMap: Record<NotificationType, any> = {
    deadline: AlertCircle,
    opportunity: DollarSign,
    action: CheckCircle,
    achievement: Trophy,
    risk: AlertTriangle,
    update: Info,
    savings: DollarSign,
    tip: Lightbulb,
  };

  return typeIconMap[type];
}

// Get priority colors
function getPriorityStyles(priority: NotificationPriority) {
  switch (priority) {
    case 'urgent':
      return {
        borderColor: 'rgba(239, 68, 68, 0.3)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        glowColor: 'rgba(239, 68, 68, 0.2)',
      };
    case 'high':
      return {
        borderColor: 'rgba(245, 158, 11, 0.3)',
        backgroundColor: 'rgba(245, 158, 11, 0.05)',
        glowColor: 'rgba(245, 158, 11, 0.2)',
      };
    case 'medium':
      return {
        borderColor: 'rgba(212, 175, 55, 0.3)',
        backgroundColor: 'rgba(212, 175, 55, 0.05)',
        glowColor: 'rgba(212, 175, 55, 0.2)',
      };
    case 'low':
      return {
        borderColor: 'rgba(148, 163, 184, 0.2)',
        backgroundColor: 'rgba(148, 163, 184, 0.02)',
        glowColor: 'rgba(148, 163, 184, 0.1)',
      };
  }
}

export const NotificationCard = React.forwardRef<HTMLDivElement, NotificationCardProps>(({ 
  notification, 
  onRead, 
  onDelete, 
  onAction 
}, ref) => {
  const Icon = getNotificationIcon(notification.type, notification.icon);
  const priorityStyles = getPriorityStyles(notification.priority);
  const [isHovered, setIsHovered] = React.useState(false);

  // Format timestamp
  const timeAgo = React.useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - notification.timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return notification.timestamp.toLocaleDateString();
  }, [notification.timestamp]);

  const handleCardClick = () => {
    if (!notification.read && onRead) {
      onRead(notification.id);
    }
    if (onAction && notification.actionUrl) {
      onAction(notification);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
      style={{
        marginBottom: 'var(--spacing-3)',
      }}
      // RN: Use Animated.View with useAnimatedStyle
    >
      {/* Glow effect for unread notifications */}
      {!notification.read && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at top left, ${priorityStyles.glowColor}, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          // RN: Use Animated.View with opacity animation
        />
      )}

      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${priorityStyles.borderColor}`,
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
            : '0 4px 16px rgba(0, 0, 0, 0.2)',
        }}
        onClick={handleCardClick}
        // RN: Use Pressable with ({ pressed }) state
      >
        {/* Unread indicator */}
        {!notification.read && (
          <div
            className="absolute top-0 left-0 w-1 h-full"
            style={{
              background: `linear-gradient(to bottom, ${priorityStyles.borderColor}, transparent)`,
            }}
            // RN: Use View with absolute positioning
          />
        )}

        <div
          className="flex gap-4 p-4"
          style={{
            paddingLeft: notification.read ? 'var(--spacing-4)' : 'var(--spacing-5)',
          }}
          // RN: Use View with flexDirection: 'row'
        >
          {/* Icon with halo */}
          <div className="flex-shrink-0 relative">
            {/* Angel halo background */}
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 flex items-center justify-center">
              <AngelHaloIcon size={48} priority={notification.priority} />
            </div>
            
            {/* Main icon */}
            <div
              className="relative rounded-full flex items-center justify-center"
              style={{
                width: '40px',
                height: '40px',
                background: priorityStyles.backgroundColor,
                border: `1px solid ${priorityStyles.borderColor}`,
              }}
            >
              <Icon 
                size={20}
                style={{ 
                  color: notification.priority === 'urgent' ? '#EF4444' :
                         notification.priority === 'high' ? '#F59E0B' :
                         notification.priority === 'medium' ? '#D4AF37' :
                         '#94A3B8'
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 
                className="text-white"
                style={{
                  fontSize: '15px',
                  fontWeight: notification.read ? 400 : 600,
                  lineHeight: 1.4,
                }}
              >
                {notification.title}
              </h4>
              <div className="flex-shrink-0 flex items-center gap-2">
                <span
                  className="text-white/40 text-xs whitespace-nowrap"
                >
                  {timeAgo}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(notification.id);
                  }}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  style={{
                    opacity: 0.5,
                  }}
                  // RN: Use Pressable
                >
                  <X size={14} style={{ color: '#fff' }} />
                </button>
              </div>
            </div>

            <p
              className="text-white/70 mb-3"
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
              }}
            >
              {notification.message}
            </p>

            {/* Action button */}
            {notification.actionLabel && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAction) {
                    onAction(notification);
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
                style={{
                  background: `linear-gradient(135deg, ${priorityStyles.borderColor}, rgba(255, 255, 255, 0.05))`,
                  border: `1px solid ${priorityStyles.borderColor}`,
                  color: '#fff',
                  fontWeight: 500,
                }}
                // RN: Use Pressable with animated style
              >
                {notification.actionLabel} →
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

NotificationCard.displayName = 'NotificationCard';

/**
 * ==============================================================================
 * NOTIFICATION BADGE (for header/nav)
 * ==============================================================================
 */

interface NotificationBadgeProps {
  count: number;
  priority?: NotificationPriority;
  onClick?: () => void;
}

export function NotificationBadge({ count, priority = 'medium', onClick }: NotificationBadgeProps) {
  if (count === 0) return null;

  const priorityStyles = getPriorityStyles(priority);

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative"
      style={{
        padding: 0,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
      // RN: Use Pressable
    >
      {/* Halo background (pulsing) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <AngelHaloIcon size={32} priority={priority} />
      </motion.div>

      {/* Count badge */}
      <div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: '24px',
          height: '24px',
          background: `linear-gradient(135deg, ${priorityStyles.borderColor}, rgba(255, 255, 255, 0.1))`,
          border: `1.5px solid ${priorityStyles.borderColor}`,
          fontSize: '11px',
          fontWeight: 700,
          color: '#fff',
          boxShadow: `0 2px 8px ${priorityStyles.glowColor}`,
        }}
      >
        {count > 99 ? '99+' : count}
      </div>
    </motion.button>
  );
}
