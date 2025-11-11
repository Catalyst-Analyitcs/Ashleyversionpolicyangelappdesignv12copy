/**
 * ==============================================================================
 * CHATWIDGET.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Stacked card visualization for chat/AI assistant preview on dashboard.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means this stacked card widget is MUCH easier!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: relative, absolute, left-0, right-0, top-0
 *    - Spacing: pt-4, p-4
 *    - Colors: bg-gray-600/40, border-gray-500/50
 *    - Borders: rounded-xl, border
 *    - Z-index: z-10, z-20, z-30
 * 
 * ❌ CONVERT ONLY THESE:
 *    - div → View
 *    - backdrop-blur → BlurView
 *    - Add Pressable wrapper for touch
 *    - Use styled(BlurView) to enable className
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - STACKED CARDS
 * ==============================================================================
 * 
 * BEFORE (Web):
 * ```tsx
 * <div className="relative h-[148px] pt-4">
 *   <div className="absolute left-0 right-0 top-0 z-10">
 *     <div className="bg-gray-600/40 backdrop-blur-sm rounded-xl h-[120px]" />
 *   </div>
 *   <div className="absolute left-0 right-0 top-2 z-20">
 *     <div className="bg-gray-500/40 backdrop-blur-sm rounded-xl h-[120px]" />
 *   </div>
 * </div>
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * import { View, Pressable } from 'react-native';
 * import { BlurView } from 'expo-blur';
 * import { styled } from 'nativewind';
 * 
 * const StyledBlurView = styled(BlurView);
 * 
 * <Pressable onPress={() => navigation.navigate('AIAssistant')}>
 *   <View className="relative h-[148px] pt-4">
 *     <View className="absolute left-0 right-0 top-0 z-10">
 *       <StyledBlurView
 *         intensity={10}
 *         tint="dark"
 *         className="bg-gray-600/40 rounded-xl h-[120px] border border-gray-500/50"
 *       />
 *     </View>
 *     
 *     <View className="absolute left-0 right-0 top-2 z-20">
 *       <StyledBlurView
 *         intensity={15}
 *         tint="dark"
 *         className="bg-gray-500/40 rounded-xl h-[120px] border border-gray-400/50"
 *       />
 *     </View>
 *   </View>
 * </Pressable>
 * ```
 * 
 * KEY POINTS:
 * - ✅ All positioning, z-index, spacing classes work as-is!
 * - ❌ Replace backdrop-blur with BlurView
 * - ✅ Use styled() to enable className on BlurView
 * - ✅ All other Tailwind utilities preserved!
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND CHAT WIDGET
 * ==============================================================================
 * 
 * ```tsx
 * import React from 'react';
 * import { View, Text, Pressable } from 'react-native';
 * import { BlurView } from 'expo-blur';
 * import { styled } from 'nativewind';
 * import { MessageCircle, Sparkles } from 'lucide-react-native';
 * import { useNavigation } from '@react-navigation/native';
 * 
 * const StyledBlurView = styled(BlurView);
 * 
 * export function ChatWidget() {
 *   const navigation = useNavigation();
 *   
 *   return (
 *     <Pressable
 *       onPress={() => navigation.navigate('AIAssistant')}
 *       className={({ pressed }) => `${pressed ? 'opacity-90' : 'opacity-100'}`}
 *     >
 *       <View className="relative h-[148px] pt-4">
 *         // Back card - darkest
 *         <View className="absolute left-0 right-0 top-0 z-10">
 *           <StyledBlurView
 *             intensity={10}
 *             tint="dark"
 *             className="rounded-xl h-[120px] bg-gray-600/40 border border-gray-500/50"
 *           />
 *         </View>
 *         
 *         // Middle card - medium
 *         <View className="absolute left-0 right-0 top-2 z-20">
 *           <StyledBlurView
 *             intensity={15}
 *             tint="dark"
 *             className="rounded-xl h-[120px] bg-gray-500/40 border border-gray-400/50"
 *           />
 *         </View>
 *         
 *         // Front card - lightest with content
 *         <View className="absolute left-0 right-0 top-4 z-30">
 *           <StyledBlurView
 *             intensity={20}
 *             tint="light"
 *             className="rounded-xl h-[120px] bg-white/10 border border-white/20"
 *           >
 *             <View className="flex-1 p-4 flex flex-col justify-between">
 *               // Header with icon
 *               <View className="flex flex-row items-center gap-2">
 *                 <View className="bg-pa-gold rounded-full p-2">
 *                   <Sparkles size={20} color="#000000" />
 *                 </View>
 *                 <View className="flex-1">
 *                   <Text className="text-white font-semibold text-base">
 *                     PolicyAngel AI
 *                   </Text>
 *                   <Text className="text-white/60 text-xs">
 *                     Ask me anything
 *                   </Text>
 *                 </View>
 *               </View>
 *               
 *               // Preview message
 *               <View className="bg-white/5 rounded-lg p-3">
 *                 <Text className="text-white/80 text-sm">
 *                   "How can I help with your property today?"
 *                 </Text>
 *               </View>
 *             </View>
 *           </StyledBlurView>
 *         </View>
 *       </View>
 *     </Pressable>
 *   );
 * }
 * 
 * // USAGE:
 * 
 * // On dashboard
 * import { ChatWidget } from './components/ChatWidget';
 * 
 * <View className="px-6 py-4">
 *   <ChatWidget />
 * </View>
 * ```
 * 
 * ==============================================================================
 * NATIVEWIND - ANIMATION VARIANT
 * ==============================================================================
 * 
 * Add subtle animations for polish:
 * 
 * ```tsx
 * import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
 * import { useState } from 'react';
 * 
 * export function AnimatedChatWidget() {
 *   const [pressed, setPressed] = useState(false);
 *   
 *   const animatedStyle = useAnimatedStyle(() => ({
 *     transform: [
 *       { scale: withSpring(pressed ? 0.98 : 1) }
 *     ],
 *   }));
 *   
 *   return (
 *     <Pressable
 *       onPressIn={() => setPressed(true)}
 *       onPressOut={() => setPressed(false)}
 *     >
 *       <Animated.View style={animatedStyle}>
 *         <View className="relative h-[148px] pt-4">
 *           // Stacked cards here
 *         </View>
 *       </Animated.View>
 *     </Pressable>
 *   );
 * }
 * ```
 * 
 * ==============================================================================
 * REQUIRED PACKAGES
 * ==============================================================================
 * 
 * ```bash
 * npm install nativewind
 * npm install expo-blur
 * npm install lucide-react-native
 * npm install @react-navigation/native
 * npm install react-native-reanimated  # For animations
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * ==============================================================================
 * LEGACY DETAILED ANNOTATIONS (Pre-NativeWind)
 * ==============================================================================
 * 
 * TESTING CHECKLIST:
 * - [ ] Stacked effect visible
 * - [ ] Blur effect works
 * - [ ] Touch opens chat
 * - [ ] iOS and Android compatible
 * 
 * ==============================================================================
 */

