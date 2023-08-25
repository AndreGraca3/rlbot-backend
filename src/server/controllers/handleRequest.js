const { ApplicationError } = require("../errors/errors");

module.exports = function (handler) {
  return async (req, rsp, next) => {
    try {
      await handler(req, rsp).catch();
    } catch (e) {
      if (!(e instanceof ApplicationError))
        rsp.status(500).json({
          message:
            "The server ecountered an internal error or misconfiguration and was unable to complete your request.",
        });
      else rsp.status(e.code).json({ message: e.message });
    }
  };
};
