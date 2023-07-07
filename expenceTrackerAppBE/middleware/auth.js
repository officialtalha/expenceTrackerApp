const Expense = require('../model/modelExpense');
const jwt = require('jsonwebtoken');
const User = require('../model/modelUser');


exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decode = jwt.verify(token, process.env.JWT_SecretKey);
        const user = await User.findByPk(decode.userId);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
    }
}