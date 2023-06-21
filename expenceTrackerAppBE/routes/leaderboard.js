const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const leaderboardController = require('../controller/leaderboardController');

router.use(bodyParser.json());

router.get('/', leaderboardController.leaderboardGet);

module.exports = router;