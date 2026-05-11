const { connectDB, User } = require('./config/sqlite-database');

async function fixAdminPassword() {
  try {
    await connectDB();
    
    // Find admin user
    const adminUser = await User.findByEmail('admin@example.com');
    
    if (adminUser) {
      // Update password with proper hash
      await adminUser.update({ password: 'admin123' });
      console.log('Admin password updated successfully');
      
      // Test password comparison
      const testUser = await User.findByEmail('admin@example.com');
      const isMatch = await testUser.comparePassword('admin123');
      console.log('Password match test:', isMatch);
    } else {
      console.log('Admin user not found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

fixAdminPassword();
