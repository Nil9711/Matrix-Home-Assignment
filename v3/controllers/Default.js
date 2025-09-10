"use strict";

const utils = require("../utils/writer.js");
const Default = require("../service/DefaultService");
const auth = require("../middleware/auth.js")

module.exports.calculate = function calculate(
  req,
  res,
  next,
  body,
) {
  const headers = req.headers;

  if (!auth.verifyToken(req)) {
    return utils.writeJson(res, { error: 'Unauthorized' }, 401);
  }

  const operation = headers["x-operation"]

  Default.calculate(req.body, operation)
    .then((response) => {
      return utils.writeJson(res, response);
    })
    .catch((err) => {
      return utils.writeJson(res, err);
    })
};


module.exports.healthCheck = function healthCheck(req, res, next) {
  Default.healthCheck()
    .then(function (response) {
      return utils.writeJson(res, response);
    })
    .catch(function (response) {
      return utils.writeJson(res, response);
    });
};

module.exports.login = function login(req, res, next, body) {
  Default.login(body)
    .then(function (response) {
      return utils.writeJson(res, response);
    })
    .catch(function (response) {
      return utils.writeJson(res, response);
    });
};
