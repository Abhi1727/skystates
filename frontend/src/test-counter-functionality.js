import React, { useState, useEffect } from 'react';
import useSilentScheduledCounter from './hooks/useSilentScheduledCounter';

const TestCounterFunctionality = () => {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Test the counter with different configurations
  const { counter: testCounter1, isAnimating: animating1 } = useSilentScheduledCounter(
    'test_course_1',
    100, // Base value
    1,   // Min increment
    3    // Max increment
  );

  const { counter: testCounter2, isAnimating: animating2 } = useSilentScheduledCounter(
    'test_course_2',
    500, // Base value
    2,   // Min increment
    5    // Max increment
  );

  const runTests = () => {
    setIsRunning(true);
    const results = [];

    // Test 1: Check if counters initialize with base values
    results.push({
      test: 'Initialization Test',
      expected: 'Counters should initialize with base values',
      actual: `Counter 1: ${testCounter1}, Counter 2: ${testCounter2}`,
      status: testCounter1 >= 100 && testCounter2 >= 500 ? 'PASS' : 'FAIL'
    });

    // Test 2: Check localStorage functionality
    try {
      const storageKey1 = 'silentCounter_test_course_1';
      const storedData1 = localStorage.getItem(storageKey1);
      results.push({
        test: 'LocalStorage Test',
        expected: 'Data should be stored in localStorage',
        actual: storedData1 ? 'Data found in localStorage' : 'No data in localStorage',
        status: storedData1 ? 'PASS' : 'FAIL'
      });
    } catch (error) {
      results.push({
        test: 'LocalStorage Test',
        expected: 'Data should be stored in localStorage',
        actual: `Error: ${error.message}`,
        status: 'FAIL'
      });
    }

    // Test 3: Check time zone logic
    const now = new Date();
    const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    const utcTime = new Date(now.toUTCString());
    
    results.push({
      test: 'Time Zone Test',
      expected: 'IST and UTC times should be different',
      actual: `IST: ${istTime.getHours()}:${istTime.getMinutes()}, UTC: ${utcTime.getHours()}:${utcTime.getMinutes()}`,
      status: istTime.getHours() !== utcTime.getHours() ? 'PASS' : 'FAIL'
    });

    // Test 4: Check animation state
    results.push({
      test: 'Animation State Test',
      expected: 'Animation state should be boolean',
      actual: `Animating 1: ${typeof animating1}, Animating 2: ${typeof animating2}`,
      status: (typeof animating1 === 'boolean' && typeof animating2 === 'boolean') ? 'PASS' : 'FAIL'
    });

    // Test 5: Check increment range logic
    const increment1 = testCounter1 - 100;
    const increment2 = testCounter2 - 500;
    
    results.push({
      test: 'Increment Range Test',
      expected: 'Increments should be within specified ranges',
      actual: `Counter 1 increment: ${increment1}, Counter 2 increment: ${increment2}`,
      status: (increment1 >= 0 && increment1 <= 3) && (increment2 >= 0 && increment2 <= 5) ? 'PASS' : 'FAIL'
    });

    setTestResults(results);
    setTimeout(() => setIsRunning(false), 1000);
  };

  const clearTestData = () => {
    try {
      localStorage.removeItem('silentCounter_test_course_1');
      localStorage.removeItem('silentCounter_test_course_2');
      window.location.reload();
    } catch (error) {
      console.error('Error clearing test data:', error);
    }
  };

  const simulateTimeUpdate = () => {
    // This simulates what happens when the scheduled update time passes
    const storageKey1 = 'silentCounter_test_course_1';
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    try {
      const storedData = localStorage.getItem(storageKey1);
      if (storedData) {
        const data = JSON.parse(storedData);
        // Manually set lastUpdate to yesterday to trigger update
        localStorage.setItem(storageKey1, JSON.stringify({
          ...data,
          lastUpdate: yesterdayStr
        }));
        alert('Test data updated to simulate time passage. Refresh to see changes.');
      }
    } catch (error) {
      console.error('Error simulating time update:', error);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>Silent Scheduled Counter - Functionality Test</h1>
      
      <div style={{ 
        background: '#f0f8ff', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px' 
      }}>
        <h3>Current Counter Values:</h3>
        <p><strong>Test Counter 1 (Base: 100, Range: 1-3):</strong> {testCounter1}</p>
        <p><strong>Test Counter 2 (Base: 500, Range: 2-5):</strong> {testCounter2}</p>
        <p><strong>Animation Status:</strong> Counter 1: {animating1 ? 'Animating' : 'Static'}, Counter 2: {animating2 ? 'Animating' : 'Static'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runTests}
          disabled={isRunning}
          style={{
            padding: '10px 20px',
            background: isRunning ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>
        
        <button 
          onClick={simulateTimeUpdate}
          style={{
            padding: '10px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Simulate Time Update
        </button>
        
        <button 
          onClick={clearTestData}
          style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear Test Data
        </button>
      </div>

      {testResults.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Test Results:</h2>
          {testResults.map((result, index) => (
            <div 
              key={index}
              style={{
                padding: '10px',
                margin: '5px 0',
                borderRadius: '5px',
                background: result.status === 'PASS' ? '#d4edda' : '#f8d7da',
                border: `1px solid ${result.status === 'PASS' ? '#c3e6cb' : '#f5c6cb'}`
              }}
            >
              <h4 style={{ margin: '0 0 5px 0' }}>
                {result.test} - 
                <span style={{ 
                  color: result.status === 'PASS' ? '#155724' : '#721c24',
                  fontWeight: 'bold'
                }}>
                  {' '}{result.status}
                </span>
              </h4>
              <p style={{ margin: '0', fontSize: '14px' }}>
                <strong>Expected:</strong> {result.expected}
              </p>
              <p style={{ margin: '0', fontSize: '14px' }}>
                <strong>Actual:</strong> {result.actual}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        background: '#e9ecef', 
        borderRadius: '8px' 
      }}>
        <h3>Manual Testing Instructions:</h3>
        <ol>
          <li>Click "Run Tests" to verify basic functionality</li>
          <li>Check localStorage for data persistence</li>
          <li>Use "Simulate Time Update" to test scheduled updates</li>
          <li>Refresh page to test initialization</li>
          <li>Monitor console for update logs at 6 PM IST (12:30 PM UTC)</li>
        </ol>
        
        <h4>Expected Behavior:</h4>
        <ul>
          <li>Counters initialize with base values on first load</li>
          <li>Data persists in localStorage</li>
          <li>Silent updates occur at scheduled time</li>
          <li>No user notifications during updates</li>
          <li>Smooth animations when displaying new values</li>
        </ul>
      </div>
    </div>
  );
};

export default TestCounterFunctionality;
