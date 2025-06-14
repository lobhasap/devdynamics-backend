const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { validateExpense, validateRequest } = require('../middleware/validators');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json({
      success: true,
      data: expenses,
      message: 'Expenses retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving expenses',
      error: error.message
    });
  }
});

// Get expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }
    res.json({
      success: true,
      data: expense,
      message: 'Expense retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving expense',
      error: error.message
    });
  }
});

// Create new expense
router.post('/', validateExpense, validateRequest, async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json({
      success: true,
      data: expense,
      message: 'Expense created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating expense',
      error: error.message
    });
  }
});

// Update expense
router.put('/:id', validateExpense, validateRequest, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }
    res.json({
      success: true,
      data: expense,
      message: 'Expense updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating expense',
      error: error.message
    });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }
    res.json({
      success: true,
      data: expense,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting expense',
      error: error.message
    });
  }
});

module.exports = router; 