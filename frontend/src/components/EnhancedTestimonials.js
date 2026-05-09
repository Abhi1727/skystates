import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, 
  Star, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Award,
  Briefcase,
  DollarSign,
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  BookOpen
} from 'lucide-react';

const EnhancedTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const successStories = [
    {
      id: 1,
      name: "Michael",
      before: {
        role: "IT Support Specialist",
        company: "Local IT Services",
        salary: "₹4.2 LPA",
        experience: "3 years",
        image: "https://picsum.photos/seed/michael-before/200/200.jpg",
        quote: "I was working in IT support doing routine maintenance work. While I had some technical background, I wanted to specialize in cybersecurity but didn't have the right skills or certifications."
      },
      after: {
        role: "Ethical Hacker",
        company: "CyberTech Solutions",
        salary: "₹10.5 LPA",
        experience: "4 months post-course",
        image: "https://picsum.photos/seed/michael-after/200/200.jpg",
        quote: "The Ethical Hacking program gave me hands-on experience with penetration testing and security audits. I'm now helping companies find vulnerabilities before malicious hackers do!"
      },
      course: "Ethical Hacking Program",
      duration: "4 months",
      rating: 5,
      location: "Mumbai, India",
      keySkills: ["Penetration Testing", "Network Security", "Vulnerability Assessment", "Security Tools"],
      achievement: "Certified Ethical Hacker"
    },
    {
      id: 2,
      name: "Ramadoss",
      before: {
        role: "Sales Executive",
        company: "Retail Company",
        salary: "₹3.5 LPA",
        experience: "5 years",
        image: "https://picsum.photos/seed/ramadoss-before/200/200.jpg",
        quote: "I was in non-technical sales role with no programming background. I wanted to transition to tech but was worried about the learning curve and job prospects."
      },
      after: {
        role: "Data Scientist",
        company: "Analytics Pro",
        salary: "₹8.8 LPA",
        experience: "6 months post-course",
        image: "https://picsum.photos/seed/ramadoss-after/200/200.jpg",
        quote: "The Data Science program started from basics and gradually built my skills. Now I'm working on machine learning models and helping businesses make data-driven decisions!"
      },
      course: "Data Science Program",
      duration: "6 months",
      rating: 5,
      location: "Chennai, India",
      keySkills: ["Python", "Machine Learning", "Data Analysis", "SQL", "Tableau"],
      achievement: "Top Performer - Data Science Batch"
    },
    {
      id: 3,
      name: "Safwan",
      before: {
        role: "Computer Science Student",
        company: "University Student",
        salary: "No Income",
        experience: "Final Year Student",
        image: "https://picsum.photos/seed/safwan-before/200/200.jpg",
        quote: "I was a final year student with theoretical knowledge but no practical skills. Companies were rejecting me due to lack of hands-on experience in security."
      },
      after: {
        role: "Cybersecurity Professional",
        company: "SecureNet Systems",
        salary: "₹7.2 LPA",
        experience: "3 months post-course",
        image: "https://picsum.photos/seed/safwan-after/200/200.jpg",
        quote: "The practical labs and real-world projects gave me the experience employers were looking for. I got placed even before completing the course!"
      },
      course: "Cybersecurity Program",
      duration: "3 months",
      rating: 5,
      location: "Bangalore, India",
      keySkills: ["Security Operations", "Threat Analysis", "SIEM Tools", "Incident Response"],
      achievement: "Early Placement Achievement"
    },
    {
      id: 4,
      name: "Olivia",
      before: {
        role: "Marketing Coordinator",
        company: "Digital Marketing Agency",
        salary: "₹4.8 LPA",
        experience: "2 years",
        image: "https://picsum.photos/seed/olivia-before/200/200.jpg",
        quote: "I was in marketing with some creative skills but wanted to transition to tech. Ethical hacking seemed interesting but I had no technical background."
      },
      after: {
        role: "Ethical Hacker",
        company: "Security First",
        salary: "₹9.5 LPA",
        experience: "5 months post-course",
        image: "https://picsum.photos/seed/olivia-after/200/200.jpg",
        quote: "The program's beginner-friendly approach helped me transition smoothly. Now I'm conducting security assessments and loving every challenge!"
      },
      course: "Ethical Hacking Program",
      duration: "5 months",
      rating: 5,
      location: "Delhi, India",
      keySkills: ["Web Application Security", "Network Penetration Testing", "Security Auditing", "Report Writing"],
      achievement: "Career Transition Success"
    },
    {
      id: 5,
      name: "Vaishali",
      before: {
        role: "Quality Analyst",
        company: "BPO Company",
        salary: "₹3.2 LPA",
        experience: "4 years",
        image: "https://picsum.photos/seed/vaishali-before/200/200.jpg",
        quote: "I had limited technical knowledge and was doing routine quality checks. I wanted to build a career in data science but didn't know where to start."
      },
      after: {
        role: "Data Scientist",
        company: "DataMinds Analytics",
        salary: "₹8.0 LPA",
        experience: "6 months post-course",
        image: "https://picsum.photos/seed/vaishali-after/200/200.jpg",
        quote: "The comprehensive curriculum and mentorship helped me transition from a non-technical role to data science. I'm now building predictive models!"
      },
      course: "Data Science Program",
      duration: "6 months",
      rating: 5,
      location: "Pune, India",
      keySkills: ["Statistical Analysis", "Machine Learning", "Python Programming", "Data Visualization"],
      achievement: "Non-Tech to Tech Success"
    },
    {
      id: 6,
      name: "Darrel Green",
      before: {
        role: "IT Support Technician",
        company: "Hardware Services",
        salary: "₹2.8 LPA",
        experience: "3 years",
        image: "https://picsum.photos/seed/darrel-before/200/200.jpg",
        quote: "I was doing basic IT support and hardware troubleshooting. I had some interest in security but lacked advanced cybersecurity skills and certifications."
      },
      after: {
        role: "Cybersecurity Expert",
        company: "TechGuard Security",
        salary: "₹7.5 LPA",
        experience: "4 months post-course",
        image: "https://picsum.photos/seed/darrel-after/200/200.jpg",
        quote: "The advanced security modules and industry-recognized certifications gave me the expertise needed. Now I'm protecting organizations from cyber threats!"
      },
      course: "Cybersecurity Program",
      duration: "4 months",
      rating: 5,
      location: "Hyderabad, India",
      keySkills: ["Advanced Threat Protection", "Security Architecture", "Risk Management", "Compliance"],
      achievement: "Security Expert Certification"
    },
    {
      id: 7,
      name: "Mark",
      before: {
        role: "Customer Service Representative",
        company: "Call Center",
        salary: "₹2.5 LPA",
        experience: "2 years",
        image: "https://picsum.photos/seed/mark-before/200/200.jpg",
        quote: "I was a complete beginner in tech with no programming knowledge. I was fascinated by ethical hacking but thought it was too complex for me."
      },
      after: {
        role: "Penetration Tester",
        company: "CyberDefense Labs",
        salary: "₹6.8 LPA",
        experience: "5 months post-course",
        image: "https://picsum.photos/seed/mark-after/200/200.jpg",
        quote: "The program's step-by-step approach made complex concepts easy to understand. I'm now legally hacking systems and finding security flaws!"
      },
      course: "Ethical Hacking Program",
      duration: "5 months",
      rating: 5,
      location: "Kolkata, India",
      keySkills: ["Penetration Testing Methodologies", "Security Tools", "Vulnerability Research", "Exploitation Techniques"],
      achievement: "Beginner to Expert Journey"
    },
    {
      id: 8,
      name: "Swathish",
      before: {
        role: "College Student",
        company: "Engineering Student",
        salary: "No Income",
        experience: "3rd Year Engineering",
        image: "https://picsum.photos/seed/swathish-before/200/200.jpg",
        quote: "I was an engineering student with theoretical knowledge but no practical data science skills. I was worried about getting a good job after graduation."
      },
      after: {
        role: "Data Analyst",
        company: "Insight Analytics",
        salary: "₹6.0 LPA",
        experience: "3 months post-course",
        image: "https://picsum.photos/seed/swathish-after/200/200.jpg",
        quote: "The hands-on projects and internship placement helped me gain practical experience. I got a job offer before completing my degree!"
      },
      course: "Data Science Program",
      duration: "3 months",
      rating: 5,
      location: "Coimbatore, India",
      keySkills: ["Data Cleaning", "Exploratory Analysis", "Statistical Modeling", "Business Intelligence"],
      achievement: "Student to Professional"
    },
    {
      id: 9,
      name: "Emma",
      before: {
        role: "Fresh Graduate",
        company: "Job Seeker",
        salary: "No Income",
        experience: "Recent Graduate",
        image: "https://picsum.photos/seed/emma-before/200/200.jpg",
        quote: "I had just graduated with no work experience and limited technical skills. I was struggling to get interviews in the competitive tech industry."
      },
      after: {
        role: "Security Analyst",
        company: "ProtectEdge Security",
        salary: "₹5.5 LPA",
        experience: "4 months post-course",
        image: "https://picsum.photos/seed/emma-after/200/200.jpg",
        quote: "The career services and practical training gave me both skills and confidence. I'm now monitoring security systems and protecting company assets!"
      },
      course: "Cybersecurity Program",
      duration: "4 months",
      rating: 5,
      location: "Mumbai, India",
      keySkills: ["Security Monitoring", "Log Analysis", "Incident Response", "Security Tools"],
      achievement: "Fresher to Professional"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % successStories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, successStories.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % successStories.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const calculateSalaryIncrease = (before, after) => {
    const beforeNum = parseInt(before.replace(/[^\d]/g, ''));
    const afterNum = parseInt(after.replace(/[^\d]/g, ''));
    if (beforeNum === 0) return 'New Career';
    return Math.round(((afterNum - beforeNum) / beforeNum) * 100) + '%';
  };

  const currentStory = successStories[currentIndex];

  return (
    <div style={{
      padding: '30px 20px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern - COMMENTED OUT */}
      {/* <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} /> */}

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Career Transformations
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#64748b',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Real stories of career growth, salary increases, and life-changing opportunities through our programs
          </p>
        </motion.div>

        {/* Success Stats - COMMENTED OUT */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '40px'
          }}
        >
          {[
            { number: '150%', label: 'Avg. Salary Hike', icon: TrendingUp },
            { number: '95%', label: 'Placement Rate', icon: Users },
            { number: '3-6', label: 'Months to Placement', icon: Calendar },
            { number: '100+', label: 'Hiring Partners', icon: Briefcase }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '16px',
                  padding: '18px',
                  textAlign: 'center'
                }}
              >
                <IconComponent size={32} color="#3b82f6" style={{ marginBottom: '15px' }} />
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: '800',
                  color: '#3b82f6',
                  marginBottom: '8px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div> */}

        {/* Main Success Story */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '24px',
              padding: '25px',
              marginBottom: '30px'
            }}
          >
            {/* Unified Before/After Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '20px',
                padding: '25px',
                position: 'relative'
              }}
            >
              {/* Header with Name */}
              <div style={{
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '10px'
                }}>
                  {currentStory.name}'s Career Transformation
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '30px',
                  fontSize: '0.9rem',
                  color: '#64748b'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={16} />
                    {currentStory.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <BookOpen size={16} />
                    {currentStory.course}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={16} />
                    {currentStory.duration}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '30px',
                alignItems: 'stretch'
              }}>
                {/* Before Section */}
                <div style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '16px',
                  padding: '18px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    background: '#ef4444',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                  }}>
                    BEFORE
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '20px',
                    marginTop: '10px'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: '#e5e7eb',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <img 
                        src={currentStory.before.image} 
                        alt={currentStory.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: '3px'
                      }}>
                        {currentStory.before.role}
                      </h4>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        marginBottom: '5px'
                      }}>
                        {currentStory.before.company}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.8rem'
                      }}>
                        <span style={{ color: '#ef4444', fontWeight: '600' }}>
                          💰 {currentStory.before.salary}
                        </span>
                        <span style={{ color: '#6b7280' }}>
                          📅 {currentStory.before.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Quote size={16} color="#ef4444" style={{ marginBottom: '10px', opacity: 0.7 }} />
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    lineHeight: '1.5',
                    fontStyle: 'italic'
                  }}>
                    "{currentStory.before.quote}"
                  </p>
                </div>

                {/* Arrow */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: '#3b82f6',
                  fontWeight: 'bold'
                }}>
                  →
                </div>

                {/* After Section */}
                <div style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '16px',
                  padding: '18px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    background: '#10b981',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                  }}>
                    AFTER
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '20px',
                    marginTop: '10px'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: '#e5e7eb',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <img 
                        src={currentStory.after.image} 
                        alt={currentStory.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: '3px'
                      }}>
                        {currentStory.after.role}
                      </h4>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        marginBottom: '5px'
                      }}>
                        {currentStory.after.company}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.8rem'
                      }}>
                        <span style={{ color: '#10b981', fontWeight: '600' }}>
                          💰 {currentStory.after.salary}
                        </span>
                        <span style={{ color: '#6b7280' }}>
                          📅 {currentStory.after.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Quote size={16} color="#10b981" style={{ marginBottom: '10px', opacity: 0.7 }} />
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    lineHeight: '1.5',
                    fontStyle: 'italic'
                  }}>
                    "{currentStory.after.quote}"
                  </p>
                </div>
              </div>

              {/* Achievement & Skills Section */}
              <div style={{
                marginTop: '20px',
                padding: '20px',
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    marginBottom: '8px'
                  }}>
                    Key Skills Acquired:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {currentStory.keySkills.map(skill => (
                      <span
                        key={skill}
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          color: '#1e40af',
                          padding: '3px 10px',
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
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
                  gap: '15px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      color: '#3b82f6',
                      marginBottom: '2px'
                    }}>
                      {calculateSalaryIncrease(currentStory.before.salary, currentStory.after.salary)}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#64748b',
                      fontWeight: '600'
                    }}>
                      Salary Increase
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'rgba(59, 130, 246, 0.2)',
                    borderRadius: '20px',
                    border: '1px solid rgba(59, 130, 246, 0.4)'
                  }}>
                    <Award size={16} color="#3b82f6" />
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#1e40af',
                      fontWeight: '600'
                    }}>
                      {currentStory.achievement}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <button
            onClick={handlePrevious}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(59, 130, 246, 0.2)';
              e.target.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.8)';
              e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentIndex ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={handleNext}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* More Success Stories */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {successStories.filter((_, index) => index !== currentIndex).slice(0, 3).map(story => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => setCurrentIndex(successStories.indexOf(story))}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#e5e7eb',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={story.after.image} 
                    alt={story.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '3px'
                  }}>
                    {story.name}
                  </h4>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b'
                  }}>
                    {story.after.role}
                  </p>
                </div>
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#3b82f6',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {story.after.company} • {calculateSalaryIncrease(story.before.salary, story.after.salary)} hike
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: '#64748b'
              }}>
                {story.course}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedTestimonials;
