import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, AlertCircle, TrendingUp } from 'lucide-react';

const SmartScarcityIndicators = () => {
  const [scarcityData, setScarcityData] = useState({
    dataScience: {
      spotsLeft: 12,
      totalSpots: 50,
      timeLeft: '2 days 14 hours',
      enrolledToday: 8,
      trend: 'high'
    },
    cyberSecurity: {
      spotsLeft: 8,
      totalSpots: 40,
      timeLeft: '1 day 8 hours',
      enrolledToday: 12,
      trend: 'critical'
    },
    devOps: {
      spotsLeft: 18,
      totalSpots: 45,
      timeLeft: '3 days 6 hours',
      enrolledToday: 5,
      trend: 'medium'
    }
  });

  const [countdown, setCountdown] = useState({
    dataScience: '2d 14h 23m 45s',
    cyberSecurity: '1d 8h 23m 45s',
    devOps: '3d 6h 23m 45s'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const newCountdown = {};
        Object.keys(prev).forEach(course => {
          const timeString = prev[course];
          const parts = timeString.split(' ');
          let days = parseInt(parts[0]);
          let hours = parseInt(parts[1]);
          let minutes = parseInt(parts[2]);
          let seconds = parseInt(parts[3]);

          seconds--;
          if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
              minutes = 59;
              hours--;
              if (hours < 0) {
                hours = 23;
                days--;
                if (days < 0) days = 0;
              }
            }
          }

          newCountdown[course] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        });
        return newCountdown;
      });

      // Simulate enrollment activity
      setScarcityData(prev => {
        const newData = { ...prev };
        Object.keys(newData).forEach(course => {
          if (Math.random() > 0.7 && newData[course].spotsLeft > 3) {
            newData[course].spotsLeft -= 1;
            newData[course].enrolledToday += 1;
          }
        });
        return newData;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getScarcityColor = (spotsLeft, totalSpots) => {
    const percentage = (spotsLeft / totalSpots) * 100;
    if (percentage <= 20) return '#ef4444'; // red
    if (percentage <= 40) return '#f59e0b'; // amber
    return '#10b981'; // green
  };

  const getScarcityText = (spotsLeft, totalSpots) => {
    const percentage = (spotsLeft / totalSpots) * 100;
    if (percentage <= 20) return 'Almost Full!';
    if (percentage <= 40) return 'Filling Fast!';
    return 'Limited Spots';
  };

  const getUrgencyLevel = (trend) => {
    switch (trend) {
      case 'critical': return { color: '#ef4444', text: 'Critical' };
      case 'high': return { color: '#f59e0b', text: 'High' };
      case 'medium': return { color: '#3b82f6', text: 'Medium' };
      default: return { color: '#6b7280', text: 'Low' };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      width: '340px',
      zIndex: 750
    }}>
      <AnimatePresence>
        {Object.entries(scarcityData).map(([course, data]) => {
          const scarcityColor = getScarcityColor(data.spotsLeft, data.totalSpots);
          const scarcityText = getScarcityText(data.spotsLeft, data.totalSpots);
          const urgency = getUrgencyLevel(data.trend);
          const percentage = ((data.totalSpots - data.spotsLeft) / data.totalSpots) * 100;

          return (
            <motion.div
              key={course}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '12px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                border: `2px solid ${scarcityColor}20`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Urgency Badge */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: urgency.color,
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {urgency.text}
              </div>

              {/* Course Name */}
              <div style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px',
                textTransform: 'capitalize',
                paddingRight: '60px'
              }}>
                {course.replace(/([A-Z])/g, ' $1').trim()}
              </div>

              {/* Spots Left */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '12px'
              }}>
                <Users size={18} color={scarcityColor} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#6b7280',
                    marginBottom: '2px'
                  }}>
                    Spots Available
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: scarcityColor
                  }}>
                    {data.spotsLeft} / {data.totalSpots}
                  </div>
                </div>
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    marginBottom: '2px'
                  }}>
                    {scarcityText}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: scarcityColor
                  }}>
                    {Math.round((data.spotsLeft / data.totalSpots) * 100)}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{
                background: '#f3f4f6',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '12px'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${scarcityColor}, ${scarcityColor}dd)`,
                    borderRadius: '4px'
                  }}
                />
              </div>

              {/* Time Left & Enrolled Today */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#6b7280'
                }}>
                  <Clock size={14} />
                  <span>{countdown[course]}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#10b981'
                }}>
                  <TrendingUp size={14} />
                  <span>{data.enrolledToday} today</span>
                </div>
              </div>

              {/* Alert for critical levels */}
              {data.spotsLeft <= 10 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    marginTop: '10px',
                    background: `${scarcityColor}10`,
                    border: `1px solid ${scarcityColor}30`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <AlertCircle size={16} color={scarcityColor} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: scarcityColor
                  }}>
                    {data.spotsLeft <= 5 ? 
                      '⚠️ Last chance! Only a few spots remaining!' :
                      '⏰ Enrolling fast - secure your spot now!'
                    }
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SmartScarcityIndicators;
