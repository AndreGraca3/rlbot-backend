module.exports = function (teamData, playerData, matchData, executor) {
  async function addTeam(trCtx, playerId, matchId, matchTimer, team) {
    await playerData.getPlayer(trCtx, playerId);
    await matchData.getMatch(trCtx, matchId);
    return await teamData.assignPlayerToTeam(trCtx, playerId, matchId, matchTimer, team);
  }

  async function getTeams(trCtx, playerId, matchId) {
    return await teamData.getTeams(trCtx, playerId, matchId);
  }

  return {
    addTeam: executor(addTeam),
    getTeams: executor(getTeams),
  };
};
