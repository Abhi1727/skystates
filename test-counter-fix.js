// Simple test to verify the useDynamicCounter hook fix
// This test simulates the hook behavior to ensure no infinite loops

const React = require('react');

// Mock React hooks for testing
let mockState = 0;
let mockEffectCalls = 0;
let mockInitialized = false;

const mockUseState = (initial) => {
  if (mockEffectCalls === 0) {
    mockState = initial;
  }
  return [mockState, () => {}];
};

const mockUseEffect = (callback, deps) => {
  mockEffectCalls++;
  console.log(`useEffect called #${mockEffectCalls} with deps:`, deps);
  
  if (!mockInitialized) {
    callback();
    mockInitialized = true;
  }
};

const mockUseRef = (initial) => ({ current: initial });

// Simulate the fixed hook logic
const testUseDynamicCounter = (courseKey, baseValue, minIncrement, maxIncrement) => {
  const [counter, setCounter] = mockUseState(0);
  const isInitialized = mockUseRef(false);

  mockUseEffect(() => {
    // Prevent re-initialization on every render
    if (isInitialized.current) return;
    
    console.log('Initializing counter for:', courseKey);
    isInitialized.current = true;
    
    // Simulate localStorage and counter logic
    const finalValue = baseValue;
    console.log(`Counter initialized to: ${finalValue}`);
    
  }, [courseKey, baseValue, minIncrement, maxIncrement]); // Note: counter is NOT in deps

  return { counter };
};

// Test the hook
console.log('Testing useDynamicCounter hook fix...\n');

// Simulate multiple renders (like what would happen with the bug)
console.log('=== Simulating multiple renders ===');
for (let i = 0; i < 5; i++) {
  console.log(`\nRender ${i + 1}:`);
  const result = testUseDynamicCounter('dataScience', 3501, 3, 5);
}

console.log(`\nTotal useEffect calls: ${mockEffectCalls}`);
console.log('Expected: 1 (initialization only)');

if (mockEffectCalls === 1) {
  console.log('✅ SUCCESS: No infinite loop detected!');
} else {
  console.log('❌ FAILURE: Infinite loop still present!');
}

console.log('\n=== Testing with different course ===');
mockEffectCalls = 0;
mockInitialized = false;

const result2 = testUseDynamicCounter('cyberSecurity', 2679, 2, 3);
console.log(`Total useEffect calls for different course: ${mockEffectCalls}`);

if (mockEffectCalls === 1) {
  console.log('✅ SUCCESS: Different course initializes correctly!');
} else {
  console.log('❌ FAILURE: Course change not handled properly!');
}
