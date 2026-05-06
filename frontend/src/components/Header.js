import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { PAY_NOW_LINKS } from '../config';
import './Header.css';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { cartItems, cartCount, removeFromCart, getCartTotal, addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Trigger initial rotation when component mounts
  React.useEffect(() => {
    setHasLoaded(true);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // const toggleCart = () => {
  //   setShowCart(!showCart);
  // };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Handle search functionality
      console.log('Searching for:', e.target.value);
      setShowSearch(false);
    }
  };

  const handleLMSLogin = () => {
    window.open('https://learn.shefsolutionsllc.com/login/index.php', '_blank', 'noopener,noreferrer');
  };

  const handleLoginRegister = () => {
    navigate('/login');
  };

  const handleProgramCheckout = (programName, price, duration) => {
    const nameMap = {
      'Data Science & AI': 'Data Science and AI Program',
      'Cyber Security & Ethical Hacking': 'Cyber Security and Ethical Hacking Program',
      'DevOps & Cloud Computing': 'DevOps and Cloud Computing Program'
    };
    const programInfo = {
      name: nameMap[programName] || programName,
      price: '2999.00',
      duration: duration || '6 Months',
      type: 'full_program'
    };
    const added = addToCart(programInfo);
    if (added) navigate('/checkout');
  };

  // 6 registration options: left = program $99, right = one-to-one $499
  const REGISTER_LEFT = [
    { name: 'Registration fee for Data Science and AI Program', price: '99.00', duration: '6 Months', type: 'registration' },
    { name: 'Registration fee for Cyber Security and Ethical Hacking Program', price: '99.00', duration: '6 Months', type: 'registration' },
    { name: 'Registration fee for DevOps and Cloud Computing Program', price: '99.00', duration: '6 Months', type: 'registration' },
  ];
  const REGISTER_RIGHT = [
    { name: 'Registration fee for Data Science and AI Short Term Program', price: '499.00', duration: 'Short Term', type: 'registration' },
    { name: 'Registration fee for Cyber Security and Ethical Hacking Short Term Program', price: '499.00', duration: 'Short Term', type: 'registration' },
    { name: 'Registration fee for DevOps and Cloud Computing Short Term Program', price: '499.00', duration: 'Short Term', type: 'registration' },
  ];
  const handleRegisterOption = (item) => {
    const added = addToCart(item);
    if (added) navigate('/checkout');
  };

  console.log('Header rendering, current path:', location.pathname);

  return (
    <header className="header">
      {/* Announcement Section - Redesigned */}
      <div style={{
        background: '#000000',
        width: '100%',
        padding: '8px 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: window.innerWidth <= 768 ? '0 15px' : '0 20px',
          display: window.innerWidth <= 576 ? 'block' : 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: window.innerWidth <= 576 ? '10px' : '0'
        }}>
          <div className="contact-info" style={{
            display: window.innerWidth <= 576 ? 'block' : 'flex',
            gap: window.innerWidth <= 576 ? '15px' : '30px',
            alignItems: window.innerWidth <= 576 ? 'flex-start' : 'center',
            textAlign: window.innerWidth <= 576 ? 'center' : 'left'
          }}>
            <a href="tel:+18888102434" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'rgba(40, 167, 69, 0.1)',
              border: '1px solid rgba(40, 167, 69, 0.3)'
            }}>
              <i className="fas fa-phone" style={{
                color: '#28a745',
                fontSize: '12px'
              }}></i>
              <span>+1 (888) 810-2434</span>
            </a>
            <a href="mailto:info@skystates.com" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'rgba(0, 123, 255, 0.1)',
              border: '1px solid rgba(0, 123, 255, 0.3)'
            }}>
              <i className="fas fa-envelope" style={{
                color: '#007bff',
                fontSize: '12px'
              }}></i>
              <span>info@skystates.com</span>
            </a>
          </div>
          <div className="auth-links" style={{
            display: window.innerWidth <= 576 ? 'block' : 'flex',
            gap: window.innerWidth <= 576 ? '10px' : '12px',
            alignItems: window.innerWidth <= 576 ? 'stretch' : 'center',
            textAlign: 'center'
          }}>
            <Link to="/login" className="login-btn" style={{
                color: 'white',
                padding: '6px 14px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                cursor: 'pointer'
              }}>
                Login
              </Link>
              <Link to="/sign-up" style={{
                color: 'white',
                padding: '6px 14px',
                border: '1px solid rgba(40, 167, 69, 0.5)',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '500',
                background: 'rgba(40, 167, 69, 0.2)',
                cursor: 'pointer'
              }}>
                Register
              </Link>
            <button onClick={handleLMSLogin} className="lms-btn" style={{
              background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
              color: 'white',
              padding: '6px 14px',
              border: 'none',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
            }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgb(25, 69, 196) 0%, rgb(26, 58, 164) 50%, rgb(20, 33, 74) 100%)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(-2px)';
              }}>
              LMS Login
            </button>
          </div>
        </div>
      </div>

      {/* Modern Full-Width Navigation */}
      <motion.nav 
        className="main-nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          padding: '0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'relative'
        }}
      >
        {/* Animated Background Pattern - Equal Width */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%)',
          animation: 'shimmer 3s infinite',
          width: '100%'
        }} />
        
        {/* Main Content Container - Equal Width */}
        <div style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Enhanced Brand - 50% Width */}
          <motion.div 
            className="nav-brand"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ 
              width: '50%',
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <h1 style={{ margin: 0, padding: '15px 0' }}>
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ 
                  rotateY: hasLoaded ? 360 : 0,
                  rotateX: isHovered ? 10 : 0
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                whileHover={{
                  rotateX: 10,
                  scale: 1.1,
                  textShadow: '0 0 20px rgba(255,255,255,0.5)'
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                style={{ 
                  display: 'inline-block',
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer'
                }}
              >
                <Link to="/" style={{ 
                  textDecoration: 'none', 
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: '700',
                  letterSpacing: '1px'
                }}>
                  Sky States
                </Link>
              </motion.div>
            </h1>
          </motion.div>

          {/* Navigation Menu - Equal Spacing + Left Shift */}
          <motion.ul 
            className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: window.innerWidth <= 768 ? 'none' : 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              alignItems: 'center',
              width: '50%',
              justifyContent: 'space-evenly',
              position: 'relative',
              right: '20%'
            }}
          >
            {/* Home */}
            <motion.li
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/" 
                  className={location.pathname === '/' ? 'active' : ''}
                  style={{
                    color: location.pathname === '/' ? '#007bff' : '#ffffff',
                    textDecoration: 'none',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    display: 'block',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    background: location.pathname === '/' ? 'rgba(0,123,255,0.1)' : 'transparent',
                    border: location.pathname === '/' ? '1px solid rgba(0,123,255,0.3)' : '1px solid transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Home
                </Link>
              </motion.div>
            </motion.li>

            {/* Live Job */}
            <motion.li
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/jobs" 
                  className={location.pathname === '/jobs' ? 'active' : ''}
                  style={{
                    color: location.pathname === '/jobs' ? '#007bff' : '#ffffff',
                    textDecoration: 'none',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    display: 'block',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    background: location.pathname === '/jobs' ? 'rgba(0,123,255,0.1)' : 'transparent',
                    border: location.pathname === '/jobs' ? '1px solid rgba(0,123,255,0.3)' : '1px solid transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Live Job
                </Link>
              </motion.div>
            </motion.li>

            {/* Program Dropdown */}
            <motion.li
              className="dropdown"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onHoverStart={() => setActiveDropdown('program')}
              onHoverEnd={() => setActiveDropdown(null)}
              style={{ position: 'relative' }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#" 
                  className="dropdown-toggle"
                  style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Program 
                  <motion.svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    animate={{ rotate: activeDropdown === 'program' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
                  >
                    <path d="m6 9 6 6 6-6" stroke="url(#chevronGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="chevronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#667eea"/>
                        <stop offset="100%" stopColor="#764ba2"/>
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </a>
              </motion.div>
              
              <AnimatePresence>
                {activeDropdown === 'program' && (
                  <motion.ul
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      background: 'rgba(26, 26, 46, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      padding: '10px 0',
                      minWidth: '250px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      listStyle: 'none',
                      margin: 0,
                      zIndex: 9999
                    }}
                  >
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link 
                        to="/product/data-science-ai-program"
                        style={{
                          color: '#ffffff',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(0,123,255,0.1)';
                          e.target.style.paddingLeft = '25px';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '20px';
                        }}
                      >
                        Data Science And AI
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link 
                        to="/product/cyber-security-and-ethical-hacking-program"
                        style={{
                          color: '#ffffff',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(0,123,255,0.1)';
                          e.target.style.paddingLeft = '25px';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '20px';
                        }}
                      >
                        Cyber Security And Ethical Hacking
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link 
                        to="/product/devops-and-cloud-computing-program"
                        style={{
                          color: '#ffffff',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(0,123,255,0.1)';
                          e.target.style.paddingLeft = '25px';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '20px';
                        }}
                      >
                        DevOps & Cloud Computing
                      </Link>
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>

            {/* One To One Dropdown */}
            <motion.li
              className="dropdown"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onHoverStart={() => setActiveDropdown('onetoone')}
              onHoverEnd={() => setActiveDropdown(null)}
              style={{ position: 'relative' }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#" 
                  className="dropdown-toggle"
                  style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  One To One 
                  <motion.svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    animate={{ rotate: activeDropdown === 'onetoone' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
                  >
                    <path d="m6 9 6 6 6-6" stroke="url(#chevronGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </a>
              </motion.div>
              
              <AnimatePresence>
                {activeDropdown === 'onetoone' && (
                  <motion.ul
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      background: 'rgba(26, 26, 46, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      padding: '10px 0',
                      minWidth: '250px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      listStyle: 'none',
                      margin: 0,
                      zIndex: 9999
                    }}
                  >
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link 
                        to="/product/data-science-ai-short-term-program"
                        style={{
                          color: '#ffffff',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(0,123,255,0.1)';
                          e.target.style.paddingLeft = '25px';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '20px';
                        }}
                      >
                        Data Science & AI Short Term Program
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link 
                        to="/product/cyber-security-and-ethical-hacking-short-term-program"
                        style={{
                          color: '#ffffff',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(0,123,255,0.1)';
                          e.target.style.paddingLeft = '25px';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '20px';
                        }}
                      >
                        Cyber Security And Ethical Hacking Short Term
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link 
                        to="/product/devops-and-cloud-computing-short-term-program"
                        style={{
                          color: '#ffffff',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(0,123,255,0.1)';
                          e.target.style.paddingLeft = '25px';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '20px';
                        }}
                      >
                        DevOps & Cloud Computing Short Term Program
                      </Link>
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>

            {/* Register now – dropdown: left 3 program $99, right 3 one-to-one $499 */}
            <motion.li
              className="dropdown"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onHoverStart={() => setActiveDropdown('register')}
              onHoverEnd={() => setActiveDropdown(null)}
              style={{ position: 'relative' }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className="dropdown-toggle"
                  style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Register now
                  <motion.svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    animate={{ rotate: activeDropdown === 'register' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
                  >
                    <path d="m6 9 6 6 6-6" stroke="url(#chevronGradientReg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="chevronGradientReg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#667eea"/>
                        <stop offset="100%" stopColor="#764ba2"/>
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
              </motion.div>

              <AnimatePresence>
                {activeDropdown === 'register' && (
                  <motion.div
                    className="dropdown-menu register-dropdown"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '4px',
                      background: 'rgba(26, 26, 46, 0.98)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      padding: '16px 12px',
                      width: '420px',
                      maxWidth: '90vw',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      listStyle: 'none',
                      margin: 0,
                      zIndex: 9999,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '20px 24px'
                    }}
                  >
                    <div style={{ borderRight: '1px solid rgba(255,255,255,0.15)', paddingRight: '16px' }}>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Program — $99</div>
                      {REGISTER_LEFT.map((item, idx) => (
                        <motion.div key={idx} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                          <button
                            type="button"
                            onClick={() => handleRegisterOption(item)}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              color: '#ffffff',
                              textDecoration: 'none',
                              padding: '10px 14px',
                              display: 'block',
                              transition: 'all 0.3s ease',
                              fontSize: '13px',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              borderRadius: '8px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(0,123,255,0.15)';
                              e.currentTarget.style.paddingLeft = '18px';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.paddingLeft = '14px';
                            }}
                          >
                            {item.name.replace('Registration fee for ', '').replace(' Program', '')}
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', display: 'block', marginTop: '2px' }}>${item.price} · {item.duration}</span>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>One-to-One — $499</div>
                      {REGISTER_RIGHT.map((item, idx) => (
                        <motion.div key={idx} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                          <button
                            type="button"
                            onClick={() => handleRegisterOption(item)}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              color: '#ffffff',
                              textDecoration: 'none',
                              padding: '10px 14px',
                              display: 'block',
                              transition: 'all 0.3s ease',
                              fontSize: '13px',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              borderRadius: '8px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(0,123,255,0.15)';
                              e.currentTarget.style.paddingLeft = '18px';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.paddingLeft = '14px';
                            }}
                          >
                            {item.name.replace('Registration fee for ', '').replace(' Short Term Program', '')}
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', display: 'block', marginTop: '2px' }}>${item.price} · {item.duration}</span>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            {/* Pay Now – Partner EMI's 1, 2, 3, 4 (links from config / .env) */}
            <motion.li
              className="dropdown"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onHoverStart={() => setActiveDropdown('paynow')}
              onHoverEnd={() => setActiveDropdown(null)}
              style={{ position: 'relative' }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span 
                  className="dropdown-toggle"
                  style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Pay Now 
                  <motion.svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    animate={{ rotate: activeDropdown === 'paynow' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
                  >
                    <path d="m6 9 6 6 6-6" stroke="url(#chevronGradientPay)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="chevronGradientPay" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#667eea"/>
                        <stop offset="100%" stopColor="#764ba2"/>
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
              </motion.div>
              
              <AnimatePresence>
                {activeDropdown === 'paynow' && (
                  <motion.ul
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      background: 'rgba(26, 26, 46, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      padding: '10px 0',
                      minWidth: '220px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      listStyle: 'none',
                      margin: 0,
                      zIndex: 9999
                    }}
                  >
                    {PAY_NOW_LINKS.map((item, idx) => (
                      <motion.li key={idx} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <a 
                          href={item.url}
                          target={item.url && item.url !== '#' ? '_blank' : undefined}
                          rel={item.url && item.url !== '#' ? 'noopener noreferrer' : undefined}
                          style={{
                            color: '#ffffff',
                            textDecoration: 'none',
                            padding: '12px 20px',
                            display: 'block',
                            transition: 'all 0.3s ease',
                            fontSize: '14px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(0,123,255,0.1)';
                            e.target.style.paddingLeft = '25px';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.paddingLeft = '20px';
                          }}
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>

            {/* Cart – click only; dropdown opens below icon only when cart icon is clicked */}
            <motion.li
              style={{ position: 'relative' }}
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                onClick={() => setShowCart(prev => !prev)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  padding: '15px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  fontSize: '22px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🛒
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    background: '#dc3545',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '600',
                    minWidth: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px'
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {showCart && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setShowCart(false)}
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.3)',
                        zIndex: 9998
                      }}
                    />
                    <motion.div
                      className="cart-dropdown"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'fixed',
                        top: '72px',
                        right: '20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '16px',
                        padding: '1.25rem 1.5rem',
                        width: '360px',
                        maxWidth: 'calc(100vw - 40px)',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        zIndex: 9999
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>🛒 Cart</h2>
                        <button type="button" onClick={() => setShowCart(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '4px 10px', borderRadius: '8px' }}>✕</button>
                      </div>
                      {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '1.5rem', color: '#fff' }}>
                          <p style={{ margin: 0, opacity: 0.9 }}>Your cart is empty</p>
                          <p style={{ margin: '8px 0 0', fontSize: '0.9rem', opacity: 0.8 }}>Add courses to get started</p>
                        </div>
                      ) : (
                        <>
                          <div className="cart-items">
                            {cartItems.map((item, index) => (
                              <div key={index} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '0.75rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>{item.name}</div>
                                  <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>{item.duration}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ color: '#fff', fontWeight: '600' }}>{item.price}</div>
                                  <button type="button" onClick={() => removeFromCart(item.id)} style={{ background: 'rgba(255,107,107,0.3)', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', marginTop: '4px' }}>Remove</button>
                                </div>
                              </div>
                            ))}
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem', marginTop: '0.5rem', textAlign: 'right', color: '#fff', fontWeight: '600' }}>Total: ${getCartTotal().toFixed(2)}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                            <button type="button" onClick={() => setShowCart(false)} style={{ flex: 1, padding: '0.75rem', border: '1px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#fff', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Continue</button>
                            <button type="button" onClick={() => { navigate('/checkout'); setShowCart(false); }} style={{ flex: 1, padding: '0.75rem', border: 'none', background: 'linear-gradient(45deg, #28a745, #20c997)', color: '#fff', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Checkout</button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.li>
          </motion.ul>

          {/* Mobile Menu Toggle */}
          <motion.div 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              display: window.innerWidth <= 768 ? 'block' : 'none',
              color: '#ffffff',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '15px'
            }}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </motion.div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={toggleMobileMenu}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 9998
                }}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  width: '80%',
                  maxWidth: '400px',
                  height: '100vh',
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  zIndex: 9999,
                  overflowY: 'auto',
                  boxShadow: '-5px 0 20px rgba(0,0,0,0.3)'
                }}
              >
                {/* Mobile Menu Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h2 style={{
                    color: '#ffffff',
                    fontSize: '20px',
                    fontWeight: '600',
                    margin: 0
                  }}>Menu</h2>
                  <motion.button
                    onClick={toggleMobileMenu}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '24px',
                      cursor: 'pointer',
                      padding: '5px'
                    }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Mobile Navigation Items: Home, Live Job, Program, One to One, Register now, Pay Now, Cart */}
                <div style={{ padding: '20px' }}>
                  <Link to="/" onClick={toggleMobileMenu} style={{ display: 'block', color: '#ffffff', fontSize: '16px', fontWeight: '500', padding: '15px 0', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Home</Link>
                  <Link to="/jobs" onClick={toggleMobileMenu} style={{ display: 'block', color: '#ffffff', fontSize: '16px', fontWeight: '500', padding: '15px 0', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Live Job</Link>

                  {/* Program (expandable) */}
                  <div style={{ marginBottom: '0' }}>
                    <motion.div onClick={() => setActiveDropdown(activeDropdown === 'program-mobile' ? null : 'program-mobile')} style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span>Program</span>
                      <span>{activeDropdown === 'program-mobile' ? '−' : '+'}</span>
                    </motion.div>
                    <AnimatePresence>
                      {activeDropdown === 'program-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ paddingLeft: '20px' }}>
                          <Link to="/product/data-science-ai-program" onClick={toggleMobileMenu} style={{ display: 'block', color: 'rgba(255,255,255,0.9)', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>Data Science And AI</Link>
                          <Link to="/product/cyber-security-and-ethical-hacking-program" onClick={toggleMobileMenu} style={{ display: 'block', color: 'rgba(255,255,255,0.9)', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>Cyber Security And Ethical Hacking</Link>
                          <Link to="/product/devops-and-cloud-computing-program" onClick={toggleMobileMenu} style={{ display: 'block', color: 'rgba(255,255,255,0.9)', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>DevOps & Cloud Computing</Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* One to One (expandable) */}
                  <div style={{ marginBottom: '0' }}>
                    <motion.div onClick={() => setActiveDropdown(activeDropdown === 'onetoone-mobile' ? null : 'onetoone-mobile')} style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span>One to One</span>
                      <span>{activeDropdown === 'onetoone-mobile' ? '−' : '+'}</span>
                    </motion.div>
                    <AnimatePresence>
                      {activeDropdown === 'onetoone-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ paddingLeft: '20px' }}>
                          <Link to="/product/data-science-ai-short-term-program" onClick={toggleMobileMenu} style={{ display: 'block', color: 'rgba(255,255,255,0.9)', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>Data Science & AI Short Term</Link>
                          <Link to="/product/cyber-security-and-ethical-hacking-short-term-program" onClick={toggleMobileMenu} style={{ display: 'block', color: 'rgba(255,255,255,0.9)', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>Cyber Security Short Term</Link>
                          <Link to="/product/devops-and-cloud-computing-short-term-program" onClick={toggleMobileMenu} style={{ display: 'block', color: 'rgba(255,255,255,0.9)', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>DevOps & Cloud Computing Short Term</Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Register now – 6 options (3 program $99, 3 one-to-one $499) */}
                  <div style={{ marginBottom: '0' }}>
                    <motion.div onClick={() => setActiveDropdown(activeDropdown === 'register-mobile' ? null : 'register-mobile')} style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span>Register now</span>
                      <span>{activeDropdown === 'register-mobile' ? '−' : '+'}</span>
                    </motion.div>
                    <AnimatePresence>
                      {activeDropdown === 'register-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ paddingLeft: '16px' }}>
                          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '8px', marginBottom: '4px' }}>Program — $99</div>
                          {REGISTER_LEFT.map((item, idx) => (
                            <button key={`l-${idx}`} type="button" onClick={() => { handleRegisterOption(item); toggleMobileMenu(); }} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'rgba(255,255,255,0.95)', padding: '10px 0', fontSize: '14px', cursor: 'pointer', textDecoration: 'none' }}>{item.name.replace('Registration fee for ', '').replace(' Program', '')} — $99</button>
                          ))}
                          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '12px', marginBottom: '4px' }}>One-to-One — $499</div>
                          {REGISTER_RIGHT.map((item, idx) => (
                            <button key={`r-${idx}`} type="button" onClick={() => { handleRegisterOption(item); toggleMobileMenu(); }} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'rgba(255,255,255,0.95)', padding: '10px 0', fontSize: '14px', cursor: 'pointer', textDecoration: 'none' }}>{item.name.replace('Registration fee for ', '').replace(' Short Term Program', '')} — $499</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Pay Now – Partner EMI's 1–4 */}
                  <div style={{ marginBottom: '0' }}>
                    <motion.div onClick={() => setActiveDropdown(activeDropdown === 'paynow-mobile' ? null : 'paynow-mobile')} style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span>Pay Now</span>
                      <span>{activeDropdown === 'paynow-mobile' ? '−' : '+'}</span>
                    </motion.div>
                    <AnimatePresence>
                      {activeDropdown === 'paynow-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ paddingLeft: '20px' }}>
                          {PAY_NOW_LINKS.map((item, idx) => (
                            <a key={idx} href={item.url} target={item.url && item.url !== '#' ? '_blank' : undefined} rel={item.url && item.url !== '#' ? 'noopener noreferrer' : undefined} onClick={toggleMobileMenu} style={{ display: 'block', color: 'rgba(255,255,255,0.9)', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>{item.label}</a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button type="button" onClick={() => { setShowCart(true); toggleMobileMenu(); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#ffffff', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🛒 Cart {cartCount > 0 && `(${cartCount})`}
                  </motion.button>

                  <Link to="/refund-returns" onClick={toggleMobileMenu} style={{ display: 'block', color: '#ffffff', fontSize: '16px', fontWeight: '500', padding: '15px 0', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Refund and Returns Policy</Link>

                  {/* Auth Buttons */}
                  <div style={{
                    marginTop: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    <motion.button
                      onClick={() => {
                        handleLoginRegister();
                        toggleMobileMenu();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                        color: 'white',
                        padding: '15px 20px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Login/Register
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        handleLMSLogin();
                        toggleMobileMenu();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: 'linear-gradient(135deg, #28a745, #20c997)',
                        color: 'white',
                        padding: '15px 20px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      LMS Login
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              className="search-bar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: 'absolute',
                top: '100%',
                right: '20px',
                background: 'rgba(26, 26, 46, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                zIndex: 9999,
                minWidth: '300px'
              }}
            >
              <input
                type="text"
                placeholder="Search courses, programs..."
                onKeyDown={handleSearch}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  outline: 'none'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </header>
  );
};

export default Header;
