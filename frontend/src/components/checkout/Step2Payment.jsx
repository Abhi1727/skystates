import React, { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const Step2Payment = ({ data, onChange, onBack, onNext, validation }) => {
  const [saveCardEnabled, setSaveCardEnabled] = useState(false);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        iconColor: '#666EE8',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Cards',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="payment-icon">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2"/>
          <line x1="6" y1="14" x2="8" y2="14" stroke="currentColor" strokeWidth="2"/>
          <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      description: 'Visa, Mastercard, American Express, Discover'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="payment-icon">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.419c.103-.596.646-1.056 1.27-1.056h7.18c3.626 0 5.996 1.908 5.996 5.4v0c0 3.6-2.376 5.4-6.012 5.4h-2.68l-1.378 7.932a.641.641 0 0 1-.633.542h-1.61zM7.7 3.375L5.52 17.523h1.11l1.24-7.2h2.68c2.964 0 4.68-1.332 4.68-4.2 0-2.736-1.716-3.744-4.68-3.744H7.7z"/>
          <path d="M20.844 8.4c-.324 0-.648.216-.648.54v.108c0 2.808-1.836 4.212-4.68 4.212h-2.68l-.972 5.508h1.62l.756-4.32h2.592c3.024 0 5.4-1.764 5.4-5.292v-.108c0-.324-.324-.548-.648-.548z"/>
        </svg>
      ),
      description: 'Fast and secure payment'
    },
    {
      id: 'klarna',
      name: 'Klarna',
      icon: (
        <span style={{ fontWeight: 700, fontSize: '14px', color: '#ffb3c7' }}>Klarna</span>
      ),
      description: 'Pay in 4 interest-free installments'
    },
    {
      id: 'afterpay',
      name: 'Afterpay',
      icon: (
        <span style={{ fontWeight: 700, fontSize: '13px', color: '#b2fce4' }}>afterpay</span>
      ),
      description: 'Pay in 4 interest-free installments'
    }
  ];

  const expressPaymentMethods = [
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="express-icon">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.38-1.09-.52-2.09-.46-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
      )
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: (
        <svg viewBox="0 0 24 24" className="express-icon">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4285F4"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#34A853"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#FBBC05"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#EA4335"/>
        </svg>
      )
    }
  ];

  const handlePaymentMethodChange = (method) => {
    onChange('method', method);
  };

  const handleSaveCardToggle = (enabled) => {
    setSaveCardEnabled(enabled);
    onChange('saveCard', enabled);
  };

  const handleExpressPayment = (method) => {
    console.log(`Express payment with ${method}`);
  };

  const isFormValid = () => {
    return data.method && !validation.payment;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      onNext();
    }
  };

  return (
    <div className="checkout-step active">
      <div className="step-header">
        <h2>Payment Method</h2>
        <p>Choose your preferred payment method. All transactions are secure and encrypted.</p>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          <div className="payment-method-cards">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`payment-card ${data.method === method.id ? 'active' : ''}`}
                onClick={() => handlePaymentMethodChange(method.id)}
              >
                <div className="payment-card-header">
                  <div className="payment-radio">
                    <input
                      type="radio"
                      id={method.id}
                      name="paymentMethod"
                      value={method.id}
                      checked={data.method === method.id}
                      onChange={() => handlePaymentMethodChange(method.id)}
                    />
                    <span className="radio-custom"></span>
                  </div>
                  <div className="payment-icon-wrapper">
                    {method.icon}
                  </div>
                  <div className="payment-info">
                    <label htmlFor={method.id} className="payment-name">
                      {method.name}
                    </label>
                    <p className="payment-description">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.method === 'card' && (
          <div className="card-details">
            <h3>Card Information</h3>
            <div className="card-element-wrapper">
              <CardElement options={cardElementOptions} />
            </div>
            
            <div className="save-card-option">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={saveCardEnabled}
                  onChange={(e) => handleSaveCardToggle(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Save card for future purchases</span>
              </label>
              <p className="save-card-note">Your card information will be stored securely for faster checkout next time.</p>
            </div>
          </div>
        )}

        {(data.method === 'klarna' || data.method === 'afterpay') && (
          <div className="paypal-details">
            <div className="paypal-info">
              <h3>{data.method === 'klarna' ? 'Klarna' : 'Afterpay'} Information</h3>
              <p>You will be redirected to {data.method === 'klarna' ? 'Klarna' : 'Afterpay'} to complete your payment. Pay in 4 interest-free installments.</p>
              <div className="paypal-features">
                <div className="feature">
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>4 interest-free payments</span>
                </div>
                <div className="feature">
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>No fees when you pay on time</span>
                </div>
                <div className="feature">
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Instant approval decision</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {data.method === 'paypal' && (
          <div className="paypal-details">
            <div className="paypal-info">
              <h3>PayPal Information</h3>
              <p>You will be redirected to PayPal to complete your payment securely.</p>
              <div className="paypal-features">
                <div className="feature">
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Buyer Protection</span>
                </div>
                <div className="feature">
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Easy Returns</span>
                </div>
                <div className="feature">
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Fast & Secure</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="express-checkout">
          <div className="express-divider">
            <span>Or pay with</span>
          </div>
          <div className="express-methods">
            {expressPaymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                className="express-button"
                onClick={() => handleExpressPayment(method.id)}
              >
                {method.icon}
                <span>{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {validation.payment && (
          <div className="error-message payment-error">
            {validation.payment}
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="back-button" onClick={onBack}>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Contact
          </button>
          <button type="submit" className="next-button" disabled={!isFormValid()}>
            Review Order
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </form>

      <div className="security-badges">
        <div className="badge">
          <svg className="shield-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>SSL Encrypted</span>
        </div>
        <div className="badge">
          <svg className="lock-icon" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Secure Payment</span>
        </div>
        <div className="badge">
          <svg className="check-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>PCI Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default Step2Payment;
