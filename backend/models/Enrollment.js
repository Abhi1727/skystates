const { sequelize } = require('../config/database');

const Enrollment = sequelize.define('Enrollment');

module.exports = Enrollment;
