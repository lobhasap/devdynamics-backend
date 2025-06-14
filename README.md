# Expense Splitting API

A RESTful API for managing and splitting expenses among groups of people. Built with Node.js, Express, and MongoDB.

## Features

- Create, read, update, and delete expenses
- Support for different split types (equal, percentage, exact)
- Automatic settlement calculations
- Balance tracking for each person
- Category-based expense organization
- Input validation and error handling
- RESTful API design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-splitting-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/expense-splitter
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Expenses

- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get expense by ID
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Settlements

- `GET /api/settlements` - Get settlement summary
- `GET /api/settlements/balances` - Get all balances

### People

- `GET /api/people` - Get all people
- `GET /api/people/:name/expenses` - Get person's expenses
- `GET /api/people/:name/balance` - Get person's balance

## Request/Response Examples

### Create Expense

```http
POST /api/expenses
Content-Type: application/json

{
  "amount": 100.00,
  "description": "Dinner at Restaurant",
  "paidBy": "Alice",
  "splitType": "equal",
  "participants": ["Alice", "Bob", "Charlie"],
  "category": "Food"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "amount": 100.00,
    "description": "Dinner at Restaurant",
    "paidBy": "Alice",
    "splitType": "equal",
    "participants": ["Alice", "Bob", "Charlie"],
    "category": "Food",
    "splitDetails": {
      "Alice": 33.33,
      "Bob": 33.33,
      "Charlie": 33.34
    },
    "date": "2024-03-14T12:00:00.000Z"
  },
  "message": "Expense created successfully"
}
```

### Get Settlement Summary

```http
GET /api/settlements
```

Response:
```json
{
  "success": true,
  "data": {
    "settlements": [
      {
        "from": "Bob",
        "to": "Alice",
        "amount": 33.33
      },
      {
        "from": "Charlie",
        "to": "Alice",
        "amount": 33.34
      }
    ],
    "summary": {
      "totalExpenses": 100.00,
      "totalSettlements": 66.67,
      "averageExpense": 100.00,
      "totalTransactions": 2
    }
  },
  "message": "Settlement summary retrieved successfully"
}
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information (in development mode)"
}
```

## Validation Rules

- Amount must be greater than 0 and less than 1,000,000
- Description is required and must be less than 200 characters
- Paid by name is required and must be less than 50 characters
- Split type must be one of: equal, percentage, exact
- At least one participant is required
- Participant names must be less than 50 characters
- Category must be one of: Food, Travel, Utilities, Entertainment, Other
- Split details are required for exact split type

## Development

1. Install development dependencies:
```bash
npm install --save-dev nodemon
```

2. Start development server:
```bash
npm run dev
```

## Testing

Run tests:
```bash
npm test
```

## Deployment

1. Set up MongoDB Atlas account
2. Deploy to Railway.app or similar platform
3. Configure environment variables
4. Deploy using Git integration

## Demo & Testing

- **Deployed API:**  
  https://devdynamics-backend-production.up.railway.app

- **Public Postman Collection:**  
  [Expense Splitter Postman Collection](https://gist.github.com/lobhasap/657c0a3c320478261d698129d5e40cb7)

### How to Test

1. Import the Postman collection from the link above.
2. Set the environment variable `baseUrl` to `https://devdynamics-backend-production.up.railway.app`.
3. Set `petrolExpenseId` to `684d97f430e5f8a382d69d95` and `pizzaExpenseId` to `684d97f430e5f8a382d69d97` in your Postman environment.
4. Run the requests in order to see the API in action.

---

**Submission Checklist:**
- [x] Code pushed to GitHub
- [x] Deployed on Railway
- [x] Postman collection public and linked in README
- [x] README updated with all instructions and links

If you have any questions or need to see example requests, check the Postman collection or reach out!

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 