import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Award, 
  Target, 
  TrendingUp, 
  Clock, 
  Users, 
  CheckCircle, 
  Lock,
  Play,
  Star,
  Zap
} from 'lucide-react';

const InteractiveLearningJourney = () => {
  const [selectedPath, setSelectedPath] = useState('data-science');
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const [completedMilestones, setCompletedMilestones] = useState([1]);

  const learningPaths = {
    'data-science': {
      title: 'Data Science & AI Expert',
      duration: '6 months',
      difficulty: 'Intermediate to Advanced',
      skills: ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
      milestones: [
        {
          id: 1,
          title: 'Foundation Builder',
          description: 'Master Python programming and data structures',
          duration: '4 weeks',
          skills: ['Python Basics', 'Data Structures', 'Algorithms'],
          icon: BookOpen,
          color: '#3b82f6',
          completed: true,
          certificate: 'Python Fundamentals'
        },
        {
          id: 2,
          title: 'Data Analysis Pro',
          description: 'Learn data manipulation, visualization, and statistical analysis',
          duration: '6 weeks',
          skills: ['Pandas', 'NumPy', 'Matplotlib', 'Statistics'],
          icon: TrendingUp,
          color: '#10b981',
          completed: false,
          certificate: 'Data Analysis Specialist'
        },
        {
          id: 3,
          title: 'Machine Learning Engineer',
          description: 'Build and deploy ML models with scikit-learn and TensorFlow',
          duration: '8 weeks',
          skills: ['ML Algorithms', 'TensorFlow', 'Model Deployment'],
          icon: Target,
          color: '#f59e0b',
          completed: false,
          certificate: 'ML Engineer'
        },
        {
          id: 4,
          title: 'Deep Learning Specialist',
          description: 'Master neural networks, CNNs, RNNs, and transformers',
          duration: '6 weeks',
          skills: ['Neural Networks', 'CNN', 'RNN', 'Transformers'],
          icon: Zap,
          color: '#8b5cf6',
          completed: false,
          certificate: 'Deep Learning Expert'
        },
        {
          id: 5,
          title: 'AI Capstone Project',
          description: 'Build real-world AI applications and portfolio projects',
          duration: '4 weeks',
          skills: ['Project Management', 'Production ML', 'Portfolio Building'],
          icon: Award,
          color: '#ef4444',
          completed: false,
          certificate: 'AI Specialist'
        }
      ]
    },
    'cyber-security': {
      title: 'Cyber Security Expert',
      duration: '5 months',
      difficulty: 'Beginner to Advanced',
      skills: ['Network Security', 'Ethical Hacking', 'Penetration Testing', 'Security Analysis'],
      milestones: [
        {
          id: 1,
          title: 'Security Fundamentals',
          description: 'Understand core security concepts and network protocols',
          duration: '4 weeks',
          skills: ['Network Basics', 'Security Principles', 'Risk Assessment'],
          icon: BookOpen,
          color: '#3b82f6',
          completed: true,
          certificate: 'Security Fundamentals'
        },
        {
          id: 2,
          title: 'Ethical Hacking',
          description: 'Learn penetration testing and vulnerability assessment',
          duration: '6 weeks',
          skills: ['Penetration Testing', 'Vulnerability Assessment', 'Tools'],
          icon: Target,
          color: '#ef4444',
          completed: false,
          certificate: 'Ethical Hacker'
        },
        {
          id: 3,
          title: 'Security Analyst',
          description: 'Master security monitoring, incident response, and forensics',
          duration: '6 weeks',
          skills: ['SIEM', 'Incident Response', 'Digital Forensics'],
          icon: TrendingUp,
          color: '#f59e0b',
          completed: false,
          certificate: 'Security Analyst'
        },
        {
          id: 4,
          title: 'Advanced Security',
          description: 'Learn cloud security, application security, and compliance',
          duration: '5 weeks',
          skills: ['Cloud Security', 'AppSec', 'Compliance'],
          icon: Lock,
          color: '#8b5cf6',
          completed: false,
          certificate: 'Advanced Security'
        }
      ]
    },
    'devops': {
      title: 'DevOps & Cloud Expert',
      duration: '4 months',
      difficulty: 'Intermediate',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Computing', 'Infrastructure as Code'],
      milestones: [
        {
          id: 1,
          title: 'Cloud Foundations',
          description: 'Master AWS/Azure/GCP fundamentals and services',
          duration: '3 weeks',
          skills: ['Cloud Basics', 'AWS Services', 'Azure Fundamentals'],
          icon: BookOpen,
          color: '#3b82f6',
          completed: true,
          certificate: 'Cloud Practitioner'
        },
        {
          id: 2,
          title: 'Containerization',
          description: 'Learn Docker, container orchestration, and microservices',
          duration: '4 weeks',
          skills: ['Docker', 'Kubernetes', 'Microservices'],
          icon: Target,
          color: '#10b981',
          completed: false,
          certificate: 'Container Expert'
        },
        {
          id: 3,
          title: 'CI/CD Pipeline',
          description: 'Build automated deployment pipelines and infrastructure as code',
          duration: '5 weeks',
          skills: ['Jenkins', 'GitLab CI', 'Terraform'],
          icon: Zap,
          color: '#f59e0b',
          completed: false,
          certificate: 'DevOps Engineer'
        },
        {
          id: 4,
          title: 'DevOps Capstone',
          description: 'Deploy real-world applications with full DevOps practices',
          duration: '4 weeks',
          skills: ['Production Deployment', 'Monitoring', 'Optimization'],
          icon: Award,
          color: '#ef4444',
          completed: false,
          certificate: 'DevOps Specialist'
        }
      ]
    }
  };

  const currentPath = learningPaths[selectedPath];
  const completionPercentage = (completedMilestones.length / currentPath.milestones.length) * 100;

  const calculateTimeSaved = () => {
    const totalWeeks = currentPath.milestones.reduce((acc, milestone) => {
      const weeks = parseInt(milestone.duration.split(' ')[0]);
      return acc + weeks;
    }, 0);
    const traditionalLearning = totalWeeks * 3; // Traditional takes 3x longer
    const timeSaved = traditionalLearning - totalWeeks;
    return `${timeSaved} weeks`;
  };

  return (
    <div style={{
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #ffedd5 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '15px',
            background: 'linear-gradient(135deg, #f97316, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Your Learning Journey
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Visualize your path from beginner to expert with interactive milestones and real progress tracking
          </p>
        </motion.div>

        {/* Path Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {Object.keys(learningPaths).map(path => (
            <motion.button
              key={path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPath(path)}
              style={{
                padding: '12px 24px',
                background: selectedPath === path ? 
                  'linear-gradient(135deg, #f97316, #fb923c)' : 'white',
                color: selectedPath === path ? 'white' : '#374151',
                border: selectedPath === path ? 'none' : '2px solid #e5e7eb',
                borderRadius: '25px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedPath === path ? 
                  '0 8px 25px rgba(249, 115, 22, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              {learningPaths[path].title}
            </motion.button>
          ))}
        </div>

        {/* Path Overview */}
        <motion.div
          key={selectedPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '25px',
            marginBottom: '25px'
          }}>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '5px' }}>
                <Clock size={16} style={{ display: 'inline', marginRight: '5px' }} />
                Duration
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937' }}>
                {currentPath.duration}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '5px' }}>
                <Target size={16} style={{ display: 'inline', marginRight: '5px' }} />
                Difficulty
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937' }}>
                {currentPath.difficulty}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '5px' }}>
                <TrendingUp size={16} style={{ display: 'inline', marginRight: '5px' }} />
                Time Saved
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#10b981' }}>
                {calculateTimeSaved()}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '5px' }}>
                <Award size={16} style={{ display: 'inline', marginRight: '5px' }} />
                Certificates
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#f59e0b' }}>
                {currentPath.milestones.length}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '10px' }}>
              <Star size={16} style={{ display: 'inline', marginRight: '5px' }} />
              Skills You'll Master
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {currentPath.skills.map(skill => (
                <span
                  key={skill}
                  style={{
                    background: 'linear-gradient(135deg, #fef3c7, #fed7aa)',
                    color: '#92400e',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Learning Milestones */}
        <div style={{ position: 'relative' }}>
          {/* Progress Line */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '50px',
            right: '50px',
            height: '4px',
            background: '#e5e7eb',
            borderRadius: '2px',
            zIndex: 0
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #f97316, #fb923c)',
                borderRadius: '2px'
              }}
            />
          </div>

          {/* Milestones */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1
          }}>
            {currentPath.milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              const isCompleted = completedMilestones.includes(milestone.id);
              const isHovered = hoveredMilestone === milestone.id;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    position: 'relative',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setHoveredMilestone(milestone.id)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                >
                  {/* Milestone Node */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    style={{
                      width: '60px',
                      height: '60px',
                      background: isCompleted ? 
                        'linear-gradient(135deg, #10b981, #34d399)' : 
                        milestone.color,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 15px',
                      border: '4px solid white',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                      position: 'relative'
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle size={28} color="white" />
                    ) : (
                      <IconComponent size={28} color="white" />
                    )}
                    
                    {/* Milestone Number */}
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#f97316',
                      color: 'white',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      {index + 1}
                    </div>
                  </motion.div>

                  {/* Milestone Title */}
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '5px',
                    maxWidth: '120px'
                  }}>
                    {milestone.title}
                  </div>

                  {/* Milestone Duration */}
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    marginBottom: '8px'
                  }}>
                    {milestone.duration}
                  </div>

                  {/* Hover Card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'white',
                          borderRadius: '12px',
                          padding: '15px',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                          zIndex: 10,
                          width: '250px',
                          marginBottom: '10px'
                        }}
                      >
                        <div style={{
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          color: '#1f2937',
                          marginBottom: '8px'
                        }}>
                          {milestone.title}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#6b7280',
                          marginBottom: '10px',
                          lineHeight: '1.4'
                        }}>
                          {milestone.description}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '5px' }}>
                            Skills:
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {milestone.skills.map(skill => (
                              <span
                                key={skill}
                                style={{
                                  background: '#f3f4f6',
                                  color: '#374151',
                                  padding: '2px 6px',
                                  borderRadius: '8px',
                                  fontSize: '0.7rem',
                                  fontWeight: '500'
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: milestone.color
                        }}>
                          <Award size={14} />
                          {milestone.certificate}
                        </div>
                        {isCompleted && (
                          <div style={{
                            marginTop: '10px',
                            padding: '8px',
                            background: '#10b98115',
                            border: '1px solid #10b98130',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            color: '#10b981',
                            fontWeight: '600',
                            textAlign: 'center'
                          }}>
                            ✓ Completed
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: '50px'
          }}
        >
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '15px'
            }}>
              Start Your Journey Today
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '20px',
              maxWidth: '500px',
              margin: '0 auto 20px'
            }}>
              Join thousands of learners who have transformed their careers with our structured learning paths
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #f97316, #fb923c)',
                color: 'white',
                border: 'none',
                padding: '15px 40px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Play size={18} />
              Begin Learning Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveLearningJourney;
