const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const newPassController = require('../controller/newPassController');

router.use(bodyParser.json());

router.post('/', newPassController.newPassPost);

module.exports = router;