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
      students: 1247,
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
      students: 892,
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
      students: 1567,
      link: '/product/devops-and-cloud-computing-program'
    }
  ];

  return (
    <section ref={containerRef} className="programs">
      <div className="container">
        <h2 className="heading-display">Our Programs</h2>
        <div className="programs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(283.5px, 1fr))',
          gap: '40px',
          padding: '40px 0 20px 0'
        }}>
          {programs.map((program, index) => (
            <motion.div 
              className={`program-card ${program.popular ? 'popular' : ''}`} 
              key={index} 
              className="glass-card-premium"
              whileHover={{ 
                scale: 1.03,
                borderColor: 'rgba(255, 165, 0, 0.5)',
                boxShadow: '0 20px 40px rgba(255, 107, 53, 0.2)'
              }}
              style={{
                padding: '28px',
                position: 'relative',
                overflow: 'visible',
                transformOrigin: 'center center'
              }}
            >
              {program.popular && (
                <motion.div 
                  className="popular-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    zIndex: 10,
                    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)',
                    whiteSpace: 'nowrap',
                    border: '2px solid rgba(255, 215, 0, 0.3)'
                  }}
                >
                  ⚡ Most Popular
                </motion.div>
              )}
              
              <div className="program-image">
                <img 
                  src={program.image} 
                  alt={program.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>
              
              <h3 className="gold-text" style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '12px',
                textShadow: '0 2px 4px rgba(255, 215, 0, 0.3)'
              }}>{program.title}</h3>
              <p className="subtitle-enhanced" style={{
                fontSize: '1rem',
                marginBottom: '16px',
                lineHeight: '1.5'
              }}>{program.description}</p>
              
              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  padding: '12px',
                  background: 'rgba(255, 165, 0, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 165, 0, 0.2)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ffa500', fontSize: '1.2rem' }}>⭐</span>
                  <span className="gold-text" style={{ fontSize: '0.9rem', fontWeight: '700' }}>{program.rating}</span>
                  <span className="subtitle-enhanced" style={{ fontSize: '0.8rem' }}>({program.students} students)</span>
                </div>
              </motion.div>
              
              {/* Scarcity Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                style={{
                  marginBottom: '15px',
                  padding: '12px',
                  background: program.spotsLeft <= 5 ? 'rgba(255, 107, 53, 0.15)' : 'rgba(255, 165, 0, 0.1)',
                  borderRadius: '12px',
                  border: `2px solid ${program.spotsLeft <= 5 ? '#ff6b35' : '#ffa500'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="gold-text" style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                    {program.spotsLeft <= 5 ? '⚠️ Almost Full!' : '⚡ Spots Available'}
                  </span>
                  <span className="gold-text" style={{ fontSize: '0.9rem', fontWeight: '800' }}>
                    {program.spotsLeft}/{program.spotsTotal}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((program.spotsTotal - program.spotsLeft) / program.spotsTotal) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    style={{
                      height: '100%',
                      background: program.spotsLeft <= 5 ? '#ff6b35' : '#ffa500',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Pricing */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                style={{ marginBottom: '20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <span className="gold-text" style={{
                    fontSize: '1.8rem',
                    fontWeight: '900',
                    textShadow: '0 4px 8px rgba(255, 215, 0, 0.3)'
                  }}>
                    {program.price}
                  </span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
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
                    padding: '18px 32px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '800',
                    fontSize: '16px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    minWidth: '180px'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 50px rgba(255, 215, 0, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <span style={{ fontSize: '18px' }}>⚡</span>
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
                      left: '0%',
                      transition: { duration: 0.6 }
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
