import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import LogoCarousel from './LogoCarousel';
import FloatingRegisterButton from './FloatingRegisterButton';
import BatchCountdownTimer from './BatchCountdownTimer';

// OLD CODE COMMENTED OUT:
// import React from 'react';
// import FloatingRegisterButton from './FloatingRegisterButton';

const DataScienceAIShortTerm = () => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [countdown, setCountdown] = useState({ days: 15, hours: 12, minutes: 45, seconds: 30 });
  const [selectedPath, setSelectedPath] = useState('fast-track');
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [progress, setProgress] = useState(0);
  const [mentorOnline, setMentorOnline] = useState(true);
  const [stats, setStats] = useState({
    students: 0,
    placement: 0,
    salary: 0,
    completionTime: 0
  });

  const programData = {
    name: 'Data Science and AI Short Term Program',
    price: '6499.00',
    duration: '4 Months',
    type: 'short_program'
  };

  // Animated counter effect
  useEffect(() => {
    const animateCounter = (target, duration, callback) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          callback(target);
          clearInterval(timer);
        } else {
          callback(Math.floor(start));
        }
      }, 16);
    };

    animateCounter(5000, 2000, (val) => setStats(prev => ({ ...prev, students: val })));
    animateCounter(95, 1500, (val) => setStats(prev => ({ ...prev, placement: val })));
    animateCounter(150, 1800, (val) => setStats(prev => ({ ...prev, salary: val })));
    animateCounter(4, 1200, (val) => setStats(prev => ({ ...prev, completionTime: val })));
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const totalSeconds = prev.days * 86400 + prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        
        return {
          days: Math.floor(totalSeconds / 86400),
          hours: Math.floor((totalSeconds % 86400) / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Progress animation
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressTimer);
  }, []);

  // Lightning bolt animation component
  const LightningBolt = ({ size = 24, color = '#ff6b35' }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
    >
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </motion.svg>
  );

  return (
    <div className="product-page">
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slidePattern {
          0% { transform: translateX(0); }
          100% { transform: translateX(100px); }
        }
        @keyframes speedLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      {/* Enhanced Hero Section with Orange/Amber Speed Gradient */}
      <section className="product-hero" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ff9558 50%, #ffa500 75%, #ff6b35 100%)',
        overflow: 'hidden',
        animation: 'gradientShift 8s ease infinite'
      }}>
        <BatchCountdownTimer />
        {/* Animated Lightning Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.03) 10px,
            rgba(255, 255, 255, 0.03) 20px
          )`,
          animation: 'slidePattern 20s linear infinite'
        }} />

        {/* Floating Speed Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              fontSize: `${20 + i * 5}px`,
              opacity: 0.1 + i * 0.02,
              color: '#ffffff',
              top: `${10 + i * 15}%`,
              left: `${5 + i * 15}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <LightningBolt size={30 + i * 10} color="#ffffff" />
          </motion.div>
        ))}

        {/* Urgency Countdown Timer - COMMENTED OUT */}
        {/* <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '15px 25px',
            borderRadius: '15px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            zIndex: 10
          }}
        >
          <div style={{
            color: '#ffd700',
            fontSize: '12px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            ⚡ Limited Time Offer
          </div>
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            {Object.entries(countdown).map(([unit, value]) => (
              <div key={unit} style={{ textAlign: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: '800',
                  padding: '8px 6px',
                  borderRadius: '8px',
                  minWidth: '35px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {String(value).padStart(2, '0')}
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: '500',
                  marginTop: '4px',
                  textTransform: 'uppercase'
                }}>
                  {unit.slice(0, 1)}
                </div>
              </div>
            ))}
          </div>
        </motion.div> */}

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Left Content - Speed Focused */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Fast Track Badge */}
              <motion.div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(15px)',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  marginBottom: '24px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}
              >
                <LightningBolt size={20} color="#ffd700" />
                <span style={{ color: '#ffd700', fontSize: '14px', fontWeight: '700', letterSpacing: '1px' }}>
                  FAST TRACK LEARNING
                </span>
                <motion.div
                  style={{
                    width: '8px',
                    height: '8px',
                    background: '#00ff00',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px #00ff00'
                  }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                fontWeight: '900', 
                marginBottom: '24px',
                color: '#ffffff',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}>
                Become a
                <span style={{ 
                  display: 'block',
                  background: 'linear-gradient(135deg, #ffffff, #ffd700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '900',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}>
                  Data Science Expert
                </span>
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                  color: '#ffd700',
                  fontWeight: '700',
                  marginTop: '8px'
                }}>
                  ⚡ Career Ready in 4 Months
                </span>
              </h1>
              
              <p style={{ 
                fontSize: '1.4rem', 
                color: 'rgba(255, 255, 255, 0.95)', 
                marginBottom: '32px',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                Master Python, Machine Learning & AI with <span style={{ color: '#ffd700', fontWeight: '700' }}>lightning-fast</span> skill development
              </p>

              {/* Value Proposition Pills */}
              <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '40px',
                flexWrap: 'wrap'
              }}>
                {[
                  { icon: '⚡', text: '2x Faster Learning', color: '#ff6b35' },
                  { icon: '🎯', text: 'Personalized for You', color: '#f7931e' },
                  { icon: '�‍🏫', text: '1-on-1 Mentor Support', color: '#ff9558' },
                  { icon: '💼', text: 'Job Guarantee', color: '#ffa500' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '25px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      background: 'rgba(0, 0, 0, 0.4)',
                      borderColor: item.color
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      color: '#ffffff', 
                      fontWeight: '600',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Personalization Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(20px)',
                  padding: '25px',
                  borderRadius: '20px',
                  marginBottom: '40px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px'
                }}>
                  <LightningBolt size={24} color="#ffd700" />
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    margin: 0
                  }}>
                    Personalize Your Learning Path
                  </h3>
                </div>
                
                {/* Skill Level Selector */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}>
                    Current Skill Level:
                  </label>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap'
                  }}>
                    {['beginner', 'intermediate', 'advanced'].map((level) => (
                      <motion.button
                        key={level}
                        onClick={() => setSkillLevel(level)}
                        style={{
                          padding: '8px 16px',
                          border: skillLevel === level ? '2px solid #ffd700' : '1px solid rgba(255, 255, 255, 0.3)',
                          background: skillLevel === level ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          color: skillLevel === level ? '#ffd700' : '#ffffff',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Learning Path Selector */}
                <div>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}>
                    Learning Pace:
                  </label>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap'
                  }}>
                    {[
                      { id: 'fast-track', label: '⚡ Fast Track', desc: '3 Months' },
                      { id: 'regular', label: '🎯 Regular', desc: '4 Months' },
                      { id: 'flexible', label: '📅 Flexible', desc: '6 Months' }
                    ].map((path) => (
                      <motion.button
                        key={path.id}
                        onClick={() => setSelectedPath(path.id)}
                        style={{
                          padding: '10px 16px',
                          border: selectedPath === path.id ? '2px solid #ffd700' : '1px solid rgba(255, 255, 255, 0.3)',
                          background: selectedPath === path.id ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          color: selectedPath === path.id ? '#ffd700' : '#ffffff',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{path.label}</span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{path.desc}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Speed-Focused Price Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(20px)',
                  padding: '25px 35px',
                  borderRadius: '25px',
                  marginBottom: '40px',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(255, 215, 0, 0.5)',
                  boxShadow: '0 25px 70px rgba(0,0,0,0.5)'
                }}
              >
                {/* Animated speed lines */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
                  animation: 'speedLine 2s linear infinite'
                }} />
                
                {/* Time saved indicator */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  ⚡ Save 2 Months
                </div>
                
                {/* Pricing layout */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                  marginBottom: '8px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <span style={{ 
                    fontSize: '20px', 
                    fontWeight: '700',
                    color: 'rgba(255, 255, 255, 0.9)',
                    letterSpacing: '0.5px'
                  }}>
                    $
                  </span>
                  <span style={{ 
                    fontSize: '38px', 
                    fontWeight: '900',
                    color: '#ffd700',
                    letterSpacing: '-0.03em',
                    textShadow: '0 2px 8px rgba(255, 215, 0, 0.4)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                  }}>
                    6,499
                  </span>
                  <span style={{ 
                    fontSize: '16px', 
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.7)',
                    letterSpacing: '0.3px'
                  }}>
                    total
                  </span>
                </div>
                
                {/* Speed value proposition */}
                <div style={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  letterSpacing: '0.3px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <LightningBolt size={14} color="#ffd700" />
                  Fast Track Program - Complete in 4 Months
                </div>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 20px 50px rgba(255, 215, 0, 0.5)',
                    background: 'linear-gradient(135deg, #ffed4e, #ffd700)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Redirect directly to checkout with program data
                    navigate('/checkout', { 
                      state: { 
                        program: {
                          name: 'Data Science and AI Short Term Program',
                          price: '6499.00',
                          duration: '4 Months',
                          type: 'short_program'
                        }
                      } 
                    });
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                    color: '#1a1f36',
                    padding: '20px 45px',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '18px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 15px 40px rgba(255, 215, 0, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LightningBolt size={20} color="#1a1f36" />
                    Enroll Now
                  </span>
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    }}
                    whileHover={{
                      left: '0%',
                      transition: { duration: 0.6 }
                    }}
                  />
                </motion.button>
                
                {/* Register Now Button */}
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    background: '#0056b3'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Redirect to checkout with registration data
                    navigate('/checkout', { 
                      state: { 
                        program: {
                          name: 'Registration fee for Data Science and AI Short Term Program',
                          price: '499.00',
                          duration: '4 Months',
                          type: 'registration'
                        }
                      } 
                    });
                  }}
                  style={{
                    background: '#007bff',
                    color: 'white',
                    padding: '20px 35px',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px rgba(0, 123, 255, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Register Now
                </motion.button>
                
                {/* Mentor Chat Button */}
                {/* Commented out Talk to Mentor button - not required
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: '#ffd700'
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'transparent',
                    color: '#ffffff',
                    padding: '18px 30px',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>👨‍🏫</span>
                    {mentorOnline && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: '-2px',
                          right: '-2px',
                          width: '8px',
                          height: '8px',
                          background: '#00ff00',
                          borderRadius: '50%',
                          border: '2px solid #ffffff'
                        }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                  Talk to Mentor
                </motion.button>
                */}
              </div>
            </motion.div>

            {/* Right Content - Mentor & Efficiency Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px'
              }}
            >
              {/* Mentor Support Card */}
              <motion.div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '25px',
                  padding: '30px',
                  textAlign: 'center',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
                  width: '100%',
                  maxWidth: '400px',
                  position: 'relative'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5)' }}
              >
                {/* Live indicator */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(0, 255, 0, 0.2)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(0, 255, 0, 0.4)'
                  }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#00ff00',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px #00ff00'
                  }} />
                  <span style={{
                    color: '#00ff00',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Live Now
                  </span>
                </motion.div>

                {/* Mentor Avatar */}
                <motion.div
                  style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '40px',
                    color: '#ffffff',
                    boxShadow: '0 15px 30px rgba(255, 107, 53, 0.4)',
                    position: 'relative'
                  }}
                  animate={{ rotateY: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                >
                  👨‍🏫
                  {/* Chat bubble */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      background: '#00ff00',
                      color: '#000000',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: '800',
                      boxShadow: '0 4px 12px rgba(0, 255, 0, 0.4)'
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    💬
                  </motion.div>
                </motion.div>
                
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  marginBottom: '15px',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  Expert Mentor Support
                </h3>
                
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  Get personalized guidance from industry experts with 1-on-1 mentorship
                </p>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  {[
                    { label: 'Response Time', value: '< 2 hrs', icon: '⚡' },
                    { label: 'Success Rate', value: '98%', icon: '🎯' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      style={{
                        background: 'rgba(255, 215, 0, 0.1)',
                        padding: '12px',
                        borderRadius: '15px',
                        border: '1px solid rgba(255, 215, 0, 0.2)'
                      }}
                      whileHover={{ scale: 1.05, background: 'rgba(255, 215, 0, 0.15)' }}
                    >
                      <div style={{ fontSize: '18px', marginBottom: '4px' }}>{stat.icon}</div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#ffd700',
                        marginBottom: '2px'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Commented out Start Live Chat button */}
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Start Live Chat
                </motion.button> */}
              </motion.div>

              {/* Efficiency Progress Card */}
              <motion.div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '25px',
                  padding: '25px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
                  width: '100%',
                  maxWidth: '400px'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5)' }}
              >
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  marginBottom: '20px',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <LightningBolt size={20} color="#ffd700" />
                  Rapid Progress Tracker
                </h3>

                {/* Animated Progress Bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Completion Speed
                    </span>
                    <span style={{
                      fontSize: '14px',
                      color: '#ffd700',
                      fontWeight: '700'
                    }}>
                      {progress}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <motion.div
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #ff6b35, #ffa500, #ffd700)',
                        borderRadius: '10px',
                        boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                      }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Efficiency Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    { number: stats.students, label: 'Fast Learners', icon: '🚀', color: '#ff6b35' },
                    { number: `${stats.placement}%`, label: 'Quick Placement', icon: '⚡', color: '#ffa500' },
                    { number: `${stats.completionTime}M`, label: 'Avg Completion', icon: '⏱️', color: '#ffd700' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        padding: '15px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '15px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderColor: stat.color
                      }}
                    >
                      <div style={{
                        fontSize: '24px',
                        filter: `drop-shadow(0 0 10px ${stat.color})`
                      }}>
                        {stat.icon}
                      </div>
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <div style={{
                          fontSize: '20px',
                          fontWeight: '800',
                          color: stat.color,
                          lineHeight: '1',
                          marginBottom: '2px'
                        }}>
                          {stat.number}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: 'rgba(255, 255, 255, 0.7)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: '600'
                        }}>
                          {stat.label}
                        </div>
                      </div>
                      {/* Speed indicator */}
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        style={{
                          fontSize: '16px',
                          opacity: 0.8
                        }}
                      >
                        ⚡
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skill Assessment & Personalization Section */}
      <section style={{ 
        padding: '100px 0', 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 30px,
            rgba(255, 107, 53, 0.03) 30px,
            rgba(255, 107, 53, 0.03) 60px
          )`
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <motion.div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 107, 53, 0.1)',
                padding: '10px 20px',
                borderRadius: '30px',
                marginBottom: '20px',
                border: '2px solid rgba(255, 107, 53, 0.3)'
              }}
              whileHover={{ scale: 1.05 }}
            >
              <LightningBolt size={20} color="#ff6b35" />
              <span style={{ color: '#ff6b35', fontSize: '14px', fontWeight: '700', letterSpacing: '1px' }}>
                ADAPTIVE LEARNING
              </span>
            </motion.div>
            
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #ff6b35 0%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(255, 107, 53, 0.3)'
            }}>
              Personalized for Your Success
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              color: 'rgba(255, 255, 255, 0.8)', 
              maxWidth: '700px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Our AI-powered assessment creates a customized learning path that adapts to your skill level and career goals
            </p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Skill Assessment Tool - COMMENTED OUT */}
            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                padding: '40px',
                border: '2px solid rgba(255, 107, 53, 0.3)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ 
                scale: 1.02, 
                borderColor: 'rgba(255, 107, 53, 0.5)',
                boxShadow: '0 30px 70px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '3px',
                background: 'linear-gradient(90deg, #ff6b35, #ffa500, #ffd700)'
              }} />
              
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '24px',
                boxShadow: '0 10px 25px rgba(255, 107, 53, 0.4)'
              }}>
                🎯
              </div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                marginBottom: '15px',
                color: '#ffffff'
              }}>
                Smart Skill Assessment
              </h3>
              
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '25px',
                lineHeight: '1.6'
              }}>
                Take our 5-minute assessment to identify your current skill level and get personalized recommendations
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '15px 25px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <LightningBolt size={16} color="#ffffff" />
                Start Assessment
              </motion.button>
            </motion.div> */}

            {/* Flexible Learning Paths */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                padding: '40px',
                border: '2px solid rgba(255, 165, 0, 0.3)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ 
                scale: 1.02, 
                borderColor: 'rgba(255, 165, 0, 0.5)',
                boxShadow: '0 30px 70px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '3px',
                background: 'linear-gradient(90deg, #ffa500, #ffd700, #ff6b35)'
              }} />
              
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #ffa500, #ffd700)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '24px',
                boxShadow: '0 10px 25px rgba(255, 165, 0, 0.4)'
              }}>
                🛤️
              </div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                marginBottom: '15px',
                color: '#ffffff'
              }}>
                Flexible Learning Paths
              </h3>
              
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '25px',
                lineHeight: '1.6'
              }}>
                Choose your pace: Fast Track (3 months), Regular (4 months), or Flexible (6 months) with weekend batches
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '25px' }}>
                {[
                  { label: '3 Months', desc: 'Fast Track', color: '#ff6b35' },
                  { label: '4 Months', desc: 'Regular', color: '#ffa500' },
                  { label: '6 Months', desc: 'Flexible', color: '#ffd700' },
                  { label: 'Weekend', desc: 'Available', color: '#ff9558' }
                ].map((path, index) => (
                  <motion.div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '12px',
                      borderRadius: '12px',
                      border: `1px solid ${path.color}33`,
                      textAlign: 'center'
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      background: `${path.color}20`,
                      borderColor: path.color
                    }}
                  >
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: path.color,
                      marginBottom: '2px'
                    }}>
                      {path.label}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {path.desc}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ffa500, #ffd700)',
                  color: '#1a1f36',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '15px 25px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Explore Paths
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Time-Saving Comparison Section */}
      <section style={{ 
        padding: '100px 0', 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <motion.div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
                padding: '10px 20px',
                borderRadius: '30px',
                marginBottom: '20px',
                boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)'
              }}
              whileHover={{ scale: 1.05 }}
            >
              <LightningBolt size={20} color="#ffffff" />
              <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', letterSpacing: '1px' }}>
                EFFICIENCY FOCUSED
              </span>
            </motion.div>
            
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #ff6b35 0%, #1a1f36 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Save Time, Accelerate Career
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              color: '#666', 
              maxWidth: '700px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Compare our accelerated program with traditional learning paths and see time-saving benefits
            </p>
          </motion.div>

          {/* Comparison Table */}
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '25px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
              padding: '25px',
              gap: '20px'
            }}>
              {['Traditional Learning', 'Online Courses', 'Our Fast Track'].map((title, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#ffffff',
                    marginBottom: '5px'
                  }}>
                    {title}
                  </div>
                  {index === 2 && (
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '11px',
                      color: '#ffffff',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      ⚡ Best Choice
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ padding: '0' }}>
              {[
                { feature: 'Duration', traditional: '2-4 Years', online: '6-12 Months', fastTrack: '3-4 Months', icon: '⏱️' },
                { feature: '1-on-1 Mentorship', traditional: 'Limited', online: 'No', fastTrack: 'Daily', icon: '👨‍🏫' },
                { feature: 'Job Guarantee', traditional: 'No', online: 'No', fastTrack: '100%', icon: '💼' },
                { feature: 'Practical Projects', traditional: 'Few', online: 'Some', fastTrack: '20+ Projects', icon: '🚀' },
                { feature: 'Career Support', traditional: 'Basic', online: 'None', fastTrack: 'Lifetime', icon: '🎯' },
                { feature: 'Time to First Job', traditional: '6-12 Months', online: '12+ Months', fastTrack: '2-3 Months', icon: '⚡' }
              ].map((row, index) => (
                <motion.div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    padding: '20px 25px',
                    borderBottom: index < 5 ? '1px solid #f0f0f0' : 'none',
                    gap: '20px',
                    alignItems: 'center',
                    background: index % 2 === 0 ? '#fafafa' : 'white'
                  }}
                  whileHover={{ background: 'rgba(255, 107, 53, 0.05)' }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    <span style={{ fontSize: '20px' }}>{row.icon}</span>
                    {row.feature}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
                    {row.traditional}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
                    {row.online}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#ff6b35',
                    fontWeight: '700',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    {row.fastTrack}
                    {index === 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-20px',
                        background: '#00ff00',
                        color: '#000000',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '9px',
                        fontWeight: '800',
                        textTransform: 'uppercase'
                      }}>
                        Fastest
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Outcomes Section */}
      <section style={{ 
        padding: '100px 0', 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)`
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <motion.div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 215, 0, 0.1)',
                padding: '10px 20px',
                borderRadius: '30px',
                marginBottom: '20px',
                border: '2px solid rgba(255, 215, 0, 0.3)'
              }}
              whileHover={{ scale: 1.05 }}
            >
              <LightningBolt size={20} color="#ffd700" />
              <span style={{ color: '#ffd700', fontSize: '14px', fontWeight: '700', letterSpacing: '1px' }}>
                CAREER READY IN MONTHS
              </span>
            </motion.div>
            
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #ffd700 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Your Future Starts Here
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              color: 'rgba(255, 255, 255, 0.8)', 
              maxWidth: '700px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Join thousands of graduates who transformed their careers in just a few months
            </p>
          </motion.div>

          {/* Success Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto 60px'
          }}>
            {[
              { number: '95%', label: 'Placement Rate', desc: 'Within 3 months', icon: '🎯', color: '#ff6b35' },
              { number: '150%', label: 'Average Salary Hike', desc: 'Post completion', icon: '📈', color: '#ffa500' },
              { number: '5000+', label: 'Alumni Network', desc: 'Growing daily', icon: '👥', color: '#ffd700' },
              { number: '4.8/5', label: 'Student Rating', desc: 'Average feedback', icon: '⭐', color: '#ff9558' }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '30px',
                  textAlign: 'center',
                  border: '2px solid rgba(255, 215, 0, 0.2)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: metric.color,
                  boxShadow: `0 25px 50px rgba(0,0,0,0.4), 0 0 30px ${metric.color}33`
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '3px',
                  background: `linear-gradient(90deg, ${metric.color}, transparent)`
                }} />
                
                <motion.div
                  style={{
                    fontSize: '40px',
                    marginBottom: '15px',
                    filter: `drop-shadow(0 0 20px ${metric.color})`
                  }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  {metric.icon}
                </motion.div>
                
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  color: metric.color,
                  marginBottom: '5px',
                  lineHeight: '1'
                }}>
                  {metric.number}
                </div>
                
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '5px'
                }}>
                  {metric.label}
                </div>
                
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {metric.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Completion Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(255, 215, 0, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '40px',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              marginBottom: '30px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px'
            }}>
              <LightningBolt size={24} color="#ffd700" />
              Quick Completion Badges
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              {[
                { name: 'Fast Learner', icon: '🚀', color: '#ff6b35' },
                { name: 'Skill Master', icon: '🏆', color: '#ffa500' },
                { name: 'Project Pro', icon: '💡', color: '#ffd700' },
                { name: 'Career Ready', icon: '🎯', color: '#ff9558' },
                { name: 'Mentor Favorite', icon: '⭐', color: '#ff6b35' }
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '15px 20px',
                    borderRadius: '20px',
                    border: `2px solid ${badge.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, 0],
                    boxShadow: `0 10px 30px ${badge.color}66`
                  }}
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: index * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{badge.icon}</span>
                  <span style={{
                    color: badge.color,
                    fontSize: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {badge.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Can I Become Section */}
      <section style={{ 
        padding: '100px 0', 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              What Can I Become?
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#666', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Unlock diverse career opportunities in Data Science and Artificial Intelligence
            </p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              {
                title: 'Data Scientist',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Analyze complex data, build ML models, and drive business decisions through data insights',
                skills: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization']
              },
              {
                title: 'AI Engineer',
                image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Design and implement AI systems, develop neural networks, and create intelligent solutions',
                skills: ['Deep Learning', 'TensorFlow', 'NLP', 'Computer Vision']
              },
              {
                title: 'ML Engineer',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Deploy ML models at scale, optimize algorithms, and build production-ready AI systems',
                skills: ['MLOps', 'Kubernetes', 'AWS SageMaker', 'Model Deployment']
              },
              {
                title: 'Data Analyst',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Transform raw data into actionable insights, create reports, and support business strategy',
                skills: ['SQL', 'Excel', 'Tableau', 'Business Intelligence']
              },
              {
                title: 'Business Intelligence Analyst',
                image: 'https://images.unsplash.com/photo-1551434675646-33d7c3b7d73?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Develop BI solutions, create dashboards, and help organizations make data-driven decisions',
                skills: ['Power BI', 'Data Warehousing', 'Analytics', 'Reporting']
              },
              {
                title: 'Research Scientist',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Conduct advanced research, develop new algorithms, and push the boundaries of AI',
                skills: ['Research', 'Algorithms', 'Academic Writing', 'Innovation']
              }
            ].slice(0, 6).map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  transform: 'translateY(-10px)', 
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)' 
                }}
              >
                {/* Career Image */}
                <div style={{
                  height: '200px',
                  backgroundImage: `url(${career.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                </div>

                {/* Career Content */}
                <div style={{ padding: '30px' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '15px',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    {career.title}
                    <span style={{
                      fontSize: '0.8rem',
                      background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                      color: '#1a1f36',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontWeight: '600'
                    }}>
                      HIGH DEMAND
                    </span>
                  </h3>
                  
                  <p style={{
                    fontSize: '1rem',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {career.description}
                  </p>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#667eea',
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Key Skills
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {career.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} style={{
                          background: 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          padding: '6px 12px',
                          borderRadius: '15px',
                          fontSize: '0.85rem',
                          fontWeight: '500'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const added = addToCart(programData);
                      if (added) {
                        // Show success notification without redirecting
                        const notification = document.createElement('div');
                        notification.style.cssText = `
                          position: fixed;
                          top: 20px;
                          right: 20px;
                          background: linear-gradient(135deg, #28a745, #20c997);
                          color: white;
                          padding: 15px 25px;
                          border-radius: 10px;
                          box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
                          z-index: 10000;
                          font-weight: 600;
                          animation: slideIn 0.3s ease;
                        `;
                        notification.innerHTML = '✓ Course added to cart!';
                        document.body.appendChild(notification);
                        
                        setTimeout(() => {
                          notification.style.animation = 'slideOut 0.3s ease';
                          setTimeout(() => {
                            document.body.removeChild(notification);
                          }, 300);
                        }, 3000);
                      }
                    }}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 24px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Register to Know More →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Science + AI Certification Advantage */}
      <section className="certification-advantage" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Data Science + AI Certification Advantage
          </h2>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666',
            marginBottom: '60px'
          }}>
            <p>
              Get certified in data science & AI with Microsoft Azure program and receive both Data Science +AI and Microsoft Azure certificates to enhance your career prospects. Gain exclusive access to expert-led masterclasses and our in-house career support program.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            <div className="certification-card" style={{
              background: 'white',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                margin: '0 auto 25px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src="https://skystates.us/wp-content/uploads/2025/10/Data-Science-ANd-AI-Program-2-1024x724.jpg"
                  alt="Data Science + AI Certificate"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '10px'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#333'
              }}>
                Earn Your Data Science and AI Certificate
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left'
              }}>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Industry-recognized certificate by SKY States
                  </span>
                </li>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Dedicated live sessions by faculty of industry experts
                  </span>
                </li>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Lifetime access to self-paced learning content
                  </span>
                </li>
              </ul>
            </div>

            <div className="microsoft-advantage-card" style={{
              background: 'white',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                margin: '0 auto 25px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src="https://skystates.us/wp-content/uploads/2025/12/SAMPLE.png"
                  alt="Microsoft Azure Certificate"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '10px'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#333'
              }}>
                Get Ahead With Microsoft Advantage
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left'
              }}>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Content and certificate by Microsoft
                  </span>
                </li>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Professional-level training from Microsoft
                  </span>
                </li>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    LinkedIn profile Shareable certificate
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <LogoCarousel />
      
      {/* Floating Register Button */}
      <FloatingRegisterButton 
        programName="Data Science & AI (Short)"
        programPrice="6499.00"
        programType="short_program"
      />
    </div>
  );
};

export default DataScienceAIShortTerm;
