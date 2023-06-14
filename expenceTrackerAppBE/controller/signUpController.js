const User = require('../model/modelCreation');

exports.signUpPost = async (req, res) => {
    console.log('POST Request');
    try {
        const { name, email, password } = req.body;

        const ifExist = await User.findAll({
            where: {
                email: email
            }
        });
        if (ifExist.length != 0) {
            res.send('user aready exist');
        } else {
            const result = await User.create({ name, email, password });
            res.send('Sign Up Successful!');
        }
    } catch (err) {
        console.log(err);
    }

};