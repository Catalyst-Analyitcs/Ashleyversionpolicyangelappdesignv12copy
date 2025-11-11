/**
 * ==============================================================================
 * NOTIFICATIONDEMO.TS - Demo Notification Populator
 * ==============================================================================
 * 
 * PURPOSE: Populate the notification engine with sample notifications for
 * testing and demonstration purposes.
 * 
 * USAGE: Import and call populateDemoNotifications() on app start
 */

import { notificationEngine, smartNotificationScheduler } from './notificationEngine';

/**
 * Populate notification engine with demo notifications
 */
export async function populateDemoNotifications() {
  // Clear existing notifications
  await notificationEngine.clearAll();

  // 1. URGENT DEADLINE - Energy Grant
  await notificationEngine.sendNotification({
    type: 'deadline',
    priority: 'urgent',
    title: '⚠️ FINAL REMINDER: Grant Deadline Tomorrow!',
    message: 'Last chance for $8,500 Energy Efficiency Grant!',
    icon: 'AlertOctagon',
    actionUrl: '/grants/energy-grant-2024',
    actionLabel: 'Apply Now',
    data: { grantId: 'energy-grant-2024' },
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // Expires in 24h
  });

  // 2. HIGH PRIORITY - New Opportunity
  await notificationEngine.sendNotification({
    type: 'opportunity',
    priority: 'high',
    title: '💰 New Grant Available: Seismic Retrofit',
    message: 'You qualify for $12,000 in seismic retrofit funding!',
    icon: 'DollarSign',
    actionUrl: '/grants/seismic-retrofit',
    actionLabel: 'View Details',
  });

  // 3. HIGH PRIORITY - Insurance Action
  await notificationEngine.sendNotification({
    type: 'action',
    priority: 'high',
    title: '🛡️ Insurance Quote Ready',
    message: 'Review and switch to save $672/year with Lemonade',
    icon: 'Shield',
    actionUrl: '/insurance-optimizer',
    actionLabel: 'Review Quote',
  });

  // 4. HIGH PRIORITY - Weather Risk
  await notificationEngine.sendNotification({
    type: 'risk',
    priority: 'high',
    title: '⚠️ Weather Alert: High Winds Tomorrow',
    message: 'Wind speeds up to 45 mph expected. Review your roof insurance coverage.',
    icon: 'AlertTriangle',
    actionUrl: '/weather',
    actionLabel: 'View Forecast',
  });

  // 5. MEDIUM PRIORITY - Mortgage Action
  await notificationEngine.sendNotification({
    type: 'action',
    priority: 'medium',
    title: '🏠 Mortgage Pre-approval Ready',
    message: 'Sign docs to save $4,188/year on your mortgage',
    icon: 'Home',
    actionUrl: '/mortgage-optimizer',
    actionLabel: 'Review & Sign',
  });

  // 6. MEDIUM PRIORITY - Achievement
  await notificationEngine.sendNotification({
    type: 'achievement',
    priority: 'medium',
    title: '🎉 Quarter Way There!',
    message: "You've claimed $8,000 of $23,500. Keep going!",
    icon: 'Trophy',
    actionUrl: '/opportunities/dashboard',
    actionLabel: 'View Progress',
  });

  // 7. MEDIUM PRIORITY - Grant Deadline (7 days)
  await notificationEngine.sendNotification({
    type: 'deadline',
    priority: 'medium',
    title: '⏰ Grant Deadline in 7 Days',
    message: 'Complete your Solar Panel Grant application to get $6,000',
    icon: 'AlertCircle',
    actionUrl: '/grants/solar-panel-grant',
    actionLabel: 'Complete Application',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Expires in 7 days
  });

  // 8. MEDIUM PRIORITY - Savings Milestone
  await notificationEngine.sendNotification({
    type: 'savings',
    priority: 'medium',
    title: '💵 $10,000 Saved This Year!',
    message: "You've saved over $10,000 with PolicyAngel. Congratulations!",
    icon: 'DollarSign',
    actionUrl: '/opportunities/dashboard',
    actionLabel: 'See Breakdown',
  });

  // 9. LOW PRIORITY - Daily Tip
  await notificationEngine.sendNotification({
    type: 'tip',
    priority: 'low',
    title: '💡 Tip: Document Everything',
    message: 'Take photos of home improvements - they help with grant applications and insurance claims.',
    icon: 'Lightbulb',
    actionUrl: '/gallery',
    actionLabel: 'Open Gallery',
  });

  // 10. LOW PRIORITY - Update
  await notificationEngine.sendNotification({
    type: 'update',
    priority: 'low',
    title: '✅ Application Submitted Successfully',
    message: 'Your Energy Efficiency Grant application has been submitted. You will hear back in 2-3 weeks.',
    icon: 'CheckCircle',
    actionUrl: '/grants/energy-grant-2024',
    actionLabel: 'Track Status',
  });

  console.log('✅ Demo notifications populated!');
}

