require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT

// MongoDB URI from .env
const mongoURI = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection Setup
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);  // Exit the process if connection fails
  });

// API routes
app.use('/users', require('./apis/user.api'));
app.use('/messages', require('./apis/message.api'));

// Root route
app.get('/', (req, res) => {
  res.send('Hello World! The server is running.');
});

// Start the Express server
app.listen(port, () => {
  console.log(port,()=>`Server is running on port ${port}`);
});
