const express = require("express");
const handleRequest = require("../controllers/handleRequest");

module.exports = function (controller) {
  const router = express.Router();

  router.get("/:mapName", handleRequest(controller.getMap));
  
  router.put("/:mapName", handleRequest(controller.addMap));

  return router;
};
