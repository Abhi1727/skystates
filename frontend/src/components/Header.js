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
    window.open('https://learnwithus.sbs/login', '_blank', 'noopener,noreferrer');
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

      {/* Modern 3D Glassmorphism Navigation */}
      <motion.nav 
        className="main-nav nav-3d-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          padding: '0',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          position: 'relative',
          zIndex: 3
        }}
      >
        {/* Animated 3D Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)',
          animation: 'shimmer 6s infinite',
          width: '100%',
          opacity: 0.6
        }} />
        
        {/* Main Content Container - Responsive Flexbox Layout */}
        <div className="nav-container" style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          minHeight: '35px'
        }}>
          {/* Enhanced Brand - 10% Width */}
          <motion.div 
            className="nav-brand"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ 
              flex: '0 0 10%',
              display: 'flex',
              justifyContent: 'flex-start',
              minWidth: '120px'
            }}
          >
            <h1 style={{ margin: 0, padding: '7px 0' }}>
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
                <Link 
                  to="/" 
                  aria-label="Sky States Home"
                  className={location.pathname === '/' ? 'active' : ''}
                  style={{
                    color: location.pathname === '/' ? 'var(--nav-primary)' : 'var(--nav-text-primary)',
                    textDecoration: 'none',
                    fontSize: '28px',
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    background: 'linear-gradient(135deg, var(--nav-primary), var(--nav-secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = '2px solid var(--nav-primary)';
                    e.target.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = 'none';
                  }}
                >
                  Sky States
                </Link>
              </motion.div>
            </h1>
          </motion.div>

          {/* Navigation Menu - 80% Width */}
          <motion.ul 
            className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              alignItems: 'center',
              flex: '0 0 80%',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 4,
              gap: '8px'
            }}
          >
            {/* Home */}
            {/* <motion.li
              className="nav-item-3d"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link 
                  to="/" 
                  className={location.pathname === '/' ? 'active' : ''}
                  style={{
                    color: location.pathname === '/' ? 'var(--nav-primary)' : 'var(--nav-text-primary)',
                    textDecoration: 'none',
                    padding: '18px 24px',
                    borderRadius: '16px',
                    display: 'block',
                    fontWeight: '600',
                    transition: 'all 0.4s ease',
                    background: location.pathname === '/' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)' : 'transparent',
                    border: location.pathname === '/' ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transformStyle: 'preserve-3d',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/') {
                      e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)';
                      e.target.style.transform = 'translateY(-2px) rotateX(5deg)';
                      e.target.style.boxShadow = '0 8px 24px rgba(31, 38, 135, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/') {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0) rotateX(0deg)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  Home
                </Link>
              </motion.div>
            </motion.li> */}

            {/* Live Job */}
            <motion.li
              className="nav-item-3d"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link 
                  to="/jobs" 
                  aria-label="View Live Job Opportunities"
                  className={location.pathname === '/jobs' ? 'active' : ''}
                  style={{
                    color: location.pathname === '/jobs' ? 'var(--nav-primary)' : 'var(--nav-text-primary)',
                    textDecoration: 'none',
                    padding: '6px 8px',
                    borderRadius: '16px',
                    display: 'block',
                    fontWeight: '600',
                    transition: 'all 0.4s ease',
                    background: location.pathname === '/jobs' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)' : 'transparent',
                    border: location.pathname === '/jobs' ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transformStyle: 'preserve-3d',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    fontSize: '15px'
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = '2px solid var(--nav-primary)';
                    e.target.style.outlineOffset = '2px';
                    if (location.pathname !== '/jobs') {
                      e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)';
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = 'none';
                    if (location.pathname !== '/jobs') {
                      e.target.style.background = 'transparent';
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/jobs') {
                      e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)';
                      e.target.style.transform = 'translateY(-2px) rotateX(5deg)';
                      e.target.style.boxShadow = '0 8px 24px rgba(31, 38, 135, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/jobs') {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0) rotateX(0deg)';
                      e.target.style.boxShadow = 'none';
                    }
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
                    color: 'var(--nav-text-primary)',
                    textDecoration: 'none',
                    padding: '6px 8px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '600',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transformStyle: 'preserve-3d',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    fontSize: '15px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)';
                    e.target.style.transform = 'translateY(-2px) rotateX(5deg)';
                    e.target.style.boxShadow = '0 8px 24px rgba(31, 38, 135, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0) rotateX(0deg)';
                    e.target.style.boxShadow = 'none';
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
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '12px',
                      padding: '10px 0',
                      minWidth: '250px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      listStyle: 'none',
                      margin: 0,
                      zIndex: 9999
                    }}
                  >
                    <motion.li 
                      whileHover={{ x: 5 }} 
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        to="/product/data-science-ai-program"
                        style={{
                          color: '#1e293b',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(59, 130, 246, 0.08)';
                          e.target.style.paddingLeft = '25px';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '20px';
                        }}
                      >
                        📊 Data Science And AI
                      </Link>
                    </motion.li>
                    <motion.li 
                      whileHover={{ x: 5 }} 
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        to="/product/cyber-security-and-ethical-hacking-program"
                        style={{
                          color: '#1e293b',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(59, 130, 246, 0.08)';
                          e.target.style.paddingLeft = '25px';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '20px';
                        }}
                      >
                        🛡️ Cyber Security And Ethical Hacking
                      </Link>
                    </motion.li>
                    <motion.li 
                      whileHover={{ x: 5 }} 
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        to="/product/devops-and-cloud-computing-program"
                        style={{
                          color: '#1e293b',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(59, 130, 246, 0.08)';
                          e.target.style.paddingLeft = '25px';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.paddingLeft = '20px';
                        }}
                      >
                        ☁️ DevOps & Cloud Computing
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
                    color: 'var(--nav-text-primary)',
                    textDecoration: 'none',
                    padding: '6px 8px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '600',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transformStyle: 'preserve-3d',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    fontSize: '15px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)';
                    e.target.style.transform = 'translateY(-2px) rotateX(5deg)';
                    e.target.style.boxShadow = '0 8px 24px rgba(31, 38, 135, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0) rotateX(0deg)';
                    e.target.style.boxShadow = 'none';
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
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '12px',
                      padding: '10px 0',
                      minWidth: '250px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      listStyle: 'none',
                      margin: 0,
                      zIndex: 9999
                    }}
                  >
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link 
                        to="/product/data-science-ai-short-term-program"
                        style={{
                          color: '#1e293b',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(59, 130, 246, 0.08)';
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
                          color: '#1e293b',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(59, 130, 246, 0.08)';
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
                          color: '#1e293b',
                          textDecoration: 'none',
                          padding: '12px 20px',
                          display: 'block',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(59, 130, 246, 0.08)';
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
                    color: 'var(--nav-text-primary)',
                    textDecoration: 'none',
                    padding: '6px 8px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '600',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transformStyle: 'preserve-3d',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    fontSize: '15px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)';
                    e.target.style.transform = 'translateY(-2px) rotateX(5deg)';
                    e.target.style.boxShadow = '0 8px 24px rgba(31, 38, 135, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0) rotateX(0deg)';
                    e.target.style.boxShadow = 'none';
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
                      background: 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '12px',
                      padding: '16px 12px',
                      width: '420px',
                      maxWidth: '90vw',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      listStyle: 'none',
                      margin: 0,
                      zIndex: 9999,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '20px 24px'
                    }}
                  >
                    <div style={{ borderRight: '1px solid rgba(59, 130, 246, 0.2)', paddingRight: '16px' }}>
                      <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Program — $99</div>
                      {REGISTER_LEFT.map((item, idx) => (
                        <motion.div key={idx} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                          <button
                            type="button"
                            onClick={() => handleRegisterOption(item)}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              color: '#1e293b',
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
                              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
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
                      <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>One-to-One — $499</div>
                      {REGISTER_RIGHT.map((item, idx) => (
                        <motion.div key={idx} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                          <button
                            type="button"
                            onClick={() => handleRegisterOption(item)}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              color: '#1e293b',
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
                              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
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
                    color: 'var(--nav-text-primary)',
                    textDecoration: 'none',
                    padding: '6px 8px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '600',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transformStyle: 'preserve-3d',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    fontSize: '15px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)';
                    e.target.style.transform = 'translateY(-2px) rotateX(5deg)';
                    e.target.style.boxShadow = '0 8px 24px rgba(31, 38, 135, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0) rotateX(0deg)';
                    e.target.style.boxShadow = 'none';
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
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '12px',
                      padding: '10px 0',
                      minWidth: '220px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
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
                            color: '#1e293b',
                            textDecoration: 'none',
                            padding: '12px 20px',
                            display: 'block',
                            transition: 'all 0.3s ease',
                            fontSize: '14px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(59, 130, 246, 0.08)';
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

            {/* Cart – 3D Interactive */}
            {/* <motion.li
              className="nav-item-3d"
              style={{ position: 'relative' }}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <button
                type="button"
                onClick={() => setShowCart(prev => !prev)}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'var(--nav-text-primary)',
                  padding: '18px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  fontSize: '24px',
                  boxShadow: '0 4px 16px rgba(31, 38, 135, 0.2)',
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) rotateX(8deg) scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 38, 135, 0.3)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)';
                }}
                onMouseLeave={(e) => {
                  if (!showCart) {
                    e.currentTarget.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(31, 38, 135, 0.2)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)';
                  }
                }}
              >
                🛒
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    background: 'linear-gradient(135deg, var(--nav-primary), var(--nav-secondary))',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '700',
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    transformStyle: 'preserve-3d'
                  }}>
                    {cartCount}
                  </span>
                )}
              </button> */}
              {/* <AnimatePresence>
                {showCart && (
                  <>
                    <motion.div
                      className="cart-modal-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      onClick={() => setShowCart(false)}
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(15px)',
                        WebkitBackdropFilter: 'blur(15px)',
                        zIndex: 9998
                      }}
                    />
                    <motion.div
                      className="cart-dropdown cart-modal"
                      initial={{ opacity: 0, y: -20, scale: 0.9, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9, rotateX: -10 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'fixed',
                        top: '80px',
                        right: '20px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)',
                        borderRadius: '24px',
                        padding: '2rem 2.25rem',
                        width: '380px',
                        maxWidth: 'calc(100vw - 40px)',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 16px 48px rgba(31, 38, 135, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        zIndex: 9999,
                        transformOrigin: 'top center',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ 
                          background: 'linear-gradient(135deg, var(--nav-primary), var(--nav-secondary))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '1.5rem',
                          fontWeight: '800',
                          margin: 0,
                          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                        }}>🛒 Cart</h2>
                        <motion.button 
                          type="button" 
                          onClick={() => setShowCart(false)} 
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            color: 'var(--nav-text-primary)',
                            fontSize: '1.3rem',
                            cursor: 'pointer',
                            padding: '8px 12px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(31, 38, 135, 0.2)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          ✕
                        </motion.button>
                      </div>
                      {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '1.5rem', color: '#fff' }}>
                          <p style={{ margin: 0, color: '#64748b' }}>Your cart is empty</p>
                          <p style={{ margin: '8px 0 0', fontSize: '0.9rem', color: '#94a3b8' }}>Add courses to get started</p>
                        </div>
                      ) : (
                        <>
                          <div className="cart-items">
                            {cartItems.map((item, index) => (
                              <motion.div 
                                key={index} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                style={{ 
                                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                                  backdropFilter: 'blur(10px)',
                                  WebkitBackdropFilter: 'blur(10px)',
                                  borderRadius: '16px',
                                  padding: '1rem',
                                  marginBottom: '1rem',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  border: '1px solid rgba(59, 130, 246, 0.15)',
                                  boxShadow: '0 4px 16px rgba(31, 38, 135, 0.1)',
                                  transformStyle: 'preserve-3d'
                                }}
                              >
                                <div>
                                  <div style={{ 
                                    color: 'var(--nav-text-primary)', 
                                    fontWeight: '700', 
                                    fontSize: '1rem',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                  }}>{item.name}</div>
                                  <div style={{ 
                                    color: 'var(--nav-text-secondary)', 
                                    fontSize: '0.85rem',
                                    fontWeight: '500'
                                  }}>{item.duration}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ 
                                    color: 'var(--nav-text-primary)', 
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                  }}>{item.price}</div>
                                  <motion.button 
                                    type="button" 
                                    onClick={() => removeFromCart(item.id)} 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ 
                                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                                      backdropFilter: 'blur(10px)',
                                      WebkitBackdropFilter: 'blur(10px)',
                                      border: '1px solid rgba(239, 68, 68, 0.2)',
                                      color: '#dc2626', 
                                      padding: '6px 12px',
                                      borderRadius: '10px', 
                                      cursor: 'pointer', 
                                      fontSize: '0.8rem', 
                                      fontWeight: '600',
                                      marginTop: '6px',
                                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)',
                                      transition: 'all 0.3s ease'
                                    }}
                                  >
                                    Remove
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                            <div style={{ 
                              borderTop: '1px solid rgba(59, 130, 246, 0.2)', 
                              paddingTop: '1rem', 
                              marginTop: '1rem', 
                              textAlign: 'right',
                              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                              borderRadius: '12px',
                              padding: '1rem',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)'
                            }}>
                              <div style={{ 
                                color: 'var(--nav-text-primary)', 
                                fontWeight: '800', 
                                fontSize: '1.3rem',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                              }}>Total: ${getCartTotal().toFixed(2)}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <motion.button 
                              type="button" 
                              onClick={() => setShowCart(false)} 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              style={{ 
                                flex: 1, 
                                padding: '1rem', 
                                border: '1px solid rgba(59, 130, 246, 0.3)', 
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
                                backdropFilter: 'blur(15px)',
                                WebkitBackdropFilter: 'blur(15px)',
                                color: 'var(--nav-text-primary)', 
                                borderRadius: '16px', 
                                cursor: 'pointer', 
                                fontWeight: '700', 
                                fontSize: '1rem',
                                boxShadow: '0 4px 16px rgba(31, 38, 135, 0.2)',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              Continue
                            </motion.button>
                            <motion.button 
                              type="button" 
                              onClick={() => { navigate('/checkout'); setShowCart(false); }} 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              style={{ 
                                flex: 1, 
                                padding: '1rem', 
                                border: 'none', 
                                background: 'linear-gradient(135deg, var(--nav-primary) 0%, var(--nav-secondary) 100%)',
                                color: '#fff', 
                                borderRadius: '16px', 
                                cursor: 'pointer', 
                                fontWeight: '700', 
                                fontSize: '1rem',
                                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                                transition: 'all 0.3s ease',
                                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                              }}
                            >
                              Checkout
                            </motion.button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence> */}
            {/* </motion.li> */}

            {/* LMS Login */}
            <motion.li
              className="nav-item-3d"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={handleLMSLogin}
                  className="lms-btn"
                  style={{
                    color: 'white',
                    padding: '12px 20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.4s ease',
                    display: 'block',
                    background: 'linear-gradient(135deg, var(--nav-secondary) 0%, var(--nav-primary) 100%)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transformStyle: 'preserve-3d',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    width: '100%',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, var(--nav-secondary) 0%, var(--nav-primary) 100%)';
                    e.target.style.transform = 'translateY(-2px) rotateX(5deg)';
                    e.target.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, var(--nav-secondary) 0%, var(--nav-primary) 100%)';
                    e.target.style.transform = 'translateY(0) rotateX(0deg)';
                    e.target.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.3)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95) rotateX(5deg)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) rotateX(5deg)';
                  }}
                >
                  LMS Login
                </button>
              </motion.div>
            </motion.li>
          </motion.ul>

          {/* Action Items - 10% Width - Commented out */}
          {/* <motion.div 
            className="nav-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ 
              flex: '0 0 10%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '12px',
              minWidth: '120px'
            }}
          >
            <motion.button
              type="button"
              onClick={toggleSearch}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'var(--nav-text-primary)',
                padding: '5px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px',
                boxShadow: '0 4px 16px rgba(31, 38, 135, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 38, 135, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(31, 38, 135, 0.2)';
              }}
            >
              🔍
            </motion.button>

            <motion.button
              type="button"
              onClick={handleLoginRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, var(--nav-primary) 0%, var(--nav-secondary) 100%)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3)';
              }}
            >
              Login
            </motion.button>
          </motion.div> */}

          {/* Mobile Menu Toggle - 3D */}
          <motion.div 
            className="mobile-menu-toggle"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'var(--nav-text-primary)',
              padding: '12px',
              borderRadius: '16px',
              cursor: 'pointer',
              fontSize: '20px',
              boxShadow: '0 4px 16px rgba(31, 38, 135, 0.2)',
              transition: 'all 0.3s ease',
              zIndex: 5
            }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid var(--nav-primary)';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 38, 135, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(31, 38, 135, 0.2)';
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
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
              
              {/* Mobile Menu Panel - 3D Glassmorphism */}
              <motion.div
                initial={{ x: '100%', rotateY: 90 }}
                animate={{ x: 0, rotateY: 0 }}
                exit={{ x: '100%', rotateY: 90 }}
                transition={{ type: "spring", damping: 25, stiffness: 200, duration: 0.6 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  width: '85%',
                  maxWidth: '420px',
                  height: '100vh',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  zIndex: 9999,
                  overflowY: 'auto',
                  boxShadow: '-8px 0 32px rgba(31, 38, 135, 0.4)',
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Mobile Menu Header - 3D */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px',
                  borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}>
                  <h2 style={{
                    background: 'linear-gradient(135deg, var(--nav-primary), var(--nav-secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '22px',
                    fontWeight: '800',
                    margin: 0,
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                  }}>Menu</h2>
                  <motion.button
                    onClick={toggleMobileMenu}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      color: 'var(--nav-text-primary)',
                      fontSize: '24px',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(31, 38, 135, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Mobile Navigation Items: Home, Live Job, Program, One to One, Register now, Pay Now, Cart */}
                <div style={{ padding: '20px' }}>
                  <Link to="/" onClick={toggleMobileMenu} style={{ display: 'block', color: '#1e293b', fontSize: '16px', fontWeight: '500', padding: '15px 0', textDecoration: 'none', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>Home</Link>
                  <Link to="/jobs" onClick={toggleMobileMenu} style={{ display: 'block', color: '#1e293b', fontSize: '16px', fontWeight: '500', padding: '15px 0', textDecoration: 'none', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>Live Job</Link>

                  {/* Program (expandable) */}
                  <div style={{ marginBottom: '0' }}>
                    <motion.div onClick={() => setActiveDropdown(activeDropdown === 'program-mobile' ? null : 'program-mobile')} style={{ color: '#1e293b', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      <span>Program</span>
                      <span>{activeDropdown === 'program-mobile' ? '−' : '+'}</span>
                    </motion.div>
                    <AnimatePresence>
                      {activeDropdown === 'program-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ paddingLeft: '20px' }}>
                          <Link to="/product/data-science-ai-program" onClick={toggleMobileMenu} style={{ display: 'block', color: '#64748b', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>Data Science And AI</Link>
                          <Link to="/product/cyber-security-and-ethical-hacking-program" onClick={toggleMobileMenu} style={{ display: 'block', color: '#64748b', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>Cyber Security And Ethical Hacking</Link>
                          <Link to="/product/devops-and-cloud-computing-program" onClick={toggleMobileMenu} style={{ display: 'block', color: '#64748b', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>DevOps & Cloud Computing</Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* One to One (expandable) */}
                  <div style={{ marginBottom: '0' }}>
                    <motion.div onClick={() => setActiveDropdown(activeDropdown === 'onetoone-mobile' ? null : 'onetoone-mobile')} style={{ color: '#1e293b', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      <span>One to One</span>
                      <span>{activeDropdown === 'onetoone-mobile' ? '−' : '+'}</span>
                    </motion.div>
                    <AnimatePresence>
                      {activeDropdown === 'onetoone-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ paddingLeft: '20px' }}>
                          <Link to="/product/data-science-ai-short-term-program" onClick={toggleMobileMenu} style={{ display: 'block', color: '#64748b', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>Data Science & AI Short Term</Link>
                          <Link to="/product/cyber-security-and-ethical-hacking-short-term-program" onClick={toggleMobileMenu} style={{ display: 'block', color: '#64748b', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>Cyber Security Short Term</Link>
                          <Link to="/product/devops-and-cloud-computing-short-term-program" onClick={toggleMobileMenu} style={{ display: 'block', color: '#64748b', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>DevOps & Cloud Computing Short Term</Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Register now – 6 options (3 program $99, 3 one-to-one $499) */}
                  <div style={{ marginBottom: '0' }}>
                    <motion.div onClick={() => setActiveDropdown(activeDropdown === 'register-mobile' ? null : 'register-mobile')} style={{ color: '#1e293b', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      <span>Register now</span>
                      <span>{activeDropdown === 'register-mobile' ? '−' : '+'}</span>
                    </motion.div>
                    <AnimatePresence>
                      {activeDropdown === 'register-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ paddingLeft: '16px' }}>
                          <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px', marginBottom: '4px' }}>Program — $99</div>
                          {REGISTER_LEFT.map((item, idx) => (
                            <button key={`l-${idx}`} type="button" onClick={() => { handleRegisterOption(item); toggleMobileMenu(); }} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#64748b', padding: '10px 0', fontSize: '14px', cursor: 'pointer', textDecoration: 'none' }}>{item.name.replace('Registration fee for ', '').replace(' Program', '')} — $99</button>
                          ))}
                          <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '12px', marginBottom: '4px' }}>One-to-One — $499</div>
                          {REGISTER_RIGHT.map((item, idx) => (
                            <button key={`r-${idx}`} type="button" onClick={() => { handleRegisterOption(item); toggleMobileMenu(); }} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#64748b', padding: '10px 0', fontSize: '14px', cursor: 'pointer', textDecoration: 'none' }}>{item.name.replace('Registration fee for ', '').replace(' Short Term Program', '')} — $499</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Pay Now – Partner EMI's 1–4 */}
                  <div style={{ marginBottom: '0' }}>
                    <motion.div onClick={() => setActiveDropdown(activeDropdown === 'paynow-mobile' ? null : 'paynow-mobile')} style={{ color: '#1e293b', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      <span>Pay Now</span>
                      <span>{activeDropdown === 'paynow-mobile' ? '−' : '+'}</span>
                    </motion.div>
                    <AnimatePresence>
                      {activeDropdown === 'paynow-mobile' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ paddingLeft: '20px' }}>
                          {PAY_NOW_LINKS.map((item, idx) => (
                            <a key={idx} href={item.url} target={item.url && item.url !== '#' ? '_blank' : undefined} rel={item.url && item.url !== '#' ? 'noopener noreferrer' : undefined} onClick={toggleMobileMenu} style={{ display: 'block', color: '#64748b', padding: '12px 0', fontSize: '14px', textDecoration: 'none' }}>{item.label}</a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button type="button" onClick={() => { setShowCart(true); toggleMobileMenu(); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#1e293b', fontSize: '16px', fontWeight: '500', padding: '15px 0', cursor: 'pointer', borderBottom: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🛒 Cart {cartCount > 0 && `(${cartCount})`}
                  </motion.button>

                  <Link to="/refund-returns" onClick={toggleMobileMenu} style={{ display: 'block', color: '#1e293b', fontSize: '16px', fontWeight: '500', padding: '15px 0', textDecoration: 'none', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>Refund and Returns Policy</Link>

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
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
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
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
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

        {/* Search Bar - 3D Glassmorphism */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              className="search-bar dropdown-3d"
              initial={{ opacity: 0, y: -30, scale: 0.8, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.8, rotateX: -15 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'absolute',
                top: '100%',
                right: '20px',
                background: 'var(--nav-glass-bg)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                padding: '24px',
                borderRadius: '20px',
                boxShadow: '0 16px 48px rgba(31, 38, 135, 0.4)',
                border: '1px solid var(--nav-glass-border)',
                zIndex: 9999,
                minWidth: '350px',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d'
              }}
            >
              <input
                type="text"
                placeholder="🔍 Search courses, programs..."
                onKeyDown={handleSearch}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  color: 'var(--nav-text-primary)',
                  outline: 'none',
                  boxShadow: '0 4px 16px rgba(31, 38, 135, 0.1)',
                  transition: 'all 0.3s ease',
                  transformStyle: 'preserve-3d'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--nav-primary)';
                  e.target.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.2)';
                  e.target.style.transform = 'translateY(-2px) rotateX(3deg)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.target.style.boxShadow = '0 4px 16px rgba(31, 38, 135, 0.1)';
                  e.target.style.transform = 'translateY(0) rotateX(0deg)';
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
