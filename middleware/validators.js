const { body, validationResult } = require('express-validator');

const validateExpense = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be greater than 0')
    .custom(value => {
      if (value > 1000000) {
        throw new Error('Amount is too large');
      }
      return true;
    }),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 200 })
    .withMessage('Description must be less than 200 characters'),
  body('paidBy')
    .trim()
    .notEmpty()
    .withMessage('Paid by is required')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  body('splitType')
    .optional()
    .isIn(['equal', 'percentage', 'exact'])
    .withMessage('Invalid split type'),
  body('participants')
    .isArray()
    .withMessage('Participants must be an array')
    .notEmpty()
    .withMessage('At least one participant is required'),
  body('participants.*')
    .trim()
    .notEmpty()
    .withMessage('Participant name cannot be empty')
    .isLength({ max: 50 })
    .withMessage('Participant name must be less than 50 characters'),
  body('category')
    .optional()
    .isIn(['Food', 'Travel', 'Utilities', 'Entertainment', 'Other'])
    .withMessage('Invalid category'),
  body('splitDetails')
    .optional()
    .custom((value, { req }) => {
      if (req.body.splitType === 'exact' && !value) {
        throw new Error('Split details are required for exact split type');
      }
      return true;
    })
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateExpense,
  validateRequest
}; 