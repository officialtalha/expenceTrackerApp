const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const addExpenseController = require('../controller/addExpenseController');

router.use(bodyParser.json());

router.post('/', addExpenseController.addExpensePost);
router.delete('/:id', addExpenseController.addExpenseDelete);
router.get('/', addExpenseController.addExpenseGet);

module.exports = router;