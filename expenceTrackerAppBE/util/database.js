const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;