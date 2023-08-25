module.exports = function (playerData, playlistData, executor) {
  return {
    getPlayer: executor(playerData.getPlayer),
    getPlayers: executor(playerData.getPlayers),
    upsertPlayer: executor(playerData.upsertPlayer),
    upsertMmr: executor(playlistData.upsertMmr),
    removePlayer: executor(playerData.removePlayer),
  };
};
