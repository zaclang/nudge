const makeTransform =
() =>
({ event, build, job, pipeline, sender, ...rest }) => {
  console.log(JSON.stringify({ event, build, job, pipeline, sender, ...rest }))

  const notifyOn = ['build.blocked', 'build.failed'];

  const details = notifyOn.includes(event) && `${build.blocked ? 'blocked' : ''}`;

  const text = `${sender.name} ${event} ${details || ''}`;
  const title = `${pipeline.name}: ${build.message}`;

  return Promise.resolve({ text, title });
}

module.exports = { makeTransform };
