module.exports = function (
  matchData,
  mapData,
  playlistData,
  playerData,
  teamData,
  executor
) {
  async function addMatch(
    trCtx,
    mapName,
    playlist,
    blueScore,
    orangeScore,
    startTimer,
    bluePlayers,
    orangePlayers
  ) {
    await mapData.getMap(trCtx, mapName);

    await playlistData.upsertPlaylist(trCtx, playlist);

    const matchId = await matchData.addMatch(
      trCtx,
      blueScore,
      orangeScore,
      playlist,
      startTimer,
      mapName
    );

    const promises = [];

    for (const playerInfo of bluePlayers) {
      const { id: playerId, mmr } = playerInfo;
      await playerData.getPlayer(trCtx, playerId);

      promises.push(playlistData.upsertMmr(trCtx, playerId, playlist, mmr));
      const promise = teamData.assignPlayerToTeam(
        trCtx,
        playerId,
        matchId,
        startTimer,
        "BLUE"
      );
      promises.push(promise);
    }

    for (const playerInfo of orangePlayers) {
      const { id: playerId, mmr } = playerInfo;
      await playerData.getPlayer(trCtx, playerId);

      promises.push(playlistData.upsertMmr(trCtx, playerId, playlist, mmr));
      const promise = teamData.assignPlayerToTeam(
        trCtx,
        playerId,
        matchId,
        startTimer,
        "ORANGE"
      );
      promises.push(promise);
    }

    await Promise.all(promises);

    return matchId;
  }

  return {
    getMatch: executor(matchData.getMatch),
    getMatches: executor(matchData.getMatches),
    addMatch: executor(addMatch),
    updateMatch: executor(matchData.updateMatch),
    removeMatch: executor(matchData.removeMatch),
  };
};
