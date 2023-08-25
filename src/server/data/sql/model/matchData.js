const { NotFoundError } = require("../../../errors/errors");
const dataSQLExecutor = require("../../transactionmanager/executors/dataSQLExecutor");

async function getMatch(prisma, matchId) {
  const match = await prisma.match.findUnique({
    where: {
      id: matchId,
    },
  });
  if (!match) throw new NotFoundError(`Match ${matchId}`);
  return match;
}

async function getMatches(
  prisma,
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

async function addMatch(
  prisma,
  blueScore,
  orangeScore,
  playlist,
  startTimer,
  mapName
) {
  const match = await prisma.match.create({
    data: {
      blue_score: blueScore,
      orange_score: orangeScore,
      map_name: mapName,
      playlist,
      start_timer: startTimer,
      timer: startTimer,
    },
  });
  return match.id;
}

async function updateMatch(prisma, matchId, timer, mvpId, isOvertime) {
  const data = {};
  if (timer) data.timer = timer;
  if (mvpId) data.mvp_id = mvpId;
  if (isOvertime !== undefined) data.isOvertime = isOvertime;

  await prisma.match.update({
    where: {
      id: matchId,
    },
    data,
  });
}

async function removeMatch(prisma, matchId) {
  await prisma.match.delete({
    where: {
      id: matchId,
    },
  });
}

module.exports = {
  getMatch: dataSQLExecutor(getMatch),
  getMatches: dataSQLExecutor(getMatches),
  addMatch: dataSQLExecutor(addMatch),
  updateMatch: dataSQLExecutor(updateMatch),
  removeMatch: dataSQLExecutor(removeMatch),
};
