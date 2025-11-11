/**
 * ==============================================================================
 * USERPERSONASCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: User profile with personal info, preferences, rewards, and settings.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. PROFILE LAYOUT:
 *    - Avatar with edit capability
 *    - Info cards
 *    - Settings options
 * 
 * 2. IMAGE PICKER:
 *    - expo-image-picker for avatar
 * 
 * 3. FORMS:
 *    - TextInput for editing
 *    - Save changes
 * 
 * 4. REQUIRED API:
 *    - GET /api/user/profile
 *    - PUT /api/user/profile
 *    - POST /api/user/avatar
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Profile loads
 * - [ ] Edit works
 * - [ ] Avatar upload
 * - [ ] Save successful
 * - [ ] iOS and Android compatible
 * 
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, MapPin, Mail, Phone, Home, Calendar, 
  Award, Gift, Star, Shield, TrendingUp, 
  Edit, Camera, ChevronRight, CheckCircle, 
  BadgeCheck, Sparkles, Crown, Briefcase,
  DollarSign, Building2, Copy, ExternalLink,
  Verified, Clock, Bell, Settings, Share2,
  Upload, FileText, Zap, Target, Activity,
  CreditCard, Package, AlertCircle, Plus,
  ArrowRight, TrendingDown, X, Check
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../components/ui/sheet';
import { Progress } from '../components/ui/progress';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { toast } from 'sonner@2.0.3';
import { LiquidGlassHeader } from '../components/LiquidGlassHeader';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

/* ==================== TYPES ==================== */
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  memberSince: string;
  membershipTier: 'Basic' | 'Premium' | 'Elite';
  emailVerified: boolean;
  phoneVerified: boolean;
  avatarUrl?: string;
  initials: string;
}

interface PersonalDetail {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  editable: boolean;
  helpText?: string;
  fieldType: 'text' | 'select' | 'number';
  options?: string[];
}

interface MembershipBenefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  tier: 'Basic' | 'Premium' | 'Elite';
  imageUrl?: string;
}

interface GrantOpportunity {
  id: string;
  title: string;
  amount: string;
  amountValue: number;
  eligible: boolean;
  requirements: string[];
  deadline?: string;
  applicationStatus?: 'not_started' | 'in_progress' | 'submitted' | 'approved';
}

interface LinkedProperty {
  id: string;
  address: string;
  type: 'primary' | 'secondary' | 'rental';
  lastInspection?: string;
  status: 'active' | 'pending' | 'attention';
}

interface ActivityItem {
  id: string;
  type: 'inspection' | 'grant' | 'membership' | 'policy';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
}

/* ==================== MOCK DATA ==================== */
const USER_PROFILE: UserProfile = {
  name: 'Sarah Johnson',
  email: 'sarah.j@policyangel.com',
  phone: '+1 (415) 789-4523',
  address: '8101 Bobwhite Dr',
  city: 'San Francisco',
  state: 'CA',
  zip: '94131',
  memberSince: 'January 2023',
  membershipTier: 'Premium',
  emailVerified: true,
  phoneVerified: true,
  initials: 'SJ'
};

const PERSONAL_DETAILS: PersonalDetail[] = [
  {
    id: 'occupation',
    label: 'Occupation',
    value: 'Software Engineer',
    icon: <Briefcase size={18} />,
    editable: true,
    helpText: 'Helps qualify for professional discounts',
    fieldType: 'text'
  },
  {
    id: 'household-income',
    label: 'Household Income Range',
    value: '$75,000 - $100,000',
    icon: <DollarSign size={18} />,
    editable: true,
    helpText: 'Required for grant eligibility',
    fieldType: 'select',
    options: ['Under $50,000', '$50,000 - $75,000', '$75,000 - $100,000', '$100,000 - $150,000', 'Over $150,000']
  },
  {
    id: 'home-ownership',
    label: 'Home Ownership',
    value: 'Owned - Primary Residence',
    icon: <Home size={18} />,
    editable: true,
    helpText: 'Affects available programs',
    fieldType: 'select',
    options: ['Owned - Primary Residence', 'Owned - Secondary', 'Renting', 'Other']
  },
  {
    id: 'property-age',
    label: 'Property Year Built',
    value: '1998',
    icon: <Building2 size={18} />,
    editable: true,
    helpText: 'May qualify for renovation grants',
    fieldType: 'number'
  }
];

