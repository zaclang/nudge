const { makeUserService } = require('../services/user');
const { makeSlackService } = require('../services/slack');
const { getParameters } = require('../lib/get-parameters');

const handler = async event => {
  console.log(JSON.stringify({ event }));

  const parameters = await getParameters();
  const userService = makeUserService(process.env);
  const user = await userService.getByEmail({ email: event.email });
  console.log({user});

  const slackService = makeSlackService({ parameters });
  try {
    await slackService.sendDirectMessage({
      userId: user.userId,
      message: 'a new event for you!'
    });
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 200
  };
};

module.exports = { handler };
