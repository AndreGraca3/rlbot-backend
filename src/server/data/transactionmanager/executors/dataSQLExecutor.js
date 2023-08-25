const { prismaClient } = require("../../sql/prisma/prismaClient");

module.exports = (action) => {
  return async (transactionCtx, ...args) => {
    transactionCtx = transactionCtx ?? prismaClient
    return await action(transactionCtx, ...args);
  };
};
