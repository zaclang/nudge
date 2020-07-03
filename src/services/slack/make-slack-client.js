const { WebClient } = require('@slack/web-api');

const makeSlackClient =
({ token }) => {
  const client = new WebClient(token);
  return client;
};

module.exports = { makeSlackClient };
