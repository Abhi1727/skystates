import React, { useState, useEffect } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const Step2Payment = ({ data, onChange, onBack, onNext, validation }) => {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const paymentElementOptions = {
    layout: 'tabs',
    radios: true,
    spacing: 'comfortable'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="checkout-step active">
      <div className="step-header">
        <h2>Payment Method</h2>
        <p>Pay with debit/credit card, Klarna, Afterpay, or PayPal—all powered by Stripe. Card payments complete here; PayPal, Klarna, or Afterpay may open in a new window.</p>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="payment-element-wrapper">
          <PaymentElement
            options={paymentElementOptions}
            onReady={() => setPaymentComplete(true)}
          />
        </div>

        {validation.payment && (
          <div className="error-message payment-error">{validation.payment}</div>
        )}

        <div className="form-actions">
          <button type="button" className="back-button" onClick={onBack}>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Contact
          </button>
          <button type="submit" className="next-button">
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
