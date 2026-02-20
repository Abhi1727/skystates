const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/payments/create-intent
// @desc    Create Stripe payment intent
// @access  Private
router.post('/create-intent', protect, async (req, res) => {
  try {
    const { courseId, amount } = req.body;

    // Verify course exists and get price
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
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

    // Use provided amount or course price (in cents)
    const paymentAmount = amount || course.price * 100;

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount,
      currency: 'usd',
      metadata: {
        courseId: courseId,
        userId: req.user._id.toString()
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      }
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/payments/confirm
// @desc    Confirm payment and create enrollment
// @access  Private
router.post('/confirm', protect, async (req, res) => {
  try {
    const { paymentIntentId, courseId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment not successful'
      });
    }

    // Verify metadata matches
    if (paymentIntent.metadata.courseId !== courseId || 
        paymentIntent.metadata.userId !== req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Payment metadata mismatch'
      });
    }

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Enrollment already exists'
      });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      student: req.user._id,
      course: courseId,
      payment: {
        amount: paymentIntent.amount / 100, // Convert back to dollars
        currency: paymentIntent.currency,
        method: 'stripe',
        transactionId: paymentIntent.id,
        status: 'completed',
        paidAt: new Date()
      }
    });

    await enrollment.save();

    // Update course enrollment count
    const course = await Course.findById(courseId);
    course.enrollmentCount += 1;
    await course.save();

    // Add course to user's enrolled courses
    const User = require('../models/User');
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

    res.json({
      success: true,
      message: 'Payment confirmed and enrollment created successfully',
      data: {
        enrollment: populatedEnrollment
      }
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/payments/webhook
// @desc    Stripe webhook handler
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      
      // You can handle post-payment actions here
      // For example, send confirmation email, update database, etc.
      
      break;
    case 'payment_intent.payment_failed':
      console.log('PaymentIntent failed:', event.data.object.last_payment_error);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

// @route   GET /api/payments/history
// @desc    Get user's payment history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status
    } = req.query;

    // Build filter object
    let filter = { student: req.user._id };
    if (status) filter['payment.status'] = status;

    // Execute query with pagination
    const enrollments = await Enrollment.find(filter)
      .populate('course', 'title thumbnail price')
      .sort({ 'payment.paidAt': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const total = await Enrollment.countDocuments(filter);

    res.json({
      success: true,
      data: {
        payments: enrollments.map(enrollment => ({
          id: enrollment._id,
          course: enrollment.course,
          amount: enrollment.payment.amount,
          currency: enrollment.payment.currency,
          method: enrollment.payment.method,
          status: enrollment.payment.status,
          transactionId: enrollment.payment.transactionId,
          paidAt: enrollment.payment.paidAt
        })),
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/payments/refund
// @desc    Process refund (admin only)
// @access  Private (Admin)
router.post('/refund', protect, async (req, res) => {
  try {
    const { enrollmentId, reason } = req.body;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to process refunds'
      });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    if (enrollment.payment.method !== 'stripe' || !enrollment.payment.transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Only Stripe payments can be refunded'
      });
    }

    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: enrollment.payment.transactionId,
      reason: 'requested_by_customer',
      metadata: {
        enrollmentId: enrollmentId,
        reason: reason
      }
    });

    // Update enrollment
    enrollment.payment.status = 'refunded';
    enrollment.refund.status = 'approved';
    enrollment.refund.processedAt = new Date();
    await enrollment.save();

    res.json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        refundId: refund.id,
        amount: refund.amount / 100,
        currency: refund.currency,
        status: refund.status
      }
    });
  } catch (error) {
    console.error('Process refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
