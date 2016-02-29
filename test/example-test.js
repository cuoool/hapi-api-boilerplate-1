'use strict';

const path = require('path');
const glue = require('glue');
const Code = require('code');
const Lab  = require('lab');
const http = require('http');

const manifest = require('../server');
const lab = exports.lab = Lab.script();
const config = require('../config').server.yourServerName;

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

describe('example-test', () => {
  var server;

  before((done) => {
    const options = {
      relativeTo: path.join(__dirname, '..', 'node_modules')
    };

    glue.compose(manifest, options, function serverComposer(err, composed) {

      if (err) {
        throw err;
      }

      server = composed;

      server.start((err) => {
        console.log('Test server started');
        done();
      });
    });
  });

  after((done) => {
    server.stop((err) => {
      console.log('Test server stopped');
      done();
    });
  });

  it('works with GET requests', (done) => {
    const options = {
      hostname: config.host,
      port: config.port,
      path: '/api/v1/example',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token bar',
      }
    };

    var response = '';

    http.get(options, (res) => {
      res.setEncoding('utf-8');
      res.on('data', (chunk) => {
        response += chunk;
      });

      res.on('end', () => {
        expect(response).to.equal('GET example');
        done();
      });

      expect(res.statusCode).to.equal(200);
    });
  });
});
