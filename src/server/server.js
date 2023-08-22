const express = require("express");
const cors = require("cors");

const playerData = require("./data/sql/model/playerData.js");
const eventData = require("./data/sql/model/eventData.js");
const mapData = require("./data/sql/model/mapData.js");
const playlistData = require("./data/sql/model/playlistData.js");
const matchData = require("./data/sql/model/matchData.js");

const trCtx = require("./data/transactionmanager/transactions/SQLTransaction.js");
const executor =
  require("./data/transactionmanager/executors/transactionExecutor.js")(trCtx);

const playerServices = require("./services/internal/playerServices.js");
const eventServices = require("./services/internal/eventServices.js");
const matchServices = require("./services/internal/matchServices.js");

const playerControllerModule = require("./controllers/model/playerController.js");
const eventControllerModule = require("./controllers/model/eventController.js");
const matchControllerModule = require("./controllers/model/matchController.js");
const gameControllerModule = require("./controllers/model/gameController.js");

const playerRoutes = require("./routes/playerRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const matchRoutes = require("./routes/matchRoutes.js");
const gameRoutes = require("./routes/GameRoutes.js");

const config = require("../config/config.js");

const { PORT } = config;

// MiddleWares
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Dependency injection
const playerController = playerControllerModule(
  playerServices(playerData, playlistData, executor)
);
const eventController = eventControllerModule(
  eventServices(eventData, playerData, matchData, executor)
);
const matchController = matchControllerModule(
  matchServices(matchData, mapData, playlistData, playerData, executor)
);
// const gameController = gameControllerModule();

// Routes
app.use("/rl/players", playerRoutes(playerController));
app.use("/rl/events", eventRoutes(eventController));
app.use("/rl/matches", matchRoutes(matchController));
//app.use("/rl/game", gameRoutes(gameController));

app.listen(PORT, () => console.log("Server Listening... "));
