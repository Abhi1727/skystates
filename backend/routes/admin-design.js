const express = require('express');
const router = express.Router();

// Mock admin data for design purposes
const mockAdminData = {
  user: {
    id: 'demo-employer',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'admin@example.com',
    role: 'admin',
    avatar: ''
  },
  stats: {
    totalUsers: 1250,
    totalCourses: 45,
    totalEnrollments: 3420,
    totalRevenue: 125430
  },
  recentUsers: [
    { id: '1', name: 'John Doe', email: 'john@example.com', joinedAt: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', joinedAt: '2024-01-14' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', joinedAt: '2024-01-13' }
  ],
  recentCourses: [
    { id: '1', title: 'Introduction to Web Development', enrollments: 125, status: 'published' },
    { id: '2', title: 'Advanced React Development', enrollments: 85, status: 'published' },
    { id: '3', title: 'Node.js Masterclass', enrollments: 62, status: 'draft' }
  ],
  recentJobs: [
    { id: '1', title: 'Frontend Developer', company: 'Tech Company', applications: 45, status: 'active' },
    { id: '2', title: 'Full Stack Engineer', company: 'Startup Inc', applications: 32, status: 'active' },
    { id: '3', title: 'UI/UX Designer', company: 'Design Studio', applications: 28, status: 'closed' }
  ]
};

// @route   GET /api/admin/design
// @desc    Get mock admin data for design purposes (no auth required)
// @access  Public (design only)
router.get('/design', (req, res) => {
  res.json({
    success: true,
    message: 'Admin design data loaded',
    data: mockAdminData
  });
});

// @route   GET /api/admin/design/users
// @desc    Get mock users list for design
// @access  Public (design only)
router.get('/design/users', (req, res) => {
  const mockUsers = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'student', isActive: true, createdAt: '2024-01-15' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'instructor', isActive: true, createdAt: '2024-01-14' },
    { id: '3', firstName: 'Bob', lastName: 'Wilson', email: 'bob@example.com', role: 'student', isActive: false, createdAt: '2024-01-13' },
    { id: '4', firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', role: 'admin', isActive: true, createdAt: '2024-01-12' },
    { id: '5', firstName: 'Charlie', lastName: 'Davis', email: 'charlie@example.com', role: 'student', isActive: true, createdAt: '2024-01-11' }
  ];
  
  res.json({
    success: true,
    data: mockUsers
  });
});

// @route   GET /api/admin/design/courses
// @desc    Get mock courses list for design
// @access  Public (design only)
router.get('/design/courses', (req, res) => {
  const mockCourses = [
    { id: '1', title: 'Introduction to Web Development', category: 'web-development', level: 'beginner', price: 99.99, enrollmentCount: 125, isPublished: true, instructor: 'Jane Smith' },
    { id: '2', title: 'Advanced React Development', category: 'web-development', level: 'advanced', price: 199.99, enrollmentCount: 85, isPublished: true, instructor: 'Jane Smith' },
    { id: '3', title: 'Node.js Masterclass', category: 'web-development', level: 'intermediate', price: 149.99, enrollmentCount: 62, isPublished: false, instructor: 'John Doe' },
    { id: '4', title: 'Python for Data Science', category: 'data-science', level: 'beginner', price: 129.99, enrollmentCount: 203, isPublished: true, instructor: 'Bob Wilson' },
    { id: '5', title: 'Cybersecurity Fundamentals', category: 'cyber-security', level: 'intermediate', price: 179.99, enrollmentCount: 47, isPublished: true, instructor: 'Alice Brown' }
  ];
  
  res.json({
    success: true,
    data: mockCourses
  });
});

// @route   GET /api/admin/design/jobs
// @desc    Get mock jobs list for design
// @access  Public (design only)
router.get('/design/jobs', (req, res) => {
  const mockJobs = [
    { id: '1', title: 'Frontend Developer', company: 'Tech Company', location: 'Remote', salary: 80000, applications: 45, status: 'active', postedBy: 'Mike Johnson' },
    { id: '2', title: 'Full Stack Engineer', company: 'Startup Inc', location: 'San Francisco', salary: 120000, applications: 32, status: 'active', postedBy: 'Mike Johnson' },
    { id: '3', title: 'UI/UX Designer', company: 'Design Studio', location: 'New York', salary: 75000, applications: 28, status: 'closed', postedBy: 'Mike Johnson' },
    { id: '4', title: 'Backend Developer', company: 'Enterprise Corp', location: 'London', salary: 95000, applications: 19, status: 'active', postedBy: 'Mike Johnson' },
    { id: '5', title: 'DevOps Engineer', company: 'Cloud Solutions', location: 'Remote', salary: 110000, applications: 23, status: 'active', postedBy: 'Mike Johnson' }
  ];
  
  res.json({
    success: true,
    data: mockJobs
  });
});

module.exports = router;
