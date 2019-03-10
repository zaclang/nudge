const { makeSend } = require('./make-send');
const { makeClient } = require('./make-client');
const { makeGetUserByEmail } = require('./make-get-user-by-email');

const makeSlackService = ({ SLACK_TOKEN: token }) => {
  const client = makeClient({ token });
  const getUserByEmail = makeGetUserByEmail({ client });
  const send = makeSend({ client, getUserByEmail });

  return {
    send,
  };
};

module.exports = { makeSlackService };