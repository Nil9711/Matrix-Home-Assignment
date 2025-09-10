"use strict";

const utils = require("../utils/writer.js");
const Service = require("../service/AuthService.js");

function login(req, res, next, body) {
  Service.login(body)
    .then(function (response) {
      return utils.writeJson(res, response);
    })
    .catch(function (response) {
      return utils.writeJson(res, response);
    });
}

module.exports = {
  login,
};
