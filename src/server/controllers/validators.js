const { IllegalArgumentError } = require("../errors/errors");

/**
 * Validates props and returns array with their value 
*/
function validateBody(body, ...propNames) {
  const res = [];
  propNames.forEach((propName) => {
    const prop = body[propName];
    if (prop === undefined) throw new IllegalArgumentError(`${propName}: ${prop}`);
    else res.push(prop);
  });
  return res;
}

module.exports = {
  validateBody,
};

// TODO: Refactor and streamline this section for improved readability and maintainability.
