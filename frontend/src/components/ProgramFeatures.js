import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProgramFeatures = ({ 
  programName, 
  programData, 
  features = [], 
  title = "Program Excellence",
  subtitle = "Discover What Makes Our Program Stand Out",
  backgroundGradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  showCTA = true 
}) => {
  const navigate = useNavigate();

  // Default features if none provided
  const defaultFeatures = [
    {
      icon: '🎯',
      title: '100% Job Assistance',
      description: 'Through our in-house recruitment agency with over 250 hiring partners',
      color: '#ffd700',
      bgGradient: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 237, 78, 0.1))',
      borderColor: 'rgba(255, 215, 0, 0.3)',
      delay: 0
    },
    {
      icon: '🏆',
      title: 'Industry-Recognized Certificate',
      description: `Advanced ${programName} certificate from Sky States`,
      color: '#00ff88',
      bgGradient: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1))',
      borderColor: 'rgba(0, 255, 136, 0.3)',
      delay: 0.1
    },
    {
      icon: '🚀',
      title: 'Capstone Projects',
      description: 'From various domains and industry relevant projects',
      color: '#ff6b6b',
      bgGradient: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 107, 107, 0.1))',
      borderColor: 'rgba(255, 107, 107, 0.3)',
      delay: 0.2
    },
    {
      icon: '💼',
      title: 'Microsoft Training',
      description: 'Professional-level training from Microsoft with certification',
      color: '#4ecdc4',
      bgGradient: 'linear-gradient(135deg, rgba(78, 205, 196, 0.2), rgba(78, 205, 196, 0.1))',
      borderColor: 'rgba(78, 205, 196, 0.3)',
      delay: 0.3
    },
    {
      icon: '🔬',
      title: 'Integrated Labs',
      description: 'Hands-on learning experience with practical exercises',
      color: '#a8e6cf',
      bgGradient: 'linear-gradient(135deg, rgba(168, 230, 207, 0.2), rgba(168, 230, 207, 0.1))',
      borderColor: 'rgba(168, 230, 207, 0.3)',
      delay: 0.4
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Faculty',
      description: 'Dedicated live sessions by faculty of industry experts',
      color: '#ffd3b6',
      bgGradient: 'linear-gradient(135deg, rgba(255, 211, 182, 0.2), rgba(255, 211, 182, 0.1))',
      borderColor: 'rgba(255, 211, 182, 0.3)',
      delay: 0.5
    },
    {
      icon: '♾️',
      title: 'Lifetime Access',
      description: 'Self-paced learning content through our Learning Management System',
      color: '#ffaaa5',
      bgGradient: 'linear-gradient(135deg, rgba(255, 170, 165, 0.2), rgba(255, 170, 165, 0.1))',
      borderColor: 'rgba(255, 170, 165, 0.3)',
      delay: 0.6
    },
    {
      icon: '👥',
      title: 'Small Batch Sizes',
      description: 'Personalized attention and tailored instruction',
      color: '#ff8b94',
      bgGradient: 'linear-gradient(135deg, rgba(255, 139, 148, 0.2), rgba(255, 139, 148, 0.1))',
      borderColor: 'rgba(255, 139, 148, 0.3)',
      delay: 0.7
    }
  ];

  const featuresToUse = features.length > 0 ? features : defaultFeatures;

  const handleEnrollClick = () => {
    if (programData) {
      navigate('/checkout', { 
        state: { program: programData }
      });
    }
  };

  return (
    <section className="program-features" style={{ 
      padding: '100px 0', 
      background: backgroundGradient,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        animation: 'pulse 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        animation: 'pulse 4s ease-in-out infinite 2s'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: '800', 
            marginBottom: '20px',
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            letterSpacing: '-0.02em'
          }}>
            {title}
            <span style={{ 
              display: 'block',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: '400',
              marginTop: '10px',
              opacity: 0.9,
              letterSpacing: '0.05em'
            }}>
              {subtitle}
            </span>
          </h2>
          
          <div style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, #ffd700, #ffed4e)',
            margin: '30px auto',
            borderRadius: '2px',
            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)'
          }} />
        </motion.div>

        {/* Interactive Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {featuresToUse.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                y: -10
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '30px',
                border: `1px solid ${feature.borderColor}`,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = feature.bgGradient;
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              {/* Glowing orb effect */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${feature.color}20 0%, transparent 70%)`,
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '0';
              }}
              />

              {/* Icon Container */}
              <motion.div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: feature.bgGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '20px',
                  border: `2px solid ${feature.borderColor}`,
                  position: 'relative',
                  zIndex: 1
                }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#2c3e50',
                  lineHeight: '1.3'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{
                  fontSize: '0.95rem',
                  color: '#5a6c7d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feature.description}
                </p>

                {/* Interactive indicator */}
                <motion.div
                  style={{
                    marginTop: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: feature.color,
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span>Learn More</span>
                  <motion.span
                    animate={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>

              {/* Decorative corner accent */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '30px',
                height: '30px',
                borderTop: `3px solid ${feature.color}`,
                borderRight: `3px solid ${feature.color}`,
                borderTopRightRadius: '15px',
                opacity: 0.6
              }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginTop: '70px',
              padding: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '15px',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              Ready to Transform Your Career?
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '30px',
              maxWidth: '600px',
              margin: '0 auto 30px'
            }}>
              Join thousands of professionals who have advanced their careers with our comprehensive {programName.toLowerCase()} program.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 15px 40px rgba(255, 215, 0, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnrollClick}
              style={{
                background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                color: '#1a1f36',
                padding: '16px 40px',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>
                🚀 Get Started Now
              </span>
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                }}
                whileHover={{
                  left: '0%',
                  transition: { duration: 0.6 }
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @media (max-width: 768px) {
          .program-features {
            padding: 60px 0 !important;
          }
          
          .program-features .container {
            padding: 0 20px;
          }
          
          .program-features h2 {
            font-size: 2rem !important;
          }
          
          .program-features h2 span {
            font-size: 1.2rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .program-features {
            padding: 40px 0 !important;
          }
          
          .program-features .container div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .program-features div[style*="padding: 30px"] {
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProgramFeatures;
