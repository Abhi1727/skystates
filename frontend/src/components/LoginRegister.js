import React, { useState } from 'react';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
      console.log('Login submitted:', { email: formData.email, password: formData.password });
      alert('Login successful! Welcome back to Sky States.');
    } else {
      // Handle registration
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Registration submitted:', formData);
      alert('Registration successful! Welcome to Sky States.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="login-register">
      {/* Hero Section */}
      <section className="page-hero" style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>
            {isLogin ? 'Login' : 'Register'}
          </h1>
          <p style={{ fontSize: '20px', opacity: '0.9', maxWidth: '800px', margin: '0 auto' }}>
            {isLogin 
              ? 'Welcome back! Please login to access your courses and continue your learning journey.'
              : 'Join Sky States today! Create an account to access our professional courses and start your career transformation.'
            }
          </p>
        </div>
      </section>

      {/* Login/Register Form */}
      <section className="form-section" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
              </div>

              {/* Registration Only Fields */}
              {!isLogin && (
                <>
                  {/* First Name */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your first name"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  {/* Last Name */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your last name"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Confirm your password"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  background: '#28a745',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background 0.3s'
                }}
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </form>

            {/* Toggle Between Login/Register */}
            <div style={{
              textAlign: 'center',
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #eee'
            }}>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                {isLogin 
                  ? "Don't have an account?" 
                  : "Already have an account?"
                }
              </p>
              <button
                onClick={toggleForm}
                style={{
                  background: 'transparent',
                  color: '#2c3e50',
                  padding: '10px 20px',
                  border: '2px solid #2c3e50',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </div>

            {/* Additional Options */}
            <div style={{
              textAlign: 'center',
              marginTop: '20px'
            }}>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                Or continue with:
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button style={{
                  background: '#4267B2',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  <i className="fab fa-google" style={{ marginRight: '8px' }}></i>
                  Google
                </button>
                <button style={{
                  background: '#1877F2',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  <i className="fab fa-facebook-f" style={{ marginRight: '8px' }}></i>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="help-section" style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                Need Help?
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                Our support team is here to help you with any questions or issues you may have.
              </p>
              <a href="tel:+18888102434" style={{
                display: 'inline-block',
                color: '#2c3e50',
                textDecoration: 'none',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
                (888) 810-2434
              </a>
              <br />
              <a href="mailto:info@skystates.us" style={{
                display: 'inline-block',
                color: '#2c3e50',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                <i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>
                info@skystates.us
              </a>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                Quick Links
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/" style={{ color: '#2c3e50', textDecoration: 'none' }}>Home</a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/jobs" style={{ color: '#2c3e50', textDecoration: 'none' }}>Live Jobs</a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/refund-returns" style={{ color: '#2c3e50', textDecoration: 'none' }}>Refund Policy</a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="https://learn.shefsolutionsllc.com/login/index.php" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ color: '#2c3e50', textDecoration: 'none' }}>
                    LMS Login
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                Why Join Sky States?
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666', textAlign: 'left' }}>
                <li style={{ marginBottom: '10px' }}>
                  <i className="fas fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i>
                  Industry-recognized certificates
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <i className="fas fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i>
                  Expert instructors
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <i className="fas fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i>
                  Job placement assistance
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <i className="fas fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i>
                  Flexible learning options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginRegister;
