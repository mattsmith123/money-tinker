module.exports = function (DS) {

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> hi")

  if (DS.definitions.transaction) {
    return DS.definitions.transaction;
  }

  return DS.defineResource({
    name: 'transaction',
    table: 'transactions'
  })
}

