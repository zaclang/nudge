const handler = async event => {
  console.log(JSON.stringify({ event }));

  return {
    email: "zac.wr.lang@gmail.com",
    type: "build.failed"
  };
};

module.exports = { handler };
