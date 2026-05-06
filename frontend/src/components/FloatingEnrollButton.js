import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HomepageTheme.css';

const FloatingEnrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Show button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
    }, 3000);

    // Pulse every 5 seconds
    const pulseInterval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleEnrollClick = () => {
    // Scroll to programs section
    const programsSection = document.querySelector('.programs');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000
      }}
    >
      <motion.button
        onClick={handleEnrollClick}
        className="btn-gradient-primary"
        animate={pulse ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: '50px',
          padding: '18px 28px',
          fontSize: '1rem',
          fontWeight: '800',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          position: 'relative',
          overflow: 'hidden',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 15px 40px rgba(255, 107, 53, 0.4)',
          border: '2px solid rgba(255, 215, 0, 0.3)'
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 20px 50px rgba(255, 215, 0, 0.6)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Lightning bolt icon */}
        <motion.span
          animate={{ rotate: pulse ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.5, repeat: pulse ? Infinity : 0, repeatDelay: 2 }}
          style={{ fontSize: '1.2rem' }}
        >
          ⚡
        </motion.span>
        
        ENROLL NOW
        
        {/* Animated shimmer effect */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          }}
          animate={{ left: pulse ? ['100%', '-100%'] : '-100%' }}
          transition={{ duration: 2, repeat: pulse ? Infinity : 0 }}
        />
      </motion.button>

      {/* Notification tooltip with gold theme */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="glass-card-premium"
        style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          padding: '12px 20px',
          borderRadius: '15px',
          fontSize: '0.85rem',
          fontWeight: '700',
          whiteSpace: 'nowrap',
          border: '2px solid rgba(255, 215, 0, 0.4)',
          boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)'
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: '#ffd700' }}
        >
          ⚡ Limited Time Offer!
        </motion.span>
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          right: '20px',
          width: '0',
          height: '0',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid #ffd700'
        }} />
      </motion.div>
    </motion.div>
  );
};

export default FloatingEnrollButton;
