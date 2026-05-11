import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomepageTheme.css';

const Programs = () => {
  const containerRef = useRef(null);
  const programs = [
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      title: 'Data Science And AI',
      description: 'Master data science, machine learning, and AI technologies',
      price: '$2,999',
      popular: true,
      spotsLeft: 5,
      spotsTotal: 10,
      rating: 4.9,
      students: 3247,
      link: '/product/data-science-ai-program'
    },
    {
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      title: 'Cyber Security And Ethical Hacking',
      description: 'Learn cybersecurity fundamentals and ethical hacking techniques',
      price: '$2,999',
      popular: false,
      spotsLeft: 8,
      spotsTotal: 10,
      rating: 4.8,
      students: 2156,
      link: '/product/cyber-security-and-ethical-hacking-program'
    },
    {
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      title: 'DevOps & Cloud Computing',
      description: 'Master cloud platforms and DevOps practices',
      price: '$2,999',
      popular: false,
      spotsLeft: 7,
      spotsTotal: 10,
      rating: 4.7,
      students: 4597,
      link: '/product/devops-and-cloud-computing-program'
    }
  ];

  return (
    <section ref={containerRef} className="programs">
      <div className="container">
        <h2 className="heading-display">Our Programs</h2>
        <div className="programs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr)) !important',
          gap: '24px !important',
          padding: '40px 0 20px 0'
        }}>
          {programs.map((program, index) => (
            <motion.div 
              className={`program-card ${program.popular ? 'popular' : ''} glass-card-premium`} 
              key={index}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                rotateX: 2,
                rotateY: -2,
                borderColor: 'rgba(59, 130, 246, 0.6)',
                boxShadow: '0 30px 60px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                padding: '28px',
                position: 'relative',
                overflow: 'hidden',
                transformOrigin: 'center center',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.85) 50%, rgba(241, 245, 249, 0.9) 100%)',
                backdropFilter: 'blur(25px) saturate(1.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.02) 0%, transparent 50%)`,
                pointerEvents: 'none',
                zIndex: 0
              }} />
              {program.popular && (
                <motion.div 
                  className="popular-badge"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.span
                    className="lightning-icon"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚡
                  </motion.span>
                  Most Popular
                </motion.div>
              )}
              
              <div className="program-image" style={{
                height: '180px',
                marginBottom: '20px',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
                  zIndex: 1
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
                  zIndex: 1
                }} />
                <img 
                  src={program.image} 
                  alt={program.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), filter 0.8s ease'
                  }}
                  whileHover={{ scale: 1.08, filter: 'brightness(1.1)' }}
                />
              </div>
              
              <h3 className="gold-text" style={{
                fontSize: '1.25rem',
                fontWeight: '900',
                marginBottom: '16px',
                textShadow: '0 3px 12px rgba(59, 130, 246, 0.2)',
                lineHeight: '1.2',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>{program.title}</h3>
              <p className="subtitle-enhanced" style={{
                fontSize: '0.85rem',
                marginBottom: '20px',
                lineHeight: '1.6',
                color: '#64748b',
                fontWeight: '400',
                letterSpacing: '0.01em'
              }}>{program.description}</p>
              
              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  padding: '10px 12px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <motion.span 
                    style={{ color: '#3b82f6', fontSize: '1rem' }}
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⭐
                  </motion.span>
                  <span className="gold-text" style={{ fontSize: '0.8rem', fontWeight: '800' }}>{program.rating}</span>
                  {/* <span className="subtitle-enhanced" style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({program.students.toLocaleString()} students)</span> */}
                </div>
              </motion.div>
              
              {/* Scarcity Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                style={{
                  marginBottom: '12px',
                  padding: '10px 12px',
                  background: program.spotsLeft <= 5 
                    ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.12) 0%, rgba(220, 38, 38, 0.06) 100%)' 
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
                  borderRadius: '12px',
                  border: `1px solid ${program.spotsLeft <= 5 ? 'rgba(220, 38, 38, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="gold-text" style={{ fontSize: '0.8rem', fontWeight: '800' }}>
                    {program.spotsLeft <= 5 ? (
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ⚠️ Almost Full!
                      </motion.span>
                    ) : (
                      <motion.span
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ⚡ Spots Available
                      </motion.span>
                    )}
                  </span>
                  <span className="gold-text" style={{ fontSize: '0.8rem', fontWeight: '900' }}>
                    {program.spotsLeft}/{program.spotsTotal}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((program.spotsTotal - program.spotsLeft) / program.spotsTotal) * 100}%` }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    style={{
                      height: '100%',
                      background: program.spotsLeft <= 5 
                        ? 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)' 
                        : 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
                      borderRadius: '4px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      }}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Pricing */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                style={{ marginBottom: '16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span className="gold-text" style={{
                    fontSize: '1.3rem',
                    fontWeight: '900',
                    textShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {program.price}
                  </span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={program.link} 
                  className="btn-gradient-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '900',
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    minWidth: '140px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 15px 40px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <motion.span
                      style={{ fontSize: '16px' }}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⚡
                    </motion.span>
                    Explore Program
                  </span>
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    }}
                    whileHover={{
                      left: '100%',
                      transition: { duration: 0.8 }
                    }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
