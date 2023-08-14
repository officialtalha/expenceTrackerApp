const aws = require('aws-sdk');
const Expense = require('../model/modelExpense');
const DL = require('../model/modelDownloadLink');

exports.downloadGet = async (req, res) => {
    console.log('downloadGet request');
    try {
        const userId = req.user.id;
        const fileName = `file${userId}/${new Date()}.txt`;

        //fetching expenses for perticular user
        const expenses = await Expense.findAll({
            attributes: ['amount', 'description', 'catogary'],
            where: {
                userId: userId
            }
        });
        const data = JSON.stringify(expenses);

        //init aws 
        let s3Bucket = await new aws.S3({
            accessKeyId: process.env.AWS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
        //setup s3 bucket
        let params = {
            Bucket: "myexpensetrackerapp",
            Key: fileName,
            Body: data,
            ACL: 'public-read'
        }
        //uploading data to the s3 bucket
        await s3Bucket.upload(params, async (err, response) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(response.Location);
                res.status(200).json({ success: true, link: response.Location });
                await DL.create({
                    link: response.Location,
                    userId: userId
                });
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err });
    }
};