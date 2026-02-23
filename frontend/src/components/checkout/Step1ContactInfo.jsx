import React, { useState, useEffect } from 'react';

const Step1ContactInfo = ({ data, onChange, validation, onNext }) => {
  const [touched, setTouched] = useState({});
  const [phoneCountryCode, setPhoneCountryCode] = useState('+1');

  const topCountries = [
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
    { code: 'CA', name: 'Canada', dialCode: '+1' },
    { code: 'AU', name: 'Australia', dialCode: '+61' },
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'DE', name: 'Germany', dialCode: '+49' },
    { code: 'FR', name: 'France', dialCode: '+33' },
    { code: 'JP', name: 'Japan', dialCode: '+81' },
    { code: 'CN', name: 'China', dialCode: '+86' },
    { code: 'BR', name: 'Brazil', dialCode: '+55' }
  ];

  const allCountries = [
    ...topCountries,
    { code: 'AF', name: 'Afghanistan', dialCode: '+93' },
    { code: 'AL', name: 'Albania', dialCode: '+355' },
    { code: 'DZ', name: 'Algeria', dialCode: '+213' },
    { code: 'AR', name: 'Argentina', dialCode: '+54' },
    { code: 'AT', name: 'Austria', dialCode: '+43' },
    { code: 'BD', name: 'Bangladesh', dialCode: '+880' },
    { code: 'BE', name: 'Belgium', dialCode: '+32' },
    { code: 'BG', name: 'Bulgaria', dialCode: '+359' },
    { code: 'CL', name: 'Chile', dialCode: '+56' },
    { code: 'CO', name: 'Colombia', dialCode: '+57' },
    { code: 'HR', name: 'Croatia', dialCode: '+385' },
    { code: 'CZ', name: 'Czech Republic', dialCode: '+420' },
    { code: 'DK', name: 'Denmark', dialCode: '+45' },
    { code: 'EG', name: 'Egypt', dialCode: '+20' },
    { code: 'EE', name: 'Estonia', dialCode: '+372' },
    { code: 'FI', name: 'Finland', dialCode: '+358' },
    { code: 'GR', name: 'Greece', dialCode: '+30' },
    { code: 'HK', name: 'Hong Kong', dialCode: '+852' },
    { code: 'HU', name: 'Hungary', dialCode: '+36' },
    { code: 'ID', name: 'Indonesia', dialCode: '+62' },
    { code: 'IE', name: 'Ireland', dialCode: '+353' },
    { code: 'IL', name: 'Israel', dialCode: '+972' },
    { code: 'IT', name: 'Italy', dialCode: '+39' },
    { code: 'JO', name: 'Jordan', dialCode: '+962' },
    { code: 'KE', name: 'Kenya', dialCode: '+254' },
    { code: 'LV', name: 'Latvia', dialCode: '+371' },
    { code: 'LT', name: 'Lithuania', dialCode: '+370' },
    { code: 'LU', name: 'Luxembourg', dialCode: '+352' },
    { code: 'MY', name: 'Malaysia', dialCode: '+60' },
    { code: 'MX', name: 'Mexico', dialCode: '+52' },
    { code: 'NL', name: 'Netherlands', dialCode: '+31' },
    { code: 'NZ', name: 'New Zealand', dialCode: '+64' },
    { code: 'NG', name: 'Nigeria', dialCode: '+234' },
    { code: 'NO', name: 'Norway', dialCode: '+47' },
    { code: 'PK', name: 'Pakistan', dialCode: '+92' },
    { code: 'PH', name: 'Philippines', dialCode: '+63' },
    { code: 'PL', name: 'Poland', dialCode: '+48' },
    { code: 'PT', name: 'Portugal', dialCode: '+351' },
    { code: 'RO', name: 'Romania', dialCode: '+40' },
    { code: 'RU', name: 'Russia', dialCode: '+7' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
    { code: 'SG', name: 'Singapore', dialCode: '+65' },
    { code: 'SK', name: 'Slovakia', dialCode: '+421' },
    { code: 'SI', name: 'Slovenia', dialCode: '+386' },
    { code: 'ZA', name: 'South Africa', dialCode: '+27' },
    { code: 'KR', name: 'South Korea', dialCode: '+82' },
    { code: 'ES', name: 'Spain', dialCode: '+34' },
    { code: 'SE', name: 'Sweden', dialCode: '+46' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41' },
    { code: 'TH', name: 'Thailand', dialCode: '+66' },
    { code: 'TR', name: 'Turkey', dialCode: '+90' },
    { code: 'UA', name: 'Ukraine', dialCode: '+380' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
    { code: 'VE', name: 'Venezuela', dialCode: '+58' },
    { code: 'VN', name: 'Vietnam', dialCode: '+84' }
  ];

  useEffect(() => {
    const selectedCountry = allCountries.find(country => country.code === data.country);
    if (selectedCountry) {
      setPhoneCountryCode(selectedCountry.dialCode);
    }
  }, [data.country]);

  const handleFieldBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleCountryChange = (value) => {
    onChange('country', value);
    const selectedCountry = allCountries.find(country => country.code === value);
    if (selectedCountry) {
      setPhoneCountryCode(selectedCountry.dialCode);
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
