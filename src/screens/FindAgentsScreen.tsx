/**
 * ==============================================================================
 * FINDAGENTSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Agent discovery with ratings, specialties, filtering, and contact.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. AGENT CARDS:
 *    - Horizontal FlatList carousel
 *    - Agent photo, rating, contact info
 * 
 * 2. FILTERS:
 *    - Bottom sheet for filter options
 *    - Rating, response time, specialties
 * 
 * 3. CONTACT:
 *    - Linking.openURL for phone/email
 * 
 * 4. REQUIRED API:
 *    - GET /api/agents?filters=...
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Agents display
 * - [ ] Filters work
 * - [ ] Phone/email opens
 * - [ ] iOS and Android compatible
 * 
 */

import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Star, Award, Clock, Briefcase, Calendar, CheckCircle2, SlidersHorizontal, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";

export function FindAgentsScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    responseTime: 'all',
    specialties: [] as string[],
    certifications: [] as string[],
  });

  const agents = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Property Inspector',
      rating: 4.9,
      location: 'San Francisco, CA',
      phone: '(555) 123-4567',
      photo: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MjIyNDkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      yearsExperience: 12,
      casesHandled: 850,
      responseTime: '< 2 hours',
      memberSince: 'Jan 2019',
      certifications: ['ASHI Certified', 'Drone Licensed'],
      specializations: ['Residential', 'Commercial', 'Roofing'],
      isOnline: true,
    },
    {
      name: 'Michael Chen',
      role: 'Insurance Specialist',
      rating: 4.8,
      location: 'Los Angeles, CA',
      phone: '(555) 987-6543',
      photo: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzc3xlbnwxfHx8fDE3NjIyMjUyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      yearsExperience: 8,
      casesHandled: 620,
      responseTime: '< 4 hours',
      memberSince: 'Mar 2020',
      certifications: ['CPCU', 'ARM'],
      specializations: ['Claims', 'Risk Assessment', 'Underwriting'],
      isOnline: true,
    },
    {
      name: 'Emma Williams',
      role: 'Claims Adjuster',
      rating: 5.0,
      location: 'San Diego, CA',
      phone: '(555) 456-7890',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYyMjA1MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      yearsExperience: 15,
      casesHandled: 1200,
      responseTime: '< 1 hour',
      memberSince: 'Jun 2018',
      certifications: ['AIC', 'SCLA'],
      specializations: ['Water Damage', 'Fire Claims', 'Storm'],
      isOnline: false,
    },
    {
      name: 'David Rodriguez',
      role: 'Risk Assessment Specialist',
      rating: 4.7,
      location: 'Phoenix, AZ',
      phone: '(555) 234-5678',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjI0OTQwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      yearsExperience: 10,
      casesHandled: 540,
      responseTime: '< 3 hours',
      memberSince: 'Sep 2019',
      certifications: ['ARM', 'CRIS'],
      specializations: ['Property Risk', 'Analytics', 'Mitigation'],
      isOnline: true,
    },
    {
      name: 'Lisa Anderson',
      role: 'Property Damage Expert',
      rating: 4.9,
      location: 'Seattle, WA',
      phone: '(555) 345-6789',
      photo: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2MjI2Njg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      yearsExperience: 14,
      casesHandled: 980,
      responseTime: '< 2 hours',
      memberSince: 'Feb 2018',
      certifications: ['IICRC', 'PE License'],
      specializations: ['Structural', 'Mold', 'Restoration'],
      isOnline: true,
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth - 48;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  // Get all unique specialties and certifications
  const allSpecialties = Array.from(new Set(agents.flatMap(a => a.specializations)));
  const allCertifications = Array.from(new Set(agents.flatMap(a => a.certifications)));

  // Filter agents based on selected filters
  const filteredAgents = agents.filter(agent => {
    // Rating filter
    if (filters.minRating > 0 && agent.rating < filters.minRating) return false;
    
    // Response time filter
    if (filters.responseTime !== 'all') {
      const responseHours = parseInt(agent.responseTime.match(/\d+/)?.[0] || '999');
      const filterHours = parseInt(filters.responseTime);
      if (responseHours > filterHours) return false;
    }
    
    // Specialties filter
    if (filters.specialties.length > 0) {
      const hasSpecialty = filters.specialties.some(spec => 
        agent.specializations.includes(spec)
      );
      if (!hasSpecialty) return false;
    }
    
    // Certifications filter
    if (filters.certifications.length > 0) {
      const hasCertification = filters.certifications.some(cert => 
        agent.certifications.includes(cert)
      );
      if (!hasCertification) return false;
    }
    
    return true;
  });

  const toggleSpecialty = (specialty: string) => {
    setFilters(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const toggleCertification = (cert: string) => {
    setFilters(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const clearFilters = () => {
    setFilters({
      minRating: 0,
      responseTime: 'all',
      specialties: [],
      certifications: [],
    });
  };

  const activeFiltersCount = 
    (filters.minRating > 0 ? 1 : 0) +
    (filters.responseTime !== 'all' ? 1 : 0) +
    filters.specialties.length +
    filters.certifications.length;

  return (
    <div 
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ 
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))'
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhhbmRzaGFrZXxlbnwxfHx8fDE3NjIyMzM5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3,
          zIndex: 0,
          filter: 'blur(4px)',
        }}
      />

      {/* Header */}
      <div style={{ 
        padding: 'var(--spacing-6)',
        paddingBottom: 'var(--spacing-4)',
        paddingTop: 'var(--spacing-8)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: 'var(--spacing-2)'
        }}>
          <div>
            <h1 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
              Find Agents
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Connect with insurance professionals near you
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

      {/* Horizontal Scrolling Cards */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto overflow-y-hidden"
        style={{
          display: 'flex',
          gap: 'var(--spacing-8)',
          paddingLeft: 'var(--spacing-6)',
          paddingRight: 'var(--spacing-6)',
          paddingTop: '40px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          paddingBottom: 'var(--spacing-4)',
          position: 'relative',
          flex: 1,
          zIndex: 1,
        }}
      >
        {filteredAgents.map((agent, index) => {
          const offset = index - activeIndex;
          const isActive = index === activeIndex;
          
          return (
            <div
              key={index}
              style={{
                minWidth: 'calc(100% - var(--spacing-16))',
                scrollSnapAlign: 'start',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `
                  translateX(${offset * -30}px)
                  scale(${isActive ? 1 : 0.9})
                `,
                opacity: isActive ? 1 : 0.5,
                filter: isActive ? 'none' : 'brightness(0.6)',
                zIndex: agents.length - Math.abs(offset),
                position: 'relative',
                marginRight: 'var(--spacing-4)',
              }}
            >
              <div
                className="backdrop-blur-md"
                style={{
                  backgroundColor: 'rgba(17, 24, 39, 0.85)',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  padding: 'var(--spacing-4)',
                  paddingTop: 'calc(var(--spacing-4) + 40px)',
                  boxShadow: isActive 
                    ? '0 30px 80px rgba(0, 0, 0, 0.7), 0 20px 50px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 60px rgba(59, 130, 246, 0.15)' 
                    : '0 15px 40px rgba(0, 0, 0, 0.6), 0 8px 20px rgba(0, 0, 0, 0.5)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* Profile Photo - Popping out from top left */}
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(-35px)',
                    left: 'var(--spacing-4)',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    border: '4px solid rgba(17, 24, 39, 0.95)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden',
                    zIndex: 10,
                  }}
                >
                  <ImageWithFallback
                    src={agent.photo}
                    alt={agent.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Online Status Indicator */}
                  {agent.isOnline && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '2px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        border: '3px solid rgba(17, 24, 39, 0.95)',
                      }}
                    />
                  )}
                </div>

                <div>
                  {/* Name and Role */}
                  <div style={{ 
                    color: 'var(--text-primary)', 
                    marginBottom: 'var(--spacing-1)',
                  }}>
                    {agent.name}
                  </div>
                  <div style={{ 
                    color: 'var(--text-secondary)', 
                    marginBottom: 'var(--spacing-3)',
                    fontSize: '0.875rem'
                  }}>
                    {agent.role}
                  </div>
                  
                  {/* Stats Grid - 2 columns */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)',
                  }}>
                    <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                      <Star className="w-3 h-3" style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.75rem' }}>
                        {agent.rating}
                      </span>
                    </div>
                    
                    <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                      <Briefcase className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        {agent.yearsExperience}y
                      </span>
                    </div>

                    <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                      <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        {agent.casesHandled}
                      </span>
                    </div>

                    <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                      <Clock className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        {agent.responseTime}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center" style={{ 
                    gap: 'var(--spacing-1)',
                    marginBottom: 'var(--spacing-3)' 
                  }}>
                    <MapPin className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                      {agent.location}
                    </span>
                  </div>

                  {/* Certifications */}
                  <div style={{ marginBottom: 'var(--spacing-3)' }}>
                    <div className="flex items-center" style={{ 
                      gap: 'var(--spacing-1)',
                      marginBottom: 'var(--spacing-1)' 
                    }}>
                      <Award className="w-3 h-3" style={{ color: '#10b981' }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        Certified
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-1)', flexWrap: 'wrap' }}>
                      {agent.certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '2px var(--spacing-2)',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            fontSize: '0.625rem',
                            color: '#10b981',
                            lineHeight: '1.2',
                          }}
                        >
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div style={{ marginBottom: 'var(--spacing-3)' }}>
                    <div style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '0.75rem',
                      marginBottom: 'var(--spacing-1)' 
                    }}>
                      Specializations
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-1)', flexWrap: 'wrap' }}>
                      {agent.specializations.map((spec, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '2px var(--spacing-2)',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            fontSize: '0.625rem',
                            color: '#60a5fa',
                            lineHeight: '1.2',
                          }}
                        >
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center" style={{ 
                    gap: 'var(--spacing-1)',
                    marginBottom: 'var(--spacing-3)' 
                  }}>
                    <Calendar className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                      Since {agent.memberSince}
                    </span>
                  </div>
                </div>

                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--spacing-2)'
                }}>
                  <button 
                    className="flex items-center justify-center"
                    style={{
                      padding: 'var(--spacing-2)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      gap: 'var(--spacing-1)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <Phone className="w-3 h-3" style={{ color: '#3b82f6' }} />
                    <span style={{ color: '#3b82f6', fontSize: '0.75rem' }}>Call</span>
                  </button>
                  <button 
                    className="flex items-center justify-center"
                    style={{
                      padding: 'var(--spacing-2)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      gap: 'var(--spacing-1)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <Mail className="w-3 h-3" style={{ color: '#3b82f6' }} />
                    <span style={{ color: '#3b82f6', fontSize: '0.75rem' }}>Email</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div 
        className="flex items-center justify-center"
        style={{
          gap: 'var(--spacing-2)',
          paddingTop: 'var(--spacing-4)',
          paddingBottom: 'var(--spacing-4)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {filteredAgents.map((_, index) => (
          <div
            key={index}
            style={{
              width: activeIndex === index ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: activeIndex === index 
                ? 'rgba(59, 130, 246, 0.8)' 
                : 'rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
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
                maxHeight: '80vh',
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
                    Filter Agents
                  </h2>
                  <p style={{ 
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-sm)',
                    color: 'rgb(var(--color-text-secondary))',
                  }}>
                    {filteredAgents.length} of {agents.length} agents
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
                    {[0, 4.5, 4.7, 4.8, 4.9].map(rating => (
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
                      { value: 'all', label: 'All' },
                      { value: '1', label: 'Under 1 hour' },
                      { value: '2', label: 'Under 2 hours' },
                      { value: '3', label: 'Under 3 hours' },
                      { value: '4', label: 'Under 4 hours' },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setFilters(prev => ({ ...prev, responseTime: option.value }))}
                        style={{
                          padding: 'var(--spacing-3)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: filters.responseTime === option.value 
                            ? 'rgba(59, 130, 246, 0.3)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: filters.responseTime === option.value 
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
                          {filters.responseTime === option.value && (
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
                    Specialties
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
                            ? 'rgba(59, 130, 246, 0.3)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: filters.specialties.includes(specialty) 
                            ? '2px solid rgb(59, 130, 246)' 
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

                {/* Certifications Filter */}
                <div>
                  <h3 style={{ 
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-base)',
                    color: 'rgb(var(--color-text-primary))',
                    marginBottom: 'var(--spacing-3)',
                  }}>
                    Certifications
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                    {allCertifications.map(cert => (
                      <button
                        key={cert}
                        onClick={() => toggleCertification(cert)}
                        style={{
                          padding: 'var(--spacing-2) var(--spacing-3)',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: filters.certifications.includes(cert) 
                            ? 'rgba(16, 185, 129, 0.3)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: filters.certifications.includes(cert) 
                            ? '2px solid rgb(16, 185, 129)' 
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
                          {cert}
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
                  Show {filteredAgents.length} Agent{filteredAgents.length !== 1 ? 's' : ''}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
