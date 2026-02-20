import React from 'react';
import Marquee from "react-fast-marquee";

const LogoCarousel = () => {
  const logos = [
    {
      id: 1,
      name: 'Logo 1',
      image: 'https://skystates.us/wp-content/uploads/2025/12/11-1.webp'
    },
    {
      id: 2,
      name: 'Logo 2',
      image: 'https://skystates.us/wp-content/uploads/2025/12/10-1.svg'
    },
    {
      id: 3,
      name: 'Logo 3',
      image: 'https://skystates.us/wp-content/uploads/2025/12/9-3-scaled.png'
    },
    {
      id: 4,
      name: 'Logo 4',
      image: 'https://skystates.us/wp-content/uploads/2025/12/8-3.png'
    },
    {
      id: 5,
      name: 'Logo 5',
      image: 'https://skystates.us/wp-content/uploads/2025/12/7-2.png'
    },
    {
      id: 6,
      name: 'Logo 6',
      image: 'https://skystates.us/wp-content/uploads/2025/12/6-3.png'
    },
    {
      id: 7,
      name: 'Logo 7',
      image: 'https://skystates.us/wp-content/uploads/2025/12/5-2.png'
    },
    {
      id: 8,
      name: 'Logo 8',
      image: 'https://skystates.us/wp-content/uploads/2025/12/4-4-scaled.png'
    },
    {
      id: 9,
      name: 'Logo 9',
      image: 'https://skystates.us/wp-content/uploads/2025/12/3-1.webp'
    },
    {
      id: 10,
      name: 'Logo 10',
      image: 'https://skystates.us/wp-content/uploads/2025/12/2-5.png'
    },
    {
      id: 11,
      name: 'Logo 11',
      image: 'https://skystates.us/wp-content/uploads/2025/12/1-5.png'
    }
  ];

  return (
    <section aria-label="Tools to Master" style={{
      padding: '60px 0',
      background: '#f8f9fa',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#6c757d',
            marginBottom: '10px'
          }}>
            Tools to Master
          </p>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '20px'
          }}>
            Industry Leaders Choose Sky States
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6c757d',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Join thousands of professionals from leading companies who have transformed their careers with our programs
          </p>
        </div>

        {/* First Marquee Row */}
        <div style={{
          position: 'relative',
          marginBottom: '30px'
        }}>
          <Marquee 
            gradient={true}
            gradientColor={[248, 249, 250]}
            gradientWidth={100}
            speed={40}
            pauseOnHover={true}
            loop={0}
            play={true}
          >
            {logos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 40px',
                  padding: '20px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  minWidth: '120px',
                  height: '80px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  style={{
                    height: '40px',
                    width: 'auto',
                    filter: 'none',
                    opacity: '1',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Second Marquee Row (Reverse) */}
        <div style={{
          position: 'relative'
        }}>
          <Marquee 
            gradient={true}
            gradientColor={[248, 249, 250]}
            gradientWidth={100}
            speed={35}
            pauseOnHover={true}
            loop={0}
            play={true}
            direction="right"
          >
            {[...logos].reverse().map((logo, idx) => (
              <div
                key={`${logo.name}-reverse-${idx}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 40px',
                  padding: '20px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  minWidth: '120px',
                  height: '80px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  style={{
                    height: '40px',
                    width: 'auto',
                    filter: 'none',
                    opacity: '1',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
