const { makeTransform } = require('./make-transform');
const { makeValidate } = require('./make-validate');

const makeBuildkiteService = () => {
  return {
    transform: makeTransform(),
    validate: makeValidate(),
  };
};

module.exports = { makeBuildkiteService };