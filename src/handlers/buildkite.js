const { makeSlackService } = require('../services/slack/make-slack-service');
const { makeBuildkiteService } = require('../services/buildkite/make-buildkite-service');

const handler = event => {
  const buildkiteService = makeBuildkiteService();
  const slackService = makeSlackService(process.env);

  return Promise.resolve(event)
    .then(({ body }) => buildkiteService.transform(JSON.parse(body)))
    .then(slackService.send)
    .then(() => ({
      statusCode: 200,
        body: 'ok'
    }));
};

module.exports = { handler };
