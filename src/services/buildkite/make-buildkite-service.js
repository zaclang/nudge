const { makeTransform } = require('./make-transform');

const makeBuildkiteService = () => {
  const transform = makeTransform();

  return {
    transform,
  };
};

module.exports = { makeBuildkiteService };