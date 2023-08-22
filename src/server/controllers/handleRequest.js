module.exports = function (handler) {
  return async (req, rsp, next) => {
    try {
      await handler(req, rsp).catch();
    } catch (e) {
      // e is should always be instanceof ApplicationError
      console.log(e)
      rsp.status(e.code ?? 500).json({ message: e.message });
      return;
    }
  };
};
