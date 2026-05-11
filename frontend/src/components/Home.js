import React, { Suspense, lazy } from 'react';
import Hero from './Hero';
import Programs from './Programs';
import FloatingEnrollButton from './FloatingEnrollButton';
import './HomepageTheme.css';

// Lazy load heavy components for better initial load performance
const LogoMarquee = lazy(() => import('./LogoMarquee'));
const Features = lazy(() => import('./Features'));
const PopularCertificates = lazy(() => import('./PopularCertificates'));
const TestimonialsSection = lazy(() => import('./TestimonialsSection'));
const EnhancedTestimonials = lazy(() => import('./EnhancedTestimonials'));
const Clients = lazy(() => import('./Clients'));
const Newsletter = lazy(() => import('./Newsletter'));
const FloatingEnrollmentAssistant = lazy(() => import('./FloatingEnrollmentAssistant'));
const ExitIntentPopup = lazy(() => import('./ExitIntentPopup'));
const GamificationWidget = lazy(() => import('./GamificationWidget'));
const LiveActivityFeed = lazy(() => import('./LiveActivityFeed'));
const SmartScarcityIndicators = lazy(() => import('./SmartScarcityIndicators'));
const InteractiveLearningJourney = lazy(() => import('./InteractiveLearningJourney'));
const EnhancedCourseComparison = lazy(() => import('./EnhancedCourseComparison'));

// Loading component for lazy loaded components
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    color: '#3b82f6'
  }}>
    <div style={{ 
      width: '40px', 
      height: '40px', 
      border: '3px solid #e5e7eb', 
      borderTop: '3px solid #3b82f6', 
      borderRadius: '50%', 
      animation: 'spin 1s linear infinite' 
    }}></div>
  </div>
);

const Home = () => {
  // Progressive gradient variations with blue theme
  const sectionBackgrounds = [
    { component: <Hero />, shade: 'transparent' }, // Hero has its own animated gradient background
    { component: <Programs />, shade: 'section-gradient-1' }, // Programs section with gradient overlay
    { component: <Suspense fallback={<LoadingSpinner />}><InteractiveLearningJourney /></Suspense>, shade: 'gradient-light' }, // Interactive Learning Journey
    // { component: <Suspense fallback={<LoadingSpinner />}><EnhancedCourseComparison /></Suspense>, shade: 'gradient-medium' }, // Enhanced Course Comparison
    { component: <Suspense fallback={<LoadingSpinner />}><PopularCertificates /></Suspense>, shade: 'gradient-medium' }, // Popular Certificates with medium gradient
    // { component: <Suspense fallback={<LoadingSpinner />}><Features /></Suspense>, shade: 'gradient-darker' } // Features section with darkest gradient
  ];

  return (
    <>
      {sectionBackgrounds.map((section, index) => {
        if (section.shade === 'transparent') {
          return (
            <div key={index}>
              {section.component}
            </div>
          );
        }
        
        return (
          <div 
            key={index}
            className={section.shade}
            style={{
              position: 'relative'
              /* transition: 'all 0.5s ease' - REMOVED for performance */
            }}
          >
            {section.component}
          </div>
        );
      })}
      
      {/* Additional Engagement Components */}
      {/* <div style={{ margin: '40px 0' }}><Suspense fallback={<LoadingSpinner />}><TestimonialsSection /></Suspense></div> */}
      {/* <div style={{ margin: '20px 0' }}><Suspense fallback={<LoadingSpinner />}><EnhancedTestimonials /></Suspense></div> */}
      <div style={{ margin: '20px 0' }}><Suspense fallback={<LoadingSpinner />}><Clients /></Suspense></div>
      <div style={{ margin: '20px 0' }}><Suspense fallback={<LoadingSpinner />}><Newsletter /></Suspense></div>
      {/* <Suspense fallback={<LoadingSpinner />}><GamificationWidget /></Suspense> */}
      {/* <Suspense fallback={<LoadingSpinner />}><LiveActivityFeed /></Suspense> */}
      {/* <Suspense fallback={<LoadingSpinner />}><SmartScarcityIndicators /></Suspense> */}
      {/* <Suspense fallback={<LoadingSpinner />}><ExitIntentPopup /></Suspense> */}
      <FloatingEnrollButton />
      {/* <Suspense fallback={<LoadingSpinner />}><FloatingEnrollmentAssistant /></Suspense> */}
    </>
  );
};

export default Home;
