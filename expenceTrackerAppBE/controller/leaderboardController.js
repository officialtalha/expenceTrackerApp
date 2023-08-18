const logger = require('../middleware/logger');
const User = require('../model/modelUser');
const Expense = require('../model/modelExpense');
const sequelize = require('../util/database');
exports.leaderboardGet = async (req, res) => {
    try {
        const allUsers = await User.findAll({
            attributes: [
                'id', 'name', 'totalExpenses'
            ],
            order: [['totalExpenses', 'DESC']]
        });
        // const allUser = await User.findAll({
        //     attributes: [
        //         'id', 'name',
        //         [sequelize.fn('sum', sequelize.col('amount')), 'totalExpense']
        //     ],
        //     include: [
        //         {
        //             model: Expense,
        //             attributes: []
        //         }
        //     ],
        //     group: ['user.id']
        // });
        res.status(200).json({ allUsers });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ success: false, error: err });
    }
};

