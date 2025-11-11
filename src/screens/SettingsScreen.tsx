/**
 * ==============================================================================
 * SETTINGSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Settings screen with user preferences, theme toggle, notifications,
 * privacy settings, and account management.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. SETTINGS LIST:
 *    - FlatList or ScrollView for settings items
 *    - Group items by category
 *    - TouchableOpacity for navigation items
 * 
 * 2. SWITCHES:
 *    - React Native Switch component
 *    - Store preferences in AsyncStorage
 * 
 * 3. THEME TOGGLE:
 *    - Connect to ThemeProvider
 *    - Update system UI (StatusBar color)
 * 
 * 4. NAVIGATION:
 *    - Navigate to sub-settings screens
 *    - Back button to previous screen
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Settings load correctly
 * - [ ] Theme toggle works
 * - [ ] Switches update state
 * - [ ] Preferences persist
 * - [ ] Navigation works
 * - [ ] Logout function works
 * - [ ] iOS and Android compatible
 * 
 */

import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Moon,
  Sun
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { useTheme } from "../components/ThemeProvider";

interface SettingsScreenProps {
  onBack: () => void;
}

interface SettingItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: 'navigation' | 'toggle';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const { theme, toggleTheme } = useTheme();
  
  const settingsSections: SettingSection[] = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          label: 'Profile',
          icon: <User className="w-5 h-5" />,
          type: 'navigation',
          onPress: () => console.log('Navigate to Profile'),
        },
        {
          id: 'security',
          label: 'Security & Privacy',
          icon: <Shield className="w-5 h-5" />,
          type: 'navigation',
          onPress: () => console.log('Navigate to Security'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'dark-mode',
          label: 'Dark Mode',
          icon: theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />,
          type: 'toggle',
          value: theme === 'dark',
          onToggle: toggleTheme,
        },
        {
          id: 'notifications',
          label: 'Push Notifications',
          icon: <Bell className="w-5 h-5" />,
          type: 'toggle',
          value: true,
          onToggle: (value) => console.log('Notifications:', value),
        },
        {
          id: 'theme',
          label: 'Appearance',
          icon: <Palette className="w-5 h-5" />,
          type: 'navigation',
          onPress: () => console.log('Navigate to Appearance'),
        },
        {
          id: 'language',
          label: 'Language',
          icon: <Globe className="w-5 h-5" />,
          type: 'navigation',
          onPress: () => console.log('Navigate to Language'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          label: 'Help & Support',
          icon: <HelpCircle className="w-5 h-5" />,
          type: 'navigation',
          onPress: () => console.log('Navigate to Help'),
        },
      ],
    },
  ];

  return (
    <div 
      className="flex flex-col h-full"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center"
        style={{
          padding: 'var(--spacing-6)',
          paddingTop: 'calc(var(--header-height) + var(--spacing-6))',
          gap: 'var(--spacing-4)',
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 relative"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-2xl)',
            backgroundColor: 'var(--icon-bg)',
            border: `1px solid var(--icon-border)`,
            boxShadow: `
              0 2px 4px rgba(0, 0, 0, 0.15),
              0 4px 8px rgba(0, 0, 0, 0.2),
              0 8px 16px rgba(0, 0, 0, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: 'var(--icon-color)' }} />
        </button>
        <h1 style={{ fontSize: 'var(--text-2xl)', color: 'var(--text-primary)' }}>
          Settings
        </h1>
      </div>

      {/* Settings Content */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{
          paddingLeft: 'var(--spacing-6)',
          paddingRight: 'var(--spacing-6)',
          paddingBottom: 'calc(var(--nav-height) + 120px)',
        }}
      >
        <div 
          className="flex flex-col"
          style={{ gap: 'var(--spacing-6)' }}
        >
          {settingsSections.map((section) => (
            <div key={section.title} className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
              {/* Section Title */}
              <h3 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  paddingLeft: 'var(--spacing-4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-secondary)',
                }}
              >
                {section.title}
              </h3>

              {/* Section Items */}
              <div className="flex flex-col" style={{ gap: 'var(--spacing-2)' }}>
                {section.items.map((item) => (
                  <Card
                    key={item.id}
                    className="backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      borderRadius: 'var(--preview-card-radius)',
                      padding: 'var(--spacing-4)',
                      backgroundColor: 'var(--card-bg)',
                      borderColor: 'var(--card-border)',
                      boxShadow: `
                        0 1px 2px rgba(0, 0, 0, 0.1),
                        0 2px 4px rgba(0, 0, 0, 0.12),
                        0 4px 8px rgba(0, 0, 0, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.05)
                      `,
                    }}
                    onClick={item.type === 'navigation' ? item.onPress : undefined}
                  >
                    <div 
                      className="flex items-center justify-between"
                      style={{ gap: 'var(--spacing-4)' }}
                    >
                      <div 
                        className="flex items-center"
                        style={{ gap: 'var(--spacing-4)' }}
                      >
                        {/* Icon */}
                        <div 
                          className="flex items-center justify-center rounded-full"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: 'var(--radius-2xl)',
                            backgroundColor: 'var(--icon-bg)',
                            border: `1px solid var(--icon-border)`,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          <div style={{ color: 'var(--icon-color)' }}>
                            {item.icon}
                          </div>
                        </div>

                        {/* Label */}
                        <span 
                          style={{ 
                            fontSize: 'var(--text-base)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* Right Action */}
                      {item.type === 'navigation' && (
                        <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                      )}
                      {item.type === 'toggle' && (
                        <Switch 
                          checked={item.value}
                          onCheckedChange={item.onToggle}
                        />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <Card
            className="bg-red-500/20 border-red-500/50 backdrop-blur-sm cursor-pointer hover:bg-red-500/30 transition-colors"
            style={{
              borderRadius: 'var(--preview-card-radius)',
              padding: 'var(--spacing-4)',
              marginTop: 'var(--spacing-4)',
            }}
            onClick={() => console.log('Logout')}
          >
            <div 
              className="flex items-center justify-center"
              style={{ gap: 'var(--spacing-3)' }}
            >
              <LogOut className="text-red-400 w-5 h-5" />
              <span 
                className="text-red-400"
                style={{ 
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                Sign Out
              </span>
            </div>
          </Card>

          {/* App Version */}
          <div 
            className="text-center text-white/40"
            style={{ 
              fontSize: '12px',
              paddingTop: 'var(--spacing-4)',
              paddingBottom: 'var(--spacing-4)',
            }}
          >
            PolicyAngel v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
