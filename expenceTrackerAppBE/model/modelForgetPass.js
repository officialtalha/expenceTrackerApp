const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Fp = sequelize.define('forgetPass', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active: {
        type: Sequelize.BOOLEAN
    },
    expiredBy: {
        type: Sequelize.DATE
    }
});

module.exports = Fp;