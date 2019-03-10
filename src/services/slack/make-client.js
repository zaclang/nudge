const { WebClient } = require('@slack/client');

const makeClient =
({ token }) => {
  const client = new WebClient(token);
  return client;
}

module.exports = { makeClient };
