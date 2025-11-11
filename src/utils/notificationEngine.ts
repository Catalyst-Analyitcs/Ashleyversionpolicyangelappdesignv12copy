/**
 * ==============================================================================
 * NOTIFICATIONENGINE.TS - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Smart notification engine for PolicyAngel that sends timely,
 * personalized notifications to drive user engagement and opportunity completion.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. PUSH NOTIFICATIONS:
 *    - Web: Use Web Push API (service workers)
 *    - React Native: expo-notifications or @react-native-firebase/messaging
 *    
 *    EXPO SETUP:
 *    ```bash
 *    npx expo install expo-notifications expo-device expo-constants
 *    ```
 *    
 *    ```typescript
 *    import * as Notifications from 'expo-notifications';
 *    
 *    // Configure notification handler
 *    Notifications.setNotificationHandler({
 *      handleNotification: async () => ({
 *        shouldShowAlert: true,
 *        shouldPlaySound: true,
 *        shouldSetBadge: true,
 *      }),
 *    });
 *    
 *    // Request permissions
 *    const { status } = await Notifications.requestPermissionsAsync();
 *    
 *    // Schedule local notification
 *    await Notifications.scheduleNotificationAsync({
 *      content: {
 *        title: "Grant Deadline in 7 Days!",
 *        body: "Complete your application to get $8,500",
 *        data: { type: 'deadline', grantId: 'grant-123' },
 *      },
 *      trigger: { seconds: 60 },
 *    });
 *    ```
 * 
 * 2. LOCAL STORAGE:
 *    - Web: localStorage
 *    - React Native: AsyncStorage
 *    
 *    ```typescript
 *    import AsyncStorage from '@react-native-async-storage/async-storage';
 *    
 *    // Save notification preferences
 *    await AsyncStorage.setItem('notificationPrefs', JSON.stringify(prefs));
 *    
 *    // Get notification history
 *    const history = await AsyncStorage.getItem('notificationHistory');
 *    ```
 * 
 * 3. BACKGROUND TASKS:
 *    - Web: Service Workers
 *    - React Native: expo-task-manager + expo-background-fetch
 *    
 *    ```typescript
 *    import * as TaskManager from 'expo-task-manager';
 *    import * as BackgroundFetch from 'expo-background-fetch';
 *    
 *    const BACKGROUND_NOTIFICATION_TASK = 'background-notification-task';
 *    
 *    TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async () => {
 *      // Check for new opportunities, deadlines, etc.
 *      await checkAndSendNotifications();
 *      return BackgroundFetch.BackgroundFetchResult.NewData;
 *    });
 *    ```
 * 
 * ==============================================================================
 * NOTIFICATION TYPES
 * ==============================================================================
 */

export type NotificationType = 
  | 'deadline'        // Grant/opportunity deadlines
  | 'opportunity'     // New opportunities discovered
  | 'action'          // Action reminders (upload docs, sign forms)
  | 'achievement'     // Milestones and celebrations
  | 'risk'            // Weather/property risk alerts
  | 'update'          // Status updates (application approved, etc.)
  | 'savings'         // Savings milestones
  | 'tip';            // Helpful tips and best practices

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  icon: string; // Icon name from lucide-react
  timestamp: Date;
  read: boolean;
  actionUrl?: string; // Deep link to relevant screen
  actionLabel?: string; // CTA button text
  data?: Record<string, any>; // Additional metadata
  expiresAt?: Date; // When notification becomes irrelevant
}

