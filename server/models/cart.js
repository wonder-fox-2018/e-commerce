
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  total: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

var Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart