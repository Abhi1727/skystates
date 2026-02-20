const express = require('express');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/enrollments
// @desc    Get all enrollments (admin only) or user's enrollments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      courseId,
      sortBy = 'enrolledAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    let filter = {};

    // If not admin, only show user's enrollments
    if (req.user.role !== 'admin') {
      filter.student = req.user._id;
    }

    if (status) filter.status = status;
    if (courseId) filter.course = courseId;

    // Sort options
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const enrollments = await Enrollment.find(filter)
      .populate('student', 'firstName lastName email profile.avatar')
      .populate('course', 'title thumbnail instructor')
      .populate('course.instructor', 'firstName lastName')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const total = await Enrollment.countDocuments(filter);

    res.json({
      success: true,
      data: {
        enrollments,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/enrollments/:id
// @desc    Get single enrollment by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('student', 'firstName lastName email profile.avatar')
      .populate('course', 'title description modules instructor thumbnail')
      .populate('course.instructor', 'firstName lastName profile.avatar');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check if user owns the enrollment or is admin
    if (req.user._id.toString() !== enrollment.student._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this enrollment'
      });
    }

    res.json({
      success: true,
      data: {
        enrollment
      }
    });
  } catch (error) {
    console.error('Get enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/enrollments
// @desc    Create new enrollment
// @access  Private (Student)
router.post('/', protect, async (req, res) => {
  try {
    const { courseId, payment } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (!course.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'Course is not available for enrollment'
      });
    }

    // Check if user is already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      student: req.user._id,
      course: courseId,
      payment: {
        amount: payment.amount || course.price,
        currency: payment.currency || course.currency,
        method: payment.method || 'stripe',
        transactionId: payment.transactionId,
        status: payment.status || 'completed'
      }
    });

    await enrollment.save();

    // Update course enrollment count
    course.enrollmentCount += 1;
    await course.save();

    // Add course to user's enrolled courses
    const user = await User.findById(req.user._id);
    user.enrolledCourses.push({
      course: courseId,
      enrolledAt: new Date()
    });
    await user.save();

    // Populate enrollment data
    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate('student', 'firstName lastName email')
      .populate('course', 'title thumbnail instructor')
      .populate('course.instructor', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Enrollment successful',
      data: {
        enrollment: populatedEnrollment
      }
    });
  } catch (error) {
    console.error('Create enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/enrollments/:id/progress
// @desc    Update enrollment progress
// @access  Private (Student)
router.put('/:id/progress', protect, async (req, res) => {
  try {
    const { moduleId, lessonId, timestamp } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check if user owns the enrollment
    if (req.user._id.toString() !== enrollment.student.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this enrollment'
      });
    }

    // Find or create module progress
    let moduleProgress = enrollment.moduleProgress.find(
      mp => mp.moduleId.toString() === moduleId
    );

    if (!moduleProgress) {
      moduleProgress = {
        moduleId,
        completedLessons: [],
        quizScores: [],
        progress: 0
      };
      enrollment.moduleProgress.push(moduleProgress);
    }

    // Mark lesson as completed if not already
    if (lessonId && !moduleProgress.completedLessons.includes(lessonId)) {
      moduleProgress.completedLessons.push(lessonId);
    }

    // Update last accessed
    enrollment.lastAccessedAt = new Date();
    if (lessonId) {
      enrollment.currentLesson = lessonId;
    }

    // Calculate module progress
    const Course = require('../models/Course');
    const course = await Course.findById(enrollment.course);
    const module = course.modules.id(moduleId);
    
    if (module) {
      const totalLessons = module.lessons.length;
      const completedLessons = moduleProgress.completedLessons.length;
      moduleProgress.progress = Math.round((completedLessons / totalLessons) * 100);
    }

    // Calculate overall progress
    enrollment.calculateProgress();
    await enrollment.save();

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        progress: enrollment.progress,
        moduleProgress: moduleProgress.progress
      }
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/enrollments/:id/notes
// @desc    Add note to enrollment
// @access  Private (Student)
router.post('/:id/notes', protect, async (req, res) => {
  try {
    const { content, timestamp, lessonId } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check if user owns the enrollment
    if (req.user._id.toString() !== enrollment.student.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add notes to this enrollment'
      });
    }

    // Add note
    enrollment.notes.push({
      content,
      timestamp,
      lessonId
    });

    await enrollment.save();

    res.status(201).json({
      success: true,
      message: 'Note added successfully',
      data: {
        note: enrollment.notes[enrollment.notes.length - 1]
      }
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/enrollments/:id/bookmarks
// @desc    Add bookmark to enrollment
// @access  Private (Student)
router.post('/:id/bookmarks', protect, async (req, res) => {
  try {
    const { lessonId, timestamp, title } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check if user owns the enrollment
    if (req.user._id.toString() !== enrollment.student.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add bookmarks to this enrollment'
      });
    }

    // Add bookmark
    enrollment.bookmarks.push({
      lessonId,
      timestamp,
      title
    });

    await enrollment.save();

    res.status(201).json({
      success: true,
      message: 'Bookmark added successfully',
      data: {
        bookmark: enrollment.bookmarks[enrollment.bookmarks.length - 1]
      }
    });
  } catch (error) {
    console.error('Add bookmark error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/enrollments/:id/refund
// @desc    Request refund for enrollment
// @access  Private (Student)
router.post('/:id/refund', protect, async (req, res) => {
  try {
    const { reason } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check if user owns the enrollment
    if (req.user._id.toString() !== enrollment.student.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to request refund for this enrollment'
      });
    }

    // Check if refund already requested
    if (enrollment.refund.requested) {
      return res.status(400).json({
        success: false,
        message: 'Refund already requested'
      });
    }

    // Check refund eligibility (e.g., within 30 days and less than 50% progress)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    if (enrollment.enrolledAt < thirtyDaysAgo) {
      return res.status(400).json({
        success: false,
        message: 'Refund request period has expired (30 days)'
      });
    }

    if (enrollment.progress > 50) {
      return res.status(400).json({
        success: false,
        message: 'Refund not available for courses with more than 50% progress'
      });
    }

    // Create refund request
    enrollment.refund = {
      requested: true,
      reason,
      requestedAt: new Date(),
      status: 'pending'
    };

    await enrollment.save();

    res.json({
      success: true,
      message: 'Refund request submitted successfully',
      data: {
        refund: enrollment.refund
      }
    });
  } catch (error) {
    console.error('Request refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
