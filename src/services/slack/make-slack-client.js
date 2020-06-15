const { WebClient } = require('@slack/client');

const makeSlackClient =
({ token }) => {
  const client = new WebClient(token);
  return client;
};

module.exports = { makeSlackClient };
