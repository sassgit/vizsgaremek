const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
  order: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Order'
  },
  status: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Bill', BillSchema);
