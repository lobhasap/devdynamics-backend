const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0'],
    get: v => Number(v.toFixed(2)),
    set: v => Number(v.toFixed(2))
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  paidBy: {
    type: String,
    required: [true, 'Paid by is required'],
    trim: true
  },
  splitType: {
    type: String,
    enum: ['equal', 'percentage', 'exact'],
    default: 'equal'
  },
  participants: [{
    type: String,
    required: true,
    trim: true
  }],
  splitDetails: {
    type: Map,
    of: Number,
    default: new Map()
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Utilities', 'Entertainment', 'Other'],
    default: 'Other'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Pre-save middleware to handle equal split
expenseSchema.pre('save', function(next) {
  if (this.splitType === 'equal' && this.participants.length > 0) {
    const shareAmount = Number((this.amount / this.participants.length).toFixed(2));
    const splitDetails = new Map();
    
    this.participants.forEach(person => {
      if (person !== this.paidBy) {
        splitDetails.set(person, shareAmount);
      }
    });
    
    this.splitDetails = splitDetails;
  }
  next();
});

module.exports = mongoose.model('Expense', expenseSchema); 