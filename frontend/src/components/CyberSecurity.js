import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import FloatingRegisterButton from './FloatingRegisterButton';
import ProgramFeatures from './ProgramFeatures';
import BatchCountdownTimer from './BatchCountdownTimer';

const CyberSecurity = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    jobs: 0,
    salary: 0
  });

  const programData = {
    name: 'Cyber Security and Ethical Hacking Program',
    price: '2999.00',
    duration: '6 Months',
    type: 'full_program'
  };

  // Animated counter effect
  useEffect(() => {
    const animateCounter = (target, duration, callback) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          callback(target);
          clearInterval(timer);
        } else {
          callback(Math.floor(start));
        }
      }, 16);
    };

    animateCounter(3500, 2000, (val) => setStats(prev => ({ ...prev, students: val })));
    animateCounter(2000000, 2500, (val) => setStats(prev => ({ ...prev, jobs: Math.floor(val) })));
    animateCounter(125, 1800, (val) => setStats(prev => ({ ...prev, salary: val })));
  }, []);

  return (
    <div className="product-page">
      {/* Enhanced Hero Section with Gradient Background */}
      <section className="product-hero" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
        overflow: 'hidden'
      }}>
        <BatchCountdownTimer />

        {/* Floating elements */}
        {/* <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '60px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 6s ease-in-out infinite'
        }}>🔒</div> */}
        {/* <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          fontSize: '50px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 8s ease-in-out infinite reverse'
        }}>🛡️</div> */}
        {/* <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          fontSize: '55px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 7s ease-in-out infinite'
        }}>🔐</div> */}

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Popular badge removed */}

              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: '800', 
                marginBottom: '24px',
                color: '#ffffff',
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}>
                Become a
                <span style={{ 
                  display: 'block',
                  background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '900'
                }}>
                  Cybersecurity Expert
                </span>
              </h1>
              
              <p style={{ 
                fontSize: '1.3rem', 
                color: 'rgba(255, 255, 255, 0.9)', 
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                Master ethical hacking, network security & digital forensics. 
                <span style={{ color: '#ffd700', fontWeight: '600' }}> Protect the digital world</span>
              </p>

              {/* Trust Indicators - All in one line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '30px',
                  marginBottom: '40px',
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                  borderRadius: '20px',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)'
                }}
              >
                <span style={{ 
                  fontSize: '1.1rem', 
                  color: '#ffffff',
                  fontWeight: '600',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}>🎓 CEH Certified</span>
                <span style={{ 
                  fontSize: '1.1rem', 
                  color: '#ffffff',
                  fontWeight: '600',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}>💼 100% Job Support</span>
                <span style={{ 
                  fontSize: '1.1rem', 
                  color: '#ffffff',
                  fontWeight: '600',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}>⏰ 6 Months Program</span>
              </motion.div>

              {/* Modern Price Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))',
                  backdropFilter: 'blur(20px)',
                  padding: '20px 32px',
                  borderRadius: '20px',
                  marginBottom: '40px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  display: 'inline-block',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)'
                }}
              >
                {/* Modern accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)'
                }} />
                
                {/* Affordable pricing layout */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '2px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <span style={{ 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.9)',
                    letterSpacing: '0.5px'
                  }}>
                    $
                  </span>
                  <span style={{ 
                    fontSize: '32px', 
                    fontWeight: '800',
                    color: '#ffffff',
                    letterSpacing: '-0.03em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    2,999
                  </span>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.7)',
                    letterSpacing: '0.3px'
                  }}>
                    total
                  </span>
                </div>
                
                {/* Value proposition */}
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: '4px',
                  letterSpacing: '0.2px',
                  textTransform: 'uppercase',
                  fontWeight: '500'
                }}>
                  Best Value Program
                </div>
                
                {/* Modern accent element */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '8px',
                  height: '8px',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  borderRadius: '50%',
                  boxShadow: '0 0 12px rgba(59, 130, 246, 0.4)'
                }} />
              </motion.div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', paddingBottom: '15px' }}>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(255, 215, 0, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Redirect to checkout with program data
                    navigate('/checkout', { 
                      state: { 
                        program: {
                          name: programData.name,
                          price: programData.price,
                          duration: programData.duration,
                          type: programData.type
                        }
                      } 
                    });
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                    color: '#1a1f36',
                    padding: '18px 40px',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '18px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    🚀 Enroll Now
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
                
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(40, 167, 69, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Redirect to checkout with $99 registration fee
                    navigate('/checkout', { 
                      state: { 
                        program: {
                          name: 'Registration fee for Cyber Security and Ethical Hacking Program',
                          price: '99.00',
                          duration: '6 Months',
                          type: 'registration'
                        }
                      } 
                    });
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #28a745, #32c997)',
                    color: 'white',
                    padding: '18px 40px',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(40, 167, 69, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    🚀 Register Now
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
                
                {/* Commented out Download Syllabus button
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'transparent',
                    color: 'white',
                    padding: '18px 40px',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '50px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  📅 Download Syllabus
                </motion.button>
                */}
              </div>
            </motion.div>

            {/* Right Content - Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <motion.div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '24px',
                  padding: '40px',
                  textAlign: 'center',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  width: '100%',
                  maxWidth: '400px'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4)' }}
              >
                <motion.div
                  style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    fontSize: '40px',
                    color: '#1a1f36',
                    boxShadow: '0 15px 30px rgba(255, 215, 0, 0.4)'
                  }}
                  animate={{ rotateY: isHovered ? 3600 : 0 }}
                  transition={{ duration: 0.3, ease: "linear", repeat: isHovered ? Infinity : 0 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                >
                  🛡️
                </motion.div>
                
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  Program Highlights
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { number: stats.students, label: 'Security Professionals', icon: '👥' },
                    { number: `${(stats.jobs / 1000000).toFixed(1)}M`, label: 'Open Jobs', icon: '🎯' },
                    { number: `${stats.salary}%`, label: 'Avg Salary Hike', icon: '📈' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: '700',
                          color: '#ffd700',
                          lineHeight: '1'
                        }}>
                          {stat.number}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Can I Become Section */}
      <section style={{ 
        padding: '100px 0', 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              What Can I Become?
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#666', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Unlock diverse career opportunities in Cyber Security and Ethical Hacking
            </p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              {
                title: 'Ethical Hacker',
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Test systems for vulnerabilities, perform penetration testing, and help organizations strengthen security',
                skills: ['Penetration Testing', 'Network Security', 'Vulnerability Assessment', 'Ethical Hacking']
              },
              {
                title: 'Cybersecurity Analyst',
                image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Monitor security systems, analyze threats, and protect digital assets from cyber attacks',
                skills: ['Security Monitoring', 'Threat Analysis', 'Incident Response', 'SIEM Tools']
              },
              {
                title: 'Security Consultant',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Advise organizations on security strategies, implement security solutions, and ensure compliance',
                skills: ['Security Strategy', 'Risk Assessment', 'Compliance', 'Security Architecture']
              },
              {
                title: 'Network Security Engineer',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Design secure networks, implement firewalls, and protect network infrastructure',
                skills: ['Network Security', 'Firewalls', 'VPN', 'Network Architecture']
              },
              {
                title: 'Incident Response Analyst',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Respond to security incidents, investigate breaches, and develop incident response plans',
                skills: ['Incident Response', 'Digital Forensics', 'Malware Analysis', 'Crisis Management']
              },
              {
                title: 'Security Architect',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Design comprehensive security solutions, create security frameworks, and lead security initiatives',
                skills: ['Security Architecture', 'Enterprise Security', 'Zero Trust', 'Security Frameworks']
              },
              {
                title: 'Malware Analyst',
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Analyze malicious software, develop detection methods, and create malware removal tools',
                skills: ['Malware Analysis', 'Reverse Engineering', 'Threat Intelligence', 'Security Research']
              },
              {
                title: 'Penetration Tester',
                image: 'https://images.unsplash.com/photo-1603726838562-91d1b4d53d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Simulate cyber attacks, test system defenses, and identify security weaknesses',
                skills: ['Penetration Testing', 'Security Auditing', 'Vulnerability Testing', 'Security Tools']
              }
            ].slice(0, 6).map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  transform: 'translateY(-10px)', 
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)' 
                }}
              >
                {/* Career Image */}
                <div style={{
                  height: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#f8f9fa'
                }}>
                  <img 
                    src={career.image} 
                    alt={career.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    onLoad={(e) => {
                      e.target.nextSibling.style.display = 'none';
                    }}
                  />
                  {/* Fallback placeholder if image fails to load */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: career.title.includes('Ethical Hacker') ? '#e74c3c' : 
                                       career.title.includes('Cybersecurity Analyst') ? '#dc2626' :
                                       career.title.includes('Security Consultant') ? '#059669' :
                                       career.title.includes('Network Security Engineer') ? '#0891b2' :
                                       career.title.includes('Incident Response Analyst') ? '#7c3aed' :
                                       career.title.includes('Security Architect') ? '#2563eb' :
                                       career.title.includes('Malware Analyst') ? '#991b1b' :
                                       career.title.includes('Penetration Tester') ? '#be123c' : '#e74c3c',
                    color: 'white',
                    fontSize: '48px'
                  }}>
                    {career.title.includes('Ethical Hacker') ? '🕵️' :
                     career.title.includes('Cybersecurity Analyst') ? '🛡️' :
                     career.title.includes('Security Consultant') ? '👔' :
                     career.title.includes('Network Security Engineer') ? '🌐' :
                     career.title.includes('Incident Response Analyst') ? '🚨' :
                     career.title.includes('Security Architect') ? '🏗️' :
                     career.title.includes('Malware Analyst') ? '🦠' :
                     career.title.includes('Penetration Tester') ? '🔓' : '🔒'}
                  </div>
                </div>

                {/* Career Content */}
                <div style={{ padding: '30px' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '15px',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    {career.title}
                    <span style={{
                      fontSize: '0.8rem',
                      background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                      color: '#1a1f36',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontWeight: '600'
                    }}>
                      HIGH DEMAND
                    </span>
                  </h3>
                  
                  <p style={{
                    fontSize: '1rem',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {career.description}
                  </p>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#667eea',
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Key Skills
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {career.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} style={{
                          background: 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          padding: '6px 12px',
                          borderRadius: '15px',
                          fontSize: '0.85rem',
                          fontWeight: '500'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const added = addToCart(programData);
                      if (added) {
                        // Show success notification without redirecting
                        const notification = document.createElement('div');
                        notification.style.cssText = `
                          position: fixed;
                          top: 20px;
                          right: 20px;
                          background: linear-gradient(135deg, #28a745, #20c997);
                          color: white;
                          padding: 15px 25px;
                          border-radius: 10px;
                          box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
                          z-index: 10000;
                          font-weight: 600;
                          animation: slideIn 0.3s ease;
                        `;
                        notification.innerHTML = '✓ Course added to cart!';
                        document.body.appendChild(notification);
                        
                        setTimeout(() => {
                          notification.style.animation = 'slideOut 0.3s ease';
                          setTimeout(() => {
                            document.body.removeChild(notification);
                          }, 300);
                        }, 3000);
                      }
                    }}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 24px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Register to Know More →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Why Choose Sky States?
          </h2>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666',
            marginBottom: '50px'
          }}>
            <p style={{ marginBottom: '20px' }}>
              At SKY STATES, we equip you with the essential skills for a successful cybersecurity career through our 
              expertly crafted online learning program. Our flexible curriculum is designed with a blend of engaging 
              articles, instructional videos, and hands-on labs, all vetted by industry professionals to ensure you're 
              learning the latest in cybersecurity.
            </p>
            <p>
              Our support goes beyond coursework. You'll benefit from 1:1 mentorship with experienced industry mentors 
              and access to a diverse network of career coaches and student advisors. In just 6 months, you'll be 
              prepared to thrive in the cybersecurity field—and best of all, we'll assist you in landing your dream job.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div className="feature-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-clock"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Learn Online, Flexibly, and Fast
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Learn on your own schedule in just six months.
              </p>
            </div>

            <div className="feature-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Gain Real-World Cybersecurity Skills
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Test with a curriculum designed by cybersecurity experts.
              </p>
            </div>

            <div className="feature-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-user-tie"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Guidance from an Industry Mentor
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Meet regularly one-on-one with your cybersecurity expert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Cyber Security */}
      <section className="what-is-cybersecurity" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            What is Cyber Security?
          </h2>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666'
          }}>
            <p style={{ marginBottom: '20px' }}>
              Cybersecurity is the practice of protecting computers, servers, networks, and data from unauthorized access, 
              theft, and damage. It involves a range of strategies, technologies, and processes designed to safeguard 
              sensitive information and prevent cyber threats like hacking, malware, and phishing attacks.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Cybersecurity is essential for individuals, businesses, and governments to ensure the privacy and integrity 
              of digital information in our increasingly connected world.
            </p>
            <div style={{
              background: '#e3f2fd',
              padding: '20px',
              borderRadius: '10px',
              borderLeft: '4px solid #e74c3c'
            }}>
              <p style={{ margin: 0, fontWeight: '600', color: '#e74c3c' }}>
                Cybersecurity is one of the most in-demand fields. According to the Bureau of Labor Statistics (BLS), 
                cybersecurity roles are expected to increase by 33% by 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities - COMMENTED OUT */}
      {/* <section className="career-opportunities" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Career Opportunities in Cybersecurity
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div className="career-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
                Information Security Analyst
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
                Monitor organization's networks for security breaches, investigate incidents, and maintain systems 
                to protect sensitive information.
              </p>
            </div>

            <div className="career-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-network-wired"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
                Network Engineer
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
                Install new IT equipment and software while ensuring business operations and network remain 
                efficient and safe from cyber threats.
              </p>
            </div>

            <div className="career-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-user-shield"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
                Cybersecurity Analyst
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
                Proactively defend against online threats by investigating IT trends and suspicious activity, 
                and develop backup plans for security breaches.
              </p>
            </div>

            <div className="career-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-search"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
                Cybersecurity Specialist
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
                Focus on discovering weaknesses in software systems and networks and take preventive measures 
                to protect against malware, viruses, and hackers.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Program Overview */}
      <section className="program-overview" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Cyber Security Program Overview
          </h2>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666'
          }}>
            <p style={{ marginBottom: '20px' }}>
              Our comprehensive curriculum covers essential tools and advanced topics like Network Security, 
              Cryptography, and Ethical Hacking. With the rising demand for cybersecurity professionals, 
              our course is designed to give you a competitive edge.
            </p>
            <p>
              In today's digital age, cybersecurity is more critical than ever. With the increasing frequency 
              of cyber threats, there is a high demand for skilled professionals who can safeguard organizations 
              against potential breaches. Our program is meticulously crafted to provide you with the essential 
              skills and knowledge to excel in this dynamic field.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Interactive Key Features Section */}
      <ProgramFeatures 
        programName="Cyber Security and Ethical Hacking"
        programData={programData}
        title="Program Excellence"
        subtitle="Discover What Makes Our Cybersecurity Program Stand Out"
        backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        showCTA={true}
      />

      {/* Cyber Security Certification Advantage */}
      <section className="certification-advantage" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Cyber Security Certification Advantage
          </h2>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666',
            marginBottom: '60px'
          }}>
            <p>
              Get certified in Cyber Security and Ethical Hacking with our comprehensive training program. Earn industry-recognized credentials in Cyber Security and Ethical Hacking to boost your career in the high-demand field of cybersecurity. Gain exclusive access to expert-led masterclasses and personalized career support to fast-track your professional journey.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            <div className="certification-card" style={{
              background: 'white',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                margin: '0 auto 25px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src="https://skystates.us/wp-content/uploads/2025/10/Cyber-Security-And-Ethical-Hacking--1024x724.jpg"
                  alt="Cyber Security Certificate"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '10px'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#333'
              }}>
                Earn Your Cyber Security Certificate
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left'
              }}>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#e74c3c', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Industry-recognized certificate by Sky States
                  </span>
                </li>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#e74c3c', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Dedicated live sessions by faculty of industry experts
                  </span>
                </li>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#e74c3c', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Lifetime access to self-paced learning content
                  </span>
                </li>
              </ul>
            </div>

            <div className="microsoft-advantage-card" style={{
              background: 'white',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                margin: '0 auto 25px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src="https://skystates.us/wp-content/uploads/2025/12/cyber-1024x724.png"
                  alt="Microsoft Certificate"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '10px'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#333'
              }}>
                Get Ahead With Microsoft Advantage
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left'
              }}>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#e74c3c', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Content and certificate by Microsoft
                  </span>
                </li>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#e74c3c', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Professional-level training from Microsoft
                  </span>
                </li>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#e74c3c', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    LinkedIn profile Shareable certificate
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cyber Security Certification Program Learning Path */}
      <section className="learning-path" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Cyber Security Certification Program Learning Path
          </h2>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666',
            marginBottom: '60px'
          }}>
            <p>
              Boost your career with our leading Cyber Security Program. Master essential skills and demonstrate your expertise through our carefully designed learning path.
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '50px',
            borderRadius: '20px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '40px',
              color: '#333'
            }}>
              Advanced Program in Cyber Security Course Curriculum
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
              {[
                {
                  title: 'Module 1: Introduction to Cyber Security and Ethical Hacking',
                  details: [
                    'Basics of Cyber Security and Threat Landscape',
                    'Ethical Hacking Concepts and Types of Hackers',
                    'Phases of Ethical Hacking',
                    'Security and Risk Management'
                  ]
                },
                {
                  title: 'Module 2: Networking Fundamentals for Cyber Security',
                  details: [
                    'OSI and TCP/IP Models',
                    'IP Addressing and Subnetting',
                    'Networking Protocols (HTTP, DNS, FTP, etc.)',
                    'Firewalls and IDS/IPS Basics',
                    'Packet Analysis with Wireshark',
                    'Networking and Devices',
                    'Proxy and Vpn'
                  ]
                },
                {
                  title: 'Module 3: Linux Fundamentals',
                  details: [
                    'Basics of Linux Operating System',
                    'Setting Up the Lab Environment',
                    'Linux File System and Directory Structure',
                    'Common Linux Commands for Cybersecurity Tasks',
                    'Managing Users, Permissions, and Processes',
                    'Shell Scripting Basics'
                  ]
                },
                {
                  title: 'Module 4: Reconnaissance and Footprinting',
                  details: [
                    'Active and Passive Reconnaissance',
                    'Information Gathering Tools',
                    'Network Scanning with Nmap networking and devices',
                    'Identifying Open Ports and Services',
                    'Osint'
                  ]
                },
                {
                  title: 'Module 5: Vulnerability Analysis',
                  details: [
                    'Vulnerability Assessment Methodologies',
                    'Tools for Vulnerability Scanning (Nessus, zap)',
                    'Identifying CVEs and Exploits',
                    'Analyzing Vulnerability Reports'
                  ]
                },
                {
                  title: 'Module 6: System Hacking',
                  details: [
                    'Password Cracking Techniques',
                    'Privilege Escalation on Windows and Linux',
                    'Backdoors and Trojans',
                    'Anti-Forensics Techniques'
                  ]
                },
                {
                  title: 'Module 7: Web Application Security',
                  details: [
                    'OWASP Top 10 Vulnerabilities, juice shop and dvwa',
                    'Exploiting SQL Injection',
                    'Cross-Site Scripting (XSS) and CSRF Attacks',
                    'Tools for Web Security Testing (Burp Suite, SQLmap'
                  ]
                },
                {
                  title: 'Module 8: Wireless Network Security',
                  details: [
                    'Wireless Network Standards and Protocols',
                    'Capturing and Cracking Wireless Traffic',
                    'WPA/WPA2 Hacking with Tools',
                    'Securing Wireless Networks'
                  ]
                },
                {
                  title: 'Module 9: Penetration Testing Methodologies',
                  details: [
                    'Penetration Testing Planning and Scoping',
                    'Reporting and Documentation',
                    'Real-World Penetration Testing Simulations'
                  ]
                },
                {
                  title: 'Module 10: Advanced Topics in Cyber Security',
                  details: [
                    'Cloud Security and Common Vulnerabilities',
                    'IoT Security Threats and Countermeasures',
                    'Basics of Threat Hunting and Mitigation'
                  ]
                },
                {
                  title: 'Module 11: Capstone Project',
                  description: 'The capstone project allows learners to apply all the concepts, tools, and techniques learned during course. Students will be tasked with performing an end-to-end penetration test on a simulated environment, including reconnaissance, vulnerability scanning, exploitation, and reporting. This hands-on project helps solidify practical skills and prepares participants for real-world scenarios in cybersecurity.'
                }
              ].map((module, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  padding: '25px',
                  borderRadius: '15px',
                  borderLeft: '4px solid #e74c3c',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderLeftColor = '#c0392b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderLeftColor = '#e74c3c';
                }}
                onClick={() => setActiveModule(activeModule === index ? null : index)}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: activeModule === index ? '15px' : '0'
                  }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#333',
                      margin: 0,
                      lineHeight: '1.3'
                    }}>
                      {module.title}
                    </h4>
                    <span style={{
                      fontSize: '20px',
                      color: '#e74c3c',
                      transition: 'transform 0.3s ease',
                      transform: activeModule === index ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      ▼
                    </span>
                  </div>
                  
                  {activeModule === index && (
                    <div
                      style={{
                        overflow: 'hidden',
                        opacity: 1,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                    {module.details && (
                      <ul style={{ 
                        margin: '15px 0 0 0', 
                        padding: '0 0 0 20px',
                        color: '#666',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        {module.details.map((detail, detailIndex) => (
                          <li key={detailIndex} style={{ marginBottom: '8px' }}>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                    {module.description && (
                      <p style={{
                        margin: '15px 0 0 0',
                        color: '#666',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        {module.description}
                      </p>
                    )}
                  </div>
                  )}
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <a 
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  marginRight: '15px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(231, 76, 60, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className="fas fa-download"></i>
                Download Syllabus
              </a>
              
              <a 
                href="tel:(888) 810-2434"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(40, 167, 69, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className="fas fa-phone"></i>
                Contact Us
              </a>
            </div>
            
            <div style={{
              maxWidth: '600px',
              margin: '60px auto 0',
              background: '#f8f9fa',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '30px',
                color: '#333'
              }}>
                Request more information
              </h3>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <input
                    type="text"
                    placeholder="Name"
                    style={{
                      padding: '15px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#e74c3c';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd';
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone No."
                    style={{
                      padding: '15px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#e74c3c';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd';
                    }}
                  />
                </div>
                
                <input
                  type="email"
                  placeholder="Email"
                  style={{
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#e74c3c';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ddd';
                  }}
                />
                
                <textarea
                  placeholder="Message"
                  rows="4"
                  style={{
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#e74c3c';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ddd';
                  }}
                />
                
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                    color: 'white',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(231, 76, 60, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths Section - Commented Out */}
      {/* <section className="career-paths" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            What Can I Become?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              'Ethical Hacker',
              'Cybersecurity Analyst',
              'Security Consultant',
              'Network Security Engineer',
              'Incident Response Analyst',
              'Security Architect',
              'Malware Analyst',
              'Penetration Tester'
            ].map((career, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 15px',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px'
                }}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0 }}>
                  {career}
                </h4>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              and many more career opportunities...
            </p>
          </div>
        </div>
      </section> */}

      {/* Modern Pricing Section - COMMENTED OUT
        Investment in Your Future section with pricing and payment options
        This entire section has been commented out as requested
      */}
      
      {/* Floating Register Button */}
      <FloatingRegisterButton 
        programName="Cyber Security"
        programPrice="3499.00"
        programType="full_program"
      />
    </div>
  );
};

export default CyberSecurity;
