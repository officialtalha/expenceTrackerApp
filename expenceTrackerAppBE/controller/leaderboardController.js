const User = require('../model/modelUser');
const Expense = require('../model/modelExpense');

exports.leaderboardGet = async (req, res) => {
    try {
        const allUser = await User.findAll();
        const allExpense = await Expense.findAll();
        res.status(200).json({ allUser, allExpense });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'somethong went wrong.', err });
    }
};