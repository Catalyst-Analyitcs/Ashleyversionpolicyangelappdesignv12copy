/**
 * ==============================================================================
 * BESTPRACTICESSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Educational content screen with property maintenance best practices,
 * safety guides, insurance tips, and preventative care checklists. Features
 * expandable categories with rich content, images, and actionable checklists.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CATEGORY ACCORDION:
 *    - Expandable/collapsible sections
 *    - Animated transitions
 *    - Category icons with colors
 *    - Practice checklists
 * 
 * 2. CONTENT TYPES:
 *    - Rich text content
 *    - Images with captions
 *    - Interactive checklists
 *    - Video embeds (optional)
 *    - PDF downloads
 * 
 * 3. SEARCH & FILTER:
 *    - Search practices
 *    - Filter by category
 *    - Bookmark favorites
 * 
 * 4. OFFLINE SUPPORT:
 *    - Cache content locally
 *    - Download for offline viewing
 *    - AsyncStorage for bookmarks
 * 
 * 5. SHARING:
 *    - Share practices via email/SMS
 *    - Export as PDF
 *    - Social media sharing
 * 
 * ==============================================================================
 * REQUIRED API ENDPOINTS
 * ==============================================================================
 * 
 * 1. GET /api/best-practices
 *    Returns: {
 *      categories: [{
 *        id: string,
 *        title: string,
 *        description: string,
 *        icon: string,
 *        color: string,
 *        image: string,
 *        practices: [{
 *          id: string,
 *          title: string,
 *          description: string,
 *          importance: 'critical' | 'high' | 'medium' | 'low',
 *          frequency: string,
 *          estimatedCost?: string,
 *          resources?: string[]
 *        }],
 *        articles?: Article[],
 *        videos?: Video[]
 *      }]
 *    }
 * 
 * 2. GET /api/best-practices/:categoryId
 *    Returns: Full category details
 * 
 * 3. POST /api/best-practices/bookmark
 *    Body: { practiceId, userId }
 *    Saves favorite practice
 * 
 * 4. GET /api/best-practices/bookmarks
 *    Returns: User's bookmarked practices
 * 
 * 5. GET /api/best-practices/search?q={query}
 *    Returns: Matching practices
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Categories load from API
 * - [ ] Accordion expand/collapse works
 * - [ ] Images load and display
 * - [ ] Checklists are interactive
 * - [ ] Search functionality works
 * - [ ] Bookmarking works
 * - [ ] Offline caching functional
 * - [ ] Content is scrollable
 * - [ ] Animations are smooth
 * - [ ] Share feature works
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, ScrollView, TouchableOpacity, Image, Share } from 'react-native';
// RN: import { Accordion } from 'react-native-accordion-list-view';
// RN: import AsyncStorage from '@react-native-async-storage/async-storage';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { Shield, CheckCircle2, AlertTriangle, Home, Wrench, Droplet, Zap, Flame, Wind, Lock } from "lucide-react";

// RN: Motion → react-native-reanimated
// RN: import Animated, { 
// RN:   FadeInDown, 
// RN:   useAnimatedStyle, 
// RN:   withSpring, 
// RN:   useSharedValue 
// RN: } from 'react-native-reanimated';
import { motion } from "motion/react";

// RN: ImageWithFallback → FastImage or Image
// RN: import FastImage from 'react-native-fast-image';
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import { useState } from "react";
// RN: import { useEffect, useCallback } from "react";

// RN: ==============================================================================
// RN: INTERFACES
// RN: ==============================================================================
// RN: interface BestPractice {
// RN:   id: string;
// RN:   title: string;
// RN:   description: string;
// RN:   importance: 'critical' | 'high' | 'medium' | 'low';
// RN:   frequency: string; // 'monthly', 'annually', etc.
// RN:   estimatedCost?: string;
// RN:   estimatedTime?: string;
// RN:   resources?: Resource[];
// RN: }
// RN:
// RN: interface PracticeCategory {
// RN:   id: string;
// RN:   title: string;
// RN:   description: string;
// RN:   icon: string;
// RN:   color: string;
// RN:   image: string;
// RN:   practices: BestPractice[];
// RN:   articles?: Article[];
// RN:   videos?: Video[];
// RN: }
// RN:
// RN: interface Resource {
// RN:   type: 'article' | 'video' | 'pdf' | 'link';
// RN:   title: string;
// RN:   url: string;
// RN: }

// RN: ==============================================================================
// RN: COMPONENT DEFINITION
// RN: ==============================================================================
export function BestPracticesScreen() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  // RN: const [searchQuery, setSearchQuery] = useState('');
  // RN: const [bookmarkedPractices, setBookmarkedPractices] = useState<string[]>([]);
  // RN: const [refreshing, setRefreshing] = useState(false);
  
  // RN: // TanStack Query for best practices
  // RN: const { data: categories, isLoading, refetch } = useQuery({
  // RN:   queryKey: ['best-practices'],
  // RN:   queryFn: bestPracticesApi.getCategories
  // RN: });
  // RN:
  // RN: // Load bookmarked practices from AsyncStorage
  // RN: useEffect(() => {
  // RN:   loadBookmarks();
  // RN: }, []);
  // RN:
  // RN: const loadBookmarks = async () => {
  // RN:   try {
  // RN:     const saved = await AsyncStorage.getItem('bookmarked_practices');
  // RN:     if (saved) setBookmarkedPractices(JSON.parse(saved));
  // RN:   } catch (error) {
  // RN:     console.error('Failed to load bookmarks', error);
  // RN:   }
  // RN: };
  // RN:
  // RN: const toggleBookmark = async (practiceId: string) => {
  // RN:   const updated = bookmarkedPractices.includes(practiceId)
  // RN:     ? bookmarkedPractices.filter(id => id !== practiceId)
  // RN:     : [...bookmarkedPractices, practiceId];
  // RN:   
  // RN:   setBookmarkedPractices(updated);
  // RN:   await AsyncStorage.setItem('bookmarked_practices', JSON.stringify(updated));
  // RN: };
  // RN:
  // RN: const handleShare = async (practice: BestPractice) => {
  // RN:   try {
  // RN:     await Share.share({
  // RN:       message: `${practice.title}\n\n${practice.description}`,
  // RN:       title: 'Best Practice'
  // RN:     });
  // RN:   } catch (error) {
  // RN:     console.error('Share failed', error);
  // RN:   }
  // RN: };

  const categories = [
    {
      id: 'fire-safety',
      title: 'Fire Safety',
      icon: <Flame />,
      color: '#ef4444',
      image: 'https://images.unsplash.com/photo-1589992607988-4ecad29e47e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwc2FmZXR5JTIwZGV0ZWN0b3J8ZW58MXx8fHwxNzYyMjg4NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      practices: [
        'Test smoke detectors monthly',
        'Replace detector batteries annually',
        'Keep fire extinguisher accessible',
        'Create and practice escape plan',
        'Clear clutter from exits',
      ]
    },
    {
      id: 'water-damage',
      title: 'Water Damage Prevention',
      icon: <Droplet />,
      color: '#3b82f6',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGVzJTIwcGx1bWJpbmd8ZW58MXx8fHwxNzYyMjg4NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      practices: [
        'Inspect roof and gutters regularly',
        'Check for leaks under sinks',
        'Maintain proper grading around foundation',
        'Service water heater annually',
        'Know location of main water shutoff',
      ]
    },
    {
      id: 'electrical',
      title: 'Electrical Safety',
      icon: <Zap />,
      color: '#f59e0b',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcGFuZWwlMjBzYWZldHl8ZW58MXx8fHwxNzYyMjg4NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      practices: [
        'Avoid overloading outlets',
        'Replace frayed electrical cords',
        'Install GFCI outlets near water',
        'Schedule electrical inspections',
        'Use surge protectors for electronics',
      ]
    },
    {
      id: 'weather',
      title: 'Weather Preparedness',
      icon: <Wind />,
      color: '#8b5cf6',
      image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9ybSUyMHdlYXRoZXIlMjBwcmVwYXJlZG5lc3N8ZW58MXx8fHwxNzYyMjg4NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      practices: [
        'Trim trees near house',
        'Secure outdoor furniture before storms',
        'Inspect and repair roof damage',
        'Clean drains and downspouts',
        'Stock emergency supplies',
      ]
    },
    {
      id: 'security',
      title: 'Home Security',
      icon: <Lock />,
      color: '#10b981',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwc2VjdXJpdHklMjBsb2NrfGVufDF8fHx8MTc2MjI4ODU3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      practices: [
        'Install deadbolt locks on doors',
        'Ensure windows have secure locks',
        'Use motion-sensor lighting',
        'Consider security system installation',
        'Keep valuables documented and stored',
      ]
    },
    {
      id: 'maintenance',
      title: 'Regular Maintenance',
      icon: <Wrench />,
      color: '#ec4899',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwbWFpbnRlbmFuY2UlMjB0b29sc3xlbnwxfHx8fDE3NjIyODg1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      practices: [
        'Service HVAC system biannually',
        'Clean dryer vent regularly',
        'Inspect foundation for cracks',
        'Test sump pump before rainy season',
        'Document all maintenance and repairs',
      ]
    },
  ];

  const quickTips = [
    {
      title: 'Document Everything',
      description: 'Keep detailed records of all maintenance, repairs, and improvements for insurance purposes.',
      icon: <CheckCircle2 />,
      color: '#10b981',
    },
    {
      title: 'Review Coverage Annually',
      description: 'Ensure your policy reflects current property value and recent upgrades or renovations.',
      icon: <Shield />,
      color: '#3b82f6',
    },
    {
      title: 'Address Issues Promptly',
      description: 'Small problems can become major claims. Fix minor issues before they escalate.',
      icon: <AlertTriangle />,
      color: '#f59e0b',
    },
  ];

  return (
    <div
      className="w-full h-full flex flex-col overflow-y-auto"
      style={{
        padding: 'var(--spacing-6)',
        gap: 'var(--spacing-6)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-12))',
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          height: '200px',
          backgroundColor: 'var(--glass-bg)',
          border: '2px solid var(--glass-border)',
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1614792403436-ba5b3e747604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwbWFpbnRlbmFuY2UlMjBjaGVja2xpc3QlMjBzYWZldHl8ZW58MXx8fHwxNzYyMjg4NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'var(--spacing-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
          }}
        >
          <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
            <Shield className="w-6 h-6" style={{ color: '#10b981' }} />
            <h1 style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)' }}>
              Best Practices
            </h1>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 8px rgba(0, 0, 0, 0.8)' }}>
            Protect your home and maximize your coverage
          </p>
        </div>
      </motion.div>

      {/* Quick Tips */}
      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Essential Tips
        </h2>
        <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
          {quickTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="backdrop-blur-md"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--glass-border)',
                padding: 'var(--spacing-4)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="flex items-start" style={{ gap: 'var(--spacing-3)' }}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: `${tip.color}20`,
                    color: tip.color,
                    flexShrink: 0,
                  }}
                >
                  {tip.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
                    {tip.title}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {tip.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Best Practices Categories */}
      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Protection Categories
        </h2>
        <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="backdrop-blur-md"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--glass-border)',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Category Header */}
              <motion.button
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: 'var(--spacing-4)',
                  textAlign: 'left',
                  height: '100px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                  }}
                >
                  <ImageWithFallback
                    src={category.image}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.15,
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div className="flex items-center" style={{ gap: 'var(--spacing-3)' }}>
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: `${category.color}20`,
                        border: `2px solid ${category.color}40`,
                        color: category.color,
                        flexShrink: 0,
                      }}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-1)' }}>
                        {category.title}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {category.practices.length} best practices
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.button>

              {/* Expanded Content */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedCategory === category.id ? 'auto' : 0,
                  opacity: expandedCategory === category.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: 'var(--spacing-4)',
                    paddingTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-2)',
                  }}
                >
                  {category.practices.map((practice, pIndex) => (
                    <div
                      key={pIndex}
                      className="flex items-start"
                      style={{
                        gap: 'var(--spacing-2)',
                        padding: 'var(--spacing-2)',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: category.color, flexShrink: 0, marginTop: '2px' }}
                      />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {practice}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
