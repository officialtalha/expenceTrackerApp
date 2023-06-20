const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const deleteAccountController = require('../controller/deleteAccountController');

router.use(bodyParser.json());

router.delete('/', deleteAccountController.deleteAccountDelete);

module.exports = router;