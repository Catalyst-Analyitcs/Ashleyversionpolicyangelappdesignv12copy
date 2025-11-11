/**
 * ==============================================================================
 * DISCOVERSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Content discovery screen showcasing educational resources, best
 * practices, market trends, and insurance learning materials. Features a
 * hero carousel with overlapping cards, featured articles, and category tiles.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. ANIMATION LIBRARY CHANGES:
 *    - CURRENT: motion/react (Framer Motion for web)
 *    - REACT NATIVE: react-native-reanimated v3
 *    - Replace motion.div with Animated.View
 *    - Replace motion.button with Pressable with Animated styles
 *    - Convert animations to useAnimatedStyle and withTiming/withSpring
 * 
 * 2. SCROLL COMPONENTS:
 *    - Root container → ScrollView with showsVerticalScrollIndicator={false}
 *    - Hero carousel → FlatList with horizontal={true} and snap points
 *    - Use Animated.FlatList for better scroll tracking
 * 
 * 3. LAYOUT COMPONENTS:
 *    - div → View
 *    - button → TouchableOpacity or Pressable
 *    - h2, p, span → Text
 *    - Remove all className props
 * 
 * 4. OVERLAPPING CAROUSEL:
 *    - Current implementation uses negative gap (-80px) for card overlap
 *    - React Native: Use absolute positioning or adjust marginLeft/Right
 *    - Or use third-party library like react-native-reanimated-carousel
 * 
 * 5. BLUR & GLASSMORPHISM:
 *    - backdrop-blur → BlurView from @react-native-community/blur
 *    - Combine with transparent backgrounds
 *    - May need layered approach with absolute positioning
 * 
 * 6. GRADIENT BACKGROUNDS:
 *    - radial-gradient → Use expo-linear-gradient with creative positioning
 *    - React Native doesn't support radial gradients natively
 *    - Alternative: Use SVG for complex gradients
 * 
 * 7. ICON LIBRARY:
 *    - lucide-react → react-native-vector-icons or @expo/vector-icons
 * 
 * 8. IMAGE HANDLING:
 *    - ImageWithFallback → FastImage for caching and performance
 *    - Add progressive loading with placeholder
 * 
 * 9. TEXT SHADOW:
 *    - textShadow is supported in React Native
 *    - Format: textShadowColor, textShadowOffset, textShadowRadius
 * 
 * 10. MASK/CLIP:
 *     - maskImage/WebkitMaskImage → Limited support in React Native
 *     - May need to use react-native-masked-view for clipping
 * 
 * ==============================================================================
 * MOCK DATA POINTS - NEEDS REAL API CONNECTIONS
 * ==============================================================================
 * 
 * DATA SOURCES IN THIS COMPONENT:
 * 
 * 1. HERO CAROUSEL CARDS (lines 32-54)
 *    Current: Hard-coded array of 3 discovery categories
 *    
 *    REQUIRED API: GET /api/discover/hero
 *    
 *    PURPOSE: Featured content categories to drive user engagement
 *    
 *    RESPONSE SHAPE:
 *    {
 *      heroCards: Array<{
 *        id: string,
 *        title: string,               // "Market Trends"
 *        subtitle: string,            // "Latest Property Value Insights"
 *        image: string,               // Featured image URL
 *        gradient: string,            // CSS gradient for overlay
 *        action: string,              // Navigation target ('market-trends')
 *        order: number,               // Display order
 *        isActive: boolean,           // Show/hide card
 *        startDate?: Date,            // Optional scheduling
 *        endDate?: Date
 *      }>
 *    }
 * 
 * 2. FEATURED ARTICLES (lines 80-102)
 *    Current: Hard-coded array of 3 featured articles
 *    
 *    REQUIRED API: GET /api/discover/featured
 *    
 *    PURPOSE: Curated educational content for property owners
 *    
 *    RESPONSE SHAPE:
 *    {
 *      articles: Array<{
 *        id: string,
 *        title: string,               // "How to Prepare for Wildfire Season"
 *        category: string,            // "Safety", "Insurance", "Technology"
 *        icon: string,                // Icon identifier
 *        color: string,               // Hex color code
 *        image: string,               // Article thumbnail URL
 *        excerpt?: string,            // Short description
 *        author?: {
 *          name: string,
 *          avatar: string
 *        },
 *        publishedAt: Date,
 *        readTime: number,            // Reading time in minutes
 *        tags: string[],
 *        articleUrl: string,          // Link to full article
 *        featured: boolean,
 *        views: number,
 *        likes: number
 *      }>
 *    }
 * 
 * 3. CATEGORIES (lines 56-78)
 *    Current: Hard-coded array of 3 main categories
 *    
 *    REQUIRED API: GET /api/discover/categories
 *    
 *    PURPOSE: Main content navigation categories
 *    
 *    RESPONSE SHAPE:
 *    {
 *      categories: Array<{
 *        id: string,
 *        title: string,               // "Market Trends"
 *        description: string,         // "Latest property value insights"
 *        icon: string,                // Icon identifier
 *        color: string,               // Primary color (hex)
 *        gradient: string,            // CSS gradient
 *        articleCount: number,        // Number of articles in category
 *        slug: string,                // URL-friendly identifier
 *        navigationTarget: string,    // Screen to navigate to
 *        order: number
 *      }>
 *    }
 * 
 * ==============================================================================
 * CONTENT MANAGEMENT SYSTEM (CMS) INTEGRATION
 * ==============================================================================
 * 
 * RECOMMENDATION: Use headless CMS for content management
 * 
 * OPTIONS:
 * - Contentful (popular, good free tier)
 * - Strapi (open source, self-hosted)
 * - Sanity (developer-friendly)
 * - WordPress with REST API
 * 
 * BENEFITS:
 * - Non-technical team can manage content
 * - Scheduled publishing
 * - Content versioning
 * - Rich media management
 * - SEO metadata
 * 
 * IMPLEMENTATION:
 * 1. Create content models in CMS (Article, Category, FeaturedContent)
 * 2. Sync content to backend database via webhooks
 * 3. Backend exposes REST API endpoints
 * 4. Mobile app fetches and caches content
 * 5. Implement background sync for fresh content
 * 
 * ==============================================================================
 * ANALYTICS & TRACKING NEEDED
 * ==============================================================================
 * 
 * EVENTS TO TRACK:
 * - Hero card views (which card was centered/viewed)
 * - Hero card clicks (navigation to category)
 * - Featured article views
 * - Featured article clicks
 * - Category tile clicks
 * - Scroll depth (how far user scrolled)
 * - Time spent on screen
 * 
 * IMPLEMENTATION:
 * - Firebase Analytics / Google Analytics
 * - Mixpanel for advanced funnel tracking
 * - Custom backend analytics endpoint
 * 
 * DATA TO COLLECT:
 * {
 *   event: 'article_clicked',
 *   properties: {
 *     article_id: string,
 *     article_title: string,
 *     category: string,
 *     position: number,        // Position in list
 *     source: 'featured' | 'category',
 *     user_id: string,
 *     timestamp: Date
 *   }
 * }
 * 
 * ==============================================================================
 * STATE MANAGEMENT NEEDED
 * ==============================================================================
 * 
 * CURRENT STATE:
 * - activeIndex: number (hero carousel tracking)
 * - scrollRef: RefObject (scroll position reference)
 * 
 * REQUIRED STATE (React Native):
 * - heroCards: HeroCard[] (from API)
 * - featuredArticles: Article[] (from API)
 * - categories: Category[] (from API)
 * - loading: boolean
 * - refreshing: boolean (for pull-to-refresh)
 * - error: Error | null
 * - activeCarouselIndex: number
 * 
 * RECOMMENDED APPROACH:
 * - React Query for data fetching and caching
 * - Context API for global discover content state
 * - useRef for scroll tracking
 * - Animated.Value for carousel animations
 * 
 * ==============================================================================
 * COMPONENT BREAKDOWN
 * ==============================================================================
 */

