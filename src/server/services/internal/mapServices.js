module.exports = function (mapData, executor) {
  async function addMap(trCtx, name) {
    try {
      const map = await mapData.getMap(trCtx, name);
      return map;
    } catch (e) {
      return await mapData.addMap(trCtx, name);
    }
  }

  return {
    getMaps: executor(mapData.getMaps),
    getMap: executor(mapData.getMap),
    addMap: executor(addMap),
  };
};
