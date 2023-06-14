const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const signUpController = require('../controller/signUpController');

router.use(bodyParser.json());

router.post('/', signUpController.signUpPost);

module.exports = router;