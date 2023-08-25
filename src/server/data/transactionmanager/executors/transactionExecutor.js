const { ApplicationError } = require("../../../errors/errors");
const mapPrismaError = require("../../sql/prisma/errorMapper"); // should this be here?

function executor(transactionCtx) {
  return (action) => {
    return async function transactionedAction(...args) {
      try {
        return await transactionCtx.init(async (tr) => {
          return await action(tr, ...args);
        });
      } catch (e) {
        console.log("Transaction error:");
        console.log(e);
        if (e instanceof ApplicationError) throw e;
        throw mapPrismaError(e);
      }
    };
  };
}

module.exports = executor;
