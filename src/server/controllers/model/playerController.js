const { validateBody } = require("../validators");

module.exports = function (services) {
  async function getPlayer(req, rsp) {
    const { playerId } = req.params;
    const player = await services.getPlayer(playerId);
    rsp.json(player);
  }

  async function getPlayers(req, rsp) {
    const { name, platform, createdAfter } = req.query;
    const players = await services.getPlayers(name, platform, createdAfter);
    rsp.json(players);
  }

  async function upsertPlayer(req, rsp) {
    const playerId = await services.upsertPlayer(
      req.params.playerId,
      ...validateBody(req.body, "name", "platform")
    );
    rsp.status(201).json({ id: playerId });
  }

  async function upsertMmr(req, rsp) {
    const { playerId } = req.params;
    await services.upsertMmr(
      playerId,
      ...validateBody(req.body, "playlist", "mmr")
    );
    rsp.json({message: "Player's mmr updated successfully."})
  }

  async function removePlayer(req, rsp) {
    const { playerId } = req.params;
    await services.removePlayer(playerId);
    rsp.status(204).json({ message: "Player removed successfully." });
  }

  return {
    getPlayer,
    getPlayers,
    upsertPlayer,
    upsertMmr,
    removePlayer,
  };
};