const MEMBERSHIP_BENEFITS: MembershipBenefit[] = [
  {
    id: '1',
    title: 'Priority Inspections',
    description: 'Get 24-hour turnaround on drone inspections with priority scheduling and dedicated flight crews for your properties',
    icon: <Star size={24} />,
    active: true,
    tier: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1599875140968-b4e3c63d6cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGFlcmlhbCUyMHByb3BlcnR5fGVufDF8fHx8MTc2MjQxMjg5OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    title: 'Dedicated Support',
    description: 'Round-the-clock access to insurance specialists and concierge service for all your property needs',
    icon: <BadgeCheck size={24} />,
    active: true,
    tier: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1674932421741-a4c3536a3157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjBjb25jaWVyZ2V8ZW58MXx8fHwxNzYyNDEyODk4fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '3',
    title: 'Annual Credits',
    description: 'Receive $500 in annual inspection credits plus exclusive discounts on premium services',
    icon: <Gift size={24} />,
    active: true,
    tier: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1622190994281-8b48849440e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXdhcmRzJTIwbW9uZXklMjBnb2xkZW58ZW58MXx8fHwxNzYyNDEyODk4fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '4',
    title: 'Premium Reports',
    description: 'Access detailed AI-powered risk assessments with predictive analytics and actionable insights',
    icon: <Sparkles size={24} />,
    active: true,
    tier: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MjM4Mjk4OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '5',
    title: 'Grant Assistance',
    description: 'Personalized grant matching and application support to maximize your property improvement funding',
    icon: <Award size={24} />,
    active: true,
    tier: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1696861270495-7f35c35c3273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc3Npc3RhbmNlJTIwaGFuZHNoYWtlfGVufDF8fHx8MTc2MjQxMjg5OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '6',
    title: 'Elite Network',
    description: 'Gain exclusive access to our preferred contractor network and VIP property management services',
    icon: <Crown size={24} />,
    active: false,
    tier: 'Elite',
    imageUrl: 'https://images.unsplash.com/photo-1758239744937-eb1e608a6d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcmVtaXVtJTIwbmV0d29ya3xlbnwxfHx8fDE3NjI0MTI4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const GRANT_OPPORTUNITIES: GrantOpportunity[] = [
  {
    id: '1',
    title: 'Energy Efficiency Upgrade Grant',
    amount: 'Up to $2,500',
    amountValue: 2500,
    eligible: true,
    requirements: ['Primary residence', 'Home built before 2000', 'Income qualified'],
    deadline: '2025-12-31',
    applicationStatus: 'not_started'
  },
  {
    id: '2',
    title: 'Storm Hardening Program',
    amount: 'Up to $5,000',
    amountValue: 5000,
    eligible: true,
    requirements: ['High-risk zone', 'Property inspection completed'],
    deadline: '2025-11-15',
    applicationStatus: 'not_started'
  },
  {
    id: '3',
    title: 'Wildfire Mitigation Grant',
    amount: 'Up to $3,000',
    amountValue: 3000,
    eligible: false,
    requirements: ['WUI zone property', 'Defensible space plan'],
    deadline: '2025-10-30',
    applicationStatus: 'not_started'
  }
];

const LINKED_PROPERTIES: LinkedProperty[] = [
  {
    id: '1',
    address: '8101 Bobwhite Dr, San Francisco, CA',
    type: 'primary',
    lastInspection: '2025-09-15',
    status: 'active'
  },
  {
    id: '2',
    address: '2847 Lake Shore Blvd, Oakland, CA',
    type: 'rental',
    lastInspection: '2025-08-22',
    status: 'attention'
  }
];

const ACTIVITY_TIMELINE: ActivityItem[] = [
  {
    id: '1',
    type: 'inspection',
    title: 'Roof Inspection Completed',
    description: 'Drone inspection report available',
    timestamp: '2 days ago',
    icon: <Camera size={16} />,
    color: 'rgb(var(--color-copa-blue))'
  },
  {
    id: '2',
    type: 'grant',
    title: 'Grant Eligibility Updated',
    description: '2 new grants available for you',
    timestamp: '1 week ago',
    icon: <Award size={16} />,
    color: 'rgb(var(--color-success))'
  },
  {
    id: '3',
    type: 'membership',
    title: 'Premium Benefits Activated',
    description: 'Welcome to Premium tier',
    timestamp: '2 weeks ago',
    icon: <Star size={16} />,
    color: 'rgb(var(--color-goldenrod))'
  },
  {
    id: '4',
    type: 'policy',
    title: 'Policy Renewed',
    description: 'Annual policy renewal completed',
    timestamp: '3 weeks ago',
    icon: <FileText size={16} />,
    color: 'rgb(var(--color-info))'
  }
];

/* ==================== SLIDE TO START BUTTON COMPONENT ==================== */
const SlideToStartButton = () => {
  return (
    <button
      onClick={() => {
        toast.success('Opening Benefits Survey...', {
          description: 'Get ready to unlock personalized benefits!'
        });
      }}
      style={{
        position: 'relative',
        width: '100%',
        padding: 'var(--spacing-4)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        e.currentTarget.style.borderColor = 'rgba(var(--color-goldenrod), 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {/* Arrow Container - Centered */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {/* Animated Arrows Layer 1 */}
        <motion.div
          animate={{
            x: ['0%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          style={{
            position: 'absolute',
            left: '-100%',
            display: 'flex',
            gap: '80px',
            alignItems: 'center',
            width: '200%'
          }}
        >
          {[...Array(20)].map((_, i) => (
            <ChevronRight 
              key={i} 
              size={24} 
              style={{ 
                color: 'rgba(255, 255, 255, 0.15)',
                minWidth: '24px',
                flexShrink: 0
              }} 
            />
          ))}
        </motion.div>

        {/* Animated Arrows Layer 2 - Offset for continuous flow */}
        <motion.div
          animate={{
            x: ['0%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
            delay: 2.67
          }}
          style={{
            position: 'absolute',
            left: '-100%',
            display: 'flex',
            gap: '80px',
            alignItems: 'center',
            width: '200%'
          }}
        >
          {[...Array(20)].map((_, i) => (
            <ChevronRight 
              key={i} 
              size={24} 
              style={{ 
                color: 'rgba(255, 255, 255, 0.12)',
                minWidth: '24px',
                flexShrink: 0
              }} 
            />
          ))}
        </motion.div>

        {/* Animated Arrows Layer 3 - Another Offset for continuous flow */}
        <motion.div
          animate={{
            x: ['0%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
            delay: 5.33
          }}
          style={{
            position: 'absolute',
            left: '-100%',
            display: 'flex',
            gap: '80px',
            alignItems: 'center',
            width: '200%'
          }}
        >
          {[...Array(20)].map((_, i) => (
            <ChevronRight 
              key={i} 
              size={24} 
              style={{ 
                color: 'rgba(255, 255, 255, 0.10)',
                minWidth: '24px',
                flexShrink: 0
              }} 
            />
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1
      }}>
        <span style={{
          color: 'rgb(var(--color-copa-blue))',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-weight-bold)'
        }}>
          Start Survey
        </span>
        <ChevronRight size={24} style={{ color: 'rgb(var(--color-copa-blue))' }} />
      </div>
    </button>
  );
};

/* ==================== ANIMATION VARIANTS ==================== */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    rotateX: -95,
    y: -40,
    scaleY: 0.05,
    transformPerspective: 2000,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scaleY: 1,
    transformPerspective: 2000,
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      opacity: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1]
      },
      rotateX: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1]
      },
      scaleY: {
        duration: 1.8,
        ease: [0.34, 1.56, 0.64, 1]
      },
      y: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }
};

/* ==================== HELPER FUNCTIONS ==================== */
const getTierColor = (tier: UserProfile['membershipTier']) => {
  switch (tier) {
    case 'Elite': return 'rgb(var(--color-goldenrod))';
    case 'Premium': return 'rgb(var(--color-copa-blue))';
    case 'Basic': return 'rgb(var(--color-success))';
    default: return 'var(--text-secondary)';
  }
};

const getTierGradient = (tier: UserProfile['membershipTier']) => {
  switch (tier) {
    case 'Elite': return 'linear-gradient(135deg, #8B6914 0%, #B8860B 50%, #DAA520 100%)';
    case 'Premium': return 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #1e40af 100%)';
    case 'Basic': return 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)';
    default: return 'linear-gradient(135deg, rgb(var(--color-text-secondary)), rgb(var(--color-text-tertiary)))';
  }
};

const calculateProfileCompletion = () => {
  let completed = 0;
  const total = 10; // Total checkpoints

  // Basic info (3 points)
  if (USER_PROFILE.name) completed++;
  if (USER_PROFILE.email && USER_PROFILE.emailVerified) completed++;
  if (USER_PROFILE.phone && USER_PROFILE.phoneVerified) completed++;

  // Personal details (4 points)
  PERSONAL_DETAILS.forEach(detail => {
    if (detail.value) completed++;
  });

  // Additional (3 points)
  if (USER_PROFILE.avatarUrl) completed++;
  if (LINKED_PROPERTIES.length > 0) completed++;
  if (USER_PROFILE.membershipTier !== 'Basic') completed++;

  return Math.round((completed / total) * 100);
};

const getPropertyStatusColor = (status: LinkedProperty['status']) => {
  switch (status) {
    case 'active': return 'rgb(var(--color-success))';
    case 'pending': return 'rgb(var(--color-warning))';
    case 'attention': return 'rgb(var(--color-error))';
    default: return 'var(--text-secondary)';
  }
};

const formatDeadline = (deadline: string) => {
  const date = new Date(deadline);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Expired';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 30) return `${diffDays} days left`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const copyToClipboard = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  toast.success(`${label} copied to clipboard`);
};

/* ==================== MAIN COMPONENT ==================== */
interface UserPersonaScreenProps {
  onBack?: () => void;
  onNavigateToSurvey?: () => void;
}

export function UserPersonaScreen({ onBack, onNavigateToSurvey }: UserPersonaScreenProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedGrant, setExpandedGrant] = useState<string | null>(null);
  const [editingDetail, setEditingDetail] = useState<PersonalDetail | null>(null);
  const [editValue, setEditValue] = useState('');
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [grantDialogOpen, setGrantDialogOpen] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState<GrantOpportunity | null>(null);
  const [upgradeSheetOpen, setUpgradeSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const profileCompletion = calculateProfileCompletion();
  const eligibleGrants = GRANT_OPPORTUNITIES.filter(g => g.eligible);
  const totalPotentialSavings = eligibleGrants.reduce((sum, g) => sum + g.amountValue, 0);

  const handleEditDetail = (detail: PersonalDetail) => {
    setEditingDetail(detail);
    setEditValue(detail.value);
  };

  const handleSaveDetail = () => {
    if (editingDetail) {
      // Update the detail value
      const detailIndex = PERSONAL_DETAILS.findIndex(d => d.id === editingDetail.id);
      if (detailIndex !== -1) {
        PERSONAL_DETAILS[detailIndex].value = editValue;
      }
      toast.success('Detail updated successfully');
      setEditingDetail(null);
      setEditValue('');
    }
  };

  const handlePhotoUpload = () => {
    toast.success('Photo upload started');
    setPhotoDialogOpen(false);
  };

  const handleContactAction = (type: 'email' | 'phone') => {
    if (type === 'email') {
      window.location.href = `mailto:${USER_PROFILE.email}`;
    } else {
      window.location.href = `tel:${USER_PROFILE.phone}`;
    }
  };

  const handleGrantApply = (grant: GrantOpportunity) => {
    setSelectedGrant(grant);
    setGrantDialogOpen(true);
  };

  const handleSubmitGrantApplication = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Grant application submitted successfully');
      setIsLoading(false);
      setGrantDialogOpen(false);
      setExpandedGrant(null);
    }, 1500);
  };

  return (
    <TooltipProvider>
      <div 
        className="flex flex-col h-full w-full"
        style={{
          position: 'relative',
          zIndex: 'var(--z-base)'
        }}
      >
        {/* ==================== HEADER ==================== */}
        <LiquidGlassHeader 
          title="My Profile" 
          showBackButton={true}
          onBackPress={onBack}
          hideAccountButton={true}
        />

        {/* ==================== SCROLLABLE CONTENT ==================== */}
        <div 
          className="flex-1 overflow-y-auto"
          style={{
            paddingTop: '8px',
            paddingBottom: 'calc(var(--nav-height) + 120px)'
          }}
        >
          <motion.div
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              gap: 'var(--spacing-4)',
            }}
          >
          {/* ==================== STATS DASHBOARD HERO CARD ==================== */}
          <motion.div
            variants={cardVariants}
            className="backdrop-blur-md relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-2xl)',
              marginLeft: 'var(--spacing-6)',
              marginRight: 'var(--spacing-6)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Tier Gradient Background */}
            <div 
              style={{ 
                position: 'relative',
                overflow: 'hidden',
                background: getTierGradient(USER_PROFILE.membershipTier),
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--radius-2xl)'
              }}
            >
              {/* Subtle Shimmer Overlay */}
              <motion.div
                animate={{
                  opacity: [0.03, 0.08, 0.03],
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
                  backgroundSize: '200% 200%',
                  pointerEvents: 'none'
                }}
              />

              {/* Refined Dot Pattern Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.04,
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                mixBlendMode: 'overlay'
              }} />

              {/* Action Buttons - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 'var(--spacing-4)',
                  right: 'var(--spacing-4)',
                  display: 'flex',
                  gap: 'var(--spacing-2)',
                  zIndex: 10
                }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toast.info('Opening settings...')}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white'
                      }}
                    >
                      <Settings size={16} />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toast.success('Profile link copied!')}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white'
                      }}
                    >
                      <Share2 size={16} />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share Profile</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>

              {/* Profile Avatar - Floating Left */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginBottom: 'var(--spacing-4)'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px'
                }}>
                  {/* Profile Image Container with Glassmorphic Effect */}
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    border: '4px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: 'var(--shadow-depth-lg), 0 0 30px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))`,
                    backdropFilter: 'blur(20px)',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '42px',
                      fontWeight: 'var(--font-weight-bold)',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {USER_PROFILE.initials}
                    </div>
                  </div>

                  {/* Camera Edit Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setPhotoDialogOpen(true)}
                        style={{
                          position: 'absolute',
                          bottom: '0px',
                          right: '0px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          border: '3px solid rgba(255, 255, 255, 0.95)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: 'var(--shadow-depth-md)',
                          color: getTierColor(USER_PROFILE.membershipTier)
                        }}
                      >
                        <Camera size={14} />
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Change Photo</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </motion.div>

              {/* Name & Membership Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ marginBottom: 'var(--spacing-4)', position: 'relative', zIndex: 1 }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  marginBottom: 'var(--spacing-1)'
                }}>
                  <h2 style={{ 
                    color: 'white', 
                    margin: 0,
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}>
                    {USER_PROFILE.name}
                  </h2>
                  <Badge style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    fontSize: 'var(--text-xs)',
                    padding: '4px 10px',
                    fontWeight: 'var(--font-weight-bold)',
                    boxShadow: 'var(--shadow-depth-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-1)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {USER_PROFILE.membershipTier === 'Elite' && <Crown size={12} />}
                    {USER_PROFILE.membershipTier === 'Premium' && <Star size={12} />}
                    {USER_PROFILE.membershipTier === 'Basic' && <Shield size={12} />}
                    {USER_PROFILE.membershipTier}
                  </Badge>
                </div>
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  fontSize: 'var(--text-sm)',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                }}>
                  Member since {USER_PROFILE.memberSince}
                </div>
              </motion.div>

              {/* Total Value Delivered - Hero Metric */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-md"
                style={{
                  padding: 'var(--spacing-4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  marginBottom: 'var(--spacing-4)',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: 'var(--text-sm)',
                      marginBottom: 'var(--spacing-1)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}>
                      Total Value Delivered
                    </div>
                    <div style={{
                      color: 'white',
                      fontSize: '32px',
                      fontWeight: 'var(--font-weight-bold)',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                      lineHeight: 1
                    }}>
                      $12,450
                    </div>
                  </div>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <TrendingUp size={32} style={{ color: 'white' }} />
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-3)', position: 'relative', zIndex: 1 }}>
                {/* Stat 1: Inspections */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="backdrop-blur-md"
                  style={{
                    padding: 'var(--spacing-3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-depth-sm)',
                    transition: 'var(--transition-card)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-2)'
                  }}>
                    <motion.div 
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Camera size={18} style={{ color: 'white' }} />
                    </motion.div>
                    <div>
                      <div style={{
                        color: 'white',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        lineHeight: 1,
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                      }}>
                        12
                      </div>
                    </div>
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: 'var(--text-xs)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}>
                    Inspections Completed
                  </div>
                </motion.div>

                {/* Stat 2: Grant Money */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="backdrop-blur-md"
                  style={{
                    padding: 'var(--spacing-3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-depth-sm)',
                    transition: 'var(--transition-card)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-2)'
                  }}>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Award size={18} style={{ color: 'white' }} />
                    </motion.div>
                    <div>
                      <div style={{
                        color: 'white',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        lineHeight: 1,
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                      }}>
                        $7.5k
                      </div>
                    </div>
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: 'var(--text-xs)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}>
                    Grant Money Accessed
                  </div>
                </motion.div>

                {/* Stat 3: Properties */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="backdrop-blur-md"
                  style={{
                    padding: 'var(--spacing-3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-depth-sm)',
                    transition: 'var(--transition-card)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-2)'
                  }}>
                    <motion.div
                      animate={{ 
                        y: [0, -2, 0],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Home size={18} style={{ color: 'white' }} />
                    </motion.div>
                    <div>
                      <div style={{
                        color: 'white',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        lineHeight: 1,
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                      }}>
                        {LINKED_PROPERTIES.length}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: 'var(--text-xs)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}>
                    Properties Managed
                  </div>
                </motion.div>

                {/* Stat 4: Profile Completion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="backdrop-blur-md"
                  style={{
                    padding: 'var(--spacing-3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-depth-sm)',
                    transition: 'var(--transition-card)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-2)'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <svg width="36" height="36" style={{ transform: 'rotate(-90deg)' }}>
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.3)"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeDasharray={`${2 * Math.PI * 14}`}
                          strokeDashoffset={`${2 * Math.PI * 14 * (1 - profileCompletion / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div style={{
                        color: 'white',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        lineHeight: 1,
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                      }}>
                        {profileCompletion}%
                      </div>
                    </div>
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: 'var(--text-xs)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}>
                    Profile Complete
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Contact Info Section */}

          </motion.div>

          {/* ==================== BENEFITS SURVEY SECTION ==================== */}
          <div style={{
            paddingLeft: 'var(--spacing-6)',
            paddingRight: 'var(--spacing-6)',
            paddingTop: 'var(--spacing-8)',
            paddingBottom: 'var(--spacing-8)',
          }}>
            <motion.div variants={cardVariants}>
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (onNavigateToSurvey) {
                    onNavigateToSurvey();
                  } else {
                    toast.info('Opening benefits survey...');
                  }
                }}
                className="backdrop-blur-md"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-7)',
                  background: 'linear-gradient(135deg, rgba(var(--color-goldenrod), 0.25) 0%, rgba(var(--color-copa-blue), 0.2) 50%, rgba(var(--color-electric-blue), 0.15) 100%)',
                  border: '3px solid rgb(var(--color-goldenrod))',
                  borderRadius: 'var(--radius-2xl)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.8), 0 0 0 5px rgba(var(--color-goldenrod), 0.4), 0 0 0 8px rgba(var(--color-copa-blue), 0.3), 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 60px rgba(var(--color-goldenrod), 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.2), inset 0 0 80px rgba(var(--color-goldenrod), 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Premium Golden Glow */}
                <motion.div
                  animate={{
                    opacity: [0.1, 0.25, 0.1],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    right: '-50%',
                    bottom: '-50%',
                    background: 'radial-gradient(circle at 50% 0%, rgba(var(--color-goldenrod), 0.6) 0%, rgba(var(--color-copa-blue), 0.3) 40%, transparent 70%)',
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Shimmer Effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
                    pointerEvents: 'none',
                    transform: 'skewX(-20deg)'
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'linear-gradient(135deg, rgb(var(--color-copa-blue)), rgb(var(--color-electric-blue)))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--spacing-4)',
                      boxShadow: 'var(--shadow-depth-md), var(--glow-medium)',
                      color: 'white'
                    }}
                  >
                    <Award size={32} />
                  </motion.div>

                  {/* Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-1)',
                    padding: 'var(--spacing-1) var(--spacing-2)',
                    backgroundColor: 'rgba(var(--color-success), 0.15)',
                    border: '1px solid rgba(var(--color-success), 0.3)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'rgb(var(--color-success))',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    <Sparkles size={12} />
                    Unlock More Benefits
                  </div>

                  {/* Title */}
                  <h3 style={{
                    color: 'var(--text-primary)',
                    margin: 0,
                    marginBottom: 'var(--spacing-2)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--text-xl)'
                  }}>
                    Take the Benefits Survey
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: '1.5',
                    marginBottom: 'var(--spacing-4)',
                    margin: 0
                  }}>
                    Answer a few questions to help us match you with personalized grants, programs, and benefits you may qualify for.
                  </p>

                  {/* Features List */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    {[
                      { icon: <Target size={16} />, text: 'Personalized grant matching' },
                      { icon: <Zap size={16} />, text: 'Quick 5-minute survey' },
                      { icon: <TrendingUp size={16} />, text: 'Unlock exclusive offers' }
                    ].map((feature, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)'
                      }}>
                        <div style={{ 
                          color: 'rgb(var(--color-copa-blue))',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          {feature.icon}
                        </div>
                        <span style={{
                          color: 'var(--text-secondary)',
                          fontSize: 'var(--text-sm)'
                        }}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA - Slide to Start */}
                  <SlideToStartButton />
                </div>
              </motion.button>
            </motion.div>
          </div>

          {/* ==================== PROFESSIONAL PROFILE - RESUME STYLE ==================== */}
          <div style={{
            paddingLeft: 'var(--spacing-6)',
            paddingRight: 'var(--spacing-6)',
          }}>
            <motion.div 
              variants={cardVariants}
              className="backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(var(--color-background-secondary), 0.4)',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-5)',
                boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.08), 0 0 40px rgba(0, 0, 0, 0.25), 0 20px 50px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-4)' }}>
                <h3 style={{
                  color: 'var(--text-primary)',
                  margin: 0,
                  fontWeight: 'var(--font-weight-bold)',
                  fontFamily: 'Roboto'
                }}>
                  Professional Profile
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditMode(!isEditMode)}
                  style={{
                    padding: 'var(--spacing-1) var(--spacing-2)',
                    backgroundColor: isEditMode 
                      ? 'rgba(var(--color-copa-blue), 0.15)' 
                      : 'rgba(var(--color-background-secondary), 0.5)',
                    border: isEditMode 
                      ? '1px solid rgba(var(--color-copa-blue), 0.3)' 
                      : '1px solid rgba(var(--color-border-primary), 0.3)',
                    borderRadius: 'var(--radius-full)',
                    color: isEditMode ? 'rgb(var(--color-copa-blue))' : 'var(--text-secondary)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    cursor: 'pointer',
                    transition: 'var(--transition-button)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-1)',
                    fontFamily: 'Roboto'
                  }}
                >
                  {isEditMode ? <X size={12} /> : <Edit size={12} />}
                  {isEditMode ? 'Done' : 'Edit'}
                </motion.button>
              </div>

              {/* Experience Section */}
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  marginBottom: 'var(--spacing-2)',
                  paddingBottom: 'var(--spacing-2)',
                  borderBottom: '1px solid rgba(var(--color-goldenrod), 0.3)'
                }}>
                  <Briefcase size={14} style={{ color: 'rgb(var(--color-goldenrod))' }} />
                  <span style={{
                    color: 'var(--text-primary)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Roboto'
                  }}>
                    EXPERIENCE
                  </span>
                </div>
                <div style={{ paddingLeft: 'var(--spacing-4)' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--spacing-1)'
                  }}>
                    <span style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Roboto'
                    }}>
                      Software Engineer
                    </span>
                    {isEditMode && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditDetail(PERSONAL_DETAILS[0])}
                        style={{
                          padding: 'var(--spacing-1)',
                          color: 'rgb(var(--color-copa-blue))',
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none'
                        }}
                      >
                        <Edit size={12} />
                      </motion.button>
                    )}
                  </div>
                  <div style={{
                    color: 'var(--text-tertiary)',
                    fontSize: 'var(--text-xs)',
                    marginBottom: 'var(--spacing-1)',
                    fontFamily: 'Roboto'
                  }}>
                    Technology Sector • San Francisco Bay Area, CA • 2018 - Present
                  </div>
                </div>
              </div>

              {/* Property Details Section */}
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  marginBottom: 'var(--spacing-2)',
                  paddingBottom: 'var(--spacing-2)',
                  borderBottom: '1px solid rgba(var(--color-goldenrod), 0.3)'
                }}>
                  <Building2 size={14} style={{ color: 'rgb(var(--color-goldenrod))' }} />
                  <span style={{
                    color: 'var(--text-primary)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Roboto'
                  }}>
                    PROPERTY DETAILS
                  </span>
                </div>
                <div style={{ paddingLeft: 'var(--spacing-4)' }}>
                  <ul style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none'
                  }}>
                    <li style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--spacing-2)',
                      marginBottom: 'var(--spacing-2)'
                    }}>
                      <span style={{
                        color: 'rgb(var(--color-copa-blue))',
                        marginTop: '2px'
                      }}>•</span>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{
                          color: 'var(--text-secondary)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'Roboto'
                        }}>
                          Owned - Primary Residence
                        </span>
                        {isEditMode && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditDetail(PERSONAL_DETAILS[2])}
                            style={{
                              padding: 'var(--spacing-1)',
                              color: 'rgb(var(--color-copa-blue))',
                              cursor: 'pointer',
                              background: 'none',
                              border: 'none'
                            }}
                          >
                            <Edit size={12} />
                          </motion.button>
                        )}
                      </div>
                    </li>
                    <li style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--spacing-2)',
                      marginBottom: 'var(--spacing-2)'
                    }}>
                      <span style={{
                        color: 'rgb(var(--color-copa-blue))',
                        marginTop: '2px'
                      }}>•</span>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{
                          color: 'var(--text-secondary)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'Roboto'
                        }}>
                          Built in 1998 ({new Date().getFullYear() - 1998} years)
                        </span>
                        {isEditMode && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditDetail(PERSONAL_DETAILS[3])}
                            style={{
                              padding: 'var(--spacing-1)',
                              color: 'rgb(var(--color-copa-blue))',
                              cursor: 'pointer',
                              background: 'none',
                              border: 'none'
                            }}
                          >
                            <Edit size={12} />
                          </motion.button>
                        )}
                      </div>
                    </li>
                    <li style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--spacing-2)'
                    }}>
                      <span style={{
                        color: 'rgb(var(--color-copa-blue))',
                        marginTop: '2px'
                      }}>•</span>
                      <span style={{
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Roboto'
                      }}>
                        {LINKED_PROPERTIES.length} {LINKED_PROPERTIES.length === 1 ? 'Property' : 'Properties'} Managed
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Financial Profile Section */}
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  marginBottom: 'var(--spacing-2)',
                  paddingBottom: 'var(--spacing-2)',
                  borderBottom: '1px solid rgba(var(--color-goldenrod), 0.3)'
                }}>
                  <DollarSign size={14} style={{ color: 'rgb(var(--color-goldenrod))' }} />
                  <span style={{
                    color: 'var(--text-primary)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Roboto'
                  }}>
                    FINANCIAL PROFILE
                  </span>
                </div>
                <div style={{ paddingLeft: 'var(--spacing-4)' }}>
                  <ul style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none'
                  }}>
                    <li style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--spacing-2)'
                    }}>
                      <span style={{
                        color: 'rgb(var(--color-copa-blue))',
                        marginTop: '2px'
                      }}>•</span>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{
                          color: 'var(--text-secondary)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'Roboto'
                        }}>
                          Household Income: $75,000 - $100,000
                        </span>
                        {isEditMode && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditDetail(PERSONAL_DETAILS[1])}
                            style={{
                              padding: 'var(--spacing-1)',
                              color: 'rgb(var(--color-copa-blue))',
                              cursor: 'pointer',
                              background: 'none',
                              border: 'none'
                            }}
                          >
                            <Edit size={12} />
                          </motion.button>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Certifications Section */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  marginBottom: 'var(--spacing-2)',
                  paddingBottom: 'var(--spacing-2)',
                  borderBottom: '1px solid rgba(var(--color-goldenrod), 0.3)'
                }}>
                  <BadgeCheck size={14} style={{ color: 'rgb(var(--color-goldenrod))' }} />
                  <span style={{
                    color: 'var(--text-primary)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Roboto'
                  }}>
                    QUALIFICATIONS
                  </span>
                </div>
                <div style={{ paddingLeft: 'var(--spacing-4)' }}>
                  <ul style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none'
                  }}>
                    {[
                      { text: 'Email Verified', verified: USER_PROFILE.emailVerified },
                      { text: 'Phone Verified', verified: USER_PROFILE.phoneVerified },
                      { text: 'Premium Member', verified: USER_PROFILE.membershipTier === 'Premium' },
                      { text: 'Property Owner', verified: true },
                    ].map((qual, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)',
                        marginBottom: index < 3 ? 'var(--spacing-2)' : 0
                      }}>
                        <span style={{
                          color: 'rgb(var(--color-copa-blue))',
                        }}>•</span>
                        <span style={{
                          color: 'var(--text-secondary)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'Roboto'
                        }}>
                          {qual.text}
                        </span>
                        {qual.verified && (
                          <CheckCircle size={12} style={{ 
                            color: 'rgb(var(--color-success))',
                          }} />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ==================== MEMBERSHIP BENEFITS SECTION ==================== */}
          <div style={{
            paddingLeft: 'var(--spacing-6)',
            paddingRight: 'var(--spacing-6)',
          }}>
            <motion.div variants={cardVariants}>
              {/* Upgrade CTA - Moved to Top */}
              {USER_PROFILE.membershipTier !== 'Elite' && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUpgradeSheetOpen(true)}
                  style={{
                    width: '100%',
                    marginBottom: 'var(--spacing-8)',
                    padding: 'var(--spacing-4)',
                    background: 'linear-gradient(135deg, rgb(var(--color-goldenrod)), #F59E0B)',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white',
                    fontFamily: 'Roboto',
                    fontWeight: 'var(--font-weight-bold)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-depth-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-2)'
                  }}
                >
                  <Crown size={20} />
                  Upgrade to {USER_PROFILE.membershipTier === 'Premium' ? 'Elite' : 'Premium'}
                </motion.button>
              )}

              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-4)' }}>
                <h3 style={{
                  color: 'var(--text-primary)',
                  margin: 0,
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--text-lg)',
                  fontFamily: 'Roboto'
                }}>
                  Membership Benefits
                </h3>
                <Badge style={{
                  backgroundColor: `${getTierColor(USER_PROFILE.membershipTier)}20`,
                  color: getTierColor(USER_PROFILE.membershipTier),
                  border: 'none',
                  fontSize: 'var(--text-xs)',
                  padding: '4px 10px',
                  fontFamily: 'Roboto'
                }}>
                  {USER_PROFILE.membershipTier} Tier
                </Badge>
              </div>

              {/* Horizontal Scrolling Hero Cards */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.2
                    }
                  }
                }}
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-4)',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  paddingBottom: 'var(--spacing-3)',
                  marginLeft: 'calc(var(--spacing-6) * -1)',
                  marginRight: 'calc(var(--spacing-6) * -1)',
                  paddingLeft: 'var(--spacing-6)',
                  paddingRight: 'var(--spacing-6)',
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
                className="hide-scrollbar"
              >
                {MEMBERSHIP_BENEFITS.map((benefit, index) => {
                  const isAvailable = benefit.tier === USER_PROFILE.membershipTier || 
                    (USER_PROFILE.membershipTier === 'Elite') ||
                    (USER_PROFILE.membershipTier === 'Premium' && benefit.tier === 'Basic');

                  return (
                    <motion.div
                      key={benefit.id}
                      variants={{
                        hidden: { 
                          opacity: 0,
                          rotateX: -95,
                          y: -40,
                          scaleY: 0.05,
                          transformPerspective: 2000,
                        },
                        visible: {
                          opacity: 1,
                          rotateX: 0,
                          y: 0,
                          scaleY: 1,
                          transformPerspective: 2000,
                          transition: {
                            duration: 1.8,
                            ease: [0.16, 1, 0.3, 1],
                            opacity: {
                              duration: 1.2,
                              ease: [0.23, 1, 0.32, 1]
                            },
                            rotateX: {
                              duration: 1.8,
                              ease: [0.16, 1, 0.3, 1]
                            },
                            scaleY: {
                              duration: 1.8,
                              ease: [0.34, 1.56, 0.64, 1]
                            },
                            y: {
                              duration: 1.8,
                              ease: [0.16, 1, 0.3, 1]
                            }
                          }
                        }
                      }}
                      whileHover={isAvailable ? { scale: 1.02 } : {}}
                      whileTap={isAvailable ? { scale: 0.98 } : {}}
                      className="backdrop-blur-md"
                      style={{
                        minWidth: '85%',
                        height: '280px',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 'var(--radius-2xl)',
                        scrollSnapAlign: 'center',
                        transformStyle: 'preserve-3d',
                        border: isAvailable 
                          ? '1px solid rgba(255, 255, 255, 0.15)' 
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: isAvailable 
                          ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                          : '0 10px 30px rgba(0, 0, 0, 0.3)',
                        cursor: isAvailable ? 'pointer' : 'default'
                      }}
                      onClick={() => isAvailable && toast.info(`Viewing ${benefit.title}`)}
                    >
                      {/* Background Image */}
                      {benefit.imageUrl && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          opacity: isAvailable ? 1 : 0.4
                        }}>
                          <ImageWithFallback 
                            src={benefit.imageUrl}
                            alt={benefit.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                          {/* Gradient Overlay */}
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: isAvailable 
                              ? 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.4) 100%)'
                              : 'linear-gradient(to top, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.85) 50%, rgba(0, 0, 0, 0.7) 100%)'
                          }} />
                        </div>
                      )}

                      {/* Content Container */}
                      <div style={{
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 'var(--spacing-6)',
                        zIndex: 1
                      }}>
                        {/* Active/Locked Badge */}
                        <div style={{
                          position: 'absolute',
                          top: 'var(--spacing-4)',
                          right: 'var(--spacing-4)',
                        }}>
                          {isAvailable ? (
                            benefit.active && (
                              <Badge style={{
                                backgroundColor: 'rgba(var(--color-success), 0.2)',
                                color: 'rgb(var(--color-success))',
                                border: '1px solid rgba(var(--color-success), 0.4)',
                                fontSize: 'var(--text-xs)',
                                padding: '4px 10px',
                                fontFamily: 'Roboto',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <CheckCircle size={12} />
                                Active
                              </Badge>
                            )
                          ) : (
                            <Badge style={{
                              backgroundColor: 'rgba(var(--color-goldenrod), 0.2)',
                              color: 'rgb(var(--color-goldenrod))',
                              border: '1px solid rgba(var(--color-goldenrod), 0.4)',
                              fontSize: 'var(--text-xs)',
                              padding: '4px 10px',
                              fontFamily: 'Roboto',
                              backdropFilter: 'blur(10px)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Crown size={12} />
                              {benefit.tier}
                            </Badge>
                          )}
                        </div>

                        {/* Icon */}
                        <motion.div 
                          animate={isAvailable ? { 
                            scale: [1, 1.05, 1],
                          } : {}}
                          transition={isAvailable ? { 
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                          } : {}}
                          style={{
                            marginBottom: 'var(--spacing-4)',
                            color: isAvailable 
                              ? getTierColor(benefit.tier) 
                              : 'var(--text-disabled)',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: isAvailable 
                              ? 'rgba(255, 255, 255, 0.15)' 
                              : 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          {benefit.icon}
                        </motion.div>

                        {/* Title */}
                        <h4 style={{
                          color: isAvailable ? 'white' : 'var(--text-tertiary)',
                          fontSize: 'var(--text-xl)',
                          fontWeight: 'var(--font-weight-semibold)',
                          marginBottom: 'var(--spacing-2)',
                          fontFamily: 'Roboto',
                          margin: 0
                        }}>
                          {benefit.title}
                        </h4>

                        {/* Description */}
                        <p style={{
                          color: isAvailable ? 'rgba(255, 255, 255, 0.85)' : 'var(--text-disabled)',
                          fontSize: 'var(--text-sm)',
                          lineHeight: '1.5',
                          margin: 0,
                          fontFamily: 'Roboto'
                        }}>
                          {benefit.description}
                        </p>

                        {/* CTA Arrow */}
                        {isAvailable && (
                          <motion.div 
                            style={{
                              marginTop: 'var(--spacing-3)',
                              color: getTierColor(benefit.tier),
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--spacing-2)',
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-medium)'
                            }}
                          >
                            Learn more
                            <ArrowRight size={16} />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
        </div>
      </div>

      {/* ==================== DIALOGS & SHEETS ==================== */}
      
      {/* Edit Detail Dialog */}
      <Dialog open={editingDetail !== null} onOpenChange={(open) => !open && setEditingDetail(null)}>
        <DialogContent style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
          <DialogHeader>
            <DialogTitle>Edit {editingDetail?.label}</DialogTitle>
            <DialogDescription>
              Update your {editingDetail?.label.toLowerCase()}
            </DialogDescription>
          </DialogHeader>
          <div style={{ padding: 'var(--spacing-4) 0' }}>
            <Label htmlFor="edit-value">{editingDetail?.label}</Label>
            {editingDetail?.fieldType === 'select' ? (
              <Select value={editValue} onValueChange={setEditValue}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {editingDetail?.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="edit-value"
                type={editingDetail?.fieldType === 'number' ? 'number' : 'text'}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{ marginTop: 'var(--spacing-2)' }}
              />
            )}
            {editingDetail?.helpText && (
              <p style={{
                marginTop: 'var(--spacing-2)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                fontStyle: 'italic'
              }}>
                {editingDetail.helpText}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingDetail(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDetail} style={{ backgroundColor: 'rgb(var(--color-copa-blue))' }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Photo Upload Dialog */}
      <Dialog open={photoDialogOpen} onOpenChange={setPhotoDialogOpen}>
        <DialogContent style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
            <DialogDescription>
              Choose a photo to update your profile avatar
            </DialogDescription>
          </DialogHeader>
          <div style={{ padding: 'var(--spacing-4) 0', textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto var(--spacing-4)',
              borderRadius: '50%',
              background: getTierGradient(USER_PROFILE.membershipTier),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'var(--font-weight-bold)'
            }}>
              {USER_PROFILE.initials}
            </div>
            <Button
              onClick={handlePhotoUpload}
              style={{ 
                width: '100%',
                backgroundColor: 'rgb(var(--color-copa-blue))',
                marginBottom: 'var(--spacing-2)'
              }}
            >
              <Upload size={16} style={{ marginRight: 'var(--spacing-2)' }} />
              Upload New Photo
            </Button>
            <Button
              variant="outline"
              onClick={handlePhotoUpload}
              style={{ width: '100%' }}
            >
              <Camera size={16} style={{ marginRight: 'var(--spacing-2)' }} />
              Take Photo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Grant Application Dialog */}
      <Dialog open={grantDialogOpen} onOpenChange={setGrantDialogOpen}>
        <DialogContent style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
          <DialogHeader>
            <DialogTitle>Apply for Grant</DialogTitle>
            <DialogDescription>
              {selectedGrant?.title} - {selectedGrant?.amount}
            </DialogDescription>
          </DialogHeader>
          <div style={{ padding: 'var(--spacing-4) 0' }}>
            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <Label htmlFor="grant-reason">Why are you applying?</Label>
              <Textarea
                id="grant-reason"
                placeholder="Tell us about your project and how this grant will help..."
                style={{ marginTop: 'var(--spacing-2)', minHeight: '100px' }}
              />
            </div>
            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <Label htmlFor="grant-timeline">Project Timeline</Label>
              <Input
                id="grant-timeline"
                placeholder="When do you plan to complete this project?"
                style={{ marginTop: 'var(--spacing-2)' }}
              />
            </div>
            <div style={{
              padding: 'var(--spacing-3)',
              backgroundColor: 'rgba(var(--color-info), 0.1)',
              border: '1px solid rgba(var(--color-info), 0.2)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)'
            }}>
              💡 Your application will be reviewed by our grant specialists within 3-5 business days.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGrantDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitGrantApplication}
              disabled={isLoading}
              style={{ backgroundColor: 'rgb(var(--color-success))' }}
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upgrade Membership Sheet */}
      <Sheet open={upgradeSheetOpen} onOpenChange={setUpgradeSheetOpen}>
        <SheetContent 
          side="bottom" 
          style={{ 
            backgroundColor: 'var(--glass-bg)', 
            border: '1px solid var(--glass-border)',
            maxHeight: '80vh',
            overflow: 'auto'
          }}
        >
          <SheetHeader>
            <SheetTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <Crown style={{ color: 'rgb(var(--color-goldenrod))' }} />
              Upgrade Your Membership
            </SheetTitle>
            <SheetDescription>
              Unlock premium benefits and exclusive features
            </SheetDescription>
          </SheetHeader>
          <div style={{ padding: 'var(--spacing-4) 0' }}>
            {/* Premium Tier Card */}
            {USER_PROFILE.membershipTier === 'Basic' && (
              <div
                className="backdrop-blur-md"
                style={{
                  padding: 'var(--spacing-4)',
                  backgroundColor: 'rgba(var(--color-copa-blue), 0.1)',
                  border: '2px solid rgba(var(--color-copa-blue), 0.3)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--spacing-4)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-3)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
                      <Star size={20} style={{ color: 'rgb(var(--color-copa-blue))' }} />
                      <h4 style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 'var(--font-weight-bold)' }}>
                        Premium
                      </h4>
                    </div>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                      Perfect for homeowners
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'rgb(var(--color-copa-blue))' }}>
                      $49
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                      /month
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => { toast.success('Upgrade initiated!'); setUpgradeSheetOpen(false); }}
                  style={{ width: '100%', backgroundColor: 'rgb(var(--color-copa-blue))' }}
                >
                  Upgrade to Premium
                </Button>
              </div>
            )}

            {/* Elite Tier Card */}
            <div
              className="backdrop-blur-md"
              style={{
                padding: 'var(--spacing-4)',
                backgroundColor: 'rgba(var(--color-goldenrod), 0.1)',
                border: '2px solid rgba(var(--color-goldenrod), 0.3)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-3)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
                    <Crown size={20} style={{ color: 'rgb(var(--color-goldenrod))' }} />
                    <h4 style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 'var(--font-weight-bold)' }}>
                      Elite
                    </h4>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    Maximum coverage & benefits
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'rgb(var(--color-goldenrod))' }}>
                    $99
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    /month
                  </div>
                </div>
              </div>
              <Button
                onClick={() => { toast.success('Upgrade initiated!'); setUpgradeSheetOpen(false); }}
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, rgb(var(--color-goldenrod)), #F59E0B)',
                  color: 'white'
                }}
              >
                Upgrade to Elite
              </Button>
            </div>

            <div style={{
              marginTop: 'var(--spacing-4)',
              padding: 'var(--spacing-3)',
              backgroundColor: 'rgba(var(--color-info), 0.1)',
              border: '1px solid rgba(var(--color-info), 0.2)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}>
              💳 Cancel anytime. No hidden fees. 30-day money-back guarantee.
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
