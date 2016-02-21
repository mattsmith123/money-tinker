module.exports = function (Dakota) {
  return {
    transaction: dakota.addModel('Transaction', require('./transaction.schema'))
  }
}
