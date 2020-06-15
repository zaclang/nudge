const { makeSlackClient } = require('./make-slack-client');
const { makeSendDirectMessage } = require('./make-send-direct-message');
const { makeGetUserById } = require('./make-get-user-by-id');
const { makeAuthorize } = require('./make-authorize');

const reply = (text) => ({
  statusCode: 200,
  body: JSON.stringify({
    response_type: 'ephemeral',
    text
  })
});

const makeSlackService = ({ parameters }) => {
  const slackClient = makeSlackClient({ token: parameters.SLACK_TOKEN });

  return {
    authorize: makeAuthorize({ signingSecret: parameters.SLACK_SIGNING_SECRET }),
    sendDirectMessage: makeSendDirectMessage({ slackClient }),
    getUserById: makeGetUserById({ slackClient }),
    hello: ({ userName }) => reply(`${userName}, you're in :thumbsup:`),
    goodbye: ({ userName }) => reply(`${userName}, you're out :wave:`)
  };
};

module.exports = { makeSlackService };
