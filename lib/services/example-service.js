'use strict';

module.exports = function exampleService(server, options) {
  var id = 0;
  server.seneca.add({ generate: 'id' }, function (message, next) {

      return next(null, { id: ++id });
  });
};
