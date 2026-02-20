import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const mouseTimer = useRef(null);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Only trigger when mouse leaves through top
      if (e.clientY <= 0) {
        mouseTimer.current = setTimeout(() => {
          setIsVisible(true);
        }, 500);
      }
    };

    const handleMouseEnter = () => {
      if (mouseTimer.current) {
        clearTimeout(mouseTimer.current);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (mouseTimer.current) {
        clearTimeout(mouseTimer.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store lead data (in real app, send to backend)
    const leadData = {
      name,
      email,
      phone,
      timestamp: new Date().toISOString(),
      source: 'exit-intent-popup'
    };
    
    console.log('Lead captured:', leadData);
    localStorage.setItem('exitIntentLead', JSON.stringify(leadData));
    
    setIsSubmitted(true);
    setStep(3);
    
    // Close popup after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const handleNextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(5px)'
        }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#999'
            }}
          >
            ×
          </button>

          {!isSubmitted ? (
            <>
              {/* Step 1: Initial Offer */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '25px',
                    textAlign: 'center'
                  }}>
                    <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>
                      🎓 Wait! Don't Miss Out!
                    </h2>
                    <p style={{ margin: 0, fontSize: '1rem' }}>
                      Get exclusive course recommendations and a FREE career assessment
                    </p>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your full name"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        border: 'none',
                        padding: '15px',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Continue →
                    </button>
                  </form>

                  <p style={{ 
                    textAlign: 'center', 
                    marginTop: '15px', 
                    fontSize: '0.85rem', 
                    color: '#666' 
                  }}>
                    📞 Optional: Get personalized career guidance
                  </p>
                </motion.div>
              )}

              {/* Step 2: Phone Number */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 style={{ 
                    textAlign: 'center', 
                    marginBottom: '20px',
                    color: '#333',
                    fontSize: '1.5rem'
                  }}>
                    📱 Get Personalized Guidance
                  </h2>
                  
                  <p style={{ 
                    textAlign: 'center', 
                    marginBottom: '25px',
                    color: '#666',
                    fontSize: '1rem'
                  }}>
                    Our career experts will call you to discuss the perfect course path
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        style={{
                          flex: 1,
                          background: '#f0f0f0',
                          color: '#333',
                          border: 'none',
                          padding: '15px',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        style={{
                          flex: 2,
                          background: 'linear-gradient(135deg, #28a745, #20c997)',
                          color: 'white',
                          border: 'none',
                          padding: '15px',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        🎯 Get Free Assessment
                      </button>
                    </div>
                  </form>

                  <p style={{ 
                    textAlign: 'center', 
                    marginTop: '15px', 
                    fontSize: '0.8rem', 
                    color: '#999' 
                  }}>
                    No spam, unsubscribe anytime. We respect your privacy.
                  </p>
                </motion.div>
              )}
            </>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '2rem'
              }}>
                ✓
              </div>
              
              <h2 style={{ 
                color: '#28a745', 
                marginBottom: '15px',
                fontSize: '1.5rem'
              }}>
                Thank You! 🎉
              </h2>
              
              <p style={{ 
                color: '#666',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Your free career assessment is being prepared!<br />
                Check your email for next steps.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
