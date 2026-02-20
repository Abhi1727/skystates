import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Sky States",
      content: "Transform your career with industry-leading tech programs and 100% job placement support.",
      type: "description"
    },
    // {
    //   title: "Quick Links",
    //   links: [
    //     { name: "About Us", href: "/about" },
    //     { name: "Programs", href: "/programs" },
    //     { name: "Jobs", href: "/jobs" },
    //     { name: "Contact", href: "/contact" }
    //   ],
    //   type: "links"
    // },
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
        }
      ],
      type: "contact"
    }
  ];

  return (
    <footer 
      className="footer" 
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: '#ffffff',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
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
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#ffffff',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.02em'
              }}>
                {section.title}
              </h3>
              
              {section.type === 'description' && (
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: '#b8c5d6',
                  marginBottom: '20px'
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
                    <li key={linkIndex} style={{ marginBottom: '12px' }}>
                      <a
                        href={link.href}
                        style={{
                          color: '#b8c5d6',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          display: 'inline-block'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#ffffff';
                          e.target.style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '#b8c5d6';
                          e.target.style.transform = 'translateX(0)';
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {section.type === 'contact' && (
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} style={{ marginBottom: '16px' }}>
                      <a
                        href={link.href}
                        style={{
                          color: '#b8c5d6',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#ffffff';
                          e.target.style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '#b8c5d6';
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
            color: '#b8c5d6',
            fontSize: '0.9rem',
            margin: 0
          }}>
            &copy; {currentYear} Sky States. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <a
              href="/privacy"
              style={{
                color: '#b8c5d6',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b8c5d6';
              }}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              style={{
                color: '#b8c5d6',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b8c5d6';
              }}
            >
              Terms of Service
            </a>
            <a
              href="/refund-returns"
              style={{
                color: '#b8c5d6',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b8c5d6';
              }}
            >
              Refund Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
