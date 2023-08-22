module.exports = function (playerData, playlistData, executor) {
  return {
    getPlayer: playerData.getPlayer,
    getPlayers: playerData.getPlayers,
    upsertPlayer: playerData.upsertPlayer,
    upsertMmr: playlistData.upsertMmr,
    removePlayer: playerData.removePlayer,
  };
};
