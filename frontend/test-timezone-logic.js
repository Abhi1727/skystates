// Test IST to UTC conversion logic
const testTimeZoneLogic = () => {
  console.log('🕐 Testing IST to UTC Conversion Logic...\n');

  // Test the time conversion logic from the hook
  const checkIfScheduledUpdatePassed = (lastUpdateDate) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    if (lastUpdateDate !== today) {
      // 6 PM IST = 12:30 PM UTC
      const updateTimeUTC = { hours: 12, minutes: 30 };
      
      const currentUTC = {
        hours: now.getUTCHours(),
        minutes: now.getUTCMinutes()
      };
      
      const currentTimeInMinutes = currentUTC.hours * 60 + currentUTC.minutes;
      const updateTimeInMinutes = updateTimeUTC.hours * 60 + updateTimeUTC.minutes;
      
      return currentTimeInMinutes >= updateTimeInMinutes;
    }
    
    return false;
  };

  // Test current time
  const now = new Date();
  const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
  const utcTime = new Date(now.toUTCString());
  
  console.log('Current Time Information:');
  console.log(`Local Time: ${now.toLocaleString()}`);
  console.log(`IST Time: ${istTime.toLocaleString()}`);
  console.log(`UTC Time: ${utcTime.toUTCString()}`);
  console.log(`UTC Hours: ${utcTime.getUTCHours()}:${utcTime.getUTCMinutes()}`);
  console.log(`Scheduled Update Time: 12:30 PM UTC (6:00 PM IST)\n`);

  // Test the update condition
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  const shouldUpdate = checkIfScheduledUpdatePassed(yesterdayStr);
  
  console.log('Update Logic Test:');
  console.log(`Last Update: ${yesterdayStr}`);
  console.log(`Should Update Now: ${shouldUpdate}`);
  
  // Test different times of day
  console.log('\n🕐 Testing Different Times of Day:');
  
  const testTimes = [
    { hours: 8, minutes: 0, name: '8:00 AM UTC' },    // Before update time
    { hours: 12, minutes: 30, name: '12:30 PM UTC' }, // Exactly update time
    { hours: 15, minutes: 45, name: '3:45 PM UTC' }, // After update time
    { hours: 20, minutes: 0, name: '8:00 PM UTC' },   // Evening
  ];
  
  testTimes.forEach(testTime => {
    const testTimeInMinutes = testTime.hours * 60 + testTime.minutes;
    const updateTimeInMinutes = 12 * 60 + 30; // 12:30 PM UTC
    const wouldUpdate = testTimeInMinutes >= updateTimeInMinutes;
    
    console.log(`${testTime.name}: ${wouldUpdate ? '✅ WOULD UPDATE' : '❌ NO UPDATE'}`);
  });
  
  console.log('\n📊 Storage Key Test:');
  const courseKey = 'dataScienceAI_shortTerm';
  const storageKey = `silentCounter_${courseKey}`;
  console.log(`Storage Key: ${storageKey}`);
  
  console.log('\n✅ Time Zone Logic Test Complete');
};

// Run the test
testTimeZoneLogic();
