const joi = require('joi');

// Define the methods to validate
const methods = ['body', 'params'];

// Define the schema for validation
const schema = {
  body: joi.object({
    name: joi.string()
      .min(3)
      .max(15)
      .required()
      .messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should be at least 3 characters',
        'string.max': 'Name cannot exceed 15 characters',
      }),
    email: joi.string().email().required(),
    password: joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain only alphanumeric characters',
      }),
    repassword: joi.valid(joi.ref('password')).required()
      .messages({
        'any.only': 'Passwords do not match',
      }),
    age: joi.number()
      .min(16)
      .max(50)
      .messages({
        'number.min': 'Age must be at least 16',
        'number.max': 'Age must not exceed 50',
      }),
  }),
  params: joi.object({
    id: joi.string()
      .length(4)
      .required()
      .messages({
        'string.empty': 'ID cannot be empty',
        'string.length': 'ID must be exactly 4 characters long',
      }),
  }),
};

module.exports.userValidation = (req, res, next) => {
  const errors = [];

  // Loop through each method (body, params)
  methods.forEach((key) => {
    if (schema[key]) { // Check if schema exists for the method
      const { error } = schema[key].validate(req[key], { abortEarly: false, stripUnknown: true });
      if (error) {
        // Collect validation errors
        error.details.forEach((detail) => {
          errors.push({ field: key, message: detail.message });
        });
      }
    } else {
      console.error(`Validation schema missing for: ${key}`);
    }
  });

  // If there are errors, return a 400 response with error details
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // If no errors, proceed to the next middleware
  next();
};
