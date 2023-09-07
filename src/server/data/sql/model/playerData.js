const dataExecutor = require("../../transactionmanager/executors/dataSQLExecutor");
const { NotFoundError } = require("../../../errors/errors");
const { prismaClient } = require("../prisma/prismaClient");

async function getPlayer(prisma, playerId) {
  const player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });
  if (!player) throw new NotFoundError(`Player ${playerId}`);
  return player;
}

async function getPlayers(prisma, name, platform, createdAfter, skip, limit) {
  const filters = {};
  if (name) filters.name = { contains: name, mode: "insensitive" };
  if (platform) filters.platform = platform;
  if (createdAfter) filters.created_at = { gte: new Date(createdAfter) };

  const players = await prismaClient.player.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: {
      updated_at: "desc",
    },
  });
  const total = await prisma.player.count({ where: filters });
  return { results: players, total };
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
  removePlayer: dataExecutor(removePlayer),
};
