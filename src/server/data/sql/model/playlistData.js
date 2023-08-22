const { prismaClient: prisma } = require("../prisma/prismaClient");

async function upsertPlaylist(name, trCtx) {
  trCtx = trCtx ?? prisma;
  const data = {
    name,
  };
  return await trCtx.playlist.upsert({
    create: data,
    update: data,
    where: data,
  });
}

async function upsertMmr(playerId, playlist, mmr, trCtx) {
  trCtx = trCtx ?? prisma;
  const data = {
    player_id: playerId,
    playlist_name: playlist,
    mmr,
  };
  await trCtx.mMREntry.upsert({
    create: data,
    update: data,
    where: {
      player_id_playlist_name: {
        player_id: playerId,
        playlist_name: playlist,
      },
    },
  });
}

module.exports = {
  upsertPlaylist,
  upsertMmr,
};
