const DL = require('../model/modelDownloadLink');
exports.downloadLinkGet = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await DL.findAll({
            attributes: ['link', 'createdAt'],
            where: {
                userId: userId
            }
        });

        res.status(200).json({ success: true, result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err });
    }
};