import { Compass, TrendingUp, Award, BookOpen, ChevronRight, Sparkles, Shield, Home } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRef, useState, useEffect } from "react";

/**
 * ==============================================================================
 * PROPS INTERFACE
 * ==============================================================================
 * 
 * CURRENT: Single navigation callback
 * 
 * REACT NATIVE REPLACEMENT:
 * 
 * interface DiscoverScreenProps {
 *   navigation: NavigationProp<RootStackParamList>;
 *   route: RouteProp<RootStackParamList, 'Discover'>;
 * }
 * 
 * Then use:
 * navigation.navigate('MarketTrends')
 * instead of onNavigate('market-trends')
 */
interface DiscoverScreenProps {
  onNavigate?: (screen: string) => void;
}

/**
 * ==============================================================================
 * MAIN COMPONENT: DiscoverScreen
 * ==============================================================================
 * 
 * LAYOUT HIERARCHY:
 * 
 * ScrollView (root)
 *   ├─ Background Gradient (fixed at top)
 *   │
 *   ├─ Hero Carousel Section
 *   │   ├─ Left Fade Overlay
 *   │   ├─ Right Fade Overlay
 *   │   └─ Horizontal Scroll Container
 *   │       └─ Hero Cards (3) - Overlapping
 *   │
 *   ├─ Featured Articles Section
 *   │   ├─ Section Header
 *   │   └─ Article Cards (3)
 *   │
 *   └─ Categories Section
 *       └─ Category Tiles (3)
 * 
 * REACT NATIVE CONVERSION:
 * 
 * <SafeAreaView style={styles.container}>
 *   <ScrollView
 *     showsVerticalScrollIndicator={false}
 *     refreshControl={
 *       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
 *     }
 *   >
 *     ... content ...
 *   </ScrollView>
 * </SafeAreaView>
 */
