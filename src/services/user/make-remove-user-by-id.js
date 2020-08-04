const DynamoDB = require('aws-sdk/clients/dynamodb');
const documentClient = new DynamoDB.DocumentClient({
  'region': process.env.AWS_REGION
});

const makeRemoveUserById =
({ tableName }) =>
  async ({ userId }) => {
    const params = {
      TableName: tableName,
      Key: {
        userId
      }
    };

    return documentClient.delete(params).promise();
  };

module.exports = { makeRemoveUserById };
