const { validateBody } = require("../validators");

module.exports = function (services) {
  async function getEvents(req, rsp) {
    const { playerId, matchId, eventType } = req.query;
    const events = await services.getEvents(
      playerId,
      matchId,
      eventType
    );
    rsp.json(events);
  }

  async function addEvent(req, rsp) {
    const eventId = await services.addEvent(
      ...validateBody(
        req.body,
        "playerId",
        "matchId",
        "eventType",
        "timer"
      ),
      req.body.victimId
    );
    rsp.status(201).json({ id: eventId });
  }

  return {
    getEvents,
    addEvent,
  };
};
