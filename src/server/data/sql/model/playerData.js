const { NotFoundError } = require("../../../errors/errors");
const { prismaClient: prisma } = require("../prisma/prismaClient");

async function getPlayer(playerId) {
  const player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });
  if (!player) throw new NotFoundError(`Player ${playerId}`);
  return player;
}

async function getPlayers(name, platform, createdAfter) {
  const filters = {};
  if (name) filters.name = name;
  if (platform) filters.platform = platform;
  if (createdAfter) filters.created_at = { gte: new Date(createdAfter) };

  return await prisma.player.findMany({
    where: filters,
  });
}

async function upsertPlayer(playerId, name, platform, trCtx) {
  trCtx = trCtx ?? prisma
  const data = {
    id: playerId,
    name,
    platform,
  };
  await trCtx.player.upsert({
    where: {
      id: playerId,
    },
    create: data,
    update: data,
  });
  return playerId;
}

async function removePlayer(playerId) {
  const player = await prisma.player.delete({
    where: {
      id: playerId,
    },
  });
  return player;
}

module.exports = {
  getPlayer,
  getPlayers,
  upsertPlayer,
  removePlayer
};
