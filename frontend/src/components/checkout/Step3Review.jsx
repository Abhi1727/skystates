import React, { useState } from 'react';

const Step3Review = ({ contactData, paymentData, items, coupon, subtotal, total, onBack, onConfirm, loading }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'paypal':
        return 'PayPal';
      default:
        return method;
    }
  };

  const getCountryName = (countryCode) => {
    const countries = {
      'US': 'United States',
      'GB': 'United Kingdom',
      'CA': 'Canada',
      'AU': 'Australia',
      'IN': 'India',
      'DE': 'Germany',
      'FR': 'France',
      'JP': 'Japan',
      'CN': 'China',
      'BR': 'Brazil'
    };
    return countries[countryCode] || countryCode;
  };

  const formatPhoneNumber = (phone, countryCode) => {
    if (!phone) return '';
    
    const cleaned = phone.replace(/\D/g, '');
    
    if (countryCode === '+1' && cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    return phone;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termsAccepted) {
      onConfirm();
    }
  };

  return (
    <div className="checkout-step active">
      <div className="step-header">
        <h2>Review & Confirm</h2>
        <p>Please review your order details before completing your purchase.</p>
      </div>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-sections">
          <div className="review-section">
            <h3>Contact Information</h3>
            <div className="review-grid">
              <div className="review-item">
                <label>Full Name</label>
                <p>{contactData.fullName}</p>
              </div>
              <div className="review-item">
                <label>Email Address</label>
                <p>{contactData.email}</p>
              </div>
              <div className="review-item">
                <label>Phone Number</label>
                <p>{formatPhoneNumber(contactData.phone, '+1')}</p>
              </div>
              <div className="review-item">
                <label>Country</label>
                <p>{getCountryName(contactData.country)}</p>
              </div>
            </div>
            <button type="button" className="edit-button" onClick={onBack}>
              <svg className="edit-icon" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit Contact Info
            </button>
          </div>

          <div className="review-section">
            <h3>Payment Method</h3>
            <div className="payment-review">
              <div className="payment-method-display">
                <div className="payment-icon">
                  {paymentData.method === 'card' ? (
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.419c.103-.596.646-1.056 1.27-1.056h7.18c3.626 0 5.996 1.908 5.996 5.4v0c0 3.6-2.376 5.4-6.012 5.4h-2.68l-1.378 7.932a.641.641 0 0 1-.633.542h-1.61z"/>
                    </svg>
                  )}
                </div>
                <div className="payment-details">
                  <p className="payment-name">{getPaymentMethodName(paymentData.method)}</p>
                  {paymentData.method === 'card' && paymentData.saveCard && (
                    <p className="save-card-note">Card will be saved for future purchases</p>
                  )}
                </div>
              </div>
            </div>
            <button type="button" className="edit-button" onClick={onBack}>
              <svg className="edit-icon" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit Payment Method
            </button>
          </div>

          <div className="review-section">
            <h3>Order Items</h3>
            <div className="order-items">
              {items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.duration}</p>
                  </div>
                  <div className="item-price">{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="review-section order-summary">
            <h3>Order Summary</h3>
            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {coupon && (
                <div className="total-row discount">
                  <span>Discount ({coupon.code}):</span>
                  <span>-${coupon.discountValue.toFixed(2)}</span>
                </div>
              )}
              <div className="total-row final">
                <span>Total:</span>
                <span className="final-amount">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="terms-section">
          <div className="terms-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">
                I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </span>
            </label>
          </div>
          
          <div className="marketing-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">
                Send me course updates and special offers via email
              </span>
            </label>
          </div>
        </div>

        <div className="final-actions">
          <button type="button" className="back-button" onClick={onBack}>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Payment
          </button>
          
          <button
            type="submit"
            className="confirm-button"
            disabled={!termsAccepted || loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Processing...
              </>
            ) : (
              <>
                <svg className="lock-icon" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Complete Purchase
                <span className="total-amount">${total.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>

        <div className="final-security-note">
          <div className="security-icons">
            <svg className="shield-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <svg className="lock-icon" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p>Your payment information is encrypted and secure. We never store your card details.</p>
        </div>
      </form>
    </div>
  );
};

export default Step3Review;
