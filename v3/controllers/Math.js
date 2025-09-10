"use strict";

const utils = require("../utils/writer.js");
const auth = require("../middleware/auth.js");
const Service = require("../service/MathService.js");

module.exports.calculate = function calculate(req, res, next, body) {
  const headers = req.headers;

  if (!auth.verifyToken(req)) {
    return utils.writeJson(res, { error: "Unauthorized" }, 401);
  }

  const operation = headers["x-operation"];

  Service.calculate(req.body, operation)
    .then((response) => {
      return utils.writeJson(res, response);
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      return utils.writeJson(
        res,
        {
          code: err.code,
          message: err.message,
        },
        statusCode
      );
    });
};
