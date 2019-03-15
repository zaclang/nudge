const { makeTransform } = require('./make-transform');

const makeGithubService = () => {
  return {
    transform: makeTransform(),
  };
};

module.exports = { makeGithubService };