/**
 * ==============================================================================
 * MAINTENANCESCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Property maintenance tracking system with task scheduling,
 * service history, recurring maintenance reminders, vendor management,
 * and cost tracking for property upkeep.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. MAINTENANCE TASK LIST:
 *    - FlatList with task cards
 *    - Pull-to-refresh
 *    - Status indicators (completed, pending, scheduled, overdue)
 *    - Swipe actions (edit, delete, mark complete)
 *    - Filter by status
 *    - Sort options (date, priority, cost)
 * 
 * 2. ADD/EDIT TASK:
 *    - Modal form for task creation
 *    - Date/time picker for scheduling
 *    - Recurring task options (weekly, monthly, annually)
 *    - Priority levels (low, medium, high, urgent)
 *    - Cost estimation
 *    - Photo attachments
 *    - Notes field
 * 
 * 3. TASK DETAILS:
 *    - Full task information
 *    - Service history
 *    - Photo gallery
 *    - Vendor details
 *    - Cost breakdown
 *    - Mark as complete
 *    - Reschedule
 * 
 * 4. NOTIFICATIONS:
 *    - Push notifications for upcoming tasks
 *    - Overdue task alerts
 *    - Recurring task reminders
 * 
 * 5. CALENDAR INTEGRATION:
 *    - Add tasks to device calendar
 *    - Sync with calendar app
 * 
 * 6. VENDOR MANAGEMENT:
 *    - Vendor contact info
 *    - Service ratings
 *    - Quick call/email
 * 
 * ==============================================================================
 * REQUIRED API ENDPOINTS
 * ==============================================================================
 * 
 * 1. GET /api/maintenance?propertyId={id}&status={status}
 *    Returns: List of maintenance tasks
 * 
 * 2. GET /api/maintenance/:taskId
 *    Returns: Full task details
 * 
 * 3. POST /api/maintenance
 *    Body: Task data
 *    Returns: Created task
 * 
 * 4. PUT /api/maintenance/:taskId
 *    Body: Updated task data
 *    Returns: Updated task
 * 
 * 5. DELETE /api/maintenance/:taskId
 *    Deletes task
 * 
 * 6. POST /api/maintenance/:taskId/complete
 *    Marks task as complete
 * 
 * 7. GET /api/maintenance/history?propertyId={id}
 *    Returns: Completed task history
 * 
 * 8. GET /api/maintenance/upcoming?propertyId={id}
 *    Returns: Upcoming scheduled tasks
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Maintenance tasks load from API
 * - [ ] FlatList renders correctly
 * - [ ] Status badges display properly
 * - [ ] Add new task works
 * - [ ] Edit task works
 * - [ ] Delete task works
 * - [ ] Mark task complete works
 * - [ ] Swipe actions functional
 * - [ ] Filter by status works
 * - [ ] Date picker works
 * - [ ] Recurring tasks created
 * - [ ] Push notifications sent
 * - [ ] Calendar integration works
 * - [ ] Photo upload works
 * - [ ] Vendor contact works
 * - [ ] Pull-to-refresh functional
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, TouchableOpacity, FlatList, Modal, Alert, Linking } from 'react-native';
// RN: import { SwipeListView } from 'react-native-swipe-list-view';
// RN: import DateTimePicker from '@react-native-community/datetimepicker';
// RN: import * as Calendar from 'expo-calendar';
// RN: import * as Notifications from 'expo-notifications';

import React from 'react';
// RN: import { useState, useCallback, useEffect } from 'react';

// RN: Motion → react-native-reanimated
// RN: import Animated, { FadeInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { motion } from 'motion/react';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { Wrench, CheckCircle, Clock, AlertCircle, Plus, ChevronRight } from "lucide-react";

// RN: Toast → react-native-toast-message
// RN: import Toast from 'react-native-toast-message';
import { toast } from 'sonner@2.0.3';

// RN: ==============================================================================
// RN: INTERFACES
// RN: ==============================================================================
// RN: interface MaintenanceTask {
// RN:   id: string;
// RN:   propertyId: string;
// RN:   title: string;
// RN:   description: string;
// RN:   status: 'completed' | 'pending' | 'scheduled' | 'overdue';
// RN:   priority: 'low' | 'medium' | 'high' | 'urgent';
// RN:   scheduledDate: Date;
// RN:   completedDate?: Date;
// RN:   recurring?: {
// RN:     frequency: 'weekly' | 'monthly' | 'quarterly' | 'annually';
// RN:     endDate?: Date;
// RN:   };
// RN:   vendor?: {
// RN:     name: string;
// RN:     phone: string;
// RN:     email: string;
// RN:     rating?: number;
// RN:   };
// RN:   estimatedCost?: number;
// RN:   actualCost?: number;
// RN:   photos?: string[];
// RN:   notes?: string;
// RN: }

// RN: Animations defined with react-native-reanimated instead
// RN: const fadeInConfig = {
// RN:   duration: 300,
// RN:   easing: Easing.out(Easing.ease),
// RN: };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

// RN: ==============================================================================
// RN: COMPONENT DEFINITION
// RN: ==============================================================================
export function MaintenanceScreen() {
  // RN: const navigation = useNavigation();
  // RN: const [showAddModal, setShowAddModal] = useState(false);
  // RN: const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  // RN: const [filterStatus, setFilterStatus] = useState<string>('all');
  // RN: const [refreshing, setRefreshing] = useState(false);
  // RN: const [showDatePicker, setShowDatePicker] = useState(false);
  
  const tasks = [
    { id: 1, title: 'Roof Inspection', status: 'completed', date: '2 days ago' },
    { id: 2, title: 'HVAC Service', status: 'pending', date: 'Today' },
    { id: 3, title: 'Foundation Check', status: 'scheduled', date: 'Tomorrow' },
    { id: 4, title: 'Plumbing Review', status: 'overdue', date: '3 days ago' },
  ];

  const statusConfig = {
    completed: { color: 'rgb(var(--color-success))', icon: <CheckCircle className="w-4 h-4" /> },
    pending: { color: 'rgb(var(--color-warning))', icon: <Clock className="w-4 h-4" /> },
    scheduled: { color: 'rgb(var(--color-info))', icon: <Clock className="w-4 h-4" /> },
    overdue: { color: 'rgb(var(--color-error))', icon: <AlertCircle className="w-4 h-4" /> },
  };
  
  // RN: // TanStack Query for tasks
  // RN: const { data: tasks, isLoading, refetch } = useQuery({
  // RN:   queryKey: ['maintenance', filterStatus],
  // RN:   queryFn: () => maintenanceApi.getTasks({ 
  // RN:     propertyId: currentPropertyId,
  // RN:     status: filterStatus === 'all' ? undefined : filterStatus
  // RN:   })
  // RN: });
  // RN:
  // RN: const createTaskMutation = useMutation({
  // RN:   mutationFn: maintenanceApi.createTask,
  // RN:   onSuccess: () => {
  // RN:     refetch();
  // RN:     setShowAddModal(false);
  // RN:     Toast.show({
  // RN:       type: 'success',
  // RN:       text1: 'Task created',
  // RN:       text2: 'Maintenance task added successfully'
  // RN:     });
  // RN:   }
  // RN: });
  // RN:
  // RN: const updateTaskMutation = useMutation({
  // RN:   mutationFn: ({ id, data }) => maintenanceApi.updateTask(id, data),
  // RN:   onSuccess: () => {
  // RN:     refetch();
  // RN:   }
  // RN: });
  // RN:
  // RN: const deleteTaskMutation = useMutation({
  // RN:   mutationFn: maintenanceApi.deleteTask,
  // RN:   onSuccess: () => {
  // RN:     refetch();
  // RN:     Toast.show({
  // RN:       type: 'success',
  // RN:       text1: 'Task deleted'
  // RN:     });
  // RN:   }
  // RN: });
  // RN:
  // RN: // Handle mark task as complete
  // RN: const handleCompleteTask = (task: MaintenanceTask) => {
  // RN:   updateTaskMutation.mutate({
  // RN:     id: task.id,
  // RN:     data: { 
  // RN:       status: 'completed',
  // RN:       completedDate: new Date()
  // RN:     }
  // RN:   });
  // RN: };
  // RN:
  // RN: // Handle delete task
  // RN: const handleDeleteTask = (task: MaintenanceTask) => {
  // RN:   Alert.alert(
  // RN:     'Delete Task',
  // RN:     `Are you sure you want to delete "${task.title}"?`,
  // RN:     [
  // RN:       { text: 'Cancel', style: 'cancel' },
  // RN:       {
  // RN:         text: 'Delete',
  // RN:         style: 'destructive',
  // RN:         onPress: () => deleteTaskMutation.mutate(task.id)
  // RN:       }
  // RN:     ]
  // RN:   );
  // RN: };
  // RN:
  // RN: // Handle vendor contact
  // RN: const handleCallVendor = (phone: string) => {
  // RN:   Linking.openURL(`tel:${phone}`);
  // RN: };
  // RN:
  // RN: const handleEmailVendor = (email: string) => {
  // RN:   Linking.openURL(`mailto:${email}`);
  // RN: };
  // RN:
  // RN: // Schedule push notification for task
  // RN: const scheduleTaskNotification = async (task: MaintenanceTask) => {
  // RN:   await Notifications.scheduleNotificationAsync({
  // RN:     content: {
  // RN:       title: 'Maintenance Reminder',
  // RN:       body: `${task.title} is scheduled for today`,
  // RN:       data: { taskId: task.id }
  // RN:     },
  // RN:     trigger: {
  // RN:       date: task.scheduledDate,
  // RN:     }
  // RN:   });
  // RN: };
  // RN:
  // RN: // Add to device calendar
  // RN: const addToCalendar = async (task: MaintenanceTask) => {
  // RN:   const { status } = await Calendar.requestCalendarPermissionsAsync();
  // RN:   if (status === 'granted') {
  // RN:     const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  // RN:     const defaultCalendar = calendars.find(cal => cal.isPrimary);
  // RN:     
  // RN:     if (defaultCalendar) {
  // RN:       await Calendar.createEventAsync(defaultCalendar.id, {
  // RN:         title: task.title,
  // RN:         notes: task.description,
  // RN:         startDate: task.scheduledDate,
  // RN:         endDate: new Date(task.scheduledDate.getTime() + 60 * 60 * 1000), // +1 hour
  // RN:       });
  // RN:       Toast.show({
  // RN:         type: 'success',
  // RN:         text1: 'Added to calendar'
  // RN:       });
  // RN:     }
  // RN:   }
  // RN: };

  return (
    <div 
      className="w-full h-full flex flex-col"
      style={{ 
        padding: 'var(--spacing-6)',
        gap: 'var(--spacing-4)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))'
      }}
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ paddingTop: 'var(--spacing-2)' }}
      >
        <h1 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
          Maintenance
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Property upkeep and service tasks
        </p>
      </motion.div>

      {/* Tasks List */}
      <motion.div 
        className="flex flex-col" 
        style={{ gap: 'var(--spacing-3)' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tasks.map((task, index) => {
          const config = statusConfig[task.status as keyof typeof statusConfig];
          return (
            <motion.div
              key={task.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toast.info(`Opening ${task.title}...`)}
              className="backdrop-blur-md"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--glass-border)',
                padding: 'var(--spacing-4)',
                boxShadow: 'var(--shadow-depth-sm)',
                cursor: 'pointer',
                transition: 'var(--transition-card)'
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-2)' }}>
                <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  >
                    <Wrench className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  </motion.div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center" style={{ gap: 'var(--spacing-3)' }}>
                  <div 
                    className="flex items-center"
                    style={{ 
                      gap: 'var(--spacing-1)',
                      color: config.color,
                    }}
                  >
                    {config.icon}
                    <span className="text-xs capitalize">{task.status}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                </div>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {task.date}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add Task Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => toast.info('Add task feature coming soon')}
        className="backdrop-blur-md"
        style={{
          width: '100%',
          padding: 'var(--spacing-4)',
          backgroundColor: 'rgba(var(--color-copa-blue), 0.1)',
          border: '1px dashed rgba(var(--color-copa-blue), 0.3)',
          borderRadius: 'var(--radius-lg)',
          color: 'rgb(var(--color-copa-blue))',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          cursor: 'pointer',
          transition: 'var(--transition-button)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-2)',
          boxShadow: 'var(--shadow-depth-sm)'
        }}
      >
        <Plus size={16} />
        Schedule New Task
      </motion.button>
    </div>
  );
}
