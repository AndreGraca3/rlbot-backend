const dataExecutor = require("../../transactionmanager/executors/dataSQLExecutor")

async function assignPlayerToTeam(prisma, playerId, matchId, matchTimer, team) {
  await prisma.playerTeam.create({
    data: {
      player_id: playerId,
      match_id: matchId,
      team,
      match_timer: matchTimer,
    },
  });
}

async function getTeams(prisma, playerId, matchId) {
  const where = {};
  if (playerId) where.player_id = playerId;
  if (matchId) where.match_id = matchId;

  return await trCtx.playerTeam.findMany({
    where,
  });
}

module.exports = {
  assignPlayerToTeam: dataExecutor(assignPlayerToTeam),
  getTeams: dataExecutor(getTeams)
};
