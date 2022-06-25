const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: String,
  password: String
})

module.exports = mongoose.model('Customer', CustomerSchema);
