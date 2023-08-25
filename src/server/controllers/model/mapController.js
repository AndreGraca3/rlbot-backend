const { validateBody } = require("../validators");

module.exports = function (services) {
  async function getMap(req, rsp) {
    const { mapName } = req.params;
    const map = await services.getMap(mapName);
    rsp.json(map);
  }

  async function addMap(req, rsp) {
    const { mapName } = req.params;
    const map = await services.addMap(mapName);
    rsp.status(201).json(map);
  }

  return {
    getMap,
    addMap,
  };
};
