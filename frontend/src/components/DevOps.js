import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import FloatingRegisterButton from './FloatingRegisterButton';
import BatchCountdownTimer from './BatchCountdownTimer';

const DevOps = () => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    companies: 0,
    salary: 0
  });

  const programData = {
    name: 'DevOps and Cloud Computing Program',
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

    animateCounter(4500, 2000, (val) => setStats(prev => ({ ...prev, students: val })));
    animateCounter(1500, 2200, (val) => setStats(prev => ({ ...prev, companies: val })));
    animateCounter(140, 1800, (val) => setStats(prev => ({ ...prev, salary: val })));
  }, []);

  return (
    <div className="product-page">
      {/* Enhanced Hero Section with Gradient Background */}
      <section className="product-hero" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
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
        }}>☁️</div> */}
        {/* <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          fontSize: '50px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 8s ease-in-out infinite reverse'
        }}>🚀</div> */}
        {/* <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          fontSize: '55px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 7s ease-in-out infinite'
        }}>⚙️</div> */}

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
                  DevOps Cloud Expert
                </span>
              </h1>
              
              <p style={{ 
                fontSize: '1.3rem', 
                color: 'rgba(255, 255, 255, 0.9)', 
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                Master Docker, Kubernetes, AWS & Azure with hands-on projects. 
                <span style={{ color: '#ffd700', fontWeight: '600' }}> Deploy at scale like a pro</span>
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
                }}>🎓 AWS/Azure Certified</span>
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
                          name: 'Registration fee for DevOps and Cloud Computing Program',
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
                  ⚙️
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
                    { number: stats.students, label: 'DevOps Engineers', icon: '👥' },
                    { number: stats.companies, label: 'Hiring Companies', icon: '🏢' },
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
                          color: '#ff9f40',
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
              Unlock diverse career opportunities in DevOps and Cloud Computing
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
                title: 'DevOps Engineer',
                image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Automate deployment pipelines, manage infrastructure, and bridge development and operations',
                skills: ['CI/CD', 'Docker', 'Kubernetes', 'Infrastructure as Code']
              },
              {
                title: 'Cloud Architect',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Design cloud solutions, architect scalable systems, and optimize cloud infrastructure',
                skills: ['Cloud Architecture', 'AWS', 'Azure', 'Scalability Design']
              },
              {
                title: 'Site Reliability Engineer',
                image: 'https://images.unsplash.com/photo-1551434675646-33d7c3b7d73?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Ensure system reliability, monitor performance, and maintain production infrastructure',
                skills: ['SRE', 'Monitoring', 'Incident Management', 'Performance Optimization']
              },
              {
                title: 'Cloud Security Specialist',
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Secure cloud environments, implement cloud security best practices, and protect cloud assets',
                skills: ['Cloud Security', 'IAM', 'Compliance', 'Security Automation']
              },
              {
                title: 'Infrastructure Engineer',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Build and maintain infrastructure, automate system provisioning, and ensure scalability',
                skills: ['Infrastructure', 'Automation', 'System Administration', 'Monitoring']
              },
              {
                title: 'Platform Engineer',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Develop internal platforms, create developer tools, and improve developer experience',
                skills: ['Platform Engineering', 'Developer Tools', 'Internal Platforms', 'DevEx']
              },
              {
                title: 'Release Engineer',
                image: 'https://images.unsplash.com/photo-1603726838562-91d1b4d53d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Manage software releases, coordinate deployments, and ensure smooth delivery pipelines',
                skills: ['Release Management', 'Deployment Automation', 'Version Control', 'Release Coordination']
              },
              {
                title: 'DevOps Consultant',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Advise on DevOps strategies, implement DevOps practices, and transform organizations',
                skills: ['DevOps Strategy', 'Process Improvement', 'Tool Selection', 'Organizational Change']
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
                  backgroundImage: `url(${career.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
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

      {/* Why Join Section */}
      <section className="why-join" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Why Join this Program
          </h2>
          
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
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fab fa-microsoft"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Microsoft Advantage
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Leverage the power of Microsoft tools and technologies. Gain professional-level training, 
                demonstrate your technical expertise, and earn an employer-recognized Azure DevOps certification from Microsoft.
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
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-infinity"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                DevOps Mastery
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Live sessions on cutting-edge DevOps practices, CI/CD pipelines, Kubernetes, cloud infrastructure, 
                and automation tools. Learn how to bridge the gap between development and operations effectively.
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
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Applied Learning
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Our DevOps training program provides live online classes led by industry experts, focusing on 
                real-world scenarios. Hands-on projects and case studies ensure practical learning and job readiness.
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
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-briefcase"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Placement Support
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Receive 100% placement assistance through our dedicated in-house recruitment team. 
                With a network of over 250+ hiring partners, we proudly maintain an 80% successful placement rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="program-overview" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            DevOps Training Program Overview
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
              Ready to launch your career in DevOps? You're in the right place! Our company offers top-notch training 
              in this rapidly growing field through a comprehensive 6-month program designed to turn you into a 
              job-ready DevOps expert.
            </p>
            <p>
              Learn from seasoned professionals, gain hands-on experience with real-world tools, and get fully 
              prepared to meet industry demands. As a bonus, you'll also earn a Microsoft Azure DevOps certification—officially 
              backed by Microsoft—to give you a competitive edge in the job market.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="key-features" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Key Features
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  100% Job assistance
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Through our in-house recruitment agency with over 250 hiring partners
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Industry-recognized certificate
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Advanced DevOps and Cloud Computing certificate from Sky States
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Capstone projects
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  From various domains and industry relevant projects
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Microsoft training
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Professional-level training from Microsoft with Azure DevOps certification
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Integrated labs
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Hands-on learning experience with practical exercises
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Expert faculty
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Dedicated live sessions by faculty of industry experts
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Lifetime access
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Self-paced learning content through our Learning Management System
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Small batch sizes
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Personalized attention and tailored instruction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DevOps Training Program Certification Advantage */}
      <section className="certification-advantage" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            DevOps Training Program Certification Advantage
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
              Get certified in DevOps with the Microsoft Azure program and earn both DevOps and Microsoft Azure certifications to boost your career prospects. Gain exclusive access to expert-led masterclasses and benefit from our in-house career support program to secure your dream role in the DevOps field.
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
              {/* Certificate Image */}
              <div style={{
                marginBottom: '30px'
              }}>
                <img 
                  src="https://skystates.us/wp-content/uploads/2025/10/DevOps-And-Cloud-Computing-1-1024x724.jpg"
                  alt="DevOps Certificate"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#333'
              }}>
                Earn Your DevOps Training Program Certificate
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
                  <i className="fas fa-check-circle" style={{ color: '#ff6b35', marginTop: '3px' }}></i>
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
                  <i className="fas fa-check-circle" style={{ color: '#ff6b35', marginTop: '3px' }}></i>
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
                  <i className="fas fa-check-circle" style={{ color: '#ff6b35', marginTop: '3px' }}></i>
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
              {/* Certificate Image */}
              <div style={{
                marginBottom: '30px'
              }}>
                <img 
                  src="https://skystates.us/wp-content/uploads/2025/12/devops-1024x724.png"
                  alt="DevOps Certificate"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    objectFit: 'cover'
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
                  <i className="fas fa-check-circle" style={{ color: '#ff6b35', marginTop: '3px' }}></i>
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
                  <i className="fas fa-check-circle" style={{ color: '#ff6b35', marginTop: '3px' }}></i>
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
                  <i className="fas fa-check-circle" style={{ color: '#ff6b35', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    LinkedIn profile Shareable certificate
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DevOps Training Program Certification Course Learning Path */}
      <section className="learning-path" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            DevOps Training Program Certification Course Learning Path
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
              Boost your career with our leading DevOps training program. Master essential DevOps skills and showcase your expertise through our expertly crafted learning path.
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
              Advanced Program in DevOps Training Program Curriculum
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
              {[
                {
                  title: 'Module 1: Introduction to DevOps',
                  description: 'Understand the principles and benefits of DevOps, including collaboration between development and operations teams. Learn about the DevOps lifecycle and key tools to enhance software delivery.'
                },
                {
                  title: 'Module 2: Cloud Computing Fundamentals',
                  description: 'Explore the core concepts of cloud computing, such as virtualization, scalability, and elasticity. Learn about cloud service models (IaaS, PaaS, SaaS) and deployment models (public, private, hybrid).'
                },
                {
                  title: 'Module 3: Version Control Systems',
                  description: 'Master Git and other version control systems to track changes in source code. Learn branching, merging, and collaboration techniques to streamline team workflows.'
                },
                {
                  title: 'Module 4: Continuous Integration and Delivery',
                  description: 'Dive into CI/CD pipelines to automate code integration, testing, and deployment. Learn tools like Jenkins, GitHub Actions, and Azure DevOps to build robust CI/CD workflows.'
                },
                {
                  title: 'Module 5: Containerization with Docker',
                  description: 'Learn to create, deploy, and manage containers using Docker. Understand containerization concepts, including images, containers, volumes, and networking.'
                },
                {
                  title: 'Module 6: Orchestration with Kubernetes',
                  description: 'Explore Kubernetes for automating deployment, scaling, and managing containerized applications. Learn about pods, services, deployments, and monitoring clusters.'
                },
                {
                  title: 'Module 7: Infrastructure as Code (IaC)',
                  description: 'Discover tools like Terraform and CloudFormation to define and provision infrastructure programmatically. Learn best practices for managing infrastructure in a cloud environment.'
                },
                {
                  title: 'Module 8: Cloud Platforms Overview',
                  description: 'Gain hands-on experience with leading cloud platforms like AWS, Azure, and Google Cloud. Learn core services such as compute, storage, and networking.'
                },
                {
                  title: 'Module 9: Monitoring and Logging',
                  description: 'Understand the importance of monitoring and logging in maintaining system health. Explore tools like Prometheus, Grafana, and ELK Stack to analyze system performance.'
                },
                {
                  title: 'Module 10: Security in DevOps',
                  description: 'Integrate security into the DevOps process with DevSecOps practices. Learn about securing CI/CD pipelines, monitoring vulnerabilities, and implementing access controls.'
                },
                {
                  title: 'Module 11: Hybrid and Multi-Cloud Environments',
                  description: 'Learn strategies for managing applications across hybrid and multi-cloud setups. Explore tools and frameworks for seamless integration between cloud providers.'
                },
                {
                  title: 'Module 12: Domain Wise Capstone Project',
                  description: 'Apply the knowledge gained throughout the course to complete a real-world project. Design and implement a CI/CD pipeline, containerized application, and monitoring solution in a cloud environment.'
                }
              ].map((module, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  padding: '25px',
                  borderRadius: '15px',
                  borderLeft: '4px solid #ff6b35',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderLeftColor = '#f7931e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderLeftColor = '#ff6b35';
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
                      color: '#ff6b35',
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
                    <p style={{
                      margin: 0,
                      color: '#666',
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}>
                      {module.description}
                    </p>
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
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
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
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className="fas fa-download"></i>
                Download Syllabus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Stats Section - Commented Out */}
      {/* <section className="industry-stats" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Join the Thriving DevOps Industry
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
              DevOps and Cloud Computing roles are in high demand, as organizations increasingly adopt these technologies 
              to enhance scalability, automate workflows, and improve deployment speed. The global DevOps market is projected 
              to grow from USD 10.4 billion in 2024 to USD 25.3 billion by 2029, reflecting a robust 19.7% CAGR.
            </p>
            <p>
              Simultaneously, the cloud computing market is set to surge from USD 626.4 billion in 2024 to over USD 1.5 trillion 
              by 2029, with a CAGR of 19.3%. These trends underscore the rapid expansion and immense career potential in this dynamic field.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#ff6b35', marginBottom: '10px' }}>
                $25.3B
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                DevOps Market by 2029
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                From $10.4B in 2024
              </p>
            </div>

            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#ff6b35', marginBottom: '10px' }}>
                $1.5T
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Cloud Market by 2029
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                From $626.4B in 2024
              </p>
            </div>

            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#ff6b35', marginBottom: '10px' }}>
                19.7%
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                DevOps CAGR
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Compound annual growth rate
              </p>
            </div>

            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#ff6b35', marginBottom: '10px' }}>
                $185K
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Senior Level Salary
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                $185K/yr – $263K/yr
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Career Paths Section - Commented Out */}
      {/* <section className="career-paths" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            What Can I Become?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              'DevOps Engineer',
              'Site Reliability Engineer',
              'Cloud Engineer',
              'Automation Engineer',
              'Continuous Integration Engineer',
              'Infrastructure Engineer',
              'Kubernetes Expert',
              'DevOps Architect'
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
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px'
                }}>
                  <i className="fas fa-cloud"></i>
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
        programName="DevOps & Cloud"
        programPrice="3999.00"
        programType="full_program"
      />
    </div>
  );
};

export default DevOps;
