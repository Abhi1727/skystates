import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jobService from '../../services/jobService';
import JobForm from './JobForm';
import '../../styles/JobAdmin.css';

const JobsTab = ({ showNotification }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    closed: 0,
    totalApplications: 0
  });

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  // Load drafts when showing drafts panel
  useEffect(() => {
    if (showDrafts) {
      loadDrafts();
    }
  }, [showDrafts]);

  // Manage body scroll when modal opens/closes
  useEffect(() => {
    if (showForm) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      
      // Disable Locomotive scroll if it exists
      const locomotiveScroll = document.querySelector('[data-scroll-container]');
      if (locomotiveScroll) {
        locomotiveScroll.style.overflow = 'hidden';
        locomotiveScroll.style.pointerEvents = 'none';
        // Disable Locomotive scroll instance if available
        if (window.locomotiveScroll) {
          window.locomotiveScroll.stop();
        }
      }
      
      // Ensure modal gets proper pointer events
      setTimeout(() => {
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalContent = document.querySelector('.modal-content');
        if (modalOverlay) {
          modalOverlay.style.pointerEvents = 'auto';
          modalOverlay.style.zIndex = '9999';
        }
        if (modalContent) {
          modalContent.style.pointerEvents = 'auto';
          modalContent.style.zIndex = '10000';
        }
      }, 100);
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      
      // Re-enable Locomotive scroll if it exists
      const locomotiveScroll = document.querySelector('[data-scroll-container]');
      if (locomotiveScroll) {
        locomotiveScroll.style.overflow = '';
        locomotiveScroll.style.pointerEvents = '';
        // Restart Locomotive scroll instance if available
        if (window.locomotiveScroll) {
          window.locomotiveScroll.start();
        }
      }
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      // Ensure Locomotive scroll is restored on cleanup
      const locomotiveScroll = document.querySelector('[data-scroll-container]');
      if (locomotiveScroll && window.locomotiveScroll) {
        locomotiveScroll.style.overflow = '';
        locomotiveScroll.style.pointerEvents = '';
        window.locomotiveScroll.start();
      }
    };
  }, [showForm]);

  const fetchJobs = async (params = {}) => {
    try {
      setLoading(true);
      const response = await jobService.fetchJobs(params);
      
      if (response.success) {
        setJobs(response.data.jobs || []);
      } else {
        showNotification(response.message || 'Failed to fetch jobs', 'error');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      showNotification('Failed to fetch jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await jobService.getJobStats();
      
      if (response.success) {
        setStats(response.data || {
          total: 0,
          active: 0,
          closed: 0,
          totalApplications: 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const loadDrafts = async () => {
    try {
      const response = jobService.getDrafts();
      
      if (response.success) {
        setDrafts(response.data || []);
      }
    } catch (error) {
      console.error('Error loading drafts:', error);
    }
  };

  // Handle job save (create or update)
  const handleJobSave = (response) => {
    if (editingJob) {
      // Update existing job in the list
      setJobs(jobs.map(job => 
        job.id === response.job.id ? response.job : job
      ));
      showNotification('Job updated successfully!', 'success');
    } else {
      // Add new job to the list
      setJobs([response.job, ...jobs]);
      showNotification('Job created successfully!', 'success');
    }
    
    resetForm();
    fetchStats(); // Update statistics
  };

  // Reset form
  const resetForm = () => {
    setEditingJob(null);
    setShowForm(false);
  };

  // Edit job
  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  // Delete job
  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      try {
        const response = await jobService.deleteJob(jobId);
        
        if (response.success) {
          setJobs(jobs.filter(job => job.id !== jobId));
          showNotification('Job deleted successfully!', 'success');
          fetchStats(); // Update statistics
        } else {
          showNotification(response.message || 'Failed to delete job', 'error');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        showNotification('Failed to delete job', 'error');
      }
    }
  };

  // Toggle job status
  const toggleJobStatus = async (job) => {
    try {
      const updatedJob = { ...job, isActive: !job.isActive };
      const response = await jobService.updateJob(job.id, updatedJob);
      
      if (response.success) {
        setJobs(jobs.map(j => 
          j.id === job.id ? updatedJob : j
        ));
        showNotification(
          `Job ${updatedJob.isActive ? 'activated' : 'deactivated'} successfully!`,
          'success'
        );
        fetchStats(); // Update statistics
      } else {
        showNotification(response.message || 'Failed to update job status', 'error');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      showNotification('Failed to update job status', 'error');
    }
  };

  // Handle draft selection
  const handleDraftSelect = (draft) => {
    setEditingJob(draft);
    setShowForm(true);
    setShowDrafts(false);
  };

  // Delete draft
  const handleDeleteDraft = async (draftId) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      try {
        const response = jobService.deleteDraft(draftId);
        
        if (response.success) {
          setDrafts(drafts.filter(draft => draft.id !== draftId));
          showNotification('Draft deleted successfully!', 'success');
        } else {
          showNotification('Failed to delete draft', 'error');
        }
      } catch (error) {
        console.error('Error deleting draft:', error);
        showNotification('Failed to delete draft', 'error');
      }
    }
  };

  // Handle job selection for bulk actions
  const handleJobSelect = (jobId) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  // Handle select all jobs
  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(job => job.id));
    }
  };

  // Bulk delete jobs
  const handleBulkDelete = async () => {
    if (selectedJobs.length === 0) {
      showNotification('No jobs selected', 'error');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedJobs.length} job(s)? This action cannot be undone.`)) {
      try {
        const deletePromises = selectedJobs.map(jobId => 
          jobService.deleteJob(jobId)
        );
        
        const results = await Promise.allSettled(deletePromises);
        const successful = results.filter(result => 
          result.status === 'fulfilled' && result.value.success
        ).length;
        
        if (successful > 0) {
          setJobs(jobs.filter(job => !selectedJobs.includes(job.id)));
          setSelectedJobs([]);
          showNotification(`${successful} job(s) deleted successfully!`, 'success');
          fetchStats(); // Update statistics
        }
        
        if (successful < selectedJobs.length) {
          showNotification(`Failed to delete ${selectedJobs.length - successful} job(s)`, 'error');
        }
      } catch (error) {
        console.error('Error deleting jobs:', error);
        showNotification('Failed to delete jobs', 'error');
      }
    }
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && job.isActive) ||
      (filterStatus === 'inactive' && !job.isActive);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <div className="jobs-tab">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-tab">
      {/* Statistics Dashboard */}
      <div className="stats-dashboard">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Jobs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.active}</h3>
            <p>Active Jobs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon inactive">
            <i className="fas fa-pause-circle"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.closed}</h3>
            <p>Closed Jobs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon applications">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalApplications}</h3>
            <p>Total Applications</p>
          </div>
        </div>
      </div>

      {/* Header with Actions */}
      <div className="tab-header">
        <h2>Job Management</h2>
        <div className="header-actions">
          <button
            className="btn btn-outline"
            onClick={() => setShowDrafts(!showDrafts)}
          >
            <i className="fas fa-file-alt"></i>
            Drafts ({drafts.length})
          </button>
          <motion.button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-plus"></i>
            Post New Job
          </motion.button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <div className="bulk-actions">
          <span className="selected-count">
            {selectedJobs.length} job(s) selected
          </span>
          <div className="bulk-buttons">
            <button
              className="btn btn-danger"
              onClick={handleBulkDelete}
            >
              <i className="fas fa-trash"></i>
              Delete Selected
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedJobs([])}
            >
              <i className="fas fa-times"></i>
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Job Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => resetForm()}
          >
            <motion.div
              className="modal-content large"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <JobForm
                job={editingJob}
                onSave={handleJobSave}
                onCancel={resetForm}
                showNotification={showNotification}
                isLoading={loading}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drafts Panel */}
      <AnimatePresence>
        {showDrafts && (
          <motion.div
            className="drafts-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="drafts-header">
              <h3>Job Drafts</h3>
              <button
                className="btn btn-text"
                onClick={() => setShowDrafts(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {drafts.length === 0 ? (
              <div className="empty-drafts">
                <i className="fas fa-file-alt"></i>
                <p>No drafts saved yet</p>
              </div>
            ) : (
              <div className="drafts-list">
                {drafts.map((draft) => (
                  <div key={draft.id} className="draft-item">
                    <div className="draft-info">
                      <h4>{draft.title || 'Untitled Job'}</h4>
                      <p>{draft.company || 'No company'}</p>
                      <span className="draft-date">
                        Saved {new Date(draft.savedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="draft-actions">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleDraftSelect(draft)}
                      >
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteDraft(draft.id)}
                      >
                        <i className="fas fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jobs List */}
      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-briefcase"></i>
            <h3>{jobs.length === 0 ? 'No jobs posted yet' : 'No jobs match your filters'}</h3>
            <p>
              {jobs.length === 0 
                ? 'Click "Post New Job" to add your first job listing'
                : 'Try adjusting your search or filters'
              }
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Posted</th>
                  <th>Applications</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <motion.tr
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={selectedJobs.includes(job.id) ? 'selected' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job.id)}
                        onChange={() => handleJobSelect(job.id)}
                      />
                    </td>
                    <td>
                      <div className="job-title">
                        <strong>{job.title}</strong>
                        {job.salary && <span className="salary">{job.salary}</span>}
                        {job.isFeatured && (
                          <span className="featured-badge">
                            <i className="fas fa-star"></i>
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>
                      <span className="job-type">{job.type}</span>
                    </td>
                    <td>{new Date(job.createdAt || job.postedDate).toLocaleDateString()}</td>
                    <td>
                      <span className="applications-count">
                        {job.applicationCount || job.applications?.length || 0}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${job.isActive ? 'active' : 'inactive'}`}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => handleEdit(job)}
                          title="Edit"
                          style={{
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 8px',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        
                        <button
                          className="btn-icon"
                          onClick={() => toggleJobStatus(job)}
                          title={job.isActive ? 'Deactivate' : 'Activate'}
                          style={{
                            background: job.isActive ? '#f59e0b' : '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 8px',
                            cursor: 'pointer'
                          }}
                        >
                          <i className={`fas fa-${job.isActive ? 'pause' : 'play'}`}></i>
                        </button>
                        
                        <button
                          className="btn-icon danger"
                          onClick={() => handleDelete(job.id)}
                          title="Delete"
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 8px',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsTab;
