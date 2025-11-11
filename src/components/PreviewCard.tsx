/**
 * ==============================================================================
 * PREVIEWCARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Preview card component for Calendar and Documents on dashboard.
 * Shows current date or document count.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CARD COMPONENT:
 *    - Pressable with scale animation
 *    - View with card styling
 * 
 * 2. DATE DISPLAY:
 *    - Use date-fns or dayjs for formatting
 *    - Show today's date for Calendar preview
 * 
 * 3. ICONS:
 *    - lucide-react-native icons
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Card displays correctly
 * - [ ] Date shows current day
 * - [ ] Press navigation works
 * - [ ] Icons render
 * - [ ] iOS and Android compatible
 * 
 */

import { ReactNode } from "react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

interface PreviewCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export function PreviewCard({ icon, title, subtitle, onPress }: PreviewCardProps) {
  // Get today's date for Calendar preview
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'short' });
  const dayOfMonth = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'short' });
  
  // Check if this is the Calendar or Documents card
  const isCalendar = title === 'Calendar';
  const isDocuments = title === 'Documents';

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
    >
      <Card
        className="backdrop-blur-sm cursor-pointer overflow-hidden"
        style={{
          borderRadius: 'var(--preview-card-radius)',
          padding: (isCalendar || isDocuments) ? 'var(--spacing-3)' : 'var(--preview-card-padding)',
          height: 'var(--preview-card-height)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
          position: 'relative',
          boxShadow: 'var(--effect-card-premium)',
        }}
        onClick={onPress}
      >
        {/* Inner Glow Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'var(--inner-glow-subtle)',
            zIndex: 0,
          }}
        />

        {/* Top Section: Icon + Title */}
        <div 
          className="flex items-center"
          style={{ 
            gap: 'var(--spacing-2)',
            zIndex: 10,
          }}
        >
          <div style={{ filter: 'var(--icon-drop-shadow)' }}>
            {icon}
          </div>
          {!isCalendar && !isDocuments && (
            <span 
              style={{ 
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)',
              }}
            >
              {title}
            </span>
          )}
        </div>

        {/* Middle Section: Calendar-specific preview content */}
        {isCalendar && (
          <div 
            className="flex flex-col items-center justify-center"
            style={{ 
              gap: '2px',
              flex: 1,
              position: 'relative',
              zIndex: 1,
              marginTop: '-34px',
            }}
          >
            {/* Month - Uppercase */}
            <div 
              className="relative"
              style={{
                textAlign: 'center',
              }}
            >
              <span 
                style={{ 
                  fontSize: '10px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                }}
              >
                {month.toUpperCase()}
              </span>
            </div>

            {/* Date Number - Large and Prominent */}
            <div 
              className="relative"
              style={{
                textAlign: 'center',
                marginTop: '2px',
              }}
            >
              <span 
                style={{ 
                  fontSize: '36px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  lineHeight: '1',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {dayOfMonth}
              </span>
            </div>
            
            {/* Event indicators - Enhanced with glow */}
            <div 
              className="flex items-center"
              style={{ 
                gap: 'var(--spacing-2)',
                marginTop: '4px',
              }}
            >
              <div 
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(34, 197, 94)',
                  boxShadow: '0 0 6px rgba(34, 197, 94, 0.8), 0 0 3px rgba(34, 197, 94, 0.6)',
                }}
              />
              <div 
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(59, 130, 246)',
                  boxShadow: '0 0 6px rgba(59, 130, 246, 0.8), 0 0 3px rgba(59, 130, 246, 0.6)',
                }}
              />
            </div>
          </div>
        )}

        {/* Middle Section: Documents preview content */}
        {isDocuments && (
          <div 
            className="flex flex-col items-center justify-center"
            style={{ 
              flex: 1,
              position: 'relative',
              zIndex: 1,
              marginTop: '-28px',
            }}
          >
            {/* Stacked Document Preview */}
            <div 
              className="relative"
              style={{
                width: '44px',
                height: '52px',
              }}
            >
              {/* Document 3 - Back */}
              <div
                className="absolute"
                style={{
                  width: '38px',
                  height: '46px',
                  backgroundColor: 'var(--card-bg)',
                  border: '1.5px solid var(--card-border)',
                  borderRadius: '4px',
                  top: '8px',
                  left: '3px',
                  opacity: 0.4,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              />
              
              {/* Document 2 - Middle */}
              <div
                className="absolute"
                style={{
                  width: '40px',
                  height: '48px',
                  backgroundColor: 'var(--card-bg)',
                  border: '1.5px solid var(--card-border)',
                  borderRadius: '4px',
                  top: '4px',
                  left: '2px',
                  opacity: 0.6,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
                }}
              />
              
              {/* Document 1 - Front */}
              <div
                className="absolute"
                style={{
                  width: '42px',
                  height: '50px',
                  backgroundColor: 'var(--card-bg)',
                  border: '2px solid',
                  borderColor: 'rgb(59, 130, 246)',
                  borderRadius: '4px',
                  top: '0px',
                  left: '1px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 0 8px rgba(59, 130, 246, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  padding: '6px',
                }}
              >
                {/* Document lines */}
                <div style={{ width: '24px', height: '2px', backgroundColor: 'var(--text-primary)', opacity: 0.7, borderRadius: '1px' }} />
                <div style={{ width: '20px', height: '2px', backgroundColor: 'var(--text-primary)', opacity: 0.5, borderRadius: '1px' }} />
                <div style={{ width: '22px', height: '2px', backgroundColor: 'var(--text-primary)', opacity: 0.5, borderRadius: '1px' }} />
                <div style={{ width: '18px', height: '2px', backgroundColor: 'var(--text-primary)', opacity: 0.4, borderRadius: '1px' }} />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Day of Week + Subtitle */}
        <div 
          style={{ 
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {/* Day of Week + Event Count Combined */}
          {isCalendar && (
            <div 
              className="flex items-center justify-center"
              style={{ gap: 'var(--spacing-1)' }}
            >
              <span 
                style={{ 
                  fontSize: '10px',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                {dayOfWeek} · {subtitle}
              </span>
            </div>
          )}
          
          {/* Documents subtitle - centered and styled like calendar */}
          {isDocuments && (
            <div 
              className="flex items-center justify-center"
              style={{ gap: 'var(--spacing-1)' }}
            >
              <span 
                style={{ 
                  fontSize: '10px',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                {subtitle}
              </span>
            </div>
          )}
          
          {!isCalendar && !isDocuments && (
            <span 
              style={{ 
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                textAlign: 'left',
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      </Card>
    </motion.div>
  );
}