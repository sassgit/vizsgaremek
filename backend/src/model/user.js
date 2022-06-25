const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    uniquie: true,
    required: true
  },
  password: String,
  role: String
})

module.exports = mongoose.model('User', UserSchema);
