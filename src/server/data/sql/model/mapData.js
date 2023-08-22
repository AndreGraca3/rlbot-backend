const dataExecutor = require("../../transactionmanager/dataExecutor");
const { prismaClient: prisma } = require("../prisma/prismaClient");

async function getMap(name) {
  return await prisma.map.findUnique({
    where: {
      name,
    },
  });
}

async function getRandomMap() {
  const totalMaps = await prisma.map.count();

  if (totalMaps === 0) {
    return null;
  }

  const randomMap = await prisma.map.findFirst({
    skip: Math.floor(Math.random() * totalMaps),
  });

  return randomMap.name;
}

async function addMap(name, imgUrl, trCtx) {
  trCtx = trCtx ?? prisma;
  return await trCtx.map.create({
    data: {
      name,
      imgUrl,
    },
  });
}

module.exports = {
  getMap,
  getRandomMap,
  addMap,
};
