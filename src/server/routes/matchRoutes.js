const express = require("express");
const handleRequest = require("../controllers/handleRequest");

module.exports = function (controller) {
  const router = express.Router();

  router.get("/:matchId", handleRequest(controller.getMatch));

  router.get("", handleRequest(controller.getMatches));

  router.post("", handleRequest(controller.addMatch));

  router.put("/:matchId", handleRequest(controller.updateMatch));

  router.delete("/:matchId", handleRequest(controller.removeMatch));
  
  return router;
};
