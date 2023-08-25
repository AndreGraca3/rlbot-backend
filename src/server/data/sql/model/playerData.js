const dataExecutor = require("../../transactionmanager/executors/dataSQLExecutor")
const { NotFoundError } = require("../../../errors/errors");

async function getPlayer(prisma, playerId) {
  const player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });
  if (!player) throw new NotFoundError(`Player ${playerId}`);
  return player;
}

async function getPlayers(prisma, name, platform, createdAfter) {
  const filters = {};
  if (name) filters.name = name;
  if (platform) filters.platform = platform;
  if (createdAfter) filters.created_at = { gte: new Date(createdAfter) };

  return await prisma.player.findMany({
    where: filters,
  });
}

async function upsertPlayer(prisma, playerId, name, platform) {
  const data = {
    id: playerId,
    name,
    platform,
  };
  await prisma.player.upsert({
    where: {
      id: playerId,
    },
    create: data,
    update: data,
  });
  return playerId;
}

async function removePlayer(prisma, playerId) {
  const player = await prisma.player.delete({
    where: {
      id: playerId,
    },
  });
  return player;
}

module.exports = {
  getPlayer: dataExecutor(getPlayer),
  getPlayers: dataExecutor(getPlayers),
  upsertPlayer: dataExecutor(upsertPlayer),
  removePlayer: dataExecutor(removePlayer)
};
