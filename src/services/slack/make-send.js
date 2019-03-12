const makeSend =
({ client, getUserByEmail }) =>
  async ({ event, build, pipeline, emailAddress = process.env.DUMMY_EMAIL }) => {
  const targetUser = await getUserByEmail({ email: emailAddress });
  if (!targetUser) {
    console.error(`email: ${emailAddress} not found`);
    return;
  }

  if (build.state !== 'build.finished' && !build.blocked) { return; }

  const directMessage = await client.im.open({ user: targetUser.id });

  await client.chat.postMessage({
    channel: directMessage.channel.id,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${targetUser.name}, your build is blocking the *${pipeline.name}* pipeline`,
        },
      },
    ],
    attachments: [
      {
        fallback: 'do',
        actions: [
          {
            type: 'button',
            text: 'View Build',
            url: build.web_url,
            style: 'primary'
          }
        ]
      }
    ]
  });

  // console.log({ sentMessageDetails });
};

module.exports = { makeSend };