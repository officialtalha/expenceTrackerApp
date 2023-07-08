const User = require('../model/modelUser');
exports.checkPremiumGet = async (req, res) => {
    id = req.user.id;
    const result = await User.findAll({
        attributes: [
            'isPremium'
        ],
        where: {
            id: id
        }
    });
    console.log(result);
    res.send(result);
};