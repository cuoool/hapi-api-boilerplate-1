/*******************************************************************************
 * Routes Loader
 * To load new routes, add the route filename into /lib/config/routes.js
 ******************************************************************************/

'use strict';

const path   = require('path');
const chalk  = require('chalk');
const _      = require('underscore');
const config = require('../config/routes');

module.exports = function routesLoader(server, options) {

  const loader = _.compose(_.bind(registerRoutes, null, server, options),
                           wrapRoutes,
                           prefixRoutes,
                           getRoutes,
                           getRoutesPaths);

  loader(config.routesNames)();
};

// register all routes
function registerRoutes(server, options, routes) {
  return function registerAllRoutes() {
    console.log(chalk.bgGreen.white('Registering Routes...'));
    _.each(routes, function registerRoute(route) {
      server.route(route(server, options));
    });
  };
}

// wrap routes into functions so we can pass server and options around
function wrapRoutes(routes) {
  return _.map(routes, function routeWrapper(route) {
    return function singleRouteWrapper(server, options) {
      return route;
    };
  });
}

// prefix routes
function prefixRoutes(routes) {
  return _.map(routes, function routePrefixer(route) {
    route.path = config.globals.API_PREFIX +
                 config.globals.API_VERSION +
                 route.path;
    return route;
  });
}

// pack the actual routes into an array
function getRoutes(routePaths) {
  return _.flatten(
    _.map(routePaths, function requestRoute(routePath) {
      return require(routePath)();
    })
  );
}

// extract absolute routes paths from array of route names
function getRoutesPaths(routeNames) {
  return _.map(routeNames, function routePathGetter(routeName) {
    return path.join(
      __dirname, '..', config.globals.ROUTES_FOLDER, routeName
    );
  });
}
