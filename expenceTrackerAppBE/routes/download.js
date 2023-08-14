const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const donwloadController = require('../controller/donwloadController');
const auth = require('../middleware/auth');

router.use(bodyParser.json());

router.get('/', auth.authenticate, donwloadController.downloadGet);


module.exports = router;