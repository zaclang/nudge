const { makeSend } = require('./make-send');

const makeSlackService = ({ SLACK_WEBHOOK_URL: webhookUrl  }) => {
  const send = makeSend({
    webhookUrl,
  });

  return {
    send,
  };
};

module.exports = { makeSlackService };