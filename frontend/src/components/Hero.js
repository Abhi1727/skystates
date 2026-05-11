import React, { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';
import './HomepageTheme.css';

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Simplified Lightning Bolt component without animation
  const LightningBolt = ({ size = 24, color = '#3b82f6' }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );

  const stats = [
    { number: "10000+", label: "Students", color: "#3b82f6", icon: "fa-users" },
    { number: "95%", label: "Placement Rate", color: "#28a745", icon: "fa-chart-line" },
    { number: "60+", label: "Expert Faculty", color: "#e74c3c", icon: "fa-chalkboard-teacher" },
    { number: "200+", label: "Hiring Partners", color: "#3498db", icon: "fa-handshake" },
    { number: "20+", label: "Premium Courses", color: "#9b59b6", icon: "fa-laptop-code" },
    { number: "150%", label: "Avg Salary Hike", color: "#f39c12", icon: "fa-arrow-up" }
  ];

  return (
    <>
      {/* REMOVED: Heavy CSS animations for performance */}
      
      <section className="hero gradient-primary" style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '28vh',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: '90px'
    }}>
      {/* 3D Video Background */}
      {/* <video
        key="hero-video"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          opacity: 0.6
        }}
      >
        <source src="/videos/Traveling%20Speed%20of%20Light%20Backwards%20-%20Free%20HD%20Animation.mp4?v=2" type="video/mp4" />
        <source src="/videos/Traveling Speed of Light Backwards - Free HD Animation.mp4?v=2" type="video/mp4" />
      </video> */}

      {/* Animated Lightning Background Pattern - REMOVED TO SHOW VIDEO */}
      {/* <div className="pattern-overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2
      }} /> */}

      {/* Floating Professional Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-accent"
          style={{
            position: 'absolute',
            fontSize: `${20 + i * 5}px`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 15}%`,
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
          <LightningBolt size={30 + i * 10} color="#3b82f6" />
        </motion.div>
      ))}

      {/* Speed Lines */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 1
      }}>
        <div className="speed-line" style={{ top: 0 }} />
      </div>
      <div style={{
        position: 'absolute',
        top: '60%',
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 1
      }}>
        <div className="speed-line" style={{ top: 0, animationDelay: '1s' }} />
      </div>
      
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-content" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Left Content - Speed Focused */}
          <motion.div 
            className="hero-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              color: '#1e293b',
              maxWidth: '800px',
              width: '100%'
            }}
          >
            {/* Professional Learning Badge */}
            <motion.div
              className="glass-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '30px',
                marginBottom: '16px',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                margin: '0 auto 10px auto'
              }}
              whileHover={{ scale: 1.05 }}
            >
              <LightningBolt size={20} color="#3b82f6" />
              <span style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '700', letterSpacing: '1px' }}>
                PROFESSIONAL LEARNING
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

            <h1 className="heading-gradient" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: '900',
              marginBottom: '7px',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}>
              Accessible Learning for
              <span style={{ 
                display: 'block',
                fontWeight: '900'
              }}> All</span>
              <span style={{
                display: 'block',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: '#3b82f6',
                fontWeight: '700',
                marginTop: '8px'
              }}>
                ⚡ Career Ready in Months
              </span>
            </h1>
            
            <p className="subtitle-enhanced" style={{
              fontSize: '1.4rem',
              marginBottom: '10px',
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              Get Success along with <span className="blue-text">Expert</span> Skill Development
            </p>

            {/* Value Proposition Pills */}
            <div style={{
              display: 'flex',
              gap: '15px',
              marginBottom: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {[
                { icon: '🎯', text: 'Expert-Led Learning', color: '#3b82f6' },
                { icon: '📚', text: 'Industry Curriculum', color: '#60a5fa' },
                { icon: '👨‍🏫', text: '1-on-1 Mentor Support', color: '#3b82f6' },
                // { icon: '💼', text: 'Career Advancement', color: '#2563eb' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="value-pill"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: item.color
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    color: '#1e293b', 
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              {[
                { icon: '🎓', text: 'Industry Certified', color: '#10b981' },
                { icon: '💼', text: 'Career Support', color: '#3b82f6' },
                { icon: '⭐', text: '4.9/5 Rating', color: '#f59e0b' },
                { icon: '👥', text: '10000+ Students', color: '#3b82f6' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '20px'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Elements - COMMENTED OUT */}
          {/*
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ width: '100%', maxWidth: '600px', overflow: 'hidden', marginBottom: '40px' }}>
              <Marquee
                gradient={false}
                speed={40}
                pauseOnHover={true}
                direction="left"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="glass-card" style={{
                    textAlign: 'center',
                    minWidth: '200px',
                    margin: '0 15px',
                    cursor: 'default'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      fontSize: '36px',
                      fontWeight: '800',
                      color: stat.color,
                      marginBottom: '10px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      {stat.number}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      color: '#1e293b',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <i className={`fas ${stat.icon}`} style={{ opacity: 0.8 }}></i>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>

            <motion.button
              className="btn-gradient-primary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 50px rgba(255, 215, 0, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const programsSection = document.querySelector('.programs');
                if (programsSection) {
                  programsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LightningBolt size={20} color="#ffffff" />
                Explore Programs
              </span>
            </motion.button>
          </motion.div>
          */}
        </div>
      </div>

      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: 3,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
      </div>
    </section>
    </>
  );
};
                  export default Hero;
