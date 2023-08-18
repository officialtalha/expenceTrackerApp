const logger = require('../middleware/logger');
const DL = require('../model/modelDownloadLink');
exports.downloadLinkGet = async (req, res) => {
    try {
        const userId = req.user.id;
        const currentPage = 1;
        const numberPerPage = 3;
        const startIndex = (currentPage - 1) * numberPerPage;
        const result = await DL.findAll({
            attributes: ['link', 'createdAt', 'id'],
            where: {
                userId: userId
            },
            offset: startIndex,
            limit: numberPerPage
        });

        res.status(200).json({ success: true, result });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ success: false, error: err });
    }
};

exports.downloadLinkDynamicGet = async (req, res) => {
    try {
        const userId = req.user.id;
        const currentPage = req.params.curPage;
        const numberPerPage = 3;
        const startIndex = (currentPage - 1) * numberPerPage;
        const result = await DL.findAll({
            attributes: ['link', 'createdAt', 'id'],
            where: {
                userId: userId
            },
            offset: startIndex,
            limit: numberPerPage
        });
        res.status(200).json({ success: true, result });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ success: false, error: err });
    }
};