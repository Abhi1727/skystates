const express = require('express');
const { Job, User, sequelize } = require('../config/sqlite-database');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { validateJobCreation } = require('../middleware/validation');
const { Op } = require('sequelize');

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs with filtering and pagination
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      location,
      type,
      experience,
      remote,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured
    } = req.query;

    // Build where clause
    const where = { isActive: true };

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    if (location) {
      where.location = { [Op.like]: `%${location}%` };
    }

    if (type) where.type = type;
    if (experience) where.experience = experience;
    if (remote === 'true') where.type = 'Remote';
    if (featured === 'true') where.isFeatured = true;

    // Sort options
    const order = [[sortBy, sortOrder.toUpperCase()]];

    // Execute query with pagination
    const offset = (page - 1) * limit;
    const jobs = await Job.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'poster',
        attributes: ['id', 'firstName', 'lastName']
      }],
      order,
      limit: parseInt(limit),
      offset
    });

    res.json({
      success: true,
      data: {
        jobs: jobs.rows,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(jobs.count / limit),
          total: jobs.count
        }
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/jobs/:slug
// @desc    Get single job by slug
// @access  Public
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const job = await Job.findOne({
      where: { slug: req.params.slug },
      include: [{
        model: User,
        as: 'poster',
        attributes: ['id', 'firstName', 'lastName', 'avatar']
      }]
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment view count
    await job.incrementViews();

    // Check if user has already applied
    let hasApplied = false;
    if (req.user) {
      hasApplied = (job.applications || []).some(application => 
        application.applicant === req.user.id
      );
    }

    res.json({
      success: true,
      data: {
        job,
        hasApplied
      }
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (Admin/Instructor)
router.post('/', protect, authorize('admin', 'instructor'), validateJobCreation, async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      postedBy: req.user.id,
      slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now()
    };

    const job = await Job.create(jobData);

    const populatedJob = await Job.findByPk(job.id, {
      include: [{
        model: User,
        as: 'poster',
        attributes: ['id', 'firstName', 'lastName']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: {
        job: populatedJob
      }
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private (Admin/Instructor)
router.put('/:id', protect, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user owns the job or is admin
    if (req.user.role !== 'admin' && job.postedBy !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

    await job.update(req.body);

    const updatedJob = await Job.findByPk(job.id, {
      include: [{
        model: User,
        as: 'poster',
        attributes: ['id', 'firstName', 'lastName']
      }]
    });

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: {
        job: updatedJob
      }
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private (Admin/Instructor)
router.delete('/:id', protect, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user owns the job or is admin
    if (req.user.role !== 'admin' && job.postedBy !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

    await job.destroy();

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/jobs/:id/apply
// @desc    Apply for a job
// @access  Private (Student)
router.post('/:id/apply', protect, async (req, res) => {
  try {
    const { coverLetter, resume } = req.body;

    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    try {
      // Add application using the model method
      await job.addApplication({
        applicant: req.user.id,
        coverLetter,
        resume,
        applicantName: req.user.getFullName(),
        applicantEmail: req.user.email
      });

      const updatedJob = await Job.findByPk(job.id, {
        include: [{
          model: User,
          as: 'poster',
          attributes: ['id', 'firstName', 'lastName']
        }]
      });

      res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        data: {
          job: updatedJob
        }
      });
    } catch (applicationError) {
      return res.status(400).json({
        success: false,
        message: applicationError.message
      });
    }
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/jobs/meta/types
// @desc    Get all job types
// @access  Public
router.get('/meta/types', async (req, res) => {
  try {
    const types = await Job.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('type')), 'type']],
      where: { isActive: true }
    });
    
    const typeList = types.map(t => t.type).filter(Boolean);
    
    res.json({
      success: true,
      data: {
        types: typeList
      }
    });
  } catch (error) {
    console.error('Get job types error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/jobs/meta/locations
// @desc    Get all job locations
// @access  Public
router.get('/meta/locations', async (req, res) => {
  try {
    const locations = await Job.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('location')), 'location']],
      where: { isActive: true }
    });
    
    const locationList = locations.map(l => l.location).filter(Boolean);
    
    res.json({
      success: true,
      data: {
        locations: locationList
      }
    });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/jobs/stats
// @desc    Get job statistics
// @access  Private (Admin/Instructor)
router.get('/stats', protect, authorize('admin', 'instructor'), async (req, res) => {
  try {
    const stats = await Job.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN isActive = 1 THEN 1 END')), 'active'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN isActive = 0 THEN 1 END')), 'inactive'],
        [sequelize.fn('SUM', sequelize.col('applicationCount')), 'totalApplications']
      ],
      raw: true
    });

    const result = stats[0] || {
      total: 0,
      active: 0,
      inactive: 0,
      totalApplications: 0
    };

    res.json({
      success: true,
      data: {
        total: parseInt(result.total) || 0,
        active: parseInt(result.active) || 0,
        closed: parseInt(result.inactive) || 0,
        totalApplications: parseInt(result.totalApplications) || 0
      }
    });
  } catch (error) {
    console.error('Get job stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
