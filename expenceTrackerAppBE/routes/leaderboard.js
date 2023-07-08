const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const leaderboardController = require('../controller/leaderboardController');
const auth = require('../middleware/auth');

router.use(bodyParser.json());

router.get('/', auth.authenticate, leaderboardController.leaderboardGet);

module.exports = router;