const { makeAddUser } = require('./make-add-user');
const { makeGetUserByEmail } = require('./make-get-user-by-email');
const { makeRemoveUserById } = require('./make-remove-user-by-id');

const makeUserService = ({ USER_TABLE_NAME, USER_EMAIL_INDEX_NAME }) => {
  return {
    addUser: makeAddUser({ tableName: USER_TABLE_NAME }),
    getByEmail: makeGetUserByEmail({ tableName: USER_TABLE_NAME, indexName: USER_EMAIL_INDEX_NAME }),
    removeUserById: makeRemoveUserById({ tableName: USER_TABLE_NAME })
  };
};

module.exports = { makeUserService };
