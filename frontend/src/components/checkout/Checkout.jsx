import React, { useState, useEffect } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDirectCheckout } from '../../contexts/DirectCheckoutContext';
import { API_BASE_URL } from '../../config';
import Step1ContactInfo from './Step1ContactInfo';
import Step2Payment from './Step2Payment';
import Step3Review from './Step3Review';
import OrderSummary from './OrderSummary';
import TrustBadges from './TrustBadges';
import './CheckoutModern.css';

const Checkout = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { program, getProgramTotal, clearProgram } = useDirectCheckout();
  
  const [clientSecret, setClientSecret] = useState('');
  const [intentLoading, setIntentLoading] = useState(false);
  const [intentError, setIntentError] = useState(null);
  
  const [checkoutData, setCheckoutData] = useState({
    step: 1,
    contact: {
      fullName: '',
      email: '',
      phone: ''
    },
    payment: {
      method: 'card',
      cardDetails: null,
      saveCard: false
    },
    coupon: null,
    orderTotal: 0
  });

  const [validation, setValidation] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [directProgram, setDirectProgram] = useState(null);
  
  const checkoutItems = program ? [program] : [];

  useEffect(() => {
    if (location.state?.program) {
      setDirectProgram(location.state.program);
    }
  }, [location.state]);

  useEffect(() => {
    const total = program ? parseFloat(program.price) || 0 : getProgramTotal();
    setCheckoutData(prev => ({ ...prev, orderTotal: total }));
  }, [program, getProgramTotal]);

  useEffect(() => {
    localStorage.setItem('checkoutProgress', JSON.stringify(checkoutData));
  }, [checkoutData]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('checkoutProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setCheckoutData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Create Stripe PaymentIntent when entering step 2 (enables card, Klarna, Afterpay, PayPal via Stripe)
  useEffect(() => {
    if (checkoutData.step !== 2 || clientSecret || intentLoading) return;
    const total = getFinalTotal();
    const email = checkoutData.contact?.email?.trim();
    const name = checkoutData.contact?.fullName?.trim();
    if (total < 0.5 || !email) return;

    setIntentLoading(true);
    setIntentError(null);
    fetch(`${API_BASE_URL}/payments/create-checkout-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total,
        customerEmail: email,
        customerName: name || 'Customer',
        metadata: { items: checkoutItems.length }
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.clientSecret) {
          setClientSecret(data.data.clientSecret);
        } else {
          setIntentError(data.message || 'Could not load payment options');
        }
      })
      .catch((err) => {
        setIntentError(err.message || 'Network error');
      })
      .finally(() => setIntentLoading(false));
  }, [checkoutData.step, checkoutData.contact?.email, checkoutData.contact?.fullName]);

  // Handle return from Stripe redirect (PayPal, Klarna, Afterpay)
  useEffect(() => {
    const pi = searchParams.get('payment_intent');
    const status = searchParams.get('redirect_status');
    if (pi && status === 'succeeded') {
      setOrderComplete(true);
      localStorage.removeItem('checkoutProgress');
      window.history.replaceState({}, '', location.pathname);
      const t = setTimeout(() => clearProgram(), 500);
      return () => clearTimeout(t);
    }
  }, [searchParams, clearProgram, location.pathname]);

  const stripePromise = loadStripe('pk_test_51QD8TfDyzD57haVrTQo8bVWlVTnPOmwKeCkbkLVzmaAacgeKCNo4cHSZWC15ekYJGej6EfmKELm1ucoeEMtmvhzL00bXi40Xmr');

  const updateContact = (field, value) => {
    setCheckoutData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
    
    if (validation[field]) {
      setValidation(prev => ({ ...prev, [field]: '' }));
    }
  };

  const updatePayment = (field, value) => {
    setCheckoutData(prev => ({
      ...prev,
      payment: { ...prev.payment, [field]: value }
    }));
  };

  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      if (!checkoutData.contact.fullName.trim()) {
        errors.fullName = 'Full name is required';
      }
      if (!checkoutData.contact.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(checkoutData.contact.email)) {
        errors.email = 'Please enter a valid email';
      }
      if (!checkoutData.contact.phone.trim()) {
        errors.phone = 'Phone number is required';
      }
    }
    
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(checkoutData.step)) {
      setCheckoutData(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    setCheckoutData(prev => ({ ...prev, step: prev.step - 1 }));
    if (checkoutData.step === 2) setClientSecret('');
  };

  const goToStep = (step) => {
    if (step < checkoutData.step || validateStep(checkoutData.step)) {
      setCheckoutData(prev => ({ ...prev, step }));
    }
  };

  const applyCoupon = (couponCode) => {
    const hardcodedCoupons = [
      {
        id: 'sky-500',
        code: 'SKY500',
        discountType: 'fixed',
        discountValue: 500,
        isActive: true
      }
    ];
    
    const coupon = hardcodedCoupons.find(c => c.code === couponCode.toUpperCase() && c.isActive);
    
    if (coupon) {
      setCheckoutData(prev => ({ ...prev, coupon }));
      return { success: true, coupon };
    } else {
      return { success: false, error: 'Invalid coupon code' };
    }
  };

  const removeCoupon = () => {
    setCheckoutData(prev => ({ ...prev, coupon: null }));
  };

  const calculateDiscount = () => {
    if (!checkoutData.coupon) return 0;
    return parseFloat(checkoutData.coupon.discountValue) || 0;
  };

  const getFinalTotal = () => {
    return Math.max(0, checkoutData.orderTotal - calculateDiscount());
  };

  const handlePaymentSuccess = () => {
    setOrderComplete(true);
    clearProgram();
    localStorage.removeItem('checkoutProgress');
  };

  if (checkoutItems.length === 0 && !orderComplete) {
    return (
      <div className="checkout-empty">
        <div className="empty-icon">🎓</div>
        <h2>No program selected</h2>
        <p>Select a course to proceed with checkout.</p>
        <Link to="/" className="browse-courses-btn">
          Browse Courses
        </Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h2>Thank you for your order!</h2>
        <p>Your order has been received and is now being processed.</p>
        
        <div className="order-details">
          <h3>Order Details</h3>
          {checkoutItems.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>{item.duration}</p>
              </div>
              <div className="item-price">{item.price}</div>
            </div>
          ))}
          
          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${checkoutData.orderTotal.toFixed(2)}</span>
            </div>
            {checkoutData.coupon && (
              <div className="summary-row discount">
                <span>Discount ({checkoutData.coupon.code}):</span>
                <span>-${calculateDiscount().toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total:</span>
              <span>${getFinalTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <Link to="/" className="return-home-btn">
          Return to Home
        </Link>
      </div>
    );
  }

  const paymentStepContent = (checkoutData.step === 2 || checkoutData.step === 3) && (
    !clientSecret ? (
      <div className="checkout-main">
        {intentLoading && (
          <div className="checkout-loading-payment">
            <p>Loading payment options…</p>
            <p className="checkout-loading-hint">Card, Klarna, Afterpay, PayPal</p>
          </div>
        )}
        {intentError && !intentLoading && (
          <div className="checkout-intent-error">
            <p>{intentError}</p>
            <button type="button" onClick={prevStep}>Back to contact</button>
          </div>
        )}
      </div>
    ) : (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <div className="checkout-main">
          {checkoutData.step === 2 && (
            <Step2Payment
              data={checkoutData.payment}
              onChange={updatePayment}
              onBack={prevStep}
              onNext={nextStep}
              validation={validation}
            />
          )}
          {checkoutData.step === 3 && (
            <Step3Review
              contactData={checkoutData.contact}
              paymentData={checkoutData.payment}
              items={checkoutItems}
              coupon={checkoutData.coupon}
              subtotal={checkoutData.orderTotal}
              total={getFinalTotal()}
              onBack={prevStep}
              onPaymentSuccess={handlePaymentSuccess}
              loading={loading}
            />
          )}
        </div>
      </Elements>
    )
  );

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Secure Checkout</h1>
        <p>Complete your purchase in just a few steps</p>
      </div>

      <div className="checkout-content">
        {checkoutData.step === 1 && (
          <div className="checkout-main">
            <Step1ContactInfo
              data={checkoutData.contact}
              onChange={updateContact}
              validation={validation}
              onNext={nextStep}
            />
          </div>
        )}
        {(checkoutData.step === 2 || checkoutData.step === 3) && paymentStepContent}

        <div className="checkout-sidebar">
          <OrderSummary
            items={checkoutItems}
            coupon={checkoutData.coupon}
            subtotal={checkoutData.orderTotal}
            total={getFinalTotal()}
            onApplyCoupon={applyCoupon}
            onRemoveCoupon={removeCoupon}
          />
          <TrustBadges />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
