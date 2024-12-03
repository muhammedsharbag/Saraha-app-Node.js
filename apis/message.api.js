const express = require('express');
const router = express.Router();
const { addMsg, getMsgs } = require('../services/message.service'); // Import your service functions
const { auth } = require('../middleware/authentication/auth'); // Import the auth middleware

// Route to add a message (POST request)
router.post('/', addMsg);

// Route to get messages (GET returnequest) with authentication
router.get('/',auth ,getMsgs);

module.exports = router;
