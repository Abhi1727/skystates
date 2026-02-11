import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Programs = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.program-card');

    cards.forEach((card, i) => {
      // Create a timeline for smoother, continuous animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          end: "top 35%",
          toggleActions: "play none none reverse"
        }
      });

      // Break down into micro-steps that blend together
      tl.fromTo(card, 
        { opacity: 0, y: 40, scale: 0.98, rotationY: 5 },
        { opacity: 0.3, y: 30, scale: 0.99, rotationY: 4, duration: 0.3, ease: "none" }
      )
      .to(card, 
        { opacity: 0.6, y: 20, scale: 0.995, rotationY: 3, duration: 0.3, ease: "none" }
      )
      .to(card, 
        { opacity: 0.8, y: 10, scale: 0.998, rotationY: 2, duration: 0.3, ease: "none" }
      )
      .to(card, 
        { opacity: 0.9, y: 5, scale: 0.999, rotationY: 1, duration: 0.2, ease: "none" }
      )
      .to(card, 
        { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.2, ease: "none" }
      );

      // Add subtle continuous micro-movement on hover
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -6,
          scale: 1.02,
          duration: 0.6,
          ease: "power1.inOut"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power1.inOut"
        });
      });
    });

  }, { scope: containerRef });
  const programs = [
    {
      icon: 'fas fa-brain',
      title: 'Data Science And AI',
      description: 'Master data science, machine learning, and AI technologies',
      price: '$2,999',
      popular: false,
      link: '/product/data-science-ai-program'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Cyber Security And Ethical Hacking',
      description: 'Learn cybersecurity fundamentals and ethical hacking techniques',
      price: '$2,999',
      popular: false,
      link: '/product/cyber-security-and-ethical-hacking-program'
    },
    {
      icon: 'fas fa-cloud',
      title: 'DevOps & Cloud Computing',
      description: 'Master cloud platforms and DevOps practices',
      price: '$2,999',
      popular: false,
      link: '/product/devops-and-cloud-computing-program'
    }
  ];

  return (
    <section ref={containerRef} className="programs">
      <div className="container">
        <h2>Our Programs</h2>
        <div className="programs-grid">
          {programs.map((program, index) => (
            <div className={`program-card ${program.popular ? 'popular' : ''}`} key={index}>
              {program.popular && <div className="popular-badge">Most Popular</div>}
              <div className="program-image">
                <i className={program.icon}></i>
              </div>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <div className="program-price">{program.price}</div>
              <Link to={program.link} className="btn-primary">Learn More</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
