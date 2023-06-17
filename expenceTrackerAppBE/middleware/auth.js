const Expense = require('../model/modelExpense');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey');
const User = require('../model/modelUser');


exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        const decode = jwt.verify(token, secretKey);
        const user = await User.findByPk(decode.userId);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
    }
}