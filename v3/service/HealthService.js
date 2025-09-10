"use strict";

/**
 * returns the health status of the application.
 *
 * returns ApiResponse
 **/
exports.healthCheck = function () {
  return new Promise(function (resolve, reject) {
    resolve({status: "OK"});
  });
};