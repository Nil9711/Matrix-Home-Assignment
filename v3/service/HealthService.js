"use strict";

/**
 * returns the health status of the application.
 *
 * returns ApiResponse
 **/
function healthCheck() {
  return new Promise(function (resolve, reject) {
    resolve({ status: "OK" });
  });
}

module.exports = {
  healthCheck,
};
