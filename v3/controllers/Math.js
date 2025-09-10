"use strict";

const utils = require("../utils/writer.js");
const auth = require("../helpers/auth.js");
const Service = require("../service/MathService.js");

function calculate(req, res, next, body) {
  const headers = req.headers;
  const operation = headers["x-operation"];

  if (!auth.verifyToken(req)) {
    return utils.writeJson(res, { error: "Unauthorized" }, 401);
  }

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
}

module.exports = {
  calculate,
};
