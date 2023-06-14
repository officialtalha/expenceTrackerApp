const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const logInController = require('../controller/logInController');

router.use(bodyParser.json());

router.post('/', logInController.logInPost);

module.exports = router;