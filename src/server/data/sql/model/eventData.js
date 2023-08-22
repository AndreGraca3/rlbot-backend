const dataExecutor = require("../../transactionmanager/dataExecutor");
const { prismaClient: prisma } = require("../prisma/prismaClient");

async function getEvents(playerId, matchId, type) {
  let whereCondition = {};

  if (playerId) {
    whereCondition = { ...whereCondition, player_id: playerId };
  }

  if (matchId) {
    whereCondition = { ...whereCondition, match_id: matchId };
  }

  if (type) {
    whereCondition = { ...whereCondition, name: type };
  }

  return await prisma.playerEvent.findMany({
    where: whereCondition,
  });
}

async function addEvent(playerId, matchId, eventType, matchTimer, victimId) {
  const event = await prisma.playerEvent.create({
    data: {
      name: eventType,
      match_timer: matchTimer,
      player_id: playerId,
      match_id: matchId,
      victim_id: victimId,
    },
  });
  return event.id;
}

module.exports = {
  getEvents,
  addEvent,
};
