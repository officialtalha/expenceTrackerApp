// const nodemailer = require('nodemailer');
const uuid = require('uuid');
const User = require('../model/modelUser');
const fP = require('../model/modelForgetPass');
const Mailjet = require('node-mailjet');
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
            // await fP.update({
            //     active: false
            // }, {
            //     where: {
            //         userId: userId
            //     }
            // });
            await fP.create({
                id: id,
                active: true,
                userId: userId,
                expiredBy: new Date()
            });
            //nodemailer code start
            // const config = {
            //     service: 'gmail',
            //     auth: {
            //         user: process.env.GMAIL_USER,
            //         pass: process.env.GMAIL_PASS
            //     }
            // }
            // const transporter = nodemailer.createTransport(config);
            // const message = {
            //     from: process.env.GMAIL_USER, // sender address
            //     to: email, // list of receivers
            //     subject: "Recover link", // Subject line
            //     text: "Expense tracker", // plain text body
            //     html: `<b>http://localhost:3000/new-password/${id}</b>
            //             <a href="http://localhost:3000/new-password/${id}" target="_blank">Click Here</a>`, // html body
            // }
            // const data = await transporter.sendMail(message);
            // nodemailer code ends
            // MAILJET code starts 
            const mailjet = Mailjet.apiConnect(
                process.env.MAILJET_API_KEY,
                process.env.MAILJET_API_SECRET_KEY,
            );

            const request = mailjet
                .post('send', { version: 'v3.1' })
                .request({
                    Messages: [
                        {
                            From: {
                                Email: "alam.shane272@gmail.com",
                                Name: "Talha"
                            },
                            To: [
                                {
                                    Email: email,
                                    Name: name
                                }
                            ],
                            Subject: "Your email flight plan!",
                            TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                            HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
                        }
                    ]
                })

            request
                .then((result) => {
                    console.log(result.body)
                })
                .catch((err) => {
                    console.log(err.statusCode)
                })
            //MAILJET code ends
            // res.status(200).json({ info: data.messageId, preview: nodemailer.getTestMessageUrl(data), success: true, error: false });
        } else {
            res.status(200).json({ success: false });
        }
        // console.log(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

