const logger = require('../middleware/logger');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const Order = require('../model/modelOrder');
const User = require('../model/modelUser');
const instance = new Razorpay({
    key_id: process.env.RZP_key_id,
    key_secret: process.env.RZP_key_secret
});


exports.premiumGet = async (req, res) => {
    try {
        const amount = 100;
        instance.orders.create({ amount, currency: "INR" }, async (err, order) => {
            try {
                if (err) {
                    logger.error(err);
                    return res.json({ message: 'somthing error: ' + err });
                }
                await Order.create({
                    paymentid: "nil",
                    orderid: order.id,
                    status: "pending",
                    userId: req.user.id
                });
                return res.status(200).json({ order, key_id: process.env.RZP_key_id });
            } catch (err) {
                logger.error(err);
            }
        });
    } catch (err) {
        logger.error(err);
    }
};

exports.premiumPost = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_SecretKey);
        const payment_id = req.body.payment_id;
        const { id, status } = req.body.order_id;
        await Order.update({
            status: status,
            paymentid: payment_id
        },
            {
                where: {
                    userId: decoded.userId
                }
            });
        await User.update({
            isPremium: true
        }, {
            where: {
                id: decoded.userId
            }
        });
        res.end();
    } catch (err) {
        logger.error(err);
    }
};