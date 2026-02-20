const express = require('express');
const Job = require('../models/Job');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { validateJobCreation } = require('../middleware/validation');

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

    // Build filter object
    const filter = { isActive: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'company.name': { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (type) filter.type = type;
    if (experience) filter.experience = experience;
    if (remote === 'true') filter.remote = true;
    if (featured === 'true') filter.isFeatured = true;

    // Sort options
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const jobs = await Job.find(filter)
      .populate('postedBy', 'firstName lastName')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const total = await Job.countDocuments(filter);

    res.json({
      success: true,
      data: {
        jobs,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
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
    const job = await Job.findOne({ slug: req.params.slug })
      .populate('postedBy', 'firstName lastName profile.avatar')
      .populate('applications.applicant', 'firstName lastName profile.avatar');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment view count
    job.views += 1;
    await job.save();

    // Check if user has already applied
    let hasApplied = false;
    if (req.user) {
      hasApplied = job.applications.some(application => 
        application.applicant._id.toString() === req.user._id.toString()
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
      postedBy: req.user._id
    };

    const job = new Job(jobData);
    await job.save();

    const populatedJob = await Job.findById(job._id)
      .populate('postedBy', 'firstName lastName');

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
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user owns the job or is admin
    if (req.user.role !== 'admin' && job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('postedBy', 'firstName lastName');

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
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user owns the job or is admin
    if (req.user.role !== 'admin' && job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

    await Job.findByIdAndDelete(req.params.id);

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

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user has already applied
    const existingApplication = job.applications.find(application => 
      application.applicant.toString() === req.user._id.toString()
    );

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Add application
    job.applications.push({
      applicant: req.user._id,
      coverLetter,
      resume
    });

    await job.save();

    const updatedJob = await Job.findById(job._id)
      .populate('applications.applicant', 'firstName lastName profile.avatar');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        job: updatedJob
      }
    });
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
    const types = await Job.distinct('type');
    
    res.json({
      success: true,
      data: {
        types
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
    const locations = await Job.distinct('location');
    
    res.json({
      success: true,
      data: {
        locations
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

module.exports = router;
