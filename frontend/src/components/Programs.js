import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Programs = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.program-card');

    cards.forEach((card, i) => {
      // Create a timeline for smoother, continuous animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          end: "top 35%",
          toggleActions: "play none none reverse"
        }
      });

      // Break down into micro-steps that blend together
      tl.fromTo(card, 
        { opacity: 0, y: 40, scale: 0.98, rotationY: 5 },
        { opacity: 0.3, y: 30, scale: 0.99, rotationY: 4, duration: 0.3, ease: "none" }
      )
      .to(card, 
        { opacity: 0.6, y: 20, scale: 0.995, rotationY: 3, duration: 0.3, ease: "none" }
      )
      .to(card, 
        { opacity: 0.8, y: 10, scale: 0.998, rotationY: 2, duration: 0.3, ease: "none" }
      )
      .to(card, 
        { opacity: 0.9, y: 5, scale: 0.999, rotationY: 1, duration: 0.2, ease: "none" }
      )
      .to(card, 
        { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.2, ease: "none" }
      );

      // Add subtle continuous micro-movement on hover
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          scale: 1.03,
          duration: 0.4,
          ease: "power2.out",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
        });
      });
    });

  }, { scope: containerRef });
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
            <div className={`program-card ${program.popular ? 'popular' : ''}`} key={index} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28.35px 19.44px 19.44px 19.44px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'visible',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              transformOrigin: 'center center'
            }}>
              {/* {program.popular && (
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
                    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    zIndex: 10,
                    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  🔥 Most Popular
                </motion.div>
              )} */}
              
              <div className="program-image">
                <img 
                  src={program.image} 
                  alt={program.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
              
              <h3 className="feature-title">{program.title}</h3>
              <p className="subtitle">{program.description}</p>
              
              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  padding: '10px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ffa500', fontSize: '1rem' }}>⭐</span>
                  <span className="cta-text" style={{ fontSize: '0.9rem', fontWeight: '600' }}>{program.rating}</span>
                  <span className="subtitle" style={{ fontSize: '0.8rem', color: '#666' }}>({program.students} students)</span>
                </div>
              </motion.div>
              
              {/* Scarcity Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  marginBottom: '15px',
                  padding: '10px',
                  background: program.spotsLeft <= 5 ? 'rgba(255, 107, 107, 0.1)' : 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '8px',
                  border: `1px solid ${program.spotsLeft <= 5 ? '#ff6b6b' : '#667eea'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span className="cta-text" style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                    {program.spotsLeft <= 5 ? '⚠️ Almost Full!' : '📚 Spots Available'}
                  </span>
                  <span className="cta-text" style={{ fontSize: '0.85rem', fontWeight: '700', color: program.spotsLeft <= 5 ? '#ff6b6b' : '#667eea' }}>
                    {program.spotsLeft}/{program.spotsTotal}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: '#e0e0e0',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((program.spotsTotal - program.spotsLeft) / program.spotsTotal) * 100}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{
                      height: '100%',
                      background: program.spotsLeft <= 5 ? '#ff6b6b' : '#667eea',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Pricing */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <span className="price-text" style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#667eea'
                  }}>
                    {program.price}
                  </span>
                </div>
              </div>
              
              <Link to={program.link} className="btn-primary" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '16px',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 20px rgba(37, 99, 235, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                minWidth: '160px'
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
                <span className="cta-text" style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '18px' }}>🚀</span>
                  Explore More
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
