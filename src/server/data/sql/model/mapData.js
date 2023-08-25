const { NotFoundError } = require("../../../errors/errors");
const { getMapImage } = require("../../../../rocketleague/api/rlApi");
const dataSQLExecutor = require("../../transactionmanager/executors/dataSQLExecutor");

async function getMap(prisma, name) {
  const map = await prisma.map.findUnique({
    where: {
      name,
    },
  });
  if (!map) throw new NotFoundError(`Map ${name}`);
  return map;
}

async function getRandomMap(prisma) {
  const totalMaps = await prisma.map.count();

  if (totalMaps === 0) {
    return null;
  }

  const randomMap = await prisma.map.findFirst({
    skip: Math.floor(Math.random() * totalMaps),
  });

  return randomMap.name;
}

async function addMap(prisma, name) {
  return await prisma.map.create({
    data: {
      name,
      imgUrl: await getMapImage(name),
    },
  });
}

module.exports = {
  getMap: dataSQLExecutor(getMap),
  getRandomMap: dataSQLExecutor(getRandomMap),
  addMap: dataSQLExecutor(addMap),
};
