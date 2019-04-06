const { makeTransform } = require('./make-transform');
const { makeAuthorize } = require('./make-authorize');

const makeGithubService = ({ GITHUB_WEBHOOK_SECRET }) => {
  return {
    authorize: makeAuthorize({ githubSecret: GITHUB_WEBHOOK_SECRET }),
    transform: makeTransform(),
  };
};

module.exports = { makeGithubService };