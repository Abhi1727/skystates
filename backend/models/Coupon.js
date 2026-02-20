const { sequelize } = require('../config/database');

const Coupon = sequelize.define('Coupon');

module.exports = Coupon;
