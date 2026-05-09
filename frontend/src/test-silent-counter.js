import React from 'react';
import useSilentScheduledCounter from './hooks/useSilentScheduledCounter';

const TestSilentCounter = () => {
  const { counter, isAnimating } = useSilentScheduledCounter(
    'test_course',
    100, // Base value
    1,   // Min increment
    3    // Max increment
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Silent Scheduled Counter Test</h2>
      <p>Current Counter: <strong>{counter}</strong></p>
      <p>Is Animating: <strong>{isAnimating ? 'Yes' : 'No'}</strong></p>
      <p>Updates daily at 6 PM IST (12:30 PM UTC)</p>
      <p>Increment range: 1-3 students per day</p>
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
        <h3>How it works:</h3>
        <ul>
          <li>Counter initializes with base value (100)</li>
          <li>Checks localStorage for previous values</li>
          <li>Updates silently at 6 PM IST daily</li>
          <li>Adds random increment (1-3) each day</li>
          <li>No notifications - completely silent</li>
          <li>Persists across browser sessions</li>
        </ul>
      </div>
    </div>
  );
};

export default TestSilentCounter;
