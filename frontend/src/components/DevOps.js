import React from 'react';

const DevOps = () => {
  return (
    <div className="product-page">
      {/* Product Hero Section */}
      <section className="product-hero" style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>
            DevOps & Cloud Computing Program
          </h1>
          <p style={{ fontSize: '20px', opacity: '0.9', maxWidth: '800px', margin: '0 auto' }}>
            Master the art of DevOps and cloud technologies with Microsoft Azure certification in just 6 months
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="why-join" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Why Join this Program
          </h2>
          
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
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fab fa-microsoft"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Microsoft Advantage
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Leverage the power of Microsoft tools and technologies. Gain professional-level training, 
                demonstrate your technical expertise, and earn an employer-recognized Azure DevOps certification from Microsoft.
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
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-infinity"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                DevOps Mastery
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Live sessions on cutting-edge DevOps practices, CI/CD pipelines, Kubernetes, cloud infrastructure, 
                and automation tools. Learn how to bridge the gap between development and operations effectively.
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
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Applied Learning
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Our DevOps training program provides live online classes led by industry experts, focusing on 
                real-world scenarios. Hands-on projects and case studies ensure practical learning and job readiness.
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
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                <i className="fas fa-briefcase"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Placement Support
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Receive 100% placement assistance through our dedicated in-house recruitment team. 
                With a network of over 250+ hiring partners, we proudly maintain an 80% successful placement rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="program-overview" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            DevOps Training Program Overview
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
              Ready to launch your career in DevOps? You're in the right place! Our company offers top-notch training 
              in this rapidly growing field through a comprehensive 6-month program designed to turn you into a 
              job-ready DevOps expert.
            </p>
            <p>
              Learn from seasoned professionals, gain hands-on experience with real-world tools, and get fully 
              prepared to meet industry demands. As a bonus, you'll also earn a Microsoft Azure DevOps certification—officially 
              backed by Microsoft—to give you a competitive edge in the job market.
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
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Industry-recognized certificate
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Advanced DevOps and Cloud Computing certificate from Sky States
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
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Microsoft training
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  Professional-level training from Microsoft with Azure DevOps certification
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
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
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
              <i className="fas fa-check-circle" style={{ color: '#ff6b35', fontSize: '20px', marginTop: '2px' }}></i>
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

      {/* Industry Stats */}
      <section className="industry-stats" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            Join the Thriving DevOps Industry
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
              DevOps and Cloud Computing roles are in high demand, as organizations increasingly adopt these technologies 
              to enhance scalability, automate workflows, and improve deployment speed. The global DevOps market is projected 
              to grow from USD 10.4 billion in 2024 to USD 25.3 billion by 2029, reflecting a robust 19.7% CAGR.
            </p>
            <p>
              Simultaneously, the cloud computing market is set to surge from USD 626.4 billion in 2024 to over USD 1.5 trillion 
              by 2029, with a CAGR of 19.3%. These trends underscore the rapid expansion and immense career potential in this dynamic field.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#ff6b35', marginBottom: '10px' }}>
                $25.3B
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                DevOps Market by 2029
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                From $10.4B in 2024
              </p>
            </div>

            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#ff6b35', marginBottom: '10px' }}>
                $1.5T
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Cloud Market by 2029
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                From $626.4B in 2024
              </p>
            </div>

            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#ff6b35', marginBottom: '10px' }}>
                19.7%
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                DevOps CAGR
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Compound annual growth rate
              </p>
            </div>

            <div className="stat-card" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#ff6b35', marginBottom: '10px' }}>
                $185K
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Senior Level Salary
              </h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                $185K/yr – $263K/yr
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="career-paths" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
            What Can I Become?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              'DevOps Engineer',
              'Site Reliability Engineer',
              'Cloud Engineer',
              'Automation Engineer',
              'Continuous Integration Engineer',
              'Infrastructure Engineer',
              'Kubernetes Expert',
              'DevOps Architect'
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
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px'
                }}>
                  <i className="fas fa-cloud"></i>
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
      <section className="pricing" style={{ padding: '80px 0' }}>
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
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#ff6b35', marginBottom: '10px' }}>
                  $99
                </h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>
                  Registration Fee
                </p>
                <button style={{
                  background: '#ff6b35',
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
                background: '#ff6b35',
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

export default DevOps;
