/*******************************************************************************
 * Load more stuff on the Server here (Routes, Jobs, Services, etc.)..
 ******************************************************************************/

'use strict';

const _              = require('underscore');
const config         = require('../config.js');
const authStrategies = require('./config/auth');
const routesLoader   = require('./boot/routes-loader');
const servicesLoader = require('./boot/services-loader');
const jobsLoader     = require('./boot/jobs-loader');
const Package        = require('../package.json');

exports.register = function(server, options, next) {

  server.register([
    {
      register: require('chairo'),
      options: config.chairo
    },
    {
      register: require('hapi-auth-bearer-token')
    }
  ],
   (err) => {

    if (err) {
      return next(err);
    }

    // load all auth strategies
    _.each(Object.keys(authStrategies), (authStrategy) => {
      authStrategies[authStrategy].call(null, server);
    });
    // set server default strategy
    server.auth.default('simple');
    // load all services
    servicesLoader(server, options);
    // load all routes
    routesLoader(server, options);
    // load all jobs
    jobsLoader(server);

    next();
   });
};

exports.register.attributes = {
  pkg: Package
};
