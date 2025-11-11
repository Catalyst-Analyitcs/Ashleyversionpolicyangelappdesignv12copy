/**
 * ==============================================================================
 * LOCATESERVICESSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Service provider directory for contractors, plumbers, electricians, etc.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. SERVICE CARDS:
 *    - FlatList for service providers
 *    - Categories, ratings, contact
 * 
 * 2. MAP INTEGRATION:
 *    - react-native-maps showing providers
 *    - Location-based search
 * 
 * 3. REQUIRED API:
 *    - GET /api/services?location=...&category=...
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Services display
 * - [ ] Map shows locations
 * - [ ] Contact works
 * - [ ] iOS and Android compatible
 * 
 */

import { MapPin, Wrench, Home, Zap, Droplet, Star, Phone, Clock, Hammer, Trees, Settings, ArrowRight, SlidersHorizontal, X, CheckCircle2 } from "lucide-react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState } from "react";
import backgroundImage from "figma:asset/8218a9e8aecb9c4736edc83292edab12f0d54932.png";

export function LocateServicesScreen() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 50,
    damping: 30,
    mass: 0.5,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    priceRange: [] as string[],
    maxDistance: 10,
    maxResponseTime: 'all',
    specialties: [] as string[],
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
        scrollProgress.set(progress);
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollProgress]);

  const services = [
    {
      name: 'Electrical Services',
      category: 'Specialist',
      distance: '2.1 miles',
      icon: <Zap />,
      available: false,
      rating: 4.7,
      reviews: 156,
      responseTime: '1 day',
      price: '$$$',
      color: '#06b6d4',
    },
    {
      name: 'HVAC Maintenance',
      category: 'Climate Control',
      distance: '1.8 miles',
      icon: <Settings />,
      available: true,
      rating: 4.8,
      reviews: 142,
      responseTime: '45 min',
      price: '$$$',
      color: '#8b5cf6',
    },
    {
      name: 'Plumbing Solutions',
      category: 'Emergency Available',
      distance: '1.5 miles',
      icon: <Droplet />,
      available: true,
      rating: 5.0,
      reviews: 203,
      responseTime: '30 min',
      price: '$$',
      color: '#3b82f6',
    },
    {
      name: 'Emergency Repair',
      category: 'Urgent Service',
      distance: '0.8 miles',
      icon: <Wrench />,
      available: true,
      rating: 4.9,
      reviews: 127,
      responseTime: '15 min',
      price: '$$$',
      color: '#14b8a6',
    },
  ];

  const quickServices = [
    { name: 'Carpentry', icon: <Hammer />, color: '#d97706' },
    { name: 'Landscaping', icon: <Trees />, color: '#10b981' },
    { name: 'Appliance Repair', icon: <Settings />, color: '#8b5cf6' },
  ];

  // Get all unique specialties
  const allSpecialties = Array.from(new Set(services.map(s => s.category)));

  // Filter services based on selected filters
  const filteredServices = services.filter(service => {
    // Rating filter
    if (filters.minRating > 0 && service.rating < filters.minRating) return false;
    
    // Price filter
    if (filters.priceRange.length > 0 && !filters.priceRange.includes(service.price)) return false;
    
    // Distance filter
    const distanceMiles = parseFloat(service.distance.match(/[\d.]+/)?.[0] || '999');
    if (distanceMiles > filters.maxDistance) return false;
    
    // Response time filter
    if (filters.maxResponseTime !== 'all') {
      const responseMinutes = service.responseTime.includes('day') 
        ? 1440 
        : parseInt(service.responseTime.match(/\d+/)?.[0] || '999');
      const filterMinutes = parseInt(filters.maxResponseTime);
      if (responseMinutes > filterMinutes) return false;
    }
    
    // Specialty filter
    if (filters.specialties.length > 0 && !filters.specialties.includes(service.category)) return false;
    
    return true;
  });

  const togglePrice = (price: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange.includes(price)
        ? prev.priceRange.filter(p => p !== price)
        : [...prev.priceRange, price]
    }));
  };

  const toggleSpecialty = (specialty: string) => {
    setFilters(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const clearFilters = () => {
    setFilters({
      minRating: 0,
      priceRange: [],
      maxDistance: 10,
      maxResponseTime: 'all',
      specialties: [],
    });
  };

  const activeFiltersCount = 
    (filters.minRating > 0 ? 1 : 0) +
    filters.priceRange.length +
    (filters.maxDistance < 10 ? 1 : 0) +
    (filters.maxResponseTime !== 'all' ? 1 : 0) +
    filters.specialties.length;

  const getCardTransform = (index: number, progress: number) => {
    const totalCards = services.length;
    const cardProgress = progress * totalCards;
    const cardIndex = index;
    
    // Smooth easing function for buttery transitions
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t: number) => t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    // Calculate how far this card has progressed through its animation
    const rawProgress = cardProgress - cardIndex;
    const cardScrollProgress = Math.max(0, Math.min(1, rawProgress));
    
    // Calculate how far behind the current scroll position this card is
    const distanceFromActive = rawProgress;
    
    // Determine if this is the active card - crystal clear zone
    const isActive = distanceFromActive >= -0.15 && distanceFromActive <= 0.6;
    
    // Ultra-smooth Y translation with easing
    const y = easeOutCubic(cardScrollProgress) * -180;
    
    // Smooth opacity fade with gentle curve
    let opacity = 1;
    if (distanceFromActive > 0.8) {
      const fadeProgress = (distanceFromActive - 0.8) / 0.5;
      opacity = Math.max(0, 1 - easeInOutCubic(Math.min(1, fadeProgress)));
    }
    
    // Gentle scale with smooth easing
    const scale = 1 - (easeInOutCubic(cardScrollProgress) * 0.12);
    
    // Rotation for extra smoothness
    const rotateX = easeInOutCubic(cardScrollProgress) * 2;
    
    // Brightness - active card is brighter
    const brightness = isActive ? 1.05 : 0.95;
    
    return { y, opacity, scale, rotateX, brightness, isActive };
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="w-full h-full flex flex-col overflow-y-auto"
      style={{ 
        padding: 'var(--spacing-6)',
        gap: 'var(--spacing-4)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-12))',
        position: 'relative',
      }}
    >
      {/* Blue gradient on outer edges - weighted and intense (cards area only) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Bottom gradient - heavier */}
        <div
          style={{
            position: 'absolute',
            bottom: 'var(--nav-height)',
            left: 0,
            right: 0,
            height: '450px',
            background: 'radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.45) 0%, rgba(139, 92, 246, 0.35) 30%, rgba(99, 102, 241, 0.25) 50%, transparent 85%)',
            opacity: 1,
          }}
        />
        
        {/* Left edge gradient - weighted (starts below header) */}
        <div
          style={{
            position: 'absolute',
            top: '340px',
            bottom: 0,
            left: 0,
            width: '180px',
            background: 'linear-gradient(to right, rgba(59, 130, 246, 0.4) 0%, rgba(99, 102, 241, 0.25) 40%, transparent 100%)',
            opacity: 1,
          }}
        />
        
        {/* Right edge gradient - weighted (starts below header) */}
        <div
          style={{
            position: 'absolute',
            top: '340px',
            bottom: 0,
            right: 0,
            width: '180px',
            background: 'linear-gradient(to left, rgba(59, 130, 246, 0.4) 0%, rgba(99, 102, 241, 0.25) 40%, transparent 100%)',
            opacity: 1,
          }}
        />
        
        {/* Corner accents for extra weight - bottom only */}
        <div
          style={{
            position: 'absolute',
            bottom: 'var(--nav-height)',
            left: 0,
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
            opacity: 1,
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: 'var(--nav-height)',
            right: 0,
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle at bottom right, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
            opacity: 1,
          }}
        />
      </div>

      {/* Background image fixed at top */}
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
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4,
            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Header */}
      <div style={{ paddingTop: 'var(--spacing-16)', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: 'var(--spacing-2)'
        }}>
          <div>
            <h1 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
              Locate Services
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Find trusted service providers in the San Francisco area
            </p>
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            style={{
              position: 'relative',
              padding: 'var(--spacing-3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-md)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <SlidersHorizontal style={{ width: '20px', height: '20px', color: 'rgb(var(--color-text-primary))' }} />
            {activeFiltersCount > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(var(--color-goldenrod))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Roboto',
                  fontSize: '10px',
                  color: 'rgb(17, 24, 39)',
                }}
              >
                {activeFiltersCount}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Stacked Cards Container */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: 'var(--spacing-8)' }}>
        <div style={{ height: '2800px', position: 'relative' }}>
        {filteredServices.map((service, index) => {
          const transform = smoothProgress.get() !== undefined 
            ? getCardTransform(index, smoothProgress.get())
            : { y: 0, opacity: 1, scale: 1, rotateX: 0, brightness: 1, isActive: false };
          
          return (
            <div 
              key={index}
              style={{
                position: 'sticky',
                top: `${120 + index * 35}px`,
                marginBottom: index < services.length - 1 ? '30px' : '0',
              }}
            >
              {/* Soft gradient glow underneath */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  width: '95%',
                  height: '120px',
                  borderRadius: '50%',
                  background: `radial-gradient(ellipse at center, ${service.color}25 0%, ${service.color}15 25%, ${service.color}08 50%, transparent 75%)`,
                  opacity: transform.isActive ? 0.6 : 0.2,
                  filter: 'blur(40px)',
                  transform: 'translateX(-50%)',
                  zIndex: 0,
                  pointerEvents: 'none',
                  transition: 'opacity 0.4s ease',
                }}
              />
              
              <motion.div
                style={{
                  position: 'relative',
                  y: transform.y,
                  opacity: transform.opacity,
                  scale: transform.scale,
                  rotateX: transform.rotateX,
                  overflow: 'hidden',
                  background: transform.isActive 
                    ? `linear-gradient(135deg, rgba(30, 58, 95, 0.85) 0%, rgba(52, 74, 106, 0.8) 100%)`
                    : `linear-gradient(135deg, rgba(30, 58, 95, 0.75) 0%, rgba(52, 74, 106, 0.7) 100%)`,
                  backdropFilter: transform.isActive ? 'blur(24px)' : 'blur(16px)',
                  WebkitBackdropFilter: transform.isActive ? 'blur(24px)' : 'blur(16px)',
                  borderRadius: 'var(--radius-2xl)',
                  border: transform.isActive 
                    ? `1px solid rgba(138, 180, 248, 0.3)`
                    : `1px solid rgba(138, 180, 248, 0.15)`,
                  padding: '0',
                  boxShadow: transform.isActive
                    ? `
                      0 40px 80px rgba(0, 0, 0, 0.95), 
                      0 20px 40px rgba(0, 0, 0, 0.8), 
                      0 10px 20px rgba(0, 0, 0, 0.6), 
                      0 0 60px ${service.color}40,
                      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                      0 2px 0 0 rgba(255, 255, 255, 0.15) inset
                    `
                    : `
                      0 32px 64px rgba(0, 0, 0, 0.9), 
                      0 16px 32px rgba(0, 0, 0, 0.7), 
                      0 8px 16px rgba(0, 0, 0, 0.5),
                      0 0 0 1px rgba(255, 255, 255, 0.05) inset
                    `,
                  filter: `drop-shadow(0 12px 24px rgba(0, 0, 0, 0.6)) brightness(${transform.brightness})`,
                  transformOrigin: 'top center',
                  perspective: '1000px',
                  transition: 'border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                  zIndex: 1,
                }}
              >
              {/* Luxurious Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}08 40%, transparent 70%)`,
                  zIndex: 2,
                }}
              />

              {/* Shimmer Effect */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '200%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%)',
                  animation: transform.isActive ? 'shimmer 3s infinite' : 'none',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              {/* Top Highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '10%',
                  right: '10%',
                  height: '60%',
                  background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              {/* Content */}
              <div style={{ padding: 'var(--spacing-6)', position: 'relative', zIndex: 3 }}>
                <div className="flex items-start" style={{ gap: 'var(--spacing-4)' }}>
                  {/* Premium Icon with colored background */}
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center"
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: 'var(--radius-xl)',
                      background: `linear-gradient(135deg, ${service.color}50 0%, ${service.color}30 50%, ${service.color}20 100%)`,
                      border: `1px solid ${service.color}80`,
                      color: service.color,
                      flexShrink: 0,
                      boxShadow: `
                        0 8px 24px ${service.color}40,
                        0 4px 12px ${service.color}30,
                        0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                        0 1px 0 0 rgba(255, 255, 255, 0.2) inset
                      `,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Icon Inner Glow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '2px',
                        left: '2px',
                        right: '2px',
                        bottom: '2px',
                        borderRadius: 'var(--radius-lg)',
                        background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)`,
                        pointerEvents: 'none',
                      }}
                    />
                    <div style={{ width: '32px', height: '32px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}>
                      {service.icon}
                    </div>
                  </motion.div>

                  <div style={{ flex: 1 }}>
                    {/* Header row with name and availability */}
                    <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-1)' }}>
                      <div style={{ 
                        color: 'var(--text-primary)', 
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                      }}>
                        {service.name}
                      </div>
                      {service.available ? (
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center text-xs"
                          style={{ 
                            gap: 'var(--spacing-1)',
                            color: '#10b981',
                            padding: 'var(--spacing-1) var(--spacing-2)',
                            backgroundColor: 'rgba(16, 185, 129, 0.25)',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid rgba(16, 185, 129, 0.6)',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <div 
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#10b981',
                              boxShadow: '0 0 4px #10b981',
                            }}
                          />
                          Available
                        </motion.div>
                      ) : (
                        <div 
                          className="flex items-center text-xs"
                          style={{ 
                            gap: 'var(--spacing-1)',
                            color: '#9ca3af',
                            padding: 'var(--spacing-1) var(--spacing-2)',
                            backgroundColor: 'rgba(107, 114, 128, 0.3)',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid rgba(156, 163, 175, 0.4)',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          Busy
                        </div>
                      )}
                    </div>

                    <div style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                      fontSize: '0.875rem', 
                      marginBottom: 'var(--spacing-3)' 
                    }}>
                      {service.category}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-3)' }}>
                      <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                        <Star className="w-4 h-4" style={{ color: '#fbbf24', fill: '#fbbf24', filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' }} />
                        <span style={{ 
                          color: 'var(--text-primary)',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                        }}>
                          {service.rating}
                        </span>
                      </div>
                      <span style={{ 
                        color: 'rgba(255, 255, 255, 0.85)', 
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                        fontSize: '0.875rem' 
                      }}>
                        ({service.reviews} reviews)
                      </span>
                    </div>

                    {/* Luxury Info Grid */}
                    <div 
                      className="grid grid-cols-3 backdrop-blur-md"
                      style={{ 
                        gap: 'var(--spacing-4)',
                        padding: 'var(--spacing-4)',
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: `
                          0 4px 12px rgba(0, 0, 0, 0.3),
                          0 0 0 1px rgba(255, 255, 255, 0.05) inset
                        `,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Grid Inner Highlight */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
                          pointerEvents: 'none',
                        }}
                      />
                      <div className="flex flex-col items-center">
                        <MapPin className="w-4 h-4" style={{ color: service.color, marginBottom: 'var(--spacing-1)', filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' }} />
                        <span style={{ 
                          color: 'rgba(255, 255, 255, 0.95)', 
                          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                          fontSize: '0.75rem' 
                        }}>
                          {service.distance}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Clock className="w-4 h-4" style={{ color: service.color, marginBottom: 'var(--spacing-1)', filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' }} />
                        <span style={{ 
                          color: 'rgba(255, 255, 255, 0.95)', 
                          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                          fontSize: '0.75rem' 
                        }}>
                          {service.responseTime}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span style={{ 
                          color: service.color, 
                          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                          marginBottom: 'var(--spacing-1)' 
                        }}>
                          {service.price}
                        </span>
                        <span style={{ 
                          color: 'rgba(255, 255, 255, 0.95)', 
                          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                          fontSize: '0.75rem' 
                        }}>
                          Price
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Call to Action */}
                <motion.div
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center backdrop-blur-md"
                  style={{
                    marginTop: 'var(--spacing-5)',
                    padding: 'var(--spacing-4)',
                    borderRadius: 'var(--radius-xl)',
                    background: `linear-gradient(135deg, ${service.color}45 0%, ${service.color}30 50%, ${service.color}20 100%)`,
                    border: `1px solid ${service.color}90`,
                    gap: 'var(--spacing-2)',
                    boxShadow: `
                      0 6px 16px ${service.color}50,
                      0 3px 8px ${service.color}30,
                      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                      0 1px 0 0 rgba(255, 255, 255, 0.2) inset
                    `,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  {/* CTA Inner Glow */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <Phone className="w-5 h-5" style={{ color: service.color, filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) brightness(1.3)`, position: 'relative', zIndex: 1 }} />
                  <span style={{ 
                    color: service.color,
                    textShadow: `0 2px 6px ${service.color}80`,
                    filter: 'brightness(1.3)',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    Contact Provider
                  </span>
                </motion.div>
              </div>
            </motion.div>
            </div>
          );
        })}
        </div>

        {/* Quick Service Categories */}
        <div 
          className="grid grid-cols-3"
          style={{ 
            gap: 'var(--spacing-3)',
            marginTop: 'var(--spacing-12)',
            marginBottom: 'var(--spacing-6)',
          }}
        >
          {quickServices.map((service, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.75) 0%, rgba(52, 74, 106, 0.7) 100%)',
                border: '1px solid rgba(138, 180, 248, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--spacing-3)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `
                  0 8px 24px rgba(0, 0, 0, 0.4),
                  0 4px 12px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(255, 255, 255, 0.08) inset,
                  0 1px 0 0 rgba(255, 255, 255, 0.12) inset
                `,
                cursor: 'pointer',
              }}
            >
              {/* Enhanced gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}08 40%, transparent 70%)`,
                  zIndex: 0,
                }}
              />
              
              {/* Top Shine */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '15%',
                  right: '15%',
                  height: '50%',
                  background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
              
              {/* Premium Icon */}
              <div 
                className="flex items-center justify-center"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-xl)',
                  background: `linear-gradient(135deg, ${service.color}50 0%, ${service.color}30 50%, ${service.color}20 100%)`,
                  border: `1px solid ${service.color}80`,
                  color: service.color,
                  boxShadow: `
                    0 6px 16px ${service.color}40,
                    0 3px 8px ${service.color}30,
                    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                    0 1px 0 0 rgba(255, 255, 255, 0.15) inset
                  `,
                  position: 'relative',
                  zIndex: 1,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    right: '2px',
                    bottom: '2px',
                    borderRadius: 'var(--radius-lg)',
                    background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ width: '28px', height: '28px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}>
                  {service.icon}
                </div>
              </div>
              
              {/* Name */}
              <span style={{ 
                color: 'var(--text-primary)', 
                fontSize: '0.875rem',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}>
                {service.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Premium View All Services Button */}
        <motion.button
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="backdrop-blur-xl flex items-center justify-between"
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.8) 0%, rgba(52, 74, 106, 0.75) 100%)',
            border: '1px solid rgba(138, 180, 248, 0.25)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-5)',
            marginBottom: 'var(--spacing-4)',
            boxShadow: `
              0 8px 24px rgba(0, 0, 0, 0.4),
              0 4px 12px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.08) inset,
              0 1px 0 0 rgba(255, 255, 255, 0.12) inset
            `,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {/* Button Inner Glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(138, 180, 248, 0.1) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <span style={{ 
            color: 'var(--text-primary)',
            fontSize: '1.125rem',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}>
            View All Services
          </span>
          <ArrowRight className="w-6 h-6" style={{ color: 'var(--text-primary)', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }} />
        </motion.button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 50,
              }}
            />

            {/* Filter Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: '85vh',
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                borderTopLeftRadius: 'var(--radius-xl)',
                borderTopRightRadius: 'var(--radius-xl)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                zIndex: 51,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: 'var(--spacing-5)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h2 style={{ 
                    fontFamily: 'Roboto',
                    color: 'rgb(var(--color-text-primary))',
                    marginBottom: 'var(--spacing-1)',
                  }}>
                    Filter Services
                  </h2>
                  <p style={{ 
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-sm)',
                    color: 'rgb(var(--color-text-secondary))',
                  }}>
                    {filteredServices.length} of {services.length} services
                  </p>
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  style={{
                    padding: 'var(--spacing-2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                  }}
                >
                  <X style={{ width: '20px', height: '20px', color: 'rgb(var(--color-text-primary))' }} />
                </button>
              </div>

              {/* Filter Content - Scrollable */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: 'var(--spacing-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-5)',
                }}
              >
                {/* Rating Filter */}
                <div>
                  <h3 style={{ 
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-base)',
                    color: 'rgb(var(--color-text-primary))',
                    marginBottom: 'var(--spacing-3)',
                  }}>
                    Minimum Rating
                  </h3>
                  <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                    {[0, 4.5, 4.7, 4.8, 4.9, 5.0].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                        style={{
                          flex: 1,
                          padding: 'var(--spacing-2)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: filters.minRating === rating 
                            ? 'rgba(59, 130, 246, 0.3)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: filters.minRating === rating 
                            ? '2px solid rgb(59, 130, 246)' 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div className="flex items-center justify-center" style={{ gap: 'var(--spacing-1)' }}>
                          <Star style={{ width: '12px', height: '12px', color: '#fbbf24', fill: '#fbbf24' }} />
                          <span style={{ 
                            fontFamily: 'Roboto',
                            fontSize: 'var(--text-sm)',
                            color: 'rgb(var(--color-text-primary))',
                          }}>
                            {rating === 0 ? 'All' : rating}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 style={{ 
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-base)',
                    color: 'rgb(var(--color-text-primary))',
                    marginBottom: 'var(--spacing-3)',
                  }}>
                    Price Range
                  </h3>
                  <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                    {['$', '$$', '$$$'].map(price => (
                      <button
                        key={price}
                        onClick={() => togglePrice(price)}
                        style={{
                          flex: 1,
                          padding: 'var(--spacing-3)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: filters.priceRange.includes(price) 
                            ? 'rgba(16, 185, 129, 0.3)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: filters.priceRange.includes(price) 
                            ? '2px solid rgb(16, 185, 129)' 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{ 
                          fontFamily: 'Roboto',
                          fontSize: 'var(--text-lg)',
                          color: 'rgb(var(--color-text-primary))',
                        }}>
                          {price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Distance Filter */}
                <div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-3)',
                  }}>
                    <h3 style={{ 
                      fontFamily: 'Roboto',
                      fontSize: 'var(--text-base)',
                      color: 'rgb(var(--color-text-primary))',
                    }}>
                      Maximum Distance
                    </h3>
                    <span style={{ 
                      fontFamily: 'Roboto',
                      fontSize: 'var(--text-sm)',
                      color: 'rgb(var(--color-goldenrod))',
                    }}>
                      {filters.maxDistance} miles
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={filters.maxDistance}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseFloat(e.target.value) }))}
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
                      1 mi
                    </span>
                    <span style={{ 
                      fontFamily: 'Roboto',
                      fontSize: 'var(--text-xs)',
                      color: 'rgb(var(--color-text-tertiary))',
                    }}>
                      10 mi
                    </span>
                  </div>
                </div>

                {/* Response Time Filter */}
                <div>
                  <h3 style={{ 
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-base)',
                    color: 'rgb(var(--color-text-primary))',
                    marginBottom: 'var(--spacing-3)',
                  }}>
                    Response Time
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    {[
                      { value: 'all', label: 'Any Time' },
                      { value: '15', label: 'Under 15 minutes' },
                      { value: '30', label: 'Under 30 minutes' },
                      { value: '60', label: 'Under 1 hour' },
                      { value: '240', label: 'Under 4 hours' },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setFilters(prev => ({ ...prev, maxResponseTime: option.value }))}
                        style={{
                          padding: 'var(--spacing-3)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: filters.maxResponseTime === option.value 
                            ? 'rgba(59, 130, 246, 0.3)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: filters.maxResponseTime === option.value 
                            ? '2px solid rgb(59, 130, 246)' 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ 
                            fontFamily: 'Roboto',
                            fontSize: 'var(--text-sm)',
                            color: 'rgb(var(--color-text-primary))',
                          }}>
                            {option.label}
                          </span>
                          {filters.maxResponseTime === option.value && (
                            <CheckCircle2 style={{ width: '16px', height: '16px', color: 'rgb(59, 130, 246)' }} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specialties Filter */}
                <div>
                  <h3 style={{ 
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-base)',
                    color: 'rgb(var(--color-text-primary))',
                    marginBottom: 'var(--spacing-3)',
                  }}>
                    Specialty
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                    {allSpecialties.map(specialty => (
                      <button
                        key={specialty}
                        onClick={() => toggleSpecialty(specialty)}
                        style={{
                          padding: 'var(--spacing-2) var(--spacing-3)',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: filters.specialties.includes(specialty) 
                            ? 'rgba(139, 92, 246, 0.3)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: filters.specialties.includes(specialty) 
                            ? '2px solid rgb(139, 92, 246)' 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{ 
                          fontFamily: 'Roboto',
                          fontSize: 'var(--text-sm)',
                          color: 'rgb(var(--color-text-primary))',
                        }}>
                          {specialty}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div
                style={{
                  padding: 'var(--spacing-5)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  gap: 'var(--spacing-3)',
                }}
              >
                <button
                  onClick={clearFilters}
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-sm)',
                    color: 'rgb(var(--color-text-primary))',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  style={{
                    flex: 2,
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgb(59, 130, 246)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-sm)',
                    color: 'white',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Show {filteredServices.length} Service{filteredServices.length !== 1 ? 's' : ''}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
