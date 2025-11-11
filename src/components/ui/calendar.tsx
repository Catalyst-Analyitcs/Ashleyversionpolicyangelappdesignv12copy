/**
 * ==============================================================================
 * CALENDAR.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Calendar date picker component for selecting single dates or date
 * ranges in forms, scheduling, and booking interfaces.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CALENDAR LIBRARY:
 *    - Use react-native-calendars (recommended)
 *    - Or @react-native-community/datetimepicker for simple date picking
 *    - react-native-calendars supports:
 *      - Single date selection
 *      - Date range selection
 *      - Multiple date selection
 *      - Custom styling
 *      - Locale support
 * 
 * 2. INSTALLATION:
 *    npm install react-native-calendars
 * 
 * 3. BASIC CONVERSION EXAMPLE:
 *    ```tsx
 *    import { Calendar as RNCalendar } from 'react-native-calendars';
 *    import { View, StyleSheet } from 'react-native';
 *    
 *    // Single date selection
 *    export function Calendar({ onDayPress, selected }) {
 *      return (
 *        <View style={styles.container}>
 *          <RNCalendar
 *            // Handler for date selection
 *            onDayPress={(day) => {
 *              onDayPress(day.dateString); // '2024-11-07'
 *            }}
 *            // Mark selected dates
 *            markedDates={{
 *              [selected]: {
 *                selected: true,
 *                selectedColor: '#3b82f6', // var(--primary)
 *              }
 *            }}
 *            // Theme styling
 *            theme={{
 *              backgroundColor: 'transparent',
 *              calendarBackground: 'transparent',
 *              textSectionTitleColor: '#94a3b8', // var(--text-secondary)
 *              selectedDayBackgroundColor: '#3b82f6', // var(--primary)
 *              selectedDayTextColor: '#ffffff',
 *              todayTextColor: '#3b82f6',
 *              dayTextColor: '#e2e8f0', // var(--text-primary)
 *              textDisabledColor: '#64748b',
 *              monthTextColor: '#e2e8f0',
 *              arrowColor: '#3b82f6',
 *            }}
 *            // Enable swipe gestures
 *            enableSwipeMonths={true}
 *          />
 *        </View>
 *      );
 *    }
 *    
 *    const styles = StyleSheet.create({
 *      container: {
 *        backgroundColor: 'rgba(0, 0, 0, 0.3)', // var(--glass-bg)
 *        borderRadius: 16, // var(--radius-lg)
 *        padding: 12,
 *      },
 *    });
 *    ```
 * 
 * 4. DATE RANGE SELECTION:
 *    ```tsx
 *    import { Calendar } from 'react-native-calendars';
 *    
 *    export function DateRangeCalendar({ startDate, endDate, onRangeSelect }) {
 *      const [markedDates, setMarkedDates] = useState({});
 *      
 *      const onDayPress = (day) => {
 *        // Build marked dates object for range
 *        const dates = {};
 *        
 *        if (!startDate || (startDate && endDate)) {
 *          // Start new selection
 *          dates[day.dateString] = {
 *            startingDay: true,
 *            color: '#3b82f6',
 *            textColor: '#ffffff',
 *          };
 *          onRangeSelect(day.dateString, null);
 *        } else {
 *          // Complete the range
 *          const start = new Date(startDate);
 *          const end = new Date(day.dateString);
 *          
 *          // Mark all dates in range
 *          for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
 *            const dateString = d.toISOString().split('T')[0];
 *            dates[dateString] = {
 *              color: '#3b82f6',
 *              textColor: '#ffffff',
 *            };
 *          }
 *          
 *          // Mark start and end
 *          dates[startDate].startingDay = true;
 *          dates[day.dateString].endingDay = true;
 *          
 *          onRangeSelect(startDate, day.dateString);
 *        }
 *        
 *        setMarkedDates(dates);
 *      };
 *      
 *      return (
 *        <Calendar
 *          onDayPress={onDayPress}
 *          markingType="period"
 *          markedDates={markedDates}
 *        />
 *      );
 *    }
 *    ```
 * 
 * 5. ALTERNATIVE: NATIVE DATE PICKER (iOS/Android)
 *    For simpler use cases, use platform native pickers:
 *    ```tsx
 *    import DateTimePicker from '@react-native-community/datetimepicker';
 *    import { useState } from 'react';
 *    import { TouchableOpacity, Text, View, Platform } from 'react-native';
 *    
 *    export function NativeDatePicker({ value, onChange }) {
 *      const [show, setShow] = useState(false);
 *      const [date, setDate] = useState(value || new Date());
 *      
 *      const onDateChange = (event, selectedDate) => {
 *        setShow(Platform.OS === 'ios'); // Keep showing on iOS
 *        if (selectedDate) {
 *          setDate(selectedDate);
 *          onChange(selectedDate);
 *        }
 *      };
 *      
 *      return (
 *        <View>
 *          <TouchableOpacity onPress={() => setShow(true)}>
 *            <Text>{date.toLocaleDateString()}</Text>
 *          </TouchableOpacity>
 *          
 *          {show && (
 *            <DateTimePicker
 *              value={date}
 *              mode="date"
 *              display="default"
 *              onChange={onDateChange}
 *            />
 *          )}
 *        </View>
 *      );
 *    }
 *    ```
 * 
 * 6. CUSTOM STYLING:
 *    Match PolicyAngel's glassmorphic theme:
 *    ```tsx
 *    theme={{
 *      backgroundColor: 'rgba(0, 0, 0, 0.3)',
 *      calendarBackground: 'rgba(0, 0, 0, 0.3)',
 *      textSectionTitleColor: '#94a3b8',
 *      selectedDayBackgroundColor: '#eab308', // Golden accent
 *      selectedDayTextColor: '#000000',
 *      todayTextColor: '#eab308',
 *      dayTextColor: '#e2e8f0',
 *      textDisabledColor: '#64748b',
 *      monthTextColor: '#e2e8f0',
 *      arrowColor: '#eab308',
 *      'stylesheet.calendar.header': {
 *        monthText: {
 *          fontSize: 16,
 *          fontWeight: '600',
 *          color: '#e2e8f0',
 *        }
 *      },
 *      'stylesheet.day.basic': {
 *        base: {
 *          width: 32,
 *          height: 32,
 *          alignItems: 'center',
 *          justifyContent: 'center',
 *        },
 *        text: {
 *          fontSize: 14,
 *        },
 *      }
 *    }}
 *    ```
 * 
 * 7. FEATURES TO IMPLEMENT:
 *    - Minimum/maximum date restrictions
 *    - Disabled dates (past dates, blackout dates)
 *    - Custom day rendering (events, indicators)
 *    - Multi-language support
 *    - Week start day customization
 *    - Custom header with navigation
 * 
 * 8. INTEGRATION WITH FORMS:
 *    Works with react-hook-form:
 *    ```tsx
 *    import { Controller } from 'react-hook-form';
 *    
 *    <Controller
 *      control={control}
 *      name="appointmentDate"
 *      render={({ field: { onChange, value } }) => (
 *        <Calendar
 *          onDayPress={(day) => onChange(day.dateString)}
 *          markedDates={{
 *            [value]: { selected: true }
 *          }}
 *        />
 *      )}
 *    />
 *    ```
 * 
 * ==============================================================================
 * LIBRARIES COMPARISON
 * ==============================================================================
 * 
 * react-native-calendars:
 * ✅ Full-featured calendar grid
 * ✅ Date ranges, multi-select
 * ✅ Custom styling
 * ✅ Agenda/timeline view
 * ❌ Larger bundle size
 * 
 * @react-native-community/datetimepicker:
 * ✅ Native platform pickers (iOS/Android)
 * ✅ Smaller bundle size
 * ✅ Familiar UX for users
 * ❌ Less customization
 * ❌ Different UI on each platform
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Single date selection works
 * - [ ] Date range selection works
 * - [ ] Navigation between months works
 * - [ ] Today indicator shows correctly
 * - [ ] Selected dates highlighted
 * - [ ] Disabled dates cannot be selected
 * - [ ] Styling matches design system
 * - [ ] Swipe gestures work (if enabled)
 * - [ ] Works with forms/validation
 * - [ ] iOS and Android compatible
 * - [ ] Landscape orientation supported
 * 
 */

