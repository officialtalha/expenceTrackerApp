const logger = require('../middleware/logger');
const User = require('../model/modelUser');

exports.checkPremiumGet = async (req, res) => {
    try {
        const id = req.user.id;
        const result = await User.findAll({
            attributes: [
                'isPremium'
            ],
            where: {
                id: id
            }
        });
        res.json({ success: true, result });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ status: false, err });
    }
};