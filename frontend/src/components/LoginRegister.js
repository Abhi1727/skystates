import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      // User is already logged in, redirect to admin or home
      const userData = JSON.parse(user);
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      if (isLogin) {
        // Handle login
        const response = await fetch(`${apiBase}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (data.success) {
          // Store token and user data in localStorage
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          
          // Redirect based on user role
          if (data.data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
          
          alert('Login successful! Welcome back to Sky States.');
        } else {
          setError(data.message || 'Login failed');
        }
      } else {
        // Handle registration
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match!');
          setLoading(false);
          return;
        }

        const registerResponse = await fetch(`${apiBase}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone
          })
        });

        const registerData = await registerResponse.json();

        if (registerData.success) {
          // Store token and user data in localStorage
          localStorage.setItem('token', registerData.data.token);
          localStorage.setItem('user', JSON.stringify(registerData.data.user));
          
          alert('Registration successful! Welcome to Sky States.');
          navigate('/');
        } else {
          setError(registerData.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
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
    setError('');
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
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
              {isLogin ? 'Login to Your Account' : 'Create New Account'}
            </h2>

            {/* Error Message */}
            {error && (
              <div style={{
                background: '#f8d7da',
                color: '#721c24',
                padding: '12px',
                borderRadius: '5px',
                marginBottom: '20px',
                textAlign: 'center',
                border: '1px solid #f5c6cb'
              }}>
                {error}
              </div>
            )}

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
                    fontSize: '16px',
                    boxSizing: 'border-box'
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
                    fontSize: '16px',
                    boxSizing: 'border-box'
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
                        fontSize: '16px',
                        boxSizing: 'border-box'
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
                        fontSize: '16px',
                        boxSizing: 'border-box'
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
                        fontSize: '16px',
                        boxSizing: 'border-box'
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
                        fontSize: '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? '#6c757d' : 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  width: '100%',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box'
                }}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
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
                  background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
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
