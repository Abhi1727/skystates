import React from 'react';
import Marquee from "react-fast-marquee";

const Hero = () => {
  const stats = [
    { number: "5000+", label: "Students", color: "#ffd700", icon: "fa-users" },
    { number: "95%", label: "Placement Rate", color: "#28a745", icon: "fa-chart-line" },
    { number: "50+", label: "Expert Faculty", color: "#e74c3c", icon: "fa-chalkboard-teacher" },
    { number: "100+", label: "Hiring Partners", color: "#3498db", icon: "fa-handshake" },
    { number: "20+", label: "Premium Courses", color: "#9b59b6", icon: "fa-laptop-code" },
    { number: "150%", label: "Avg Salary Hike", color: "#f39c12", icon: "fa-arrow-up" }
  ];

  return (
    <section className="hero" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-content" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div className="hero-left" style={{ color: 'white' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '20px',
              color: '#ffffff'
            }}>
              Transform Your Career with
              <span style={{ color: '#ffd700', display: 'block' }}> Sky States</span>
            </h1>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '1.6',
              marginBottom: '30px',
              color: '#e0e0e0',
              maxWidth: '500px'
            }}>
              Premier Online Programs for Every Learner - Data Science, Cyber Security & DevOps
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              color: '#ffffff',
              lineHeight: '1.6'
            }}>
              Join thousands of successful graduates who have transformed their careers with our industry-leading programs
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button style={{
                background: '#28a745',
                color: 'white',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
              }}>
                <i className="fas fa-rocket" style={{ marginRight: '10px' }}></i>
                Explore Programs
              </button>
              <button style={{
                background: 'transparent',
                color: 'white',
                padding: '15px 30px',
                border: '2px solid white',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <i className="fas fa-play-circle" style={{ marginRight: '10px' }}></i>
                Book Demo Session
              </button>
            </div>
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
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '10px',
                color: '#ffffff'
              }}>
                Industry-Recognized
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#e0e0e0',
                marginBottom: '0'
              }}>
                Certificates & Job Placement
              </p>
            </div>

            {/* Sliding Stats Cards */}
            <div style={{ width: '100%', maxWidth: '600px', overflow: 'hidden' }}>
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
  );
};

export default Hero;
