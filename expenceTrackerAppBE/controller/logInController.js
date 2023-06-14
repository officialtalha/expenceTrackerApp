const User = require('../model/modelCreation');

exports.logInPost = async (req, res) => {
    try {
        console.log('POST Request');
        const { email, password } = req.body;

        const result = await User.findAll({
            where: {
                email: email,
                password: password
            }
        });
        if (result.length != 0) {
            res.send(`LogIn Successful!`);
        } else {
            res.send(`LogIn failed!`);
        }
    } catch (err) {
        console.log(err);
    }
};