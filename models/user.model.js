const mongoose = require('mongoose');

// Define the user schema
const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  emailConfirm: {
    type: Boolean,
    default: false,
  },
});

// Export the model
module.exports = mongoose.model('user', schema);