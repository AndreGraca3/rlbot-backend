const Player = require("../model/Player.js");

const players = new Map(); // Map<Int, Player>

/**
 Converts player object to Player class instance if not contained in map, otherwise retrives the one already exists
*/
function createOrFetchPlayer(player) {
  const retrievedPlayer = players.get(player.id);
  if (retrievedPlayer) return retrievedPlayer;
  const newPlayer = new Player(
    player.id,
    player.name,
    player.mmr,
    player.team,
    player.platform
  );
  players.set(player.id, newPlayer);
  return newPlayer;
}

function getPlayer(playerId) {
  return players.get(playerId);
}

module.exports = {
  createOrFetchPlayer,
  getPlayer,
};
