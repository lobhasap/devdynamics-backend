const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const SettlementCalculator = require('../utils/settlementCalculator');

// Get all balances
router.get('/balances', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const balances = SettlementCalculator.calculateBalances(expenses);

    // Convert to array of objects and sort by balance
    const balanceArray = Array.from(balances.entries())
      .map(([person, balance]) => ({
        person,
        balance: Number(balance.toFixed(2)),
        status: balance > 0 ? 'owed' : balance < 0 ? 'owes' : 'settled'
      }))
      .sort((a, b) => b.balance - a.balance);

    res.json({
      success: true,
      data: balanceArray,
      message: 'Balances retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating balances',
      error: error.message
    });
  }
});

// Get settlement summary
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const balances = SettlementCalculator.calculateBalances(expenses);
    const settlements = SettlementCalculator.calculateSettlements(balances);
    const summary = SettlementCalculator.calculateSummary(expenses, settlements);

    res.json({
      success: true,
      data: {
        settlements,
        summary
      },
      message: 'Settlement summary retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating settlements',
      error: error.message
    });
  }
});

module.exports = router; 