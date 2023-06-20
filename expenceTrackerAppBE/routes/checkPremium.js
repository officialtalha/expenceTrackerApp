const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const checkPremiumController = require('../controller/checkPremiumController');
const auth = require('../middleware/auth');

router.use(bodyParser.json());

router.get('/', auth.authenticate, checkPremiumController.checkPremiumGet);

module.exports = router;