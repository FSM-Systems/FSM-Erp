// Setup Postgres connection
var config = require('./appconfig');
var Pool = require('pg').Pool;
var db = new Pool({
  user: config.pguser,
  password: config.pgpw,
  host:config. pghost,
  database: config.pgdatabase,
  max: 10, // max number of clients in pool
  idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
});

module.exports = db;