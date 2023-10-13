const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isPremium: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
    },
    totalExpenses: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
});

module.exports = User;