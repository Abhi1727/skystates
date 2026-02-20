const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');
const User = require('../models/User');

const createDefaultAdmin = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({
      where: { email: 'admin@skystates.com' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);

    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@skystates.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      emailVerified: true,
      phone: '+1234567890',
      bio: 'Default administrator account for Sky States platform',
      preferences: {
        notifications: {
          email: true,
          sms: false
        },
        language: 'english'
      }
    });

    console.log('Default admin user created successfully');
    console.log('Email: admin@skystates.com');
    console.log('Password: admin123');
    console.log('Please change the default password after first login!');
    
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
};

// Run if this file is executed directly
if (require.main === module) {
  createDefaultAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = createDefaultAdmin;
