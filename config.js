var dependable = require("dependable")
var container = dependable.container()
var path = require("path")

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
      durableWrites: true,
      ensureExists: {
        run: false, // check if keyspace exists and automaticcaly create it if it doesn't
        alter: false // alter existing keyspace to match replication or durableWrites
      }
    },

    // model
    model: {
      table: {
        ensureExists: {
          run: false, // check if keyspace exists and automaticcaly create it if it doesn't
          recreate: false, // drop and recreate table on schema mismatch, takes precedence over following options
          recreateColumn: false,  // recreate columns where types don't match schema
          removeExtra: false,  // remove extra columns not in schema
          addMissing: false // add columns in schema that aren't in table
        }
      }
    }
  }
  return new Dakota(options)
})

container.load(path.join(__dirname, "./model"))
module.exports = container
