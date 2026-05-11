const sqlite3 = require('sqlite3').verbose();
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Create SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: console.log,
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true
  }
});

// Import models
const User = require('../models/User')(sequelize, DataTypes);
const Job = require('../models/Job')(sequelize, DataTypes);

// Define associations
const associateModels = () => {
  // User-Job relationships
  User.hasMany(Job, { foreignKey: 'postedBy', as: 'postedJobs' });
  Job.belongsTo(User, { foreignKey: 'postedBy', as: 'poster' });
};

const connectDB = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('SQLite connection established successfully');

    // Sync all models
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully');

    // Set up associations
    associateModels();

    // Seed initial data if needed
    await seedInitialData();

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

const seedInitialData = async () => {
  try {
    // Check if users exist
    const userCount = await User.count();
    if (userCount === 0) {
      // Create demo users
      await User.bulkCreate([
        {
          id: 'demo-user-1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LFvO.', // password123
          role: 'student',
          isActive: true
        },
        {
          id: 'demo-instructor',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LFvO.', // password123
          role: 'instructor',
          isActive: true
        },
        {
          id: 'demo-employer',
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'admin@example.com',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LFvO.', // admin123
          role: 'admin',
          isActive: true
        }
      ]);
      console.log('Demo users created');
    }

    // Check if jobs exist
    const jobCount = await Job.count();
    if (jobCount === 0) {
      // Create demo jobs
      await Job.bulkCreate([
        {
          id: '1',
          title: 'Frontend Developer',
          slug: 'frontend-dev',
          company: 'Tech Company',
          description: 'Looking for an experienced frontend developer with React expertise',
          location: 'Remote',
          type: 'Full Time',
          experience: 'Mid Level',
          salary: '$80k - $100k',
          currency: 'USD',
          skills: ['React', 'JavaScript', 'CSS', 'HTML'],
          requirements: ['3+ years of experience', 'Strong React skills', 'Good communication'],
          benefits: ['Health insurance', 'Remote work', 'Flexible hours'],
          postedBy: 'demo-employer',
          isActive: true,
          isFeatured: false,
          views: 245,
          applicationCount: 0
        },
        {
          id: '2',
          title: 'Full Stack Engineer',
          slug: 'fullstack-engineer',
          company: 'Startup Inc',
          description: 'Join our team as a full stack engineer working on cutting-edge projects',
          location: 'San Francisco, CA',
          type: 'Full Time',
          experience: 'Senior Level',
          salary: '$120k - $150k',
          currency: 'USD',
          skills: ['Node.js', 'React', 'MongoDB', 'Express'],
          requirements: ['5+ years of experience', 'Full stack development', 'System design'],
          benefits: ['Equity options', 'Health benefits', 'Growth opportunities'],
          postedBy: 'demo-employer',
          isActive: true,
          isFeatured: true,
          views: 189,
          applicationCount: 0
        },
        {
          id: '3',
          title: 'Data Scientist',
          slug: 'data-scientist',
          company: 'AI Analytics',
          description: 'Seeking a data scientist to work on machine learning projects',
          location: 'New York, NY',
          type: 'Full Time',
          experience: 'Senior Level',
          salary: '$130k - $160k',
          currency: 'USD',
          skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
          requirements: ['PhD or Masters in relevant field', 'Strong programming skills', 'ML experience'],
          benefits: ['Research budget', 'Conference attendance', 'Flexible schedule'],
          postedBy: 'demo-employer',
          isActive: true,
          isFeatured: true,
          views: 156,
          applicationCount: 0
        }
      ]);
      console.log('Demo jobs created');
    }

  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
};

module.exports = { 
  sequelize, 
  connectDB, 
  User, 
  Job 
};
