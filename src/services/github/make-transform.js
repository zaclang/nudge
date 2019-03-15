const makeTransform =
() =>
(body) => {
  console.log(body);
  return { github: true };
}

module.exports = { makeTransform };