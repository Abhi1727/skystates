import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import ProgressBar from './checkout/ProgressBar';
import './Checkout.css';
import './checkout/CheckoutModern.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    orderNotes: '',
    paymentMethod: 'stripe_cc',
    couponCode: ''
  });

  const [showCoupon, setShowCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Handle direct program enrollment or cart items
  const [directProgram, setDirectProgram] = useState(null);
  const checkoutItems = directProgram ? [directProgram] : cartItems;

  
  // Helper function to get total (works for both cart and direct program)
  const getCheckoutTotal = () => {
    if (directProgram) {
      const price = parseFloat(directProgram.price);
      return isNaN(price) ? 0 : price;
    }
    
    return getCartTotal();
  };

  // Check for direct program enrollment via location state
  useEffect(() => {
    if (location.state?.program) {
      setDirectProgram(location.state.program);
    }
  }, [location.state]);

  // Show empty cart message instead of redirecting
  useEffect(() => {
    if (checkoutItems.length === 0) {
      // Don't redirect, just show empty state
    }
  }, [checkoutItems, navigate]);

  // Stripe configuration
  const stripePromise = loadStripe('pk_test_51QD8TfDyzD57haVrTQo8bVWlVTnPOmwKeCkbkLVzmaAacgeKCNo4cHSZWC15ekYJGej6EfmKELm1ucoeEMtmvhzL00bXi40Xmr');

  const countries = [
    { code: 'US', name: 'United States (US)' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom (UK)' },
    { code: 'AU', name: 'Australia' },
    { code: 'IN', name: 'India' },
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AL', name: 'Albania' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'AS', name: 'American Samoa' },
    { code: 'AD', name: 'Andorra' },
    { code: 'AO', name: 'Angola' },
    { code: 'AI', name: 'Anguilla' },
    { code: 'AQ', name: 'Antarctica' },
    { code: 'AG', name: 'Antigua and Barbuda' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AM', name: 'Armenia' },
    { code: 'AW', name: 'Aruba' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'AZ', name: 'Azerbaijan' },
    { code: 'BS', name: 'Bahamas' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'BB', name: 'Barbados' },
    { code: 'BY', name: 'Belarus' },
    { code: 'PW', name: 'Belau' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BZ', name: 'Belize' },
    { code: 'BJ', name: 'Benin' },
    { code: 'BM', name: 'Bermuda' },
    { code: 'BT', name: 'Bhutan' },
    { code: 'BO', name: 'Bolivia' },
    { code: 'BQ', name: 'Bonaire, Saint Eustatius and Saba' },
    { code: 'BA', name: 'Bosnia and Herzegovina' },
    { code: 'BW', name: 'Botswana' },
    { code: 'BV', name: 'Bouvet Island' },
    { code: 'BR', name: 'Brazil' },
    { code: 'IO', name: 'British Indian Ocean Territory' },
    { code: 'BN', name: 'Brunei' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'BI', name: 'Burundi' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'CA', name: 'Canada' },
    { code: 'CV', name: 'Cape Verde' },
    { code: 'KY', name: 'Cayman Islands' },
    { code: 'CF', name: 'Central African Republic' },
    { code: 'TD', name: 'Chad' },
    { code: 'CL', name: 'Chile' },
    { code: 'CN', name: 'China' },
    { code: 'CX', name: 'Christmas Island' },
    { code: 'CC', name: 'Cocos (Keeling) Islands' },
    { code: 'CO', name: 'Colombia' },
    { code: 'KM', name: 'Comoros' },
    { code: 'CG', name: 'Congo (Brazzaville)' },
    { code: 'CD', name: 'Congo (Kinshasa)' },
    { code: 'CK', name: 'Cook Islands' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CU', name: 'Cuba' },
    { code: 'CW', name: 'Curaçao' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DK', name: 'Denmark' },
    { code: 'DJ', name: 'Djibouti' },
    { code: 'DM', name: 'Dominica' },
    { code: 'DO', name: 'Dominican Republic' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'EG', name: 'Egypt' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'GQ', name: 'Equatorial Guinea' },
    { code: 'ER', name: 'Eritrea' },
    { code: 'EE', name: 'Estonia' },
    { code: 'SZ', name: 'Eswatini' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'FK', name: 'Falkland Islands' },
    { code: 'FO', name: 'Faroe Islands' },
    { code: 'FJ', name: 'Fiji' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'GF', name: 'French Guiana' },
    { code: 'PF', name: 'French Polynesia' },
    { code: 'TF', name: 'French Southern Territories' },
    { code: 'GA', name: 'Gabon' },
    { code: 'GM', name: 'Gambia' },
    { code: 'GE', name: 'Georgia' },
    { code: 'DE', name: 'Germany' },
    { code: 'GH', name: 'Ghana' },
    { code: 'GI', name: 'Gibraltar' },
    { code: 'GR', name: 'Greece' },
    { code: 'GL', name: 'Greenland' },
    { code: 'GD', name: 'Grenada' },
    { code: 'GP', name: 'Guadeloupe' },
    { code: 'GU', name: 'Guam' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'GG', name: 'Guernsey' },
    { code: 'GN', name: 'Guinea' },
    { code: 'GW', name: 'Guinea-Bissau' },
    { code: 'GY', name: 'Guyana' },
    { code: 'HT', name: 'Haiti' },
    { code: 'HM', name: 'Heard Island and McDonald Islands' },
    { code: 'HN', name: 'Honduras' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IS', name: 'Iceland' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IR', name: 'Iran' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IM', name: 'Isle of Man' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'CI', name: 'Ivory Coast' },
    { code: 'JM', name: 'Jamaica' },
    { code: 'JP', name: 'Japan' },
    { code: 'JE', name: 'Jersey' },
    { code: 'JO', name: 'Jordan' },
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'KE', name: 'Kenya' },
    { code: 'KI', name: 'Kiribati' },
    { code: 'XK', name: 'Kosovo' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'KG', name: 'Kyrgyzstan' },
    { code: 'LA', name: 'Laos' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'LR', name: 'Liberia' },
    { code: 'LY', name: 'Libya' },
    { code: 'LI', name: 'Liechtenstein' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MO', name: 'Macao' },
    { code: 'MG', name: 'Madagascar' },
    { code: 'MW', name: 'Malawi' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MV', name: 'Maldives' },
    { code: 'ML', name: 'Mali' },
    { code: 'MT', name: 'Malta' },
    { code: 'MH', name: 'Marshall Islands' },
    { code: 'MQ', name: 'Martinique' },
    { code: 'MR', name: 'Mauritania' },
    { code: 'MU', name: 'Mauritius' },
    { code: 'YT', name: 'Mayotte' },
    { code: 'MX', name: 'Mexico' },
    { code: 'FM', name: 'Micronesia' },
    { code: 'MD', name: 'Moldova' },
    { code: 'MC', name: 'Monaco' },
    { code: 'MN', name: 'Mongolia' },
    { code: 'ME', name: 'Montenegro' },
    { code: 'MS', name: 'Montserrat' },
    { code: 'MA', name: 'Morocco' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'MM', name: 'Myanmar' },
    { code: 'NA', name: 'Namibia' },
    { code: 'NR', name: 'Nauru' },
    { code: 'NP', name: 'Nepal' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NC', name: 'New Caledonia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'NE', name: 'Niger' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'NU', name: 'Niue' },
    { code: 'NF', name: 'Norfolk Island' },
    { code: 'KP', name: 'North Korea' },
    { code: 'MK', name: 'North Macedonia' },
    { code: 'MP', name: 'Northern Mariana Islands' },
    { code: 'NO', name: 'Norway' },
    { code: 'OM', name: 'Oman' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'PS', name: 'Palestinian Territory' },
    { code: 'PA', name: 'Panama' },
    { code: 'PG', name: 'Papua New Guinea' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'PE', name: 'Peru' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PN', name: 'Pitcairn' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'PR', name: 'Puerto Rico' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RE', name: 'Reunion' },
    { code: 'RO', name: 'Romania' },
    { code: 'RU', name: 'Russia' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'ST', name: 'São Tomé and Príncipe' },
    { code: 'BL', name: 'Saint Barthélemy' },
    { code: 'SH', name: 'Saint Helena' },
    { code: 'KN', name: 'Saint Kitts and Nevis' },
    { code: 'LC', name: 'Saint Lucia' },
    { code: 'SX', name: 'Saint Martin (Dutch part)' },
    { code: 'MF', name: 'Saint Martin (French part)' },
    { code: 'PM', name: 'Saint Pierre and Miquelon' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines' },
    { code: 'WS', name: 'Samoa' },
    { code: 'SM', name: 'San Marino' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'SN', name: 'Senegal' },
    { code: 'RS', name: 'Serbia' },
    { code: 'SC', name: 'Seychelles' },
    { code: 'SL', name: 'Sierra Leone' },
    { code: 'SG', name: 'Singapore' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'SB', name: 'Solomon Islands' },
    { code: 'SO', name: 'Somalia' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'GS', name: 'South Georgia/Sandwich Islands' },
    { code: 'KR', name: 'South Korea' },
    { code: 'SS', name: 'South Sudan' },
    { code: 'ES', name: 'Spain' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'SD', name: 'Sudan' },
    { code: 'SR', name: 'Suriname' },
    { code: 'SJ', name: 'Svalbard and Jan Mayen' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'SY', name: 'Syria' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TJ', name: 'Tajikistan' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TL', name: 'Timor-Leste' },
    { code: 'TG', name: 'Togo' },
    { code: 'TK', name: 'Tokelau' },
    { code: 'TO', name: 'Tonga' },
    { code: 'TT', name: 'Trinidad and Tobago' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'TR', name: 'Türkiye' },
    { code: 'TM', name: 'Turkmenistan' },
    { code: 'TC', name: 'Turks and Caicos Islands' },
    { code: 'TV', name: 'Tuvalu' },
    { code: 'UG', name: 'Uganda' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'GB', name: 'United Kingdom (UK)' },
    { code: 'US', name: 'United States (US)' },
    { code: 'UM', name: 'United States (US) Minor Outlying Islands' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'UZ', name: 'Uzbekistan' },
    { code: 'VU', name: 'Vanuatu' },
    { code: 'VA', name: 'Vatican' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'VG', name: 'Virgin Islands (British)' },
    { code: 'VI', name: 'Virgin Islands (US)' },
    { code: 'WF', name: 'Wallis and Futuna' },
    { code: 'EH', name: 'Western Sahara' },
    { code: 'YE', name: 'Yemen' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'ZW', name: 'Zimbabwe' }
  ];

  const usStates = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'DC', name: 'District of Columbia' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
    { code: 'AA', name: 'Armed Forces (AA)' },
    { code: 'AE', name: 'Armed Forces (AE)' },
    { code: 'AP', name: 'Armed Forces (AP)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    setCouponError('');
    
    if (!formData.couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    // Hardcoded coupon validation
    const hardcodedCoupons = [
      {
        id: 'sky-500',
        code: 'SKY500',
        discountType: 'fixed',
        discountValue: 500,
        isActive: true
      }
    ];
    
    const couponCode = formData.couponCode.trim().toUpperCase();
    const coupon = hardcodedCoupons.find(c => c.code === couponCode && c.isActive);
    
    if (coupon) {
      setAppliedCoupon(couponCode);
      setCouponData(coupon);
      setShowCoupon(false);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  // Calculate discount amount
  const calculateDiscount = () => {
    if (!couponData || !appliedCoupon) return 0;
    
    return parseFloat(couponData.discountValue) || 0;
  };

  // Calculate final total after discount
  const getFinalTotal = () => {
    const cartTotal = getCheckoutTotal();
    const discount = calculateDiscount();
    return Math.max(0, cartTotal - discount);
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponData(null);
    setCouponError('');
    setFormData(prev => ({ ...prev, couponCode: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Checkout submitted:', { 
        ...formData, 
        checkoutItems, 
        subtotal: getCheckoutTotal(),
        discount: calculateDiscount(),
        total: getFinalTotal(),
        coupon: appliedCoupon 
      });
      setOrderComplete(true);
      
      // Clear cart after successful order
      clearCart();
      
      // In a real implementation, you would:
      // 1. Process payment with Stripe/PayPal
      // 2. Send order data to backend
      // 3. Handle success/error responses
      
    } catch (error) {
      setPaymentError('Payment failed. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Show empty cart message if cart is empty
  if (checkoutItems.length === 0 && !orderComplete) {
    return (
      <div className="woocommerce" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Your cart is empty</h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '30px' }}>
          Add some courses to your cart to proceed with checkout.
        </p>
        <Link 
          to="/" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#0073aa',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="woocommerce" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div className="woocommerce-message" role="alert" style={{
          background: '#d4edda',
          color: '#155724',
          padding: '20px',
          marginBottom: '30px',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          fontSize: '16px'
        }}>
          <strong>Thank you for your order!</strong><br />
          Your order has been received and is now being processed. You will receive a confirmation email shortly.
        </div>
        <h2>Order Details</h2>
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          {checkoutItems.map((item, index) => (
            <div key={index} style={{ marginBottom: '15px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
              <p style={{ margin: '0 0 5px 0', color: '#666' }}>{item.duration}</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{item.price}</p>
            </div>
          ))}
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
            <h3>Order Summary</h3>
            <p><strong>Subtotal:</strong> ${getCheckoutTotal().toFixed(2)}</p>
            {appliedCoupon && couponData && (
              <>
                <p><strong>Discount ({appliedCoupon}):</strong> -${calculateDiscount().toFixed(2)}</p>
                <p><strong>Total:</strong> ${getFinalTotal().toFixed(2)}</p>
              </>
            )}
            {!appliedCoupon && (
              <p><strong>Total:</strong> ${getCheckoutTotal().toFixed(2)}</p>
            )}
            <p><strong>Email:</strong> {formData.email}</p>
          </div>
        </div>
        <Link 
          to="/" 
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, rgb(25, 69, 196) 0%, rgb(26, 58, 164) 50%, rgb(20, 33, 74) 100%)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-container">
        {/* <ProgressBar currentStep={currentStep} onStepClick={setCurrentStep} /> */}
        
        <div className="woocommerce">
      {/* Success Message */}
      {appliedCoupon && (
        <div className="woocommerce-message" role="alert">
          Coupon "{appliedCoupon}" has been applied to your cart.
          <button 
            type="button" 
            onClick={removeCoupon}
            style={{
              marginLeft: '10px',
              background: 'none',
              border: 'none',
              color: '#155724',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Remove
          </button>
        </div>
      )}

      {/* Coupon Error */}
      {couponError && (
        <div className="woocommerce-error" role="alert" style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb',
          borderRadius: '4px'
        }}>
          {couponError}
        </div>
      )}

      {/* Coupon Toggle */}
      <div className="woocommerce-form-coupon-toggle">
        <div className="woocommerce-info" role="status" onClick={() => setShowCoupon(!showCoupon)}>
          Have a coupon? Click here to enter your code
        </div>
      </div>

      {/* Coupon Form */}
      {showCoupon && (
        <form className="checkout_coupon woocommerce-form-coupon" onSubmit={handleCouponSubmit}>
          <div className="coupon-form-row">
            <div className="coupon-input">
              <label htmlFor="coupon_code">
                Coupon:
              </label>
              <input
                type="text"
                name="couponCode"
                className="input-text"
                placeholder="Coupon code"
                id="coupon_code"
                value={formData.couponCode}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="button"
              name="apply_coupon"
              value="Apply coupon"
              style={{
                background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgb(25, 69, 196) 0%, rgb(26, 58, 164) 50%, rgb(20, 33, 74) 100%)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Apply coupon
            </button>
          </div>
        </form>
      )}

      {/* Applied Coupon Info */}
      {appliedCoupon && couponData && (
        <div className="applied-coupon-info" style={{
          background: '#e7f3ff',
          border: '1px solid #0073aa',
          borderRadius: '4px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Coupon Applied:</strong> {appliedCoupon}
              <span> - ${couponData.discountValue} OFF</span>
              {couponData.description && (
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#666' }}>
                  {couponData.description}
                </p>
              )}
            </div>
            <button 
              type="button" 
              onClick={removeCoupon}
              style={{
                background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgb(25, 69, 196) 0%, rgb(26, 58, 164) 50%, rgb(20, 33, 74) 100%)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)';
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <form name="checkout" method="post" className="checkout woocommerce-checkout" onSubmit={handleSubmit}>
        <div className="col2-set" id="customer_details">
          {/* Billing Details */}
          <div className="col-1">
            <div className="woocommerce-billing-fields">
              <h3>
                Billing details
              </h3>

              <div className="woocommerce-billing-fields__field-wrapper">
                <div className="form-row-first-last">
                  <p className="form-row form-row-first validate-required">
                    <label htmlFor="billing_first_name" className="required_field">
                      First name <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      className="input-text"
                      name="firstName"
                      id="billing_first_name"
                      placeholder=""
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p className="form-row form-row-last validate-required">
                    <label htmlFor="billing_last_name" className="required_field">
                      Last name <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      className="input-text"
                      name="lastName"
                      id="billing_last_name"
                      placeholder=""
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                </div>

                <p className="form-row form-row-wide">
                  <label htmlFor="billing_company">
                    Company name <span className="optional">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className="input-text"
                    name="company"
                    id="billing_company"
                    placeholder=""
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </p>

                <p className="form-row form-row-wide address-field update_totals_on_change validate-required">
                  <label htmlFor="billing_country" className="required_field">
                    Country / Region <span className="required" aria-hidden="true">*</span>
                  </label>
                  <select
                    name="country"
                    id="billing_country"
                    className="country_to_state country_select"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a country / region…</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </p>

                <p className="form-row address-field validate-required form-row-wide">
                  <label htmlFor="billing_address_1" className="required_field">
                    Street address <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-text"
                    name="address"
                    id="billing_address_1"
                    placeholder="House number and street name"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </p>

                <p className="form-row address-field form-row-wide">
                  <label htmlFor="billing_address_2" className="screen-reader-text">
                    Apartment, suite, unit, etc. <span className="optional">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className="input-text"
                    name="address2"
                    id="billing_address_2"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    value={formData.address2}
                    onChange={handleInputChange}
                  />
                </p>

                <p className="form-row address-field validate-required form-row-wide">
                  <label htmlFor="billing_city" className="required_field">
                    Town / City <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-text"
                    name="city"
                    id="billing_city"
                    placeholder=""
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </p>

                <p className="form-row address-field validate-required validate-state form-row-wide">
                  <label htmlFor="billing_state" className="required_field">
                    State <span className="required" aria-hidden="true">*</span>
                  </label>
                  <select
                    name="state"
                    id="billing_state"
                    className="state_select"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an option…</option>
                    {usStates.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </p>

                <p className="form-row address-field validate-required validate-postcode form-row-wide">
                  <label htmlFor="billing_postcode" className="required_field">
                    ZIP Code <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-text"
                    name="zipCode"
                    id="billing_postcode"
                    placeholder=""
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </p>

                <p className="form-row form-row-wide validate-required validate-phone">
                  <label htmlFor="billing_phone" className="required_field">
                    Phone <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="tel"
                    className="input-text"
                    name="phone"
                    id="billing_phone"
                    placeholder=""
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </p>

                <p className="form-row form-row-wide validate-required validate-email">
                  <label htmlFor="billing_email" className="required_field">
                    Email address <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    className="input-text"
                    name="email"
                    id="billing_email"
                    placeholder=""
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="col-2">
            <div className="woocommerce-additional-fields">
              <h3>
                Additional information
              </h3>
              <div className="woocommerce-additional-fields__field-wrapper">
                <p className="form-row notes">
                  <label htmlFor="order_notes">
                    Order notes <span className="optional">(optional)</span>
                  </label>
                  <textarea
                    name="orderNotes"
                    className="input-text"
                    id="order_comments"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    rows="2"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Review */}
        <h3 id="order_review_heading">
          Your order
        </h3>
        
        <div id="order_review" className="woocommerce-checkout-review-order">
          <table className="shop_table woocommerce-checkout-review-order-table">
            <thead>
              <tr>
                <th className="product-name">
                  Product
                </th>
                <th className="product-total">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {checkoutItems.map((item, index) => (
                <tr key={index} className="cart_item">
                  <td className="product-name">
                    {item.name}
                    <strong className="product-quantity">
                      × 1
                    </strong>
                  </td>
                  <td className="product-total">
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        <span className="woocommerce-Price-currencySymbol">$</span>
                        {item.price}
                      </bdi>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td>
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      <span className="woocommerce-Price-currencySymbol">$</span>
                      {getCheckoutTotal().toFixed(2)}
                    </bdi>
                  </span>
                </td>
              </tr>
              
              {/* Discount Row */}
              {appliedCoupon && couponData && (
                <tr className="discount-row">
                  <th>Discount ({appliedCoupon})</th>
                  <td>
                    <span className="woocommerce-Price-amount amount" style={{ color: '#28a745' }}>
                      <bdi>
                        -<span className="woocommerce-Price-currencySymbol">$</span>
                        {calculateDiscount().toFixed(2)}
                      </bdi>
                    </span>
                  </td>
                </tr>
              )}
              
              <tr className="order-total">
                <th>Total</th>
                <td>
                  <strong>
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        <span className="woocommerce-Price-currencySymbol">$</span>
                        {getFinalTotal().toFixed(2)}
                      </bdi>
                    </span>
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Payment Methods */}
          <div id="payment" className="woocommerce-checkout-payment">
            <ul className="wc_payment_methods payment_methods methods stripe-small">
              <li className="wc_payment_method payment_method_stripe_cc wc-stripe-no-desc">
                <input
                  id="payment_method_stripe_cc"
                  type="radio"
                  className="input-radio"
                  name="paymentMethod"
                  value="stripe_cc"
                  checked={formData.paymentMethod === 'stripe_cc'}
                  onChange={handleInputChange}
                />
                <label htmlFor="payment_method_stripe_cc">
                  Credit/Debit Cards 
                  <span className="wc-stripe-card-icons-container">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20' viewBox='0 0 30 20'%3E%3Crect width='30' height='20' fill='%23007bff'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='8' font-family='Arial'%3EVisa%3C/text%3E%3C/svg%3E" alt="Visa" />
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20' viewBox='0 0 30 20'%3E%3Crect width='30' height='20' fill='%23dc3545'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='6' font-family='Arial'%3EMastercard%3C/text%3E%3C/svg%3E" alt="Mastercard" />
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20' viewBox='0 0 30 20'%3E%3Crect width='30' height='20' fill='%23288c8a'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='6' font-family='Arial'%3EAmex%3C/text%3E%3C/svg%3E" alt="Amex" />
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20' viewBox='0 0 30 20'%3E%3Crect width='30' height='20' fill='%236c757d'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='6' font-family='Arial'%3EDiscover%3C/text%3E%3C/svg%3E" alt="Discover" />
                  </span>
                </label>
                {formData.paymentMethod === 'stripe_cc' && (
                  <div className="payment_box payment_method_stripe_cc wc-stripe-no-methods">
                    <div className="wc-stripe_cc-container wc-stripe-gateway-container">
                      <div className="wc-stripe_cc-new-method-container">
                        <div id="wc-stripe-card-element" className="payment-type StripeElement">
                          <CardElement options={{
                            style: {
                              base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                  color: '#aab7c4',
                                },
                              },
                            },
                            hidePostalCode: true
                          }} />
                        </div>
                        <div className="wc-stripe-save-source">
                          <label className="checkbox">
                            <input type="checkbox" id="stripe_cc_save_source_key" name="stripe_cc_save_source_key" value="yes" />
                            <span className="save-source-checkbox"></span>
                          </label>
                          <label className="save-source-label" htmlFor="stripe_cc_save_source_key">
                            Save Card
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              
              <li className="wc_payment_method payment_method_ppcp-gateway">
                <input
                  id="payment_method_ppcp-gateway"
                  type="radio"
                  className="input-radio"
                  name="paymentMethod"
                  value="ppcp-gateway"
                  checked={formData.paymentMethod === 'ppcp-gateway'}
                  onChange={handleInputChange}
                />
                <label htmlFor="payment_method_ppcp-gateway">
                  PayPal
                </label>
                {formData.paymentMethod === 'ppcp-gateway' && (
                  <div className="payment_box payment_method_ppcp-gateway">
                    <p>Our all-in-one checkout solution lets you offer PayPal, Venmo, Pay Later options, and more to help maximize conversion.</p>
                  </div>
                )}
              </li>
              
              <li className="wc_payment_method payment_method_stripe_klarna wc-stripe-no-desc">
                <input
                  id="payment_method_stripe_klarna"
                  type="radio"
                  className="input-radio"
                  name="paymentMethod"
                  value="stripe_klarna"
                  checked={formData.paymentMethod === 'stripe_klarna'}
                  onChange={handleInputChange}
                />
                <label htmlFor="payment_method_stripe_klarna">
                  Klarna 
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='20' viewBox='0 0 60 20'%3E%3Crect width='60' height='20' fill='%23FFB3C7'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23FF1694' font-size='8' font-family='Arial' font-weight='bold'%3EKlarna%3C/text%3E%3C/svg%3E" alt="Klarna" />
                </label>
                {formData.paymentMethod === 'stripe_klarna' && (
                  <div className="payment_box payment_method_stripe_klarna wc-stripe-no-methods">
                    <div className="wc-stripe_klarna-container wc-stripe-gateway-container">
                      <div className="wc-stripe_klarna-new-method-container">
                        <div id="wc_stripe_local_payment_stripe_klarna" data-active="1" className="StripeElement">
                          <p>Pay in 4 interest-free installments with Klarna.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              
              <li className="wc_payment_method payment_method_stripe_afterpay wc-stripe-no-desc">
                <input
                  id="payment_method_stripe_afterpay"
                  type="radio"
                  className="input-radio"
                  name="paymentMethod"
                  value="stripe_afterpay"
                  checked={formData.paymentMethod === 'stripe_afterpay'}
                  onChange={handleInputChange}
                />
                <label htmlFor="payment_method_stripe_afterpay">
                  Afterpay 
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='20' viewBox='0 0 60 20'%3E%3Crect width='60' height='20' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='8' font-family='Arial' font-weight='bold'%3EAfterpay%3C/text%3E%3C/svg%3E" alt="Afterpay" />
                </label>
                {formData.paymentMethod === 'stripe_afterpay' && (
                  <div className="payment_box payment_method_stripe_afterpay wc-stripe-no-methods">
                    <div className="wc-stripe_afterpay-container wc-stripe-gateway-container">
                      <div className="wc-stripe_afterpay-new-method-container">
                        <div id="wc_stripe_local_payment_stripe_afterpay" data-active="1" className="StripeElement">
                          <p>Pay in 4 interest-free installments with Afterpay.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>

            <div className="form-row place-order">
              {paymentError && (
                <div className="woocommerce-error" role="alert">
                  {paymentError}
                </div>
              )}
              
              <div className="woocommerce-terms-and-conditions-wrapper">
                <div className="woocommerce-privacy-policy-text">
                  <p>
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                    <Link to="/privacy-policy" className="woocommerce-privacy-policy-link">
                      privacy policy
                    </Link>.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="button alt"
                name="woocommerce_checkout_place_order"
                id="place_order"
                value="Place order"
                disabled={isProcessing}
                style={{
                  background: isProcessing ? '#6c757d' : 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '15px 30px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) {
                    e.target.style.background = 'linear-gradient(135deg, rgb(25, 69, 196) 0%, rgb(26, 58, 164) 50%, rgb(20, 33, 74) 100%)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isProcessing) {
                    e.target.style.background = 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {isProcessing ? 'Processing...' : 'Place order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
    </Elements>
  );
};

export default Checkout;
