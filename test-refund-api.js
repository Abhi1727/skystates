/**
 * @file test-refund-api.js
 * @description Test script for refund API endpoints
 * @version 1.0.0
 * @author Sky States Team
 */

const axios = require('axios');

// Base URL for API testing
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

// Test data
const testRefundRequest = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  orderId: 'ORD-123456789',
  courseName: 'Advanced React Development',
  reason: 'I need to withdraw from the course due to personal circumstances. The course content is excellent, but I no longer have the time to complete it.',
  refundType: 'full'
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

// Test functions
async function testRefundRequestSubmission() {
  logInfo('Testing refund request submission...');
  
  try {
    const response = await axios.post(`${BASE_URL}/refunds/request`, testRefundRequest);
    
    if (response.status === 201 && response.data.success) {
      logSuccess('Refund request submitted successfully');
      logInfo(`Request ID: ${response.data.data.requestId}`);
      logInfo(`Status: ${response.data.data.status}`);
      logInfo(`Processing Time: ${response.data.data.estimatedProcessingTime}`);
      
      return response.data.data.requestId;
    } else {
      logError('Refund request submission failed');
      logError(`Response: ${JSON.stringify(response.data, null, 2)}`);
      return null;
    }
  } catch (error) {
    logError(`Network error: ${error.message}`);
    if (error.response) {
      logError(`Status: ${error.response.status}`);
      logError(`Response: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    return null;
  }
}

async function testRefundRequestValidation() {
  logInfo('Testing refund request validation...');
  
  const invalidRequests = [
    {
      name: '',
      email: 'invalid-email',
      orderId: '',
      courseName: '',
      reason: 'short',
      refundType: 'invalid'
    },
    {
      name: 'A', // too short
      email: 'test@example.com',
      orderId: '123',
      courseName: 'Course',
      reason: 'Valid reason that is long enough',
      refundType: 'full'
    },
    {
      name: 'Valid Name',
      email: 'invalid-email-format',
      orderId: '123',
      courseName: 'Course',
      reason: 'Valid reason that is long enough',
      refundType: 'full'
    }
  ];
  
  for (const [index, invalidRequest] of invalidRequests.entries()) {
    try {
      const response = await axios.post(`${BASE_URL}/refunds/request`, invalidRequest);
      logWarning(`Test ${index + 1}: Expected validation error but got success`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        logSuccess(`Test ${index + 1}: Validation error correctly caught`);
        if (error.response.data.errors) {
          logInfo(`Errors: ${error.response.data.errors.join(', ')}`);
        }
      } else {
        logError(`Test ${index + 1}: Unexpected error: ${error.message}`);
      }
    }
  }
}

async function testPolicyEndpoint() {
  logInfo('Testing policy endpoint...');
  
  try {
    const response = await axios.get(`${BASE_URL}/refunds/policy`);
    
    if (response.status === 200 && response.data.success) {
      logSuccess('Policy endpoint working');
      const policy = response.data.data;
      
      // Verify policy structure
      const requiredSections = ['longTermCourses', 'shortTermCourses', 'usaConsumerProtection', 'duplicatePayment'];
      for (const section of requiredSections) {
        if (policy[section]) {
          logSuccess(`Policy section '${section}' is present`);
        } else {
          logError(`Policy section '${section}' is missing`);
        }
      }
      
      return true;
    } else {
      logError('Policy endpoint failed');
      return false;
    }
  } catch (error) {
    logError(`Policy endpoint error: ${error.message}`);
    return false;
  }
}

async function testStatusEndpoint(requestId) {
  if (!requestId) {
    logWarning('Skipping status test - no valid request ID');
    return;
  }
  
  logInfo('Testing status endpoint...');
  
  try {
    const response = await axios.get(`${BASE_URL}/refunds/status/${requestId}`);
    
    if (response.status === 200 && response.data.success) {
      logSuccess('Status endpoint working');
      logInfo(`Request ID: ${response.data.data.requestId}`);
      logInfo(`Status: ${response.data.data.status}`);
      logInfo(`Created: ${response.data.data.createdAt}`);
    } else {
      logError('Status endpoint failed');
    }
  } catch (error) {
    logError(`Status endpoint error: ${error.message}`);
  }
}

async function testHealthEndpoint() {
  logInfo('Testing health endpoint...');
  
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    
    if (response.status === 200) {
      logSuccess('Health endpoint working');
      logInfo(`Status: ${response.data.status}`);
      logInfo(`Message: ${response.data.message}`);
      return true;
    } else {
      logError('Health endpoint failed');
      return false;
    }
  } catch (error) {
    logError(`Health endpoint error: ${error.message}`);
    return false;
  }
}

// Main test runner
async function runTests() {
  log('\n🧪 Sky States Refund API Test Suite', colors.blue);
  log('=====================================', colors.blue);
  
  const results = {
    health: await testHealthEndpoint(),
    policy: await testPolicyEndpoint(),
    validation: await testRefundRequestValidation(),
    submission: false,
    status: false
  };
  
  const requestId = await testRefundRequestSubmission();
  if (requestId) {
    results.submission = true;
    results.status = await testStatusEndpoint(requestId);
  }
  
  // Summary
  log('\n📊 Test Results Summary', colors.blue);
  log('========================', colors.blue);
  
  let passedTests = 0;
  const totalTests = Object.keys(results).length;
  
  for (const [test, passed] of Object.entries(results)) {
    if (passed) {
      logSuccess(`${test.toUpperCase()}: PASSED`);
      passedTests++;
    } else {
      logError(`${test.toUpperCase()}: FAILED`);
    }
  }
  
  log(`\n🎯 Overall Result: ${passedTests}/${totalTests} tests passed`, 
      passedTests === totalTests ? colors.green : colors.yellow);
  
  if (passedTests === totalTests) {
    log('🎉 All tests passed! The refund API is working correctly.', colors.green);
  } else {
    log('⚠️  Some tests failed. Please check the implementation.', colors.yellow);
  }
  
  log('\n📝 Next Steps:', colors.blue);
  log('1. Ensure the backend server is running on port 5000');
  log('2. Check database connections if tests fail');
  log('3. Verify environment variables are set correctly');
  log('4. Review error logs for detailed information');
  
  process.exit(passedTests === totalTests ? 0 : 1);
}

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logError(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

// Run tests
if (require.main === module) {
  runTests().catch(error => {
    logError(`Test suite failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  testRefundRequestSubmission,
  testRefundRequestValidation,
  testPolicyEndpoint,
  testStatusEndpoint,
  testHealthEndpoint,
  runTests
};
