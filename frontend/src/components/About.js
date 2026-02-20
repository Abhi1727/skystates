import React from 'react';

import { motion } from 'framer-motion';



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

    <section className="about-section" style={{

      background: 'linear-gradient(180deg, #1a1f36 0%, #2d3748 50%, #1a1f36 100%)',

      padding: '100px 0',

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

        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent)',

        zIndex: 0

      }} />

      

      <div style={{

        position: 'absolute',

        bottom: '15%',

        right: '8%',

        width: '300px',

        height: '300px',

        borderRadius: '50%',

        background: 'radial-gradient(circle, rgba(118, 75, 162, 0.08), transparent)',

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

          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8, ease: "easeOut" }}

          viewport={{ once: true }}

          style={{ textAlign: 'center', marginBottom: '100px' }}

        >

          <motion.h1

            style={{

              fontSize: 'clamp(2.5rem, 8vw, 5rem)',

              fontWeight: '800',

              lineHeight: '1.1',

              marginBottom: '24px',

              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 20%, #667eea 40%, #764ba2 60%, #667eea 80%, #764ba2 100%)',

              backgroundSize: '200% 200%',

              WebkitBackgroundClip: 'text',

              WebkitTextFillColor: 'transparent',

              backgroundClip: 'text',

              animation: 'gradientShift 4s ease-in-out infinite'

            }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8, delay: 0.2 }}

            viewport={{ once: true }}

          >

            Transform Your Career with Sky States

          </motion.h1>

          

          <motion.p

            style={{

              fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',

              color: '#e2e8f0',

              maxWidth: '800px',

              margin: '0 auto',

              lineHeight: '1.6',

              opacity: 0.9

            }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8, delay: 0.3 }}

            viewport={{ once: true }}

          >

            At <strong style={{ 

              color: '#667eea',

              fontWeight: '700',

              background: 'rgba(102, 126, 234, 0.1)',

              padding: '2px 8px',

              borderRadius: '6px'

            }}>Sky States,</strong> we're committed to equipping ambitious professionals with cutting-edge skills and real-world experience to thrive in today's digital landscape.

          </motion.p>

        </motion.div>



        {/* Stats Section */}

        <motion.div

          style={{

            display: 'grid',

            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',

            gap: '24px',

            marginBottom: '100px'

          }}

          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8, delay: 0.4 }}

          viewport={{ once: true }}

        >

          {stats.map((stat, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, scale: 0.8 }}

              whileInView={{ opacity: 1, scale: 1 }}

              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}

              viewport={{ once: true }}

              whileHover={{ 

                scale: 1.05,

                transition: { duration: 0.2 }

              }}

              style={{

                background: 'rgba(255, 255, 255, 0.05)',

                backdropFilter: 'blur(10px)',

                border: '1px solid rgba(102, 126, 234, 0.2)',

                borderRadius: '16px',

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

                height: '3px',

                background: 'linear-gradient(90deg, #667eea, #764ba2)',

                opacity: 0.8

              }} />

              

              <motion.div

                style={{

                  fontSize: '2.5rem',

                  fontWeight: '800',

                  color: '#667eea',

                  marginBottom: '8px',

                  lineHeight: 1

                }}

                whileHover={{ scale: 1.1 }}

                transition={{ duration: 0.2 }}

              >

                {stat.number}

              </motion.div>

              

              <div style={{

                fontSize: '1rem',

                color: '#e2e8f0',

                fontWeight: '600'

              }}>

                {stat.label}

              </div>

            </motion.div>

          ))}

        </motion.div>



        {/* Bento Grid - Features */}

        <motion.div

          className="bento-grid"

          style={{

            display: 'grid',

            gap: '24px',

            marginBottom: '100px',

            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'

          }}

          initial={{ opacity: 0, y: 50 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8, delay: 0.6 }}

          viewport={{ once: true }}

        >

          {features.map((feature, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, y: 30, scale: 0.9 }}

              whileInView={{ opacity: 1, y: 0, scale: 1 }}

              transition={{ 

                duration: 0.6, 

                delay: 0.7 + index * 0.1,

                ease: "easeOut"

              }}

              viewport={{ once: true }}

              whileHover={{ 

                y: -8,

                scale: 1.02,

                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',

                transition: { duration: 0.3, ease: "easeOut" }

              }}

              style={{

                background: 'rgba(255, 255, 255, 0.03)',

                backdropFilter: 'blur(20px)',

                border: '1px solid rgba(102, 126, 234, 0.15)',

                borderRadius: '20px',

                padding: '32px',

                position: 'relative',

                overflow: 'hidden',

                minHeight: '200px',

                display: 'flex',

                flexDirection: 'column'

              }}

            >

              {/* Accent gradient overlay */}

              <div style={{

                position: 'absolute',

                top: 0,

                left: 0,

                right: 0,

                height: '4px',

                background: 'linear-gradient(90deg, #667eea, #764ba2)',

                opacity: 0.8

              }} />



              <div style={{

                fontSize: '2.5rem',

                marginBottom: '16px',

                filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))'

              }}>

                {feature.icon}

              </div>



              <h3 style={{

                fontSize: '1.5rem',

                fontWeight: '700',

                color: '#ffffff',

                marginBottom: '12px',

                lineHeight: '1.3'

              }}>

                {feature.title}

              </h3>

              

              <p style={{

                fontSize: '1rem',

                color: '#e2e8f0',

                lineHeight: '1.6',

                opacity: 0.8,

                margin: 0,

                flex: 1

              }}>

                {feature.description}

              </p>

            </motion.div>

          ))}

        </motion.div>



        {/* Values Section */}

        {/* <motion.div

          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8, delay: 0.8 }}

          viewport={{ once: true }}

          style={{ marginBottom: '100px' }}

        >

          <motion.h2

            style={{

              fontSize: 'clamp(2rem, 5vw, 3rem)',

              fontWeight: '800',

              textAlign: 'center',

              marginBottom: '48px',

              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',

              WebkitBackgroundClip: 'text',

              WebkitTextFillColor: 'transparent',

              backgroundClip: 'text'

            }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8, delay: 0.9 }}

            viewport={{ once: true }}

          >

            Our Core Values

          </motion.h2>

          

          <div style={{

            display: 'grid',

            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',

            gap: '32px'

          }}>

            {values.map((value, index) => (

              <motion.div

                key={index}

                initial={{ opacity: 0, x: -30 }}

                whileInView={{ opacity: 1, x: 0 }}

                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}

                viewport={{ once: true }}

                whileHover={{ 

                  x: 8,

                  transition: { duration: 0.2 }

                }}

                style={{

                  textAlign: 'center',

                  padding: '32px 24px'

                }}

              >

                <div style={{

                  width: '60px',

                  height: '60px',

                  borderRadius: '50%',

                  background: 'linear-gradient(135deg, #667eea, #764ba2)',

                  display: 'flex',

                  alignItems: 'center',

                  justifyContent: 'center',

                  margin: '0 auto 20px',

                  fontSize: '1.5rem',

                  fontWeight: '700',

                  color: 'white'

                }}>

                  {index + 1}

                </div>

                

                <h3 style={{

                  fontSize: '1.3rem',

                  fontWeight: '700',

                  color: '#ffffff',

                  marginBottom: '12px'

                }}>

                  {value.title}

                </h3>

                

                <p style={{

                  fontSize: '1rem',

                  color: '#e2e8f0',

                  lineHeight: '1.6',

                  opacity: 0.8

                }}>

                  {value.description}

                </p>

              </motion.div>

            ))}

          </div>

        </motion.div> */}

        {/* CTA Section */}

      {/* Add CSS animation */}

      <style jsx>{`

        @keyframes gradientShift {

          0%, 100% {

            background-position: 0% 50%;

          }

          50% {

            background-position: 100% 50%;

          }

        }

      `}</style>

    </div>

    </section>

  );

};



export default About;

