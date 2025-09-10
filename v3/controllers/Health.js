"use strict";

const utils = require("../utils/writer.js");
const Service = require("../service/HealthService.js");

function healthCheck(req, res, next) {
  Service.healthCheck()
    .then(function (response) {
      return utils.writeJson(res, response);
    })
    .catch(function (response) {
      return utils.writeJson(res, response);
    });
}

module.exports = {
  healthCheck,
};
