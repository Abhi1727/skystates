import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      content: "Sky States helped me transition from a non-tech background to a successful data scientist. The hands-on projects and job assistance were invaluable.",
      author: "Sarah Johnson",
      position: "Data Scientist"
    },
    {
      content: "The cybersecurity program at Sky States gave me the skills and confidence I needed to land my dream job. The instructors were amazing!",
      author: "Michael Chen",
      position: "Cybersecurity Analyst"
    },
    {
      content: "The DevOps program exceeded my expectations. I now work at a leading tech company thanks to the skills I gained at Sky States.",
      author: "Alex Rodriguez",
      position: "DevOps Engineer"
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '50px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          What Our Students Have To Say
        </motion.h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2, 
                ease: "easeOut" 
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              style={{
                background: 'white',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.05)',
                cursor: 'pointer'
              }}
            >
              <motion.div 
                className="testimonial-content"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.p
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    color: '#4a5568',
                    fontStyle: 'italic'
                  }}
                >
                  "{testimonial.content}"
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}
                >
                  <motion.div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '1.2rem'
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  >
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  
                  <div>
                    <motion.h4
                      style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#2d3748',
                        marginBottom: '4px',
                        margin: 0
                      }}
                    >
                      {testimonial.author}
                    </motion.h4>
                    <motion.p
                      style={{
                        fontSize: '0.9rem',
                        color: '#718096',
                        margin: 0
                      }}
                    >
                      {testimonial.position}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
