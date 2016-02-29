/*******************************************************************************
 * Services Loader
 * To load new services, add the service filename into /lib/config/services.js
 ******************************************************************************/

'use strict';

const path   = require('path');
const chalk  = require('chalk');
const _      = require('underscore');
const config = require('../config/services');

module.exports = function servicesLoader(server, options) {

  const loader = _.compose(_.bind(loadServices, null, server, options),
                           getServices,
                           getServicesPaths);

  loader(config.servicesNames)();
};

// attach each service to the server object
function loadServices(server, options, services) {
  return function loadAllServices() {
    console.log(chalk.bgGreen.white('Loading Services...'));
    _.each(services, function mountService(service) {
      service(server, options);
    });
  };
}

// pack the actual services into an array
function getServices(servicesPaths) {
  return _.map(servicesPaths, function requestService(servicePath) {
    return require(servicePath);
  });
}

// extract absolute services paths from array of route names
function getServicesPaths(servicesNames) {
  return _.map(servicesNames, function servicePathGetter(serviceName) {
    return path.join(
      __dirname, '..', config.globals.SERVICES_FOLDER, serviceName
    );
  });
}
