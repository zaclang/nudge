const { parse } = require('querystring');
const { makeUserService } = require('../services/user');
const { makeSlackService } = require('../services/slack');
const { getParameters } = require('../lib/get-parameters');

const handler = async event => {
  const parameters = await getParameters();

  const slackService = makeSlackService({ parameters });
  await slackService.authorize(event);

  const {
    user_id: userId,
    team_id: teamId,
    team_domain: teamDomain,
    user_name: userName,
    text,
  } = parse(event.body);

  const { email } = await slackService.getUserById({ userId });
  const userService = makeUserService(process.env);

  if (['me', 'start'].includes(text)) {
    await userService.addUser({
      userId,
      email,
      teamId,
      teamDomain
    });
    return slackService.hello({ userName });
  }

  if (['stop', 'remove'].includes(text)) {
    const id = await userService.removeUserById({ userId });
    if (id) {
      return slackService.goodbye({ userName });
    }
  }

  return {
    statusCode: 200
  };
};

module.exports = { handler };
