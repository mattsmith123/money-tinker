var config = require("../config.js")
var r = require("rethinkdb")
exports.up = function(next) {
  config.resolve(function(conn, DB_DATABASE) {
    conn(function(err,conn) {
      if (err) throw err;
      r.dbCreate(DB_DATABASE).run(conn, function(err, res) {
        if (err) throw err;
        console.log(res);
        r.db(DB_DATABASE).tableCreate("transactions").run(conn, function (err, res) {
          if (err) throw err;
          console.log(res);
          next();
        })
      })
    })
  })
};

exports.down = function(next) {
  config.resolve(function(conn, DB_DATABASE) {
    conn(function(err,conn) {
      if (err) throw err;
      r.dbDrop(DB_DATABASE).run(conn, function(err, res) {
        if (err) throw err;
        console.log(res);
        next();
      })
    })
  })
};
