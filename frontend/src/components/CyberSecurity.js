import React from 'react';

const CyberSecurity = () => {
  return (
    <div className="product-page">
      {/* Product Hero Section */}
      <section className="product-hero" style={{
        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>
            Cyber Security & Ethical Hacking Program
          </h1>
          <p style={{ fontSize: '20px', opacity: '0.9', maxWidth: '800px', margin: '0 auto' }}>
            Master the art of protecting digital assets and become a certified cybersecurity professional in just 6 months
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Why Choose Sky States?
          </h2>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666',
            marginBottom: '50px'
          }}>
            <p style={{ marginBottom: '20px' }}>
              At SKY STATES, we equip you with the essential skills for a successful cybersecurity career through our 
              expertly crafted online learning program. Our flexible curriculum is designed with a blend of engaging 
              articles, instructional videos, and hands-on labs, all vetted by industry professionals to ensure you're 
              learning the latest in cybersecurity.
            </p>
            <p>
              Our support goes beyond coursework. You'll benefit from 1:1 mentorship with experienced industry mentors 
              and access to a diverse network of career coaches and student advisors. In just 6 months, you'll be 
              prepared to thrive in the cybersecurity field—and best of all, we'll assist you in landing your dream job.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="feature-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-clock"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Learn Online, Flexibly, and Fast
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Learn on your own schedule in just six months.
              </p>
            </div>

            <div className="feature-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Gain Real-World Cybersecurity Skills
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Test with a curriculum designed by cybersecurity experts.
              </p>
            </div>

            <div className="feature-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-user-tie"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Guidance from an Industry Mentor
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Meet regularly one-on-one with your cybersecurity expert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Cyber Security */}
      <section className="what-is-cybersecurity" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            What is Cyber Security?
          </h2>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666'
          }}>
            <p style={{ marginBottom: '20px' }}>
              Cybersecurity is the practice of protecting computers, servers, networks, and data from unauthorized access, 
              theft, and damage. It involves a range of strategies, technologies, and processes designed to safeguard 
              sensitive information and prevent cyber threats like hacking, malware, and phishing attacks.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Cybersecurity is essential for individuals, businesses, and governments to ensure the privacy and integrity 
              of digital information in our increasingly connected world.
            </p>
            <div style={{
              background: '#e3f2fd',
              padding: '20px',
              borderRadius: '10px',
              borderLeft: '4px solid #e74c3c'
            }}>
              <p style={{ margin: 0, fontWeight: '600', color: '#e74c3c' }}>
                Cybersecurity is one of the most in-demand fields. According to the Bureau of Labor Statistics (BLS), 
                cybersecurity roles are expected to increase by 33% by 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="career-opportunities" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Career Opportunities in Cybersecurity
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="career-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
                Information Security Analyst
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
                Monitor organization's networks for security breaches, investigate incidents, and maintain systems 
                to protect sensitive information.
              </p>
            </div>

            <div className="career-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-network-wired"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
                Network Engineer
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
                Install new IT equipment and software while ensuring business operations and the network remain 
                efficient and safe from cyber threats.
              </p>
            </div>

            <div className="career-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-user-shield"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
                Cybersecurity Analyst
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
                Proactively defend against online threats by investigating IT trends and suspicious activity, 
                and develop backup plans for security breaches.
              </p>
            </div>

            <div className="career-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-search"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
                Cybersecurity Specialist
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
                Focus on discovering weaknesses in software systems and networks and take preventive measures 
                to protect against malware, viruses, and hackers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="program-overview" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Cyber Security Program Overview
          </h2>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666'
          }}>
            <p style={{ marginBottom: '20px' }}>
              Our comprehensive curriculum covers essential tools and advanced topics like Network Security, 
              Cryptography, and Ethical Hacking. With the rising demand for cybersecurity professionals, 
              our course is designed to give you a competitive edge.
            </p>
            <p>
              In today's digital age, cybersecurity is more critical than ever. With the increasing frequency 
              of cyber threats, there is a high demand for skilled professionals who can safeguard organizations 
              against potential breaches. Our program is meticulously crafted to provide you with the essential 
              skills and knowledge to excel in this dynamic field.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="key-features" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Key Features
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#e74c3c', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  100% Job assistance
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Through our in-house recruitment agency with over 250 hiring partners
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#e74c3c', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Industry-recognized certificate
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Advanced Cyber Security & Ethical Hacking certificate from Sky States
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#e74c3c', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Capstone projects
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  From various domains and industry relevant projects
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#e74c3c', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Microsoft training
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Professional-level training from Microsoft with certification
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#e74c3c', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Integrated labs
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Hands-on learning experience with practical exercises
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#e74c3c', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Expert faculty
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Dedicated live sessions by faculty of industry experts
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#e74c3c', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Lifetime access
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Self-paced learning content through our Learning Management System
                </p>
              </div>
            </div>

            <div className="feature-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              padding: '20px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <i className="fas fa-check-circle" style={{ color: '#e74c3c', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Small batch sizes
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Personalized attention and tailored instruction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="career-paths" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            What Can I Become?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              'Ethical Hacker',
              'Cybersecurity Analyst',
              'Security Consultant',
              'Network Security Engineer',
              'Incident Response Analyst',
              'Security Architect',
              'Malware Analyst',
              'Penetration Tester'
            ].map((career, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 15px',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px'
                }}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0 }}>
                  {career}
                </h4>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              and many more career opportunities...
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#333', marginBottom: '20px' }}>
              $2,999
            </h2>
            <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
              inc. Taxes
            </p>
            
            <ul style={{ textAlign: 'left', marginBottom: '30px', color: '#666' }}>
              <li style={{ marginBottom: '10px' }}>Easy-EMI Options Available</li>
              <li style={{ marginBottom: '10px' }}>Book your seats for this Program for just $99</li>
              <li>Join along with your friends & get special discounts</li>
            </ul>
            
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#e74c3c', marginBottom: '10px' }}>
                  $99
                </h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>
                  Registration Fee
                </p>
                <button style={{
                  background: '#e74c3c',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}>
                  Register Now
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button style={{
                background: '#28a745',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}>
                <i className="fas fa-download" style={{ marginRight: '8px' }}></i>
                Download Brochure
              </button>
              <button style={{
                background: '#e74c3c',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}>
                <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
                Talk to Advisor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CyberSecurity;
