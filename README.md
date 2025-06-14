# Expense Splitter API

A backend system that helps groups of people split expenses fairly and calculate who owes money to whom. Similar to apps like Splitwise and Google Pay Bills Split.

## Demo & Testing

- **Deployed API:**  
  https://devdynamics-backend-ixyb.onrender.com

- **Public Postman Collection:**  
  [Expense Splitter Postman Collection](https://gist.github.com/lobhasap/657c0a3c320478261d698129d5e40cb7)

### How to Test

1. Import the Postman collection from the link above.
2. Set the environment variable `baseUrl` to `https://devdynamics-backend-ixyb.onrender.com`.
3. Set `petrolExpenseId` to `684d97f430e5f8a382d69d95` and `pizzaExpenseId` to `684d97f430e5f8a382d69d97` in your Postman environment.
4. Run the requests in order to see the API in action.

## Features

### Core Features
- Expense tracking with amount, description, and payer
- Automatic person management
- View, edit, and delete expenses
- Multiple split types (equal, percentage, exact amount)
- Settlement calculations
- Data validation and error handling

### Additional Features
- Expense categories
- Category-wise spending summaries
- Enhanced analytics

## Tech Stack
- Node.js with Express
- MongoDB Atlas
- Mongoose ODM

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd expense-splitter-api
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
NODE_ENV=development
```

4. Start the server
```bash
npm start
```

## API Documentation

### Expense Management

#### GET /api/expenses
List all expenses

Response:
```json
{
  "success": true,
  "data": [
    {
      "amount": 60.00,
      "description": "Dinner at restaurant",
      "paidBy": "Shantanu",
      "splitType": "equal",
      "participants": ["Shantanu", "Sanket", "Om"],
      "category": "Food"
    }
  ]
}
```

#### POST /api/expenses
Add new expense

Request:
```json
{
  "amount": 60.00,
  "description": "Dinner at restaurant",
  "paidBy": "Shantanu",
  "splitType": "equal",
  "participants": ["Shantanu", "Sanket", "Om"],
  "category": "Food"
}
```

#### PUT /api/expenses/:id
Update existing expense

#### DELETE /api/expenses/:id
Delete an expense

### Settlement Management

#### GET /api/settlements
Get current settlement summary

Response:
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "from": "Sanket",
        "to": "Shantanu",
        "amount": 50.00
      }
    ]
  }
}
```

#### GET /api/people
List all people

Response:
```json
{
  "success": true,
  "data": ["Shantanu", "Sanket", "Om"]
}
```

## Settlement Calculation Logic

The settlement calculation follows these steps:

1. Calculate individual balances:
   - For each person, sum up all expenses they paid
   - Subtract their share of expenses they participated in

2. Create a list of debtors (negative balance) and creditors (positive balance)

3. Optimize transactions:
   - Match largest debt with largest credit
   - Create transactions to settle debts
   - Minimize the number of transactions needed

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Known Limitations

1. Currency is handled as floating-point numbers (consider using a decimal library for production)
2. No authentication/authorization implemented
3. No support for recurring transactions
4. No data persistence between server restarts (unless using MongoDB Atlas)

## Testing

The API can be tested using the provided Postman collection. Import the collection from the `postman` directory and update the environment variables with your deployed API URL.

## License

MIT 