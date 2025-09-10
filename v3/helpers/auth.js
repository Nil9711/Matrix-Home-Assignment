"use strict";

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Generate JWT token for login
 * @param {Object} user - User object containing user details
 * @param {string} user.username - Username
 * @param {number} [expiresIn=3600] - Token expiration in seconds (default 1 hour)
 * @returns {Object} Object containing token and expiration info
 */
function generateJWT(user, expiresIn = 3600) {
  const payload = {
    user,
    iat: Math.floor(Date.now() / 1000),
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: token,
    expiresIn: expiresIn,
  };
}

/**
 * Verify token without middleware (for use in controllers)
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token or null if invalid
 */
function verifyToken(req) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) return null;
    const isVerified = jwt.verify(token, JWT_SECRET);
    return isVerified;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateJWT,
  verifyToken,
};
