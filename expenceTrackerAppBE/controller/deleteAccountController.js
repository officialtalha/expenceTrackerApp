const jwt = require('jsonwebtoken');
const User = require('../model/modelUser');
const Expense = require('../model/modelExpense');
exports.deleteAccountDelete = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_SecretKey);
        await Expense.destroy({
            where: {
                userId: decoded.userId
            }
        });
        await User.destroy({
            where: {
                id: decoded.userId
            }
        });
        res.end();
    } catch (err) {
        console.log(err);
    }
};