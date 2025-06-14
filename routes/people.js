const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validators');

// Get all people
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const people = new Set();

    expenses.forEach(expense => {
      people.add(expense.paidBy);
      expense.participants.forEach(person => people.add(person));
    });

    res.json({
      success: true,
      data: Array.from(people),
      message: 'People retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving people',
      error: error.message
    });
  }
});

// Get person's expenses
router.get('/:name/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find({
      $or: [
        { paidBy: req.params.name },
        { participants: req.params.name }
      ]
    }).sort({ date: -1 });

    res.json({
      success: true,
      data: expenses,
      message: 'Person\'s expenses retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving person\'s expenses',
      error: error.message
    });
  }
});

// Get person's balance
router.get('/:name/balance', async (req, res) => {
  try {
    const expenses = await Expense.find({
      $or: [
        { paidBy: req.params.name },
        { participants: req.params.name }
      ]
    });

    let balance = 0;
    expenses.forEach(expense => {
      if (expense.paidBy === req.params.name) {
        balance += expense.amount;
      }
      if (expense.participants.includes(req.params.name)) {
        const share = expense.splitDetails.get(req.params.name) || 0;
        balance -= share;
      }
    });

    res.json({
      success: true,
      data: {
        person: req.params.name,
        balance: Number(balance.toFixed(2)),
        status: balance > 0 ? 'owed' : balance < 0 ? 'owes' : 'settled'
      },
      message: 'Person\'s balance retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving person\'s balance',
      error: error.message
    });
  }
});

module.exports = router; 