const rlApi = require("../../../rocketleague/api/rlApi.js");
const GameMap = require("../model/GameMap.js");

const maps = new Map(); // Set<String, String>

/**
 Creates a map with its image url if not contained in map, otherwise retrives the one already exists
*/
async function createOrFetchMap(name) {
  const retrievedMap = maps.get(name);
  if (retrievedMap) return retrievedMap;
  const mapUrl = await rlApi.getMapImage(name);
  const newMap = new GameMap(name, mapUrl);
  maps.set(name, newMap);
  return newMap;
}

function getMap(map) {
  return maps.get(map);
}

module.exports = {
  createOrFetchMap,
  getMap,
};
