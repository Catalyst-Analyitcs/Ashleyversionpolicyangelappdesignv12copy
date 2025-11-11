/**
 * ==============================================================================
 * THEMEPROVIDER.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Global theme management (light/dark mode).
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. THEME CONTEXT:
 *    - Keep React Context pattern
 *    - Store theme in AsyncStorage instead of localStorage
 *    - Use Zustand as alternative for global state
 * 
 * 2. THEME APPLICATION:
 *    - Update StatusBar color based on theme
 *    - Change navigation bar color
 *    - Apply theme colors to components
 * 
 * 3. SYSTEM THEME:
 *    - Detect system theme with Appearance API
 *    - Auto-switch based on system preference
 * 
 * ==============================================================================
 * REACT NATIVE EXAMPLE
 * ==============================================================================
 * 
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * import { Appearance } from 'react-native';
 * 
 * const systemTheme = Appearance.getColorScheme(); // 'light' | 'dark'
 * await AsyncStorage.setItem('theme', theme);
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Theme persists across app restarts
 * - [ ] Toggle theme works
 * - [ ] System theme detection works
 * - [ ] All screens respect theme
 * - [ ] iOS and Android compatible
 * 
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('policyangel-theme') as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem('policyangel-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
