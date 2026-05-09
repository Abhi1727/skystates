import { useState, useEffect, useRef } from 'react';

const useDynamicCounter = (courseKey, baseValue, minIncrement, maxIncrement) => {
  const [counter, setCounter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent re-initialization
    if (isInitialized.current) return;
    
    const initializeCounter = () => {
      const storageKey = `dynamicCounter_${courseKey}`;
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      let storedData;
      try {
        storedData = localStorage.getItem(storageKey);
        storedData = storedData ? JSON.parse(storedData) : null;
      } catch (error) {
        console.warn('Error reading localStorage:', error);
        storedData = null;
      }

      let finalValue = baseValue;
      let needsUpdate = false;

      if (storedData) {
        const { value, lastUpdate } = storedData;
        
        if (lastUpdate === today) {
          // Same day, use stored value
          finalValue = value;
        } else {
          // Different day, calculate increment
          const daysDiff = calculateDaysDifference(lastUpdate, today);
          let newValue = value;
          
          for (let i = 0; i < daysDiff; i++) {
            const increment = Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement;
            newValue += increment;
          }
          
          finalValue = newValue;
          needsUpdate = true;
        }
      } else {
        // First time visitor, set base value
        needsUpdate = true;
      }

      // Update localStorage if needed
      if (needsUpdate) {
        try {
          localStorage.setItem(storageKey, JSON.stringify({
            value: finalValue,
            lastUpdate: today
          }));
        } catch (error) {
          console.warn('Error writing to localStorage:', error);
        }
      }

      // Animate to final value
      animateCounter(0, finalValue, (val) => setCounter(val));
    };

    const calculateDaysDifference = (lastDate, currentDate) => {
      const last = new Date(lastDate);
      const current = new Date(currentDate);
      const diffTime = Math.abs(current - last);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    const animateCounter = (start, end, callback) => {
      if (start === end) {
        callback(end);
        return;
      }

      setIsAnimating(true);
      const duration = 2000; // 2 seconds animation
      const increment = (end - start) / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
          callback(end);
          clearInterval(timer);
          setIsAnimating(false);
        } else {
          callback(Math.floor(current));
        }
      }, 16);
    };

    initializeCounter();
    isInitialized.current = true;
  }, [courseKey, baseValue, minIncrement, maxIncrement]);

  return { counter, isAnimating };
};

export default useDynamicCounter;
