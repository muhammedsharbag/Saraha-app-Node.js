require('dotenv').config();
const mongoose = require('mongoose');

// Your MongoDB URI from the .env file
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);  // Exit the process if connection fails
  });
