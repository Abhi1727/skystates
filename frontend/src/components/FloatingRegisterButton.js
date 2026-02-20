import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingRegisterButton = ({ programName, programPrice, programType }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Show button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
    }, 3000);

    // Pulse every 4 seconds
    const pulseInterval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleRegisterClick = () => {
    // Scroll to pricing section
    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        onClick={handleRegisterClick}
        animate={pulse ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, #0073aa, #005a8b)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '16px 24px',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0, 115, 170, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 15px 40px rgba(0, 115, 170, 0.5)',
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background effect */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          }}
          animate={{ left: ['100%', '-100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        <span style={{ position: 'relative', zIndex: 1 }}>
          🎓 REGISTER NOW
        </span>
      </motion.button>

      {/* Notification tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          background: 'white',
          color: '#333',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: '600',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          whiteSpace: 'nowrap',
          border: '2px solid #0073aa'
        }}
      >
        📚 {programName || 'Join Program'}
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          right: '20px',
          width: '0',
          height: '0',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid white'
        }} />
      </motion.div>
    </motion.div>
  );
};

export default FloatingRegisterButton;
