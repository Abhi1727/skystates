const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => Date.now().toString()
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 200]
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [50, 5000]
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: DataTypes.ENUM('Full Time', 'Part Time', 'Contract', 'Internship', 'Remote'),
      allowNull: false,
      defaultValue: 'Full Time'
    },
    experience: {
      type: DataTypes.ENUM('Entry Level', 'Mid Level', 'Senior Level', 'Executive'),
      allowNull: false,
      defaultValue: 'Mid Level'
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD'
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    requirements: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    benefits: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    postedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    applicationDeadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    applicationCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ratingAverage: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    applications: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    }
  }, {
    tableName: 'Jobs',
    timestamps: true,
    indexes: [
      {
        fields: ['title']
      },
      {
        fields: ['company']
      },
      {
        fields: ['location']
      },
      {
        fields: ['type']
      },
      {
        fields: ['experience']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['isFeatured']
      },
      {
        fields: ['postedBy']
      },
      {
        fields: ['createdAt']
      }
    ]
  });

  // Instance methods
  Job.prototype.incrementViews = async function() {
    this.views += 1;
    await this.save();
  };

  Job.prototype.addApplication = async function(applicationData) {
    const applications = this.applications || [];
    
    // Check if user has already applied
    const existingApplication = applications.find(
      app => app.applicant === applicationData.applicant
    );
    
    if (existingApplication) {
      throw new Error('User has already applied for this job');
    }
    
    applications.push({
      ...applicationData,
      appliedAt: new Date()
    });
    
    this.applications = applications;
    this.applicationCount = applications.length;
    await this.save();
  };

  // Class methods
  Job.findActive = function(options = {}) {
    return this.findAll({
      where: { isActive: true },
      ...options
    });
  };

  Job.findFeatured = function(options = {}) {
    return this.findAll({
      where: { 
        isActive: true,
        isFeatured: true 
      },
      ...options
    });
  };

  Job.search = function(query, options = {}) {
    const { Op } = require('sequelize');
    
    return this.findAll({
      where: {
        [Op.and]: [
          { isActive: true },
          {
            [Op.or]: [
              { title: { [Op.like]: `%${query}%` } },
              { company: { [Op.like]: `%${query}%` } },
              { description: { [Op.like]: `%${query}%` } },
              { location: { [Op.like]: `%${query}%` } }
            ]
          }
        ]
      },
      ...options
    });
  };

  return Job;
};
