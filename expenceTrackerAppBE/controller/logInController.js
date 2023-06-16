const User = require('../model/modelUser');
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
                res.json({ message: "Login Successful", flag: true, id: result.id });
            } else {
                res.json({ message: "incorrect password", flag: false });
            }
        } else {
            res.json({ message: "user does not exist!", flag: false });
        }
    } catch (err) {
        res.json({ message: err, flag: false })
        console.log(err);
    }
};