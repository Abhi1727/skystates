import React from 'react';

const RefundReturns = () => {
  return (
    <div className="refund-returns">
      {/* Hero Section */}
      <section className="page-hero" style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>
            Refund and Returns Policy
          </h1>
          <p style={{ fontSize: '20px', opacity: '0.9', maxWidth: '800px', margin: '0 auto' }}>
            Learn about Sky States' refund and returns policy, including conditions, processing time, and how to request a refund
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="policy-content" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#333'
          }}>
            <p style={{ marginBottom: '30px' }}>
              At Sky States, we are dedicated to ensuring that our users have a positive and enriching experience 
              with our training courses, whether they are online or in a classroom setting. We understand that circumstances can change, 
              and we want to be as fair and transparent as possible with our refund policies. By purchasing a course on the Sky States 
              website, you agree to our Privacy Policy, Terms of Use, and the refund terms outlined below.
            </p>

            {/* Long-Term Courses Section */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: '40px'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2c3e50', marginBottom: '20px' }}>
                Long-Term Courses (Duration 6 Months and Above)
              </h2>
              
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                How to Cancel
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                If you need to cancel your enrollment, please notify us in person, by email, by Certified Mail, 
                or through direct communication with Sky States. The cancellation will be effective on the date notice is postmarked or received.
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                Refund Policy
              </h3>
              
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#2c3e50', marginBottom: '10px' }}>
                  Full Refund:
                </h4>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  If we do not accept your application or if you cancel within three business days of signing agreement and 
                  making your initial payment, you will receive a full refund.
                </p>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  If you don't find the course satisfactory or for any other reason, you can request a cancellation. 
                  Your access to the course will be canceled, and the student will be charged only for the number of classes they have attended.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#2c3e50', marginBottom: '10px' }}>
                  Before Classes Begin:
                </h4>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  If you cancel after admission but before your first class, you will receive a refund of all money paid 
                  except for the registration fee (capped at $99).
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#2c3e50', marginBottom: '10px' }}>
                  During Drop/Add Period:
                </h4>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  If you withdraw during the first week of classes, You will receive a refund of All tuition and fees 
                  except for the registration fee.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#2c3e50', marginBottom: '10px' }}>
                  After Drop/Add Period:
                </h4>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  No refunds will be issued after the first week of classes.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#2c3e50', marginBottom: '10px' }}>
                  Withdrawal from Program:
                </h4>
                <p style={{ color: '#666' }}>
                  If you withdraw from the program, above refund structure will apply.
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
              Short-Term Courses (Duration Less Than 6 Months)
            </h3>

            {/* Classroom Training Section */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: '20px'
            }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#2c3e50', marginBottom: '15px' }}>
                Classroom Training / Instructor-Led Online Training
              </h4>
              
              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                  Sky States Cancellations:
                </h5>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  We may need to postpone or cancel an event due to insufficient enrollments, instructor illness, or 
                  force majeure events (e.g., natural disasters, political instability). If we cancel an event, you will receive a 100% refund.
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                  Delegate Cancellations:
                </h5>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  <strong>7 Days or More Before Event:</strong> 90% refund of total paid fee (10% retained as a processing fee).
                </p>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  <strong>Less Than 7 Days Before Event:</strong> No refunds will be provided.
                </p>
              </div>

              <div>
                <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                  Online Training:
                </h5>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  <strong>Delegate Cancellations:</strong>
                </p>
                <p style={{ color: '#666', marginLeft: '20px', marginBottom: '10px' }}>
                  <strong>Within 48 Hours of Subscription:</strong> 95% refund of total paid fee (5% retained as an administration fee).
                </p>
                <p style={{ color: '#666', marginLeft: '20px', marginBottom: '10px' }}>
                  <strong>After 48 Hours of Subscription:</strong> No refunds will be issued.
                </p>
              </div>

              <div>
                <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                  Third-Party Courses:
                </h5>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  For courses provided by third parties (e.g., Microsoft Azure Registration, MS SharePoint), we will refund 50% 
                  of total paid fee if cancelled within 48 hours. No refunds will be issued after 48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* USA Consumer Protection Law Section */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2c3e50', marginBottom: '20px' }}>
              USA Consumer Protection Law
            </h2>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              USA customers are entitled to a full refund within 14 days of purchase if the content has not been consumed or accessed.
            </p>
          </div>

          {/* Duplicate Payment Section */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2c3e50', marginBottom: '20px' }}>
              Duplicate Payment
            </h2>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              If you accidentally make a duplicate payment, we will process a refund via the original payment method 
              within 5 to 7 working days after notification.
            </p>
          </div>

          {/* General Note Section */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2c3e50', marginBottom: '20px' }}>
              General Note
            </h2>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              All refunds will be processed within 30 days of receiving the refund request.
            </p>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              If you have any questions or need assistance, don't hesitate to get in touch with our support team at 
              <a href="mailto:info@skystates.us" style={{ color: '#2c3e50', textDecoration: 'underline' }}>
                info@skystates.us
              </a>
              . We are here to help and ensure you have the best possible experience with Sky States.
            </p>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Sky States offers a diverse range of professional courses designed to empower students across multiple domains, 
              including software development, cybersecurity, data science, artificial intelligence, cloud computing, and various other emerging fields.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                Quick Links
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/" style={{ color: '#2c3e50', textDecoration: 'none' }}>Home</a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/jobs" style={{ color: '#2c3e50', textDecoration: 'none' }}>Live Job</a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/refund-returns" style={{ color: '#2c3e50', textDecoration: 'none' }}>Program</a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/refund-returns" style={{ color: '#2c3e50', textDecoration: 'none' }}>One To One</a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/refund-returns" style={{ color: '#2c3e50', textDecoration: 'none' }}>Register Now</a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/refund-returns" style={{ color: '#2c3e50', textDecoration: 'none' }}>More</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                Policies
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/contact-us" style={{ color: '#2c3e50', textDecoration: 'none' }}>Contact Us</a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="/coming-soon" style={{ color: '#2c3e50', textDecoration: 'none' }}>Coming Soon</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                Contacts
              </h3>
              <div style={{ color: '#666', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Add:</strong> 30 N Gould St, Sheridan, WY, 82801, USA
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Call:</strong> (888) 810-2434
                </p>
                <p style={{ marginBottom: '20px' }}>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@skystates.us" style={{ color: '#2c3e50', textDecoration: 'underline' }}>
                    info@skystates.us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundReturns;
