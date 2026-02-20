const express = require('express');
const Course = require('../models/Course');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { validateCourseCreation } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses with filtering and pagination
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      level,
      minPrice,
      maxPrice,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured
    } = req.query;

    // Build filter object
    const filter = { isPublished: true };

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (featured === 'true') filter.isFeatured = true;

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const courses = await Course.find(filter)
      .populate('instructor', 'firstName lastName profile.avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const total = await Course.countDocuments(filter);

    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/courses/:slug
// @desc    Get single course by slug
// @access  Public
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate('instructor', 'firstName lastName profile.bio profile.avatar profile.experience')
      .populate('reviews.student', 'firstName lastName profile.avatar');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is enrolled
    let isEnrolled = false;
    if (req.user) {
      const User = require('../models/User');
      const user = await User.findById(req.user._id);
      isEnrolled = user.enrolledCourses.some(enrollment => 
        enrollment.course.toString() === course._id.toString()
      );
    }

    res.json({
      success: true,
      data: {
        course,
        isEnrolled,
        canAccess: isEnrolled || req.user?.role === 'admin'
      }
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private (Instructor/Admin)
router.post('/', protect, authorize('instructor', 'admin'), validateCourseCreation, async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user._id
    };

    const course = new Course(courseData);
    await course.save();

    const populatedCourse = await Course.findById(course._id)
      .populate('instructor', 'firstName lastName profile.avatar');

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: {
        course: populatedCourse
      }
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Private (Instructor/Admin)
router.put('/:id', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user owns the course or is admin
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('instructor', 'firstName lastName profile.avatar');

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: {
        course: updatedCourse
      }
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Private (Instructor/Admin)
router.delete('/:id', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user owns the course or is admin
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/courses/:id/reviews
// @desc    Add a review to a course
// @access  Private (Student)
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is enrolled
    const User = require('../models/User');
    const user = await User.findById(req.user._id);
    const isEnrolled = user.enrolledCourses.some(enrollment => 
      enrollment.course.toString() === course._id.toString()
    );

    if (!isEnrolled && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You must be enrolled in this course to leave a review'
      });
    }

    // Check if user already reviewed
    const existingReview = course.reviews.find(review => 
      review.student.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this course'
      });
    }

    // Add review
    course.reviews.push({
      student: req.user._id,
      rating,
      comment
    });

    // Update course rating
    course.updateRating();
    await course.save();

    const updatedCourse = await Course.findById(course._id)
      .populate('reviews.student', 'firstName lastName profile.avatar');

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: {
        course: updatedCourse
      }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/courses/categories
// @desc    Get all course categories
// @access  Public
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Course.distinct('category');
    
    res.json({
      success: true,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
