/*******************************************************************************
 * Example Model
 ******************************************************************************/

'use strict';

const joi          = require('joi'),
      objectAssign = require('object-assign'),
      BaseModel    = require('hapi-mongo-models').BaseModel;

const Example = BaseModel.extend({
  constructor: function(attrs) {
    objectAssign(this, attrs);
  }
});

Example._collection = 'example-collection';

Example.schema = joi.object().keys({
  name: joi.string().required()
});

module.exports = Example;
