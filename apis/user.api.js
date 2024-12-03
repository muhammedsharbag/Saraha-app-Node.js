const express = require('express');
const router = express.Router();
const { signUp, signIn, emailVerify } = require('../services/user.service'); // Updated function names
const { userValidation } = require('../validation/user.validation');

// User sign-up route
router.post('/signup/:id', userValidation, signUp);

// User sign-in route
router.post('/signin', signIn);

// Email verification route with dynamic email parameter
router.get('/verify/:email', (req, res, next) => {
  console.log('Received a request for verification:', req.originalUrl);  // Log the full URL
  next();  // Pass the request to emailVerify handler
}, emailVerify);

module.exports = router;
