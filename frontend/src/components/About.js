import React from 'react';
import { motion } from 'framer-motion';
import './HomepageTheme.css';

const About = () => {

  const stats = [

    { number: '95%', label: 'Success Rate' },

    { number: '500+', label: 'Placements' },

    { number: '4.9/5', label: 'Student Rating' },

    { number: '50+', label: 'Industry Experts' }

  ];



  const features = [

    {

      title: 'Industry Expert Instructors',

      description: 'Learn from professionals with real-world experience in tech giants and innovative startups.',

      icon: '👨‍🏫'

    },

    {

      title: 'Hands-on Projects',

      description: 'Build real-world projects that showcase your skills to potential employers.',

      icon: '🚀'

    },

    {

      title: 'Career Support',

      description: 'Get 100% job assistance with resume building, interview prep, and placement support.',

      icon: '💼'

    },

    {

      title: 'Flexible Learning',

      description: 'Study at your own pace with online classes, recorded sessions, and 24/7 support.',

      icon: '⏰'

    },

    {

      title: 'Cutting-edge Curriculum',

      description: 'Stay ahead with curriculum designed in collaboration with industry leaders.',

      icon: '📚'

    },

    {

      title: 'Global Community',

      description: 'Join a network of 10,000+ alumni working in top companies worldwide.',

      icon: '🌍'

    }

  ];



  const values = [

    {

      title: 'Innovation',

      description: 'We constantly evolve our teaching methods to match industry trends.'

    },

    {

      title: 'Excellence',

      description: 'We maintain the highest standards in education and student support.'

    },

    {

      title: 'Community',

      description: 'We foster a supportive environment where everyone can thrive.'

    }

  ];



  return (

    <section className="about-section section-gradient-1" style={{
      padding: '30px 0',
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

        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent)',

        zIndex: 0

      }} />

      

      <div style={{

        position: 'absolute',

        bottom: '15%',

        right: '8%',

        width: '300px',

        height: '300px',

        borderRadius: '50%',

        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05), transparent)',

        zIndex: 0

      }} />



      <div style={{

        maxWidth: '1200px',

        margin: '0 auto',

        padding: '0 20px',

        position: 'relative',

        zIndex: 1

      }}>

        {/* Hero Section */}

        <motion.div 
          style={{ textAlign: 'center', marginBottom: '30px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="heading-gradient" style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>
            Transform Your Career with Sky States
          </h1>
          
          <p className="subtitle-enhanced" style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            At <span style={{
              fontWeight: '700',
              color: '#1e293b',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '2px 8px',
              borderRadius: '6px',
              textShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>Sky States,</span> we're committed to equipping ambitious professionals with cutting-edge skills and real-world experience to thrive in today's digital landscape.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '30px',
            '@media (min-width: 768px)': {
              gridTemplateColumns: 'repeat(4, 1fr)'
            }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card-premium"
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(255, 215, 0, 0.5)'
              }}
              style={{
                padding: '32px 24px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)',
                opacity: 0.8
              }} />
              
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                marginBottom: '8px',
                lineHeight: 1,
                color: '#3b82f6',
                textShadow: '0 4px 8px rgba(59, 130, 246, 0.3) 0 0 20px rgba(59, 130, 246, 0.2)',
                filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))'
              }}>
                {stat.number}
              </div>
              
              <div style={{
                fontSize: '1rem',
                color: '#64748b',
                fontWeight: '600'
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '30px' }}
      >
        <motion.button
          className="btn-gradient-primary"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 20px 50px rgba(255, 215, 0, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const programsSection = document.querySelector('.programs');
            if (programsSection) {
              programsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Start Your Journey Today
        </motion.button>
      </motion.div>
    </div>
  </section>
  );
};

export default About;
