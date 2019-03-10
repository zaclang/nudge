const makeGetUserByEmail =
({ client }) =>
async ({ email }) => {
  if (!email) {
    return null;
  }
  const { members } = await client.users.list();
  return members.find(({ profile }) => {
    console.log({profile})
    return profile.email === email
  });
}

module.exports = { makeGetUserByEmail };