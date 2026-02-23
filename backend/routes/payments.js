const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { protect } = require('../middleware/auth');
const { sendOrderConfirmationEmail } = require('../services/emailService');

const router = express.Router();

// @route   POST /api/payments/create-intent
// @desc    Create Stripe payment intent
// @access  Private
router.post('/create-intent', protect, async (req, res) => {
  try {
    const { courseId, customerEmail, customerName } = req.body;

    // Verify course exists and get price
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is already enrolled
    const userId = req.user.id || req.user._id;
    const existingEnrollment = await Enrollment.findOne({
      student: userId,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // NEVER trust client-supplied amount - always use server-side course price
    const paymentAmount = Math.round(parseFloat(course.price) * 100);

    // Create Stripe payment intent (metadata used for webhook confirmation email)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount,
      currency: 'usd',
      receipt_email: customerEmail || undefined,
      metadata: {
        courseId: courseId,
        userId: String(userId),
        courseName: course.title || 'EdTech Program',
        customerEmail: customerEmail || '',
        customerName: customerName || 'Student'
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
    const userId = req.user.id || req.user._id;
    if (paymentIntent.metadata.courseId !== courseId || 
        paymentIntent.metadata.userId !== String(userId)) {
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

    // Send order confirmation + welcome email
    const studentEmail = populatedEnrollment?.student?.email;
    if (studentEmail) {
      sendOrderConfirmationEmail({
        to: studentEmail,
        customerName: populatedEnrollment.student?.firstName ? `${populatedEnrollment.student.firstName} ${populatedEnrollment.student.lastName || ''}`.trim() : 'Student',
        courseName: populatedEnrollment.course?.title || 'EdTech Program',
        amount: enrollment.payment?.amount
      }).catch(err => console.error('[Confirm] Email send failed:', err));
    }

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

// Webhook handler - must use raw body (mounted in server.js BEFORE express.json)
const webhookHandler = [
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    if (!sig) return res.status(400).send('Missing Stripe signature');
    if (!process.env.STRIPE_WEBHOOK_SECRET) return res.status(500).send('Webhook not configured');

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object;
        const email = pi.receipt_email || pi.metadata?.customerEmail;
        const customerName = pi.metadata?.customerName || 'Student';
        const courseName = pi.metadata?.courseName || 'EdTech Program';
        const amount = (pi.amount_received || 0) / 100;
        if (email) {
          sendOrderConfirmationEmail({ to: email, customerName, courseName, amount })
            .catch(err => console.error('[Webhook] Email send failed:', err));
        }
        break;
      }
      case 'payment_intent.payment_failed':
        break;
      default:
        break;
    }
    res.send();
  }
];

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

module.exports = { router, webhookHandler };
