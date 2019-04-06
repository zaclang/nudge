const makeTransform =
() =>
({ sender, action, pull_request, review }) => {
  console.log({ action, title: pull_request.title, sender, review, pull_request });

  //  if submitted, notify pull request pull_request.user
  //  if build failing, notify pull_request.user
  //  if comment, notify pull_request.user
  //  if review_requested, notify [pull_request.assigned_reviewers]
  //  if review dismissed, notify [pull_request.assigned_reviewers]
  // if action.closed, notify [pull_request.assigned_reviewers]
  // if edited ???
  // if assigned ???
  // if opened ???
  // if review_request_removed, notify [pull_request.]

  const scenarios = {
    'review_requested': {
      text: `${sender.login} requested your review on <${pull_request.html_url}|${pull_request.title}> (${pull_request.head.repo.name})`,
      targets: [pull_request.requested_reviewers],
    },
    'review_request_removed': {
      text: `${sender.login} has removed you as a reviewer on <${pull_request.html_url}|${pull_request.title}> (${pull_request.head.repo.name})`,
      targets: [pull_request.requested_reviewer]
    },
    'submitted': {
      text: `${sender.login} has ${review.state} <${pull_request.html_url}|${pull_request.title}> (${pull_request.head.repo.name})`,
      targets: [pull_request.user],
    },
    'closed': {
      text: `${sender.login} has closed <${pull_request.html_url}|${pull_request.title}> (${pull_request.head.repo.name})`,
      targets: pull_request.requested_reviewers,
    },
    'reopened': {
      text: `${sender.login} has reopened <${pull_request.html_url}|${pull_request.title}> (${pull_request.head.repo.name})`,
      targets: pull_request.requested_reviewers,
    },
    'dismissed': {
      text: `${sender.login} has dismissed your review on <${pull_request.html_url}|${pull_request.title}> (${pull_request.head.repo.name})`,
      targets: [review.user],
    },
  };

  if (!scenarios[action]) {
    console.log(`unhandled scenario: ${{action}}`);
    return;
  }

  console.log(scenarios[action])

  const message = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: scenarios[action].text,
        },
      },
    ],
  }

  return {
    message,
    targets: scenarios[action].targets
   };
}

module.exports = { makeTransform };