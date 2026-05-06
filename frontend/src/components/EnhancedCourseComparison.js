import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  Clock, 
  Users, 
  Award, 
  TrendingUp,
  DollarSign,
  BookOpen,
  Target,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp,
  Info,
  Heart,
  Share2
} from 'lucide-react';

const EnhancedCourseComparison = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState({});
  const [comparisonView, setComparisonView] = useState('grid'); // grid, table, detailed
  const [wishlist, setWishlist] = useState([]);

  const courses = [
    {
      id: 1,
      title: 'Data Science & AI Program',
      shortTitle: 'Data Science',
      price: 85000,
      originalPrice: 95000,
      currency: '₹',
      duration: '6 months',
      weeklyHours: '15-20 hours',
      level: 'Beginner to Advanced',
      difficulty: 3,
      projects: 12,
      caseStudies: 8,
      internship: '3 months guaranteed',
      certification: 'Industry Certified + IBM Badge',
      support: '24/7 Mentor Support',
      placement: '100% Job Assistance',
      avgSalary: '₹12-25 LPA',
      placementRate: '95%',
      timeToPlacement: '3 months',
      skills: [
        { name: 'Python', level: 'Advanced', icon: '🐍' },
        { name: 'Machine Learning', level: 'Advanced', icon: '🤖' },
        { name: 'Deep Learning', level: 'Advanced', icon: '🧠' },
        { name: 'Data Visualization', level: 'Intermediate', icon: '📊' },
        { name: 'NLP', level: 'Intermediate', icon: '💬' },
        { name: 'Computer Vision', level: 'Intermediate', icon: '👁️' }
      ],
      rating: 4.9,
      reviews: 1247,
      image: 'https://picsum.photos/seed/datascience/200/200.jpg',
      badge: 'Most Popular',
      badgeColor: '#f97316',
      features: {
        basics: ['Python Fundamentals', 'Statistics & Probability', 'Data Structures'],
        advanced: ['Neural Networks', 'Transformers', 'GANs', 'Reinforcement Learning'],
        tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Pandas', 'NumPy'],
        career: ['Resume Building', 'Interview Prep', 'LinkedIn Optimization', 'Portfolio Building']
      },
      highlights: [
        '500+ hiring partners',
        'IBM certification included',
        'Lifetime access to materials',
        'Alumni network access'
      ],
      emi: '₹7,083/month',
      scholarship: 'Up to 30% available'
    },
    {
      id: 2,
      title: 'Cyber Security & Ethical Hacking',
      shortTitle: 'Cyber Security',
      price: 75000,
      originalPrice: 85000,
      currency: '₹',
      duration: '5 months',
      weeklyHours: '12-15 hours',
      level: 'Intermediate',
      difficulty: 4,
      projects: 10,
      caseStudies: 12,
      internship: '2 months guaranteed',
      certification: 'CEH Prep + CompTIA Security+',
      support: '24/7 Mentor Support',
      placement: '100% Job Assistance',
      avgSalary: '₹8-20 LPA',
      placementRate: '92%',
      timeToPlacement: '4 months',
      skills: [
        { name: 'Network Security', level: 'Advanced', icon: '🔒' },
        { name: 'Ethical Hacking', level: 'Advanced', icon: '🎯' },
        { name: 'Penetration Testing', level: 'Advanced', icon: '🔍' },
        { name: 'Cryptography', level: 'Intermediate', icon: '🔐' },
        { name: 'Risk Assessment', level: 'Intermediate', icon: '⚠️' },
        { name: 'SIEM Tools', level: 'Intermediate', icon: '📡' }
      ],
      rating: 4.8,
      reviews: 892,
      image: 'https://picsum.photos/seed/cybersecurity/200/200.jpg',
      badge: 'High Demand',
      badgeColor: '#ef4444',
      features: {
        basics: ['Security Fundamentals', 'Network Protocols', 'Linux Basics'],
        advanced: ['Advanced Penetration Testing', 'Malware Analysis', 'Digital Forensics'],
        tools: ['Metasploit', 'Wireshark', 'Burp Suite', 'Nmap', 'Kali Linux'],
        career: ['Security Clearance Prep', 'Government Jobs', 'Corporate Security']
      },
      highlights: [
        'Live hacking labs',
        'Real-world scenarios',
        'Industry expert mentors',
        'Job guarantee program'
      ],
      emi: '₹6,250/month',
      scholarship: 'Up to 25% available'
    },
    {
      id: 3,
      title: 'DevOps & Cloud Computing',
      shortTitle: 'DevOps',
      price: 65000,
      originalPrice: 75000,
      currency: '₹',
      duration: '4 months',
      weeklyHours: '10-15 hours',
      level: 'Beginner to Advanced',
      difficulty: 3,
      projects: 15,
      caseStudies: 6,
      internship: '2 months guaranteed',
      certification: 'AWS/Azure Certified + DevOps Institute',
      support: '24/7 Mentor Support',
      placement: '100% Job Assistance',
      avgSalary: '₹10-22 LPA',
      placementRate: '94%',
      timeToPlacement: '2 months',
      skills: [
        { name: 'Docker', level: 'Advanced', icon: '🐳' },
        { name: 'Kubernetes', level: 'Advanced', icon: '☸️' },
        { name: 'AWS', level: 'Advanced', icon: '☁️' },
        { name: 'CI/CD', level: 'Advanced', icon: '🔄' },
        { name: 'Infrastructure as Code', level: 'Intermediate', icon: '🏗️' },
        { name: 'Monitoring', level: 'Intermediate', icon: '📊' }
      ],
      rating: 4.7,
      reviews: 1567,
      image: 'https://picsum.photos/seed/devops/200/200.jpg',
      badge: 'Fast Track',
      badgeColor: '#10b981',
      features: {
        basics: ['Cloud Fundamentals', 'Linux Administration', 'Scripting'],
        advanced: ['Microservices', 'Serverless Architecture', 'Multi-Cloud Strategy'],
        tools: ['Jenkins', 'GitLab CI', 'Terraform', 'Ansible', 'Prometheus'],
        career: ['Cloud Architecture', 'Site Reliability', 'DevOps Leadership']
      },
      highlights: [
        'AWS/Azure credits included',
        'Real cloud environment',
        'Enterprise projects',
        'Multiple cloud certifications'
      ],
      emi: '₹5,417/month',
      scholarship: 'Up to 20% available'
    },
    {
      id: 4,
      title: 'Data Science Short-Term',
      shortTitle: 'Data Science Lite',
      price: 45000,
      originalPrice: 55000,
      currency: '₹',
      duration: '3 months',
      weeklyHours: '8-12 hours',
      level: 'Beginner',
      difficulty: 2,
      projects: 6,
      caseStudies: 4,
      internship: '1 month optional',
      certification: 'Data Science Certificate',
      support: 'Business Hours Support',
      placement: 'Job Assistance',
      avgSalary: '₹6-12 LPA',
      placementRate: '85%',
      timeToPlacement: '4 months',
      skills: [
        { name: 'Python Basics', level: 'Intermediate', icon: '🐍' },
        { name: 'Data Analysis', level: 'Intermediate', icon: '📊' },
        { name: 'SQL', level: 'Intermediate', icon: '🗃️' },
        { name: 'Tableau', level: 'Intermediate', icon: '📈' },
        { name: 'Excel Advanced', level: 'Advanced', icon: '📊' },
        { name: 'Statistics', level: 'Intermediate', icon: '📈' }
      ],
      rating: 4.6,
      reviews: 678,
      image: 'https://picsum.photos/seed/datasciencelite/200/200.jpg',
      badge: 'Beginner Friendly',
      badgeColor: '#3b82f6',
      features: {
        basics: ['Python for Data Science', 'Statistical Analysis', 'Data Cleaning'],
        advanced: ['Machine Learning Basics', 'Predictive Analytics'],
        tools: ['Pandas', 'NumPy', 'Matplotlib', 'Tableau', 'Excel'],
        career: ['Data Analyst Roles', 'Business Intelligence', 'Report Generation']
      },
      highlights: [
        'Perfect for beginners',
        'Flexible schedule',
        'Quick completion',
        'Affordable option'
      ],
      emi: '₹3,750/month',
      scholarship: 'Up to 15% available'
    }
  ];

  const toggleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else if (selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const toggleWishlist = (courseId) => {
    if (wishlist.includes(courseId)) {
      setWishlist(wishlist.filter(id => id !== courseId));
    } else {
      setWishlist([...wishlist, courseId]);
    }
  };

  const toggleFeatureExpansion = (feature) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const getSelectedCoursesData = () => {
    return courses.filter(course => selectedCourses.includes(course.id));
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Advanced': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Beginner': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getDifficultyStars = (level) => {
    return Array.from({ length: 5 }, (_, i) => i < level);
  };

  const calculateValueScore = (course) => {
    const priceScore = (1 - course.price / 100000) * 40;
    const ratingScore = (course.rating / 5) * 30;
    const placementScore = (parseInt(course.placementRate) / 100) * 30;
    return Math.round(priceScore + ratingScore + placementScore);
  };

  const shareComparison = () => {
    const courseNames = getSelectedCoursesData().map(c => c.shortTitle).join(' vs ');
    const text = `Comparing ${courseNames} on Sky States - Find the perfect course for your career!`;
    if (navigator.share) {
      navigator.share({ text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
    }
  };

  return (
    <div style={{
      padding: '80px 20px',
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

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #f97316, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📊 Advanced Course Comparison
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#6b7280',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Compare up to 3 courses with detailed insights, career outcomes, and find the perfect program for your goals
          </p>

          {/* View Toggle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '30px'
          }}>
            {['grid', 'table', 'detailed'].map(view => (
              <motion.button
                key={view}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setComparisonView(view)}
                style={{
                  padding: '10px 20px',
                  background: comparisonView === view ? 
                    'linear-gradient(135deg, #f97316, #fb923c)' : 'white',
                  color: comparisonView === view ? 'white' : '#374151',
                  border: comparisonView === view ? 'none' : '2px solid #e5e7eb',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)} View
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Course Selection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: comparisonView === 'grid' ? 
            'repeat(auto-fit, minmax(300px, 1fr))' : 
            'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          {courses.map((course) => {
            const isSelected = selectedCourses.includes(course.id);
            const isInWishlist = wishlist.includes(course.id);
            const valueScore = calculateValueScore(course);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(249, 115, 22, 0.2)'
                }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '25px',
                  border: isSelected ? 
                    `3px solid ${course.badgeColor}` : 
                    '2px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => toggleCourseSelection(course.id)}
              >
                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: course.badgeColor,
                  color: 'white',
                  padding: '5px 12px',
                  borderRadius: '15px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {course.badge}
                </div>

                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(course.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Heart 
                    size={18} 
                    color={isInWishlist ? '#ef4444' : '#9ca3af'}
                    fill={isInWishlist ? '#ef4444' : 'none'}
                  />
                </motion.button>

                {/* Selection Indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: 'absolute',
                        top: '60px',
                        left: '15px',
                        background: '#10b981',
                        color: 'white',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Check size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Course Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '15px',
                    background: '#f3f4f6',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={course.image} 
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      margin: '0 0 8px 0', 
                      fontSize: '1.2rem', 
                      fontWeight: '700',
                      color: '#1f2937'
                    }}>
                      {course.shortTitle}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            color={i < Math.floor(course.rating) ? '#f59e0b' : '#e5e7eb'}
                            fill={i < Math.floor(course.rating) ? '#f59e0b' : 'none'}
                          />
                        ))}
                        <span style={{ 
                          fontSize: '0.85rem', 
                          color: '#6b7280',
                          marginLeft: '3px'
                        }}>
                          {course.rating} ({course.reviews})
                        </span>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={14} />
                        {course.duration}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Target size={14} />
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '5px' }}>
                    <span style={{
                      fontSize: '1.8rem',
                      fontWeight: '800',
                      color: course.badgeColor
                    }}>
                      {course.currency}{course.price.toLocaleString()}
                    </span>
                    <span style={{
                      fontSize: '1rem',
                      color: '#9ca3af',
                      textDecoration: 'line-through'
                    }}>
                      {course.currency}{course.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '600' }}>
                    💰 {course.emi} • 🎓 {course.scholarship}
                  </div>
                </div>

                {/* Key Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    background: '#f9fafb',
                    padding: '12px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#10b981',
                      marginBottom: '3px'
                    }}>
                      {course.placementRate}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Placement Rate
                    </div>
                  </div>
                  <div style={{
                    background: '#f9fafb',
                    padding: '12px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#f59e0b',
                      marginBottom: '3px'
                    }}>
                      {course.avgSalary}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Average Salary
                    </div>
                  </div>
                </div>

                {/* Skills Preview */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>
                    Top Skills:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {course.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        style={{
                          background: `${getSkillLevelColor(skill.level)}15`,
                          color: getSkillLevelColor(skill.level),
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>{skill.icon}</span>
                        {skill.name}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Value Score */}
                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7, #fed7aa)',
                  padding: '15px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.85rem', color: '#92400e', marginBottom: '5px' }}>
                    Value Score
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#f97316'
                  }}>
                    {valueScore}/100
                  </div>
                </div>

                {/* Highlights */}
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {course.highlights.slice(0, 2).map((highlight, index) => (
                    <div key={index} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Check size={12} color="#10b981" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        {selectedCourses.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowComparison(true)}
                style={{
                  background: 'linear-gradient(135deg, #f97316, #fb923c)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Target size={20} />
                Compare {selectedCourses.length} Courses
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareComparison}
                style={{
                  background: 'white',
                  color: '#374151',
                  border: '2px solid #e5e7eb',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Share2 size={18} />
                Share Comparison
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Detailed Comparison Modal */}
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
                  borderRadius: '24px',
                  padding: '40px',
                  maxWidth: '1400px',
                  width: '100%',
                  maxHeight: '85vh',
                  overflow: 'auto',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '30px'
                }}>
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    📊 Detailed Course Comparison
                  </h2>
                  <button
                    onClick={() => setShowComparison(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '28px',
                      cursor: 'pointer',
                      color: '#9ca3af',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#374151'}
                    onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                  >
                    ×
                  </button>
                </div>

                {/* Comparison Table */}
                <div style={{
                  overflowX: 'auto',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        <th style={{
                          padding: '20px',
                          textAlign: 'left',
                          fontWeight: '700',
                          color: '#1f2937',
                          borderBottom: '2px solid #e5e7eb',
                          minWidth: '200px'
                        }}>
                          Feature
                        </th>
                        {getSelectedCoursesData().map(course => (
                          <th key={course.id} style={{
                            padding: '20px',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#1f2937',
                            borderBottom: '2px solid #e5e7eb',
                            minWidth: '250px',
                            position: 'relative'
                          }}>
                            <div style={{ marginBottom: '10px' }}>
                              <img 
                                src={course.image} 
                                alt={course.title}
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  borderRadius: '12px',
                                  objectFit: 'cover',
                                  marginBottom: '10px'
                                }}
                              />
                              <div style={{ fontSize: '1rem', fontWeight: '700' }}>
                                {course.shortTitle}
                              </div>
                              <div style={{
                                fontSize: '0.8rem',
                                color: '#6b7280',
                                marginTop: '5px'
                              }}>
                                ⭐ {course.rating} ({course.reviews} reviews)
                              </div>
                            </div>
                            <div style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              background: course.badgeColor,
                              color: 'white',
                              padding: '3px 8px',
                              borderRadius: '10px',
                              fontSize: '0.7rem',
                              fontWeight: '700'
                            }}>
                              {course.badge}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Price Row */}
                      <tr>
                        <td style={{
                          padding: '20px',
                          fontWeight: '600',
                          color: '#1f2937',
                          borderBottom: '1px solid #e5e7eb',
                          background: '#f9fafb'
                        }}>
                          💰 Price
                        </td>
                        {getSelectedCoursesData().map(course => (
                          <td key={course.id} style={{
                            padding: '20px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <div>
                              <div style={{
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: course.badgeColor,
                                marginBottom: '5px'
                              }}>
                                {course.currency}{course.price.toLocaleString()}
                              </div>
                              <div style={{
                                fontSize: '0.9rem',
                                color: '#9ca3af',
                                textDecoration: 'line-through',
                                marginBottom: '5px'
                              }}>
                                {course.currency}{course.originalPrice.toLocaleString()}
                              </div>
                              <div style={{
                                fontSize: '0.85rem',
                                color: '#10b981',
                                fontWeight: '600'
                              }}>
                                {course.emi} • {course.scholarship}
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Duration Row */}
                      <tr>
                        <td style={{
                          padding: '20px',
                          fontWeight: '600',
                          color: '#1f2937',
                          borderBottom: '1px solid #e5e7eb',
                          background: '#f9fafb'
                        }}>
                          📅 Duration & Schedule
                        </td>
                        {getSelectedCoursesData().map(course => (
                          <td key={course.id} style={{
                            padding: '20px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <div style={{ marginBottom: '8px', fontWeight: '600' }}>
                              {course.duration}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                              {course.weeklyHours}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Level Row */}
                      <tr>
                        <td style={{
                          padding: '20px',
                          fontWeight: '600',
                          color: '#1f2937',
                          borderBottom: '1px solid #e5e7eb',
                          background: '#f9fafb'
                        }}>
                          🎯 Level & Difficulty
                        </td>
                        {getSelectedCoursesData().map(course => (
                          <td key={course.id} style={{
                            padding: '20px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <div style={{ marginBottom: '8px', fontWeight: '600' }}>
                              {course.level}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
                              {getDifficultyStars(course.difficulty).map((filled, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  color={filled ? '#f59e0b' : '#e5e7eb'}
                                  fill={filled ? '#f59e0b' : 'none'}
                                />
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Projects Row */}
                      <tr>
                        <td style={{
                          padding: '20px',
                          fontWeight: '600',
                          color: '#1f2937',
                          borderBottom: '1px solid #e5e7eb',
                          background: '#f9fafb'
                        }}>
                          🚀 Projects & Case Studies
                        </td>
                        {getSelectedCoursesData().map(course => (
                          <td key={course.id} style={{
                            padding: '20px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <div style={{ marginBottom: '8px', fontWeight: '600' }}>
                              {course.projects} Projects
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                              {course.caseStudies} Case Studies
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Skills Row */}
                      <tr>
                        <td style={{
                          padding: '20px',
                          fontWeight: '600',
                          color: '#1f2937',
                          borderBottom: '1px solid #e5e7eb',
                          background: '#f9fafb'
                        }}>
                          🛠️ Skills Covered
                        </td>
                        {getSelectedCoursesData().map(course => (
                          <td key={course.id} style={{
                            padding: '20px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                              {course.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  style={{
                                    background: `${getSkillLevelColor(skill.level)}15`,
                                    color: getSkillLevelColor(skill.level),
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3px'
                                  }}
                                >
                                  <span>{skill.icon}</span>
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Career Outcomes Row */}
                      <tr>
                        <td style={{
                          padding: '20px',
                          fontWeight: '600',
                          color: '#1f2937',
                          borderBottom: '1px solid #e5e7eb',
                          background: '#f9fafb'
                        }}>
                          💼 Career Outcomes
                        </td>
                        {getSelectedCoursesData().map(course => (
                          <td key={course.id} style={{
                            padding: '20px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <div style={{ marginBottom: '8px' }}>
                              <div style={{
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                color: '#10b981'
                              }}>
                                {course.placementRate}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                Placement Rate
                              </div>
                            </div>
                            <div style={{ marginBottom: '8px' }}>
                              <div style={{
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                color: '#f59e0b'
                              }}>
                                {course.avgSalary}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                Average Salary
                              </div>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                              {course.timeToPlacement} avg. placement time
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Certification Row */}
                      <tr>
                        <td style={{
                          padding: '20px',
                          fontWeight: '600',
                          color: '#1f2937',
                          borderBottom: '1px solid #e5e7eb',
                          background: '#f9fafb'
                        }}>
                          🏆 Certification
                        </td>
                        {getSelectedCoursesData().map(course => (
                          <td key={course.id} style={{
                            padding: '20px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                              {course.certification}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Close Button */}
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowComparison(false)}
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      padding: '15px 40px',
                      borderRadius: '25px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    Close Comparison
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedCourseComparison;
