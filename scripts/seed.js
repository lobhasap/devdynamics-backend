const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Expense = require('../models/Expense');
const config = require('../config/config');

// Load environment variables
dotenv.config();

// Sample expenses data
const sampleExpenses = [
  {
    amount: 600.00,
    description: "Dinner at restaurant",
    paidBy: "Shantanu",
    splitType: "equal",
    participants: ["Shantanu", "Sanket", "Om"],
    category: "Food",
    date: new Date()
  },
  {
    amount: 450.00,
    description: "Groceries for the week",
    paidBy: "Sanket",
    splitType: "equal",
    participants: ["Shantanu", "Sanket", "Om"],
    category: "Food",
    date: new Date()
  },
  {
    amount: 300.00,
    description: "Petrol for car",
    paidBy: "Om",
    splitType: "equal",
    participants: ["Shantanu", "Sanket", "Om"],
    category: "Travel",
    date: new Date()
  },
  {
    amount: 500.00,
    description: "Movie tickets",
    paidBy: "Shantanu",
    splitType: "equal",
    participants: ["Shantanu", "Sanket", "Om"],
    category: "Entertainment",
    date: new Date()
  },
  {
    amount: 280.00,
    description: "Pizza night",
    paidBy: "Sanket",
    splitType: "equal",
    participants: ["Shantanu", "Sanket", "Om"],
    category: "Food",
    date: new Date()
  }
];

// Calculate split details for each expense
sampleExpenses.forEach(expense => {
  const share = expense.amount / expense.participants.length;
  expense.splitDetails = new Map();
  expense.participants.forEach(person => {
    expense.splitDetails.set(person, Number(share.toFixed(2)));
  });
});

// Connect to MongoDB and seed data
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Expense.deleteMany({});
    console.log('Cleared existing expenses');

    // Insert sample expenses
    const expenses = await Expense.insertMany(sampleExpenses);
    console.log(`Inserted ${expenses.length} sample expenses`);

    // Log the inserted expense IDs for Postman collection
    console.log('\nExpense IDs for Postman collection:');
    console.log('Petrol Expense ID:', expenses[2]._id);
    console.log('Pizza Expense ID:', expenses[4]._id);

    console.log('\nDatabase seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase(); 