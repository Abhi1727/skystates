import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminDashboard.css';
import JobsTab from './JobsTab';
import CouponsTab from './CouponsTab';
import BlogsTab from './BlogsTab';
import BrouchuresTab from './BrouchuresTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [brouchures, setBrouchures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Initialize empty data
  useEffect(() => {
    // Set initial empty states
    setJobs([]);
    setCoupons([]);
    setBlogs([]);
    setBrouchures([]);
  }, []);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Navigation tabs
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'jobs', name: 'Live Jobs', icon: 'fas fa-briefcase' },
    { id: 'coupons', name: 'Coupons', icon: 'fas fa-ticket-alt' },
    { id: 'blogs', name: 'Blogs', icon: 'fas fa-blog' },
    { id: 'brouchures', name: 'Brouchures', icon: 'fas fa-file-pdf' }
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <motion.header 
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <h1>Admin Panel</h1>
          <div className="admin-info">
            <span>Admin User</span>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </motion.header>

      <div className="admin-container">
        {/* Sidebar Navigation */}
        <motion.nav 
          className="admin-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={tab.icon}></i>
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </motion.nav>

        {/* Main Content */}
        <motion.main 
          className="admin-main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <DashboardTab key="dashboard" />}
            {activeTab === 'jobs' && <JobsTab key="jobs" jobs={jobs} setJobs={setJobs} showNotification={showNotification} />}
            {activeTab === 'coupons' && <CouponsTab key="coupons" coupons={coupons} setCoupons={setCoupons} showNotification={showNotification} />}
            {activeTab === 'blogs' && <BlogsTab key="blogs" blogs={blogs} setBlogs={setBlogs} showNotification={showNotification} />}
            {activeTab === 'brouchures' && <BrouchuresTab key="brouchures" brouchures={brouchures} setBrouchures={setBrouchures} showNotification={showNotification} />}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Dashboard Overview Tab
const DashboardTab = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeCoupons: 0,
    publishedBlogs: 0,
    totalBrouchures: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/admin/design`);
      const data = await response.json();
      
      if (data.success) {
        // Update stats with real data
        setStats({
          totalJobs: data.data.recentJobs.length,
          activeCoupons: 5, // Mock data
          publishedBlogs: data.data.recentCourses.filter(c => c.status === 'published').length,
          totalBrouchures: 3 // Mock data
        });

        // Create recent activity from real data
        const activity = [
          ...data.data.recentJobs.slice(0, 2).map(job => ({
            time: '2 hours ago',
            text: `New job posted: ${job.title}`
          })),
          ...data.data.recentCourses.slice(0, 1).map(course => ({
            time: '5 hours ago',
            text: `Course created: ${course.title}`
          }))
        ];
        setRecentActivity(activity);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-tab">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-tab">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalJobs}</h3>
            <p>Total Jobs</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">
            <i className="fas fa-ticket-alt"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.activeCoupons}</h3>
            <p>Active Coupons</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">
            <i className="fas fa-blog"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.publishedBlogs}</h3>
            <p>Published Blogs</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">
            <i className="fas fa-file-pdf"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalBrouchures}</h3>
            <p>Brouchures</p>
          </div>
        </motion.div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="activity-time">{activity.time}</span>
                <span className="activity-text">{activity.text}</span>
              </div>
            ))
          ) : (
            <div className="no-activity">
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
