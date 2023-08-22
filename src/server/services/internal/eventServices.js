module.exports = function (eventData, playerData, matchData, executor) {
  async function getEvents(playerId, matchId, type) {
    return await eventData.getEvents(playerId, matchId, type);
  }

  async function addEvent(playerId, matchId, eventType, matchTimer, victimId) {
    await playerData.getPlayer(playerId)
    await matchData.getMatch(matchId)
    return await eventData.addEvent(
      playerId,
      matchId,
      eventType,
      matchTimer,
      victimId
    );
  }

  return {
    getEvents,
    addEvent,
  };
};
