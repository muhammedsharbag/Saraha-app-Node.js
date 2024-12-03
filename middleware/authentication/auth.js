const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'khankah', (err, decoded) => {
        if (err) {
            console.log("Token verification error:", err.message);
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach the userId from the decoded token to the request
        req.id = decoded.userId;
        console.log("Decoded User ID:", decoded.userId);
        
        next();
    });
};
