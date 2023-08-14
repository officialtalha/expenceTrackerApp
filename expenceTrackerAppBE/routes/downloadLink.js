const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const downloadLinkController = require('../controller/downloadLinkController');
const auth = require('../middleware/auth');

router.use(bodyParser.json());

router.get('/', auth.authenticate, downloadLinkController.downloadLinkGet);


module.exports = router;