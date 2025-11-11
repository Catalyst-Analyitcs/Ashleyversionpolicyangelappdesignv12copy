/**
 * ==============================================================================
 * GRANTSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Grant discovery platform with advanced filtering, AI research,
 * real-time eligibility matching, and application tracking for San Francisco
 * property owners seeking financial assistance programs.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. ANIMATIONS & VISUAL EFFECTS:
 *    - Money rain animation (50 particles) → Reduce to 20-30 for performance
 *    - Use react-native-reanimated for smooth animations
 *    - Shimmer effect → useAnimatedStyle with repeat
 *    - Card hover → Pressable with scale animation
 * 
 * 2. SCROLL & LIST PERFORMANCE:
 *    - Grant list → FlatList with pagination
 *    - Implement windowSize, maxToRenderPerBatch
 *    - Use getItemLayout for fixed-height items
 *    - Add pull-to-refresh with RefreshControl
 * 
 * 3. FILTERING SYSTEM:
 *    - 8 different filter types (complex state)
 *    - Use Zustand for filter state management
 *    - Debounce search input (500ms)
 *    - Move filtering to backend API for better performance
 * 
 * 4. MODALS & BOTTOM SHEETS:
 *    - Filter panel → @gorhom/bottom-sheet
 *    - Grant details → Modal or navigation
 *    - Use snapPoints for bottom sheet behavior
 * 
 * 5. FORM CONTROLS:
 *    - TextInput for search
 *    - Custom Picker components
 *    - Switch/Toggle for boolean filters
 * 
 * ==============================================================================
 * MOCK DATA - REPLACE WITH REAL API
 * ==============================================================================
 * 
 * CURRENT: mockGrants array (6 grants hardcoded)
 * 
 * REQUIRED API ENDPOINTS:
 * 
 * 1. GET /api/grants
 *    Query: search, status, grantUse, eligibility, grantType, insurance,
 *           minQualification, includeNationwide, sortBy, page, limit
 *    Returns: Paginated grants with stats and filter options
 * 
 * 2. GET /api/grants/:grantId
 *    Returns: Full grant details, application requirements
 * 
 * 3. POST /api/grants/:grantId/apply
 *    Body: userId, propertyId, applicationData
 *    Returns: Application ID and next steps
 * 
 * 4. POST /api/grants/research
 *    AI-powered personalized grant recommendations
 *    Body: userId, propertyId, preferences
 *    Returns: Matched grants with scores
 * 
 * 5. POST /api/grants/:grantId/bookmark
 *    Save grant for later
 * 
 * EXTERNAL DATA SOURCES:
 * - Grants.gov API (federal grants)
 * - State/local grant websites (web scraping)
 * - Foundation Center (private grants)
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT MAPPING
 * ==============================================================================
 * 
 * - div → View
 * - input → TextInput
 * - button → TouchableOpacity/Pressable
 * - Dialog → Modal or BottomSheet
 * - Select → Custom Picker
 * - motion.div → Animated.View
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Grants load and display correctly
 * - [ ] Search filters work
 * - [ ] All filter types function
 * - [ ] Sort options work
 * - [ ] Grant cards are tappable
 * - [ ] Detail view opens
 * - [ ] Bookmark functionality works
 * - [ ] AI research executes
 * - [ ] Pagination/infinite scroll
 * - [ ] Pull-to-refresh updates
 * - [ ] Money rain animation performs well
 * - [ ] Works on iOS and Android
 * 
 */

import React, { useState, useMemo } from 'react';
import { Search, RefreshCw, PlusCircle, Globe, MapPin, Filter, X, ExternalLink, Calendar, MapPinIcon, DollarSign, Award, TrendingUp, Sparkles, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BottomNavigation } from '../components/BottomNavigation';

interface Grant {
  id: string;
  title: string;
  grant_id: string;
  quick_description?: string;
  grant_use?: string[];
  eligibility?: string[];
  open_date: string;
  close_date: string;
  link?: string;
  state?: string;
  is_nationwide?: boolean;
  amount?: string;
  grantType?: 'Federal' | 'State' | 'Local' | 'Nonprofit';
  insuranceCompatibility?: string[];
}

type GrantStatus = 'open' | 'closed' | 'upcoming';
type ViewMode = 'all' | 'open' | 'closed' | 'upcoming';

