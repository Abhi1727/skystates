import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HomepageTheme.css';

const About = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Counter animation for statistics
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!mounted) return;
      
      let startTime = null;
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [end, duration, mounted]);
    
    return count;
  };

  // Create counters for each statistic at the top level
  const studentCount = useCounter(5000);
  const placementRate = useCounter(95);
  const facultyCount = useCounter(50);
  const partnerCount = useCounter(100);
  const courseCount = useCounter(20);
  const salaryHike = useCounter(150);

  // Statistics data
  const statistics = [
    { number: 5000, suffix: '+', label: 'Students Enrolled', description: 'Transforming careers globally' },
    { number: 95, suffix: '%', label: 'Placement Rate', description: 'Industry-leading success' },
    { number: 50, suffix: '+', label: 'Expert Faculty', description: 'Real-world experience' },
    { number: 100, suffix: '+', label: 'Hiring Partners', description: 'Top companies hiring' },
    { number: 20, suffix: '+', label: 'Premium Courses', description: 'Cutting-edge curriculum' },
    { number: 150, suffix: '%', label: 'Avg Salary Hike', description: 'Career acceleration' }
  ];

  // Map statistics to their counter values
  const statisticsWithCounters = statistics.map((stat, index) => {
    let counter;
    switch (index) {
      case 0: counter = studentCount; break;
      case 1: counter = placementRate; break;
      case 2: counter = facultyCount; break;
      case 3: counter = partnerCount; break;
      case 4: counter = courseCount; break;
      case 5: counter = salaryHike; break;
      default: counter = 0;
    }
    return { ...stat, counter };
  });

  // Core values
  const coreValues = [
    {
      title: 'Excellence in Education',
      description: 'We deliver industry-relevant curriculum designed by experts from top tech companies.',
      icon: 'fa-graduation-cap',
      color: '#3b82f6'
    },
    {
      title: 'Diversity & Inclusion',
      description: 'We believe in creating opportunities for talented individuals from all backgrounds.',
      icon: 'fa-users',
      color: '#60a5fa'
    },
    {
      title: 'Career Acceleration',
      description: 'Our programs are designed to fast-track your career with practical skills and placement support.',
      icon: 'fa-rocket',
      color: '#2563eb'
    },
    {
      title: 'Innovation First',
      description: 'We stay ahead of industry trends to ensure our students learn the most in-demand technologies.',
      icon: 'fa-lightbulb',
      color: '#1e40af'
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: 'Shefali',
      role: 'Chief Technical Officer',
      bio: 'Leading the technical vision and curriculum development at Sky States with over 10 years of experience in data science and AI.',
      expertise: ['Data Science', 'Machine Learning', 'Cloud Architecture', 'Technical Leadership'],
      image: 'https://via.placeholder.com/300x300/3b82f6/ffffff?text=Shefali'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Data Scientist at Google',
      content: 'Sky States transformed my career. The hands-on projects and expert mentorship helped me land my dream job.',
      rating: 5,
      image: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Cybersecurity Analyst at Microsoft',
      content: 'The comprehensive curriculum and placement support at Sky States exceeded my expectations.',
      rating: 5,
      image: 'https://via.placeholder.com/60x60/60a5fa/ffffff?text=MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'DevOps Engineer at Amazon',
      content: 'From zero to cloud expert in 6 months! Sky States gave me the skills and confidence to succeed.',
      rating: 5,
      image: 'https://via.placeholder.com/60x60/2563eb/ffffff?text=ER'
    },
    {
      name: 'David Kim',
      role: 'AI Engineer at Tesla',
      content: 'The industry connections and practical projects made all the difference in my job search.',
      rating: 5,
      image: 'https://via.placeholder.com/60x60/1e40af/ffffff?text=DK'
    }
  ];

  // Program highlights
  const programHighlights = [
    {
      title: 'Data Science & AI Program',
      duration: '6 Months',
      level: 'Advanced',
      students: '2000+',
      placement: '96%',
      color: '#3b82f6'
    },
    {
      title: 'Cybersecurity Program',
      duration: '5 Months',
      level: 'Intermediate',
      students: '1500+',
      placement: '94%',
      color: '#60a5fa'
    },
    {
      title: 'DevOps & Cloud Computing',
      duration: '4 Months',
      level: 'Beginner to Advanced',
      students: '1800+',
      placement: '95%',
      color: '#2563eb'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="gradient-primary responsive-section" style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          zIndex: 1
        }} />

        <div className="responsive-container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
          >
            <h1 className="heading-gradient" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              marginBottom: '24px',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.02em'
            }}>
              About Sky States
            </h1>
            <p className="subtitle-enhanced" style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              lineHeight: '1.6',
              marginBottom: '32px',
              color: '#64748b'
            }}>
              Empowering the next generation of tech professionals with cutting-edge education, 
              expert mentorship, and guaranteed career placement support.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <motion.button
                className="btn-gradient-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/product/data-science-ai-program'}
              >
                Explore Programs
              </motion.button>
              <motion.button
                className="btn-gradient-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/jobs'}
              >
                View Job Opportunities
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="gradient-light responsive-section" style={{
        position: 'relative'
      }}>
        <div className="responsive-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '60px',
              alignItems: 'center'
            }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="heading-gradient" style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '24px',
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                Our Mission
              </h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#64748b',
                marginBottom: '24px'
              }}>
                At Sky States, we're on a mission to bridge the gap between education and industry needs. 
                We believe that quality education should be accessible, practical, and directly aligned 
                with what employers are looking for in today's competitive tech landscape.
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#64748b'
              }}>
                Our programs are designed and delivered by industry experts who bring real-world experience 
                into the classroom, ensuring our students graduate with the skills and confidence needed 
                to excel in their careers.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card-premium" style={{
              padding: '40px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: '#1e293b',
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                Why Choose Sky States?
              </h3>
              <div style={{
                display: 'grid',
                gap: '16px',
                textAlign: 'left'
              }}>
                {[
                  '✓ 100% Job Placement Assistance',
                  '✓ Industry-Expert Instructors',
                  '✓ Hands-on Project Experience',
                  '✓ Flexible Learning Options',
                  '✓ Global Career Opportunities'
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{
                      color: '#3b82f6',
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
                    }}>{item.split(' ')[0]}</span>
                    <span style={{ color: '#64748b' }}>{item.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      {/* <section className="gradient-medium" style={{
        padding: '100px 0',
        position: 'relative'
      }}>
        <div className="responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="heading-gradient" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '16px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Our Impact in Numbers
            </h2>
            <p className="subtitle-enhanced" style={{
              fontSize: '1.2rem',
              color: '#64748b'
            }}>
              Transforming careers and shaping the future of tech education
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px'
            }}
          >
            {statisticsWithCounters.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card-premium"
                style={{
                  padding: '40px 30px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className={`fas fa-${stat.icon === 'fa-users' ? 'users' : 
                    stat.icon === 'fa-chart-line' ? 'chart-line' : 
                    stat.icon === 'fa-chalkboard-teacher' ? 'chalkboard-teacher' :
                    stat.icon === 'fa-handshake' ? 'handshake' :
                    stat.icon === 'fa-laptop-code' ? 'laptop-code' : 'arrow-up'}`} 
                    style={{ color: '#3b82f6' }} />
                </div>
                
                <h3 style={{
                  fontSize: '3rem',
                  fontWeight: '900',
                  color: '#3b82f6',
                  marginBottom: '8px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}>
                  {mounted ? stat.counter : 0}{stat.suffix}
                </h3>
                <h4 style={{
                  fontSize: '1.2rem',
                  color: '#1e293b',
                  marginBottom: '8px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}>
                  {stat.label}
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  margin: 0
                }}>
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Leadership Section */}
      <section className="gradient-light" style={{
        padding: '100px 0',
        position: 'relative'
      }}>
        <div className="responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="heading-gradient" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '16px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Meet Our Leadership
            </h2>
            <p className="subtitle-enhanced" style={{
              fontSize: '1.2rem',
              color: '#64748b'
            }}>
              Led by industry experts committed to your success
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '60px',
            justifyContent: 'center'
          }}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-card-premium"
                style={{
                  padding: '40px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 24px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid #3b82f6',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </div>
                
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#1e293b',
                  marginBottom: '8px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}>
                  {member.name}
                </h3>
                
                <p style={{
                  fontSize: '1.1rem',
                  color: '#3b82f6',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  {member.role}
                </p>
                
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#64748b',
                  marginBottom: '24px'
                }}>
                  {member.bio}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center'
                }}>
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="gradient-medium" style={{
        padding: '100px 0',
        position: 'relative'
      }}>
        <div className="responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="heading-gradient" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '16px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Our Core Values
            </h2>
            <p className="subtitle-enhanced" style={{
              fontSize: '1.2rem',
              color: '#64748b'
            }}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px'
            }}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card-premium"
                style={{
                  padding: '40px 30px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 24px',
                  background: `linear-gradient(135deg, ${value.color}, ${value.color}80)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 10px 30px ${value.color}40`
                }}>
                  <i className={`fas ${value.icon}`} style={{
                    fontSize: '2rem',
                    color: 'white'
                  }} />
                </div>
                
                <h3 style={{
                  fontSize: '1.4rem',
                  color: '#1e293b',
                  marginBottom: '16px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}>
                  {value.title}
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#64748b',
                  margin: 0
                }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="gradient-light" style={{
        padding: '100px 0',
        position: 'relative'
      }}>
        <div className="responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="heading-gradient" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '16px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Student Success Stories
            </h2>
            <p className="subtitle-enhanced" style={{
              fontSize: '1.2rem',
              color: '#64748b'
            }}>
              Hear from our graduates about their Sky States experience
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card-premium"
                style={{
                  padding: '40px 30px',
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginRight: '16px',
                    border: '3px solid #3b82f6'
                  }}>
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      color: '#1e293b',
                      marginBottom: '4px',
                      fontFamily: 'Space Grotesk, sans-serif'
                    }}>
                      {testimonial.name}
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#3b82f6',
                      margin: 0
                    }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  marginBottom: '16px'
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star" style={{
                      color: '#fbbf24',
                      fontSize: '1rem',
                      marginRight: '4px'
                    }} />
                  ))}
                </div>

                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#64748b',
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Program Highlights Section */}
      {/* <section className="gradient-medium" style={{
        padding: '100px 0',
        position: 'relative'
      }}>
        <div className="responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="heading-gradient" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '16px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Featured Programs
            </h2>
            <p className="subtitle-enhanced" style={{
              fontSize: '1.2rem',
              color: '#64748b'
            }}>
              Our most popular programs with exceptional outcomes
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px'
            }}
          >
            {programHighlights.map((program, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card-premium"
                style={{
                  padding: '40px 30px',
                  textAlign: 'center',
                  border: `2px solid ${program.color}20`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 20px 40px ${program.color}40`
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '4px',
                  background: `linear-gradient(90deg, ${program.color}, ${program.color}80)`
                }} />
                
                <h3 style={{
                  fontSize: '1.4rem',
                  color: '#1e293b',
                  marginBottom: '24px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}>
                  {program.title}
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    padding: '16px',
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '12px'
                  }}>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      margin: '0 0 4px 0'
                    }}>Duration</p>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#1e293b',
                      fontWeight: '600',
                      margin: 0
                    }}>{program.duration}</p>
                  </div>
                  
                  <div style={{
                    padding: '16px',
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '12px'
                  }}>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      margin: '0 0 4px 0'
                    }}>Level</p>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#1e293b',
                      fontWeight: '600',
                      margin: 0
                    }}>{program.level}</p>
                  </div>
                  
                  <div style={{
                    padding: '16px',
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '12px'
                  }}>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      margin: '0 0 4px 0'
                    }}>Students</p>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#1e293b',
                      fontWeight: '600',
                      margin: 0
                    }}>{program.students}</p>
                  </div>
                  
                  <div style={{
                    padding: '16px',
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '12px'
                  }}>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      margin: '0 0 4px 0'
                    }}>Placement</p>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#28a745',
                      fontWeight: '600',
                      margin: 0
                    }}>{program.placement}</p>
                  </div>
                </div>
                
                <motion.button
                  className="btn-gradient-primary"
                  style={{
                    width: '100%',
                    background: `linear-gradient(135deg, ${program.color}, ${program.color}80)`
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const slug = program.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/&/g, '').replace(/ /g, '-');
                    window.location.href = `/product/${slug}-program`;
                  }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Contact & CTA Section */}
      <section className="gradient-primary" style={{
        padding: '100px 0',
        position: 'relative',
        textAlign: 'center'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-gradient" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '24px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Ready to Transform Your Career?
            </h2>
            <p className="subtitle-enhanced" style={{
              fontSize: '1.2rem',
              color: '#64748b',
              marginBottom: '40px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Join thousands of successful professionals who started their journey with Sky States. 
              Your dream career is just one click away.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}>
              <motion.button
                className="btn-gradient-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/product/data-science-ai-program'}
              >
                Get Started Now
              </motion.button>
              <motion.button
                className="btn-gradient-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = 'mailto:info@skystates.us'}
              >
                Contact Us
              </motion.button>
            </div>

            <div className="glass-card-premium" style={{
              padding: '40px',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#1e293b',
                marginBottom: '24px',
                fontFamily: 'Space Grotesk, sans-serif',
                textAlign: 'center'
              }}>
                Get in Touch
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="fas fa-envelope" style={{
                      fontSize: '1.2rem',
                      color: '#3b82f6'
                    }} />
                  </div>
                  <div>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      margin: '0 0 4px 0'
                    }}>Email Us</p>
                    <a href="mailto:info@skystates.us" style={{
                      fontSize: '1.1rem',
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}>
                      info@skystates.us
                    </a>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="fas fa-phone" style={{
                      fontSize: '1.2rem',
                      color: '#3b82f6'
                    }} />
                  </div>
                  <div>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      margin: '0 0 4px 0'
                    }}>Call Us</p>
                    <a href="tel:(888) 810-2434" style={{
                      fontSize: '1.1rem',
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}>
                      (888) 810-2434
                    </a>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="fas fa-map-marker-alt" style={{
                      fontSize: '1.2rem',
                      color: '#3b82f6'
                    }} />
                  </div>
                  <div>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      margin: '0 0 4px 0'
                    }}>Global Presence</p>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#1e293b',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      Worldwide Online
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
