import React, { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const stats = [
    { number: "5000+", label: "Students", color: "#ffd700", icon: "fa-users" },
    { number: "95%", label: "Placement Rate", color: "#28a745", icon: "fa-chart-line" },
    { number: "50+", label: "Expert Faculty", color: "#e74c3c", icon: "fa-chalkboard-teacher" },
    { number: "100+", label: "Hiring Partners", color: "#3498db", icon: "fa-handshake" },
    { number: "20+", label: "Premium Courses", color: "#9b59b6", icon: "fa-laptop-code" },
    { number: "150%", label: "Avg Salary Hike", color: "#f39c12", icon: "fa-arrow-up" }
  ];

  return (
    <>
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideText {
          0%, 12.5% { transform: translateY(0); }
          25%, 37.5% { transform: translateY(-60px); }
          50%, 62.5% { transform: translateY(-120px); }
          75%, 87.5% { transform: translateY(-180px); }
          100%, 112.5% { transform: translateY(-240px); }
          125%, 137.5% { transform: translateY(-300px); }
          150%, 162.5% { transform: translateY(-360px); }
          175%, 187.5% { transform: translateY(-420px); }
          200% { transform: translateY(-480px); }
        }
      `}</style>
      
      <section className="hero" style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Video Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Fallback background while video loads */}
        {!videoLoaded && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              zIndex: 0
            }}
          />
        )}
      </div>
      
      {/* Dark overlay for text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
        transition: 'background 2s ease-in-out'
      }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-content" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div className="hero-left" style={{ color: 'white' }}>
            <h1 className="heading-display" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              lineHeight: '1.1',
              marginBottom: '24px',
              color: '#ffffff',
              letterSpacing: '-0.03em'
            }}>
              Accessible Learning for
              <span className="text-gold" style={{ 
                display: 'block',
                fontWeight: '800'
              }}> All</span>
            </h1>
            
            <h2 className="subtitle" style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              fontWeight: '500',
              lineHeight: '1.6',
              marginBottom: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px'
            }}>
              Achieve Success with Sky States – Premier Online Programs for Every Learner
            </h2>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                gap: '30px',
                marginBottom: '40px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              {[
                { icon: '🎓', text: 'Industry Certified', color: '#28a745' },
                { icon: '💼', text: '100% Job Assistance', color: '#007bff' },
                { icon: '⭐', text: '4.9/5 Rating', color: '#ffc107' },
                { icon: '👥', text: '5000+ Students', color: '#17a2b8' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span className="cta-text" style={{ fontSize: '0.9rem', color: 'white' }}>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
            {/* <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => {
                  const programsSection = document.querySelector('.programs');
                  if (programsSection) {
                    programsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #28a745, #20c997)',
                  color: 'white',
                  padding: '16px 32px',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(40, 167, 69, 0.3)',
                  letterSpacing: '0.01em',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(40, 167, 69, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.3)';
                }}>
                <i className="fas fa-rocket" style={{ marginRight: '10px' }}></i>
                <span className="cta-text">Explore Programs</span>
              </button>
            </div> */}
          </div>

          {/* Right Content - Visual Elements */}
          <div className="hero-right" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Main Visual Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              marginBottom: '40px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: '400px'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(45deg, #ffd700, #ff6b35)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '48px',
                color: 'white',
                boxShadow: '0 10px 20px rgba(255, 107, 53, 0.3)'
              }}>
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3 className="feature-title" style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '10px',
                color: '#ffffff'
              }}>
                Industry-Recognized
              </h3>
              <p className="subtitle" style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '0'
              }}>
                Certificates & Job Placement
              </p>
            </div>

            {/* Sliding Stats Cards */}
            <div style={{ width: '100%', maxWidth: '600px', overflow: 'hidden', marginBottom: '40px' }}>
              <Marquee
                gradient={false}
                speed={40}
                pauseOnHover={true}
                direction="left"
              >
                {stats.map((stat, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '20px',
                    margin: '0 15px',
                    textAlign: 'center',
                    minWidth: '200px',
                    cursor: 'default',
                    transition: 'transform 0.3s ease, background 0.3s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                  >
                    <div className="stat-number" style={{
                      fontSize: '36px',
                      fontWeight: '800',
                      color: stat.color,
                      marginBottom: '10px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      {stat.number}
                    </div>
                    <div className="cta-text" style={{
                      fontSize: '15px',
                      color: 'white',
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

            {/* Explore Programs Button - Below Stats */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => {
                  const programsSection = document.querySelector('.programs');
                  if (programsSection) {
                    programsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)',
                  color: 'white',
                  padding: '18px 40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(37, 99, 235, 0.25)',
                  backdropFilter: 'blur(10px)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.02)';
                  e.target.style.boxShadow = '0 8px 30px rgba(37, 99, 235, 0.4)';
                  e.target.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #172554 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.25)';
                  e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)';
                }}
              >
                <span style={{ fontSize: '18px' }}>🚀</span>
                <span className="cta-text">Explore Programs</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: 1,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
      </div>
    </section>
    </>
  );
};

export default Hero;
