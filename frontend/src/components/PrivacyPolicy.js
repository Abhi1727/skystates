import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = ['information-collection', 'information-usage', 'information-sharing', 'security', 'user-rights', 'policy-changes', 'contact'];
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="privacy-policy">
      {/* Policy Content */}
      <section className="policy-content">
        <div className="container">
          <div className="policy-wrapper">
            {/* Breadcrumb Section */}
            <div className="breadcrumb">
              <div className="container">
                <div className="breadcrumb-nav">
                  <Link to="/" className="breadcrumb-link">Home</Link>
                  <span>»</span>
                  <span>Privacy Policy</span>
                </div>
              </div>
            </div>

            {/* Main Policy Content */}
            <div className="policy-card">
              <h1>
                Privacy Policy – Sky States
              </h1>
              <p>
                Sky States is committed to protecting your privacy. We take data protection and privacy very seriously. 
                This Privacy Policy describes how we collect, use, share, and secure the personal information you provide 
                when you visit the websites owned and operated by us and when you use our Services. It also describes your 
                choices regarding use, access, withdrawal of consent, and correction of your personal information. The use 
                of information collected through our Service(s) shall be limited to the purpose of providing the service that 
                you have chosen. The capitalized terms used in this Policy but not defined herein shall have the same meaning 
                as defined in our Terms and Conditions.
              </p>
              <p>
                For this Privacy Policy, sensitive personal data or information of a personal nature is as defined under 
                applicable privacy laws. Please note that the usage of the terms personal information/personally identifiable 
                information/personal data, in this Privacy Policy includes sensitive personal data or information, wherever 
                appropriate and/or mandated under applicable privacy laws.
              </p>
            </div>

            {/* Information We Collect Section */}
            <div className="policy-card" id="information-collection">
              <h2>
                📋 Information We Collect
              </h2>
              <p>
                When you use our website, we may collect various types of information, including:
              </p>

              <div className="policy-section">
                <h3>
                  🏷️ Personal Information
                </h3>
                <p>
                  This includes your name, email address, phone number, address, and other similar information you provide 
                  when you create an account, make a purchase, or otherwise interact with our services. We collect this 
                  information directly from you when you register for courses, fill out forms, or contact our support team.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  📊 Usage Information
                </h3>
                <p>
                  We collect information about how you use our website and mobile applications, including your IP address, 
                  browser type, device information, pages visited, time spent on pages, and other usage data. This helps us 
                  understand user behavior and improve our services.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  🍪 Cookies and Tracking Technologies
                </h3>
                <p>
                  We use cookies and similar tracking technologies to collect information about your browsing behavior and 
                  preferences. This helps us personalize your experience, analyze trends, and improve our services. Our 
                  cookie policy explains the different types of cookies we use and how you can manage them.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  🎓 Educational Information
                </h3>
                <p>
                  When you enroll in our courses, we collect information related to your educational progress, including 
                  course completion status, assessment results, and learning analytics. This information is used to provide 
                  personalized learning experiences and improve our educational offerings.
                </p>
              </div>
            </div>

            {/* How We Use Your Information Section */}
            <div className="policy-card" id="information-usage">
              <h2>
                🔧 How We Use Your Information
              </h2>
              <p>
                We may use the information we collect for various purposes, including:
              </p>

              <div className="policy-section">
                <h3>
                  📚 Providing and Improving Our Services
                </h3>
                <p>
                  We use your information to provide the services you request, including course enrollment, access to learning 
                  materials, and customer support. We also analyze usage patterns to improve our website and mobile applications, 
                  enhance user experience, and develop new features.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  📧 Communicating With You
                </h3>
                <p>
                  We may use your contact information to send you updates, newsletters, promotional materials, and other 
                  communications related to our services. This includes course announcements, special offers, and important 
                  account notifications. You can opt out of marketing communications at any time.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  🎯 Personalization
                </h3>
                <p>
                  We use your information to personalize your experience and tailor the content and advertisements we show you. 
                  This includes recommending courses based on your interests, customizing learning paths, and providing relevant 
                  educational content.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  📈 Analytics
                </h3>
                <p>
                  We use analytics tools to analyze how our services are used and to improve the user experience. This includes 
                  tracking page views, user engagement, and conversion rates to optimize our platform and educational offerings.
                </p>
              </div>
            </div>

            {/* Information Sharing Section */}
            <div className="policy-card" id="information-sharing">
              <h2>
                🔗 Information Sharing
              </h2>
              <p>
                We may share your information under certain circumstances:
              </p>

              <div className="policy-section">
                <h3>
                  ⚖️ Legal Compliance
                </h3>
                <p>
                  We may disclose your information to comply with applicable laws, regulations, legal processes, or government 
                  requests. This includes responding to subpoenas, court orders, or other legal obligations.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  🔄 Business Transfers
                </h3>
                <p>
                  If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part 
                  of that transaction. We will notify you of any such change in ownership or control of your personal information.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  🤝 Service Providers
                </h3>
                <p>
                  We may share information with third-party service providers who perform services on our behalf, such as 
                  payment processing, data analysis, email delivery, hosting services, and customer support. These providers 
                  are contractually obligated to protect your information and only use it for the purposes we specify.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  📱 Mobile Information
                </h3>
                <p>
                  No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All 
                  other categories exclude text messaging originator opt-in data and consent; this information will not be 
                  shared with any third parties.
                </p>
              </div>
            </div>

            {/* Security Section */}
            <div className="policy-card" id="security">
              <h2>
                🔒 Security
              </h2>
              <p>
                We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or 
                destruction. These measures include:
              </p>

              <div className="policy-section">
                <h3>
                  🛡️ Technical Safeguards
                </h3>
                <p>
                  We implement industry-standard security measures including SSL encryption, secure servers, firewalls, and 
                  regular security audits to protect your data during transmission and storage.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  👥 Administrative Safeguards
                </h3>
                <p>
                  Access to your personal information is limited to employees who need it to perform their jobs. We provide 
                  regular privacy training to our staff and enforce strict confidentiality obligations.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  ⚠️ Important Note
                </h3>
                <p>
                  However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot 
                  guarantee absolute security. While we strive to protect your personal information, we cannot ensure or 
                  warrant the security of any information you transmit to us.
                </p>
              </div>
            </div>

            {/* Your Choices Section */}
            <div className="policy-card" id="user-rights">
              <h2>
                ✅ Your Choices
              </h2>
              <p>
                You have the following rights regarding your personal information:
              </p>

              <div className="policy-section">
                <h3>
                  🔍 Access and Review
                </h3>
                <p>
                  You have the right to access and review the personal information we maintain about you. You can request a 
                  copy of your data by contacting us at info@skystates.us.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  ✏️ Update and Correct
                </h3>
                <p>
                  You can update or correct your personal information by logging into your account or contacting our support 
                  team. We will take reasonable steps to ensure your information is accurate and up-to-date.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  🗑️ Deletion
                </h3>
                <p>
                  You have the right to request deletion of your personal information, subject to legal and contractual 
                  obligations. We will delete your information unless we are required to retain it for legal, compliance, or 
                  legitimate business purposes.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  📵 Opt-Out
                </h3>
                <p>
                  You can opt out of receiving promotional communications from us by following the instructions provided in 
                  those communications or by contacting us directly. Note that you may still receive transactional or 
                  administrative messages related to your account.
                </p>
              </div>

              <div className="policy-section">
                <h3>
                  🍪 Cookie Management
                </h3>
                <p>
                  You can control cookies through your browser settings. However, disabling cookies may affect your ability 
                  to use certain features of our website. We provide tools to manage your cookie preferences in our cookie 
                  settings panel.
                </p>
              </div>
            </div>

            {/* Changes to Policy Section */}
            <div className="policy-card" id="policy-changes">
              <h2>
                📝 Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, applicable law, or 
                operational requirements. If we make material changes, we will notify you by:
              </p>

              <div className="policy-section">
                <ul>
                  <li>Posting the updated policy on our website</li>
                  <li>Sending an email notification to registered users</li>
                  <li>Displaying prominent notices on our platform</li>
                  <li>Updating the "Last Updated" date at the top of this policy</li>
                </ul>
              </div>

              <div className="policy-section">
                <p>
                  Your continued use of our services after any changes to this Privacy Policy constitutes your acceptance of 
                  the updated policy. We encourage you to review this policy periodically to stay informed about our privacy 
                  practices.
                </p>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="policy-card" id="contact">
              <h2>
                📞 Contact Us
              </h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>

              <div className="contact-methods">
                <a href="mailto:info@skystates.us" className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-info">
                    <span className="method-label">Email</span>
                    <span className="method-value">info@skystates.us</span>
                  </div>
                </a>
                <a href="tel:+18888102434" className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-info">
                    <span className="method-label">Phone</span>
                    <span className="method-value">(888) 810-2434</span>
                  </div>
                </a>
              </div>

              <div className="policy-section">
                <p>
                  Our privacy team will respond to your inquiries within 30 days and work to address any concerns you may 
                  have about our privacy practices or your personal information.
                </p>
              </div>
            </div>

            {/* Sticky Navigation */}
            <div className={`sticky-nav ${isScrolled ? 'scrolled' : ''}`}>
              <div className="container">
                <div className="nav-list">
                  <a 
                    href="#information-collection" 
                    className={`nav-item ${activeSection === 'information-collection' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('information-collection');
                    }}
                  >
                    Information Collection
                  </a>
                  <a 
                    href="#information-usage" 
                    className={`nav-item ${activeSection === 'information-usage' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('information-usage');
                    }}
                  >
                    Information Usage
                  </a>
                  <a 
                    href="#information-sharing" 
                    className={`nav-item ${activeSection === 'information-sharing' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('information-sharing');
                    }}
                  >
                    Information Sharing
                  </a>
                  <a 
                    href="#security" 
                    className={`nav-item ${activeSection === 'security' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('security');
                    }}
                  >
                    Security
                  </a>
                  <a 
                    href="#user-rights" 
                    className={`nav-item ${activeSection === 'user-rights' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('user-rights');
                    }}
                  >
                    Your Rights
                  </a>
                  <a 
                    href="#contact" 
                    className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h2 className="faq-title">❓ Frequently Asked Questions</h2>
              
              <div className={`faq-item ${expandedFaq === 0 ? 'expanded' : ''}`} onClick={() => toggleFaq(0)}>
                <div className="faq-question">
                  What types of personal information do you collect?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  We collect personal information including your name, email address, phone number, address, and educational 
                  information when you create an account, enroll in courses, or interact with our services. We also collect 
                  usage information and data through cookies and tracking technologies.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 1 ? 'expanded' : ''}`} onClick={() => toggleFaq(1)}>
                <div className="faq-question">
                  How do you protect my personal information?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  We implement industry-standard security measures including SSL encryption, secure servers, firewalls, and 
                  regular security audits. Access to your information is limited to employees who need it to perform their 
                  jobs, and we provide regular privacy training to our staff.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 2 ? 'expanded' : ''}`} onClick={() => toggleFaq(2)}>
                <div className="faq-question">
                  Can I access or delete my personal information?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  Yes, you have the right to access, review, update, correct, or delete your personal information. You can 
                  manage your account information through your account settings or contact our support team for assistance.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 3 ? 'expanded' : ''}`} onClick={() => toggleFaq(3)}>
                <div className="faq-question">
                  Do you share my information with third parties?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  We only share your information with service providers who perform services on our behalf, when required by 
                  law, or in connection with business transfers. No mobile information is shared with third parties for 
                  marketing purposes.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 4 ? 'expanded' : ''}`} onClick={() => toggleFaq(4)}>
                <div className="faq-question">
                  How can I opt out of marketing communications?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  You can opt out of marketing communications by clicking the unsubscribe link in our emails or by contacting 
                  us directly at info@skystates.us. Note that you may still receive important account-related communications.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
