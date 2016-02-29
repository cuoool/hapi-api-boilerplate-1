/*******************************************************************************
 * Models loader
 * Create new models into lib/models/ and they will be loaded automatically
 ******************************************************************************/

'use strict';

const path = require('path');
const _    = require('underscore');
const fs   = require('fs');

module.exports = {};

_.each(fs.readdirSync(__dirname), (fileName) => {
  if (fileName === 'index.js') {
      return;
  }

  _.extend(module.exports, modelObjectFactory(fileName));
});

function modelObjectFactory(fileName) {
  var modelObj  = Object.create(null),
      modelPath = path.join(__dirname, fileName),
      modelName = fileName.slice(0, fileName.indexOf('.'));

  modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  modelObj[modelName] = modelPath;

  return modelObj;
}
