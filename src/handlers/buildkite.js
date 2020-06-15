const { makeSlackService } = require('../services/slack');
const { makeUserService } = require('../services/user');

const handler = async event => {
  const userService = makeUserService(process.env);
  const slackService = makeSlackService(process.env);
  const user = await userService.getByEmail({ email: event.build.creator.email });

  if (user) {
    await slackService.sendDirectMessage({
      userId: user.slack_user_id,
      message: event.pipeline.name
    });
  }

  return {
    statusCode: 200
  };
};

module.exports = { handler };
