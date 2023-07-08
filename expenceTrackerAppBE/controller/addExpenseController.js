const Expense = require('../model/modelExpense');
const User = require('../model/modelUser');
const sequelize = require('../util/database');
const jwt = require('jsonwebtoken');

exports.addExpensePost = async (req, res) => {
    console.log('POST Request');
    const t = await sequelize.transaction();
    try {
        const { amount, description, catogary, token } = req.body;

        const decode = jwt.verify(token, process.env.JWT_SecretKey);
        const userId = decode.userId;
        const result = await Expense.create({ amount, description, catogary, userId }, { transaction: t });
        const allExpense = await Expense.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('amount')), 'totalExpense']
            ],
            group: ['userId'],
            where: {
                userId: userId
            },
            transaction: t
        });
        await User.update({
            totalExpenses: allExpense[0].dataValues.totalExpense,
        },
            {
                where: {
                    id: userId
                },
                transaction: t
            }
        );
        await t.commit();
        res.json(result);
    } catch (err) {
        await t.rollback();
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

exports.addExpenseDelete = async (req, res) => {
    console.log('DELETE Request');
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const token = req.header('Authorization');
        const decode = jwt.verify(token, process.env.JWT_SecretKey);

        const amount = await Expense.findAll({
            attributes: [
                'amount'
            ],
            where: {
                id: id
            },
            transaction: t
        });

        await Expense.destroy({
            where: {
                id: id
            },
            transaction: t
        });
        const totalExpenses = await User.findAll({
            attributes: [
                'totalExpenses'
            ],
            where: {
                id: decode.userId
            },
            transaction: t
        });

        const finalAmount = totalExpenses[0].dataValues.totalExpenses - amount[0].dataValues.amount;
        await User.update({
            totalExpenses: finalAmount,
        },
            {
                where: {
                    id: decode.userId
                },
                transaction: t
            }
        );
        await t.commit();
        res.end();
    } catch (err) {
        await t.rollback();
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

exports.addExpenseGet = async (req, res) => {
    console.log('GET Request');
    try {
        const user = req.user;
        const result = await Expense.findAll({
            where: {
                userId: user.id
            }
        });
        res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};