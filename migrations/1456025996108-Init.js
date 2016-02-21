var config = require('../config')
var c = require('cassandra-driver')
var client = new c.Client({ contactPoints: [config.get('CASSANDRA_HOST']}))

exports.up = function(next) {
  client.execute("create keyspace " + config.get('CASSANDRA_KEYSPACE') + ' with ' +
    'replication= { \'class\' : \'SimpleStrategy\', \'replication_factorf\' : 1 } and durable_writes = 1;')
  client.execute("create table transactions (" +
    "")
  next();
};

exports.down = function(next) {
  client.execute("drop keyspace " + config.get('CASSANDRA_KEYSPACE') )
  next();
};
