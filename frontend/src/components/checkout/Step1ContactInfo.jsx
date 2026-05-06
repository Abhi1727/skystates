import React, { useState } from 'react';

const Step1ContactInfo = ({ data, onChange, validation, onNext }) => {
  const [touched, setTouched] = useState({});

  const handleFieldBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handlePhoneChange = (value) => {
    const cleaned = value.replace(/\D/g, '');
    onChange('phone', cleaned);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isFormValid = () => {
    return (
      data.fullName.trim() &&
      validateEmail(data.email) &&
      data.phone.trim() &&
      !validation.fullName &&
      !validation.email &&
      !validation.phone
    );
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
        <h2>Contact Information</h2>
        <p>We only need your name, email, and phone to process your order and send confirmation.</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            className={`form-input ${touched.fullName && validation.fullName ? 'error' : ''}`}
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            onBlur={() => handleFieldBlur('fullName')}
            placeholder="John Doe"
            autoComplete="name"
            required
          />
          {touched.fullName && validation.fullName && (
            <span className="error-message">{validation.fullName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            className={`form-input ${touched.email && validation.email ? 'error' : ''}`}
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            onBlur={() => handleFieldBlur('email')}
            placeholder="john@example.com"
            autoComplete="email"
            required
          />
          {touched.email && validation.email && (
            <span className="error-message">{validation.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            className={`form-input ${touched.phone && validation.phone ? 'error' : ''}`}
            value={data.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => handleFieldBlur('phone')}
            placeholder="5551234567"
            autoComplete="tel"
            required
          />
          {touched.phone && validation.phone && (
            <span className="error-message">{validation.phone}</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="next-button"
            disabled={!isFormValid()}
          >
            Continue to Payment
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </form>

      <div className="security-note">
        <svg className="lock-icon" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>Your information is secure and encrypted. We never share your data with third parties.</p>
      </div>
    </div>
  );
};

export default Step1ContactInfo;
