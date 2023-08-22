const discordJs = require("discord.js");
const { DISCORD_TOKEN, DISCORD_CHANNEL_ID } = require("../config/config.js");

module.exports = function discord(discordServices, rlApi) {
  const client = new discordJs.Client({
    intents: [
      discordJs.GatewayIntentBits.Guilds,
      discordJs.GatewayIntentBits.GuildMessages,
      discordJs.GatewayIntentBits.MessageContent,
      discordJs.GatewayIntentBits.GuildEmojisAndStickers,
    ],
  });

  client.on("ready", async () => {
    await setIdleActivity();
    console.log("Bot is Online");
  });

  // Bot commands

  client.on("interactionCreate", async (interaction) => {
    try {
      if (interaction.user.bot) return;
      if (interaction.channel.isDMBased()) return;

      if (interaction.commandName == "score") {
        const embed = discordServices.createScoreEmbed();
        interaction.reply({ embeds: [embed] });
      }

      if (interaction.commandName == "teams") {
        const embed = discordServices.createTeamsEmbed();
        interaction.reply({ embeds: [embed] });
      }
    } catch (e) {
      const embed = discordServices.createErrorEmbed(e.message);
      interaction.reply({ embeds: [embed] });
    }
  });

  client.login(DISCORD_TOKEN);

  // Module functions

  let gameEmbeds;

  async function setActivity(activity) {
    client.user.setActivity(activity, {
      type: discordJs.ActivityType.Watching,
    });
  }

  async function setIdleActivity() {
    const randomMap = await rlApi.getRandomMap();
    await setActivity(randomMap);
  }

  async function sendGameEmbeds(
    winner,
    blueScore,
    orangeScore,
    timer,
    mapName,
    mapUrl,
    playlist,
    blueTeam,
    orangeTeam
  ) {
    const scoreEmbed = discordServices.createScoreEmbed(
      winner,
      blueScore,
      orangeScore,
      timer,
      mapName,
      mapUrl,
      playlist
    );
    const teamsEmbed = discordServices.createTeamsEmbed(
      winner,
      blueTeam,
      orangeTeam
    );
    if (gameEmbeds) await gameEmbeds.edit({ embeds: [scoreEmbed, teamsEmbed] });
    else
      gameEmbeds = await client.channels.cache
        .get(DISCORD_CHANNEL_ID)
        .send({ embeds: [scoreEmbed, teamsEmbed] });
  }

  async function deleteGameEmbeds() {
    if (!gameEmbeds) return;
    await gameEmbeds.delete();
    gameEmbeds = undefined;
  }

  return {
    sendGameEmbeds,
    deleteGameEmbeds,
    setActivity,
  };
}
