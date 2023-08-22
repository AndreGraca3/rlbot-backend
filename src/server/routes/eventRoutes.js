const express = require("express");
const handleRequest = require("../controllers/handleRequest");

module.exports = function (controller) {
  const router = express.Router();

  router.get("", handleRequest(controller.getEvents));

  router.post("", handleRequest(controller.addEvent));

  return router;
};
