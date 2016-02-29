/*******************************************************************************
 * Jobs Loader
 * To load new jobs, add the job filename into /lib/config/jobs.js
 ******************************************************************************/

'use strict';

const path   = require('path');
const chalk  = require('chalk');
const _      = require('underscore');
const config = require('../config/jobs');

module.exports = function jobsLoader(server) {

  const loader = _.compose(_.bind(loadJobs, null, server),
                           getJobs,
                           getJobsPaths);

  loader(config.jobsNames)();
};

// load all jobs, set up agenda and decorate server object with agenda instance
function loadJobs(server, jobs) {
  var agenda = new require('agenda')();

  agenda
  .database(config.globals.MONGO_ADDRESS, config.globals.COLLECTION_NAME);

  return function loadAllJobs() {
    _.each(jobs, function loadJob(job) {
      job(server, agenda);
    });

    agenda.on('error', function agendaError(err) {
      console.error(chalk.bgRed.white(err));
    });

    agenda.on('ready', function agendaReady() {
      console.log(chalk.bgGreen.white('Jobs queue starting up...'));
      agenda.start();
    });

    server.decorate('server', 'jobs', agenda);
  };
}

// pack the actual jobs into an array
function getJobs(jobPaths) {
  return _.flatten(
    _.map(jobPaths, function jobGetter(jobPath) {
      return require(jobPath);
    })
  );
}

// extract absolute routes paths from array of route names
function getJobsPaths(jobNames) {
  return _.map(jobNames, function jobPathGetter(jobName) {
    return path.join(
      __dirname, '..', config.globals.JOBS_FOLDER, jobName
    );
  });
}
