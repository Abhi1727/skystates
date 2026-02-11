import React from 'react';
import { Link } from 'react-router-dom';

const Programs = () => {
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
      popular: true,
      link: '/product/devops-and-cloud-computing-program'
    }
  ];

  return (
    <section className="programs">
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
