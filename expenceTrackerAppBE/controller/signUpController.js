const logger = require('../middleware/logger');
const path = require('path');
const User = require('../model/modelUser');
const bcrypt = require('bcrypt');
exports.signUpPost = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const ifExist = await User.findAll({
            where: {
                email: email
            }
        });
        if (ifExist.length > 0) {
            res.json({ message: 'user aready exist', flag: false });
        } else {
            const hash = await bcrypt.hash(password, 10);
            await User.create({ name, email, password: hash });
            res.status(200).json({ message: 'Sign Up Successful!', flag: true, });
        }
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err, flag: false });
    }

};
