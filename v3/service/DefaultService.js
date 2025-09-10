"use strict";

const MAX_SAFE_VALUE = Number.MAX_SAFE_INTEGER; // 9,007,199,254,740,991
const auth = require("../middleware/auth");

const validUsers = {
      'nil': "nil",
      'admin': 'password123',
      'user': 'mypassword',
      'demo': 'demo123'
}
/**
 * returns the result of a basic calculation given 2 numbers.
 *
 * body AnyTwoNumbers Request body containing two numbers for mathematical operations
 * xOperation String The mathematical operation to perform
 * returns ApiResponse
 **/
exports.calculate = function (body, xOperation) {
  return new Promise(function (resolve, reject) {
    const { number, secondNumber } = body;

    if (typeof number !== "number" || typeof secondNumber !== "number") {
      return reject({
        code: "INVALID_INPUT",
        message: "Both number and secondNumber must be valid numbers",
      });
    }

    if (Math.abs(number) > MAX_SAFE_VALUE || Math.abs(secondNumber) > MAX_SAFE_VALUE) {
      return reject({
        code: "NUMBER_TOO_LARGE",
        message: `Numbers must be between -${MAX_SAFE_VALUE} and ${MAX_SAFE_VALUE} for accurate calculations`,
      });
    }

    let result;

    switch (xOperation) {
      case "add":
        result = number + secondNumber;
        break;

      case "subtract":
        result = number - secondNumber;
        break;

      case "multiply":
        result = number * secondNumber;
        break;

      case "divide":
        if (secondNumber === 0) {
          return reject({
            code: "DIVISION_BY_ZERO",
            message: "Cannot divide by zero",
          });
        }
        result = number / secondNumber;
        break;

      default:
        return reject({
          code: "INVALID_OPERATION",
          message: "Operation must be one of: add, subtract, multiply, divide",
        });
    }

    if (!Number.isFinite(result) || (Number.isInteger(result) && !Number.isSafeInteger(result))) {
      return reject({
        code: "RESULT_TOO_LARGE",
        message: "Result exceeds safe calculation range",
      });
    }

    // Return success response matching your OpenAPI schema
    resolve({
      result: result,
      message: `Successfully performed ${xOperation} operation`,
      status: "success",
    });
  });
};

/**
 * returns the health status of the application.
 *
 * returns ApiResponse
 **/
exports.healthCheck = function () {
  return new Promise(function (resolve, reject) {
    resolve("OK");
  });
};

/**
 * Authenticate user and return JWT token
 *
 * body LoginRequest
 * returns LoginResponse
 **/
exports.login = function (body) {
  return new Promise(function (resolve, reject) {
    const { username, password } = body;
    console.log("Credentials Received ", { username, password });

    if (validUsers[username] && validUsers[username] === password) {
      const tokenData = auth.generateJWT({ 
        username: username,
      });
      
      resolve({
        token: tokenData.token,
        expiresIn: tokenData.expiresIn,
        message: 'Login successful'
      });
    } else {
      reject({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid username or password'
      });
    }
  });
};
