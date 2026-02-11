import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Handle search functionality
      console.log('Searching for:', e.target.value);
      setSearchOpen(false);
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
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="contact-info" style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center'
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
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <Link to="/login" className="login-btn" onClick={(e) => {
              e.preventDefault();
              const btn = e.currentTarget;
              btn.style.transform = 'scale(0.95)';
              setTimeout(() => {
                btn.style.transform = 'scale(1)';
                navigate('/login');
              }, 200);
            }} style={{
              color: '#007bff',
              padding: '6px 14px',
              border: '1px solid #007bff',
              borderRadius: '20px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              background: 'transparent',
              cursor: 'pointer'
            }}
              onMouseEnter={(e) => {
                e.target.style.background = '#007bff';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#007bff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(-2px)';
              }}>
              Login/Register
            </Link>
            <button onClick={handleLMSLogin} className="lms-btn" style={{
              background: 'linear-gradient(45deg, #28a745, #20c997)',
              color: 'white',
              padding: '6px 14px',
              border: 'none',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
            }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(45deg, #218838, #1e7e34)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(40, 167, 69, 0.3)';
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

      {/* Main Navigation - Kept Intact */}
      <div className="container">
        <nav className="main-nav">
          <div className="nav-brand">
            <h1><Link to="/">Sky States</Link></h1>
          </div>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>
                Live Job
              </Link>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle">
                Program <i className="fas fa-chevron-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/product/data-science-ai-program">Data Science And AI</Link></li>
                <li><Link to="/product/cyber-security-and-ethical-hacking-program">Cyber Security And Ethical Hacking</Link></li>
                <li><Link to="/product/devops-and-cloud-computing-program">DevOps & Cloud Computing</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle">
                One To One <i className="fas fa-chevron-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/product/data-science-ai-short-term-program">Data Science & AI Short Term Program</Link></li>
                <li><Link to="/product/cyber-security-and-ethical-hacking-short-term-program">Cyber Security And Ethical Hacking Short Term</Link></li>
                <li><Link to="/product/devops-and-cloud-computing-short-term-program">DevOps & Cloud Computing Short Term Program</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle">
                Register Now <i className="fas fa-chevron-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#" onClick={() => handleProgramCheckout('Data Science & AI', '$2,999', '6 Months')}>Data Science & AI</a></li>
                <li><a href="#" onClick={() => handleProgramCheckout('Cyber Security & Ethical Hacking', '$2,999', '6 Months')}>Cyber Security & Ethical Hacking</a></li>
                <li><a href="#" onClick={() => handleProgramCheckout('DevOps & Cloud Computing', '$2,999', '6 Months')}>DevOps & Cloud</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle">
                More <i className="fas fa-chevron-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#">Partner EMIs</a></li>
                <li><Link to="/refund-returns">Refund and Returns Policy</Link></li>
              </ul>
            </li>
            <li>
              <a href="#" className="search-icon" onClick={toggleSearch}>
                <i className="fas fa-search"></i>
              </a>
            </li>
            <li>
              <a href="#" className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-count">{cartCount}</span>
              </a>
            </li>
          </ul>
          {/* Search Bar */}
          {searchOpen && (
            <div className="search-bar" style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              background: 'white',
              padding: '20px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              borderRadius: '0 0 10px 10px',
              zIndex: 1000,
              minWidth: '300px'
            }}>
              <input
                type="text"
                placeholder="Search courses, programs..."
                onKeyDown={handleSearch}
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}
              />
            </div>
          )}
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
