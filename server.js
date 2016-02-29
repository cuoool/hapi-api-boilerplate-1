/*******************************************************************************
 * App Manifest and Server composition
 * Do not register Hapi plugins manually, do it here instead
 ******************************************************************************/

'use strict';

const path   = require('path'),
      chalk  = require('chalk'),
      glue   = require('glue'),
      config = require('./config');

config.server.yourServerName.uri = (config.server.yourServerName.tls ?
                                      'https://' : 'http://') +
                                      config.server.yourServerName.host +
                                      ':' +
                                      config.server.yourServerName.port;

const manifest = {

  server: {
    app: {
      config: config
    }
  },

  connections: [
    {
      host: config.server.yourServerName.host,
      port: config.server.yourServerName.port,
      labels: config.product.name
    }
  ],

  registrations: [
    {
      plugin: {
        register: 'poop',
        options: config.poop
      }
    },
    {
      plugin: {
        register: 'hapi-mongo-models',
        options: config.mongoModels
      }
    },
    {
      plugin: {
        register: '../lib/index'
      }
    }
  ]
};

module.exports = manifest;

if (!module.parent) {

  const options = {
    relativeTo: path.join(__dirname, 'node_modules')
  };

  var bootMessage = chalk.bgGreen.white(config.product.name +
                                        ' listening on') + ' ' +
                    chalk.bgBlack.white.underline(config.server.yourServerName.uri) +
                    chalk.bgBlue.white("\nENV: " + config.env);

  glue.compose(manifest, options, function serverComposer(err, server) {

    if (err) {
      throw err;
    }

    server.start(() => console.log(bootMessage));
  });
}
