/**
 * ==============================================================================
 * STATUSBAR.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Custom status bar display with time, weather, and notifications.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. STATUS BAR:
 *    - Use StatusBar component from react-native
 *    - Control bar style (light/dark)
 *    - Safe area handling
 * 
 * 2. CUSTOM HEADER:
 *    - This appears to be a custom header, not system status bar
 *    - Include in header component or screen top
 *    - Show time, weather icon, notifications
 * 
 * ==============================================================================
 * NOTE: May not be needed as React Native has built-in StatusBar
 * 
 */

// RN: import { View, Text, Image, StyleSheet, StatusBar as RNStatusBar } from 'react-native';
// RN: import { useSafeAreaInsets } from 'react-native-safe-area-context';
// RN: For system status bar control:
// RN: <RNStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
import { Cloud, Bell } from "lucide-react"; // RN: import from 'lucide-react-native'
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"; // RN: Replace with custom Image component or FastImage
import { Badge } from "./ui/badge"; // RN: Replace with custom View + Text

export function StatusBar() {
  // RN: Get safe area insets for notch/status bar
  // RN: const insets = useSafeAreaInsets();
  // RN: paddingTop: insets.top ensures content doesn't go under notch
  
  // RN: Get current time
  // RN: const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
  // RN: useEffect(() => {
  // RN:   const interval = setInterval(() => {
  // RN:     setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
  // RN:   }, 1000);
  // RN:   return () => clearInterval(interval);
  // RN: }, []);
  
  return (
    // RN: <View style={[styles.container, { paddingTop: insets.top + theme.spacing[3] }]}>
    <div 
      className="flex items-center justify-between" // RN: flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
      style={{ 
        paddingTop: 'var(--spacing-3)', // RN: paddingTop: theme.spacing[3] + insets.top
        paddingBottom: 'var(--spacing-3)' // RN: paddingBottom: theme.spacing[3]
      }}
    >
      {/* Left: Time */}
      {/* RN: <View style={styles.leftSection}> */}
      <div 
        className="flex items-center" // RN: flexDirection: 'row', alignItems: 'center'
        style={{ gap: 'var(--spacing-2)' }} // RN: No gap - children handle their own margins
      >
        {/* RN: <Text style={styles.timeText}>{time}</Text> */}
        <span className="text-white">9:41</span> {/* RN: Remove className - use style prop */}
        {/* RN: style={{ color: '#fff', fontSize: 16, fontWeight: '500' }} */}
      </div>
      {/* RN: </View> */}
      
      {/* Center: Avatar */}
      {/* RN: <View style={styles.centerSection}> */}
      <div 
        className="flex items-center" // RN: flexDirection: 'row', alignItems: 'center'
        style={{ gap: 'var(--spacing-2)' }} // RN: No gap
      >
        {/* RN: Replace Avatar with Image or FastImage */}
        {/* RN: <FastImage 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }}
              style={styles.avatar}
            /> */}
        {/* RN: Or wrap in View with border for avatar styling: */}
        {/* RN: <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: '...' }}
                style={styles.avatarImage}
              />
            </View> */}
        <Avatar style={{ width: '32px', height: '32px' }}> {/* RN: width: 32, height: 32 */}
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
          <AvatarFallback>U</AvatarFallback> {/* RN: Show fallback with Text: <Text style={styles.fallback}>U</Text> */}
        </Avatar>
      </div>
      {/* RN: </View> */}
      
      {/* Right: Icons and notifications */}
      {/* RN: <View style={styles.rightSection}> */}
      <div 
        className="flex items-center" // RN: flexDirection: 'row', alignItems: 'center'
        style={{ gap: 'var(--spacing-2)' }} // RN: Use marginRight on first icon
      >
        {/* RN: <Cloud size={24} color="#fff" style={{ marginRight: theme.spacing[2] }} /> */}
        <Cloud className="text-white w-6 h-6" /> {/* RN: size={24} color="#fff" */}
        {/* RN: <View style={styles.notificationContainer}> */}
        <div className="relative"> {/* RN: position: 'relative' */}
          {/* RN: <Bell size={24} color="#fff" /> */}
          <Bell className="text-white w-6 h-6" /> {/* RN: size={24} color="#fff" */}
          {/* RN: <View style={styles.badge}>
                <Text style={styles.badgeText}>41</Text>
              </View> */}
          <Badge 
            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground flex items-center justify-center px-1 min-w-[20px] h-5"
            // RN: Remove className - use StyleSheet:
            // RN: style={{
            // RN:   position: 'absolute',
            // RN:   top: -4,
            // RN:   right: -4,
            // RN:   backgroundColor: theme.colors.error,
            // RN:   borderRadius: 10,
            // RN:   minWidth: 20,
            // RN:   height: 20,
            // RN:   alignItems: 'center',
            // RN:   justifyContent: 'center',
            // RN:   paddingHorizontal: 4,
            // RN: }}
          >
            41
          </Badge>
        </div>
        {/* RN: </View> */}
      </div>
      {/* RN: </View> */}
    </div>
    // RN: </View>
  );
}

/*
RN: COMPLETE STYLESHEET EXAMPLE

import { StyleSheet } from 'react-native';
import { theme } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    position: 'relative',
    marginLeft: theme.spacing[2],
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});

// Usage:
export function StatusBar() {
  const insets = useSafeAreaInsets();
  const [time, setTime] = useState('9:41');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <RNStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={[styles.container, { paddingTop: insets.top + theme.spacing[3] }]}>
        <View style={styles.leftSection}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        
        <View style={styles.centerSection}>
          <FastImage 
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }}
            style={styles.avatarImage}
          />
        </View>
        
        <View style={styles.rightSection}>
          <Cloud size={24} color="#fff" />
          <View style={styles.notificationContainer}>
            <Bell size={24} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>41</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
*/
