const express = require("express");

module.exports = function (gameApi) {
  const router = express.Router();
/*
  router.put("/training", gameApi.enterTraining);

  router.put("/exit", gameApi.exitGame);
*/
  return router;
};
