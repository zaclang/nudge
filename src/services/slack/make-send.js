const makeSend =
({ client, getUserByEmail }) =>
async ({ emailAddress = process.env.DUMMY_EMAIL, message } = {}) => {
  console.log({message})
  if (!message) { return; }

  const targetUser = await getUserByEmail({ email: emailAddress });

  if (!targetUser) {
    console.error(`email: ${emailAddress} not found`);
    return;
  }

  const directMessage = await client.im.open({ user: targetUser.id });

  await client.chat.postMessage({
    channel: directMessage.channel.id,
    ...message
  });

  // console.log({ sentMessageDetails });
};

module.exports = { makeSend };