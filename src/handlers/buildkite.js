const { makeBuildkiteService } = require('../services/buildkite/make-buildkite-service');
const { makeSlackService } = require('../services/slack/make-slack-service');
const { parseEventBody } = require('../lib/parse-event');

const handler = event => {
  const buildkiteService = makeBuildkiteService();
  const slackService = makeSlackService(process.env); // make-parse-env
  const body = parseEventBody(event.body);

  return Promise.resolve(body)
    // .then(buildkiteService.validate)
    // .then(buildkiteService.identify)
    .then(buildkiteService.transform)
    .then(slackService.send)
    .then(() => ({ statusCode: 200 }));
};

module.exports = { handler };