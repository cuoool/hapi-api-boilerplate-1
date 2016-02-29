/*******************************************************************************
 * Auth config and related constants go here
 ******************************************************************************/

'use strict';

module.exports = {
  // declare you strategies here
  exampleStrategy: function exampleStrategy(server) {
    server.auth.strategy('simple', 'bearer-access-token', {
      allowQueryToken: false,
      allowMultipleHeaders: true,
      accessTokenName: 'token',
      tokenType: 'token',
      // implement a real validation here
      validateFunc: function exampleStrategyValidationFn(token, callback) {
        return callback(null, true, {token: token});
      }
    });
  },
  // anotherStrategy: function anotherStrategy(server) {
  // ...
  // }
};
