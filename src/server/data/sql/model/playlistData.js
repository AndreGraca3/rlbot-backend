const dataExecutor = require("../../transactionmanager/executors/dataSQLExecutor")

async function upsertPlaylist(prisma, name) {
  const data = {
    name,
  };
  return await prisma.playlist.upsert({
    create: data,
    update: data,
    where: data,
  });
}

async function upsertMmr(prisma, playerId, playlist, mmr) {
  const data = {
    player_id: playerId,
    playlist_name: playlist,
    mmr,
  };
  await prisma.mMREntry.upsert({
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
  upsertPlaylist: dataExecutor(upsertPlaylist),
  upsertMmr: dataExecutor(upsertMmr),
};
