import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import TestimonialCard from './TestimonialCard';

gsap.registerPlugin(useGSAP);

// Professional color palette
const colors = {
  primary: '#1a1f36',
  primaryLight: '#2d3748',
  accent: '#667eea',
  accentLight: '#a78bfa',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  neutral50: '#f8fafc',
  neutral100: '#e2e8f0',
  neutral500: '#64748b',
  neutral900: '#0f172a'
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);

  // Updated testimonials array with actual Sky States data
  const testimonials = [
    // {
    //   id: 1,
    //   name: "Sophia",
    //   initials: "S",
    //   role: "Data Science Student",
    //   company: "Sky States Graduate",
    //   testimonial: "Joining the Data Science program at Sky States was the best decision I've made. The curriculum is comprehensive, covering everything from Python basics to advanced machine learning techniques. The practical projects and mentorship sessions really set this course apart. Thank you, Sky states, for an amazing learning experience!",
    //   // image: "https://picsum.photos/seed/sophia-skystates/200/200.jpg"
    // },
    {
      id: 2,
      name: "Michael",
      initials: "M",
      role: "Ethical Hacking Student",
      company: "Sky States Graduate",
      testimonial: "The Ethical Hacking course at Sky States is truly top-notch. The step-by-step approach and detailed modules make it easy to understand even for beginners. The emphasis on practical learning gave me the skills to tackle real-world challenges. I'm grateful to the team for making learning so engaging and effective!",
      image: "https://skystates.us/wp-content/uploads/2025/10/4.jpg"
    },
    {
      id: 3,
      name: "Ramadoss",
      initials: "R",
      role: "Data Science Student",
      company: "Sky States Graduate",
      testimonial: "I feel this is the right time to convey my comments about this course. When I enrolled into the course I was very much excited to learn about data science and equally had a worry that how is it going to work in a virtual environment.",
      image: "https://skystates.us/wp-content/uploads/2025/10/Kim.jpg"
    },
    {
      id: 4,
      name: "Safwan",
      initials: "S",
      role: "Cybersecurity Student",
      company: "Sky States Graduate",
      testimonial: "The Cyber Security & Ethical Hacking course was exceptional! The practical approach and hands-on labs made learning engaging and insightful. I now feel confident in securing networks and systems effectively. Highly recommend it to anyone passionate about cybersecurity!",
      image: "https://skystates.us/wp-content/uploads/2025/10/3.jpg"
    },
    {
      id: 5,
      name: "Olivia",
      initials: "O",
      role: "Ethical Hacking Student",
      company: "Sky States Graduate",
      testimonial: "The Ethical Hacking course at Sky States is truly top-notch. The step-by-step approach and detailed modules make it easy to understand even for beginners. The emphasis on practical learning gave me the skills to tackle real-world challenges. I'm grateful to the team for making learning so engaging and effective!",
      image: "https://skystates.us/wp-content/uploads/2025/10/brunette-businesswoman-taking-selfie_23-2148142674.jpg"
    },
    {
      id: 6,
      name: "Vaishali",
      initials: "V",
      role: "Data Science Student",
      company: "Sky States Graduate",
      testimonial: "I enjoyed this course very much. It was structured in a way that made it extremely easy to keep up with the instructors. I specially liked the way Linear regression and Calculus was introduced with visual examples and good concept-building. The instructors made the content simple and smooth and I was able to get a good grasp on everything taught.",
      image: "https://skystates.us/wp-content/uploads/2025/10/Pooja-kulkarni.jpg"
    },
    {
      id: 7,
      name: "Darrel Green",
      initials: "DG",
      role: "Cybersecurity Student",
      company: "Sky States Graduate",
      testimonial: "I learned so much from this course! The content was comprehensive and up-to-date with the latest cybersecurity trends. The real-world examples and case studies were especially helpful. Great value for anyone serious about a career in cybersecurity.",
      image: "https://skystates.us/wp-content/uploads/2025/10/2.jpg"
    },
    {
      id: 8,
      name: "Mark stapay",
      initials: "MS",
      role: "Ethical Hacking Student",
      company: "Sky States Graduate",
      testimonial: "This course is well-structured and covers everything from the basics to advanced hacking techniques. The instructor's explanations were clear and easy to follow. It's a must-take for anyone looking to step into the world of ethical hacking!",
      image: "https://skystates.us/wp-content/uploads/2025/10/1.jpg"
    },
    {
      id: 9,
      name: "Swathish",
      initials: "S",
      role: "Data Science Student",
      company: "Sky States Graduate",
      testimonial: "A very useful course overall. I really enjoyed the journey from Data Science basics like Multivariable Calculus all the way to advanced concepts of Machine Learning. The instructor was excellent and taught the course in a clear, concise, and thorough manner. He answered all my doubts patiently and helped us in a hands-on way with our end-term projects.",
      image: "https://skystates.us/wp-content/uploads/2025/10/Vaishali.jpg"
    },
    {
      id: 10,
      name: "Emma",
      initials: "E",
      role: "Cybersecurity Student",
      company: "Sky States Graduate",
      testimonial: "The Cyber Security course at Sky States is exceptional! The hands-on labs and real-world scenarios helped me understand complex security concepts. The instructors are highly knowledgeable and always ready to assist. I feel more confident about my future in cybersecurity. Highly recommend it!",
      image: "https://skystates.us/wp-content/uploads/2025/10/mBWwy8Jf_400x400.jpg"
    }
  ];

  // Show 3 cards at a time
  const cardsToShow = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsToShow);
  
  const getCurrentTestimonials = () => {
    const start = currentIndex * cardsToShow;
    const end = start + cardsToShow;
    return testimonials.slice(start, end);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % totalSlides;
    
    // GSAP animation for transition
    gsap.to(containerRef.current, {
      x: -50,
      opacity: 0.3,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex(nextIndex);
        gsap.fromTo(containerRef.current, 
          { x: 50, opacity: 0.3 },
          { x: 0, opacity: 1, duration: 0.3, ease: "power2.inOut" }
        );
        setTimeout(() => setIsAnimating(false), 300);
      }
    });
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    
    // GSAP animation for transition
    gsap.to(containerRef.current, {
      x: 50,
      opacity: 0.3,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex(prevIndex);
        gsap.fromTo(containerRef.current, 
          { x: -50, opacity: 0.3 },
          { x: 0, opacity: 1, duration: 0.3, ease: "power2.inOut" }
        );
        setTimeout(() => setIsAnimating(false), 300);
      }
    });
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    
    // GSAP animation for direct slide navigation
    gsap.to(containerRef.current, {
      scale: 0.9,
      opacity: 0.5,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex(index);
        gsap.fromTo(containerRef.current, 
          { scale: 0.9, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 0.2, ease: "power2.inOut" }
        );
        setTimeout(() => setIsAnimating(false), 200);
      }
    });
  };

  // Removed auto-play functionality - testimonials stay until user interaction

  const currentTestimonials = getCurrentTestimonials();

  return (
    <section style={{
      padding: '100px 0',
      background: `linear-gradient(180deg, ${colors.neutral50} 0%, white 50%, ${colors.neutral50} 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.accent}10, transparent)`,
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.accentLight}08, transparent)`,
        zIndex: 0
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <motion.h2
            style={{
              fontSize: '48px',
              fontWeight: '800',
              color: colors.neutral900,
              marginBottom: '24px',
              lineHeight: '1.2'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What Our Students Have To Say
          </motion.h2>
          
          <motion.p
            style={{
              fontSize: '20px',
              color: colors.neutral500,
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Hear from our successful graduates who transformed their careers with Sky States
          </motion.p>

          {/* Stats Pills */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              marginTop: '48px',
              flexWrap: 'wrap'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { number: '95%', label: 'Success Rate', delay: 0.1 },
              { number: '500+', label: 'Placements', delay: 0.2 },
              { number: '4.9/5', label: 'Student Rating', delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + stat.delay }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'white',
                  padding: '20px 32px',
                  borderRadius: '16px',
                  boxShadow: `0 8px 30px ${colors.accent}15`,
                  border: `1px solid ${colors.neutral100}`
                }}
              >
                <motion.div
                  style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: colors.accent,
                    lineHeight: 1
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <div style={{
                  fontSize: '14px',
                  color: colors.neutral500,
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div style={{ position: 'relative' }}>
          {/* Navigation Buttons */}
          <motion.button
            onClick={handlePrevious}
            disabled={isAnimating}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: colors.accent,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              left: '-60px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'white',
              border: `2px solid ${colors.accent}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: colors.accent,
              zIndex: 10,
              boxShadow: `0 8px 25px ${colors.accent}20`,
              transition: 'all 0.3s ease',
              opacity: isAnimating ? 0.5 : 1
            }}
          >
            ←
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={isAnimating}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: colors.accent,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              right: '-60px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'white',
              border: `2px solid ${colors.accent}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: colors.accent,
              zIndex: 10,
              boxShadow: `0 8px 25px ${colors.accent}20`,
              transition: 'all 0.3s ease',
              opacity: isAnimating ? 0.5 : 1
            }}
          >
            →
          </motion.button>

          {/* Testimonials Grid */}
          <motion.div
            ref={containerRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '32px',
              position: 'relative'
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 100, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.8 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <TestimonialCard 
                    testimonial={testimonial} 
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '48px'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {Array.from({ length: totalSlides }, (_, i) => (
            <motion.button
              key={i}
              onClick={() => goToSlide(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: i === currentIndex 
                  ? colors.accent 
                  : colors.neutral100,
                opacity: i === currentIndex ? 1 : 0.5
              }}
            />
          ))}
        </motion.div>

        {/* Slide Counter */}
        <motion.div
          style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '14px',
            color: colors.neutral500,
            fontWeight: '500'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          viewport={{ once: true }}
        >
          {currentIndex + 1} / {totalSlides}
        </motion.div>

        {/* Call to Action */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: '80px',
            padding: '48px',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
            borderRadius: '20px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.accent}20, transparent)`,
            zIndex: 0
          }} />

          <motion.h3
            style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '16px',
              position: 'relative',
              zIndex: 1
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Ready to Write Your Success Story?
          </motion.h3>
          
          <motion.p
            style={{
              fontSize: '18px',
              opacity: 0.9,
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px',
              lineHeight: '1.6',
              position: 'relative',
              zIndex: 1
            }}
          >
            Join thousands of successful graduates who transformed their careers with Sky States
          </motion.p>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: colors.accent,
              boxShadow: `0 15px 40px ${colors.accent}40`,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: colors.accent,
              color: 'white',
              border: 'none',
              padding: '18px 40px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1
            }}
          >
            🚀 Enroll Now
          </motion.button>
        </motion.div>
        */}
      </div>
    </section>
  );
};

export default TestimonialsSection;
