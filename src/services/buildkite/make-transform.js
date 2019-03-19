const makeTransform =
() =>
({ event, build, job, pipeline, sender = {}, ...rest }) => {
  const message = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `your build is blocking the <${build.web_url}|${pipeline.name}> pipeline`,
        },
      },
    ]
  };

  console.log({
    state: build.state,
    blocked: build.blocked,
    message
  })

  return {
    message: build.blocked ? message : false,
    emailAddress: process.env.DUMMY_EMAIL
  }
}

module.exports = { makeTransform };