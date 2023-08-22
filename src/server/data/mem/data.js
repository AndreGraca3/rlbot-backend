const playerData = require("./playerData.js")
const mapData = require("./mapData.js")
const Game = require("../model/Game.js");
const {
  IllegalStateError,
  NotFoundError,
} = require("../../errors/errors.js");
const { Teams, GameStates } = require("../model/types.js");
const Goal = require("../model/events/Goal.js");
const Save = require("../model/events/Save.js");
const Demo = require("../model/events/Demo.js");

const games = []; // Game[]
let gameId = 1;
let gameState = GameStates.Idle;

async function startGame(
  mapName,
  playlist,
  blueScore,
  orangeScore,
  timer,
  bluePlayers,
  orangePlayers
) {
  if (isGameActive())
    throw new IllegalStateError("Finish the current game to start another.");

  const newGame = new Game(
    gameId++,
    await mapData.createOrFetchMap(mapName),
    playlist,
    timer,
    blueScore,
    orangeScore,
    bluePlayers.map((p) => playerData.createOrFetchPlayer(p)),
    orangePlayers.map((p) => playerData.createOrFetchPlayer(p))
  );
  games.push(newGame);
  gameState = GameStates.Match;
  return newGame;
}

function endGame() {
  gameState = GameStates.Menu;
}

function startOvertime() {
  const game = getCurrentGame();
  game.isOvertime = true;
}

function isGameActive() {
  return gameState == GameStates.Match;
}

// Getters

function getCurrentGame() {
  if (!isGameActive()) throw new IllegalStateError("There is no current game.");
  const game = games[games.length - 1];
  return game;
}

function getGame(gameId) {
  const game = games.find((g) => g.id == gameId);
  if (!game) throw new NotFoundError("Game");
  return game;
}

function getAmountOfGames() {
  return games.length;
}

function getPlayerFromGame(game, playerId) {
  const allPlayers = game.teams.blue.concat(game.teams.orange);
  const player = allPlayers.find((p) => p.id == playerId);

  if (!player)
    throw new NotFoundError(`Player with id ${playerId} in game ${game.id}`);
  return player;
}

function getGames() {
  const finishedGames =
    gameState == GameStates.Match ? games.slice(0, -1) : games;
  return finishedGames.map((g) => {
    return {
      id: g.id,
      map: g.map,
      playlist: g.playlist,
      timer: g.timer,
      isOvertime: g.isOvertime,
      blueScore: g.blueScore,
      orangeScore: g.orangeScore,
    };
  });
}

function getEventsFromGame(gameId) {
  const game = getGame(gameId);
  return game.events;
}

function getEventsFromPlayer(playerId) {
  let events = [];
  for (const game in games) {
    events = events.concat(game.events.filter((ev) => ev.playerId == playerId));
  }
  return events;
}

// Match event functions

function goal(playerId) {
  const game = getCurrentGame();

  game.events.push(new Goal(playerId, game.timer));
  const player = getPlayerFromGame(game, playerId);
  if (player.team == Teams.Blue) return ++game.blueScore;
  else return ++game.orangeScore;
}

function save(playerId) {
  const game = getCurrentGame();
  game.events.push(new Save(playerId, game.timer));
}

function demo(playerId, victimId) {
  const game = getCurrentGame();
  game.events.push(new Demo(playerId, victimId, game.timer));
}

module.exports = {
  startGame,
  endGame,
  startOvertime,
  isGameActive,
  getPlayer: playerData.getPlayer,
  getGame,
  getCurrentGame,
  getAmountOfGames,
  getPlayerFromGame,
  getGames,
  getEventsFromPlayer,
  getEventsFromGame,
  goal,
  save,
  demo,
};
