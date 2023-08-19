const logger = require('../middleware/logger');
const uuid = require('uuid');
const User = require('../model/modelUser');
const fP = require('../model/modelForgetPass');
const { createTransport } = require('nodemailer');

exports.recoverAccountPost = async (req, res) => {
    try {
        const { email, name } = req.body;
        const result = await User.findAll({
            where: {
                email: email,
                name: name
            }
        });
        if (result.length > 0) {
            const userId = result[0].dataValues.id;
            const id = uuid.v4();
            //making all the old link expire for this user
            await fP.update({
                active: false
            }, {
                where: {
                    userId: userId
                }
            });
            //creating new link for this user
            await fP.create({
                id: id,
                active: true,
                userId: userId,
                expiredBy: new Date()
            });

            // SIB code starts
            const transporter = createTransport({
                host: "smtp-relay.sendinblue.com",
                port: 587,
                auth: {
                    user: process.env.SIB_LOGIN,
                    pass: process.env.SIB_PASS,
                },
            });

            const mailOptions = {
                from: process.env.SIB_LOGIN,
                to: email,
                subject: `Recover link to ${name}`,
                text: "Expense tracker",
                html: `<b>http://localhost:3000/new-password/${id}</b>
                        <a href="http://localhost:3000/new-password/${id}" target="_blank">Click Here</a>`, // html body
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    logger.error(error);
                    res.json({ success: false });
                } else {
                    logger.info('Email sent: ' + info.response);
                    res.status(200).json({ success: true });
                }
            });
            // SIB code ends

        } else {
            res.status(200).json({ success: false });
        }
        // console.log(data);
    } catch (err) {
        logger.error(error);
        return res.status(500).json({ success: false, error: err });
    }
};

