const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  paintings: {
    type: [{
      painting: { 
        type: mongoose.Types.ObjectId,
        ref: 'Painting'
      },
      price: {
        type: Number,
        required: true
      }
    }],
    required: true
  },
  remark: String,
  status: {
    type: String,
    required: true
  },
  bill: {
    type: mongoose.Types.ObjectId,
    ref: 'Bill'
  },
  price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Order', OrderSchema);
