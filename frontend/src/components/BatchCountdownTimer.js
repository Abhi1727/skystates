import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BatchCountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeUntilNextSaturday = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
      
      // Calculate days until next Saturday
      let daysUntilSaturday = (6 - currentDay + 7) % 7;
      if (daysUntilSaturday === 0 && now.getHours() >= 0) {
        // If it's Saturday and past midnight, count to next Saturday
        daysUntilSaturday = 7;
      }
      
      // Set next Saturday at 9:00 AM (start time for new batch)
      const nextSaturday = new Date(now);
      nextSaturday.setDate(now.getDate() + daysUntilSaturday);
      nextSaturday.setHours(9, 0, 0, 0);
      
      // Calculate time difference
      const difference = nextSaturday - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Calculate immediately
    calculateTimeUntilNextSaturday();
    
    // Update every second
    const timer = setInterval(calculateTimeUntilNextSaturday, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35, #ffa500)',
        color: 'white',
        fontSize: '18px',
        fontWeight: '800',
        padding: '8px 6px',
        borderRadius: '8px',
        minWidth: '35px',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
      }}>
        {value.toString().padStart(2, '0')}
      </div>
      <div style={{
        color: 'white',
        fontSize: '9px',
        fontWeight: '500',
        marginTop: '4px',
        textTransform: 'uppercase'
      }}>
        {label}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '15px 25px',
        borderRadius: '15px',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        zIndex: 10,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div style={{
        color: '#ffd700',
        fontSize: '12px',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        ⚡ Next Batch Starting In
      </div>
      <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <TimeUnit value={timeLeft.days} label="d" />
        <TimeUnit value={timeLeft.hours} label="h" />
        <TimeUnit value={timeLeft.minutes} label="m" />
        <TimeUnit value={timeLeft.seconds} label="s" />
      </div>
    </motion.div>
  );
};

export default BatchCountdownTimer;