/**
 * Simulate real-time notifications
 * Sends a new notification every X seconds for testing
 */
export function startNotificationSimulation(intervalSeconds: number = 30) {
  const notifications = [
    {
      type: 'opportunity' as const,
      priority: 'high' as const,
      title: '💰 New Grant Match Found!',
      message: 'You qualify for a new $5,000 Home Weatherization Grant',
      icon: 'DollarSign',
      actionUrl: '/grants/weatherization',
      actionLabel: 'Apply Now',
    },
    {
      type: 'action' as const,
      priority: 'medium' as const,
      title: '📸 Upload Required Photos',
      message: 'Upload 2 photos of your solar panels to unlock $2,000 grant',
      icon: 'Camera',
      actionUrl: '/gallery',
      actionLabel: 'Upload Photos',
    },
    {
      type: 'achievement' as const,
      priority: 'medium' as const,
      title: '🏆 Achievement Unlocked: Early Bird',
      message: 'Applied for first grant within 48 hours! +100 PolicyAngel Points',
      icon: 'Trophy',
      actionUrl: '/opportunities/dashboard',
      actionLabel: 'View Achievements',
    },
    {
      type: 'tip' as const,
      priority: 'low' as const,
      title: '💡 Tip: Review Your Policy',
      message: 'Check your insurance policy annually. Coverage needs change as your home value increases.',
      icon: 'Lightbulb',
      actionUrl: '/policy',
      actionLabel: 'View Policy',
    },
  ];

  let currentIndex = 0;

  const intervalId = setInterval(async () => {
    const notification = notifications[currentIndex];
    await notificationEngine.sendNotification(notification);
    console.log('📬 New notification sent:', notification.title);
    
    currentIndex = (currentIndex + 1) % notifications.length;
  }, intervalSeconds * 1000);

  console.log(`🔔 Notification simulation started (every ${intervalSeconds}s)`);
  
  return () => {
    clearInterval(intervalId);
    console.log('⏹️ Notification simulation stopped');
  };
}

/**
 * Test smart notification scheduler
 */
export async function testSmartNotifications() {
  const mockOpportunityData = {
    totalValue: 23500,
    claimed: 8000,
    inProgress: 12340,
    notStarted: 3160,
    grants: [
      {
        id: 'energy-grant-2024',
        amount: 8500,
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
        status: 'in_progress',
      },
      {
        id: 'solar-panel-grant',
        amount: 6000,
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        status: 'not_started',
      },
    ],
    insurance: {
      savings: 672,
      status: 'quote_requested',
    },
    mortgage: {
      savings: 4188,
      status: 'pre_approved',
    },
  };

  // Test deadline notifications
  await smartNotificationScheduler.checkDeadlines(mockOpportunityData);
  
  // Test progress celebration
  await smartNotificationScheduler.celebrateProgress(mockOpportunityData);
  
  // Test action reminders
  await smartNotificationScheduler.sendActionReminders(mockOpportunityData);
  
  // Test daily tip
  await smartNotificationScheduler.sendDailyTip();

  console.log('✅ Smart notifications tested!');
}

/**
 * Subscribe to all notifications and log them
 */
export function subscribeToNotifications() {
  return notificationEngine.subscribe((notification) => {
    console.log('🔔 New notification:', {
      type: notification.type,
      priority: notification.priority,
      title: notification.title,
      timestamp: notification.timestamp,
    });
    
    // In a real app, you might:
    // - Show a toast notification
    // - Update badge count
    // - Play a sound
    // - Send push notification
  });
}

/**
 * Get notification statistics
 */
export function getNotificationStats() {
  const all = notificationEngine.getNotifications();
  const unread = notificationEngine.getNotifications({ unreadOnly: true });
  
  const stats = {
    total: all.length,
    unread: unread.length,
    read: all.length - unread.length,
    byType: {
      deadline: all.filter(n => n.type === 'deadline').length,
      opportunity: all.filter(n => n.type === 'opportunity').length,
      action: all.filter(n => n.type === 'action').length,
      achievement: all.filter(n => n.type === 'achievement').length,
      risk: all.filter(n => n.type === 'risk').length,
      update: all.filter(n => n.type === 'update').length,
      savings: all.filter(n => n.type === 'savings').length,
      tip: all.filter(n => n.type === 'tip').length,
    },
    byPriority: {
      urgent: all.filter(n => n.priority === 'urgent').length,
      high: all.filter(n => n.priority === 'high').length,
      medium: all.filter(n => n.priority === 'medium').length,
      low: all.filter(n => n.priority === 'low').length,
    },
  };

  console.table(stats.byType);
  console.table(stats.byPriority);
  
  return stats;
}
