import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      setMessage('Thank you for subscribing!');
      setMessageType('success');
      setEmail('');
      
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <h2>Get News with Sky States</h2>
        <p>Sign in to receive updates about our programs and job opportunities</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Sign in</button>
        </form>
        {message && (
          <div
            style={{
              background: messageType === 'success' ? '#28a745' : '#dc3545',
              color: 'white',
              padding: '15px',
              borderRadius: '5px',
              marginTop: '20px',
              textAlign: 'center'
            }}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
