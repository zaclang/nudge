const makeGetUserById =
({ slackClient }) =>
  async ({ userId }) => {
    const { user } = await slackClient.users.info({ user: userId });
    console.log({ userId, user });
    return user.profile;
  };

module.exports = { makeGetUserById };
