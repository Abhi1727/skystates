import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import LogoCarousel from './LogoCarousel';
import FloatingRegisterButton from './FloatingRegisterButton';
import ProgramFeatures from './ProgramFeatures';
import BatchCountdownTimer from './BatchCountdownTimer';

const DataScienceAI = () => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    placement: 0,
    salary: 0
  });

  const programData = {
    name: 'Data Science and AI Program',
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

    animateCounter(5000, 2000, (val) => setStats(prev => ({ ...prev, students: val })));
    animateCounter(95, 1500, (val) => setStats(prev => ({ ...prev, placement: val })));
    animateCounter(150, 1800, (val) => setStats(prev => ({ ...prev, salary: val })));
  }, []);

  return (
    <div className="product-page">
      {/* Enhanced Hero Section with Gradient Background */}
      <section className="product-hero" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
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
        }}>📊</div> */}
        {/* <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          fontSize: '50px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 8s ease-in-out infinite reverse'
        }}>🤖</div> */}
        {/* <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          fontSize: '55px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 7s ease-in-out infinite'
        }}>🧠</div> */}

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
                  Data Science Expert
                </span>
              </h1>
              
              <p style={{ 
                fontSize: '1.3rem', 
                color: 'rgba(255, 255, 255, 0.9)', 
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                Master Python, Machine Learning & AI with Microsoft Azure certification. 
                <span style={{ color: '#ffd700', fontWeight: '600' }}> Zero to job-ready in 6 months</span>
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
                }}>🎓 Microsoft Certified</span>
                <span style={{ 
                  fontSize: '1.1rem', 
                  color: '#ffffff',
                  fontWeight: '600',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}>💼 100% Job Guarantee</span>
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
                          name: 'Registration fee for Data Science and AI Program',
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
                  📊
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
                    { number: stats.students, label: 'Students Enrolled', icon: '👥' },
                    { number: `${stats.placement}%`, label: 'Placement Rate', icon: '🎯' },
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
              Unlock diverse career opportunities in Data Science and Artificial Intelligence
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
                title: 'Data Scientist',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Analyze complex data, build ML models, and drive business decisions through data insights',
                skills: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization']
              },
              {
                title: 'AI Engineer',
                image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Design and implement AI systems, develop neural networks, and create intelligent solutions',
                skills: ['Deep Learning', 'TensorFlow', 'NLP', 'Computer Vision']
              },
              {
                title: 'ML Engineer',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Deploy ML models at scale, optimize algorithms, and build production-ready AI systems',
                skills: ['MLOps', 'Kubernetes', 'AWS SageMaker', 'Model Deployment']
              },
              {
                title: 'Data Analyst',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Transform raw data into actionable insights, create reports, and support business strategy',
                skills: ['SQL', 'Excel', 'Tableau', 'Business Intelligence']
              },
              {
                title: 'Business Intelligence Analyst',
                image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Develop BI solutions, create dashboards, and help organizations make data-driven decisions',
                skills: ['Power BI', 'Data Warehousing', 'Analytics', 'Reporting']
              },
              {
                title: 'Research Scientist',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Conduct advanced research, develop new algorithms, and push the boundaries of AI',
                skills: ['Research', 'Algorithms', 'Academic Writing', 'Innovation']
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
                    backgroundColor: career.title.includes('Data Scientist') ? '#28a745' : 
                                       career.title.includes('AI Engineer') ? '#007bff' :
                                       career.title.includes('ML Engineer') ? '#6f42c1' :
                                       career.title.includes('Data Analyst') ? '#17a2b8' :
                                       career.title.includes('Business Intelligence') ? '#f59e0b' :
                                       career.title.includes('Research Scientist') ? '#8b5cf6' : '#667eea',
                    color: 'white',
                    fontSize: '48px'
                  }}>
                    {career.title.includes('Data Scientist') ? '�' :
                     career.title.includes('AI Engineer') ? '🤖' :
                     career.title.includes('ML Engineer') ? '⚙️' :
                     career.title.includes('Data Analyst') ? '�📊' :
                     career.title.includes('Business Intelligence') ? '📈' :
                     career.title.includes('Research Scientist') ? '🔭' : '💼'}
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                Receive professional-level training from Microsoft, Demonstrate your technical proficiency, 
                Earn an employer-recognized Azure certificate from Microsoft
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-brain"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Generative AI Edge
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Live sessions on the latest AI trends, Generative AI tools, prompt engineering, and more
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                Our data science course offers live online classes by industry experts, focusing on applied learning. 
                Capstone projects ensure students gain practical skills and are job-ready.
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                Get 100% placement assistance through our in-house recruitment agency. With over 250+ hiring partners, 
                we have an impressive successful placement rate of 80%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="program-overview" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Data Science Program Overview
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
              Are you looking to embark on an exciting career in Data Science and Artificial Intelligence (AI)? 
              Look no further! Our company is dedicated to providing top-notch training in these cutting edge fields, 
              and we offer a comprehensive 6-month course designed to transform you into a skilled data scientist or AI expert.
            </p>
            <p>
              With our experienced trainers and a commitment to high-quality content delivery, we're your ultimate partner 
              in achieving your career goals. Plus, our course includes the added advantage of Microsoft Azure certification, 
              powered by Microsoft, ensuring you gain industry-recognized credentials that will set you apart in the job market.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Interactive Key Features Section */}
      <ProgramFeatures 
        programName="Data Science and AI"
        programData={programData}
        title="Program Excellence"
        subtitle="Discover What Makes Our Data Science & AI Program Stand Out"
        backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        showCTA={true}
      />

      {/* Data Science + AI Certification Advantage */}
      <section className="certification-advantage" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Data Science + AI Certification Advantage
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
              Get certified in data science & AI with Microsoft Azure program and receive both Data Science +AI and Microsoft Azure certificates to enhance your career prospects. Gain exclusive access to expert-led masterclasses and our in-house career support program.
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
                  src="https://skystates.us/wp-content/uploads/2025/10/Data-Science-ANd-AI-Program-2-1024x724.jpg"
                  alt="Data Science + AI Certificate"
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
                Earn Your Data Science and AI Certificate
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
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    Industry-recognized certificate by SKY States
                  </span>
                </li>
                <li style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
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
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
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
                  src="https://skystates.us/wp-content/uploads/2025/12/SAMPLE.png"
                  alt="Microsoft Azure Certificate"
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
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
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
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
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
                  <i className="fas fa-check-circle" style={{ color: '#28a745', marginTop: '3px' }}></i>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    LinkedIn profile Shareable certificate
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Data Science and AI Certification Program Learning Path */}
      <section className="learning-path" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Data Science and AI Certification Program Learning Path
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
              Boost your career with our leading data science and AI program. Master essential skills and demonstrate your expertise through our carefully designed learning path.
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
              Advanced Program in Data Science Program Curriculum
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
              {[
                {
                  title: 'Module 1: Python Programming',
                  description: 'Learn fundamentals of Python, a versatile and powerful programming language. This module covers essential concepts like syntax, data types, control structures, and functions, laying foundation for data science and software development.'
                },
                {
                  title: 'Module 2: Libraries of Python Programming with EDA',
                  description: 'Dive into essential Python libraries like NumPy, Pandas, and Matplotlib. Learn to perform Exploratory Data Analysis (EDA) to uncover insights, visualize trends, and prepare datasets for advanced analytics and modeling.'
                },
                {
                  title: 'Module 3: Mathematics for Data Science',
                  description: 'Master statistical concepts like probability, hypothesis testing, and regression analysis. Learn to interpret data trends, make data-driven decisions, and build a strong foundation for machine learning models.'
                },
                {
                  title: 'Module 4: Machine Learning- Supervised',
                  description: 'Learn fundamentals of supervised learning, where models are trained on labeled data to predict outcomes. Explore key algorithms like linear regression, decision trees, and support vector machines for real-world problem-solving.'
                },
                {
                  title: 'Module 5: Machine Learning- Unsupervised',
                  description: 'Dive into unsupervised learning, where models analyze unlabeled data to uncover hidden patterns. Explore clustering, association, and dimensionality reduction techniques like k-means and PCA for data exploration and insights.'
                },
                {
                  title: 'Module 6: Deep Learning and AI',
                  description: 'Explore foundations of deep learning and artificial intelligence, focusing on neural networks, model training, and optimization techniques. Learn how AI models power innovations in image recognition, NLP, and more.'
                },
                {
                  title: 'Module 7: MySQL',
                  description: 'Gain proficiency in MySQL, a powerful relational database management system. Learn how to create, manage, and query databases using SQL to store and retrieve data efficiently.'
                },
                {
                  title: 'Module 8: Tableau',
                  description: 'Master Tableau for data visualization, enabling you to create interactive and insightful dashboards. Learn how to connect data, apply filters, and generate compelling visual reports for informed decision-making.'
                },
                {
                  title: 'Module 9: Power BI and Google Data Studio',
                  description: 'Explore Power BI and Google Data Studio for powerful data visualization and reporting. Learn to transform raw data into interactive dashboards and reports, empowering data-driven insights and decision-making.'
                },
                {
                  title: 'Module- 10: Data Engineering Tools',
                  description: 'Master essential data engineering tools to manage, process, and transform large datasets. Learn to work with technologies like Apache Hadoop, Spark, and Kafka for efficient data pipeline creation and optimization.'
                },
                {
                  title: 'Module- 11: NLP with MLOPS',
                  description: 'Explore Natural Language Processing (NLP) techniques to analyze and process textual data. Learn to integrate NLP models into production environments using MLOps practices for scalable and efficient machine learning workflows.'
                },
                {
                  title: 'Module- 12: AI Strategy',
                  description: 'Learn how to design and implement effective AI strategies for business growth. This module covers key AI technologies, their applications, and how to align AI initiatives with organizational goals for maximum impact.'
                },
                {
                  title: 'Module- 13: Domain Wise Capstone Projects',
                  description: 'The Capstone Project module enables learners to apply their knowledge to real-world problems by working on domain-specific datasets. Participants will gain hands-on experience in data preprocessing, exploratory data analysis, predictive modeling, and result interpretation. This module fosters problem-solving skills and prepares learners for industry challenges while allowing them to showcase their expertise through a comprehensive project.'
                }
              ].map((module, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  padding: '25px',
                  borderRadius: '15px',
                  borderLeft: '4px solid #667eea',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderLeftColor = '#764ba2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderLeftColor = '#667eea';
                }}
                onClick={() => {
                  console.log('Clicked module index:', index, 'Current activeModule:', activeModule);
                  setActiveModule(activeModule === index ? null : index);
                }}>
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
                      color: '#667eea',
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
                      margin: '15px 0 0 0',
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
                href="https://skystates.us/wp-content/uploads/2025/12/Data-Science-And-AI-BROUCHURE-sky-states-.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
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

      {/* Logo Carousel Section */}
      <LogoCarousel />

      {/* Industry Stats Section - Commented Out */}
      {/* <section className="industry-stats" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Join Data Science Industry
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#007bff', marginBottom: '10px' }}>
                36%
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Projected Growth
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Data Science jobs growth this decade
              </p>
            </div>

            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#007bff', marginBottom: '10px' }}>
                $29.89B
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Market Size by 2029
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Data science platform market surge
              </p>
            </div>

            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#007bff', marginBottom: '10px' }}>
                23.5%
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                CAGR
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
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#007bff', marginBottom: '10px' }}>
                $125K
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Average Salary
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Annual salary for Data Scientists
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
              'Data Scientist',
              'Data Analyst',
              'Business Analyst',
              'Analytics Manager',
              'AI Research Scientist',
              'AI Data Scientist',
              'Data Science Consultant',
              'ML Engineer'
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
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px'
                }}>
                  <i className="fas fa-user-tie"></i>
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
        programName="Data Science & AI"
        programPrice="2999.00"
        programType="full_program"
      />
    </div>
  );
};

export default DataScienceAI;
