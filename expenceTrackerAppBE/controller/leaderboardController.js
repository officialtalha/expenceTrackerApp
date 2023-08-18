const User = require('../model/modelUser');
const Expense = require('../model/modelExpense');
const sequelize = require('../util/database');
const logger = require('../middleware/logger');

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
        logger.info('hello i m info');
        res.status(200).json({ allUsers });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err });
    }
};

