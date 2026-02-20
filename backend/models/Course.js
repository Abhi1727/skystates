const { sequelize } = require('../config/database');

const Course = sequelize.define('Course');

module.exports = Course;