export function DiscoverScreen({ onNavigate }: DiscoverScreenProps) {
  /**
   * ============================================================================
   * SCROLL TRACKING - HERO CAROUSEL
   * ============================================================================
   * 
   * PURPOSE: Track which hero card is centered in viewport
   * 
   * REACT NATIVE CONVERSION:
   * Use Animated.event with FlatList onScroll:
   * 
   * const scrollX = useRef(new Animated.Value(0)).current;
   * const activeIndex = useRef(new Animated.Value(1)).current;
   * 
   * <Animated.FlatList
   *   horizontal
   *   data={heroCards}
   *   onScroll={Animated.event(
   *     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
   *     { useNativeDriver: true }
   *   )}
   *   onMomentumScrollEnd={(e) => {
   *     const index = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
   *     setActiveIndex(index);
   *   }}
   * />
   */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  /**
   * ============================================================================
   * SCROLL EFFECT - AUTO-CENTER MIDDLE CARD
   * ============================================================================
   * 
   * PURPOSE: Automatically scroll to center card on mount
   * 
   * REACT NATIVE:
   * Use scrollToIndex in useEffect:
   * 
   * useEffect(() => {
   *   setTimeout(() => {
   *     flatListRef.current?.scrollToIndex({
   *       index: 1,
   *       animated: true,
   *       viewPosition: 0.5
   *     });
   *   }, 100);
   * }, []);
   */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Scroll to center card (second card) on mount
    const cardWidth = 280 - 80; // card width minus overlap
    container.scrollLeft = cardWidth * 1;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const centerIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(centerIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * ============================================================================
   * HERO CARDS DATA
   * ============================================================================
   * 
   * MOCK DATA: Hard-coded discovery categories
   * 
   * REAL DATA SOURCE: GET /api/discover/hero
   * 
   * CONTENT TYPES:
   * - Market Trends: Real estate market data and insights
   * - Best Practices: Property maintenance and insurance tips
   * - Learning Center: Educational resources about insurance
   * 
   * IMAGES:
   * - Currently: Generic stock photos from Unsplash
   * - Should be: Branded graphics or curated photography
   * - Store in CDN for fast loading
   * - Generate multiple sizes (thumbnail, medium, full)
   * 
   * DYNAMIC CONTENT:
   * - Backend should allow adding/removing/reordering cards
   * - Support A/B testing different hero content
   * - Schedule seasonal or timely content
   * 
   * PERSONALIZATION (Future):
   * - Show different hero cards based on:
   *   - User location (wildfire vs. flood zones)
   *   - Property type (condo vs. house)
   *   - Recent user activity
   *   - Policy status
   */
  const heroCards = [
    {
      title: 'Market Trends',
      subtitle: 'Latest Property Value Insights',
      image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncm93dGglMjBkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2MjI4ODQ0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
      action: 'market-trends',
    },
    {
      title: 'Best Practices',
      subtitle: 'Protect Your Home & Coverage',
      image: 'https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob21lJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzYyMjY0ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
      action: 'best-practices',
    },
    {
      title: 'Learning Center',
      subtitle: 'Insurance Education Resources',
      image: 'https://images.unsplash.com/photo-1662304696102-efafa11b27c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMGJvb2tzJTIwc3R1ZHl8ZW58MXx8fHwxNzYyMjg4OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
      action: 'learning-center',
    },
  ];

  /**
   * ============================================================================
   * CATEGORIES DATA
   * ============================================================================
   * 
   * MOCK DATA: Hard-coded category tiles
   * 
   * REAL DATA SOURCE: GET /api/discover/categories
   * 
   * PURPOSE: Main navigation to content sections
   * 
   * CATEGORY STRUCTURE:
   * Each category should lead to a filtered content list:
   * - Market Trends → Articles about property values, market analysis
   * - Best Practices → Guides on maintenance, safety, insurance optimization
   * - Learning Center ��� Educational content, glossary, FAQs
   * 
   * ICON MAPPING:
   * Store icon names in API response, map to actual icons in app:
   * 
   * const iconMap = {
   *   'trending-up': TrendingUp,
   *   'award': Award,
   *   'book-open': BookOpen,
   * };
   * 
   * DYNAMIC ARTICLE COUNT:
   * Display number of articles in each category:
   * "Market Trends (24 articles)"
   * Update count when new content is added
   */
  const categories = [
    {
      title: 'Market Trends',
      description: 'Latest property value insights',
      icon: <TrendingUp />,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    },
    {
      title: 'Best Practices',
      description: 'Property maintenance tips',
      icon: <Award />,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
      title: 'Learning Center',
      description: 'Insurance education resources',
      icon: <BookOpen />,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
  ];

  /**
   * ============================================================================
   * FEATURED ARTICLES DATA
   * ============================================================================
   * 
   * MOCK DATA: Hard-coded featured articles
   * 
   * REAL DATA SOURCE: GET /api/discover/featured
   * 
   * PURPOSE: Highlight timely, relevant, or popular content
   * 
   * SELECTION CRITERIA (Backend Logic):
   * - Seasonal relevance (wildfire season, winter prep)
   * - Recent user behavior (viewed similar content)
   * - Geographic relevance (local risk factors)
   * - Trending content (most viewed this week)
   * - Editorial picks (curated by content team)
   * 
   * ARTICLE METADATA:
   * - Title and category (shown)
   * - Author info (not currently shown)
   * - Publish date (not currently shown)
   * - Read time estimate (not currently shown)
   * - View count / popularity (not currently shown)
   * - Tags for filtering
   * 
   * FULL ARTICLE CONTENT:
   * When user clicks article:
   * - Option 1: Navigate to in-app article reader
   * - Option 2: Open web view with article URL
   * - Option 3: Open external browser
   * 
   * CONTENT FORMAT:
   * - Rich text (Markdown or HTML)
   * - Embedded images/videos
   * - Actionable tips/checklists
   * - Related articles
   * - Social sharing options
   * 
   * IMAGES:
   * - Replace stock photos with article-specific imagery
   * - Optimize for mobile (WebP format, responsive sizes)
   * - Add alt text for accessibility
   */
  const featured = [
    { 
      title: 'How to Prepare for Wildfire Season', 
      category: 'Safety',
      icon: <Shield />,
      color: '#f97316',
      image: 'https://images.unsplash.com/photo-1626908013943-df94de54984c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjI4NjA3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    { 
      title: 'Maximizing Your Policy Coverage', 
      category: 'Insurance',
      icon: <Sparkles />,
      color: '#3b82f6',
      image: 'https://images.unsplash.com/photo-1722253583962-74dd5deea8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBkb2N1bWVudHMlMjBwbGFubmluZ3xlbnwxfHx8fDE3NjIyODY4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    { 
      title: 'Smart Home Technology for Risk Reduction', 
      category: 'Technology',
      icon: <Home />,
      color: '#8b5cf6',
      image: 'https://images.unsplash.com/photo-1659720879153-24703db812c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob21lJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MjI4Njg0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  /**
   * ============================================================================
   * JSX RENDER - COMPONENT STRUCTURE
   * ============================================================================
   * 
   * REACT NATIVE CONVERSION NOTES:
   * - Replace outer div with ScrollView
   * - Add SafeAreaView for device edges
   * - Replace all div → View
   * - Replace all button → Pressable
   * - Replace all text elements → Text
   */
  return (
    /**
     * ROOT CONTAINER
     * 
     * REACT NATIVE:
     * <SafeAreaView style={styles.container}>
     *   <ScrollView
     *     showsVerticalScrollIndicator={false}
     *     contentContainerStyle={{
     *       padding: 24,
     *       paddingBottom: navHeight + 48
     *     }}
     *   >
     */
    <div 
      className="w-full h-full flex flex-col overflow-y-auto"
      style={{ 
        padding: 'var(--spacing-6)',
        gap: 'var(--spacing-4)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-12))',
        position: 'relative',
      }}
    >
      {/* 
        BACKGROUND GRADIENT (FIXED AT TOP)
        
        PURPOSE: Decorative radial gradient that fades from blue/purple at top
        
        REACT NATIVE CHALLENGES:
        - position: 'fixed' not supported (use absolute within parent)
        - radial-gradient not supported
        - maskImage not supported
        
        ALTERNATIVES:
        1. Use expo-linear-gradient with creative positioning
        2. Use react-native-svg for radial gradient
        3. Use pre-rendered gradient image
        4. Simplify to linear gradient
        
        IMPLEMENTATION:
        <View style={styles.backgroundGradientContainer}>
          <LinearGradient
            colors={['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.2)', 'transparent']}
            locations={[0, 0.5, 1]}
            style={styles.backgroundGradient}
          />
        </View>
        
        OR use SVG:
        <Svg height="280" width="100%">
          <Defs>
            <RadialGradient id="grad">
              <Stop offset="0" stopColor="rgba(59, 130, 246, 0.3)" />
              <Stop offset="0.5" stopColor="rgba(139, 92, 246, 0.2)" />
              <Stop offset="1" stopColor="transparent" />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="280" fill="url(#grad)" />
        </Svg>
      */}
      <div
        style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          height: '280px',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)',
            opacity: 0.6,
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
          }}
        />
      </div>

      {/* SPACER */}
      <div style={{ paddingTop: 'var(--spacing-12)' }} />
      
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO CAROUSEL - HORIZONTAL SCROLL WITH OVERLAPPING CARDS            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * HERO CAROUSEL SECTION
       * 
       * FEATURES:
       * - Horizontal scrolling cards
       * - Cards overlap each other (negative gap)
       * - Center card is active (larger, brighter, elevated)
       * - Snap to center on scroll
       * - Left/right fade overlays
       * 
       * CARD OVERLAP TECHNIQUE (Web):
       * Using gap: '-80px' to make cards overlap
       * 
       * REACT NATIVE ALTERNATIVE:
       * FlatList doesn't support negative gap, so use:
       * 
       * OPTION 1: Absolute positioning with calculated positions
       * const getCardPosition = (index, activeIndex) => {
       *   const baseOffset = index * (cardWidth - overlapAmount);
       *   return baseOffset;
       * };
       * 
       * OPTION 2: Use marginRight: -overlapAmount on each card
       * 
       * OPTION 3: Use react-native-reanimated-carousel library
       * 
       * ACTIVE CARD EFFECTS:
       * - Scale: 1.0 (others: 0.88)
       * - Opacity: 1.0 (others: 0.5)
       * - Y offset: -20 (others: +10)
       * - Z-index: 10 (others: 5)
       * - Border glow
       * - Enhanced shadow
       * - Less blur
       * 
       * SCROLL BEHAVIOR:
       * - snapToInterval for snapping to cards
       * - decelerationRate="fast" for quick snapping
       * - contentContainerStyle for centering first/last cards
       */}
      <div 
        style={{ 
          position: 'relative',
          zIndex: 1,
          marginLeft: 'calc(var(--spacing-6) * -1)',
          marginRight: 'calc(var(--spacing-6) * -1)',
        }}
      >
        {/* 
          LEFT FADE OVERLAY
          
          PURPOSE: Fade out cards on left edge
          
          REACT NATIVE:
          <LinearGradient
            colors={['rgb(24, 24, 27)', 'rgba(24, 24, 27, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.leftFade}
            pointerEvents="none"
          />
        */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '80px',
            background: 'linear-gradient(to right, rgb(var(--color-background-primary)) 0%, rgba(var(--color-background-primary), 0) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* 
          RIGHT FADE OVERLAY
          
          REACT NATIVE:
          <LinearGradient
            colors={['rgba(24, 24, 27, 0)', 'rgb(24, 24, 27)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.rightFade}
            pointerEvents="none"
          />
        */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '80px',
            background: 'linear-gradient(to left, rgb(var(--color-background-primary)) 0%, rgba(var(--color-background-primary), 0) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* 
          SCROLL CONTAINER - HORIZONTAL CAROUSEL
          
          REACT NATIVE:
          <Animated.FlatList
            ref={flatListRef}
            horizontal
            data={heroCards}
            renderItem={({ item, index }) => (
              <HeroCard
                card={item}
                isActive={index === activeIndex}
                onPress={() => handleCardPress(item.action)}
              />
            )}
            keyExtractor={(item) => item.action}
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth - overlapAmount}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (screenWidth / 2) - (cardWidth / 2),
              paddingVertical: 32
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={handleScrollEnd}
          />
        */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto"
          style={{ 
            gap: '-80px',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingLeft: 'calc(50% - 140px)',
            paddingRight: 'calc(50% - 140px)',
            paddingTop: 'var(--spacing-8)',
            paddingBottom: 'var(--spacing-8)',
          }}
        >
          <style>
            {`
              .flex.overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
        {heroCards.map((card, index) => {
          const isActive = index === activeIndex;
          const zIndex = isActive ? 10 : 5;
          
          return (
          /**
           * HERO CARD
           * 
           * COMPONENTS:
           * - Background image (full card)
           * - Gradient overlay (dark at bottom for text readability)
           * - Title text
           * - Subtitle text
           * - "Learn More" button
           * 
           * ACTIVE STATE:
           * - Larger scale (1.0 vs 0.88)
           * - Full opacity (1.0 vs 0.5)
           * - Elevated position (y: -20 vs +10)
           * - Enhanced border glow
           * - Stronger shadow
           * - No blur filter
           * 
           * INTERACTIONS:
           * - Hover: Slight scale increase
           * - Tap: Slight scale decrease
           * - Click: Navigate to category screen
           * 
           * REACT NATIVE:
           * <Pressable
           *   onPress={() => navigation.navigate(card.action)}
           *   style={({ pressed }) => [
           *     styles.heroCard,
           *     isActive && styles.heroCardActive,
           *     pressed && styles.heroCardPressed
           *   ]}
           * >
           *   <FastImage
           *     source={{ uri: card.image }}
           *     style={styles.heroCardImage}
           *     resizeMode={FastImage.resizeMode.cover}
           *   />
           *   <LinearGradient
           *     colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
           *     style={styles.heroCardGradient}
           *   />
           *   <View style={styles.heroCardContent}>
           *     <Text style={styles.heroCardTitle}>{card.title}</Text>
           *     <Text style={styles.heroCardSubtitle}>{card.subtitle}</Text>
           *     <Pressable style={styles.learnMoreButton}>
           *       <Text style={styles.learnMoreText}>Learn More</Text>
           *     </Pressable>
           *   </View>
           * </Pressable>
           */
          <motion.button
            key={index}
            initial={{ opacity: 0.5, scale: 0.85 }}
            animate={{ 
              opacity: isActive ? 1 : 0.5,
              scale: isActive ? 1 : 0.88,
              y: isActive ? -20 : 10,
              zIndex: zIndex,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: isActive ? 1.02 : 0.90 }}
            whileTap={{ scale: isActive ? 0.98 : 0.86 }}
            style={{
              position: 'relative',
              minWidth: '280px',
              height: '420px',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              scrollSnapAlign: 'center',
              border: isActive ? '2px solid var(--glass-border)' : '2px solid rgba(255, 255, 255, 0.08)',
              boxShadow: isActive 
                ? '0 32px 64px rgba(0, 0, 0, 0.9), 0 16px 32px rgba(0, 0, 0, 0.7), 0 8px 16px rgba(0, 0, 0, 0.5)' 
                : '0 8px 24px rgba(0, 0, 0, 0.4)',
              filter: isActive ? 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.6))' : 'blur(0.5px) brightness(0.85)',
            }}
          >
        
            {/* 
              BACKGROUND IMAGE
              
              REACT NATIVE:
              <FastImage
                source={{ uri: card.image, priority: FastImage.priority.high }}
                style={styles.cardBackground}
                resizeMode={FastImage.resizeMode.cover}
              />
            */}
            <ImageWithFallback
              src={card.image}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />

            {/* 
              GRADIENT OVERLAY
              
              PURPOSE: Darken bottom of card for text readability
              
              REACT NATIVE:
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
                locations={[0, 1]}
                style={styles.gradientOverlay}
              />
            */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: card.gradient,
              }}
            />

            {/* 
              CARD CONTENT - Title, Subtitle, Button
              
              REACT NATIVE:
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </View>
                <Pressable style={styles.learnMoreButton}>
                  <Text style={styles.buttonText}>Learn More</Text>
                </Pressable>
              </View>
            */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'var(--spacing-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-3)',
              }}
            >
              {/* Title & Subtitle */}
              <div style={{ textAlign: 'left' }}>
                <h2
                  style={{
                    color: '#ffffff',
                    marginBottom: 'var(--spacing-1)',
                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {card.title}
                </h2>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textShadow: '0 1px 8px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {card.subtitle}
                </p>
              </div>

              {/* 
                LEARN MORE BUTTON
                
                INTERACTION: Navigate to category screen
                
                REACT NATIVE:
                <Pressable
                  onPress={() => {
                    if (card.action && onNavigate) {
                      onNavigate(card.action);
                    }
                  }}
                  style={({ pressed }) => [
                    styles.learnMoreButton,
                    pressed && styles.learnMoreButtonPressed
                  ]}
                >
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </Pressable>
              */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (card.action && onNavigate) {
                    onNavigate(card.action);
                  }
                }}
                className="flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 'var(--radius-full)',
                  padding: 'var(--spacing-3) var(--spacing-6)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  alignSelf: 'flex-start',
                  cursor: card.action ? 'pointer' : 'default',
                }}
              >
                <span style={{ color: '#ffffff' }}>Learn More</span>
              </motion.div>
            </div>
          </motion.button>
          );
        })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FEATURED ARTICLES SECTION                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * FEATURED ARTICLES
       * 
       * PURPOSE: Showcase 3 curated/trending articles
       * 
       * CARD COMPONENTS:
       * - Background image (faded, low opacity)
       * - Gradient overlay (colored based on category)
       * - Category icon + badge
       * - Article title
       * - "Read More" link with arrow
       * 
       * INTERACTIONS:
       * - Hover: Scale up slightly
       * - Tap: Navigate to article detail
       * - Arrow animates on hover (slides right)
       * 
       * DATA UPDATES:
       * - Should refresh based on:
       *   - User reading history
       *   - Trending topics
       *   - Seasonal content
       *   - Geographic relevance
       * 
       * REACT NATIVE:
       * <View style={styles.section}>
       *   <Text style={styles.sectionTitle}>Featured Articles</Text>
       *   {featured.map((article, index) => (
       *     <ArticleCard
       *       key={article.id}
       *       article={article}
       *       onPress={() => navigation.navigate('ArticleDetail', { id: article.id })}
       *     />
       *   ))}
       * </View>
       */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ 
            color: 'var(--text-primary)', 
            marginBottom: 'var(--spacing-3)',
          }}
        >
          Featured Articles
        </motion.div>
        
        <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
          {featured.map((article, index) => (
            /**
             * FEATURED ARTICLE CARD
             * 
             * LAYOUT:
             * - Fixed height: 140px
             * - Horizontal layout
             * - Background image (low opacity)
             * - Category-colored gradient overlay
             * 
             * CONTENT:
             * - Category icon in colored square
             * - Category badge
             * - Article title
             * - "Read More" link
             * 
             * REACT NATIVE:
             * <Pressable
             *   onPress={() => navigation.navigate('Article', { id: article.id })}
             *   style={({ pressed }) => [
             *     styles.articleCard,
             *     pressed && styles.articleCardPressed
             *   ]}
             * >
             *   <FastImage
             *     source={{ uri: article.image }}
             *     style={styles.articleBackground}
             *     resizeMode={FastImage.resizeMode.cover}
             *   />
             *   <LinearGradient
             *     colors={[`${article.color}30`, 'rgba(0,0,0,0.7)']}
             *     start={{ x: 0, y: 0 }}
             *     end={{ x: 1, y: 1 }}
             *     style={styles.articleGradient}
             *   />
             *   <View style={styles.articleContent}>
             *     <View style={styles.categoryRow}>
             *       <View style={[styles.iconContainer, { backgroundColor: article.color }]}>
             *         <Icon name={article.icon} size={24} color="#fff" />
             *       </View>
             *       <View style={styles.categoryBadge}>
             *         <Text style={styles.categoryText}>{article.category}</Text>
             *       </View>
             *     </View>
             *     <Text style={styles.articleTitle}>{article.title}</Text>
             *     <View style={styles.readMoreRow}>
             *       <Text style={styles.readMoreText}>Read More</Text>
             *       <Icon name="chevron-right" size={16} color={article.color} />
             *     </View>
             *   </View>
             * </Pressable>
             */
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="backdrop-blur-md transition-all"
              style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--glass-border)',
                padding: '0',
                textAlign: 'left',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                height: '140px',
              }}
            >
              {/* 
                BACKGROUND IMAGE LAYER
                
                REACT NATIVE:
                <FastImage
                  source={{ uri: article.image }}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />
              */}
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
                  src={article.image}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.25,
                  }}
                />
                {/* 
                  COLORED GRADIENT OVERLAY
                  
                  REACT NATIVE:
                  <LinearGradient
                    colors={[`${article.color}30`, 'rgba(0, 0, 0, 0.7)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientOverlay}
                  />
                */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${article.color}30 0%, rgba(0, 0, 0, 0.7) 100%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ 
                padding: 'var(--spacing-4)', 
                position: 'relative', 
                zIndex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  {/* 
                    CATEGORY ROW - Icon + Badge
                    
                    REACT NATIVE:
                    <View style={styles.categoryRow}>
                      <View style={[styles.iconBox, { backgroundColor: article.color }]}>
                        <Icon name={article.icon} size={20} color="#fff" />
                      </View>
                      <View style={[styles.categoryBadge, { backgroundColor: article.color + '30' }]}>
                        <Text style={styles.categoryText}>{article.category}</Text>
                      </View>
                    </View>
                  */}
                  <div className="flex items-center" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: `${article.color}40`,
                        color: article.color,
                        border: `2px solid ${article.color}60`,
                      }}
                    >
                      {article.icon}
                    </div>
                    <div 
                      className="text-xs"
                      style={{
                        color: article.color,
                        padding: 'var(--spacing-1) var(--spacing-2)',
                        backgroundColor: `${article.color}30`,
                        borderRadius: 'var(--radius-full)',
                        border: `1px solid ${article.color}60`,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {article.category}
                    </div>
                  </div>
                  {/* Article Title */}
                  <div style={{ 
                    color: 'var(--text-primary)', 
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                  }}>
                    {article.title}
                  </div>
                </div>
                
                {/* 
                  READ MORE LINK
                  
                  INTERACTION: Arrow slides right on hover
                  
                  REACT NATIVE:
                  <Pressable style={styles.readMoreButton}>
                    <Text style={styles.readMoreText}>Read More</Text>
                    <Animated.View style={arrowAnimation}>
                      <Icon name="chevron-right" size={16} color={article.color} />
                    </Animated.View>
                  </Pressable>
                */}
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                  style={{ gap: 'var(--spacing-2)' }}
                >
                  <span style={{ 
                    color: article.color,
                    fontSize: '0.875rem',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                  }}>
                    Read More
                  </span>
                  <ChevronRight 
                    className="w-4 h-4" 
                    style={{ 
                      color: article.color,
                      filter: `drop-shadow(0 1px 4px ${article.color}60)`,
                    }} 
                  />
                </motion.div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CATEGORIES SECTION                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/**
       * CATEGORIES - MAIN NAVIGATION TILES
       * 
       * PURPOSE: Navigate to filtered content lists
       * 
       * TILE COMPONENTS:
       * - Colored gradient background
       * - Rotating icon on hover
       * - Category title
       * - Description text
       * - Chevron arrow
       * 
       * INTERACTIONS:
       * - Hover: Scale up + slide right
       * - Icon rotates 360° on hover
       * - Tap: Navigate to category screen
       * 
       * REACT NATIVE:
       * <View style={styles.categoriesSection}>
       *   {categories.map((category, index) => (
       *     <Pressable
       *       key={category.id}
       *       onPress={() => navigation.navigate('CategoryContent', { 
       *         categoryId: category.id 
       *       })}
       *       style={({ pressed }) => [
       *         styles.categoryTile,
       *         pressed && styles.categoryTilePressed
       *       ]}
       *     >
       *       <LinearGradient
       *         colors={[category.color + '15', 'transparent']}
       *         start={{ x: 0, y: 0 }}
       *         end={{ x: 1, y: 1 }}
       *         style={styles.tileGradient}
       *       />
       *       <View style={styles.tileContent}>
       *         <View style={styles.leftContent}>
       *           <LinearGradient
       *             colors={[category.color, category.colorDark]}
       *             style={styles.iconBox}
       *           >
       *             <Icon name={category.icon} size={28} color="#fff" />
       *           </LinearGradient>
       *           <View>
       *             <Text style={styles.categoryTitle}>{category.title}</Text>
       *             <Text style={styles.categoryDesc}>{category.description}</Text>
       *           </View>
       *         </View>
       *         <Icon name="chevron-right" size={20} color={category.color} />
       *       </View>
       *     </Pressable>
       *   ))}
       * </View>
       */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', position: 'relative', zIndex: 1 }}>
        {categories.map((category, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
            whileHover={{ scale: 1.02, x: 8 }}
            whileTap={{ scale: 0.98 }}
            className="backdrop-blur-md transition-all"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--glass-bg)',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--glass-border)',
              padding: 'var(--spacing-4)',
              textAlign: 'left',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* 
              GRADIENT OVERLAY
              
              REACT NATIVE:
              <LinearGradient
                colors={[category.color + '15', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
              />
            */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${category.color}15 0%, transparent 70%)`,
                zIndex: 0,
              }}
            />

            <div className="flex items-center justify-between" style={{ position: 'relative', zIndex: 1 }}>
              <div className="flex items-center" style={{ gap: 'var(--spacing-3)' }}>
                {/* 
                  ROTATING ICON BOX
                  
                  ANIMATION: Rotates 360° on hover
                  
                  REACT NATIVE:
                  Use Animated.Value with rotation interpolation:
                  
                  const rotation = useRef(new Animated.Value(0)).current;
                  
                  const spin = rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                  });
                  
                  <Animated.View style={[styles.iconBox, { transform: [{ rotate: spin }] }]}>
                    <Icon name={category.icon} size={28} color="#fff" />
                  </Animated.View>
                */}
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-lg)',
                    background: category.gradient,
                    color: '#ffffff',
                    boxShadow: `0 4px 16px ${category.color}40`,
                  }}
                >
                  {category.icon}
                </motion.div>
                
                {/* Category Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    color: 'var(--text-primary)', 
                    marginBottom: 'var(--spacing-1)',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  }}>
                    {category.title}
                  </div>
                  <div style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.875rem',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                  }}>
                    {category.description}
                  </div>
                </div>
              </div>
              
              {/* Chevron Arrow */}
              <ChevronRight 
                className="w-5 h-5" 
                style={{ 
                  color: category.color,
                  filter: `drop-shadow(0 2px 4px ${category.color}60)`,
                }} 
              />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/**
 * ==============================================================================
 * TESTING CHECKLIST FOR REACT NATIVE CONVERSION
 * ==============================================================================
 * 
 * DATA & API:
 * □ Hero cards load from CMS/API
 * □ Featured articles fetch correctly
 * □ Categories load dynamically
 * □ Pull-to-refresh updates content
 * □ Error states display properly
 * □ Loading states show skeleton/spinner
 * □ Cache invalidation works correctly
 * 
 * CAROUSEL:
 * □ Hero carousel scrolls smoothly
 * □ Cards snap to center correctly
 * □ Active card state updates properly
 * □ Overlap effect works (or acceptable alternative)
 * □ Auto-center on mount works
 * □ Fade overlays render correctly
 * 
 * ANIMATIONS:
 * □ Card scale/opacity transitions are smooth
 * □ Icon rotation on hover/press works
 * □ Stagger animations on mount work
 * □ All animations run at 60fps
 * □ No jank or stuttering
 * 
 * NAVIGATION:
 * □ Hero card buttons navigate correctly
 * □ Featured articles open detail screen
 * □ Category tiles navigate to content lists
 * □ Back button behavior is correct
 * 
 * LAYOUT & STYLING:
 * □ Background gradient renders (or acceptable alternative)
 * □ Glassmorphism effects work correctly
 * □ Text shadows display properly
 * □ Color-coded category themes work
 * □ Image overlays and gradients render
 * □ Layout responds to different screen sizes
 * □ Safe area insets respected
 * 
 * IMAGES:
 * □ Hero card images load and cache
 * □ Article images load progressively
 * □ Placeholder images show while loading
 * □ Failed images show fallback
 * □ Image optimization is effective
 * 
 * PERFORMANCE:
 * □ Scroll performance is smooth
 * □ Large images don't block UI
 * □ Memory usage is acceptable
 * □ No memory leaks
 * □ Component re-renders are optimized
 * 
 * ANALYTICS:
 * □ Card views are tracked
 * □ Click events are logged
 * □ Scroll depth is measured
 * □ User engagement metrics collected
 * 
 * ACCESSIBILITY:
 * □ All interactive elements have labels
 * □ Screen reader announces content
 * □ Color contrast meets standards
 * □ Touch targets are 44x44pts minimum
 * □ Images have alt text
 * 
 * ==============================================================================
 */
