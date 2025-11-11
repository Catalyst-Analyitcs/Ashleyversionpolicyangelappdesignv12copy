/**
 * ==============================================================================
 * EMAILENTRYSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Email/login entry screen with language selection.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means 90% of this screen works as-is!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - ALL className Tailwind utilities work!
 *    - flex, items-center, justify-center
 *    - p-6, gap-4, rounded-xl
 *    - bg-pa-dark, border-white/10
 *    - text-white, text-center
 * 
 * ❌ CONVERT ONLY THESE:
 *    - div → View
 *    - input → TextInput (from react-native)
 *    - button → Pressable
 *    - img → Image (from react-native or expo-image)
 *    - localStorage → AsyncStorage or expo-secure-store
 *    - React.KeyboardEvent → TextInput onSubmitEditing
 * 
 * SPECIFIC CONVERSIONS:
 * 
 * Email input with NativeWind:
 *   - Use TextInput component
 *   - Keep all className utilities
 *   - Add keyboardType="email-address"
 * 
 * Remember me checkbox:
 *   - Use Switch from react-native
 *   - Style with trackColor prop
 * 
 * Language popup:
 *   - Use Modal component
 *   - All Tailwind classes work on View
 * 
 * Storage:
 *   - Replace localStorage with AsyncStorage
 *   - Or use expo-secure-store for credentials
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. LAYOUT:
 *    - Centered form
 *    - Animated background
 *    - Logo + branding
 * 
 * 2. FORM:
 *    - TextInput for email
 *    - Email validation
 *    - Remember me toggle
 * 
 * 3. AUTHENTICATION:
 *    - Link to auth provider
 *    - Store credentials securely (expo-secure-store)
 * 
 * 4. REQUIRED API:
 *    - POST /api/auth/login
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Email input works
 * - [ ] Validation functions
 * - [ ] Submit triggers login
 * - [ ] iOS and Android compatible
 * 
 */

import React, { useState } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AnimatedGradientBackground } from '../components/AnimatedGradientBackground';
import policyAngelLogo from "figma:asset/66283e8dafc3c31c277ce6add3d2f6d9caa6369b.png";

interface EmailEntryScreenProps {
  onEmailSubmit: (email: string) => void;
}

export function EmailEntryScreen({ onEmailSubmit }: EmailEntryScreenProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es'>('en');

  const handleContinue = () => {
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Store remember me preference (could be in localStorage)
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('lastEmail', email);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('lastEmail');
    }

    // Navigate to dashboard
    onEmailSubmit(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center relative"
      style={{
        background: `linear-gradient(to bottom, var(--app-bg-start), var(--app-bg-middle), var(--app-bg-end))`,
      }}
    >
      {/* Animated Gradient Background - z-index: 0 */}
      <AnimatedGradientBackground intensity={20} />
      
      {/* Large Logo Background - z-index: 1 */}
      <div 
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, calc(-50% - 50px))',
          width: '1000px',
          height: '1000px',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <img 
          src={policyAngelLogo}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Faded Overlay Layer - z-index: 2 */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div 
        className="relative z-10 flex flex-col"
        style={{ 
          width: '100%',
          maxWidth: '400px',
          padding: 'var(--spacing-6)',
          gap: 'var(--spacing-12)',
        }}
      >
        {/* Title */}
        <div className="flex flex-col" style={{ gap: 'var(--spacing-2)' }}>
          <h1 
            className="text-center"
            style={{
              color: 'rgba(255, 255, 255, 0.98)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
              fontSize: '2rem',
            }}
          >
            Welcome to Policy Angel
          </h1>
          <p 
            className="text-center"
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
            }}
          >
            Your property guardian is here
          </p>
        </div>

        {/* Email Input Section */}
        <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
          {/* Email Input with Inline Button */}
          <div 
            className="flex items-center backdrop-blur-md"
            style={{
              height: '54px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: 'var(--input-radius-lg)',
              paddingLeft: 'var(--spacing-5)',
              paddingRight: 'var(--spacing-1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              gap: 'var(--spacing-2)',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              className="flex-1 bg-transparent outline-none"
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.98)',
              }}
            />
            
            {/* Inline Enter/Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!email}
              className="flex items-center justify-center transition-all duration-200"
              style={{
                width: '46px',
                height: '46px',
                backgroundColor: !email ? 'rgba(59, 130, 246, 0.5)' : '#3b82f6',
                borderRadius: 'var(--input-radius-md)',
                boxShadow: '0 2px 6px rgba(59, 130, 246, 0.4)',
                cursor: !email ? 'not-allowed' : 'pointer',
              }}
            >
              <ArrowRight className="w-6 h-6" style={{ color: 'rgba(255, 255, 255, 1)' }} />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p 
              className="text-center text-sm"
              style={{
                color: '#ef4444',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
              }}
            >
              {error}
            </p>
          )}

          {/* Remember Me Toggle */}
          <div 
            className="flex items-center justify-center"
            style={{ gap: 'var(--spacing-3)', marginTop: 'var(--spacing-2)' }}
          >
            <label className="flex items-center cursor-pointer" style={{ gap: 'var(--spacing-2)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
                style={{
                  accentColor: '#3b82f6',
                }}
              />
              <span 
                className="text-sm"
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)',
                }}
              >
                Remember me
              </span>
            </label>
          </div>
        </div>

        {/* Privacy Note */}
        <p 
          className="text-center text-xs"
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            marginTop: 'var(--spacing-2)',
          }}
        >
          By continuing, you agree to Policy Angel's Terms of Service and Privacy Policy
        </p>
      </div>

      {/* Language Selector - Bottom of Screen - z-index: 20 */}
      <div
        className="absolute"
        style={{
          bottom: 'var(--spacing-6)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
        }}
      >
        <div className="relative">
          {/* Language Popup */}
          {showLanguagePopup && (
            <div
              className="absolute backdrop-blur-md"
              style={{
                bottom: 'calc(100% + var(--spacing-2))',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                padding: 'var(--spacing-2)',
                minWidth: '120px',
              }}
            >
              <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
                {/* English Option */}
                <button
                  onClick={() => {
                    setSelectedLanguage('en');
                    setShowLanguagePopup(false);
                  }}
                  className="transition-all hover:scale-105 active:scale-95"
                  style={{
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: selectedLanguage === 'en' 
                      ? 'rgba(59, 130, 246, 0.4)' 
                      : 'transparent',
                    color: 'rgba(255, 255, 255, 0.95)',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  English
                </button>

                {/* Spanish Option */}
                <button
                  onClick={() => {
                    setSelectedLanguage('es');
                    setShowLanguagePopup(false);
                  }}
                  className="transition-all hover:scale-105 active:scale-95"
                  style={{
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: selectedLanguage === 'es' 
                      ? 'rgba(59, 130, 246, 0.4)' 
                      : 'transparent',
                    color: 'rgba(255, 255, 255, 0.95)',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  Español
                </button>
              </div>
            </div>
          )}

          {/* Language Selector Button */}
          <button
            onClick={() => setShowLanguagePopup(!showLanguagePopup)}
            className="flex items-center backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            style={{
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-3)',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
            }}
          >
            <Globe className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
            <span
              style={{
                fontSize: 'var(--text-sm)',
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
              }}
            >
              {selectedLanguage === 'en' ? 'English' : 'Español'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}