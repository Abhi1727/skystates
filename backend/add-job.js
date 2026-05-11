const axios = require('axios');

async function addJob() {
  const jobData = {
    title: 'React Frontend Developer',
    company: 'Sky States Tech',
    description: 'We are looking for a talented React Frontend Developer to join our growing team. You will be responsible for building responsive web applications using React, TypeScript, and modern CSS frameworks.',
    location: 'Remote',
    type: 'Full Time',
    experience: 'Mid Level',
    salary: '$80k - $120k',
    currency: 'USD',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Git'],
    requirements: [
      '3+ years of React development experience',
      'Strong JavaScript and ES6+ knowledge',
      'Experience with modern CSS frameworks',
      'Familiarity with RESTful APIs',
      'Good understanding of responsive design'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Remote work flexibility',
      'Professional development budget',
      'Flexible working hours'
    ],
    tags: ['react', 'frontend', 'javascript', 'remote', 'typescript'],
    isActive: true,
    isFeatured: true
  };

  try {
    // First, login as admin to get token
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });

    const token = loginResponse.data.data.token;

    // Add the job
    const response = await axios.post('http://localhost:5000/api/jobs', jobData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Job added successfully:', response.data);
  } catch (error) {
    console.error('Error adding job:', error.response?.data || error.message);
  }
}

addJob();
