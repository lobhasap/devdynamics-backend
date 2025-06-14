# Expense Splitter Backend

A Node.js backend for managing and splitting expenses among groups of people. Built with Express.js and MongoDB.

## Features

- Add and manage expenses
- Split expenses equally or by custom amounts
- Track who paid for what
- Calculate settlements between people
- Categorize expenses
- RESTful API design
- MongoDB database integration
- Input validation and error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi (for validation)

## API Documentation

The API is documented using Postman. You can access the complete API documentation and test the endpoints using our Postman collection:

[View Postman Collection](https://gist.github.com/lobhasap/031b979f577cb5d3f1eca86b6b7c9f59)

### Base URL

```
https://devdynamics-backend-ixyb.onrender.com
```

### Available Endpoints

1. **Expenses**
   - `POST /api/expenses` - Add a new expense
   - `GET /api/expenses` - Get all expenses
   - `GET /api/expenses/:id` - Get expense by ID
   - `PUT /api/expenses/:id` - Update an expense
   - `DELETE /api/expenses/:id` - Delete an expense

2. **Settlements**
   - `GET /api/settlements` - Get settlement summary

3. **People**
   - `GET /api/people` - Get all people involved in expenses

### Example Request

```json
POST /api/expenses
{
  "amount": 100.00,
  "description": "Dinner",
  "paidBy": "John",
  "splitType": "equal",
  "participants": ["John", "Alice", "Bob"],
  "category": "Food"
}
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Development

- Run tests: `npm test`
- Run in development mode: `npm run dev`

## License

MIT 