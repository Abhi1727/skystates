import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../../contexts/CartContext';
import ProgressBar from './ProgressBar';
import Step1ContactInfo from './Step1ContactInfo';
import Step2Payment from './Step2Payment';
import Step3Review from './Step3Review';
import OrderSummary from './OrderSummary';
import TrustBadges from './TrustBadges';
import './CheckoutModern.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [checkoutData, setCheckoutData] = useState({
    step: 1,
    contact: {
      fullName: '',
      email: '',
      phone: '',
      country: 'US'
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
  
  const checkoutItems = directProgram ? [directProgram] : cartItems;

  useEffect(() => {
    if (location.state?.program) {
      setDirectProgram(location.state.program);
    }
  }, [location.state]);

  useEffect(() => {
    const total = directProgram ? parseFloat(directProgram.price) || 0 : getCartTotal();
    setCheckoutData(prev => ({ ...prev, orderTotal: total }));
  }, [directProgram, cartItems, getCartTotal]);

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
      if (!checkoutData.contact.country) {
        errors.country = 'Please select a country';
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

  const processPayment = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Order processed:', {
        contact: checkoutData.contact,
        payment: checkoutData.payment,
        items: checkoutItems,
        subtotal: checkoutData.orderTotal,
        discount: calculateDiscount(),
        total: getFinalTotal(),
        coupon: checkoutData.coupon?.code
      });
      
      setOrderComplete(true);
      clearCart();
      localStorage.removeItem('checkoutProgress');
      
    } catch (error) {
      console.error('Payment error:', error);
      setValidation(prev => ({ ...prev, payment: 'Payment failed. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  if (checkoutItems.length === 0 && !orderComplete) {
    return (
      <div className="checkout-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some courses to your cart to proceed with checkout.</p>
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

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-container">
        {/* <ProgressBar 
          currentStep={checkoutData.step} 
          onStepClick={goToStep}
        /> */}
        
        <div className="checkout-header">
          <h1>Secure Checkout</h1>
          <p>Complete your purchase in just a few steps</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-main">
            {checkoutData.step === 1 && (
              <Step1ContactInfo
                data={checkoutData.contact}
                onChange={updateContact}
                validation={validation}
                onNext={nextStep}
              />
            )}
            
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
                onConfirm={processPayment}
                loading={loading}
              />
            )}
          </div>

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
    </Elements>
  );
};

export default Checkout;
