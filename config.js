var dependable = require("dependable")
var container = dependable.container

var Dakota = require("dakota-cassandra")

function regEnv(key,def) {
  container.register(key, (process.env[key] || def))
}
regEnv("NODE_ENV", "development")
regEnv("CASSANDRA_HOST", "cassandra")
regEnv("CASSANDRA_KEYSPACE", "moneydev")

container.register("Dakota", function(CASSANDRA_HOST, CASSANDRA_KEYSPACE){
  var options = {
    connection: {
      contactPoints: [
        CASSANDRA_HOST
      ],
      keyspace: CASSANDRA_KEYSPACE
    },
    keyspace: {
      replication: { 'class': 'SimpleStrategy', 'replication_factor': 1 },
      durableWrites: true
    }
  }

  return new Dakota
})
container.load(path.join(__dirname, "./model"))

module.exports = container
