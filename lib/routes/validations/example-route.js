/*******************************************************************************
 * Example Validations
 ******************************************************************************/

'use strict';

const joi = require('joi');

module.exports = {
  getOne: {
    params: {
      id: joi.string().alphanum().required()
    }
  },

  createOne: {
    payload: {
      name: joi.string().min(2).max(20).required()
    }
  },

  createJob: {
    payload: {
      data: joi.object().required()
    }
  }
};
