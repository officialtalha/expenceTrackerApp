const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const addExpenseController = require('../controller/addExpenseController');
const authenticateMiddleware = require('../middleware/auth');

router.use(bodyParser.json());

router.post('/', addExpenseController.addExpensePost);
router.delete('/:id', addExpenseController.addExpenseDelete);
router.get('/local/:getItemPerPage', authenticateMiddleware.authenticate, addExpenseController.addExpenseGet);
router.get('/:curPage/:itemPerPage', authenticateMiddleware.authenticate, addExpenseController.addExpenseDynamicGet);
router.get('/sum-expenses', authenticateMiddleware.authenticate, addExpenseController.sumExpensesGet);

module.exports = router;