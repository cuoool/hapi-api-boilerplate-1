# Hapi Chairo Api Boilerplate

# DEPRECATION NOTICE
This project is no longer mantained.  
Use [generator-hapi-api-stack](https://github.com/franzip/generator-hapi-api-stack) instead.

Table of Contents
=================

  * [Hapi Chairo Api Boilerplate](#hapi-chairo-api-boilerplate)
  * [Table of Contents](#table-of-contents)
    * [Usage](#usage)
    * [Plugins loading and registration](#plugins-loading-and-registration)
    * [Jobs, Routes, Auth, Models and Services loading](#jobs-routes-auth-models-and-services-loading)
      * [Auth Strategies](#auth-strategies)
      * [Routes](#routes)
        * [Prefix](#prefix)
      * [Models](#models)
      * [Jobs](#jobs)
      * [Services](#services)
    * [Project Structure](#project-structure)
    * [Packages Docs](#packages-docs)
      * [Hapi](#hapi)
      * [Models](#models-1)
      * [Services](#services-1)
      * [Jobs](#jobs-1)
      * [Tests](#tests)
      * [Utils](#utils)

## Usage

Run ```npm install``` as usual

```npm run dev``` will run the server with ```config.dev.js``` settings

```npm run staging``` will run the server with ```config.staging.js``` settings

```npm run prod```  will run the server with ```config.prod.js``` settings

## Plugins loading and registration
You can easily customize your Hapi server by adding the plugins you need in ```/server.js``` [manifest file](https://github.com/hapijs/glue/blob/master/API.md#usage) or in ```/lib/index.js```.

## Jobs, Routes, Auth, Models and Services loading
Everything has been setup in order to avoid the need to write code to add new components to the server. 
Anyway, since this is a boilerplate and the loading process cannot be completely abstracted, you'll probably need to tweak various things around if you plan to use different packages for models, jobs, services, etc...

### Auth Strategies
You can add your authentication strategies in ```/lib/config/auth.js``` and they will be registered automatically.
The default authentication strategy is set in ```/lib/index.js```.

### Routes
Adding a new route is a two step operation:
1. Create a route as ```/lib/routes/routename.js```
2. Add ```routename``` into ```/lib/config/routes.js```

#### Prefix

Every registered route is prefixed by a prefix and a version (```/api/v1``` is the default).
```API_PREFIX```and ```API_VERSION``` are defined in ```/lib/config/routes.js```.

### Models
To add a new model, just create a new filename into ```/lib/models/``` and it will be loaded automatically.

### Jobs
Adding a new job is a two step operation:
1. Create a job into ```/lib/jobs/jobname.js```
2. Add ```jobname``` into ```/lib/config/jobs.js```

### Services
Adding a new service is a two step operation:
1. Create a service into ```/lib/jobs/servicename.js```
2. Add ```servicename``` into ```/lib/config/services.js```

## Project Structure

```bash
hapi-chairo-api-boilerplate
├── lib
│   ├── boot      # loader utils
│   ├── config    # configs
│   ├── jobs      # jobs
│   ├── models    # models
│   ├── services  # services
│   ├── routes    # routes
│   └── index.js  # plugins loading and registrations
│
├── test
│   ├── example-test.js 
│
├── logs 
│
├── server.js # server composition
├── config.js # setup ENV config
├── config.dev.js
├── config.staging.js
├── config.prod.js
├── package.json
└── README.md
```

## Packages Docs

### Hapi
- [Hapi](https://github.com/hapijs/hapi/blob/master/API.md) | Server Framework
- [Glue](https://github.com/hapijs/glue/blob/master/API.md) | Server Composer
- [Poop](https://github.com/hapijs/poop/blob/master/README.md) | Logs uncaught exceptions
- [Boom](https://github.com/hapijs/boom/blob/master/README.md) | HTTP errors
- [Joi](https://github.com/hapijs/joi/blob/v7.2.3/API.md) | Object Schema validation

### Models
- [Hapi Mongo Models](https://github.com/jedireza/hapi-mongo-models/blob/master/README.md) | Mongo Models for Hapi

### Services 
- [Seneca](https://github.com/senecajs/seneca/blob/master/README.md) | Microservices Toolkit
- [Chairo](https://github.com/hapijs/chairo/blob/master/README.md) | SenecaJS/Hapi integration

### Jobs
- [Agenda](https://github.com/rschmukler/agenda/blob/master/README.md) | Job scheduler

### Tests
- [Lab](https://github.com/hapijs/lab/blob/master/README.md)
- [Code](https://github.com/hapijs/code/blob/master/API.md)

### Utils
- [Underscore](http://underscorejs.org/)
- [Chalk](https://github.com/chalk/chalk/blob/master/readme.md)
- [Hoek](https://github.com/hapijs/hoek/blob/master/README.md)

## TODO 

- [ ] Better logs handling
- [ ] API Docs support
