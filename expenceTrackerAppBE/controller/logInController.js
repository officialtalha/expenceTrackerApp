const logger = require('../middleware/logger');
const User = require('../model/modelUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.logInPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await User.findOne({
            where: {
                email: email,
            }
        });
        if (result != null) {
            const isMatched = await bcrypt.compare(password, result.password);
            if (isMatched) {
                const userId = result.id;
                const token = jwt.sign({ userId }, process.env.JWT_SecretKey);
                res.status(200).json({ 'message': 'Login Successful', 'flag': true, 'token': token, 'name': result.name });
            } else {
                res.json({ message: "incorrect password", flag: false });
            }
        } else {
            res.json({ message: "user does not exist!", flag: false });
        }
    } catch (err) {
        logger.error(err);
        // console.log(err);
        res.status(500).json({ message: err, flag: false })
    }
};
