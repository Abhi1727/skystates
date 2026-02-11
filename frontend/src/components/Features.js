import React from 'react';

const Features = () => {
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
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
