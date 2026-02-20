import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
    // Newsletter section commented out
    <div style={{ display: 'none' }}>
      {/* Original newsletter code commented out */}
    </div>
  );
};

export default Newsletter;
