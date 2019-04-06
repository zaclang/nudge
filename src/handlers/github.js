const { makeGithubService } = require('../services/github/make-github-service');
const { makeSlackService } = require('../services/slack/make-slack-service');
const { parseEventBody } = require('../lib/parse-event');

const handler = event => {
  const githubService = makeGithubService(process.env);
  const slackService = makeSlackService(process.env); // make-parse-env

  return githubService.authorize(event)
    .then(event => parseEventBody(event.body))
    .then(githubService.transform)
    .then(slackService.send)
    .then(() => ({ statusCode: 200 }));
};

module.exports = { handler };