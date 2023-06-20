const Order = require('../model/modelOrder');
exports.checkPremiumGet = async (req, res) => {
    id = req.user.id;
    const result = await Order.findAll({
        where: {
            userId: id
        }
    });
    console.log(result);
    res.send(result);
    res.end();
};