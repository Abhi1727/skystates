import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './HomepageTheme.css';

// Professional color palette - Updated to match home page blue theme
const colors = {
  primary: '#3b82f6',
  primaryLight: '#60a5fa',
  accent: '#3b82f6',
  accentLight: '#60a5fa',
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
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [counters, setCounters] = useState({
    professionals: 0,
    companies: 0,
    placementRate: 0,
    satisfaction: 0
  });

  const jobsPerPage = 5;

  // Enhanced mock data with comprehensive details
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
      posted: "2 days ago",
      status: "active",
      applicationDeadline: "2024-02-15",
      requirements: [
        "5+ years of experience in data science or analytics",
        "Strong proficiency in Python and SQL",
        "Experience with machine learning frameworks",
        "Advanced degree in Computer Science, Statistics, or related field"
      ],
      benefits: [
        "Comprehensive health, dental, and vision insurance",
        "401(k) with company matching",
        "Flexible work arrangements",
        "Professional development budget",
        "Stock options"
      ],
      companyInfo: {
        description: "TechCorp Solutions is a leading technology company specializing in data analytics and AI solutions.",
        size: "500-1000 employees",
        industry: "Technology",
        culture: "Innovative, collaborative, and results-driven environment"
      },
      department: "Data Science",
      reportTo: "Head of Data Science",
      applications: 45,
      selectedCandidate: null
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
      posted: "3 days ago",
      status: "closing",
      applicationDeadline: "2024-01-25",
      requirements: [
        "3+ years of cybersecurity experience",
        "Experience with security tools and frameworks",
        "Knowledge of network security protocols",
        "Relevant certifications (CISSP, CEH, etc.)"
      ],
      benefits: [
        "Remote work flexibility",
        "Health and wellness stipend",
        "Continuous learning opportunities",
        "Performance bonuses"
      ],
      companyInfo: {
        description: "SecureNet Inc is a cybersecurity firm protecting businesses from digital threats.",
        size: "100-500 employees",
        industry: "Cybersecurity",
        culture: "Security-focused, agile, and team-oriented"
      },
      department: "Security",
      reportTo: "Security Director",
      applications: 28,
      selectedCandidate: null
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
      posted: "1 week ago",
      status: "filled",
      applicationDeadline: "2024-01-20",
      requirements: [
        "3+ years of DevOps experience",
        "Strong cloud platform knowledge (AWS preferred)",
        "Experience with containerization and orchestration",
        "Scripting skills in Python or Bash"
      ],
      benefits: [
        "Cutting-edge technology stack",
        "Collaborative work environment",
        "Career growth opportunities",
        "Competitive compensation package"
      ],
      companyInfo: {
        description: "CloudScale Systems provides cloud infrastructure solutions to enterprise clients.",
        size: "200-500 employees",
        industry: "Cloud Computing",
        culture: "Fast-paced, innovative, and customer-focused"
      },
      department: "Infrastructure",
      reportTo: "VP of Engineering",
      applications: 67,
      selectedCandidate: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        selectedDate: "2024-01-18",
        profile: {
          avatar: "/api/placeholder/40/40",
          experience: "4 years DevOps experience",
          skills: ["AWS", "Kubernetes", "Python"]
        }
      }
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
      posted: "4 days ago",
      status: "active",
      applicationDeadline: "2024-02-20",
      requirements: [
        "4+ years of machine learning experience",
        "Strong programming skills in Python",
        "Experience with deep learning frameworks",
        "Publication record or research experience"
      ],
      benefits: [
        "Research and development opportunities",
        "Conference attendance budget",
        "Flexible work hours",
        "State-of-the-art equipment"
      ],
      companyInfo: {
        description: "AI Innovations Lab is a research-focused company developing advanced AI solutions.",
        size: "50-100 employees",
        industry: "Artificial Intelligence",
        culture: "Research-driven, collaborative, and innovative"
      },
      department: "Research & Development",
      reportTo: "Director of AI Research",
      applications: 52,
      selectedCandidate: null
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
      posted: "1 day ago",
      status: "active",
      applicationDeadline: "2024-02-10",
      requirements: [
        "Bachelor's degree in Statistics, Mathematics, or related field",
        "Strong analytical and problem-solving skills",
        "Experience with data analysis tools",
        "Excellent communication skills"
      ],
      benefits: [
        "Mentorship program",
        "Training and development opportunities",
        "Career advancement potential",
        "Collaborative team environment"
      ],
      companyInfo: {
        description: "DataDriven Co helps businesses leverage data for strategic decision-making.",
        size: "100-200 employees",
        industry: "Business Intelligence",
        culture: "Data-driven, supportive, and growth-focused"
      },
      department: "Analytics",
      reportTo: "Analytics Manager",
      applications: 31,
      selectedCandidate: null
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
      posted: "5 days ago",
      status: "active",
      applicationDeadline: "2024-02-05",
      requirements: [
        "5+ years of cloud security experience",
        "Experience with major cloud platforms",
        "Security certifications preferred",
        "Knowledge of compliance frameworks"
      ],
      benefits: [
        "Remote work flexibility",
        "Project-based bonuses",
        "Cutting-edge security projects",
        "Professional development support"
      ],
      companyInfo: {
        description: "Fortress Security provides comprehensive security solutions for cloud environments.",
        size: "200-300 employees",
        industry: "Cybersecurity",
        culture: "Security-first, expertise-driven, and client-focused"
      },
      department: "Security Operations",
      reportTo: "Chief Security Officer",
      applications: 19,
      selectedCandidate: null
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
      posted: "1 week ago",
      status: "active",
      applicationDeadline: "2024-03-01",
      requirements: [
        "Currently pursuing a degree in Data Science or related field",
        "Strong programming skills",
        "Analytical mindset",
        "Eagerness to learn and contribute"
      ],
      benefits: [
        "Hands-on project experience",
        "Mentorship from senior data scientists",
        "Potential for full-time employment",
        "Flexible schedule"
      ],
      companyInfo: {
        description: "StartupHub is a venture studio that builds and invests in technology startups.",
        size: "50-100 employees",
        industry: "Venture Capital / Technology",
        culture: "Fast-paced, entrepreneurial, and learning-focused"
      },
      department: "Data Science",
      reportTo: "Lead Data Scientist",
      applications: 84,
      selectedCandidate: null
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
      posted: "3 days ago",
      status: "active",
      applicationDeadline: "2024-02-08",
      requirements: [
        "3+ years of SRE or DevOps experience",
        "Strong Linux administration skills",
        "Experience with monitoring and alerting systems",
        "Knowledge of automation tools"
      ],
      benefits: [
        "24/7 on-call rotation with compensation",
        "Cutting-edge infrastructure tools",
        "Professional development budget",
        "Remote work options"
      ],
      companyInfo: {
        description: "TechOps Pro provides infrastructure and operations solutions to technology companies.",
        size: "150-300 employees",
        industry: "DevOps / Infrastructure",
        culture: "Operations-focused, reliable, and innovative"
      },
      department: "Site Reliability",
      reportTo: "Head of Operations",
      applications: 23,
      selectedCandidate: null
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log('Section visible:', entry.target.id);
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.observe-section');
    console.log('Found observe-section elements:', sections.length);
    sections.forEach(section => {
      console.log('Observing section:', section.id);
      observer.observe(section);
    });

    // Fallback: Make value-proposition visible after a short delay
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback: Making value-proposition visible');
      setVisibleSections(prev => new Set([...prev, 'value-proposition']));
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Animated counters for trust stats
  useEffect(() => {
    if (visibleSections.has('trust-bar')) {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        setCounters({
          professionals: Math.floor(500 * easeProgress),
          companies: Math.floor(200 * easeProgress),
          placementRate: Math.floor(92 * easeProgress),
          satisfaction: (4.8 * easeProgress).toFixed(1)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, increment);
      
      return () => clearInterval(timer);
    }
  }, [visibleSections]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/jobs');
      if (response.data.success) {
        setJobs(response.data.data.jobs);
        setFilteredJobs(response.data.data.jobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Fallback to mock data if API fails
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterJobs();
  }, [searchTerm, location, jobType, experience, jobs]);

  const filterJobs = () => {
    let filtered = jobs.filter(job => {
      const matchesSearch = !searchTerm ||
        (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesLocation = !location ||
        (job.location && job.location.toLowerCase().includes(location.toLowerCase()));

      const matchesType = !jobType ||
        (job.type && job.type.toLowerCase().includes(jobType.toLowerCase()));

      const matchesExperience = !experience ||
        (job.experience && job.experience.toLowerCase().includes(experience.toLowerCase()));

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

  const toggleCardExpansion = (jobId) => {
    setExpandedCardId(expandedCardId === jobId ? null : jobId);
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

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: '#10b981', text: 'white' };
      case 'closing': return { bg: '#f59e0b', text: 'white' };
      case 'closed': return { bg: '#ef4444', text: 'white' };
      case 'filled': return { bg: '#6366f1', text: 'white' };
      default: return { bg: '#64748b', text: 'white' };
    }
  };

  // Enhanced JobCard component with expandable design
  const JobCard = ({ job, index }) => {
    const statusColors = getStatusColor(job.status);
    const daysUntilDeadline = Math.ceil((new Date(job.applicationDeadline) - new Date()) / (1000 * 60 * 60 * 24));
    const isExpanded = expandedCardId === job.id;

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
          background: 'white',
          border: `2px solid ${isExpanded ? colors.primary : colors.neutral100}`,
          borderRadius: '20px',
          padding: '0',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '24px',
          boxShadow: isExpanded 
            ? `0 20px 60px ${colors.primary}30` 
            : '0 4px 6px rgba(0, 0, 0, 0.07)'
        }}
        whileHover={{ 
          y: isExpanded ? 0 : -4,
          boxShadow: isExpanded 
            ? `0 25px 70px ${colors.primary}40` 
            : `0 15px 40px ${colors.primary}20`,
          borderColor: colors.primary,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        onClick={() => toggleCardExpansion(job.id)}
      >
        {/* Status Badge */}
        <motion.div
          style={{
            position: 'absolute',
            top: '16px',
            right: '60px',
            background: statusColors.bg,
            color: statusColors.text,
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          whileHover={{ scale: 1.05 }}
        >
          {job.status === 'filled' ? 'Position Filled' : job.status === 'closing' ? 'Closing Soon' : job.status}
        </motion.div>

        {/* Expand/Collapse Indicator */}
        <motion.div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: colors.primary,
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleCardExpansion(job.id);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>

        {/* Selected Candidate Badge */}
        {job.selectedCandidate?.name && (
          <motion.div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            whileHover={{ scale: 1.05 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Selected: {job.selectedCandidate.name}
          </motion.div>
        )}

        {/* Header Section */}
        <div style={{
          padding: '24px 32px',
          borderBottom: `1px solid ${colors.neutral100}`,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(96, 165, 250, 0.02) 100%)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{ flex: 1 }}>
              <motion.h3 
                className="job-title" 
                style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: colors.neutral900, 
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}
                whileHover={{ color: colors.primary }}
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                  <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 21v-11M20 21v-11M8 21v-8M12 21v-8M16 21v-8"/>
                </svg>
                {job.company}
                <span style={{
                  background: `${colors.neutral50}`,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: colors.neutral500
                }}>
                  {job.company}
                </span>
              </motion.div>
            </div>
            <motion.div 
              style={{ 
                textAlign: 'right', 
                color: colors.neutral500, 
                fontSize: '13px',
                fontWeight: '500',
                background: colors.neutral50,
                padding: '8px 12px',
                borderRadius: '12px',
                border: `1px solid ${colors.neutral100}`
              }}
            >
              {job.posted}
            </motion.div>
          </div>
          
          {/* Meta Information */}
          <div className="job-meta" style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '16px'
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
              whileHover={{ color: colors.primary }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
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
              whileHover={{ color: colors.primary }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
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
              whileHover={{ color: colors.primary }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
              {job.experience}
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
              whileHover={{ color: colors.primary }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
            </motion.div>
          </div>

          {/* Skills Tags */}
          <div className="job-tags" style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {job.tags.slice(0, 4).map((tag, tagIndex) => (
              <motion.span 
                key={tagIndex} 
                className="job-tag" 
                style={{
                  background: `${colors.primary}10`,
                  color: colors.primary,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: `1px solid ${colors.primary}30`
                }}
                whileHover={{ 
                  background: colors.primary,
                  color: 'white',
                  scale: 1.05
                }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
            {job.tags.length > 4 && (
              <span style={{
                background: colors.neutral100,
                color: colors.neutral500,
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                +{job.tags.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence>
          <motion.div 
            style={{ padding: isExpanded ? '24px 32px' : '16px 32px' }}
            initial={false}
            animate={{ 
              height: isExpanded ? 'auto' : '120px',
              opacity: 1
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Collapsed State - Limited Content */}
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="job-description" style={{
                  color: colors.neutral500,
                  lineHeight: '1.6',
                  marginBottom: '12px',
                  fontSize: '13px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {job.description}
                </div>

                {/* Quick Info */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: colors.neutral400
                }}>
                  <span>{job.requirements.length} requirements</span>
                  <span>•</span>
                  <span>{job.benefits.length} benefits</span>
                  <span>•</span>
                  <span style={{ color: colors.primary, fontWeight: '600' }}>
                    Click to expand →
                  </span>
                </div>
              </motion.div>
            )}

            {/* Expanded State - Full Content */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Full Job Description */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: colors.neutral900,
                    marginBottom: '12px'
                  }}>Job Description</h3>
                  <p style={{
                    color: colors.neutral600,
                    lineHeight: '1.7',
                    fontSize: '15px',
                    margin: 0
                  }}>
                    {job.description}
                  </p>
                </div>

                {/* Complete Requirements */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: colors.neutral900,
                    marginBottom: '12px'
                  }}>Requirements</h3>
                  <ul style={{
                    margin: 0,
                    padding: '0 0 0 20px',
                    listStyle: 'none'
                  }}>
                    {job.requirements.map((req, idx) => (
                      <motion.li 
                        key={idx} 
                        style={{
                          color: colors.neutral600,
                          fontSize: '14px',
                          marginBottom: '8px',
                          lineHeight: '1.5',
                          position: 'relative'
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                      >
                        <span style={{
                          color: colors.primary,
                          marginRight: '8px',
                          fontWeight: 'bold'
                        }}>•</span>
                        {req}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Complete Benefits */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: colors.neutral900,
                    marginBottom: '12px'
                  }}>Benefits & Perks</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                  }}>
                    {job.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        style={{
                          background: colors.success + '10',
                          color: colors.success,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '500',
                          border: `1px solid ${colors.success}20`
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {benefit}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Company Information */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: colors.neutral900,
                    marginBottom: '12px'
                  }}>About {job.company}</h3>
                  <div style={{
                    background: colors.neutral50,
                    padding: '16px',
                    borderRadius: '12px',
                    border: `1px solid ${colors.neutral100}`
                  }}>
                    <p style={{
                      color: colors.neutral600,
                      fontSize: '14px',
                      lineHeight: '1.6',
                      margin: '0 0 12px 0'
                    }}>
                      {job.companyInfo?.description || `${job.company} is a leading company in their industry.`}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      flexWrap: 'wrap',
                      fontSize: '13px'
                    }}>
                      <div>
                        <strong style={{ color: colors.neutral900 }}>Size:</strong> {job.company}
                      </div>
                      <div>
                        <strong style={{ color: colors.neutral900 }}>Industry:</strong> {job.companyInfo?.industry || 'Technology'}
                      </div>
                    </div>
                    <div style={{
                      marginTop: '12px',
                      padding: '12px',
                      background: 'white',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: colors.neutral600,
                      fontStyle: 'italic'
                    }}>
                      <strong style={{ color: colors.neutral900, fontStyle: 'normal' }}>Culture:</strong> {job.companyInfo?.culture || 'Innovative and collaborative work environment'}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    background: colors.primary + '10',
                    padding: '16px',
                    borderRadius: '12px',
                    border: `1px solid ${colors.primary}20`
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: colors.neutral500,
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>Department</div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: colors.primary
                    }}>
                      {job.department || 'Engineering'}
                    </div>
                  </div>
                  <div style={{
                    background: colors.neutral50,
                    padding: '16px',
                    borderRadius: '12px',
                    border: `1px solid ${colors.neutral100}`
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: colors.neutral500,
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>Reports To</div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: colors.neutral900
                    }}>
                      {job.reportTo || 'Hiring Manager'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Section */}
        <div className="job-footer" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 32px',
          borderTop: `1px solid ${colors.neutral100}`,
          background: colors.neutral50
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              {job.salary}
            </motion.div>
            
            <motion.div 
              className="applications-count" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: colors.neutral500,
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.neutral500} strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {job.applications || job.applicationCount || 0} applications
            </motion.div>
          </div>
          
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
              disabled={job.status === 'filled' || job.status === 'closed'}
              style={{
                background: job.status === 'filled' || job.status === 'closed' 
                  ? colors.neutral300 
                  : 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 50%, rgb(23, 37, 84) 100%)',
                color: job.status === 'filled' || job.status === 'closed' ? colors.neutral500 : 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '10px',
                cursor: job.status === 'filled' || job.status === 'closed' ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
            >
              {job.status === 'filled' ? 'Position Filled' : job.status === 'closed' ? 'Closed' : 'Apply Now'}
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                saveJob(job);
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: `${colors.primary}10`,
                borderColor: colors.primary,
                color: colors.primary
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
              Save Job
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
        {/* Professional Hero Section */}
        <motion.div 
          className="professional-hero" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
            color: 'white',
            padding: '80px 0',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            marginBottom: '60px'
          }}
        >
          {/* Grid Pattern Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grid\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\"><path d=\"M 10 0 L 0 0 0 10\" fill=\"none\" stroke=\"rgba(255,255,255,0.05)\" stroke-width=\"0.5\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grid)\"/></svg>")',
            opacity: 0.3
          }} />
          
          <motion.div 
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '800px',
              margin: '0 auto',
              padding: '0 20px'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Professional Badge */}
            {/* <motion.div 
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '2px',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ESTABLISHED 2024
            </motion.div> */}

            <motion.h1 
              style={{ 
                fontSize: '48px',
                fontWeight: '700',
                marginBottom: '20px',
                lineHeight: '1.2',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: 'white'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Career Opportunities at Sky States
            </motion.h1>
            
            <motion.p 
              className="subtitle"
              style={{ 
                fontSize: '20px',
                opacity: 0.9,
                marginBottom: '40px',
                lineHeight: '1.5',
                color: 'white'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Connecting Top Talent with Leading Technology Companies
            </motion.p>
            
            <motion.div 
              className="hero-cta"
              style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="#jobs-list"
                className="btn-primary"
                whileHover={{ 
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'white',
                  color: '#1e3a8a',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}
              >
                Browse Open Positions
              </motion.a>
              <motion.a
                href="#partner-form"
                className="btn-secondary"
                whileHover={{ 
                  background: 'white',
                  color: '#1e3a8a'
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'transparent',
                  color: 'white',
                  padding: '15px 30px',
                  border: '2px solid white',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}
              >
                Partner With Us
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Trust & Credibility Bar - Commented Out */}
        {/*
        <motion.div 
          id="trust-bar"
          className="trust-bar observe-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visibleSections.has('trust-bar') ? 1 : 0, y: visibleSections.has('trust-bar') ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: '#f8fafc',
            padding: '60px 0',
            borderBottom: '1px solid #e2e8f0',
            borderRadius: '16px',
            marginBottom: '50px'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '50px'
          }}>
            {[
              { icon: '👥', target: 'professionals', suffix: '+', label: 'Professionals Placed', delay: 0 },
              { icon: '🏢', target: 'companies', suffix: '+', label: 'Partner Companies', delay: 0.1 },
              { icon: '📈', target: 'placementRate', suffix: '%', label: 'Placement Success Rate', delay: 0.2 },
              { icon: '⭐', target: 'satisfaction', suffix: '/5', label: 'Candidate Satisfaction', delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="trust-stat"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: visibleSections.has('trust-bar') ? 1 : 0, scale: visibleSections.has('trust-bar') ? 1 : 0.9, y: visibleSections.has('trust-bar') ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 + stat.delay }}
                style={{
                  textAlign: 'center',
                  padding: '30px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                whileHover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px',
                  color: 'white'
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#1e3a8a',
                  marginBottom: '8px'
                }}>
                  {counters[stat.target]}{stat.suffix}
                </div>
                <div style={{
                  color: '#64748b',
                  fontSize: '16px',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        */}

        {/* Value Proposition Section */}
        <motion.div 
          id="value-proposition"
          className="value-proposition observe-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: visibleSections.has('value-proposition') ? 1 : 0.3, 
            y: visibleSections.has('value-proposition') ? 0 : 30 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            padding: '80px 0',
            background: 'white',
            borderRadius: '16px',
            marginBottom: '50px',
            minHeight: '400px' // Ensure minimum height for visibility
          }}
        >
          <motion.div 
            className="value-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visibleSections.has('value-proposition') ? 1 : 0.5, y: visibleSections.has('value-proposition') ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              textAlign: 'center',
              marginBottom: '60px'
            }}
          >
            <motion.h2 
              style={{ 
                fontSize: '36px',
                fontWeight: '700',
                color: '#1e3a8a',
                marginBottom: '15px'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: visibleSections.has('value-proposition') ? 1 : 0.7, y: visibleSections.has('value-proposition') ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Why Choose Sky States for Your Career?
            </motion.h2>
            <motion.p 
              style={{ 
                fontSize: '18px',
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: visibleSections.has('value-proposition') ? 1 : 0.7, y: visibleSections.has('value-proposition') ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We bridge the gap between exceptional talent and leading technology companies through personalized career development and strategic partnerships.
            </motion.p>
          </motion.div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                icon: '🚀',
                title: 'Career Growth',
                description: 'Access exclusive opportunities with clear advancement paths and continuous professional development programs.',
                delay: 0
              },
              {
                icon: '🌐',
                title: 'Industry Connections',
                description: 'Build relationships with top technology companies and industry leaders through our extensive network.',
                delay: 0.1
              },
              {
                icon: '🎯',
                title: 'Personalized Support',
                description: 'Receive dedicated career coaching, resume optimization, and interview preparation from industry experts.',
                delay: 0.2
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: visibleSections.has('value-proposition') ? 1 : 0.6, scale: visibleSections.has('value-proposition') ? 1 : 0.95, y: visibleSections.has('value-proposition') ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.5 + value.delay }}
                style={{
                  padding: '40px 30px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease'
                }}
                whileHover={{
                  transform: 'translateY(-5px)'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  fontSize: '32px',
                  color: 'white'
                }}>
                  {value.icon}
                </div>
                <motion.h3 
                  style={{ 
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#1e3a8a',
                    marginBottom: '15px'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: visibleSections.has('value-proposition') ? 1 : 0.7, y: visibleSections.has('value-proposition') ? 0 : 10 }}
                  transition={{ duration: 0.5, delay: 0.6 + value.delay }}
                >
                  {value.title}
                </motion.h3>
                <motion.p 
                  style={{
                    color: '#64748b',
                    lineHeight: '1.6'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: visibleSections.has('value-proposition') ? 1 : 0.7, y: visibleSections.has('value-proposition') ? 0 : 10 }}
                  transition={{ duration: 0.5, delay: 0.7 + value.delay }}
                >
                  {value.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
                Search Jobs
              </label>
              <motion.input
                type="text"
                placeholder="Job title, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: colors.primary,
                  boxShadow: `0 0 0 3px ${colors.primary}20`
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
                Location
              </label>
              <motion.select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: colors.primary,
                  boxShadow: `0 0 0 3px ${colors.primary}20`
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
                Job Type
              </label>
              <motion.select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: colors.primary,
                  boxShadow: `0 0 0 3px ${colors.primary}20`
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
                Experience Level
              </label>
              <motion.select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: colors.primary,
                  boxShadow: `0 0 0 3px ${colors.primary}20`
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
              Reset
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
              Search Jobs
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Social Proof Section - Commented Out */}
        {/*
        <motion.div 
          id="social-proof"
          className="social-proof observe-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visibleSections.has('social-proof') ? 1 : 0, y: visibleSections.has('social-proof') ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            padding: '80px 0',
            background: '#f8fafc',
            borderRadius: '16px',
            marginBottom: '50px'
          }}
        >
          <motion.div 
            className="social-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visibleSections.has('social-proof') ? 1 : 0, y: visibleSections.has('social-proof') ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              textAlign: 'center',
              marginBottom: '60px'
            }}
          >
            <motion.h2 
              style={{ 
                fontSize: '36px',
                fontWeight: '700',
                color: '#1e3a8a',
                marginBottom: '15px'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: visibleSections.has('social-proof') ? 1 : 0, y: visibleSections.has('social-proof') ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Success Stories from Our Candidates
            </motion.h2>
          </motion.div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {[
              {
                initials: 'SJ',
                name: 'Sarah Johnson',
                title: 'Data Scientist at TechCorp',
                content: 'Sky States helped me land my dream job at a leading tech company. The career coaching and interview preparation were invaluable.',
                delay: 0
              },
              {
                initials: 'MC',
                name: 'Michael Chen',
                title: 'DevOps Engineer at CloudScale',
                content: 'The personalized approach and industry connections made all the difference. I\'m now working in a role that perfectly matches my skills.',
                delay: 0.1
              },
              {
                initials: 'AP',
                name: 'Amanda Park',
                title: 'Cybersecurity Analyst at SecureNet',
                content: 'From career guidance to salary negotiation, Sky States supported me every step of the way. Highly recommend their services!',
                delay: 0.2
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: visibleSections.has('social-proof') ? 1 : 0, scale: visibleSections.has('social-proof') ? 1 : 0.9, y: visibleSections.has('social-proof') ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 + testimonial.delay }}
                style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#334155',
                  marginBottom: '20px',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.content}"
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '18px'
                  }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1e3a8a',
                      marginBottom: '2px'
                    }}>
                      {testimonial.name}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#64748b',
                      margin: 0
                    }}>
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="partner-logos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visibleSections.has('social-proof') ? 1 : 0, y: visibleSections.has('social-proof') ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#64748b',
              marginBottom: '30px'
            }}>
              Trusted by Leading Technology Companies
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '30px',
              alignItems: 'center'
            }}>
              {['TechCorp', 'CloudScale', 'SecureNet', 'DataDriven', 'AI Innovations', 'Fortress Security'].map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: visibleSections.has('social-proof') ? 1 : 0, scale: visibleSections.has('social-proof') ? 1 : 0.9 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: '#94a3b8',
                    border: '2px dashed #e2e8f0'
                  }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        */}

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
                backgroundColor: currentPage === 1 ? colors.neutral100 : colors.primary,
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
                  backgroundColor: page === currentPage ? colors.primary : colors.neutral50,
                  color: page === currentPage ? 'white' : colors.neutral900
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 16px',
                  border: page === currentPage 
                    ? `2px solid ${colors.primary}` 
                    : `2px solid ${colors.neutral100}`,
                  background: page === currentPage 
                    ? colors.primary 
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
                backgroundColor: currentPage === totalPages ? colors.neutral100 : colors.primary,
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

        {/* Partner Form Section */}
        <motion.div 
          id="partner-form"
          className="partner-form-section observe-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visibleSections.has('partner-form') ? 1 : 0, y: visibleSections.has('partner-form') ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            padding: '80px 0',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            color: 'white',
            textAlign: 'center',
            borderRadius: '16px',
            marginTop: '60px'
          }}
        >
          <motion.div 
            className="partner-form-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visibleSections.has('partner-form') ? 1 : 0, y: visibleSections.has('partner-form') ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              style={{ 
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '20px'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: visibleSections.has('partner-form') ? 1 : 0, y: visibleSections.has('partner-form') ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Partner With Sky States
            </motion.h2>
            <motion.p 
              style={{ 
                fontSize: '18px',
                opacity: 0.9,
                marginBottom: '30px',
                maxWidth: '600px',
                margin: '0 auto 30px'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: visibleSections.has('partner-form') ? 1 : 0, y: visibleSections.has('partner-form') ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join our network of leading technology companies and connect with exceptional talent.
            </motion.p>
            <motion.a
              href="mailto:partners@skystates.com"
              className="btn-primary"
              whileHover={{ 
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'white',
                color: '#1e3a8a',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}
            >
              Contact Our Partnership Team
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Jobs;
