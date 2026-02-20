import React, { useState, useEffect } from 'react';

const Step1ContactInfo = ({ data, onChange, validation, onNext }) => {
  const [touched, setTouched] = useState({});
  const [phoneCountryCode, setPhoneCountryCode] = useState('+1');

  const topCountries = [
    { code: 'US', name: 'United States', code: '+1' },
    { code: 'GB', name: 'United Kingdom', code: '+44' },
    { code: 'CA', name: 'Canada', code: '+1' },
    { code: 'AU', name: 'Australia', code: '+61' },
    { code: 'IN', name: 'India', code: '+91' },
    { code: 'DE', name: 'Germany', code: '+49' },
    { code: 'FR', name: 'France', code: '+33' },
    { code: 'JP', name: 'Japan', code: '+81' },
    { code: 'CN', name: 'China', code: '+86' },
    { code: 'BR', name: 'Brazil', code: '+55' }
  ];

  const allCountries = [
    ...topCountries,
    { code: 'AF', name: 'Afghanistan', code: '+93' },
    { code: 'AL', name: 'Albania', code: '+355' },
    { code: 'DZ', name: 'Algeria', code: '+213' },
    { code: 'AR', name: 'Argentina', code: '+54' },
    { code: 'AT', name: 'Austria', code: '+43' },
    { code: 'BD', name: 'Bangladesh', code: '+880' },
    { code: 'BE', name: 'Belgium', code: '+32' },
    { code: 'BG', name: 'Bulgaria', code: '+359' },
    { code: 'CL', name: 'Chile', code: '+56' },
    { code: 'CO', name: 'Colombia', code: '+57' },
    { code: 'HR', name: 'Croatia', code: '+385' },
    { code: 'CZ', name: 'Czech Republic', code: '+420' },
    { code: 'DK', name: 'Denmark', code: '+45' },
    { code: 'EG', name: 'Egypt', code: '+20' },
    { code: 'EE', name: 'Estonia', code: '+372' },
    { code: 'FI', name: 'Finland', code: '+358' },
    { code: 'GR', name: 'Greece', code: '+30' },
    { code: 'HK', name: 'Hong Kong', code: '+852' },
    { code: 'HU', name: 'Hungary', code: '+36' },
    { code: 'ID', name: 'Indonesia', code: '+62' },
    { code: 'IE', name: 'Ireland', code: '+353' },
    { code: 'IL', name: 'Israel', code: '+972' },
    { code: 'IT', name: 'Italy', code: '+39' },
    { code: 'JO', name: 'Jordan', code: '+962' },
    { code: 'KE', name: 'Kenya', code: '+254' },
    { code: 'LV', name: 'Latvia', code: '+371' },
    { code: 'LT', name: 'Lithuania', code: '+370' },
    { code: 'LU', name: 'Luxembourg', code: '+352' },
    { code: 'MY', name: 'Malaysia', code: '+60' },
    { code: 'MX', name: 'Mexico', code: '+52' },
    { code: 'NL', name: 'Netherlands', code: '+31' },
    { code: 'NZ', name: 'New Zealand', code: '+64' },
    { code: 'NG', name: 'Nigeria', code: '+234' },
    { code: 'NO', name: 'Norway', code: '+47' },
    { code: 'PK', name: 'Pakistan', code: '+92' },
    { code: 'PH', name: 'Philippines', code: '+63' },
    { code: 'PL', name: 'Poland', code: '+48' },
    { code: 'PT', name: 'Portugal', code: '+351' },
    { code: 'RO', name: 'Romania', code: '+40' },
    { code: 'RU', name: 'Russia', code: '+7' },
    { code: 'SA', name: 'Saudi Arabia', code: '+966' },
    { code: 'SG', name: 'Singapore', code: '+65' },
    { code: 'SK', name: 'Slovakia', code: '+421' },
    { code: 'SI', name: 'Slovenia', code: '+386' },
    { code: 'ZA', name: 'South Africa', code: '+27' },
    { code: 'KR', name: 'South Korea', code: '+82' },
    { code: 'ES', name: 'Spain', code: '+34' },
    { code: 'SE', name: 'Sweden', code: '+46' },
    { code: 'CH', name: 'Switzerland', code: '+41' },
    { code: 'TH', name: 'Thailand', code: '+66' },
    { code: 'TR', name: 'Turkey', code: '+90' },
    { code: 'UA', name: 'Ukraine', code: '+380' },
    { code: 'AE', name: 'United Arab Emirates', code: '+971' },
    { code: 'VE', name: 'Venezuela', code: '+58' },
    { code: 'VN', name: 'Vietnam', code: '+84' }
  ];

  useEffect(() => {
    const selectedCountry = allCountries.find(country => country.code === data.country);
    if (selectedCountry) {
      setPhoneCountryCode(selectedCountry.code);
    }
  }, [data.country]);

  const handleFieldBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleCountryChange = (value) => {
    onChange('country', value);
    const selectedCountry = allCountries.find(country => country.code === value);
    if (selectedCountry) {
      setPhoneCountryCode(selectedCountry.code);
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned;
  };

  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value);
    onChange('phone', formatted);
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
      data.country &&
      !validation.fullName &&
      !validation.email &&
      !validation.phone &&
      !validation.country
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
        <p>We need this information to process your order and send you confirmation.</p>
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
          <div className="phone-input-group">
            <div className="country-code">
              <span>{phoneCountryCode}</span>
            </div>
            <input
              type="tel"
              id="phone"
              className={`form-input phone-field ${touched.phone && validation.phone ? 'error' : ''}`}
              value={data.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => handleFieldBlur('phone')}
              placeholder="(555) 123-4567"
              autoComplete="tel"
              required
            />
          </div>
          {touched.phone && validation.phone && (
            <span className="error-message">{validation.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country" className="form-label">
            Country <span className="required">*</span>
          </label>
          <select
            id="country"
            className={`form-select ${touched.country && validation.country ? 'error' : ''}`}
            value={data.country}
            onChange={(e) => handleCountryChange(e.target.value)}
            onBlur={() => handleFieldBlur('country')}
            required
          >
            <option value="">Select your country</option>
            <optgroup label="Popular Countries">
              {topCountries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="All Countries">
              {allCountries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </optgroup>
          </select>
          {touched.country && validation.country && (
            <span className="error-message">{validation.country}</span>
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
