/**
 * ==============================================================================
 * PHOTOCAPTURESCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Professional camera interface for property damage documentation
 * with manual controls, RAW capture, grid overlay, and AI-assisted photo quality.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means 75% of this screen works as-is!
 * 
 * ✅ KEEP AS-IS (75% of styles):
 *    - ALL className Tailwind utilities work!
 *    - Control overlays: absolute, top-4, bottom-4
 *    - Button styles: rounded-full, bg-pa-gold
 *    - Icon positioning: flex-row, items-center, gap-2
 *    - Sliders: all positioning classes work
 * 
 * ❌ CONVERT ONLY THESE:
 *    - Camera component (react-native-vision-camera or expo-camera)
 *    - Permissions (expo-permissions)
 *    - Slider component (@react-native-community/slider)
 *    - File system (expo-file-system)
 * 
 * SPECIFIC CONVERSIONS:
 * 
 * Camera with NativeWind:
 *   - Use react-native-vision-camera or expo-camera
 *   - All overlay controls use className
 *   - Positioning: absolute, top-0, bottom-8
 *   - All Tailwind classes work on View components
 * 
 * Manual controls:
 *   - Use Slider from @react-native-community/slider
 *   - Wrapper View with all Tailwind utilities
 *   - bg-black/60, rounded-xl, p-4, backdrop-blur
 * 
 * Capture button:
 *   - Pressable with NativeWind classes
 *   - rounded-full, bg-white, border-4, border-pa-gold
 *   - Haptic feedback on press
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CAMERA LIBRARY:
 *    - Use react-native-vision-camera (recommended)
 *    - Or expo-camera for simpler use case
 *    - Supports manual controls, RAW, HDR
 * 
 * 2. CAMERA FEATURES:
 *    - Manual focus, exposure, ISO, shutter speed
 *    - White balance presets
 *    - Flash modes (auto/on/off)
 *    - Grid overlay
 *    - Zoom controls
 * 
 * 3. CAMERA PERMISSIONS:
 *    - Request camera permission on mount
 *    - Handle permission denied gracefully
 * 
 * 4. PHOTO CAPTURE:
 *    - Capture photo with settings
 *    - Save to device + upload to server
 *    - Show preview before saving
 * 
 * 5. AI FEATURES:
 *    - Photo quality analysis
 *    - Damage detection overlay
 *    - Guided photo capture
 * 
 * ==============================================================================
 * REQUIRED API ENDPOINTS
 * ==============================================================================
 * 
 * 1. POST /api/photos/upload
 *    Upload captured photo
 * 
 * 2. POST /api/photos/analyze
 *    AI analysis for quality and damage detection
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT MAPPING
 * ==============================================================================
 * 
 * - div → View
 * - Camera preview → Camera component
 * - button → TouchableOpacity
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Camera opens with permission
 * - [ ] Photo capture works
 * - [ ] Manual controls functional
 * - [ ] Grid overlay displays
 * - [ ] Flash works
 * - [ ] RAW capture (if supported)
 * - [ ] Preview shows after capture
 * - [ ] Save to gallery works
 * - [ ] Upload to server works
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, PermissionsAndroid } from 'react-native';
// RN: import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
// RN: import { Slider } from '@react-native-community/slider';
// RN: import Animated, { FadeIn, FadeOut, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// RN: import * as Haptics from 'expo-haptics';
// RN: import RNFS from 'react-native-fs';

import React, { useState } from 'react';
// RN: import { useRef, useEffect, useCallback } from 'react';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { ArrowLeft, RotateCcw, Cloud, Settings, Grid, Focus, BarChart3, Camera, Zap, ZapOff, Timer, Scan, FileText, Box, Sparkles, ChevronDown, ChevronUp, Eye, Shield, SearchCheck } from 'lucide-react';

// RN: ImageWithFallback → FastImage
// RN: import FastImage from 'react-native-fast-image';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// RN: Import logo as asset
// RN: import policyAngelLogo from '../assets/images/logo.png';
import policyAngelLogo from "figma:asset/66283e8dafc3c31c277ce6add3d2f6d9caa6369b.png";

interface PhotoCaptureScreenProps {
  onBack?: () => void;
  onOpenGallery?: () => void;
  // RN: navigation: NavigationProp<any>;
  // RN: route: RouteProp<any, 'PhotoCapture'>;
}

// RN: ==============================================================================
// RN: COMPONENT STATE & REFS
// RN: ==============================================================================
export function PhotoCaptureScreen({ onBack, onOpenGallery }: PhotoCaptureScreenProps) {
  // RN: const navigation = useNavigation();
  // RN: const cameraRef = useRef<Camera>(null);
  // RN: const devices = useCameraDevices();
  // RN: const device = devices.back;
  
  const [isRaw, setIsRaw] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [whiteBalance, setWhiteBalance] = useState('CLOUDY');
  const [focusMode, setFocusMode] = useState('AF');
  const [flashMode, setFlashMode] = useState<'auto' | 'on' | 'off'>('off');
  const [exposure, setExposure] = useState(0);
  const [iso, setIso] = useState(400);
  const [shutterSpeed, setShutterSpeed] = useState('1/125');
  const [showSettings, setShowSettings] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isAIActionsExpanded, setIsAIActionsExpanded] = useState(true);
  const [isControlsExpanded, setIsControlsExpanded] = useState(true);
  
  // RN: const [hasPermission, setHasPermission] = useState(false);
  // RN: const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  // RN: const [isCapturing, setIsCapturing] = useState(false);
  // RN: const [zoom, setZoom] = useState(1);
  // RN:
  // RN: // Request camera permissions on mount
  // RN: useEffect(() => {
  // RN:   (async () => {
  // RN:     const cameraPermission = await Camera.requestCameraPermission();
  // RN:     const microphonePermission = await Camera.requestMicrophonePermission();
  // RN:     setHasPermission(
  // RN:       cameraPermission === 'authorized' && 
  // RN:       microphonePermission === 'authorized'
  // RN:     );
  // RN:   })();
  // RN: }, []);
  // RN:
  // RN: // Take photo handler
  // RN: const handleTakePhoto = useCallback(async () => {
  // RN:   if (!cameraRef.current || isCapturing) return;
  // RN:   
  // RN:   try {
  // RN:     setIsCapturing(true);
  // RN:     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  // RN:     
  // RN:     // Wait for timer if set
  // RN:     if (timerSeconds > 0) {
  // RN:       await new Promise(resolve => setTimeout(resolve, timerSeconds * 1000));
  // RN:     }
  // RN:     
  // RN:     const photo = await cameraRef.current.takePhoto({
  // RN:       flash: flashMode,
  // RN:       enableAutoRedEyeReduction: true,
  // RN:       enableAutoStabilization: true,
  // RN:       qualityPrioritization: 'quality',
  // RN:     });
  // RN:     
  // RN:     setCapturedPhoto(photo.path);
  // RN:     
  // RN:     // Upload to server
  // RN:     await uploadPhoto(photo.path);
  // RN:     
  // RN:   } catch (error) {
  // RN:     console.error('Photo capture failed:', error);
  // RN:   } finally {
  // RN:     setIsCapturing(false);
  // RN:   }
  // RN: }, [flashMode, timerSeconds, isCapturing]);
  // RN:
  // RN: // Upload photo to server
  // RN: const uploadPhoto = async (photoPath: string) => {
  // RN:   const formData = new FormData();
  // RN:   formData.append('photo', {
  // RN:     uri: `file://${photoPath}`,
  // RN:     type: 'image/jpeg',
  // RN:     name: `photo_${Date.now()}.jpg`,
  // RN:   });
  // RN:   
  // RN:   await fetch('https://api.policyangel.com/api/photos/upload', {
  // RN:     method: 'POST',
  // RN:     body: formData,
  // RN:   });
  // RN: };

  // RN: Check permissions
  // RN: if (!hasPermission) {
  // RN:   return (
  // RN:     <View style={styles.permissionContainer}>
  // RN:       <Icon name="camera-off" size={48} color="#ffffff" />
  // RN:       <Text style={styles.permissionText}>
  // RN:         Camera permission is required
  // RN:       </Text>
  // RN:       <TouchableOpacity
  // RN:         style={styles.permissionButton}
  // RN:         onPress={() => Camera.requestCameraPermission()}
  // RN:       >
  // RN:         <Text style={styles.permissionButtonText}>Grant Permission</Text>
  // RN:       </TouchableOpacity>
  // RN:     </View>
  // RN:   );
  // RN: }
  // RN:
  // RN: if (device == null) return <View style={styles.loadingContainer} />;

  return (
    // RN: ROOT CONTAINER WITH CAMERA
    // RN: <View style={styles.container}>
    // RN:   {/* Camera Component */}
    // RN:   <Camera
    // RN:     ref={cameraRef}
    // RN:     style={StyleSheet.absoluteFill}
    // RN:     device={device}
    // RN:     isActive={true}
    // RN:     photo={true}
    // RN:     enableZoomGesture={true}
    // RN:     zoom={zoom}
    // RN:     exposure={exposure}
    // RN:     format={device.formats.find(f => f.photoHeight === 4000)} // High res
    // RN:   />
    <div 
      className="w-full h-full relative flex flex-col"
      style={{
        backgroundColor: '#000',
      }}
    >
      {/* CAMERA VIEWFINDER
       * RN: The camera preview is the native Camera component above
       * RN: This placeholder image is only for web preview
       */}
      <div className="absolute inset-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1707317683665-972a5561c74e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwc3Rvcm0lMjBkYW1hZ2V8ZW58MXx8fHwxNzYxMzQ3ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Camera viewfinder"
          className="w-full h-full object-cover"
        />
      </div>

      {/* GRID OVERLAY */}
      {/* RN: Rule of thirds grid overlay
       RN: {showGrid && (
       RN:   <View style={styles.gridOverlay} pointerEvents="none">
       RN:     [Vertical lines]
       RN:     <View style={[styles.gridLine, styles.gridLineVertical, { left: '33.33%' }]} />
       RN:     <View style={[styles.gridLine, styles.gridLineVertical, { left: '66.66%' }]} />
       RN:     [Horizontal lines]
       RN:     <View style={[styles.gridLine, styles.gridLineHorizontal, { top: '33.33%' }]} />
       RN:     <View style={[styles.gridLine, styles.gridLineHorizontal, { top: '66.66%' }]} />
       RN:   </View>
       RN: )}
       RN:
       RN: StyleSheet:
       RN: gridOverlay: {
       RN:   ...StyleSheet.absoluteFillObject,
       RN:   zIndex: 5,
       RN: },
       RN: gridLine: {
       RN:   position: 'absolute',
       RN:   backgroundColor: 'rgba(255, 255, 255, 0.2)',
       RN: },
       RN: gridLineVertical: {
       RN:   width: 1,
       RN:   height: '100%',
       RN: },
       RN: gridLineHorizontal: {
       RN:   width: '100%',
       RN:   height: 1,
       RN: }
       */}
      {showGrid && (
        <div 
          className="absolute inset-0 pointer-events-none z-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '33.33% 33.33%',
          }}
        />
      )}

      {/* EXPOSURE METER - TOP RIGHT
       * RN: Display camera settings (ISO, Shutter Speed, Exposure Value)
       * RN: <Animated.View
       * RN:   entering={FadeIn}
       * RN:   style={[
       * RN:     styles.exposureMeter,
       * RN:     { top: insets.top + 16, right: 20 }
       * RN:   ]}
       * RN: >
       * RN:   <View style={styles.meterRow}>
       * RN:     <Text style={styles.meterLabel}>ISO</Text>
       * RN:     <Text style={styles.meterValue}>{iso}</Text>
       * RN:   </View>
       * RN:   <View style={styles.meterRow}>
       * RN:     <Text style={styles.meterLabel}>SS</Text>
       * RN:     <Text style={styles.meterValue}>{shutterSpeed}</Text>
       * RN:   </View>
       * RN:   <View style={styles.meterRow}>
       * RN:     <Text style={styles.meterLabel}>EV</Text>
       * RN:     <Text style={styles.meterValue}>
       * RN:       {exposure >= 0 ? '+' : ''}{exposure.toFixed(1)}
       * RN:     </Text>
       * RN:   </View>
       * RN: </Animated.View>
       */}
      <div 
        className="absolute z-10"
        style={{
          top: 'calc(env(safe-area-inset-top, 0px) + var(--spacing-4))',
          right: 'var(--spacing-5)',
        }}
      >
        <div 
          className="flex flex-col items-end backdrop-blur-md"
          style={{
            gap: 'var(--spacing-1)',
            padding: 'var(--spacing-2)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>ISO</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 1)' }}>{iso}</span>
          </div>
          <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>SS</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 1)' }}>{shutterSpeed}</span>
          </div>
          <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>EV</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 1)' }}>
              {exposure >= 0 ? '+' : ''}{exposure.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Focus Reticle - Center */}
      <div 
        className="absolute z-5 pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className="relative"
          style={{
            width: '80px',
            height: '80px',
          }}
        >
          {/* Corner Brackets */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '20px',
            height: '20px',
            borderTop: '2px solid rgba(234, 179, 8, 0.9)',
            borderLeft: '2px solid rgba(234, 179, 8, 0.9)',
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '20px',
            height: '20px',
            borderTop: '2px solid rgba(234, 179, 8, 0.9)',
            borderRight: '2px solid rgba(234, 179, 8, 0.9)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '20px',
            height: '20px',
            borderBottom: '2px solid rgba(234, 179, 8, 0.9)',
            borderLeft: '2px solid rgba(234, 179, 8, 0.9)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '20px',
            height: '20px',
            borderBottom: '2px solid rgba(234, 179, 8, 0.9)',
            borderRight: '2px solid rgba(234, 179, 8, 0.9)',
          }} />
        </div>
      </div>

      {/* Top Status Bar */}
      <div 
        className="absolute top-0 left-0 right-0 z-10 flex flex-col"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + var(--spacing-4))',
        }}
      >
        {/* Collapsible AI Actions Header with Toggle Button */}
        <div className="relative flex flex-col items-center" style={{ paddingLeft: 'var(--spacing-5)', paddingRight: 'var(--spacing-5)' }}>
          {/* Toggle Button - Always Visible, Centered at Top */}
          <div className="flex justify-center" style={{ paddingBottom: 'var(--spacing-2)' }}>
            <button
              onClick={() => setIsAIActionsExpanded(!isAIActionsExpanded)}
              className="backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              style={{
                width: '56px',
                height: '28px',
                borderRadius: 'var(--input-radius-sm)',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: 'var(--spacing-1)',
              }}
            >
              {/* Logo Image */}
              <img 
                src={policyAngelLogo} 
                alt="PolicyAngel"
                style={{
                  height: '16px',
                  width: 'auto',
                  objectFit: 'contain',
                  opacity: 0.9,
                }}
              />
              
              {/* Chevron Icon - Positioned on right side */}
              <div 
                className="absolute"
                style={{ 
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                {isAIActionsExpanded ? (
                  <ChevronUp className="w-3 h-3" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                ) : (
                  <ChevronDown className="w-3 h-3" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                )}
              </div>
            </button>
          </div>

          {/* Collapsible AI Actions Header */}
          <div
            className="overflow-hidden transition-all w-full"
            style={{
              maxHeight: isAIActionsExpanded ? '280px' : '0px',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-in-out',
            }}
          >
            {/* Top Section: Large Card + 3 Small Action Cards */}
            <div
              className="grid grid-cols-[1.8fr_0.9fr]"
              style={{ gap: 'var(--spacing-3)', paddingTop: 'var(--spacing-4)', paddingBottom: 'var(--spacing-5)' }}
            >
              {/* Large Card with AI Detection - Left */}
              <button
                className="ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent backdrop-blur-md transition-all active:scale-95"
                style={{
                  aspectRatio: '1',
                  borderRadius: 'var(--radius-2xl)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* AI Damage Detection */}
                <div className="w-full h-full flex flex-col items-center justify-center" style={{ gap: 'var(--spacing-3)' }}>
                  <Sparkles
                    className="w-12 h-12"
                    style={{ color: '#60a5fa' }}
                  />
                  <div className="text-center">
                    <div
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'rgba(255, 255, 255, 1)',
                        marginBottom: 'var(--spacing-1)',
                      }}
                    >
                      AI Damage Scan
                    </div>
                    <div
                      className="flex items-center justify-center"
                      style={{ gap: 'var(--spacing-2)' }}
                    >
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#34d399',
                        }}
                      />
                      <span
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        Ready
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* 3 Small Action Cards - Right */}
              <div
                className="flex flex-col justify-between"
                style={{ gap: 'var(--spacing-3)' }}
              >
                {/* Document Scan Card */}
                <button
                  className="backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                  style={{
                    flex: 1,
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    padding: 'var(--spacing-3)',
                  }}
                >
                  <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                    <span
                      className="truncate"
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'rgba(255, 255, 255, 1)',
                      }}
                    >
                      Document
                    </span>
                  </div>
                </button>

                {/* 3D Scan Card */}
                <button
                  className="backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                  style={{
                    flex: 1,
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    padding: 'var(--spacing-3)',
                  }}
                >
                  <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
                    <Box className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                    <span
                      className="truncate"
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'rgba(255, 255, 255, 1)',
                      }}
                    >
                      3D Scan
                    </span>
                  </div>
                </button>

                {/* Smart Analysis Card */}
                <button
                  className="backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                  style={{
                    flex: 1,
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    padding: 'var(--spacing-3)',
                  }}
                >
                  <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
                    <SearchCheck className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                    <span
                      className="truncate"
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'rgba(255, 255, 255, 1)',
                      }}
                    >
                      Analyze
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Camera Status Bar */}
        <div 
          className="flex items-center justify-between"
          style={{
            padding: 'var(--spacing-4) var(--spacing-5)',
          }}
        >
          {/* Left: Flash & Timer */}
          <div className="flex items-center" style={{ gap: 'var(--spacing-3)' }}>
            {/* Flash Indicator */}
            <button 
              onClick={() => {
                const modes: ('auto' | 'on' | 'off')[] = ['off', 'auto', 'on'];
                const currentIndex = modes.indexOf(flashMode);
                setFlashMode(modes[(currentIndex + 1) % modes.length]);
              }}
              className="transition-all active:scale-95"
            >
              {flashMode === 'off' ? (
                <ZapOff className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
              ) : (
                <Zap className="w-5 h-5" style={{ color: flashMode === 'auto' ? 'rgba(234, 179, 8, 1)' : 'rgba(255, 255, 255, 1)' }} />
              )}
            </button>

            {/* Timer */}
            <button 
              onClick={() => {
                const timers = [0, 3, 10];
                const currentIndex = timers.indexOf(timerSeconds);
                setTimerSeconds(timers[(currentIndex + 1) % timers.length]);
              }}
              className="transition-all active:scale-95 flex items-center"
              style={{ gap: 'var(--spacing-1)' }}
            >
              <Timer className="w-5 h-5" style={{ color: timerSeconds > 0 ? 'rgba(234, 179, 8, 1)' : 'rgba(255, 255, 255, 0.5)' }} />
              {timerSeconds > 0 && (
                <span style={{ fontSize: '0.75rem', color: 'rgba(234, 179, 8, 1)' }}>{timerSeconds}s</span>
              )}
            </button>
          </div>

          {/* Center: Recording/Exposure Indicator */}
          <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
            <div 
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            />
            <span 
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
              }}
            >
              0.0
            </span>
          </div>

          {/* Right: Placeholder for balance */}
          <div style={{ width: '80px' }} />
        </div>
      </div>

      {/* Viewfinder Overlay Controls - Middle of Screen */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between" style={{ padding: 'var(--spacing-5)', paddingBottom: '320px' }}>
        {/* Left: Levels/Audio */}
        <button 
          className="transition-all active:scale-95"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BarChart3 className="w-6 h-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
        </button>

        {/* Center: Grid */}
        <button 
          onClick={() => setShowGrid(!showGrid)}
          className="transition-all active:scale-95"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid className="w-6 h-6" style={{ color: showGrid ? '#3b82f6' : 'rgba(255, 255, 255, 0.9)' }} />
        </button>

        {/* Right: Focus */}
        <button 
          className="transition-all active:scale-95"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Focus className="w-6 h-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
        </button>
      </div>

      {/* Control Panel - Bottom Section */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-10 flex flex-col backdrop-blur-md transition-all"
        style={{
          backgroundColor: 'var(--glass-bg)',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--spacing-4))',
        }}
      >
        {/* Collapse/Expand Tab */}
        <div className="flex justify-center" style={{ paddingTop: 'var(--spacing-2)', paddingBottom: 'var(--spacing-1)' }}>
          <button
            onClick={() => setIsControlsExpanded(!isControlsExpanded)}
            className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            style={{
              width: '48px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: isControlsExpanded ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)',
              transition: 'all 300ms ease-in-out',
            }}
          />
        </div>

        {/* Collapsible Content */}
        <div
          className="overflow-hidden transition-all"
          style={{
            maxHeight: isControlsExpanded ? '500px' : '0px',
            opacity: isControlsExpanded ? 1 : 0,
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out',
            pointerEvents: isControlsExpanded ? 'auto' : 'none',
          }}
        >
          {/* Top Controls Row */}
          <div 
            className="flex items-center justify-around"
            style={{
              padding: 'var(--spacing-4) var(--spacing-5)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="transition-all active:scale-95"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                paddingTop: 'var(--spacing-2)',
                paddingBottom: 'var(--spacing-2)',
                paddingLeft: 'var(--spacing-3)',
                paddingRight: 'var(--spacing-4)',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 1)' }} />
              <span
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'rgba(255, 255, 255, 1)',
                }}
              >
                Back
              </span>
            </button>

            {/* RAW Toggle */}
            <button 
              onClick={() => setIsRaw(!isRaw)}
              className="transition-all active:scale-95"
              style={{
                padding: 'var(--spacing-1) var(--spacing-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: isRaw ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              }}
            >
              <span 
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                RAW
              </span>
            </button>

            {/* Rotate/Timer */}
            <button className="transition-all active:scale-95">
              <RotateCcw className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
            </button>

            {/* Cloud */}
            <button className="transition-all active:scale-95">
              <Cloud className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
            </button>

            {/* Settings */}
            <button className="transition-all active:scale-95">
              <Settings className="w-6 h-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
            </button>
          </div>

          {/* Capture Row */}
          <div 
            className="flex items-center justify-between"
            style={{
              padding: 'var(--spacing-6) var(--spacing-5)',
            }}
          >
            {/* Left: Focus Mode Indicator */}
            <div className="flex items-center" style={{ gap: 'var(--spacing-2)', minWidth: '80px' }}>
              <div 
                className="flex items-center justify-center"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '2px solid rgba(234, 179, 8, 0.8)',
                  backgroundColor: 'rgba(234, 179, 8, 0.15)',
                }}
              >
                <span 
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(234, 179, 8, 1)',
                  }}
                >
                  {focusMode}
                </span>
              </div>
            </div>

            {/* Center: Shutter Button and White Balance */}
            <div className="flex flex-col items-center" style={{ gap: 'var(--spacing-2)' }}>
              {/* White Balance Label */}
              <span 
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  letterSpacing: '0.1em',
                }}
              >
                {whiteBalance}
              </span>

              {/* Shutter Button */}
              <button 
                className="transition-all active:scale-95"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: '4px solid rgba(255, 255, 255, 1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    inset: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  }}
                />
              </button>
            </div>

            {/* Right: Gallery Preview */}
            <div className="flex items-center justify-end" style={{ minWidth: '80px' }}>
              <button 
                className="transition-all active:scale-95"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
                onClick={onOpenGallery}
              >
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1648840887119-a9d33c964054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGV4dGVyaW9yJTIwcHJvcGVydHl8ZW58MXx8fHwxNzYxMzQ3NzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Last photo"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Consolidated/Compact View - Shown when collapsed */}
        <div
          className="overflow-hidden transition-all"
          style={{
            maxHeight: !isControlsExpanded ? '120px' : '0px',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out',
          }}
        >
          <div 
            className="flex items-center justify-between"
            style={{
              padding: 'var(--spacing-5)',
            }}
          >
            {/* Left: Back Button */}
            <button 
              onClick={onBack}
              className="transition-all active:scale-95"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 1)' }} />
            </button>

            {/* Center: Shutter Button */}
            <button 
              className="transition-all active:scale-95"
              style={{ 
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                border: '4px solid rgba(255, 255, 255, 1)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                position: 'relative',
              }}
            >
              <div 
                style={{ 
                  position: 'absolute',
                  inset: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                }}
              />
            </button>

            {/* Right: Gallery Preview */}
            <button 
              className="transition-all active:scale-95"
              style={{ 
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
              onClick={onOpenGallery}
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1648840887119-a9d33c964054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGV4dGVyaW9yJTIwcHJvcGVydHl8ZW58MXx8fHwxNzYxMzQ3NzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Last photo"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}