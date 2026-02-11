import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Get program info from URL state or default
  const programInfo = location.state?.program || {
    name: 'Selected Program',
    price: '$2,999',
    duration: '6 Months'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout submission
    console.log('Checkout submitted:', { ...formData, program: programInfo });
    alert('Order placed successfully! You will receive a confirmation email shortly.');
  };

  return (
    <div className="checkout">
      {/* Hero Section */}
      <section className="page-hero" style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '15px' }}>
            Checkout
          </h1>
          <p style={{ fontSize: '18px', opacity: '0.9' }}>
            Complete your enrollment for {programInfo.name}
          </p>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="checkout-content" style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Billing Form */}
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '30px' }}>
                Billing Details
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                  </select>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                  Payment Information
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#28a745',
                    color: 'white',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'background 0.3s'
                  }}
                >
                  Complete Enrollment
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                  Order Summary
                </h3>
                
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                    {programInfo.name}
                  </h4>
                  <p style={{ color: '#666', marginBottom: '5px' }}>
                    Duration: {programInfo.duration}
                  </p>
                  <p style={{ color: '#666', marginBottom: '10px' }}>
                    Format: Online Instructor-Led
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                      Price:
                    </span>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#28a745' }}>
                      {programInfo.price}
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#666' }}>Subtotal:</span>
                    <span style={{ fontWeight: '500' }}>{programInfo.price}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#666' }}>Processing Fee:</span>
                    <span style={{ fontWeight: '500' }}>$0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#666' }}>Tax:</span>
                    <span style={{ fontWeight: '500' }}>$0</span>
                  </div>
                  <hr style={{ margin: '15px 0', borderColor: '#ddd' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>Total:</span>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#28a745' }}>
                      {programInfo.price}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: '#e3f2fd',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1976d2', marginBottom: '10px' }}>
                    What's Included:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#666', fontSize: '14px' }}>
                    <li style={{ marginBottom: '5px' }}>✓ Lifetime access to course materials</li>
                    <li style={{ marginBottom: '5px' }}>✓ Industry-recognized certificate</li>
                    <li style={{ marginBottom: '5px' }}>✓ 1-on-1 mentorship sessions</li>
                    <li style={{ marginBottom: '5px' }}>✓ Job placement assistance</li>
                    <li>✓ 24/7 technical support</li>
                  </ul>
                </div>

                <div style={{
                  background: '#fff3cd',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ffeaa7'
                }}>
                  <p style={{ margin: 0, color: '#856404', fontSize: '14px' }}>
                    <strong>Money-Back Guarantee:</strong> 100% refund within 14 days if you're not satisfied with the course.
                  </p>
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
                  Need help? Contact our support team
                </p>
                <a href="tel:+18888102434" style={{
                  display: 'inline-block',
                  color: '#2c3e50',
                  textDecoration: 'none',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
                  (888) 810-2434
                </a>
                <br />
                <a href="mailto:info@skystates.us" style={{
                  display: 'inline-block',
                  color: '#2c3e50',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}>
                  <i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>
                  info@skystates.us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
