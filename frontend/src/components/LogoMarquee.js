import React from 'react';
import Marquee from "react-fast-marquee";

const logos = [
    { alt: "Apple", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg" },
    { alt: "Microsoft", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg" },
    { alt: "Amazon", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg" },
    { alt: "Google Cloud", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/starbucks.svg" },
    { alt: "JetBrains", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dell.svg" },
    { alt: "Netlify", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg" },
    { alt: "DigitalOcean", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cocacola.svg" },
    { alt: "Cloudflare", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/walmart.svg" },
    { alt: "Stripe", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/visa.svg" },
    { alt: "Kubernetes", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wipro.svg" },
    { alt: "MongoDB", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg" },
    { alt: "Sentry", src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sentry.svg" },
];

const LogoMarquee = () => {
    return (
        <section aria-label="Trusted by" style={{
            padding: '60px 0',
            background: '#f8f9fa',
            borderTop: '1px solid #dee2e6',
            borderBottom: '1px solid #dee2e6',
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
                        Trusted by top engineering teams
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
                                key={`${logo.alt}-${idx}`}
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
                                    src={logo.src}
                                    alt={logo.alt}
                                    style={{
                                        height: '40px',
                                        width: 'auto',
                                        filter: 'grayscale(100%)',
                                        opacity: '0.7',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.filter = 'grayscale(0%)';
                                        e.target.style.opacity = '1';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.filter = 'grayscale(100%)';
                                        e.target.style.opacity = '0.7';
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
                                key={`${logo.alt}-reverse-${idx}`}
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
                                    src={logo.src}
                                    alt={logo.alt}
                                    style={{
                                        height: '40px',
                                        width: 'auto',
                                        filter: 'grayscale(100%)',
                                        opacity: '0.7',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.filter = 'grayscale(0%)';
                                        e.target.style.opacity = '1';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.filter = 'grayscale(100%)';
                                        e.target.style.opacity = '0.7';
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

export default LogoMarquee;
