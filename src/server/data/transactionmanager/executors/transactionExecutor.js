module.exports = function (transactionCtx) {
  async function execute(action) {
    try {
      return await transactionCtx.init(action);
    } catch (e) {
      console.log("Transaction error:" + e)
    }
  }
  return {
    execute,
  };
};
