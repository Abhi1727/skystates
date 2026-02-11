import React from 'react';
import Hero from './Hero';
import LogoMarquee from './LogoMarquee';
import About from './About';
import Features from './Features';
import Programs from './Programs';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <About />
      <Features />
      <Programs />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;
