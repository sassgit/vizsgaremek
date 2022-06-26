const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  paintings: {
    type: [
      { 
        type: mongoose.Types.ObjectId,
        ref: 'Painting'
      }],
    required: true
  },
  remark: String,
  status: {
    type: String,
    required: true
  },
  bill: String,
  billStatus: String,
  price: {
    type: Number,
    required: true
  }
})

const model = mongoose.model('Order', OrderSchema);

model.populateOne = ['customer', 'paintings'];
model.populateAll = 'customer';

module.exports = model;
