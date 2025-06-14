const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./utils/database');
const errorHandler = require('./middleware/errorHandler');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Expense Splitter API',
    documentation: 'https://github.com/lobhasap/devdynamics-backend',
    endpoints: {
      expenses: '/api/expenses',
      settlements: '/api/settlements',
      people: '/api/people'
    },
    version: '1.0.0'
  });
});

// Routes
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/settlements', require('./routes/settlements'));
app.use('/api/people', require('./routes/people'));

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server is running in ${config.nodeEnv} mode on port ${config.port}`);
}); 