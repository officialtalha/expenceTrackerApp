const Expense = require('../model/modelExpense');

exports.addExpensePost = async (req, res) => {
    console.log('POST Request');
    try {
        const { amount, description, catogary, userId } = req.body;

        const result = await Expense.create({ amount, description, catogary, userId });
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

exports.addExpenseDelete = async (req, res) => {
    console.log('DELETE Request');
    try {
        const id = req.params.id;

        await Expense.destroy({
            where: {
                id: id
            }
        });
        res.end();
    } catch (err) {
        console.log(err);
    }
};

exports.addExpenseGet = async (req, res) => {
    console.log('GET Request');
    const userId = req.params.userId;
    try {
        const result = await Expense.findAll({
            where: {
                userId: userId
            }
        });
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};