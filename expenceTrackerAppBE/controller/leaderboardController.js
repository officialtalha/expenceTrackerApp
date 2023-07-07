const User = require('../model/modelUser');
const Expense = require('../model/modelExpense');
const sequelize = require('../util/database');

exports.leaderboardGet = async (req, res) => {
    try {
        const allUser = await User.findAll({
            attributes: [
                'id', 'name',
                [sequelize.fn('sum', sequelize.col('amount')), 'totalExpense']
            ],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['user.id']
        });
        // const allExpense = await Expense.findAll({
        //     attributes: [
        //         'userId',
        //         [sequelize.fn('sum', sequelize.col('amount')), 'totalExpense']
        //     ],
        //     group: ['userId']
        // });
        res.status(200).json({ allUser });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'somethong went wrong.', err });
    }
};