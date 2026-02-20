import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CourseComparison = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const courses = [
    {
      id: 1,
      title: 'Data Science & AI',
      price: '$2,999',
      duration: '6 months',
      level: 'Beginner to Advanced',
      projects: '12+ Real Projects',
      certification: 'Industry Certified',
      support: '24/7 Mentor Support',
      placement: '100% Job Assistance',
      skills: ['Python', 'Machine Learning', 'Deep Learning', 'Data Visualization'],
      rating: 4.9,
      students: 1247,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100'
    },
    {
      id: 2,
      title: 'Cyber Security',
      price: '$2,999',
      duration: '5 months',
      level: 'Intermediate',
      projects: '10+ Security Projects',
      certification: 'CEH Prep',
      support: '24/7 Mentor Support',
      placement: '100% Job Assistance',
      skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Risk Assessment'],
      rating: 4.8,
      students: 892,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100'
    },
    {
      id: 3,
      title: 'DevOps & Cloud',
      price: '$2,999',
      duration: '4 months',
      level: 'Beginner to Advanced',
      projects: '15+ DevOps Projects',
      certification: 'AWS/Azure Certified',
      support: '24/7 Mentor Support',
      placement: '100% Job Assistance',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      rating: 4.7,
      students: 1567,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100'
    }
  ];

  const toggleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else if (selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const getSelectedCoursesData = () => {
    return courses.filter(course => selectedCourses.includes(course.id));
  };

  return (
    <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📊 Compare Courses
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Select up to 3 courses to compare features, pricing, and find the perfect fit for your career goals
          </p>
        </motion.div>

        {/* Course Selection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'white',
                borderRadius: '15px',
                padding: '20px',
                border: selectedCourses.includes(course.id) 
                  ? '3px solid #667eea' 
                  : '2px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onClick={() => toggleCourseSelection(course.id)}
            >
              {selectedCourses.includes(course.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#667eea',
                    color: 'white',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px'
                  }}
                >
                  ✓
                </motion.div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <img 
                  src={course.image} 
                  alt={course.title}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '10px',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#333' }}>
                    {course.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#667eea', fontWeight: '600' }}>{course.price}</span>
                    <span style={{ color: '#ffa500', fontSize: '0.9rem' }}>⭐ {course.rating}</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div style={{ marginBottom: '5px' }}>📅 {course.duration}</div>
                <div style={{ marginBottom: '5px' }}>🎯 {course.level}</div>
                <div>👥 {course.students} students</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compare Button */}
        {selectedCourses.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <button
              onClick={() => setShowComparison(true)}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '15px 40px',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }}
            >
              📊 Compare {selectedCourses.length} Courses
            </button>
          </motion.div>
        )}

        {/* Comparison Modal */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px'
              }}
              onClick={() => setShowComparison(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '30px',
                  maxWidth: '1200px',
                  width: '100%',
                  maxHeight: '80vh',
                  overflow: 'auto',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowComparison(false)}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#999'
                  }}
                >
                  ×
                </button>

                <h2 style={{
                  textAlign: 'center',
                  marginBottom: '30px',
                  fontSize: '1.8rem',
                  color: '#333'
                }}>
                  📊 Course Comparison
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `200px repeat(${selectedCourses.length}, 1fr)`,
                  gap: '20px',
                  alignItems: 'start'
                }}>
                  {/* Feature Labels */}
                  <div>
                    {['Course', 'Price', 'Duration', 'Level', 'Projects', 'Certification', 'Support', 'Placement', 'Skills'].map((feature, index) => (
                      <div key={index} style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontWeight: '600',
                        color: '#333',
                        minHeight: '60px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Course Data */}
                  {getSelectedCoursesData().map((course) => (
                    <div key={course.id}>
                      <div style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        minHeight: '60px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <div style={{ fontWeight: '600', color: '#333', marginBottom: '5px' }}>
                          {course.title}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                          ⭐ {course.rating} ({course.students} students)
                        </div>
                      </div>
                      
                      <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', minHeight: '60px', display: 'flex', alignItems: 'center', fontWeight: '600', color: '#667eea' }}>
                        {course.price}
                      </div>
                      
                      <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                        📅 {course.duration}
                      </div>
                      
                      <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                        🎯 {course.level}
                      </div>
                      
                      <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                        🚀 {course.projects}
                      </div>
                      
                      <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                        🏆 {course.certification}
                      </div>
                      
                      <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                        💬 {course.support}
                      </div>
                      
                      <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                        💼 {course.placement}
                      </div>
                      
                      <div style={{ padding: '15px', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {course.skills.map((skill, index) => (
                            <span key={index} style={{
                              background: '#f0f0f0',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              color: '#666'
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <button
                    onClick={() => setShowComparison(false)}
                    style={{
                      background: 'linear-gradient(135deg, #28a745, #20c997)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '20px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Close Comparison
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CourseComparison;
