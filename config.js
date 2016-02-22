var dependable = require("dependable")
var container = dependable.container()
var path = require("path")
var r = require('rethinkdb')
var pm = require('pepper-mint')

function regEnv(key,def) {
  container.register(key, (process.env[key] || def))
}

regEnv("NODE_ENV", "development")
regEnv("DB_HOST", "rtdb")
regEnv("DB_DATABASE", "moneydev")
regEnv("DB_CONNECT_PORT", "28015")
regEnv("MINT_USER","tiffanyjoannsmith@gmail.com")
regEnv("MINT_PASSWORD", "")
regEnv("ACCOUNT_ID", 4133425)

container.register("conn", function(DB_HOST, DB_CONNECT_PORT){
  var conn
  return function(cb) {
    if (conn) cb(null, conn)
    console.log("calling connect")
    r.connect({ host: DB_HOST, port: DB_CONNECT_PORT }, function(err, _conn) {
      if (!err) conn = _conn
      cb(err,conn)
    })
  }

})

container.register("Peppermint", function(MINT_USER, MINT_PASSWORD) {
  return pm.bind(null,MINT_USER, MINT_PASSWORD)
})

container.load(path.join(__dirname, "./model"))
module.exports = container
