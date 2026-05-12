import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Sky States",
      content: "Transform your career with industry-leading tech programs and 100% job placement support.",
      type: "description"
    },
    {
      title: "Quick Links",
      links: [
        { name: "About Us", href: "/about" },
        // { name: "Programs", href: "/programs" },
        { name: "Jobs", href: "/jobs" },
        // { name: "Contact", href: "/contact" }
      ],
      type: "links"
    },
    {
      title: "Programs",
      links: [
        { name: "Data Science & AI", href: "/product/data-science-ai-program" },
        { name: "Cyber Security", href: "/product/cyber-security-and-ethical-hacking-program" },
        { name: "DevOps & Cloud", href: "/product/devops-and-cloud-computing-program" }
      ],
      type: "links"
    },
    {
      title: "Account",
      type: "login"
    },
    {
      title: "Contact Info",
      links: [
        { 
          name: "info@skystates.us", 
          href: "mailto:info@skystates.us",
          icon: "fas fa-envelope"
        },
        { 
          name: "(888) 810-2434", 
          href: "tel:(888) 810-2434",
          icon: "fas fa-phone"
        },
        {
          name: "30 N Gould St, Sheridan, WY, 82801, USA",
          href: "#",
          icon: "fas fa-map-marker-alt"
        },
        {
          name: "INC Headquarter: 8 The Green Suite R Dover, DE 19901, USA",
          href: "#",
          icon: "fas fa-building"
        }
      ],
      type: "contact"
    }
  ];

  return (
    <footer 
      className="footer" 
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
        color: '#1e293b',
        padding: '80px 0 40px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
          gap: 'clamp(20px, 4vw, 40px)',
          marginBottom: 'clamp(30px, 6vw, 60px)',
          padding: '0 clamp(10px, 3vw, 20px)'
        }}>
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: '600',
                marginBottom: 'clamp(15px, 3vw, 20px)',
                color: '#1e293b',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.02em',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                {section.title}
              </h3>
              
              {section.type === 'description' && (
                <p style={{
                  fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
                  lineHeight: '1.6',
                  color: '#64748b',
                  marginBottom: 'clamp(15px, 3vw, 20px)',
                  textShadow: '0 1px 1px rgba(255,255,255,0.8)'
                }}>
                  {section.content}
                </p>
              )}

              {section.type === 'links' && (
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} style={{ marginBottom: 'clamp(8px, 2vw, 12px)' }}>
                      {link.href.startsWith('http') || link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? (
                        <a
                          href={link.href}
                          aria-label={`Navigate to ${link.name}`}
                          style={{
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
                            transition: 'all 0.3s ease',
                            display: 'inline-block',
                            textShadow: '0 1px 1px rgba(255,255,255,0.8)',
                            lineHeight: '1.5'
                          }}
                          onFocus={(e) => {
                            e.target.style.color = '#1e293b';
                            e.target.style.outline = '2px solid #3b82f6';
                            e.target.style.outlineOffset = '2px';
                          }}
                          onBlur={(e) => {
                            e.target.style.color = '#64748b';
                            e.target.style.outline = 'none';
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.color = '#1e293b';
                            e.target.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = '#64748b';
                            e.target.style.transform = 'translateX(0)';
                          }}
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          aria-label={`Navigate to ${link.name}`}
                          style={{
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
                            transition: 'all 0.3s ease',
                            display: 'inline-block',
                            textShadow: '0 1px 1px rgba(255,255,255,0.8)',
                            lineHeight: '1.5'
                          }}
                          onFocus={(e) => {
                            e.target.style.color = '#1e293b';
                            e.target.style.outline = '2px solid #3b82f6';
                            e.target.style.outlineOffset = '2px';
                          }}
                          onBlur={(e) => {
                            e.target.style.color = '#64748b';
                            e.target.style.outline = 'none';
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.color = '#1e293b';
                            e.target.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = '#64748b';
                            e.target.style.transform = 'translateX(0)';
                          }}
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {section.type === 'login' && (
                <div style={{ marginTop: '10px' }}>
                  <Link 
                    to="/login" 
                    aria-label="Login to your account"
                    className="login-btn"
                    style={{
                      color: 'white',
                      padding: '12px 24px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.4s ease',
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, var(--nav-primary, #3b82f6) 0%, var(--nav-secondary, #8b5cf6) 100%)',
                      cursor: 'pointer',
                      boxShadow: 'rgba(59, 130, 246, 0.4) 0px 8px 24px',
                      backdropFilter: 'blur(10px)',
                      transformStyle: 'preserve-3d',
                      transform: 'translateY(-3px) rotateX(8deg) scale(1.05)'
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = '2px solid #ffffff';
                      e.target.style.outlineOffset = '2px';
                    }}
                    onBlur={(e) => {
                      e.target.style.outline = 'none';
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px) rotateX(8deg) scale(1.05)';
                      e.target.style.boxShadow = 'rgba(59, 130, 246, 0.4) 0px 8px 24px';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                      e.target.style.boxShadow = 'rgba(59, 130, 246, 0.3) 0px 4px 16px';
                    }}
                  >
                    Login
                  </Link>
                </div>
              )}

              {section.type === 'contact' && (
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} style={{ marginBottom: 'clamp(10px, 2.5vw, 16px)' }}>
                      <a
                        href={link.href}
                        aria-label={link.icon === 'fas fa-envelope' ? `Send email to ${link.name}` : `Call ${link.name}`}
                        style={{
                          color: '#64748b',
                          textDecoration: 'none',
                          fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'clamp(8px, 2vw, 12px)',
                          textShadow: '0 1px 1px rgba(255,255,255,0.8)',
                          lineHeight: '1.4',
                          wordBreak: 'break-word'
                        }}
                        onFocus={(e) => {
                          e.target.style.color = '#1e293b';
                          e.target.style.outline = '2px solid #3b82f6';
                          e.target.style.outlineOffset = '2px';
                        }}
                        onBlur={(e) => {
                          e.target.style.color = '#64748b';
                          e.target.style.outline = 'none';
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#1e293b';
                          e.target.style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '#64748b';
                          e.target.style.transform = 'translateX(0)';
                        }}
                      >
                        <i className={link.icon} style={{ fontSize: '0.9rem' }} />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            padding: '30px 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <p style={{
            color: '#64748b',
            fontSize: '0.9rem',
            margin: 0,
            textShadow: '0 1px 1px rgba(255,255,255,0.8)'
          }}>
            &copy; {currentYear} Sky States. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Link
              to="/privacy"
              aria-label="View Privacy Policy"
              style={{
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease',
                textShadow: '0 1px 1px rgba(255,255,255,0.8)'
              }}
              onFocus={(e) => {
                e.target.style.color = '#1e293b';
                e.target.style.outline = '2px solid #3b82f6';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.color = '#64748b';
                e.target.style.outline = 'none';
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1e293b';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#64748b';
              }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={{
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease',
                textShadow: '0 1px 1px rgba(255,255,255,0.8)'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1e293b';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#64748b';
              }}
            >
              Terms of Service
            </Link>
            <Link
              to="/refund-returns"
              style={{
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease',
                textShadow: '0 1px 1px rgba(255,255,255,0.8)'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1e293b';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#64748b';
              }}
            >
              Refund Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
