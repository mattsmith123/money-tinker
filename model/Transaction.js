var schema = {

  columns: {

    ctime: 'timestamp',
    utime: 'timestamp',

    id: 'uuid',
    date: 'timestamp',
    description: 'text',
    originalDescription: 'text',
    amount: 'decimal',
    transaction_type: 'text',
    category: 'text',
    labels: 'text',
    notes: 'text'
  },

  key: ['id']
};

module.exports = function (Dakota) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> hi")
  return Dakota.addModel('Transaction', schema)
}
