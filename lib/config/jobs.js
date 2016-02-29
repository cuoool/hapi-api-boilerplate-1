/*******************************************************************************
 * Jobs config and related constants go here
 ******************************************************************************/

'use strict';

const config = require('../../config');

module.exports = {
  globals: {
    MONGO_ADDRESS: config.jobs.MONGO_ADDRESS,
    COLLECTION_NAME: config.jobs.COLLECTION_NAME,
    JOBS_FOLDER: 'jobs',
    FREQUENCY: 'one minute',
    MAX_CONCURRENCY: 5
  },
  // add new jobs by name here (must match /jobs/{jobname}.js)
  jobsNames: [
    'example-job'
  ]
};
