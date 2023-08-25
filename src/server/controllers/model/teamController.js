const { validateBody } = require("../validators");

module.exports = function (services) {
  async function addTeam(req, rsp) {
    const team = await services.addTeam(
      ...validateBody(req.body, "playerId", "matchId", "matchTimer", "team")
    );
    rsp.json(team);
  }

  async function getTeams(req, rsp) {
    const teams = await services.getTeams(
      req.query.playerId,
      req.query.matchId
    );
    rsp.json(teams);
  }

  return {
    addTeam,
    getTeams
  };
};
