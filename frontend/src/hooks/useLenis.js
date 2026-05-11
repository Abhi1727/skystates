import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const useLenis = (enabled = true) => {
  const scrollRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setIsLoaded(true);
      return;
    }

    // Prevent native scroll immediately
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
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
    
    // Add loaded class to app
    const appElement = document.querySelector('.App');
    if (appElement) {
      appElement.classList.add('is-loaded', 'lenis-ready');
    }

    setIsLoaded(true);
    console.log('Lenis smooth scrolling enabled for performance');

    // Update scroll on window resize
    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
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
