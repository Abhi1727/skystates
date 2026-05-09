import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, Award, Clock, MapPin } from 'lucide-react';
import './HomepageTheme.css';

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef(null);

  const sampleActivities = [
    {
      id: 1,
      type: 'enrollment',
      user: 'Priya Sharma',
      location: 'Mumbai, India',
      course: 'Data Science AI Program',
      time: 'just now',
      icon: Users,
      color: '#10b981'
    },
    {
      id: 2,
      type: 'achievement',
      user: 'Rahul Verma',
      location: 'Bangalore, India',
      course: 'Completed Cyber Security Module',
      time: '2 minutes ago',
      icon: Award,
      color: '#8b5cf6'
    },
    {
      id: 3,
      type: 'milestone',
      user: 'Anjali Patel',
      location: 'Delhi, India',
      course: 'DevOps Certification Earned',
      time: '5 minutes ago',
      icon: TrendingUp,
      color: '#f59e0b'
    },
    {
      id: 4,
      type: 'enrollment',
      user: 'Kumar Suresh',
      location: 'Chennai, India',
      course: 'Short Term Data Science',
      time: '8 minutes ago',
      icon: Users,
      color: '#10b981'
    },
    {
      id: 5,
      type: 'achievement',
      user: 'Meera Reddy',
      location: 'Hyderabad, India',
      course: 'Advanced Python Certification',
      time: '12 minutes ago',
      icon: Award,
      color: '#8b5cf6'
    }
  ];

  useEffect(() => {
    // Initialize with some activities
    setActivities(sampleActivities.slice(0, 3));

    // Add new activities periodically
    intervalRef.current = setInterval(() => {
      const randomActivity = sampleActivities[Math.floor(Math.random() * sampleActivities.length)];
      const newActivity = {
        ...randomActivity,
        id: Date.now(),
        time: 'just now'
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 15000); // Add new activity every 15 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (timeString) => {
    if (timeString === 'just now') return timeString;
    
    const minutes = parseInt(timeString);
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            position: 'fixed',
            top: '100px',
            left: '20px',
            width: '320px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            zIndex: 800,
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            color: 'white',
            padding: '15px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#10b981',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>
                🌍 Live Activity
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.8'}
            >
              ×
            </button>
          </div>

          {/* Activities List */}
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <AnimatePresence>
              {activities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      padding: '15px 20px',
                      borderBottom: '1px solid #f3f4f6',
                      display: 'flex',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: `${activity.color}15`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComponent size={20} color={activity.color} />
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '2px',
                        lineHeight: '1.3'
                      }}>
                        {activity.user}
                      </div>
                      <div style={{
                        fontSize: '0.85rem',
                        color: '#6b7280',
                        marginBottom: '4px',
                        lineHeight: '1.3'
                      }}>
                        {activity.course}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.75rem',
                        color: '#9ca3af'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <MapPin size={12} />
                          <span>{activity.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Clock size={12} />
                          <span>{formatTime(activity.time)}</span>
                        </div>
                      </div>
                    </div>

                    {/* New Badge */}
                    {activity.time === 'just now' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          fontSize: '0.65rem',
                          fontWeight: '600',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        NEW
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Footer Stats */}
          <div style={{
            background: '#f9fafb',
            padding: '12px 20px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: '#6b7280'
            }}>
              <span>👥 2,847 active learners</span>
              <span>📈 142 enrolled today</span>
            </div>
          </div>

          {/* Pulse Animation */}
          <style jsx>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveActivityFeed;
