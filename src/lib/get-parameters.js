const AWS = require('aws-sdk');
const ssm = new AWS.SSM({ region: 'us-east-1', apiVersion: '2014-11-06' });
const { STAGE } = process.env;

const configs = [];

const secrets = [
  'SLACK_TOKEN',
  'SLACK_SIGNING_SECRET'
];

const makeGetParameters = ({ stage }) => async () => {
  const getPath = type => name => '/' + [stage, 'badger', type, name].join('/');

  const params = {
    Names: [
      ...configs.map(getPath('config')),
      ...secrets.map(getPath('secret'))
    ].filter(Boolean)
  };

  try {
    const parameters = await ssm.getParameters({ ...params, WithDecryption: true }).promise();
    return formatParameters(parameters);
  } catch (e) {
    return e;
  }
};

const formatParameters = (parameters) => {
  return parameters.Parameters.reduce((object, param) => {
    console.log(`transforming ${param.Name}...`);
    return { ...object, [param.Name.split('/').pop()]: param.Value };
  }, {});
};

const getParameters = makeGetParameters({ stage: STAGE });
module.exports = { getParameters };
