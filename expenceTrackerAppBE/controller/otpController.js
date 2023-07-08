const Otp = require('../model/modelOtp');
exports.otpPost = async (req, res) => {
    console.log('OTP POST');
    const { otp } = req.body;
    try {
        const result = await Otp.findAll({
            where: {
                otp: otp
            }
        });
        if (result.length > 0) {
            res.status(200).json({ success: true });
            await Otp.destroy({
                where: {
                    otp: otp
                }
            });
        } else {
            res.status(200).json({ success: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};