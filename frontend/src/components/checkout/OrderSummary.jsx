import React, { useState } from 'react';

const OrderSummary = ({ items, coupon, subtotal, total, onApplyCoupon, onRemoveCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setCouponLoading(true);
    setCouponError('');

    try {
      const result = onApplyCoupon(couponCode);
      
      if (result.success) {
        setCouponCode('');
        setShowCouponForm(false);
      } else {
        setCouponError(result.error || 'Invalid coupon code');
      }
    } catch (error) {
      setCouponError('Failed to apply coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    onRemoveCoupon();
    setCouponError('');
  };

  const calculateDiscount = () => {
    if (!coupon) return 0;
    return parseFloat(coupon.discountValue) || 0;
  };

  const discount = calculateDiscount();

  return (
    <div className="order-summary">
      <div className="summary-header">
        <h3>Order Summary</h3>
        <div className="item-count">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      <div className="summary-items">
        {items.map((item, index) => (
          <div key={index} className="summary-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p>{item.duration}</p>
            </div>
            <div className="item-price">{item.price}</div>
          </div>
        ))}
      </div>

      <div className="coupon-section">
        {!coupon && !showCouponForm ? (
          <button 
            className="coupon-toggle"
            onClick={() => setShowCouponForm(true)}
          >
            <svg className="coupon-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Have a coupon code?
          </button>
        ) : !coupon ? (
          <form onSubmit={handleApplyCoupon} className="coupon-form">
            <div className="coupon-input-group">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="coupon-input"
              />
              <button 
                type="submit" 
                className="apply-coupon-btn"
                disabled={couponLoading}
              >
                {couponLoading ? (
                  <div className="spinner-small"></div>
                ) : (
                  'Apply'
                )}
              </button>
            </div>
            {couponError && (
              <div className="coupon-error">{couponError}</div>
            )}
            <button 
              type="button" 
              className="cancel-coupon"
              onClick={() => {
                setShowCouponForm(false);
                setCouponCode('');
                setCouponError('');
              }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="applied-coupon">
            <div className="coupon-info">
              <div className="coupon-details">
                <svg className="coupon-applied-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <span className="coupon-code">{coupon.code}</span>
                  <span className="coupon-discount">-${discount.toFixed(2)} OFF</span>
                </div>
              </div>
              <button 
                className="remove-coupon"
                onClick={handleRemoveCoupon}
                title="Remove coupon"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="summary-totals">
        <div className="total-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="total-row discount">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="total-row shipping">
          <span>Shipping</span>
          <span className="free-shipping">FREE</span>
        </div>
        
        <div className="total-row final">
          <span>Total</span>
          <div className="final-amount">
            <span className="currency">$</span>
            <span className="amount">{total.toFixed(2)}</span>
            <span className="currency-usd">USD</span>
          </div>
        </div>
      </div>

      <div className="summary-footer">
        <div className="savings-info">
          {discount > 0 && (
            <p className="savings-message">
              You're saving <strong>${discount.toFixed(2)}</strong> on this order!
            </p>
          )}
        </div>
        
        <div className="price-info">
          <p className="tax-note">
            All prices include taxes
          </p>
          <p className="digital-note">
            Digital products - instant access after purchase
          </p>
        </div>
      </div>

      <div className="help-section">
        <button className="help-button">
          <svg className="help-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Need help?
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
