import { useState, useEffect, useRef } from 'react';

const useSilentScheduledCounter = (courseKey, baseValue, minIncrement, maxIncrement) => {
  const [counter, setCounter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isInitialized = useRef(false);
  const lastUpdateCheck = useRef(null);

  useEffect(() => {
    // Prevent re-initialization
    if (isInitialized.current) return;
    
    const initializeCounter = () => {
      const storageKey = `silentCounter_${courseKey}`;
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
          // Different day, check if scheduled update time has passed
          const shouldUpdate = checkIfScheduledUpdatePassed(lastUpdate);
          
          if (shouldUpdate) {
            // Calculate increment for missed days
            const daysDiff = calculateDaysDifference(lastUpdate, today);
            let newValue = value;
            
            for (let i = 0; i < daysDiff; i++) {
              const increment = Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement;
              newValue += increment;
            }
            
            finalValue = newValue;
            needsUpdate = true;
          } else {
            // Scheduled time hasn't passed yet, use stored value
            finalValue = value;
          }
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

    const checkIfScheduledUpdatePassed = (lastUpdateDate) => {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      
      // If it's a different day, check if we've passed the scheduled time
      if (lastUpdateDate !== today) {
        // 6 PM IST = 12:30 PM UTC
        const updateTimeUTC = { hours: 12, minutes: 30 }; // 12:30 PM UTC
        
        const currentUTC = {
          hours: now.getUTCHours(),
          minutes: now.getUTCMinutes()
        };
        
        // Check if current time is past 12:30 PM UTC
        const currentTimeInMinutes = currentUTC.hours * 60 + currentUTC.minutes;
        const updateTimeInMinutes = updateTimeUTC.hours * 60 + updateTimeUTC.minutes;
        
        return currentTimeInMinutes >= updateTimeInMinutes;
      }
      
      return false;
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

    // Set up silent background update checker
    const setupSilentUpdateChecker = () => {
      const storageKey = `silentCounter_${courseKey}`;
      
      // Check every minute for scheduled updates
      const checkInterval = setInterval(() => {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        
        try {
          const storedData = localStorage.getItem(storageKey);
          if (storedData) {
            const { value, lastUpdate } = JSON.parse(storedData);
            
            // Only check for updates on the same day if we haven't updated today
            if (lastUpdate === today && !lastUpdateCheck.current) {
              // 6 PM IST = 12:30 PM UTC
              const updateTimeUTC = { hours: 12, minutes: 30 };
              
              const currentUTC = {
                hours: now.getUTCHours(),
                minutes: now.getUTCMinutes()
              };
              
              const currentTimeInMinutes = currentUTC.hours * 60 + currentUTC.minutes;
              const updateTimeInMinutes = updateTimeUTC.hours * 60 + updateTimeUTC.minutes;
              
              // Check if we've reached the scheduled time
              if (currentTimeInMinutes >= updateTimeInMinutes && currentTimeInMinutes < updateTimeInMinutes + 1) {
                // Time to update - do it silently
                const increment = Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement;
                const newValue = value + increment;
                
                localStorage.setItem(storageKey, JSON.stringify({
                  value: newValue,
                  lastUpdate: today
                }));
                
                // Update counter state silently (no animation during background update)
                setCounter(newValue);
                lastUpdateCheck.current = today;
                
                console.log(`Silent counter update: ${courseKey} incremented by ${increment} to ${newValue}`);
              }
            } else if (lastUpdate !== today) {
              // Reset for new day
              lastUpdateCheck.current = null;
            }
          }
        } catch (error) {
          console.warn('Error in silent update checker:', error);
        }
      }, 60000); // Check every minute

      return () => clearInterval(checkInterval);
    };

    initializeCounter();
    isInitialized.current = true;
    
    // Start the silent update checker
    const cleanup = setupSilentUpdateChecker();
    
    return cleanup;
  }, [courseKey, baseValue, minIncrement, maxIncrement]);

  return { counter, isAnimating };
};

export default useSilentScheduledCounter;
