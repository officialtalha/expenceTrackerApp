const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const premiumController = require('../controller/premiumController');
const auth = require('../middleware/auth');

router.use(bodyParser.json());

router.get('/', auth.authenticate, premiumController.premiumGet);
router.post('/', premiumController.premiumPost);

module.exports = router;