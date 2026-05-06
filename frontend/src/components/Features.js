import React from 'react';
import { motion } from 'framer-motion';
import './HomepageTheme.css';

const Features = () => {
  const features = [
    {
      icon: 'fas fa-project-diagram',
      title: 'Project Experience',
      description: 'Work on real-world projects to build practical skills'
    },
    {
      icon: 'fas fa-briefcase',
      title: '100% Job Assistance',
      description: 'Get complete support in finding your dream job'
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Sessions by Experts',
      description: 'Learn from industry professionals with years of experience'
    },
    {
      icon: 'fas fa-users',
      title: 'Personalized Small Batches',
      description: 'Get individual attention in small group settings'
    }
  ];

  return (
    <section className="features" style={{
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <motion.h2 
          className="heading-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '60px',
            lineHeight: '1.1'
          }}
        >
          Why Choose Sky States
        </motion.h2>
        
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card-premium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(255, 165, 0, 0.5)',
                boxShadow: '0 25px 50px rgba(255, 107, 53, 0.3)'
              }}
              style={{
                padding: '40px 30px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated gradient border */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #ff6b35, #ffa500, #ffd700, #ffa500, #ff6b35)',
                backgroundSize: '200% 100%',
                animation: 'gradientShift 3s linear infinite'
              }} />
              
              {/* Animated icon container */}
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 15px 30px rgba(255, 107, 53, 0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Speed line animation */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
                  animation: 'speedLine 2s linear infinite'
                }} />
                
                <i className={feature.icon} style={{ fontSize: '1.8rem' }}></i>
              </motion.div>
              
              <h3 className="gold-text" style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '16px',
                textShadow: '0 2px 4px rgba(255, 215, 0, 0.3)'
              }}>
                {feature.title}
              </h3>
              
              <p className="subtitle-enhanced" style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: 0
              }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
