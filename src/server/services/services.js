const { IllegalArgumentError } = require("../errors/errors.js");
const { PlayerEvents } = require("../data/model/types.js");

module.exports = function (internalServices, discord) {
  function enterTraining(map) {
    discord.setActivity(`Training in ${map}`);
  }

  async function startGame(
    map,
    playlist,
    blueScore,
    orangeScore,
    timer,
    bluePlayers,
    orangePlayers
  ) {
    const game = await internalServices.startGame(
      map,
      playlist,
      blueScore,
      orangeScore,
      timer,
      bluePlayers,
      orangePlayers
    );
    await Promise.all([
      discord.setActivity(`${playlist} in ${map}`),
      updateDiscordEmbeds(game),
    ]);
    return game.id;
  }

  async function endGame() {
    internalServices.endGame();
    await Promise.all([
      discord.deleteGameEmbeds(),
      discord.setActivity("Menu"),
    ]);
  }

  async function becomeIdle() {
    await discord.setIdleActivity();
  }

  async function registerPlayerEvent(playerId, eventName) {
    switch (eventName) {
      case PlayerEvents.Goal:
        const goal = internalServices.goal(playerId);
        const game = internalServices.getCurrentGame();
        await updateDiscordEmbeds(game);
        return "goal";
      case PlayerEvents.Save:
        internalServices.save(playerId);
        return "save";
      case PlayerEvents.Demo:
        internalServices.demo(playerId);
        return "demo";
      default:
        throw new IllegalArgumentError(`Event ${eventName}`);
    }
  }

  async function updateDiscordEmbeds(game) {
    const winner = internalServices.chooseWinner(game);
    await discord.sendGameEmbeds(
      winner,
      game.blueScore,
      game.orangeScore,
      game.timer,
      game.map.name,
      game.map.url,
      game.playlist,
      game.teams.blue,
      game.teams.orange
    );
  }

  return {
    enterTraining,
    startGame,
    startOvertime: internalServices.startOvertime,
    endGame,
    getGames: internalServices.getGames,
    getEventsFromGame: internalServices.getEventsFromGame,
    becomeIdle,
    registerPlayerEvent,
  };
}
