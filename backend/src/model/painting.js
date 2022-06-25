const mongoose = require('mongoose');

const PaintingSchema = mongoose.Schema({
  artist: {
    type: mongoose.Types.ObjectId,
    ref: 'Artist'
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  width: Number,
  height: Number,
  otherInfo: String,
  photos: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'Photo'}]
  },
  count: {
    type: Number,
    required: true,
    default: 1
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
  }
})

module.exports = mongoose.model('Painting', PaintingSchema);
