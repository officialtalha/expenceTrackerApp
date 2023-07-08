const User = require('../model/modelUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.newPassPost = async (req, res) => {
    console.log('newPass POST');
    const { p1, p2, token } = req.body;
    const decode = jwt.verify(token, process.env.JWT_SecretKey);
    try {
        if (p1 == p2) {
            const hash = await bcrypt.hash(p1, 10);
            await User.update({
                password: hash,
            },
                {
                    where: {
                        id: decode.userId
                    }
                });
            res.status(200).json({ success: true });
        } else {
            res.status(200).json({ success: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};