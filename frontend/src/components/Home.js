import React from 'react';
import Hero from './Hero';
import LogoMarquee from './LogoMarquee';
import About from './About';
import Features from './Features';
import Programs from './Programs';
import PopularCertificates from './PopularCertificates';
import TestimonialsSection from './TestimonialsSection';
import Clients from './Clients';
import Newsletter from './Newsletter';
import FloatingEnrollButton from './FloatingEnrollButton';
import ExitIntentPopup from './ExitIntentPopup';
import GamificationWidget from './GamificationWidget';

const Home = () => {
  // Progressive lightening shades from dark to light
  const sectionBackgrounds = [
    { component: <Hero />, shade: 'transparent' }, // Hero has its own background
    // { component: <LogoMarquee />, shade: '#495057' }, // Darkest - COMMENTED OUT
    { component: <About />, shade: '#495057' }, // About section
    { component: <Programs />, shade: '#6c757d' }, // Our Programs section
    { component: <PopularCertificates />, shade: 'transparent' }, // Popular Certificates section - same as About
    { component: <Features />, shade: 'transparent' } // Features section - same as About
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
            style={{
              background: section.shade,
              position: 'relative',
              transition: 'background-color 0.5s ease'
            }}
          >
            {section.component}
          </div>
        );
      })}
      
      {/* Additional Engagement Components */}
      <TestimonialsSection />
      <Clients />
      <Newsletter />
      {/* <GamificationWidget /> */}
      {/* <ExitIntentPopup /> */}
      <FloatingEnrollButton />
    </>
  );
};

export default Home;
