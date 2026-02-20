import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

const useLocomotiveScroll = (enabled = false) => {
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsLoaded(true);
      return;
    }

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (scrollRef.current && !scrollInstance.current) {
        try {
          scrollInstance.current = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 1,
            class: 'is-revealed',
            smartphone: {
              smooth: true,
              multiplier: 1
            },
            tablet: {
              smooth: true,
              multiplier: 1
            },
            reloadOnContextChange: true,
            offset: [0, 0],
            getDirection: true,
            getSpeed: true,
            lerp: 0.1,
            duration: 1.2,
            easing: (t) => Math.min(1, 0.5425 * Math.pow(2, -10 * t))
          });

          console.log('Locomotive Scroll initialized successfully');
          setIsLoaded(true);
          
          // Add loaded class to body
          document.body.classList.add('has-scroll-smooth');
          document.documentElement.classList.add('has-scroll-smooth');
          
          // Add loaded class to app
          const appElement = document.querySelector('.App');
          if (appElement) {
            appElement.classList.add('is-loaded');
          }
          
        } catch (error) {
          console.error('Error initializing Locomotive Scroll:', error);
          // Fallback to smooth scroll if Locomotive fails
          document.documentElement.style.scrollBehavior = 'smooth';
          setIsLoaded(true);
        }
      }
    }, 100); // Small delay to ensure DOM is ready

    // Update scroll on window resize
    const handleResize = () => {
      if (scrollInstance.current && typeof scrollInstance.current.update === 'function') {
        try {
          scrollInstance.current.update();
        } catch (error) {
          console.warn('Failed to update scroll instance:', error);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (scrollInstance.current) {
        try {
          scrollInstance.current.destroy();
          console.log('Locomotive Scroll destroyed');
        } catch (error) {
          console.error('Error destroying Locomotive Scroll:', error);
        }
        scrollInstance.current = null;
      }
      window.removeEventListener('resize', handleResize);
      
      // Remove classes
      document.body.classList.remove('has-scroll-smooth');
      document.documentElement.classList.remove('has-scroll-smooth');
    };
  }, [enabled]);

  // Method to scroll to specific element
  const scrollTo = (target, options = {}) => {
    if (scrollInstance.current) {
      scrollInstance.current.scrollTo(target, options);
    } else {
      // Fallback for when Locomotive is not available
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', ...options });
      }
    }
  };

  // Method to update scroll
  const updateScroll = () => {
    if (scrollInstance.current && typeof scrollInstance.current.update === 'function') {
      try {
        scrollInstance.current.update();
      } catch (error) {
        console.warn('Failed to update scroll instance:', error);
      }
    }
  };

  return { scrollRef, scrollTo, updateScroll, scrollInstance, isLoaded };
};

export default useLocomotiveScroll;
