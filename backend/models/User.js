const { sequelize } = require('../config/database');

const User = sequelize.define('User');

module.exports = User;
