const crypto = require('crypto');

const makeAuthorize =
({ githubSecret }) =>
 event => {
  const calculated = crypto
    .createHmac('sha1', githubSecret)
    .update(event.body)
    .digest('hex');

  const hash = event.headers['X-Hub-Signature'];

  if (!crypto.timingSafeEqual(new Buffer(hash), new Buffer(`sha1=${calculated}`))) {
    return Promise.reject();
  }

  return Promise.resolve(event);
};

module.exports = { makeAuthorize };