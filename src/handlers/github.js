const { makeGithubService } = require('../services/github/make-github-service');
const { makeSlackService } = require('../services/slack/make-slack-service');
const { parseEventBody } = require('../lib/parse-event');

const handler = event => {
  const githubService = makeGithubService();
  const slackService = makeSlackService(process.env); // make-parse-env
  const body = parseEventBody(event.body);

  return Promise.resolve(body)
    .then(githubService.transform)
    .then(slackService.send)
    .then(() => ({ statusCode: 200 }));
};

module.exports = { handler };