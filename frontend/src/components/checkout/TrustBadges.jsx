import React from 'react';

const TrustBadges = () => {
  const securityFeatures = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "SSL Encrypted",
      description: "Your data is protected with 256-bit SSL encryption"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Secure Payment",
      description: "PCI DSS compliant payment processing"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Verified Merchant",
      description: "Trusted by thousands of customers worldwide"
    }
  ];

  const paymentMethods = [
    {
      name: "Visa",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.41 3H7.14L9.41 15H6.68L6.24 12.5H2.84L2.41 15H0L2.27 3H4.41M5.86 10.5L5.27 7L4.68 10.5H5.86M13.04 3L15.71 15H13.04L12.45 12.5H9.05L8.61 15H6.34L8.61 3H10.75L11.34 5.5H14.74L15.18 3H13.04M11.59 10.5L11 7L10.41 10.5H11.59M22.91 10.5C22.91 11.33 22.77 12.08 22.5 12.75C22.23 13.42 21.84 14 21.33 14.5C20.82 15 20.23 15.38 19.56 15.65C18.89 15.92 18.14 16.06 17.31 16.06H14.64V3H17.31C18.14 3 18.89 3.14 19.56 3.41C20.23 3.68 20.82 4.06 21.33 4.56C21.84 5.06 22.23 5.64 22.5 6.31C22.77 6.98 22.91 7.73 22.91 8.56V10.5M20.24 8.56C20.24 8.06 20.17 7.61 20.03 7.21C19.89 6.81 19.69 6.47 19.43 6.19C19.17 5.91 18.85 5.69 18.47 5.53C18.09 5.37 17.67 5.29 17.21 5.29H17.14V13.77H17.21C17.67 13.77 18.09 13.69 18.47 13.53C18.85 13.37 19.17 13.15 19.43 12.87C19.69 12.59 19.89 12.25 20.03 11.85C20.17 11.45 20.24 11 20.24 10.5V8.56Z"/>
        </svg>
      )
    },
    {
      name: "Mastercard",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 8V16H7C8.1 16 9 15.1 9 14V10C9 8.9 8.1 8 7 8H3M5 10H7V14H5V10M10 8V16H12C13.1 16 14 15.1 14 14V10C14 8.9 13.1 8 12 8H10M12 10V14H12V10M15 8V16H17C18.1 16 19 15.1 19 14V13C19 11.9 18.1 11 17 11H17V8H15M17 13V14H17V13M20 8V16H22V8H20Z"/>
        </svg>
      )
    },
    {
      name: "American Express",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4M13 15H11V13H9V15H7V9H9V11H11V9H13V15M15 15H14V9H15V15M17 15H16V9H17V15M19 15H18V9H19V15Z"/>
        </svg>
      )
    },
    {
      name: "PayPal",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.419c.103-.596.646-1.056 1.27-1.056h7.18c3.626 0 5.996 1.908 5.996 5.4v0c0 3.6-2.376 5.4-6.012 5.4h-2.68l-1.378 7.932a.641.641 0 0 1-.633.542h-1.61zM7.7 3.375L5.52 17.523h1.11l1.24-7.2h2.68c2.964 0 4.68-1.332 4.68-4.2 0-2.736-1.716-3.744-4.68-3.744H7.7z"/>
        </svg>
      )
    }
  ];

  const guarantees = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "30-Day Money Back",
      description: "Full refund if you're not satisfied"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "24/7 Support",
      description: "Get help whenever you need it"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Instant Access",
      description: "Start learning immediately after purchase"
    }
  ];

  return (
    <div className="trust-badges">
      {/* <div className="trust-section">
        <h4>Security & Trust</h4>
        <div className="security-features">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="security-feature">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <div className="feature-content">
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="trust-section">
        <h4>Accepted Payment Methods</h4>
        <div className="payment-methods">
          {paymentMethods.map((method, index) => (
            <div key={index} className="payment-method" title={method.name}>
              {method.icon}
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="trust-section">
        <h4>Our Guarantees</h4>
        <div className="guarantees">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="guarantee">
              <div className="guarantee-icon">
                {guarantee.icon}
              </div>
              <div className="guarantee-content">
                <h5>{guarantee.title}</h5>
                <p>{guarantee.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="trust-footer">
        <div className="certification">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Verified Business</span>
        </div>
        <div className="rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span>4.9/5 from 10,000+ reviews</span>
        </div>
      </div> */}
    </div>
  );
};

export default TrustBadges;
