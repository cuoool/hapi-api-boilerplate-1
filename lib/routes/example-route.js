/*******************************************************************************
 * Example Routes
 ******************************************************************************/

'use strict';

const boom = require('boom');
const exampleValidation = require('./validations/example-route');

module.exports = (server, options) => {
  return [
    {
      method: 'GET',
      path: '/example',
      config: {
        handler: (request, reply) => {
          return reply('GET example');
        }
      }
    },
    {
      method: 'POST',
      path: '/example',
      config: {
        handler: (request, reply) => {
          const exampleModel = request.server.plugins['hapi-mongo-models']['Example-model'];
          var response;

          exampleModel.insertOne({name: request.payload.name}, (err, result) => {
            response = (err) ? err : result;

            return reply(response);
          });
        },
        validate: require('./validations/example-route').createOne
      }
    },
    {
      method: 'GET',
      path: '/example/{id}',
      config: {
        handler: (request, reply) => {
          return reply(request.params.id);
        },
        validate: require('./validations/example-route').getOne
      }
    },
    {
      method: 'POST',
      path: '/example/job',
      config: {
        handler: (request, reply) => {
          const serverJobs = request.server.jobs;

          var data       = request.payload.data,
              exampleJob = serverJobs.create('exampleJob', data),
              response;

          exampleJob.save((err) => {
            if (err) {
              response = reply(boom.badImplementation());
            } else {
              response = reply().created('');
            }
          });

          return response;
        },
        validate: require('./validations/example-route').createJob
      }
    },
    {
      method: 'POST',
      path: '/example/microservice',
      config: {
        handler: (request, reply) => {
          return reply.act({ generate: 'id' });
        }
      }
    },
  ];
};
