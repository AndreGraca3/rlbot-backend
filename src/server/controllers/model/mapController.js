const { validateBody } = require("../validators");

module.exports = function (services) {
  async function getMaps(req, rsp) {
    const maps = await services.getMaps();
    rsp.json(maps);
  }

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
    getMaps,
    getMap,
    addMap,
  };
};
