import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jobService from '../../services/jobService';
import '../../styles/JobAdmin.css';

const JobForm = ({ 
  job = null, 
  onSave, 
  onCancel, 
  showNotification,
  isLoading = false 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    description: false,
    requirements: false,
    benefits: false,
    skills: false,
    application: false,
    settings: false
  });

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full Time',
    experience: 'Mid Level',
    salary: '',
    currency: 'USD',
    description: '',
    requirements: [],
    benefits: [],
    skills: [],
    applicationLink: '',
    applicationDeadline: '',
    isActive: true,
    isFeatured: false,
    tags: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [jobTypes, setJobTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currencies] = useState(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR']);
  
  // Form field refs for validation
  const titleRef = useRef(null);
  const companyRef = useRef(null);
  const locationRef = useRef(null);
  const descriptionRef = useRef(null);

  // Initialize form data
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        company: job.company || '',
        location: job.location || '',
        type: job.type || 'Full Time',
        experience: job.experience || 'Mid Level',
        salary: job.salary || '',
        currency: job.currency || 'USD',
        description: job.description || '',
        requirements: job.requirements || [],
        benefits: job.benefits || [],
        skills: job.skills || [],
        applicationLink: job.applicationLink || '',
        applicationDeadline: job.applicationDeadline ? 
          new Date(job.applicationDeadline).toISOString().split('T')[0] : '',
        isActive: job.isActive !== undefined ? job.isActive : true,
        isFeatured: job.isFeatured || false,
        tags: job.tags || []
      });
    }
  }, [job]);

  // Load job types and locations
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const [typesResponse, locationsResponse] = await Promise.all([
          jobService.getJobTypes(),
          jobService.getJobLocations()
        ]);

        if (typesResponse.success) {
          setJobTypes(typesResponse.data.types || []);
        }

        if (locationsResponse.success) {
          setLocations(locationsResponse.data.locations || []);
        }
      } catch (error) {
        console.error('Failed to load metadata:', error);
      }
    };

    loadMetadata();
  }, []);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Expand all sections
  const expandAllSections = () => {
    setExpandedSections({
      basic: true,
      description: true,
      requirements: true,
      benefits: true,
      skills: true,
      application: true,
      settings: true
    });
  };

  // Collapse all sections
  const collapseAllSections = () => {
    setExpandedSections({
      basic: true,
      description: false,
      requirements: false,
      benefits: false,
      skills: false,
      application: false,
      settings: false
    });
  };

  // Auto-expand section when field is focused
  const handleFieldFocus = (section) => {
    if (!expandedSections[section]) {
      setExpandedSections(prev => ({
        ...prev,
        [section]: true
      }));
    }
  };

  // Calculate form completion progress
  const calculateProgress = () => {
    const requiredFields = ['title', 'company', 'location', 'description'];
    const filledFields = requiredFields.filter(field => formData[field] && formData[field].trim() !== '');
    const optionalFields = ['salary', 'applicationLink', 'applicationDeadline'];
    const filledOptional = optionalFields.filter(field => formData[field] && formData[field].trim() !== '');
    const arrayFields = ['requirements', 'benefits', 'skills'];
    const filledArrays = arrayFields.filter(field => formData[field] && formData[field].length > 0);
    
    const totalFields = requiredFields.length + optionalFields.length + arrayFields.length;
    const filledTotal = filledFields.length + filledOptional.length + filledArrays.length;
    
    return Math.round((filledTotal / totalFields) * 100);
  };

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle input with focus tracking
  const handleInputChangeWithFocus = (field, value, section) => {
    handleInputChange(field, value);
    handleFieldFocus(section);
  };

  // Handle array fields (skills, requirements, benefits, tags)
  const handleArrayFieldChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    handleInputChange(field, items);
  };

  // Validate form
  const validateForm = () => {
    const validation = jobService.validateJobData(formData);
    setErrors(validation.errors);
    
    if (!validation.isValid) {
      // Focus on first error field
      const firstErrorField = Object.keys(validation.errors)[0];
      const fieldRefs = {
        title: titleRef,
        company: companyRef,
        location: locationRef,
        description: descriptionRef
      };
      
      if (fieldRefs[firstErrorField]) {
        fieldRefs[firstErrorField].current?.focus();
      }
      
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      
      if (job) {
        response = await jobService.updateJob(job.id, formData);
      } else {
        response = await jobService.createJob(formData);
      }

      if (response.success) {
        showNotification(response.message || 'Job saved successfully!', 'success');
        onSave(response.data);
      } else {
        showNotification(response.message || 'Failed to save job', 'error');
      }
    } catch (error) {
      showNotification('An unexpected error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save as draft
  const saveDraft = async () => {
    setIsSavingDraft(true);
    
    try {
      const response = jobService.saveDraft(formData);
      
      if (response.success) {
        showNotification('Draft saved successfully!', 'success');
      } else {
        showNotification('Failed to save draft', 'error');
      }
    } catch (error) {
      showNotification('Failed to save draft', 'error');
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Get current date for min deadline
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <motion.div
      className="job-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="form-header">
        <h2>{job ? 'Edit Job' : 'Create New Job'}</h2>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowPreview(!showPreview)}
          >
            <i className={`fas fa-${showPreview ? 'edit' : 'eye'}`}></i>
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={saveDraft}
            disabled={isSavingDraft}
          >
            <i className="fas fa-save"></i>
            {isSavingDraft ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            <i className="fas fa-times"></i>
            Cancel
          </button>
        </div>
      </div>

      {/* Section Controls */}
      <div className="section-controls">
        <div className="form-progress">
          <span>Form Progress:</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${calculateProgress()}%` }}></div>
          </div>
          <span className="progress-text">{calculateProgress()}%</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="expand-all-btn"
            onClick={expandAllSections}
          >
            <i className="fas fa-expand-alt"></i>
            Expand All
          </button>
          <button
            type="button"
            className="collapse-all-btn"
            onClick={collapseAllSections}
          >
            <i className="fas fa-compress-alt"></i>
            Collapse All
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showPreview ? (
          <motion.div
            key="preview"
            className="job-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="preview-content">
              <h3>{formData.title || 'Job Title'}</h3>
              <div className="preview-meta">
                <span><i className="fas fa-building"></i> {formData.company || 'Company'}</span>
                <span><i className="fas fa-map-marker-alt"></i> {formData.location || 'Location'}</span>
                <span><i className="fas fa-briefcase"></i> {formData.type}</span>
                <span><i className="fas fa-chart-line"></i> {formData.experience}</span>
                {formData.salary && (
                  <span><i className="fas fa-money-bill-wave"></i> {formData.salary}</span>
                )}
              </div>
              <div className="preview-description">
                <h4>Job Description</h4>
                <p>{formData.description || 'No description provided'}</p>
              </div>
              
              {formData.requirements.length > 0 && (
                <div className="preview-requirements">
                  <h4>Requirements</h4>
                  <ul>
                    {formData.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {formData.benefits.length > 0 && (
                <div className="preview-benefits">
                  <h4>Benefits</h4>
                  <ul>
                    {formData.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {formData.skills.length > 0 && (
                <div className="preview-skills">
                  <h4>Skills Required</h4>
                  <div className="skill-tags">
                    {formData.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {formData.applicationLink && (
                <div className="preview-application">
                  <h4>How to Apply</h4>
                  <a href={formData.applicationLink} target="_blank" rel="noopener noreferrer">
                    Apply Here <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              )}
              
              {formData.applicationDeadline && (
                <div className="preview-deadline">
                  <h4>Application Deadline</h4>
                  <p>{new Date(formData.applicationDeadline).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="job-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Basic Information Section */}
            <div className={`collapsible-section ${expandedSections.basic ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('basic')}>
                <h3>
                  <i className="fas fa-info-circle"></i>
                  Basic Information
                  <span className="section-indicator">
                    <span className="field-count">6 fields</span>
                  </span>
                </h3>
                <button type="button" className="section-toggle">
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
              <div className="section-content">
                <div className="form-section">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">Job Title *</label>
                      <input
                        ref={titleRef}
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChangeWithFocus('title', e.target.value, 'basic')}
                        className={errors.title ? 'error' : ''}
                        placeholder="e.g., Senior Frontend Developer"
                        required
                        onFocus={() => handleFieldFocus('basic')}
                      />
                      {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="company">Company *</label>
                      <input
                        ref={companyRef}
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChangeWithFocus('company', e.target.value, 'basic')}
                        className={errors.company ? 'error' : ''}
                        placeholder="e.g., Sky States"
                        required
                        onFocus={() => handleFieldFocus('basic')}
                      />
                      {errors.company && <span className="error-message">{errors.company}</span>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="location">Location *</label>
                      <input
                        ref={locationRef}
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChangeWithFocus('location', e.target.value, 'basic')}
                        className={errors.location ? 'error' : ''}
                        placeholder="e.g., New York, NY or Remote"
                        list="locations-list"
                        autoComplete="off"
                        required
                        onFocus={() => handleFieldFocus('basic')}
                      />
                      <datalist id="locations-list">
                        {locations.map((location, index) => (
                          <option key={index} value={location} />
                        ))}
                      </datalist>
                      {errors.location && <span className="error-message">{errors.location}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="type">Job Type</label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => handleInputChangeWithFocus('type', e.target.value, 'basic')}
                        className="form-select"
                        onFocus={() => handleFieldFocus('basic')}
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="experience">Experience Level</label>
                      <select
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChangeWithFocus('experience', e.target.value, 'basic')}
                        className="form-select"
                        onFocus={() => handleFieldFocus('basic')}
                      >
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="currency">Currency</label>
                      <select
                        id="currency"
                        value={formData.currency}
                        onChange={(e) => handleInputChangeWithFocus('currency', e.target.value, 'basic')}
                        className="form-select"
                        onFocus={() => handleFieldFocus('basic')}
                      >
                        {currencies.map(currency => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="salary">Salary Range</label>
                      <input
                        type="text"
                        id="salary"
                        value={formData.salary}
                        onChange={(e) => handleInputChangeWithFocus('salary', e.target.value, 'basic')}
                        placeholder="e.g., 80k - 120k"
                        className={errors.salary ? 'error' : ''}
                        onFocus={() => handleFieldFocus('basic')}
                      />
                      {errors.salary && <span className="error-message">{errors.salary}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description Section */}
            <div className={`collapsible-section ${expandedSections.description ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('description')}>
                <h3>
                  <i className="fas fa-file-alt"></i>
                  Job Description
                  <span className="section-indicator">
                    <span className="field-count">1 field</span>
                  </span>
                </h3>
                <button type="button" className="section-toggle">
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
              <div className="section-content">
                <div className="form-section">
                  <div className="form-group">
                    <textarea
                      ref={descriptionRef}
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChangeWithFocus('description', e.target.value, 'description')}
                      className={errors.description ? 'error' : ''}
                      placeholder="Provide a detailed description of the role, responsibilities, and what you're looking for..."
                      rows="8"
                      required
                      onFocus={() => handleFieldFocus('description')}
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                    <div className="character-count">
                      {formData.description.length} / 5000 characters
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className={`collapsible-section ${expandedSections.requirements ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('requirements')}>
                <h3>
                  <i className="fas fa-list-check"></i>
                  Requirements
                  <span className="section-indicator">
                    <span className="field-count">{formData.requirements.length} items</span>
                  </span>
                </h3>
                <button type="button" className="section-toggle">
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
              <div className="section-content">
                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="requirements">
                      Enter requirements (comma-separated)
                    </label>
                    <textarea
                      id="requirements"
                      value={formData.requirements.join(', ')}
                      onChange={(e) => {
                        handleArrayFieldChange('requirements', e.target.value);
                        handleFieldFocus('requirements');
                      }}
                      placeholder="e.g., 3+ years of experience, Bachelor's degree, React.js knowledge"
                      rows="4"
                      onFocus={() => handleFieldFocus('requirements')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className={`collapsible-section ${expandedSections.benefits ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('benefits')}>
                <h3>
                  <i className="fas fa-gift"></i>
                  Benefits
                  <span className="section-indicator">
                    <span className="field-count">{formData.benefits.length} items</span>
                  </span>
                </h3>
                <button type="button" className="section-toggle">
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
              <div className="section-content">
                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="benefits">
                      Enter benefits (comma-separated)
                    </label>
                    <textarea
                      id="benefits"
                      value={formData.benefits.join(', ')}
                      onChange={(e) => {
                        handleArrayFieldChange('benefits', e.target.value);
                        handleFieldFocus('benefits');
                      }}
                      placeholder="e.g., Health insurance, Flexible hours, Remote work options"
                      rows="4"
                      onFocus={() => handleFieldFocus('benefits')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className={`collapsible-section ${expandedSections.skills ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('skills')}>
                <h3>
                  <i className="fas fa-code"></i>
                  Skills
                  <span className="section-indicator">
                    <span className="field-count">{formData.skills.length} items</span>
                  </span>
                </h3>
                <button type="button" className="section-toggle">
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
              <div className="section-content">
                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="skills">
                      Required skills (comma-separated)
                    </label>
                    <textarea
                      id="skills"
                      value={formData.skills.join(', ')}
                      onChange={(e) => {
                        handleArrayFieldChange('skills', e.target.value);
                        handleFieldFocus('skills');
                      }}
                      placeholder="e.g., JavaScript, React, Node.js, MongoDB"
                      rows="3"
                      onFocus={() => handleFieldFocus('skills')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Application Details Section */}
            <div className={`collapsible-section ${expandedSections.application ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('application')}>
                <h3>
                  <i className="fas fa-paper-plane"></i>
                  Application Details
                  <span className="section-indicator">
                    <span className="field-count">2 fields</span>
                  </span>
                </h3>
                <button type="button" className="section-toggle">
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
              <div className="section-content">
                <div className="form-section">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="applicationLink">Application Link</label>
                      <input
                        type="url"
                        id="applicationLink"
                        value={formData.applicationLink}
                        onChange={(e) => handleInputChangeWithFocus('applicationLink', e.target.value, 'application')}
                        className={errors.applicationLink ? 'error' : ''}
                        placeholder="https://careers.company.com/apply"
                        onFocus={() => handleFieldFocus('application')}
                      />
                      {errors.applicationLink && <span className="error-message">{errors.applicationLink}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="applicationDeadline">Application Deadline</label>
                      <input
                        type="date"
                        id="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={(e) => handleInputChangeWithFocus('applicationDeadline', e.target.value, 'application')}
                        min={getMinDate()}
                        className={errors.applicationDeadline ? 'error' : ''}
                        onFocus={() => handleFieldFocus('application')}
                      />
                      {errors.applicationDeadline && <span className="error-message">{errors.applicationDeadline}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Settings Section */}
            <div className={`collapsible-section ${expandedSections.settings ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('settings')}>
                <h3>
                  <i className="fas fa-cog"></i>
                  Job Settings
                  <span className="section-indicator">
                    <span className="field-count">2 settings</span>
                  </span>
                </h3>
                <button type="button" className="section-toggle">
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
              <div className="section-content">
                <div className="form-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => {
                          handleInputChange('isActive', e.target.checked);
                          handleFieldFocus('settings');
                        }}
                        onFocus={() => handleFieldFocus('settings')}
                      />
                      <span>Active (visible to job seekers)</span>
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => {
                          handleInputChange('isFeatured', e.target.checked);
                          handleFieldFocus('settings');
                        }}
                        onFocus={() => handleFieldFocus('settings')}
                      />
                      <span>Featured (highlight in job listings)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {job ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    {job ? 'Update Job' : 'Create Job'}
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default JobForm;
