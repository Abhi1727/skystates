import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import LiquidChrome from './LiquidChrome';

// Professional color palette
const colors = {
  primary: '#1a1f36',
  primaryLight: '#2d3748',
  accent: '#667eea',
  accentLight: '#a78bfa',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  neutral50: '#f8fafc',
  neutral100: '#e2e8f0',
  neutral500: '#64748b',
  neutral900: '#0f172a'
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Scroll hooks for animations
  const { scrollYProgress } = useScroll();
  
  const jobsPerPage = 5;

  // Mock data for now - will be replaced with API call
  const mockJobs = [
    {
      id: 1,
      title: "Senior Data Scientist",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Full Time",
      experience: "Senior Level",
      salary: "$130k - $180k",
      description: "We're looking for an experienced Data Scientist to join our growing team and help drive data-driven decision making across the organization.",
      tags: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Cybersecurity Analyst",
      company: "SecureNet Inc",
      location: "Remote",
      type: "Full Time",
      experience: "Mid Level",
      salary: "$85k - $120k",
      description: "Join our cybersecurity team to protect critical infrastructure and ensure the security of our digital assets.",
      tags: ["Security", "Penetration Testing", "SIEM", "Risk Assessment"],
      posted: "3 days ago"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudScale Systems",
      location: "Austin, TX",
      type: "Full Time",
      experience: "Mid Level",
      salary: "$95k - $135k",
      description: "We're seeking a DevOps Engineer to help build and maintain our cloud infrastructure and CI/CD pipelines.",
      tags: ["AWS", "Docker", "Kubernetes", "Jenkins"],
      posted: "1 week ago"
    },
    {
      id: 4,
      title: "Machine Learning Engineer",
      company: "AI Innovations Lab",
      location: "New York, NY",
      type: "Full Time",
      experience: "Senior Level",
      salary: "$140k - $190k",
      description: "Join our ML team to develop cutting-edge artificial intelligence solutions for enterprise clients.",
      tags: ["PyTorch", "Computer Vision", "NLP", "Deep Learning"],
      posted: "4 days ago"
    },
    {
      id: 5,
      title: "Junior Data Analyst",
      company: "DataDriven Co",
      location: "Seattle, WA",
      type: "Full Time",
      experience: "Entry Level",
      salary: "$60k - $80k",
      description: "Great opportunity for recent graduates to start their career in data analysis and business intelligence.",
      tags: ["Excel", "SQL", "Tableau", "Statistics"],
      posted: "1 day ago"
    },
    {
      id: 6,
      title: "Cloud Security Specialist",
      company: "Fortress Security",
      location: "Remote",
      type: "Contract",
      experience: "Senior Level",
      salary: "$120k - $160k",
      description: "Looking for a cloud security expert to help secure our multi-cloud environment and implement best practices.",
      tags: ["Cloud Security", "Azure", "GCP", "Compliance"],
      posted: "5 days ago"
    },
    {
      id: 7,
      title: "Data Science Intern",
      company: "StartupHub",
      location: "San Francisco, CA",
      type: "Internship",
      experience: "Entry Level",
      salary: "$25/hour",
      description: "Summer internship program for aspiring data scientists. Great learning opportunity with mentorship.",
      tags: ["Python", "Data Analysis", "Visualization", "Research"],
      posted: "1 week ago"
    },
    {
      id: 8,
      title: "Site Reliability Engineer",
      company: "TechOps Pro",
      location: "Austin, TX",
      type: "Full Time",
      experience: "Mid Level",
      salary: "$100k - $140k",
      description: "Join our SRE team to ensure high availability and performance of our critical systems.",
      tags: ["Linux", "Monitoring", "Automation", "Troubleshooting"],
      posted: "3 days ago"
    }
  ];

  useEffect(() => {
    // Simulate API call - removed delay for instant loading
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
    setLoading(false);
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, location, jobType, experience, jobs]);

  const filterJobs = () => {
    let filtered = jobs.filter(job => {
      const matchesSearch = !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesLocation = !location ||
        job.location.toLowerCase().includes(location.toLowerCase());

      const matchesType = !jobType ||
        job.type.toLowerCase().includes(jobType.toLowerCase());

      const matchesExperience = !experience ||
        job.experience.toLowerCase().includes(experience.toLowerCase());

      return matchesSearch && matchesLocation && matchesType && matchesExperience;
    });

    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLocation('');
    setJobType('');
    setExperience('');
    setFilteredJobs(jobs);
    setCurrentPage(1);
  };

  const applyForJob = (job) => {
    const confirmApply = window.confirm(`Are you sure you want to apply for:\n\n${job.title} at ${job.company}?`);
    if (confirmApply) {
      alert(`Application submitted successfully for ${job.title}!\n\nWe'll contact you soon with next steps.`);
    }
  };

  const saveJob = (job) => {
    alert(`${job.title} has been saved to your profile!\n\nYou can view saved jobs from your dashboard.`);
  };

  const viewJobDetails = (job) => {
    alert(`Job Details:\n\nTitle: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}\nSalary: ${job.salary}\n\nDescription: ${job.description}\n\nTags: ${job.tags.join(', ')}`);
  };

  const changePage = (page) => {
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToShow = filteredJobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // JobCard component with scroll animations
  const JobCard = ({ job, index }) => {
    const cardScrollYProgress = useScroll({
      target: `#job-card-${job.id}`,
      offset: ["start end", "end start"]
    }).scrollYProgress;

    // Transform scroll progress to blur and opacity
    const blur = useTransform(cardScrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, 8]);
    const opacity = useTransform(cardScrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
    const scale = useTransform(cardScrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
    const y = useTransform(cardScrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -30]);

    return (
      <motion.div
        id={`job-card-${job.id}`}
        className="job-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "easeOut"
        }}
        style={{
          filter: useTransform(blur, (value) => `blur(${value}px)`),
          opacity,
          scale,
          y,
          background: 'white',
          border: `2px solid ${colors.neutral100}`,
          borderRadius: '16px',
          padding: '32px',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '24px'
        }}
        whileHover={{ 
          y: -8,
          boxShadow: `0 20px 60px ${colors.accent}30`,
          borderColor: colors.accent,
          filter: 'blur(0px) !important',
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        onClick={() => viewJobDetails(job)}
      >
        {/* Subtle accent border on top */}
        <motion.div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`,
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }}
          whileHover={{ opacity: 1 }}
        />
        
        <div className="job-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginBottom: '20px'
        }}>
          <div style={{ flex: 1 }}>
            <motion.h3 
              className="job-title" 
              style={{ 
                fontSize: '22px', 
                fontWeight: '700', 
                color: colors.neutral900, 
                marginBottom: '8px',
                lineHeight: '1.3'
              }}
              whileHover={{ color: colors.accent }}
              transition={{ duration: 0.2 }}
            >
              {job.title}
            </motion.h3>
            <motion.div 
              className="company-name" 
              style={{ 
                color: colors.neutral500, 
                fontSize: '16px', 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '18px' }}>🏢</span>
              {job.company}
            </motion.div>
          </div>
          <motion.div 
            style={{ 
              textAlign: 'right', 
              color: colors.neutral500, 
              fontSize: '13px',
              fontWeight: '500',
              background: colors.neutral50,
              padding: '6px 12px',
              borderRadius: '20px',
              border: `1px solid ${colors.neutral100}`
            }}
          >
            {job.posted}
          </motion.div>
        </div>
        
        <div className="job-meta" style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}>
          <motion.div 
            className="meta-item" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: colors.neutral500,
              fontSize: '14px',
              fontWeight: '500'
            }}
            whileHover={{ color: colors.accent }}
            transition={{ duration: 0.2 }}
          >
            <span style={{ color: colors.accent }}>📍</span>
            {job.location}
          </motion.div>
          <motion.div 
            className="meta-item" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: colors.neutral500,
              fontSize: '14px',
              fontWeight: '500'
            }}
            whileHover={{ color: colors.accent }}
            transition={{ duration: 0.2 }}
          >
            <span style={{ color: colors.accent }}>⏰</span>
            {job.type}
          </motion.div>
          <motion.div 
            className="meta-item" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: colors.neutral500,
              fontSize: '14px',
              fontWeight: '500'
            }}
            whileHover={{ color: colors.accent }}
            transition={{ duration: 0.2 }}
          >
            <span style={{ color: colors.accent }}>🎯</span>
            {job.experience}
          </motion.div>
        </div>
        
        <div className="job-tags" style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}>
          {job.tags.map((tag, tagIndex) => (
            <motion.span 
              key={tagIndex} 
              className="job-tag" 
              style={{
                background: `${colors.accent}10`,
                color: colors.accent,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                border: `1px solid ${colors.accent}30`
              }}
              whileHover={{ 
                background: colors.accent,
                color: 'white',
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <div className="job-description" style={{
          color: colors.neutral500,
          lineHeight: '1.6',
          marginBottom: '24px',
          fontSize: '14px'
        }}>
          {job.description}
        </div>
        
        <div className="job-footer" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: `1px solid ${colors.neutral100}`
        }}>
          <motion.div 
            className="job-salary" 
            style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: colors.success,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span>💰</span>
            {job.salary}
          </motion.div>
          
          <div className="job-actions" style={{ display: 'flex', gap: '12px' }}>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                applyForJob(job);
              }}
              className="btn-primary"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgb(25, 69, 196)',
                boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
            >
              🚀 Apply Now
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                saveJob(job);
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: `${colors.accent}10`,
                borderColor: colors.accent,
                color: colors.accent
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'transparent',
                color: colors.neutral500,
                border: `2px solid ${colors.neutral100}`,
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
            >
              ❤️ Save
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="jobs-container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2>Dream jobs</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-container page-transition" style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Jobs Hero Section */}
        <motion.div 
          className="jobs-hero" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: 'relative',
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
            color: 'white',
            padding: '100px 0',
            textAlign: 'center',
            borderRadius: '20px',
            marginBottom: '60px',
            overflow: 'hidden',
            minHeight: '450px'
          }}
        >
          {/* LiquidChrome Background Animation */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            opacity: 0.6
          }}>
            <LiquidChrome
              speed={0.2}
              amplitude={0.3}
              frequencyX={3}
              frequencyY={3}
              interactive
            />
          </div>
          
          {/* Subtle geometric pattern overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, ${colors.accent}20 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${colors.accentLight}10 0%, transparent 50%)`,
            zIndex: 1
          }} />
          
          {/* Content */}
          <motion.div 
            style={{ position: 'relative', zIndex: 2 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              style={{ 
                fontSize: '56px', 
                fontWeight: '800', 
                marginBottom: '24px',
                background: `linear-gradient(135deg, #ffffff 0%, ${colors.accentLight} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.1'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Live Job Opportunities
            </motion.h1>
            <motion.p 
              style={{ 
                fontSize: '20px', 
                opacity: 0.9,
                maxWidth: '700px',
                margin: '0 auto 40px',
                lineHeight: '1.6',
                color: colors.neutral50
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover curated opportunities from leading tech companies. Your next career move starts here.
            </motion.p>
            
            {/* Stats Pills */}
            <motion.div 
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                marginTop: '40px',
                flexWrap: 'wrap'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { icon: '💼', label: '150+ Active Jobs', delay: 0.1 },
                { icon: '🏢', label: '50+ Companies', delay: 0.2 },
                { icon: '🚀', label: '95% Placement Rate', delay: 0.3 }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + stat.delay }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    backgroundColor: `${colors.accent}20`,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(255,255,255,0.08)',
                    padding: '12px 20px',
                    borderRadius: '25px',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid rgba(255,255,255,0.15)`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <motion.span 
                    style={{ fontSize: '1.3rem' }}
                    animate={{ 
                      y: [0, -2, 0],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {stat.icon}
                  </motion.span>
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Statistics - Commented Out */}
        {/*
        <div className="jobs-stats" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div className="stat-card" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div className="stat-number" style={{ fontSize: '32px', fontWeight: '700', color: '#007bff', marginBottom: '5px' }}>
              150+
            </div>
            <div className="stat-label" style={{ color: '#666', fontSize: '14px' }}>
              Active Jobs
            </div>
          </div>
          <div className="stat-card" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div className="stat-number" style={{ fontSize: '32px', fontWeight: '700', color: '#007bff', marginBottom: '5px' }}>
              50+
            </div>
            <div className="stat-label" style={{ color: '#666', fontSize: '14px' }}>
              Companies
            </div>
          </div>
          <div className="stat-card" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div className="stat-number" style={{ fontSize: '32px', fontWeight: '700', color: '#007bff', marginBottom: '5px' }}>
              95%
            </div>
            <div className="stat-label" style={{ color: '#666', fontSize: '14px' }}>
              Placement Rate
            </div>
          </div>
          <div className="stat-card" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div className="stat-number" style={{ fontSize: '32px', fontWeight: '700', color: '#007bff', marginBottom: '5px' }}>
              $85k
            </div>
            <div className="stat-label" style={{ color: '#666', fontSize: '14px' }}>
              Average Salary
            </div>
          </div>
        </div>
        */}

        {/* Filter Section */}
        <motion.div 
          className="filter-section" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            background: colors.neutral50,
            padding: '40px',
            borderRadius: '16px',
            marginBottom: '50px',
            border: `1px solid ${colors.neutral100}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}
        >
          <motion.h3 
            style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '30px', 
              color: colors.neutral900,
              textAlign: 'center'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Find Your Perfect Job
          </motion.h3>
          
          <div className="filter-row" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '30px'
          }}>
            <motion.div 
              className="filter-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label style={{ 
                fontWeight: '600', 
                marginBottom: '10px', 
                color: colors.neutral900, 
                display: 'block',
                fontSize: '14px'
              }}>
                🔍 Search Jobs
              </label>
              <motion.input
                type="text"
                placeholder="Job title, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: colors.accent,
                  boxShadow: `0 0 0 3px ${colors.accent}20`
                }}
                style={{
                  padding: '14px 16px',
                  border: `2px solid ${colors.neutral100}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: colors.neutral900
                }}
              />
            </motion.div>
            
            <motion.div 
              className="filter-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label style={{ 
                fontWeight: '600', 
                marginBottom: '10px', 
                color: colors.neutral900, 
                display: 'block',
                fontSize: '14px'
              }}>
                📍 Location
              </label>
              <motion.select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: colors.accent,
                  boxShadow: `0 0 0 3px ${colors.accent}20`
                }}
                style={{
                  padding: '14px 16px',
                  border: `2px solid ${colors.neutral100}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: colors.neutral900,
                  cursor: 'pointer'
                }}
              >
                <option value="">All Locations</option>
                <option value="remote">Remote</option>
                <option value="new-york">New York</option>
                <option value="san-francisco">San Francisco</option>
                <option value="austin">Austin</option>
                <option value="seattle">Seattle</option>
              </motion.select>
            </motion.div>
            
            <motion.div 
              className="filter-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label style={{ 
                fontWeight: '600', 
                marginBottom: '10px', 
                color: colors.neutral900, 
                display: 'block',
                fontSize: '14px'
              }}>
                💼 Job Type
              </label>
              <motion.select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: colors.accent,
                  boxShadow: `0 0 0 3px ${colors.accent}20`
                }}
                style={{
                  padding: '14px 16px',
                  border: `2px solid ${colors.neutral100}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: colors.neutral900,
                  cursor: 'pointer'
                }}
              >
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </motion.select>
            </motion.div>
            
            <motion.div 
              className="filter-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label style={{ 
                fontWeight: '600', 
                marginBottom: '10px', 
                color: colors.neutral900, 
                display: 'block',
                fontSize: '14px'
              }}>
                🎯 Experience Level
              </label>
              <motion.select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: colors.accent,
                  boxShadow: `0 0 0 3px ${colors.accent}20`
                }}
                style={{
                  padding: '14px 16px',
                  border: `2px solid ${colors.neutral100}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: colors.neutral900,
                  cursor: 'pointer'
                }}
              >
                <option value="">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead/Principal</option>
              </motion.select>
            </motion.div>
          </div>
          
          <motion.div 
            className="filter-buttons" 
            style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.button
              onClick={resetFilters}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgb(25, 69, 196)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 28px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                color: 'white',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
            >
              🔄 Reset
            </motion.button>
            <motion.button
              onClick={filterJobs}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgb(25, 69, 196)',
                boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 28px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                color: 'white',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
            >
              🔍 Search Jobs
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Jobs List */}
        <AnimatePresence>
          <motion.div 
            className="jobs-list" 
            style={{ display: 'grid', gap: '0px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {jobsToShow.length === 0 ? (
              <motion.div 
                className="no-jobs" 
                style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: colors.neutral500,
                  background: colors.neutral50,
                  borderRadius: '16px',
                  border: `2px dashed ${colors.neutral100}`
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  style={{ fontSize: '64px', marginBottom: '20px' }}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                >
                  📭
                </motion.div>
                <h3 style={{ color: colors.neutral900, marginBottom: '10px' }}>No jobs found</h3>
                <p>Try adjusting your filters or search criteria</p>
              </motion.div>
            ) : (
              jobsToShow.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="pagination" 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              marginTop: '60px'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              whileHover={{ 
                scale: currentPage === 1 ? 1 : 1.05,
                backgroundColor: currentPage === 1 ? colors.neutral100 : colors.accent,
                color: currentPage === 1 ? colors.neutral500 : 'white'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '12px 16px',
                border: `2px solid ${colors.neutral100}`,
                background: currentPage === 1 ? colors.neutral50 : 'white',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                borderRadius: '10px',
                opacity: currentPage === 1 ? 0.6 : 1,
                fontSize: '16px',
                transition: 'all 0.3s ease',
                color: currentPage === 1 ? colors.neutral500 : colors.neutral900
              }}
            >
              ←
            </motion.button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <motion.button
                key={page}
                onClick={() => changePage(page)}
                className={page === currentPage ? 'active' : ''}
                whileHover={{ 
                  scale: page === currentPage ? 1 : 1.05,
                  backgroundColor: page === currentPage ? colors.accent : colors.neutral50,
                  color: page === currentPage ? 'white' : colors.neutral900
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 16px',
                  border: page === currentPage 
                    ? `2px solid ${colors.accent}` 
                    : `2px solid ${colors.neutral100}`,
                  background: page === currentPage 
                    ? colors.accent 
                    : 'white',
                  color: page === currentPage 
                    ? 'white' 
                    : colors.neutral900,
                  cursor: 'pointer',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: page === currentPage ? '600' : '500',
                  transition: 'all 0.3s ease',
                  minWidth: '44px'
                }}
              >
                {page}
              </motion.button>
            ))}
            
            <motion.button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              whileHover={{ 
                scale: currentPage === totalPages ? 1 : 1.05,
                backgroundColor: currentPage === totalPages ? colors.neutral100 : colors.accent,
                color: currentPage === totalPages ? colors.neutral500 : 'white'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '12px 16px',
                border: `2px solid ${colors.neutral100}`,
                background: currentPage === totalPages ? colors.neutral50 : 'white',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                borderRadius: '10px',
                opacity: currentPage === totalPages ? 0.6 : 1,
                fontSize: '16px',
                transition: 'all 0.3s ease',
                color: currentPage === totalPages ? colors.neutral500 : colors.neutral900
              }}
            >
              →
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
