const mesgModel = require('../models/message.model');

// Add a new message
module.exports.addMsg = async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Validate inputs
    if (!message || !userId) {
      return res.status(400).json({ error: "Both 'message' and 'userId' are required." });
    }

    // Insert the message into the database
    await mesgModel.insertMany({ message, userId });

    res.status(201).json({ message: "Message created successfully" });
  } catch (err) {
    console.error("Error adding message:", err);
    res.status(500).json({ error: "An error occurred while creating the message" });
  }
};

// Get messages for a specific user
module.exports.getMsgs = async (req, res) => {
  try {
    // Validate if req.id exists (added by auth middleware)
    if (!req.id) {
      return res.status(400).json({ error: "UserId is required" });
    }

    // Fetch messages for the given userId
    const messages = await mesgModel.find({ userId : req.id }, { message: 1, _id: 0 });

    res.status(200).json({ messages });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "An error occurred while fetching messages" });
  }
};