export interface NotificationPreferences {
  enabled: boolean;
  types: {
    deadline: boolean;
    opportunity: boolean;
    action: boolean;
    achievement: boolean;
    risk: boolean;
    update: boolean;
    savings: boolean;
    tip: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string; // "22:00"
    end: string;   // "08:00"
  };
  frequency: 'realtime' | 'daily_digest' | 'weekly_digest';
  channels: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

// Default notification preferences
export const defaultNotificationPreferences: NotificationPreferences = {
  enabled: true,
  types: {
    deadline: true,
    opportunity: true,
    action: true,
    achievement: true,
    risk: true,
    update: true,
    savings: true,
    tip: true,
  },
  quietHours: {
    enabled: true,
    start: '22:00',
    end: '08:00',
  },
  frequency: 'realtime',
  channels: {
    push: true,
    email: false,
    sms: false,
  },
};

/**
 * ==============================================================================
 * NOTIFICATION ENGINE CLASS
 * ==============================================================================
 */

export class NotificationEngine {
  private notifications: Notification[] = [];
  private preferences: NotificationPreferences = defaultNotificationPreferences;
  private listeners: ((notification: Notification) => void)[] = [];

  constructor() {
    this.loadNotifications();
    this.loadPreferences();
  }

  // RN: Use AsyncStorage
  private async loadNotifications() {
    try {
      const stored = localStorage.getItem('policyangel_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.notifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
          expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined,
        }));
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }

