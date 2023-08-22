const express = require("express");
const handleRequest = require("../controllers/handleRequest");

module.exports = function (controller) {
  const router = express.Router();

  router.get("/:playerId", handleRequest(controller.getPlayer));

  router.get("", handleRequest(controller.getPlayers));
  
  router.put("/:playerId/mmr", handleRequest(controller.upsertMmr));
  
  router.put("/:playerId", handleRequest(controller.upsertPlayer));
  
  router.delete("/:playerId", handleRequest(controller.removePlayer));

  return router;
};
