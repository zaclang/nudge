const makeSend =
({ client, getUserByEmail }) =>
  async ({ emailAddress, message }) => {
    const targetUser = await getUserByEmail({ email: emailAddress });

  if (!targetUser) {
    console.error(`email: ${buildkiteUserEmail} not found`);
    return;
  }

  const directMessage = await client.im.open({ user: targetUser.id });

  const res = await client.chat.postMessage({
    channel: directMessage.channel.id,
    text: `Hey ${targetUser.name}`,
    attachments: [
      {
        text: message
      }
    ]
  });

  console.log('Message sent: ', res);
};

module.exports = { makeSend };