  // RN: Use AsyncStorage
  private async loadPreferences() {
    try {
      const stored = localStorage.getItem('policyangel_notification_prefs');
      if (stored) {
        this.preferences = { ...defaultNotificationPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load notification preferences:', error);
    }
  }

  // RN: Use AsyncStorage
  private async saveNotifications() {
    try {
      localStorage.setItem('policyangel_notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }

  // RN: Use AsyncStorage
  private async savePreferences() {
    try {
      localStorage.setItem('policyangel_notification_prefs', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save notification preferences:', error);
    }
  }

  /**
   * Send a notification
   * RN: Use Notifications.scheduleNotificationAsync for push notifications
   */
  async sendNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Promise<void> {
    // Check if notifications are enabled for this type
    if (!this.preferences.enabled || !this.preferences.types[notification.type]) {
      return;
    }

    // Check quiet hours
    if (this.isQuietHours()) {
      // Queue for later or skip based on priority
      if (notification.priority !== 'urgent') {
        return;
      }
    }

    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    };

    this.notifications.unshift(newNotification);
    await this.saveNotifications();

    // Notify listeners
    this.listeners.forEach(listener => listener(newNotification));

    // RN: Send push notification
    // if (this.preferences.channels.push) {
    //   await Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: newNotification.title,
    //       body: newNotification.message,
    //       data: newNotification.data,
    //     },
    //     trigger: null, // Immediate
    //   });
    // }
  }

  /**
   * Check if current time is in quiet hours
   */
  private isQuietHours(): boolean {
    if (!this.preferences.quietHours.enabled) {
      return false;
    }

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const { start, end } = this.preferences.quietHours;

    if (start < end) {
      return currentTime >= start && currentTime <= end;
    } else {
      // Quiet hours span midnight
      return currentTime >= start || currentTime <= end;
    }
  }

  /**
   * Get all notifications
   */
  getNotifications(filter?: { type?: NotificationType; unreadOnly?: boolean }): Notification[] {
    let filtered = [...this.notifications];

    // Remove expired notifications
    const now = new Date();
    filtered = filtered.filter(n => !n.expiresAt || n.expiresAt > now);

    if (filter?.type) {
      filtered = filtered.filter(n => n.type === filter.type);
    }

    if (filter?.unreadOnly) {
      filtered = filtered.filter(n => !n.read);
    }

    return filtered;
  }

  /**
   * Get unread count
   */
  getUnreadCount(type?: NotificationType): number {
    const notifications = this.getNotifications({ type, unreadOnly: true });
    return notifications.length;
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      await this.saveNotifications();
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(type?: NotificationType): Promise<void> {
    this.notifications.forEach(n => {
      if (!type || n.type === type) {
        n.read = true;
      }
    });
    await this.saveNotifications();
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    await this.saveNotifications();
  }

  /**
   * Clear all notifications
   */
  async clearAll(type?: NotificationType): Promise<void> {
    if (type) {
      this.notifications = this.notifications.filter(n => n.type !== type);
    } else {
      this.notifications = [];
    }
    await this.saveNotifications();
  }

  /**
   * Subscribe to notifications
   */
  subscribe(listener: (notification: Notification) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Update notification preferences
   */
  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<void> {
    this.preferences = { ...this.preferences, ...preferences };
    await this.savePreferences();
  }

  /**
   * Get notification preferences
   */
  getPreferences(): NotificationPreferences {
    return { ...this.preferences };
  }
}

/**
 * ==============================================================================
 * SMART NOTIFICATION RULES
 * ==============================================================================
 */

export interface OpportunityData {
  totalValue: number;
  claimed: number;
  inProgress: number;
  notStarted: number;
  grants: Array<{ id: string; amount: number; deadline: Date; status: string }>;
  insurance: { savings: number; status: string };
  mortgage: { savings: number; status: string };
}

/**
 * Smart notification scheduler that analyzes user data and sends timely notifications
 */
export class SmartNotificationScheduler {
  constructor(private engine: NotificationEngine) {}

  /**
   * Check for deadline notifications
   */
  async checkDeadlines(opportunities: OpportunityData): Promise<void> {
    const now = new Date();

    opportunities.grants.forEach(grant => {
      if (grant.status === 'not_started' || grant.status === 'in_progress') {
        const daysUntilDeadline = Math.ceil((grant.deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        // 7 days before deadline
        if (daysUntilDeadline === 7) {
          this.engine.sendNotification({
            type: 'deadline',
            priority: 'high',
            title: '⏰ Grant Deadline in 7 Days!',
            message: `Complete your application to get $${grant.amount.toLocaleString()}`,
            icon: 'AlertCircle',
            actionUrl: `/grants/${grant.id}`,
            actionLabel: 'Complete Application',
            data: { grantId: grant.id },
            expiresAt: grant.deadline,
          });
        }

        // 3 days before deadline
        if (daysUntilDeadline === 3) {
          this.engine.sendNotification({
            type: 'deadline',
            priority: 'urgent',
            title: '🚨 Grant Deadline in 3 Days!',
            message: `Don't miss out on $${grant.amount.toLocaleString()}! Complete now.`,
            icon: 'AlertTriangle',
            actionUrl: `/grants/${grant.id}`,
            actionLabel: 'Apply Now',
            data: { grantId: grant.id },
            expiresAt: grant.deadline,
          });
        }

        // 1 day before deadline
        if (daysUntilDeadline === 1) {
          this.engine.sendNotification({
            type: 'deadline',
            priority: 'urgent',
            title: '⚠️ FINAL REMINDER: Grant Deadline Tomorrow!',
            message: `Last chance for $${grant.amount.toLocaleString()}!`,
            icon: 'AlertOctagon',
            actionUrl: `/grants/${grant.id}`,
            actionLabel: 'Apply Now',
            data: { grantId: grant.id },
            expiresAt: grant.deadline,
          });
        }
      }
    });
  }

  /**
   * Send progress celebration
   */
  async celebrateProgress(opportunities: OpportunityData): Promise<void> {
    const claimedPercentage = (opportunities.claimed / opportunities.totalValue) * 100;

    // 25% milestone
    if (claimedPercentage >= 25 && claimedPercentage < 30) {
      this.engine.sendNotification({
        type: 'achievement',
        priority: 'medium',
        title: '🎉 Quarter Way There!',
        message: `You've claimed $${opportunities.claimed.toLocaleString()} of $${opportunities.totalValue.toLocaleString()}. Keep going!`,
        icon: 'Trophy',
        actionUrl: '/opportunities/dashboard',
        actionLabel: 'View Progress',
      });
    }

    // 50% milestone
    if (claimedPercentage >= 50 && claimedPercentage < 55) {
      this.engine.sendNotification({
        type: 'achievement',
        priority: 'medium',
        title: '🏆 Halfway to Your Goal!',
        message: `Amazing! You've saved $${opportunities.claimed.toLocaleString()} so far!`,
        icon: 'Award',
        actionUrl: '/opportunities/dashboard',
        actionLabel: 'See Achievements',
      });
    }

    // 75% milestone
    if (claimedPercentage >= 75 && claimedPercentage < 80) {
      this.engine.sendNotification({
        type: 'achievement',
        priority: 'high',
        title: '⭐ Almost There!',
        message: `You're only $${opportunities.notStarted.toLocaleString()} away from $${opportunities.totalValue.toLocaleString()}!`,
        icon: 'Star',
        actionUrl: '/opportunities/dashboard',
        actionLabel: 'Finish Strong',
      });
    }

    // 100% completion
    if (claimedPercentage >= 100) {
      this.engine.sendNotification({
        type: 'achievement',
        priority: 'high',
        title: '🎊 Congratulations! Goal Achieved!',
        message: `You've saved $${opportunities.claimed.toLocaleString()} with PolicyAngel this year!`,
        icon: 'PartyPopper',
        actionUrl: '/opportunities/dashboard',
        actionLabel: 'Share Success',
      });
    }
  }

  /**
   * Send action reminders
   */
  async sendActionReminders(opportunities: OpportunityData): Promise<void> {
    // Insurance quote follow-up
    if (opportunities.insurance.status === 'quote_requested') {
      this.engine.sendNotification({
        type: 'action',
        priority: 'medium',
        title: '🛡️ Insurance Quote Ready',
        message: `Review and switch to save $${opportunities.insurance.savings.toLocaleString()}/year`,
        icon: 'Shield',
        actionUrl: '/insurance-optimizer',
        actionLabel: 'Review Quote',
      });
    }

    // Mortgage refinance reminder
    if (opportunities.mortgage.status === 'pre_approved') {
      this.engine.sendNotification({
        type: 'action',
        priority: 'high',
        title: '🏠 Mortgage Pre-approval Ready',
        message: `Sign docs to save $${opportunities.mortgage.savings.toLocaleString()}/year`,
        icon: 'Home',
        actionUrl: '/mortgage-optimizer',
        actionLabel: 'Review & Sign',
      });
    }
  }

  /**
   * Send daily tip
   */
  async sendDailyTip(): Promise<void> {
    const tips = [
      {
        title: '💡 Tip: Document Everything',
        message: 'Take photos of home improvements - they help with grant applications and insurance claims.',
        actionUrl: '/gallery',
        actionLabel: 'Open Gallery',
      },
      {
        title: '💡 Tip: Review Your Policy',
        message: 'Check your insurance policy annually. Coverage needs change as your home value increases.',
        actionUrl: '/policy',
        actionLabel: 'View Policy',
      },
      {
        title: '💡 Tip: Maintenance Pays Off',
        message: 'Regular maintenance prevents costly repairs and can lower your insurance premiums.',
        actionUrl: '/maintenance',
        actionLabel: 'Schedule Check',
      },
      {
        title: '💡 Tip: Energy Efficiency',
        message: 'Energy upgrades often qualify for grants and reduce utility costs.',
        actionUrl: '/grants',
        actionLabel: 'Find Grants',
      },
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    await this.engine.sendNotification({
      type: 'tip',
      priority: 'low',
      title: randomTip.title,
      message: randomTip.message,
      icon: 'Lightbulb',
      actionUrl: randomTip.actionUrl,
      actionLabel: randomTip.actionLabel,
    });
  }
}

/**
 * ==============================================================================
 * SINGLETON INSTANCE
 * ==============================================================================
 */

export const notificationEngine = new NotificationEngine();
export const smartNotificationScheduler = new SmartNotificationScheduler(notificationEngine);

// RN: Initialize push notifications on app start
// export async function initializeNotifications() {
//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;
//   
//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }
//   
//   if (finalStatus !== 'granted') {
//     console.log('Notification permissions not granted');
//     return;
//   }
//   
//   // Get push token
//   const token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log('Push token:', token);
//   
//   // Send token to backend
//   // await sendTokenToBackend(token);
// }
