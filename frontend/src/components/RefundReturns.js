import React, { useState } from 'react';
import './RefundReturns.css';

const RefundReturns = () => {
  const [activeTab, setActiveTab] = useState('long-term');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="refund-returns">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-content">
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
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="trust-indicators">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-card primary">
              <div className="trust-icon">🎓</div>
              <h3 className="trust-number">10,000+</h3>
              <p className="trust-label">Happy Students</p>
            </div>
            <div className="trust-card secondary">
              <div className="trust-icon">⭐</div>
              <h3 className="trust-number">4.9/5</h3>
              <p className="trust-label">Student Rating</p>
            </div>
            <div className="trust-card tertiary">
              <div className="trust-icon">💰</div>
              <h3 className="trust-number">100%</h3>
              <p className="trust-label">Refund Guarantee</p>
            </div>
          </div>
        </div>
      </section>

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

            {/* Sticky Navigation */}
            <div className="sticky-nav">
              <div className="container">
                <div className="nav-list">
                  <a href="#long-term" className="nav-item">Long-Term Courses</a>
                  <a href="#short-term" className="nav-item">Short-Term Courses</a>
                  <a href="#consumer-law" className="nav-item">Consumer Law</a>
                  <a href="#contact" className="nav-item">Contact Support</a>
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

            {/* Contact Card */}
            <div className="contact-card" id="contact">
              <h3 className="contact-title">🤝 Need Help With Your Refund?</h3>
              <p className="contact-text">
                Our support team is here to help you with any questions about our refund policy or to assist with your refund request.
              </p>
              <a href="mailto:info@skystates.us" className="contact-button">
                Contact Support Team
              </a>
            </div>
          </div>

          </div>
      </section>
    </div>
  );
};

export default RefundReturns;
