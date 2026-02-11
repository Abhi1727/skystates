import React from 'react';

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
        <h2>What Our Students Have To Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-content">
                <p>"{testimonial.content}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
