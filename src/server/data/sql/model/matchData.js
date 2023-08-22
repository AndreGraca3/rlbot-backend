const { NotFoundError } = require("../../../errors/errors");
const dataExecutor = require("../../transactionmanager/dataExecutor");
const { prismaClient: prisma } = require("../prisma/prismaClient");

async function getMatch(matchId) {
  const match = await prisma.match.findUnique({
    where: {
      id: matchId,
    },
  });
  if (!match) throw new NotFoundError(`Match ${matchId}`);
  return match;
}

async function getMatches(
  mapName,
  playlist,
  isOvertime,
  createdAfter,
  createdBefore
) {
  const filters = {};

  if (mapName) filters.map_name = mapName;

  if (playlist) filters.playlist = playlist;

  if (isOvertime !== undefined) filters.isOvertime = isOvertime;

  if (createdAfter) filters.created_at = { gte: createdAfter };

  if (createdBefore) filters.created_at = { lte: createdBefore };

  const matches = await prisma.match.findMany({
    where: filters,
    orderBy: {
      created_at: "desc",
    },
  });

  return matches;
}

async function addMatch(playlist, startTimer, mapName, trCtx) {
  trCtx = trCtx ?? prisma;
  const match = await trCtx.match.create({
    data: {
      playlist,
      start_timer: startTimer,
      timer: startTimer,
      map_name: mapName,
    },
  });
  return match.id;
}

async function assignPlayerToTeam(playerId, matchId, score, teamColor, trCtx) {
  trCtx = trCtx ?? prisma;
  await trCtx.team.upsert({
    create: {
      player_id: playerId,
      match_id: matchId,
      score,
      team_color: teamColor,
    },
    update: {
      score,
      team_color: teamColor,
    },
    where: {
      player_id_match_id: {
        player_id: playerId,
        match_id: matchId,
      },
    },
  });
}

async function updateMatch(matchId, timer, mvpId, isOvertime, trCtx) {
  trCtx = trCtx ?? prisma;
  const data = {};
  if (timer) data.timer = timer;
  if (mvpId) data.mvp_id = mvpId;
  if (isOvertime !== undefined) data.isOvertime = isOvertime;

  await trCtx.match.update({
    where: {
      id: matchId,
    },
    data,
  });
}

async function removeMatch(matchId, trCtx) {
  trCtx = trCtx ?? prisma;
  await trCtx.match.delete({
    where: {
      id: matchId,
    },
  });
}

module.exports = {
  getMatch,
  getMatches,
  addMatch,
  assignPlayerToTeam,
  updateMatch,
  removeMatch,
};
