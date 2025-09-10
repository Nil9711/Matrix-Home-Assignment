"use strict";

const utils = require("../utils/writer.js");
const Service = require("../service/AuthService.js");

module.exports.login = function login(req, res, next, body) {
  Service.login(body)
    .then(function (response) {
      return utils.writeJson(res, response);
    })
    .catch(function (response) {
      return utils.writeJson(res, response);
    });
};
