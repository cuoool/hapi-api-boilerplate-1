/*******************************************************************************
 * Put Server and Plugins configs here
 * ENV: Test
 ******************************************************************************/

'use strict';

const path = require('path');

module.exports = {

  env: 'test',

  product: {
    name: 'Your Awesome API Server'
  },

  server: {
    yourServerName: {
      host: '0.0.0.0',
      port: process.env.PORT || 3000,
      tls: false
    }
  },

  poop: {
    logPath: path.join(__dirname, 'poop.log'),
    heapdumpFolder: path.join(__dirname, '/logs'),
  },

  jobs: {
    MONGO_ADDRESS: "localhost:27017/yourdbname",
    COLLECTION_NAME: "jobs",
  },

  chairo: {
  },

  mongoModels: {
    mongodb: {
      url: 'mongodb://localhost:27017/yourdbname',
      options: {},
    },
    autoIndex: false,
    models: require('./lib/models')
  }
};
