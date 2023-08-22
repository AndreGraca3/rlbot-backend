const { getMapImage } = require("../../../rocketleague/api/rlApi");

module.exports = function (
  matchData,
  mapData,
  playlistData,
  playerData,
  executor
) {
  async function addMatch(
    mapName,
    playlist,
    blueScore,
    orangeScore,
    startTimer,
    bluePlayers,
    orangePlayers
  ) {
    return await executor.execute(async (tr) => {
      const map = await mapData.getMap(mapName);
      if (!map) {
        const mapImg = await getMapImage(mapName);
        await mapData.addMap(mapName, mapImg, tr);
      }

      await playlistData.upsertPlaylist(playlist, tr);

      const matchId = await matchData.addMatch(
        playlist,
        startTimer,
        mapName,
        tr
      );

      const promises = [];

      for (const playerInfo of bluePlayers) {
        const { id: playerId, mmr } = playerInfo;
        await playerData.getPlayer(playerId);
        promises.push(
          playlistData.upsertMmr(playerId, playlist, mmr, tr)
        );
        const promise = matchData.assignPlayerToTeam(
          playerId,
          matchId,
          blueScore,
          "BLUE",
          tr
        );
        promises.push(promise);
      }

      for (const playerInfo of orangePlayers) {
        const { id: playerId, mmr } = playerInfo;
        await playerData.getPlayer(playerId);
        promises.push(
          playlistData.upsertMmr(playerId, playlist, mmr, tr)
        );
        const promise = matchData.assignPlayerToTeam(
          playerId,
          matchId,
          orangeScore,
          "ORANGE",
          tr
        );
        promises.push(promise);
      }

      await Promise.all(promises);

      return matchId;
    });
  }

  return {
    getMatch: matchData.getMatch,
    getMatches: matchData.getMatches,
    addMatch,
    setMatchMvp: matchData.setMatchMvp,
    updateMatch: matchData.updateMatch,
    removeMatch: matchData.removeMatch,
  };
};
