/**
 * ==============================================================================
 * CALENDARSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Full-featured calendar for property maintenance, inspections,
 * insurance renewals, and personal appointments with day/week/month/year views.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CALENDAR LIBRARY:
 *    - Use react-native-calendars (most popular)
 *    - Or react-native-calendar-picker
 *    - Supports month/week/day views
 *    - Custom day rendering
 *    - Event markers and dots
 * 
 * 2. DATE/TIME HANDLING:
 *    - Use date-fns or dayjs for date operations
 *    - react-native-date-picker for date/time selection
 *    - Handle timezone properly
 * 
 * 3. EVENT FORMS:
 *    - Modal or bottom sheet for add/edit
 *    - TextInput for title/description
 *    - DateTimePicker for dates
 *    - Dropdown for event type
 *    - Switch for all-day events
 * 
 * 4. VIEWS:
 *    - Day view → FlatList of events
 *    - Week view → Horizontal scroll
 *    - Month view → Calendar grid
 *    - Year view → Scroll of months
 * 
 * ==============================================================================
 * MOCK DATA - REPLACE WITH REAL API
 * ==============================================================================
 * 
 * REQUIRED API ENDPOINTS:
 * 
 * 1. GET /api/calendar/events
 *    Query: startDate, endDate, propertyId, userId, eventType
 *    Returns: List of events
 * 
 * 2. POST /api/calendar/events
 *    Body: Event data
 *    Returns: Created event
 * 
 * 3. PUT /api/calendar/events/:eventId
 *    Body: Updated event data
 * 
 * 4. DELETE /api/calendar/events/:eventId
 * 
 * 5. GET /api/calendar/upcoming
 *    Returns: Next 5 upcoming events
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT MAPPING
 * ==============================================================================
 * 
 * - div → View
 * - button → TouchableOpacity
 * - input → TextInput
 * - textarea → TextInput (multiline)
 * - Dialog → Modal or BottomSheet
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Calendar renders correctly
 * - [ ] Events display on dates
 * - [ ] Add event works
 * - [ ] Edit event works
 * - [ ] Delete event works
 * - [ ] View switching works
 * - [ ] Date navigation works
 * - [ ] Event type filtering
 * - [ ] Works on iOS and Android
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Alert, Platform } from 'react-native';
// RN: import { Calendar, CalendarUtils } from 'react-native-calendars';
// RN: import DateTimePicker from '@react-native-community/datetimepicker';
// RN: import { BottomSheet } from '@gorhom/bottom-sheet';
// RN: import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

import React, { useState } from 'react';
// RN: import { useRef, useMemo, useCallback } from 'react';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MoreHorizontal,
  ChevronDown,
  X,
  Clock,
  MapPin,
  User,
  Wrench,
  Search,
  Shield,
  Bell,
  Calendar as CalendarIcon
} from 'lucide-react';

// RN: Dialog → BottomSheet for better mobile UX
// RN: import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

// RN: Button → TouchableOpacity with custom styling
import { Button } from '../components/ui/button';

// RN: Input → TextInput
import { Input } from '../components/ui/input';

// RN: Textarea → TextInput with multiline
import { Textarea } from '../components/ui/textarea';

// RN: ==============================================================================
// RN: CALENDAR IMPLEMENTATION NOTES
// RN: ==============================================================================
// RN:
// RN: RECOMMENDED LIBRARY: react-native-calendars
// RN: 
// RN: Installation:
// RN: npm install react-native-calendars
// RN:
// RN: Features:
// RN: - Month/week/day views
// RN: - Custom day rendering
// RN: - Event markers (dots)
// RN: - Swipe navigation
// RN: - Agenda view
// RN: - Period selection
// RN:
// RN: Example Calendar Usage:
// RN: <Calendar
// RN:   current={selectedDate.toISOString()}
// RN:   onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
// RN:   markedDates={markedDates}
// RN:   theme={{
// RN:     calendarBackground: 'transparent',
// RN:     textSectionTitleColor: '#9ca3af',
// RN:     selectedDayBackgroundColor: '#3b82f6',
// RN:     selectedDayTextColor: '#ffffff',
// RN:     todayTextColor: '#3b82f6',
// RN:     dayTextColor: '#ffffff',
// RN:     textDisabledColor: '#6b7280',
// RN:     dotColor: '#3b82f6',
// RN:     selectedDotColor: '#ffffff',
// RN:     monthTextColor: '#ffffff',
// RN:     textMonthFontWeight: '600',
// RN:   }}
// RN: />
// RN:
// RN: Agenda View Example:
// RN: <Agenda
// RN:   items={agendaItems}
// RN:   selected={selectedDate.toISOString()}
// RN:   renderItem={(item) => <EventCard event={item} />}
// RN:   renderEmptyDate={() => <EmptyDayView />}
// RN:   rowHasChanged={(r1, r2) => r1.id !== r2.id}
// RN:   theme={{
// RN:     agendaDayTextColor: '#3b82f6',
// RN:     agendaDayNumColor: '#3b82f6',
// RN:     agendaTodayColor: '#ef4444',
// RN:   }}
// RN: />
// RN:
// RN: DateTimePicker for Event Times:
// RN: {showDatePicker && (
// RN:   <DateTimePicker
// RN:     value={selectedDate}
// RN:     mode="datetime"
// RN:     is24Hour={false}
// RN:     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// RN:     onChange={(event, date) => {
// RN:       setShowDatePicker(false);
// RN:       if (date) setSelectedDate(date);
// RN:     }}
// RN:   />
// RN: )}
// RN:
// RN: BottomSheet for Add/Edit Event:
// RN: <BottomSheetModal
// RN:   ref={bottomSheetRef}
// RN:   index={0}
// RN:   snapPoints={['60%', '90%']}
// RN:   backgroundStyle={styles.bottomSheetBackground}
// RN:   handleIndicatorStyle={styles.bottomSheetHandle}
// RN: >
// RN:   <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
// RN:     [Event form fields]
// RN:   </BottomSheetScrollView>
// RN: </BottomSheetModal>

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  event_type: 'personal' | 'maintenance' | 'inspection' | 'appointment' | 'insurance' | 'reminder';
  location?: string;
  date: string;
  all_day: boolean;
  start_time?: string;
  end_time?: string;
  priority?: 'low' | 'normal' | 'high';
  gridRow?: string;
}

type ViewMode = 'day' | 'week' | 'month' | 'year';

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showViewMenu, setShowViewMenu] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState<CalendarEvent['event_type']>('personal');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  // Mock events data
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Annual Property Inspection',
      description: 'Complete yearly inspection of property systems',
      event_type: 'inspection',
      location: '123 Main Street',
      date: new Date().toISOString().split('T')[0],
      all_day: false,
      start_time: '06:00',
      end_time: '07:30',
      gridRow: '74 / span 12',
    },
    {
      id: '2',
      title: 'Insurance Policy Review',
      description: 'Review annual insurance policy coverage',
      event_type: 'insurance',
      location: 'Insurance Office',
      date: new Date().toISOString().split('T')[0],
      all_day: false,
      start_time: '07:30',
      end_time: '10:00',
      gridRow: '92 / span 30',
    },
    {
      id: '3',
      title: 'HVAC Maintenance',
      description: 'Quarterly HVAC system check and filter replacement',
      event_type: 'maintenance',
      date: new Date().toISOString().split('T')[0],
      all_day: false,
      start_time: '11:00',
      end_time: '12:30',
      gridRow: '134 / span 18',
    },
  ]);

  const eventTypes = [
    { value: 'personal', label: 'Personal', icon: User, color: '#8b5cf6' },
    { value: 'maintenance', label: 'Maintenance', icon: Wrench, color: '#f59e0b' },
    { value: 'inspection', label: 'Inspection', icon: Search, color: '#10b981' },
    { value: 'appointment', label: 'Appointment', icon: CalendarIcon, color: '#3b82f6' },
    { value: 'insurance', label: 'Insurance', icon: Shield, color: '#ef4444' },
    { value: 'reminder', label: 'Reminder', icon: Bell, color: '#06b6d4' },
  ];

  const timeSlots = [
    '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM',
    '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'
  ];

  const getEventTypeConfig = (type: string) => {
    return eventTypes.find(t => t.value === type) || eventTypes[0];
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleOpenModal = (event?: CalendarEvent) => {
    if (event) {
      setEditingEvent(event);
      setTitle(event.title);
      setDescription(event.description || '');
      setEventType(event.event_type);
      setLocation(event.location || '');
      setStartTime(event.start_time || '09:00');
      setEndTime(event.end_time || '10:00');
    } else {
      setEditingEvent(null);
      setTitle('');
      setDescription('');
      setEventType('personal');
      setLocation('');
      setStartTime('09:00');
      setEndTime('10:00');
    }
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setTitle('');
    setDescription('');
    setEventType('personal');
    setLocation('');
  };

  const handleCreateEvent = () => {
    if (!title.trim()) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || undefined,
      event_type: eventType,
      location: location.trim() || undefined,
      date: selectedDate.toISOString().split('T')[0],
      all_day: false,
      start_time: startTime,
      end_time: endTime,
    };

    setEvents([...events, newEvent]);
    handleCloseModal();
  };

  const handleUpdateEvent = () => {
    if (!editingEvent || !title.trim()) return;

    setEvents(events.map(event => 
      event.id === editingEvent.id 
        ? { 
            ...event, 
            title: title.trim(), 
            description: description.trim(), 
            event_type: eventType, 
            location: location.trim(),
            start_time: startTime,
            end_time: endTime,
          }
        : event
    ));
    handleCloseModal();
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  // Generate calendar grid for mini month view
  const generateMonthDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    
    const days: { date: number; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean }[] = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({ 
        date: prevMonthLastDay - i, 
        isCurrentMonth: false,
        isToday: false,
        isSelected: false 
      });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const isSelected = i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
      days.push({ 
        date: i, 
        isCurrentMonth: true,
        isToday,
        isSelected
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ 
        date: i, 
        isCurrentMonth: false,
        isToday: false,
        isSelected: false 
      });
    }
    
    return days;
  };

  const monthDays = generateMonthDays();

  return (
    <div 
      className="w-full h-full flex flex-col"
      style={{ 
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-4))',
        backgroundColor: 'rgba(var(--color-background-primary), 1)',
      }}
    >
      {/* Header */}
      <header 
        className="flex flex-none items-center justify-between backdrop-blur-md"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderBottom: '1px solid var(--glass-border)',
          padding: 'var(--spacing-4) var(--spacing-6)',
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.08),
            0 4px 8px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        <div>
          <h1 style={{ 
            fontSize: 'var(--text-base)', 
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)',
            marginBottom: '2px',
          }}>
            <time className="sm:hidden">
              {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </time>
            <time className="hidden sm:inline">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          </h1>
          <p style={{ 
            marginTop: 'var(--spacing-1)',
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
          }}>
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
          </p>
        </div>

        <div className="flex items-center" style={{ gap: 'var(--spacing-4)' }}>
          {/* Navigation Controls */}
          <div 
            className="flex items-center backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <button
              onClick={handlePreviousDay}
              className="flex items-center justify-center"
              style={{
                width: '36px',
                height: '36px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleToday}
              className="hidden md:block"
              style={{
                padding: '0 var(--spacing-3)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
              }}
            >
              Today
            </button>
            
            <div 
              className="md:block hidden"
              style={{
                width: '1px',
                height: '20px',
                backgroundColor: 'var(--glass-border)',
              }}
            />
            
            <button
              onClick={handleNextDay}
              className="flex items-center justify-center"
              style={{
                width: '36px',
                height: '36px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* View Mode Selector */}
          <div className="hidden md:flex items-center" style={{ gap: 'var(--spacing-4)' }}>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowViewMenu(!showViewMenu)}
                className="flex items-center backdrop-blur-md"
                style={{
                  gap: 'var(--spacing-2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: 'var(--spacing-2) var(--spacing-3)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--glass-border)',
                  cursor: 'pointer',
                }}
              >
                {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} view
                <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              </button>

              {showViewMenu && (
                <div 
                  className="absolute backdrop-blur-md"
                  style={{
                    top: 'calc(100% + var(--spacing-2))',
                    right: 0,
                    minWidth: '144px',
                    backgroundColor: 'var(--glass-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    zIndex: 50,
                  }}
                >
                  <div style={{ padding: 'var(--spacing-1)' }}>
                    {(['day', 'week', 'month', 'year'] as ViewMode[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setViewMode(mode);
                          setShowViewMenu(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: 'var(--spacing-2) var(--spacing-4)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          border: 'none',
                          background: 'transparent',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)} view
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--glass-border)' }} />

            <button
              onClick={() => handleOpenModal()}
              style={{
                backgroundColor: '#3b82f6',
                padding: 'var(--spacing-2) var(--spacing-3)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Add event
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => handleOpenModal()}
              className="flex flex-col items-center justify-center"
              style={{
                padding: 'var(--spacing-2)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                border: '1px solid var(--glass-border)',
                background: 'transparent',
                borderRadius: 'var(--radius-md)',
                gap: 'var(--spacing-1)',
              }}
            >
              <Plus className="w-5 h-5" />
              <span style={{ fontSize: '8px', lineHeight: '1', color: 'var(--text-tertiary)' }}>
                add event
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Calendar Content */}
      <div className="flex flex-auto overflow-hidden" style={{ isolation: 'isolate', flexDirection: 'column' }}>
        {/* Tab Navigation */}
        <div style={{ padding: 'var(--spacing-4) var(--spacing-6) 0' }}>
          {/* Mobile Select */}
          <div className="grid grid-cols-1 sm:hidden">
            <select 
              aria-label="Select a view"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as ViewMode)}
              className="col-start-1 row-start-1 w-full appearance-none"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: 'var(--spacing-2) var(--spacing-8) var(--spacing-2) var(--spacing-3)',
                fontSize: 'var(--text-base)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--glass-border)',
                outline: 'none',
              }}
            >
              <option value="day">Day View</option>
              <option value="week">Week View</option>
              <option value="month">Month View</option>
              <option value="year">Year View</option>
            </select>
            <svg 
              viewBox="0 0 16 16" 
              fill="currentColor" 
              aria-hidden="true" 
              className="pointer-events-none col-start-1 row-start-1 size-5 self-center justify-self-end"
              style={{
                marginRight: 'var(--spacing-2)',
                color: 'var(--text-secondary)',
              }}
            >
              <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden sm:block">
            <nav 
              aria-label="Calendar Views" 
              className="flex divide-x backdrop-blur-md"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--glass-border)',
                isolation: 'isolate',
                overflow: 'hidden',
              }}
            >
              {(['day', 'week', 'month', 'year'] as ViewMode[]).map((mode, index, array) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`group relative min-w-0 flex-1 overflow-hidden ${
                    index === 0 ? 'rounded-l-lg' : ''
                  } ${index === array.length - 1 ? 'rounded-r-lg' : ''}`}
                  style={{
                    padding: 'var(--spacing-4)',
                    textAlign: 'center',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: viewMode === mode ? 'var(--text-primary)' : 'var(--text-secondary)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRight: index < array.length - 1 ? '1px solid var(--glass-border)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ textTransform: 'capitalize' }}>{mode} View</span>
                  <span 
                    aria-hidden="true" 
                    className="absolute inset-x-0 bottom-0"
                    style={{
                      height: '2px',
                      backgroundColor: viewMode === mode ? '#6366f1' : 'transparent',
                    }}
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="flex flex-auto overflow-hidden" style={{ marginTop: 'var(--spacing-4)' }}>
          {viewMode === 'day' && (
          <div className="flex flex-auto flex-col overflow-auto">
            {/* Mobile Day Selector */}
            <div 
              className="sticky top-0 z-10 grid grid-cols-7 md:hidden backdrop-blur-md"
              style={{
                backgroundColor: 'var(--glass-bg)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--glass-border)',
              }}
            >
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center"
                  style={{
                    paddingTop: 'var(--spacing-3)',
                    paddingBottom: 'var(--spacing-2)',
                  }}
                >
                  <span>{day}</span>
                  <span 
                    className="flex items-center justify-center"
                    style={{
                      marginTop: 'var(--spacing-3)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: index === 3 ? '#1a202c' : 'var(--text-primary)',
                      backgroundColor: index === 3 ? '#ffffff' : 'transparent',
                    }}
                  >
                    {19 + index}
                  </span>
                </button>
              ))}
            </div>

            {/* Day View Grid */}
            <div className="flex w-full flex-auto">
              <div 
                style={{
                  width: '56px',
                  flexShrink: 0,
                  backgroundColor: 'var(--glass-bg)',
                  borderRight: '1px solid var(--glass-border)',
                }}
              />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                {/* Horizontal Time Lines */}
                <div 
                  className="col-start-1 col-end-2 row-start-1 grid divide-y"
                  style={{
                    gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))',
                    borderColor: 'var(--glass-border)',
                  }}
                >
                  <div style={{ height: '28px' }} />
                  {timeSlots.map((time, index) => (
                    <React.Fragment key={index}>
                      <div>
                        <div 
                          style={{
                            marginTop: '-10px',
                            marginLeft: '-56px',
                            width: '56px',
                            paddingRight: 'var(--spacing-2)',
                            textAlign: 'right',
                            fontSize: 'var(--text-xs)',
                            lineHeight: '20px',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          {time}
                        </div>
                      </div>
                      <div />
                    </React.Fragment>
                  ))}
                </div>

                {/* Events */}
                <ol 
                  className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                  style={{
                    gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
                  }}
                >
                  {selectedDateEvents.map((event) => {
                    const config = getEventTypeConfig(event.event_type);
                    return (
                      <li
                        key={event.id}
                        className="relative mt-px flex"
                        style={{ 
                          gridRow: event.gridRow,
                        }}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenModal(event);
                          }}
                          className="group absolute inset-1 flex flex-col overflow-y-auto backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
                          style={{
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: `${config.color}15`,
                            padding: 'var(--spacing-2)',
                            fontSize: 'var(--text-xs)',
                            lineHeight: '20px',
                            boxShadow: `
                              0 1px 2px rgba(0, 0, 0, 0.1),
                              0 2px 4px rgba(0, 0, 0, 0.08),
                              inset 0 1px 0 rgba(255, 255, 255, 0.1)
                            `,
                          }}
                        >
                          <p 
                            style={{ 
                              fontWeight: 'var(--font-weight-semibold)',
                              color: config.color,
                            }}
                          >
                            {event.title}
                          </p>
                          {event.location && (
                            <p style={{ color: config.color, opacity: 0.8 }}>
                              {event.location}
                            </p>
                          )}
                          <p style={{ color: config.color, opacity: 0.8 }}>
                            <time>{event.start_time}</time>
                          </p>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
          )}

          {viewMode === 'week' && (
            <div className="flex flex-auto flex-col overflow-auto">
              <div className="flex flex-auto backdrop-blur-md" style={{ 
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                margin: '0 var(--spacing-6)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div className="flex flex-col items-center justify-center flex-auto" style={{ 
                  padding: 'var(--spacing-12)',
                  color: 'var(--text-secondary)',
                }}>
                  <CalendarIcon className="w-16 h-16" style={{ marginBottom: 'var(--spacing-4)', opacity: 0.3 }} />
                  <h3 style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--spacing-2)',
                  }}>
                    Week View
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>
                    7-day week calendar view coming soon
                  </p>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'month' && (
            <div className="flex flex-auto flex-col overflow-auto">
              <div className="flex flex-auto backdrop-blur-md" style={{ 
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                margin: '0 var(--spacing-6)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div className="flex flex-col items-center justify-center flex-auto" style={{ 
                  padding: 'var(--spacing-12)',
                  color: 'var(--text-secondary)',
                }}>
                  <CalendarIcon className="w-16 h-16" style={{ marginBottom: 'var(--spacing-4)', opacity: 0.3 }} />
                  <h3 style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--spacing-2)',
                  }}>
                    Month View
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>
                    Full month calendar view coming soon
                  </p>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'year' && (
            <div className="flex flex-auto flex-col overflow-auto">
              <div className="flex flex-auto backdrop-blur-md" style={{ 
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                margin: '0 var(--spacing-6)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div className="flex flex-col items-center justify-center flex-auto" style={{ 
                  padding: 'var(--spacing-12)',
                  color: 'var(--text-secondary)',
                }}>
                  <CalendarIcon className="w-16 h-16" style={{ marginBottom: 'var(--spacing-4)', opacity: 0.3 }} />
                  <h3 style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--spacing-2)',
                  }}>
                    Year View
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>
                    12-month year calendar view coming soon
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Mini Month Calendar - Only show in day view */}
          {viewMode === 'day' && (
          <div 
            className="hidden md:block backdrop-blur-md"
            style={{
              width: '50%',
              maxWidth: '448px',
              flexShrink: 0,
              borderLeft: '1px solid var(--glass-border)',
              padding: 'var(--spacing-8) var(--spacing-8)',
              backgroundColor: 'var(--glass-bg)',
            }}
          >
            {/* Month Navigation */}
            <div 
              className="flex items-center text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              <button
                className="flex items-center justify-center"
                style={{
                  margin: '-6px',
                  padding: '6px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div 
                className="flex-auto"
                style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button
                className="flex items-center justify-center"
                style={{
                  margin: '-6px',
                  padding: '6px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day Headers */}
            <div 
              className="grid grid-cols-7 text-center"
              style={{
                marginTop: 'var(--spacing-6)',
                fontSize: 'var(--text-xs)',
                lineHeight: '24px',
                color: 'var(--text-secondary)',
              }}
            >
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>

            {/* Calendar Grid */}
            <div 
              className="grid grid-cols-7 backdrop-blur-md"
              style={{
                marginTop: 'var(--spacing-2)',
                gap: '1px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--glass-border)',
                fontSize: 'var(--text-sm)',
                border: '1px solid var(--glass-border)',
                isolation: 'isolate',
              }}
            >
              {monthDays.map((day, index) => (
                <button
                  key={index}
                  className={`${index === 0 ? 'rounded-tl-lg' : ''} ${index === 6 ? 'rounded-tr-lg' : ''} ${index === 35 ? 'rounded-bl-lg' : ''} ${index === 41 ? 'rounded-br-lg' : ''}`}
                  style={{
                    paddingTop: 'var(--spacing-2)',
                    paddingBottom: 'var(--spacing-2)',
                    backgroundColor: day.isCurrentMonth 
                      ? 'rgba(var(--color-background-primary), 0.9)'
                      : 'rgba(var(--color-background-primary), 0.75)',
                    color: day.isSelected 
                      ? '#1a202c'
                      : day.isToday 
                        ? '#6366f1'
                        : day.isCurrentMonth 
                          ? 'var(--text-primary)'
                          : 'var(--text-tertiary)',
                    fontWeight: day.isSelected || day.isToday ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  <time 
                    className="mx-auto flex items-center justify-center"
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: day.isSelected 
                        ? '#ffffff'
                        : day.isToday 
                          ? '#6366f1'
                          : 'transparent',
                      color: day.isToday && !day.isSelected ? '#ffffff' : undefined,
                    }}
                  >
                    {day.date}
                  </time>
                </button>
              ))}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent
          className="backdrop-blur-md"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            maxWidth: '500px',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: 'var(--text-primary)' }}>
              {editingEvent ? 'Edit Event' : 'Create Event'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col" style={{ gap: 'var(--spacing-4)' }}>
            {/* Title */}
            <div>
              <label 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-2)',
                  display: 'block',
                }}
              >
                Event Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {/* Event Type */}
            <div>
              <label 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-2)',
                  display: 'block',
                }}
              >
                Event Type
              </label>
              <div className="grid grid-cols-3" style={{ gap: 'var(--spacing-2)' }}>
                {eventTypes.map((type) => {
                  const TypeIcon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => setEventType(type.value as any)}
                      className="flex flex-col items-center backdrop-blur-md"
                      style={{
                        padding: 'var(--spacing-3)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: eventType === type.value ? `${type.color}20` : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${eventType === type.value ? type.color : 'var(--glass-border)'}`,
                        cursor: 'pointer',
                      }}
                    >
                      <TypeIcon 
                        className="w-5 h-5"
                        style={{ 
                          color: eventType === type.value ? type.color : 'var(--text-secondary)',
                          marginBottom: 'var(--spacing-1)',
                        }}
                      />
                      <span
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: eventType === type.value ? type.color : 'var(--text-secondary)',
                        }}
                      >
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time */}
            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-3)' }}>
              <div>
                <label 
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--spacing-2)',
                    display: 'block',
                  }}
                >
                  Start Time
                </label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
              <div>
                <label 
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--spacing-2)',
                    display: 'block',
                  }}
                >
                  End Time
                </label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-2)',
                  display: 'block',
                }}
              >
                Location (Optional)
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-2)',
                  display: 'block',
                }}
              >
                Description (Optional)
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add description"
                rows={3}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end" style={{ gap: 'var(--spacing-2)', marginTop: 'var(--spacing-2)' }}>
              {editingEvent && (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleDeleteEvent(editingEvent.id);
                    handleCloseModal();
                  }}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderColor: '#ef4444',
                    color: '#ef4444',
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                }}
              >
                {editingEvent ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}