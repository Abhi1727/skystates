import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DataScienceAI = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [stats, setStats] = useState({
    students: 0,
    placement: 0,
    salary: 0
  });

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

        {/* Floating elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '60px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 6s ease-in-out infinite'
        }}>📊</div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          fontSize: '50px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 8s ease-in-out infinite reverse'
        }}>🤖</div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          fontSize: '55px',
          opacity: 0.3,
          zIndex: 2,
          animation: 'float 7s ease-in-out infinite'
        }}>🧠</div>

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

              {/* Trust Indicators */}
              <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '40px',
                flexWrap: 'wrap'
              }}>
                {[
                  { icon: '🎓', text: 'Microsoft Certified' },
                  { icon: '💼', text: '100% Job Guarantee' },
                  { icon: '⏰', text: '6 Months Program' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
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
                    whileHover={{ scale: 1.05 }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.9rem', color: 'white' }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(255, 215, 0, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
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
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Transform raw data into actionable insights, create reports, and support business strategy',
                skills: ['SQL', 'Excel', 'Tableau', 'Business Intelligence']
              },
              {
                title: 'Business Intelligence Analyst',
                image: 'https://images.unsplash.com/photo-1551434675646-33d7c3b7d73?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
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
                    6,499
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
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
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
              <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Industry-recognized certificate
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Advanced Data Scientist and AI certificate from Sky States
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
              <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Microsoft training
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Professional-level training from Microsoft with Azure certification
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
              <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '20px', marginTop: '2px' }}></i>
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

      {/* Industry Stats */}
      <section className="industry-stats" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Join the Data Science Industry
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
      </section>

      {/* Career Paths */}
      <section className="career-paths" style={{ padding: '80px 0', background: '#f8f9fa' }}>
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
      </section>

      {/* Pricing Section */}
      <section className="pricing" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#333', marginBottom: '20px' }}>
              $2,999
            </h2>
            <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
              inc. Taxes
            </p>
            
            <ul style={{ textAlign: 'left', marginBottom: '30px', color: '#666' }}>
              <li style={{ marginBottom: '10px' }}>Book your seats for this Program for just $99</li>
              <li>Join along with your friends & get special discounts</li>
            </ul>
            
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#007bff', marginBottom: '10px' }}>
                  $99
                </h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>
                  Registration Fee
                </p>
                <button 
                  onClick={() => {
                    // Redirect to checkout with registration data
                    navigate('/checkout', { 
                      state: { 
                        program: {
                          name: 'Registration fee for Data Science and AI Short Term Program',
                          price: '99.00',
                          duration: '4 Months',
                          type: 'registration'
                        }
                      } 
                    });
                  }}
                  style={{
                    background: '#007bff',
                    color: 'white',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}>
                  Register Now
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              {/* <button style={{
                background: '#28a745',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}>
                <i className="fas fa-download" style={{ marginRight: '8px' }}></i>
                Download Brochure
              </button> */}
              {/* <button style={{
                background: '#007bff',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}>
                <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
                Talk to Advisor
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataScienceAI;
