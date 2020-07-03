const DynamoDB = require('aws-sdk/clients/dynamodb');
const documentClient = new DynamoDB.DocumentClient({
  'region': process.env.AWS_REGION
});

const makeGetUserByEmail =
  ({ tableName, indexName }) =>
    async ({ email }) => {
      console.log(`getting user by email: ${email}`);
      const params = {
        TableName: tableName,
        IndexName: indexName,
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
          '#email': 'email'
        },
        ExpressionAttributeValues: {
          ':email': email
        }
      };

      const { Items } = await documentClient.query(params).promise();

      console.log('found:', JSON.stringify({ Items }))
      return Items[0];
    };

module.exports = { makeGetUserByEmail };
