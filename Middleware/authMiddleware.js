const jwt = require('jsonwebtoken');
require('dotenv').config();

// check if user is authenticated
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized – No token provided' });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains id and role from payload
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized – Invalid token' });
  }
};

// only for USER role
const userOnly = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Forbidden – User access only' });
  }
  next();
};

// only for ADMIN role
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden – Admin access only' });
  }
  next();
};

module.exports = {
  verifyToken,
  userOnly,
  adminOnly
};
