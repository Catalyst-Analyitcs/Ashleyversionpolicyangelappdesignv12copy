/**
 * ==============================================================================
 * EMERGENCYSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Emergency contacts, SOS features, and urgent action buttons.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. PHONE DIALER:
 *    - Use Linking.openURL('tel:911')
 *    - Emergency contact list
 * 
 * 2. LOCATION:
 *    - Share current location
 *    - expo-location
 * 
 * 3. REQUIRED API:
 *    - GET /api/emergency/contacts
 *    - POST /api/emergency/alert
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Phone dialer opens
 * - [ ] Location sharing works
 * - [ ] Emergency alert sends
 * - [ ] iOS and Android compatible
 * 
 */

import { AlertTriangle, Phone, MapPin, AlertCircle } from "lucide-react";

export function EmergencyScreen() {
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
      <div style={{ paddingTop: 'var(--spacing-2)' }}>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
          Emergency Response
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Immediate action protocols
        </p>
      </div>

      {/* Emergency Alert */}
      <div 
        className="backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(var(--color-error), 0.1)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(var(--color-error), 0.3)',
          padding: 'var(--spacing-4)',
        }}
      >
        <div className="flex items-start" style={{ gap: 'var(--spacing-3)' }}>
          <AlertTriangle className="w-5 h-5" style={{ color: 'rgb(var(--color-error))', flexShrink: 0 }} />
          <div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-1)' }}>
              Emergency Protocols Active
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              All critical systems are monitored 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Quick Contact */}
      <div style={{ gap: 'var(--spacing-3)' }} className="flex flex-col">
        {[
          { icon: <Phone />, label: 'Emergency Hotline', detail: '1-800-POLICY' },
          { icon: <MapPin />, label: 'Nearest Response Team', detail: '2.3 miles away (SF)' },
          { icon: <AlertCircle />, label: 'Report Incident', detail: 'File claim immediately' },
        ].map((item, index) => (
          <button
            key={index}
            className="backdrop-blur-md flex items-center active:scale-98 transition-all"
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-4)',
              gap: 'var(--spacing-3)',
              textAlign: 'left',
            }}
          >
            <div style={{ color: 'rgb(var(--color-error))' }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-1)' }}>
                {item.label}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {item.detail}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}