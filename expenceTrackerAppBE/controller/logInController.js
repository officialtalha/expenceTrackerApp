const User = require('../model/modelCreation');
const bcrypt = require('bcrypt');
exports.logInPost = async (req, res) => {
    try {
        console.log('POST Request');
        const { email, password } = req.body;

        const result = await User.findOne({
            where: {
                email: email,
            }
        });
        if (result != null) {
            const match = await bcrypt.compare(password, result.password);
            if (match) {
                res.send(`LogIn Successful!`);
            } else {
                res.send(`LogIn failed!`);
            }
        } else {
            res.send('user does not exist!');
        }
    } catch (err) {
        console.log(err);
    }
};