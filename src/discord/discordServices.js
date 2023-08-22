const { Colors } = require('discord.js');
const discordJs = require('discord.js');
const { Teams, Platforms } = require('../server/data/model/types.js');


function discordServices(internalServices) {
  function createScoreEmbed(winner, blueScore, orangeScore, timer, mapName, mapUrl, playlist) {
    return createEmbed(
      ":soccer: " + blueScore + "-" + orangeScore,
      `${
        winner == Teams.Blue
          ? "Team Blue is winning."
          : winner == Teams.Orange
          ? "Team Orange is winning."
          : "Match is tied."
      }`,
      getWinnerColor(winner),
      mapUrl,
      { name: "\u200B", value: ":clock1: " + timer, inline: true },
      { name: "\u200B", value: ":map: " + mapName, inline: true },
      { name: "\u200B", value: ":video_game: " + playlist }
    );
  }

  function createTeamsEmbed(winner, blueTeam, orangeTeam) {
    return createEmbed(
      ":handshake: Teams:",
      undefined,
      getWinnerColor(winner),
      undefined,
      {
        name:
          "\u200B" +
          `:blue_circle: \n ${blueTeam.map(
            (p) =>
              `\`${p.mmr}\` ${p.name} ${getPlatformEmoji(
                p.platform
              )}`
          ).join("\n")}`,
        value: "\u200B",
        inline: true,
      },
      {
        name:
          "\u200B" +
          `:orange_circle: \n ${orangeTeam.map(
            (p) =>
              `\`${p.mmr}\` ${p.name} ${getPlatformEmoji(
                p.platform
              )}`
          ).join("\n")}`,
        value: "\u200B",
        inline: true,
      }
    );
  }

  function createErrorEmbed(error) {
    return createEmbed(
      "Error",
      error,
      Colors.Red,
      "https://i.imgur.com/3jZlE66.png"
    );
  }

  function createEmbed(title, description, color, thumbnail, ...fields) {
    const embed = new discordJs.EmbedBuilder()
      .setTitle(title)
      .setColor(color ?? Colors.Orange)
      .setTimestamp();

    if (description) embed.setDescription(description);
    if (thumbnail) embed.setThumbnail(thumbnail);

    embed.addFields(...fields);
    return embed;
  }

  // Utils
  function getWinnerColor(winner) {
    switch (winner) {
      case Teams.Blue:
        return Colors.Blue;
      case Teams.Orange:
        return Colors.Orange;
      default:
        return Colors.Yellow;
    }
  }

  function getPlatformEmoji(platform) {
    switch (platform) {
      case Platforms.Desktop_Steam:
      case Platforms.Desktop_Epic:
        return ":desktop:";
      case Platforms.Ps4:
        return "<:ps4:1070745666080473158>";
      case Platforms.Xbox:
        return "<:xbox:1070745724242894909>";
      case Platforms.Switch:
        return "<:switch:1070745684355072164>";
      default:
        return "<:psyNet:1070745603224649748>";
    }
  }

  return {
    createScoreEmbed,
    createTeamsEmbed,
    createErrorEmbed,
  };
}

module.exports = discordServices;