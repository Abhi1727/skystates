const { sequelize } = require('../config/database');

const Job = sequelize.define('Job');

module.exports = Job;
