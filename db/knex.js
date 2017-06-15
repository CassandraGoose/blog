var environment = process.env.NODE_ENV || 'development';
console.log(environment)
var knexConfig = require('../knexfile')
var config = knexConfig[environment];
var knex = require('knex');
var knexConnection = knex(config);


module.exports = knexConnection;
