const joi = require('joi');
// const { schema } = require('./schema');

const makeValidate =
() =>
  (body) => {
    const schema = joi.object().keys({
      event: joi.string(),
      job: joi.object(),
      build: joi.object().keys({
        id: joi.string(),
        url: joi.string(),
        web_url: joi.string(),
        number: joi.number(),
        state: joi.string(),
        blocked: joi.boolean(),
        message: joi.string(),
        commit: joi.string(),
        branch: joi.string(),
        source: joi.string(),
        created_at: joi.string(),
        scheduled_at: joi.string(),
        started_at: joi.string(),
        finished_at: joi.string(),
        meta_data: joi.object(),
        pull_request: joi.any(),
        tag: joi.any(),
        creator: joi.object()
      }),
      pipeline: joi.object().required(),
      sender: joi.object().required()
    });

    const result = schema.validate(body);

    if (result.error) {
      throw result.error;
    }

    return body;
  };

module.exports = { makeValidate };
