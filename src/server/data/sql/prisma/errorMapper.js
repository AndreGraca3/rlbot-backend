const { Prisma } = require("@prisma/client");
const {
  IllegalArgumentError,
  ApplicationError,
  DuplicateResourceError,
  InternalServerError,
  NotFoundError,
} = require("../../../errors/errors");

const errorCodeHandlers = {
  P2002: DuplicateResourceError,
  P2014: IllegalArgumentError,
  P2003: IllegalArgumentError,
  P2025: NotFoundError,
};

const handleErrorCode = (code, meta) => {
  const ErrorClass = errorCodeHandlers[code] || InternalServerError;
  return new ErrorClass(meta?.target || meta);
};

function mapPrismaError(e) {
  let error = new ApplicationError(
    "Your request to this route isn't valid. Check documentation."
  );

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    console.log("Prisma code is " + e.code);
    error = handleErrorCode(e.code, e.meta);
  } else if (e instanceof Prisma.PrismaClientValidationError) {
    const messageLines = e.message.split("\n");
    error.message = messageLines[messageLines.length - 1];
  }

  return error;
}

module.exports = mapPrismaError;
