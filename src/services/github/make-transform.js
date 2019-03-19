const makeTransform =
() =>
({ action, pull_request, user, assignee }) => {
  const triggerActions = ['review_requested'];

  const message = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${user.login} requested your review on <${pull_request.html_url}|${pull_request.title}> (${repo.name})`,
        },
      },
    ],
  }

  return {
    message: triggerActions.includes(action) ? message : false
   };
}

module.exports = { makeTransform };