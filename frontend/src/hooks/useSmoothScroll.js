import { useEffect, useRef } from 'react';

/**
 * Lightweight smooth scroll alternative to Locomotive Scroll
 * Uses native smooth scrolling with enhanced performance
 */
const useSmoothScroll = (enabled = true) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // Enable smooth scrolling
    htmlElement.style.scrollBehavior = 'smooth';
    bodyElement.style.scrollBehavior = 'smooth';
    
    // Add custom class for styling
    htmlElement.classList.add('smooth-scroll-enabled');
    bodyElement.classList.add('smooth-scroll-enabled');

    console.log('Smooth scroll enabled');

    // Cleanup
    return () => {
      htmlElement.style.scrollBehavior = '';
      bodyElement.style.scrollBehavior = '';
      htmlElement.classList.remove('smooth-scroll-enabled');
      bodyElement.classList.remove('smooth-scroll-enabled');
    };
  }, [enabled]);

  // Method to scroll to specific element
  const scrollTo = (target, options = {}) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest',
        ...options 
      });
    }
  };

  // Method to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return { scrollRef, scrollTo, scrollToTop };
};

export default useSmoothScroll;
