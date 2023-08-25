const express = require("express");
const cors = require("cors");

const playerData = require("./data/sql/model/playerData.js");
const eventData = require("./data/sql/model/eventData.js");
const playlistData = require("./data/sql/model/playlistData.js");
const mapData = require("./data/sql/model/mapData.js");
const teamData = require("./data/sql/model/teamData.js");
const matchData = require("./data/sql/model/matchData.js");

const trCtx = require("./data/transactionmanager/transactions/SQLTransaction.js");
const transactionExecutor =
  require("./data/transactionmanager/executors/transactionExecutor.js")(trCtx);

const playerServices = require("./services/internal/playerServices.js");
const eventServices = require("./services/internal/eventServices.js");
const teamServices = require("./services/internal/teamServices.js");
const mapServices = require("./services/internal/mapServices.js");
const matchServices = require("./services/internal/matchServices.js");

const playerControllerModule = require("./controllers/model/playerController.js");
const eventControllerModule = require("./controllers/model/eventController.js");
const teamControllerModule = require("./controllers/model/teamController.js");
const mapControllerModule = require("./controllers/model/mapController.js");
const matchControllerModule = require("./controllers/model/matchController.js");
const gameControllerModule = require("./controllers/model/gameController.js");

const playerRoutes = require("./routes/playerRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const teamRoutes = require("./routes/teamRoutes.js");
const mapRoutes = require("./routes/mapRoutes.js");
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
  playerServices(playerData, playlistData, transactionExecutor)
);
const eventController = eventControllerModule(
  eventServices(eventData, playerData, matchData, transactionExecutor)
);
const teamController = teamControllerModule(
  teamServices(teamData, playerData, matchData, transactionExecutor)
);
const mapController = mapControllerModule(
  mapServices(mapData, transactionExecutor)
);
const matchController = matchControllerModule(
  matchServices(
    matchData,
    mapData,
    playlistData,
    playerData,
    teamData,
    transactionExecutor
  )
);
// const gameController = gameControllerModule();

// Routes
app.use("/rl/players", playerRoutes(playerController));
app.use("/rl/events", eventRoutes(eventController));
app.use("/rl/teams", teamRoutes(teamController));
app.use("/rl/maps", mapRoutes(mapController));
app.use("/rl/matches", matchRoutes(matchController));
//app.use("/rl/game", gameRoutes(gameController));

app.listen(PORT, () => console.log("Server Listening... "));
