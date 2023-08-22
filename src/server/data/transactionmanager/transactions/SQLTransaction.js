const { prismaClient: prisma } = require("../../sql/prisma/prismaClient");

async function init(action) {
  return await prisma.$transaction(action);
}

module.exports = {
  init,
};
