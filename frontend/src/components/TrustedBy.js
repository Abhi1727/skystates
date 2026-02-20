import React, { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";

const TrustedBy = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // COLORFUL COMPANY LOGOS - Updated with guaranteed colorful versions
  const companies = [
    { name: "Google", icon: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png?v=2" },
    { name: "Microsoft", icon: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3bZoGy1HHqB5pykX?ver=6cbb&v=2" },
    { name: "Amazon", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg?v=2" },
    { name: "Apple", icon: "https://www.apple.com/v/home/b/images/logos/apple-logo.svg?v=2" },
    { name: "Meta", icon: "https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT-3eH8s0f.ico?v=2" },
    { name: "Netflix", icon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.png?v=2" },
    { name: "Spotify", icon: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Logo_RGB_Green.png?v=2" },
    { name: "Uber", icon: "https://www.uber.com/global/en/brand/assets/images/logo-black.png?v=2" },
    { name: "Airbnb", icon: "https://a0.muscache.com/airbnb/static/logos/belo-200x200-4d5e6c8b.png?v=2" },
    { name: "Tesla", icon: "https://www.tesla.com/themes/custom/tesla_frontend/assets/images/logo-tesla.svg?v=2" },
    { name: "Adobe", icon: "https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg?v=2" },
    { name: "IBM", icon: "https://www.ibm.com/design/language/1.0.0/images/IBM_Logo_White_Blue.svg?v=2" }
  ];

  return (
    <section 
      aria-label="Trusted by" 
      style={{
        padding: '60px 0',
        background: '#495057',
        borderTop: '1px solid #6c757d',
        borderBottom: '1px solid #6c757d',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#ecf0f1',
            marginBottom: '10px'
          }}>
            Trusted by top engineering teams
          </p>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '20px'
          }}>
            Industry Leaders Choose Sky States
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#bdc3c7',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Join thousands of professionals from leading companies who have transformed their careers with our programs
          </p>
        </div>

        {/* FIRST MARQUEE - LEFT TO RIGHT */}
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            direction={scrollDirection === 'down' ? 'left' : 'right'}
          >
            {companies.map((company, index) => (
              <div key={index} style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 40px',
                padding: '20px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 20px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                minWidth: '120px',
                height: '80px'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 8px 30px';
                  e.currentTarget.style.background = '#495057';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0px 4px 20px';
                  e.currentTarget.style.background = 'white';
                }}
              >
                {/* COLORFUL LOGO - NO GRAYSCALE */}
                <img 
                  src={company.icon} 
                  alt={company.name} 
                  loading="lazy" 
                  style={{
                    height: '40px',
                    width: 'auto',
                    opacity: '0.9',
                    transition: 'all 0.3s ease',
                    // REMOVED: filter: 'grayscale(100%)'
                    // REMOVED: WebkitFilter: 'grayscale(100%)'
                    // COLORFUL LOGOS ONLY!
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* SECOND MARQUEE - RIGHT TO LEFT */}
        <div style={{ position: 'relative' }}>
          <Marquee
            gradient={false}
            speed={35}
            pauseOnHover={true}
            direction={scrollDirection === 'down' ? 'right' : 'left'}
          >
            {companies.map((company, index) => (
              <div key={index} style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 40px',
                padding: '20px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 20px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                minWidth: '120px',
                height: '80px'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 8px 30px';
                  e.currentTarget.style.background = '#495057';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0px 4px 20px';
                  e.currentTarget.style.background = 'white';
                }}
              >
                {/* COLORFUL LOGO - NO GRAYSCALE */}
                <img 
                  src={company.icon} 
                  alt={company.name} 
                  loading="lazy" 
                  style={{
                    height: '40px',
                    width: 'auto',
                    opacity: '0.9',
                    transition: 'all 0.3s ease',
                    // REMOVED: filter: 'grayscale(100%)'
                    // REMOVED: WebkitFilter: 'grayscale(100%)'
                    // COLORFUL LOGOS ONLY!
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
