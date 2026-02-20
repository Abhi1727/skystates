import React from 'react';
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';

const Clients = () => {
  const logos = [
    "https://skystates.us/wp-content/uploads/2026/01/cisco-corp.png",
    "https://skystates.us/wp-content/uploads/2026/01/starbuck.png",
    "https://skystates.us/wp-content/uploads/2026/01/logo-1536x864.png",
    "https://skystates.us/wp-content/uploads/2026/01/compdd.png",
    "https://skystates.us/wp-content/uploads/2026/01/Amazon-Logo-1024x576.png",
    "https://skystates.us/wp-content/uploads/2026/01/Microsoft_logo_2012.svg-1024x218.png",
    "https://skystates.us/wp-content/uploads/2026/01/city-corp.png",
    "https://skystates.us/wp-content/uploads/2026/01/cocacola-corp.png",
    "https://skystates.us/wp-content/uploads/2026/01/walmart-corp.png",
    "https://skystates.us/wp-content/uploads/2026/01/wipro_new-corp.png",
    "https://skystates.us/wp-content/uploads/2026/01/visa-corp.png",
    "https://skystates.us/wp-content/uploads/2026/01/honeywell-corp.png"
  ];

  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#6c757d',
            marginBottom: '10px'
          }}>
            Trusted by top engineering teams
          </h2>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '20px'
          }}>
            Industry Leaders Choose Sky States
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#6c757d',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Join thousands of professionals from leading companies who have transformed their careers with our programs
          </p>
        </motion.div>

        {/* Rotating Logo Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            marginBottom: '40px'
          }}
        >
          <Marquee 
            gradient={false}
            speed={30}
            pauseOnHover={true}
            loop={0}
            play={true}
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 30px',
                  padding: '15px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={logo}
                  alt={`Company Logo ${index + 1}`}
                  style={{
                    height: '60px',
                    width: 'auto',
                    transition: 'all 0.3s ease'
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>
        </motion.div>

        {/* Our Corporate Clients Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{
            display: 'inline-block',
            position: 'relative'
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#6c757d',
              marginRight: '10px'
            }}>
              OUR CLIENTS
            </span>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              display: 'inline-block',
              position: 'relative'
            }}>
              Our Corporate Clients
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '-30px',
                fontSize: '16px',
                color: '#007bff'
              }}>
                <i className="fas fa-rocket"></i>
              </div>
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