"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react@0.487.0";
import { DayPicker } from "react-day-picker@8.10.1";

import { cn } from "./utils";
import { buttonVariants } from "./button";

// RN: Replace DayPicker with react-native-calendars Calendar component
// RN: See conversion examples above for implementation details

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  // RN: Component structure for React Native:
  // RN: ```tsx
  // RN: import { Calendar as RNCalendar } from 'react-native-calendars';
  // RN: import { View, StyleSheet } from 'react-native';
  // RN: 
  // RN: interface CalendarProps {
  // RN:   selected?: string;
  // RN:   onDayPress?: (day: DateData) => void;
  // RN:   markedDates?: MarkedDates;
  // RN:   markingType?: 'simple' | 'period' | 'multi-dot';
  // RN:   minDate?: string;
  // RN:   maxDate?: string;
  // RN: }
  // RN: 
  // RN: export function Calendar({ 
  // RN:   selected, 
  // RN:   onDayPress,
  // RN:   markedDates: customMarkedDates,
  // RN:   ...restProps 
  // RN: }: CalendarProps) {
  // RN:   const markedDates = customMarkedDates || (selected ? {
  // RN:     [selected]: {
  // RN:       selected: true,
  // RN:       selectedColor: '#3b82f6',
  // RN:     }
  // RN:   } : {});
  // RN:   
  // RN:   return (
  // RN:     <View style={styles.container}>
  // RN:       <RNCalendar
  // RN:         onDayPress={onDayPress}
  // RN:         markedDates={markedDates}
  // RN:         theme={{
  // RN:           backgroundColor: 'transparent',
  // RN:           calendarBackground: 'rgba(0, 0, 0, 0.3)',
  // RN:           textSectionTitleColor: '#94a3b8',
  // RN:           selectedDayBackgroundColor: '#3b82f6',
  // RN:           selectedDayTextColor: '#ffffff',
  // RN:           todayTextColor: '#3b82f6',
  // RN:           dayTextColor: '#e2e8f0',
  // RN:           textDisabledColor: '#64748b',
  // RN:           monthTextColor: '#e2e8f0',
  // RN:           arrowColor: '#3b82f6',
  // RN:         }}
  // RN:         enableSwipeMonths={true}
  // RN:         {...restProps}
  // RN:       />
  // RN:     </View>
  // RN:   );
  // RN: }
  // RN: 
  // RN: const styles = StyleSheet.create({
  // RN:   container: {
  // RN:     backgroundColor: 'rgba(0, 0, 0, 0.3)',
  // RN:     borderRadius: 16,
  // RN:     padding: 12,
  // RN:   },
  // RN: });
  // RN: ```

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
