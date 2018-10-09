
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['buku', 'kamera', 'sepatu', 'pulau pribadi']
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  image_url: {
    type: String
  }
}, {
  timestamps: true
});



var Item = mongoose.model('Item', ItemSchema);

module.exports = Item

let dummyItems = [
  {
    name: 'kamera 1',
    category: 'kamera',
    quantity: 5,
    price: 7000000
  },
  {
    name: 'kamera 2',
    category: 'kamera',
    quantity: 10,
    price: 100000000
  },
  {
    name: 'buku 3',
    category: 'buku',
    quantity: 1,
    price: 50000
  }
]