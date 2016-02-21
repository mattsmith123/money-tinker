var config = require("../config.js")


var Transaction = config.get("Transaction")
var t = new Transaction()
t.description  = "xxxxxx"
t.save(function (err) {
  console.log(err)
})

