const crypto = require('crypto');

const makeAuthorize = ({ signingSecret }) => async event => {
  console.log('verifying Slack request..');

  const timestamp = event.headers['X-Slack-Request-Timestamp'];
  const signature = event.headers['X-Slack-Signature'];

  if ((new Date().valueOf() - timestamp) > 60 * 5) {
    console.error('request is more than 5 minutes old');
    return;
  }

  const calculatedSignature = 'v0=' + crypto
    .createHmac('sha256', signingSecret)
    .update(`v0:${timestamp}:${event.body}`)
    .digest('hex');

  if (!crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculatedSignature))
  ) {
    throw new Error('invalid signature');
  }

  return event;
};

module.exports = { makeAuthorize };
