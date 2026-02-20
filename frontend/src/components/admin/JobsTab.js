import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JobsTab = ({ jobs, setJobs, showNotification }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    experience: 'Entry Level',
    salary: '',
    description: '',
    requirements: '',
    applicationLink: '',
    isActive: true
  });

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/design/jobs');
      const data = await response.json();
      if (data.success) {
        // Transform API data to match component structure
        const transformedJobs = data.data.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          type: 'Full-time', // Default value
          experience: 'Entry Level', // Default value
          salary: `$${job.salary.toLocaleString()}`,
          description: 'Job description available', // Placeholder
          requirements: 'Requirements available', // Placeholder
          applicationLink: '',
          postedDate: '2024-01-15', // Placeholder
          applications: job.applications,
          isActive: job.status === 'active'
        }));
        setJobs(transformedJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      showNotification('Failed to fetch jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newJob = {
      id: editingJob ? editingJob.id : Date.now(),
      ...formData,
      postedDate: editingJob ? editingJob.postedDate : new Date().toISOString(),
      applications: editingJob ? editingJob.applications : 0
    };

    if (editingJob) {
      setJobs(jobs.map(job => job.id === editingJob.id ? newJob : job));
      showNotification('Job updated successfully!', 'success');
    } else {
      setJobs([...jobs, newJob]);
      showNotification('Job posted successfully!', 'success');
    }

    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      experience: 'Entry Level',
      salary: '',
      description: '',
      requirements: '',
      applicationLink: '',
      isActive: true
    });
    setEditingJob(null);
    setShowForm(false);
  };

  // Edit job
  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData(job);
    setShowForm(true);
  };

  // Delete job
  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
      showNotification('Job deleted successfully!', 'success');
    }
  };

  // Toggle job status
  const toggleJobStatus = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isActive: !job.isActive } : job
    ));
    showNotification('Job status updated!', 'info');
  };

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
      <div className="tab-header">
        <h2>Live Jobs Management</h2>
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
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{editingJob ? 'Edit Job' : 'Post New Job'}</h3>
                <button className="close-btn" onClick={resetForm}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="job-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Company *</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Job Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Experience Level</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Lead/Manager">Lead/Manager</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Salary Range</label>
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                      placeholder="e.g., $60k - $80k"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Job Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Requirements *</label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    required
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Application Link</label>
                  <input
                    type="url"
                    value={formData.applicationLink}
                    onChange={(e) => setFormData({...formData, applicationLink: e.target.value})}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    />
                    <span>Active (visible to job seekers)</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingJob ? 'Update Job' : 'Post Job'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jobs List */}
      <div className="jobs-list">
        {jobs.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-briefcase"></i>
            <h3>No jobs posted yet</h3>
            <p>Click "Post New Job" to add your first job listing</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
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
                {jobs.map((job) => (
                  <motion.tr
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <td>
                      <div className="job-title">
                        <strong>{job.title}</strong>
                        {job.salary && <span className="salary">{job.salary}</span>}
                      </div>
                    </td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>
                      <span className="job-type">{job.type}</span>
                    </td>
                    <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                    <td>
                      <span className="applications-count">{job.applications || 0}</span>
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
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => toggleJobStatus(job.id)}
                          title={job.isActive ? 'Deactivate' : 'Activate'}
                        >
                          <i className={`fas fa-${job.isActive ? 'eye-slash' : 'eye'}`}></i>
                        </button>
                        <button
                          className="btn-icon danger"
                          onClick={() => handleDelete(job.id)}
                          title="Delete"
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
