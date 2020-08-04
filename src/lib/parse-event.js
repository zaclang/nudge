const parseEventBody = body => {
  try {
    return JSON.parse(body);
  } catch (error) {
    console.error(error);
    return {};
  }
};

module.exports = { parseEventBody };
