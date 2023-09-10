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

function transformQueryToDate(query) {
  const currentDate = new Date();
  
  if (query.endsWith("d")) {
    const days = parseInt(query);
    currentDate.setDate(currentDate.getDate() - days);
  } else if (query.endsWith("w")) {
    const weeks = parseInt(query);
    currentDate.setDate(currentDate.getDate() - weeks * 7);
  } else if (query.endsWith("m")) {
    const months = parseInt(query);
    currentDate.setMonth(currentDate.getMonth() - months);
  } else if (query.endsWith("y")) {
    const years = parseInt(query);
    currentDate.setFullYear(currentDate.getFullYear() - years);
  }

  return currentDate.toISOString();
}

module.exports = {
  validateBody,
  transformQueryToDate
};

// TODO: Refactor and streamline this section for improved readability and maintainability.
