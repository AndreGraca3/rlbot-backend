module.exports = function (eventData, playerData, matchData, executor) { 
  async function addEvent(trCtx, playerId, matchId, eventType, matchTimer, victimId) {
    await playerData.getPlayer(trCtx, playerId);
    await matchData.getMatch(trCtx, matchId);
    return await eventData.addEvent(
      trCtx,
      playerId,
      matchId,
      eventType,
      matchTimer,
      victimId
    );
  }

  return {
    getEvents: executor(eventData.getEvents),
    addEvent: executor(addEvent),
  };
};
