const express = require("express");
const handleRequest = require("../controllers/handleRequest");

module.exports = function (controller) {
  const router = express.Router();

  router.post("", handleRequest(controller.addTeam));

  router.get("", handleRequest(controller.getTeams));

  return router;
};
