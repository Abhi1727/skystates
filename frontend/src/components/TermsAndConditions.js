import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = ['acceptance', 'user-id', 'content', 'placement', 'usage', 'ip-rights', 'personal-info', 'liability', 'term', 'indemnity', 'waiver', 'severability', 'governing-law', 'amendment', 'entire-agreement', 'contact'];
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
    <div className="terms-conditions">
      {/* Terms Content */}
      <section className="terms-content">
        <div className="container">
          <div className="terms-wrapper">
            {/* Breadcrumb Section */}
            <div className="breadcrumb">
              <div className="container">
                <div className="breadcrumb-nav">
                  <Link to="/" className="breadcrumb-link">Home</Link>
                  <span>»</span>
                  <span>Terms of Service</span>
                </div>
              </div>
            </div>

            {/* Main Terms Content */}
            <div className="terms-card">
              <h1>
                Terms and Conditions – Sky States
              </h1>
              <p>
                Welcome to Sky States. These Terms and Conditions govern your use of our website, services, and educational content. 
                By accessing or using our platform, you agree to be bound by these terms. Please read them carefully before proceeding.
              </p>
              <p>
                This Agreement constitutes a legally binding contract between you and Sky States. If you do not agree to these terms, 
                you should not use our website or services.
              </p>
            </div>

            {/* Acceptance of Agreement Section */}
            <div className="terms-card" id="acceptance">
              <h2>
                📋 1. Acceptance of this Agreement
              </h2>
              <p>
                1.1 By clicking on the 'SIGNUP' option, the participant ("You" or "Your") agrees to the terms and conditions, obligations, 
                representations, warranties and agreements contained herein (the "Agreement"). In the event, You are not willing to accept 
                the Agreement, You shall not be authorized or allowed to proceed further to view or use in any manner any content, information, 
                courseware, products and services ("Services") published, available, or provided on the Sky States website (the "Website"), 
                which is owned, maintained and monitored by Us.
              </p>
            </div>

            {/* User ID and Password Section */}
            <div className="terms-card" id="user-id">
              <h2>
                🔐 2. User ID and Password
              </h2>

              <div className="terms-section">
                <h3>
                  2.1 Exclusive Use
                </h3>
                <p>
                  By entering into this Agreement, You acknowledge and agree that Your user ID and password ("Participant Account") 
                  is for Your exclusive use only. Use or sharing of Your Participant Account with another user is not permitted and is 
                  cause for immediate blocking of Your access to the Website, the Services and the Content and Courseware and termination 
                  of this Agreement.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  2.2 Security Responsibility
                </h3>
                <p>
                  You agree that You are solely responsible for maintaining the confidentiality of Your Participant Account and for all 
                  activities that occur under it. You agree to immediately notify our customer support team at info@skystates.us if You 
                  become aware of or have reason to believe that there is any unauthorised use of Your Participant Account. You also agree 
                  to take all reasonable steps to stop such unauthorised use and to cooperate with Us in any investigation of such 
                  unauthorised uses. We shall not under any circumstances be held liable for any claims related to the use or misuse 
                  of Your Participant Account due to the activities of any third party outside of our control or due to Your failure to 
                  maintain the confidentiality and security of Your Participant Account.
                </p>
              </div>
            </div>

            {/* Content and Courseware Section */}
            <div className="terms-card" id="content">
              <h2>
                📚 3. Content and Courseware
              </h2>

              <div className="terms-section">
                <h3>
                  3.1 Access to Content
                </h3>
                <p>
                  As a part of our Services offered through our Website, We shall grant you access to our content, courseware, practice tests, 
                  and other information, documents, data which may be in audio/video, written, graphic, recorded, photographic or any 
                  machine-readable format in relation to the specific certification training course You have registered for ("Content and Courseware").
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  3.2 Content Updates
                </h3>
                <p>
                  We reserve the right to amend, revise or update the Content and Courseware offered to You. In the event such amendment, 
                  revision or updation occurs, We may require you pay an additional amount of fees to access such amended, revised or updated 
                  Content and Courseware.
                </p>
              </div>
            </div>

            {/* Placement Terms Section */}
            <div className="terms-card" id="placement">
              <h2>
                🎯 4. Placement Terms & Conditions
              </h2>
              <p>
                Sky States is a proud training provider for Technology, Management, Law and other upskilling courses. We work with jobseekers 
                to make them employable, but we don't guarantee any kind of job at any point of time.
              </p>
            </div>

            {/* Usage Terms Section */}
            <div className="terms-card" id="usage">
              <h2>
                🌐 5. Usage of the Website and Services
              </h2>

              <div className="terms-section">
                <h3>
                  5.1 License Grant
                </h3>
                <p>
                  We grant you a personal, restricted, non-transferable, non-exclusive, and revocable license to use the Website, the Services, 
                  and the Content and Courseware offered through the Website till the time the completion of the certification training course 
                  that You have enrolled for or termination of this Agreement according to the terms and conditions set forth herein, whichever 
                  is earlier. The Services and the Content and Courseware are provided solely for Your personal and non-commercial use to 
                  assist you in completing the certification training course You have registered for ("Restricted Purpose").
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  5.2 Online Access
                </h3>
                <p>
                  You are permitted online access to the Website, the Services and the Content and Courseware and may download, save, or print 
                  the Content and Courseware solely for the Restricted Purpose.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  5.3 Usage Restrictions
                </h3>
                <p>
                  You are not permitted to reproduce, transmit, distribute, sub-license, broadcast, disseminate, or prepare derivative works 
                  of the Content and Courseware, or any part thereof, in any manner or through any communication channels or means, for any 
                  purpose other than the Restricted Purpose, without Our prior written consent.
                </p>
              </div>
            </div>

            {/* Intellectual Property Section */}
            <div className="terms-card" id="ip-rights">
              <h2>
                ©️ 6. Intellectual Property Rights
              </h2>

              <div className="terms-section">
                <h3>
                  6.1 Ownership Rights
                </h3>
                <p>
                  While You are granted a limited and non-exclusive right to use the Website, the Services, and the Content and Courseware 
                  for the Restricted Purpose as outlined in this Agreement, You acknowledge and agree that We are the sole and exclusive 
                  owner of the Website, the Services, and the Content and Courseware and as such are vested with all intellectual property 
                  rights and other proprietary rights in the Website, the Services, and the Content and Courseware.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  6.2 Limited Rights
                </h3>
                <p>
                  You acknowledge and agree that this Agreement other than permitting You to use the Website, the Services, and the Content 
                  and Courseware for the Restricted Purpose does not convey to You in any manner or form any right, title or interest of a 
                  proprietary or any other nature in the Website, the Services and the Content and Courseware.
                </p>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="terms-card" id="personal-info">
              <h2>
                👤 7. Usage of Personal Information of Participants
              </h2>
              <p>
                We reserve the right to feature Your picture in any photos, videos, or other promotional material used by Us. Further, We may 
                use Your personal information to inform You about other certification training courses offered by Us. However, We shall not 
                distribute or share Your personal information with any third party marketing database or disclose Your personal information 
                to any third party except on a case-to-case basis after proper verification of such third party or if required under any 
                applicable law.
              </p>
            </div>

            {/* Limitation of Liability Section */}
            <div className="terms-card" id="liability">
              <h2>
                ⚠️ 8. Limitation of Liability
              </h2>

              <div className="terms-section">
                <h3>
                  8.1 Use at Your Own Risk
                </h3>
                <p>
                  You expressly agree that use of the Website, the Services and the Content and Courseware are at Your sole risk. We do not 
                  warrant that the Website or the Services or access to the Content and Courseware will be uninterrupted or error free; nor is 
                  there any warranty as to the results that may be obtained from the use of the Website, the Services or the Content and 
                  Courseware or as to the accuracy or reliability of any information provided through the Website, the Services or the Content 
                  and Courseware. In no event will We or any person or entity involved in creating, producing or distributing the Website, the 
                  Services or the Content and Courseware be liable for any direct, indirect, incidental, special, or consequential damages 
                  arising out of the use of or inability to use the Website, the Services or the Content and Courseware.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  8.2 Disclaimer Coverage
                </h3>
                <p>
                  The disclaimer of liability contained in this clause applies to any damages or injury caused by any failure of performance, 
                  error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, 
                  theft or destruction or unauthorized access to, alteration of, or use of records or any other material, whether for breach of 
                  contract, negligence or under any other cause of action.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  8.3 Third Party Conduct
                </h3>
                <p>
                  You hereby specifically acknowledge that We are not liable for any defamatory, offensive, wrongful, or illegal conduct of 
                  third parties, or other users of the Website, the Services or the Content and Courseware and that the risk of damage or 
                  injury from the foregoing rests entirely with each user.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  8.4 Liability Cap
                </h3>
                <p>
                  You agree that Our liability or the liability of Our affiliates, directors, officers, employees, agents, and licensors, if any, 
                  arising out of any kind of legal claim (whether in contract, tort or otherwise) in any way connected with the Services or the 
                  Content and Courseware shall not exceed the fee you paid to Us for the particular certification training course.
                </p>
              </div>
            </div>

            {/* Term and Termination Section */}
            <div className="terms-card" id="term">
              <h2>
                📅 9. Term and Termination
              </h2>

              <div className="terms-section">
                <h3>
                  9.1 Effective Period
                </h3>
                <p>
                  This Agreement will become effective upon Your acceptance of the terms of this Agreement by Your clicking on the "I ACCEPT" 
                  button and, subject to the terms and conditions of this Agreement, will remain in effect till You maintain a current, fully 
                  paid up online Participant Account, or until terminated by Us, whichever is earlier.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  9.2 Termination Rights
                </h3>
                <p>
                  We reserve the right to terminate this Agreement and block Your access to the Content and Courseware with immediate effect by 
                  sending a written notice through email to You to this effect ("Immediate Termination Date"), if such termination is made as 
                  a result of Your misrepresentation, default, misconduct or breach of Your obligations related to or under this Agreement 
                  ("Event of Default"). On the occurrence of any Event of Default, We shall be authorised to exercise all the rights and 
                  remedies under this Agreement or applicable Law or available in equity to seek indemnification for any Loss or Claim resulting 
                  from any such Event of Default.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  9.3 Surviving Provisions
                </h3>
                <p>
                  The provisions of clause 4.3, clause 7.2, clause 8 and clause 11 of this Agreement shall survive the termination of this Agreement.
                </p>
              </div>
            </div>

            {/* Indemnity Section */}
            <div className="terms-card" id="indemnity">
              <h2>
                🛡️ 10. Indemnity
              </h2>
              <p>
                10.1 You agree to indemnify and hold Us, Our contractors, licensors, directors, officers, employees and agents, harmless from 
                and against any and all claims, losses, damages, liabilities and expenses including attorneys' fees, arising out of Your 
                unauthorised use of the Website, the Services and the Content and Courseware or any violation or breach of this Agreement 
                or any provisions hereof.
              </p>
            </div>

            {/* Waiver Section */}
            <div className="terms-card" id="waiver">
              <h2>
                🤝 11. Waiver
              </h2>
              <p>
                11.1 Neither failure nor delay on the part of any party to exercise any right, remedy, power or privilege hereunder shall operate 
                as a waiver thereof, or of the exercise of any other right, remedy, power or privilege. No term of this Agreement shall be 
                deemed waived, and no breach consented to, unless such waiver or consent shall be in writing and signed by the party claimed 
                to have waived or consented. No waiver of any rights or consent to any breaches shall constitute a waiver of any other rights 
                or consent to any other breach.
              </p>
            </div>

            {/* Severability Section */}
            <div className="terms-card" id="severability">
              <h2>
                📎 12. Severability
              </h2>
              <p>
                12.1 In the event any provision of this Agreement is held invalid or unenforceable under the applicable laws of India, the 
                remaining provisions shall continue in full force and effect. The Agreement shall be deemed to be reformed by replacing such 
                invalidated or unenforceable provision with a valid and enforceable provision that gives effect as closely as possible to the 
                intentions of the parties as expressed by the invalidated or unenforceable provision.
              </p>
            </div>

            {/* Governing Law Section */}
            <div className="terms-card" id="governing-law">
              <h2>
                ⚖️ 13. Governing Law and Jurisdiction
              </h2>

              <div className="terms-section">
                <h3>
                  13.1 U.S. Residents
                </h3>
                <p>
                  For Participants who are a resident of the U.S.A., this Agreement shall be governed by and construed in accordance with the 
                  Laws of Massachusetts and the courts in Massachusetts shall have the exclusive jurisdiction over any matter relating to, in 
                  connection with, or arising out of, this Agreement.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  13.2 Non-U.S. Residents
                </h3>
                <p>
                  For Participants who are not a resident of the U.S.A., this Agreement shall be governed by and construed in accordance 
                  with the Laws of India, and the courts in Noida, India shall have the exclusive jurisdiction over any matter relating to, 
                  in connection with, or arising out of, this Agreement.
                </p>
              </div>
            </div>

            {/* Amendment Section */}
            <div className="terms-card" id="amendment">
              <h2>
                📝 14. Amendment and Assignment
              </h2>

              <div className="terms-section">
                <h3>
                  14.1 Amendment Rights
                </h3>
                <p>
                  We reserve the right to unilaterally amend or modify this Agreement without giving any prior notification to You. We shall 
                  however publish the revised agreement on the Website so that You are aware of the revisions, modifications and amendments 
                  made by Us to this Agreement. You acknowledge and agree that it is Your responsibility to check the Website periodically for 
                  any revisions, modifications and amendments. Your continued use of or access to the Website, the Services and the Content 
                  and Courseware following the posting of any changes to this Agreement shall constitute acceptance of those changes.
                </p>
              </div>

              <div className="terms-section">
                <h3>
                  14.2 Assignment Restrictions
                </h3>
                <p>
                  You are not permitted to assign this Agreement or the rights and obligations mentioned in this Agreement to any third party 
                  and You only shall be held liable for any breach of this Agreement or any terms and conditions hereof.
                </p>
              </div>
            </div>

            {/* Entire Agreement Section */}
            <div className="terms-card" id="entire-agreement">
              <h2>
                📋 15. Entire Agreement
              </h2>
              <p>
                15.1 This Agreement, along with the privacy policy, refund policy, rescheduling policy, terms of use, and any additional 
                guidelines, rules, and/or disclaimers posted on the Website constitutes the entire agreement governing Your use of our 
                Website and supersedes any prior agreements, if any, relating to any matter dealt with in this Agreement.
              </p>
            </div>

            {/* Contact Information Section */}
            <div className="terms-card" id="contact">
              <h2>
                📞 Contact Us
              </h2>
              <p>
                If you have any questions or concerns about these Terms and Conditions, please contact us at:
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

              <div className="terms-section">
                <p>
                  Our legal team will respond to your inquiries within 30 days and work to address any concerns you may 
                  have about these Terms and Conditions or your use of our services.
                </p>
              </div>
            </div>

            {/* Sticky Navigation */}
            <div className={`sticky-nav ${isScrolled ? 'scrolled' : ''}`}>
              <div className="container">
                <div className="nav-list">
                  <a 
                    href="#acceptance" 
                    className={`nav-item ${activeSection === 'acceptance' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('acceptance');
                    }}
                  >
                    Acceptance
                  </a>
                  <a 
                    href="#user-id" 
                    className={`nav-item ${activeSection === 'user-id' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('user-id');
                    }}
                  >
                    User ID
                  </a>
                  <a 
                    href="#content" 
                    className={`nav-item ${activeSection === 'content' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('content');
                    }}
                  >
                    Content
                  </a>
                  <a 
                    href="#usage" 
                    className={`nav-item ${activeSection === 'usage' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('usage');
                    }}
                  >
                    Usage
                  </a>
                  <a 
                    href="#liability" 
                    className={`nav-item ${activeSection === 'liability' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('liability');
                    }}
                  >
                    Liability
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
                  What happens if I share my account credentials?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  Sharing your account credentials is strictly prohibited and may result in immediate termination of your account 
                  and access to all services. You are solely responsible for maintaining the security of your account.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 1 ? 'expanded' : ''}`} onClick={() => toggleFaq(1)}>
                <div className="faq-question">
                  Can I use the course content for commercial purposes?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  No, all content and courseware are provided for your personal, non-commercial use only. You cannot reproduce, 
                  distribute, or create derivative works without our prior written consent.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 2 ? 'expanded' : ''}`} onClick={() => toggleFaq(2)}>
                <div className="faq-question">
                  Does Sky States guarantee job placement?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  No, we do not guarantee any kind of job placement. We work with jobseekers to make them employable through our 
                  training programs, but employment is not guaranteed.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 3 ? 'expanded' : ''}`} onClick={() => toggleFaq(3)}>
                <div className="faq-question">
                  How can I terminate my agreement?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  You can stop using our services at any time. We reserve the right to terminate the agreement for breaches such as 
                  account sharing, misconduct, or violation of terms. Termination will result in loss of access to all content.
                </div>
              </div>

              <div className={`faq-item ${expandedFaq === 4 ? 'expanded' : ''}`} onClick={() => toggleFaq(4)}>
                <div className="faq-question">
                  What laws govern this agreement?
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">
                  For U.S. residents, the agreement is governed by Massachusetts laws. For non-U.S. residents, it's governed by 
                  Indian laws with jurisdiction in Noida, India.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
