import React from 'react';
import Hero from './Hero';
import LogoMarquee from './LogoMarquee';
import Features from './Features';
import Programs from './Programs';
import PopularCertificates from './PopularCertificates';
import TestimonialsSection from './TestimonialsSection';
import EnhancedTestimonials from './EnhancedTestimonials';
import Clients from './Clients';
import Newsletter from './Newsletter';
import FloatingEnrollButton from './FloatingEnrollButton';
import FloatingEnrollmentAssistant from './FloatingEnrollmentAssistant';
import ExitIntentPopup from './ExitIntentPopup';
import GamificationWidget from './GamificationWidget';
import LiveActivityFeed from './LiveActivityFeed';
import SmartScarcityIndicators from './SmartScarcityIndicators';
import InteractiveLearningJourney from './InteractiveLearningJourney';
import EnhancedCourseComparison from './EnhancedCourseComparison';
import './HomepageTheme.css';

const Home = () => {
  // Progressive gradient variations with orange/amber theme
  const sectionBackgrounds = [
    { component: <Hero />, shade: 'transparent' }, // Hero has its own animated gradient background
    { component: <Programs />, shade: 'section-gradient-1' }, // Programs section with gradient overlay
    { component: <InteractiveLearningJourney />, shade: 'gradient-light' }, // Interactive Learning Journey
    // { component: <EnhancedCourseComparison />, shade: 'gradient-medium' }, // Enhanced Course Comparison
    { component: <PopularCertificates />, shade: 'gradient-medium' }, // Popular Certificates with medium gradient
    // { component: <Features />, shade: 'gradient-darker' } // Features section with darkest gradient
  ];

  return (
    <>
      {sectionBackgrounds.map((section, index) => {
        if (section.shade === 'transparent') {
          return (
            <div key={index} data-scroll-section>
              {section.component}
            </div>
          );
        }
        
        return (
          <div 
            key={index}
            data-scroll-section
            className={section.shade}
            style={{
              position: 'relative',
              transition: 'all 0.5s ease'
            }}
          >
            {section.component}
          </div>
        );
      })}
      
      {/* Additional Engagement Components */}
      {/* <div style={{ margin: '40px 0' }}><TestimonialsSection /></div> */}
      {/* <div style={{ margin: '20px 0' }}><EnhancedTestimonials /></div> */}
      <div style={{ margin: '20px 0' }}><Clients /></div>
      <div style={{ margin: '20px 0' }}><Newsletter /></div>
      {/* <GamificationWidget /> */}
      {/* <LiveActivityFeed /> */}
      {/* <SmartScarcityIndicators /> */}
      {/* <ExitIntentPopup /> */}
      <FloatingEnrollButton />
      {/* <FloatingEnrollmentAssistant /> */}
    </>
  );
};

export default Home;
