const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  message:String,
  userId:mongoose.SchemaTypes.ObjectId
});

// Export the model
module.exports = mongoose.model('messages', schema);
