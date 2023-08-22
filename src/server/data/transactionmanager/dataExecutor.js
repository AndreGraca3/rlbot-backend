const { Prisma } = require("@prisma/client");
const {
  IllegalArgumentError,
  InternalServerError,
  NotFoundError,
  ApplicationError,
} = require("../../errors/errors");

const prismaErrorMap = {
  P1012: IllegalArgumentError,
  P2025: NotFoundError,
  P2003: IllegalArgumentError,
};

function mapPrismaError(prismaError) {
  const ApplicationErrorClass =
    prismaErrorMap[prismaError.code] || InternalServerError;
  return new ApplicationErrorClass(
    prismaError.message || "Something went wrong! Try again later."
  );
}

module.exports = (action) => {
  return async function (...args) {
    try {
      return await action(...args);
    } catch (e) {
      if (e instanceof ApplicationError) throw e;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw mapPrismaError(e);
      } else {
        console.log(e);
        throw new ApplicationError(
          "Missing at least one paramater in your request."
        );
      }
    }
  };
};

// Responsible to map SQL/Prisma errors to ApplicationError
