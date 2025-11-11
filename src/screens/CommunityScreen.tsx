/**
 * ==============================================================================
 * COMMUNITYSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Neighborhood community dashboard with local stats, alerts, and forums.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. MAP VIEW:
 *    - react-native-maps for neighborhood map
 *    - Property markers
 * 
 * 2. COMMUNITY DATA:
 *    - Stats cards for neighborhood metrics
 *    - Alert feed
 * 
 * 3. REQUIRED API:
 *    - GET /api/community/:neighborhoodId
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Map displays
 * - [ ] Stats load
 * - [ ] Alerts show
 * - [ ] iOS and Android compatible
 * 
 */

import { motion } from "motion/react";
import { 
  MapPin, Users, AlertTriangle, Home, TrendingUp, 
  Shield, Clock, ChevronRight, MessageCircle, FileText 
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MapView } from "../components/MapView";

export function CommunityScreen() {
  // Mock data for Valencia Street neighborhood in San Francisco
  const communityData = {
    neighborhood: "Valencia Street Corridor",
    city: "San Francisco, CA",
    totalProperties: 247,
    activeMembers: 89,
    recentClaims: 3,
  };

  const recentActivity = [
    {
      id: 1,
      type: "claim",
      user: "Sarah M.",
      address: "1245 Valencia St",
      action: "Filed wind damage claim",
      time: "2 hours ago",
      severity: "moderate",
      icon: AlertTriangle,
      color: "rgb(251, 191, 36)",
    },
    {
      id: 2,
      type: "claim",
      user: "Michael R.",
      address: "1289 Valencia St",
      action: "Filed roof damage claim",
      time: "5 hours ago",
      severity: "high",
      icon: AlertTriangle,
      color: "rgb(239, 68, 68)",
    },
    {
      id: 3,
      type: "claim",
      user: "Jennifer K.",
      address: "1312 Valencia St",
      action: "Storm damage assessment completed",
      time: "Yesterday",
      severity: "moderate",
      icon: Shield,
      color: "rgb(59, 130, 246)",
    },
    {
      id: 4,
      type: "update",
      user: "Community Alert",
      address: "Valencia District",
      action: "Severe weather warning issued",
      time: "2 days ago",
      severity: "info",
      icon: MessageCircle,
      color: "rgb(168, 85, 247)",
    },
  ];

  const neighborhoodStats = [
    {
      label: "Avg Property Value",
      value: "$1.2M",
      trend: "+8.2%",
      icon: Home,
      color: "rgb(var(--color-goldenrod))",
    },
    {
      label: "Active Claims",
      value: "3",
      trend: "Last 7 days",
      icon: FileText,
      color: "rgb(239, 68, 68)",
    },
    {
      label: "Community Members",
      value: "89",
      trend: "+12 this month",
      icon: Users,
      color: "rgb(59, 130, 246)",
    },
  ];

  return (
    <div 
      className="flex-1 overflow-y-auto"
      style={{
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-6))',
      }}
    >
      {/* Map Section */}
      <div
        style={{
          position: 'relative',
          height: '280px',
          overflow: 'hidden',
        }}
      >
        <MapView />
        
        {/* Overlay with neighborhood info */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'var(--spacing-5)',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-xl)',
                color: 'rgb(var(--color-text-primary))',
                margin: 0,
                marginBottom: 'var(--spacing-1)',
              }}
            >
              {communityData.neighborhood}
            </h2>
            <p
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-sm)',
                color: 'rgb(var(--color-text-secondary))',
                margin: 0,
              }}
            >
              {communityData.city}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Neighborhood Stats */}
      <div
        style={{
          padding: 'var(--spacing-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4)',
        }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: 'Roboto',
            fontSize: 'var(--text-sm)',
            color: 'rgb(var(--color-text-tertiary))',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            margin: 0,
          }}
        >
          Neighborhood Overview
        </motion.h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--spacing-3)',
          }}
        >
          {neighborhoodStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              style={{
                backgroundColor: 'var(--card-bg)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-2)',
              }}
            >
              <stat.icon
                style={{
                  width: '20px',
                  height: '20px',
                  color: stat.color,
                  marginBottom: 'var(--spacing-1)',
                }}
              />
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 'var(--text-lg)',
                  color: 'rgb(var(--color-text-primary))',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 'var(--text-xs)',
                  color: 'rgb(var(--color-text-tertiary))',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 'var(--text-xs)',
                  color: 'rgb(var(--color-text-secondary))',
                }}
              >
                {stat.trend}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Community Activity */}
      <div
        style={{
          padding: 'var(--spacing-5)',
          paddingTop: 'var(--spacing-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4)',
        }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontFamily: 'Roboto',
            fontSize: 'var(--text-sm)',
            color: 'rgb(var(--color-text-tertiary))',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            margin: 0,
          }}
        >
          Recent Activity
        </motion.h3>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-3)',
          }}
        >
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              style={{
                backgroundColor: 'var(--card-bg)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-4)',
                display: 'flex',
                gap: 'var(--spacing-3)',
                alignItems: 'flex-start',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activity.color.replace(')', ', 0.15)').replace('rgb(', 'rgba('),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <activity.icon
                  style={{
                    width: '20px',
                    height: '20px',
                    color: activity.color,
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--spacing-1)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 'var(--text-sm)',
                      color: 'rgb(var(--color-text-primary))',
                    }}
                  >
                    {activity.user}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 'var(--text-xs)',
                      color: 'rgb(var(--color-text-tertiary))',
                    }}
                  >
                    {activity.time}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 'var(--text-sm)',
                    color: 'rgb(var(--color-text-secondary))',
                    margin: 0,
                    marginBottom: 'var(--spacing-1)',
                  }}
                >
                  {activity.action}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                  }}
                >
                  <MapPin
                    style={{
                      width: '14px',
                      height: '14px',
                      color: 'rgb(var(--color-text-tertiary))',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 'var(--text-xs)',
                      color: 'rgb(var(--color-text-tertiary))',
                    }}
                  >
                    {activity.address}
                  </span>
                </div>
              </div>

              <ChevronRight
                style={{
                  width: '20px',
                  height: '20px',
                  color: 'rgb(var(--color-text-tertiary))',
                  flexShrink: 0,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Insights Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        style={{
          margin: 'var(--spacing-5)',
          marginTop: 'var(--spacing-3)',
          backgroundColor: 'var(--card-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1663316026819-ea3a6293e8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMG5laWdoYm9yaG9vZCUyMGFlcmlhbHxlbnwxfHx8fDE3NjIzNjk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Neighborhood"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              marginBottom: 'var(--spacing-3)',
            }}
          >
            <TrendingUp
              style={{
                width: '24px',
                height: '24px',
                color: 'rgb(var(--color-goldenrod))',
              }}
            />
            <h3
              style={{
                fontFamily: 'Roboto',
                fontSize: 'var(--text-base)',
                color: 'rgb(var(--color-text-primary))',
                margin: 0,
              }}
            >
              Community Insights
            </h3>
          </div>

          <p
            style={{
              fontFamily: 'Roboto',
              fontSize: 'var(--text-sm)',
              color: 'rgb(var(--color-text-secondary))',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Your neighborhood has seen a{" "}
            <span style={{ color: 'rgb(var(--color-goldenrod))' }}>
              8.2% increase
            </span>{" "}
            in property values this year. Stay connected with your community to
            share best practices and weather preparedness tips.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
