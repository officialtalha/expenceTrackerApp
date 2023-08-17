const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;