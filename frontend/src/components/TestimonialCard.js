import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Professional color palette
const colors = {
  primary: '#1a1f36',
  primaryLight: '#2d3748',
  accent: '#667eea',
  accentLight: '#a78bfa',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  neutral50: '#f8fafc',
  neutral100: '#e2e8f0',
  neutral500: '#64748b',
  neutral900: '#0f172a'
};

const TestimonialCard = ({ testimonial, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleWatchVideo = () => {
    setShowVideo(true);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setIsPlaying(false);
  };

  return (
    <>
      <motion.div
        className="testimonial-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.2,
          ease: "easeOut"
        }}
        whileHover={{ 
          y: -8,
          boxShadow: `0 25px 60px ${colors.accent}25`,
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        style={{
          background: 'white',
          border: `2px solid ${colors.neutral100}`,
          borderRadius: '20px',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          minHeight: '380px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Accent gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`,
          opacity: 0.8
        }} />

        {/* Quote icon */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '60px',
            color: `${colors.accent}15`,
            fontFamily: 'Georgia, serif',
            lineHeight: 1
          }}
          animate={{ 
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: index * 0.5
          }}
        >
          "
        </motion.div>

        {/* Student Avatar */}
        <motion.div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: testimonial.image 
              ? `url(${testimonial.image}) center/cover` 
              : `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: testimonial.image ? 'transparent' : 'white',
            fontWeight: '700',
            marginBottom: '24px',
            boxShadow: `0 8px 25px ${colors.accent}30`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
        >
          {!testimonial.image && testimonial.initials}
        </motion.div>

        {/* Testimonial Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <motion.blockquote
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: colors.neutral500,
              marginBottom: '32px',
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 1
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
          >
            "{testimonial.testimonial}"
          </motion.blockquote>

          {/* Student Info */}
          <div style={{ marginTop: 'auto' }}>
            <motion.h4
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: colors.neutral900,
                marginBottom: '8px'
              }}
              whileHover={{ color: colors.accent }}
              transition={{ duration: 0.2 }}
            >
              {testimonial.name}
            </motion.h4>
            
            <motion.div
              style={{
                fontSize: '16px',
                color: colors.neutral500,
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ 
                fontSize: '14px',
                background: `${colors.success}15`,
                color: colors.success,
                padding: '4px 8px',
                borderRadius: '12px',
                fontWeight: '600'
              }}>
                {testimonial.role}
              </span>
              <span style={{ fontSize: '12px', color: colors.neutral400 }}>
                at {testimonial.company}
              </span>
            </motion.div>

            {/* Watch Video Button */}
            {/* <motion.button
              onClick={handleWatchVideo}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: colors.accent,
                boxShadow: `0 10px 30px ${colors.accent}40`,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: colors.accent,
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
                style={{ fontSize: '20px' }}
              >
                ▶️
              </motion.span>
              Watch Story Video
            </motion.button> */}
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.accent}10, transparent)`,
            zIndex: 0
          }}
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '20px',
                maxWidth: '800px',
                width: '100%',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={handleCloseVideo}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 90,
                  backgroundColor: colors.danger
                }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: colors.neutral100,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: colors.neutral500,
                  transition: 'all 0.3s ease',
                  zIndex: 10
                }}
              >
                ×
              </motion.button>

              {/* Video Content */}
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                background: colors.neutral900,
                aspectRatio: '16/9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isPlaying ? (
                  // Video player placeholder
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: 'white'
                  }}>
                    <motion.div
                      style={{
                        fontSize: '64px',
                        marginBottom: '20px'
                      }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                      }}
                    >
                      ▶️
                    </motion.div>
                    <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>
                      {testimonial.name}'s Success Story
                    </h3>
                    <p style={{ opacity: 0.7, textAlign: 'center', padding: '0 20px' }}>
                      Video testimonial coming soon...
                    </p>
                  </div>
                ) : (
                  <div style={{
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    Loading video...
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: colors.neutral900,
                  marginBottom: '8px'
                }}>
                  {testimonial.name}
                </h3>
                <p style={{ 
                  color: colors.neutral500,
                  marginBottom: '16px'
                }}>
                  {testimonial.role} at {testimonial.company}
                </p>
                <p style={{ 
                  color: colors.neutral500,
                  fontStyle: 'italic',
                  lineHeight: '1.6'
                }}>
                  "{testimonial.testimonial}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TestimonialCard;
