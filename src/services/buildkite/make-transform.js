const makeTransform =
() =>
({ event, build, job, pipeline, sender = {}, ...rest }) => {
  return {
    message: [sender.name, pipeline.name, event, build.state].filter(Boolean).join(' '),
    emailAddress: process.env.DUMMY_EMAIL
  }
}

module.exports = { makeTransform };