import { FileText } from "lucide-react";
import { Card } from "./ui/card";

export function ChatWidget() {
  return (
    <div 
      className="relative" 
      style={{ 
        height: '148px', 
        paddingTop: 'var(--spacing-4)' 
      }}
    >
      {/* Back card - darkest */}
      <div 
        className="absolute left-0 right-0 top-0"
        style={{ zIndex: 1 }}
      >
        <Card 
          className="bg-gray-600/40 border-gray-500/50 backdrop-blur-sm"
          style={{
            borderRadius: 'var(--chat-card-radius)',
            height: 'var(--chat-card-height)',
          }}
        />
      </div>
      
      {/* Middle card - medium */}
      <div 
        className="absolute left-0 right-0"
        style={{ 
          top: 'var(--chat-card-offset)',
          zIndex: 2,
        }}
      >
        <Card 
          className="bg-gray-500/50 border-gray-400/50 backdrop-blur-sm"
          style={{
            borderRadius: 'var(--chat-card-radius)',
            height: 'var(--chat-card-height)',
          }}
        />
      </div>
      
      {/* Front card - lightest with content */}
      <div 
        className="relative"
        style={{ 
          marginTop: 'var(--spacing-4)',
          zIndex: 3,
        }}
      >
        <Card 
          className="bg-white/90 border-gray-300"
          style={{
            borderRadius: 'var(--chat-card-radius)',
            height: 'var(--chat-card-height)',
            padding: 'var(--chat-card-padding)',
          }}
        >
          <div className="flex flex-col h-full">
            <div 
              className="flex items-center" 
              style={{ 
                gap: 'var(--spacing-2)',
                marginBottom: 'var(--spacing-3)' 
              }}
            >
              <div 
                className="bg-blue-500/20 flex items-center justify-center w-10 h-10"
                style={{ borderRadius: 'var(--spacing-3)' }}
              >
                <FileText className="text-blue-600 w-5 h-5" />
              </div>
              <label className="text-gray-400">Filed Documents</label>
            </div>
            <h3 
              className="text-gray-900" 
              style={{ marginBottom: 'var(--spacing-1)' }}
            >
              View Policy
            </h3>
            <p className="text-gray-600">Check coverage & renewal</p>
          </div>
        </Card>
      </div>
    </div>
  );
}