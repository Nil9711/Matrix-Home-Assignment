"use strict";

const auth = require("../helpers/auth");

const validUsers = {
  nil: "nil",
  admin: "password123",
  user: "mypassword",
  demo: "demo123",
};

/**
 * Authenticate user and return JWT token
 *
 * body LoginRequest
 * returns LoginResponse
 **/
function login(body) {
  return new Promise(function (resolve, reject) {
    const { username, password } = body;

    if (validUsers[username] && validUsers[username] === password) {
      const tokenData = auth.generateJWT({
        username,
      });

      resolve({
        token: tokenData.token,
        expiresIn: tokenData.expiresIn,
        message: "Login successful",
      });
    } else {
      reject({
        code: "INVALID_CREDENTIALS",
        message: "Invalid username or password",
      });
    }
  });
}

module.exports = {
  login,
};
