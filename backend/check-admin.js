const { connectDB, User } = require('./config/sqlite-database');

async function checkAndCreateAdmin() {
  try {
    await connectDB();
    
    // Check if admin user exists
    const adminUser = await User.findByEmail('admin@example.com');
    
    if (adminUser) {
      console.log('Admin user found:', adminUser.toJSON());
    } else {
      console.log('Admin user not found, creating...');
      
      // Create admin user
      const admin = await User.create({
        id: 'demo-employer',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
      });
      
      console.log('Admin user created:', admin.toJSON());
    }
    
    // Test password comparison
    const testUser = await User.findByEmail('admin@example.com');
    const isMatch = await testUser.comparePassword('admin123');
    console.log('Password match test:', isMatch);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkAndCreateAdmin();
