const makeGetUserByEmail =
({ client }) =>
async ({ email }) => {
  if (!email) {
    return null;
  }
  const { members } = await client.users.list();
  return members.find(({ profile }) => profile.email === email);
}

module.exports = { makeGetUserByEmail };