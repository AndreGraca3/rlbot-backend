class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
  }
}

class NotFoundError extends ApplicationError {
  constructor(obj) {
    super(`${obj} not found.`);
    this.name = "NotFoundError";
    this.code = 404;
    this.symbol = "🔍";
  }
}

class IllegalArgumentError extends ApplicationError {
  constructor(obj) {
    super(`${obj} is missing/not valid.`);
    this.name = "IllegalArgumentError";
    this.symbol = "❌";
  }
}

class DuplicateResourceError extends ApplicationError {
  constructor(obj) {
    super(`${obj} already exists.`);
    this.name = "DuplicateResourceError";
    this.code = 409;
    this.symbol = "🔄";
  }
}

class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.code = 401;
    this.symbol = "🔒";
  }
}

class InternalServerError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.code = 500;
    this.symbol = "⚠️";
  }
}

module.exports = {
  ApplicationError,
  NotFoundError,
  IllegalArgumentError,
  DuplicateResourceError,
  InternalServerError,
};
