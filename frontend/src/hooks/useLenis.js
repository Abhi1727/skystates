import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const useLenis = (enabled = true) => {
  const scrollRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef(null);
  const isMobile = useRef(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       (window.innerWidth <= 768 && 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsLoaded(true);
      return;
    }

    // Initialize Lenis with appropriate settings
    let lenis;
    
    // Disable Lenis on mobile - use native scrolling for better touch support
    if (isMobile.current) {
      console.log('Mobile detected - using native scrolling for better touch interactions');
      // Keep native scroll on mobile for better touch support
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      setIsLoaded(true);
      return { scrollRef, scrollTo: () => {}, updateScroll: () => {}, isLoaded: true };
    } else {
      // Desktop configuration - prevent native scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });
    }

    lenisRef.current = lenis;

    // Connect Lenis to requestAnimationFrame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Add ready classes when Lenis is active
    document.documentElement.classList.add('lenis-ready');
    document.body.classList.add('lenis-ready');
    
    // Add mobile-specific classes
    if (isMobile.current) {
      document.documentElement.classList.add('lenis-mobile');
      document.body.classList.add('lenis-mobile');
    }
    
    // Add loaded class to app
    const appElement = document.querySelector('.App');
    if (appElement) {
      appElement.classList.add('is-loaded', 'lenis-ready');
      if (isMobile.current) {
        appElement.classList.add('lenis-mobile');
      }
    }

    setIsLoaded(true);
    console.log(`Lenis smooth scrolling enabled for ${isMobile.current ? 'mobile' : 'desktop'} performance`);

    // Update scroll on window resize
    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    };

    // Handle orientation change for mobile
    const handleOrientationChange = () => {
      setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      // Clean up mobile classes
      document.documentElement.classList.remove('lenis-mobile');
      document.body.classList.remove('lenis-mobile');
    };
  }, [enabled]);

  // Method to scroll to specific element using Lenis
  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      const element = document.querySelector(target);
      if (element) {
        lenisRef.current.scrollTo(element, options);
      }
    }
  };

  // Method to update scroll
  const updateScroll = () => {
    if (lenisRef.current) {
      lenisRef.current.resize();
    }
  };

  return { scrollRef, scrollTo, updateScroll, isLoaded };
};

export default useLenis;
