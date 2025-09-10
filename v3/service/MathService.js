"use strict";

const MAX_SAFE_VALUE = Number.MAX_SAFE_INTEGER; // 9,007,199,254,740,991

/**
 * returns the result of a basic calculation given 2 numbers.
 *
 * body AnyTwoNumbers Request body containing two numbers for mathematical operations
 * xOperation String The mathematical operation to perform
 * returns ApiResponse
 **/
function calculate(body, xOperation) {
  return new Promise(function (resolve, reject) {
    const { number, secondNumber } = body;

    if (typeof number !== "number" || typeof secondNumber !== "number") {
      return reject({
        statusCode: 400,
        code: "INVALID_INPUT",
        message: "Both number and secondNumber must be valid numbers",
      });
    }

    if (Math.abs(number) > MAX_SAFE_VALUE || Math.abs(secondNumber) > MAX_SAFE_VALUE) {
      return reject({
        statusCode: 400,
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
            statusCode: 422,
            code: "DIVISION_BY_ZERO",
            message: "Cannot divide by zero",
          });
        }
        result = number / secondNumber;
        break;

      default:
        return reject({
          statusCode: 400,
          code: "INVALID_OPERATION",
          message: "Operation must be one of: add, subtract, multiply, divide",
        });
    }

    if (!Number.isFinite(result) || (Number.isInteger(result) && !Number.isSafeInteger(result))) {
      return reject({
        statusCode: 400,
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
}

module.exports = {
  calculate,
};
