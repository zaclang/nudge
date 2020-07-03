const AWS = require('aws-sdk');
const { getParameterPaths } = require('./get-parameter-paths');

const ssm = new AWS.SSM({
  region: process.env.AWS_REGION,
  apiVersion: '2014-11-06'
});

const { STAGE } = process.env;

const makeGetParameters = ({ stage }) => async () => {
  const { configPaths, secretPaths } = getParameterPaths({ stage });

  const params = {
    Names: [
      ...configPaths,
      ...secretPaths,
    ].filter(Boolean)
  };

  try {
    const parameters = await ssm.getParameters({ ...params, WithDecryption: true }).promise();
    return formatParameters(parameters);
  } catch (error) {
    return error;
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
