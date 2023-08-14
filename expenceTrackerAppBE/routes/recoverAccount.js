const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const recoverAccountController = require('../controller/recoverAccountController');

router.use(bodyParser.json());

router.post('/', recoverAccountController.recoverAccountPost);

module.exports = router;