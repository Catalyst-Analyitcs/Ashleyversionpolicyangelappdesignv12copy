/**
 * ==============================================================================
 * LEARNINGCENTERSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Educational content library with articles, videos, and guides.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CONTENT LIST:
 *    - FlatList for articles/videos
 *    - Category filtering
 * 
 * 2. VIDEO PLAYER:
 *    - expo-av or react-native-video
 * 
 * 3. REQUIRED API:
 *    - GET /api/learning-center/content
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Content loads
 * - [ ] Categories filter
 * - [ ] Videos play
 * - [ ] iOS and Android compatible
 * 
 */

import { BookOpen, Video, FileText, Download, Clock, TrendingUp, Shield, Home, Zap, Users, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export function LearningCenterScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: <BookOpen />, color: '#8b5cf6' },
    { id: 'insurance', label: 'Insurance Basics', icon: <Shield />, color: '#3b82f6' },
    { id: 'property', label: 'Property Care', icon: <Home />, color: '#10b981' },
    { id: 'technology', label: 'Smart Tech', icon: <Zap />, color: '#f59e0b' },
    { id: 'claims', label: 'Claims Process', icon: <FileText />, color: '#ec4899' },
  ];

  const learningModules = [
    {
      id: 1,
      title: 'Understanding Your Policy',
      category: 'insurance',
      type: 'Course',
      duration: '45 min',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBwb2xpY3klMjBkb2N1bWVudHN8ZW58MXx8fHwxNzYyMjg4OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Learn how to read and understand your insurance policy documents',
      modules: 6,
      icon: <Shield />,
      color: '#3b82f6',
    },
    {
      id: 2,
      title: 'Home Maintenance Essentials',
      category: 'property',
      type: 'Video Series',
      duration: '2 hrs',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwbWFpbnRlbmFuY2UlMjB0b29sc3xlbnwxfHx8fDE3NjIyODg1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Essential maintenance tasks to protect your property value',
      modules: 12,
      icon: <Home />,
      color: '#10b981',
    },
    {
      id: 3,
      title: 'Filing a Claim: Step by Step',
      category: 'claims',
      type: 'Guide',
      duration: '30 min',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1554224311-beee460ae6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlcndvcmslMjBmb3JtcyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3NjIyODg5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Complete walkthrough of the claims filing process',
      modules: 8,
      icon: <FileText />,
      color: '#ec4899',
    },
    {
      id: 4,
      title: 'Smart Home Protection Systems',
      category: 'technology',
      type: 'Course',
      duration: '1 hr',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwc2VjdXJpdHklMjBsb2NrfGVufDF8fHx8MTc2MjI4ODU3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Leverage technology to reduce risk and lower premiums',
      modules: 10,
      icon: <Zap />,
      color: '#f59e0b',
    },
    {
      id: 5,
      title: 'Maximizing Coverage Value',
      category: 'insurance',
      type: 'Video Series',
      duration: '50 min',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGdyb3d0aHxlbnwxfHx8fDE3NjIyODg5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Get the most value from your insurance investment',
      modules: 7,
      icon: <TrendingUp />,
      color: '#3b82f6',
    },
    {
      id: 6,
      title: 'Seasonal Property Preparation',
      category: 'property',
      type: 'Guide',
      duration: '40 min',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9ybSUyMHdlYXRoZXIlMjBwcmVwYXJlZG5lc3N8ZW58MXx8fHwxNzYyMjg4NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Prepare your home for different weather conditions',
      modules: 9,
      icon: <Home />,
      color: '#10b981',
    },
  ];

  const quickResources = [
    {
      title: 'Policy Glossary',
      description: 'Common insurance terms explained',
      icon: <BookOpen />,
      color: '#8b5cf6',
      downloads: '2.3k',
    },
    {
      title: 'Inspection Checklist',
      description: 'Monthly home inspection guide',
      icon: <FileText />,
      color: '#10b981',
      downloads: '1.8k',
    },
    {
      title: 'Claims Documentation',
      description: 'What to prepare for claims',
      icon: <Download />,
      color: '#ec4899',
      downloads: '1.5k',
    },
  ];

  const filteredModules = selectedCategory === 'all' 
    ? learningModules 
    : learningModules.filter(m => m.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#8b5cf6';
    }
  };

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
          height: '220px',
          backgroundColor: 'var(--glass-bg)',
          border: '2px solid var(--glass-border)',
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1662304696102-efafa11b27c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMGJvb2tzJTIwc3R1ZHl8ZW58MXx8fHwxNzYyMjg4OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%)',
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
            <BookOpen className="w-6 h-6" style={{ color: '#f59e0b' }} />
            <h1 style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)' }}>
              Learning Center
            </h1>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 8px rgba(0, 0, 0, 0.8)' }}>
            Expand your knowledge about insurance and property protection
          </p>
        </div>
      </motion.div>

      {/* Quick Resources */}
      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Quick Resources
        </h2>
        <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
          {quickResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="backdrop-blur-md cursor-pointer"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--glass-border)',
                padding: 'var(--spacing-4)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start" style={{ gap: 'var(--spacing-3)' }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: `${resource.color}20`,
                      color: resource.color,
                      flexShrink: 0,
                    }}
                  >
                    {resource.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-1)' }}>
                      {resource.title}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      {resource.description}
                    </div>
                    <div
                      className="flex items-center"
                      style={{
                        gap: 'var(--spacing-1)',
                        marginTop: 'var(--spacing-2)',
                        color: 'var(--text-tertiary)',
                        fontSize: '0.75rem',
                      }}
                    >
                      <Download className="w-3 h-3" />
                      <span>{resource.downloads} downloads</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Browse by Topic
        </h2>
        <div
          className="flex overflow-x-auto"
          style={{
            gap: 'var(--spacing-2)',
            paddingBottom: 'var(--spacing-2)',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md"
              style={{
                backgroundColor: selectedCategory === cat.id ? `${cat.color}30` : 'var(--glass-bg)',
                borderRadius: 'var(--radius-lg)',
                border: `2px solid ${selectedCategory === cat.id ? cat.color : 'var(--glass-border)'}`,
                padding: 'var(--spacing-3) var(--spacing-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                whiteSpace: 'nowrap',
                color: selectedCategory === cat.id ? cat.color : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Learning Modules */}
      <div>
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-3)' }}>
          <h2 style={{ color: 'var(--text-primary)' }}>
            {selectedCategory === 'all' ? 'All Courses' : categories.find(c => c.id === selectedCategory)?.label}
          </h2>
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
            {filteredModules.length} courses
          </span>
        </div>
        <div className="flex flex-col" style={{ gap: 'var(--spacing-4)' }}>
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="backdrop-blur-md cursor-pointer"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--glass-border)',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Module Image */}
              <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                <ImageWithFallback
                  src={module.image}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)',
                  }}
                />
                <div
                  className="flex items-center"
                  style={{
                    position: 'absolute',
                    top: 'var(--spacing-3)',
                    left: 'var(--spacing-3)',
                    gap: 'var(--spacing-2)',
                  }}
                >
                  <div
                    style={{
                      padding: 'var(--spacing-1) var(--spacing-3)',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: `${module.color}`,
                      color: '#ffffff',
                      fontSize: '0.75rem',
                    }}
                  >
                    {module.type}
                  </div>
                  <div
                    style={{
                      padding: 'var(--spacing-1) var(--spacing-3)',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: `${getLevelColor(module.level)}`,
                      color: '#ffffff',
                      fontSize: '0.75rem',
                    }}
                  >
                    {module.level}
                  </div>
                </div>
              </div>

              {/* Module Content */}
              <div style={{ padding: 'var(--spacing-4)' }}>
                <div className="flex items-start" style={{ gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-3)' }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: `${module.color}20`,
                      border: `2px solid ${module.color}40`,
                      color: module.color,
                      flexShrink: 0,
                    }}
                  >
                    {module.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-1)' }}>
                      {module.title}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      {module.description}
                    </div>
                  </div>
                </div>

                {/* Module Stats */}
                <div
                  className="flex items-center justify-between"
                  style={{
                    paddingTop: 'var(--spacing-3)',
                    borderTop: '1px solid var(--glass-border)',
                  }}
                >
                  <div className="flex items-center" style={{ gap: 'var(--spacing-4)' }}>
                    <div className="flex items-center" style={{ gap: 'var(--spacing-1)', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center" style={{ gap: 'var(--spacing-1)', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
                      <Video className="w-4 h-4" />
                      <span>{module.modules} modules</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" style={{ color: module.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
