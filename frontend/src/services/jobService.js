import { API_BASE_URL } from '../config';

class JobService {
  // Get authentication token from localStorage
  getAuthToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token || localStorage.getItem('token');
  }

  // Get common headers for API requests
  getHeaders() {
    const token = this.getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Handle API errors
  handleError(error, customMessage = 'Request failed') {
    console.error('Job Service Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      return {
        success: false,
        message: data?.message || `${customMessage} (${status})`,
        status,
        data: data?.data || null
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        message: 'Network error. Please check your connection.',
        status: 0
      };
    } else {
      // Something else happened
      return {
        success: false,
        message: error.message || customMessage,
        status: -1
      };
    }
  }

  // Fetch all jobs with optional filtering
  async fetchJobs(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/jobs${queryString ? `?${queryString}` : ''}`, {
        headers: this.getHeaders()
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch jobs');
      }

      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch jobs');
    }
  }

  // Fetch a single job by ID
  async fetchJob(jobId) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        headers: this.getHeaders()
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch job');
      }

      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch job');
    }
  }

  // Create a new job
  async createJob(jobData) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(jobData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create job');
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      };
    } catch (error) {
      return this.handleError(error, 'Failed to create job');
    }
  }

  // Update an existing job
  async updateJob(jobId, jobData) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(jobData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update job');
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      };
    } catch (error) {
      return this.handleError(error, 'Failed to update job');
    }
  }

  // Delete a job
  async deleteJob(jobId) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete job');
      }

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      return this.handleError(error, 'Failed to delete job');
    }
  }

  // Get job statistics
  async getJobStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/stats`, {
        headers: this.getHeaders()
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch job statistics');
      }

      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch job statistics');
    }
  }

  // Get job types
  async getJobTypes() {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/meta/types`, {
        headers: this.getHeaders()
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch job types');
      }

      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch job types');
    }
  }

  // Get job locations
  async getJobLocations() {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/meta/locations`, {
        headers: this.getHeaders()
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch job locations');
      }

      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch job locations');
    }
  }

  // Save job as draft (localStorage for now, can be extended to backend)
  saveDraft(jobData) {
    try {
      const drafts = JSON.parse(localStorage.getItem('jobDrafts') || '{}');
      const draftId = jobData.id || `draft_${Date.now()}`;
      drafts[draftId] = {
        ...jobData,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('jobDrafts', JSON.stringify(drafts));
      
      return {
        success: true,
        data: { draftId },
        message: 'Draft saved successfully'
      };
    } catch (error) {
      return this.handleError(error, 'Failed to save draft');
    }
  }

  // Get all drafts
  getDrafts() {
    try {
      const drafts = JSON.parse(localStorage.getItem('jobDrafts') || '{}');
      return {
        success: true,
        data: Object.entries(drafts).map(([id, draft]) => ({ id, ...draft }))
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch drafts');
    }
  }

  // Delete a draft
  deleteDraft(draftId) {
    try {
      const drafts = JSON.parse(localStorage.getItem('jobDrafts') || '{}');
      delete drafts[draftId];
      localStorage.setItem('jobDrafts', JSON.stringify(drafts));
      
      return {
        success: true,
        message: 'Draft deleted successfully'
      };
    } catch (error) {
      return this.handleError(error, 'Failed to delete draft');
    }
  }

  // Validate job data
  validateJobData(jobData) {
    const errors = {};

    // Required fields
    if (!jobData.title?.trim()) {
      errors.title = 'Job title is required';
    } else if (jobData.title.length < 3 || jobData.title.length > 200) {
      errors.title = 'Job title must be between 3 and 200 characters';
    }

    if (!jobData.company?.trim()) {
      errors.company = 'Company name is required';
    } else if (jobData.company.length < 2 || jobData.company.length > 100) {
      errors.company = 'Company name must be between 2 and 100 characters';
    }

    if (!jobData.location?.trim()) {
      errors.location = 'Location is required';
    }

    if (!jobData.description?.trim()) {
      errors.description = 'Job description is required';
    } else if (jobData.description.length < 50 || jobData.description.length > 5000) {
      errors.description = 'Job description must be between 50 and 5000 characters';
    }

    // Optional field validation
    if (jobData.salary && jobData.salary.length > 100) {
      errors.salary = 'Salary range is too long';
    }

    if (jobData.applicationLink) {
      try {
        new URL(jobData.applicationLink);
      } catch {
        errors.applicationLink = 'Please enter a valid URL';
      }
    }

    if (jobData.applicationDeadline) {
      const deadline = new Date(jobData.applicationDeadline);
      const now = new Date();
      if (deadline <= now) {
        errors.applicationDeadline = 'Application deadline must be in the future';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export default new JobService();
