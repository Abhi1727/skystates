import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
    <div className="jobs-container" style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Jobs Hero Section */}
        <div className="jobs-hero" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '60px 0',
          textAlign: 'center',
          borderRadius: '10px',
          marginBottom: '40px'
        }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '20px' }}>
            Live Job Opportunities
          </h1>
          <p style={{ fontSize: '18px', opacity: '0.9' }}>
            Find your dream tech job with our curated listings from top companies
          </p>
        </div>

        {/* Statistics */}
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

        {/* Filter Section */}
        <div className="filter-section" style={{
          background: '#f8f9fa',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '40px'
        }}>
          <div className="filter-row" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div className="filter-group">
              <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333', display: 'block' }}>
                Search Jobs
              </label>
              <input
                type="text"
                placeholder="Job title, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  width: '100%'
                }}
              />
            </div>
            <div className="filter-group">
              <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333', display: 'block' }}>
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  width: '100%'
                }}
              >
                <option value="">All Locations</option>
                <option value="remote">Remote</option>
                <option value="new-york">New York</option>
                <option value="san-francisco">San Francisco</option>
                <option value="austin">Austin</option>
                <option value="seattle">Seattle</option>
              </select>
            </div>
            <div className="filter-group">
              <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333', display: 'block' }}>
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  width: '100%'
                }}
              >
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="filter-group">
              <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333', display: 'block' }}>
                Experience Level
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  width: '100%'
                }}
              >
                <option value="">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead/Principal</option>
              </select>
            </div>
          </div>
          <div className="filter-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={resetFilters}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '500',
                background: '#6c757d',
                color: 'white'
              }}
            >
              Reset
            </button>
            <button
              onClick={filterJobs}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '500',
                background: '#007bff',
                color: 'white'
              }}
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="jobs-list" style={{ display: 'grid', gap: '20px' }}>
          {jobsToShow.length === 0 ? (
            <div className="no-jobs" style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666'
            }}>
              <i className="fas fa-briefcase" style={{ fontSize: '64px', color: '#ddd', marginBottom: '20px' }}></i>
              <h3>No jobs found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            jobsToShow.map(job => (
              <div
                className="job-card"
                key={job.id}
                onClick={() => viewJobDetails(job)}
                style={{
                  background: 'white',
                  border: '1px solid #e9ecef',
                  borderRadius: '10px',
                  padding: '25px',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="job-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '15px'
                }}>
                  <div>
                    <div className="job-title" style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>
                      {job.title}
                    </div>
                    <div className="company-name" style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>
                      {job.company}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', color: '#666', fontSize: '14px' }}>
                    {job.posted}
                  </div>
                </div>
                <div className="job-meta" style={{
                  display: 'flex',
                  gap: '15px',
                  flexWrap: 'wrap',
                  marginBottom: '15px'
                }}>
                  <div className="meta-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#007bff' }}></i>
                    {job.location}
                  </div>
                  <div className="meta-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    <i className="fas fa-clock" style={{ color: '#007bff' }}></i>
                    {job.type}
                  </div>
                  <div className="meta-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    <i className="fas fa-user-tie" style={{ color: '#007bff' }}></i>
                    {job.experience}
                  </div>
                </div>
                <div className="job-tags" style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '15px'
                }}>
                  {job.tags.map((tag, index) => (
                    <span key={index} className="job-tag" style={{
                      background: '#e3f2fd',
                      color: '#1976d2',
                      padding: '4px 8px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="job-description" style={{
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  {job.description}
                </div>
                <div className="job-footer" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div className="job-salary" style={{ fontSize: '18px', fontWeight: '600', color: '#28a745' }}>
                    {job.salary}
                  </div>
                  <div className="job-actions" style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        applyForJob(job);
                      }}
                      className="btn-primary"
                      style={{
                        background: '#007bff',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveJob(job);
                      }}
                      style={{
                        background: 'transparent',
                        color: '#007bff',
                        border: '1px solid #007bff',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      Save Job
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            marginTop: '40px'
          }}>
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                background: 'white',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={page === currentPage ? 'active' : ''}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  background: page === currentPage ? '#007bff' : 'white',
                  color: page === currentPage ? 'white' : '#333',
                  cursor: 'pointer',
                  borderRadius: '5px'
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                background: 'white',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
