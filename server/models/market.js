const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var marketSchema = new Schema({
  name : {
    type: String,
    required: [true, 'market name is required']
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  transactions: [ {type: Schema.Types.ObjectId, ref: 'Transaction'} ],
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
}, {
  timestamps : true
});

const Market = mongoose.model('Market', marketSchema)

module.exports = Market