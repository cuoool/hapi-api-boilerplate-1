'use strict';

const chalk = require('chalk');

module.exports = function exampleJob(server, agenda) {

  agenda.define('exampleJob', function(job, done) {
    console.log('Executing job with data: ');
    console.log(job.attrs.data);
    return done(null, {});
  });

  agenda.on('success:exampleJob', (job) => {
    var msg = "Job with ID: " + job.attrs._id + " executed with success.";
    console.log(chalk.bgGreen.white(msg));
    job.remove((err) => {
      if (!err) {
        console.log(chalk.bgGreen.white('Job removed successfully.'));
      } else {
        console.error(chalk.bgRed.white('An error occurred while removing the Job.'));
      }
    });
  });

  agenda.on('fail:exampleJob', (err, job) => {
    var msg = "An error occurred while processing Job with ID: " + job.attrs._id;
    console.error(chalk.bgRed.white(msg));
    console.error(chalk.bgRed.white(err));
    job.remove((err) => {
      if (!err) {
        console.log(chalk.bgGreen.white('Job removed successfully.'));
      } else {
        console.error(chalk.bgRed.white('An error occurred while removing the Job.'));
      }
    });
  });
};
