
const rp = require('request-promise');

const makeSend =
({ webhookUrl, channel = 'testing' }) =>
({ text, title, items = [] }) => {
  console.log({ text, title, items })
      const notification = {
        channel,
        text: title,
        attachments: items.length
          ? items.map(item => ({ text: item }))
          : [{ text }]
      };

      return rp({
        method: 'POST',
        uri: webhookUrl,
        json: true,
        body: notification
      }).promise();
    };

module.exports = { makeSend };