export function GrantsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ViewMode>('all');
  const [grantUseFilter, setGrantUseFilter] = useState('all');
  const [eligibilityFilter, setEligibilityFilter] = useState('all');
  const [grantTypeFilter, setGrantTypeFilter] = useState('all');
  const [insuranceFilter, setInsuranceFilter] = useState('all');
  const [minQualificationMatch, setMinQualificationMatch] = useState(0);
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'status'>('date-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [showNationwide, setShowNationwide] = useState(true);
  const [isResearching, setIsResearching] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);

  // Mock grants data
  const mockGrants: Grant[] = [
    {
      id: '1',
      title: 'Federal First-Time Homebuyer Assistance Program',
      grant_id: 'FHA-2025-001',
      quick_description: 'Financial assistance for first-time homebuyers to help with down payment and closing costs. Up to $25,000 in grant funding available for qualified applicants.',
      grant_use: ['Down Payment', 'Closing Costs', 'First-Time Buyer'],
      eligibility: ['First-Time Buyer', 'Income Limits Apply', 'Credit Check Required'],
      open_date: '2025-01-01',
      close_date: '2025-12-31',
      link: 'https://www.hud.gov',
      is_nationwide: true,
      amount: '$25,000',
      grantType: 'Federal',
      insuranceCompatibility: ['FHA', 'Conventional', 'VA'],
    },
    {
      id: '2',
      title: 'Home Energy Efficiency Upgrade Grant',
      grant_id: 'DOE-2025-EFF',
      quick_description: 'Grants for homeowners to upgrade insulation, windows, HVAC systems, and install solar panels. Covers up to 30% of project costs.',
      grant_use: ['Energy Efficiency', 'Solar Installation', 'HVAC Upgrade', 'Insulation'],
      eligibility: ['Homeowner', 'Property Age 10+ Years'],
      open_date: '2025-02-01',
      close_date: '2025-11-30',
      link: 'https://www.energy.gov',
      is_nationwide: true,
      amount: '$15,000',
      grantType: 'Federal',
      insuranceCompatibility: ['Homeowners', 'Flood', 'Earthquake'],
    },
    {
      id: '3',
      title: 'California Housing Rehabilitation Program',
      grant_id: 'CA-HRP-2025',
      quick_description: 'State-funded grants for home repairs and renovations for low to moderate income homeowners. Supports critical repairs and accessibility improvements.',
      grant_use: ['Home Repair', 'Renovation', 'Accessibility'],
      eligibility: ['California Resident', 'Income Limits', 'Owner-Occupied'],
      open_date: '2025-03-15',
      close_date: '2025-09-30',
      link: 'https://www.hcd.ca.gov',
      state: 'CA',
      amount: '$40,000',
      grantType: 'State',
      insuranceCompatibility: ['Homeowners', 'Earthquake'],
    },
    {
      id: '4',
      title: 'Disaster Recovery Housing Grant',
      grant_id: 'FEMA-DR-2025',
      quick_description: 'Emergency funding for homeowners affected by natural disasters. Covers structural repairs, temporary housing, and property restoration.',
      grant_use: ['Disaster Recovery', 'Emergency Repair', 'Structural Repair'],
      eligibility: ['Disaster Area Resident', 'Primary Residence', 'Uninsured Losses'],
      open_date: '2025-01-15',
      close_date: '2025-06-15',
      link: 'https://www.fema.gov',
      is_nationwide: true,
      amount: '$38,000',
      grantType: 'Federal',
      insuranceCompatibility: ['Flood', 'Hurricane', 'Earthquake', 'Wildfire'],
    },
    {
      id: '5',
      title: 'Veterans Home Modification Grant',
      grant_id: 'VA-HMG-2025',
      quick_description: 'Grants for disabled veterans to modify homes for accessibility. Covers ramps, widened doorways, accessible bathrooms, and other modifications.',
      grant_use: ['Accessibility', 'Home Modification', 'Disability Support'],
      eligibility: ['Veteran Status', 'Service-Connected Disability'],
      open_date: '2024-10-01',
      close_date: '2025-03-15',
      link: 'https://www.va.gov',
      is_nationwide: true,
      amount: '$20,000',
      grantType: 'Federal',
      insuranceCompatibility: ['VA', 'Homeowners'],
    },
    {
      id: '6',
      title: 'Rural Housing Preservation Program',
      grant_id: 'USDA-RHP-2025',
      quick_description: 'Support for homeowners in rural areas to repair and preserve housing. Focus on critical health and safety repairs.',
      grant_use: ['Home Repair', 'Rural Housing', 'Health & Safety'],
      eligibility: ['Rural Area', 'Income Limits', 'Owner-Occupied'],
      open_date: '2025-04-01',
      close_date: '2026-03-31',
      link: 'https://www.rd.usda.gov',
      is_nationwide: true,
      amount: '$30,000',
      grantType: 'Federal',
      insuranceCompatibility: ['USDA', 'Homeowners', 'Flood'],
    },
  ];

  // Grant utility functions
  const getGrantStatus = (grant: Grant): { text: string; color: 'green' | 'blue' | 'red' | 'gray' } => {
    const now = new Date();
    const openDate = new Date(grant.open_date);
    const closeDate = new Date(grant.close_date);

    if (now < openDate) {
      return { text: 'Upcoming', color: 'blue' };
    } else if (now > closeDate) {
      return { text: 'Closed', color: 'gray' };
    } else {
      return { text: 'Open', color: 'green' };
    }
  };

  const getTimeRemaining = (grant: Grant): string | null => {
    const now = new Date();
    const closeDate = new Date(grant.close_date);
    const diffTime = closeDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return null;
    if (diffDays === 0) return 'Closes today!';
    if (diffDays === 1) return '1 day remaining';
    if (diffDays <= 7) return `${diffDays} days remaining`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks remaining`;
    return null;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = mockGrants.length;
    let open = 0;
    let closed = 0;
    let upcoming = 0;
    let totalAmount = 0;

    mockGrants.forEach(grant => {
      const status = getGrantStatus(grant);
      if (status.text === 'Open') open++;
      else if (status.text === 'Closed') closed++;
      else if (status.text === 'Upcoming') upcoming++;
      
      if (grant.amount) {
        totalAmount += parseInt(grant.amount.replace(/\D/g, ''));
      }
    });

    return { total, open, closed, upcoming, totalAmount };
  }, [mockGrants]);

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const grantUses = new Set<string>();
    const eligibilityReqs = new Set<string>();
    const insuranceTypes = new Set<string>();
    const grantTypes = new Set<string>();

    mockGrants.forEach(grant => {
      grant.grant_use?.forEach(use => grantUses.add(use));
      grant.eligibility?.forEach(req => eligibilityReqs.add(req));
      grant.insuranceCompatibility?.forEach(ins => insuranceTypes.add(ins));
      if (grant.grantType) grantTypes.add(grant.grantType);
    });

    return {
      grant_uses: Array.from(grantUses).sort(),
      eligibility_requirements: Array.from(eligibilityReqs).sort(),
      insurance_types: Array.from(insuranceTypes).sort(),
      grant_types: Array.from(grantTypes).sort(),
    };
  }, [mockGrants]);

  // Filter and sort grants
  const filteredAndSortedGrants = useMemo(() => {
    let filtered = mockGrants.filter(grant => {
      // Status filter
      if (statusFilter !== 'all') {
        const status = getGrantStatus(grant);
        if (status.text.toLowerCase() !== statusFilter) return false;
      }

      // Grant use filter
      if (grantUseFilter !== 'all') {
        if (!grant.grant_use?.includes(grantUseFilter)) return false;
      }

      // Eligibility filter
      if (eligibilityFilter !== 'all') {
        if (!grant.eligibility?.includes(eligibilityFilter)) return false;
      }

      // Grant type filter
      if (grantTypeFilter !== 'all') {
        if (grant.grantType !== grantTypeFilter) return false;
      }

      // Insurance compatibility filter
      if (insuranceFilter !== 'all') {
        if (!grant.insuranceCompatibility?.includes(insuranceFilter)) return false;
      }

      // Qualification match filter
      if (minQualificationMatch > 0) {
        const calculateLikelihood = () => {
          let score = 65;
          const status = getGrantStatus(grant);
          if (status.color === 'green') score += 15;
          if (grant.is_nationwide) score += 10;
          if (grant.eligibility && grant.eligibility.length <= 2) score += 5;
          if (grant.grant_use?.some(use => 
            use.includes('First-Time') || 
            use.includes('Energy') || 
            use.includes('Repair')
          )) score += 5;
          return Math.min(95, Math.max(45, score));
        };
        const likelihood = calculateLikelihood();
        if (likelihood < minQualificationMatch) return false;
      }

      // Nationwide toggle
      if (!showNationwide && grant.is_nationwide) return false;

      // Search term
      if (searchTerm.trim()) {
        const search = searchTerm.toLowerCase();
        return (
          grant.title.toLowerCase().includes(search) ||
          grant.grant_id.toLowerCase().includes(search) ||
          grant.quick_description?.toLowerCase().includes(search)
        );
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'date-asc':
          return new Date(a.close_date).getTime() - new Date(b.close_date).getTime();
        case 'date-desc':
          return new Date(b.close_date).getTime() - new Date(a.close_date).getTime();
        case 'status': {
          const getStatusPriority = (grant: Grant) => {
            const status = getGrantStatus(grant);
            return status.text === 'Open' ? 0 : status.text === 'Upcoming' ? 1 : 2;
          };
          return getStatusPriority(a) - getStatusPriority(b);
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockGrants, statusFilter, grantUseFilter, eligibilityFilter, showNationwide, searchTerm, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setGrantUseFilter('all');
    setEligibilityFilter('all');
    setGrantTypeFilter('all');
    setInsuranceFilter('all');
    setMinQualificationMatch(0);
    setSortBy('date-desc');
  };

  const handleResearch = () => {
    setIsResearching(true);
    setTimeout(() => {
      setIsResearching(false);
    }, 2000);
  };

  return (
    <div 
      className="w-full h-full flex flex-col overflow-y-auto"
      style={{ 
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-4))',
        backgroundColor: 'rgb(var(--color-background-primary))',
        position: 'relative',
      }}
    >
      {/* Deep Navy Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, #1e3a5f 0%, #0f1c2e 100%)',
          zIndex: 0,
        }}
      />

      {/* Subtle Slate Blue Accent */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: 'radial-gradient(circle at 50% 0%, rgba(94, 129, 172, 0.12) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Money Rain Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => {
          const randomLeft = Math.random() * 100;
          const randomDelay = Math.random() * 8;
          const randomDuration = 4 + Math.random() * 6;
          const randomSize = 18 + Math.random() * 16;
          const randomRotation = Math.random() * 360;
          const moneySymbols = ['💵', '💰', '💸', '$', '💴', '💶', '💷', '🪙', '💳'];
          const randomSymbol = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
          const randomOpacity = 0.15 + Math.random() * 0.2;
          
          // Subtle blue-tinted shadows to match navy theme
          const shadowColor = 'rgba(94, 129, 172, 0.3)';
          const glowColor = 'rgba(138, 180, 248, 0.25)';

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${randomLeft}%`,
                top: '-50px',
                fontSize: `${randomSize}px`,
                opacity: randomOpacity,
                animation: `fall ${randomDuration}s linear ${randomDelay}s infinite`,
                transform: `rotate(${randomRotation}deg)`,
                textShadow: `0 0 10px ${shadowColor}, 0 0 20px ${shadowColor}`,
                filter: `drop-shadow(0 0 8px ${glowColor})`,
              }}
            >
              {randomSymbol}
            </div>
          );
        })}
      </div>

      <style>
        {`
          @keyframes fall {
            from {
              transform: translateY(-50px) rotate(0deg);
            }
            to {
              transform: translateY(100vh) rotate(360deg);
            }
          }
        `}
      </style>

      {/* Luxury Sleek Header */}
      <header 
        className="flex-none backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.9) 0%, rgba(52, 74, 106, 0.85) 100%)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(138, 180, 248, 0.15)',
          padding: 'var(--spacing-7) var(--spacing-6)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 4px 16px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 1px 0 0 rgba(255, 255, 255, 0.1) inset
          `,
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        {/* Subtle Shimmer Effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '200%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
            animation: 'shimmer 8s infinite',
            pointerEvents: 'none',
          }}
        />
        
        <style>
          {`
            @keyframes shimmer {
              0% { transform: translateX(0); }
              100% { transform: translateX(50%); }
            }
          `}
        </style>

        {/* Elegant Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'var(--spacing-5)', position: 'relative' }}
        >
          {/* Title Section - Stacked */}
          <div className="flex items-center justify-center" style={{ gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-5)' }}>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #6ea8d8 0%, #4a7ba7 50%, #3d6789 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `
                  0 8px 24px rgba(91, 143, 199, 0.5),
                  0 4px 12px rgba(91, 143, 199, 0.3),
                  0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                  0 0 20px rgba(110, 168, 216, 0.4)
                `,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  right: '2px',
                  bottom: '2px',
                  borderRadius: 'var(--radius-full)',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              <Sparkles style={{ width: '24px', height: '24px', color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }} />
            </motion.div>
            <div>
              <h1 style={{ 
                color: 'white',
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
              }}>
                Grants
              </h1>
            </div>
          </div>

          {/* Premium Stats Badges - Below Title */}
          <div className="flex items-center" style={{ gap: 'var(--spacing-3)' }}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-3) var(--spacing-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-1)',
                boxShadow: `
                  0 4px 12px rgba(34, 197, 94, 0.2),
                  0 2px 6px rgba(0, 0, 0, 0.15),
                  0 0 0 1px rgba(255, 255, 255, 0.05) inset
                `,
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ 
                color: '#4ade80',
                textShadow: '0 2px 8px rgba(34, 197, 94, 0.3)',
                position: 'relative',
              }}>
                Open {stats.open}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(96, 165, 250, 0.1) 100%)',
                border: '1px solid rgba(96, 165, 250, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-3) var(--spacing-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-1)',
                boxShadow: `
                  0 4px 12px rgba(96, 165, 250, 0.2),
                  0 2px 6px rgba(0, 0, 0, 0.15),
                  0 0 0 1px rgba(255, 255, 255, 0.05) inset
                `,
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ 
                color: '#60a5fa',
                textShadow: '0 2px 8px rgba(96, 165, 250, 0.3)',
                position: 'relative',
              }}>
                Upcoming 0
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.1) 100%)',
                border: '1px solid rgba(156, 163, 175, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-3) var(--spacing-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-1)',
                boxShadow: `
                  0 4px 12px rgba(156, 163, 175, 0.15),
                  0 2px 6px rgba(0, 0, 0, 0.15),
                  0 0 0 1px rgba(255, 255, 255, 0.05) inset
                `,
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ 
                color: '#9ca3af',
                textShadow: '0 2px 8px rgba(156, 163, 175, 0.3)',
                position: 'relative',
              }}>
                Closed 3
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Refined Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex"
          style={{ gap: 'var(--spacing-3)', position: 'relative' }}
        >
          <div 
            className="flex-1 backdrop-blur-xl"
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(74, 95, 127, 0.6) 0%, rgba(52, 74, 106, 0.5) 100%)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(138, 180, 248, 0.2)',
              boxShadow: `
                0 8px 24px rgba(0, 0, 0, 0.25),
                0 4px 12px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.08) inset,
                0 1px 0 0 rgba(255, 255, 255, 0.1) inset
              `,
              overflow: 'hidden',
            }}
          >
            {/* Search Input Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 10% 50%, rgba(138, 180, 248, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <Search 
              style={{ 
                position: 'absolute',
                left: 'var(--spacing-4)',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: 'rgba(138, 180, 248, 0.7)',
                filter: 'drop-shadow(0 2px 4px rgba(138, 180, 248, 0.3))',
                zIndex: 1,
              }} 
            />
            <Input
              type="text"
              placeholder="Search grants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                paddingLeft: 'calc(var(--spacing-4) + 32px)',
                color: 'white',
                height: '48px',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(true)}
            className="backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 95, 127, 0.6) 0%, rgba(52, 74, 106, 0.5) 100%)',
              border: '1px solid rgba(138, 180, 248, 0.2)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              boxShadow: `
                0 8px 24px rgba(0, 0, 0, 0.25),
                0 4px 12px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.08) inset,
                0 1px 0 0 rgba(255, 255, 255, 0.1) inset
              `,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(138, 180, 248, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <Filter style={{ width: '20px', height: '20px', color: 'rgba(255, 255, 255, 0.8)', position: 'relative', zIndex: 1 }} />
          </motion.button>
        </motion.div>
      </header>

      {/* Grants List */}
      <div 
        className="flex-auto overflow-y-auto" 
        style={{ 
          padding: 'var(--spacing-6)', 
          position: 'relative', 
          zIndex: 1,
        }}
      >
        {filteredAndSortedGrants.length > 0 ? (
          <div className="flex flex-col" style={{ gap: 'var(--spacing-5)' }}>
            <AnimatePresence mode="popLayout">
              {filteredAndSortedGrants.map((grant, index) => {
                const status = getGrantStatus(grant);
                const timeRemaining = getTimeRemaining(grant);
                
                // Calculate qualification likelihood based on grant criteria
                const calculateLikelihood = () => {
                  let score = 65; // Base score
                  
                  // Boost for open grants
                  if (status.color === 'green') score += 15;
                  
                  // Boost for nationwide grants (easier to qualify geographically)
                  if (grant.is_nationwide) score += 10;
                  
                  // Slight boost for fewer eligibility requirements
                  if (grant.eligibility && grant.eligibility.length <= 2) score += 5;
                  
                  // Boost for common grant uses
                  if (grant.grant_use?.some(use => 
                    use.includes('First-Time') || 
                    use.includes('Energy') || 
                    use.includes('Repair')
                  )) score += 5;
                  
                  return Math.min(95, Math.max(45, score));
                };
                
                const likelihood = calculateLikelihood();
                
                const statusColors = {
                  green: { 
                    bg: '#22c55e', 
                    border: '#22c55e',
                    text: 'white',
                    glow: '0 0 16px rgba(34, 197, 94, 0.4)',
                  },
                  blue: { 
                    bg: 'rgba(96, 165, 250, 0.25)', 
                    border: 'rgba(96, 165, 250, 0.5)',
                    text: '#60a5fa',
                    glow: '0 0 16px rgba(96, 165, 250, 0.3)',
                  },
                  red: { 
                    bg: 'rgba(239, 68, 68, 0.25)', 
                    border: 'rgba(239, 68, 68, 0.5)',
                    text: '#ef4444',
                    glow: '0 0 16px rgba(239, 68, 68, 0.3)',
                  },
                  gray: { 
                    bg: 'rgba(156, 163, 175, 0.25)', 
                    border: 'rgba(156, 163, 175, 0.5)',
                    text: '#9ca3af',
                    glow: '0 0 16px rgba(156, 163, 175, 0.2)',
                  },
                };

                return (
                  <motion.div
                    key={grant.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="backdrop-blur-xl"
                    style={{
                      background: 'rgba(74, 95, 127, 0.6)',
                      border: '1.5px solid rgba(94, 129, 172, 0.3)',
                      borderRadius: 'var(--radius-2xl)',
                      padding: 'var(--spacing-6)',
                      boxShadow: `
                        0 12px 32px rgba(0, 0, 0, 0.4),
                        0 8px 16px rgba(0, 0, 0, 0.3),
                        0 4px 8px rgba(0, 0, 0, 0.2),
                        0 2px 4px rgba(0, 0, 0, 0.15),
                        0 0 0 1px rgba(255, 255, 255, 0.05) inset
                      `,
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedGrant(grant)}
                  >
                    {/* Subtle Glow Effect */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: 'radial-gradient(circle at 20% 50%, rgba(94, 129, 172, 0.08) 0%, transparent 60%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Header Section */}
                    <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-4)', position: 'relative' }}>
                      <div style={{ flex: 1, marginRight: 'var(--spacing-4)' }}>
                        <h3 style={{ 
                          color: 'white',
                          marginBottom: 'var(--spacing-2)',
                        }}>
                          {grant.title}
                        </h3>
                        <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
                          <span style={{ 
                            color: 'rgba(255, 255, 255, 0.6)',
                            padding: 'var(--spacing-1) var(--spacing-2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 'var(--radius-sm)',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          }}>
                            {grant.grant_id}
                          </span>
                          {grant.amount && (
                            <span style={{ 
                              color: '#fbbf24',
                              padding: 'var(--spacing-1) var(--spacing-2)',
                              backgroundColor: 'rgba(251, 191, 36, 0.15)',
                              borderRadius: 'var(--radius-sm)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--spacing-1)',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            }}>
                              <DollarSign style={{ width: '14px', height: '14px' }} />
                              {grant.amount}
                            </span>
                          )}
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                          padding: 'var(--spacing-2) var(--spacing-4)',
                          borderRadius: 'var(--radius-lg)',
                          backgroundColor: statusColors[status.color].bg,
                          border: status.color === 'green' ? 'none' : `1px solid ${statusColors[status.color].border}`,
                          color: statusColors[status.color].text,
                          whiteSpace: 'nowrap',
                          boxShadow: statusColors[status.color].glow,
                        }}
                      >
                        {status.text}
                      </motion.div>
                    </div>

                    {/* Description */}
                    {grant.quick_description && (
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: 'var(--spacing-4)',
                        lineHeight: '1.6',
                      }}>
                        {grant.quick_description}
                      </p>
                    )}

                    {/* Qualification Likelihood */}
                    <div style={{ marginBottom: 'var(--spacing-4)' }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-2)' }}>
                        <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
                          <Star style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
                          <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            Qualification Match
                          </span>
                        </div>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.2, type: 'spring' }}
                          style={{
                            color: likelihood >= 80 ? '#22c55e' : likelihood >= 65 ? '#60a5fa' : '#fbbf24',
                            padding: 'var(--spacing-1) var(--spacing-3)',
                            background: likelihood >= 80 
                              ? 'rgba(34, 197, 94, 0.2)' 
                              : likelihood >= 65 
                              ? 'rgba(96, 165, 250, 0.2)' 
                              : 'rgba(251, 191, 36, 0.2)',
                            border: likelihood >= 80 
                              ? '1px solid rgba(34, 197, 94, 0.4)' 
                              : likelihood >= 65 
                              ? '1px solid rgba(96, 165, 250, 0.4)' 
                              : '1px solid rgba(251, 191, 36, 0.4)',
                            borderRadius: 'var(--radius-full)',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          {likelihood}%
                        </motion.span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2) inset',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${likelihood}%` }}
                          transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
                          style={{
                            height: '100%',
                            background: likelihood >= 80 
                              ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                              : likelihood >= 65
                              ? 'linear-gradient(90deg, #60a5fa, #3b82f6)'
                              : 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                            borderRadius: 'var(--radius-full)',
                            boxShadow: likelihood >= 80 
                              ? '0 0 12px rgba(34, 197, 94, 0.6)'
                              : likelihood >= 65
                              ? '0 0 12px rgba(96, 165, 250, 0.6)'
                              : '0 0 12px rgba(251, 191, 36, 0.6)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
                      {grant.grant_use?.slice(0, 3).map((use, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05, y: -1 }}
                          style={{
                            padding: 'var(--spacing-1) var(--spacing-3)',
                            background: 'rgba(96, 165, 250, 0.2)',
                            border: '1px solid rgba(96, 165, 250, 0.4)',
                            borderRadius: 'var(--radius-full)',
                            color: '#60a5fa',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          {use}
                        </motion.span>
                      ))}
                      {grant.is_nationwide && (
                        <motion.span
                          whileHover={{ scale: 1.05, y: -1 }}
                          style={{
                            padding: 'var(--spacing-1) var(--spacing-3)',
                            background: 'rgba(34, 197, 94, 0.2)',
                            border: '1px solid rgba(34, 197, 94, 0.4)',
                            borderRadius: 'var(--radius-full)',
                            color: '#22c55e',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-1)',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          <Globe style={{ width: '14px', height: '14px' }} />
                          Nationwide
                        </motion.span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div style={{ flex: 1 }}>
                        <div className="flex items-center" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
                          <Calendar style={{ width: '14px', height: '14px', color: 'rgb(var(--color-text-tertiary))' }} />
                          <span style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                            {formatDate(grant.open_date)} → {formatDate(grant.close_date)}
                          </span>
                        </div>
                        {timeRemaining && (
                          <motion.p 
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ 
                              color: 'rgb(var(--color-warning))',
                            }}
                          >
                            ⚡ {timeRemaining}
                          </motion.p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05, x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (grant.link) window.open(grant.link, '_blank');
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                          color: 'white',
                          padding: 'var(--spacing-3) var(--spacing-5)',
                          borderRadius: 'var(--radius-xl)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-2)',
                          boxShadow: `
                            0 6px 16px rgba(0, 0, 0, 0.3),
                            0 3px 8px rgba(0, 0, 0, 0.2),
                            0 0 0 1px rgba(255, 255, 255, 0.1) inset
                          `,
                          cursor: 'pointer',
                        }}
                      >
                        Apply Now
                        <ExternalLink style={{ width: '16px', height: '16px' }} />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center backdrop-blur-xl" 
            style={{ 
              padding: 'var(--spacing-12)', 
              textAlign: 'center',
              background: 'rgba(74, 95, 127, 0.6)',
              borderRadius: 'var(--radius-2xl)',
              border: '1.5px solid rgba(94, 129, 172, 0.3)',
              boxShadow: `
                0 12px 32px rgba(0, 0, 0, 0.4),
                0 8px 16px rgba(0, 0, 0, 0.3),
                0 4px 8px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset
              `,
            }}
          >
            <Search style={{ width: '64px', height: '64px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: 'var(--spacing-4)' }} />
            <h3 style={{ 
              color: 'white',
              marginBottom: 'var(--spacing-2)',
            }}>
              No grants found
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: 'var(--spacing-6)',
            }}>
              Try adjusting your search or filters
            </p>
            <Button 
              variant="outline" 
              onClick={resetFilters}
              style={{
                background: 'linear-gradient(135deg, rgba(214, 158, 46, 0.1), rgba(49, 130, 206, 0.1))',
                border: '1px solid rgba(214, 158, 46, 0.3)',
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Filters Modal */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent
          className="backdrop-blur-md max-w-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(var(--color-background-surface), 0.98), rgba(var(--color-background-surface), 0.95))',
            border: '1px solid rgba(214, 158, 46, 0.3)',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: '0 8px 32px rgba(214, 158, 46, 0.2)',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ 
              color: 'rgb(var(--color-text-primary))',
              background: 'linear-gradient(135deg, rgb(var(--color-copa-blue)), rgb(var(--color-electric-blue)), rgb(var(--color-goldenrod)))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Filter Grants
            </DialogTitle>
            <DialogDescription style={{ 
              fontFamily: 'Roboto',
              color: 'rgb(var(--color-text-secondary))',
            }}>
              Customize your grant search with filters for type, insurance, and qualification match.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col" style={{ gap: 'var(--spacing-5)', padding: 'var(--spacing-4) 0' }}>
            {/* Status Filter */}
            <div>
              <label style={{ 
                color: 'rgb(var(--color-text-primary))',
                marginBottom: 'var(--spacing-2)',
                display: 'block',
              }}>
                Status
              </label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ViewMode)}>
                <SelectTrigger style={{
                  backgroundColor: 'rgba(var(--color-background-tertiary), 0.5)',
                  border: '1px solid rgba(214, 158, 46, 0.2)',
                  color: 'rgb(var(--color-text-primary))',
                }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open ({stats.open})</SelectItem>
                  <SelectItem value="upcoming">Upcoming ({stats.upcoming})</SelectItem>
                  <SelectItem value="closed">Closed ({stats.closed})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grant Use Filter */}
            <div>
              <label style={{ 
                color: 'rgb(var(--color-text-primary))',
                marginBottom: 'var(--spacing-2)',
                display: 'block',
              }}>
                Grant Use
              </label>
              <Select value={grantUseFilter} onValueChange={setGrantUseFilter}>
                <SelectTrigger style={{
                  backgroundColor: 'rgba(var(--color-background-tertiary), 0.5)',
                  border: '1px solid rgba(214, 158, 46, 0.2)',
                  color: 'rgb(var(--color-text-primary))',
                }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Uses</SelectItem>
                  {filterOptions.grant_uses.map(use => (
                    <SelectItem key={use} value={use}>{use}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Eligibility Filter */}
            <div>
              <label style={{ 
                color: 'rgb(var(--color-text-primary))',
                marginBottom: 'var(--spacing-2)',
                display: 'block',
              }}>
                Eligibility
              </label>
              <Select value={eligibilityFilter} onValueChange={setEligibilityFilter}>
                <SelectTrigger style={{
                  backgroundColor: 'rgba(var(--color-background-tertiary), 0.5)',
                  border: '1px solid rgba(214, 158, 46, 0.2)',
                  color: 'rgb(var(--color-text-primary))',
                }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requirements</SelectItem>
                  {filterOptions.eligibility_requirements.map(req => (
                    <SelectItem key={req} value={req}>{req}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Grant Type Filter */}
            <div>
              <label style={{ 
                color: 'rgb(var(--color-text-primary))',
                marginBottom: 'var(--spacing-2)',
                display: 'block',
              }}>
                Grant Type
              </label>
              <Select value={grantTypeFilter} onValueChange={setGrantTypeFilter}>
                <SelectTrigger style={{
                  backgroundColor: 'rgba(var(--color-background-tertiary), 0.5)',
                  border: '1px solid rgba(214, 158, 46, 0.2)',
                  color: 'rgb(var(--color-text-primary))',
                }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {filterOptions.grant_types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Insurance Compatibility Filter */}
            <div>
              <label style={{ 
                color: 'rgb(var(--color-text-primary))',
                marginBottom: 'var(--spacing-2)',
                display: 'block',
              }}>
                Insurance Compatibility
              </label>
              <Select value={insuranceFilter} onValueChange={setInsuranceFilter}>
                <SelectTrigger style={{
                  backgroundColor: 'rgba(var(--color-background-tertiary), 0.5)',
                  border: '1px solid rgba(214, 158, 46, 0.2)',
                  color: 'rgb(var(--color-text-primary))',
                }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Insurance Types</SelectItem>
                  {filterOptions.insurance_types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Qualification Match Filter */}
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 'var(--spacing-2)',
              }}>
                <label style={{ 
                  color: 'rgb(var(--color-text-primary))',
                }}>
                  Minimum Qualification Match
                </label>
                <span style={{ 
                  fontFamily: 'Roboto',
                  fontSize: 'var(--text-sm)',
                  color: 'rgb(var(--color-goldenrod))',
                }}>
                  {minQualificationMatch === 0 ? 'Any' : `${minQualificationMatch}%`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="95"
                step="5"
                value={minQualificationMatch}
                onChange={(e) => setMinQualificationMatch(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'rgb(var(--color-goldenrod))',
                }}
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: 'var(--spacing-2)',
              }}>
                <span style={{ 
                  fontFamily: 'Roboto',
                  fontSize: 'var(--text-xs)',
                  color: 'rgb(var(--color-text-tertiary))',
                }}>
                  0%
                </span>
                <span style={{ 
                  fontFamily: 'Roboto',
                  fontSize: 'var(--text-xs)',
                  color: 'rgb(var(--color-text-tertiary))',
                }}>
                  95%
                </span>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label style={{ 
                color: 'rgb(var(--color-text-primary))',
                marginBottom: 'var(--spacing-2)',
                display: 'block',
              }}>
                Sort By
              </label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                <SelectTrigger style={{
                  backgroundColor: 'rgba(var(--color-background-tertiary), 0.5)',
                  border: '1px solid rgba(214, 158, 46, 0.2)',
                  color: 'rgb(var(--color-text-primary))',
                }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Close Date (Latest First)</SelectItem>
                  <SelectItem value="date-asc">Close Date (Earliest First)</SelectItem>
                  <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                  <SelectItem value="status">Status (Open First)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={resetFilters}
              style={{
                border: '1px solid rgba(214, 158, 46, 0.3)',
              }}
            >
              Reset All
            </Button>
            <Button
              onClick={() => setShowFilters(false)}
              style={{
                background: 'linear-gradient(135deg, rgb(var(--color-copa-blue)), rgb(var(--color-electric-blue)))',
                color: 'white',
                boxShadow: '0 4px 12px rgba(49, 130, 206, 0.4)',
              }}
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0" style={{ marginBottom: 'var(--spacing-4)' }}>
        <BottomNavigation onNavigate={() => {}} activeTab="grants" />
      </div>
    </div>
  );
}
