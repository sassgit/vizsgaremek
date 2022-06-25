const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  storedFileName: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Photo', PhotoSchema);
