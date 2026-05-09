import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './HomepageTheme.css';

const ProgramFeatures = ({ 
  programName, 
  programData, 
  features = [], 
  title = "Program Excellence",
  subtitle = "Discover What Makes Our Program Stand Out",
  backgroundGradient = "section-gradient-1",
  showCTA = true 
}) => {
  const navigate = useNavigate();

  // Default features with blue theme alignment
  const defaultFeatures = [
    {
      icon: '🎯',
      title: '100% Job Assistance',
      description: 'Through our in-house recruitment agency with over 250 hiring partners including Fortune 500 companies',
      color: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.08))',
      borderColor: 'rgba(59, 130, 246, 0.4)',
      delay: 0
    },
    {
      icon: '🏆',
      title: 'Industry-Recognized Certificate',
      description: `Advanced ${programName} certificate from Sky States, recognized by leading tech employers worldwide`,
      color: '#60a5fa',
      bgGradient: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(59, 130, 246, 0.08))',
      borderColor: 'rgba(96, 165, 250, 0.4)',
      delay: 0.1
    },
    {
      icon: '🚀',
      title: 'Capstone Projects',
      description: 'Real-world projects from healthcare, finance, and e-commerce domains with industry mentorship',
      color: '#2563eb',
      bgGradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.08))',
      borderColor: 'rgba(37, 99, 235, 0.4)',
      delay: 0.2
    },
    {
      icon: '💼',
      title: 'Microsoft Training',
      description: 'Official Microsoft certification training with hands-on Azure and AI platform experience',
      color: '#1e40af',
      bgGradient: 'linear-gradient(135deg, rgba(30, 64, 175, 0.15), rgba(37, 99, 235, 0.08))',
      borderColor: 'rgba(30, 64, 175, 0.4)',
      delay: 0.3
    },
    {
      icon: '🔬',
      title: 'Integrated Labs',
      description: 'State-of-the-art cloud labs with 24/7 access to industry-standard tools and datasets',
      color: '#93c5fd',
      bgGradient: 'linear-gradient(135deg, rgba(147, 197, 253, 0.15), rgba(96, 165, 250, 0.08))',
      borderColor: 'rgba(147, 197, 253, 0.4)',
      delay: 0.4
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Faculty',
      description: 'Learn from industry veterans with 15+ years experience at Google, Microsoft, and Amazon',
      color: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(96, 165, 250, 0.1))',
      borderColor: 'rgba(59, 130, 246, 0.5)',
      delay: 0.5
    },
    {
      icon: '♾️',
      title: 'Lifetime Access',
      description: 'Continuous learning with lifetime access to updated content and alumni network',
      color: '#60a5fa',
      bgGradient: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(59, 130, 246, 0.08))',
      borderColor: 'rgba(96, 165, 250, 0.4)',
      delay: 0.6
    },
    {
      icon: '👥',
      title: 'Small Batch Sizes',
      description: 'Personalized mentoring with 1:15 faculty-to-student ratio for optimal learning',
      color: '#2563eb',
      bgGradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.08))',
      borderColor: 'rgba(37, 99, 235, 0.4)',
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
    <section className="program-features section-gradient-1" style={{ 
      padding: '100px 0', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Professional Blue Background Elements */}
      <div className="floating-accent" style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div className="floating-accent" style={{
        position: 'absolute',
        top: '60%',
        right: '8%',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite 2s'
      }} />
      <div className="floating-accent" style={{
        position: 'absolute',
        bottom: '20%',
        left: '12%',
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite 1s'
      }} />
      
      {/* Lightning Bolt Accents */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '15%',
        fontSize: '24px',
        color: 'rgba(59, 130, 246, 0.2)',
        animation: 'professionalPulse 3s ease-in-out infinite',
        transform: 'rotate(15deg)'
      }}>
        ⚡
      </div>
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '25%',
        fontSize: '18px',
        color: 'rgba(96, 165, 250, 0.15)',
        animation: 'professionalPulse 4s ease-in-out infinite 1.5s',
        transform: 'rotate(-10deg)'
      }}>
        ⚡
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <h2 className="heading-gradient" style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: '900', 
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            {title}
            <span className="subtitle-enhanced" style={{ 
              display: 'block',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: '500',
              marginTop: '10px',
              letterSpacing: '0.05em'
            }}>
              {subtitle}
            </span>
          </h2>
          
          <div style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            margin: '30px auto',
            borderRadius: '2px',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
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
                scale: 1.03,
                boxShadow: '0 25px 50px rgba(59, 130, 246, 0.15)',
                y: -8
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(25px)',
                borderRadius: '24px',
                padding: '35px',
                border: `2px solid ${feature.borderColor}`,
                boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = feature.bgGradient;
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                e.currentTarget.style.borderColor = feature.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = feature.borderColor;
              }}
            >
              {/* Enhanced Glowing orb effect */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${feature.color}15 0%, transparent 60%)`,
                opacity: 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none'
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
                  width: '80px',
                  height: '80px',
                  borderRadius: '24px',
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '24px',
                  border: `3px solid ${feature.borderColor}`,
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: `0 8px 25px ${feature.color}25`
                }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.15
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  marginBottom: '14px',
                  color: '#1e293b',
                  lineHeight: '1.3',
                  letterSpacing: '-0.01em'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  color: '#475569',
                  lineHeight: '1.7',
                  margin: 0,
                  fontWeight: '400'
                }}>
                  {feature.description}
                </p>

                {/* Enhanced Interactive indicator */}
                <motion.div
                  style={{
                    marginTop: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: feature.color,
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>Explore Feature</span>
                  <motion.span
                    animate={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ display: 'inline-block' }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>

              {/* Enhanced Decorative corner accent */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '35px',
                height: '35px',
                borderTop: `4px solid ${feature.color}`,
                borderRight: `4px solid ${feature.color}`,
                borderTopRightRadius: '18px',
                opacity: 0.7,
                boxShadow: `0 0 15px ${feature.color}40`
              }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        {/* showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginTop: '80px',
              padding: '50px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '2px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)'
            }}
          >
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '18px',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)',
              letterSpacing: '-0.01em'
            }}>
              Ready to Transform Your Career?
            </h3>
            <p style={{
              fontSize: '1.15rem',
              color: '#475569',
              marginBottom: '35px',
              maxWidth: '650px',
              margin: '0 auto 35px',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Join thousands of professionals who have advanced their careers with our comprehensive {programName.toLowerCase()} program.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 15px 40px rgba(59, 130, 246, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnrollClick}
              className="btn-gradient-primary"
              style={{
                fontSize: '1.15rem',
                padding: '18px 45px'
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>
                🚀 Get Started Now
              </span>
            </motion.button>
          </motion.div>
        ) */}
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
