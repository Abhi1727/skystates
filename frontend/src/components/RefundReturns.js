import React, { useState, useEffect } from 'react';
import './RefundReturns.css';

const RefundReturns = () => {
  const [activeTab, setActiveTab] = useState('long-term');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    courseName: '',
    reason: '',
    refundType: 'full'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = ['long-term', 'short-term', 'consumer-law', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      const response = await fetch('/api/refunds/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          orderId: '',
          courseName: '',
          reason: '',
          refundType: 'full'
        });
      } else {
        setSubmitStatus('error');
        console.error('Refund request failed:', result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="refund-returns">
      {/* Hero Section */}
      {/* <section className="page-hero">
        <div className="hero-content">
          <div className="hero-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
          <div className="trust-badge">
            <span className="trust-badge-icon">🛡️</span>
            <span className="trust-badge-text">100% Satisfaction Guarantee</span>
          </div>
          <h1>
            Refund & Returns Policy
          </h1>
          <p>
            Your trust is our priority. Learn about our transparent refund policies designed to protect your investment in education.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">30-Day</span>
              <span className="stat-label">Money Back Guarantee</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Transparent Policy</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Trust Indicators Section */}
      {/* <section className="trust-indicators">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-card primary">
              <div className="trust-icon">🎓</div>
              <h3 className="trust-number">10,000+</h3>
              <p className="trust-label">Happy Students</p>
              <div className="trust-progress">
                <div className="progress-bar"></div>
              </div>
            </div>
            <div className="trust-card secondary">
              <div className="trust-icon">⭐</div>
              <h3 className="trust-number">4.9/5</h3>
              <p className="trust-label">Student Rating</p>
              <div className="trust-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </div>
            <div className="trust-card tertiary">
              <div className="trust-icon">💰</div>
              <h3 className="trust-number">100%</h3>
              <p className="trust-label">Refund Guarantee</p>
              <div className="trust-badge-glow"></div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Quick Actions Section */}
      {/* <section className="quick-actions">
        <div className="container">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-card" onClick={() => scrollToSection('refund-form')}>
              <div className="action-icon">📝</div>
              <h3>Request Refund</h3>
              <p>Submit your refund request online</p>
            </button>
            <button className="action-card" onClick={() => scrollToSection('long-term')}>
              <div className="action-icon">📚</div>
              <h3>Long-term Courses</h3>
              <p>View policy for 6+ month courses</p>
            </button>
            <button className="action-card" onClick={() => scrollToSection('short-term')}>
              <div className="action-icon">🎯</div>
              <h3>Short-term Courses</h3>
              <p>View policy for shorter courses</p>
            </button>
            <button className="action-card" onClick={() => scrollToSection('contact')}>
              <div className="action-icon">💬</div>
              <h3>Get Support</h3>
              <p>Contact our support team</p>
            </button>
          </div>
        </div>
      </section> */}

      {/* Policy Content */}
      <section className="policy-content">
        <div className="container">
          <div className="policy-wrapper">
            {/* Breadcrumb Section */}
            <div className="breadcrumb">
              <div className="container">
                <div className="breadcrumb-nav">
                  <a href="/" className="breadcrumb-link">Home</a>
                  <span>»</span>
                  <span>Refund and Returns Policy</span>
                </div>
              </div>
            </div>

            {/* Main Policy Content */}
            <div className="policy-card">
              <h1>
                Refund Policy – Sky States
              </h1>
              <p>
                At Sky States, we are dedicated to ensuring that our users have a positive and enriching experience 
                with our training courses, whether they are online or in a classroom setting. We understand that circumstances can change, 
                and we want to be as fair and transparent as possible with our refund policies. By purchasing a course on Sky States 
                website, you agree to our Privacy Policy, Terms of Use, and refund terms outlined below.
              </p>
            </div>

            {/* Long-Term Courses Section */}
            <div className="policy-card" id="long-term">
              <h2>
                📚 Long-Term Courses (Duration 6 Months and Above)
              </h2>
              
              <h3>
                How to Cancel
              </h3>
              <p>
                If you need to cancel your enrollment, please notify us in person, by email, by Certified Mail, 
                or through direct communication with Sky States. The cancellation will be effective on the date notice is postmarked or received.
              </p>

              <h3>
                Refund Policy
              </h3>
              
              <div className="policy-section">
                <h4>
                  ✅ Full Refund:
                </h4>
                <p>
                  If we do not accept your application or if you cancel within three business days of signing agreement and 
                  making your initial payment, you will receive a full refund.
                </p>
                <p>
                  If you don't find the course satisfactory or for any other reason, you can request a cancellation. 
                  Your access to the course will be canceled, and the student will be charged only for the number of classes they have attended.
                </p>
              </div>

              <div className="policy-section">
                <h4>
                  📅 Before Classes Begin:
                </h4>
                <p>
                  If you cancel after admission but before your first class, you will receive a refund of all money paid 
                  except for the registration fee (capped at $99).
                </p>
              </div>

              <div className="policy-section">
                <h4>
                  🔄 During Drop/Add Period:
                </h4>
                <p>
                  If you withdraw during the first week of classes, You will receive a refund of All tuition and fees 
                  except for the registration fee.
                </p>
              </div>

              <div className="policy-section">
                <h4>
                  ⏰ After Drop/Add Period:
                </h4>
                <p>
                  No refunds will be issued after the first week of classes.
                </p>
              </div>

              <div className="policy-section">
                <h4>
                  🚪 Withdrawal from Program:
                </h4>
                <p>
                  If you withdraw from the program, above refund structure will apply.
                </p>
              </div>
            </div>

            {/* Short-Term Courses Section */}
            <div className="policy-card" id="short-term">
              <h2>
                🎯 Short-Term Courses (Duration Less Than 6 Months)
              </h2>

              <h3>
                🏫 Classroom Training / Instructor-Led Online Training
              </h3>
              
              <div className="policy-section">
                <h4>
                  🏢 Sky States Cancellations:
                </h4>
                <p>
                  We may need to postpone or cancel an event due to insufficient enrollments, instructor illness, or 
                  force majeure events (e.g., natural disasters, political instability). If we cancel an event, you will receive a 100% refund.
                </p>
              </div>

              <div className="policy-section">
                <h4>
                  👤 Delegate Cancellations:
                </h4>
                <p>
                  <strong>7 Days or More Before Event:</strong> 90% refund of total paid fee (10% retained as a processing fee).
                </p>
                <p>
                  <strong>Less Than 7 Days Before Event:</strong> No refunds will be provided.
                </p>
              </div>

              <div className="policy-section">
                <h4>
                  💻 Online Training:
                </h4>
                <p>
                  <strong>Delegate Cancellations:</strong>
                </p>
                <p>
                  <strong>Within 48 Hours of Subscription:</strong> 95% refund of total paid fee (5% retained as an administration fee).
                </p>
                <p>
                  <strong>After 48 Hours of Subscription:</strong> No refunds will be issued.
                </p>
              </div>

              <div className="policy-section">
                <h4>
                  🤝 Third-Party Courses:
                </h4>
                <p>
                  For courses provided by third parties (e.g., Microsoft Azure Registration, MS SharePoint), we will refund 50% 
                  of total paid fee if cancelled within 48 hours. No refunds will be issued after 48 hours.
                </p>
              </div>
            </div>

            {/* USA Consumer Protection Law Section */}
            <div className="policy-card" id="consumer-law">
              <h2>
                🇺🇸 USA Consumer Protection Law
              </h2>
              <p>
                USA customers are entitled to a full refund within 14 days of purchase if the content has not been consumed or accessed.
              </p>
            </div>

            {/* Duplicate Payment Section */}
            <div className="policy-card">
              <h2>
                💳 Duplicate Payment
              </h2>
              <p>
                If you accidentally make a duplicate payment, we will process a refund via the original payment method 
                within 5 to 7 working days after notification.
              </p>
            </div>

            {/* General Note Section */}
            <div className="policy-card">
              <h2>
                📝 General Note
              </h2>
              <p>
                All refunds will be processed within 30 days of receiving the refund request.
              </p>
              <p>
                If you have any questions or need assistance, don't hesitate to get in touch with our support team at 
                <a href="mailto:info@skystates.us">
                  info@skystates.us
                </a>
                . We are here to help and ensure you have the best possible experience with Sky States.
              </p>
            </div>

            {/* Enhanced Sticky Navigation */}
            <div className={`sticky-nav ${isScrolled ? 'scrolled' : ''}`}>
              <div className="container">
                <div className="nav-list">
                  <a 
                    href="#long-term" 
                    className={`nav-item ${activeSection === 'long-term' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('long-term');
                    }}
                  >
                    Long-Term Courses
                  </a>
                  <a 
                    href="#short-term" 
                    className={`nav-item ${activeSection === 'short-term' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('short-term');
                    }}
                  >
                    Short-Term Courses
                  </a>
                  <a 
                    href="#consumer-law" 
                    className={`nav-item ${activeSection === 'consumer-law' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('consumer-law');
                    }}
                  >
                    Consumer Law
                  </a>
                  <a 
                    href="#refund-form" 
                    className={`nav-item ${activeSection === 'refund-form' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('refund-form');
                    }}
                  >
                    Request Refund
                  </a>
                  <a 
                    href="#contact" 
                    className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h2 className="faq-title">❓ Frequently Asked Questions</h2>
              
              <div className={`faq-item ${expandedFaq === 0 ? 'expanded' : ''}`} onClick={() => toggleFaq(0)}>
                <div className="faq-question">
                  How long does the refund process take?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  All refunds are processed within 30 days of receiving your refund request. The exact timing may depend on your payment method and bank processing times.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 1 ? 'expanded' : ''}`} onClick={() => toggleFaq(1)}>
                <div className="faq-question">
                  Can I get a refund if I'm not satisfied with the course?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  Yes, you can request a cancellation and refund if you're not satisfied. For long-term courses, you'll only be charged for the classes attended. For short-term courses, different timeframes apply based on the course type.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 2 ? 'expanded' : ''}`} onClick={() => toggleFaq(2)}>
                <div className="faq-question">
                  What happens if Sky States cancels a course?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  If we cancel an event due to insufficient enrollments, instructor illness, or force majeure events, you will receive a 100% refund of your payment.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 3 ? 'expanded' : ''}`} onClick={() => toggleFaq(3)}>
                <div className="faq-question">
                  How do I request a refund?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  You can request a refund by notifying us in person, by email, by Certified Mail, or through direct communication with Sky States. The cancellation is effective on the date the notice is postmarked or received.
                </div>
              </div>
            </div>

            {/* Refund Request Form */}
            <div className="policy-card refund-form-card" id="refund-form">
              <h2>
                📝 Request a Refund
              </h2>
              <p className="form-intro">
                Fill out the form below to request a refund. Our team will process your request within 24-48 hours.
              </p>
              
              <form className="refund-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="orderId">Order ID *</label>
                    <input
                      type="text"
                      id="orderId"
                      name="orderId"
                      value={formData.orderId}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your order ID"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="courseName">Course Name *</label>
                    <input
                      type="text"
                      id="courseName"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter course name"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="refundType">Refund Type *</label>
                  <select
                    id="refundType"
                    name="refundType"
                    value={formData.refundType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="full">Full Refund</option>
                    <option value="partial">Partial Refund</option>
                    <option value="credit">Course Credit</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="reason">Reason for Refund *</label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Please explain why you're requesting a refund..."
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Processing...
                      </>
                    ) : (
                      'Submit Refund Request'
                    )}
                  </button>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="success-message">
                    <div className="success-icon">✓</div>
                    <p>Your refund request has been submitted successfully! We'll contact you within 24-48 hours.</p>
                    <div className="next-steps">
                      <h4>Next Steps:</h4>
                      <ul>
                        <li>You will receive a confirmation email shortly</li>
                        <li>Our team will review your request within 24 hours</li>
                        <li>We may contact you for additional information if needed</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="error-message">
                    <div className="error-icon">⚠</div>
                    <p>There was an error submitting your refund request. Please try again or contact our support team directly.</p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Card */}
            <div className="contact-card" id="contact">
              <h3 className="contact-title">🤝 Need Help With Your Refund?</h3>
              <p className="contact-text">
                Our support team is here to help you with any questions about our refund policy or to assist with your refund request.
              </p>
              <div className="contact-methods">
                <a href="mailto:info@skystates.us" className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-info">
                    <span className="method-label">Email Support</span>
                    <span className="method-value">info@skystates.us</span>
                  </div>
                </a>
                <a href="tel:+18888102434" className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-info">
                    <span className="method-label">Phone Support</span>
                    <span className="method-value">(888) 810-2434</span>
                  </div>
                </a>
                <div className="contact-method">
                  <div className="method-icon">💬</div>
                  <div className="method-info">
                    <span className="method-label">Live Chat</span>
                    <span className="method-value">Available 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
      </section>
    </div>
  );
};

export default RefundReturns;
