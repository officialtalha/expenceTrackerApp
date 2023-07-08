const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Otp = sequelize.define('otp', {
    otp: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Otp;