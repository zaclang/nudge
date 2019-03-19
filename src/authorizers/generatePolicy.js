const generatePolicy = (principalId, effect, resource, caller) => {
  const policyDocument = effect && resource ? {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }
    ]
  } : {};

  return {
    principalId,
    context: {
      caller
    },
    policyDocument
  };
}

module.exports = { generatePolicy };