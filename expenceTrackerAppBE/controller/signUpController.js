const path = require('path');
const User = require('../model/modelUser');
const bcrypt = require('bcrypt');
exports.signUpPost = async (req, res) => {
    console.log('POST Request');
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
            res.json({ message: 'Sign Up Successful!', flag: true, });
        }
    } catch (err) {
        res.json({ message: err, flag: false });
        console.log(err);
    }

};
