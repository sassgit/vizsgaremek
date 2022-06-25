const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    uniquie: true,
    required: true
  },
  role: String
})

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model('User', UserSchema);
