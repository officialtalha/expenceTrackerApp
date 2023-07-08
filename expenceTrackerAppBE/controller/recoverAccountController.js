const nodemailer = require('nodemailer');
const Otp = require('../model/modelOtp');
exports.recoverAccountGet = async (req, res) => {
    console.log('Recover-GET');
    try {
        const otp = Math.floor(Math.random() * 1000000).toString();
        await Otp.create({
            otp: otp
        });
        const { email, name } = req.body;

        const config = {
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        }
        const transporter = nodemailer.createTransport(config);
        const message = {
            from: process.env.GMAIL_USER, // sender address
            to: email, // list of receivers
            subject: "OTP", // Subject line
            text: "Expense tracker", // plain text body
            html: `<b>${otp}</b>`, // html body
        }
        const data = await transporter.sendMail(message);
        // console.log(data);
        res.status(201).json({ info: data.messageId, preview: nodemailer.getTestMessageUrl(data), success: true, error: false });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};