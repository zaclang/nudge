const DynamoDB = require('aws-sdk/clients/dynamodb');
const documentClient = new DynamoDB.DocumentClient({
  'region': process.env.AWS_REGION
});

const makeAddUser =
({ tableName }) =>
  async ({ slackUserId, ...rest }) => {
    const params = {
      TableName: tableName,
      Item: {
        slackUserId,
        ...rest,
        createdAt: new Date().toISOString()
      }
    };

    await documentClient.put(params).promise();

    console.log(`created user ${slackUserId}`);

    return {
      slackUserId,
      ...rest
    };
  };

module.exports = { makeAddUser };
