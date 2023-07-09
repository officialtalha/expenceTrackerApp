const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const newPassController = require('../controller/newPassController');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', newPassController.newPassGet);
router.post('/', newPassController.newPassPost);

module.exports = router;