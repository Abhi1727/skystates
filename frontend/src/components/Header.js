import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { cartItems, cartCount, removeFromCart, getCartTotal } = useCart();
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
    const programInfo = {
      name: programName,
      price: price,
      duration: duration
    };
    navigate('/checkout', { state: { program: programInfo } });
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
            <SignedOut>
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
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard" style={{
                color: 'white',
                padding: '6px 12px',
                fontSize: '13px',
                fontWeight: '500',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
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

            {/* Register Now Dropdown - COMMENTED OUT */}
            {/*
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
                    background: 'linear-gradient(45deg, #007bff, #0056b3)',
                    border: '1px solid rgba(0,123,255,0.3)'
                  }}
                >
                  Register Now 
                  <motion.i 
                    className="fas fa-chevron-down"
                    animate={{ rotate: activeDropdown === 'register' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '12px' }}
                  />
                </a>
              </motion.div>
              
              <AnimatePresence>
                {activeDropdown === 'register' && (
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
                      <a 
                        href="#"
                        onClick={() => handleProgramCheckout('Data Science & AI', '$2,999', '6 Months')}
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
                        Data Science & AI
                      </a>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <a 
                        href="#"
                        onClick={() => handleProgramCheckout('Cyber Security & Ethical Hacking', '$2,999', '6 Months')}
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
                        Cyber Security & Ethical Hacking
                      </a>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <a 
                        href="#"
                        onClick={() => handleProgramCheckout('DevOps & Cloud Computing', '$2,999', '6 Months')}
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
                        DevOps & Cloud
                      </a>
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
            */}

            {/* More Dropdown */}
            <motion.li
              className="dropdown"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onHoverStart={() => setActiveDropdown('more')}
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
                  More 
                  <motion.svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    animate={{ rotate: activeDropdown === 'more' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
                  >
                    <path d="m6 9 6 6 6-6" stroke="url(#chevronGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </a>
              </motion.div>
              
              <AnimatePresence>
                {activeDropdown === 'more' && (
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
                      minWidth: '200px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      listStyle: 'none',
                      margin: 0,
                      zIndex: 9999
                    }}
                  >
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <a 
                        href="#"
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
                        Partner EMIs
                      </a>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link 
                        to="/refund-returns"
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
                        Refund and Returns Policy
                      </Link>
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>

            {/* Cart Icon */}
            <motion.li
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                onClick={() => setShowCart(true)}
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

                {/* Mobile Navigation Items */}
                <div style={{
                  padding: '20px'
                }}>
                  {/* Programs Dropdown */}
                  <div style={{ marginBottom: '20px' }}>
                    <motion.div
                      onClick={() => setActiveDropdown(activeDropdown === 'register-mobile' ? null : 'register-mobile')}
                      whileHover={{ x: 5 }}
                      style={{
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: '500',
                        padding: '15px 0',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <span>Programs</span>
                      <span>{activeDropdown === 'register-mobile' ? '−' : '+'}</span>
                    </motion.div>
                    
                    <AnimatePresence>
                      {activeDropdown === 'register-mobile' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ paddingLeft: '20px' }}
                        >
                          <motion.a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleProgramCheckout('Data Science & AI', '$2,999', '6 Months');
                              toggleMobileMenu();
                            }}
                            whileHover={{ x: 5 }}
                            style={{
                              display: 'block',
                              color: '#ffffff',
                              padding: '12px 0',
                              fontSize: '14px',
                              opacity: 0.8,
                              textDecoration: 'none'
                            }}
                          >
                            Data Science & AI
                          </motion.a>
                          <motion.a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleProgramCheckout('Cyber Security & Ethical Hacking', '$2,999', '6 Months');
                              toggleMobileMenu();
                            }}
                            whileHover={{ x: 5 }}
                            style={{
                              display: 'block',
                              color: '#ffffff',
                              padding: '12px 0',
                              fontSize: '14px',
                              opacity: 0.8,
                              textDecoration: 'none'
                            }}
                          >
                            Cyber Security & Ethical Hacking
                          </motion.a>
                          <motion.a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleProgramCheckout('DevOps & Cloud Computing', '$2,999', '6 Months');
                              toggleMobileMenu();
                            }}
                            whileHover={{ x: 5 }}
                            style={{
                              display: 'block',
                              color: '#ffffff',
                              padding: '12px 0',
                              fontSize: '14px',
                              opacity: 0.8,
                              textDecoration: 'none'
                            }}
                          >
                            DevOps & Cloud Computing
                          </motion.a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Other Navigation Items */}
                  <motion.a
                    href="/about"
                    onClick={toggleMobileMenu}
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'block',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: '500',
                      padding: '15px 0',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    About Us
                  </motion.a>

                  <motion.a
                    href="/how-it-works"
                    onClick={toggleMobileMenu}
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'block',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: '500',
                      padding: '15px 0',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    How It Works
                  </motion.a>

                  <motion.a
                    href="/contact"
                    onClick={toggleMobileMenu}
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'block',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: '500',
                      padding: '15px 0',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    Contact
                  </motion.a>

                  <motion.a
                    href="/refund-returns"
                    onClick={toggleMobileMenu}
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'block',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: '500',
                      padding: '15px 0',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    Refund Policy
                  </motion.a>

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

        {/* Shopping Cart Modal */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              className="cart-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <motion.div
                className="cart-modal"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px',
                  padding: '2rem',
                  width: '90%',
                  maxWidth: '500px',
                  maxHeight: '80vh',
                  overflow: 'auto',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div className="cart-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h2 style={{
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    🛒 Shopping Cart
                  </h2>
                  <button 
                    onClick={() => setShowCart(false)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.2)';
                      e.target.style.transform = 'rotate(90deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                      e.target.style.transform = 'rotate(0deg)';
                    }}
                  >
                    ✕
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <div className="empty-cart" style={{
                    textAlign: 'center',
                    padding: '3rem 1rem',
                    color: '#ffffff'
                  }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your cart is empty</h3>
                    <p style={{ opacity: 0.8, margin: 0 }}>Add some courses to get started!</p>
                  </div>
                ) : (
                  <div className="cart-items">
                    {cartItems.map((item, index) => (
                      <div key={index} className="cart-item" style={{
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <h4 style={{ color: '#ffffff', margin: '0 0 0.5rem 0' }}>{item.name}</h4>
                          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.9rem' }}>{item.duration}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ color: '#ffffff', fontWeight: '600', margin: 0 }}>{item.price}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              background: 'rgba(255,107,107,0.2)',
                              border: '1px solid rgba(255,107,107,0.5)',
                              color: '#ffffff',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              marginTop: '0.5rem'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="cart-total" style={{
                      borderTop: '1px solid rgba(255,255,255,0.2)',
                      paddingTop: '1rem',
                      marginTop: '1rem',
                      textAlign: 'right'
                    }}>
                      <h3 style={{ color: '#ffffff', margin: 0 }}>
                        Total: ${getCartTotal().toFixed(2)}
                      </h3>
                    </div>
                  </div>
                )}

                <div className="cart-actions" style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '1.5rem'
                }}>
                  <button 
                    onClick={() => setShowCart(false)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: '1px solid rgba(255,255,255,0.3)',
                      background: 'transparent',
                      color: '#ffffff',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    Continue Shopping
                  </button>
                  {cartItems.length > 0 && (
                    <button 
                      onClick={() => {
                        navigate('/checkout');
                        setShowCart(false);
                      }}
                      style={{
                        flex: 1,
                        padding: '1rem',
                        border: 'none',
                        background: 'linear-gradient(45deg, #28a745, #20c997)',
                        color: '#ffffff',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Checkout
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Header;
