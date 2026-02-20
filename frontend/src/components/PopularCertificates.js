import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PopularCertificates = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.certificate-card');

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

  const certificates = [
    {
      id: 'data-science',
      image: 'https://skystates.us/wp-content/uploads/2025/12/data_science-768x543-1.png',
      partnerLogo: 'https://skystates.us/wp-content/uploads/2025/12/microsoft_PNG4-1024x378.png',
      title: 'Data Science',
      type: 'Professional Certificate',
      link: '/product/data-science-ai-program',
      description: 'Master data science, machine learning, and AI technologies',
      duration: '6 Months',
      level: 'Advanced',
      students: '5000+',
      rating: 4.9,
      accreditation: 'Microsoft Certified',
      highlights: ['Industry Projects', 'Job Assistance', 'Expert Faculty']
    },
    {
      id: 'cyber-security',
      image: 'https://skystates.us/wp-content/uploads/2025/12/cyber-1-1024x724.png',
      partnerLogo: 'https://skystates.us/wp-content/uploads/2025/12/microsoft_PNG4-1024x378.png',
      title: 'Cyber Security',
      type: 'Professional Certificate',
      link: '/product/cyber-security-and-ethical-hacking-program',
      description: 'Learn cybersecurity fundamentals and ethical hacking techniques',
      duration: '6 Months',
      level: 'Advanced',
      students: '3500+',
      rating: 4.8,
      accreditation: 'Microsoft Certified',
      highlights: ['Hands-on Training', 'Security Labs', 'Career Support']
    },
    {
      id: 'devops',
      image: 'https://skystates.us/wp-content/uploads/2025/12/devops-768x543-2.png',
      partnerLogo: 'https://skystates.us/wp-content/uploads/2025/12/microsoft_PNG4-1024x378.png',
      title: 'DevOps',
      type: 'Professional Certificate',
      link: '/product/devops-and-cloud-computing-program',
      description: 'Master cloud platforms and DevOps practices',
      duration: '6 Months',
      level: 'Advanced',
      students: '4200+',
      rating: 4.7,
      accreditation: 'Microsoft Certified',
      highlights: ['Cloud Platforms', 'CI/CD Pipeline', 'Infrastructure as Code']
    }
  ];

  return (
    <section ref={containerRef} className="popular-certificates" style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
      }} />

      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '80px',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: '', text: 'Industry Recognized' },
              { icon: '', text: 'Globally Accredited' },
              { icon: '', text: 'Microsoft Partner' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  border: '1px solid rgba(102, 126, 234, 0.1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{badge.icon}</span>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#2d3748'
                }}>
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.h1 
            className="heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: '800',
              color: '#1a1a2e',
              marginBottom: '20px',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            Professional Certificates
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              marginBottom: '40px'
            }}
          >
            Advance your career with industry-recognized professional certificates from Microsoft. 
            <span style={{ 
              color: '#667eea', 
              fontWeight: '700',
              background: 'rgba(102, 126, 234, 0.1)',
              padding: '2px 8px',
              borderRadius: '6px'
            }}>
              Job-ready skills
            </span> 
            {' '}in 6 months.
          </motion.p>
        </motion.div>

        {/* Certificate Cards Grid */}
        <div className="certificates-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              className="certificate-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}
              whileHover={{
                transform: 'translateY(-10px)',
                boxShadow: '0 25px 50px rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}
            >
              <Link 
                to={certificate.link} 
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
              >
                {/* Certificate Header */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  padding: '20px',
                  borderBottom: '1px solid rgba(102, 126, 234, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#667eea',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        ✓
                      </div>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#2d3748'
                      }}>
                        {certificate.type}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{
                        fontSize: '0.85rem',
                        color: '#667eea',
                        fontWeight: '600'
                      }}>
                        ⭐ {certificate.rating}
                      </span>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#6c757d'
                      }}>
                        ({certificate.students} students)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Certificate Image */}
                <div style={{
                  height: '220px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                }}>
                  <img 
                    src={certificate.image} 
                    alt={certificate.title}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      height: 'auto',
                      maxHeight: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>

                {/* Certificate Content */}
                <div style={{ padding: '25px' }}>
                  {/* Partner Logo */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      border: '1px solid rgba(102, 126, 234, 0.1)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <img 
                        src={certificate.partnerLogo} 
                        alt="Partner"
                        style={{
                          height: '30px',
                          width: 'auto',
                          maxWidth: '120px'
                        }}
                      />
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: '#667eea'
                      }}>
                        {certificate.accreditation}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: '700',
                    color: '#1a1a2e',
                    marginBottom: '15px',
                    textAlign: 'center',
                    lineHeight: '1.2'
                  }}>
                    {certificate.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '1rem',
                    color: '#4a5568',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    {certificate.description}
                  </p>

                  {/* Duration & Level */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(102, 126, 234, 0.1)',
                      padding: '8px 16px',
                      borderRadius: '20px'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>⏱</span>
                      <div>
                        <div style={{
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: '#2d3748'
                        }}>
                          {certificate.duration}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#6c757d'
                        }}>
                          {certificate.level} Level
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    {certificate.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'rgba(102, 126, 234, 0.08)',
                          color: '#667eea',
                          padding: '6px 12px',
                          borderRadius: '15px',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          border: '1px solid rgba(102, 126, 234, 0.15)'
                        }}
                      >
                        ✓ {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          {/* Commented out Explore All Programs button
          <Link 
            to="/data-science-ai"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
              color: 'white',
              padding: '18px 40px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 40px rgba(37, 99, 235, 0.4)';
              e.target.style.background = 'linear-gradient(135deg, rgb(25, 69, 196) 0%, rgb(26, 58, 164) 50%, rgb(20, 33, 74) 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.3)';
              e.target.style.background = 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>🚀</span>
            Explore All Programs
          </Link>
          */}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCertificates;
