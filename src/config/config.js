require("dotenv").config("../../.env");

module.exports = {
  PORT: process.env.PORT,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
  DISCORD_CHANNEL_ID: process.env.DISCORD_CHANNEL_ID,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  SEARCH_ENGINE_ID: process.env.SEARCH_ENGINE_ID,
  DATABASE_CONNECTION: process.env.DATABASE_CONNECTION,
};
