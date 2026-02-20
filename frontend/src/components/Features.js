import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  // Animation variants for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const iconVariants = {
    hidden: {
      rotate: -180,
      scale: 0
    },
    visible: {
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.4
      }
    },
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const features = [
    {
      icon: 'fas fa-project-diagram',
      title: 'Project Experience',
      description: 'Work on real-world projects to build practical skills'
    },
    {
      icon: 'fas fa-briefcase',
      title: '100% Job Assistance',
      description: 'Get complete support in finding your dream job'
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Sessions by Experts',
      description: 'Learn from industry professionals with years of experience'
    },
    {
      icon: 'fas fa-users',
      title: 'Personalized Small Batches',
      description: 'Get individual attention in small group settings'
    }
  ];

  return (
    <section className="features">
      <div className="container">
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              className="feature-card" 
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              }}
            >
              <motion.div 
                className="feature-icon"
                variants={iconVariants}
                whileHover="hover"
              >
                <i className={feature.icon}></i>
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
