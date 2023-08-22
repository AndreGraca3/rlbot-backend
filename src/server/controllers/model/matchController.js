const { validateBody } = require("../validators");

module.exports = function (services) {
  async function getMatch(req, rsp) {
    const match = await services.getMatch(req.params.matchId);
    rsp.json(match);
  }

  async function getMatches(req, rsp) {
    const { mapName, playlist, isOvertime, createdAfter, createdBefore } =
      req.query;
    const matches = await services.getMatches(
      mapName,
      playlist,
      isOvertime ? !!isOvertime : undefined,
      createdAfter,
      createdBefore
    );
    rsp.json(matches);
  }

  async function addMatch(req, rsp) {
    const matchId = await services.addMatch(
      ...validateBody(
        req.body,
        "mapName",
        "playlist",
        "blueScore",
        "orangeScore",
        "startTimer",
        "bluePlayers",
        "orangePlayers"
      )
    );
    rsp.status(201).json({ id: matchId });
  }

  async function updateMatch(req, rsp) {
    const { matchId } = req.params;
    const { timer, mvpId, isOvertime } = req.body;  // optional
    await services.updateMatch(matchId, timer, mvpId, isOvertime);
    rsp.json({ message: "Match updated successfully." });
  }

  async function removeMatch(req, rsp) {
    const { matchId } = req.params;
    await services.removeMatch(matchId);
    rsp.status(204).json({ message: "Match removed successfully." });
  }

  return {
    getMatch,
    getMatches,
    addMatch,
    updateMatch,
    removeMatch,
  };
};
