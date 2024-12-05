const express = require('express');
const expenseController = require('../controllers/expense');
const router = express.Router();

router.post('/expenses', expenseController.addExpense);
router.get('/expenses', expenseController.getExpenses);
router.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = router;