const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const DL = sequelize.define('downloadLink', {
    link: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = DL;