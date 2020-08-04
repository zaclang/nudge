const makeSendDirectMessage =
  ({ slackClient }) =>
    async ({ userId, message }) => {
      if (!message) { return; }

      const directMessage = await slackClient.conversations.open({
        users: userId
      });

      return slackClient.chat.postMessage({
        channel: directMessage.channel.id,
        text: message
      });
    };

module.exports = { makeSendDirectMessage };
