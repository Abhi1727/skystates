import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants for consistent micro-interactions
export const animationVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  
  scaleUp: {
    initial: { scale: 1 },
    animate: { scale: 1.05 },
    exit: { scale: 1 }
  },
  
  // Slide animations
  slideInLeft: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' }
  },
  
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' }
  },
  
  // Stagger animations for lists
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }
};

// Spring animations for natural movement
export const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 25
};

export const gentleSpring = {
  type: "spring",
  stiffness: 200,
  damping: 30
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

export const hoverLift = {
  whileHover: { 
    y: -5, 
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3 }
  },
  whileTap: { scale: 0.98 }
};

export const hoverGlow = {
  whileHover: { 
    boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)',
    transition: { duration: 0.3 }
  }
};

// Loading animations
export const loadingPulse = {
  initial: { opacity: 0.6 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export const loadingSkeleton = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

// Success/Error animations
export const successAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: [0, 1.2, 1], 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const errorShake = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 }
  }
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 }
};

// Custom hook for scroll animations
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Floating animation for decorative elements
export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulse animation for notifications
export const pulseAnimation = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Typing animation for text
export const typingAnimation = {
  initial: { width: 0 },
  animate: { width: "100%" },
  transition: {
    duration: 2,
    ease: "easeInOut"
  }
};

// Particle effects
export const particleAnimation = {
  initial: { 
    scale: 0, 
    opacity: 0, 
    x: 0, 
    y: 0 
  },
  animate: { 
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    x: [0, Math.random() * 100 - 50],
    y: [0, -50],
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

// Enhanced button component with micro-interactions
export const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  success = false,
  error = false,
  onClick,
  disabled = false,
  style = {},
  ...props 
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    };

    const sizeStyles = {
      small: { padding: '8px 16px', fontSize: '0.875rem' },
      medium: { padding: '12px 24px', fontSize: '1rem' },
      large: { padding: '16px 32px', fontSize: '1.125rem' }
    };

    const variantStyles = {
      primary: {
        background: 'linear-gradient(135deg, #f97316, #fb923c)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)'
      },
      secondary: {
        background: 'white',
        color: '#374151',
        border: '2px solid #e5e7eb'
      },
      success: {
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
      },
      danger: {
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
      }
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.5 : 1,
      ...style
    };
  };

  return (
    <motion.button
      style={getButtonStyles()}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { 
        scale: 1.05,
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
      } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      animate={success ? successAnimation : error ? errorShake : {}}
      {...props}
    >
      {/* Ripple effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.5)',
          transform: 'translate(-50%, -50%)'
        }}
        whileTap={{
          width: 300,
          height: 300,
          transition: { duration: 0.5 }
        }}
      />
      
      {loading ? (
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          animate={loadingPulse}
        >
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          Loading...
        </motion.div>
      ) : (
        children
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.button>
  );
};

// Card component with hover effects
export const AnimatedCard = ({ 
  children, 
  hover = true,
  lift = true,
  glow = false,
  style = {},
  ...props 
}) => {
  const getCardStyles = () => ({
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    ...style
  });

  const motionProps = {};
  
  if (hover) {
    motionProps.whileHover = { scale: 1.02 };
  }
  
  if (lift) {
    motionProps.whileHover = {
      ...motionProps.whileHover,
      y: -5,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
    };
  }
  
  if (glow) {
    motionProps.whileHover = {
      ...motionProps.whileHover,
      boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)'
    };
  }

  return (
    <motion.div
      style={getCardStyles()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Progress bar with animation
export const AnimatedProgressBar = ({ 
  value, 
  max = 100, 
  color = '#f97316',
  animated = true,
  showLabel = true,
  size = 'medium',
  style = {}
}) => {
  const percentage = (value / max) * 100;
  
  const sizeStyles = {
    small: { height: '8px' },
    medium: { height: '12px' },
    large: { height: '16px' }
  };

  return (
    <div style={{ width: '100%', ...style }}>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151'
        }}>
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div style={{
        width: '100%',
        background: '#e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        ...sizeStyles[size]
      }}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            delay: animated ? 0.2 : 0
          }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            borderRadius: '8px'
          }}
        />
      </div>
    </div>
  );
};

// Notification component with animations
export const AnimatedNotification = ({ 
  children,
  type = 'info',
  isVisible,
  onClose,
  autoClose = false,
  duration = 5000
}) => {
  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible, duration, onClose]);

  const getNotificationStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      minWidth: '300px'
    };

    const typeStyles = {
      success: {
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white'
      },
      error: {
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white'
      },
      warning: {
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        color: 'white'
      },
      info: {
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: 'white'
      }
    };

    return {
      ...baseStyles,
      ...typeStyles[type]
    };
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={getNotificationStyles()}
        >
          {children}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              opacity: 0.8,
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.8'}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default {
  animationVariants,
  springConfig,
  hoverScale,
  hoverLift,
  hoverGlow,
  loadingPulse,
  loadingSkeleton,
  successAnimation,
  errorShake,
  pageTransition,
  useScrollAnimation,
  floatingAnimation,
  pulseAnimation,
  typingAnimation,
  particleAnimation,
  AnimatedButton,
  AnimatedCard,
  AnimatedProgressBar,
  AnimatedNotification
};
