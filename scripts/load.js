var config = require("../config.js")
var r = require("rethinkdb")
var moment = require("moment")
var chrono = require("chrono-node")

config.resolve(function (Peppermint, conn, ACCOUNT_ID){

  Peppermint()
    .then(function(mint) {
      console.log("Logged in...");

      // return another promise
      // (or you can then() it here, of course,
      //  if you need more API calls)
      return mint.getTransactions({ accountId : ACCOUNT_ID});
    })
    .then(function(transactions) {

      transactions.forEach(function(txn) {
        // EG: "Bank of America", "Savings", 1234567
        var txnDate = moment(chrono.parseDate(txn.date))
        if (moment().diff(txnDate, 'days') < 5) {
          var txnAmt = Number(txn.amount.slice(1).replace(/,/g,''))
          var msg = txnDate.format("YYYY-MM-DD") + " " + txn.category +" $" + txnAmt + " " + txn.mmerchant
          console.log(msg)
//          slack(msg)
//          console.log(txn)
        }
//        console.log(txn)
      });
    })
    .fail(function(err) {
      console.error("Boo :(", err);
    })
})
