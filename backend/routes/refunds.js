const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

/**
 * @file refunds.js
 * @description Backend API endpoints for refund requests processing
 * @version 1.0.0
 * @author Sky States Team
 */

// Validation middleware for refund requests
const validateRefundRequest = (req, res, next) => {
  const { name, email, orderId, courseName, reason, refundType } = req.body;
  
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email address is required');
  }
  
  if (!orderId || orderId.trim().length < 3) {
    errors.push('Order ID is required');
  }
  
  if (!courseName || courseName.trim().length < 2) {
    errors.push('Course name is required');
  }
  
  if (!reason || reason.trim().length < 10) {
    errors.push('Reason must be at least 10 characters long');
  }
  
  if (!refundType || !['full', 'partial', 'credit'].includes(refundType)) {
    errors.push('Valid refund type is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

/**
 * POST /api/refunds/request
 * @description Submit a new refund request
 * @access Private
 */
router.post('/request', validateRefundRequest, async (req, res) => {
  try {
    const { name, email, orderId, courseName, reason, refundType } = req.body;
    
    // Generate unique refund request ID
    const refundId = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create refund request object (in a real app, this would be saved to database)
    const refundRequest = {
      id: refundId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      orderId: orderId.trim(),
      courseName: courseName.trim(),
      reason: reason.trim(),
      refundType,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Log the request for demonstration
    console.log('New refund request:', refundRequest);
    
    // In a real implementation, you would:
    // 1. Save to database
    // 2. Send confirmation email to customer
    // 3. Send notification to admin team
    // 4. Create ticket in support system
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.status(201).json({
      success: true,
      message: 'Refund request submitted successfully',
      data: {
        requestId: refundId,
        status: 'pending',
        estimatedProcessingTime: '24-48 hours',
        nextSteps: [
          'You will receive a confirmation email shortly',
          'Our team will review your request within 24 hours',
          'We may contact you for additional information if needed'
        ]
      }
    });
    
  } catch (error) {
    console.error('Refund request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

/**
 * GET /api/refunds/status/:requestId
 * @description Get refund request status
 * @access Private
 */
router.get('/status/:requestId', auth, async (req, res) => {
  try {
    const { requestId } = req.params;
    
    // In a real app, you would query the database
    // For demonstration, return a mock response
    const mockStatuses = ['pending', 'under_review', 'approved', 'processed', 'rejected'];
    const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
    
    res.json({
      success: true,
      data: {
        requestId,
        status: randomStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: randomStatus === 'pending' ? 'Your request is being reviewed by our team' : null
      }
    });
    
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to retrieve request status'
    });
  }
});

/**
 * GET /api/refunds/policy
 * @description Get current refund policy information
 * @access Public
 */
router.get('/policy', async (req, res) => {
  try {
    const policy = {
      longTermCourses: {
        title: "Long-Term Courses (6+ Months)",
        fullRefund: "Within 3 business days of signing agreement",
        beforeClasses: "Full refund except registration fee (max $99)",
        duringDropAdd: "Full refund except registration fee",
        afterDropAdd: "No refunds after first week"
      },
      shortTermCourses: {
        title: "Short-Term Courses (< 6 Months)",
        classroomTraining: {
          sevenDaysPlus: "90% refund (10% processing fee)",
          lessThanSevenDays: "No refunds"
        },
        onlineTraining: {
          within48Hours: "95% refund (5% administration fee)",
          after48Hours: "No refunds"
        },
        thirdParty: {
          within48Hours: "50% refund",
          after48Hours: "No refunds"
        }
      },
      usaConsumerProtection: {
        title: "USA Consumer Protection Law",
        policy: "Full refund within 14 days if content not accessed"
      },
      duplicatePayment: {
        title: "Duplicate Payment",
        policy: "Full refund within 5-7 working days"
      },
      generalInfo: {
        processingTime: "30 days from request receipt",
        contactEmail: "info@skystates.us",
        supportHours: "24/7"
      }
    };
    
    res.json({
      success: true,
      data: policy
    });
    
  } catch (error) {
    console.error('Policy fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to retrieve policy information'
    });
  }
});

module.exports = router;
