const { generatePolicy } = require('./generatePolicy');

const handler = event => {
  console.log(event);

  return Promise.resolve(generatePolicy('user', 'Allow', '*', 'github'));
};

module.exports = { handler };
