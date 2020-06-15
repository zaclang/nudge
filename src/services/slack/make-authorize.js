const crypto = require('crypto');

const makeAuthorize = ({ signingSecret }) => event => {
  console.log('verifying Slack request..', signingSecret.length);

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

  if (!crypto.timingSafeEqual(new Buffer.from(signature), new Buffer.from(calculatedSignature))) {
    return Promise.reject();
  }

  console.log('verified');
  return Promise.resolve(event);
};

module.exports = { makeAuthorize };
